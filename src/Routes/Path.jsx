import React ,{Suspense , lazy} from 'react'
import Header from '../components/Header/Header'
// import Footer from '../../Components/Footer'
import { Routes, Route } from "react-router-dom";
import Spinner from "../components/Loading/Spinner"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import AllProducts from '../Pages/Products/AllProducts';

// import Signup from '../Pages/Auth/Signup';
const PageNotFound = lazy(()=>import('../components/Error/PageNotFound'))
// const Term = lazy(()=>import("../Pages/CompanyHelp/Terms"))
// const FAndQ = lazy(()=>import("../Pages/CompanyHelp/FAndQ"))
// const About = lazy(()=>import("../Pages/CompanyHelp/About"))
// const Help = lazy(()=>import('../Pages/CompanyHelp/Help'))
const Home = lazy(()=>import("../components/Home/Home"))
const Cart = lazy(()=>import("../components/Cart/Cart"))
const Login = lazy(()=>import("../components/Auth/Login"))
const Signup = lazy(()=>import("../components/Auth/Signup"))
const Products = lazy(()=>import("../components/Home/Products"))
const Product = lazy(()=>import("../components/ProductPages/Product"))
// const CategoryProducts = lazy(()=>import('../Pages/Products/CategoryProducts'))




const Path = () => {
  return (
    <>
    <Suspense fallback={<Spinner/>} >
    <Header/>
    {/* <Signup/> */}
    <Routes>
      <Route path='/' element={<Home/>} />
      {/* <Route path='/products/:category' element = {<CategoryProducts/>}/> */}
      {/* <Route path='/product/:title' element = {<Product/>}/> */}
      <Route path='/cart' element = {<Cart/>}/>
      <Route path='/login' element = {<Login/>}/>
      <Route path='/signup' element = {<Signup/>}/>
      <Route path='/products' element = {<Products/>}/>
      <Route path='/products/:title' element = {<Product/>}/>


      {/* <Route path='/help' element = {<Help/>}/>
      <Route path='/term' element = {<Term/>}/>
      <Route path='/fandq' element = {<FAndQ/>}/>
      <Route path='/about' element = {<About/>}/> */}
      <Route path='*' element = {<PageNotFound/>}/>
    </Routes>
      <ToastContainer />
    {/* <Footer/> */}
    </Suspense>
    </>
  )
}

export default Path