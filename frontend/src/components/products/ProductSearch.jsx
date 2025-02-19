import { Fragment, useEffect, useState } from "react";
import Metadata from ".././layouts/MetaDatas";
import Product from '../products/Product'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from "../../actions/productsAction";
import Loader from ".././layouts/Loader";
import { toast } from "react-toastify";
import Pagination from 'react-js-pagination'
import { useParams } from "react-router-dom";
import Slider from 'rc-slider';
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css"
import 'rc-slider/assets/index.css';

export default function ProductSearch() {
    const dispach = useDispatch()
    const { keyword } = useParams();
    const { products, loading, error, productsCount, resPerPage } = useSelector((state) => state.productsState)
    const [CurrentPage, SetCurrentPage] = useState(1)
    const [Price, SetPrice] = useState([1, 1000])
    const [PriceChanged, SetPriceChaged] = useState(Price)

    const SetcurrentpageNo = (pageNo) => {
        SetCurrentPage(pageNo)
    }

    const categories = [
        'Electronics',
        'Mobile Phones',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home'
    ]

    useEffect(() => {
        if (error) {
            return toast.success(error)
        }
        dispach(getProducts(keyword, Price, CurrentPage))
    }, [error, dispach, CurrentPage, keyword, PriceChanged])

    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <Metadata title={'product'} />
                    <h1 id="products_heading">Search Product</h1>
                    <section id="products" className="container h-100 mt-5">
                        <div className="row ">
                            <div className="col-6 col-md-2 mb-5 mt-5">
                                {/*Price filter*/}
                                <div className="px-5" onMouseUp={() => SetPriceChaged(Price)}>
                                    <Slider
                                        range={true}
                                        marks={{
                                            1: "$1",
                                            1000: "$1000"
                                        }}
                                        min={1}
                                        max={1000}
                                        onChange={(Price) => {
                                            SetPrice(Price)
                                        }}
                                        defaultValue={Price}

                                        handleRender={
                                            rederprops => {
                                                return (
                                                    <Tooltip overlay={` $${rederprops.props['aria-valuenow']}`}>
                                                        <div {...rederprops.props} ></div>
                                                    </Tooltip>
                                                )
                                            }
                                        }
                                    />
                                </div>

                                <hr className=" my-5" />

                                {/*catagory fileter */}
                                <div className=" mt-2">
                                    <h3 className="mb-3">Catagories</h3>
                                    {categories.map(category => (
                                        <ul className="">
                                            <li
                                                style={{
                                                    cursor: "pointer",
                                                    listStyleType: "none"
                                                }}
                                            >
                                                {category}
                                            </li>
                                        </ul>
                                    ))}
                                </div>
                            </div>
                            q{products && products.map(product => (
                                <Product col={3} key={product._id} product={product} />
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
                            : null}
                </Fragment>
            }
        </Fragment>
    )
}