import {
    applyMiddleware,
    createStore
} from "redux";
import appReducer from "./app-reducer";
import thunkMiddleware from 'redux-thunk'



const store = createStore(appReducer, applyMiddleware(thunkMiddleware))

window.store = store

export default store;
