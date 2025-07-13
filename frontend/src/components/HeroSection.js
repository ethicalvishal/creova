import React from 'react';
import PropTypes from 'prop-types';

// Example usage:
// <HeroSection title="About Creova Technologies" subtitle="We're a technology company..." buttons={[{label: 'Get in Touch', href: '/contact', primary: true}]} backgroundType="animated" />

const HeroSection = ({
  title,
  subtitle,
  buttons = [],
  backgroundType = 'animated', // 'animated' | 'gradient' | 'color'
  backgroundColor = '#f8fafc',
  minHeight = '100vh',
  children
}) => {
  return (
    <section
      className="hero-section position-relative"
      style={{
        zIndex: 1,
        minHeight,
        display: 'flex',
        alignItems: 'center',
        background: backgroundType === 'color' ? backgroundColor : 'rgba(255,255,255,0.85)',
        overflow: 'hidden',
      }}
    >
      {/* Animated SVG/Gradient Background */}
      {backgroundType === 'animated' && (
        <div style={{position: 'absolute', top: 0, left: 0, width: '100vw', height: '100%', zIndex: 0, pointerEvents: 'none'}}>
          {/* Home-style gradient background */}
          <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(120deg, #e0f7fa 0%, #f8fafc 100%)', zIndex: 0}} />
          <svg width="100%" height="100%" viewBox="0 0 1440 900" style={{position: 'relative', zIndex: 1}}>
            <defs>
              <radialGradient id="creovaBgHero" cx="50%" cy="50%" r="80%">
                <stop offset="0%" stopColor="#1976d2" stopOpacity="0.13" />
                <stop offset="100%" stopColor="#40a9ff" stopOpacity="0.07" />
              </radialGradient>
              <linearGradient id="cLogoGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1976d2" />
                <stop offset="100%" stopColor="#40a9ff" />
              </linearGradient>
            </defs>
            {/* Soft floating C shapes */}
            <g>
              <circle cx="400" cy="200" r="120" fill="url(#creovaBgHero)">
                <animate attributeName="cy" values="200;250;200" dur="6s" repeatCount="indefinite" />
              </circle>
              <circle cx="1100" cy="600" r="90" fill="url(#creovaBgHero)">
                <animate attributeName="cy" values="600;650;600" dur="7s" repeatCount="indefinite" />
              </circle>
              <circle cx="800" cy="400" r="60" fill="url(#creovaBgHero)">
                <animate attributeName="cy" values="400;420;400" dur="5s" repeatCount="indefinite" />
              </circle>
            </g>
            {/* Floating Creova SVG logos */}
            <g opacity="0.13">
              {/* Large floating logo */}
              <g>
                <g transform="translate(120,180)">
                  <g>
                    <circle cx="90" cy="90" r="80" fill="url(#cLogoGradient)" />
                    <text x="90" y="110" textAnchor="middle" dominantBaseline="middle" fontFamily="Segoe UI, Arial, sans-serif" fontWeight="bold" fontSize="90" fill="#fff">C</text>
                  </g>
                  <animateTransform attributeName="transform" type="translate" values="120,180;120,210;120,180" dur="8s" repeatCount="indefinite" />
                </g>
              </g>
              {/* Medium floating logo */}
              <g>
                <g transform="translate(950,80)">
                  <g>
                    <circle cx="60" cy="60" r="50" fill="url(#cLogoGradient)" />
                    <text x="60" y="80" textAnchor="middle" dominantBaseline="middle" fontFamily="Segoe UI, Arial, sans-serif" fontWeight="bold" fontSize="55" fill="#fff">C</text>
                  </g>
                  <animateTransform attributeName="transform" type="translate" values="950,80;950,110;950,80" dur="10s" repeatCount="indefinite" />
                </g>
              </g>
              {/* Small floating logo */}
              <g>
                <g transform="translate(650,600)">
                  <g>
                    <circle cx="40" cy="40" r="32" fill="url(#cLogoGradient)" />
                    <text x="40" y="60" textAnchor="middle" dominantBaseline="middle" fontFamily="Segoe UI, Arial, sans-serif" fontWeight="bold" fontSize="32" fill="#fff">C</text>
                  </g>
                  <animateTransform attributeName="transform" type="translate" values="650,600;650,630;650,600" dur="7s" repeatCount="indefinite" />
                </g>
              </g>
            </g>
          </svg>
        </div>
      )}
      {backgroundType === 'gradient' && (
        <div style={{position: 'absolute', top: 0, left: 0, width: '100vw', height: '100%', zIndex: 0, pointerEvents: 'none', background: 'linear-gradient(120deg, #e0f7fa 0%, #f8fafc 100%)'}} />
      )}
      {/* Content */}
      <div className="container" style={{position: 'relative', zIndex: 2}}>
        <div className="row justify-content-center text-center">
          <div className="col-lg-10 mx-auto">
            <h1 className="hero-title display-4 fw-bold mb-3" style={{fontWeight: 900, fontSize: '3.2rem', letterSpacing: '-1px', background: 'linear-gradient(90deg, #1976d2 30%, #40a9ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textFillColor: 'transparent', textShadow: '0 4px 24px rgba(25, 118, 210, 0.10)'}}>
              {title}
            </h1>
            {subtitle && (
              <p className="hero-subtitle lead mb-4" style={{fontSize: '1.5rem', color: '#2d3a3a', lineHeight: 1.7, fontWeight: 400, maxWidth: 820, margin: '0 auto 2.2rem auto'}}>
                {subtitle}
              </p>
            )}
            {buttons.length > 0 && (
              <div className="hero-actions mb-2">
                {buttons.map((btn, idx) => (
                  <a
                    key={idx}
                    href={btn.href}
                    className={`btn btn-lg mb-2 shadow me-3 ${btn.primary ? 'btn-primary' : 'btn-outline-primary'}`}
                    style={{minWidth: 160}}
                  >
                    {btn.label}
                  </a>
                ))}
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

HeroSection.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  buttons: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    primary: PropTypes.bool
  })),
  backgroundType: PropTypes.oneOf(['animated', 'gradient', 'color']),
  backgroundColor: PropTypes.string,
  minHeight: PropTypes.string,
  children: PropTypes.node
};

export default HeroSection; 