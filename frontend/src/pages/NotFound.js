import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="notfound-page d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', background: 'var(--bg-secondary)' }}>
      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card border-0 shadow-sm p-5">
              <div className="mb-4">
                <i className="fas fa-exclamation-triangle fa-4x text-warning"></i>
              </div>
              <h1 className="display-4 fw-bold mb-3">404</h1>
              <h2 className="mb-3">Page Not Found</h2>
              <p className="text-muted mb-4">
                Sorry, the page you are looking for does not exist or has been moved.<br />
                Please check the URL or return to the homepage.
              </p>
              <Link to="/" className="btn btn-primary btn-lg">
                Go to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 