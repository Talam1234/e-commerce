// createStore is replace by configureStore and combineReducers and applymiddleware is 
//not in use now

// import {configureStore, combineReducers, applyMiddleware} from 'redux'
import {configureStore, combineReducers} from '@reduxjs/toolkit'
import { productsDetailReducer, productsReducer } from './reducers/productReducer';
//import thunk from 'redux-thunk'
//import {composeWithDevTools} from 'redux-devtools-extension'

//const reducer = combineReducers({});
const combinedreducer = combineReducers({
    products:productsReducer,
    productDetail:productsDetailReducer
})
// let initialState = {};
//const middleware = [thunk];

//const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))
const store = configureStore({
    reducer:combinedreducer
    // {
    //     products:productsReducer,
    //     productDetail:productsDetailReducer
    // },
    // initialState
})

export default store