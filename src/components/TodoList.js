import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import styled from 'styled-components';
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import {filterTodo, clearCompletedTodos, VISIBILITY} from '../reducers/todoReducer';

const StyledTodoList = styled.div`
  position: fixed;
  top: 15%;
  left: 15%;
  width: 70%;
  height: 70%;
  padding: 70px 80px;
  border-radius: 10px;
  background: #FFFFFF;
  
  @media only screen and (max-width: 414px) {
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    border-radius: 0;
    padding: 35px 40px;
  }
`;
const TodoContainer = styled.div`
  height: 260px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 10px 0;
`;
const StyledBttn = styled.button`
  height: 27px;
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 5px;
`;
const VisibilityBttn = styled(StyledBttn)`
  border: ${props => props.active ? "none" : "1px solid #465F94"};
  color: ${props => props.active ? "#FFFFFF" : "#465F94"};
  background: ${props => props.active ? "#465F94" : "#FFFFFF"};
  &:not(:last-child) {
    margin-right: 10px;
  }
`;
const ClearBttn = styled(StyledBttn)`
  position: absolute;
  left: 80px;
  bottom: 40px;
  border: 1px solid #C02B2B;
  color: #C02B2B;
  background: #FFFFFF;
  transition: background .3s ease-in-out, color .3s ease-in-out;
  will-change: background, color;
  &:hover {
    background: #C02B2B;
    color: #FFFFFF;
  }
  &:active {
    background: #942121;
    color: #FFFFFF;
  }
  
  @media only screen and (max-width: 414px) {
    left: 40px;
    &:hover {
      background: #FFFFFF;
      color: #C02B2B;
    }
  }
`;

@connect(state => ({
    todos: state.todos,
    visibility: state.visibility
}), dispatch => bindActionCreators({
    filterTodo, clearCompletedTodos
}, dispatch))
export default class TodoList extends React.Component {

    getFilteredTodos() {
        const {todos, visibility} = this.props;
        switch (visibility) {
            case VISIBILITY.SHOW_ALL:
                return todos;
            case VISIBILITY.SHOW_COMPLETED:
                return todos.filter((todo) => todo.isCompleted);
            case VISIBILITY.SHOW_ACTIVE:
                return todos.filter((todo) => !todo.isCompleted);
        }
    }

    render() {
        const {visibility, filterTodo, clearCompletedTodos} = this.props;
        return (
            <StyledTodoList>
                <h1>TODO LIST</h1>
                <div>
                    <VisibilityBttn active={visibility === VISIBILITY.SHOW_ALL} type="button" onClick={() => filterTodo(VISIBILITY.SHOW_ALL)}>ALL</VisibilityBttn>
                    <VisibilityBttn active={visibility === VISIBILITY.SHOW_COMPLETED} type="button" onClick={() => filterTodo(VISIBILITY.SHOW_COMPLETED)}>COMPLETED</VisibilityBttn>
                    <VisibilityBttn active={visibility === VISIBILITY.SHOW_ACTIVE} type="button" onClick={() => filterTodo(VISIBILITY.SHOW_ACTIVE)}>ACTIVE</VisibilityBttn>
                </div>
                <TodoContainer>
                    {this.getFilteredTodos().map((todo, i) => (
                        <Todo key={`todo-${i}`} todo={todo}/>
                    ))}
                    <AddTodo/>
                </TodoContainer>
                <ClearBttn type="button" onClick={clearCompletedTodos}>CLEAR COMPLETED</ClearBttn>
            </StyledTodoList>
        );
    }
}