import axios from 'axios'
import { productsFail, productsRequest, productsSuccess } from '../components/slices/productsSlices'
export const getProducts=async(dispach)=>{
    try {
        dispach(productsRequest())
        const{ data } = await axios.get('/nscart/products')
        dispach(productsSuccess(data))
    } catch (error) {
        //handel error
        dispach(productsFail(error.response.data.message))
   }
} 