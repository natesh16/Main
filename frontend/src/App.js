import React from 'react'
import './App.css'
import Headers from './components/layouts/Header'
import Footer from './components/layouts/Footer'
import Home from './components/Home'
import ProductDetails from "./components/products/ProductDetails";
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import ProductSearch from './components/products/ProductSearch'
const App = () => {
  return(
  <Router>
    <div className='contanier contanier-fluid'>
      <HelmetProvider>
          <Headers/>
            <ToastContainer theme='dark'/>
              <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/search/:keyword' element={<ProductSearch/>}/>
                <Route path='/product/:id' element={<ProductDetails/>}/>
              </Routes>
          <Footer/>
      </HelmetProvider>
    </div>
  </Router>    
  
  )
}
export default App