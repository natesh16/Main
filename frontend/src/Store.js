import {combineReducers, configureStore} from "@reduxjs/toolkit"
import ProductsReducer from './components/slices/productsSlices'
import ProductReducer from './components/slices/productSlices'
// import thunk  from "redux-thunk";
const reducer =combineReducers({
    productsState:ProductsReducer,
    productState:ProductReducer
})

const store=configureStore({
    reducer,
    // middleware:[thunk]
})

export default store;