import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

const API_URL = '/api/admin/team';

const AdminTeam = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    role: '',
    bio: '',
    photo_url: '',
    social_links: '',
    is_active: true,
  });

  // Fetch all team members
  const fetchTeam = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setTeam(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch team members');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  // Handle form input
  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  // Open form for add/edit
  const openForm = (member = null) => {
    if (member) {
      setEditingMember(member);
      setForm({ ...member });
    } else {
      setEditingMember(null);
      setForm({ name: '', role: '', bio: '', photo_url: '', social_links: '', is_active: true });
    }
    setShowForm(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  // Close form
  const closeForm = () => {
    setShowForm(false);
    setEditingMember(null);
    setForm({ name: '', role: '', bio: '', photo_url: '', social_links: '', is_active: true });
    setSubmitting(false);
    // Restore body scroll
    document.body.style.overflow = 'unset';
  };

  // Submit form
  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingMember) {
        await axios.put(`${API_URL}/${editingMember.id}`, form);
      } else {
        await axios.post(API_URL, form);
      }
      closeForm();
      fetchTeam();
    } catch (err) {
      setError('Failed to save team member');
    } finally {
      setSubmitting(false);
    }
  };

  // Delete member
  const handleDelete = async id => {
    if (!window.confirm('Delete this team member?')) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTeam();
    } catch (err) {
      setError('Failed to delete team member');
    }
  };

  // Modal JSX for Add/Edit Team Member
  const addTeamModal = showForm ? ReactDOM.createPortal(
    <div
      className="modal show d-block add-team-modal-animate"
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
      <div className="card border-0 shadow-lg" style={{ borderRadius: '22px', overflow: 'hidden', maxWidth: 540, width: '100%', border: '1.5px solid #e0e7ef', boxShadow: '0 12px 32px rgba(67,206,162,0.13), 0 2px 8px rgba(0,0,0,0.08)' }}>
        <div className="card-header border-0 p-4 position-relative" style={{ background: 'linear-gradient(90deg, #43cea2 0%,rgb(24, 157, 135) 100%)', overflow: 'hidden' }}>
          <button type="button" className="btn-close position-absolute top-0 end-0 m-3" aria-label="Close Team Member Modal" style={{zIndex:2}} onClick={closeForm}></button>
          <div className="d-flex align-items-center position-relative">
            <div className="bg-white rounded-circle p-3 me-3" style={{border: '1px solid rgba(255,255,255,0.2)'}}>
              <i className="fas fa-user-plus" style={{fontSize: '1.5rem', color: '#43cea2'}}></i>
            </div>
            <div>
              <h5 className="modal-title mb-1 fw-bold text-white" style={{fontSize: '1.3rem'}}>{editingMember ? 'Edit Team Member' : 'Add New Team Member'}</h5>
              <small className="opacity-90 text-white">{editingMember ? 'Update team member details' : 'Add a new team member'}</small>
            </div>
          </div>
        </div>
        <div className="dropdown-divider my-0" style={{height:'2px', background:'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)', opacity:0.12}}></div>
        
        <form onSubmit={handleSubmit}>
          <div className="card-body p-4" style={{background: '#fafbfc'}}>
            {error && (
              <div className="alert border-0 mb-3" style={{ borderRadius: '12px', background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)', color: 'white', boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)', fontSize: '0.95rem' }}>
                <i className="fas fa-exclamation-triangle me-2"></i>
                <strong>Error:</strong> {error}
              </div>
            )}
            
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold text-dark mb-1" htmlFor="teamName">
                  <i className="fas fa-user me-2" style={{color:'#43cea2'}}></i>
                  Full Name *
                </label>
                <input id="teamName" className="form-control border-0 shadow-sm" placeholder="Enter full name" name="name" value={form.name} onChange={handleChange} required style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s' }} />
              </div>
              
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold text-dark mb-1" htmlFor="teamRole">
                  <i className="fas fa-briefcase me-2" style={{color:'#43cea2'}}></i>
                  Role/Position *
                </label>
                <input id="teamRole" className="form-control border-0 shadow-sm" placeholder="e.g., CEO, Developer, Designer" name="role" value={form.role} onChange={handleChange} required style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s' }} />
              </div>
              
              <div className="col-12">
                <label className="form-label fw-semibold text-dark mb-1" htmlFor="teamBio">
                  <i className="fas fa-info-circle me-2" style={{color:'#43cea2'}}></i>
                  Bio/Description
                </label>
                <textarea id="teamBio" className="form-control border-0 shadow-sm" placeholder="Tell us about this team member..." name="bio" value={form.bio} onChange={handleChange} rows="4" style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s', resize: 'none' }} />
              </div>
              
              <div className="col-12">
                <label className="form-label fw-semibold text-dark mb-1" htmlFor="teamPhoto">
                  <i className="fas fa-image me-2" style={{color:'#43cea2'}}></i>
                  Profile Photo URL
                </label>
                <input id="teamPhoto" className="form-control border-0 shadow-sm" placeholder="https://example.com/photo.jpg" type="url" name="photo_url" value={form.photo_url} onChange={handleChange} style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s' }} />
                <small className="text-muted">
                  <i className="fas fa-info-circle me-1"></i>
                  Enter a valid image URL for the profile photo
                </small>
              </div>
              
              <div className="col-12">
                <label className="form-label fw-semibold text-dark mb-1" htmlFor="teamSocial">
                  <i className="fas fa-link me-2" style={{color:'#43cea2'}}></i>
                  Social Media Links
                </label>
                <input id="teamSocial" className="form-control border-0 shadow-sm" placeholder="LinkedIn, Twitter, GitHub (comma separated)" name="social_links" value={form.social_links} onChange={handleChange} style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s' }} />
                <small className="text-muted">
                  <i className="fas fa-info-circle me-1"></i>
                  Separate multiple links with commas
                </small>
              </div>
              
              <div className="col-12">
                <div className="form-check form-switch">
                  <input id="isActiveCheck" className="form-check-input" type="checkbox" name="is_active" checked={form.is_active} onChange={handleChange} style={{width: '3rem', height: '1.5rem'}} />
                  <label className="form-check-label fw-semibold text-dark" htmlFor="isActiveCheck">
                    <i className="fas fa-toggle-on me-2" style={{color:'#43cea2'}}></i>
                    Active Team Member
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="dropdown-divider my-4" style={{height:'2px', background:'#eee', opacity:0.7}}></div>
          <div className="d-flex justify-content-end gap-2 p-4">
            <button type="button" className="btn btn-outline-secondary px-4" onClick={closeForm} disabled={submitting} aria-label="Cancel Team Member">Cancel</button>
            <button type="submit" className="btn px-4 add-team-btn-gradient" disabled={submitting} style={{ borderRadius: '8px', fontWeight: '600', fontSize: '1.08rem', background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)', color: 'white', border: 'none' }} aria-label="Save Team Member">
              {submitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Saving...
                </>
              ) : (
                <>
                  <i className="fas fa-save me-2" style={{color:'#fff'}}></i>
                  {editingMember ? 'Update Member' : 'Add Member'}
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
    <div className="admin-team-page" style={{background: 'linear-gradient(135deg, #12c2e9 0%, #00bcd4 100%)', minHeight: '100vh'}}>
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
                <h4 className="mb-0 fw-bold text-dark">Team Management</h4>
                <small className="text-muted">Manage all team members</small>
              </div>
            </div>
            <div className="position-relative">
              <button 
                className="btn btn-primary" 
                onClick={() => openForm()} 
                aria-label="Add Team Member"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 24px',
                  fontWeight: 600,
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                  transition: 'all 0.3s ease'
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
                <i className="fas fa-plus me-2"></i>
                Add Team Member
              </button>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
          <button type="button" className="btn-close" onClick={() => setError(null)} aria-label="Close error message"></button>
        </div>
      )}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading team members...</p>
        </div>
      ) : (
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-0 py-3">
            <h5 className="mb-0">
              <i className="fas fa-users me-2 text-primary"></i>
              Team Members ({team.length})
            </h5>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Bio</th>
                    <th>Social Links</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {team.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-5 text-muted">
                        <i className="fas fa-users fa-3x mb-3 d-block"></i>
                        <h5>No team members yet</h5>
                        <p>Add your first team member to get started.</p>
                      </td>
                    </tr>
                  ) : (
                    team.map(member => (
                      <tr key={member.id}>
                        <td>
                          {member.photo_url ? (
                            <img 
                              src={member.photo_url} 
                              alt={`${member.name} profile`} 
                              style={{
                                width: 50, 
                                height: 50, 
                                objectFit: 'cover', 
                                borderRadius: '50%',
                                border: '3px solid #f8f9fa'
                              }} 
                            />
                          ) : (
                            <div 
                              style={{
                                width: 50, 
                                height: 50, 
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '18px'
                              }}
                            >
                              {member.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </td>
                        <td>
                          <div>
                            <div className="fw-semibold">{member.name}</div>
                          </div>
                        </td>
                        <td>
                          <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2">
                            {member.role}
                          </span>
                        </td>
                        <td style={{maxWidth: 250}}>
                          <div className="text-muted" style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}>
                            {member.bio || 'No bio available'}
                          </div>
                        </td>
                        <td style={{maxWidth: 150}}>
                          <div className="text-muted" style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}>
                            {member.social_links || 'No links'}
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${member.is_active ? 'bg-success' : 'bg-secondary'}`}>
                            {member.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <button 
                              className="btn btn-outline-primary" 
                              onClick={() => openForm(member)} 
                              aria-label={`Edit team member ${member.name}`}
                              title="Edit"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button 
                              className="btn btn-outline-danger" 
                              onClick={() => handleDelete(member.id)} 
                              aria-label={`Delete team member ${member.name}`}
                              title="Delete"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Add/Edit Form Modal */}
      {showForm && addTeamModal}
    </div>
  );
};

export default AdminTeam; 