import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';

const timeline = [
  {
    year: '2025',
    title: 'Creova Technologies Founded',
    description: 'Creova Technologies was started by Vishal Singh, a fresher passionate about technology and building new things.'
  },
  {
    year: '2025',
    title: 'MVP Development',
    description: 'Built MVPs for early-stage startups, learning and growing with each project.'
  },
  {
    year: '2025',
    title: 'Team Expansion',
    description: 'Started building a team of enthusiastic learners and freshers to provide technology services.'
  },
  {
    year: '2025',
    title: 'Service Launch',
    description: 'Launched technology services for startups including AI, mobile apps, cloud solutions, and more.'
  }
];

const values = [
  {
    title: 'Innovation',
    description: 'We constantly push the boundaries of technology to deliver cutting-edge solutions that drive business growth.'
  },
  {
    title: 'Partnership',
    description: 'We treat every client as a partner, working closely to understand their vision and achieve shared success.'
  },
  {
    title: 'Excellence',
    description: 'We maintain the highest standards of quality in everything we do, from code to customer service.'
  },
  {
    title: 'Growth',
    description: "We're committed to helping startups scale efficiently and sustainably through technology."
  }
];

const team = [
  {
    name: 'Vishal Singh',
    title: 'Founder',
    bio: 'Fresher passionate about technology, coding, and building new things. Excited to help startups and learn along the way.',
    avatar: '/images/vishal-singh.jpg',
    linkedin: '#',
    twitter: '#'
  },
  {
    name: 'To Be Announced',
    title: 'CTO',
    bio: 'We\'re building an exceptional team of technology leaders. More team members will be announced soon.',
    avatar: '',
    linkedin: '#',
    twitter: '#'
  },
  {
    name: 'To Be Announced',
    title: 'Head of Design',
    bio: 'We\'re assembling a world-class design team to create beautiful, user-centered experiences.',
    avatar: '',
    linkedin: '#',
    twitter: '#'
  }
];

const About = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(120deg, #e0f7fa 0%, #f8fafc 100%)',
      }}
    >
      {/* Animated SVG Creova background */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 900"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="creovaBg" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#1976d2" stopOpacity="0.13" />
            <stop offset="100%" stopColor="#40a9ff" stopOpacity="0.07" />
          </radialGradient>
        </defs>
        {/* Soft floating C shapes */}
        <g>
          <circle cx="400" cy="200" r="120" fill="url(#creovaBg)">
            <animate attributeName="cy" values="200;250;200" dur="6s" repeatCount="indefinite" />
          </circle>
          <circle cx="1100" cy="600" r="90" fill="url(#creovaBg)">
            <animate attributeName="cy" values="600;650;600" dur="7s" repeatCount="indefinite" />
          </circle>
          <circle cx="800" cy="400" r="60" fill="url(#creovaBg)">
            <animate attributeName="cy" values="400;420;400" dur="5s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
      {/* About Section (styled like other sections) */}
      <HeroSection
        title="About Creova Technologies"
        subtitle="Creova Technologies was started by a fresher with a passion for technology and a dream to help startups grow with innovative solutions."
        buttons={[
          { label: 'Get in Touch', href: '/contact', primary: true, 'aria-label': 'Contact Creova' },
          { label: 'View Our Services', href: '/services', primary: false, 'aria-label': 'View Creova Services' }
        ]}
        backgroundType="animated"
      />
      {/* Enhanced Mission Section */}
      <section className="section position-relative" style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,248,255,0.9) 100%)',
        borderRadius: 32,
        margin: '3rem auto',
        maxWidth: 1200,
        padding: '4rem 3rem',
        boxShadow: '0 16px 48px 0 rgba(25,118,210,0.15)',
        border: '2px solid rgba(25,118,210,0.08)',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Floating decorative elements */}
        <div style={{
          position: 'absolute',
          top: '8%',
          right: '6%',
          fontSize: '4rem',
          opacity: 0.08,
          animation: 'float 6s ease-in-out infinite'
        }}>🎯</div>
        <div style={{
          position: 'absolute',
          bottom: '12%',
          left: '5%',
          fontSize: '3.5rem',
          opacity: 0.06,
          animation: 'float 8s ease-in-out infinite reverse'
        }}>🌟</div>
        
        {/* Subtle background pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 80%, rgba(67,206,162,0.03) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(25,118,210,0.03) 0%, transparent 50%)',
          pointerEvents: 'none'
        }}></div>

        <div className="row align-items-center" style={{ position: 'relative', zIndex: 2 }}>
          <div className="col-lg-7 mb-5 mb-lg-0">
            {/* Mission Icon */}
            <div style={{
              background: 'rgba(64,169,255,0.13)',
              borderRadius: '50%',
              width: 80,
              height: 80,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 24,
              boxShadow: '0 4px 18px 0 rgba(25,118,210,0.10)',
              border: '2.5px solid rgba(25,118,210,0.10)',
              fontSize: 36,
              color: '#1976d2'
            }}>
              🚀
            </div>
            
            <h2 style={{
              fontWeight: 800,
              fontSize: '2.5rem',
              color: '#1976d2',
              marginBottom: 20,
              background: 'linear-gradient(135deg, #1976d2 0%, #43cea2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Our Mission
            </h2>
            
            {/* Gradient divider */}
            <div style={{
              height: 4,
              width: 80,
              background: 'linear-gradient(90deg, #43cea2 0%, #1976d2 100%)',
              borderRadius: 8,
              margin: '0 0 24px 0',
              opacity: 0.3
            }}></div>
            
            <p className="lead" style={{
              fontSize: '1.3rem',
              color: '#374151',
              fontWeight: 600,
              lineHeight: 1.6,
              marginBottom: 20
            }}>
              To make <strong>world-class technology accessible</strong> to every startup, no matter how new or small, and to <strong>learn and grow together</strong>.
            </p>
            
            <p style={{
              fontSize: '1.1rem',
              color: '#555',
              lineHeight: 1.7,
              marginBottom: 28
            }}>
              Creova Technologies was started by a fresher, <strong>Vishal Singh</strong>, who is passionate about technology and helping others build their dreams. We are here to learn, grow, and create real impact for startups.
            </p>
            
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn btn-primary btn-lg" style={{
                borderRadius: 12,
                fontWeight: 700,
                fontSize: '1.1rem',
                padding: '12px 28px',
                background: 'linear-gradient(135deg, #43cea2 0%, #1976d2 100%)',
                border: 'none',
                boxShadow: '0 4px 16px 0 rgba(67,206,162,0.3)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px 0 rgba(67,206,162,0.4)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 4px 16px 0 rgba(67,206,162,0.3)';
              }}
              aria-label="Contact Creova">
                Get Started
              </Link>
              <Link to="/services" className="btn btn-outline-primary btn-lg" style={{
                borderRadius: 12,
                fontWeight: 700,
                fontSize: '1.1rem',
                padding: '12px 28px',
                border: '2px solid #1976d2',
                color: '#1976d2',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#1976d2';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#1976d2';
              }}
              aria-label="View Creova Services">
                Explore Services
              </Link>
            </div>
          </div>
          
          <div className="col-lg-5">
            <div className="glass-card p-5" style={{
              borderRadius: 24,
              background: 'rgba(255,255,255,0.8)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 12px 40px 0 rgba(25,118,210,0.15)',
              border: '2px solid rgba(25,118,210,0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 20px 60px 0 rgba(25,118,210,0.25)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 12px 40px 0 rgba(25,118,210,0.15)';
            }}>
              {/* Vision Icon */}
              <div style={{
                background: 'rgba(64,169,255,0.13)',
                borderRadius: '50%',
                width: 64,
                height: 64,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                boxShadow: '0 4px 18px 0 rgba(25,118,210,0.10)',
                border: '2.5px solid rgba(25,118,210,0.10)',
                fontSize: 28,
                color: '#1976d2'
              }}>
                👁️
              </div>
              
              <h3 style={{
                fontWeight: 700,
                fontSize: '1.8rem',
                color: '#1976d2',
                marginBottom: 16
              }}>Our Vision</h3>
              
              <p style={{
                fontSize: '1.1rem',
                color: '#555',
                lineHeight: 1.6,
                marginBottom: 20
              }}>
                To become a <strong>trusted technology partner</strong> for startups, known for honesty, learning, and delivering innovative solutions that help everyone grow.
              </p>
              
              {/* Key points */}
              <div style={{ marginTop: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div style={{
                    background: '#43cea2',
                    borderRadius: '50%',
                    width: 8,
                    height: 8
                  }}></div>
                  <span style={{ color: '#1976d2', fontWeight: 600 }}>Trust & Honesty</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div style={{
                    background: '#43cea2',
                    borderRadius: '50%',
                    width: 8,
                    height: 8
                  }}></div>
                  <span style={{ color: '#1976d2', fontWeight: 600 }}>Continuous Learning</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    background: '#43cea2',
                    borderRadius: '50%',
                    width: 8,
                    height: 8
                  }}></div>
                  <span style={{ color: '#1976d2', fontWeight: 600 }}>Innovation & Growth</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Timeline Section */}
      <section className="section position-relative" style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,248,255,0.8) 100%)',
        borderRadius: 28,
        margin: '2.5rem auto',
        maxWidth: 1100,
        padding: '3rem 2rem',
        boxShadow: '0 12px 40px 0 rgba(25,118,210,0.12)',
        border: '1px solid rgba(25,118,210,0.08)',
        overflow: 'hidden'
      }}>
        {/* Floating background elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          fontSize: '3rem',
          opacity: 0.1,
          animation: 'float 6s ease-in-out infinite'
        }}>🚀</div>
        <div style={{
          position: 'absolute',
          bottom: '15%',
          left: '8%',
          fontSize: '2.5rem',
          opacity: 0.08,
          animation: 'float 8s ease-in-out infinite reverse'
        }}>💡</div>
        
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
              <span style={{fontSize: '2rem', opacity: 0.8}}>📈</span>
              Our Journey
              <span style={{fontSize: '2rem', opacity: 0.8}}>📈</span>
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
          <p style={{
            fontSize: '1.1rem',
            color: '#1976d2',
            fontWeight: 500,
            margin: 0
          }}>From founding to becoming a trusted technology partner for startups.</p>
        </div>
        
        <div className="row g-4">
          {timeline.map((item, index) => (
            <div key={index} className="col-lg-6 mb-4">
              <div className="card h-100 glass-card" style={{
                borderRadius: 20,
                boxShadow: '0 8px 32px 0 rgba(25,118,210,0.15)',
                border: '2px solid rgba(25,118,210,0.1)',
                background: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 16px 48px 0 rgba(25,118,210,0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(25,118,210,0.15)';
              }}>
                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, #1976d2 0%, #40a9ff 100%)',
                  borderRadius: '20px 20px 0 0'
                }}></div>
                
                <div className="card-body p-4">
                  <div className="d-flex align-items-start">
                    <div className="step-number me-4" style={{
                      fontWeight: 800,
                      fontSize: '2.5rem',
                      color: '#1976d2',
                      background: 'linear-gradient(135deg, rgba(25,118,210,0.1) 0%, rgba(64,169,255,0.1) 100%)',
                      borderRadius: '50%',
                      width: '60px',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '3px solid rgba(25,118,210,0.2)',
                      boxShadow: '0 4px 16px rgba(25,118,210,0.15)'
                    }}>
                      {index + 1}
                    </div>
                    <div style={{flex: 1}}>
                      <div className="timeline-year mb-2" style={{
                        fontWeight: 700,
                        color: '#1976d2',
                        fontSize: '1.1rem',
                        display: 'inline-block',
                        padding: '4px 12px',
                        borderRadius: 20,
                        background: 'rgba(25,118,210,0.1)',
                        border: '1px solid rgba(25,118,210,0.2)'
                      }}>{item.year}</div>
                      <h5 className="timeline-event mb-3" style={{
                        margin: 0,
                        fontWeight: 700,
                        color: '#1a1a1a',
                        fontSize: '1.25rem',
                        lineHeight: 1.3
                      }}>{item.title}</h5>
                      <p className="timeline-milestone" style={{
                        margin: 0,
                        color: '#555',
                        fontSize: '1rem',
                        lineHeight: 1.6,
                        fontWeight: 400
                      }}>{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Rural/tech quote at the bottom */}
        <div className="text-center mt-5" style={{
          fontWeight: 500,
          fontSize: '1.1rem',
          color: '#1976d2',
          opacity: 0.9,
          fontStyle: 'italic'
        }}>
          "Every journey begins with a single step, and every success story starts with a dream."
        </div>
      </section>
      {/* Values Section */}
      <section className="section position-relative" style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,255,0.8) 100%)',
        borderRadius: 28,
        margin: '2.5rem auto',
        maxWidth: 1100,
        padding: '3rem 2rem',
        boxShadow: '0 12px 40px 0 rgba(25,118,210,0.12)',
        border: '1px solid rgba(25,118,210,0.08)',
        overflow: 'hidden'
      }}>
        {/* Floating background elements */}
        <div style={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          fontSize: '2.5rem',
          opacity: 0.08,
          animation: 'float 7s ease-in-out infinite'
        }}>⭐</div>
        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '12%',
          fontSize: '3rem',
          opacity: 0.1,
          animation: 'float 9s ease-in-out infinite reverse'
        }}>💎</div>
        
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
              <span style={{fontSize: '2rem', opacity: 0.8}}>💎</span>
              Our Values
              <span style={{fontSize: '2rem', opacity: 0.8}}>💎</span>
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
          <p style={{
            fontSize: '1.1rem',
            color: '#1976d2',
            fontWeight: 500,
            margin: 0
          }}>The principles that guide everything we do.</p>
        </div>
        
        <div className="row g-4">
          {values.map((value, index) => {
            const icons = ['🚀', '🤝', '⭐', '📈'];
            return (
              <div key={index} className="col-lg-3 col-md-6 mb-4 d-flex align-items-stretch">
                <div className="card h-100 text-center p-4 glass-card" style={{
                  borderRadius: 20,
                  boxShadow: '0 8px 32px 0 rgba(25,118,210,0.15)',
                  border: '2px solid rgba(25,118,210,0.1)',
                  background: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 16px 48px 0 rgba(25,118,210,0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(25,118,210,0.15)';
                }}>
                  {/* Gradient overlay */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, #1976d2 0%, #40a9ff 100%)',
                    borderRadius: '20px 20px 0 0'
                  }}></div>
                  
                  {/* Floating icon */}
                  <div className="mb-4" style={{
                    fontSize: '3.5rem',
                    animation: 'float 4s ease-in-out infinite',
                    filter: 'drop-shadow(0 4px 8px rgba(25,118,210,0.2))'
                  }}>
                    {icons[index]}
                  </div>
                  
                  <h5 className="card-title mb-3" style={{
                    fontWeight: 700,
                    color: '#1976d2',
                    fontSize: '1.3rem',
                    marginBottom: '1rem'
                  }}>{value.title}</h5>
                  <p className="card-text" style={{
                    color: '#555',
                    fontSize: '1rem',
                    lineHeight: 1.6,
                    fontWeight: 400,
                    margin: 0
                  }}>{value.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Rural/tech quote at the bottom */}
        <div className="text-center mt-5" style={{
          fontWeight: 500,
          fontSize: '1.1rem',
          color: '#1976d2',
          opacity: 0.9,
          fontStyle: 'italic'
        }}>
          "Values are not just words, they are the foundation of every decision we make."
        </div>
      </section>
      {/* Team Section */}
      <section className="section bg-light team-section position-relative" style={{borderRadius: 28, margin: '2.5rem auto', maxWidth: 1100, padding: '3.2rem 2.2rem', boxShadow: '0 8px 32px 0 rgba(25,118,210,0.10)', overflow: 'hidden', opacity: 1, visibility: 'visible'}}>
        <div className="section-title text-center mb-4">
          <div className="d-flex align-items-center justify-content-center mb-2">
            <h2 className="fw-bold mb-0" style={{fontSize: '2.2rem', letterSpacing: '-0.5px', color: '#1976d2', display: 'flex', alignItems: 'center'}}>
              Our Team
            </h2>
          </div>
          <div className="gradient-divider mb-3" style={{height: 5, width: 80, background: 'linear-gradient(90deg, #1976d2 0%, #40a9ff 100%)', borderRadius: 8, margin: '0 auto 18px auto', opacity: 0.22}}></div>
          <div className="mb-2" style={{fontWeight: 500, fontSize: '1.08rem', color: '#1976d2'}}>
            Building with passion, learning together.
          </div>
        </div>
        <div className="row">
          {team.map((member, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-4 d-flex align-items-stretch">
              <div className="card h-100 text-center p-4 glass-card" style={{borderRadius: 20, boxShadow: '0 8px 32px 0 rgba(25,118,210,0.13)', border: '2.5px solid #e0c3fc', background: 'rgba(255,255,255,0.92)', position: 'relative', transition: 'transform 0.2s, box-shadow 0.2s', opacity: 1, visibility: 'visible'}}>
                <div className="mb-3">
                  {member.avatar && member.avatar.includes('/images/') ? (
                    <img 
                      src={member.avatar} 
                      alt={member.name}
                      className="team-avatar"
                      style={{width: '120px', height: '120px', objectFit: 'cover', borderRadius: '50%', boxShadow: '0 4px 18px 0 rgba(25,118,210,0.10)'}}
                    />
                  ) : (
                    <div style={{fontSize: '4rem', color: '#1976d2'}}>{member.avatar || '👤'}</div>
                  )}
                </div>
                <h5 className="team-name" style={{fontWeight: 700, color: '#1976d2'}}>{member.name}</h5>
                <p className="team-title text-muted" style={{fontWeight: 500}}>{member.title}</p>
                <p className="team-bio" style={{color: '#444', fontSize: '1.04rem'}}>{member.bio}</p>
                <div className="social-links mt-3">
                  {member.linkedin && <a href={member.linkedin} className="me-2" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>}
                  {member.twitter && <a href={member.twitter} aria-label="Twitter" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* If only one team member, show a join CTA */}
        {team.length === 1 && (
          <div className="text-center mt-4">
            <div className="alert alert-info d-inline-block" style={{fontWeight: 600, fontSize: '1.13rem', borderRadius: 12, background: 'rgba(224,195,252,0.13)', color: '#1976d2', boxShadow: '0 2px 12px rgba(25,118,210,0.10)'}}>
              <span role="img" aria-label="raising hand">🙋‍♂️</span> Want to join our team? <Link to="/careers" className="fw-bold text-decoration-underline" style={{color: '#1976d2'}}>See open roles</Link>
            </div>
          </div>
        )}
        {/* Rural/tech quote at the bottom */}
        <div className="text-center mt-5" style={{fontWeight: 500, fontSize: '1.08rem', color: '#1976d2', opacity: 0.92}}>
          "Teamwork and learning go hand in hand."
        </div>
      </section>
      {/* Why Choose Us Section */}
      <section className="section" style={{background: 'rgba(255,255,255,0.7)', borderRadius: 24, margin: '2rem auto', maxWidth: 1100, padding: '2.5rem 2rem'}}>
        <div className="section-title text-center mb-4">
          <h2>Why Choose Creova?</h2>
          <p>We're a new company with a fresh perspective and a passion for technology. Here's what sets us apart.</p>
        </div>
        <div className="row">
          <div className="col-lg-4 mb-4">
            <div className="card h-100 p-4 glass-card" style={{borderRadius: 16}}>
              <h5>Fresh Perspective</h5>
              <p>
                As a fresher-led company, we bring new ideas, energy, and a willingness to learn with every project.
              </p>
            </div>
          </div>
          <div className="col-lg-4 mb-4">
            <div className="card h-100 p-4 glass-card" style={{borderRadius: 16}}>
              <h5>Learning Together</h5>
              <p>
                We grow with our clients, learning and improving with every challenge we take on.
              </p>
            </div>
          </div>
          <div className="col-lg-4 mb-4">
            <div className="card h-100 p-4 glass-card" style={{borderRadius: 16}}>
              <h5>Passion for Technology</h5>
              <p>
                We are driven by curiosity and a genuine love for building new things with technology.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="cta-section" style={{padding: '3rem 0 2rem 0', textAlign: 'center'}}>
        <h2 className="mb-4">Ready to Work with Us?</h2>
        <p className="lead mb-4">
          Let's discuss your project and see how we can help bring your vision to life. Get started with Creova today!
        </p>
        <div className="cta-buttons">
          <Link to="/contact" className="btn btn-primary btn-lg me-3 mb-2" aria-label="Start Your Project with Creova">
            Start Your Project
          </Link>
          <Link to="/services" className="btn btn-outline-primary btn-lg mb-2" aria-label="View Our Services">
            View Our Services
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About; 