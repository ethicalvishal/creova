import React, { useState, useEffect } from 'react';
import { buttonFeatures } from '../utils/buttonFeatures';
import HeroSection from '../components/HeroSection';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Pre-fill service from URL parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    if (serviceParam) {
      setFormData(prev => ({
        ...prev,
        service: serviceParam
      }));
    }
  }, []);

  // Add smooth scroll logic
  useEffect(() => {
    const handleAnchorClick = (e) => {
      if (e.target.matches('a[href="#contact-form"]')) {
        e.preventDefault();
        const form = document.getElementById('contact-form');
        if (form) {
          form.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await buttonFeatures.contactForm.submit(formData);
      
      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          service: '',
          message: ''
        });
        buttonFeatures.notifications.show('Message sent successfully! We\'ll get back to you soon.', 'success');
      } else {
        setSubmitStatus('error');
        buttonFeatures.notifications.show(result.error || 'Failed to send message. Please try again.', 'error');
      }
    } catch (error) {
      setSubmitStatus('error');
      buttonFeatures.notifications.show('Network error. Please check your connection and try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      content: 'hello@creova.tech',
      link: 'mailto:hello@creova.tech'
    },
    {
      icon: 'fas fa-phone',
      title: 'Phone',
      content: '+91 9709851977',
      link: 'tel:+919709851977'
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Location',
      content: 'Motihari, Bihar 845401',
      link: '#'
    },
    {
      icon: 'fas fa-clock',
      title: 'Business Hours',
      content: 'Mon - Fri: 9:00 AM - 6:00 PM IST',
      link: '#'
    }
  ];

  const services = [
    'MVP Development',
    'AI & Automation',
    'Mobile Apps',
    'UI/UX Design',
    'Cloud Solutions',
    'Growth Strategy',
    'Other'
  ];

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <HeroSection
        title="Contact Us"
        subtitle="Ready to start your project? Get in touch with our team to discuss how we can help bring your vision to life."
        buttons={[
          { label: 'Start Your Project', href: '#contact-form', primary: true }
        ]}
        backgroundType="animated"
      />

      {/* Enhanced Contact Form & Info Section */}
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
        }}>💬</div>
        <div style={{
          position: 'absolute',
          bottom: '12%',
          left: '5%',
          fontSize: '3.5rem',
          opacity: 0.06,
          animation: 'float 8s ease-in-out infinite reverse'
        }}>📧</div>
        
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

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="row">
            {/* Enhanced Contact Form */}
            <div className="col-lg-8 mb-5 mb-lg-0">
              <div className="contact-form" style={{
                background: 'rgba(255,255,255,0.8)',
                borderRadius: 24,
                padding: '3rem',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 12px 40px 0 rgba(25,118,210,0.15)',
                border: '2px solid rgba(25,118,210,0.1)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Form Header with Icon */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
                  <div style={{
                    background: 'rgba(64,169,255,0.13)',
                    borderRadius: '50%',
                    width: 64,
                    height: 64,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 18px 0 rgba(25,118,210,0.10)',
                    border: '2.5px solid rgba(25,118,210,0.10)',
                    fontSize: 28,
                    color: '#1976d2'
                  }}>
                    ✉️
                  </div>
                  <div>
                    <h3 style={{
                      fontWeight: 800,
                      fontSize: '2rem',
                      color: '#1976d2',
                      margin: 0,
                      background: 'linear-gradient(135deg, #1976d2 0%, #43cea2 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>
                      Send us a Message
                    </h3>
                    <p style={{
                      color: '#666',
                      fontSize: '1.1rem',
                      margin: '8px 0 0 0',
                      fontWeight: 500
                    }}>
                      Let's discuss your project and bring your vision to life
                    </p>
                  </div>
                </div>
                
                {submitStatus === 'success' && (
                  <div style={{
                    background: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)',
                    color: 'white',
                    padding: '16px 20px',
                    borderRadius: 12,
                    marginBottom: 24,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    boxShadow: '0 4px 16px 0 rgba(67,206,162,0.3)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}>
                    <i className="fas fa-check-circle" style={{ fontSize: 20 }}></i>
                    <div>
                      <div style={{ fontWeight: 600, marginBottom: 4 }}>Message Sent Successfully!</div>
                      <div style={{ fontSize: '0.95rem', opacity: 0.9 }}>We'll get back to you within 24 hours.</div>
                    </div>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div style={{
                    background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
                    color: 'white',
                    padding: '16px 20px',
                    borderRadius: 12,
                    marginBottom: 24,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    boxShadow: '0 4px 16px 0 rgba(255,107,107,0.3)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}>
                    <i className="fas fa-exclamation-circle" style={{ fontSize: 20 }}></i>
                    <div>
                      <div style={{ fontWeight: 600, marginBottom: 4 }}>Message Failed to Send</div>
                      <div style={{ fontSize: '0.95rem', opacity: 0.9 }}>Please try again or contact us directly.</div>
                    </div>
                  </div>
                )}

                <form id="contact-form" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <label htmlFor="name" className="form-label" style={{
                        fontWeight: 600,
                        color: '#1976d2',
                        marginBottom: 8,
                        fontSize: '1rem'
                      }}>
                        <i className="fas fa-user me-2" style={{ color: '#43cea2' }}></i>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{
                          borderRadius: 12,
                          border: '2px solid #e3f0fc',
                          padding: '14px 18px',
                          fontSize: '1.1rem',
                          background: 'rgba(255,255,255,0.9)',
                          transition: 'border-color 0.3s, box-shadow 0.3s',
                          outline: 'none'
                        }}
                        onFocus={e => {
                          e.target.style.borderColor = '#43cea2';
                          e.target.style.boxShadow = '0 0 0 3px rgba(67,206,162,0.1)';
                        }}
                        onBlur={e => {
                          e.target.style.borderColor = '#e3f0fc';
                          e.target.style.boxShadow = 'none';
                        }}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="col-md-6 mb-4">
                      <label htmlFor="email" className="form-label" style={{
                        fontWeight: 600,
                        color: '#1976d2',
                        marginBottom: 8,
                        fontSize: '1rem'
                      }}>
                        <i className="fas fa-envelope me-2" style={{ color: '#43cea2' }}></i>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{
                          borderRadius: 12,
                          border: '2px solid #e3f0fc',
                          padding: '14px 18px',
                          fontSize: '1.1rem',
                          background: 'rgba(255,255,255,0.9)',
                          transition: 'border-color 0.3s, box-shadow 0.3s',
                          outline: 'none'
                        }}
                        onFocus={e => {
                          e.target.style.borderColor = '#43cea2';
                          e.target.style.boxShadow = '0 0 0 3px rgba(67,206,162,0.1)';
                        }}
                        onBlur={e => {
                          e.target.style.borderColor = '#e3f0fc';
                          e.target.style.boxShadow = 'none';
                        }}
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <label htmlFor="company" className="form-label" style={{
                        fontWeight: 600,
                        color: '#1976d2',
                        marginBottom: 8,
                        fontSize: '1rem'
                      }}>
                        <i className="fas fa-building me-2" style={{ color: '#43cea2' }}></i>
                        Company
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        style={{
                          borderRadius: 12,
                          border: '2px solid #e3f0fc',
                          padding: '14px 18px',
                          fontSize: '1.1rem',
                          background: 'rgba(255,255,255,0.9)',
                          transition: 'border-color 0.3s, box-shadow 0.3s',
                          outline: 'none'
                        }}
                        onFocus={e => {
                          e.target.style.borderColor = '#43cea2';
                          e.target.style.boxShadow = '0 0 0 3px rgba(67,206,162,0.1)';
                        }}
                        onBlur={e => {
                          e.target.style.borderColor = '#e3f0fc';
                          e.target.style.boxShadow = 'none';
                        }}
                        placeholder="Enter your company name"
                      />
                    </div>
                    <div className="col-md-6 mb-4">
                      <label htmlFor="phone" className="form-label" style={{
                        fontWeight: 600,
                        color: '#1976d2',
                        marginBottom: 8,
                        fontSize: '1rem'
                      }}>
                        <i className="fas fa-phone me-2" style={{ color: '#43cea2' }}></i>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        style={{
                          borderRadius: 12,
                          border: '2px solid #e3f0fc',
                          padding: '14px 18px',
                          fontSize: '1.1rem',
                          background: 'rgba(255,255,255,0.9)',
                          transition: 'border-color 0.3s, box-shadow 0.3s',
                          outline: 'none'
                        }}
                        onFocus={e => {
                          e.target.style.borderColor = '#43cea2';
                          e.target.style.boxShadow = '0 0 0 3px rgba(67,206,162,0.1)';
                        }}
                        onBlur={e => {
                          e.target.style.borderColor = '#e3f0fc';
                          e.target.style.boxShadow = 'none';
                        }}
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="service" className="form-label" style={{
                      fontWeight: 600,
                      color: '#1976d2',
                      marginBottom: 8,
                      fontSize: '1rem'
                    }}>
                      <i className="fas fa-cogs me-2" style={{ color: '#43cea2' }}></i>
                      Service Interest
                    </label>
                    <select
                      className="form-control"
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      style={{
                        borderRadius: 12,
                        border: '2px solid #e3f0fc',
                        padding: '14px 18px',
                        fontSize: '1.1rem',
                        background: 'rgba(255,255,255,0.9)',
                        transition: 'border-color 0.3s, box-shadow 0.3s',
                        outline: 'none'
                      }}
                      onFocus={e => {
                        e.target.style.borderColor = '#43cea2';
                        e.target.style.boxShadow = '0 0 0 3px rgba(67,206,162,0.1)';
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = '#e3f0fc';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      <option value="">Select a service</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-5">
                    <label htmlFor="message" className="form-label" style={{
                      fontWeight: 600,
                      color: '#1976d2',
                      marginBottom: 8,
                      fontSize: '1rem'
                    }}>
                      <i className="fas fa-comment me-2" style={{ color: '#43cea2' }}></i>
                      Message *
                    </label>
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      rows="6"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                      style={{
                        borderRadius: 12,
                        border: '2px solid #e3f0fc',
                        padding: '16px 18px',
                        fontSize: '1.1rem',
                        background: 'rgba(255,255,255,0.9)',
                        transition: 'border-color 0.3s, box-shadow 0.3s',
                        outline: 'none',
                        resize: 'vertical'
                      }}
                      onFocus={e => {
                        e.target.style.borderColor = '#43cea2';
                        e.target.style.boxShadow = '0 0 0 3px rgba(67,206,162,0.1)';
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = '#e3f0fc';
                        e.target.style.boxShadow = 'none';
                      }}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-lg"
                    disabled={isSubmitting}
                    style={{
                      borderRadius: 12,
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      padding: '16px 32px',
                      background: 'linear-gradient(135deg, #43cea2 0%, #1976d2 100%)',
                      border: 'none',
                      color: 'white',
                      boxShadow: '0 4px 16px 0 rgba(67,206,162,0.3)',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      minWidth: 180,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8
                    }}
                    onMouseEnter={e => {
                      if (!isSubmitting) {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 20px 0 rgba(67,206,162,0.4)';
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isSubmitting) {
                        e.currentTarget.style.transform = 'none';
                        e.currentTarget.style.boxShadow = '0 4px 16px 0 rgba(67,206,162,0.3)';
                      }
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane"></i>
                        Send Message
                      </>
                    )}
                  </button>
                  </form>
              </div>
            </div>

            {/* Enhanced Contact Information */}
            <div className="col-lg-4">
              <div className="contact-info" style={{
                background: 'rgba(255,255,255,0.8)',
                borderRadius: 24,
                padding: '3rem',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 12px 40px 0 rgba(25,118,210,0.15)',
                border: '2px solid rgba(25,118,210,0.1)',
                position: 'relative',
                overflow: 'hidden',
                height: 'fit-content'
              }}>
                {/* Floating decorative elements */}
                <div style={{
                  position: 'absolute',
                  top: '5%',
                  right: '8%',
                  fontSize: '3rem',
                  opacity: 0.08,
                  animation: 'float 7s ease-in-out infinite'
                }}>📞</div>
                <div style={{
                  position: 'absolute',
                  bottom: '8%',
                  left: '6%',
                  fontSize: '2.5rem',
                  opacity: 0.06,
                  animation: 'float 9s ease-in-out infinite reverse'
                }}>📍</div>

                {/* Contact Info Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                  <div style={{
                    background: 'rgba(64,169,255,0.13)',
                    borderRadius: '50%',
                    width: 48,
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 18px 0 rgba(25,118,210,0.10)',
                    border: '2.5px solid rgba(25,118,210,0.10)',
                    fontSize: 20,
                    color: '#1976d2'
                  }}>
                    🤝
                  </div>
                  <div>
                    <h3 style={{
                      fontWeight: 800,
                      fontSize: '1.5rem',
                      color: '#1976d2',
                      margin: 0,
                      background: 'linear-gradient(135deg, #1976d2 0%, #43cea2 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>
                      Get in Touch
                    </h3>
                    <p style={{
                      color: '#666',
                      fontSize: '0.9rem',
                      margin: '4px 0 0 0',
                      fontWeight: 500
                    }}>
                      Ready to discuss your project?
                    </p>
                  </div>
                </div>

                {/* Contact Info Cards */}
                {contactInfo.map((info, index) => (
                  <div key={index} className="mb-3" style={{
                    background: 'rgba(255,255,255,0.6)',
                    borderRadius: 14,
                    padding: '16px',
                    border: '2px solid rgba(25,118,210,0.08)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px 0 rgba(25,118,210,0.15)';
                    e.currentTarget.style.borderColor = 'rgba(67,206,162,0.3)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'rgba(25,118,210,0.08)';
                  }}>
                    <div className="d-flex align-items-start">
                      <div style={{
                        background: 'rgba(64,169,255,0.13)',
                        borderRadius: '50%',
                        width: 40,
                        height: 40,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 12,
                        border: '2px solid rgba(25,118,210,0.1)',
                        color: '#1976d2',
                        fontSize: 16
                      }}>
                        <i className={info.icon}></i>
                      </div>
                      <div style={{ flex: 1 }}>
                        <h6 style={{
                          fontWeight: 700,
                          color: '#1976d2',
                          marginBottom: 4,
                          fontSize: '1rem'
                        }}>
                          {info.title}
                        </h6>
                        <a href={info.link} style={{
                          color: '#333',
                          textDecoration: 'none',
                          fontSize: '0.9rem',
                          fontWeight: 500,
                          transition: 'color 0.3s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = '#43cea2'}
                        onMouseLeave={e => e.currentTarget.style.color = '#333'}>
                          {info.content}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Enhanced Social Media Section */}
                <div className="mt-4">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                    <div style={{
                      background: 'rgba(64,169,255,0.13)',
                      borderRadius: '50%',
                      width: 36,
                      height: 36,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid rgba(25,118,210,0.1)',
                      color: '#1976d2',
                      fontSize: 14
                    }}>
                      🌐
                    </div>
                    <h6 style={{
                      fontWeight: 700,
                      color: '#1976d2',
                      fontSize: '1.1rem',
                      margin: 0
                    }}>
                      Follow Us
                    </h6>
                  </div>
                  <p style={{
                    color: '#666',
                    fontSize: '0.9rem',
                    marginBottom: 16,
                    fontWeight: 500
                  }}>
                    Stay connected with us on social media.
                  </p>
                  <div className="social-links" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <a href="#" className="social-link" aria-label="LinkedIn" style={{
                      background: 'rgba(64,169,255,0.13)',
                      borderRadius: '50%',
                      width: 42,
                      height: 42,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#1976d2',
                      fontSize: 16,
                      transition: 'all 0.3s',
                      border: '2px solid rgba(25,118,210,0.1)',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#1976d2';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 8px 20px 0 rgba(25,118,210,0.3)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(64,169,255,0.13)';
                      e.currentTarget.style.color = '#1976d2';
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = 'none';
                    }}>
                      <i className="fab fa-linkedin"></i>
                    </a>
                    <a href="#" className="social-link" aria-label="Twitter" style={{
                      background: 'rgba(64,169,255,0.13)',
                      borderRadius: '50%',
                      width: 42,
                      height: 42,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#1976d2',
                      fontSize: 16,
                      transition: 'all 0.3s',
                      border: '2px solid rgba(25,118,210,0.1)',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#1976d2';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 8px 20px 0 rgba(25,118,210,0.3)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(64,169,255,0.13)';
                      e.currentTarget.style.color = '#1976d2';
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = 'none';
                    }}>
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" className="social-link" aria-label="Instagram" style={{
                      background: 'rgba(64,169,255,0.13)',
                      borderRadius: '50%',
                      width: 42,
                      height: 42,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#1976d2',
                      fontSize: 16,
                      transition: 'all 0.3s',
                      border: '2px solid rgba(25,118,210,0.1)',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#1976d2';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 8px 20px 0 rgba(25,118,210,0.3)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(64,169,255,0.13)';
                      e.currentTarget.style.color = '#1976d2';
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = 'none';
                    }}>
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#" className="social-link" aria-label="Facebook" style={{
                      background: 'rgba(64,169,255,0.13)',
                      borderRadius: '50%',
                      width: 42,
                      height: 42,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#1976d2',
                      fontSize: 16,
                      transition: 'all 0.3s',
                      border: '2px solid rgba(25,118,210,0.1)',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#1976d2';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 8px 20px 0 rgba(25,118,210,0.3)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(64,169,255,0.13)';
                      e.currentTarget.style.color = '#1976d2';
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = 'none';
                    }}>
                      <i className="fab fa-facebook"></i>
                    </a>

                  </div>
                </div>

                {/* Rural Quote */}
                <div style={{
                  marginTop: 24,
                  padding: '16px',
                  background: 'linear-gradient(135deg, rgba(67,206,162,0.08) 0%, rgba(25,118,210,0.08) 100%)',
                  borderRadius: 14,
                  border: '2px solid rgba(67,206,162,0.15)',
                  textAlign: 'center'
                }}>
                  <p style={{
                    color: '#1976d2',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    margin: 0,
                    fontStyle: 'italic'
                  }}>
                    "Stay connected, achieve success"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
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
          top: '10%',
          right: '8%',
          fontSize: '3.5rem',
          opacity: 0.08,
          animation: 'float 7s ease-in-out infinite'
        }}>❓</div>
        <div style={{
          position: 'absolute',
          bottom: '15%',
          left: '7%',
          fontSize: '3rem',
          opacity: 0.06,
          animation: 'float 9s ease-in-out infinite reverse'
        }}>💡</div>
        
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

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Enhanced Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 20 }}>
              <div style={{
                background: 'rgba(64,169,255,0.13)',
                borderRadius: '50%',
                width: 64,
                height: 64,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 18px 0 rgba(25,118,210,0.10)',
                border: '2.5px solid rgba(25,118,210,0.10)',
                fontSize: 28,
                color: '#1976d2'
              }}>
                ❓
              </div>
              <div>
                <h2 style={{
                  fontWeight: 800,
                  fontSize: '2.5rem',
                  color: '#1976d2',
                  margin: 0,
                  background: 'linear-gradient(135deg, #1976d2 0%, #43cea2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Frequently Asked Questions
                </h2>
                <p style={{
                  color: '#666',
                  fontSize: '1.2rem',
                  margin: '12px 0 0 0',
                  fontWeight: 500
                }}>
                  Common questions about working with Creova Technologies
                </p>
              </div>
            </div>
          </div>
          
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="faq-card" style={{
                background: 'rgba(255,255,255,0.8)',
                borderRadius: 24,
                padding: '2.5rem',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 12px 40px 0 rgba(25,118,210,0.15)',
                border: '2px solid rgba(25,118,210,0.1)',
                position: 'relative',
                overflow: 'hidden',
                height: '100%',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 16px 50px 0 rgba(25,118,210,0.2)';
                e.currentTarget.style.borderColor = 'rgba(67,206,162,0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 12px 40px 0 rgba(25,118,210,0.15)';
                e.currentTarget.style.borderColor = 'rgba(25,118,210,0.1)';
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 20 }}>
                  <div style={{
                    background: 'rgba(64,169,255,0.13)',
                    borderRadius: '50%',
                    width: 48,
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid rgba(25,118,210,0.1)',
                    color: '#1976d2',
                    fontSize: 20,
                    flexShrink: 0
                  }}>
                    ⚡
                  </div>
                  <div style={{ flex: 1 }}>
                    <h5 style={{
                      fontWeight: 700,
                      color: '#1976d2',
                      fontSize: '1.3rem',
                      marginBottom: 12,
                      lineHeight: 1.3
                    }}>
                      How quickly can you deliver an MVP?
                    </h5>
                    <p style={{
                      color: '#555',
                      fontSize: '1rem',
                      lineHeight: 1.6,
                      margin: 0,
                      fontWeight: 500
                    }}>
                      We typically deliver MVPs in 2-4 weeks, depending on the complexity of your project. 
                      We prioritize speed without compromising quality.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="faq-card" style={{
                background: 'rgba(255,255,255,0.8)',
                borderRadius: 24,
                padding: '2.5rem',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 12px 40px 0 rgba(25,118,210,0.15)',
                border: '2px solid rgba(25,118,210,0.1)',
                position: 'relative',
                overflow: 'hidden',
                height: '100%',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 16px 50px 0 rgba(25,118,210,0.2)';
                e.currentTarget.style.borderColor = 'rgba(67,206,162,0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 12px 40px 0 rgba(25,118,210,0.15)';
                e.currentTarget.style.borderColor = 'rgba(25,118,210,0.1)';
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 20 }}>
                  <div style={{
                    background: 'rgba(64,169,255,0.13)',
                    borderRadius: '50%',
                    width: 48,
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid rgba(25,118,210,0.1)',
                    color: '#1976d2',
                    fontSize: 20,
                    flexShrink: 0
                  }}>
                    🛠️
                  </div>
                  <div style={{ flex: 1 }}>
                    <h5 style={{
                      fontWeight: 700,
                      color: '#1976d2',
                      fontSize: '1.3rem',
                      marginBottom: 12,
                      lineHeight: 1.3
                    }}>
                      What technologies do you use?
                    </h5>
                    <p style={{
                      color: '#555',
                      fontSize: '1rem',
                      lineHeight: 1.6,
                      margin: 0,
                      fontWeight: 500
                    }}>
                      We use modern, proven technologies including React, Node.js, Python, AWS, and more. 
                      We choose the best stack for your specific needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="faq-card" style={{
                background: 'rgba(255,255,255,0.8)',
                borderRadius: 24,
                padding: '2.5rem',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 12px 40px 0 rgba(25,118,210,0.15)',
                border: '2px solid rgba(25,118,210,0.1)',
                position: 'relative',
                overflow: 'hidden',
                height: '100%',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 16px 50px 0 rgba(25,118,210,0.2)';
                e.currentTarget.style.borderColor = 'rgba(67,206,162,0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 12px 40px 0 rgba(25,118,210,0.15)';
                e.currentTarget.style.borderColor = 'rgba(25,118,210,0.1)';
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 20 }}>
                  <div style={{
                    background: 'rgba(64,169,255,0.13)',
                    borderRadius: '50%',
                    width: 48,
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid rgba(25,118,210,0.1)',
                    color: '#1976d2',
                    fontSize: 20,
                    flexShrink: 0
                  }}>
                    🔧
                  </div>
                  <div style={{ flex: 1 }}>
                    <h5 style={{
                      fontWeight: 700,
                      color: '#1976d2',
                      fontSize: '1.3rem',
                      marginBottom: 12,
                      lineHeight: 1.3
                    }}>
                      Do you provide ongoing support?
                    </h5>
                    <p style={{
                      color: '#555',
                      fontSize: '1rem',
                      lineHeight: 1.6,
                      margin: 0,
                      fontWeight: 500
                    }}>
                      Yes, we offer ongoing support and maintenance services to ensure your product 
                      continues to perform optimally as your business grows.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="faq-card" style={{
                background: 'rgba(255,255,255,0.8)',
                borderRadius: 24,
                padding: '2.5rem',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 12px 40px 0 rgba(25,118,210,0.15)',
                border: '2px solid rgba(25,118,210,0.1)',
                position: 'relative',
                overflow: 'hidden',
                height: '100%',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 16px 50px 0 rgba(25,118,210,0.2)';
                e.currentTarget.style.borderColor = 'rgba(67,206,162,0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 12px 40px 0 rgba(25,118,210,0.15)';
                e.currentTarget.style.borderColor = 'rgba(25,118,210,0.1)';
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 20 }}>
                  <div style={{
                    background: 'rgba(64,169,255,0.13)',
                    borderRadius: '50%',
                    width: 48,
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid rgba(25,118,210,0.1)',
                    color: '#1976d2',
                    fontSize: 20,
                    flexShrink: 0
                  }}>
                    💬
                  </div>
                  <div style={{ flex: 1 }}>
                    <h5 style={{
                      fontWeight: 700,
                      color: '#1976d2',
                      fontSize: '1.3rem',
                      marginBottom: 12,
                      lineHeight: 1.3
                    }}>
                      How do you handle project communication?
                    </h5>
                    <p style={{
                      color: '#555',
                      fontSize: '1rem',
                      lineHeight: 1.6,
                      margin: 0,
                      fontWeight: 500
                    }}>
                      We maintain regular communication through scheduled calls, progress updates, 
                      and collaborative tools to keep you informed throughout the project.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h2 className="mb-4">Ready to Start Your Project?</h2>
              <p className="lead mb-4">
                Let's discuss your vision and see how we can help bring it to life. 
                Get in touch today to schedule a consultation.
              </p>
              <a href="#contact-form" className="btn btn-primary btn-lg">
                Start Your Project
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
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
          fontSize: '3.5rem',
          opacity: 0.08,
          animation: 'float 7s ease-in-out infinite'
        }}>📍</div>
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '7%',
          fontSize: '3rem',
          opacity: 0.06,
          animation: 'float 9s ease-in-out infinite reverse'
        }}>🗺️</div>
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

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Enhanced Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 18 }}>
              <div style={{
                background: 'rgba(64,169,255,0.13)',
                borderRadius: '50%',
                width: 60,
                height: 60,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 18px 0 rgba(25,118,210,0.10)',
                border: '2.5px solid rgba(25,118,210,0.10)',
                fontSize: 28,
                color: '#1976d2'
              }}>
                📍
              </div>
              <div>
                <h2 style={{
                  fontWeight: 800,
                  fontSize: '2.2rem',
                  color: '#1976d2',
                  margin: 0,
                  background: 'linear-gradient(135deg, #1976d2 0%, #43cea2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Our Location
                </h2>
                <p style={{
                  color: '#666',
                  fontSize: '1.1rem',
                  margin: '10px 0 0 0',
                  fontWeight: 500
                }}>
                  Visit us at our office in Motihari, Bihar. We're here to help you bring your ideas to life.
                </p>
              </div>
            </div>
          </div>

          <div className="row g-4 justify-content-center">
            <div className="col-lg-8">
              <div className="row g-4 align-items-stretch">
                <div className="col-md-6">
                  <div style={{
                    background: 'rgba(255,255,255,0.8)',
                    borderRadius: 20,
                    padding: '2rem',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 8px 32px 0 rgba(25,118,210,0.12)',
                    border: '2px solid rgba(25,118,210,0.10)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    height: '100%'
                  }}>
                    <div style={{
                      background: 'rgba(64,169,255,0.13)',
                      borderRadius: '50%',
                      width: 44,
                      height: 44,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid rgba(25,118,210,0.1)',
                      color: '#1976d2',
                      fontSize: 18,
                      marginBottom: 16
                    }}>
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <h5 style={{fontWeight: 700, color: '#1976d2', marginBottom: 10, fontSize: '1.15rem'}}>Office Address</h5>
                    <p style={{fontSize: '1.05rem', fontWeight: 500, margin: 0, color: '#333', lineHeight: 1.5}}>
                      Creova Technologies<br />
                      Motihari, Bihar 845401<br />
                      India
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div style={{
                    background: 'rgba(255,255,255,0.8)',
                    borderRadius: 20,
                    padding: '2rem',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 8px 32px 0 rgba(25,118,210,0.12)',
                    border: '2px solid rgba(25,118,210,0.10)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    height: '100%'
                  }}>
                    <div style={{
                      background: 'rgba(64,169,255,0.13)',
                      borderRadius: '50%',
                      width: 44,
                      height: 44,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid rgba(25,118,210,0.1)',
                      color: '#1976d2',
                      fontSize: 18,
                      marginBottom: 16
                    }}>
                      <i className="fas fa-clock"></i>
                    </div>
                    <h5 style={{fontWeight: 700, color: '#1976d2', marginBottom: 10, fontSize: '1.15rem'}}>Business Hours</h5>
                    <p style={{fontSize: '1.05rem', fontWeight: 500, margin: 0, color: '#333', lineHeight: 1.5}}>
                      Monday - Friday<br />
                      9:00 AM - 6:00 PM IST
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center mt-4">
            <div className="col-lg-10">
              <div className="card glass-card p-2" style={{overflow: 'hidden', borderRadius: 20, boxShadow: '0 8px 32px 0 rgba(25,118,210,0.12)', border: '2px solid rgba(25,118,210,0.10)'}}>
                <iframe
                  title="Creova Technologies Motihari Bihar Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.964964357328!2d84.9166013150126!3d26.65537178324116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39935c1e2e2e2e2e%3A0x7e3e3e3e3e3e3e3e!2sMotihari%2C%20Bihar%20845401!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                  width="100%"
                  height="320"
                  style={{border: 0, borderRadius: 16}}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 