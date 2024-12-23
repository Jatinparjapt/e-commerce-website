import React,{useEffect ,useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineFavorite } from 'react-icons/md';
import {Link,useParams} from "react-router-dom"
import { selectSearchTerm } from '../../Redux-Toolkit/search';
import { IoStar } from "react-icons/io5";
import Spinner from '../Loading/Spinner';
import { IoStarHalfSharp } from "react-icons/io5";
import { Helmet } from "react-helmet";
import { getAllProducts ,getProductById } from '../../Redux-Toolkit/products';
const Products = () => {
    const {category} = useParams()
  const dispatch = useDispatch();
  const products = useSelector((state) => state.getProducts.products);
//   console.log(products, "products")
  const searchTerm = useSelector(selectSearchTerm);
  // console.log(searchTerm)
  const [selectedCategory, setSelectedCategory] = useState('allProduct');
  // const category = useSelector(state=>state.getCategory.categoriesData)

  // console.log(products, "form home pages")
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  if(!products){
    return (
        <>
            <Spinner/>
        </>
    )
  }else{
    const currencyFormatter = (amount) => {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
      };
      const getProudctById = (id) => {
        dispatch(getProductById(id));
      };
      const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
      };
    const filter = products.filter(product => {
        if (selectedCategory !== 'allProduct' && product.category !== selectedCategory) {
          return false;
        }
        if (searchTerm && !product.title.toLowerCase().includes(searchTerm.toLowerCase())) {
          return false;
        }
        if (category && product.category !== category) { // Check against category parameter
          return false;
        }
        return true;
       
      });
 console.log(filter ,"fiter")
    
  return (
    <>
     <Helmet>
        <title>Home</title>
      </Helmet>
        <section className="mx-2 pt-20 ">
          <div className="main md:flex ">
    <div className="filter  px-6 ">
            
            <div>
              <div className="filterDiv w-full flex place-content-evenly rounded-lg bg-purple-300 text-purple-700  text-4xl font-bold  ">
                <h1 className="">Filter</h1>
                <p>Proudcts</p>
              </div>
              <hr className="bg-slate-900 my-3 pt-[1px] " />
              <div className="text-xl mt-3 ">
              <select onChange={handleCategoryChange} value={selectedCategory} name="cars" id="cars">
                <option value="allProduct" >All</option>
<option value="electronics">Electronics</option>
<option value="jewelery">Jewelery</option>
<option value="men's clothing">Men's Clothing</option>
<option value="women's clothing">Woman's Clothing</option>
</select>    
              </div>
            </div>
          </div>
    <div className="items">
              <div className=" flex flex-wrap gap-4 w-full h-full ">
                {filter.map((items) => (
                  <div className=" shadow-2xl h-auto sm:w-60  md:w-72 mx-auto my-2  ">
                    <div className="flex justify-end w-full ">
                      <MdOutlineFavorite className="mr-7 mt-3 hover:text-[#2874f0]" />
                    </div>
                    <Link
                      onClick={() => {
                        getProudctById(items.id);
                      }}
                      to={`/products/${items.title}`}
                    >
                      <div>
                        <div
                          key={items.id}
                          className="flex w-full justify-center "
                        >
                          <img
                            className=" object-contain w-auto mix-blend-multiply  rounded-2xl h-[18rem] "
                            title={items.title}
                            src={items.image}
                            alt="loading.."
                            loading="lazy"
                          />
                        </div>
                        <div className="content ml-3 font-semibold ">
                          <div
                            className={`${
                              items.rating.rate < 3.5
                                ? "text-red-600"
                                : "text-green-600"
                            }`}
                          >
                            
                            <p className={ ` rounded-lg flex justify-center  w-[20%] ${items.rating.rate>3.5? "bg-green-600 text-white":"bg-red-600 text-white" }  text-xl`} >
              {items.rating.rate} {items.rating.rate>3.5?<IoStar/>: <IoStarHalfSharp className='text-xs' />}
            </p>
                          </div>
                          <p className="text-xl" >{items.title}</p>
                          <p className="text-2xl"  >{currencyFormatter(items.price)}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            </div>
            </section>
    </>
  )}
}

export default Products