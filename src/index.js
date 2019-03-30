import React from 'react';
import * as ReactDOM from "react-dom";
import {createStore} from 'redux'
import {Provider} from 'react-redux';
import App from "./components/App";
import todos from "./reducers/todoReducer";
import 'assets/style.scss';

const store = createStore(todos);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);