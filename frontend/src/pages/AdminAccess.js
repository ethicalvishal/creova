import React from 'react';
import { Link } from 'react-router-dom';

const AdminAccess = () => {
  const adminFeatures = [
    {
      title: 'Dashboard Overview',
      description: 'Complete website statistics and real-time monitoring',
      icon: 'fas fa-tachometer-alt',
      color: 'primary'
    },
    {
      title: 'Content Management',
      description: 'Manage blog posts, jobs, services, and team profiles',
      icon: 'fas fa-edit',
      color: 'success'
    },
    {
      title: 'User Management',
      description: 'View and manage all user accounts and permissions',
      icon: 'fas fa-users',
      color: 'info'
    },
    {
      title: 'Analytics & Reports',
      description: 'Detailed website analytics and performance reports',
      icon: 'fas fa-chart-line',
      color: 'warning'
    },
    {
      title: 'System Settings',
      description: 'Configure security, email, backup, and website settings',
      icon: 'fas fa-cog',
      color: 'secondary'
    },
    {
      title: 'Communication',
      description: 'Manage contact messages and job applications',
      icon: 'fas fa-envelope',
      color: 'danger'
    }
  ];

  return (
    <div className="admin-access-page" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-lg" style={{
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px'
            }}>
              <div className="card-body p-5">
                {/* Header */}
                <div className="text-center mb-5">
                  <div className="admin-logo mb-4">
                    <div className="creova-logo-svg" style={{
                      width: 80, 
                      height: 80, 
                      margin: '0 auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <svg width="76" height="76" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="admin-access-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#667eea" />
                            <stop offset="1" stopColor="#764ba2" />
                          </linearGradient>
                        </defs>
                        <circle cx="20" cy="20" r="18" fill="url(#admin-access-gradient)" />
                        <text x="50%" y="56%" textAnchor="middle" dominantBaseline="middle" fontFamily="Segoe UI, Arial, sans-serif" fontWeight="bold" fontSize="18" fill="#fff">A</text>
                      </svg>
                    </div>
                  </div>
                  <h1 className="fw-bold text-dark mb-3">Admin Portal Access</h1>
                  <p className="text-muted mb-0" style={{fontSize: '1.1rem'}}>
                    Complete website administration and management system
                  </p>
                </div>

                {/* Admin Features Grid */}
                <div className="row g-4 mb-5">
                  {adminFeatures.map((feature, index) => (
                    <div className="col-md-6" key={index}>
                      <div className="feature-card p-4 h-100" style={{
                        background: 'rgba(255,255,255,0.8)',
                        borderRadius: '16px',
                        border: '1px solid rgba(102, 126, 234, 0.1)',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-4px)';
                        e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }}>
                        <div className="d-flex align-items-center mb-3">
                          <div className={`feature-icon bg-${feature.color} text-white me-3`}>
                            <i className={feature.icon}></i>
                          </div>
                          <h5 className="fw-bold mb-0">{feature.title}</h5>
                        </div>
                        <p className="text-muted mb-0" style={{fontSize: '0.95rem'}}>
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Login Section */}
                <div className="text-center">
                  <div className="alert alert-info" role="alert" style={{
                    background: 'rgba(102, 126, 234, 0.1)',
                    border: '1px solid rgba(102, 126, 234, 0.2)',
                    borderRadius: '12px'
                  }}>
                    <i className="fas fa-info-circle me-2"></i>
                    <strong>Demo Credentials:</strong> admin / admin123
                  </div>
                  
                  <Link 
                    to="/admin/login"
                    className="btn btn-primary btn-lg px-5 py-3"
                    aria-label="Access Admin Dashboard"
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none',
                      borderRadius: '25px',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                    }}
                  >
                    <i className="fas fa-sign-in-alt me-2"></i>
                    Access Admin Dashboard
                  </Link>
                  
                  <div className="mt-4">
                    <Link to="/" className="text-decoration-none text-muted" aria-label="Back to Homepage">
                      <i className="fas fa-arrow-left me-2"></i>
                      Back to Website
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .admin-access-page {
          font-family: 'Segoe UI', Arial, sans-serif;
        }
        
        .feature-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        .feature-card {
          cursor: pointer;
        }
        
        .btn-primary:hover {
          background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%) !important;
        }
        
        @media (max-width: 768px) {
          .feature-card {
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminAccess; 