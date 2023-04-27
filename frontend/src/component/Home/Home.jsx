import React, { Fragment, useEffect } from 'react'
import {CgMouse} from 'react-icons/all'
import './Home.css'
import Product from './ProductList'
import MetaData from '../layout/MetaData'
import { getProducts } from '../../actions/productAction'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layout/Loader/Loader'
import {  toast } from 'react-toastify';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Home = () => {


const dispatch=useDispatch(); 
const {loading,error,products}=useSelector(state=>state.products);

useEffect(()=>{
    if(error){
        return toast.error(error, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }
    dispatch(getProducts());
},[dispatch,error]);
    
    
     
  return (
    <>
    {loading ? <Loader/> : (
        <Fragment>
        <MetaData title="Ecommerce"></MetaData>
        <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

        <a href="#container">
            <button>
                Scroll <CgMouse/>
            </button>
        </a>
        </div>

        <h2 className="homeHeading">
            <span>Featured Products</span>
        </h2>

        <div className="container" id="container">
        {products && products.map((item)=>(<Product product={item}/>))}
        </div>
        <ToastContainer/>
        
        </Fragment>
        
        )}

    </>
  )
}

export default Home;