import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import styled from 'styled-components';
import {addTodo} from '../reducers/todoReducer';

const StyledAddTodo = styled.form`
  display: flex;
  align-items: center;
  height: 30px;
  &:not(:first-child) {
    margin-top: 20px;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    width: 20px;
    height: 20px;
    margin-right: 15px;
  }

  input {
    width: 100%;
    border: none;
    font-size: 15px;
    color: #4A4A4A;
    &::placeholder {
      color: #A5A4A4;
    }
  }
`;

@connect(undefined, dispatch => bindActionCreators({
    addTodo
}, dispatch))
export default class AddTodo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            id: 0
        };
        this.handleAddTodoSubmit = this.handleAddTodoSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        this.addInput && this.addInput.focus();
    }

    handleAddTodoSubmit(e) {
        const {title} = this.state;
        e.preventDefault();
        if (!title) {
            return;
        }
        this.props.addTodo({
            id: this.state.id,
            title: this.state.title,
            isCompleted: false
        });
        this.cleanInput();
        this.increaseId();
    }

    handleInputChange(e) {
        this.setState({title: e.target.value})
    }

    cleanInput() {
        this.setState({title: ""});
    }

    increaseId() {
        this.setState({id: this.state.id + 1});
    }

    render() {
        return (
            <StyledAddTodo onSubmit={this.handleAddTodoSubmit}>
                <button type="submit"><img src={require("../assets/images/plus.svg")}/></button>
                <input
                    type="text"
                    placeholder="ADD ITEM"
                    value={this.state.title}
                    ref={(element) => {this.addInput = element}}
                    onChange={this.handleInputChange}
                />
            </StyledAddTodo>
        );
    }
}