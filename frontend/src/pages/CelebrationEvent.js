import React from 'react';
import { Link } from 'react-router-dom';

const CelebrationEvent = () => {
  return (
    <div className="celebration-event-page">
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-md-8 col-lg-6 text-center">
            <div className="card border-0 shadow-sm p-5">
              <div className="mb-4">
                <i className="fas fa-trophy fa-4x text-warning"></i>
              </div>
              <h1 className="mb-3">Congratulations!</h1>
              <h3 className="text-muted mb-4">We've Successfully Launched</h3>
              <p className="text-muted mb-4">
                Thank you for being part of our journey. We're excited to announce that our platform is now live and ready to serve you better.
              </p>
              <div className="d-grid gap-3">
                <Link to="/" className="btn btn-primary btn-lg">
                  Explore Our Platform
                </Link>
                <Link to="/contact" className="btn btn-outline-primary">
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CelebrationEvent; 