import "./App.css";
import React ,{ useEffect } from 'react';
import Header from './component/layout/Header/Header.js';
import {
  BrowserRouter,
  Routes,
  Route
  
} from "react-router-dom";
import WebFont from "webfontloader";
import Search from './component/Job/Search.js'
import LoginSignUp from "./component/User/LoginSignUp.js";
import store from './store.js'
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import Profile from './component/User/Profile.js'
import PrivateWrapper from './component/Route/PrivateWrapper.js'
import UpdateProfile from './component/User/UpdateProfile.js'
import UpdatePassword from './component/User/UpdatePassword.js'
import Jobs from './component/Job/Jobs.js'
import JobDetailss from './component/Job/JobDetailss.js'



import Contact from "./component/layout/Contact/Contact.js";
import About from "./component/layout/About/About.js";

function App() {
  

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser()) 
    
  }, []);
  console.warn = () => {};
  window.addEventListener("contextmenu",(e)=>e.preventDefault()) // no right click

  return (
   <>
   <BrowserRouter>
    <Header/>
   
    <Routes>
      <Route  exact path="/" element={<Search/>} />
      
      <Route  exact path='/login' element={<LoginSignUp/>} />
      <Route  exact path="/jobs" element={<Jobs/>} />
      <Route  exact path="/job/:id" element={<JobDetailss/>} />
      <Route   path="/jobs/:keyword" element={<Jobs/>} />
      <Route  exact path="/about" element={<About/>} />
      <Route  exact path="/contact" element={<Contact/>} />
   
          <Route  element={<PrivateWrapper />}>
            <Route path="/account" element={ <Profile />}/>
            <Route path="/me/update" element={ <UpdateProfile />}/>
            <Route path="/password/update" element={ <UpdatePassword />}/>
          



          </Route>  

     </Routes>
   </BrowserRouter>

   </>
  );
}

export default App;
