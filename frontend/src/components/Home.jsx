import { Fragment, useEffect } from "react";
import Metadata from "./layouts/metaDatas";
import  Product  from './products/Product'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from "../actions/productsAction";
import Loader from "./layouts/Loader";
import { toast } from "react-toastify";
export default function Home(){
    const { products,loading,error } =useSelector((state)=>state.productsState)
const dispach=useDispatch()
    useEffect(()=>{
        if(error){
           return toast.success(error)
        }
            dispach(getProducts)
    },[error])
    return(
        <Fragment>
            {loading ? <Loader/> :
            <Fragment>
                <Metadata title={"Buy Your best"}/>
                    <h1 id="products_heading">Latest Products</h1>
                    <section id="products" className="container h-100 mt-5">
                    <div className="row h-100">
                        {products && products.map(product=>(
                           <Product product={product}/>
                        ))}
                    </div>
                    </section>
                </Fragment>
                }
        </Fragment>
    )
}