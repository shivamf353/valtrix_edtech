import { useEffect, useState } from 'react'
import {Route,Routes} from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Home from './pages/Home'
import About from './pages/About'
import Service from './pages/Service'
import Login from './pages/login'
import './App.css'
import Navbar from './compotents/common/Navbar'
import Footer from './compotents/common/Footer'
import Signup from './pages/signup'
import Verify from './pages/verify'
import{getUserDetails} from "./apiService/apiCallCode/userapi"
import Dashboard from './pages/Dashboard'
import PrivateRoute from './compotents/auth/PrivateRoute'
import MyProfile from './compotents/Dashboard/myprofile'
import Settings from './pages/settings/settings'
import OpenRoute from './compotents/auth/openroute'
import AddCourse from "./pages/AddCourse"


function App() {
  
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.profile.user);

    function getuser(){
       if(localStorage.getItem("token")){
      console.log("from app.jsx get user data");
      const Token=JSON.parse(localStorage.getItem("token"));
      dispatch(getUserDetails(Token ,navigate));
    }
    }


  useEffect(()=>{
    getuser();
  },[])
  

  return (
    <div className='text-white bg-richblack-900 w-screen min-h-screen font-inter'>
      <Navbar></Navbar>
          <Routes>
            <Route path ="/" element={<Home/>} />
            <Route path ="/about" element= {<About/>}/>
            <Route path ="/service" element ={<Service/>}/> 
           
         
  

          <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
             
            </OpenRoute>
          }
        />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
             <Verify></Verify>
            </OpenRoute>
          }
        />

{/* private route */}


            <Route element= {<PrivateRoute> <Dashboard/> </PrivateRoute>}>
                  {/* Route for all users */}
                  <Route path="dashboard/my-profile" element={<MyProfile />} />
                  <Route path="dashboard/Settings" element={<Settings />} />

                  {/* Route only for Instructors */}
                  {user?.accountType === "Instructor" && (
                    <>
                      {/* <Route path="dashboard/instructor" element={<Instructor />} />
                      <Route path="dashboard/my-courses" element={<MyCourses />} /> */}
                      <Route path="dashboard/add-course" element={<AddCourse/>} />
                      {/* <Route
                        path="dashboard/edit-course/:courseId"
                        element={<EditCourse />}
                      /> */}
                    </>
                   )}
               
            </Route>

          </Routes>
      <Footer></Footer>
    </div>
  )
}

export default App
