import {useNavigate} from 'react-router-dom'
import { useState } from 'react'
export default function Search() {

    const [keyword,setkeyword]=useState('')
    const navigate=useNavigate()
    const Searchandler=(e)=>{
        e.preventDefault();
        navigate(`/search/${keyword}`) 
    }
    return (

    <form action="" onSubmit={Searchandler}>
        <div className="input-group" >
            <input
                type="text"
                id="search_field"
                className="form-control"
                autocomplete="off"
                onChange={(e)=>setkeyword(e.target.value)}
                value={keyword}
                placeholder="Enter Product Name ..."/>
            
                <div className="input-group-append">
                    <button id="search_btn" className="btn">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
        </div>
    </form>
    )
}