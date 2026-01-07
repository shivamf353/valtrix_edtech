import React from 'react'
import { Link } from 'react-router-dom'
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import { useLocation , matchPath } from 'react-router-dom'
import { useState, useEffect } from "react";
import { useSelector ,useDispatch} from "react-redux"
import { AiOutlineShoppingCart  } from 'react-icons/ai';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsChevronDown } from "react-icons/bs"
import apiconector from "../../apiService/apiconector"
import { categories } from '../../apiService/apisurl';
import ProfileDropdown from '../auth/Profiledropdown';


const Navbar = () => {
  const Location=useLocation();

 const NavbarLinks = [{
    title: "Home",
    path: "/"},
  {
    title: "Catalog",
    // path: '/catalog',
  },
  {
    title: "About Us",
    path: "/about",
  },
  {
    title: "Contact Us",
    path: "/contact",
  }];

  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)

  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [sublinks, setsublinks]=useState([])


  async function fatchCategry(){
    try {
      console.log( categories.CATEGORIES_API );
      const res= await apiconector("GET" , categories.CATEGORIES_API )
      setsublinks(res.data.allcategory)
       console.log("categary fatched in nevbar-catlog");
      
    } 
    catch (error) {
      console.log("sublinks from nevbar -catlog have issue")
      console.log (error)
    }
  }

  useEffect( ()=>{
   fatchCategry()
  },[])

  
  
   useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // scrolling down → hide nav
        setShowNav(false);
      } else {
        // scrolling up → show nav
        setShowNav(true);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);


  const matchRoute = (route) => {
    return matchPath({ path: route }, Location.pathname)
  }

  return (
   <div className={`h-13 w-full fixed top-0 left-0 z-40 flex justify-center border-b-2 border-richblack-300 items-center bg-richblack-900 transition-transform duration-300 ${showNav ? "translate-y-0" : "-translate-y-full"}`}>
        <div className='w-11/12  flex justify-between items-center text-sm'>
           <div className=''>
            <Link to="/about">
              <img src={Logo} alt="logo" width={150} height={100} />
            </Link>
           </div>

           
            <div className=''>
              <ul className='flex gap-3 '>
                {NavbarLinks.map((elment,index)=>(
                  <li key ={index} className="  flex items-center hover:scale-95 transition-all duration-200  h-11 ">
                    { elment.title=== "Catalog"?(
                    
                       <div className="relative z-50 h-9 items-center flex group">
                          <div
                            className={`flex cursor-pointer items-center gap-1 ${
                              matchRoute("/catalog/:catalogName")
                                ? "text-yellow-25"
                                : "text-richblack-25"
                            }`}
                          >
                            <p>{elment.title}</p>
                            <BsChevronDown />
                          </div>

                          {/* Popup */}
                          <div
                            className="absolute left-0 top-full pt-2 hidden group-hover:flex flex-col bg-richblack-800 text-richblack-5 shadow-lg rounded-lg w-52 border border-richblack-700 p-2"
                          >
                            {sublinks.length > 0 ? (
                              sublinks.map((cat, i) => (
                                <Link
                                  key={i}
                                  to={`/catalog/${cat.name}`}
                                  className="p-2 hover:bg-richblack-700 rounded-md transition-all duration-150"
                                >
                                  {cat.name}
                                </Link>
                              ))
                            ) : (
                              <p className="p-2 text-sm text-richblack-200">Loading...</p>
                            )}
                          </div>
                        </div>
                    )
                    
                    :(
                    <Link to ={elment?.path} className={`${ matchRoute(elment?.path)
                                                            ? "text-yellow-25"
                                                            : "text-richblack-25" }
                                                        `}
                     >
                      <div>
                        {elment.title}
                      </div>
                    </Link>)}
                  </li>
              ))}
              </ul>
            </div>

       {/* login ,signin button      */}
         
          {token === null && (
            <div className='flex gap-2'>
              <Link to="/login">
                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                  Log in
                </button>
              </Link>

              <Link to="/signup">
                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                  Sign up
                </button>
              </Link>
            </div>
          )}

         {/* when token is not null any user */}
          
                {token !== null && <ProfileDropdown />}

               

                

      
              
    </div>   
   </div>
  )}

export default Navbar
