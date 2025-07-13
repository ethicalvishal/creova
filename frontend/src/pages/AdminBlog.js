import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';

const API_URL = 'http://localhost:5000/api/blog';

const AdminBlog = () => {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [inputToken, setInputToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    excerpt: '',
    author: 'Creova Team',
    image_url: '',
    tags: '',
    is_published: true
  });
  const [addError, setAddError] = useState(null);
  const [addLoading, setAddLoading] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [editError, setEditError] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [deletePostId, setDeletePostId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [users, setUsers] = useState([]);
  const [userLoading, setUserLoading] = useState(false);
  const [userError, setUserError] = useState(null);
  const [userSearch, setUserSearch] = useState('');
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [deleteUserLoading, setDeleteUserLoading] = useState(false);
  const [deleteUserError, setDeleteUserError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts();
      fetchUsers();
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (inputToken.trim()) {
      setToken(inputToken.trim());
      localStorage.setItem('adminToken', inputToken.trim());
      setIsAuthenticated(true);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/posts`);
      const data = await res.json();
      if (data.success) setPosts(data.posts);
      else setError(data.message || 'Failed to fetch posts');
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setUserLoading(true);
    setUserError(null);
    try {
      const res = await fetch('http://localhost:5000/api/user/list', {
        headers: { 'X-Admin-Token': token }
      });
      const data = await res.json();
      if (data.success) setUsers(data.users);
      else setUserError(data.message || 'Failed to fetch users');
    } catch (err) {
      setUserError('Network error');
    } finally {
      setUserLoading(false);
    }
  };

  // Open add modal
  const openAddModal = () => {
    setShowAddModal(true);
    setNewPost({
      title: '',
      content: '',
      excerpt: '',
      author: 'Creova Team',
      image_url: '',
      tags: '',
      is_published: true
    });
    setAddError(null);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  // Close add modal
  const closeAddModal = () => {
    setShowAddModal(false);
    setAddError(null);
    setAddLoading(false);
    // Restore body scroll
    document.body.style.overflow = 'unset';
  };

  const handleAddPost = async (e) => {
    e.preventDefault();
    setAddLoading(true);
    setAddError(null);
    try {
      const res = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Token': token
        },
        body: JSON.stringify(newPost)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        closeAddModal();
        fetchPosts();
      } else {
        setAddError(data.message || 'Failed to add post');
      }
    } catch (err) {
      setAddError('Network error');
    } finally {
      setAddLoading(false);
    }
  };

  const handleEditPost = (post) => {
    setEditPost({ ...post });
    setEditError(null);
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    setEditError(null);
    try {
      const res = await fetch(`${API_URL}/posts/${editPost.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Token': token
        },
        body: JSON.stringify(editPost)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setEditPost(null);
        fetchPosts();
      } else {
        setEditError(data.message || 'Failed to update post');
      }
    } catch (err) {
      setEditError('Network error');
    } finally {
      setEditLoading(false);
    }
  };

  const handleDeletePost = async () => {
    if (!deletePostId) return;
    setDeleteLoading(true);
    setDeleteError(null);
    try {
      const res = await fetch(`${API_URL}/posts/${deletePostId}`, {
        method: 'DELETE',
        headers: { 'X-Admin-Token': token }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setDeletePostId(null);
        fetchPosts();
      } else {
        setDeleteError(data.message || 'Failed to delete post');
      }
    } catch (err) {
      setDeleteError('Network error');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!deleteUserId) return;
    setDeleteUserLoading(true);
    setDeleteUserError(null);
    try {
      const res = await fetch(`http://localhost:5000/api/user/delete/${deleteUserId}`, {
        method: 'DELETE',
        headers: { 'X-Admin-Token': token }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setUsers(users => users.filter(u => u.id !== deleteUserId));
        setDeleteUserId(null);
      } else {
        setDeleteUserError(data.message || 'Failed to delete user');
      }
    } catch (err) {
      setDeleteUserError('Network error');
    } finally {
      setDeleteUserLoading(false);
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

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  // Modal JSX for Add New Post
  const addPostModal = showAddModal ? ReactDOM.createPortal(
    <div
      className="modal show d-block add-post-modal-animate"
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
          <button type="button" className="btn-close position-absolute top-0 end-0 m-3" aria-label="Close Add Post Modal" style={{zIndex:2}} onClick={closeAddModal}></button>
          <div className="d-flex align-items-center position-relative">
            <div className="bg-white rounded-circle p-3 me-3" style={{border: '1px solid rgba(255,255,255,0.2)'}}>
              <i className="fas fa-plus-circle" style={{fontSize: '1.5rem', color: '#43cea2'}}></i>
            </div>
            <div>
              <h5 className="modal-title mb-1 fw-bold text-white" style={{fontSize: '1.3rem'}}>Add New Post</h5>
              <small className="opacity-90 text-white">Create a new blog post</small>
            </div>
          </div>
        </div>
        <div className="dropdown-divider my-0" style={{height:'2px', background:'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)', opacity:0.12}}></div>
        
        <form onSubmit={handleAddPost}>
          <div className="card-body p-4" style={{background: '#fafbfc'}}>
            {addError && (
              <div className="alert border-0 mb-3" style={{ borderRadius: '12px', background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)', color: 'white', boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)', fontSize: '0.95rem' }}>
                <i className="fas fa-exclamation-triangle me-2"></i>
                <strong>Error:</strong> {addError}
              </div>
            )}
            
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label fw-semibold text-dark mb-1" htmlFor="postTitle">
                  <i className="fas fa-heading me-2" style={{color:'#43cea2'}}></i>
                  Post Title *
                </label>
                <input id="postTitle" className="form-control border-0 shadow-sm" placeholder="Enter an engaging title for your blog post" value={newPost.title} onChange={e => setNewPost(p => ({ ...p, title: e.target.value }))} required style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s' }} />
              </div>
              
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold text-dark mb-1" htmlFor="postAuthor">
                  <i className="fas fa-user-edit me-2" style={{color:'#43cea2'}}></i>
                  Author
                </label>
                <input id="postAuthor" className="form-control border-0 shadow-sm" placeholder="Author name" value={newPost.author} onChange={e => setNewPost(p => ({ ...p, author: e.target.value }))} style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s' }} />
              </div>
              
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold text-dark mb-1" htmlFor="postImage">
                  <i className="fas fa-image me-2" style={{color:'#43cea2'}}></i>
                  Featured Image URL
                </label>
                <input id="postImage" className="form-control border-0 shadow-sm" placeholder="https://example.com/image.jpg" type="url" value={newPost.image_url} onChange={e => setNewPost(p => ({ ...p, image_url: e.target.value }))} style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s' }} />
              </div>
              
              <div className="col-12">
                <label className="form-label fw-semibold text-dark mb-1" htmlFor="postExcerpt">
                  <i className="fas fa-align-left me-2" style={{color:'#43cea2'}}></i>
                  Excerpt/Summary
                </label>
                <textarea id="postExcerpt" className="form-control border-0 shadow-sm" placeholder="Write a brief summary of your blog post..." value={newPost.excerpt} onChange={e => setNewPost(p => ({ ...p, excerpt: e.target.value }))} rows="3" style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s', resize: 'none' }} />
                <small className="text-muted">
                  <i className="fas fa-info-circle me-1"></i>
                  This will appear as a preview in blog listings
                </small>
              </div>
              
              <div className="col-12">
                <label className="form-label fw-semibold text-dark mb-1" htmlFor="postTags">
                  <i className="fas fa-tags me-2" style={{color:'#43cea2'}}></i>
                  Tags
                </label>
                <input id="postTags" className="form-control border-0 shadow-sm" placeholder="AI, Technology, Business (comma separated)" value={newPost.tags} onChange={e => setNewPost(p => ({ ...p, tags: e.target.value }))} style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s' }} />
                <small className="text-muted">
                  <i className="fas fa-info-circle me-1"></i>
                  Separate multiple tags with commas
                </small>
              </div>
              
              <div className="col-12">
                <label className="form-label fw-semibold text-dark mb-1" htmlFor="postContent">
                  <i className="fas fa-file-alt me-2" style={{color:'#43cea2'}}></i>
                  Content *
                </label>
                <textarea id="postContent" className="form-control border-0 shadow-sm" placeholder="Write your blog post content here. You can use markdown formatting..." value={newPost.content} onChange={e => setNewPost(p => ({ ...p, content: e.target.value }))} required rows="12" style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s', resize: 'vertical', minHeight: '300px' }} />
                <small className="text-muted">
                  <i className="fas fa-info-circle me-1"></i>
                  Support for markdown formatting available
                </small>
              </div>
              
              <div className="col-12">
                <div className="form-check form-switch">
                  <input id="isPublishedCheck" className="form-check-input" type="checkbox" checked={newPost.is_published} onChange={e => setNewPost(p => ({ ...p, is_published: e.target.checked }))} style={{width: '3rem', height: '1.5rem'}} />
                  <label className="form-check-label fw-semibold text-dark" htmlFor="isPublishedCheck">
                    <i className="fas fa-globe me-2" style={{color:'#43cea2'}}></i>
                    Publish immediately
                  </label>
                </div>
                <small className="text-muted">
                  <i className="fas fa-info-circle me-1"></i>
                  Uncheck to save as draft
                </small>
              </div>
            </div>
          </div>
          
          <div className="dropdown-divider my-4" style={{height:'2px', background:'#eee', opacity:0.7}}></div>
          <div className="d-flex justify-content-end gap-2 p-4">
            <button type="button" className="btn btn-outline-secondary px-4" onClick={closeAddModal} disabled={addLoading} aria-label="Cancel Add Post">Cancel</button>
            <button type="submit" className="btn px-4 add-post-btn-gradient" disabled={addLoading} style={{ borderRadius: '8px', fontWeight: '600', fontSize: '1.08rem', background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)', color: 'white', border: 'none' }} aria-label="Save New Post">
              {addLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Creating Post...
                </>
              ) : (
                <>
                  <i className="fas fa-save me-2" style={{color:'#fff'}}></i>
                  Create Post
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  ) : null;

  if (!isAuthenticated) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card border-0 shadow-lg" style={{ borderRadius: '20px' }}>
              <div className="card-header border-0 p-4" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '20px 20px 0 0' }}>
                <h4 className="text-white mb-0 text-center">
                  <i className="fas fa-lock me-2"></i>
                  Admin Authentication
                </h4>
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Admin Token</label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      value={inputToken}
                      onChange={(e) => setInputToken(e.target.value)}
                      placeholder="Enter admin token"
                      required
                      style={{ borderRadius: '12px' }}
                    />
                  </div>
                  <button className="btn btn-primary btn-lg w-100" type="submit" aria-label="Login to Admin Blog">
                    <i className="fas fa-sign-in-alt me-2"></i>
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center">
          <Link to="/admin" className="btn btn-outline-secondary btn-sm me-3" aria-label="Back to Admin Dashboard">
            <i className="fas fa-arrow-left me-1"></i>
            Back to Dashboard
          </Link>
          <div>
            <h2 className="mb-1">Blog Management</h2>
            <p className="text-muted mb-0">Manage your blog posts and content</p>
          </div>
        </div>
        <button 
          className="btn btn-success" 
          onClick={openAddModal} 
          aria-label="Open Add Blog Post Modal"
          style={{
            background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
            border: 'none',
            borderRadius: '12px',
            padding: '10px 20px',
            fontWeight: 600,
            boxShadow: '0 4px 15px rgba(40, 167, 69, 0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(40, 167, 69, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(40, 167, 69, 0.3)';
          }}
        >
          <i className="fas fa-plus me-1"></i>
          Add New Post
        </button>
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
          <p className="mt-3 text-muted">Loading blog posts...</p>
        </div>
      ) : (
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-0 py-3">
            <h5 className="mb-0">
              <i className="fas fa-blog me-2 text-primary"></i>
              Blog Posts ({posts.length})
            </h5>
          </div>
          <div className="card-body p-0">
            {posts.length === 0 ? (
              <div className="text-center py-5">
                <i className="fas fa-blog fa-3x text-muted mb-3"></i>
                <h5>No blog posts yet</h5>
                <p className="text-muted">Create your first blog post to get started.</p>
                <button 
                  className="btn btn-primary" 
                  onClick={openAddModal}
                  aria-label="Open Add Blog Post Modal"
                >
                  <i className="fas fa-plus me-1"></i>
                  Create First Post
                </button>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Status</th>
                      <th>Created</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map(post => (
                      <tr key={post.id}>
                        <td>
                          <div>
                            <div className="fw-semibold">{post.title}</div>
                            <small className="text-muted">{post.excerpt}</small>
                          </div>
                        </td>
                        <td>{post.author || 'Unknown'}</td>
                        <td>
                          <span className={`badge ${post.is_published ? 'bg-success' : 'bg-warning'}`}>
                            {post.is_published ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td>{formatDate(post.created_at)}</td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <button 
                              className="btn btn-outline-warning" 
                              onClick={() => handleEditPost(post)} 
                              aria-label={`Edit blog post ${post.title}`}
                              title="Edit"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button 
                              className="btn btn-outline-danger" 
                              onClick={() => setDeletePostId(post.id)} 
                              aria-label={`Delete blog post ${post.title}`}
                              title="Delete"
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
            )}
          </div>
        </div>
      )}

      {/* Enhanced Add Post Modal */}
      {addPostModal}

      {/* Edit Post Modal */}
      {editPost && (
        <div 
          className="modal-backdrop show" 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.5)',
            zIndex: 1050,
            backdropFilter: 'blur(5px)'
          }}
        >
          <div 
            className="modal show d-block" 
            tabIndex="-1" 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 1055,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            <div 
              className="modal-dialog modal-xl" 
              style={{
                maxWidth: '800px',
                width: '100%',
                margin: '0 auto'
              }}
            >
              <div 
                className="modal-content border-0 shadow-lg" 
                style={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <form onSubmit={handleUpdatePost}>
                  <div 
                    className="modal-header border-0 p-4"
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white'
                    }}
                  >
                    <h5 className="modal-title fw-bold">
                      <i className="fas fa-edit me-2"></i>
                      Edit Blog Post
                    </h5>
                    <button 
                      type="button" 
                      className="btn-close btn-close-white" 
                      onClick={() => setEditPost(null)} 
                      aria-label="Close Edit Blog Post Modal"
                    ></button>
                  </div>
                  
                  <div className="modal-body p-4">
                    {editError && (
                      <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <i className="fas fa-exclamation-triangle me-2"></i>
                        {editError}
                        <button type="button" className="btn-close" onClick={() => setEditError(null)} aria-label="Close error message"></button>
                      </div>
                    )}
                    
                    <div className="row g-3">
                      <div className="col-12">
                        <label className="form-label fw-semibold">Title *</label>
                        <input 
                          className="form-control form-control-lg" 
                          placeholder="Enter post title" 
                          value={editPost.title} 
                          onChange={e => setEditPost(p => ({ ...p, title: e.target.value }))} 
                          required 
                          style={{borderRadius: '12px'}}
                        />
                      </div>
                      
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Author</label>
                        <input 
                          className="form-control" 
                          placeholder="Author name" 
                          value={editPost.author} 
                          onChange={e => setEditPost(p => ({ ...p, author: e.target.value }))} 
                          style={{borderRadius: '12px'}}
                        />
                      </div>
                      
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Image URL</label>
                        <input 
                          className="form-control" 
                          placeholder="https://example.com/image.jpg" 
                          value={editPost.image_url} 
                          onChange={e => setEditPost(p => ({ ...p, image_url: e.target.value }))} 
                          style={{borderRadius: '12px'}}
                        />
                      </div>
                      
                      <div className="col-12">
                        <label className="form-label fw-semibold">Excerpt</label>
                        <textarea 
                          className="form-control" 
                          placeholder="Brief description of the post" 
                          value={editPost.excerpt} 
                          onChange={e => setEditPost(p => ({ ...p, excerpt: e.target.value }))}
                          rows="3"
                          style={{borderRadius: '12px', resize: 'none'}}
                        />
                      </div>
                      
                      <div className="col-12">
                        <label className="form-label fw-semibold">Tags</label>
                        <input 
                          className="form-control" 
                          placeholder="AI, Technology, Business (comma separated)" 
                          value={editPost.tags} 
                          onChange={e => setEditPost(p => ({ ...p, tags: e.target.value }))} 
                          style={{borderRadius: '12px'}}
                        />
                      </div>
                      
                      <div className="col-12">
                        <label className="form-label fw-semibold">Content *</label>
                        <textarea 
                          className="form-control" 
                          placeholder="Write your blog post content here..." 
                          value={editPost.content} 
                          onChange={e => setEditPost(p => ({ ...p, content: e.target.value }))} 
                          required
                          rows="12"
                          style={{borderRadius: '12px', resize: 'vertical', minHeight: '300px'}}
                        />
                      </div>
                      
                      <div className="col-12">
                        <div className="form-check form-switch">
                          <input 
                            className="form-check-input" 
                            type="checkbox" 
                            checked={editPost.is_published} 
                            onChange={e => setEditPost(p => ({ ...p, is_published: e.target.checked }))} 
                            id="editIsPublishedCheck"
                            style={{width: '3rem', height: '1.5rem'}}
                          />
                          <label className="form-check-label fw-semibold" htmlFor="editIsPublishedCheck">
                            <i className="fas fa-globe me-2 text-success"></i>
                            Published
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    className="modal-footer border-0 p-4"
                    style={{background: '#f8f9fa'}}
                  >
                    <button 
                      type="submit" 
                      className="btn btn-primary btn-lg px-4" 
                      disabled={editLoading} 
                      aria-label="Save Edited Blog Post"
                      style={{
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none',
                        fontWeight: 600
                      }}
                    >
                      {editLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Saving Changes...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-save me-2"></i>
                          Save Changes
                        </>
                      )}
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-secondary btn-lg px-4" 
                      onClick={() => setEditPost(null)} 
                      disabled={editLoading} 
                      aria-label="Cancel Edit Blog Post"
                      style={{borderRadius: '12px'}}
                    >
                      <i className="fas fa-times me-2"></i>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Post Confirmation Modal */}
      {deletePostId && (
        <div 
          className="modal-backdrop show" 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.5)',
            zIndex: 1050
          }}
        >
          <div 
            className="modal show d-block" 
            tabIndex="-1" 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 1055,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            <div className="modal-dialog">
              <div className="modal-content border-0 shadow-lg" style={{borderRadius: '20px'}}>
                <div className="modal-header border-0 p-4" style={{background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)', color: 'white', borderRadius: '20px 20px 0 0'}}>
                  <h5 className="modal-title fw-bold">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    Confirm Delete
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close btn-close-white" 
                    onClick={() => setDeletePostId(null)} 
                    aria-label="Close Delete Blog Post Modal"
                  ></button>
                </div>
                <div className="modal-body p-4">
                  {deleteError && (
                    <div className="alert alert-danger">
                      <i className="fas fa-exclamation-triangle me-2"></i>
                      {deleteError}
                    </div>
                  )}
                  <p className="mb-0">
                    Are you sure you want to delete this blog post? This action cannot be undone.
                  </p>
                </div>
                <div className="modal-footer border-0 p-4" style={{background: '#f8f9fa', borderRadius: '0 0 20px 20px'}}>
                  <button 
                    className="btn btn-danger btn-lg px-4" 
                    onClick={handleDeletePost} 
                    disabled={deleteLoading} 
                    aria-label="Confirm Delete Blog Post"
                    style={{borderRadius: '12px'}}
                  >
                    {deleteLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Deleting...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-trash me-2"></i>
                        Delete Post
                      </>
                    )}
                  </button>
                  <button 
                    className="btn btn-secondary btn-lg px-4" 
                    onClick={() => setDeletePostId(null)} 
                    disabled={deleteLoading} 
                    aria-label="Cancel Delete Blog Post"
                    style={{borderRadius: '12px'}}
                  >
                    <i className="fas fa-times me-2"></i>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Management Section */}
      <div className="mt-5">
        <h3 className="mb-4">User Management</h3>
        {userError && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <i className="fas fa-exclamation-triangle me-2"></i>
            {userError}
            <button type="button" className="btn-close" onClick={() => setUserError(null)} aria-label="Close error message"></button>
          </div>
        )}
        
        {userLoading ? (
          <div className="text-center py-3">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="mb-0">
                <i className="fas fa-users me-2 text-primary"></i>
                Registered Users ({users.length})
              </h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <span className="badge bg-success bg-opacity-10 text-success">Active</span>
                        </td>
                        <td>
                          <button 
                            className="btn btn-outline-danger btn-sm" 
                            onClick={() => setDeleteUserId(user.id)} 
                            aria-label={`Delete user ${user.name}`}
                          >
                            <i className="fas fa-trash me-1"></i>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete User Confirmation Modal */}
      {deleteUserId && (
        <div 
          className="modal-backdrop show" 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.5)',
            zIndex: 1050
          }}
        >
          <div 
            className="modal show d-block" 
            tabIndex="-1" 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 1055,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            <div className="modal-dialog">
              <div className="modal-content border-0 shadow-lg" style={{borderRadius: '20px'}}>
                <div className="modal-header border-0 p-4" style={{background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)', color: 'white', borderRadius: '20px 20px 0 0'}}>
                  <h5 className="modal-title fw-bold">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    Confirm Delete User
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close btn-close-white" 
                    onClick={() => setDeleteUserId(null)} 
                    aria-label="Close Delete User Modal"
                  ></button>
                </div>
                <div className="modal-body p-4">
                  {deleteUserError && (
                    <div className="alert alert-danger">
                      <i className="fas fa-exclamation-triangle me-2"></i>
                      {deleteUserError}
                    </div>
                  )}
                  <p className="mb-0">
                    Are you sure you want to delete this user? This action cannot be undone.
                  </p>
                </div>
                <div className="modal-footer border-0 p-4" style={{background: '#f8f9fa', borderRadius: '0 0 20px 20px'}}>
                  <button 
                    className="btn btn-danger btn-lg px-4" 
                    onClick={handleDeleteUser} 
                    disabled={deleteUserLoading} 
                    aria-label="Confirm Delete User"
                    style={{borderRadius: '12px'}}
                  >
                    {deleteUserLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Deleting...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-trash me-2"></i>
                        Delete User
                      </>
                    )}
                  </button>
                  <button 
                    className="btn btn-secondary btn-lg px-4" 
                    onClick={() => setDeleteUserId(null)} 
                    disabled={deleteUserLoading} 
                    aria-label="Cancel Delete User"
                    style={{borderRadius: '12px'}}
                  >
                    <i className="fas fa-times me-2"></i>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlog; 