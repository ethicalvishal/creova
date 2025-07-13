import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getApiUrl, API_CONFIG } from '../config/api';

const AdminLogin = () => {
  const [loginStep, setLoginStep] = useState(1); // 1: Credentials, 2: 2FA, 3: Biometric
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    twoFactorCode: '',
    biometricData: '',
    biometricType: 'fingerprint' // fingerprint, face, eye
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [biometricProgress, setBiometricProgress] = useState(0);
  const [demo2FACode, setDemo2FACode] = useState('');
  const navigate = useNavigate();

  // Test backend connection
  const testBackendConnection = async () => {
    try {
      const response = await fetch(getApiUrl('/api/health'));
      if (response.ok) {
        console.log('Backend connection successful');
        return true;
      } else {
        console.error('Backend health check failed');
        return false;
      }
    } catch (error) {
      console.error('Backend connection test failed:', error);
      return false;
    }
  };

  // Check for lockout and test backend connection
  useEffect(() => {
    const lockoutEnd = localStorage.getItem('adminLockoutEnd');
    if (lockoutEnd && Date.now() < parseInt(lockoutEnd)) {
      setLockoutTime(Math.ceil((parseInt(lockoutEnd) - Date.now()) / 1000));
    }
    
    // Test backend connection on component mount
    testBackendConnection();
  }, []);

  // Auto-start biometric simulation when reaching step 3
  useEffect(() => {
    if (loginStep === 3 && biometricProgress === 0) {
      simulateBiometricAuth(formData.biometricType);
    }
  }, [loginStep, biometricProgress, formData.biometricType]);

  // Countdown for lockout
  useEffect(() => {
    if (lockoutTime > 0) {
      const timer = setTimeout(() => setLockoutTime(lockoutTime - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [lockoutTime]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const generateTwoFactorCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const simulateBiometricAuth = (type = 'fingerprint') => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20;
        setBiometricProgress(Math.min(progress, 100));
        
        if (progress >= 100) {
          clearInterval(interval);
          // Update form data with biometric data when complete
          setFormData(prev => ({
            ...prev,
            biometricData: `simulated_${type}_data_complete`,
            biometricType: type
          }));
          setTimeout(() => resolve(true), 500);
        }
      }, 100);
    });
  };

  const handleStep1Submit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Check lockout
    if (lockoutTime > 0) {
      setError(`Account temporarily locked. Please wait ${lockoutTime} seconds.`);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.ADMIN.VERIFY_CREDENTIALS), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Credentials verified! Proceeding to 2FA...');
        setLoginStep(2);
        // Always generate a new 2FA code for demo
        const twoFactorCode = generateTwoFactorCode();
        setDemo2FACode(twoFactorCode);
        setFormData(prev => ({ ...prev, twoFactorCode: '' }));
      } else {
        setLoginAttempts(prev => prev + 1);
        if (loginAttempts >= 2) {
          const lockoutDuration = 300; // 5 minutes
          const lockoutEnd = Date.now() + (lockoutDuration * 1000);
          localStorage.setItem('adminLockoutEnd', lockoutEnd.toString());
          setLockoutTime(lockoutDuration);
          setError('Too many failed attempts. Account locked for 5 minutes.');
        } else {
          setError(data.message || 'Invalid credentials. Please try again.');
        }
      }
    } catch (error) {
      console.error('Step 1 Network error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStep2Submit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.ADMIN.VERIFY_2FA), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          twoFactorCode: formData.twoFactorCode
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('2FA verified! Proceeding to biometric authentication...');
        setLoginStep(3);
        setBiometricProgress(0); // Reset progress for new session
      } else {
        setError(data.message || 'Invalid 2FA code. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStep3Submit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Simulate biometric authentication
      await simulateBiometricAuth(formData.biometricType);
      
      const requestBody = {
        username: formData.username,
        biometricData: formData.biometricData,
        biometricType: formData.biometricType
      };
      
      console.log('Sending final auth request:', requestBody);
      
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.ADMIN.FINAL_AUTH), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();
      console.log('Final auth response:', data);

      if (response.ok) {
        localStorage.setItem('adminToken', data.adminToken);
        localStorage.setItem('adminUser', JSON.stringify(data.adminUser));
        localStorage.removeItem('adminLockoutEnd');
        setSuccess('Authentication successful! Redirecting to dashboard...');
        setTimeout(() => navigate('/admin'), 1000);
      } else {
        console.error('Final auth failed:', data);
        setError(data.message || 'Biometric verification failed. Please try again.');
      }
    } catch (error) {
      console.error('Step 3 Network error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep1 = () => (
    <form onSubmit={handleStep1Submit}>
      <div className="mb-4">
        <label className="form-label fw-semibold">
          <i className="fas fa-user-shield me-2"></i>
          Admin Username
        </label>
        <input
          type="text"
          className="form-control form-control-lg"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter admin username"
          required
          disabled={lockoutTime > 0}
        />
      </div>
      
      <div className="mb-4">
        <label className="form-label fw-semibold">
          <i className="fas fa-lock me-2"></i>
          Admin Password
        </label>
        <div className="input-group">
          <input
            type={showPassword ? "text" : "password"}
            className="form-control form-control-lg"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter admin password"
            required
            disabled={lockoutTime > 0}
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide Password" : "Show Password"}
            disabled={lockoutTime > 0}
          >
            <i className={`fas fa-${showPassword ? 'eye-slash' : 'eye'}`}></i>
          </button>
        </div>
      </div>
      
      <button 
        type="submit" 
        className="btn btn-primary btn-lg w-100 mb-3"
        aria-label="Login to Admin Dashboard"
        disabled={isSubmitting || lockoutTime > 0}
      >
        {isSubmitting ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Verifying...
          </>
        ) : (
          <>
            <i className="fas fa-shield-alt me-2"></i>
            Verify Credentials
          </>
        )}
      </button>
    </form>
  );

  const renderStep2 = () => (
    <form onSubmit={handleStep2Submit}>
      <div className="mb-4">
        <label className="form-label fw-semibold">
          <i className="fas fa-mobile-alt me-2"></i>
          Two-Factor Authentication Code
        </label>
        <input
          type="text"
          className="form-control form-control-lg text-center"
          name="twoFactorCode"
          value={formData.twoFactorCode}
          onChange={handleChange}
          placeholder="Enter 6-digit code"
          maxLength="6"
          required
        />
        <small className="text-muted">
          <i className="fas fa-info-circle me-1"></i>
          Check your registered device for the 6-digit code
        </small>
        {demo2FACode && (
          <div className="alert alert-info mt-2 py-2 px-3" style={{fontSize: '0.98rem'}}>
            <i className="fas fa-key me-2"></i>
            <b>Demo 2FA Code:</b> {demo2FACode}
          </div>
        )}
      </div>
      
      <button 
        type="submit" 
        className="btn btn-success btn-lg w-100 mb-3"
        aria-label="Verify Two-Factor Code"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Verifying 2FA...
          </>
        ) : (
          <>
            <i className="fas fa-check-circle me-2"></i>
            Verify 2FA Code
          </>
        )}
      </button>
      
      <button 
        type="button" 
        className="btn btn-outline-secondary w-100"
        onClick={() => setLoginStep(1)}
        aria-label="Back to Login"
      >
        <i className="fas fa-arrow-left me-2"></i>
        Back to Credentials
      </button>
    </form>
  );

  const renderStep3 = () => (
    <form onSubmit={handleStep3Submit}>
      <div className="mb-4">
        <label className="form-label fw-semibold">
          <i className="fas fa-shield-alt me-2"></i>
          Biometric Authentication
        </label>
        
        {/* Biometric Type Selection */}
        {biometricProgress === 0 && (
          <div className="mb-4">
            <label className="form-label fw-semibold">
              <i className="fas fa-cog me-2"></i>
              Select Biometric Method
            </label>
            <div className="row g-3">
              <div className="col-4">
                <div 
                  className={`biometric-option text-center p-3 rounded border ${formData.biometricType === 'fingerprint' ? 'border-primary bg-primary text-white' : 'border-secondary'}`}
                  style={{cursor: 'pointer', transition: 'all 0.3s ease'}}
                  onClick={() => setFormData(prev => ({...prev, biometricType: 'fingerprint'}))}
                  aria-label="Select Fingerprint Authentication"
                >
                  <i className="fas fa-fingerprint fa-2x mb-2"></i>
                  <div className="small">Fingerprint</div>
                </div>
              </div>
              <div className="col-4">
                <div 
                  className={`biometric-option text-center p-3 rounded border ${formData.biometricType === 'face' ? 'border-primary bg-primary text-white' : 'border-secondary'}`}
                  style={{cursor: 'pointer', transition: 'all 0.3s ease'}}
                  onClick={() => setFormData(prev => ({...prev, biometricType: 'face'}))}
                  aria-label="Select Face Recognition Authentication"
                >
                  <i className="fas fa-user-circle fa-2x mb-2"></i>
                  <div className="small">Face Recognition</div>
                </div>
              </div>
              <div className="col-4">
                <div 
                  className={`biometric-option text-center p-3 rounded border ${formData.biometricType === 'eye' ? 'border-primary bg-primary text-white' : 'border-secondary'}`}
                  style={{cursor: 'pointer', transition: 'all 0.3s ease'}}
                  onClick={() => setFormData(prev => ({...prev, biometricType: 'eye'}))}
                  aria-label="Select Eye Recognition Authentication"
                >
                  <i className="fas fa-eye fa-2x mb-2"></i>
                  <div className="small">Eye Scan</div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="text-center mb-3">
          <div className="biometric-simulator">
            <div className="biometric-icon">
              {formData.biometricType === 'fingerprint' && (
                <i className="fas fa-fingerprint fa-3x text-primary"></i>
              )}
              {formData.biometricType === 'face' && (
                <i className="fas fa-user-circle fa-3x text-primary"></i>
              )}
              {formData.biometricType === 'eye' && (
                <i className="fas fa-eye fa-3x text-primary"></i>
              )}
            </div>
            <div className="progress mt-3" style={{height: '8px'}}>
              <div 
                className="progress-bar bg-primary" 
                style={{width: `${biometricProgress}%`}}
              ></div>
            </div>
            <small className="text-muted mt-2 d-block">
              {biometricProgress < 100 ? 
                `Scanning ${formData.biometricType === 'fingerprint' ? 'fingerprint' : formData.biometricType === 'face' ? 'face' : 'eye'}...` : 
                'Verification complete!'
              }
            </small>
            {biometricProgress === 0 && (
              <button 
                type="button" 
                className="btn btn-outline-primary btn-sm mt-2"
                onClick={() => simulateBiometricAuth(formData.biometricType)}
                aria-label={`Test ${formData.biometricType} Authentication`}
              >
                <i className="fas fa-play me-2"></i>
                Start {formData.biometricType === 'fingerprint' ? 'Fingerprint' : formData.biometricType === 'face' ? 'Face' : 'Eye'} Scan
              </button>
            )}
          </div>
        </div>
        <input
          type="hidden"
          name="biometricData"
          value="simulated_biometric_data"
        />
      </div>
      
      <button 
        type="submit" 
        className="btn btn-warning btn-lg w-100 mb-3"
        aria-label="Complete Biometric Authentication"
        disabled={isSubmitting || biometricProgress < 100}
      >
        {isSubmitting ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Finalizing Authentication...
          </>
        ) : biometricProgress < 100 ? (
          <>
            <i className="fas fa-clock me-2"></i>
            Waiting for Biometric Scan...
          </>
        ) : (
          <>
            <i className="fas fa-shield-check me-2"></i>
            Complete Authentication
          </>
        )}
      </button>
      
      <button 
        type="button" 
        className="btn btn-outline-secondary w-100"
        onClick={() => {
          setLoginStep(2);
          setBiometricProgress(0);
        }}
        aria-label="Back to Previous Step"
      >
        <i className="fas fa-arrow-left me-2"></i>
        Back to 2FA
      </button>
    </form>
  );

  return (
    <div className="admin-login-page" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5 col-xl-4">
            <div className="card border-0 shadow-lg" style={{
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px'
            }}>
              <div className="card-body p-5">
                {/* Header */}
                <div className="text-center mb-4">
                  <div className="admin-logo mb-3">
                    <div className="creova-logo-svg" style={{
                      width: 60, 
                      height: 60, 
                      margin: '0 auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <svg width="56" height="56" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="admin-circle-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#667eea" />
                            <stop offset="1" stopColor="#764ba2" />
                          </linearGradient>
                        </defs>
                        <circle cx="20" cy="20" r="18" fill="url(#admin-circle-gradient)" />
                        <text x="50%" y="56%" textAnchor="middle" dominantBaseline="middle" fontFamily="Segoe UI, Arial, sans-serif" fontWeight="bold" fontSize="18" fill="#fff">A</text>
                      </svg>
                    </div>
                  </div>
                  <h2 className="fw-bold text-dark mb-2">Admin Portal</h2>
                  <p className="text-muted mb-0">
                    {loginStep === 1 && 'Secure administrative access'}
                    {loginStep === 2 && 'Two-factor authentication required'}
                    {loginStep === 3 && `Biometric verification required (${formData.biometricType})`}
                  </p>
                  
                  {/* Progress Steps */}
                  <div className="progress-steps mt-4">
                    <div className="d-flex justify-content-center">
                      {[1, 2, 3].map(step => (
                        <div key={step} className="d-flex align-items-center">
                          <div className={`step-circle ${step <= loginStep ? 'active' : ''}`}>
                            {step < loginStep ? (
                              <i className="fas fa-check text-white"></i>
                            ) : (
                              <span>{step}</span>
                            )}
                          </div>
                          {step < 3 && (
                            <div className={`step-line ${step < loginStep ? 'active' : ''}`}></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Alerts */}
                {error && (
                  <div className="alert alert-danger border-0 mb-3" style={{ borderRadius: '12px', fontSize: '1.05rem', color: 'black !important' }}>
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    {error}
                  </div>
                )}
                
                {success && (
                  <div className="alert alert-success" role="alert">
                    <i className="fas fa-check-circle me-2"></i>
                    {success}
                  </div>
                )}
                
                {/* Lockout Message */}
                {lockoutTime > 0 && (
                  <div className="alert alert-warning" role="alert">
                    <i className="fas fa-clock me-2"></i>
                    Account locked. Please wait {lockoutTime} seconds before trying again.
                  </div>
                )}
                
                {/* Form Steps */}
                {loginStep === 1 && renderStep1()}
                {loginStep === 2 && renderStep2()}
                {loginStep === 3 && renderStep3()}
                {/* Forgot Password Link */}
                {loginStep === 1 && (
                  <div className="text-center mt-3">
                    <Link to="/admin/forgot-password" className="text-decoration-none" aria-label="Forgot Password">
                      <i className="fas fa-unlock-alt me-2"></i>
                      Forgot Password?
                    </Link>
                  </div>
                )}
                {/* Footer */}
                <hr className="my-4" />
                <div className="text-center">
                  <Link to="/" className="text-decoration-none text-muted" aria-label="Back to Homepage">
                    <i className="fas fa-arrow-left me-2"></i>
                    Back to Website
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .admin-login-page {
          font-family: 'Segoe UI', Arial, sans-serif;
        }
        
        .step-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #e9ecef;
          color: #6c757d;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 14px;
          transition: all 0.3s ease;
        }
        
        .step-circle.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        
        .step-line {
          width: 60px;
          height: 2px;
          background: #e9ecef;
          margin: 0 10px;
          transition: all 0.3s ease;
        }
        
        .step-line.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .biometric-simulator {
          padding: 20px;
          border: 2px dashed #dee2e6;
          border-radius: 15px;
          background: rgba(102, 126, 234, 0.05);
        }
        
        .biometric-icon {
          animation: pulse 2s infinite;
        }
        
        .biometric-option:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .biometric-option.border-primary {
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        .form-control:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
        }
        
        .btn-primary:hover {
          background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
        }
      `}</style>
    </div>
  );
};

export default AdminLogin; 