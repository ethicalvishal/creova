import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Routes, Route } from 'react-router-dom';
// import { APP_CONSTANTS } from '../constants';

// Import admin components
import AdminOverview from './AdminOverview';
import AdminUsers from './AdminUsers';
import AdminBlog from './AdminBlog';
import AdminContacts from './AdminContacts';
import AdminApplications from './AdminApplications';
import AdminJobs from './AdminJobs';
import AdminServices from './AdminServices';
import AdminTeam from './AdminTeam';
import AdminLegal from './AdminLegal';
import AdminProducts from './AdminProducts';
import AdminSettings from './AdminSettings';
import AdminAnalytics from './AdminAnalytics';

const AdminDashboard = () => {
  const [adminUser, setAdminUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');
  const [notifications, setNotifications] = useState([]);
  const [systemStatus, setSystemStatus] = useState({
    server: 'online',
    database: 'online',
    cache: 'online'
  });
  const navigate = useNavigate();

  // Admin authentication check
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    const adminUserData = localStorage.getItem('adminUser');
    
    if (!adminToken || !adminUserData) {
      navigate('/admin/login', { replace: true });
      return;
    }

    try {
      setAdminUser(JSON.parse(adminUserData));
    } catch (error) {
      navigate('/admin/login', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    fetchSystemStatus();
    fetchNotifications();
  }, []);

  const fetchSystemStatus = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/system-status');
      const data = await response.json();
      if (data.success) {
        setSystemStatus(data.status);
      }
    } catch (error) {
      console.error('Error fetching system status:', error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/notifications');
      const data = await response.json();
      if (data.success) {
        setNotifications(data.notifications);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const adminMenuItems = [
    {
      id: 'overview',
      label: 'Dashboard Overview',
      icon: 'fas fa-tachometer-alt',
      path: '/admin',
      color: 'primary'
    },
    {
      id: 'analytics',
      label: 'Analytics & Reports',
      icon: 'fas fa-chart-line',
      path: '/admin/analytics',
      color: 'info'
    },
    {
      id: 'users',
      label: 'User Management',
      icon: 'fas fa-users',
      path: '/admin/users',
      color: 'success'
    },
    {
      id: 'blog',
      label: 'Blog Management',
      icon: 'fas fa-blog',
      path: '/admin/blog',
      color: 'warning'
    },
    {
      id: 'contacts',
      label: 'Contact Messages',
      icon: 'fas fa-envelope',
      path: '/admin/contacts',
      color: 'secondary'
    },
    {
      id: 'applications',
      label: 'Job Applications',
      icon: 'fas fa-file-alt',
      path: '/admin/applications',
      color: 'primary'
    },
    {
      id: 'jobs',
      label: 'Job Management',
      icon: 'fas fa-briefcase',
      path: '/admin/jobs',
      color: 'info'
    },
    {
      id: 'services',
      label: 'Services',
      icon: 'fas fa-cogs',
      path: '/admin/services',
      color: 'success'
    },
    {
      id: 'team',
      label: 'Team Management',
      icon: 'fas fa-user-friends',
      path: '/admin/team',
      color: 'warning'
    },
    {
      id: 'products',
      label: 'Products',
      icon: 'fas fa-box',
      path: '/admin/products',
      color: 'secondary'
    },
    {
      id: 'legal',
      label: 'Legal Pages',
      icon: 'fas fa-gavel',
      path: '/admin/legal',
      color: 'danger'
    },
    {
      id: 'settings',
      label: 'System Settings',
      icon: 'fas fa-cog',
      path: '/admin/settings',
      color: 'dark'
    }
  ];

  const getStatusColor = (status) => {
    return status === 'online' ? 'success' : 'danger';
  };

  const getStatusIcon = (status) => {
    return status === 'online' ? 'fas fa-check-circle' : 'fas fa-times-circle';
  };

  return (
    <div className="admin-dashboard d-flex" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
      {/* Enhanced Sidebar */}
      <aside className={`admin-sidebar bg-white shadow-lg${sidebarOpen ? ' open' : ''}`} 
             style={{
               width: sidebarOpen ? 280 : 70,
               transition: 'width 0.3s ease',
               zIndex: 1020,
               position: 'fixed',
               height: '100vh',
               overflowY: 'auto'
             }}>
        <div className="d-flex flex-column h-100">
          {/* Sidebar Header */}
          <div className="sidebar-header p-3 border-bottom">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <div className="creova-logo-svg me-3" style={{
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="sidebar-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#667eea" />
                        <stop offset="1" stopColor="#764ba2" />
                      </linearGradient>
                    </defs>
                    <circle cx="20" cy="20" r="18" fill="url(#sidebar-gradient)" />
                    <text x="50%" y="56%" textAnchor="middle" dominantBaseline="middle" fontFamily="Segoe UI, Arial, sans-serif" fontWeight="bold" fontSize="18" fill="#fff">A</text>
                  </svg>
                </div>
                {sidebarOpen && (
                  <div>
                    <h6 className="mb-0 fw-bold text-dark">Admin Panel</h6>
                    <small className="text-muted">Creova Management</small>
                  </div>
                )}
              </div>
              <button 
                className="btn btn-link p-0"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle Admin Sidebar"
              >
                <i className={`fas fa-${sidebarOpen ? 'angle-left' : 'angle-right'} text-muted`}></i>
              </button>
            </div>
          </div>

          {/* Admin User Info */}
          {sidebarOpen && adminUser && (
            <div className="p-3 border-bottom">
              <div className="d-flex align-items-center">
                <div className="avatar-placeholder bg-primary text-white d-flex align-items-center justify-content-center me-3" 
                     style={{width: 40, height: 40, borderRadius: '50%', fontSize: 16}}>
                  <i className="fas fa-user"></i>
                </div>
                <div>
                  <div className="fw-semibold text-dark">{adminUser.name || 'Admin User'}</div>
                  <small className="text-muted">Super Administrator</small>
                </div>
              </div>
            </div>
          )}

          {/* System Status */}
          {sidebarOpen && (
            <div className="p-3 border-bottom">
              <h6 className="fw-semibold mb-2">System Status</h6>
              <div className="system-status">
                {Object.entries(systemStatus).map(([service, status]) => (
                  <div key={service} className="d-flex align-items-center justify-content-between mb-1">
                    <span className="text-capitalize">{service}</span>
                    <span className={`badge bg-${getStatusColor(status)}`}>
                      <i className={`${getStatusIcon(status)} me-1`}></i>
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Menu */}
          <nav className="flex-grow-1 p-3">
            <ul className="nav flex-column">
              {adminMenuItems.map(item => (
                <li className="nav-item mb-2" key={item.id}>
                  <Link 
                    to={item.path}
                    className={`nav-link d-flex align-items-center px-3 py-2 rounded-3 ${
                      activeSection === item.id ? 'active' : ''
                    }`}
                    onClick={() => setActiveSection(item.id)}
                    aria-label={`Navigate to ${item.label}`}
                    style={{
                      color: activeSection === item.id ? '#fff' : '#6c757d',
                      backgroundColor: activeSection === item.id ? `var(--bs-${item.color})` : 'transparent',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <i className={`${item.icon} me-3`} style={{width: '20px'}}></i>
                    {sidebarOpen && item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-3 border-top">
            <button 
              className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center"
              onClick={handleLogout}
              aria-label="Logout from Admin Dashboard"
            >
              <i className="fas fa-sign-out-alt me-2"></i>
              {sidebarOpen && 'Logout'}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow-1" style={{
        marginLeft: sidebarOpen ? '280px' : '70px',
        transition: 'margin-left 0.3s ease'
      }}>
        {/* Top Header */}
        <header className="bg-white shadow-sm border-bottom" style={{height: '70px'}}>
          <div className="d-flex align-items-center justify-content-between h-100 px-4">
            <div className="d-flex align-items-center">
              <h4 className="mb-0 fw-bold text-dark">
                {adminMenuItems.find(item => item.id === activeSection)?.label || 'Admin Dashboard'}
              </h4>
            </div>
            
            <div className="d-flex align-items-center">
              {/* Notifications */}
              <div className="dropdown me-3">
                <button className="btn btn-link position-relative" data-bs-toggle="dropdown" aria-label="View Notifications">
                  <i className="fas fa-bell text-muted"></i>
                  {notifications.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {notifications.length}
                    </span>
                  )}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  {notifications.length === 0 ? (
                    <li><span className="dropdown-item-text" style={{ color: 'white' }}>No new notifications</span></li>
                  ) : (
                    notifications.map(notification => (
                      <li key={notification.id}>
                        <a className="dropdown-item" href="#" aria-label="View All Notifications">
                          <i className={`fas fa-${notification.icon} me-2`}></i>
                          {notification.message}
                        </a>
                      </li>
                    ))
                  )}
                </ul>
              </div>

              {/* Quick Actions */}
              <div className="dropdown me-3">
                <button className="btn btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown" aria-label="Quick Actions Menu">
                  <i className="fas fa-plus me-2"></i>
                  Quick Actions
                </button>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/admin/blog" aria-label="Create New Blog Post"><i className="fas fa-plus me-2"></i>New Blog Post</Link></li>
                  <li><Link className="dropdown-item" to="/admin/jobs" aria-label="Create New Job"><i className="fas fa-plus me-2"></i>New Job</Link></li>
                  <li><Link className="dropdown-item" to="/admin/users" aria-label="Create New User"><i className="fas fa-plus me-2"></i>New User</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/admin/settings" aria-label="Go to Settings"><i className="fas fa-cog me-2"></i>Settings</Link></li>
                </ul>
              </div>

              {/* Admin Profile */}
              <div className="dropdown">
                <button className="btn btn-link d-flex align-items-center" data-bs-toggle="dropdown" aria-label="User Account Menu">
                  <div className="avatar-placeholder bg-primary text-white d-flex align-items-center justify-content-center me-2" 
                       style={{width: 35, height: 35, borderRadius: '50%', fontSize: 14}}>
                    <i className="fas fa-user"></i>
                  </div>
                  <span className="fw-semibold text-dark">{adminUser?.name || 'Admin'}</span>
                  <i className="fas fa-chevron-down ms-2 text-muted"></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><Link className="dropdown-item" to="/admin/profile" aria-label="View User Profile"><i className="fas fa-user me-2"></i>Profile</Link></li>
                  <li><Link className="dropdown-item" to="/admin/settings" aria-label="Go to User Settings"><i className="fas fa-cog me-2"></i>Settings</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item" onClick={handleLogout} aria-label="Logout from Admin Dashboard"><i className="fas fa-sign-out-alt me-2"></i>Logout</button></li>
                </ul>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="content-area p-4" style={{minHeight: 'calc(100vh - 70px)'}}>
          <Routes>
            <Route path="/" element={<AdminOverview />} />
            <Route path="/analytics" element={<AdminAnalytics />} />
            <Route path="/users" element={<AdminUsers />} />
            <Route path="/blog" element={<AdminBlog />} />
            <Route path="/contacts" element={<AdminContacts />} />
            <Route path="/applications" element={<AdminApplications />} />
            <Route path="/jobs" element={<AdminJobs />} />
            <Route path="/services" element={<AdminServices />} />
            <Route path="/team" element={<AdminTeam />} />
            <Route path="/products" element={<AdminProducts />} />
            <Route path="/legal" element={<AdminLegal />} />
            <Route path="/settings" element={<AdminSettings />} />
            <Route path="/profile" element={<div className="container py-5"><h2>Admin Profile (Coming Soon)</h2><p>This is a placeholder for the admin profile page.</p></div>} />
          </Routes>
        </div>
      </main>

      <style>{`
        .admin-dashboard {
          font-family: 'Segoe UI', Arial, sans-serif;
        }
        
        .admin-sidebar {
          border-right: 1px solid #e9ecef;
        }
        
        .admin-sidebar .nav-link {
          border-radius: 8px;
          margin-bottom: 4px;
          transition: all 0.2s ease;
        }
        
        .admin-sidebar .nav-link:hover {
          background-color: rgba(102, 126, 234, 0.1);
          color: #667eea !important;
        }
        
        .admin-sidebar .nav-link.active {
          box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
        }
        
        .system-status .badge {
          font-size: 0.75rem;
        }
        
        .content-area {
          background: rgba(255,255,255,0.8);
          backdrop-filter: blur(10px);
        }
        
        .avatar-placeholder {
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        @media (max-width: 991px) {
          .admin-sidebar {
            width: 70px !important;
          }
          
          main {
            margin-left: 70px !important;
          }
          
          .admin-sidebar.open {
            width: 280px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard; 