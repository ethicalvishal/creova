import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    subject: 'all',
    dateRange: 'all'
  });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/contact/list');
      const data = await response.json();
      
      if (data.success) {
        setContacts(data.contacts);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateContactStatus = async (contactId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/contact/${contactId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        setContacts(prev => prev.map(contact => 
          contact.id === contactId ? { ...contact, status: newStatus } : contact
        ));
      }
    } catch (error) {
      console.error('Error updating contact status:', error);
    }
  };

  const deleteContact = async (contactId) => {
    if (window.confirm('Are you sure you want to delete this contact message?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/contact/${contactId}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          setContacts(prev => prev.filter(contact => contact.id !== contactId));
        }
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  const filteredContacts = contacts.filter(contact => {
    if (filters.status !== 'all' && contact.status !== filters.status) return false;
    if (filters.subject !== 'all' && contact.subject !== filters.subject) return false;
    return true;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'new': return 'bg-primary';
      case 'read': return 'bg-info';
      case 'replied': return 'bg-success';
      case 'archived': return 'bg-secondary';
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
      <div className="admin-contacts-page">
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
    <div className="admin-contacts-page">
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
                <h4 className="mb-0 fw-bold text-dark">Contact Messages</h4>
                <small className="text-muted">Manage all contact messages</small>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Filters - keep as is for now */}
      <section className="section">
        <div className="container">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-3">Filters</h5>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <label className="form-label">Status</label>
                  <select 
                    className="form-control"
                    value={filters.status}
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                  >
                    <option value="all">All Status</option>
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div className="col-md-3 mb-3">
                  <label className="form-label">Subject</label>
                  <select 
                    className="form-control"
                    value={filters.subject}
                    onChange={(e) => setFilters({...filters, subject: e.target.value})}
                  >
                    <option value="all">All Subjects</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Project Quote">Project Quote</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Career Opportunity">Career Opportunity</option>
                    <option value="Support">Support</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="col-md-3 mb-3">
                  <label className="form-label">Date Range</label>
                  <select 
                    className="form-control"
                    value={filters.dateRange}
                    onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                </div>
                <div className="col-md-3 mb-3 d-flex align-items-end">
                  <button 
                    className="btn btn-outline-secondary w-100"
                    onClick={() => setFilters({status: 'all', subject: 'all', dateRange: 'all'})}
                    aria-label="Clear All Filters"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacts List - User Dashboard style */}
      <section className="section">
        <div className="container">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">Recent Messages</h5>
              <div className="d-flex gap-2">
                <button className="btn btn-outline-primary" aria-label="Export Contacts">
                  <i className="fas fa-download me-2"></i>
                  Export
                </button>
              </div>
            </div>
            <div className="card-body">
              {filteredContacts.length === 0 ? (
                <div className="text-center py-4">
                  <i className="fas fa-envelope fa-3x text-muted mb-3"></i>
                  <h5>No messages found</h5>
                  <p className="text-muted">No messages match your current filters.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Subject</th>
                        <th>Status</th>
                        <th>Received</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredContacts.map(contact => (
                        <tr key={contact.id}>
                          <td><strong>{contact.name}</strong></td>
                          <td>{contact.email}</td>
                          <td>{contact.subject}</td>
                          <td><span className={`badge ${getStatusBadgeClass(contact.status)}`}>{contact.status}</span></td>
                          <td>{formatDate(contact.created_at)}</td>
                          <td>
                            <button className="btn btn-outline-primary btn-sm me-1" onClick={() => setSelectedContact(contact)} aria-label={`View contact from ${contact.name}`}>
                              <i className="fas fa-eye me-1"></i>View
                            </button>
                            <button className="btn btn-outline-danger btn-sm" onClick={() => deleteContact(contact.id)} aria-label={`Delete contact from ${contact.name}`}>
                              <i className="fas fa-trash me-1"></i>Delete
                            </button>
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
      </section>

      {/* Contact Details Modal */}
      {selectedContact && (
        <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Message Details</h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setSelectedContact(null)}
                  aria-label="Close Contact Details"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <h6>Contact Information</h6>
                    <p><strong>Name:</strong> {selectedContact.name}</p>
                    <p><strong>Email:</strong> {selectedContact.email}</p>
                    <p><strong>Phone:</strong> {selectedContact.phone || 'Not provided'}</p>
                    <p><strong>Company:</strong> {selectedContact.company || 'Not provided'}</p>
                    <p><strong>Subject:</strong> {selectedContact.subject}</p>
                    <p><strong>Received:</strong> {formatDate(selectedContact.created_at)}</p>
                    <p><strong>Status:</strong> 
                      <span className={`badge ${getStatusBadgeClass(selectedContact.status)} ms-2`}>
                        {selectedContact.status}
                      </span>
                    </p>
                  </div>
                  <div className="col-md-6">
                    <h6>Message</h6>
                    <div className="border rounded p-3 bg-light">
                      {selectedContact.message || 'No message provided'}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setSelectedContact(null)}
                  aria-label="Close Contact Details"
                >
                  Close
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={() => {
                    // Handle email response
                    window.open(`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`);
                  }}
                  aria-label="Reply to Contact"
                >
                  <i className="fas fa-envelope me-2"></i>
                  Send Email
                </button>
                {selectedContact.phone && (
                  <button 
                    type="button" 
                    className="btn btn-success"
                    onClick={() => {
                      window.open(`tel:${selectedContact.phone}`);
                    }}
                    aria-label="Mark as Replied"
                  >
                    <i className="fas fa-phone me-2"></i>
                    Call
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContacts; 