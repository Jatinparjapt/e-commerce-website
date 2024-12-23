import React, { useState,useEffect } from 'react'
import { VscAccount } from "react-icons/vsc";
import { MdFavoriteBorder } from "react-icons/md";
import { IoMdCart } from "react-icons/io";
import { MdLocalShipping } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoCloseSharp } from 'react-icons/io5';
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch  ,useSelector} from 'react-redux';
import { setSearchTerm , selectSearchTerm } from '../../Redux-Toolkit/search';
const Header = () => {
    const dispatch = useDispatch()
    const [hamburger, setHamburger] = useState(false);
  const [showAnimation, setShowAnimation] = useState("navbarTr");

  const handleHamburger = () => {
    if (hamburger) {
      setShowAnimation('navbarClose');
      setTimeout(() => {
        setHamburger(false);
        setShowAnimation('navbarTr');
      }, 1000); // Duration of the slideOut animation
    } else {
      setHamburger(true);
    }
  };
    // const mangeAnimation = ()=>{
    //     setHamburger(!hamburger)
    //     setShowAnimation("navbarClose")
    //     setTimeout(() => {
    //         setShowAnimation("navbarTr")
    //     }, 2000);
    // }
    const searchTerm = useSelector(selectSearchTerm);
    const handleSearch = (event) => {
        dispatch(setSearchTerm(event.target.value));
        // console.log(event.target.value)
      };

  return (
    <>
    <header className='w-full ' >
    <header className='bg-purple-600 text-white relative  ' >
        <nav className='flex place-content-between py-3 px-2  w-[95%] mx-auto ' >
            <div>
                <div className='hidden sm:block' >
                    <IoIosSearch className='absolute text-xl text-black mt-[1px]  ' />
                <input autoFocus  value={searchTerm || ''} onChange={handleSearch} type="text" name="search" id="search" className='pl-6 rounded-xl text-black ' placeholder='Search' />
                </div>
                <div onClick={handleHamburger} className='block sm:hidden text-3xl ' >
                    {hamburger ? <><GiHamburgerMenu   /> </>:  <IoCloseSharp/> }
               
              
                </div>
            </div>
            <div>
                <Link to={"/"} className='text-2xl text-purple-900 italic' >
                Mytalorzone
                </Link>
            </div>
            <div className='flex gap-3 text-3xl ' >
                <Link to={"/signup"} className='hidden md:inline' ><VscAccount/></Link>
                <Link to={"/cart"} ><MdFavoriteBorder/></Link>
                <Link to={"/cart"} ><IoMdCart/></Link>
                <div className='hidden md:inline' ><MdLocalShipping/></div>
            </div>
        </nav>
        {/* 2nd Navbar */}
        <nav className='sm:flex hidden pb-4 ' >
            <ul className='flex mx-auto  items-center sm:gap-6 justify-center flex-wrap  '>
                <Link to={"products"} className='hover-border' >NEW ARRIVALS</Link>
                <Link to={"products"} className='hover-border' >SALE</Link>
                <Link to={"products"} className='hover-border' >ETHNIC WEAR</Link>
                <Link to={"products"} className='hover-border' >BEST SELLERS</Link>
                <Link to={"products"} className='hover-border' >DRESSES </Link>
                <Link to={"products"} className='hover-border' >CO-ORDS & JUMPSUITS</Link>
                <Link to={"products"} className='hover-border' >TOPS&SHIRTS</Link>
                <Link to={"products"} className='hover-border' >UNDER 1499 STORE</Link>
            </ul>
        </nav>
        <div>
            {/* Search On Small Size  */}
        <div className='sm:hidden flex items-center  ' >
                    <IoIosSearch className='absolute text-xl left-2 mb-2  ' />
                <input autoFocus value={searchTerm || ''} onChange={handleSearch}  type="text" name="search" id="search" className='pl-6 py-1 text-black rounded-lg mb-2 w-[98%] mx-auto ' placeholder='Search' />
                </div>
        </div>

        {/* Show Menu on Small Screen Size */}
        <nav className={`${!hamburger?"block":"hidden"} md:hidden overflow-y-scroll   ${showAnimation}  snap-y h-[100vh] w-[65%] rounded-base absolute top-0 px-3 py-2 z-10  bg-gray-200`} >
            <div className='flex justify-end mr-5 mb-3 mt-1' >
                <button className='shadow-2xl shadow-gray-600 ' onClick={handleHamburger} type="button"> <AiOutlineCloseCircle className='text-3xl shadow-2xl shadow-teal-600' /> </button>
            </div>
            <div className='flex text-sm sm:text-lg list-none' >
                <Link to={"/login"}>Login</Link>
                <div className='text-slate-600' >
                |
                </div>
               
                <div>Returns&Exchange</div>
                <div className='text-slate-600' >
                |
                </div>
                <div>Track Order</div>
                <hr />
            </div>
            <div>
            <ul className='grid text-xl sm:text-2xl space-y-3 '>
                <Link to={"/products"}>NEW ARRIVALS</Link>
                <hr className='bg-blue-500 py-[1px]' />
                <Link to={"/products"}>SALE</Link>
                <hr className='bg-blue-500 py-[1px]' />
                <Link to={"/products"}>ETHNIC WEAR</Link>
                <hr className='bg-blue-500 py-[1px]' />
                <Link to={"/products"}>BEST SELLERS</Link>
                <hr className='bg-blue-500 py-[1px]' />
                <Link to={"/products"}>DRESSES </Link>
                <hr className='bg-blue-500 py-[1px]' />
                <Link to={"/products"}>CO-ORDS & JUMPSUITS</Link>
                <hr className='bg-blue-500 py-[1px]' />
                <Link to={"/products"}>TOPS&SHIRTS</Link>
                <hr className='bg-blue-500 py-[1px]' />
                <Link to={"/products"}>UNDER 1499 STORE</Link>
                <hr className='bg-blue-500 py-[1px]' />
            </ul>
            </div>
            <div className='flex list-none justify-center items-center flex-wrap gap-2 py-2 ' >
                <li>Instagram</li>
                <li>Facebook</li>
                <li>Toutube</li>
                <li>Pintrest</li>
                <li>LinkedIn</li>
            </div>
        </nav>
     </header>
    </header>
     
    </>
  )
}

export default Header