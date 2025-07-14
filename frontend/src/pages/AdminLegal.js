import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../constants';

const AdminLegal = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingPage, setEditingPage] = useState(null);
  const [form, setForm] = useState({
    page_type: '',
    content: '',
  });

  // Fetch all legal pages
  const fetchPages = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setPages(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch legal pages');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPages();
  }, []);

  // Handle form input
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Open form for add/edit
  const openForm = (page = null) => {
    if (page) {
      setEditingPage(page);
      setForm({ ...page });
    } else {
      setEditingPage(null);
      setForm({ page_type: '', content: '' });
    }
    setShowForm(true);
  };

  // Submit form
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editingPage) {
        await axios.put(`${API_URL}/${editingPage.id}`, form);
      } else {
        await axios.post(API_URL, form);
      }
      setShowForm(false);
      fetchPages();
    } catch (err) {
      setError('Failed to save legal page');
    }
  };

  // Delete page
  const handleDelete = async id => {
    if (!window.confirm('Delete this legal page?')) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchPages();
    } catch (err) {
      setError('Failed to delete legal page');
    }
  };

  return (
    <div className="admin-legal-page" style={{background: 'linear-gradient(135deg, #12c2e9 0%, #00bcd4 100%)', minHeight: '100vh'}}>
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
                <h4 className="mb-0 fw-bold text-dark">Legal Pages</h4>
                <small className="text-muted">Manage all legal and policy pages</small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-5">
        <h2 className="mb-4">Admin: Manage Legal Pages</h2>
        <button className="btn btn-primary mb-3" onClick={() => openForm()} aria-label="Add Legal Page">Add Legal Page</button>
        {error && <div className="alert alert-danger">{error}</div>}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>Type</th>
                  <th>Content (Preview)</th>
                  <th>Last Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pages.map(page => (
                  <tr key={page.id}>
                    <td>{page.page_type}</td>
                    <td style={{maxWidth: 300, whiteSpace: 'pre-line'}}>{page.content.slice(0, 80)}{page.content.length > 80 ? '...' : ''}</td>
                    <td>{new Date(page.updated_at).toLocaleString()}</td>
                    <td>
                      <button className="btn btn-sm btn-info me-2" onClick={() => openForm(page)} aria-label={`Edit legal page ${page.title}`}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(page.id)} aria-label={`Delete legal page ${page.title}`}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Add/Edit Form Modal */}
        {showForm && (
          <div className="modal show d-block" tabIndex="-1" style={{background: 'rgba(0,0,0,0.3)', paddingTop: '120px'}}>
            <div className="modal-dialog">
              <div className="modal-content glass-card" style={{ borderRadius: 22, overflow: 'hidden', maxWidth: 540, width: '100%', border: '1.5px solid #e0e7ef', boxShadow: '0 12px 32px rgba(67,206,162,0.13), 0 2px 8px rgba(0,0,0,0.08)' }}>
                <div className="card-header border-0 p-4 position-relative" style={{ background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)', overflow: 'hidden' }}>
                  <button type="button" className="btn-close position-absolute top-0 end-0 m-3" aria-label="Close Legal Page Modal" style={{zIndex:2}} onClick={() => setShowForm(false)}></button>
                  <div className="d-flex align-items-center position-relative">
                    <div className="bg-white rounded-circle p-3 me-3" style={{border: '1px solid rgba(255,255,255,0.2)'}}>
                      <i className="fas fa-file-contract" style={{fontSize: '1.5rem', color: '#43cea2'}}></i>
                    </div>
                    <div>
                      <h5 className="modal-title mb-1 fw-bold text-white" style={{fontSize: '1.3rem'}}>{editingPage ? 'Edit Legal Page' : 'Add Legal Page'}</h5>
                      <small className="opacity-90 text-white">{editingPage ? 'Update legal page details' : 'Add a new legal/policy page'}</small>
                    </div>
                  </div>
                </div>
                <div className="dropdown-divider my-0" style={{height:'2px', background:'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)', opacity:0.12}}></div>
                <form onSubmit={handleSubmit}>
                  <div className="card-body p-4" style={{background: '#fafbfc'}}>
                    <div className="row g-3">
                      <div className="col-12">
                        <label className="form-label fw-semibold text-dark mb-1">Type *</label>
                        <input type="text" className="form-control border-0 shadow-sm" name="page_type" value={form.page_type} onChange={handleChange} required style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s' }} />
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-semibold text-dark mb-1">Content *</label>
                        <textarea className="form-control border-0 shadow-sm" name="content" value={form.content} onChange={handleChange} rows={8} required style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s', resize: 'none' }} />
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-divider my-0" style={{height:'2px', background:'#eee', opacity:0.7}}></div>
                  <div className="d-flex justify-content-end gap-2 p-4">
                    <button type="button" className="btn btn-outline-secondary px-4" onClick={() => setShowForm(false)}>Cancel</button>
                    <button type="submit" className="btn px-4 add-user-btn-gradient" style={{ borderRadius: '8px', fontWeight: '600', fontSize: '1.08rem', background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)', color: 'white', border: 'none' }}>
                      <i className="fas fa-file-contract me-2" style={{color:'#fff'}}></i>
                      {editingPage ? 'Save Changes' : 'Add Legal Page'}
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

export default AdminLegal; 