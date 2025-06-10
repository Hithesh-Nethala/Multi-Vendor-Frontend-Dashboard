import React from 'react';
import './Styling/Sidebar.css';

const Sidebar = ({ setActiveView, showaddfirm }) => {
  return (
    <aside className="sidebar-container p-3">
      {showaddfirm && (
        <p className="sidebar-item" onClick={() => setActiveView("addfirm")}>
          Add Firm
        </p>
      )}
      <p className="sidebar-item" onClick={() => setActiveView("addproduct")}>
        Add Product
      </p>
      <p className="sidebar-item" onClick={() => setActiveView("allproduct")}>
        All Products
      </p>
      <p className="sidebar-item" onClick={() => setActiveView("ownerdetails")}>
        Owner Details
      </p>
    </aside>
  );
};

export default Sidebar;
