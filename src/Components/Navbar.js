import React from 'react';
import './Styling/Navbar.css';

const Navbar = ({ setActiveView, logOutHandle, logout }) => {
  const firmname = localStorage.getItem('firmname');

  return (
    <nav className="navbar-container container-fluid py-3 px-3">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
        
        <h4 className="nav-title mb-2 mb-md-0 text-center text-md-start">
          Vendor Dashboard
        </h4>

        {firmname ? (
          <h3 className="nav-firm mb-2 mb-md-0 text-center">{firmname}</h3>
        ) : (
          <span className="mb-2 mb-md-0" />
        )}

        <div className="nav-auth text-center text-md-end">
          {!logout ? (
            <>
              <button
                className="btn btn-outline-light me-2 nav-btn mb-2 mb-md-0"
                onClick={() => setActiveView("login")}
              >
                Login
              </button>
              <button
                className="btn btn-light nav-btn mb-2 mb-md-0"
                onClick={() => setActiveView("register")}
              >
                Register
              </button>
            </>
          ) : (
            <button
              className="btn btn-danger nav-btn mb-2 mb-md-0"
              onClick={logOutHandle}
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
