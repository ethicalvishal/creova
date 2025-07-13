// API Configuration
export const API_CONFIG = {
  BASE_URL: 'http://localhost:5000',
  ENDPOINTS: {
    ADMIN: {
      VERIFY_CREDENTIALS: '/api/admin/verify-credentials',
      VERIFY_2FA: '/api/admin/verify-2fa',
      FINAL_AUTH: '/api/admin/final-auth',
      STATS: '/api/admin/stats',
      RECENT_ACTIVITY: '/api/admin/recent-activity',
      SYSTEM_STATUS: '/api/admin/system-status',
      SYSTEM_METRICS: '/api/admin/system-metrics',
      ANALYTICS: '/api/admin/analytics',
      SETTINGS: '/api/admin/settings',
      NOTIFICATIONS: '/api/admin/notifications',
      RECENT_APPLICATIONS: '/api/admin/recent-applications',
      RECENT_CONTACTS: '/api/admin/recent-contacts',
      TEST_EMAIL: '/api/admin/test-email',
      BACKUP: '/api/admin/backup'
    },
    CONTACT: {
      LIST: '/api/contact/list',
      UPDATE_STATUS: '/api/contact',
      DELETE: '/api/contact'
    },
    CAREERS: {
      APPLICATIONS: '/api/careers/applications',
      UPDATE_APPLICATION_STATUS: '/api/careers/applications',
      DELETE_APPLICATION: '/api/careers/applications'
    },
    BLOG: '/api/blog',
    USER: {
      REGISTER: '/api/user/register',
      LOGIN: '/api/user/login',
      LIST: '/api/user/list',
      ADD: '/api/user/add',
      DELETE: '/api/user/delete'
    },
    SERVICES: '/api/services',
    TEAM: '/api/team',
    LEGAL: '/api/legal',
    HEALTH: '/api/health'
  }
};

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
}; 