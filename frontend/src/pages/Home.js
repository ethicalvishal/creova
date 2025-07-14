import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  APP_CONSTANTS, 
  MESSAGES, 
  getLaunchBadge, 
  getLaunchStatus, 
  isLaunched,
  getCompanyTagline,
  getCompanyDescription,
  getCTAButtonText,
  getCompanyStats,
  getPostLaunchTestimonials
} from '../constants';
import HeroSection from '../components/HeroSection';
import './HomeEnhanced.css'; // Add a new CSS file for enhanced styles
// Remove SVG imports for logos
// import reactLogo from '../assets/tech/react.svg';
// import nodeLogo from '../assets/tech/nodejs.svg';
// import pythonLogo from '../assets/tech/python.svg';
// import awsLogo from '../assets/tech/aws.svg';
// import dockerLogo from '../assets/tech/docker.svg';
// import mongoLogo from '../assets/tech/mongodb.svg';
// import postgresLogo from '../assets/tech/postgresql.svg';
// import redisLogo from '../assets/tech/redis.svg';

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  // const [currentFeature, setCurrentFeature] = useState(0); // if not used

  // Keep current testimonials as they are - will be updated when real success stories are available
  const testimonials = [
    {
      id: 1,
      name: "Vishal Singh",
      position: "Founder, Creova Technologies",
      content: "As a fresher, starting Creova has been an exciting journey of learning and building. I'm passionate about technology and helping startups get started.",
      rating: 5,
      avatar: "/images/vishal-singh.jpg"
    },
    {
      id: 2,
      name: "To Be Announced",
      position: "Startup Founder",
      content: "We're excited to share more success stories from our amazing clients after our official launch. Stay tuned for inspiring founder journeys!",
      rating: 5,
      avatar: "👨‍💼"
    },
    {
      id: 3,
      name: "To Be Announced",
      position: "Tech Entrepreneur",
      content: "More incredible success stories and founder testimonials will be published after our launch. We can't wait to share these amazing journeys with you!",
      rating: 5,
      avatar: "👩‍💻"
    }
  ];

  const conciseFeatures = [
    {
      id: 1,
      title: 'Super Fast Delivery',
      description: 'Launch your MVP in 2-4 weeks, not months. Speed is our competitive advantage.',
      icon: '⚡'
    },
    {
      id: 2,
      title: 'Founder-First',
      description: 'We treat every client like a co-founder. Your success is our mission.',
      icon: '🤝'
    },
    {
      id: 3,
      title: 'Expert Team',
      description: 'Built by ex-Google, IIT, and startup veterans. You get the best minds.',
      icon: '🧠'
    }
  ];

  // Enhance techStack array with taglines
  const techStack = [
    { name: 'React', category: 'Frontend', icon: '⚛️', tagline: 'Best for scalable UIs' },
    { name: 'Node.js', category: 'Backend', icon: '🟢', tagline: 'Fast, event-driven backend' },
    { name: 'Python', category: 'Backend', icon: '🐍', tagline: 'Great for rapid development' },
    { name: 'AWS', category: 'Cloud', icon: '☁️', tagline: 'Reliable cloud infrastructure' },
    { name: 'Docker', category: 'DevOps', icon: '🐳', tagline: 'Seamless containerization' },
    { name: 'MongoDB', category: 'Database', icon: '🍃', tagline: 'Flexible NoSQL storage' },
    { name: 'PostgreSQL', category: 'Database', icon: '🐘', tagline: 'Powerful relational DB' },
    { name: 'Redis', category: 'Cache', icon: '🔴', tagline: 'Ultra-fast caching' },
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Discovery',
      description: 'We understand your vision, market, and technical requirements in detail.',
      icon: '🔍'
    },
    {
      step: 2,
      title: 'Design',
      description: 'Create wireframes, prototypes, and user flows that prioritize user experience.',
      icon: '🎨'
    },
    {
      step: 3,
      title: 'Build',
      description: 'Develop your product using modern technologies and best practices.',
      icon: '⚙️'
    },
    {
      step: 4,
      title: 'Launch',
      description: 'Deploy to production and help you iterate based on user feedback.',
      icon: '🚀'
    }
  ];

  const services = [
    {
      id: 1,
      icon: "🚀",
      title: "MVP Development",
      description: "Get your startup idea to market in 2-4 weeks. We build fast, scalable MVPs that validate your business model and attract investors.",
      link: "/services#mvp",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      id: 2,
      icon: "🤖",
      title: "AI & Automation",
      description: "Leverage cutting-edge AI to automate processes, analyze data, and create intelligent solutions that give you a competitive edge.",
      link: "/services#ai",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      id: 3,
      icon: "📱",
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications that users love. From concept to App Store in record time.",
      link: "/services#mobile",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    {
      id: 4,
      icon: "🎨",
      title: "UI/UX Design",
      description: "Beautiful, intuitive interfaces that convert visitors into customers. Design that drives growth and engagement.",
      link: "/services#uiux",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
    },
    {
      id: 5,
      icon: "☁️",
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure that grows with your startup. From AWS to serverless, we've got you covered.",
      link: "/services#cloud",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
    },
    {
      id: 6,
      icon: "📊",
      title: "Growth Strategy",
      description: "Data-driven growth strategies and analytics to help your startup scale efficiently and sustainably.",
      link: "/services#growth",
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
    },
    // New Service 1
    {
      id: 7,
      icon: "🔒",
      title: "Cybersecurity",
      description: "Protect your business with advanced security solutions, audits, and compliance for peace of mind.",
      link: "/services#cybersecurity",
      gradient: "linear-gradient(135deg, #ff9966 0%, #ff5e62 100%)"
    },
    // New Service 2
    {
      id: 8,
      icon: "🛒",
      title: "E-Commerce Solutions",
      description: "Launch and scale your online store with robust, scalable, and conversion-optimized e-commerce platforms.",
      link: "/services#ecommerce",
      gradient: "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)"
    },
    // New Service 3
    {
      id: 9,
      icon: "🧩",
      title: "API Integrations",
      description: "Seamlessly connect your product with third-party services, payment gateways, and business tools.",
      link: "/services#api",
      gradient: "linear-gradient(135deg, #43cea2 0%, #185a9d 100%)"
    },
    {
      id: 10,
      icon: "⚙️",
      title: "DevOps & CI/CD",
      description: "Automate deployments, streamline development, and ensure reliability with modern DevOps and CI/CD pipelines.",
      link: "/services#devops",
      gradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)"
    },
    {
      id: 11,
      icon: "📈",
      title: "Data Engineering & Analytics",
      description: "Unlock insights and drive growth with scalable data pipelines, warehousing, and advanced analytics solutions.",
      link: "/services#data",
      gradient: "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)"
    }
  ];

  const topHomeServices = services.slice(0, 4);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });

    // Auto-rotate testimonials
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    // Auto-rotate features
    const featureInterval = setInterval(() => {
      // setCurrentFeature((prev) => (prev + 1) % conciseFeatures.length); // if not used
    }, 4000);

    return () => {
      clearInterval(testimonialInterval);
      clearInterval(featureInterval);
    };
  }, [testimonials.length, conciseFeatures.length]);

  return (
    <div className="home-page" style={{minHeight: '100vh'}}>
      {/* Animated SVG Gradient Background for Hero */}
      <div className="hero-bg-animated">
        <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="none" style={{position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none'}}>
            <defs>
            <linearGradient id="hero-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f2027" />
              <stop offset="50%" stopColor="#2c5364" />
              <stop offset="100%" stopColor="#00c9ff" />
            </linearGradient>
            <radialGradient id="hero-radial" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00c9ff" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#2c5364" stopOpacity="0.2" />
            </radialGradient>
            </defs>
          {/* Main gradient background */}
          <rect width="100%" height="100%" fill="url(#hero-gradient)" />
          {/* Animated wave overlay */}
          <path d="M0,800 Q480,1000 960,800 T1920,800 L1920,1080 L0,1080 Z" fill="url(#hero-radial)" opacity="0.6">
            <animate attributeName="d" dur="12s" repeatCount="indefinite"
              values="M0,800 Q480,1000 960,800 T1920,800 L1920,1080 L0,1080 Z;
                      M0,820 Q480,900 960,900 T1920,820 L1920,1080 L0,1080 Z;
                      M0,780 Q480,950 960,780 T1920,780 L1920,1080 L0,1080 Z;
                      M0,800 Q480,1000 960,800 T1920,800 L1920,1080 L0,1080 Z" />
          </path>
          {/* Floating particles */}
          <circle cx="200" cy="150" r="3" fill="rgba(255,255,255,0.3)">
            <animate attributeName="cy" values="150;100;150" dur="8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="8s" repeatCount="indefinite" />
          </circle>
          <circle cx="400" cy="200" r="2" fill="rgba(255,255,255,0.4)">
            <animate attributeName="cy" values="200;150;200" dur="10s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0.9;0.4" dur="10s" repeatCount="indefinite" />
          </circle>
          <circle cx="600" cy="120" r="4" fill="rgba(255,255,255,0.2)">
            <animate attributeName="cy" values="120;80;120" dur="6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.2;0.7;0.2" dur="6s" repeatCount="indefinite" />
          </circle>
          <circle cx="800" cy="180" r="2.5" fill="rgba(255,255,255,0.3)">
            <animate attributeName="cy" values="180;130;180" dur="9s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="9s" repeatCount="indefinite" />
          </circle>
          <circle cx="1000" cy="100" r="3.5" fill="rgba(255,255,255,0.25)">
            <animate attributeName="cy" values="100;60;100" dur="7s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.25;0.75;0.25" dur="7s" repeatCount="indefinite" />
          </circle>
          <circle cx="1200" cy="160" r="2" fill="rgba(255,255,255,0.35)">
            <animate attributeName="cy" values="160;110;160" dur="11s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.35;0.85;0.35" dur="11s" repeatCount="indefinite" />
          </circle>
          <circle cx="1400" cy="140" r="3" fill="rgba(255,255,255,0.3)">
            <animate attributeName="cy" values="140;90;140" dur="8.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="8.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="1600" cy="200" r="2.5" fill="rgba(255,255,255,0.25)">
            <animate attributeName="cy" values="200;150;200" dur="9.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.25;0.75;0.25" dur="9.5s" repeatCount="indefinite" />
          </circle>
          </svg>
        </div>
      <HeroSection
        title={isLaunched() ? 'Empowering Startups with Technology Solutions' : 'Building the Future of Startups'}
        subtitle={isLaunched() ? 'Creova Technologies provides comprehensive technology solutions to help startups launch, scale, and succeed in the digital age.' : "Creova Technologies is launching soon! We're building something amazing for founders and startups. Our journey is just beginning—stay tuned for updates and early access."}
        buttons={[
          { label: isLaunched() ? 'Get Started' : APP_CONSTANTS.NOTIFY_ME, href: '/contact', primary: true },
          { label: 'Learn More', href: '/about', primary: false }
        ]}
        backgroundType="animated"
      >
      </HeroSection>

      {/* Why Choose Us Section */}
      <section className="section position-relative" style={{overflow: 'hidden'}}>
        {/* Soft animated SVG background */}
        <svg width="100%" height="100%" style={{position: 'absolute', top: 0, left: 0, zIndex: 0, opacity: 0.10, pointerEvents: 'none'}} viewBox="0 0 1440 320"><path fill="#1976d2" fillOpacity="0.13" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
        <div className="container position-relative" style={{zIndex: 1}}>
          {/* Gradient divider above section */}
          <div className="gradient-divider" style={{height: 5, width: '100%', background: 'linear-gradient(90deg, #1976d2 0%, #40a9ff 100%)', borderRadius: 8, margin: '0 auto 36px auto', opacity: 0.18}}></div>
          <div className="section-title text-center mb-4">
            <h2 className="text-gradient" style={{fontWeight: 700, fontSize: '2.2rem', letterSpacing: '-0.01em'}}>Why Choose Creova?</h2>
            <p style={{fontSize: '1.13rem', color: '#4a5a6a', fontWeight: 500, marginBottom: 8}}>
              We're not just another tech company. Here's what sets us apart.
            </p>
          </div>
          <div className="row justify-content-center g-4">
            {conciseFeatures.map((feature, index) => (
              <div key={feature.id} className="col-lg-4 col-md-6 d-flex align-items-stretch">
                <div className="enhanced-tech-card glass-card why-creova-card position-relative h-100 text-center p-4" style={{borderRadius: 22, boxShadow: '0 8px 32px 0 rgba(25,118,210,0.10)', border: '2px solid transparent', transition: 'box-shadow 0.2s, transform 0.2s, border 0.2s', overflow: 'visible'}}>
                  {/* Animated glowing icon */}
                  <div className="enhanced-tech-icon mb-3" style={{width: 64, height: 64, margin: '0 auto 1rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(64,169,255,0.13)', borderRadius: '50%', boxShadow: '0 4px 18px 0 rgba(25,118,210,0.10)', border: '2.5px solid rgba(25,118,210,0.10)', fontSize: 38, color: '#1976d2', animation: 'floatY 3.5s ease-in-out infinite', filter: 'drop-shadow(0 0 12px #40a9ff55)'}}>
                    <span>{feature.icon}</span>
                  </div>
                  <h5 className="card-title mb-2" style={{fontWeight: 700, fontSize: '1.18rem'}}>{feature.title}</h5>
                  <p className="card-text mb-0" style={{fontSize: '1rem', color: '#5a5a5a'}}>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Tech quote at the bottom */}
          <div className="text-center mt-5" style={{fontWeight: 500, fontSize: '1.08rem', color: '#1976d2', opacity: 0.92}}>
            "Rooted in trust, growing with technology." <span role="img" aria-label="rocket">🚀</span>
          </div>
        </div>
      </section>
      {/* Add hover effect for .why-creova-card */}
      <style jsx>{`
        .why-creova-card:hover {
          box-shadow: 0 16px 48px 0 rgba(25, 118, 210, 0.18) !important;
          transform: translateY(-4px) scale(1.03);
          border: 1.5px solid #40a9ff33;
        }
        .tech-stack-card:hover {
          box-shadow: 0 16px 48px 0 rgba(25, 118, 210, 0.18) !important;
          transform: translateY(-4px) scale(1.03);
          border: 1.5px solid #40a9ff33;
        }
        .text-gradient {
          background: linear-gradient(90deg, #1976d2 60%, #40a9ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }
        .process-step-card:hover {
          box-shadow: 0 16px 48px 0 rgba(25, 118, 210, 0.18) !important;
          transform: translateY(-4px) scale(1.03);
          border: 1.5px solid #40a9ff33;
        }
        @keyframes floatY {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
      `}</style>

      {/* Technology Stack */}
      <section className="section bg-light tech-stack-section">
        <div className="container">
          <div className="section-title text-center mb-4">
            <h2 className="text-gradient" style={{fontWeight: 700, fontSize: '2.3rem', letterSpacing: '-0.01em', marginBottom: 8}}>Our Technology Stack</h2>
            <p style={{fontSize: '1.13rem', color: '#4a5a6a', fontWeight: 500, marginBottom: 32}}>
              We use the world’s most trusted technologies to build scalable, secure, and high-performance solutions for our clients.
            </p>
          </div>
          {/* Add a gradient divider above the section */}
          <div className="gradient-divider" style={{height: 5, width: '100%', background: 'linear-gradient(90deg, #1976d2 0%, #40a9ff 100%)', borderRadius: 8, margin: '0 auto 36px auto', opacity: 0.18}}></div>
                      <div className="row justify-content-center g-4" style={{display: 'flex', flexWrap: 'wrap'}}>
              {techStack.map((tech, index) => {
                // Determine if this tech should use blue icon color
                const blueIconTechs = ['React', 'MongoDB', 'PostgreSQL', 'Redis', 'Node.js', 'Python'];
                const iconColor = blueIconTechs.includes(tech.name) ? '#1976d2' : '#1976d2'; // All main techs blue for now
                return (
                  <div key={tech.name} className="col-lg-3 col-md-4 col-6" style={{display: 'flex', marginBottom: '1.5rem'}}>
                    <div
                      className="card text-center p-4 glass-card tech-stack-card aos-fade-up enhanced-tech-card w-100"
                      data-aos="fade-up"
                      data-aos-delay={index * 80}
                      style={{
                        borderRadius: 22,
                        boxShadow: '0 8px 32px 0 rgba(25,118,210,0.10)',
                        transition: 'box-shadow 0.2s, transform 0.2s, border 0.2s',
                        background: 'rgba(255,255,255,0.96)',
                        border: '2px solid transparent',
                        position: 'relative',
                        overflow: 'visible',
                        height: '320px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      {/* Animated gradient border overlay */}
                      <div className="enhanced-tech-card-border"></div>
                      <div className="tech-logo-container mb-3 enhanced-tech-icon" style={{
                        width: 70,
                        height: 70,
                        margin: '0 auto 1rem auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(64,169,255,0.10)',
                        borderRadius: '50%',
                        boxShadow: '0 4px 18px 0 rgba(25,118,210,0.10)',
                        border: '2.5px solid rgba(25,118,210,0.10)',
                        fontSize: 38,
                        color: iconColor,
                        transition: 'box-shadow 0.2s, border 0.2s, transform 0.2s',
                        position: 'relative',
                        overflow: 'hidden',
                        animation: 'floatY 3.5s ease-in-out infinite',
                        filter: 'drop-shadow(0 0 12px #40a9ff55)',
                      }}>
                        <span>{tech.icon}</span>
                      </div>
                      <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        <h6 className="card-title mb-1" style={{fontWeight: 700, fontSize: '1.18rem', color: '#162447'}}>{tech.name}</h6>
                        <small className="text-muted mb-2 d-block">{tech.category}</small>
                        <div style={{fontSize: '1.01rem', color: '#5a5a5a', fontWeight: 500}}>{
                          tech.name === 'React' ? 'Frontend Library' :
                          tech.name === 'Node.js' ? 'Backend Runtime' :
                          tech.name === 'Python' ? 'Backend Language' :
                          tech.name === 'AWS' ? 'Cloud Platform' :
                          tech.name === 'Docker' ? 'Containerization' :
                          tech.name === 'MongoDB' ? 'NoSQL Database' :
                          tech.name === 'PostgreSQL' ? 'Relational Database' :
                          tech.name === 'Redis' ? 'In-memory Cache' :
                          ''
                        }</div>
                        <div className="tech-tagline mt-2" style={{fontSize: '0.98rem', color: '#1976d2', fontWeight: 600, opacity: 0.92}}>{tech.tagline}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section">
        <div className="container">
          <div className="section-title text-center mb-4">
            <h2 className="text-gradient" style={{fontWeight: 700, fontSize: '2.2rem', letterSpacing: '-0.01em'}}>Our Process</h2>
            <p>Our proven methodology helps startups move from idea to launch efficiently.</p>
          </div>
          {/* Add a gradient divider above the process section */}
          <div className="gradient-divider" style={{height: 5, width: '100%', background: 'linear-gradient(90deg, #1976d2 0%, #40a9ff 100%)', borderRadius: 8, margin: '0 auto 36px auto', opacity: 0.18}}></div>
          <div className="row justify-content-center g-4">
            {processSteps.map((step, index) => (
              <div key={step.step} className="col-lg-3 col-md-6 d-flex align-items-stretch">
                <div
                  className="card h-100 text-center p-4 glass-card process-step-card enhanced-process-card position-relative"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  style={{
                    borderRadius: 22,
                    boxShadow: '0 8px 32px 0 rgba(25,118,210,0.10)',
                    transition: 'box-shadow 0.2s, transform 0.2s, border 0.2s',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.85) 60%, rgba(64,169,255,0.10) 100%)',
                    border: '2px solid transparent',
                    minHeight: 320,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    position: 'relative',
                    overflow: 'visible',
                  }}
                >
                  {/* Animated gradient border overlay */}
                  <div className="enhanced-process-card-border"></div>
                  {/* Floating/Glowing Icon */}
                  <div className="process-floating-icon enhanced-process-icon mb-2" aria-hidden="true" style={{
                    position: 'absolute',
                    top: 18,
                    right: 24,
                    zIndex: 2,
                    fontSize: 36,
                    filter: 'drop-shadow(0 0 16px #40a9ff55)',
                    animation: 'floatY 3.5s ease-in-out infinite',
                    pointerEvents: 'none',
                    opacity: 0.22
                  }}>
                    <span>{step.icon}</span>
                  </div>
                  {/* Gradient Accent Border */}
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, height: 6,
                    background: 'linear-gradient(90deg, #1976d2 0%, #40a9ff 100%)',
                    opacity: 0.13,
                    borderTopLeftRadius: 22,
                    borderTopRightRadius: 22,
                  }}></div>
                  {/* Step Number Badge */}
                  <div className="step-number mb-3 mx-auto d-flex align-items-center justify-content-center enhanced-process-step-number" style={{
                    width: 54,
                    height: 54,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #1976d2 60%, #40a9ff 100%)',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '1.5rem',
                    boxShadow: '0 2px 12px #1976d233',
                    marginTop: 8,
                    border: '3px solid #fff',
                    outline: '3px solid #40a9ff33',
                    textShadow: '0 2px 8px #1976d2aa',
                  }}>
                    {step.step}
                  </div>
                  <div className="service-icon mb-2 enhanced-process-icon-main" style={{background: 'rgba(64,169,255,0.13)', borderRadius: '50%', width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 38, boxShadow: '0 4px 18px 0 rgba(25,118,210,0.10)', border: '2.5px solid rgba(25,118,210,0.10)', margin: '0 auto', animation: 'floatY 3.5s ease-in-out infinite', filter: 'drop-shadow(0 0 12px #40a9ff55)'}}>
                    <span>{step.icon}</span>
                  </div>
                  <h5 className="card-title mb-2" style={{fontWeight: 700, fontSize: '1.13rem', color: '#162447'}}>{step.title}</h5>
                  <p className="card-text" style={{fontSize: '1.01rem', color: '#5a5a5a', fontWeight: 500}}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-title text-center mb-4">
            <h2 className="text-gradient" style={{fontWeight: 700, fontSize: '2.2rem', letterSpacing: '-0.01em'}}>
              <span role="img" aria-label="rocket">🚀</span> Our Services (Now Live!)
            </h2>
            <div className="gradient-divider" style={{margin: '0 auto 32px auto', width: '80%'}}></div>
            <p style={{fontSize: '1.13rem', color: '#4a5a6a', fontWeight: 500, marginBottom: 8}}>
              <span role="img" aria-label="gear">⚙️</span> Empowering startups with cutting-edge technology solutions
            </p>
            <p style={{color: '#5a5a5a', marginBottom: '2rem'}}>
              {isLaunched() 
                ? "We offer a comprehensive suite of technology services to help startups succeed."
                : "We're getting ready to launch a full suite of technology services for startups. Sign up to get notified when our services go live!"}
            </p>
          </div>
          <div className="row">
            {topHomeServices.map((service, index) => (
              <div key={service.id} className="col-lg-3 col-md-6 mb-4 d-flex align-items-stretch">
                <div className="enhanced-tech-card glass-card position-relative w-100" style={{cursor: 'pointer', minHeight: 320, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', transition: 'all 0.3s ease'}} 
                     onMouseEnter={e => e.currentTarget.classList.add('enhanced-tech-card-hover')}
                     onMouseLeave={e => e.currentTarget.classList.remove('enhanced-tech-card-hover')}>
                  <div className="enhanced-tech-card-border"></div>
                  <div className="card-body text-center p-4 d-flex flex-column">
                    <div className="service-icon mb-3 enhanced-tech-icon" style={{background: 'rgba(64,169,255,0.13)', borderRadius: '50%', width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 38, boxShadow: '0 4px 18px 0 rgba(25,118,210,0.10)', border: '2.5px solid rgba(25,118,210,0.10)', margin: '0 auto', animation: 'floatY 3.5s ease-in-out infinite', filter: 'drop-shadow(0 0 12px #40a9ff55)'}}>
                      <span>{service.icon}</span>
                    </div>
                    <h5 className="card-title mb-2" style={{fontWeight: 700, fontSize: '1.18rem'}}>{service.title}</h5>
                    <p className="card-text mb-0" style={{fontSize: '1rem', color: '#5a5a5a'}}>{service.description}</p>
                    <div className="mt-auto pt-3">
                      <span className="badge bg-warning text-dark">{getLaunchStatus()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/services" className="btn btn-primary btn-lg">
              View All Services
            </Link>
          </div>
          {/* Rural quote at the bottom */}
          <div className="text-center mt-5" style={{fontWeight: 500, fontSize: '1.08rem', color: '#1976d2', opacity: 0.92}}>
            <span>"Innovation is the bridge between rural dreams and global success."</span>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <div className="section-title text-center mb-4">
            <h2 className="text-gradient" style={{fontWeight: 700, fontSize: '2.2rem', letterSpacing: '-0.01em'}}>
              <span role="img" aria-label="heart">💝</span> What Our Clients Say
            </h2>
            <div className="gradient-divider" style={{margin: '0 auto 32px auto', width: '80%'}}></div>
            <p style={{fontSize: '1.13rem', color: '#4a5a6a', fontWeight: 500, marginBottom: 8}}>
              <span role="img" aria-label="village">🏘️</span> Hear from founders and entrepreneurs who have worked with us
            </p>
            <p style={{color: '#5a5a5a', marginBottom: '2rem'}}>
              Real stories from real founders who trusted us with their dreams
            </p>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="enhanced-tech-card glass-card position-relative" style={{minHeight: 280, padding: '2.5rem', cursor: 'pointer', transition: 'all 0.3s ease'}}
                   onMouseEnter={e => e.currentTarget.classList.add('enhanced-tech-card-hover')}
                   onMouseLeave={e => e.currentTarget.classList.remove('enhanced-tech-card-hover')}>
                <div className="enhanced-tech-card-border"></div>
                <div className="text-center">
                  {/* Floating Avatar with Glow */}
                  <div className="mb-4 position-relative">
                    <div className="enhanced-tech-icon" style={{
                      width: 100,
                      height: 100,
                      borderRadius: '50%',
                      background: 'rgba(64,169,255,0.13)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto',
                      boxShadow: '0 4px 18px 0 rgba(25,118,210,0.10)',
                      border: '3px solid rgba(25,118,210,0.10)',
                      animation: 'floatY 3.5s ease-in-out infinite',
                      filter: 'drop-shadow(0 0 12px #40a9ff55)',
                      position: 'relative',
                      zIndex: 2
                    }}>
                      {testimonials[currentTestimonial].avatar.startsWith('/') ? (
                        <img 
                          src={testimonials[currentTestimonial].avatar} 
                          alt={testimonials[currentTestimonial].name}
                          className="rounded-circle"
                          style={{width: '80px', height: '80px', objectFit: 'cover'}}
                        />
                      ) : (
                        <span style={{fontSize: '3rem'}}>{testimonials[currentTestimonial].avatar}</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Star Rating */}
                  <div className="mb-3">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <span key={i} style={{fontSize: '1.2rem', color: '#ffc107', filter: 'drop-shadow(0 0 8px #ffc10755)', marginRight: '2px'}}>⭐</span>
                    ))}
                  </div>
                  
                  {/* Quote Icon */}
                  <div className="mb-3" style={{fontSize: '2rem', color: '#1976d2', opacity: 0.3}}>
                    <span role="img" aria-label="quote">💬</span>
                  </div>
                  
                  {/* Testimonial Content */}
                  <p className="lead mb-4" style={{fontSize: '1.15rem', color: '#162447', fontWeight: 500, lineHeight: 1.7}}>
                    "{testimonials[currentTestimonial].content}"
                  </p>
                  
                  {/* Client Info */}
                  <div className="mb-2">
                    <h6 className="mb-1" style={{fontWeight: 700, fontSize: '1.1rem', color: '#1976d2'}}>
                      {testimonials[currentTestimonial].name}
                    </h6>
                    <small style={{color: '#5a5a5a', fontWeight: 500}}>
                      {testimonials[currentTestimonial].position}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Rural quote at the bottom */}
          <div className="text-center mt-5" style={{fontWeight: 500, fontSize: '1.08rem', color: '#1976d2', opacity: 0.92}}>
            <span>"Trust is the foundation of every successful partnership."</span>
          </div>
        </div>
      </section>

      {/* Life at Creova Section */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-title text-center mb-4">
            <h2 className="text-gradient" style={{fontWeight: 700, fontSize: '2.2rem', letterSpacing: '-0.01em'}}>
              <span role="img" aria-label="family">👨‍👩‍👧‍👦</span> Life at Creova
            </h2>
            <div className="gradient-divider" style={{margin: '0 auto 32px auto', width: '80%'}}></div>
            <p style={{fontSize: '1.13rem', color: '#4a5a6a', fontWeight: 500, marginBottom: 8}}>
              <span role="img" aria-label="heart">💝</span> Experience a culture of innovation, collaboration, and growth
            </p>
            <p style={{color: '#5a5a5a', marginBottom: '2rem'}}>
              We believe in empowering our team to do their best work and have fun along the way!
            </p>
          </div>
          <div className="row align-items-center g-4">
            <div className="col-lg-6 mb-4 mb-lg-0 d-flex align-items-stretch">
              <div className="enhanced-tech-card glass-card position-relative w-100" style={{minHeight: 320, padding: '2rem', transition: 'all 0.3s ease'}}
                   onMouseEnter={e => e.currentTarget.classList.add('enhanced-tech-card-hover')}
                   onMouseLeave={e => e.currentTarget.classList.remove('enhanced-tech-card-hover')}>
                <div className="enhanced-tech-card-border"></div>
                {/* Floating icon overlay */}
                <div className="enhanced-tech-icon" style={{position: 'absolute', top: 20, right: 20, zIndex: 3, background: 'rgba(64,169,255,0.13)', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, boxShadow: '0 4px 18px 0 rgba(25,118,210,0.10)', border: '2px solid rgba(25,118,210,0.10)', animation: 'floatY 3.5s ease-in-out infinite', filter: 'drop-shadow(0 0 8px #40a9ff55)'}}>
                  <span role="img" aria-label="camera">📸</span>
                </div>
                <div className="d-flex w-100 gap-3 life-creova-mosaic" style={{height: 260, minHeight: 200}}>
                  {/* Left large image with enhanced styling */}
                  <div className="flex-shrink-0 w-50 h-100 position-relative">
                    <div className="position-relative w-100 h-100" style={{borderRadius: 20, overflow: 'hidden', boxShadow: '0 8px 32px 0 rgba(25,118,210,0.15)'}}>
                      <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80" alt="Creova Team" className="img-fluid w-100 h-100" style={{objectFit: 'cover', height: '100%', minHeight: 120, borderRadius: 20, transition: 'transform 0.3s ease'}} />
                      {/* Gradient overlay */}
                      <div style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%', background: 'linear-gradient(transparent, rgba(25,118,210,0.1))', borderRadius: '0 0 20px 20px'}}></div>
                    </div>
                  </div>
                  {/* Right stacked images with enhanced styling */}
                  <div className="d-flex flex-column w-50 h-100 gap-3">
                    <div className="position-relative" style={{height: '50%', borderRadius: 20, overflow: 'hidden', boxShadow: '0 6px 24px 0 rgba(25,118,210,0.12)'}}>
                      <img src="https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80" alt="Office Culture" className="img-fluid w-100 h-100" style={{objectFit: 'cover', borderRadius: 20, transition: 'transform 0.3s ease'}} />
                      {/* Gradient overlay */}
                      <div style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(transparent, rgba(25,118,210,0.1))', borderRadius: '0 0 20px 20px'}}></div>
                    </div>
                    <div className="position-relative" style={{height: '50%', borderRadius: 20, overflow: 'hidden', boxShadow: '0 6px 24px 0 rgba(25,118,210,0.12)'}}>
                      <img src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=400&q=80" alt="Team Fun" className="img-fluid w-100 h-100" style={{objectFit: 'cover', borderRadius: 20, transition: 'transform 0.3s ease'}} />
                      {/* Gradient overlay */}
                      <div style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(transparent, rgba(25,118,210,0.1))', borderRadius: '0 0 20px 20px'}}></div>
                    </div>
                  </div>
                </div>
                {/* Image captions */}
                <div className="text-center mt-3">
                  <small style={{color: '#1976d2', fontWeight: 600, fontSize: '0.9rem'}}>
                    <span role="img" aria-label="team">👥</span> Our Amazing Team
                  </small>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="enhanced-tech-card glass-card position-relative h-100 d-flex flex-column justify-content-center" style={{minHeight: 320, padding: '2.5rem', transition: 'all 0.3s ease'}}
                   onMouseEnter={e => e.currentTarget.classList.add('enhanced-tech-card-hover')}
                   onMouseLeave={e => e.currentTarget.classList.remove('enhanced-tech-card-hover')}>
                <div className="enhanced-tech-card-border"></div>
                {/* Floating quote icon */}
                <div className="text-center mb-4">
                  <div className="enhanced-tech-icon" style={{background: 'rgba(64,169,255,0.13)', borderRadius: '50%', width: 72, height: 72, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 42, boxShadow: '0 6px 24px 0 rgba(25,118,210,0.15)', border: '3px solid rgba(25,118,210,0.10)', margin: '0 auto', animation: 'floatY 3.5s ease-in-out infinite', filter: 'drop-shadow(0 0 16px #40a9ff55)'}}>
                    <span role="img" aria-label="quote">💬</span>
                  </div>
                </div>
                <blockquote className="blockquote mb-4">
                  <p className="mb-0" style={{fontSize: '1.18rem', color: '#162447', fontWeight: 500, lineHeight: 1.7, textAlign: 'center'}}>"At Creova, every day is a new opportunity to learn, grow, and make an impact. The energy and support from the team is unmatched!"</p>
                  <footer className="blockquote-footer mt-3 text-center" style={{color: '#1976d2', fontWeight: 600, fontSize: '1rem'}}>
                    <span role="img" aria-label="star">⭐</span> Creova Team Member
                  </footer>
                </blockquote>
                <p className="mb-4 text-center" style={{color: '#5a5a5a', fontSize: '1.02rem', lineHeight: 1.6}}>We celebrate diversity, encourage creativity, and support each other like family. Join us and be part of something amazing!</p>
                <div className="mt-auto">
                  <h5 className="mb-3 text-center" style={{fontWeight: 700, color: '#1976d2', fontSize: '1.2rem'}}>
                    <span role="img" aria-label="star">⭐</span> Benefits at Creova
                  </h5>
                  <div className="row g-2">
                    <div className="col-md-6">
                      <ul className="list-unstyled mb-0">
                        <li className="mb-2" style={{color: '#5a5a5a', fontSize: '0.95rem'}}><i className="fas fa-check-circle text-success me-2" style={{filter: 'drop-shadow(0 0 4px #28a74555)'}}></i>Flexible work arrangements</li>
                        <li className="mb-2" style={{color: '#5a5a5a', fontSize: '0.95rem'}}><i className="fas fa-check-circle text-success me-2" style={{filter: 'drop-shadow(0 0 4px #28a74555)'}}></i>Continuous learning</li>
                        <li className="mb-2" style={{color: '#5a5a5a', fontSize: '0.95rem'}}><i className="fas fa-check-circle text-success me-2" style={{filter: 'drop-shadow(0 0 4px #28a74555)'}}></i>Team events & fun</li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul className="list-unstyled mb-0">
                        <li className="mb-2" style={{color: '#5a5a5a', fontSize: '0.95rem'}}><i className="fas fa-check-circle text-success me-2" style={{filter: 'drop-shadow(0 0 4px #28a74555)'}}></i>Health insurance</li>
                        <li className="mb-2" style={{color: '#5a5a5a', fontSize: '0.95rem'}}><i className="fas fa-check-circle text-success me-2" style={{filter: 'drop-shadow(0 0 4px #28a74555)'}}></i>Modern tools</li>
                        <li className="mb-2" style={{color: '#5a5a5a', fontSize: '0.95rem'}}><i className="fas fa-check-circle text-success me-2" style={{filter: 'drop-shadow(0 0 4px #28a74555)'}}></i>Inclusive culture</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Enhanced rural quote at the bottom */}
          <div className="text-center mt-5" style={{fontWeight: 500, fontSize: '1.1rem', color: '#1976d2', opacity: 0.92}}>
            <span role="img" aria-label="heart">💝</span> "Together we grow, together we succeed." <span role="img" aria-label="heart">💝</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h2 className="mb-4">
                {isLaunched() ? 'Ready to Build Something Amazing?' : getLaunchStatus()}
              </h2>
              <p className="lead mb-4">
                {isLaunched() 
                  ? "Let's discuss your project and see how we can help bring your vision to life. Get started with Creova today!"
                  : "We're getting ready to help founders and startups build something amazing. Sign up to get notified when we launch!"
                }
              </p>
              <div className="cta-buttons">
                <Link to="/contact" className="btn btn-primary btn-lg me-3 mb-3 shadow" style={{
                  background: 'linear-gradient(135deg, #1976d2 0%, #40a9ff 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 32px',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  boxShadow: '0 8px 24px 0 rgba(25,118,210,0.25)',
                  transition: 'all 0.3s ease',
                  transform: 'translateY(0)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px 0 rgba(25,118,210,0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px 0 rgba(25,118,210,0.25)';
                }}>
                  {isLaunched() ? 'Start Your Project' : APP_CONSTANTS.NOTIFY_ME}
                </Link>

                <Link to="/about" className="btn btn-outline-primary btn-lg mb-3 shadow" style={{
                  border: '2px solid #1976d2',
                  borderRadius: '12px',
                  padding: '12px 32px',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#1976d2',
                  background: 'rgba(25,118,210,0.05)',
                  transition: 'all 0.3s ease',
                  transform: 'translateY(0)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.background = 'rgba(25,118,210,0.1)';
                  e.currentTarget.style.boxShadow = '0 8px 24px 0 rgba(25,118,210,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'rgba(25,118,210,0.05)';
                  e.currentTarget.style.boxShadow = '0 4px 16px 0 rgba(25,118,210,0.15)';
                }}>
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

export default Home; 
