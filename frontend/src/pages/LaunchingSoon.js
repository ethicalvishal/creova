import React, { useState } from 'react';
import LaunchCountdown from '../components/LaunchCountdown';

const LaunchingSoon = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setMessage("Thank you! We'll notify you when we launch.");
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="launching-soon-page" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e3f0fc 0%, #f8fbff 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated SVG Gradient Background */}
      <div className="launching-soon-bg-animated" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}>
        {/* Lighter, softer animated gradient */}
        <div style={{
          position: 'absolute',
          width: '100vw',
          height: '100vh',
          background: 'linear-gradient(120deg, #e3f0fc, #90caf9 40%, #b2f7ef 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradientMove 18s ease-in-out infinite',
          opacity: 0.75,
          zIndex: 1
        }} />
        {/* Creova logo watermark animation - white with shadow, higher opacity */}
        <div style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: 320,
          height: 100,
          opacity: 0.28,
          zIndex: 3,
          animation: 'logoMove 14s ease-in-out infinite alternate',
        }}>
          <svg width="100%" height="100%" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logoVibrantGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00796b" />
                <stop offset="50%" stopColor="#0d47a1" />
                <stop offset="100%" stopColor="#6a1b9a" />
              </linearGradient>
              <filter id="logoShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.18"/>
              </filter>
            </defs>
            <g filter="url(#logoShadow)">
              <path d="M15 15 C15 10, 20 5, 25 5 L35 5 C40 5, 45 10, 45 15 L45 20 C45 25, 40 30, 35 30 L25 30 C20 30, 15 25, 15 20 Z" fill="url(#logoVibrantGradient)" stroke="url(#logoVibrantGradient)" strokeWidth="2"/>
              <path d="M50 5 L60 5 C65 5, 70 10, 70 15 L70 20 C70 25, 65 30, 60 30 L50 30 L50 40 L55 40" fill="none" stroke="url(#logoVibrantGradient)" strokeWidth="3" strokeLinecap="round"/>
              <path d="M75 5 L95 5 M75 5 L75 40 L95 40 M75 17.5 L90 17.5" fill="none" stroke="url(#logoVibrantGradient)" strokeWidth="3" strokeLinecap="round"/>
              <ellipse cx="110" cy="22.5" rx="10" ry="12.5" fill="none" stroke="url(#logoVibrantGradient)" strokeWidth="3"/>
              <path d="M125 5 L135 30 L145 5" fill="none" stroke="url(#logoVibrantGradient)" strokeWidth="3" strokeLinecap="round"/>
              <path d="M150 40 L160 5 L170 40 M155 25 L165 25" fill="none" stroke="url(#logoVibrantGradient)" strokeWidth="3" strokeLinecap="round"/>
              <text x="100" y="50" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8" fill="url(#logoVibrantGradient)" fontWeight="bold">TECHNOLOGIES</text>
            </g>
          </svg>
        </div>
        {/* Creova-inspired animated SVG wave and pulse */}
        <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="none" style={{position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 2}}>
          <defs>
            <linearGradient id="creova-wave" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#43cea2" />
              <stop offset="50%" stopColor="#1976d2" />
              <stop offset="100%" stopColor="#12c2e9" />
            </linearGradient>
          </defs>
          <path d="M0,900 Q480,1000 960,900 T1920,900 L1920,1080 L0,1080 Z" fill="url(#creova-wave)" opacity="0.18">
            <animate attributeName="d" dur="12s" repeatCount="indefinite"
              values="M0,900 Q480,1000 960,900 T1920,900 L1920,1080 L0,1080 Z;
                      M0,920 Q480,980 960,980 T1920,920 L1920,1080 L0,1080 Z;
                      M0,880 Q480,1050 960,880 T1920,880 L1920,1080 L0,1080 Z;
                      M0,900 Q480,1000 960,900 T1920,900 L1920,1080 L0,1080 Z" />
          </path>
          <circle cx="960" cy="540" r="120" fill="#43cea2" opacity="0.10">
            <animate attributeName="r" values="120;180;120" dur="6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.10;0.18;0.10" dur="6s" repeatCount="indefinite" />
          </circle>
          <circle cx="960" cy="540" r="60" fill="#1976d2" opacity="0.13">
            <animate attributeName="r" values="60;90;60" dur="6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.13;0.22;0.13" dur="6s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
      {/* Subtle background pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 80%, rgba(67,206,162,0.03) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(25,118,210,0.03) 0%, transparent 50%)',
        pointerEvents: 'none',
        zIndex: 0
      }}></div>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-lg-10 text-center">
            <div className="row justify-content-center align-items-center">
              {/* Countdown card on the left */}
              <div className="col-md-5 mb-4 mb-md-0">
                <LaunchCountdown />
              </div>
              {/* Main card on the right */}
              <div className="col-md-7">
                <div className="card border-0 shadow-lg p-5" style={{
                  borderRadius: 32,
                  background: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(14px)',
                  boxShadow: '0 16px 48px 0 rgba(25,118,210,0.15)',
                  border: '2.5px solid rgba(25,118,210,0.10)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {/* Gradient icon and heading */}
                  <div className="mb-4" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 18
                  }}>
                    <div style={{
                      background: 'linear-gradient(135deg, #43cea2 0%, #1976d2 100%)',
                      borderRadius: '50%',
                      width: 64,
                      height: 64,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 0 32px 8px #43cea255, 0 4px 18px 0 rgba(25,118,210,0.10)',
                      border: '2.5px solid rgba(25,118,210,0.10)',
                      fontSize: 32,
                      color: '#1976d2',
                      animation: 'glowRocket 2s infinite alternate'
                    }}>
                      🚀
                    </div>
                    <h1 className="mb-0" style={{
                      fontWeight: 900,
                      fontSize: '2.5rem',
                      background: 'linear-gradient(135deg, #1976d2 0%, #43cea2 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      color: 'transparent',
                      margin: 0,
                      letterSpacing: '-1px',
                      textShadow: '0 2px 12px #43cea233'
                    }}>Launching Soon</h1>
                  </div>
                  {/* Animated accent divider */}
                  <div style={{
                    width: 100,
                    height: 7,
                    margin: '0 auto 28px auto',
                    background: 'linear-gradient(90deg, #1976d2 0%, #43cea2 100%)',
                    borderRadius: 10,
                    opacity: 0.22,
                    animation: 'pulseAccent 1.5s infinite alternate, moveAccent 3s linear infinite'
                  }}></div>
                  <h3 className="text-muted mb-4" style={{fontWeight: 700, fontSize: '1.35rem'}}>Something Amazing is in the Works</h3>
                  <p className="text-muted mb-4" style={{fontSize: '1.08rem', fontWeight: 500}}>
                    We're working hard to bring you an incredible experience. Be the first to know when we launch by signing up for early access.
                  </p>
                  {message ? (
                    <div className="alert alert-success" role="alert" style={{fontWeight: 600, fontSize: '1.08rem', borderRadius: 12}}>
                      {message}
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="mb-4">
                      <div className="input-group" style={{borderRadius: 14, overflow: 'hidden', boxShadow: '0 4px 18px 0 rgba(67,206,162,0.08)'}}>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          style={{
                            border: 'none',
                            fontSize: '1.08rem',
                            padding: '16px 18px',
                            background: 'rgba(255,255,255,0.95)',
                            outline: 'none',
                            boxShadow: 'none'
                          }}
                        />
                        <button 
                          type="submit" 
                          className="btn btn-primary"
                          disabled={isSubmitting}
                          style={{
                            fontWeight: 700,
                            fontSize: '1.08rem',
                            padding: '0 28px',
                            borderRadius: 0,
                            background: 'linear-gradient(135deg, #43cea2 0%, #1976d2 100%)',
                            border: 'none',
                            boxShadow: '0 4px 16px 0 rgba(67,206,162,0.13)',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            minWidth: 120
                          }}
                        >
                          {isSubmitting ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Submitting...
                            </>
                          ) : (
                            'Notify Me'
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                  <div className="text-muted mt-2" style={{fontSize: '0.98rem'}}>
                    <small>We respect your privacy. No spam, ever.</small>
                  </div>
                </div>
                {/* Animated gradient border overlay for card */}
                <div style={{
                  position: 'absolute',
                  top: -4, left: -4, right: -4, bottom: -4,
                  zIndex: 1,
                  borderRadius: 36,
                  pointerEvents: 'none',
                  background: 'conic-gradient(from 90deg at 50% 50%, #43cea2, #1976d2, #43cea2 100%)',
                  filter: 'blur(6px)',
                  opacity: 0.18,
                  animation: 'rotateBorder 8s linear infinite'
                }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Accent and float animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
          100% { transform: translateY(0); }
        }
        @keyframes pulseAccent {
          0% { opacity: 0.18; }
          100% { opacity: 0.38; }
        }
        @keyframes moveAccent {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        @keyframes glowRocket {
          0% { box-shadow: 0 0 32px 8px #43cea255, 0 4px 18px 0 rgba(25,118,210,0.10); }
          100% { box-shadow: 0 0 48px 16px #43cea299, 0 4px 18px 0 rgba(25,118,210,0.18); }
        }
        @keyframes rotateBorder {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes logoMove {
          0% { left: 0; bottom: 0; }
          50% { left: calc(100vw - 320px); bottom: calc(100vh - 100px); }
          100% { left: 0; bottom: 0; }
        }
      `}</style>
    </div>
  );
};

export default LaunchingSoon; 