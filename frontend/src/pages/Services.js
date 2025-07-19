import React from 'react';
import { Link } from 'react-router-dom';
import { APP_CONSTANTS, getPostLaunchServices } from '../constants';
import { buttonFeatures } from '../utils/buttonFeatures';
import HeroSection from '../components/HeroSection';
import Card from '../components/Card';

const Services = () => {
  const services = getPostLaunchServices();

  // Service interaction functions
  const handleServiceClick = (service) => {
    buttonFeatures.serviceBooking.bookConsultation(service.title);
  };

  const handleBookConsultation = (service) => {
    buttonFeatures.serviceBooking.bookConsultation(service.title);
  };

  const handleGetQuote = (service) => {
    const quote = buttonFeatures.serviceBooking.getQuote(service.title);
    buttonFeatures.notifications.show(
      `${service.title}: ${quote.estimatedCost} | Timeline: ${quote.timeline}`,
      'info'
    );
  };

  const processSteps = [
    {
      step: 1,
      title: 'Discovery & Planning',
      description: 'We understand your business goals, technical requirements, and create a detailed roadmap for success.',
      icon: '🔍'
    },
    {
      step: 2,
      title: 'Design & Prototype',
      description: 'Create user-centered designs and interactive prototypes to validate concepts before development.',
      icon: '🎨'
    },
    {
      step: 3,
      title: 'Development & Testing',
      description: 'Build your solution with modern technologies and rigorous testing for quality assurance.',
      icon: '⚙️'
    },
    {
      step: 4,
      title: 'Launch & Support',
      description: 'Deploy your product and provide ongoing support to ensure continued success and growth.',
      icon: '🚀'
    }
  ];

  const whyChooseUs = [
    {
      icon: '⚡',
      title: 'Fast Delivery',
      description: 'Launch your MVP in weeks, not months. Speed is our competitive advantage.'
    },
    {
      icon: '🎯',
      title: 'Startup Focused',
      description: 'Built by founders, for founders. We understand your challenges and growth needs.'
    },
    {
      icon: '🧠',
      title: 'Expert Team',
      description: 'Ex-Google, IIT, and startup veterans. You get the best minds in the industry.'
    },
    {
      icon: '💰',
      title: 'Cost Effective',
      description: 'Premium quality at startup-friendly prices. No hidden costs or surprises.'
    }
  ];

  return (
    <div className="services-page">
      {/* Hero Section */}
      <HeroSection
        title={'Technology Services for Startups'}
        subtitle={'Comprehensive technology solutions to help startups launch, scale, and succeed in the digital age.'}
        buttons={[
          { label: 'Explore Services', href: '#services', primary: true },
          { label: 'Get in Touch', href: '/contact', primary: false }
        ]}
        backgroundType="animated"
      />

      {/* Quote Modal */}
      {/* The quote modal logic is removed as per the edit hint. */}

      {/* Services Section */}
    <section className="section">
      <div className="container">
        <div className="section-title">
            <h2>Our Services</h2>
          <p>
            We offer a comprehensive suite of technology services to help startups succeed.
          </p>
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {services.map(service => (
            <div className="col" key={service.id}>
              <Card 
                title={service.title}
                description={service.description}
                icon={service.icon}
                features={service.features}
              />
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* Why Choose Our Services */}
      <section className="section position-relative" style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(224,247,250,0.85) 100%)',
        borderRadius: 32,
        margin: '2.5rem auto',
        maxWidth: 1100,
        padding: '3.5rem 2.2rem',
        boxShadow: '0 16px 48px 0 rgba(25,118,210,0.13)',
        border: '1.5px solid rgba(25,118,210,0.10)',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Animated/floating background icon */}
        <div style={{
          position: 'absolute',
          top: '12%',
          left: '7%',
          fontSize: '3.5rem',
          opacity: 0.08,
          animation: 'float 7s ease-in-out infinite'
        }}>✨</div>
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '8%',
          fontSize: '3.5rem',
          opacity: 0.09,
          animation: 'float 9s ease-in-out infinite reverse'
        }}>💡</div>
        <div className="container">
          <div className="section-title text-center mb-5">
            <div className="d-flex align-items-center justify-content-center mb-3">
              <h2 className="fw-bold mb-0" style={{
                fontSize: '2.4rem',
                letterSpacing: '-0.5px',
                color: '#1976d2',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <span style={{fontSize: '2rem', opacity: 0.8}}>✨</span>
                Why Choose Our Services?
                <span style={{fontSize: '2rem', opacity: 0.8}}>💡</span>
              </h2>
            </div>
            <div className="gradient-divider mb-3" style={{
              height: 4,
              width: 100,
              background: 'linear-gradient(90deg, #1976d2 0%, #40a9ff 50%, #1976d2 100%)',
              borderRadius: 8,
              margin: '0 auto 20px auto',
              opacity: 0.3
            }}></div>
            <p style={{fontSize: '1.1rem', color: '#1976d2', fontWeight: 500, margin: 0}}>
              We're not just another tech company. Here's what sets us apart.
            </p>
          </div>
          <div className="row g-4">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="col-lg-3 col-md-6 mb-4 d-flex align-items-stretch">
                <div className="card h-100 text-center p-4 glass-card" style={{
                  borderRadius: 24,
                  boxShadow: '0 8px 32px 0 rgba(25,118,210,0.15)',
                  border: '2.5px solid #e0c3fc',
                  background: 'rgba(255,255,255,0.96)',
                  backdropFilter: 'blur(12px)',
                  transition: 'all 0.3s cubic-bezier(.4,2,.6,1) 0s',
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: 240,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderImage: 'linear-gradient(120deg, #1976d2 40%, #40a9ff 100%) 1',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-10px) scale(1.03)';
                  e.currentTarget.style.boxShadow = '0 20px 48px 0 rgba(25,118,210,0.22)';
                  e.currentTarget.style.borderColor = '#1976d2';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(25,118,210,0.15)';
                  e.currentTarget.style.borderColor = '#e0c3fc';
                }}>
                  {/* Home-style circular icon background */}
                  <div className="service-icon mb-4" style={{
                    width: 64,
                    height: 64,
                    margin: '0 auto 1rem auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(64,169,255,0.13)',
                    borderRadius: '50%',
                    boxShadow: '0 4px 18px 0 rgba(25,118,210,0.10)',
                    border: '2.5px solid rgba(25,118,210,0.10)',
                    fontSize: 38,
                    color: '#1976d2',
                    animation: 'floatY 3.5s ease-in-out infinite',
                    filter: 'drop-shadow(0 0 12px #40a9ff55)'
                  }}>
                    <span>{item.icon}</span>
                  </div>
                  <h5 className="card-title mb-3" style={{
                    fontWeight: 700,
                    color: '#1976d2',
                    fontSize: '1.22rem',
                    marginBottom: '1rem'
                  }}>{item.title}</h5>
                  <p className="card-text" style={{
                    color: '#555',
                    fontSize: '1rem',
                    lineHeight: 1.6,
                    fontWeight: 400,
                    margin: 0
                  }}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    {/* Process Section */}
    <section className="section position-relative" style={{
      background: 'linear-gradient(120deg, #e0f7fa 0%, #f8fafc 60%, #e0e7ff 100%)',
      borderRadius: 32,
      margin: '2.5rem auto',
      maxWidth: 1100,
      padding: '3.5rem 2.2rem',
      boxShadow: '0 16px 48px 0 rgba(25,118,210,0.10)',
      border: '1.5px solid rgba(25,118,210,0.08)',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Soft animated SVG background */}
      <svg width="100%" height="100%" style={{position: 'absolute', top: 0, left: 0, zIndex: 0, opacity: 0.10, pointerEvents: 'none'}} viewBox="0 0 1440 320"><path fill="#1976d2" fillOpacity="0.13" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
      <div className="container position-relative" style={{zIndex: 1}}>
        <div className="section-title">
          <h2>Our Process</h2>
          <p>Our proven methodology helps startups move from idea to launch efficiently.</p>
        </div>
        <div className="row">
            {processSteps.map((step, index) => {
              // Unique gradients for each process step
              const stepGradients = [
                'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', // Discovery - blue
                'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', // Design - green
                'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Development - purple
                'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', // Launch - orange/yellow
              ];
              return (
                <div key={step.step} className="col-lg-3 col-md-6 mb-4 d-flex align-items-stretch">
                  <div className="card h-100 text-center p-4" style={{
                    borderRadius: 24,
                    border: '2.5px solid',
                    borderImage: 'linear-gradient(120deg, #1976d2 40%, #40a9ff 100%) 1',
                    backdropFilter: 'blur(12px)',
                    position: 'relative',
                    overflow: 'hidden',
                    minHeight: 240,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    <div className="step-number mb-3" style={{
                      width: 56,
                      height: 56,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(64,169,255,0.13)',
                      borderRadius: '50%',
                      boxShadow: '0 4px 18px 0 rgba(25,118,210,0.10)',
                      border: '2.5px solid rgba(25,118,210,0.10)',
                      fontWeight: 800,
                      fontSize: '2rem',
                      color: '#1976d2',
                      margin: '0 auto 1rem auto',
                      animation: 'floatY 3.5s ease-in-out infinite',
                      filter: 'drop-shadow(0 0 12px #40a9ff55)'
                    }}>
                      {step.step}
                    </div>
                    {/* Unique gradient circular icon background */}
                    <div className="service-icon mb-4" style={{
                      width: 56,
                      height: 56,
                      margin: '0 auto 1rem auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(64,169,255,0.13)',
                      borderRadius: '50%',
                      boxShadow: '0 4px 18px 0 rgba(25,118,210,0.10)',
                      border: '2.5px solid rgba(25,118,210,0.10)',
                      fontSize: 28,
                      color: '#1976d2',
                      animation: 'floatY 3.5s ease-in-out infinite',
                      filter: 'drop-shadow(0 0 12px #40a9ff55)'
                    }}>
                      <span>{step.icon}</span>
                    </div>
                    <h5 className="card-title">{step.title}</h5>
                    <p className="card-text">{step.description}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>

    {/* CTA Section */}
      <section className="cta-section">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-lg-8">
            <h2 className="mb-4">
                Ready to Build Something Amazing?
            </h2>
            <p className="lead mb-4">
              Let's discuss your project and see how we can help bring your vision to life. Get started with Creova today!
            </p>
              <div className="cta-buttons">
                <Link to="/contact" className="btn btn-primary btn-lg me-3 mb-2" aria-label="Start Your Project with Creova">
                  Start Your Project
                </Link>
                <Link to="/about" className="btn btn-outline-primary btn-lg mb-2" aria-label="Meet Our Team">
                  Meet Our Team
                </Link>
              </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  );
};

export default Services; 