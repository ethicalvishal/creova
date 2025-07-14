import React, { useState } from 'react';

const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState({
    overview: {
      totalVisitors: 0,
      uniqueVisitors: 0,
      pageViews: 0,
      bounceRate: 0,
      avgSessionDuration: 0,
      conversionRate: 0
    },
    traffic: {
      daily: [],
      weekly: [],
      monthly: []
    },
    pages: [],
    sources: [],
    devices: [],
    locations: []
  });
  const [dateRange, setDateRange] = useState('30');
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetchAnalytics();
  // }, [dateRange]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/admin/analytics?range=${dateRange}`);
      const data = await response.json();
      if (data.success) {
        setAnalytics(data.analytics);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // const getPercentageChange = (current, previous) => {
  //   if (previous === 0) return 100;
  //   return ((current - previous) / previous * 100).toFixed(1);
  // };

  const renderOverviewCards = () => (
    <div className="row g-4 mb-4">
      <div className="col-xl-2 col-md-4 col-sm-6">
        <div className="card glass-card border-0 shadow-sm h-100">
          <div className="card-body text-center">
            <div className="stat-icon" style={{background: 'linear-gradient(135deg, #1976d2 0%, #40a9ff 100%)', color: 'white', width: 44, height: 44, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem'}}>
              <i className="fas fa-users"></i>
            </div>
            <h3 className="fw-bold mb-1">0</h3>
            <p className="text-muted mb-1">Total Visitors</p>
            <small className="text-muted">0%</small>
          </div>
        </div>
      </div>

      <div className="col-xl-2 col-md-4 col-sm-6">
        <div className="card glass-card border-0 shadow-sm h-100">
          <div className="card-body text-center">
            <div className="stat-icon bg-success text-white mx-auto mb-3">
              <i className="fas fa-user-check"></i>
            </div>
            <h3 className="fw-bold mb-1">0</h3>
            <p className="text-muted mb-1">Unique Visitors</p>
            <small className="text-muted">0%</small>
          </div>
        </div>
      </div>

      <div className="col-xl-2 col-md-4 col-sm-6">
        <div className="card glass-card border-0 shadow-sm h-100">
          <div className="card-body text-center">
            <div className="stat-icon bg-info text-white mx-auto mb-3">
              <i className="fas fa-eye"></i>
            </div>
            <h3 className="fw-bold mb-1">0</h3>
            <p className="text-muted mb-1">Page Views</p>
            <small className="text-muted">0%</small>
          </div>
        </div>
      </div>

      <div className="col-xl-2 col-md-4 col-sm-6">
        <div className="card glass-card border-0 shadow-sm h-100">
          <div className="card-body text-center">
            <div className="stat-icon bg-warning text-white mx-auto mb-3">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3 className="fw-bold mb-1">0%</h3>
            <p className="text-muted mb-1">Bounce Rate</p>
            <small className="text-muted">0%</small>
          </div>
        </div>
      </div>

      <div className="col-xl-2 col-md-4 col-sm-6">
        <div className="card glass-card border-0 shadow-sm h-100">
          <div className="card-body text-center">
            <div className="stat-icon bg-secondary text-white mx-auto mb-3">
              <i className="fas fa-clock" style={{ color: '#43cea2' }}></i>
            </div>
            <h3 className="fw-bold mb-1">0:00</h3>
            <p className="text-muted mb-1">Avg. Session</p>
            <small className="text-muted">0%</small>
          </div>
        </div>
      </div>

      <div className="col-xl-2 col-md-4 col-sm-6">
        <div className="card glass-card border-0 shadow-sm h-100">
          <div className="card-body text-center">
            <div className="stat-icon bg-danger text-white mx-auto mb-3">
              <i className="fas fa-percentage"></i>
            </div>
            <h3 className="fw-bold mb-1">0%</h3>
            <p className="text-muted mb-1">Conversion Rate</p>
            <small className="text-muted">0%</small>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTrafficChart = () => (
    <div className="card glass-card border-0 shadow-sm mb-4">
      <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center">
        <h5 className="mb-0 fw-bold">
          <i className="fas fa-chart-area me-2"></i>
          Traffic Overview
        </h5>
        <div className="btn-group btn-group-sm">
          <button 
            className={`btn btn-outline-primary ${dateRange === '7' ? 'active' : ''}`}
            onClick={() => setDateRange('7')}
            aria-label="Show last 7 days"
            aria-pressed={dateRange === '7'}
          >
            7D
          </button>
          <button 
            className={`btn btn-outline-primary ${dateRange === '30' ? 'active' : ''}`}
            onClick={() => setDateRange('30')}
            aria-label="Show last 30 days"
            aria-pressed={dateRange === '30'}
          >
            30D
          </button>
          <button 
            className={`btn btn-outline-primary ${dateRange === '90' ? 'active' : ''}`}
            onClick={() => setDateRange('90')}
            aria-label="Show last 90 days"
            aria-pressed={dateRange === '90'}
          >
            90D
          </button>
        </div>
      </div>
      <div className="card-body">
        <div className="chart-container" style={{height: '300px', background: 'rgba(248,249,250,0.5)', borderRadius: '12px'}}>
          <div className="d-flex align-items-center justify-content-center h-100">
            <div className="text-center text-muted">
              <i className="fas fa-chart-area fa-3x mb-3"></i>
              <p>Traffic Chart Visualization</p>
              <small>Chart.js or similar library would be integrated here</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTopPages = () => (
    <div className="card glass-card border-0 shadow-sm mb-4">
      <div className="card-header bg-transparent border-0">
        <h5 className="mb-0 fw-bold">
          <i className="fas fa-file-alt me-2"></i>
          Top Pages
        </h5>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Page</th>
                <th>Views</th>
                <th>Unique Views</th>
                <th>Bounce Rate</th>
                <th>Avg. Time</th>
              </tr>
            </thead>
            <tbody>
              {analytics.pages.slice(0, 10).map((page, index) => (
                <tr key={index}>
                  <td>
                    <div className="d-flex align-items-center">
                      <span className="badge bg-primary me-2">{index + 1}</span>
                      <div>
                        <div className="fw-semibold">{page.url}</div>
                        <small className="text-muted">{page.title}</small>
                      </div>
                    </div>
                  </td>
                  <td>{formatNumber(page.views)}</td>
                  <td>{formatNumber(page.uniqueViews)}</td>
                  <td>
                    <span className={`badge bg-${page.bounceRate > 70 ? 'danger' : page.bounceRate > 50 ? 'warning' : 'success'}`}>
                      {page.bounceRate}%
                    </span>
                  </td>
                  <td>{formatDuration(page.avgTime)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderTrafficSources = () => (
    <div className="row g-4 mb-4">
      <div className="col-lg-6">
        <div className="card glass-card border-0 shadow-sm h-100">
          <div className="card-header bg-transparent border-0">
            <h5 className="mb-0 fw-bold">
              <i className="fas fa-share-alt me-2"></i>
              Traffic Sources
            </h5>
          </div>
          <div className="card-body">
            {analytics.sources.map((source, index) => (
              <div key={index} className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center">
                  <div className={`source-icon bg-${source.color} text-white me-3`}>
                    <i className={`fas fa-${source.icon}`}></i>
                  </div>
                  <div>
                    <div className="fw-semibold">{source.name}</div>
                    <small className="text-muted">{source.visitors} visitors</small>
                  </div>
                </div>
                <div className="text-end">
                  <div className="fw-bold">{source.percentage}%</div>
                  <div className="progress mt-1" style={{width: '60px', height: '4px'}}>
                    <div 
                      className="progress-bar" 
                      style={{width: `${source.percentage}%`, backgroundColor: source.color}}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="col-lg-6">
        <div className="card glass-card border-0 shadow-sm h-100">
          <div className="card-header bg-transparent border-0">
            <h5 className="mb-0 fw-bold">
              <i className="fas fa-mobile-alt me-2"></i>
              Device Distribution
            </h5>
          </div>
          <div className="card-body">
            {analytics.devices.map((device, index) => (
              <div key={index} className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center">
                  <div className={`device-icon bg-${device.color} text-white me-3`}>
                    <i className={`fas fa-${device.icon}`}></i>
                  </div>
                  <div>
                    <div className="fw-semibold">{device.name}</div>
                    <small className="text-muted">{device.visitors} visitors</small>
                  </div>
                </div>
                <div className="text-end">
                  <div className="fw-bold">{device.percentage}%</div>
                  <div className="progress mt-1" style={{width: '60px', height: '4px'}}>
                    <div 
                      className="progress-bar" 
                      style={{width: `${device.percentage}%`, backgroundColor: device.color}}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderGeographicData = () => (
    <div className="card glass-card border-0 shadow-sm mb-4">
      <div className="card-header bg-transparent border-0">
        <h5 className="mb-0 fw-bold">
          <i className="fas fa-map-marker-alt me-2"></i>
          Geographic Distribution
        </h5>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-8">
            <div className="map-container" style={{height: '300px', background: 'rgba(248,249,250,0.5)', borderRadius: '12px'}}>
              <div className="d-flex align-items-center justify-content-center h-100">
                <div className="text-center text-muted">
                  <i className="fas fa-map fa-3x mb-3"></i>
                  <p>Interactive Map Visualization</p>
                  <small>Google Maps or similar would be integrated here</small>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="location-list">
              {analytics.locations.slice(0, 10).map((location, index) => (
                <div key={index} className="d-flex align-items-center justify-content-between mb-3">
                  <div className="d-flex align-items-center">
                    <span className="badge bg-primary me-2">{index + 1}</span>
                    <div>
                      <div className="fw-semibold">{location.country}</div>
                      <small className="text-muted">{location.city}</small>
                    </div>
                  </div>
                  <div className="text-end">
                    <div className="fw-bold">{formatNumber(location.visitors)}</div>
                    <small className="text-muted">{location.percentage}%</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRealTimeStats = () => (
    <div className="card glass-card border-0 shadow-sm">
      <div className="card-header bg-transparent border-0">
        <h5 className="mb-0 fw-bold">
          <i className="fas fa-broadcast-tower me-2"></i>
          Real-Time Statistics
        </h5>
      </div>
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-3">
            <div className="text-center">
              <div className="real-time-number fw-bold text-primary">0</div>
              <div className="text-muted">Active Users</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="text-center">
              <div className="real-time-number fw-bold text-success">0</div>
              <div className="text-muted">Page Views Today</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="text-center">
              <div className="real-time-number fw-bold text-info">0</div>
              <div className="text-muted">New Sessions</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="text-center">
              <div className="real-time-number fw-bold text-warning">0</div>
              <div className="text-muted">Conversions</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

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
    <div className="admin-analytics-page" style={{background: 'linear-gradient(135deg, #12c2e9 0%, #00bcd4 100%)', minHeight: '100vh'}}>
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
                <h4 className="mb-0 fw-bold text-dark">Analytics & Report</h4>
                <small className="text-muted">View and analyze website analytics and reports</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {renderOverviewCards()}
      {renderTrafficChart()}
      {renderTrafficSources()}
      {renderTopPages()}
      {renderGeographicData()}
      {renderRealTimeStats()}

      <style>{`
        .admin-analytics {
          font-family: 'Segoe UI', Arial, sans-serif;
        }
        
        .glass-card {
          background: rgba(255,255,255,0.95) !important;
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
        
        .source-icon,
        .device-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
        }
        
        .real-time-number {
          font-size: 2rem;
          line-height: 1;
        }
        
        .chart-container,
        .map-container {
          border: 2px dashed #dee2e6;
        }
        
        .progress {
          border-radius: 10px;
          background: rgba(0,0,0,0.05);
        }
        
        .table th {
          border-top: none;
          font-weight: 600;
          color: #495057;
        }
        
        .btn-group .btn.active {
          background-color: #667eea;
          border-color: #667eea;
          color: white;
        }
        
        @media (max-width: 768px) {
          .real-time-number {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminAnalytics; 