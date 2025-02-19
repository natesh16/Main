import axios from 'axios';
import { productsFail, productsRequest, productsSuccess } from '../components/slices/productsSlices'
export const getProducts=(keyword,Price,CurrentPage)=>async(dispach)=>{
    try {
        dispach(productsRequest())
        let link =`/nscart/products?page=${CurrentPage}`;
        if(keyword){
            link+=`&keyword=${keyword}`
        }
        if(Price){
            link+=`&price[gte]=${Price[0]}&&price[lte]=${Price[1]}`
        }
        const{ data } = await axios.get(link)
        dispach(productsSuccess(data))
    } catch (error) {
        //handel error
        dispach(productsFail(error.response.data.message))
   }
}
