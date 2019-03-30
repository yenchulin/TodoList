export const VISIBILITY = {
    SHOW_ALL: "SHOW_ALL",
    SHOW_COMPLETED: "SHOW_COMPLETED",
    SHOW_ACTIVE: "SHOW_ACTIVE"
};

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";
const EDIT_TODO = "EDIT_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const FILTER_TODO = "FILTER_TODO";
const CLEAR_COMPLETED = "CLEAR_COMPLETED";

const initialState = {
    todos: [],
    visibility: VISIBILITY.SHOW_ALL
};

export default function todoReducer(state = initialState, action = {}) {
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, action.result]
            };
        case DELETE_TODO:
            const deletingIndex = state.todos.findIndex((todo) => (
                todo.id === action.result
            ));
            return {
                ...state,
                todos: [
                    ...state.todos.slice(0, deletingIndex),
                    ...state.todos.slice(deletingIndex + 1)
                ]
            };
        case EDIT_TODO:
            const editingIndex = state.todos.findIndex((todo) => (
                todo.id === action.result.id
            ));
            const editedTodo = {...state.todos[editingIndex], title: action.result.title};
            return {
                ...state,
                todos: [
                    ...state.todos.slice(0, editingIndex),
                    editedTodo,
                    ...state.todos.slice(editingIndex + 1)
                ]
            };
        case TOGGLE_TODO:
            const updatingIndex = state.todos.findIndex((todo) => (
                todo.id === action.result
            ));
            const updatedTodo = {...state.todos[updatingIndex], isCompleted: !state.todos[updatingIndex].isCompleted};
            return {
                ...state,
                todos: [
                    ...state.todos.slice(0, updatingIndex),
                    updatedTodo,
                    ...state.todos.slice(updatingIndex + 1)
                ]
            };
        case FILTER_TODO:
            return {
                ...state,
                visibility: action.result
            };
        case CLEAR_COMPLETED:
            return {
                ...state,
                todos: state.todos.filter((todo) => !todo.isCompleted)
            };
        default:
            return state;
    }
}

export function addTodo(result) {
    return {
        type: ADD_TODO,
        result
    }
}
export function deleteTodo(result) {
    return {
        type: DELETE_TODO,
        result
    }
}
export function editTodo(result) {
    return {
        type: EDIT_TODO,
        result
    }
}
export function toggleTodo(result) {
    return {
        type: TOGGLE_TODO,
        result
    }
}
export function filterTodo(result) {
    return {
        type: FILTER_TODO,
        result
    }
}
export function clearCompletedTodos() {
    return {
        type: CLEAR_COMPLETED
    }
}

