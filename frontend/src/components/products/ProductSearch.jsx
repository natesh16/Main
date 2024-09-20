import { Fragment, useEffect, useState } from "react";
import Metadata from ".././layouts/MetaDatas";
import  Product  from '../products/Product'
import { useDispatch, useSelector } from 'react-redux'
// import { getProducts } from "../actions/productAction";
import { getProducts } from "../actions/productsAction";
import Loader from ".././layouts/Loader";
import { toast } from "react-toastify";
import Pagination from 'react-js-pagination'
import { useParams } from "react-router-dom";

export default function ProductSearch(){
    const {keyword}=useParams;
    const dispach=useDispatch()
    const { products,loading,error,productsCount,resPerPage } =useSelector((state)=>state.productsState)
    const [ CurrentPage,SetCurrentPage ]=useState(1)

    const SetcurrentpageNo=(pageNo)=>{
        SetCurrentPage(pageNo)
    }


    useEffect(()=>{
        if(error){
           return toast.success(error)
        }
        dispach(getProducts(CurrentPage))
    },[error,dispach,CurrentPage])
    return(
        <Fragment>
            {loading ? <Loader/> :
            <Fragment>
                <Metadata title={"Buy Your best"}/>
                    <h1 id="products_heading">Search Product</h1>
                    <section id="products" className="container h-100 mt-5">
                    <div className="row h-100">
                        {products && products.map(product=>(
                           <Product key={product._id} product={product}/>
                        ))}
                    </div>
                    </section>
                    {productsCount > 0 && productsCount > 3 ?
                        <div className=" d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={CurrentPage}
                                onChange={SetcurrentpageNo}
                                totalItemsCount={productsCount}
                                itemsCountPerPage={resPerPage}
                                nextPageText={'Next'}
                                firstPageText={'First'}
                                lastPageText={"Last"}
                                itemClass={'page-item'}
                                linkClass={'page-link'}
                            />
                        </div>
                       : null }
                </Fragment>
                }
        </Fragment>
    )
}