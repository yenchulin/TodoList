import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import styled from 'styled-components';
import {toggleTodo, deleteTodo, editTodo} from '../reducers/todoReducer';

const actionBttnW = "20px";
const actionBttnSpace = "10px";
const ButtonGroup = styled.div`
  display: none;
  align-items: center;
  position: absolute;
  right: 0;
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    width: ${actionBttnW};
    height: ${actionBttnW};
    &:not(:last-child) {
      margin-right: ${actionBttnSpace};
    }
  }
`;
const StyledTodo = styled.form`
  display: flex;
  align-items: center;
  height: 30px;
  font-size: 20px;
  color: #4A4A4A;
  &:hover {
    ${ButtonGroup} {
      display: flex;
    }
  }
`;
const Checkbox = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 15px;
`;
const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  span {
    cursor: default;
    margin-right: calc(${actionBttnW} * 2 + ${actionBttnSpace} + 15px);
  }
  input {
    border: none;
    font-size: 20px;
    color: #4A4A4A;
  }
`;

@connect(undefined, dispatch => bindActionCreators({
    toggleTodo, deleteTodo, editTodo
}, dispatch))
export default class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditMode: false,
            editingTitle: props.todo.title
        };
        this.toggleTodo = this.toggleTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.todo.title !== this.props.todo.title) {
            this.setState({editingTitle: this.props.todo.title});
        }
    }

    handleEditSubmit(e) {
        e.preventDefault();
        this.props.editTodo({
            id: this.props.todo.id,
            title: this.state.editingTitle
        });
        this.clearEditing();
    }

    handleInputChange(e) {
        this.setState({editingTitle: e.target.value});
    }

    toggleEditMode() {
        this.setState({isEditMode: !this.state.isEditMode}, () => {
            this.state.isEditMode && this.titleInput && this.titleInput.focus();
        });
    }

    toggleTodo() {
        this.props.toggleTodo(this.props.todo.id);
    }

    deleteTodo() {
        this.props.deleteTodo(this.props.todo.id);
    }

    clearEditing() {
        this.setState({isEditMode: false});
    }

    render() {
        const {todo} = this.props;
        const {isEditMode, editingTitle} = this.state;
        return (
            <StyledTodo onSubmit={this.handleEditSubmit}>
                <Checkbox onClick={this.toggleTodo}>
                    <img src={todo.isCompleted ? require("../assets/images/ok.svg") : require("../assets/images/checkbox.svg")}/>
                </Checkbox>
                {isEditMode ?
                    <ActionContainer>
                        <input type="text" value={editingTitle} onChange={this.handleInputChange} ref={(element) => {this.titleInput = element}}/>
                    </ActionContainer>
                     :
                    <ActionContainer>
                        <span onClick={this.toggleTodo}>{todo.title}</span>
                        <ButtonGroup>
                            <button type="button" onClick={this.toggleEditMode}><img src={require("../assets/images/edit.svg")}/></button>
                            <button type="button" onClick={this.deleteTodo}><img src={require("../assets/images/delete.svg")}/></button>
                        </ButtonGroup>
                    </ActionContainer>
                }
            </StyledTodo>
        );
    }
}