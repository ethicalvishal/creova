import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    // Simulate API call
    setTimeout(() => {
      if (email) {
        setSubmitted(true);
      } else {
        setError('Please enter a valid email address.');
      }
    }, 800);
  };

  return (
    <div className="admin-forgot-password-page d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #12c2e9 0%, #00bcd4 100%)' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-5">
            <div className="card glass-card border-0 shadow-lg" style={{ borderRadius: 22, overflow: 'hidden', border: '1.5px solid #e0e7ef', boxShadow: '0 12px 32px rgba(67,206,162,0.13), 0 2px 8px rgba(0,0,0,0.08)' }}>
              <div className="card-header border-0 p-4 position-relative" style={{ background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)', overflow: 'hidden' }}>
                <div className="d-flex align-items-center position-relative">
                  <div className="bg-white rounded-circle p-3 me-3" style={{border: '1px solid rgba(255,255,255,0.2)'}}>
                    <i className="fas fa-unlock-alt" style={{fontSize: '1.5rem', color: '#43cea2'}}></i>
                  </div>
                  <div>
                    <h5 className="modal-title mb-1 fw-bold text-white" style={{fontSize: '1.3rem'}}>Forgot Password</h5>
                    <small className="opacity-90 text-white">Forgot your admin password? Enter your email to reset.</small>
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="card-body p-4" style={{background: '#fafbfc'}}>
                  {submitted ? (
                    <div className="alert alert-success border-0" style={{ borderRadius: '12px', fontSize: '1.05rem' }}>
                      <i className="fas fa-check-circle me-2"></i>
                      Password reset instructions sent to <b>{email}</b>.
                    </div>
                  ) : (
                    <>
                      {error && (
                        <div className="alert alert-danger border-0" style={{ borderRadius: '12px', fontSize: '1.05rem' }}>
                          <i className="fas fa-exclamation-triangle me-2"></i>
                          {error}
                        </div>
                      )}
                      <div className="mb-3">
                        <label htmlFor="adminForgotEmail" className="form-label fw-semibold text-dark mb-1">
                          <i className="fas fa-envelope me-2" style={{color:'#43cea2'}}></i>
                          Admin Email
                        </label>
                        <input
                          id="adminForgotEmail"
                          type="email"
                          className="form-control border-0 shadow-sm"
                          placeholder="Enter your admin email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          required
                          style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s' }}
                        />
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-4">
                        <Link to="/admin/login" className="btn btn-link px-0" style={{fontWeight: 600}}>
                          <i className="fas fa-arrow-left me-1"></i>Back to Login
                        </Link>
                        <button type="submit" className="btn px-4 add-user-btn-gradient" style={{ borderRadius: '8px', fontWeight: '600', fontSize: '1.08rem', background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)', color: 'white', border: 'none' }}>
                          <i className="fas fa-unlock-alt me-2" style={{color:'#fff'}}></i>
                          Send Reset Link
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </form>
            </div>
            <div className="text-center mt-4" style={{fontWeight: 500, fontSize: '1.08rem', color: '#1976d2', opacity: 0.92}}>
              <span role="img" aria-label="bulb">💡</span> "A secure password means secure data!" <span role="img" aria-label="lock">🔒</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminForgotPassword; 