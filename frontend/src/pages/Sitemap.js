import React from 'react';
import { Link } from 'react-router-dom';

const Sitemap = () => {
  return (
    <div className="sitemap-page my-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card border-0 shadow-sm p-5">
              <h1 className="mb-4 fw-bold">Sitemap</h1>
              <p className="text-muted mb-4">
                Navigate through our website structure to find the information you need.
              </p>
              
              <div className="row">
                <div className="col-md-6 mb-4">
                  <h3 className="mb-3">Main Pages</h3>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <Link to="/" className="text-decoration-none">Home</Link>
                    </li>
                    <li className="mb-2">
                      <Link to="/about" className="text-decoration-none">About Us</Link>
                    </li>
                    <li className="mb-2">
                      <Link to="/services" className="text-decoration-none">Services</Link>
                    </li>
                    <li className="mb-2">
                      <Link to="/products" className="text-decoration-none">Products</Link>
                    </li>
                    <li className="mb-2">
                      <Link to="/careers" className="text-decoration-none">Careers</Link>
                    </li>
                    <li className="mb-2">
                      <Link to="/blog" className="text-decoration-none">Blog</Link>
                    </li>
                    <li className="mb-2">
                      <Link to="/contact" className="text-decoration-none">Contact</Link>
                    </li>
                  </ul>
                </div>
                
                <div className="col-md-6 mb-4">
                  <h3 className="mb-3">Legal Pages</h3>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <Link to="/terms" className="text-decoration-none">Terms of Service</Link>
                    </li>
                    <li className="mb-2">
                      <Link to="/privacy" className="text-decoration-none">Privacy Policy</Link>
                    </li>
                  </ul>
                  
                  <h3 className="mb-3 mt-4">User Pages</h3>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <Link to="/login" className="text-decoration-none">Login</Link>
                    </li>
                    <li className="mb-2">
                      <Link to="/register" className="text-decoration-none">Register</Link>
                    </li>
                    <li className="mb-2">
                      <Link to="/dashboard" className="text-decoration-none">Dashboard</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sitemap; 