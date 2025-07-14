import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { APP_CONSTANTS } from '../constants';
import HeroSection from '../components/HeroSection';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'software', name: 'Software Solutions' },
    { id: 'mobile', name: 'Mobile Apps' },
    { id: 'web', name: 'Web Applications' },
    { id: 'ai', name: 'AI & ML' },
    { id: 'cloud', name: 'Cloud Services' }
  ];

  const products = [
    {
      id: 1,
      name: 'Enterprise Resource Planning',
      tagline: 'Comprehensive business management solution',
      description: 'Streamline your business operations with our integrated ERP system. Manage inventory, finances, human resources, and customer relationships from a single platform.',
      price: 'Starting from $999/month',
      category: 'software',
      features: ['Inventory Management', 'Financial Planning', 'HR Management', 'CRM Integration'],
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80' // ERP/office dashboard
    },
    {
      id: 2,
      name: 'Mobile Banking App',
      tagline: 'Secure and intuitive banking experience',
      description: 'Modern mobile banking application with advanced security features, real-time transactions, and seamless user experience across all devices.',
      price: 'Starting from $499/month',
      category: 'mobile',
      features: ['Secure Authentication', 'Real-time Transactions', 'Bill Payments', 'Investment Tracking'],
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80' // Mobile Banking: phone with banking/payment app
    },
    {
      id: 3,
      name: 'E-commerce Platform',
      tagline: 'Complete online retail solution',
      description: 'Scalable e-commerce platform with advanced features for online retail businesses. Includes inventory management, payment processing, and analytics.',
      price: 'Starting from $799/month',
      category: 'web',
      features: ['Product Management', 'Payment Gateway', 'Order Processing', 'Analytics Dashboard'],
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=400&q=80' // E-commerce: online shopping/cart
    },
    {
      id: 4,
      name: 'AI-Powered Analytics',
      tagline: 'Intelligent business insights',
      description: 'Advanced analytics platform powered by artificial intelligence. Get predictive insights, automated reporting, and data-driven decision making.',
      price: 'Starting from $1299/month',
      category: 'ai',
      features: ['Predictive Analytics', 'Automated Reporting', 'Data Visualization', 'Machine Learning'],
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80' // AI Analytics: AI brain with data overlays
    },
    {
      id: 5,
      name: 'Cloud Migration Service',
      tagline: 'Seamless cloud transformation',
      description: 'Professional cloud migration services to help businesses transition to cloud infrastructure with minimal downtime and maximum efficiency.',
      price: 'Starting from $2999/project',
      category: 'cloud',
      features: ['Infrastructure Assessment', 'Migration Planning', 'Data Transfer', 'Performance Optimization'],
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80' // Cloud
    },
    {
      id: 6,
      name: 'Customer Support System',
      tagline: 'Enhanced customer experience',
      description: 'Comprehensive customer support platform with ticketing system, live chat, knowledge base, and customer feedback management.',
      price: 'Starting from $399/month',
      category: 'software',
      features: ['Ticket Management', 'Live Chat', 'Knowledge Base', 'Customer Feedback'],
      image: 'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=400&q=80' // Customer support
    }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="products-page">
      {/* Hero Section */}
      <HeroSection
        title="Our Products & Solutions"
        subtitle="Innovative software solutions designed to transform your business operations and drive growth in the digital age."
        buttons={[
          { label: 'Get Started', href: '/contact', primary: true },
          { label: 'View Services', href: '/services', primary: false }
        ]}
        backgroundType="animated"
      />

      {/* Category Filter */}
      <section className="section position-relative" style={{overflow: 'hidden', background: 'linear-gradient(135deg, #e3f0fc 0%, #f8fbff 100%)'}}>
        {/* Soft animated SVG background */}
        <svg width="100%" height="100%" style={{position: 'absolute', top: 0, left: 0, zIndex: 0, opacity: 0.10, pointerEvents: 'none'}} viewBox="0 0 1440 320"><path fill="#1976d2" fillOpacity="0.13" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
        <div className="container position-relative" style={{zIndex: 1}}>
          <div className="text-center mb-5">
            <h2 className="text-gradient" style={{fontWeight: 700, fontSize: '2.1rem', letterSpacing: '-0.01em'}}>Browse by Category</h2>
            <p className="text-muted" style={{fontSize: '1.08rem'}}>Find the perfect solution for your business needs</p>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div style={{
                background: 'rgba(255,255,255,0.80)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
                borderRadius: 32,
                padding: '2.2rem 1.2rem',
                marginBottom: 24,
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1.5px solid rgba(255,255,255,0.28)',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '1.1rem',
                alignItems: 'center',
                transition: 'box-shadow 0.2s',
              }}>
                {categories.map(category => {
                  let icon, iconBg, borderGrad;
                  switch (category.id) {
                    case 'all':
                      icon = <i className="fas fa-th-large"></i>;
                      iconBg = 'linear-gradient(135deg, #1976d2 0%, #40a9ff 100%)';
                      borderGrad = 'linear-gradient(120deg, #1976d2 40%, #40a9ff 100%)';
                      break;
                    case 'software':
                      icon = <i className="fas fa-laptop-code"></i>;
                      iconBg = 'linear-gradient(135deg, #1976d2 0%, #40a9ff 100%)';
                      borderGrad = 'linear-gradient(120deg, #1976d2 40%, #40a9ff 100%)';
                      break;
                    case 'mobile':
                      icon = <i className="fas fa-mobile-alt"></i>;
                      iconBg = 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)';
                      borderGrad = 'linear-gradient(120deg, #43cea2 40%, #185a9d 100%)';
                      break;
                    case 'web':
                      icon = <i className="fas fa-globe"></i>;
                      iconBg = 'linear-gradient(135deg, #ff9800 0%, #ffc107 100%)';
                      borderGrad = 'linear-gradient(120deg, #ff9800 40%, #ffc107 100%)';
                      break;
                    case 'ai':
                      icon = <i className="fas fa-robot"></i>;
                      iconBg = 'linear-gradient(135deg, #e53935 0%, #e35d5b 100%)';
                      borderGrad = 'linear-gradient(120deg, #e53935 40%, #e35d5b 100%)';
                      break;
                    case 'cloud':
                      icon = <i className="fas fa-cloud"></i>;
                      iconBg = 'linear-gradient(135deg, #00bcd4 0%, #43cea2 100%)';
                      borderGrad = 'linear-gradient(120deg, #00bcd4 40%, #43cea2 100%)';
                      break;
                    default:
                      icon = null;
                      iconBg = 'linear-gradient(135deg, #1976d2 0%, #40a9ff 100%)';
                      borderGrad = 'linear-gradient(120deg, #1976d2 40%, #40a9ff 100%)';
                  }
                  return (
                    <button
                      key={category.id}
                      className={`category-pill-btn${selectedCategory === category.id ? ' active' : ''}`}
                      style={{
                        border: '2.5px solid',
                        borderImage: `${borderGrad} 1`,
                        outline: 'none',
                        borderRadius: 999,
                        padding: '0.7rem 1.6rem 0.7rem 1.1rem',
                        fontWeight: 600,
                        fontSize: '1.08rem',
                        background: category.id === 'all' ? 'transparent' : (selectedCategory === category.id ? borderGrad : 'rgba(255,255,255,0.55)'),
                        color: category.id === 'all' ? '#1976d2' : (selectedCategory === category.id ? '#fff' : '#1976d2'),
                        boxShadow: selectedCategory === category.id ? '0 4px 18px #1976d233' : '0 1px 4px #1976d211',
                        transition: 'all 0.18s',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        borderBottom: selectedCategory === category.id ? '3px solid #1976d2' : '3px solid transparent',
                        letterSpacing: '0.01em',
                        marginBottom: 4,
                        position: 'relative',
                        minWidth: 180,
                        boxSizing: 'border-box',
                        overflow: 'visible',
                      }}
                      onClick={() => setSelectedCategory(category.id)}
                      aria-label={`Filter products by ${category.name}`}
                      aria-pressed={selectedCategory === category.id}
                    >
                      <span style={{
                        width: 38,
                        height: 38,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(64,169,255,0.13)',
                        borderRadius: '50%',
                        boxShadow: '0 4px 18px 0 rgba(25,118,210,0.10)',
                        border: '2px solid rgba(25,118,210,0.10)',
                        fontSize: 22,
                        color: '#1976d2',
                        animation: selectedCategory === category.id ? 'floatY 2.5s ease-in-out infinite' : 'none',
                        filter: 'drop-shadow(0 0 8px #40a9ff55)'
                      }}>{icon}</span>
                      <span>{category.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        {/* Section hover/animation styles */}
        <style>{`
          .category-pill-btn:hover {
            box-shadow: 0 8px 32px 0 rgba(25, 118, 210, 0.18) !important;
            transform: translateY(-4px) scale(1.04);
            border: 2.5px solid #40a9ff99 !important;
            z-index: 2;
          }
        `}</style>
      </section>

      {/* Products Grid */}
      <section className="section">
        <div className="container">
          <div className="row">
            {filteredProducts.map(product => (
              <div key={product.id} className="col-lg-6 mb-4">
                <div className="product-card glass-card enhanced-product-card position-relative" style={{overflow: 'visible'}}>
                  {/* Animated Accent Icon */}
                  <div className="product-floating-icon" aria-hidden="true" style={{
                    position: 'absolute',
                    top: -28,
                    right: 24,
                    zIndex: 2,
                    fontSize: 40,
                    filter: 'drop-shadow(0 2px 8px rgba(25,118,210,0.10))',
                    animation: 'floatY 3.5s ease-in-out infinite',
                    pointerEvents: 'none',
                  }}>
                    {/* Choose icon based on category */}
                    {product.category === 'software' && <i className="fas fa-laptop-code text-primary"></i>}
                    {product.category === 'mobile' && <i className="fas fa-mobile-alt text-success"></i>}
                    {product.category === 'web' && <i className="fas fa-globe text-warning"></i>}
                    {product.category === 'ai' && <i className="fas fa-robot text-danger"></i>}
                    {product.category === 'cloud' && <i className="fas fa-cloud text-info"></i>}
                  </div>
                  <div className="card border-0 shadow-sm h-100" style={{
                    background: 'rgba(255,255,255,0.92)',
                    borderRadius: 24,
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
                    border: '2.5px solid',
                    borderImage: (
                      product.category === 'software' ? 'linear-gradient(120deg, #1976d2 40%, #40a9ff 100%) 1' :
                      product.category === 'mobile' ? 'linear-gradient(120deg, #43cea2 40%, #185a9d 100%) 1' :
                      product.category === 'web' ? 'linear-gradient(120deg, #ff9800 40%, #ffc107 100%) 1' :
                      product.category === 'ai' ? 'linear-gradient(120deg, #e53935 40%, #e35d5b 100%) 1' :
                      product.category === 'cloud' ? 'linear-gradient(120deg, #00bcd4 40%, #43cea2 100%) 1' :
                      'linear-gradient(120deg, #1976d2 40%, #40a9ff 100%) 1'
                    ),
                    overflow: 'hidden',
                    position: 'relative',
                    transition: 'box-shadow 0.25s, transform 0.25s, border 0.25s',
                  }}>
                    {/* Gradient Accent Border */}
                    <div style={{
                      position: 'absolute',
                      top: 0, left: 0, right: 0, height: 6,
                      background: (
                        product.category === 'software' ? 'linear-gradient(90deg, #1976d2 0%, #40a9ff 100%)' :
                        product.category === 'mobile' ? 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)' :
                        product.category === 'web' ? 'linear-gradient(90deg, #ff9800 0%, #ffc107 100%)' :
                        product.category === 'ai' ? 'linear-gradient(90deg, #e53935 0%, #e35d5b 100%)' :
                        product.category === 'cloud' ? 'linear-gradient(90deg, #00bcd4 0%, #43cea2 100%)' :
                        'linear-gradient(90deg, #1976d2 0%, #40a9ff 100%)'
                      ),
                      opacity: 0.18,
                      borderTopLeftRadius: 24,
                      borderTopRightRadius: 24,
                    }}></div>
                    <div className="row g-0">
                      <div className="col-md-4 d-flex align-items-center justify-content-center" style={{background: 'linear-gradient(135deg, #e3f0fc 0%, #f8fbff 100%)', borderTopLeftRadius: 24, borderBottomLeftRadius: 24, minHeight: 180, position: 'relative'}}>
                        {product.image ? (
                          <img 
                            src={product.image} 
                            className="img-fluid rounded-start h-100 enhanced-product-img" 
                            alt={product.name}
                            style={{ objectFit: 'cover', borderRadius: 18, boxShadow: '0 2px 12px rgba(25,118,210,0.07)' }}
                            onError={e => { e.target.onerror = null; e.target.style.display = 'none'; e.target.parentNode.querySelector('.product-fallback-icon').style.display = 'flex'; }}
                          />
                        ) : null}
                        {/* Fallback Icon if image is missing or fails to load */}
                        <div className="product-fallback-icon" style={{
                          display: product.image ? 'none' : 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '100%',
                          height: '100%',
                          minHeight: 120,
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          zIndex: 1,
                          background: 'linear-gradient(135deg, #e3f0fc 0%, #f8fbff 100%)',
                          borderTopLeftRadius: 24,
                          borderBottomLeftRadius: 24,
                          fontSize: 44,
                          color: '#1976d2',
                          animation: 'floatY 3.5s ease-in-out infinite',
                          transition: 'opacity 0.2s',
                        }}>
                          {product.category === 'software' && <i className="fas fa-laptop-code"></i>}
                          {product.category === 'mobile' && <i className="fas fa-mobile-alt"></i>}
                          {product.category === 'web' && <i className="fas fa-globe"></i>}
                          {product.category === 'ai' && <i className="fas fa-robot"></i>}
                          {product.category === 'cloud' && <i className="fas fa-cloud"></i>}
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="card-body" style={{padding: '1.5rem 1.2rem'}}>
                          <h5 className="card-title product-name mb-2" style={{fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.01em'}}>{product.name}</h5>
                          <p className="card-text product-tagline text-muted mb-2" style={{fontSize: '1.05rem'}}>{product.tagline}</p>
                          <p className="card-text product-description mb-3" style={{fontSize: '1rem'}}>{product.description}</p>
                          <div className="mb-3">
                            <h6 className="text-primary mb-2" style={{fontWeight: 600}}>Key Features:</h6>
                            <div className="row">
                              {product.features.map((feature, index) => (
                                <div key={index} className="col-6 mb-2 d-flex align-items-center">
                                  <i className="fas fa-check text-success me-2"></i>
                                  <small className="text-muted">{feature}</small>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mt-2">
                            <span className="product-price" style={{fontSize: '1.08rem'}}>{product.price}</span>
                            <Link to="/contact" className="btn btn-primary btn-sm px-3 shadow-sm" style={{borderRadius: 16, fontWeight: 600}} aria-label={`Learn More about ${product.name}`}>
                              Learn More
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Products */}
      <section className="section position-relative" style={{overflow: 'hidden', background: 'linear-gradient(135deg, #e3f0fc 0%, #f8fbff 100%)'}}>
        {/* Soft animated SVG background */}
        <svg width="100%" height="100%" style={{position: 'absolute', top: 0, left: 0, zIndex: 0, opacity: 0.10, pointerEvents: 'none'}} viewBox="0 0 1440 320"><path fill="#1976d2" fillOpacity="0.13" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
        <div className="container position-relative" style={{zIndex: 1}}>
          <div className="section-title text-center mb-4">
            <h2 className="text-gradient" style={{fontWeight: 700, fontSize: '2.2rem', letterSpacing: '-0.01em'}}>Why Choose Our Products?</h2>
            <p style={{fontSize: '1.13rem', color: '#4a5a6a', fontWeight: 500, marginBottom: 8}}>
              Built with enterprise-grade technology and designed for scalability
            </p>
          </div>
          <div className="row justify-content-center g-4">
            {/* Feature 1 */}
            <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
              <div className="glass-card why-products-card position-relative h-100 text-center p-4" style={{borderRadius: 22, boxShadow: '0 8px 32px 0 rgba(25,118,210,0.10)', border: '2.5px solid', borderImage: 'linear-gradient(120deg, #1976d2 40%, #40a9ff 100%) 1', background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(12px)', transition: 'box-shadow 0.2s, transform 0.2s, border 0.2s', overflow: 'visible'}}>
                <div className="why-products-icon mb-3" style={{width: 64, height: 64, margin: '0 auto 1rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(64,169,255,0.13)', borderRadius: '50%', boxShadow: '0 4px 18px 0 rgba(25,118,210,0.10)', border: '2.5px solid rgba(25,118,210,0.10)', fontSize: 38, color: '#1976d2', animation: 'floatY 3.5s ease-in-out infinite', filter: 'drop-shadow(0 0 12px #40a9ff55)'}}>
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h5 className="card-title mb-2" style={{fontWeight: 700, fontSize: '1.18rem'}}>Enterprise Security</h5>
                <p className="card-text mb-0 text-muted">Bank-level security with encryption and compliance standards</p>
              </div>
            </div>
            {/* Feature 2 */}
            <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
              <div className="glass-card why-products-card position-relative h-100 text-center p-4" style={{borderRadius: 22, boxShadow: '0 8px 32px 0 rgba(25,118,210,0.10)', border: '2.5px solid', borderImage: 'linear-gradient(120deg, #1976d2 40%, #40a9ff 100%) 1', background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(12px)', transition: 'box-shadow 0.2s, transform 0.2s, border 0.2s', overflow: 'visible'}}>
                <div className="why-products-icon mb-3" style={{width: 64, height: 64, margin: '0 auto 1rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(64,169,255,0.13)', borderRadius: '50%', boxShadow: '0 4px 18px 0 rgba(25,118,210,0.10)', border: '2.5px solid rgba(25,118,210,0.10)', fontSize: 38, color: '#1976d2', animation: 'floatY 3.5s ease-in-out infinite', filter: 'drop-shadow(0 0 12px #40a9ff55)'}}>
                  <i className="fas fa-rocket"></i>
                </div>
                <h5 className="card-title mb-2" style={{fontWeight: 700, fontSize: '1.18rem'}}>Scalable Architecture</h5>
                <p className="card-text mb-0 text-muted">Built to grow with your business needs</p>
              </div>
            </div>
            {/* Feature 3 */}
            <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
              <div className="glass-card why-products-card position-relative h-100 text-center p-4" style={{borderRadius: 22, boxShadow: '0 8px 32px 0 rgba(25,118,210,0.10)', border: '2.5px solid', borderImage: 'linear-gradient(120deg, #1976d2 40%, #40a9ff 100%) 1', background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(12px)', transition: 'box-shadow 0.2s, transform 0.2s, border 0.2s', overflow: 'visible'}}>
                <div className="why-products-icon mb-3" style={{width: 64, height: 64, margin: '0 auto 1rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(64,169,255,0.13)', borderRadius: '50%', boxShadow: '0 4px 18px 0 rgba(25,118,210,0.10)', border: '2.5px solid rgba(25,118,210,0.10)', fontSize: 38, color: '#1976d2', animation: 'floatY 3.5s ease-in-out infinite', filter: 'drop-shadow(0 0 12px #40a9ff55)'}}>
                  <i className="fas fa-headset"></i>
                </div>
                <h5 className="card-title mb-2" style={{fontWeight: 700, fontSize: '1.18rem'}}>24/7 Support</h5>
                <p className="card-text mb-0 text-muted">Round-the-clock technical support and maintenance</p>
              </div>
            </div>
            {/* Feature 4 */}
            <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
              <div className="glass-card why-products-card position-relative h-100 text-center p-4" style={{borderRadius: 22, boxShadow: '0 8px 32px 0 rgba(25,118,210,0.10)', border: '2.5px solid', borderImage: 'linear-gradient(120deg, #1976d2 40%, #40a9ff 100%) 1', background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(12px)', transition: 'box-shadow 0.2s, transform 0.2s, border 0.2s', overflow: 'visible'}}>
                <div className="why-products-icon mb-3" style={{width: 64, height: 64, margin: '0 auto 1rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(64,169,255,0.13)', borderRadius: '50%', boxShadow: '0 4px 18px 0 rgba(25,118,210,0.10)', border: '2.5px solid rgba(25,118,210,0.10)', fontSize: 38, color: '#1976d2', animation: 'floatY 3.5s ease-in-out infinite', filter: 'drop-shadow(0 0 12px #40a9ff55)'}}>
                  <i className="fas fa-sync-alt"></i>
                </div>
                <h5 className="card-title mb-2" style={{fontWeight: 700, fontSize: '1.18rem'}}>Regular Updates</h5>
                <p className="card-text mb-0 text-muted">Continuous improvements and feature updates</p>
              </div>
            </div>
          </div>
          {/* Bilingual rural/tech quote at the bottom */}
        </div>
        {/* Section hover/animation styles */}
        <style>{`
          .why-products-card:hover {
            box-shadow: 0 16px 48px 0 rgba(25, 118, 210, 0.18) !important;
            transform: translateY(-4px) scale(1.03);
            border: 1.5px solid #40a9ff33;
          }
        `}</style>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2>Ready to Transform Your Business?</h2>
              <p className="mb-4">
                Get in touch with our team to discuss your requirements and find the perfect solution for your business.
              </p>
              <div className="d-flex gap-3 justify-content-center">
                <Link to="/contact" className="btn btn-primary btn-lg" aria-label="Request Demo for Our Products">
                      Request Demo
                </Link>
                <Link to="/careers" className="btn btn-outline-primary btn-lg" aria-label="Join Our Team at Creova">
                  Join Our Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products; 