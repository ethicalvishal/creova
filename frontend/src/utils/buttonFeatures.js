// Button Features and Interactions Utility
export const buttonFeatures = {
  // Contact form submission with real API integration
  contactForm: {
    submit: async (formData) => {
      try {
        const response = await fetch('http://localhost:5000/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        return { success: response.ok, data };
      } catch (error) {
        console.error('Contact form error:', error);
        return { success: false, error: 'Network error. Please try again.' };
      }
    }
  },

  // Service booking functionality
  serviceBooking: {
    bookConsultation: (service) => {
      // Redirect to contact form with pre-filled service
      const contactUrl = `/contact?service=${encodeURIComponent(service)}`;
      window.location.href = contactUrl;
    },
    
    getQuote: (service) => {
      // Open quote calculator modal
      return {
        service,
        estimatedCost: calculateServiceCost(service),
        timeline: getServiceTimeline(service)
      };
    }
  },

  // User registration and login
  auth: {
    register: async (userData) => {
      try {
        const response = await fetch('http://localhost:5000/api/user/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData)
        });
        
        const data = await response.json();
        return { success: response.ok, data };
      } catch (error) {
        console.error('Registration error:', error);
        return { success: false, error: 'Registration failed. Please try again.' };
      }
    },

    login: async (credentials) => {
      try {
        const response = await fetch('http://localhost:5000/api/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials)
        });
        
        const data = await response.json();
        return { success: response.ok, data };
      } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: 'Login failed. Please try again.' };
      }
    }
  },

  // Career application functionality
  careers: {
    applyForJob: async (jobData) => {
      try {
        const formData = new FormData();
        Object.keys(jobData).forEach(key => {
          formData.append(key, jobData[key]);
        });

        const response = await fetch('http://localhost:5000/api/careers/apply', {
          method: 'POST',
          body: formData
        });
        
        const data = await response.json();
        return { success: response.ok, data };
      } catch (error) {
        console.error('Job application error:', error);
        return { success: false, error: 'Application failed. Please try again.' };
      }
    }
  },

  // Blog functionality
  blog: {
    subscribe: async (email) => {
      try {
        const response = await fetch('http://localhost:5000/api/blog/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email })
        });
        
        const data = await response.json();
        return { success: response.ok, data };
      } catch (error) {
        console.error('Blog subscription error:', error);
        return { success: false, error: 'Subscription failed. Please try again.' };
      }
    }
  },

  // Notification system
  notifications: {
    show: (message, type = 'info') => {
      // Create notification element
      const notification = document.createElement('div');
      notification.className = `alert alert-${type} notification-toast`;
      notification.innerHTML = `
        <div class="d-flex align-items-center">
          <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} me-2"></i>
          <span>${message}</span>
          <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
      `;
      
      // Add to page
      document.body.appendChild(notification);
      
      // Auto remove after 5 seconds
      setTimeout(() => {
        if (notification.parentElement) {
          notification.remove();
        }
      }, 5000);
    }
  },

  // Search functionality
  search: {
    globalSearch: async (query) => {
      try {
        const response = await fetch(`http://localhost:5000/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        return { success: response.ok, data };
      } catch (error) {
        console.error('Search error:', error);
        return { success: false, error: 'Search failed. Please try again.' };
      }
    }
  },

  // Language switching
  language: {
    switch: (language) => {
      // Store language preference
      localStorage.setItem('preferredLanguage', language);
      
      // Reload page with new language
      window.location.reload();
    }
  }
};

// Helper functions
function calculateServiceCost(service) {
  const costs = {
    'MVP Development': '₹50K - ₹2L',
    'AI & Automation': '₹80K - ₹5L',
    'Mobile Apps': '₹60K - ₹3L',
    'UI/UX Design': '₹30K - ₹1.5L',
    'Cloud Solutions': '₹40K - ₹2L',
    'Growth Strategy': '₹25K - ₹1L'
  };
  return costs[service] || 'Contact for quote';
}

function getServiceTimeline(service) {
  const timelines = {
    'MVP Development': '2-4 weeks',
    'AI & Automation': '4-8 weeks',
    'Mobile Apps': '6-10 weeks',
    'UI/UX Design': '2-3 weeks',
    'Cloud Solutions': '3-5 weeks',
    'Growth Strategy': 'Ongoing'
  };
  return timelines[service] || 'Varies by project';
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
  .notification-toast {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    min-width: 300px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    animation: slideIn 0.3s ease-out;
  }
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
document.head.appendChild(style); 