import axios from 'axios'
import { productsFail, productsRequest, productsSuccess } from '../slices/productsSlices'
export const getProducts=(keyword,CurrentPage)=async(dispach)=>{
    try {
        dispach(productsRequest())
        const{ data } = await axios.get(`/nscart/product?page=${CurrentPage}`)
        dispach(productsSuccess(data))
    } catch (error) {
        //handel error
        dispach(productsFail(error.response.data.message))
   }
} 