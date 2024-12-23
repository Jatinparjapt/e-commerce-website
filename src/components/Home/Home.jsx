import React, {Suspense, lazy }  from 'react'
import { Helmet } from 'react-helmet'
import Spinner from "../Loading/Spinner"


const Products = lazy(()=>import("./Products"))
const Slider = lazy(()=>import("./Slider"))

const Home = () => {
  return (
    <>
       <Helmet>
        <title>Home</title>
      </Helmet>
      <Suspense fallback={<Spinner/>} >
      <Slider/> 
      <Products/>
    </Suspense>
    
    
    </>
  )
}

export default Home