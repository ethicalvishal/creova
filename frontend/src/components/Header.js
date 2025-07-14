import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBell, FaSearch, FaGlobe, FaBars, FaTimes } from 'react-icons/fa';
import { buttonFeatures } from '../utils/buttonFeatures';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showLang, setShowLang] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  // const [searchQuery, setSearchQuery] = useState('');
  // const [searchResults, setSearchResults] = useState([]);
  // const [isSearching, setIsSearching] = useState(false);
  const navRef = React.useRef();

  // Auth state
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState(() => {
    const userStr = localStorage.getItem('user');
    try {
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  });
  const isLoggedIn = !!localStorage.getItem('token') && !!authUser;

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthUser(null);
    setShowProfile(false);
    navigate('/login');
  };

  // Get initials
  const getInitials = (name) => name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : '';

  // Placeholder notifications
  const notifications = [
    { id: 1, text: 'Welcome to Creova!', time: '2m ago', read: false },
    { id: 2, text: 'Your application was received.', time: '1h ago', read: true },
    { id: 3, text: 'New blog post: Digital Transformation', time: '3h ago', read: false },
  ];

  // Nav links
  const mainLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/products', label: 'Products' },
    { to: '/careers', label: 'Careers' }, // Moved Careers here
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest('.profile-dropdown')) setShowProfile(false);
      if (!e.target.closest('.lang-dropdown')) setShowLang(false);
      if (!e.target.closest('.notif-dropdown')) setShowNotif(false);
      if (!e.target.closest('.search-modal') && showSearch) setShowSearch(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showSearch]);

  // Accessibility: close modals/dropdowns with Esc
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setShowProfile(false);
        setShowLang(false);
        setShowNotif(false);
        setShowSearch(false);
        setMobileMenu(false);
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  // Animated active link indicator
  const [activeLink, setActiveLink] = useState(window.location.pathname);
  useEffect(() => {
    const handleRoute = () => setActiveLink(window.location.pathname);
    window.addEventListener('popstate', handleRoute);
    return () => window.removeEventListener('popstate', handleRoute);
  }, []);

  // Mobile menu overlay
  const closeMobileMenu = () => setMobileMenu(false);

  // Search functionality
  // const handleSearch = async (e) => {
  //   e.preventDefault();
  //   if (!searchQuery.trim()) return;
    
  //   setIsSearching(true);
  //   try {
  //     const result = await buttonFeatures.search.globalSearch(searchQuery);
  //     if (result.success) {
  //       setSearchResults(result.data.results || []);
  //     } else {
  //       buttonFeatures.notifications.show('Search failed. Please try again.', 'error');
  //     }
  //   } catch (error) {
  //     buttonFeatures.notifications.show('Search error. Please try again.', 'error');
  //   } finally {
  //     setIsSearching(false);
  //   }
  // };

  // Language switching
  const handleLanguageSwitch = (language) => {
    buttonFeatures.language.switch(language);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`navbar navbar-expand-lg navbar-light fixed-top py-2${scrolled ? ' navbar-scrolled' : ''}`}
        style={{
          background: '#162447',
          boxShadow: scrolled
            ? '0 6px 24px rgba(25, 118, 210, 0.18)'
            : '0 2px 12px rgba(25, 118, 210, 0.10)',
          borderBottom: '1.5px solid rgba(255,255,255,0.10)',
          transition: 'background 0.2s, box-shadow 0.2s',
          zIndex: 1030,
        }}
        aria-label="Main navigation"
      >
        <div className="container d-flex align-items-center justify-content-between" style={{position: 'relative', zIndex: 1}}>
          {/* Logo with animated hover */}
          <Link className="navbar-brand d-flex align-items-center logo-hover" to="/" tabIndex={0} aria-label="Creova Home">
            <span className="creova-logo-svg me-2" style={{width: 44, height: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="circle-c-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#1976d2" />
                    <stop offset="1" stopColor="#40a9ff" />
                  </linearGradient>
                </defs>
                <circle cx="20" cy="20" r="18" fill="url(#circle-c-gradient)" />
                <text x="50%" y="56%" textAnchor="middle" dominantBaseline="middle" fontFamily="Segoe UI, Arial, sans-serif" fontWeight="bold" fontSize="22" fill="#fff">C</text>
            </svg>
            </span>
            <span style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.1}}>
              <span className="fw-bold" style={{fontSize: '1.35rem', letterSpacing: '-0.5px', fontFamily: 'Segoe UI, sans-serif', color: '#40a9ff', textShadow: '0 2px 8px rgba(64,169,255,0.18)'}}>Creova</span>
              <span style={{
                fontSize: '0.82rem',
                color: '#e0e6ed',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                marginTop: 2,
                fontFamily: 'Segoe UI, sans-serif',
                opacity: 0.96
              }}>Technologies</span>
            </span>
        </Link>
          {/* Hamburger for mobile */}
          <button className="navbar-toggler ms-2" type="button" aria-label="Toggle navigation" aria-expanded={mobileMenu} onClick={() => setMobileMenu((v) => !v)}>
            {mobileMenu ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
          {/* Desktop Nav */}
          <div className="collapse navbar-collapse d-none d-lg-flex" id="mainNavbar">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center position-relative" style={{gap: 2}}>
              {mainLinks.map((item) => (
                <li className="nav-item position-relative" key={item.to}>
                  <NavLink
                    className={({ isActive }) =>
                      'nav-link px-3' +
                      (isActive || activeLink === item.to ? ' active text-primary fw-bold' : '')
                    }
                    to={item.to}
                    style={{
                      fontWeight: 500,
                      fontSize: '1rem',
                      letterSpacing: '-0.2px',
                      transition: 'color 0.18s, border 0.18s',
                      position: 'relative',
                      outline: 'none',
                    }}
                    tabIndex={0}
                    aria-current={activeLink === item.to ? 'page' : undefined}
                    onClick={() => setActiveLink(item.to)}
                  >
                    {item.label}
                    {/* Animated underline */}
                    <span className="active-underline" style={{
                      position: 'absolute',
                      left: 12,
                      right: 12,
                      bottom: 4,
                      height: 3,
                      borderRadius: 2,
                      background: (activeLink === item.to) ? 'linear-gradient(90deg, #0078d4 60%, #40a9ff 100%)' : 'transparent',
                      transition: 'background 0.3s',
                      zIndex: 1,
                      display: 'block',
                    }}></span>
                  </NavLink>
            </li>
              ))}
              {/* Show Login/Register if not logged in */}
              {/* Removed Login/Register from main nav */}

              {/* Divider */}
              <li className="d-none d-lg-block mx-2" style={{height: 32, borderLeft: '1.5px solid #e5eaf1'}} aria-hidden="true"></li>
              {/* Search Icon */}
              <li className="nav-item mx-1">
                <button className="btn btn-link p-0" title="Search" aria-label="Search" style={{color: '#0078d4', fontSize: 20}} onClick={() => setShowSearch(true)}>
                  <FaSearch />
                </button>
            </li>
              {/* Notification Bell */}
              <li className="nav-item mx-1 position-relative notif-dropdown">
                <button className="btn btn-link p-0" title="Notifications" aria-label="Notifications" style={{color: '#0078d4', fontSize: 20}} onClick={() => setShowNotif((v) => !v)}>
                  <FaBell />
                  {/* Notification dot (if unread) */}
                  {notifications.some(n => !n.read) && (
                    <span style={{position: 'absolute', top: 2, right: 2, width: 8, height: 8, background: '#ff5252', borderRadius: '50%', display: 'inline-block', border: '2px solid #fff'}}></span>
                  )}
                </button>
                {showNotif && (
                  <div className="dropdown-menu show position-absolute end-0 mt-2 shadow-sm" style={{minWidth: 260, zIndex: 2000, maxHeight: 320, overflowY: 'auto'}}>
                    <div className="px-3 py-2 border-bottom fw-bold">Notifications</div>
                    {notifications.length === 0 && <div className="px-3 py-2 text-muted" style={{ color: 'white' }}>No notifications</div>}
                    {notifications.map(n => (
                      <div key={n.id} className={`dropdown-item d-flex align-items-center${n.read ? '' : ' fw-bold'}`} style={{fontSize: '0.97rem'}}>
                        <FaBell className="me-2" style={{color: n.read ? '#b0b0b0' : '#0078d4'}} />
                        <span>{n.text}</span>
                        <span className="ms-auto small text-muted">{n.time}</span>
                      </div>
                    ))}
                  </div>
                )}
              </li>
              {/* Language Switcher */}
              <li className="nav-item mx-1 lang-dropdown position-relative">
                <button className="btn btn-link p-0" title="Language" aria-label="Language" style={{color: '#0078d4', fontSize: 20}} onClick={() => setShowLang((v) => !v)}>
                  <FaGlobe />
                </button>
                {showLang && (
                  <div className="dropdown-menu show position-absolute end-0 mt-2 shadow-sm" style={{minWidth: 120, zIndex: 2000}}>
                    <button className="dropdown-item" onClick={() => {handleLanguageSwitch('en'); setShowLang(false);}}>English</button>
                    <button className="dropdown-item" onClick={() => {handleLanguageSwitch('hi'); setShowLang(false);}}>हिन्दी</button>
                  </div>
                )}
            </li>
              {/* User Auth Buttons */}
              {!isLoggedIn && (
                <li className="nav-item ms-2 d-flex align-items-center">
                  <div className="btn-group" role="group" aria-label="Login and Register">
                    <Link to="/login" className="btn fw-bold px-3 py-1 login-btn-custom" style={{background: 'linear-gradient(90deg, #42a5f5 0%, #90caf9 100%)', color: '#1976d2', border: 'none', borderTopLeftRadius: 8, borderBottomLeftRadius: 8, fontSize: '0.97rem', transition: 'background 0.18s, color 0.18s'}}>Login</Link>
                    <Link to="/register" className="btn btn-outline-primary fw-bold px-3 py-1 register-btn-custom" style={{borderTopRightRadius: 8, borderBottomRightRadius: 8, fontSize: '0.97rem', borderLeft: 'none', borderWidth: 1}}>Register</Link>
                  </div>
                </li>
              )}
              {/* Admin Access Link */}
              <li className="nav-item mx-1">
                <Link 
                  to="/admin/access" 
                  className="btn btn-outline-primary btn-sm admin-btn-custom"
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    padding: '0.4rem 0.8rem',
                    borderRadius: '20px',
                    border: '2px solid #0078d4',
                    color: '#0078d4',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#0078d4';
                    e.target.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#0078d4';
                  }}
                >
                  <i className="fas fa-shield-alt me-1"></i>
                  Admin
                </Link>
              </li>
              {/* User Profile Dropdown (only if logged in) */}
              {isLoggedIn && (
                <li className="nav-item mx-1 profile-dropdown position-relative">
                  <button className="btn btn-link p-0 d-flex align-items-center" title="Profile" aria-label="Profile" style={{color: '#0078d4', fontSize: 22}} onClick={() => setShowProfile((v) => !v)}>
                    {authUser && authUser.avatar ? (
                      <img src={authUser.avatar} alt="avatar" style={{width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', border: '2px solid #e5eaf1'}} />
                    ) : (
                      <span className="avatar-initials d-flex align-items-center justify-content-center" style={{width: 32, height: 32, borderRadius: '50%', background: '#e3f0fc', color: '#1976d2', fontWeight: 700, fontSize: 18, border: '2px solid #e5eaf1'}}>{getInitials(authUser?.name)}</span>
                    )}
                  </button>
                  {showProfile && (
                    <div className="dropdown-menu show position-absolute end-0 mt-2 shadow-sm" style={{minWidth: 180, zIndex: 2000}}>
                      <div className="px-3 py-2 border-bottom">
                        <div className="fw-bold">{authUser?.name}</div>
                        <div className="small text-muted">{authUser?.email}</div>
                      </div>
                      <button className="dropdown-item" onClick={() => {navigate('/dashboard'); setShowProfile(false);}}>Dashboard</button>
                      <button className="dropdown-item" onClick={() => {navigate('/profile'); setShowProfile(false);}}>Profile</button>
                      <button className="dropdown-item" onClick={() => {navigate('/settings'); setShowProfile(false);}}>Settings</button>
                      <div className="dropdown-divider"></div>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button>
                    </div>
                  )}
                </li>
                )}
              </ul>
          </div>
          {/* Mobile Nav Slide-in */}
          <div className={`mobile-menu-overlay${mobileMenu ? ' show' : ''}`} onClick={closeMobileMenu} tabIndex={-1} aria-hidden={!mobileMenu}></div>
          <div className={`mobile-menu${mobileMenu ? ' open' : ''}`} tabIndex={mobileMenu ? 0 : -1} aria-hidden={!mobileMenu}>
            <ul className="navbar-nav flex-column align-items-start p-4 gap-2">
              {mainLinks.map((item) => (
                <li className="nav-item w-100" key={item.to}>
                  <NavLink
                    className={({ isActive }) =>
                      'nav-link w-100' +
                      (isActive || activeLink === item.to ? ' active text-primary fw-bold' : '')
                    }
                    to={item.to}
                    style={{fontWeight: 500, fontSize: '1.1rem', letterSpacing: '-0.2px', padding: '0.75rem 0'}}
                    onClick={() => { setActiveLink(item.to); setMobileMenu(false); }}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              {/* Show Login/Register if not logged in (mobile) */}
              {/* Removed Login/Register from mobile main nav */}
              {/* User Profile (mobile) */}
              {isLoggedIn && (
                <li className="nav-item w-100 mt-2">
                  <button className="btn btn-outline-info w-100 d-flex align-items-center" onClick={() => setShowProfile((v) => !v)}>
                    {authUser && authUser.avatar ? <img src={authUser.avatar} alt="avatar" style={{width: 24, height: 24, borderRadius: '50%', objectFit: 'cover', border: '2px solid #e5eaf1', marginRight: 8}} /> : <span className="avatar-initials d-flex align-items-center justify-content-center me-2" style={{width: 24, height: 24, borderRadius: '50%', background: '#e3f0fc', color: '#1976d2', fontWeight: 700, fontSize: 14, border: '2px solid #e5eaf1'}}>{getInitials(authUser?.name)}</span>} Profile
                  </button>
                  {showProfile && (
                    <div className="dropdown-menu show position-static mt-2 shadow-sm w-100" style={{minWidth: 180, zIndex: 2000}}>
                      <div className="px-3 py-2 border-bottom">
                        <div className="fw-bold">{authUser?.name}</div>
                        <div className="small text-muted">{authUser?.email}</div>
                      </div>
                      <button className="dropdown-item" onClick={() => {navigate('/dashboard'); setShowProfile(false);}}>Dashboard</button>
                      <button className="dropdown-item" onClick={() => {navigate('/profile'); setShowProfile(false);}}>Profile</button>
                      <button className="dropdown-item" onClick={() => {navigate('/settings'); setShowProfile(false);}}>Settings</button>
                      <div className="dropdown-divider"></div>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button>
                    </div>
                  )}
                </li>
              )}
              <li className="nav-item w-100 mt-3">
                <button className="btn btn-outline-primary w-100" onClick={() => setShowSearch(true)}><FaSearch className="me-2" /> Search</button>
              </li>
              <li className="nav-item w-100 mt-2">
                <button className="btn btn-outline-secondary w-100" onClick={() => setShowLang((v) => !v)}><FaGlobe className="me-2" /> Language</button>
              </li>
              <li className="nav-item w-100 mt-2">
                <Link 
                  to="/admin/access" 
                  className="btn btn-outline-primary w-100"
                  style={{textDecoration: 'none'}}
                  onClick={() => setMobileMenu(false)}
                >
                  <i className="fas fa-shield-alt me-2"></i>
                  Admin Access
                </Link>
              </li>
            </ul>
          </div>
        </div> {/* close container */}
      </nav> {/* close nav */}
      <style>{`
          .creova-logo-svg svg {
            display: block;
            border-radius: 50%;
            background: transparent;
            transition: background 0.2s;
          }
          body.dark-mode .creova-logo-svg svg {
            background: transparent;
          }
          .logo-hover:hover .logo-c {
            transform: scale(1.08) rotate(-2deg);
            box-shadow: 0 4px 18px rgba(0,120,212,0.18);
          }
          .navbar-nav .nav-link.active {
            color: #0078d4 !important;
            background: #d0e7fa;
            border-radius: 0.375rem 0.375rem 0 0;
          }
          .navbar-nav .nav-link:hover {
            color: #106ebe !important;
            background: #d0e7fa;
            border-radius: 0.375rem 0.375rem 0 0;
          }
          .active-underline {
            background: linear-gradient(90deg, #0078d4 60%, #40a9ff 100%);
            height: 3px;
            border-radius: 2px;
            position: absolute;
            left: 12px;
            right: 12px;
            bottom: 4px;
            transition: background 0.3s;
            z-index: 1;
            display: block;
          }
          .dropdown-menu {
            border-radius: 0.5rem;
            border: 1px solid #e5eaf1;
            min-width: 160px;
          }
          .dropdown-item {
            font-size: 1rem;
            padding: 0.65rem 1.25rem;
            color: #323130;
            transition: background 0.18s;
          }
          .dropdown-item:hover {
            background: #f3f8fd;
            color: #0078d4;
          }
          .dropdown-divider {
            height: 1px;
            background: #e5eaf1;
            margin: 0.5rem 0;
          }
          .avatar-initials {
            font-family: 'Segoe UI', sans-serif;
            text-transform: uppercase;
          }
          /* Mobile menu slide-in */
          .mobile-menu-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(30,40,60,0.18);
            z-index: 2000;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.25s;
          }
          .mobile-menu-overlay.show {
            opacity: 1;
            pointer-events: auto;
          }
          .mobile-menu {
            position: fixed;
            top: 0; right: -320px;
            width: 320px;
            max-width: 90vw;
            height: 100vh;
            background: #fff;
            box-shadow: -2px 0 24px rgba(0,0,0,0.08);
            z-index: 2100;
            transition: right 0.3s cubic-bezier(.77,0,.18,1);
            overflow-y: auto;
            outline: none;
          }
          .mobile-menu.open {
            right: 0;
          }
          @media (max-width: 991px) {
            .d-lg-flex { display: none !important; }
            .mobile-menu { display: block; }
          }
          @media (min-width: 992px) {
            .mobile-menu, .mobile-menu-overlay { display: none !important; }
          }
          /* Dark mode styles (optional) */
          body.dark-mode {
            background: #181f2c !important;
            color: #e3eaf7 !important;
          }
          body.dark-mode .navbar, body.dark-mode .mobile-menu {
            background: #232b3e !important;
            color: #e3eaf7 !important;
          }
          body.dark-mode .navbar .navbar-brand,
          body.dark-mode .navbar .fw-bold,
          body.dark-mode .navbar-nav .nav-link,
          body.dark-mode .navbar-nav .nav-link.active,
          body.dark-mode .navbar-nav .nav-link:hover {
            color: #fff !important;
          }
          body.dark-mode .navbar .logo-c {
            color: #fff !important;
            border-color: #fff !important;
            box-shadow: 0 0 16px 2px #1976d2, 0 0 32px 4px #40a9ff;
            background: linear-gradient(135deg, #1976d2 60%, #40a9ff 100%) !important;
            transition: box-shadow 0.3s, background 0.3s;
          }
          body.dark-mode .navbar .fw-bold.text-primary {
            background: linear-gradient(90deg, #40a9ff 0%, #1976d2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
            filter: drop-shadow(0 2px 8px #1976d2aa);
          }
          body.dark-mode .dropdown-menu {
            background: #232b3e !important;
            color: #e3eaf7 !important;
            border-color: #2d3952;
          }
          body.dark-mode .dropdown-item {
            color: #fff !important;
          }
          body.dark-mode .dropdown-item:hover {
            background: #1a2233 !important;
            color: #40a9ff !important;
          }
          body.dark-mode .btn-link, body.dark-mode .fa, body.dark-mode .react-icons {
            color: #fff !important;
          }
          .login-btn-custom:hover, .login-btn-custom:focus {
            background: linear-gradient(90deg, #1976d2 0%, #40a9ff 100%) !important;
            color: #fff !important;
            box-shadow: 0 2px 8px rgba(25,118,210,0.10) !important;
            transform: scale(1.06);
          }
          .register-btn-custom:hover, .register-btn-custom:focus {
            background: linear-gradient(90deg, #1976d2 0%, #40a9ff 100%) !important;
            color: #fff !important;
            border-color: #1976d2 !important;
            transform: scale(1.06);
          }
          .admin-btn-custom:hover, .admin-btn-custom:focus {
            background: linear-gradient(90deg, #1976d2 0%, #40a9ff 100%) !important;
            color: #fff !important;
          }
          .admin-btn-custom:hover .fa-user-shield, .admin-btn-custom:focus .fa-user-shield {
            color: #fff !important;
          }
          .navbar {
            background: #162447 !important;
            box-shadow: 0 6px 24px rgba(25, 118, 210, 0.18);
            border-bottom: 1.5px solid rgba(255,255,255,0.10);
            transition: background 0.2s, box-shadow 0.2s;
            z-index: 1030;
          }
          .navbar .nav-link, .navbar .navbar-brand, .navbar .btn-link, .navbar .fa, .navbar .react-icons {
            color: rgba(255,255,255,0.92) !important;
          }
          .navbar .nav-link.active, .navbar .nav-link:focus, .navbar .nav-link:hover {
            color: #40a9ff !important;
          }
          .navbar .fa-search, .navbar .fa-bell, .navbar .fa-globe {
            color: #40a9ff !important;
          }
          .navbar-toggler {
            border: none;
            background: rgba(255,255,255,0.12);
          }
          .navbar-toggler:focus {
            outline: none;
            box-shadow: 0 0 0 2px #40a9ff;
          }
          .dropdown-menu {
            background: rgba(30,40,60,0.98);
            color: #fff;
            border-radius: 14px;
            border: none;
            box-shadow: 0 8px 32px rgba(25,118,210,0.10);
          }
          .dropdown-item {
            color: #fff;
          }
          .dropdown-item:hover, .dropdown-item:focus {
            background: #1976d2;
            color: #fff;
          }
        `}</style>
      {/* Search Modal */}
      {showSearch && (
        <div className="search-modal position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{background: 'rgba(30,40,60,0.18)', zIndex: 3000}}>
          <div className="bg-white rounded shadow p-4" style={{minWidth: 320, maxWidth: 480, width: '90vw', position: 'relative'}}>
            <button className="btn btn-link position-absolute top-0 end-0 mt-2 me-2" aria-label="Close search" onClick={() => setShowSearch(false)}><FaTimes size={20} /></button>
            <form onSubmit={e => { e.preventDefault(); setShowSearch(false); }}>
              <input autoFocus type="text" className="form-control form-control-lg mb-3" placeholder="Search..." aria-label="Search input" />
              <button className="btn btn-primary w-100" type="submit"><FaSearch className="me-2" /> Search</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Header; 