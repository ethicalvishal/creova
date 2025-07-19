import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './AdminUsers.css';
import { API_URL } from '../constants';

const AdminUsers = () => {
  const [token] = useState(localStorage.getItem('adminToken') || '');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const [addUser, setAddUser] = useState({ name: '', email: '', password: '' });
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState(null);
  const [addSuccess, setAddSuccess] = useState(null);
  const addDropdownRef = useRef(null);

  // Move fetchUsers above useEffect to avoid initialization error
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL.replace('/careers','').replace('/blog','')}/user/list`, {
        headers: { 'X-Admin-Token': token }
      });
      const data = await res.json();
      if (data.success) setUsers(data.users);
      else setError(data.message || 'Failed to fetch users');
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!showAddDropdown) return;
    function handleClickOutside(event) {
      if (addDropdownRef.current && !addDropdownRef.current.contains(event.target)) {
        setShowAddDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showAddDropdown]);

  const handleDeleteUser = async () => {
    if (!deleteUserId) return;
    setDeleteLoading(true);
    setDeleteError(null);
    try {
      const res = await fetch(`${API_URL.replace('/careers','').replace('/blog','')}/user/delete/${deleteUserId}`, {
        method: 'DELETE',
        headers: { 'X-Admin-Token': token }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setUsers(users => users.filter(u => u.id !== deleteUserId));
        setDeleteUserId(null);
      } else {
        setDeleteError(data.message || 'Failed to delete user');
      }
    } catch (err) {
      setDeleteError('Network error');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setAddLoading(true);
    setAddError(null);
    setAddSuccess(null);
    try {
      const res = await fetch(`${API_URL.replace('/careers','').replace('/blog','')}/user/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Token': token
        },
        body: JSON.stringify(addUser)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setAddSuccess('User added successfully!');
        setAddUser({ name: '', email: '', password: '' });
        fetchUsers();
        setTimeout(() => {
          setShowAddDropdown(false);
          setAddSuccess(null);
        }, 1200);
      } else {
        setAddError(data.message || 'Failed to add user');
      }
    } catch (err) {
      setAddError('Network error');
    } finally {
      setAddLoading(false);
    }
  };

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  // Modal JSX for Add New User
  const addUserModal = showAddDropdown ? ReactDOM.createPortal(
    <div
      ref={addDropdownRef}
      className="modal show d-block add-user-modal-animate"
      style={{
        background: 'rgba(0,0,0,0.35)',
        position: 'fixed',
        inset: 0,
        // width: '100vw',
        // height: '100vh',
        zIndex: 1050,
        display: 'flex',
        paddingTop: '250px',
        paddingLeft: '650px',
      }}
      tabIndex={0}
    >
      <div className="card border-0 shadow-lg" style={{ borderRadius: '22px', overflow: 'hidden', maxWidth: 540, width: '100%', border: '1.5px solid #e0e7ef', boxShadow: '0 12px 32px rgba(67,206,162,0.13), 0 2px 8px rgba(0,0,0,0.08)' }}>
        <div className="card-header border-0 p-4 position-relative" style={{ background: 'linear-gradient(90deg, #43cea2 0%,rgb(24, 157, 135) 100%)', overflow: 'hidden' }}>
          <button type="button" className="btn-close position-absolute top-0 end-0 m-3" aria-label="Close Add User Dropdown" style={{zIndex:2}} onClick={() => setShowAddDropdown(false)}></button>
          <div className="d-flex align-items-center position-relative">
            <div className="bg-white rounded-circle p-3 me-3" style={{border: '1px solid rgba(255,255,255,0.2)'}}>
              <i className="fas fa-user-plus" style={{fontSize: '1.5rem', color: '#43cea2'}}></i>
            </div>
            <div>
              <h5 className="modal-title mb-1 fw-bold text-white" style={{fontSize: '1.3rem'}}>Add New User</h5>
              <small className="opacity-90 text-white">Register a new user account</small>
            </div>
          </div>
        </div>
        <div className="dropdown-divider my-0" style={{height:'2px', background:'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)', opacity:0.12}}></div>
        <form onSubmit={handleAddUser}>
          <div className="card-body p-4" style={{background: '#fafbfc'}}>
            {addError && (
              <div className="alert border-0 mb-3" style={{ borderRadius: '12px', background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)', color: 'white', boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)', fontSize: '0.95rem' }}>
                <i className="fas fa-exclamation-triangle me-2"></i>
                <strong>Error:</strong> {addError}
              </div>
            )}
            {addSuccess && (
              <div className="alert border-0 mb-3" style={{ borderRadius: '12px', background: 'linear-gradient(135deg, #38ef7d 0%, #11998e 100%)', color: 'white', boxShadow: '0 4px 15px rgba(56, 239, 125, 0.3)', fontSize: '0.95rem' }}>
                <i className="fas fa-check-circle me-2"></i>
                {addSuccess}
              </div>
            )}
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold text-dark mb-1" htmlFor="addUserNameDropdown">
                  <i className="fas fa-user me-2" style={{color:'#43cea2'}}></i>
                  Full Name *
                </label>
                <input id="addUserNameDropdown" className="form-control border-0 shadow-sm" placeholder="Enter full name" value={addUser.name} onChange={e => setAddUser(u => ({ ...u, name: e.target.value }))} required style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s' }} />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold text-dark mb-1" htmlFor="addUserUsernameDropdown">
                  <i className="fas fa-user-circle me-2" style={{color:'#43cea2'}}></i>
                  Username
                </label>
                <input id="addUserUsernameDropdown" className="form-control border-0 shadow-sm" placeholder="Enter username" value={addUser.username || ''} onChange={e => setAddUser(u => ({ ...u, username: e.target.value }))} style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s' }} />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold text-dark mb-1" htmlFor="addUserEmailDropdown">
                  <i className="fas fa-envelope me-2" style={{color:'#43cea2'}}></i>
                  Email Address *
                </label>
                <input id="addUserEmailDropdown" className="form-control border-0 shadow-sm" placeholder="Enter email address" type="email" value={addUser.email} onChange={e => setAddUser(u => ({ ...u, email: e.target.value }))} required style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s' }} />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold text-dark mb-1" htmlFor="addUserPhoneDropdown">
                  <i className="fas fa-phone me-2" style={{color:'#43cea2'}}></i>
                  Phone Number
                </label>
                <input id="addUserPhoneDropdown" className="form-control border-0 shadow-sm" placeholder="Enter phone number" value={addUser.phone || ''} onChange={e => setAddUser(u => ({ ...u, phone: e.target.value }))} style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s' }} />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold text-dark mb-1" htmlFor="addUserRoleDropdown">
                  <i className="fas fa-user-tag me-2" style={{color:'#43cea2'}}></i>
                  User Role
                </label>
                <select id="addUserRoleDropdown" className="form-select border-0 shadow-sm" value={addUser.role || 'User'} onChange={e => setAddUser(u => ({ ...u, role: e.target.value }))} style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s' }}>
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                  <option value="HR">HR</option>
                </select>
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold text-dark mb-1" htmlFor="addUserPasswordDropdown">
                  <i className="fas fa-lock me-2" style={{color:'#43cea2'}}></i>
                  Password *
                </label>
                <input id="addUserPasswordDropdown" className="form-control border-0 shadow-sm" placeholder="Enter password" type="password" value={addUser.password} onChange={e => setAddUser(u => ({ ...u, password: e.target.value }))} required style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s' }} />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold text-dark mb-1" htmlFor="addUserConfirmPasswordDropdown">
                  <i className="fas fa-lock me-2" style={{color:'#43cea2'}}></i>
                  Confirm Password *
                </label>
                <input id="addUserConfirmPasswordDropdown" className="form-control border-0 shadow-sm" placeholder="Confirm password" type="password" value={addUser.confirmPassword || ''} onChange={e => setAddUser(u => ({ ...u, confirmPassword: e.target.value }))} required style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s' }} />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold text-dark mb-1" htmlFor="addUserProfilePicDropdown">
                  <i className="fas fa-image me-2" style={{color:'#43cea2'}}></i>
                  Upload Profile Picture
                </label>
                <input id="addUserProfilePicDropdown" className="form-control border-0 shadow-sm" type="file" accept="image/*" onChange={e => setAddUser(u => ({ ...u, profilePic: e.target.files[0] }))} style={{ borderRadius: '12px', background: 'white', padding: '8px 12px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s' }} />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold text-dark mb-1" htmlFor="addUserDobDropdown">
                  <i className="fas fa-calendar-alt me-2" style={{color:'#43cea2'}}></i>
                  Date of Birth
                </label>
                <input id="addUserDobDropdown" className="form-control border-0 shadow-sm" type="date" value={addUser.dob || ''} onChange={e => setAddUser(u => ({ ...u, dob: e.target.value }))} style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s' }} />
              </div>
              <div className="col-12">
                <label className="form-label fw-semibold text-dark mb-1" htmlFor="addUserAddressDropdown">
                  <i className="fas fa-map-marker-alt me-2" style={{color:'#43cea2'}}></i>
                  Address
                </label>
                <textarea id="addUserAddressDropdown" className="form-control border-0 shadow-sm" placeholder="Enter address" value={addUser.address || ''} onChange={e => setAddUser(u => ({ ...u, address: e.target.value }))} style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s', minHeight: '48px' }} />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold text-dark mb-1" htmlFor="addUserCountryDropdown">
                  <i className="fas fa-flag me-2" style={{color:'#43cea2'}}></i>
                  Country/State
                </label>
                <input id="addUserCountryDropdown" className="form-control border-0 shadow-sm" placeholder="Enter country or state" value={addUser.country || ''} onChange={e => setAddUser(u => ({ ...u, country: e.target.value }))} style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s' }} />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold text-dark mb-1" htmlFor="addUserStatusDropdown">
                  <i className="fas fa-toggle-on me-2" style={{color:'#43cea2'}}></i>
                  Account Status
                </label>
                <select id="addUserStatusDropdown" className="form-select border-0 shadow-sm" value={addUser.status || 'Active'} onChange={e => setAddUser(u => ({ ...u, status: e.target.value }))} style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s' }}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="col-12 col-md-6 d-flex align-items-center">
                <input id="addUser2faDropdown" className="form-check-input me-2" type="checkbox" checked={!!addUser.enable2fa} onChange={e => setAddUser(u => ({ ...u, enable2fa: e.target.checked }))} />
                <label className="form-check-label fw-semibold text-dark" htmlFor="addUser2faDropdown">
                  <i className="fas fa-shield-alt me-2" style={{color:'#43cea2'}}></i>
                  Enable 2FA?
                </label>
              </div>
              <div className="col-12 col-md-6 d-flex align-items-center">
                <input id="addUserWelcomeDropdown" className="form-check-input me-2" type="checkbox" checked={!!addUser.sendWelcome} onChange={e => setAddUser(u => ({ ...u, sendWelcome: e.target.checked }))} />
                <label className="form-check-label fw-semibold text-dark" htmlFor="addUserWelcomeDropdown">
                  <i className="fas fa-envelope-open-text me-2" style={{color:'#43cea2'}}></i>
                  Send welcome email?
                </label>
              </div>
            </div>
            <div className="dropdown-divider my-4" style={{height:'2px', background:'#eee', opacity:0.7}}></div>
            <div className="d-flex justify-content-end gap-2">
              <button type="button" className="btn btn-outline-secondary px-4" onClick={() => setShowAddDropdown(false)} disabled={addLoading} aria-label="Cancel Add User">Cancel</button>
              <button type="submit" className="btn px-4 add-user-btn-gradient" disabled={addLoading} style={{ borderRadius: '8px', fontWeight: '600', fontSize: '1.08rem', background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)', color: 'white', border: 'none' }} aria-label="Save New User">
                <i className="fas fa-user-plus me-2" style={{color:'#fff'}}></i>
                Add User
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <div className="admin-users-page" style={{background: 'linear-gradient(135deg, #12c2e9 0%, #00bcd4 100%)', minHeight: '100vh'}}>
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
                <h4 className="mb-0 fw-bold text-dark">User Management</h4>
                <small className="text-muted">Manage all registered users</small>
              </div>
            </div>
            <div className="position-relative">
              <button
                className="btn btn-success"
                onClick={() => setShowAddDropdown(v => !v)}
                aria-label="Toggle Add User Dropdown"
                style={{ position: 'relative', zIndex: 2 }}
              >
                <i className="fas fa-plus me-1"></i>
                Add New User
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Render modal at the root so it overlays the whole page */}
      {addUserModal}
      {/* Main Content */}
      <div className="container py-5">
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body p-4">
            <div className="mb-4">
              <input
                type="text"
                className="form-control form-control-lg shadow-sm"
                placeholder="Search by name or email..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ borderRadius: '14px', fontSize: '1.05rem' }}
              />
            </div>
            {loading && (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
            {error && (
              <div className="alert alert-danger">{error}</div>
            )}
            {!loading && !error && filteredUsers.length === 0 && (
              <div className="text-muted">No users found.</div>
            )}
            {!loading && !error && filteredUsers.length > 0 && (
              <div className="table-responsive">
                <table className="table table-hover mb-0" style={{ borderRadius: '16px', overflow: 'hidden' }}>
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Registration Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(user => (
                      <tr key={user.id} className="user-row">
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.created_at ? new Date(user.created_at).toLocaleString() : ''}</td>
                        <td><span className="badge bg-success bg-opacity-10 text-success">Active</span></td>
                        <td>
                          <button className="btn btn-danger btn-sm rounded-pill px-3" onClick={() => setDeleteUserId(user.id)} aria-label={`Delete user ${user.name}`}></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {/* Delete User Modal */}
            {deleteUserId && (
              <div className="modal show d-block" tabIndex="-1" style={{background: 'rgba(0,0,0,0.5)'}}>
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Confirm Delete</h5>
                      <button type="button" className="btn-close" onClick={() => setDeleteUserId(null)} aria-label="Close Delete User Modal"></button>
                    </div>
                    <div className="modal-body">
                      {deleteError && <div className="alert alert-danger">{deleteError}</div>}
                      <p>Are you sure you want to delete this user? This action cannot be undone.</p>
                    </div>
                    <div className="modal-footer">
                      <button className="btn btn-danger" onClick={handleDeleteUser} disabled={deleteLoading} aria-label="Confirm Delete User">
                        {deleteLoading ? 'Deleting...' : 'Delete'}
                      </button>
                      <button className="btn btn-secondary" onClick={() => setDeleteUserId(null)} disabled={deleteLoading} aria-label="Cancel Delete User">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers; 