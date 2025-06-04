import React from 'react'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import Register from '../Auth/Register'
import { useState } from 'react'
import Login from '../Auth/Login'
import FirmRegister from '../Sidebar/FirmRegister'
import ProductRegister from '../Sidebar/ProductRegister'
import AllProduct from '../Sidebar/AllProduct'
import OwnerDetails from '../Sidebar/OwnerDetails'
import { useEffect } from 'react'
const Home = () => {
    const [register,setRegister]=useState(false);
    const [login,setLogin]=useState(false);
    const [addfirm,setAddfirm]=useState(false);
    const [addproduct,setAddproduct]=useState(false);
    const [allproduct,setAllproduct]=useState(false);
    const [ownerdetails,setOwnerdetails]=useState(true);
    const [logout,setLogout]=useState(false);
    const [showaddfirm,setShowaddfirm]=useState(false);
    useEffect(()=>{
       const token=localStorage.getItem('ownertoken')
       if(token){
        setLogout(true)
       }
    },[])
    useEffect(()=>{
        const firmid=localStorage.getItem('firmid');
        if(!firmid){
            setShowaddfirm(true);
        }
    },[])
    const setRegisterHandle=()=>{
        setRegister(true);
        setLogin(false);
        setOwnerdetails(false);
        setAddproduct(false);
        setAddfirm(false)
        setAllproduct(false);
    }
    const registerClickHandle=()=>{
        setRegister(true);
        setLogin(false);
        setOwnerdetails(false);
        setAddproduct(false);
        setAddfirm(false)
        setAllproduct(false);
    }
    const setLoginHandle=()=>{
        setLogin(true);
        setRegister(false);
        setAddproduct(false);
        setAddfirm(false)
        setOwnerdetails(false);
        setAllproduct(false);
    }
    const loginClickHandle=()=>{
        setLogin(true);
        setRegister(false);
        setAddproduct(false);
        setAddfirm(false)
        setOwnerdetails(false);
        setAllproduct(false);
    }

    const addFirmHandle=()=>{
        setAddfirm(true);
        setRegister(false);
        setLogin(false);
        setAddproduct(false);
        setOwnerdetails(false);
        setAllproduct(false);
    }
    const productRegisterHandle=()=>{
        setAddproduct(true);
        setRegister(false);
        setLogin(false);
        setAddfirm(false)
        setOwnerdetails(false);
        setAllproduct(false);
    }
    const allProductHandle=()=>{
        setAllproduct(true);
        setRegister(false);
        setLogin(false);
        setAddfirm(false)
        setAddproduct(false);
        setOwnerdetails(false);
    }
    const ownerDetailsHandle=()=>{
        setOwnerdetails(true);
        setAllproduct(false);
        setRegister(false);
        setLogin(false);
        setAddfirm(false)
        setAddproduct(false);
    }
    const logOutHandle=()=>{
       if(window.confirm('Do you want to logout?')){
        setOwnerdetails(false);
        setAllproduct(false);
        setRegister(false);
        localStorage.removeItem('ownertoken');
        localStorage.removeItem('ownerid');
        localStorage.removeItem('firmid')
        localStorage.removeItem('firmname')
        setLogout(false);
        setLogin(true);
        setAddfirm(false)
        setAddproduct(false);
        setShowaddfirm(true);
       }
    }
  return (
    <div>
        <Navbar 
        setLoginHandle={setLoginHandle} 
        setRegisterHandle={setRegisterHandle} 
        logOutHandle={logOutHandle}
        logout={logout}
        />
        <div className='d-flex flex-row'>

            <Sidebar 
            addFirmHandle={addFirmHandle}
            productRegisterHandle={productRegisterHandle} 
            allProductHandle={allProductHandle}
            ownerDetailsHandle={ownerDetailsHandle}
            showaddfirm={showaddfirm}
            />
            {register && <Register loginClickHandle={loginClickHandle}/> }
            {login && <Login registerClickHandle={registerClickHandle} ownerDetailsHandle={ownerDetailsHandle} />}
            {addfirm && <FirmRegister/>}
            {addproduct && <ProductRegister/>}
            {allproduct && <AllProduct/> }
            {ownerdetails && <OwnerDetails/>}
        </div>
    </div>
  )
}

export default Home