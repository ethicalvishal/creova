import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../constants';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    features: '',
    icon: '',
    image_url: '',
    status: 'active',
  });

  // Fetch all services
  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setServices(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch services');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Handle form input
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Open form for add/edit
  const openForm = (service = null) => {
    if (service) {
      setEditingService(service);
      setForm({ ...service });
    } else {
      setEditingService(null);
      setForm({ title: '', description: '', features: '', icon: '', image_url: '', status: 'active' });
    }
    setShowForm(true);
  };

  // Submit form
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editingService) {
        await axios.put(`${API_URL}/${editingService.id}`, form);
      } else {
        await axios.post(API_URL, form);
      }
      setShowForm(false);
      fetchServices();
    } catch (err) {
      setError('Failed to save service');
    }
  };

  // Delete service
  const handleDelete = async id => {
    if (!window.confirm('Delete this service?')) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchServices();
    } catch (err) {
      setError('Failed to delete service');
    }
  };

  return (
    <div className="admin-services-page" style={{background: 'linear-gradient(135deg, #12c2e9 0%, #00bcd4 100%)', minHeight: '100vh'}}>
      {/* Header - Match AdminUsers */}
      <div className="bg-white shadow-sm">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center py-3">
            <div className="d-flex align-items-center">
              <a href="/admin" className="btn btn-outline-secondary btn-sm me-3" aria-label="Back to Admin Dashboard">
                <i className="fas fa-arrow-left me-1"></i>
                Back to Dashboard
              </a>
              <div>
                <h4 className="mb-0 fw-bold text-dark">Services Management</h4>
                <small className="text-muted">Manage all services offered by your company</small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-5">
        <h2 className="mb-4">Admin: Manage Services</h2>
        <button className="btn btn-primary mb-3" onClick={() => openForm()} aria-label="Add Service">Add Service</button>
        {error && <div className="alert alert-danger">{error}</div>}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Features</th>
                  <th>Icon</th>
                  <th>Image</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map(service => (
                  <tr key={service.id}>
                    <td>{service.title}</td>
                    <td style={{maxWidth: 200, whiteSpace: 'pre-line'}}>{service.description}</td>
                    <td style={{maxWidth: 150, whiteSpace: 'pre-line'}}>{service.features}</td>
                    <td>{service.icon}</td>
                    <td>{service.image_url && <img src={service.image_url} alt="icon" style={{width: 40, height: 40, objectFit: 'cover'}} />}</td>
                    <td>{service.status}</td>
                    <td>
                      <button className="btn btn-sm btn-info me-2" onClick={() => openForm(service)} aria-label={`Edit service ${service.name}`}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(service.id)} aria-label={`Delete service ${service.name}`}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Add/Edit Form Modal */}
        {showForm && (
          <div className="modal show d-block" tabIndex="-1" style={{background: 'rgba(0,0,0,0.35)', paddingTop: '120px'}}>
            <div className="modal-dialog">
              <div className="modal-content glass-card" style={{ borderRadius: 22, overflow: 'hidden', maxWidth: 540, width: '100%', border: '1.5px solid #e0e7ef', boxShadow: '0 12px 32px rgba(67,206,162,0.13), 0 2px 8px rgba(0,0,0,0.08)' }}>
                <div className="card-header border-0 p-4 position-relative" style={{ background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)', overflow: 'hidden' }}>
                  <button type="button" className="btn-close position-absolute top-0 end-0 m-3" aria-label="Close Service Modal" style={{zIndex:2}} onClick={() => setShowForm(false)}></button>
                  <div className="d-flex align-items-center position-relative">
                    <div className="bg-white rounded-circle p-3 me-3" style={{border: '1px solid rgba(255,255,255,0.2)'}}>
                      <i className="fas fa-cogs" style={{fontSize: '1.5rem', color: '#43cea2'}}></i>
                    </div>
                    <div>
                      <h5 className="modal-title mb-1 fw-bold text-white" style={{fontSize: '1.3rem'}}>{editingService ? 'Edit Service' : 'Add Service'}</h5>
                      <small className="opacity-90 text-white">{editingService ? 'Update service details' : 'Add a new service'}</small>
                    </div>
                  </div>
                </div>
                <div className="dropdown-divider my-0" style={{height:'2px', background:'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)', opacity:0.12}}></div>
                <form onSubmit={handleSubmit}>
                  <div className="card-body p-4" style={{background: '#fafbfc'}}>
                    <div className="row g-3">
                      <div className="col-12 col-md-6">
                        <label className="form-label fw-semibold text-dark mb-1">Title *</label>
                        <input type="text" className="form-control border-0 shadow-sm" name="title" value={form.title} onChange={handleChange} required style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s' }} />
                      </div>
                      <div className="col-12 col-md-6">
                        <label className="form-label fw-semibold text-dark mb-1">Icon (emoji or class)</label>
                        <input type="text" className="form-control border-0 shadow-sm" name="icon" value={form.icon} onChange={handleChange} style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s' }} />
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-semibold text-dark mb-1">Description *</label>
                        <textarea className="form-control border-0 shadow-sm" name="description" value={form.description} onChange={handleChange} required rows={3} style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s', resize: 'none' }} />
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-semibold text-dark mb-1">Features (comma separated)</label>
                        <input type="text" className="form-control border-0 shadow-sm" name="features" value={form.features} onChange={handleChange} style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s' }} />
                      </div>
                      <div className="col-12 col-md-6">
                        <label className="form-label fw-semibold text-dark mb-1">Image URL</label>
                        <input type="text" className="form-control border-0 shadow-sm" name="image_url" value={form.image_url} onChange={handleChange} style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s' }} />
                      </div>
                      <div className="col-12 col-md-6">
                        <label className="form-label fw-semibold text-dark mb-1">Status</label>
                        <select className="form-select border-0 shadow-sm" name="status" value={form.status} onChange={handleChange} style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s' }}>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-divider my-0" style={{height:'2px', background:'#eee', opacity:0.7}}></div>
                  <div className="d-flex justify-content-end gap-2 p-4">
                    <button type="button" className="btn btn-outline-secondary px-4" onClick={() => setShowForm(false)}>Cancel</button>
                    <button type="submit" className="btn px-4 add-user-btn-gradient" style={{ borderRadius: '8px', fontWeight: '600', fontSize: '1.08rem', background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)', color: 'white', border: 'none' }}>
                      <i className="fas fa-cogs me-2" style={{color:'#fff'}}></i>
                      {editingService ? 'Save Changes' : 'Add Service'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminServices; 