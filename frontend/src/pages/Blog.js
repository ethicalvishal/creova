import React, { useState } from "react";
import HeroSection from '../components/HeroSection';
import { Link } from 'react-router-dom';

// --- Named Exports (placeholders, unchanged) ---
export const UXAudit = () => (
  <div style={{ padding: 40, textAlign: "center" }}>
    <h2>UX Audit</h2>
    <p>This is a placeholder for the UX Audit page.</p>
  </div>
);
export const FundingAdvice = () => (
  <div style={{ padding: 40, textAlign: "center" }}>
    <h2>Funding Advice</h2>
    <p>This is a placeholder for the Funding Advice page.</p>
  </div>
);
export const ScalableProject = () => (
  <div style={{ padding: 40, textAlign: "center" }}>
    <h2>Scalable Project</h2>
    <p>This is a placeholder for the Scalable Project page.</p>
  </div>
);
export const MVPConsultation = () => (
  <div style={{ padding: 40, textAlign: "center" }}>
    <h2>MVP Consultation</h2>
    <p>This is a placeholder for the MVP Consultation page.</p>
  </div>
);
export const CloudConsultation = () => (
  <div style={{ padding: 40, textAlign: "center" }}>
    <h2>Cloud Consultation</h2>
    <p>This is a placeholder for the Cloud Consultation page.</p>
  </div>
);

// --- Blog Data ---
const featuredArticle = {
  id: '1',
  title: "The Future of AI in Rural Startups",
  excerpt: "How artificial intelligence is empowering rural entrepreneurs to build global businesses from small towns.",
  author: "Vishal Singh",
  authorAvatar: "/images/vishal-singh.jpg", // Place a suitable avatar in public/images
  authorSocial: {
    linkedin: "https://www.linkedin.com/in/vishal-singh/",
    twitter: "https://twitter.com/creova_tech"
  },
  date: "2025-08-10",
  readTime: "5 min read",
  image: "https://www.orangemantra.com/blog/wp-content/uploads/2024/01/Future-of-AI.png",
  category: "AI & ML",
  tags: ["AI", "Rural", "Innovation"]
};

const allArticles = [
  {
    id: '2',
    title: "Building Scalable Web Applications",
    excerpt: "Scalability is the secret sauce behind every successful web application. Learn how to build for growth from day one.",
    author: "Vishal Singh",
    authorAvatar: "/images/vishal-singh.jpg",
    authorSocial: {
      linkedin: "https://www.linkedin.com/in/vishal-singh/",
      twitter: "https://twitter.com/creova_tech"
    },
    date: "2025-08-22",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
    category: "Development",
    tags: ["Web", "Scalable", "Tech"]
  },
  {
    id: '3',
    title: "MVP Development: From Idea to Launch",
    excerpt: "Turn your startup idea into a working MVP in weeks, not months. Our proven roadmap for rural founders.",
    author: "Vishal Singh",
    authorAvatar: "/images/vishal-singh.jpg",
    authorSocial: {
      linkedin: "https://www.linkedin.com/in/vishal-singh/",
      twitter: "https://twitter.com/creova_tech"
    },
    date: "2025-09-05",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    category: "Startups",
    tags: ["MVP", "Startup", "Launch"]
  },
  {
    id: '4',
    title: "Cloud Computing for Startups",
    excerpt: "Cloud is the great equalizer—now every startup can build like a tech giant. See how rural India is leading the way.",
    author: "Vishal Singh",
    authorAvatar: "/images/vishal-singh.jpg",
    authorSocial: {
      linkedin: "https://www.linkedin.com/in/vishal-singh/",
      twitter: "https://twitter.com/creova_tech"
    },
    date: "2025-09-18",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
    category: "Technology",
    tags: ["Cloud", "Tech", "Startup"]
  },
];

const categories = ["All", ...Array.from(new Set([featuredArticle.category, ...allArticles.map(a => a.category)]))];

// Helper: category icon
const categoryIcon = (category) => {
  switch (category) {
    case "AI & ML": return "🤖";
    case "Development": return "💻";
    case "Startups": return "🚀";
    case "Technology": return "🔬";
    default: return "📄";
  }
};

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredArticles = selectedCategory === "All"
    ? allArticles
    : allArticles.filter(a => a.category === selectedCategory);

  // Back to top button
  const [showTop, setShowTop] = useState(false);
  React.useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ fontFamily: 'inherit', background: 'linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%)', minHeight: '100vh', position: 'relative' }}>
      {/* Hero Section */}
      <HeroSection
        title="Creova Blog: Rural Innovation & Startup Wisdom"
        subtitle="Insights, stories, and strategies for rural founders, tech dreamers, and startup builders. Learn, grow, and get inspired with Creova."
        buttons={[]}
        backgroundType="animated"
        minHeight="100vh"
        style={{ paddingBottom: 48 }}
      >
        <div className="d-flex justify-content-center gap-3 mt-4">
          <button
            className="btn btn-primary btn-lg shadow me-3"
            style={{ minWidth: 160 }}
            onClick={() => {
              // Use Link for navigation to BlogDetail
              window.location.href = '/blog/read/1';
            }}
          >
            Read Featured Article
          </button>
          <a
            href="/contact"
            className="btn btn-outline-primary btn-lg shadow"
            style={{ minWidth: 160 }}
          >
            Contact Us
          </a>
        </div>
      </HeroSection>

      {/* Featured Article with enhanced glassmorphism and icon */}
      <section id="featured" style={{ maxWidth: 900, margin: '48px auto 40px auto', position: 'relative', zIndex: 2 }}>
        <div
          className="enhanced-blog-card"
          style={{
            borderRadius: 40,
            overflow: 'hidden',
            background: 'rgba(255,255,255,0.82)',
            boxShadow: '0 12px 40px 0 rgba(25,118,210,0.13)',
            border: '4px solid transparent',
            position: 'relative',
            backdropFilter: 'blur(12px)',
            transition: 'box-shadow 0.3s, transform 0.3s, border 0.3s',
            animation: 'borderGlow 2.5s linear infinite',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = '0 24px 64px 0 rgba(67,206,162,0.18)';
            e.currentTarget.style.transform = 'translateY(-8px) scale(1.03)';
            e.currentTarget.style.borderImage = 'linear-gradient(120deg, #43cea2 40%, #1976d2 100%) 1';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = '0 12px 40px 0 rgba(25,118,210,0.13)';
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.borderImage = '';
          }}
        >
          {/* Floating category icon */}
          <div style={{
            position: 'absolute',
            top: 18,
            left: 18,
            zIndex: 3,
            fontSize: 38,
            background: 'rgba(64,169,255,0.13)',
            color: '#1976d2',
            borderRadius: '50%',
            width: 56,
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 18px 0 rgba(25,118,210,0.10)',
            border: '2.5px solid rgba(25,118,210,0.10)',
            opacity: 0.97
          }}>{categoryIcon(featuredArticle.category)}</div>
          <img src={featuredArticle.image} alt={featuredArticle.title} style={{ width: '100%', maxHeight: 340, objectFit: 'cover', borderTopLeftRadius: 40, borderTopRightRadius: 40, zIndex: 2, position: 'relative' }} />
          <div style={{ padding: 32, position: 'relative', zIndex: 2 }}>
            <span style={{ fontWeight: 700, color: '#1976d2', fontSize: '1.1rem', marginBottom: 8, display: 'inline-block' }}>
              <span role="img" aria-label="star">🌟</span> Featured Article
            </span>
            <h2 style={{ fontWeight: 800, fontSize: '2rem', margin: '8px 0 12px 0', color: '#1976d2' }}>{featuredArticle.title}</h2>
            {/* Gradient divider under title */}
            <div style={{ height: 4, width: 80, background: 'linear-gradient(90deg, #43cea2 0%, #1976d2 100%)', borderRadius: 8, margin: '0 0 18px 0', opacity: 0.18 }}></div>
            <p style={{ fontSize: '1.13rem', color: '#374151', fontWeight: 500, marginBottom: 16 }}>{featuredArticle.excerpt}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: '1rem', color: '#1976d2', fontWeight: 600 }}>
              <span style={{ background: '#43cea2', color: 'white', borderRadius: 12, padding: '4px 14px', fontWeight: 700 }}>{featuredArticle.category}</span>
              <span>{featuredArticle.readTime}</span>
              <span>{featuredArticle.date}</span>
              <span style={{ marginLeft: 'auto', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
                <img src={featuredArticle.authorAvatar} alt={featuredArticle.author} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', border: '2px solid #43cea2' }} />
                {featuredArticle.author}
                <a href={featuredArticle.authorSocial.linkedin} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 6, color: '#1976d2' }}><i className="fab fa-linkedin"></i></a>
                <a href={featuredArticle.authorSocial.twitter} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 4, color: '#1976d2' }}><i className="fab fa-twitter"></i></a>
              </span>
            </div>
            <div style={{ marginTop: 12 }}>
              {featuredArticle.tags.map(tag => (
                <span key={tag} style={{ background: '#e3f0fc', color: '#1976d2', borderRadius: 8, padding: '3px 10px', fontWeight: 600, fontSize: '0.98rem', marginRight: 8 }}>{`#${tag}`}</span>
              ))}
            </div>
          </div>
          <Link
            to={`/blog/read/${featuredArticle.id}`}
            className="stretched-link"
            style={{ position: 'absolute', inset: 0, zIndex: 5 }}
            aria-label={`Read more about ${featuredArticle.title}`}
          />
        </div>
      </section>

      {/* Category Filter */}
      <div style={{ maxWidth: 1200, margin: '0 auto 32px auto', textAlign: 'center' }}>
        <div
          style={{
            display: 'inline-flex',
            gap: 12,
            background: 'rgba(255,255,255,0.85)',
            borderRadius: 22,
            boxShadow: '0 4px 24px 0 rgba(67,206,162,0.10)',
            padding: '12px 28px',
            marginBottom: 12,
            border: '2.5px solid',
            borderImage: 'linear-gradient(90deg, #43cea2 0%, #1976d2 100%) 1',
            backdropFilter: 'blur(10px)',
            transition: 'box-shadow 0.2s, border 0.2s',
          }}
        >
          {categories.map(cat => (
            <button
              key={cat}
              className="btn btn-sm"
              style={{
                borderRadius: 12,
                fontWeight: 700,
                minWidth: 110,
                fontSize: '1.08rem',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 18px',
                background: selectedCategory === cat
                  ? 'linear-gradient(90deg, #43cea2 0%, #1976d2 100%)'
                  : 'rgba(255,255,255,0.0)',
                color: selectedCategory === cat ? 'white' : '#1976d2',
                boxShadow: selectedCategory === cat ? '0 2px 12px #43cea233' : undefined,
                border: 'none',
                outline: 'none',
                transform: selectedCategory === cat ? 'scale(1.07)' : 'none',
                transition: 'all 0.18s',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
              onClick={() => setSelectedCategory(cat)}
              onMouseEnter={e => {
                if (selectedCategory !== cat) {
                  e.currentTarget.style.background = 'rgba(67,206,162,0.10)';
                  e.currentTarget.style.color = '#1976d2';
                }
              }}
              onMouseLeave={e => {
                if (selectedCategory !== cat) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.0)';
                  e.currentTarget.style.color = '#1976d2';
                }
              }}
            >
              <span style={{ fontSize: 20, display: 'inline-block' }}>
                {cat === 'All' ? '📰' : categoryIcon(cat)}
              </span>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Latest Articles with hover effect, fade-in, tags, avatars */}
      <section style={{ maxWidth: 1200, margin: '0 auto', marginBottom: 40 }}>
        <h3 style={{
          fontWeight: 800,
          fontSize: '1.5rem',
          color: '#1976d2',
          marginBottom: 24,
          textAlign: 'center',
          letterSpacing: '-0.01em',
          background: 'linear-gradient(90deg, #43cea2 0%, #1976d2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          <span role="img" aria-label="newspaper">📰</span> Latest Articles
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center' }}>
          {filteredArticles.map((article, idx) => (
            <div key={idx} className="col-md-6 col-lg-4 mb-5">
              <div className="enhanced-blog-card position-relative h-100" style={{
                flex: '1 1 320px',
                maxWidth: 370,
                minWidth: 280,
                background: 'rgba(255,255,255,0.82)',
                borderRadius: 32,
                boxShadow: '0 8px 32px 0 rgba(25,118,210,0.10)',
                border: '3px solid transparent',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'box-shadow 0.3s, transform 0.3s, border 0.3s',
                cursor: 'pointer',
                opacity: 0,
                animation: `fadeInUp 0.7s ${0.1 * idx + 0.2}s forwards`,
                backdropFilter: 'blur(10px)',
                position: 'relative',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 16px 40px 0 rgba(67,206,162,0.18)';
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.03)';
                e.currentTarget.style.borderImage = 'linear-gradient(120deg, #43cea2 40%, #1976d2 100%) 1';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(25,118,210,0.10)';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.borderImage = '';
              }}
              >
                {/* Floating category icon */}
                <div style={{
                  position: 'absolute',
                  top: 14,
                  left: 14,
                  zIndex: 3,
                  fontSize: 30,
                  background: 'rgba(64,169,255,0.13)',
                  color: '#1976d2',
                  borderRadius: '50%',
                  width: 44,
                  height: 44,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 18px 0 rgba(25,118,210,0.10)',
                  border: '2.5px solid rgba(25,118,210,0.10)',
                  opacity: 0.97
                }}>{categoryIcon(article.category)}</div>
                {/* Floating glassy bookmark icon */}
                <div style={{
                  position: 'absolute',
                  top: 14,
                  right: 14,
                  zIndex: 3,
                  fontSize: 22,
                  background: 'rgba(255,255,255,0.7)',
                  borderRadius: '50%',
                  width: 36,
                  height: 36,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px 0 rgba(25,118,210,0.10)',
                  border: '2px solid #e3f0fc',
                  opacity: 0.93
                }}>
                  <i className="fas fa-bookmark" style={{ color: '#43cea2' }}></i>
                </div>
                {/* Subtle SVG pattern bottom right */}
                <svg width="80" height="80" style={{ position: 'absolute', bottom: 8, right: 8, opacity: 0.08, zIndex: 1 }}>
                  <circle cx="40" cy="40" r="32" fill="#43cea2" />
                  <rect x="20" y="20" width="40" height="40" rx="12" fill="#1976d2" />
                </svg>
                <img src={article.image} alt={article.title} style={{ width: '100%', height: 160, objectFit: 'cover', borderTopLeftRadius: 32, borderTopRightRadius: 32, zIndex: 2, position: 'relative' }} />
                <div style={{ padding: '28px 20px 20px 20px', flexGrow: 1, position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column' }}>
                  <span style={{ background: '#1976d2', color: 'white', borderRadius: 10, padding: '3px 12px', fontWeight: 600, fontSize: '0.98rem', marginBottom: 8, display: 'inline-block' }}>{article.category}</span>
                  <h4 style={{ fontWeight: 700, fontSize: '1.18rem', color: '#1976d2', margin: '10px 0 8px 0' }}>{article.title}</h4>
                  {/* Gradient divider under title */}
                  <div style={{ height: 3, width: 60, background: 'linear-gradient(90deg, #43cea2 0%, #1976d2 100%)', borderRadius: 8, margin: '0 0 14px 0', opacity: 0.18 }}></div>
                  <p style={{ fontSize: '1.05rem', color: '#4a5a6a', fontWeight: 500, marginBottom: 16 }}>{article.excerpt}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.98rem', color: '#1976d2', fontWeight: 600, marginBottom: 10 }}>
                    <span>{article.readTime}</span>
                    <span>{article.date}</span>
                    <span style={{ marginLeft: 'auto', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <img src={article.authorAvatar} alt={article.author} style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', border: '2px solid #43cea2' }} />
                      {article.author}
                      <a href={article.authorSocial.linkedin} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 4, color: '#1976d2' }}><i className="fab fa-linkedin"></i></a>
                    </span>
                  </div>
                  <div style={{ marginTop: 10, marginBottom: 16 }}>
                    {article.tags.map(tag => (
                      <span key={tag} style={{ background: '#e3f0fc', color: '#1976d2', borderRadius: 8, padding: '3px 10px', fontWeight: 600, fontSize: '0.98rem', marginRight: 8 }}>{`#${tag}`}</span>
                    ))}
                  </div>
                  {/* Read More button */}
                  <Link
                    to={`/blog/read/${article.id}`}
                    className="btn"
                    style={{
                      marginTop: 'auto',
                      borderRadius: 10,
                      fontWeight: 700,
                      fontSize: '1.05rem',
                      background: 'linear-gradient(90deg, #43cea2 0%, #1976d2 100%)',
                      color: 'white',
                      padding: '10px 0',
                      boxShadow: '0 2px 8px #43cea233',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      textDecoration: 'none',
                      transition: 'background 0.18s, box-shadow 0.18s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'linear-gradient(90deg, #1976d2 0%, #43cea2 100%)';
                      e.currentTarget.style.boxShadow = '0 4px 16px #1976d233';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'linear-gradient(90deg, #43cea2 0%, #1976d2 100%)';
                      e.currentTarget.style.boxShadow = '0 2px 8px #43cea233';
                    }}
                    aria-label={`Read more about ${article.title}`}
                  >
                    Read More <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Enhanced Newsletter Signup Section */}
      <section style={{ maxWidth: 700, margin: '0 auto 48px auto', position: 'relative' }}>
        {/* Floating decorative elements */}
        <div style={{
          position: 'absolute',
          top: -20,
          left: -30,
          fontSize: 48,
          opacity: 0.1,
          zIndex: 1,
          animation: 'float 3s ease-in-out infinite'
        }}>📧</div>
        <div style={{
          position: 'absolute',
          bottom: -15,
          right: -25,
          fontSize: 42,
          opacity: 0.08,
          zIndex: 1,
          animation: 'float 3s ease-in-out infinite 1.5s'
        }}>🚀</div>
        
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          borderRadius: 32,
          boxShadow: '0 12px 40px 0 rgba(67,206,162,0.15), 0 4px 20px 0 rgba(25,118,210,0.08)',
          border: '3px solid transparent',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.95), rgba(255,255,255,0.95)), linear-gradient(135deg, #43cea2 0%, #1976d2 50%, #43cea2 100%)',
          backgroundOrigin: 'border-box',
          backgroundClip: 'content-box, border-box',
          padding: '40px 32px',
          textAlign: 'center',
          marginTop: 24,
          position: 'relative',
          overflow: 'hidden',
          backdropFilter: 'blur(12px)',
          transition: 'transform 0.3s, box-shadow 0.3s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
          e.currentTarget.style.boxShadow = '0 20px 60px 0 rgba(67,206,162,0.25), 0 8px 32px 0 rgba(25,118,210,0.15)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'none';
          e.currentTarget.style.boxShadow = '0 12px 40px 0 rgba(67,206,162,0.15), 0 4px 20px 0 rgba(25,118,210,0.08)';
        }}
        >
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
          
          {/* Header with icon */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{
              background: 'rgba(64,169,255,0.13)',
              borderRadius: '50%',
              width: 64,
              height: 64,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              boxShadow: '0 4px 18px 0 rgba(25,118,210,0.10)',
              border: '2.5px solid rgba(25,118,210,0.10)',
              fontSize: 28,
              color: '#1976d2'
            }}>
              📬
            </div>
            <h3 style={{ 
              fontWeight: 800, 
              color: '#1976d2', 
              marginBottom: 8,
              fontSize: '1.8rem',
              background: 'linear-gradient(135deg, #1976d2 0%, #43cea2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Stay Updated with Creova</h3>
            <p style={{ 
              color: '#374151', 
              fontWeight: 500, 
              marginBottom: 24,
              fontSize: '1.1rem',
              lineHeight: 1.6
            }}>
              Get exclusive insights on <strong>rural innovation</strong>, <strong>startup strategies</strong>, and <strong>tech trends</strong> delivered to your inbox every week.
            </p>
          </div>

          {/* Enhanced form */}
          <form onSubmit={e => { 
            e.preventDefault(); 
            const email = e.target.email.value;
            if (email) {
              alert(`🎉 Thank you for subscribing! We'll send updates to ${email}`);
              e.target.reset();
            }
          }} 
          style={{ 
            display: 'flex', 
            gap: 12, 
            justifyContent: 'center', 
            alignItems: 'center', 
            flexWrap: 'wrap',
            position: 'relative',
            zIndex: 2
          }}>
            <div style={{ position: 'relative', minWidth: 280 }}>
              <input 
                type="email" 
                name="email"
                required 
                placeholder="Enter your email address" 
                style={{ 
                  borderRadius: 12, 
                  border: '2px solid #e3f0fc', 
                  padding: '14px 18px 14px 48px', 
                  fontSize: '1.1rem', 
                  minWidth: 280,
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
              />
              <i className="fas fa-envelope" style={{
                position: 'absolute',
                left: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#43cea2',
                fontSize: 18
              }}></i>
            </div>
            <button 
              type="submit" 
              className="btn" 
              style={{ 
                borderRadius: 12, 
                fontWeight: 700, 
                fontSize: '1.1rem', 
                padding: '14px 32px',
                background: 'linear-gradient(135deg, #43cea2 0%, #1976d2 100%)',
                border: 'none',
                color: 'white',
                boxShadow: '0 4px 16px 0 rgba(67,206,162,0.3)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                minWidth: 140
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px 0 rgba(67,206,162,0.4)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 4px 16px 0 rgba(67,206,162,0.3)';
              }}
            >
              Subscribe Now
            </button>
          </form>

          {/* Benefits list */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 24, 
            marginTop: 24,
            flexWrap: 'wrap',
            position: 'relative',
            zIndex: 2
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.95rem', color: '#43cea2', fontWeight: 600 }}>
              <i className="fas fa-check-circle"></i>
              Weekly Updates
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.95rem', color: '#1976d2', fontWeight: 600 }}>
              <i className="fas fa-shield-alt"></i>
              Privacy Protected
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.95rem', color: '#43cea2', fontWeight: 600 }}>
              <i className="fas fa-times-circle"></i>
              Unsubscribe Anytime
            </div>
          </div>

          <small className="text-muted mt-3 d-block" style={{ 
            display: 'block', 
            marginTop: 16,
            fontSize: '0.9rem',
            color: '#6b7280',
            position: 'relative',
            zIndex: 2
          }}>
            🔒 We respect your privacy. No spam, just valuable insights.
          </small>
        </div>
      </section>

      {/* Accent Divider */}
      <div style={{ height: 4, width: '80%', background: 'linear-gradient(90deg, #43cea2 0%, #1976d2 100%)', borderRadius: 8, margin: '0 auto 32px auto', opacity: 0.18 }}></div>

      {/* Bilingual Rural/Tech Quote */}
      <section style={{ textAlign: 'center', margin: '40px 0 0 0' }}>
        <div style={{
          fontWeight: 600,
          fontSize: '1.18rem',
          color: '#1976d2',
          background: 'rgba(67,206,162,0.08)',
          borderRadius: 16,
          padding: '18px 0',
          boxShadow: '0 2px 8px #43cea233',
          maxWidth: 700,
          margin: '0 auto',
        }}>
          <span style={{ fontSize: '1.3rem', marginRight: 8 }} role="img" aria-label="bulb">💡</span>
          "Technology is the new plough—AI is the tractor for rural dreams."
        </div>
      </section>
      <div style={{ height: 40 }} />

      {/* Floating Back to Top Button */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            zIndex: 999,
            background: 'linear-gradient(90deg, #43cea2 0%, #1976d2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: 56,
            height: 56,
            boxShadow: '0 4px 18px 0 rgba(25,118,210,0.18)',
            fontSize: 28,
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
          aria-label="Back to top"
        >
          <i className="fas fa-arrow-up"></i>
        </button>
      )}

      {/* Subtle background SVG icons */}
      <svg width="100%" height="100%" style={{ position: 'fixed', top: 0, left: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.07 }}>
        <g>
          <circle cx="200" cy="200" r="80" fill="#43cea2" />
          <rect x="1200" y="100" width="120" height="120" rx="32" fill="#1976d2" />
          <circle cx="900" cy="700" r="60" fill="#43cea2" />
          <rect x="400" y="800" width="90" height="90" rx="24" fill="#1976d2" />
        </g>
      </svg>

      {/* Keyframes for animation */}
      <style>{`
        @keyframes borderGlow {
          0% { box-shadow: 0 0 0 0 #43cea2, 0 0 0 0 #1976d2; }
          50% { box-shadow: 0 0 24px 0 #43cea2, 0 0 48px 0 #1976d2; }
          100% { box-shadow: 0 0 0 0 #43cea2, 0 0 0 0 #1976d2; }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: none; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default Blog; 