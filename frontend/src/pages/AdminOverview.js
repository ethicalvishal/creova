import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminOverview = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalApplications: 0,
    pendingApplications: 0,
    totalContacts: 0,
    totalBlogPosts: 0,
    totalJobs: 0,
    totalServices: 0,
    totalProducts: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [systemMetrics, setSystemMetrics] = useState({
    cpuUsage: 0,
    memoryUsage: 0,
    diskUsage: 0,
    activeUsers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchSystemMetrics, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, activityRes] = await Promise.all([
        fetch('http://localhost:5000/api/admin/stats'),
        fetch('http://localhost:5000/api/admin/recent-activity')
      ]);

      const statsData = await statsRes.json();
      const activityData = await activityRes.json();

      if (statsData.success) setStats(statsData.stats);
      if (activityData.success) setRecentActivity(activityData.activities);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSystemMetrics = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/system-metrics');
      const data = await response.json();
      if (data.success) {
        setSystemMetrics(data.metrics);
      }
    } catch (error) {
      console.error('Error fetching system metrics:', error);
    }
  };

  const quickActions = [
    {
      title: 'Create Blog Post',
      description: 'Add new content to your blog',
      icon: 'fas fa-edit',
      link: '/admin/blog',
      color: 'primary',
      action: 'create'
    },
    {
      title: 'Post New Job',
      description: 'Add a new job opening',
      icon: 'fas fa-briefcase',
      link: '/admin/jobs',
      color: 'success',
      action: 'create'
    },
    {
      title: 'Manage Users',
      description: 'View and manage user accounts',
      icon: 'fas fa-users',
      link: '/admin/users',
      color: 'info',
      action: 'manage'
    },
    {
      title: 'Review Applications',
      description: 'Check pending job applications',
      icon: 'fas fa-file-alt',
      link: '/admin/applications',
      color: 'warning',
      action: 'review'
    },
    {
      title: 'System Settings',
      description: 'Configure website settings',
      icon: 'fas fa-cog',
      link: '/admin/settings',
      color: 'secondary',
      action: 'configure'
    },
    {
      title: 'View Analytics',
      description: 'Check website performance',
      icon: 'fas fa-chart-line',
      link: '/admin/analytics',
      color: 'dark',
      action: 'analyze'
    }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'warning', icon: 'clock' },
      approved: { color: 'success', icon: 'check' },
      rejected: { color: 'danger', icon: 'times' },
      active: { color: 'success', icon: 'check-circle' },
      inactive: { color: 'secondary', icon: 'pause-circle' }
    };
    
    const config = statusConfig[status] || { color: 'secondary', icon: 'question' };
    
    return (
      <span className={`badge bg-${config.color}`}>
        <i className={`fas fa-${config.icon} me-1`}></i>
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{height: '400px'}}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-overview">
      {/* Welcome Section */}
      <div className="welcome-section mb-4">
        <div className="row align-items-center">
          <div className="col-md-8">
            <h1 className="fw-bold mb-2" style={{color: '#667eea'}}>
              Welcome back, Administrator! 👋
            </h1>
            <p className="text-muted mb-0">
              Here's what's happening with your website today. You have {stats.pendingApplications} pending applications to review.
            </p>
          </div>
          <div className="col-md-4 text-end">
            <div className="current-time">
              <i className="fas fa-clock text-muted me-2"></i>
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="row g-4 mb-4">
        <div className="col-xl-3 col-md-6">
          <div className="card glass-card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="stat-icon me-3 d-flex align-items-center justify-content-center" style={{width: 44, height: 44, borderRadius: '12px', background: 'linear-gradient(135deg, #1976d2 0%, #40a9ff 100%)'}}>
                  <i className="fas fa-users" style={{color: 'white', fontSize: '1.5rem'}}></i>
                </div>
                <div>
                  <h3 className="mb-1 fw-bold">{stats.totalUsers || 0}</h3>
                  <p className="text-muted mb-0">Total Users</p>
                  <small className="text-muted">0 this month</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card glass-card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="stat-icon bg-success text-white me-3">
                  <i className="fas fa-file-alt"></i>
                </div>
                <div>
                  <h3 className="mb-1 fw-bold">{stats.totalApplications || 0}</h3>
                  <p className="text-muted mb-0">Applications</p>
                  <small className="text-warning">
                    <i className="fas fa-exclamation-triangle me-1"></i>
                    {stats.pendingApplications || 0} pending
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card glass-card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="stat-icon bg-info text-white me-3">
                  <i className="fas fa-blog"></i>
                </div>
                <div>
                  <h3 className="mb-1 fw-bold">{stats.totalBlogPosts || 0}</h3>
                  <p className="text-muted mb-0">Blog Posts</p>
                  <small className="text-muted">0 views today</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card glass-card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="stat-icon bg-warning text-white me-3">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h3 className="mb-1 fw-bold">{stats.totalContacts || 0}</h3>
                  <p className="text-muted mb-0">Contact Messages</p>
                  <small className="text-muted">0 unread</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Metrics */}
      <div className="row g-4 mb-4">
        <div className="col-lg-8">
          <div className="card glass-card border-0 shadow-sm">
            <div className="card-header bg-transparent border-0">
              <h5 className="mb-0 fw-bold">
                <i className="fas fa-chart-line me-2"></i>
                System Performance
              </h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="metric-item">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="fw-semibold">CPU Usage</span>
                      <span className="text-muted">{systemMetrics.cpuUsage}%</span>
                    </div>
                    <div className="progress" style={{height: '8px'}}>
                      <div 
                        className={`progress-bar ${systemMetrics.cpuUsage > 80 ? 'bg-danger' : 'bg-primary'}`}
                        style={{width: `${systemMetrics.cpuUsage}%`}}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="metric-item">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="fw-semibold">Memory Usage</span>
                      <span className="text-muted">{systemMetrics.memoryUsage}%</span>
                    </div>
                    <div className="progress" style={{height: '8px'}}>
                      <div 
                        className={`progress-bar ${systemMetrics.memoryUsage > 80 ? 'bg-danger' : 'bg-success'}`}
                        style={{width: `${systemMetrics.memoryUsage}%`}}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="metric-item">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="fw-semibold">Disk Usage</span>
                      <span className="text-muted">{systemMetrics.diskUsage}%</span>
                    </div>
                    <div className="progress" style={{height: '8px'}}>
                      <div 
                        className={`progress-bar ${systemMetrics.diskUsage > 80 ? 'bg-danger' : 'bg-warning'}`}
                        style={{width: `${systemMetrics.diskUsage}%`}}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="metric-item">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="fw-semibold">Active Users</span>
                      <span className="text-muted">{systemMetrics.activeUsers}</span>
                    </div>
                    <div className="progress" style={{height: '8px'}}>
                      <div 
                        className="progress-bar bg-info"
                        style={{width: `${(systemMetrics.activeUsers / 100) * 100}%`}}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card glass-card border-0 shadow-sm">
            <div className="card-header bg-transparent border-0">
              <h5 className="mb-0 fw-bold">
                <i className="fas fa-bolt me-2"></i>
                Quick Actions
              </h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                {quickActions.slice(0, 4).map(action => (
                  <Link 
                    key={action.title}
                    to={action.link}
                    className="btn btn-outline-primary btn-sm d-flex align-items-center justify-content-between"
                    aria-label={`Go to ${action.title}`}
                  >
                    <span>
                      <i className={`${action.icon} me-2`}></i>
                      {action.title}
                    </span>
                    <i className="fas fa-arrow-right"></i>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="row g-4 mb-4">
        {quickActions.map(action => (
          <div className="col-lg-4 col-md-6" key={action.title}>
            <Link to={action.link} className="card glass-card border-0 shadow-sm h-100 text-decoration-none" aria-label={`Manage ${action.title}`}>
              <div className="card-body d-flex align-items-center">
                {action.title === 'Create Blog Post' ? (
                  <div className="stat-icon me-3 d-flex align-items-center justify-content-center" style={{width: 44, height: 44, borderRadius: '12px', background: 'linear-gradient(135deg, #ff9800 0%, #ffc107 100%)'}}>
                    <i className="fas fa-blog" style={{color: 'white', fontSize: '1.3rem'}}></i>
                  </div>
                ) : action.title === 'System Settings' ? (
                  <div className="stat-icon me-3 d-flex align-items-center justify-content-center" style={{width: 44, height: 44, borderRadius: '12px', background: 'linear-gradient(135deg, #00bfae 0%, #1de9b6 100%)'}}>
                    <i className="fas fa-cog" style={{color: 'white', fontSize: '1.3rem'}}></i>
                  </div>
                ) : (
                  <div className={`stat-icon bg-${action.color} text-white me-3`}>
                    <i className={action.icon}></i>
                  </div>
                )}
                <div>
                  <h6 className="fw-bold mb-1 text-dark">{action.title}</h6>
                  <p className="text-muted mb-0 small">{action.description}</p>
                  {(action.title.toLowerCase().includes('reply') || action.title.toLowerCase().includes('blog')) && (
                    <small className={`text-${action.color} fw-semibold`}>0</small>
                  )}
                  {!(action.title.toLowerCase().includes('reply') || action.title.toLowerCase().includes('blog')) && (
                    <small className={`text-${action.color} fw-semibold`}>{action.action} →</small>
                  )}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card glass-card border-0 shadow-sm">
            <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center">
              <h5 className="mb-0 fw-bold">
                <i className="fas fa-history me-2"></i>
                Recent Activity
              </h5>
              <Link to="/admin/analytics" className="btn btn-sm btn-outline-primary" aria-label="View Detailed Analytics">
                View All
              </Link>
            </div>
            <div className="card-body">
              {recentActivity.length === 0 ? (
                <div className="text-center text-muted py-4">
                  <i className="fas fa-inbox fa-2x mb-3"></i>
                  <p>No recent activity</p>
                </div>
              ) : (
                <div className="activity-list">
                  {recentActivity.map(activity => (
                    <div key={activity.id} className="activity-item d-flex align-items-center py-3 border-bottom">
                      <div className={`activity-icon bg-${activity.type === 'user' ? 'primary' : activity.type === 'application' ? 'success' : 'info'} text-white me-3`}>
                        <i className={`fas fa-${activity.icon}`}></i>
                      </div>
                      <div className="flex-grow-1">
                        <div className="fw-semibold">{activity.title}</div>
                        <div className="text-muted small">{activity.description}</div>
                        <small className="text-muted">{formatDate(activity.timestamp)}</small>
                      </div>
                      {activity.status && getStatusBadge(activity.status)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card glass-card border-0 shadow-sm">
            <div className="card-header bg-transparent border-0">
              <h5 className="mb-0 fw-bold">
                <i className="fas fa-tasks me-2"></i>
                Pending Tasks
              </h5>
            </div>
            <div className="card-body">
              <div className="task-list">
                <div className="task-item d-flex align-items-center justify-content-between py-2">
                  <span>Review Applications</span>
                  <span className="badge bg-warning">{stats.pendingApplications || 0}</span>
                </div>
                <div className="task-item d-flex align-items-center justify-content-between py-2">
                  <span>Reply to Messages</span>
                  <span className="badge bg-info">0</span>
                </div>
                <div className="task-item d-flex align-items-center justify-content-between py-2">
                  <span>Update Blog</span>
                  <span className="badge bg-primary">0</span>
                </div>
                <div className="task-item d-flex align-items-center justify-content-between py-2">
                  <span>System Backup</span>
                  <span className="badge bg-success">Complete</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .admin-overview {
          font-family: 'Segoe UI', Arial, sans-serif;
        }
        
        .glass-card {
          background: rgba(255,255,255,0.9) !important;
          backdrop-filter: blur(10px);
          border-radius: 16px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .glass-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.1) !important;
        }
        
        .stat-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        .activity-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
        }
        
        .metric-item .progress {
          border-radius: 10px;
          background: rgba(0,0,0,0.05);
        }
        
        .task-item {
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }
        
        .task-item:last-child {
          border-bottom: none;
        }
        
        .current-time {
          font-size: 0.9rem;
          color: #6c757d;
        }
        
        @media (max-width: 768px) {
          .welcome-section .text-end {
            text-align: left !important;
            margin-top: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminOverview; 