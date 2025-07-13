import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    applications: 0,
    savedJobs: 0,
    profileViews: 0,
    messages: 0
  });
  const [recentApplications, setRecentApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    // Set all stats to zero by default
    setStats({
      applications: 0,
      savedJobs: 0,
      profileViews: 0,
      messages: 0
    });
    setRecentApplications([]);
    setLoading(false);
    // If you have a real backend API, fetch and update stats here
    // Example:
    // fetch('/api/user/dashboard-stats').then(...)
  }, []);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Under Review': return 'bg-warning';
      case 'Shortlisted': return 'bg-primary';
      case 'Rejected': return 'bg-danger';
      case 'Hired': return 'bg-success';
      default: return 'bg-secondary';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="user-dashboard-page">
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
    <div className="user-dashboard-page">
      {/* Header */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 className="hero-title">Welcome back, {user?.name || 'User'}!</h1>
              <p className="hero-subtitle">
                Track your job applications, manage your profile, and stay updated with your career progress.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <Link to="/profile" className="btn btn-outline-primary">
                <i className="fas fa-user-edit me-2"></i>
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="analytics-card">
                <div className="d-flex align-items-center">
                  <div className="stat-icon bg-primary text-white me-3">
                    <i className="fas fa-file-alt"></i>
                  </div>
                  <div>
                    <h3 className="mb-1">{stats.applications}</h3>
                    <p className="text-muted mb-0">Applications</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="analytics-card">
                <div className="d-flex align-items-center">
                  <div className="stat-icon bg-success text-white me-3">
                    <i className="fas fa-bookmark"></i>
                  </div>
                  <div>
                    <h3 className="mb-1">{stats.savedJobs}</h3>
                    <p className="text-muted mb-0">Saved Jobs</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="analytics-card">
                <div className="d-flex align-items-center">
                  <div className="stat-icon bg-info text-white me-3">
                    <i className="fas fa-eye"></i>
                  </div>
                  <div>
                    <h3 className="mb-1">{stats.profileViews}</h3>
                    <p className="text-muted mb-0">Profile Views</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="analytics-card">
                <div className="d-flex align-items-center">
                  <div className="stat-icon bg-warning text-white me-3">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h3 className="mb-1">{stats.messages}</h3>
                    <p className="text-muted mb-0">Messages</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mb-4">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-0">
                  <h5 className="card-title mb-0">Recent Applications</h5>
                </div>
                <div className="card-body">
                  {recentApplications.length === 0 ? (
                    <div className="text-center py-4">
                      <i className="fas fa-file-alt fa-3x text-muted mb-3"></i>
                      <h5>No applications yet</h5>
                      <p className="text-muted">Start applying to jobs to see your applications here.</p>
                      <Link to="/careers" className="btn btn-primary">
                        Browse Jobs
                      </Link>
                    </div>
          ) : (
            <div className="table-responsive">
                      <table className="table table-hover">
                <thead>
                  <tr>
                            <th>Position</th>
                            <th>Company</th>
                    <th>Status</th>
                            <th>Applied</th>
                            <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                          {recentApplications.map(application => (
                            <tr key={application.id}>
                              <td>
                                <strong>{application.position}</strong>
                              </td>
                              <td>{application.company}</td>
                              <td>
                                <span className={`badge ${getStatusBadgeClass(application.status)}`}>
                                  {application.status}
                                </span>
                              </td>
                              <td>{formatDate(application.appliedDate)}</td>
                              <td>
                                <Link to={`/application/${application.id}`} className="btn btn-sm btn-outline-primary">
                                  View
                                </Link>
                              </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
                </div>
              </div>
            </div>
            
            <div className="col-lg-4 mb-4">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-0">
                  <h5 className="card-title mb-0">Quick Actions</h5>
                </div>
                <div className="card-body">
                  <div className="d-grid gap-2">
                    <Link to="/careers" className="btn btn-primary">
                      <i className="fas fa-search me-2"></i>
                      Browse Jobs
                    </Link>
                    <Link to="/profile" className="btn btn-outline-primary">
                      <i className="fas fa-user-edit me-2"></i>
                      Update Profile
                    </Link>
                    <Link to="/resume" className="btn btn-outline-primary">
                      <i className="fas fa-file-upload me-2"></i>
                      Upload Resume
                    </Link>
                    <Link to="/applications" className="btn btn-outline-primary">
                      <i className="fas fa-list me-2"></i>
                      View All Applications
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="card border-0 shadow-sm mt-4">
                <div className="card-header bg-white border-0">
                  <h5 className="card-title mb-0">Profile Completion</h5>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span>Profile</span>
                      <span>85%</span>
                    </div>
                    <div className="progress">
                      <div className="progress-bar" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span>Resume</span>
                      <span>100%</span>
                    </div>
                    <div className="progress">
                      <div className="progress-bar" style={{width: '100%'}}></div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span>Skills</span>
                      <span>70%</span>
                    </div>
                    <div className="progress">
                      <div className="progress-bar" style={{width: '70%'}}></div>
                    </div>
                  </div>
                  <Link to="/profile" className="btn btn-outline-primary btn-sm w-100">
                    Complete Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="section">
        <div className="container">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0">
              <h5 className="card-title mb-0">Recent Activity</h5>
            </div>
            <div className="card-body">
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-marker bg-primary"></div>
                  <div className="timeline-content">
                    <h6>Application Submitted</h6>
                    <p className="text-muted mb-1">Software Engineer at Tech Corp</p>
                    <small className="text-muted">2 days ago</small>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-marker bg-success"></div>
                  <div className="timeline-content">
                    <h6>Profile Updated</h6>
                    <p className="text-muted mb-1">Added new skills and experience</p>
                    <small className="text-muted">1 week ago</small>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-marker bg-info"></div>
                  <div className="timeline-content">
                    <h6>Resume Uploaded</h6>
                    <p className="text-muted mb-1">Updated resume with latest experience</p>
                    <small className="text-muted">2 weeks ago</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserDashboard; 