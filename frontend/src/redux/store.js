import {applyMiddleware, combineReducers, createStore} from 'redux'
import {getUserReducer} from './reducer'
import thunk from 'redux-thunk'

let reducers=combineReducers({
    getUserReducer
})

export let store=createStore(reducers,applyMiddleware(thunk))