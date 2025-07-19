export const API_URL = "https://creova-backend.onrender.com/api";
// Centralized constants for Creova Technologies
export const APP_CONSTANTS = {
  COMPANY_NAME: 'Creova Technologies',
  COMPANY_TAGLINE: 'Building the Future of Startups',
  NOTIFY_ME: 'Notify Me',
  PRE_LAUNCH: 'pre-launch',
  LAUNCHING_SOON_BADGE: '🚀 Launching Soon',
  GET_NOTIFIED: 'Get Notified',
  EARLY_ACCESS: 'Early Access',
  STAY_TUNED: 'Stay Tuned',
  COMING_SOON_ALT: 'Coming Soon', // Alternative if needed
  LAUNCH_DATE: '2025-07-19T08:00:00+05:30', // 19 July 2025, 8:00 AM IST
  CELEBRATION_WINDOW_HOURS: 24,
  LAUNCHED_BADGE: '🚀 Now Live!',
  LAUNCHED: 'Now Live!',
  
  // Post-launch content
  POST_LAUNCH_TAGLINE: 'Building with Passion and Curiosity',
  POST_LAUNCH_DESCRIPTION: 'Creova Technologies is a new journey started by a fresher passionate about technology and learning. We help startups get started and grow together.',
  GET_STARTED: 'Get Started',
  START_PROJECT: 'Start Your Project',
  EXPLORE_SERVICES: 'Explore Services',
  CONTACT_US: 'Contact Us',
  BOOK_CONSULTATION: 'Book Consultation',
  VIEW_PORTFOLIO: 'View Portfolio',
  READ_CASE_STUDIES: 'Read Case Studies',
  HIRE_US: 'Hire Us',
  GET_QUOTE: 'Get Quote',
  SCHEDULE_CALL: 'Schedule Call'
};

// Get appropriate badge text based on launch status
export const getLaunchBadge = () => {
  return APP_CONSTANTS.LAUNCHED_BADGE;
};

// Get appropriate status text based on launch status
export const getLaunchStatus = () => {
  return APP_CONSTANTS.LAUNCHED;
};

// Get appropriate tagline based on launch status
export const getCompanyTagline = () => {
  return APP_CONSTANTS.POST_LAUNCH_TAGLINE;
};

// Get appropriate description based on launch status
export const getCompanyDescription = () => {
  return APP_CONSTANTS.POST_LAUNCH_DESCRIPTION;
};

// Get appropriate CTA button text based on launch status
export const getCTAButtonText = (type = 'default') => {
  switch (type) {
    case 'hero': return APP_CONSTANTS.START_PROJECT;
    case 'services': return APP_CONSTANTS.EXPLORE_SERVICES;
    case 'contact': return APP_CONSTANTS.CONTACT_US;
    case 'consultation': return APP_CONSTANTS.BOOK_CONSULTATION;
    case 'portfolio': return APP_CONSTANTS.VIEW_PORTFOLIO;
    case 'case_studies': return APP_CONSTANTS.READ_CASE_STUDIES;
    case 'hire': return APP_CONSTANTS.HIRE_US;
    case 'quote': return APP_CONSTANTS.GET_QUOTE;
    case 'call': return APP_CONSTANTS.SCHEDULE_CALL;
    default: return APP_CONSTANTS.GET_STARTED;
  }
};

// Post-launch company stats
export const getCompanyStats = () => {
  return {
    projects: '-',
    clients: '-',
    revenue: '-',
    satisfaction: '-',
    team: '-',
    experience: '-',
    countries: '-',
    awards: '-'
  };
};

// Post-launch testimonials - Keep as placeholders until real success stories are available
export const getPostLaunchTestimonials = () => {
  // Return empty array to keep current placeholder testimonials
  // This will be updated when real success stories are available
  return [];
};

// Post-launch services with pricing
export const getPostLaunchServices = () => {
  return [
    {
      id: 'mvp',
      icon: '🚀',
      title: 'MVP Development',
      desc: 'Get your startup idea to market in 2-4 weeks. We build fast, scalable MVPs that validate your business model and attract investors.',
      features: ['2-4 week delivery', 'Investor-ready demos', 'Scalable architecture', 'User feedback integration'],
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      price: 'From ₹50K',
      duration: '2-4 weeks',
      popular: false
    },
    {
      id: 'ai',
      icon: '🤖',
      title: 'AI & Automation',
      desc: 'Leverage cutting-edge AI to automate processes, analyze data, and create intelligent solutions that give you a competitive edge.',
      features: ['Custom AI models', 'Process automation', 'Data analytics', 'Predictive insights'],
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      price: 'From ₹80K',
      duration: '4-8 weeks',
      popular: true
    },
    {
      id: 'mobile',
      icon: '📱',
      title: 'Mobile Apps',
      desc: 'Native and cross-platform mobile applications that users love. From concept to App Store in record time.',
      features: ['iOS & Android', 'Cross-platform', 'App Store optimization', 'Push notifications'],
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      price: 'From ₹60K',
      duration: '6-10 weeks',
      popular: false
    },
    {
      id: 'uiux',
      icon: '🎨',
      title: 'UI/UX Design',
      desc: 'Beautiful, intuitive interfaces that convert visitors into customers. Design that drives growth and engagement.',
      features: ['User research', 'Wireframes & prototypes', 'Design systems', 'Usability testing'],
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      price: 'From ₹30K',
      duration: '2-3 weeks',
      popular: false
    },
    {
      id: 'cloud',
      icon: '☁️',
      title: 'Cloud Solutions',
      desc: 'Scalable cloud infrastructure that grows with your startup. From AWS to serverless, we\'ve got you covered.',
      features: ['AWS/Azure/GCP', 'Serverless architecture', 'DevOps automation', 'Cost optimization'],
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      price: 'From ₹40K',
      duration: '3-5 weeks',
      popular: false
    },
    {
      id: 'growth',
      icon: '📊',
      title: 'Growth Strategy',
      desc: 'Data-driven growth strategies and analytics to help your startup scale efficiently and sustainably.',
      features: ['Growth hacking', 'Analytics setup', 'A/B testing', 'Conversion optimization'],
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      price: 'From ₹25K',
      duration: 'Ongoing',
      popular: false
    }
  ];
};

// Post-launch products with real features
export const getPostLaunchProducts = () => {
  return [
    {
      id: 'creovacrm',
      name: 'CreovaCRM',
      tagline: 'Customer Relationship Management for Startups',
      desc: 'Streamline your sales process, manage leads, and grow your customer base with our intuitive CRM platform.',
      icon: '📊',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      features: ['Lead Management', 'Sales Pipeline', 'Customer Analytics', 'Email Integration'],
      price: '₹2,999/month',
      trial: '14 days free',
      users: 'Unlimited',
      popular: true
    },
    {
      id: 'creovapay',
      name: 'CreovaPay',
      tagline: 'Payment Processing Made Simple',
      desc: 'Accept payments online and in-person with our secure, developer-friendly payment platform.',
      icon: '💳',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      features: ['Online Payments', 'Mobile POS', 'Subscription Billing', 'Fraud Protection'],
      price: '₹1,999/month',
      trial: '30 days free',
      users: 'Unlimited',
      popular: false
    },
    {
      id: 'creovadesk',
      name: 'CreovaDesk',
      tagline: 'Help Desk & Customer Support',
      desc: 'Deliver exceptional customer support with our comprehensive help desk solution.',
      icon: '🎧',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      features: ['Ticket Management', 'Live Chat', 'Knowledge Base', 'Customer Analytics'],
      price: '₹1,499/month',
      trial: '14 days free',
      users: 'Unlimited',
      popular: false
    }
  ];
};

// Post-launch blog posts
export const getPostLaunchBlogPosts = () => {
  return [
    {
      id: 1,
      title: "How We Built a ₹10M Startup in 6 Months",
      excerpt: "The complete journey of building and scaling a startup from idea to millions in revenue. Lessons learned, challenges faced, and strategies that worked.",
      author: "Vishal Singh",
      date: "2025-07-22",
      readTime: "8 min read",
      category: "Startup Stories",
      image: "/images/blog/startup-journey.jpg",
      featured: true
    },
    {
      id: 2,
      title: "AI-Powered Growth: The Future of Startup Marketing",
      excerpt: "Discover how artificial intelligence is revolutionizing startup marketing and customer acquisition strategies.",
      author: "Priya Sharma",
      date: "2025-07-20",
      readTime: "6 min read",
      category: "AI & Technology",
      image: "/images/blog/ai-marketing.jpg",
      featured: false
    },
    {
      id: 3,
      title: "MVP Development: From Idea to Market in 2 Weeks",
      excerpt: "A step-by-step guide to building and launching your MVP quickly while validating your business model.",
      author: "Rahul Verma",
      date: "2025-07-18",
      readTime: "10 min read",
      category: "Development",
      image: "/images/blog/mvp-guide.jpg",
      featured: false
    }
  ];
};

// Post-launch team members - Keep as placeholders until real team members are announced
export const getPostLaunchTeam = () => {
  // Return empty array to keep current placeholder team members
  // This will be updated when real team members are announced
  return [];
};

// Post-launch careers - Keep as placeholders until real job openings are available
export const getPostLaunchCareers = () => {
  // Return empty array to keep current placeholder job listings
  // This will be updated when real job openings are available
  return [];
};

// Common messages
export const MESSAGES = {
  PRE_LAUNCH_DESCRIPTION: 'We\'re a passionate team building something amazing for founders and startups. Our journey is just beginning—stay tuned for updates and early access.',
  NOTIFY_WHEN_LIVE: 'Sign up to get notified when we launch!',
  GET_NOTIFIED_CTA: 'Want to get notified when we launch?',
  EARLY_ACCESS_CTA: 'Want Early Access?',
  JOIN_TEAM_CTA: 'Want to Join Our Team?',
  
  // Post-launch messages
  POST_LAUNCH_HERO: 'We help founders build, launch, and scale their startups faster than anyone else. From MVP to millions in revenue.',
  POST_LAUNCH_SERVICES: 'Comprehensive technology solutions designed specifically for startups. Fast, scalable, and results-driven.',
  POST_LAUNCH_PRODUCTS: 'Ready-to-use products that help startups grow. Built by founders, for founders.',
  POST_LAUNCH_CAREERS: 'Join our mission to empower startups worldwide. Work with cutting-edge technology and amazing people.',
  POST_LAUNCH_CONTACT: 'Ready to start your journey? Let\'s discuss your project and see how we can help bring your vision to life.',
  POST_LAUNCH_BLOG: 'Insights, strategies, and stories from the startup world. Learn from our experiences and success stories.'
};

// Page-specific constants
export const PAGE_TITLES = {
  HOME: 'Creova Technologies',
  ABOUT: 'About Us',
  SERVICES: 'Our Services',
  PRODUCTS: 'Our Products', 
  BLOG: 'Our Blog',
  CAREERS: 'Careers',
  CONTACT: 'Contact Us',
}; 