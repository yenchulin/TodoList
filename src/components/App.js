import React from 'react';
import TodoList from "./TodoList";

export default class App extends React.Component {
    render() {
        return (
            <div style={{width: "100vw", height: "100vh", background: "linear-gradient(#4A669E, #2B3959)"}}>
                <TodoList/>
            </div>
        );
    }
}