import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { APP_CONSTANTS, API_URL } from '../constants';
import HeroSection from '../components/HeroSection';

const sidebarLinks = [
  { to: '/admin', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
  { to: '/admin/applications', label: 'Applications', icon: 'fas fa-file-alt' },
  { to: '/admin/contacts', label: 'Contacts', icon: 'fas fa-envelope' },
  { to: '/admin/blog', label: 'Blog', icon: 'fas fa-blog' },
  { to: '/admin/users', label: 'Users', icon: 'fas fa-users' },
  { to: '/admin/settings', label: 'Settings', icon: 'fas fa-cog' },
];

const Admin = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalApplications: 0,
    pendingApplications: 0,
    totalContacts: 0,
    totalBlogPosts: 0,
    usersGrowth: 0,
    applicationsGrowth: 0,
    contactsGrowth: 0,
    blogPostsGrowth: 0
  });
  const [recentApplications, setRecentApplications] = useState([]);
  const [recentContacts, setRecentContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [avatarError, setAvatarError] = useState(false);

  // Admin authentication check
  useEffect(() => {
    if (!localStorage.getItem('adminToken')) {
      navigate('/', { replace: true }); // Redirect to home instead of admin login
    }
  }, [navigate]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const statsResponse = await fetch(`${API_URL.replace('/careers','').replace('/blog','')}/admin/stats`);
      const statsData = await statsResponse.json();
      if (statsData.success && statsData.stats) {
        setStats({
          totalUsers: statsData.stats.totalUsers || 0,
          totalApplications: statsData.stats.totalApplications || 0,
          pendingApplications: statsData.stats.pendingApplications || 0,
          totalContacts: statsData.stats.totalContacts || 0,
          totalBlogPosts: statsData.stats.totalBlogPosts || 0,
          usersGrowth: statsData.stats.usersGrowth || 0,
          applicationsGrowth: statsData.stats.applicationsGrowth || 0,
          contactsGrowth: statsData.stats.contactsGrowth || 0,
          blogPostsGrowth: statsData.stats.blogPostsGrowth || 0
        });
      } else {
        setStats({
          totalUsers: 0,
          totalApplications: 0,
          pendingApplications: 0,
          totalContacts: 0,
          totalBlogPosts: 0,
          usersGrowth: 0,
          applicationsGrowth: 0,
          contactsGrowth: 0,
          blogPostsGrowth: 0
        });
      }
      const applicationsResponse = await fetch(`${API_URL.replace('/careers','').replace('/blog','')}/admin/recent-applications`);
      const applicationsData = await applicationsResponse.json();
      if (applicationsData.success) setRecentApplications(applicationsData.applications);
      const contactsResponse = await fetch(`${API_URL.replace('/careers','').replace('/blog','')}/admin/recent-contacts`);
      const contactsData = await contactsResponse.json();
      if (contactsData.success) setRecentContacts(contactsData.contacts);
    } catch (error) {
      setStats({
        totalUsers: 0,
        totalApplications: 0,
        pendingApplications: 0,
        totalContacts: 0,
        totalBlogPosts: 0,
        usersGrowth: 0,
        applicationsGrowth: 0,
        contactsGrowth: 0,
        blogPostsGrowth: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    { title: 'View Applications', description: 'Review and manage job applications', icon: 'fas fa-file-alt', link: '/admin/applications', color: 'primary' },
    { title: 'Manage Contacts', description: 'View and respond to contact form submissions', icon: 'fas fa-envelope', link: '/admin/contacts', color: 'success' },
    { title: 'Create Blog Post', description: 'Add new content to your blog', icon: 'fas fa-blog', link: '/admin/blog', color: 'info' },
    { title: 'System Settings', description: 'Configure system preferences and settings', icon: 'fas fa-cog', link: '/admin/settings', color: 'secondary' },
  ];

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="admin-page">
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
    <div className="admin-dashboard d-flex" style={{minHeight: '100vh', background: 'linear-gradient(120deg, #e3f0fc 0%, #f8fbff 100%)'}}>
      {/* Sidebar */}
      <aside className={`admin-sidebar bg-white shadow-lg${sidebarOpen ? ' open' : ''}`} style={{width: sidebarOpen ? 220 : 64, transition: 'width 0.2s', zIndex: 1020}}>
        <div className="d-flex flex-column align-items-center py-4 h-100">
          <button className="btn btn-link mb-4" onClick={() => setSidebarOpen(v => !v)} title="Toggle Sidebar">
            <i className={`fas fa-${sidebarOpen ? 'angle-left' : 'angle-right'}`}></i>
          </button>
          <div className="sidebar-logo mb-4">
            <span className="creova-logo-svg" style={{width: 40, height: 40, display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}>
              <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="circle-c-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#1976d2" />
                    <stop offset="1" stopColor="#40a9ff" />
                  </linearGradient>
                </defs>
                <circle cx="20" cy="20" r="18" fill="url(#circle-c-gradient)" />
                <text x="50%" y="56%" textAnchor="middle" dominantBaseline="middle" fontFamily="Segoe UI, Arial, sans-serif" fontWeight="bold" fontSize="18" fill="#fff">C</text>
              </svg>
            </span>
          </div>
          <nav className="flex-grow-1 w-100">
            <ul className="nav flex-column w-100">
              {sidebarLinks.map(link => (
                <li className="nav-item w-100" key={link.to}>
                  <Link to={link.to} className="nav-link d-flex align-items-center px-3 py-2" style={{color: '#1976d2', fontWeight: 500}}>
                    <i className={`${link.icon} me-2`}></i>
                    {sidebarOpen && link.label}
                  </Link>
                </li>
              ))}
              <li className="nav-item w-100 mt-3">
                <button className="btn btn-outline-danger w-100 d-flex align-items-center" onClick={handleLogout} aria-label="Logout from Admin Dashboard">
                  <i className="fas fa-sign-out-alt me-2"></i>
                  {sidebarOpen && 'Logout'}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-grow-1 p-4" style={{background: 'rgba(255,255,255,0.7)', borderRadius: 24, margin: 24, boxShadow: '0 8px 32px rgba(25,118,210,0.08)', position: 'relative', overflow: 'hidden'}}>
        {/* Animated background particles */}
        <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none'}}>
          <svg width="100%" height="100%" viewBox="0 0 1920 400" preserveAspectRatio="none" style={{position: 'absolute', top: 0, left: 0}}>
            <circle cx="200" cy="80" r="6" fill="#43cea2" opacity="0.18">
              <animate attributeName="cy" values="80;120;80" dur="8s" repeatCount="indefinite" />
            </circle>
            <circle cx="600" cy="120" r="4" fill="#1976d2" opacity="0.15">
              <animate attributeName="cy" values="120;60;120" dur="10s" repeatCount="indefinite" />
            </circle>
            <circle cx="1200" cy="60" r="5" fill="#ffb300" opacity="0.13">
              <animate attributeName="cy" values="60;100;60" dur="7s" repeatCount="indefinite" />
            </circle>
            <circle cx="1700" cy="100" r="7" fill="#43cea2" opacity="0.16">
              <animate attributeName="cy" values="100;140;100" dur="9s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
        {/* Welcome Banner */}
        <div className="mb-4 p-3 rounded shadow-sm d-flex align-items-center justify-content-between" style={{background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)', color: 'white', fontWeight: 500, fontSize: '1.15rem', zIndex: 1, position: 'relative'}}>
          <span role="img" aria-label="tractor" style={{fontSize: '1.7rem', marginRight: 12}}>🚜</span>
          <span>Welcome, Admin! <span className="d-none d-md-inline">| "गाँव की मिट्टी से, तकनीक की ऊँचाई तक!" | "From rural roots to tech heights!"</span></span>
          <button className="btn btn-light btn-sm ms-3" style={{fontWeight: 600, borderRadius: 8}} onClick={fetchDashboardData} title="Refresh Dashboard Data"><i className="fas fa-sync-alt me-1"></i>Refresh</button>
        </div>
        <HeroSection
          title="Admin Dashboard"
          subtitle="Manage your website content, applications, and system settings from one central location."
          backgroundType="animated"
          minHeight="40vh"
        />
        {/* Header (avatar and quick actions remain below) */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div></div>
          <div className="d-flex align-items-center">
            <div className="avatar-placeholder text-white d-flex align-items-center justify-content-center me-3"
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                fontSize: 22,
                background: avatarError ? 'linear-gradient(135deg, #1976d2 0%, #40a9ff 100%)' : 'linear-gradient(135deg, #00bfae 0%, #1de9b6 100%)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                border: '2px solid #fff',
                overflow: 'hidden'
              }}
            >
              {avatarError ? (
                <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="18" fill="url(#circle-c-gradient)" />
                  <defs>
                    <linearGradient id="circle-c-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#1976d2" />
                      <stop offset="1" stopColor="#40a9ff" />
                    </linearGradient>
                  </defs>
                  <text x="50%" y="56%" textAnchor="middle" dominantBaseline="middle" fontFamily="Segoe UI, Arial, sans-serif" fontWeight="bold" fontSize="18" fill="#fff">C</text>
                </svg>
              ) : (
                <img
                  src={'/images/vishal-singh.jpg'}
                  alt="Administrator"
                  style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%'}}
                  onError={e => { setAvatarError(true); console.log('Admin avatar image failed to load:', e.target.src); }}
                />
              )}
            </div>
            <div>
              <div className="fw-semibold">Admin User</div>
              <small className="text-muted">Administrator</small>
            </div>
          </div>
        </div>
        {/* Overview Cards */}
        <div className="row g-4 mb-4">
          {/* Total Users Card */}
          <div className="col-lg-3 col-md-6">
            <div className="card glass-card border-0 shadow-sm h-100 dashboard-hover-card" title="Total registered users">
              <div className="card-body d-flex align-items-center">
                <div className="stat-icon bg-light me-3" style={{boxShadow: 'none', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px'}}>
                  <img src={process.env.PUBLIC_URL + '/logo192.png'} alt="Creova Logo" style={{width: 32, height: 32, borderRadius: 8}} />
                </div>
                <div>
                  <h3 className="mb-1">{stats.totalUsers || 0}</h3>
                  <p className="text-muted mb-0">Total Users</p>
                  {(stats.totalUsers > 0 && stats.usersGrowth > 0) ? (
                    <div className="text-success" style={{fontSize: '0.95rem', marginTop: 2}}>
                      <i className="fas fa-arrow-up"></i> +{stats.usersGrowth}% this month
                    </div>
                  ) : (
                    <div className="text-muted" style={{fontSize: '0.95rem', marginTop: 2}}>0 this month</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Applications Card */}
          <div className="col-lg-3 col-md-6">
            <div className="card glass-card border-0 shadow-sm h-100 dashboard-hover-card" title="Total job applications">
              <div className="card-body d-flex align-items-center">
                <div className="stat-icon bg-primary text-white me-3"><i className="fas fa-file-alt"></i></div>
                <div>
                  <h3 className="mb-1">{stats.totalApplications || 0}</h3>
                  <p className="text-muted mb-0">Total Applications</p>
                  {(stats.totalApplications > 0 && stats.applicationsGrowth > 0) ? (
                    <div className="text-success" style={{fontSize: '0.95rem', marginTop: 2}}>
                      <i className="fas fa-arrow-up"></i> +{stats.applicationsGrowth}% this month
                    </div>
                  ) : (
                    <div className="text-muted" style={{fontSize: '0.95rem', marginTop: 2}}>0 this month</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Pending Applications Card */}
          <div className="col-lg-3 col-md-6">
            <div className="card glass-card border-0 shadow-sm h-100 dashboard-hover-card" title="Pending job applications">
              <div className="card-body d-flex align-items-center">
                <div className="stat-icon bg-warning text-white me-3"><i className="fas fa-clock"></i></div>
                <div>
                  <h3 className="mb-1">{stats.pendingApplications || 0}</h3>
                  <p className="text-muted mb-0">Pending Applications</p>
                </div>
              </div>
            </div>
          </div>
          {/* Contacts Card */}
          <div className="col-lg-3 col-md-6">
            <div className="card glass-card border-0 shadow-sm h-100 dashboard-hover-card" title="Contact form submissions">
              <div className="card-body d-flex align-items-center">
                <div className="stat-icon bg-success text-white me-3"><i className="fas fa-envelope"></i></div>
                <div>
                  <h3 className="mb-1">{stats.totalContacts || 0}</h3>
                  <p className="text-muted mb-0">Contact Messages</p>
                  {(stats.totalContacts > 0 && stats.contactsGrowth > 0) ? (
                    <div className="text-success" style={{fontSize: '0.95rem', marginTop: 2}}>
                      <i className="fas fa-arrow-up"></i> +{stats.contactsGrowth}% this month
                    </div>
                  ) : (
                    <div className="text-muted" style={{fontSize: '0.95rem', marginTop: 2}}>0 this month</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Blog Posts Card */}
          <div className="col-lg-3 col-md-6">
            <div className="card glass-card border-0 shadow-sm h-100 dashboard-hover-card" title="Blog posts">
              <div className="card-body d-flex align-items-center">
                <div className="stat-icon bg-info text-white me-3"><i className="fas fa-blog"></i></div>
                <div>
                  <h3 className="mb-1">{stats.totalBlogPosts || 0}</h3>
                  <p className="text-muted mb-0">Blog Posts</p>
                  {(stats.totalBlogPosts > 0 && stats.blogPostsGrowth > 0) ? (
                    <div className="text-success" style={{fontSize: '0.95rem', marginTop: 2}}>
                      <i className="fas fa-arrow-up"></i> +{stats.blogPostsGrowth}% this month
                    </div>
                  ) : (
                    <div className="text-muted" style={{fontSize: '0.95rem', marginTop: 2}}>0 this month</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Chart Placeholder */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm glass-card p-4 h-100 position-relative">
              <h5 className="mb-3">Applications Analytics <span className="badge bg-warning ms-2" style={{fontSize: '0.95rem'}}>Coming Soon</span></h5>
              <div className="d-flex align-items-center justify-content-center" style={{height: 220, background: 'rgba(230,245,255,0.5)', borderRadius: 16}}>
                <span className="text-muted">[Chart Placeholder: Applications per Month]</span>
              </div>
            </div>
          </div>
        </div>
        {/* Quick Actions */}
        <div className="row g-4 mb-4">
          {quickActions.map(action => (
            <div className="col-lg-3 col-md-6" key={action.title}>
              <Link to={action.link} className={`card glass-card border-0 shadow-sm h-100 text-decoration-none text-reset bg-${action.color}-light dashboard-hover-card`} style={{transition: 'box-shadow 0.2s'}} title={action.description}>
                <div className="card-body d-flex align-items-center">
                  <div className={`stat-icon bg-${action.color} text-white me-3`}><i className={action.icon}></i></div>
                  <div>
                    <h6 className="fw-bold mb-1">{action.title}</h6>
                    <p className="text-muted mb-0" style={{fontSize: '0.97rem'}}>{action.description}</p>
                    {action.title === 'Create Blog Post' && (
                      <span style={{color: '#1976d2', fontWeight: 600, fontSize: '1.1rem'}}>Create</span>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        {/* Recent Activity */}
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm glass-card h-100">
              <div className="card-header bg-white border-0 fw-bold d-flex justify-content-between align-items-center">
                <span>Recent Applications</span>
                <Link to="/admin/applications" className="btn btn-link btn-sm" style={{fontWeight: 600}}>View All</Link>
              </div>
              <div className="card-body">
                {recentApplications.length === 0 ? (
                  <div className="text-center text-muted">No recent applications.</div>
                ) : (
                  <ul className="list-group list-group-flush">
                    {recentApplications.map(app => (
                      <li className="list-group-item d-flex align-items-center" key={app.id}>
                        <i className="fas fa-user-circle text-primary me-3"></i>
                        <div>
                          <div className="fw-semibold">{app.name}</div>
                          <div className="small text-muted">{app.position} &middot; {formatDate(app.applied_at)}</div>
                        </div>
                        <span className="badge bg-primary ms-auto">{app.status}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm glass-card h-100">
              <div className="card-header bg-white border-0 fw-bold d-flex justify-content-between align-items-center">
                <span>Recent Contacts</span>
                <Link to="/admin/contacts" className="btn btn-link btn-sm" style={{fontWeight: 600}}>View All</Link>
              </div>
              <div className="card-body">
                {recentContacts.length === 0 ? (
                  <div className="text-center text-muted">No recent contacts.</div>
                ) : (
                  <ul className="list-group list-group-flush">
                    {recentContacts.map(contact => (
                      <li className="list-group-item d-flex align-items-center" key={contact.id}>
                        <i className="fas fa-envelope text-success me-3"></i>
                        <div>
                          <div className="fw-semibold">{contact.name}</div>
                          <div className="small text-muted">{contact.email} &middot; {formatDate(contact.created_at)}</div>
                        </div>
                        <span className="badge bg-success ms-auto">New</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Rural/Desi Quote at Bottom */}
        <div className="text-center mt-5 mb-2" style={{fontWeight: 500, fontSize: '1.08rem', color: '#1976d2', opacity: 0.92}}>
          <span role="img" aria-label="wheat"></span> "जहाँ मेहनत हो खेतों में, वहाँ तरक्की हो तकनीक में!" <span role="img" aria-label="rocket">🚀</span><br/>
          <span style={{fontSize: '0.98rem', color: '#555'}}>"Where there is hard work in the fields, there is progress in technology!"</span>
        </div>
      </main>
      <style>{`
        .admin-dashboard { font-family: 'Segoe UI', Arial, sans-serif; }
        .admin-sidebar { min-height: 100vh; border-right: 1.5px solid #e5eaf1; }
        .admin-sidebar.open { width: 220px !important; }
        .admin-sidebar .nav-link { color: #1976d2; border-radius: 0.5rem; margin-bottom: 4px; }
        .admin-sidebar .nav-link.active, .admin-sidebar .nav-link:hover { background: #e3f0fc; color: #0a4fa3; }
        .glass-card { background: rgba(255,255,255,0.85) !important; backdrop-filter: blur(8px); border-radius: 1rem; }
        .stat-icon { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; box-shadow: 0 2px 8px rgba(25,118,210,0.08); }
        .dashboard-hover-card:hover { box-shadow: 0 8px 32px 0 rgba(67,206,162,0.18), 0 2px 8px rgba(25,118,210,0.10) !important; transform: translateY(-4px) scale(1.03); border: 1.5px solid #43cea233; }
        .bg-primary-light { background: #e3f0fc !important; }
        .bg-success-light { background: #eafaf1 !important; }
        .bg-info-light { background: #eaf6fb !important; }
        .bg-secondary-light { background: #f3f4f6 !important; }
        .card-header { font-size: 1.1rem; font-weight: 600; }
        @media (max-width: 991px) {
          .admin-dashboard main { margin: 8px !important; border-radius: 12px !important; }
          .admin-sidebar { width: 56px !important; }
        }
      `}</style>
    </div>
  );
};

export default Admin; 