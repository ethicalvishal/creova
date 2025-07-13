import React, { useState, useEffect } from 'react';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    website: {
      siteName: 'Creova',
      siteDescription: 'Leading technology solutions provider',
      siteUrl: 'https://creova.com',
      contactEmail: 'admin@creova.com',
      phoneNumber: '+91 1234567890',
      address: 'Patna, Bihar, India',
      timezone: 'Asia/Kolkata',
      language: 'en',
      maintenanceMode: false
    },
    security: {
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      lockoutDuration: 15,
      requireTwoFactor: true,
      passwordMinLength: 8,
      passwordComplexity: true,
      enableRecaptcha: true,
      recaptchaSiteKey: '',
      recaptchaSecretKey: ''
    },
    email: {
      smtpHost: 'smtp.gmail.com',
      smtpPort: 587,
      smtpUsername: '',
      smtpPassword: '',
      fromEmail: 'noreply@creova.com',
      fromName: 'Creova Admin'
    },
    notifications: {
      emailNotifications: true,
      applicationAlerts: true,
      contactAlerts: true,
      systemAlerts: true,
      weeklyReports: true,
      monthlyReports: true
    },
    backup: {
      autoBackup: true,
      backupFrequency: 'daily',
      backupRetention: 30,
      backupLocation: 'local',
      cloudBackup: false,
      cloudProvider: 'aws'
    },
    analytics: {
      googleAnalytics: true,
      gaTrackingId: '',
      enableHeatmaps: true,
      enableUserTracking: true,
      privacyCompliant: true
    }
  });

  const [activeTab, setActiveTab] = useState('website');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/settings');
      const data = await response.json();
      if (data.success) {
        setSettings(data.settings);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const handleSaveSettings = async (category) => {
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch(`http://localhost:5000/api/admin/settings/${category}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(settings[category])
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: `${category} settings saved successfully!` });
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to save settings' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleTestEmail = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/admin/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(settings.email)
      });

      const data = await response.json();
      if (response.ok) {
        setMessage({ type: 'success', text: 'Test email sent successfully!' });
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to send test email' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to send test email' });
    } finally {
      setLoading(false);
    }
  };

  const handleBackupNow = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/admin/backup', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      const data = await response.json();
      if (response.ok) {
        setMessage({ type: 'success', text: 'Backup completed successfully!' });
      } else {
        setMessage({ type: 'error', text: data.message || 'Backup failed' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Backup failed' });
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'website', label: 'Website Settings', icon: 'fas fa-globe' },
    { id: 'security', label: 'Security', icon: 'fas fa-shield-alt' },
    { id: 'email', label: 'Email Configuration', icon: 'fas fa-envelope' },
    { id: 'notifications', label: 'Notifications', icon: 'fas fa-bell' },
    { id: 'backup', label: 'Backup & Recovery', icon: 'fas fa-database' },
    { id: 'analytics', label: 'Analytics', icon: 'fas fa-chart-bar' }
  ];

  const renderWebsiteSettings = () => (
    <div className="settings-section">
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label fw-semibold">Site Name</label>
          <input
            type="text"
            className="form-control"
            value={settings.website.siteName}
            onChange={(e) => handleSettingChange('website', 'siteName', e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">Site URL</label>
          <input
            type="url"
            className="form-control"
            value={settings.website.siteUrl}
            onChange={(e) => handleSettingChange('website', 'siteUrl', e.target.value)}
          />
        </div>
        <div className="col-12">
          <label className="form-label fw-semibold">Site Description</label>
          <textarea
            className="form-control"
            rows="3"
            value={settings.website.siteDescription}
            onChange={(e) => handleSettingChange('website', 'siteDescription', e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">Contact Email</label>
          <input
            type="email"
            className="form-control"
            value={settings.website.contactEmail}
            onChange={(e) => handleSettingChange('website', 'contactEmail', e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">Phone Number</label>
          <input
            type="tel"
            className="form-control"
            value={settings.website.phoneNumber}
            onChange={(e) => handleSettingChange('website', 'phoneNumber', e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">Timezone</label>
          <select
            className="form-select"
            value={settings.website.timezone}
            onChange={(e) => handleSettingChange('website', 'timezone', e.target.value)}
          >
            <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
            <option value="UTC">UTC</option>
            <option value="America/New_York">America/New_York (EST)</option>
            <option value="Europe/London">Europe/London (GMT)</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">Language</label>
          <select
            className="form-select"
            value={settings.website.language}
            onChange={(e) => handleSettingChange('website', 'language', e.target.value)}
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="bn">Bengali</option>
          </select>
        </div>
        <div className="col-12">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="maintenanceMode"
              checked={settings.website.maintenanceMode}
              onChange={(e) => handleSettingChange('website', 'maintenanceMode', e.target.checked)}
            />
            <label className="form-check-label fw-semibold" htmlFor="maintenanceMode">
              Maintenance Mode
            </label>
            <small className="form-text text-muted d-block">
              Enable this to put the website in maintenance mode
            </small>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="settings-section">
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label fw-semibold">Session Timeout (minutes)</label>
          <input
            type="number"
            className="form-control"
            value={settings.security.sessionTimeout}
            onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
            min="5"
            max="1440"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">Max Login Attempts</label>
          <input
            type="number"
            className="form-control"
            value={settings.security.maxLoginAttempts}
            onChange={(e) => handleSettingChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
            min="3"
            max="10"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">Lockout Duration (minutes)</label>
          <input
            type="number"
            className="form-control"
            value={settings.security.lockoutDuration}
            onChange={(e) => handleSettingChange('security', 'lockoutDuration', parseInt(e.target.value))}
            min="5"
            max="60"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">Minimum Password Length</label>
          <input
            type="number"
            className="form-control"
            value={settings.security.passwordMinLength}
            onChange={(e) => handleSettingChange('security', 'passwordMinLength', parseInt(e.target.value))}
            min="6"
            max="20"
          />
        </div>
        <div className="col-12">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="requireTwoFactor"
              checked={settings.security.requireTwoFactor}
              onChange={(e) => handleSettingChange('security', 'requireTwoFactor', e.target.checked)}
            />
            <label className="form-check-label fw-semibold" htmlFor="requireTwoFactor">
              Require Two-Factor Authentication
            </label>
          </div>
        </div>
        <div className="col-12">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="passwordComplexity"
              checked={settings.security.passwordComplexity}
              onChange={(e) => handleSettingChange('security', 'passwordComplexity', e.target.checked)}
            />
            <label className="form-check-label fw-semibold" htmlFor="passwordComplexity">
              Enforce Password Complexity
            </label>
          </div>
        </div>
        <div className="col-12">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="enableRecaptcha"
              checked={settings.security.enableRecaptcha}
              onChange={(e) => handleSettingChange('security', 'enableRecaptcha', e.target.checked)}
            />
            <label className="form-check-label fw-semibold" htmlFor="enableRecaptcha">
              Enable reCAPTCHA
            </label>
          </div>
        </div>
        {settings.security.enableRecaptcha && (
          <>
            <div className="col-md-6">
              <label className="form-label fw-semibold">reCAPTCHA Site Key</label>
              <input
                type="text"
                className="form-control"
                value={settings.security.recaptchaSiteKey}
                onChange={(e) => handleSettingChange('security', 'recaptchaSiteKey', e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">reCAPTCHA Secret Key</label>
              <input
                type="password"
                className="form-control"
                value={settings.security.recaptchaSecretKey}
                onChange={(e) => handleSettingChange('security', 'recaptchaSecretKey', e.target.value)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );

  const renderEmailSettings = () => (
    <div className="settings-section">
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label fw-semibold">SMTP Host</label>
          <input
            type="text"
            className="form-control"
            value={settings.email.smtpHost}
            onChange={(e) => handleSettingChange('email', 'smtpHost', e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">SMTP Port</label>
          <input
            type="number"
            className="form-control"
            value={settings.email.smtpPort}
            onChange={(e) => handleSettingChange('email', 'smtpPort', parseInt(e.target.value))}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">SMTP Username</label>
          <input
            type="text"
            className="form-control"
            value={settings.email.smtpUsername}
            onChange={(e) => handleSettingChange('email', 'smtpUsername', e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">SMTP Password</label>
          <input
            type="password"
            className="form-control"
            value={settings.email.smtpPassword}
            onChange={(e) => handleSettingChange('email', 'smtpPassword', e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">From Email</label>
          <input
            type="email"
            className="form-control"
            value={settings.email.fromEmail}
            onChange={(e) => handleSettingChange('email', 'fromEmail', e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">From Name</label>
          <input
            type="text"
            className="form-control"
            value={settings.email.fromName}
            onChange={(e) => handleSettingChange('email', 'fromName', e.target.value)}
          />
        </div>
        <div className="col-12">
          <button
            className="btn btn-outline-primary"
            onClick={handleTestEmail}
            aria-label="Test Email Settings"
            disabled={loading}
          >
            <i className="fas fa-paper-plane me-2"></i>
            Test Email Configuration
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="settings-section">
      <div className="row g-3">
        <div className="col-12">
          <h6 className="fw-semibold mb-3">Email Notifications</h6>
          <div className="form-check form-switch mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="emailNotifications"
              checked={settings.notifications.emailNotifications}
              onChange={(e) => handleSettingChange('notifications', 'emailNotifications', e.target.checked)}
            />
            <label className="form-check-label fw-semibold" htmlFor="emailNotifications">
              Enable Email Notifications
            </label>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="applicationAlerts"
              checked={settings.notifications.applicationAlerts}
              onChange={(e) => handleSettingChange('notifications', 'applicationAlerts', e.target.checked)}
            />
            <label className="form-check-label" htmlFor="applicationAlerts">
              New Application Alerts
            </label>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="contactAlerts"
              checked={settings.notifications.contactAlerts}
              onChange={(e) => handleSettingChange('notifications', 'contactAlerts', e.target.checked)}
            />
            <label className="form-check-label" htmlFor="contactAlerts">
              Contact Form Alerts
            </label>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="systemAlerts"
              checked={settings.notifications.systemAlerts}
              onChange={(e) => handleSettingChange('notifications', 'systemAlerts', e.target.checked)}
            />
            <label className="form-check-label" htmlFor="systemAlerts">
              System Alerts
            </label>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="weeklyReports"
              checked={settings.notifications.weeklyReports}
              onChange={(e) => handleSettingChange('notifications', 'weeklyReports', e.target.checked)}
            />
            <label className="form-check-label" htmlFor="weeklyReports">
              Weekly Reports
            </label>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="monthlyReports"
              checked={settings.notifications.monthlyReports}
              onChange={(e) => handleSettingChange('notifications', 'monthlyReports', e.target.checked)}
            />
            <label className="form-check-label" htmlFor="monthlyReports">
              Monthly Reports
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBackupSettings = () => (
    <div className="settings-section">
      <div className="row g-3">
        <div className="col-12">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="autoBackup"
              checked={settings.backup.autoBackup}
              onChange={(e) => handleSettingChange('backup', 'autoBackup', e.target.checked)}
            />
            <label className="form-check-label fw-semibold" htmlFor="autoBackup">
              Enable Automatic Backups
            </label>
          </div>
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">Backup Frequency</label>
          <select
            className="form-select"
            value={settings.backup.backupFrequency}
            onChange={(e) => handleSettingChange('backup', 'backupFrequency', e.target.value)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">Retention Period (days)</label>
          <input
            type="number"
            className="form-control"
            value={settings.backup.backupRetention}
            onChange={(e) => handleSettingChange('backup', 'backupRetention', parseInt(e.target.value))}
            min="7"
            max="365"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">Backup Location</label>
          <select
            className="form-select"
            value={settings.backup.backupLocation}
            onChange={(e) => handleSettingChange('backup', 'backupLocation', e.target.value)}
          >
            <option value="local">Local Storage</option>
            <option value="cloud">Cloud Storage</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">Cloud Provider</label>
          <select
            className="form-select"
            value={settings.backup.cloudProvider}
            onChange={(e) => handleSettingChange('backup', 'cloudProvider', e.target.value)}
            disabled={settings.backup.backupLocation !== 'cloud'}
          >
            <option value="aws">Amazon S3</option>
            <option value="gcp">Google Cloud Storage</option>
            <option value="azure">Azure Blob Storage</option>
          </select>
        </div>
        <div className="col-12">
          <button
            className="btn btn-primary"
            onClick={handleBackupNow}
            aria-label="Backup Now"
            disabled={loading}
          >
            <i className="fas fa-download me-2"></i>
            Create Backup Now
          </button>
        </div>
      </div>
    </div>
  );

  const renderAnalyticsSettings = () => (
    <div className="settings-section">
      <div className="row g-3">
        <div className="col-12">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="googleAnalytics"
              checked={settings.analytics.googleAnalytics}
              onChange={(e) => handleSettingChange('analytics', 'googleAnalytics', e.target.checked)}
            />
            <label className="form-check-label fw-semibold" htmlFor="googleAnalytics">
              Enable Google Analytics
            </label>
          </div>
        </div>
        {settings.analytics.googleAnalytics && (
          <div className="col-12">
            <label className="form-label fw-semibold">Google Analytics Tracking ID</label>
            <input
              type="text"
              className="form-control"
              value={settings.analytics.gaTrackingId}
              onChange={(e) => handleSettingChange('analytics', 'gaTrackingId', e.target.value)}
              placeholder="GA-XXXXXXXXX-X"
            />
          </div>
        )}
        <div className="col-md-6">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="enableHeatmaps"
              checked={settings.analytics.enableHeatmaps}
              onChange={(e) => handleSettingChange('analytics', 'enableHeatmaps', e.target.checked)}
            />
            <label className="form-check-label" htmlFor="enableHeatmaps">
              Enable Heatmaps
            </label>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="enableUserTracking"
              checked={settings.analytics.enableUserTracking}
              onChange={(e) => handleSettingChange('analytics', 'enableUserTracking', e.target.checked)}
            />
            <label className="form-check-label" htmlFor="enableUserTracking">
              Enable User Tracking
            </label>
          </div>
        </div>
        <div className="col-12">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="privacyCompliant"
              checked={settings.analytics.privacyCompliant}
              onChange={(e) => handleSettingChange('analytics', 'privacyCompliant', e.target.checked)}
            />
            <label className="form-check-label" htmlFor="privacyCompliant">
              Privacy Compliant Tracking
            </label>
            <small className="form-text text-muted d-block">
              Ensures compliance with GDPR and other privacy regulations
            </small>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'website':
        return renderWebsiteSettings();
      case 'security':
        return renderSecuritySettings();
      case 'email':
        return renderEmailSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'backup':
        return renderBackupSettings();
      case 'analytics':
        return renderAnalyticsSettings();
      default:
        return renderWebsiteSettings();
    }
  };

  return (
    <div className="admin-settings-page" style={{background: 'linear-gradient(135deg, #12c2e9 0%, #00bcd4 100%)', minHeight: '100vh'}}>
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
                <h4 className="mb-0 fw-bold text-dark">System Settings</h4>
                <small className="text-muted">Configure all system and website settings</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Message Alert */}
      {message.text && (
        <div className={`alert alert-${message.type === 'error' ? 'danger' : message.type} alert-dismissible fade show mb-4`}>
          <i className={`fas fa-${message.type === 'success' ? 'check-circle' : 'exclamation-triangle'} me-2`}></i>
          {message.text}
          <button type="button" className="btn-close" onClick={() => setMessage({ type: '', text: '' })} aria-label="Close Message"></button>
        </div>
      )}

      <div className="card glass-card border-0 shadow-sm">
        <div className="card-body p-0">
          {/* Tabs */}
          <div className="settings-tabs">
            <ul className="nav nav-tabs nav-fill" role="tablist">
              {tabs.map(tab => (
                <li className="nav-item" key={tab.id}>
                  <button
                    className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                    type="button"
                  >
                    <i className={`${tab.icon} me-2`}></i>
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Tab Content */}
          <div className="tab-content p-4">
            {renderTabContent()}
            
            {/* Save Button */}
            <div className="mt-4 pt-3 border-top">
              <button
                className="btn btn-primary"
                onClick={() => handleSaveSettings(activeTab)}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Saving...
                  </>
                ) : (
                  <>
                    <i className="fas fa-save me-2"></i>
                    Save {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Settings
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .admin-settings {
          font-family: 'Segoe UI', Arial, sans-serif;
        }
        
        .glass-card {
          background: rgba(255,255,255,0.95) !important;
          backdrop-filter: blur(10px);
          border-radius: 16px;
        }
        
        .settings-tabs .nav-tabs {
          border-bottom: 1px solid #e9ecef;
          background: rgba(248,249,250,0.8);
        }
        
        .settings-tabs .nav-link {
          border: none;
          border-radius: 0;
          color: #6c757d;
          font-weight: 500;
          padding: 1rem 1.5rem;
          transition: all 0.2s ease;
        }
        
        .settings-tabs .nav-link:hover {
          background: rgba(102, 126, 234, 0.1);
          color: #667eea;
        }
        
        .settings-tabs .nav-link.active {
          background: #667eea;
          color: white;
          border-bottom: 3px solid #667eea;
        }
        
        .settings-section {
          min-height: 400px;
        }
        
        .form-label {
          color: #495057;
        }
        
        .form-control:focus,
        .form-select:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
        }
        
        .form-check-input:checked {
          background-color: #667eea;
          border-color: #667eea;
        }
        
        @media (max-width: 768px) {
          .settings-tabs .nav-tabs {
            flex-wrap: wrap;
          }
          
          .settings-tabs .nav-link {
            padding: 0.75rem 1rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminSettings; 