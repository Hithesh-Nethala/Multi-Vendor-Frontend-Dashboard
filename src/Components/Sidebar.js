import React from 'react'
import './Styling/Sidebar.css'
const Sidebar = ({addFirmHandle,productRegisterHandle,allProductHandle,ownerDetailsHandle,showaddfirm}) => {
  return (
    <>
        <section className='sidebar d-flex flex-column ps-5'>
          {showaddfirm?<p className='sidebar-item' onClick={addFirmHandle}>Add Firm</p>:''}
            <p className='sidebar-item' onClick={productRegisterHandle}>Add Product</p>
            <p className='sidebar-item' onClick={allProductHandle}>All Products</p>
            <p className='sidebar-item' onClick={ownerDetailsHandle}>Owner Details</p>
        </section>
    </>
  )
}

export default Sidebar