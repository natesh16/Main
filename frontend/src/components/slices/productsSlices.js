import { createSlice } from "@reduxjs/toolkit";

const productsSlice=createSlice({
    name:'products',
    initialState:{
        loading:false
    },
    reducers:{
        productsRequest(state,action){
            return {
                loading:true
            }
        },
        productsSuccess(state,action){
            return {
                loading:false,
                products:action.payload.products,
                productCount:action.payload.count
            }
        },
        productsFail(state,action){
            return {
                loading:false,
                error:action.payload
            }
        }
    }
})

const {actions,reducer}=productsSlice
export const {productsRequest,productsFail,productsSuccess} = actions
export default reducer