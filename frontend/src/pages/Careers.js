import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { APP_CONSTANTS } from '../constants';
import HeroSection from '../components/HeroSection';

const Careers = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [formJob, setFormJob] = useState(null);

  const jobCategories = [
    { id: 'all', name: 'All Positions' },
    { id: 'engineering', name: 'Engineering' },
    { id: 'design', name: 'Design' },
    { id: 'product', name: 'Product' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'sales', name: 'Sales' }
  ];

  const jobs = [
    {
      id: 1,
      title: 'Senior Full Stack Engineer',
      company: 'Creova Technologies',
      location: 'Motihari, Bihar 845401 (Remote/On-site)',
      type: 'Internship',
      category: 'internship',
      icon: '💻',
      description: "We're looking for a Senior Full Stack Engineer to join our team and help build innovative solutions for startups.",
      requirements: [
        'Open to freshers and experienced candidates',
        'Proficiency in React, Node.js, and Python',
        'Experience with cloud platforms (AWS, Azure, GCP) is a plus',
        'Strong problem-solving and communication skills'
      ],
      benefits: [
        'Competitive salary and equity',
        'Health, dental, and vision insurance',
        'Flexible work arrangements',
        'Professional development opportunities'
      ],
      postedDate: '2025-08-01'
    },
    {
      id: 2,
      title: 'UI/UX Designer',
      company: 'Creova Technologies',
      location: 'Motihari, Bihar 845401 (Remote/On-site)',
      type: 'Internship',
      category: 'internship',
      icon: '🎨',
      description: 'Join our design team to create beautiful, user-centered experiences that drive business growth.',
      requirements: [
        'Open to freshers and experienced candidates',
        'Proficiency in Figma, Sketch, or similar tools',
        'Experience with user research and testing is a plus',
        'Portfolio demonstrating user-centered design'
      ],
      benefits: [
        'Competitive salary and equity',
        'Health, dental, and vision insurance',
        'Flexible work arrangements',
        'Professional development opportunities'
      ],
      postedDate: '2025-08-10'
    },
    {
      id: 3,
      title: 'Product Manager',
      company: 'Creova Technologies',
      location: 'Motihari, Bihar 845401 (Remote/On-site)',
      type: 'Internship',
      category: 'internship',
      icon: '🧩',
      description: 'Lead product strategy and execution to help startups build successful products.',
      requirements: [
        'Open to freshers and experienced candidates',
        'Interest in product management and startups',
        'Strong analytical and strategic thinking',
        'Excellent communication and leadership skills'
      ],
      benefits: [
        'Competitive salary and equity',
        'Health, dental, and vision insurance',
        'Flexible work arrangements',
        'Professional development opportunities'
      ],
      postedDate: '2025-08-15'
    },
    {
      id: 4,
      title: 'Growth Marketing Manager',
      company: 'Creova Technologies',
      location: 'Motihari, Bihar 845401 (Remote/On-site)',
      type: 'Internship',
      category: 'internship',
      icon: '📈',
      description: 'Drive growth through data-driven marketing strategies and campaigns.',
      requirements: [
        'Open to freshers and experienced candidates',
        'Interest in growth marketing and digital channels',
        'Strong analytical skills and data-driven approach',
        'Experience with marketing automation tools is a plus'
      ],
      benefits: [
        'Competitive salary and equity',
        'Health, dental, and vision insurance',
        'Flexible work arrangements',
        'Professional development opportunities'
      ],
      postedDate: '2025-08-20'
    },
    // New positions added below
    {
      id: 5,
      title: 'DevOps Engineer',
      company: 'Creova Technologies',
      location: 'Motihari, Bihar 845401 (Remote/On-site)',
      type: 'Internship',
      category: 'internship',
      icon: '⚙️',
      description: 'Automate, optimize, and scale our cloud infrastructure. Work with CI/CD, Docker, and AWS.',
      requirements: [
        'Open to freshers and experienced candidates',
        'Interest in DevOps, AWS, Docker, and CI/CD pipelines',
        'Scripting skills (Bash, Python) are a plus',
        'Good communication and troubleshooting skills'
      ],
      benefits: [
        'Remote work flexibility',
        'Learning budget',
        'Health insurance',
        'Stock options'
      ],
      postedDate: '2025-08-25'
    },
    {
      id: 6,
      title: 'Content Writer',
      company: 'Creova Technologies',
      location: 'Motihari, Bihar 845401 (Remote/On-site)',
      type: 'Internship',
      category: 'internship',
      icon: '✍️',
      description: 'Craft engaging blog posts, website copy, and social media content for our brand.',
      requirements: [
        'Open to freshers and experienced candidates',
        'Excellent written English',
        'Creativity and attention to detail',
        'Portfolio of published work is a plus'
      ],
      benefits: [
        'Flexible hours',
        'Remote work',
        'Opportunity to work with a fast-growing startup'
      ],
      postedDate: '2025-08-28'
    },
    {
      id: 7,
      title: 'Customer Success Manager',
      company: 'Creova Technologies',
      location: 'Motihari, Bihar 845401 (Remote/On-site)',
      type: 'Internship',
      category: 'internship',
      icon: '🤝',
      description: 'Build relationships with clients, ensure satisfaction, and help them succeed with our products.',
      requirements: [
        'Open to freshers and experienced candidates',
        'Excellent communication and empathy',
        'Interest in SaaS products',
        'Problem-solving mindset'
      ],
      benefits: [
        'Performance bonuses',
        'Remote work',
        'Health insurance',
        'Learning opportunities'
      ],
      postedDate: '2025-09-01'
    },
    {
      id: 8,
      title: 'QA Engineer',
      company: 'Creova Technologies',
      location: 'Motihari, Bihar 845401 (Remote/On-site)',
      type: 'Internship',
      category: 'internship',
      icon: '🧪',
      description: 'Ensure product quality with automated and manual testing. Collaborate with devs to deliver bug-free releases.',
      requirements: [
        'Open to freshers and experienced candidates',
        'Interest in QA or software testing',
        'Experience with Selenium or Cypress is a plus',
        'Good communication skills'
      ],
      benefits: [
        'Remote work',
        'Learning budget',
        'Health insurance',
        'Flexible hours'
      ],
      postedDate: '2025-09-05'
    },
    {
      id: 9,
      title: 'Frontend Developer',
      company: 'Creova Technologies',
      location: 'Motihari, Bihar 845401 (Remote/On-site)',
      type: 'Internship',
      category: 'internship',
      icon: '🌐',
      description: 'Build beautiful, performant UIs with React. Work closely with designers and backend engineers.',
      requirements: [
        'Open to freshers and experienced candidates',
        'Strong React/JS/HTML/CSS skills',
        'Experience with REST APIs is a plus',
        'Portfolio of web projects is a plus'
      ],
      benefits: [
        'Remote work',
        'Modern tech stack',
        'Health insurance',
        'Stock options'
      ],
      postedDate: '2025-09-10'
    },
    {
      id: 10,
      title: 'HR Manager',
      company: 'Creova Technologies',
      location: 'Motihari, Bihar 845401 (Remote/On-site)',
      type: 'Internship',
      category: 'internship',
      icon: '🧑‍💼',
      description: 'Lead hiring, onboarding, and employee engagement. Shape our company culture and support team growth.',
      requirements: [
        'Open to freshers and experienced candidates',
        'Interest in HR or people operations',
        'Strong organizational skills',
        'Empathy and communication'
      ],
      benefits: [
        'Remote work',
        'Flexible hours',
        'Health insurance',
        'Learning budget'
      ],
      postedDate: '2025-09-15'
    },
    {
      id: 11,
      title: 'Data Analyst',
      company: 'Creova Technologies',
      location: 'Motihari, Bihar 845401 (Remote/On-site)',
      type: 'Internship',
      category: 'internship',
      icon: '📊',
      description: 'Analyze data, generate insights, and help drive business decisions. Work with product and marketing teams.',
      requirements: [
        'Open to freshers and experienced candidates',
        'Interest in data analysis',
        'Experience with SQL and BI tools is a plus',
        'Ability to present findings clearly'
      ],
      benefits: [
        'Remote work',
        'Learning budget',
        'Health insurance',
        'Flexible hours'
      ],
      postedDate: '2025-09-20'
    }
  ];

  const filteredJobs = selectedCategory === 'all' 
    ? jobs 
    : jobs.filter(job => job.category === selectedCategory);

  const companyValues = [
    {
      icon: '🚀',
      title: 'Innovation',
      description: 'We encourage creative thinking and innovative solutions to complex problems.'
    },
    {
      icon: '🤝',
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and cross-functional collaboration.'
    },
    {
      icon: '📈',
      title: 'Growth',
      description: 'We invest in our people\'s growth through learning and development opportunities.'
    },
    {
      icon: '⚖️',
      title: 'Balance',
      description: 'We promote work-life balance and flexible work arrangements.'
    }
  ];

  const benefits = [
    'Competitive salary and equity packages',
    'Comprehensive health, dental, and vision insurance',
    'Flexible work arrangements and remote options',
    'Professional development and learning opportunities',
    'Modern tools and technology',
    'Regular team events and activities',
    'Generous paid time off',
    '401(k) matching program'
  ];

  const ApplicationModal = ({ job, onClose }) => {
    const [form, setForm] = useState({ name: '', email: '', phone: '', position: job?.title || '', dob: '', address: '', message: '', source: '' });
    const [status, setStatus] = useState(null); // success or error
    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
    const handleSubmit = e => {
      e.preventDefault();
      setStatus('success');
      setTimeout(() => {
        setStatus(null);
        onClose();
      }, 1200);
    };
    if (!job) return null;
    const internshipTitles = Array.from(new Set(jobs.map(j => j.title)));
    return (
      <div className="add-user-modal-animate" style={{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.35)', zIndex: 1050, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div className="card border-0 shadow-lg" style={{ borderRadius: '22px', overflow: 'hidden', maxWidth: 640, width: '100%', maxHeight: '80vh', border: '1.5px solid #e0e7ef', boxShadow: '0 12px 32px rgba(67,206,162,0.13), 0 2px 8px rgba(0,0,0,0.08)', background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(10px)', display: 'flex', flexDirection: 'column' }}>
          <div className="card-header border-0 p-4 position-relative" style={{ background: 'linear-gradient(90deg, #43cea2 0%, #1976d2 100%)', overflow: 'hidden' }}>
            <button type="button" className="btn-close position-absolute top-0 end-0 m-3" aria-label="Close" style={{zIndex:2}} onClick={onClose}></button>
            <div className="d-flex align-items-center position-relative">
              <div className="bg-white rounded-circle p-3 me-3" style={{border: '1px solid rgba(255,255,255,0.2)'}}>
                <span style={{fontSize: '2rem', color: '#43cea2'}}>{job.icon}</span>
              </div>
              <div>
                <h5 className="modal-title mb-1 fw-bold text-white" style={{fontSize: '1.3rem'}}>Apply for Internship</h5>
                <small className="opacity-90 text-white">{job.title}</small>
              </div>
            </div>
          </div>
          <div className="dropdown-divider my-0" style={{height:'2px', background:'linear-gradient(90deg, #43cea2 0%, #1976d2 100%)', opacity:0.12}}></div>
          <div className="card-body p-4" style={{background: '#fafbfc', overflowY: 'auto'}}>
            {status === 'error' && (
              <div className="alert border-0 mb-3" style={{ borderRadius: '12px', background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)', color: 'white', boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)', fontSize: '0.95rem' }}>
                <i className="fas fa-exclamation-triangle me-2"></i>
                <strong>Error:</strong> Something went wrong. Please try again.
              </div>
            )}
            {status === 'success' && (
              <div className="alert border-0 mb-3" style={{ borderRadius: '12px', background: 'linear-gradient(135deg, #38ef7d 0%, #11998e 100%)', color: 'white', boxShadow: '0 4px 15px rgba(56, 239, 125, 0.3)', fontSize: '0.95rem' }}>
                <i className="fas fa-check-circle me-2"></i>
                Application submitted successfully!
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold text-dark mb-1">
                    <i className="fas fa-user me-2" style={{color:'#43cea2'}}></i>
                    Full Name *</label>
                  <input className="form-control border-0 shadow-sm" name="name" value={form.name} onChange={handleChange} required placeholder="Your Name" style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s' }} />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold text-dark mb-1">
                    <i className="fas fa-envelope me-2" style={{color:'#43cea2'}}></i>
                    Email *</label>
                  <input className="form-control border-0 shadow-sm" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@email.com" style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s' }} />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold text-dark mb-1">
                    <i className="fas fa-phone me-2" style={{color:'#43cea2'}}></i>
                    Phone Number *</label>
                  <input className="form-control border-0 shadow-sm" name="phone" type="tel" value={form.phone} onChange={handleChange} required placeholder="e.g. 9876543210" style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s' }} />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold text-dark mb-1">
                    <i className="fas fa-briefcase me-2" style={{color:'#43cea2'}}></i>
                    Internship Position *</label>
                  <select className="form-select border-0 shadow-sm" name="position" value={form.position} onChange={handleChange} required style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s' }}>
                    {internshipTitles.map(title => (
                      <option key={title} value={title}>{title}</option>
                    ))}
                  </select>
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold text-dark mb-1">
                    <i className="fas fa-calendar-alt me-2" style={{color:'#43cea2'}}></i>
                    Date of Birth</label>
                  <input className="form-control border-0 shadow-sm" name="dob" type="date" value={form.dob} onChange={handleChange} placeholder="YYYY-MM-DD" style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s' }} />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold text-dark mb-1">
                    <i className="fas fa-map-marker-alt me-2" style={{color:'#43cea2'}}></i>
                    Address</label>
                  <input className="form-control border-0 shadow-sm" name="address" value={form.address} onChange={handleChange} placeholder="Your Address" style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s' }} />
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold text-dark mb-1">
                    <i className="fas fa-info-circle me-2" style={{color:'#43cea2'}}></i>
                    How did you hear about us?</label>
                  <input className="form-control border-0 shadow-sm" name="source" value={form.source} onChange={handleChange} placeholder="e.g. LinkedIn, College, Friend, etc." style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s' }} />
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold text-dark mb-1">
                    <i className="fas fa-comment-dots me-2" style={{color:'#43cea2'}}></i>
                    Message *</label>
                  <textarea className="form-control border-0 shadow-sm" name="message" value={form.message} onChange={handleChange} rows={3} placeholder={`Why are you a good fit for the ${form.position} internship?`} required style={{ borderRadius: '12px', background: 'white', padding: '12px 16px', fontSize: '1rem', border: '2px solid #e0e7ef', transition: 'all 0.3s', minHeight: '48px' }} />
                </div>
              </div>
              <div className="dropdown-divider my-4" style={{height:'2px', background:'#eee', opacity:0.7}}></div>
              <div className="d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-outline-secondary px-4" onClick={onClose} aria-label="Cancel Application">Cancel</button>
                <button type="submit" className="btn px-4 add-user-btn-gradient" style={{ borderRadius: '8px', fontWeight: '600', fontSize: '1.08rem', background: 'linear-gradient(90deg, #43cea2 0%, #1976d2 100%)', color: 'white', border: 'none' }} aria-label="Submit Application">
                  <i className="fas fa-paper-plane me-2" style={{color:'#fff'}}></i>
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="careers-page">
      {/* Hero Section */}
      <HeroSection
        title="Join Our Team"
        subtitle="Help us build the future of startup technology. We're looking for passionate, talented individuals to join our mission of empowering startups worldwide."
        buttons={[
          { label: 'View Open Positions', href: '#open-positions', primary: true }
        ]}
        backgroundType="animated"
      />

      {/* Company Values Section */}
      <section className="section position-relative" style={{overflow: 'hidden', background: 'linear-gradient(135deg, #e3f0fc 0%, #f8fbff 100%)'}}>
        {/* Soft animated SVG background */}
        <svg width="100%" height="100%" style={{position: 'absolute', top: 0, left: 0, zIndex: 0, opacity: 0.10, pointerEvents: 'none'}} viewBox="0 0 1440 320"><path fill="#1976d2" fillOpacity="0.13" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
        <div className="container position-relative" style={{zIndex: 1}}>
          <div className="section-title">
            <h2 className="text-gradient" style={{fontWeight: 700, fontSize: '2.2rem', letterSpacing: '-0.01em'}}>Why Work at Creova?</h2>
            <p style={{fontSize: '1.13rem', color: '#4a5a6a', fontWeight: 500, marginBottom: 8}}>
              Join a team that's passionate about technology and helping startups succeed.
            </p>
          </div>
          <div className="row justify-content-center g-4">
            {companyValues.map((value, index) => {
              // Assign unique gradients for each value
              const gradients = [
                'linear-gradient(120deg, #1976d2 40%, #40a9ff 100%)',
                'linear-gradient(120deg, #43cea2 40%, #185a9d 100%)',
                'linear-gradient(120deg, #ff9800 40%, #ffc107 100%)',
                'linear-gradient(120deg, #e53935 40%, #e35d5b 100%)'
              ];
              const iconBg = [
                'linear-gradient(135deg, #1976d2 0%, #40a9ff 100%)',
                'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)',
                'linear-gradient(135deg, #ff9800 0%, #ffc107 100%)',
                'linear-gradient(135deg, #e53935 0%, #e35d5b 100%)'
              ];
              return (
                <div key={index} className="col-lg-3 col-md-6 d-flex align-items-stretch">
                  <div className="glass-card why-creova-card position-relative h-100 text-center p-4" style={{
                    borderRadius: 22,
                    boxShadow: '0 8px 32px 0 rgba(25,118,210,0.10)',
                    border: '2.5px solid',
                    borderImage: `${gradients[index % gradients.length]} 1`,
                    background: 'rgba(255,255,255,0.96)',
                    backdropFilter: 'blur(12px)',
                    transition: 'box-shadow 0.2s, transform 0.2s, border 0.2s',
                    overflow: 'visible'
                  }}>
                    <div className="why-creova-icon mb-3" style={{
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
                      <span>{value.icon}</span>
                    </div>
                    <h5 className="card-title mb-2" style={{fontWeight: 700, fontSize: '1.18rem'}}>{value.title}</h5>
                    <p className="card-text mb-0 text-muted">{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Bilingual rural/tech quote at the bottom */}
          <div className="text-center mt-5" style={{fontWeight: 500, fontSize: '1.08rem', color: '#1976d2', opacity: 0.92}}>
            "Work rooted in passion, growth powered by technology."
          </div>
        </div>
        {/* Section hover/animation styles */}
        <style>{`
          .why-creova-card:hover {
            box-shadow: 0 16px 48px 0 rgba(25, 118, 210, 0.18) !important;
            transform: translateY(-4px) scale(1.03);
            border: 1.5px solid #40a9ff33;
          }
        `}</style>
      </section>

      {/* Benefits Section */}
      <section className="section position-relative" style={{background: 'linear-gradient(135deg, #f8fafc 0%, #e3f0fc 100%)', borderRadius: 28, margin: '2.5rem auto', maxWidth: 1100, padding: '3rem 2rem', boxShadow: '0 12px 40px 0 rgba(25,118,210,0.10)', border: '1px solid rgba(25,118,210,0.08)', overflow: 'hidden'}}>
        <div className="container position-relative" style={{zIndex: 1}}>
          <div className="section-title text-center mb-5">
            <h2 className="fw-bold mb-0" style={{fontSize: '2.2rem', letterSpacing: '-0.5px', color: '#1976d2'}}>Benefits & Perks</h2>
            <div className="gradient-divider mb-3" style={{height: 4, width: 100, background: 'linear-gradient(90deg, #1976d2 0%, #40a9ff 50%, #1976d2 100%)', borderRadius: 8, margin: '0 auto 20px auto', opacity: 0.3}}></div>
            <p style={{fontSize: '1.13rem', color: '#1976d2', fontWeight: 500, margin: 0}}>We take care of our team with comprehensive benefits and perks.</p>
          </div>
          <div className="row g-4 justify-content-center">
            {benefits.map((benefit, index) => {
              const icons = [
                '💰', // Salary
                '🩺', // Health
                '🏡', // Remote
                '📚', // Learning
                '🛠️', // Tools
                '🎉', // Events
                '🏖️', // PTO (changed from palm tree to beach with umbrella)
                '💼'  // 401k
              ];
              return (
                <div key={index} className="col-lg-3 col-md-4 col-sm-6 d-flex align-items-stretch">
                  <div className="card h-100 text-center p-4 glass-card" style={{
                    borderRadius: 20,
                    boxShadow: '0 8px 32px 0 rgba(25,118,210,0.13)',
                    border: '2.5px solid #1976d2',
                    background: 'rgba(255,255,255,0.92)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    minHeight: 180,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <div className="mb-3" style={{
                      fontSize: '2.2rem',
                      background: 'rgba(64,169,255,0.13)',
                      borderRadius: '50%',
                      width: 54,
                      height: 54,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1rem auto',
                      boxShadow: '0 4px 18px 0 rgba(25,118,210,0.10)',
                      border: '2px solid rgba(25,118,210,0.10)',
                      color: '#1976d2',
                      animation: 'floatY 3.5s ease-in-out infinite',
                      filter: 'drop-shadow(0 0 8px #40a9ff55)'
                    }}>{icons[index % icons.length]}</div>
                    <p className="mb-0" style={{fontWeight: 600, color: '#1976d2', fontSize: '1.08rem'}}>{benefit}</p>
                    </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="open-positions" className="section position-relative" style={{background: 'linear-gradient(135deg, #f8fafc 0%, #e3f0fc 100%)', borderRadius: 28, margin: '2.5rem auto', maxWidth: 1100, padding: '3rem 2rem', boxShadow: '0 12px 40px 0 rgba(25,118,210,0.10)', border: '1px solid rgba(25,118,210,0.08)', overflow: 'hidden'}}>
        <div className="container position-relative" style={{zIndex: 1}}>
          <div className="section-title text-center mb-5">
            <h2 className="fw-bold mb-0" style={{fontSize: '2.2rem', letterSpacing: '-0.5px', color: '#1976d2'}}>Open Positions</h2>
            <div className="gradient-divider mb-3" style={{height: 4, width: 100, background: 'linear-gradient(90deg, #1976d2 0%, #40a9ff 50%, #1976d2 100%)', borderRadius: 8, margin: '0 auto 20px auto', opacity: 0.3}}></div>
            <p style={{fontSize: '1.13rem', color: '#1976d2', fontWeight: 500, margin: 0}}>Find the perfect role for your skills and career goals.</p>
          </div>
          {/* Job Categories Filter */}
          <div className="mb-4">
            <div className="d-flex flex-wrap gap-2 justify-content-center">
              {jobCategories.map((category) => (
                <button
                  key={category.id}
                  className={`btn ${selectedCategory === category.id ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setSelectedCategory(category.id)}
                  aria-label={`Filter jobs by ${category.name}`}
                  aria-pressed={selectedCategory === category.id}
                  style={{minWidth: 140, fontWeight: 600, fontSize: '1.05rem', borderRadius: 18, boxShadow: selectedCategory === category.id ? '0 4px 18px #1976d233' : '0 1px 4px #1976d211', borderWidth: 2}}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          {/* Job Listings */}
          <div className="row g-4">
            {filteredJobs.map((job) => (
              <div key={job.id} className="col-lg-6 d-flex align-items-stretch">
                <div className="card job-card h-100 p-4 glass-card position-relative" style={{
                  borderRadius: 22,
                  boxShadow: '0 8px 32px 0 rgba(25,118,210,0.13)',
                  border: '2.5px solid #1976d2',
                  background: 'rgba(255,255,255,0.97)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease, box-shadow 0.2s, transform 0.2s, border 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  minHeight: 260,
                  padding: '1.5rem 1.2rem',
                  overflow: 'visible',
                  position: 'relative',
                  cursor: 'pointer',
                  outline: 'none',
                }}
                tabIndex={0}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 16px 48px 0 rgba(25,118,210,0.18)';
                  e.currentTarget.style.borderColor = '#40a9ff';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(25,118,210,0.13)';
                  e.currentTarget.style.borderColor = '#1976d2';
                }}
                >
                  <div className="d-flex align-items-start mb-3" style={{gap: 12}}>
                    <div style={{
                      fontSize: 32,
                      marginRight: 0,
                      color: '#1976d2',
                      background: 'rgba(64,169,255,0.13)',
                      borderRadius: '50%',
                      width: 48,
                      height: 48,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 18px 0 rgba(25,118,210,0.10)',
                      border: '2px solid rgba(25,118,210,0.10)',
                      animation: 'floatY 3.5s ease-in-out infinite',
                      filter: 'drop-shadow(0 0 8px #40a9ff55)'
                    }}>
                      {job.icon}
                    </div>
                    <div style={{flex: 1, minWidth: 0}}>
                      <h5 className="job-title mb-1" style={{fontWeight: 700, color: '#1976d2', fontSize: '1.18rem', wordBreak: 'break-word'}}>{job.title}</h5>
                      <p className="job-company mb-1" style={{fontWeight: 500, color: '#4a5a6a', wordBreak: 'break-word'}}>{job.company}</p>
                      <p className="job-location text-muted mb-0" style={{fontSize: '1.01rem', wordBreak: 'break-word'}}>
                          <i className="fas fa-map-marker-alt me-2"></i>
                          {job.location}
                        </p>
                      </div>
                    <span className="badge bg-primary ms-auto" style={{fontSize: '1rem', fontWeight: 500, borderRadius: 12, alignSelf: 'flex-start', marginLeft: 8}}>{job.type}</span>
                    </div>
                  <p className="mb-3" style={{color: '#444', fontSize: '1.04rem'}}>{job.description}</p>
                    <div className="mb-3">
                    <h6 style={{fontWeight: 600, color: '#1976d2'}}>Requirements:</h6>
                    <ul className="list-unstyled mb-2">
                        {job.requirements.map((req, index) => (
                        <li key={index} className="mb-1" style={{color: '#1976d2', fontWeight: 500}}>
                            <i className="fas fa-check text-success me-2"></i>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mb-3">
                    <h6 style={{fontWeight: 600, color: '#1976d2'}}>Benefits:</h6>
                    <ul className="list-unstyled mb-2">
                        {job.benefits.map((benefit, index) => (
                        <li key={index} className="mb-1" style={{color: '#1976d2', fontWeight: 500}}>
                            <i className="fas fa-star text-warning me-2"></i>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  <div className="d-flex justify-content-between align-items-center mt-auto pt-2">
                      <small className="text-muted">
                        Posted: {new Date(job.postedDate).toLocaleDateString()}
                      </small>
                    <button
                      className="btn btn-primary"
                      aria-label={`Apply for ${job.title} position`}
                      style={{borderRadius: 16, fontWeight: 600}}
                      onClick={() => { setFormJob(job); setShowForm(true); }}
                    >
                        Apply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {showForm && <ApplicationModal job={formJob} onClose={() => { setShowForm(false); setFormJob(null); }} />}
    </div>
  );
};

export default Careers;