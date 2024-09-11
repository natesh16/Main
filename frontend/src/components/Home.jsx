import { Fragment, useEffect, useState } from "react";
import Metadata from "./layouts/MetaDatas";
import  Product  from './products/Product'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from "../actions/productsAction";
import Loader from "./layouts/Loader";
import { toast } from "react-toastify";
import Pagination from 'react-js-pagination'

export default function Home(){
    const { products,loading,error,productsCount,resPerPage } =useSelector((state)=>state.productsState)
    const [ CurrentPage,SetCurrentPage ]=useState(1)

    const SetcurrentpageNo=(pageNo)=>{
        SetCurrentPage(pageNo)
    }


const dispach=useDispatch()
    useEffect(()=>{
        if(error){
           return toast.success(error)
        }
            dispach(getProducts)
    },[error,dispach])
    return(
        <Fragment>
            {loading ? <Loader/> :
            <Fragment>
                <Metadata title={"Buy Your best"}/>
                    <h1 id="products_heading">Latest Products</h1>
                    <section id="products" className="container h-100 mt-5">
                    <div className="row h-100">
                        {products && products.map(product=>(
                           <Product key={product._id} product={product}/>
                        ))}
                    </div>
                    </section>
                        <div className=" d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={CurrentPage}
                                onChage={SetcurrentpageNo}
                                totlaItemsCount={productsCount}
                                ItemsCountPerPage={resPerPage}
                            />
                        </div>
                </Fragment>
                }
        </Fragment>
    )
}