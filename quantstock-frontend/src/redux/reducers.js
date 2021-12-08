import { combineReducers } from 'redux'


const loggedReducer = (state = false, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return !state;
        default:
            return state;
    }
}




const counterReducer = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + action.payload;
        case 'DECREMENT':
            return state - action.payload;
        default:
            return state;
    }
}


const bankReducer = (
    state = 0,
    action
) => {
    switch (action.type) {
        case "deposit":
            return state + action.payload;
        case "withdraw":
            return state - action.payload
        default:
            return state
    }
}


const logReducer = (
    state = null,
    action
) => {
    switch (action.type) {
        case "login":
            return state + action.payload;
        case "withdraw":
            return state - action.payload
        default:
            return state
    }
}



const allReducers = combineReducers({
    counter: counterReducer,
    logged: loggedReducer,
    bank: bankReducer
})


export default allReducers;