import React, { useRef } from 'react';
import { useSelector ,useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import { useNavigate  } from 'react-router-dom';
import { IoStar } from "react-icons/io5";
import { IoStarHalfSharp } from "react-icons/io5";
import {setCartItems} from "../../Redux-Toolkit/cart"
import Spinner from '../Loading/Spinner';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify'
// import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
const Product = () => {
//   const handlePayment = async () => {
//     try {
//       // Fetch order ID from backend
//       const { data } = await axios.post('http://localhost:8000/api/payment', { amount: 500 }); // Amount in INR

//       const options = {
//         key: 'rzp_test_CNuFlAHNYGB5NL', // replace with your Razorpay key ID
//         amount: 50000, // Amount in paise
//         currency: 'INR',
//         name: 'Acme Corp',
//         description: 'Test Transaction',
//         order_id: data.orderId,
//         handler: (response) => {
//           alert(`Payment successful: ${response.razorpay_payment_id}`);
//         },
//         prefill: {
//           name: 'Gaurav Kumar',
//           email: 'gaurav.kumar@example.com',
//           contact: '9000090000',
//         },
//         theme: {
//           color: '#3399cc',
//         },
//       };

//       const razorpay = new window.Razorpay(options);
//       razorpay.open();
//     } catch (error) {
//       console.error('Error during payment initialization', error);
//     }
//   };
  const dialogRef = useRef(null);
  const navigate = useNavigate()
  const dispatch
   = useDispatch()
  const product = useSelector(state=>state.getProducts.productDetails)
  console.log(product, "product page")
  // currencyFormatter
  const currencyFormatter = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };
 

  const showDialog = () => {
    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    dialogRef.current.close();
  };

  const confirmPurchase = () => {
    const cookie = Cookies.get("token")
  if(!cookie){
    toast.warn('User Not Found ', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      
      });
    navigate("/signup")
  }
    toast.info('Purchase confirmed! ', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      
      });
    closeDialog();
  };
  // console.log(product)
const checkUserAndAddToCart = (id, image , title , price)=>{
  const cookie = Cookies.get("token")
  if(!cookie){
    toast.warn('User Not Found ', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      
      });
    navigate("/signup")
  }else{
    
    dispatch(setCartItems({id,image, title , price ,quantity: 1}))
    toast.success('Added To Cart  ', {
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
}
  if(!product){
    return(
      <Spinner/>
    )
  }
  const {category , description ,id,  image, price, rating, title}= product
  return (
    <>
    <Helmet>
        <title>{title}</title>
      </Helmet>
    <section className='  bg-slate-200 pt-28 h-auto pb-10 shadow-2xl ' >
      <div className="main bg-white shadow-2xl pb-10 h-auto md:mx-20 -m-0  ">
        <div className="product flex flex-wrap md:place-content-evenly mx-2 md:mx-0 ">

          <div className="first md:w-[42%] w-full mr-1 h-[50vh] mt-10 flex justify-center ">
           <img src={image} className='object-contain mix-blend-multiply  ' alt="laoding" />
          </div>
          <div className="second md:w-[50%] ">
            <div>
              <div className="desc">
                <h1 className='text-4xl mt-5' >{title}</h1>
                <div className="rating flex items-center gap-3 ">
                <h2 className={ ` rounded-lg flex justify-center  w-[16%] ${rating.rate>3.5? "bg-green-600 text-white":"bg-red-600 text-white" }  text-xl`} >
              {rating.rate} { rating.rate>3.5?<IoStar/>: <IoStarHalfSharp className='text-xl' />}
              
            </h2><h3 className="text-slate-700 font-bold "> Rating {rating.count}+ </h3>
            </div>
               <p>{description}</p>
               <p className='font-bold' >Category - {category} </p>
               <p className='text-3xl font-semibold ' >{currencyFormatter(price)}</p>
              </div>
              
            </div>
            <div className="container mx-auto p-4">
    

      <dialog ref={dialogRef} className="p-6 bg-white rounded-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Are you sure you want to buy this?</h2>
        <div className="flex justify-end space-x-4">
          <button
            onClick={confirmPurchase}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Yes
          </button>
          <button
            onClick={closeDialog}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            No
          </button>
        </div>
      </dialog>
    </div>
        <div className="buttons md:mt-20   my-4 flex items-end w-full   ">
          <button  onClick={()=>{checkUserAndAddToCart(id, image,title,price)}} className='py-2 px-7 mr-2  shadow-2xl bg-slate-300 text-blue-700 font-semibold hover:text-white hover:bg-blue-500 rounded-lg'  type="button"> Add To Cart </button>
          <button   className='py-2 px-7 mx-2 shadow-2xl bg-slate-300 text-blue-700 font-semibold hover:text-white hover:bg-blue-500 rounded-lg'  type="button">Buy Now</button>
          </div>
        </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default Product