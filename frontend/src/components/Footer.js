import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer mt-auto pt-5 pb-3" style={{
      background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
      borderTop: '1.5px solid rgba(255,255,255,0.1)',
      boxShadow: '0 -8px 32px rgba(0,0,0,0.1)',
      fontFamily: 'Segoe UI, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 80%, rgba(25, 118, 210, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(64, 169, 255, 0.1) 0%, transparent 50%)',
        pointerEvents: 'none'
      }}></div>
      
      <div className="container" style={{position: 'relative', zIndex: 1}}>
        <div className="row gy-5 gx-4 align-items-start">
          <div className="col-md-4">
            <div className="d-flex align-items-center mb-2">
              <span className="creova-logo-svg me-2" style={{width: 36, height: 36, display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}>
                <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="footer-circle-c-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#1976d2" />
                      <stop offset="1" stopColor="#40a9ff" />
                    </linearGradient>
                  </defs>
                  <circle cx="20" cy="20" r="18" fill="url(#footer-circle-c-gradient)" />
                  <text x="50%" y="56%" textAnchor="middle" dominantBaseline="middle" fontFamily="Segoe UI, Arial, sans-serif" fontWeight="bold" fontSize="18" fill="#fff">C</text>
                </svg>
              </span>
              <span className="fw-bold" style={{fontSize: '1.15rem', letterSpacing: '-0.5px', color: '#fff'}}>Creova</span>
            </div>
            <div className="mb-2" style={{maxWidth: 320, color: 'rgba(255,255,255,0.8)', fontSize: '0.98rem', fontWeight: 500}}>
              Empowering businesses with modern IT solutions and digital transformation services.
            </div>
            <div className="d-flex gap-3 mt-3">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social" title="LinkedIn" style={{fontSize: 22}}><i className="fab fa-linkedin"></i></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social" title="Twitter" style={{fontSize: 22}}><i className="fab fa-twitter"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social footer-instagram" title="Instagram" style={{fontSize: 22}}><i className="fab fa-instagram"></i></a>
              <a href="mailto:info@creova.com" className="footer-social" title="Email" style={{fontSize: 22}}><i className="fas fa-envelope"></i></a>
            </div>
          </div>
          <div className="col-md-2">
            <h6 className="fw-bold mb-3" style={{color: '#fff'}}>Company</h6>
            <ul className="list-unstyled">
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/careers" className="footer-link">Careers</Link></li>
              <li><Link to="/blog" className="footer-link">Blog</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>
          <div className="col-md-2">
            <h6 className="fw-bold mb-3" style={{color: '#fff'}}>Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link to="/services" className="footer-link">Services</Link></li>
              <li><Link to="/products" className="footer-link">Products</Link></li>
              <li><Link to="/privacy-policy" className="footer-link">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="footer-link">Terms of Service</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h6 className="fw-bold mb-3" style={{color: '#fff'}}>Contact</h6>
            <ul className="list-unstyled mb-2" style={{fontSize: '1rem', color: 'rgba(255,255,255,0.8)'}}>
              <li><i className="fas fa-map-marker-alt me-2 footer-contact-icon"></i> 123 Corporate Park, Patna, Bihar</li>
              <li><i className="fas fa-envelope me-2 footer-contact-icon"></i> info@creova.com</li>
              <li><i className="fas fa-phone me-2 footer-contact-icon"></i> +91 98765 43210</li>
            </ul>
            <div className="mt-2">
              <Link to="/contact" className="btn btn-outline-light btn-sm">Get in Touch</Link>
            </div>
          </div>
        </div>
        <div className="footer-divider my-4"></div>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <div className="small" style={{color: 'rgba(255,255,255,0.7)', fontWeight: 500}}>&copy; 2025 Creova Technologies. All rights reserved.</div>
          <button
            className="footer-back-to-top"
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
            title="Back to Top"
          >
            <i className="fas fa-arrow-up me-1"></i> Back to Top
          </button>
        </div>
      </div>
      <style>{`
        .footer-link { 
          color: rgba(255,255,255,0.8); 
          text-decoration: none; 
          transition: color 0.18s; 
          font-weight: 500; 
        }
        .footer-link:hover { 
          color: #40a9ff; 
          text-decoration: underline; 
        }
        .footer-social { 
          color: rgba(255,255,255,0.7); 
          transition: color 0.18s, transform 0.18s; 
        }
        .footer-social:hover { 
          color: #40a9ff !important; 
          transform: translateY(-2px);
        }
        .footer-instagram:hover { 
          color: #e1306c !important; 
        }
        .footer-contact-icon { 
          color: #40a9ff; 
          opacity: 0.9; 
        }
        .footer-divider { 
          height: 2px; 
          background: linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(64, 169, 255, 0.3) 50%, rgba(255,255,255,0.1) 100%); 
          border: none; 
        }
        .footer-back-to-top {
          background: linear-gradient(135deg, #1976d2 0%, #40a9ff 100%);
          color: #fff;
          border: none;
          border-radius: 24px;
          font-weight: 600;
          font-size: 0.98rem;
          padding: 0.5rem 1.4rem;
          box-shadow: 0 4px 16px rgba(25, 118, 210, 0.3);
          transition: all 0.18s;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .footer-back-to-top:hover {
          background: linear-gradient(135deg, #125ea9 0%, #1976d2 100%);
          color: #fff;
          box-shadow: 0 6px 20px rgba(25, 118, 210, 0.4);
          transform: translateY(-2px) scale(1.04);
        }
        @media (max-width: 767px) {
          .footer .row > div {
            margin-bottom: 2rem;
          }
          .footer {
            padding-left: 0.5rem;
            padding-right: 0.5rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer; 