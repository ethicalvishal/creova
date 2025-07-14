import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

// Import constants
// import { APP_CONSTANTS, PAGE_TITLES, MESSAGES, isLaunched, isCelebrationActive } from './constants';

// Import components
import Header from './components/Header';
import Footer from './components/Footer';

// Import pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Careers from './pages/Careers';
import Products from './pages/Products';
import Blog, { UXAudit, FundingAdvice, ScalableProject, MVPConsultation, CloudConsultation } from './pages/Blog';
import Contact from './pages/Contact';
import AdminJobs from './pages/AdminJobs';
import AdminBlog from './pages/AdminBlog';
import AdminContacts from './pages/AdminContacts';
import AdminApplications from './pages/AdminApplications';
import AdminLogin from './pages/AdminLogin';
import AdminAccess from './pages/AdminAccess';
import AdminDashboard from './pages/AdminDashboard';
import AdminOverview from './pages/AdminOverview';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminSettings from './pages/AdminSettings';
import AdminUsers from './pages/AdminUsers';
import AdminServices from './pages/AdminServices';
import AdminTeam from './pages/AdminTeam';
import AdminLegal from './pages/AdminLegal';
import AdminProfile from './pages/AdminProfile';
import AdminProducts from './pages/AdminProducts';
import AdminForgotPassword from './pages/AdminForgotPassword';
import UserRegister from './pages/UserRegister';
import UserLogin from './pages/UserLogin';
import UserDashboard from './pages/UserDashboard';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Sitemap from './pages/Sitemap';
import NotFound from './pages/NotFound';
import BlogDetail from './pages/BlogDetail';
// import LaunchingSoon from './pages/LaunchingSoon';
// import CelebrationEvent from './pages/CelebrationEvent';
// import UserLogin from './pages/UserLogin';
// import UserRegister from './pages/UserRegister';
// import AdminProfile from './pages/AdminProfile';
// import AdminProducts from './pages/AdminProducts';
// import BlogDetail from './pages/BlogDetail';
// import AdminForgotPassword from './pages/AdminForgotPassword';

// Import launch notification system
import { initializeLaunchSystem } from './utils/launchNotification';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

// PrivateRoute for protecting routes
function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
}

// AdminRoute for protecting admin routes
function AdminRoute({ children }) {
  const adminToken = localStorage.getItem('adminToken');
  return adminToken ? children : <Navigate to="/admin/login" replace />;
}

function App() {
  // Initialize launch notification system
  useEffect(() => {
    const cleanup = initializeLaunchSystem();
    return cleanup;
  }, []);

  const location = window.location.pathname;
  // const isAdminRoute = location.startsWith('/admin');
  // Show LaunchingSoon before launch
  // if (!isLaunched() && !isAdminRoute) {
  //   return <LaunchingSoon />;
  // }
  // Show CelebrationEvent for 24 hours after launch
  // if (isCelebrationActive() && !isAdminRoute) {
  //   return <CelebrationEvent />;
  // }

  return (
    <Router>
      {/* Global animated IT background */}
      <div id="global-bg-animated">
        {/* Animated SVG gradient */}
        <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="none" style={{position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0}}>
          <defs>
            <linearGradient id="global-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1976d2" />
              <stop offset="100%" stopColor="#40a9ff" />
            </linearGradient>
          </defs>
          <path d="M0,800 Q480,1000 960,800 T1920,800 L1920,1080 L0,1080 Z" fill="url(#global-gradient)">
            <animate attributeName="d" dur="16s" repeatCount="indefinite"
              values="M0,800 Q480,1000 960,800 T1920,800 L1920,1080 L0,1080 Z;
                      M0,820 Q480,900 960,900 T1920,820 L1920,1080 L0,1080 Z;
                      M0,800 Q480,1000 960,800 T1920,800 L1920,1080 L0,1080 Z" />
          </path>
        </svg>
        {/* Subtle SVG tech pattern overlay */}
        <svg className="tech-pattern" width="100%" height="100%" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#1976d2" strokeWidth="1">
            {/* Dots grid */}
            {Array.from({length: 40}).map((_, i) => (
              <circle key={i} cx={48 + (i%20)*96} cy={48 + Math.floor(i/20)*96} r="2.5" />
            ))}
            {/* Diagonal lines */}
            <line x1="0" y1="0" x2="1920" y2="1080" />
            <line x1="0" y1="1080" x2="1920" y2="0" />
          </g>
        </svg>
      </div>
      <ScrollToTop />
      <div className="App">
        {/* Animated Background */}
        {/* <div className="animated-bg">
          <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="none" style={{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none'}}>
            <defs>
              <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#12c2e9">
                  <animate attributeName="stop-color" values="#12c2e9;#0FC2C0;#1976D2;#12c2e9" dur="12s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#1976D2">
                  <animate attributeName="stop-color" values="#1976D2;#0FC2C0;#12c2e9;#1976D2" dur="12s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
            </defs>
            <path d="M0,800 Q480,1000 960,800 T1920,800 L1920,1080 L0,1080 Z" fill="url(#bg-gradient)">
              <animate attributeName="d" dur="10s" repeatCount="indefinite"
                values="M0,800 Q480,1000 960,800 T1920,800 L1920,1080 L0,1080 Z;
                        M0,820 Q480,900 960,900 T1920,820 L1920,1080 L0,1080 Z;
                        M0,800 Q480,1000 960,800 T1920,800 L1920,1080 L0,1080 Z" />
            </path>
          </svg>
        </div> */}
        {/* End Animated Background */}
        <Header />
        <main style={{position: 'relative', zIndex: 1}}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/products" element={<Products />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<Blog />} />
            <Route path="/blog/read/:id" element={<BlogDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/access" element={<AdminAccess />} />
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/overview" element={<AdminRoute><AdminOverview /></AdminRoute>} />
            <Route path="/admin/analytics" element={<AdminRoute><AdminAnalytics /></AdminRoute>} />
            <Route path="/admin/settings" element={<AdminRoute><AdminSettings /></AdminRoute>} />
            <Route path="/admin/jobs" element={<AdminRoute><AdminJobs /></AdminRoute>} />
            <Route path="/admin/blog" element={<AdminRoute><AdminBlog /></AdminRoute>} />
            <Route path="/admin/contacts" element={<AdminRoute><AdminContacts /></AdminRoute>} />
            <Route path="/admin/applications" element={<AdminRoute><AdminApplications /></AdminRoute>} />
            <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
            <Route path="/admin/services" element={<AdminRoute><AdminServices /></AdminRoute>} />
            <Route path="/admin/team" element={<AdminRoute><AdminTeam /></AdminRoute>} />
            <Route path="/admin/legal" element={<AdminRoute><AdminLegal /></AdminRoute>} />
            <Route path="/admin/profile" element={<AdminRoute><AdminProfile /></AdminRoute>} />
            <Route path="/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
            <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
            <Route path="/register" element={<UserRegister />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="/ux-audit" element={<UXAudit />} />
            <Route path="/funding-advice" element={<FundingAdvice />} />
            <Route path="/scalable-project" element={<ScalableProject />} />
            <Route path="/mvp-consultation" element={<MVPConsultation />} />
            <Route path="/cloud-consultation" element={<CloudConsultation />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
