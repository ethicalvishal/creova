import React, { useState, useEffect } from 'react';

const initialProducts = [
  {
    id: 1,
    name: 'Enterprise Resource Planning',
    category: 'Software',
    price: '$999/month',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Mobile Banking App',
    category: 'Mobile',
    price: '$499/month',
    status: 'Active',
  },
  {
    id: 3,
    name: 'AI-Powered Analytics',
    category: 'AI',
    price: '$1299/month',
    status: 'Inactive',
  },
];

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [currentProduct, setCurrentProduct] = useState({
    id: null,
    name: '',
    category: '',
    price: '',
    status: 'Active',
  });

  useEffect(() => {
    // Simulate API fetch
    setProducts(initialProducts);
  }, []);

  const openAddModal = () => {
    setModalMode('add');
    setCurrentProduct({ id: null, name: '', category: '', price: '', status: 'Active' });
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setModalMode('edit');
    setCurrentProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    setCurrentProduct({ ...currentProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalMode === 'add') {
      setProducts([
        ...products,
        { ...currentProduct, id: Date.now() },
      ]);
    } else {
      setProducts(products.map(p => p.id === currentProduct.id ? currentProduct : p));
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="admin-products-page" style={{background: 'linear-gradient(135deg, #12c2e9 0%, #00bcd4 100%)', minHeight: '100vh'}}>
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
                <h4 className="mb-0 fw-bold text-dark">Products Management</h4>
                <small className="text-muted">Manage all products offered by your company</small>
              </div>
            </div>
            <div className="position-relative">
              <button className="btn btn-primary" onClick={openAddModal} aria-label="Add Product" style={{ borderRadius: '12px', padding: '10px 24px', fontWeight: 600, boxShadow: '0 4px 15px rgba(67, 206, 162, 0.13)', transition: 'all 0.3s' }}>
                <i className="fas fa-plus me-2"></i>
                Add Product
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Products Table - glassy card */}
      <div className="container py-5">
        <div className="card border-0 shadow-sm glass-card mb-4">
          <div className="card-body p-4">
            <h5 className="card-title mb-3 fw-bold">Products List</h5>
            <div className="table-responsive">
              <table className="table table-hover mb-0" style={{ borderRadius: '16px', overflow: 'hidden' }}>
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center text-muted py-4">
                        No products found.
                      </td>
                    </tr>
                  ) : (
                    products.map(product => (
                      <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>{product.price}</td>
                        <td>
                          <span className={`badge ${product.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>{product.status}</span>
                        </td>
                        <td>
                          <button className="btn btn-outline-primary btn-sm me-2" onClick={() => openEditModal(product)} aria-label={`Edit product ${product.name}`}>
                            <i className="fas fa-edit me-1"></i>
                            Edit
                          </button>
                          <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(product.id)} aria-label={`Delete product ${product.name}`}>
                            <i className="fas fa-trash me-1"></i>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Modal for Add/Edit Product - glassy style */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.35)', paddingTop: '120px'}}>
          <div className="modal-dialog">
            <div className="modal-content glass-card" style={{ borderRadius: 22, overflow: 'hidden', maxWidth: 540, width: '100%', border: '1.5px solid #e0e7ef', boxShadow: '0 12px 32px rgba(67,206,162,0.13), 0 2px 8px rgba(0,0,0,0.08)' }}>
              <div className="card-header border-0 p-4 position-relative" style={{ background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)', overflow: 'hidden' }}>
                <button type="button" className="btn-close position-absolute top-0 end-0 m-3" aria-label="Close Product Modal" style={{zIndex:2}} onClick={closeModal}></button>
                <div className="d-flex align-items-center position-relative">
                  <div className="bg-white rounded-circle p-3 me-3" style={{border: '1px solid rgba(255,255,255,0.2)'}}>
                    <i className="fas fa-box-open" style={{fontSize: '1.5rem', color: '#43cea2'}}></i>
                  </div>
                  <div>
                    <h5 className="modal-title mb-1 fw-bold text-white" style={{fontSize: '1.3rem'}}>{modalMode === 'add' ? 'Add Product' : 'Edit Product'}</h5>
                    <small className="opacity-90 text-white">{modalMode === 'add' ? 'Add a new product' : 'Update product details'}</small>
                  </div>
                </div>
              </div>
              <div className="dropdown-divider my-0" style={{height:'2px', background:'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)', opacity:0.12}}></div>
              <form onSubmit={handleSubmit}>
                <div className="card-body p-4" style={{background: '#fafbfc'}}>
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold text-dark mb-1">Product Name *</label>
                      <input type="text" className="form-control border-0 shadow-sm" name="name" value={currentProduct.name} onChange={handleChange} required style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s' }} />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold text-dark mb-1">Category *</label>
                      <input type="text" className="form-control border-0 shadow-sm" name="category" value={currentProduct.category} onChange={handleChange} required style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s' }} />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold text-dark mb-1">Price *</label>
                      <input type="text" className="form-control border-0 shadow-sm" name="price" value={currentProduct.price} onChange={handleChange} required style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s' }} />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold text-dark mb-1">Status</label>
                      <select className="form-select border-0 shadow-sm" name="status" value={currentProduct.status} onChange={handleChange} style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s' }}>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="dropdown-divider my-0" style={{height:'2px', background:'#eee', opacity:0.7}}></div>
                <div className="d-flex justify-content-end gap-2 p-4">
                  <button type="button" className="btn btn-outline-secondary px-4" onClick={closeModal}>Cancel</button>
                  <button type="submit" className="btn px-4 add-user-btn-gradient" style={{ borderRadius: '8px', fontWeight: '600', fontSize: '1.08rem', background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)', color: 'white', border: 'none' }}>
                    <i className="fas fa-box-open me-2" style={{color:'#fff'}}></i>
                    {modalMode === 'add' ? 'Add Product' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts; 