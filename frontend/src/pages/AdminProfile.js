import React from 'react';
import { Link } from 'react-router-dom';

const adminInfo = {
  name: 'Vishal Singh',
  role: 'Administrator',
  email: 'vishalmth091@gmail.com',
  phone: '9709851977',
  location: 'Motihari, Bihar 845401',
  photo: '/images/vishal-singh.jpg',
};

const AdminProfile = () => (
  <div className="container py-5">
    {/* Back to Dashboard button at top left */}
    <div className="mb-3" style={{ maxWidth: 520, margin: '0 auto' }}>
      <Link to="/admin" className="btn btn-outline-secondary btn-sm" aria-label="Back to Admin Dashboard">
        <i className="fas fa-arrow-left me-1"></i>
        Back to Dashboard
      </Link>
    </div>
    <div className="card border-0 shadow glass-card p-4" style={{ maxWidth: 520, margin: '0 auto', borderRadius: 22, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)' }}>
      <div className="d-flex align-items-center mb-3">
        <h2 className="fw-bold mb-0" style={{ fontSize: '1.4rem' }}>Admin Profile</h2>
      </div>
      <div className="d-flex flex-column align-items-center text-center mb-4 mt-2">
        <div style={{ width: 110, height: 110, borderRadius: '50%', overflow: 'hidden', boxShadow: '0 4px 16px rgba(67,206,162,0.13)' }}>
          <img src={adminInfo.photo} alt="Admin" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <h3 className="fw-bold mt-3 mb-1">{adminInfo.name}</h3>
        <span className="badge bg-primary px-3 py-2 mb-2" style={{ fontSize: '1rem', borderRadius: 12, color: 'white' }}>{adminInfo.role}</span>
        <div className="text-muted mb-2" style={{ fontSize: '1.08rem' }}>{adminInfo.email}</div>
      </div>
      <div className="row g-3 mb-3">
        <div className="col-6">
          <div className="text-muted small">Mobile</div>
          <div className="fw-semibold">{adminInfo.phone}</div>
        </div>
        <div className="col-6">
          <div className="text-muted small">Address</div>
          <div className="fw-semibold">{adminInfo.location}</div>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <button className="btn btn-outline-primary px-4">
          <i className="fas fa-user-edit me-2"></i>
          Edit Profile
        </button>
      </div>
    </div>
  </div>
);

export default AdminProfile; 