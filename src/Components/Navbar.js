import React from 'react'
import './Styling/Navbar.css'
const Navbar = ({setRegisterHandle,setLoginHandle,logOutHandle,logout}) => {
  const firmname=localStorage.getItem('firmname');
  return (
    <>
        <section className='nav d-flex flex-row justify-content-between align-items-center'>
            <h4 className='nav-h4 ms-3'>Vendor Dashboard</h4>
            {firmname?<h3 className='nav-h3'>{firmname}</h3>:<span></span>}
            <div className='nav-auth'>
              {!logout?
              <>
                <button className='btn btn-light me-2 nav-btn' onClick={setLoginHandle}>Login</button>
                <button className='btn btn-light me-2 nav-btn' onClick={setRegisterHandle}>Register</button>
                </>
              :<button className='btn btn-light me-2 nav-btn' onClick={logOutHandle}>Log Out</button>}
                
                
            </div>
        </section>
    </>
  )
}

export default Navbar