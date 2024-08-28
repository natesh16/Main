import axios from 'axios'
import { productFail, productRequest, productSuccess } from '../components/slices/productSlices'
export const getProduct=id=>async(dispach)=>{
    try {
        dispach(productRequest())
        const{ data } = await axios.get(`/nscart/product/${id}`)
        dispach(productSuccess(data))
    } catch (error) {
        //handel error
        dispach(productFail(error.response.data.message))
   }
} 