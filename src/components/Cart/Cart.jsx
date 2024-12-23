import React, { useEffect, useState } from "react";
// import { LockOutlined } from "@mui/icons-material";
import { MdLockOutline } from "react-icons/md";
import { Helmet } from "react-helmet";
import {getCartItems} from "../../Redux-Toolkit/cart"
// import productImage from "../../../Images/category.jpeg";
import { useDispatch, useSelector } from "react-redux";
import Spiner from "../Loading/Spinner";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const Cart = () => {
  const [total , setTotal] = useState(0)
  // const [empty , setEmpty] = useState(false)
  const dispatch = useDispatch()
  const items = useSelector(state=>state.cart.cartItems)
  const currencyFormatter = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };
  useEffect(()=>{
dispatch(getCartItems())
  },[dispatch])
  useEffect(() => {
    const calculateTotal = () => {
      const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      setTotal(totalPrice);
    };

    calculateTotal();
  }, [items]);

if(!items ){
  return(
    <Spiner/>
  )
}else if(items.length === 0){
  // setEmpty(true)
  return(
    <>
    <div className="flex flex-wrap w-full h-[100vh] pt-24 justify-center items-center text-xl  md:text-2xl text-slate-800 font-semibold" >
    <p>
    Cart Empty ! Add Some Items
      </p> 
      <div>
    <Link to={"/"} className="rounded-xl mx-5 mt-4 p-3 font-semibold bg-[#df9023] text-white" >
      Go To Product Page
      </Link></div> 
    </div>
   
   
    </>
  )
}
 const cartClear = ()=>{
  localStorage.setItem("cart", [])
  toast.success('Cart Empty ! ', {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    
    });
 }


  return (
    <>
<Helmet>
        <title>Cart</title>
      </Helmet>
      <section className="bg-white" >
        <div className="bg-slate-200 ">
          <div className=" md:flex w-full pt-24  ">
            <div className="items w-full mt-5  md:w-[65%] p-1 bg-white md:mx-1 mx-auto   h-full ">
              <div className="products">
                <div className="product  ">
                  <div className="address ">
                    <h1 className="text-4xl w-full  ">Deliver To : Rohtak </h1>
                  </div>
                  {items.map((items)=>(
                 
                  <div key={items.id} className=" ml-3 my-2  item border-2 flex place-content-start ">
                    <div className="image">
                      <img src={items.image} className="object-contain" title={items.title} alt="loading.." width={60} />
                    </div>
                    <div className="details ml-8 ">
                      <p className="title">{items.title}</p>
                      <p className="price">{currencyFormatter(items.price)}</p>
                    </div>
                  </div>
               ))}
                </div>
              </div>
            </div>

            <div className="details md:w-[35%] w-full mt-5 rounded-md p-1 bg-white md:mx-1 mx-auto  h-72 ">
              <div className="font-semibold">
                <h2 className=" flex justify-center">PRICE DETAILS</h2>
                <div className="flex place-content-around">
                  <p>Price ({items.length} items) </p>
                  <span className="ml-10"> {currencyFormatter(total)} </span>
                </div>
                <div className="flex place-content-around">
                  <p> Discount</p>
                  <span className=" ml-[5.6rem] text-green-600 ">
                    
                    -{currencyFormatter(0)}
                  </span>
                </div>
                <div className="flex place-content-around">
                  <p>Delivery Chareges </p>
                  <span className="line-through mx-1 ml-10">
                    {currencyFormatter(240)}
                    <span className="text-green-400 line-"></span>
                  </span>
                </div>
                <div className="flex place-content-around">
                  Secured Packanging
                  <span className="ml-2 "> Fee {currencyFormatter(5)}</span>
                </div>
                <hr className="bg-slate-900 pt-[1px] " />
                <div className=" text-xl flex place-content-around ">
                  Total Amount
                  <span className="ml-4"> {currencyFormatter(total + 5)}</span>
                </div>
                <hr className="bg-slate-900 pt-[1px] " />
                <div className="ml-16 mt-2 ">
                  You will save
                  <span className="text-green-600   ">
                    {currencyFormatter(0)}
                  </span>
                    on this order
                </div>
                <div className="flex place-content-evenly mt-3">
                  <span className=" flex items-center">{<MdLockOutline />}</span>
                  <span className="text-sm">
                    <p>Safe and Secure Payments</p>
                    <p>Easy returns</p>
                    <p> 100% Authentic products </p>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="buttons flex  place-content-around m-2 ">
            <button onClick={cartClear} className=" rounded-xl p-3 font-semibold bg-[#df9023] text-white ">
              Clear Cart
            </button>
            <button className=" rounded-xl p-3 font-semibold bg-[#df9023] text-white ">
              Checkout
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
