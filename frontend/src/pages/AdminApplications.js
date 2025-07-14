import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../constants';

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    position: 'all',
    dateRange: 'all'
  });

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch(`${API_URL}/careers/applications`);
      const data = await response.json();
      
      if (data.success) {
        setApplications(data.applications);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (applicationId, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/careers/applications/${applicationId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        // Update local state
        setApplications(prev => prev.map(app => 
          app.id === applicationId ? { ...app, status: newStatus } : app
        ));
      }
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  const deleteApplication = async (applicationId) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        const response = await fetch(`${API_URL}/careers/applications/${applicationId}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          setApplications(prev => prev.filter(app => app.id !== applicationId));
        }
      } catch (error) {
        console.error('Error deleting application:', error);
      }
    }
  };

  const filteredApplications = applications.filter(app => {
    if (filters.status !== 'all' && app.status !== filters.status) return false;
    if (filters.position !== 'all' && app.position !== filters.position) return false;
    return true;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending': return 'bg-warning';
      case 'reviewed': return 'bg-info';
      case 'shortlisted': return 'bg-primary';
      case 'rejected': return 'bg-danger';
      case 'hired': return 'bg-success';
      default: return 'bg-secondary';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="admin-applications-page">
        <div className="container">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-applications-page" style={{background: 'linear-gradient(135deg, #12c2e9 0%, #00bcd4 100%)', minHeight: '100vh'}}>
      {/* Header - Match AdminUsers */}
      <div className="bg-white shadow-sm">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center py-3">
            <div className="d-flex align-items-center">
              <Link to="/admin" className="btn btn-outline-secondary btn-sm me-3" aria-label="Back to Admin Dashboard">
                <i className="fas fa-arrow-left me-1"></i>
                Back to Dashboard
              </Link>
              <div>
                <h4 className="mb-0 fw-bold text-dark">Job Applications</h4>
                <small className="text-muted">Manage all job applications</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mb-4">
        <div className="glass-card card border-0 shadow-sm" style={{ borderRadius: 18, background: 'rgba(255,255,255,0.92)' }}>
          <div className="card-body">
            <h5 className="card-title mb-3 fw-bold"><i className="fas fa-filter me-2 text-primary"></i>Filters</h5>
            <div className="row g-3 align-items-end">
              <div className="col-md-3">
                <label className="form-label fw-semibold"><i className="fas fa-tasks me-2 text-info"></i>Status</label>
                <select className="form-control" value={filters.status} onChange={e => setFilters({...filters, status: e.target.value})} style={{ borderRadius: 10 }}>
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="rejected">Rejected</option>
                  <option value="hired">Hired</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label fw-semibold"><i className="fas fa-briefcase me-2 text-success"></i>Position</label>
                <select className="form-control" value={filters.position} onChange={e => setFilters({...filters, position: e.target.value})} style={{ borderRadius: 10 }}>
                  <option value="all">All Positions</option>
                  <option value="Software Engineer">Software Engineer</option>
                  <option value="UI/UX Designer">UI/UX Designer</option>
                  <option value="Product Manager">Product Manager</option>
                  <option value="Marketing Intern">Marketing Intern</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label fw-semibold"><i className="fas fa-calendar-alt me-2 text-warning"></i>Date Range</label>
                <select className="form-control" value={filters.dateRange} onChange={e => setFilters({...filters, dateRange: e.target.value})} style={{ borderRadius: 10 }}>
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
              <div className="col-md-3 d-flex align-items-end">
                <button className="btn btn-outline-secondary w-100 fw-bold" style={{ borderRadius: 10 }} onClick={() => setFilters({status: 'all', position: 'all', dateRange: 'all'})} aria-label="Clear All Filters">
                  <i className="fas fa-times me-2"></i>Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Applications List */}
      <section className="section">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold" style={{ fontSize: '1.6rem', letterSpacing: '0.5px' }}>
              <i className="fas fa-users me-2 text-primary"></i>Applications ({filteredApplications.length})
            </h2>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-primary fw-bold" aria-label="Export Applications" style={{ borderRadius: 10 }}>
                <i className="fas fa-download me-2"></i>
                Export
              </button>
              <button className="btn btn-primary fw-bold" aria-label="Mark Selected as Reviewed" style={{ borderRadius: 10 }}>
                <i className="fas fa-plus me-2"></i>
                Add Application
              </button>
            </div>
          </div>

          {filteredApplications.length === 0 ? (
            <div className="text-center py-5">
              <div className="mb-3">
                <span style={{ fontSize: 64 }} role="img" aria-label="No Applications">📭</span>
              </div>
              <h5 className="fw-bold">No applications found</h5>
              <p className="text-muted">No applications match your current filters.</p>
            </div>
          ) : (
            <div className="row">
              {filteredApplications.map((application) => (
                <div key={application.id} className="col-lg-6 mb-4">
                  <div className="application-card">
                    <div className="card border-0 shadow-lg h-100 glass-card" style={{ borderRadius: 18, background: 'rgba(255,255,255,0.97)', boxShadow: '0 8px 32px rgba(67,206,162,0.13), 0 2px 8px rgba(0,0,0,0.08)' }}>
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <div className="d-flex align-items-center">
                            <div className="avatar bg-primary text-white fw-bold me-3 d-flex align-items-center justify-content-center" style={{ width: 48, height: 48, borderRadius: '50%', fontSize: 22, boxShadow: '0 2px 8px rgba(67,206,162,0.13)' }}>
                              {application.name ? application.name.charAt(0).toUpperCase() : <i className="fas fa-user"></i>}
                            </div>
                            <div>
                              <h5 className="card-title mb-1 fw-bold">{application.name}</h5>
                              <p className="text-muted mb-1">{application.position}</p>
                              <p className="text-muted mb-0">
                                <i className="fas fa-envelope me-2"></i>
                                {application.email}
                              </p>
                            </div>
                          </div>
                          <span className={`badge ${getStatusBadgeClass(application.status)} px-3 py-2 fw-semibold`} style={{ fontSize: '1rem', borderRadius: 12, boxShadow: '0 2px 8px rgba(67,206,162,0.13)', textTransform: 'capitalize', letterSpacing: '0.5px' }}>
                            {application.status}
                          </span>
                        </div>

                        <div className="mb-3">
                          <div className="row">
                            <div className="col-6">
                              <small className="text-muted">Applied</small>
                              <div>{formatDate(application.applied_date)}</div>
                            </div>
                            <div className="col-6">
                              <small className="text-muted">Phone</small>
                              <div>{application.phone || 'Not provided'}</div>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex gap-2 align-items-center mt-2">
                          <button className="btn btn-outline-info btn-sm fw-bold" onClick={() => setSelectedApplication(application)} aria-label={`View details for ${application.name}`} style={{ borderRadius: 8 }}>
                            <i className="fas fa-eye me-1"></i> View Details
                          </button>
                          <div className="dropdown">
                            <button className="btn btn-outline-secondary btn-sm dropdown-toggle fw-bold" data-bs-toggle="dropdown" aria-label={`Update status for ${application.name}`} style={{ borderRadius: 8 }}>
                              Status
                            </button>
                            <ul className="dropdown-menu">
                              <li><button className="dropdown-item" onClick={() => updateApplicationStatus(application.id, 'pending')} aria-label={`Mark ${application.name} as Pending`}>Pending</button></li>
                              <li><button className="dropdown-item" onClick={() => updateApplicationStatus(application.id, 'reviewed')} aria-label={`Mark ${application.name} as Reviewed`}>Reviewed</button></li>
                              <li><button className="dropdown-item" onClick={() => updateApplicationStatus(application.id, 'shortlisted')} aria-label={`Mark ${application.name} as Shortlisted`}>Shortlisted</button></li>
                              <li><button className="dropdown-item" onClick={() => updateApplicationStatus(application.id, 'rejected')} aria-label={`Mark ${application.name} as Rejected`}>Rejected</button></li>
                              <li><button className="dropdown-item" onClick={() => updateApplicationStatus(application.id, 'hired')} aria-label={`Mark ${application.name} as Hired`}>Hired</button></li>
                            </ul>
                          </div>
                          <button className="btn btn-outline-danger btn-sm fw-bold" onClick={() => deleteApplication(application.id)} aria-label={`Delete application from ${application.name}`} style={{ borderRadius: 8 }}>
                            <i className="fas fa-trash me-1"></i> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Application Details Modal */}
      {selectedApplication && (
        <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Application Details</h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setSelectedApplication(null)}
                  aria-label="Close Application Details"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <h6>Personal Information</h6>
                    <p><strong>Name:</strong> {selectedApplication.name}</p>
                    <p><strong>Email:</strong> {selectedApplication.email}</p>
                    <p><strong>Phone:</strong> {selectedApplication.phone || 'Not provided'}</p>
                    <p><strong>Position:</strong> {selectedApplication.position}</p>
                    <p><strong>Applied:</strong> {formatDate(selectedApplication.applied_date)}</p>
                    <p><strong>Status:</strong> 
                      <span className={`badge ${getStatusBadgeClass(selectedApplication.status)} ms-2`} style={{ fontSize: '1rem', borderRadius: 10 }}>
                        {selectedApplication.status}
                      </span>
                    </p>
                  </div>
                  <div className="col-md-6">
                    <h6>Cover Letter</h6>
                    <div className="border rounded p-3 bg-light">
                      {selectedApplication.cover_letter || <span className="text-muted">No cover letter provided.</span>}
                    </div>
                  </div>
                </div>
                {selectedApplication.resume && (
                  <div className="mt-3">
                    <h6>Resume</h6>
                    <a 
                      href={selectedApplication.resume} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary btn-sm"
                      aria-label={`Download resume for ${selectedApplication.name}`}
                    >
                      <i className="fas fa-download me-2"></i>
                      Download Resume
                    </a>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setSelectedApplication(null)}
                  aria-label="Close Application Details"
                >
                  Close
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={() => {
                    window.open(`mailto:${selectedApplication.email}?subject=Re: Your application for ${selectedApplication.position}`);
                  }}
                  aria-label="Reply to Application"
                >
                  <i className="fas fa-envelope me-2"></i>
                  Send Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bilingual Rural Quote at Bottom */}
      <footer className="text-center mt-5 mb-3">
        <div className="fw-semibold text-primary" style={{ fontSize: '1.1rem' }}>
          <span role="img" aria-label="Rural">🌱</span> "Empowering rural talent, one application at a time." <span role="img" aria-label="Rural">🌱</span>
        </div>
        <div className="text-muted small mt-1">"गाँव की प्रतिभा, देश की शान।"</div>
      </footer>
    </div>
  );
};

export default AdminApplications; 