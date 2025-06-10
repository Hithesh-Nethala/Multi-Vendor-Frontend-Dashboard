import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import Register from '../Auth/Register';
import Login from '../Auth/Login';
import FirmRegister from '../Sidebar/FirmRegister';
import ProductRegister from '../Sidebar/ProductRegister';
import AllProduct from '../Sidebar/AllProduct';
import OwnerDetails from '../Sidebar/OwnerDetails';
import '../Styling/Home.css'
const Home = () => {
    const [activeView, setActiveView] = useState("ownerdetails");
    const [logout, setLogout] = useState(false);
    const [showaddfirm, setShowaddfirm] = useState(false);

    // Detect login state
    useEffect(() => {
        const token = localStorage.getItem('ownertoken');
        setLogout(!!token); // Converts to true/false
    }, []);

    // Check firm registration state
    useEffect(() => {
        const firmid = localStorage.getItem('firmid');
        setShowaddfirm(!firmid);
    }, []);

    // Logout Handler
    const logOutHandle = () => {
        if (window.confirm("Do you want to logout?")) {
            localStorage.clear();
            setLogout(false);
            setActiveView("login"); // Redirect to login view
        }
    };

    return (
        <div>
            <Navbar setActiveView={setActiveView} logOutHandle={logOutHandle} logout={logout}  />
            <div className="middle-content">
                <Sidebar setActiveView={setActiveView} showaddfirm={showaddfirm} />
                <div className='main-content'>
                {activeView === "register" && <Register setActiveView={setActiveView} />}
                {activeView === "login" && <Login setActiveView={setActiveView} />}
                {activeView === "addfirm" && <FirmRegister setActiveView={setActiveView} />}
                {activeView === "addproduct" && <ProductRegister setActiveView={setActiveView}/>}
                {activeView === "allproduct" && <AllProduct />}
                {activeView === "ownerdetails" && <OwnerDetails />}
                </div>
            </div>
        </div>
    );
};

export default Home;