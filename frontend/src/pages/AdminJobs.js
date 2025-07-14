import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import './AdminJobs.css';
import { API_URL } from '../constants';

const AdminJobs = () => {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [inputToken, setInputToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '', department: '', location: '', type: '', description: '', requirements: '', salary_range: '', benefits: '', work_mode: '', is_active: true, skills: ''
  });
  const [addError, setAddError] = useState(null);
  const [addLoading, setAddLoading] = useState(false);
  const [editJob, setEditJob] = useState(null);
  const [editError, setEditError] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteJobId, setDeleteJobId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [showAppsJob, setShowAppsJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [appsLoading, setAppsLoading] = useState(false);
  const [appsError, setAppsError] = useState(null);
  const [allApplications, setAllApplications] = useState([]);

  useEffect(() => {
    if (isAuthenticated) fetchJobs();
    // eslint-disable-next-line
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) fetchAllApplications();
    // eslint-disable-next-line
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (inputToken.trim()) {
      setToken(inputToken.trim());
      localStorage.setItem('adminToken', inputToken.trim());
      setIsAuthenticated(true);
    }
  };

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/jobs`);
      const data = await res.json();
      if (data.success) setJobs(data.jobs);
      else setError(data.message || 'Failed to fetch jobs');
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllApplications = async () => {
    try {
      const res = await fetch(`${API_URL}/applications`);
      const data = await res.json();
      if (data.success) setAllApplications(data.applications);
      else setAllApplications([]);
    } catch {
      setAllApplications([]);
    }
  };

  const handleAddJob = async (e) => {
    e.preventDefault();
    setAddLoading(true);
    setAddError(null);
    try {
      const res = await fetch(`${API_URL}/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Token': token
        },
        body: JSON.stringify(newJob)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setShowAddModal(false);
        setNewJob({ title: '', department: '', location: '', type: '', description: '', requirements: '', salary_range: '', benefits: '', work_mode: '', is_active: true, skills: '' });
        fetchJobs();
      } else {
        setAddError(data.message || 'Failed to add job');
      }
    } catch (err) {
      setAddError('Network error');
    } finally {
      setAddLoading(false);
    }
  };

  const handleEditJob = (job) => {
    setEditJob({ ...job });
    setEditError(null);
  };

  const handleUpdateJob = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    setEditError(null);
    try {
      const res = await fetch(`${API_URL}/jobs/${editJob.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Token': token
        },
        body: JSON.stringify(editJob)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setEditJob(null);
        fetchJobs();
      } else {
        setEditError(data.message || 'Failed to update job');
      }
    } catch (err) {
      setEditError('Network error');
    } finally {
      setEditLoading(false);
    }
  };

  const handleDeleteJob = async () => {
    if (!deleteJobId) return;
    setDeleteLoading(true);
    setDeleteError(null);
    try {
      const res = await fetch(`${API_URL}/jobs/${deleteJobId}`, {
        method: 'DELETE',
        headers: { 'X-Admin-Token': token }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setDeleteJobId(null);
        fetchJobs();
      } else {
        setDeleteError(data.message || 'Failed to delete job');
      }
    } catch (err) {
      setDeleteError('Network error');
    } finally {
      setDeleteLoading(false);
    }
  };

  const fetchApplications = async (jobId) => {
    setAppsLoading(true);
    setAppsError(null);
    try {
      const res = await fetch(`${API_URL}/applications`);
      const data = await res.json();
      if (data.success) {
        setApplications(data.applications.filter(app => app.job_id === jobId));
        setShowAppsJob(jobId);
      } else {
        setAppsError(data.message || 'Failed to fetch applications');
      }
    } catch (err) {
      setAppsError('Network error');
    } finally {
      setAppsLoading(false);
    }
  };

  // Helper to count applications per job
  const getAppCount = (jobId) => allApplications.filter(app => app.job_id === jobId).length;

  // Prepare data for chart
  const chartData = jobs.map(job => ({ name: job.title, Applications: getAppCount(job.id) }));

  if (!isAuthenticated) {
    return (
      <div className="admin-login-page" style={{background: 'linear-gradient(135deg, #12c2e9 0%, #00bcd4 100%)', minHeight: '100vh'}}>
        <div className="container">
          <div className="row justify-content-center align-items-center min-vh-100">
            <div className="col-md-6 col-lg-4">
              <div className="card shadow-lg border-0">
                <div className="card-body p-5">
                  <div className="text-center mb-4">
                    <h3 className="fw-bold text-dark">Admin Login</h3>
                    <p className="text-muted">Enter your admin token to continue</p>
                  </div>
                  
                  <form onSubmit={handleLogin}>
                    <div className="mb-3">
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        placeholder="Enter admin token"
                        value={inputToken}
                        onChange={e => setInputToken(e.target.value)}
                        required
                      />
                    </div>
                    <button className="btn btn-primary btn-lg w-100" type="submit" aria-label="Login to Admin Jobs">Login</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Modal JSX for Add New Job
  const addJobModal = showAddModal ? ReactDOM.createPortal(
    <div
      className="modal show d-block add-job-modal-animate"
      style={{
        background: 'rgba(0,0,0,0.35)',
        position: 'fixed',
        inset: 0,
        zIndex: 1050,
        display: 'flex',
        paddingTop: '250px',
        paddingLeft: '650px',
      }}
      tabIndex={0}
    >
      <div className="card border-0 shadow-lg" style={{ borderRadius: '22px', overflow: 'hidden', maxWidth: 680, width: '100%', border: '1.5px solid #e0e7ef', boxShadow: '0 12px 32px rgba(67,206,162,0.13), 0 2px 8px rgba(0,0,0,0.08)' }}>
        <div className="card-header border-0 p-4 position-relative" style={{ background: 'linear-gradient(90deg, #43cea2 0%,rgb(24, 157, 135) 100%)', overflow: 'hidden' }}>
          <button type="button" className="btn-close position-absolute top-0 end-0 m-3" aria-label="Close Add Job Modal" style={{zIndex:2}} onClick={() => setShowAddModal(false)}></button>
          <div className="d-flex align-items-center position-relative">
            <div className="bg-white rounded-circle p-3 me-3" style={{border: '1px solid rgba(255,255,255,0.2)'}}>
              <i className="fas fa-briefcase" style={{fontSize: '1.5rem', color: '#43cea2'}}></i>
            </div>
            <div>
              <h5 className="modal-title mb-1 fw-bold text-white" style={{fontSize: '1.3rem'}}>Add New Job</h5>
              <small className="opacity-90 text-white">Post a new job opening</small>
            </div>
          </div>
        </div>
        <div className="dropdown-divider my-0" style={{height:'2px', background:'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)', opacity:0.12}}></div>
        
        <form onSubmit={handleAddJob}>
          <div className="card-body p-4" style={{background: '#fafbfc'}}>
            {addError && (
              <div className="alert border-0 mb-3" style={{ borderRadius: '12px', background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)', color: 'white', boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)', fontSize: '0.95rem' }}>
                <i className="fas fa-exclamation-triangle me-2"></i>
                <strong>Error:</strong> {addError}
              </div>
            )}
            
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold text-dark mb-1" htmlFor="jobTitle">
                  <i className="fas fa-briefcase me-2" style={{color:'#43cea2'}}></i>
                  Job Title *
                </label>
                <input id="jobTitle" className="form-control border-0 shadow-sm" placeholder="Enter job title" value={newJob.title} onChange={e => setNewJob(j => ({ ...j, title: e.target.value }))} required style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s' }} />
              </div>
              
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold text-dark mb-1" htmlFor="jobDept">
                  <i className="fas fa-building me-2" style={{color:'#43cea2'}}></i>
                  Department *
                </label>
                <input id="jobDept" className="form-control border-0 shadow-sm" placeholder="Enter department" value={newJob.department} onChange={e => setNewJob(j => ({ ...j, department: e.target.value }))} required style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s' }} />
              </div>
              
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold text-dark mb-1" htmlFor="jobLoc">
                  <i className="fas fa-map-marker-alt me-2" style={{color:'#43cea2'}}></i>
                  Location *
                </label>
                <input id="jobLoc" className="form-control border-0 shadow-sm" placeholder="Enter location" value={newJob.location} onChange={e => setNewJob(j => ({ ...j, location: e.target.value }))} required style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s' }} />
              </div>
              
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold text-dark mb-1" htmlFor="jobType">
                  <i className="fas fa-clock me-2" style={{color:'#43cea2'}}></i>
                  Type *
                </label>
                <select id="jobType" className="form-select border-0 shadow-sm" value={newJob.type} onChange={e => setNewJob(j => ({ ...j, type: e.target.value }))} required style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s', height: '48px' }}>
                  <option value="">Select Type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold text-dark mb-1" htmlFor="jobSalary">
                  <i className="fas fa-rupee-sign me-2" style={{color:'#43cea2'}}></i>
                  Salary Range
                </label>
                <input id="jobSalary" className="form-control border-0 shadow-sm" placeholder="Enter salary range" value={newJob.salary_range} onChange={e => setNewJob(j => ({ ...j, salary_range: e.target.value }))} style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s' }} />
              </div>
              
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold text-dark mb-1" htmlFor="jobBenefits">
                  <i className="fas fa-gift me-2" style={{color:'#43cea2'}}></i>
                  Benefits
                </label>
                <input id="jobBenefits" className="form-control border-0 shadow-sm" placeholder="Enter benefits" value={newJob.benefits} onChange={e => setNewJob(j => ({ ...j, benefits: e.target.value }))} style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s' }} />
              </div>
              
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold text-dark mb-1" htmlFor="jobSkills">
                  <i className="fas fa-tools me-2" style={{color:'#43cea2'}}></i>
                  Skills Required
                </label>
                <input id="jobSkills" className="form-control border-0 shadow-sm" placeholder="Enter required skills" value={newJob.skills || ''} onChange={e => setNewJob(j => ({ ...j, skills: e.target.value }))} style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s' }} />
              </div>
              
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold text-dark mb-1" htmlFor="jobWorkMode">
                  <i className="fas fa-laptop-house me-2" style={{color:'#43cea2'}}></i>
                  Work Mode
                </label>
                <select id="jobWorkMode" className="form-select border-0 shadow-sm" value={newJob.work_mode} onChange={e => setNewJob(j => ({ ...j, work_mode: e.target.value }))} style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s', height: '48px' }}>
                  <option value="">Work Mode</option>
                  <option value="Remote">Remote</option>
                  <option value="Onsite">Onsite</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              
              <div className="col-12">
                <label className="form-label fw-semibold text-dark mb-1" htmlFor="jobDesc">
                  <i className="fas fa-align-left me-2" style={{color:'#43cea2'}}></i>
                  Description *
                </label>
                <textarea id="jobDesc" className="form-control border-0 shadow-sm" placeholder="Enter job description" value={newJob.description} onChange={e => setNewJob(j => ({ ...j, description: e.target.value }))} required style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s', minHeight: '80px' }} />
              </div>
              
              <div className="col-12">
                <label className="form-label fw-semibold text-dark mb-1" htmlFor="jobReq">
                  <i className="fas fa-list me-2" style={{color:'#43cea2'}}></i>
                  Requirements
                </label>
                <textarea id="jobReq" className="form-control border-0 shadow-sm" placeholder="Enter requirements" value={newJob.requirements} onChange={e => setNewJob(j => ({ ...j, requirements: e.target.value }))} style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s', minHeight: '60px' }} />
              </div>
              
              <div className="col-12">
                <div className="form-check form-switch">
                  <input id="isActiveCheck" className="form-check-input" type="checkbox" checked={newJob.is_active} onChange={e => setNewJob(j => ({ ...j, is_active: e.target.checked }))} style={{width: '3rem', height: '1.5rem'}} />
                  <label className="form-check-label fw-semibold text-dark" htmlFor="isActiveCheck">
                    <i className="fas fa-toggle-on me-2" style={{color:'#43cea2'}}></i>
                    Active Job Posting
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="dropdown-divider my-4" style={{height:'2px', background:'#eee', opacity:0.7}}></div>
          <div className="d-flex justify-content-end gap-2 p-4">
            <button type="button" className="btn btn-outline-secondary px-4" onClick={() => setShowAddModal(false)} disabled={addLoading} aria-label="Cancel Add Job">Cancel</button>
            <button type="submit" className="btn px-4 add-job-btn-gradient" disabled={addLoading} style={{ borderRadius: '8px', fontWeight: '600', fontSize: '1.08rem', background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)', color: 'white', border: 'none' }} aria-label="Save New Job">
              {addLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Adding Job...
                </>
              ) : (
                <>
                  <i className="fas fa-plus me-2" style={{color:'#fff'}}></i>
                  Add Job
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <div className="admin-jobs-page" style={{background: 'linear-gradient(135deg, #12c2e9 0%, #00bcd4 100%)', minHeight: '100vh'}}>
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center py-3">
            <div className="d-flex align-items-center">
              <Link to="/admin" className="btn btn-outline-secondary btn-sm me-3" aria-label="Back to Admin Dashboard">
                <i className="fas fa-arrow-left me-1"></i>
                Back to Dashboard
              </Link>
              <div>
                <h4 className="mb-0 fw-bold text-dark">Job Management</h4>
                <small className="text-muted">Manage job postings and view applications</small>
              </div>
            </div>
            <button className="btn btn-success" onClick={() => setShowAddModal(true)} aria-label="Open Add Job Modal">
              <i className="fas fa-plus me-1"></i>
              Add New Job
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-5">
        {/* Dashboard Analytics */}
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-header bg-white border-0">
            <h5 className="fw-bold text-dark mb-0">
              <i className="fas fa-chart-bar me-2"></i>
              Applications per Job
            </h5>
          </div>
          <div className="card-body">
            {/*
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" interval={0} angle={-15} textAnchor="end" height={60} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="Applications" fill="#0FC2C0" />
              </BarChart>
            </ResponsiveContainer>
            */}
            <div className="alert alert-info mb-0">Chart temporarily disabled for debugging.</div>
          </div>
        </div>
        
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        
        {error && (
          <div className="alert alert-danger" role="alert">
            <i className="fas fa-exclamation-triangle me-2"></i>
            {error}
          </div>
        )}
        {showAddModal && addJobModal}
        {!loading && !error && jobs.length > 0 && (
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0">
              <h5 className="fw-bold text-dark mb-0">
                <i className="fas fa-briefcase me-2"></i>
                Job Listings
              </h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Title</th>
                      <th>Department</th>
                      <th>Location</th>
                      <th>Type</th>
                      <th>Applications</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map(job => (
                      <tr key={job.id}>
                        <td className="fw-bold">{job.title}</td>
                        <td>{job.department}</td>
                        <td>{job.location}</td>
                        <td>
                          <span className="badge bg-light text-dark">{job.type}</span>
                        </td>
                        <td>
                          <span className="badge bg-primary">{getAppCount(job.id)}</span>
                        </td>
                        <td>
                          <div className="btn-group" role="group">
                            <button 
                              className="btn btn-sm btn-outline-info" 
                              onClick={() => fetchApplications(job.id)}
                              aria-label={`View applications for ${job.title}`}
                            >
                              <i className="fas fa-users"></i>
                            </button>
                            <button 
                              className="btn btn-sm btn-outline-warning" 
                              onClick={() => handleEditJob(job)}
                              aria-label={`Edit job ${job.title}`}
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button 
                              className="btn btn-sm btn-outline-danger" 
                              onClick={() => setDeleteJobId(job.id)}
                              aria-label={`Delete job ${job.title}`}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && jobs.length === 0 && (
          <div className="text-center py-5">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-5">
                <i className="fas fa-briefcase text-muted" style={{fontSize: '3rem'}}></i>
                <h4 className="mt-3 text-muted">No jobs posted yet</h4>
                <p className="text-muted">Create your first job posting to get started.</p>
                <button className="btn btn-primary" onClick={() => setShowAddModal(true)} aria-label="Open Add Job Modal">
                  <i className="fas fa-plus me-1"></i>
                  Create First Job
                </button>
              </div>
            </div>
          </div>
        )}
        {editJob && (
          <div className="modal show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Job</h5>
                  <button type="button" className="btn-close" onClick={() => setEditJob(null)} aria-label="Close Edit Job Modal"></button>
                </div>
                <form onSubmit={handleUpdateJob}>
                  <div className="modal-body">
                    {editError && <div className="alert alert-danger">{editError}</div>}
                    <input className="form-control mb-2" placeholder="Title" value={editJob.title} onChange={e => setEditJob(j => ({ ...j, title: e.target.value }))} required />
                    <input className="form-control mb-2" placeholder="Department" value={editJob.department} onChange={e => setEditJob(j => ({ ...j, department: e.target.value }))} required />
                    <input className="form-control mb-2" placeholder="Location" value={editJob.location} onChange={e => setEditJob(j => ({ ...j, location: e.target.value }))} required />
                    <select className="form-control mb-2" value={editJob.type} onChange={e => setEditJob(j => ({ ...j, type: e.target.value }))} required>
                      <option value="">Select Type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Internship">Internship</option>
                    </select>
                    <textarea className="form-control mb-2" placeholder="Description" value={editJob.description} onChange={e => setEditJob(j => ({ ...j, description: e.target.value }))} required />
                    <textarea className="form-control mb-2" placeholder="Requirements" value={editJob.requirements} onChange={e => setEditJob(j => ({ ...j, requirements: e.target.value }))} />
                    <input className="form-control mb-2" placeholder="Salary Range" value={editJob.salary_range} onChange={e => setEditJob(j => ({ ...j, salary_range: e.target.value }))} />
                    <input className="form-control mb-2" placeholder="Benefits" value={editJob.benefits} onChange={e => setEditJob(j => ({ ...j, benefits: e.target.value }))} />
                    <select className="form-control mb-2" value={editJob.work_mode} onChange={e => setEditJob(j => ({ ...j, work_mode: e.target.value }))}>
                      <option value="">Work Mode</option>
                      <option value="Remote">Remote</option>
                      <option value="Onsite">Onsite</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                    <div className="form-check mb-2">
                      <input className="form-check-input" type="checkbox" checked={editJob.is_active} onChange={e => setEditJob(j => ({ ...j, is_active: e.target.checked }))} id="editIsActiveCheck" />
                      <label className="form-check-label" htmlFor="editIsActiveCheck">Active</label>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-primary" disabled={editLoading} aria-label="Save Edited Job">{editLoading ? 'Saving...' : 'Save Changes'}</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setEditJob(null)} disabled={editLoading} aria-label="Cancel Edit Job">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        {deleteJobId && (
          <div className="modal show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Delete</h5>
                  <button type="button" className="btn-close" onClick={() => setDeleteJobId(null)} aria-label="Close Delete Job Modal"></button>
                </div>
                <div className="modal-body">
                  {deleteError && <div className="alert alert-danger">{deleteError}</div>}
                  <p>Are you sure you want to delete this job?</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-danger" onClick={handleDeleteJob} disabled={deleteLoading} aria-label="Confirm Delete Job">{deleteLoading ? 'Deleting...' : 'Delete'}</button>
                  <button className="btn btn-secondary" onClick={() => setDeleteJobId(null)} disabled={deleteLoading} aria-label="Cancel Delete Job">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}
        {showAppsJob && (
          <div className="modal show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Applications for Job #{showAppsJob}</h5>
                  <button type="button" className="btn-close" onClick={() => setShowAppsJob(null)} aria-label="Close Applications Modal"></button>
                </div>
                <div className="modal-body">
                  {appsLoading && <div>Loading applications...</div>}
                  {appsError && <div className="alert alert-danger">{appsError}</div>}
                  {applications.length === 0 && !appsLoading && <div>No applications for this job.</div>}
                  {applications.length > 0 && (
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Experience</th>
                          <th>Resume</th>
                        </tr>
                      </thead>
                      <tbody>
                        {applications.map(app => (
                          <tr key={app.id}>
                            <td>{app.name}</td>
                            <td>{app.email}</td>
                            <td>{app.phone}</td>
                            <td>{app.experience}</td>
                            <td>{app.resume_file ? <a href={`${API_URL}/uploads/resumes/${app.resume_file}`} target="_blank" rel="noopener noreferrer" aria-label={`Download resume for ${app.name}`}>Download</a> : 'N/A'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowAppsJob(null)} aria-label="Close Applications Modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminJobs; 