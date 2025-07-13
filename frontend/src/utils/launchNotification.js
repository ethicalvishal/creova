// Launch Notification System for Creova Technologies
// This system automatically handles the transition from pre-launch to post-launch on July 22, 2025

import { APP_CONSTANTS } from '../constants';

// Launch date configuration
// Always parse as IST (Indian Standard Time)
const LAUNCH_TIME = new Date(APP_CONSTANTS.LAUNCH_DATE); // This is already in IST (2025-07-19T08:00:00+05:30)

// Launch notification types
export const LAUNCH_NOTIFICATIONS = {
  PRE_LAUNCH: 'pre-launch',
  LAUNCH_DAY: 'launch-day',
  POST_LAUNCH: 'post-launch'
};

// Get current launch phase
export const getLaunchPhase = () => {
  const now = new Date();
  const timeUntilLaunch = LAUNCH_TIME - now;
  
  if (timeUntilLaunch > 0) {
    return LAUNCH_NOTIFICATIONS.PRE_LAUNCH;
  } else if (timeUntilLaunch > -24 * 60 * 60 * 1000) { // Within 24 hours of launch
    return LAUNCH_NOTIFICATIONS.LAUNCH_DAY;
  } else {
    return LAUNCH_NOTIFICATIONS.POST_LAUNCH;
  }
};

// Get time until launch
export const getTimeUntilLaunch = () => {
  const now = new Date();
  const timeUntilLaunch = LAUNCH_TIME - now;
  
  if (timeUntilLaunch <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isLaunched: true
    };
  }
  
  const days = Math.floor(timeUntilLaunch / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeUntilLaunch % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeUntilLaunch % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeUntilLaunch % (1000 * 60)) / 1000);
  
  return {
    days,
    hours,
    minutes,
    seconds,
    isLaunched: false
  };
};

// Launch day celebration messages
export const getLaunchDayMessage = () => {
  const phase = getLaunchPhase();
  
  switch (phase) {
    case LAUNCH_NOTIFICATIONS.LAUNCH_DAY:
      return {
        title: "🚀 We're Live!",
        subtitle: "Creova Technologies is now officially launched!",
        message: "Welcome to the future of startup technology. We're excited to help you build, launch, and scale your startup!",
        cta: "Get Started Now",
        type: "success"
      };
    case LAUNCH_NOTIFICATIONS.POST_LAUNCH:
      return {
        title: "🎉 Launch Success!",
        subtitle: "Creova Technologies is live and helping startups grow",
        message: "We've successfully launched and are already helping founders build amazing products. Join the revolution!",
        cta: "Explore Our Services",
        type: "success"
      };
    default:
      return null;
  }
};

// Pre-launch countdown messages
export const getPreLaunchMessage = () => {
  const { days, hours, minutes } = getTimeUntilLaunch();
  
  if (days > 30) {
    return {
      title: "Coming Soon",
      subtitle: `Launching in ${days} days`,
      message: "We're building something amazing for founders and startups. Stay tuned for updates!",
      cta: "Get Notified",
      type: "info"
    };
  } else if (days > 7) {
    return {
      title: "Almost There",
      subtitle: `${days} days until launch`,
      message: "The countdown is on! We're finalizing everything to bring you the best startup technology platform.",
      cta: "Get Early Access",
      type: "warning"
    };
  } else if (days > 1) {
    return {
      title: "Final Countdown",
      subtitle: `${days} days, ${hours} hours to go`,
      message: "We're in the final stretch! Get ready for the launch of Creova Technologies.",
      cta: "Join the Waitlist",
      type: "warning"
    };
  } else {
    return {
      title: "Launch Day Tomorrow!",
      subtitle: `${hours} hours, ${minutes} minutes remaining`,
      message: "Tomorrow is the big day! Creova Technologies launches and we can't wait to help you build your startup.",
      cta: "Final Reminder",
      type: "danger"
    };
  }
};

// Automatic launch trigger system
export const setupLaunchTrigger = (callback) => {
  const checkLaunch = () => {
    const now = new Date();
    const timeUntilLaunch = LAUNCH_TIME - now;
    
    if (timeUntilLaunch <= 0) {
      // Launch has occurred
      callback({
        type: 'LAUNCH_TRIGGERED',
        timestamp: now,
        message: 'Creova Technologies has officially launched!'
      });
      
      // Clear the interval since launch has occurred
      clearInterval(launchCheckInterval);
    }
  };
  
  // Check every minute
  const launchCheckInterval = setInterval(checkLaunch, 60 * 1000);
  
  // Initial check
  checkLaunch();
  
  // Return cleanup function
  return () => clearInterval(launchCheckInterval);
};

// Launch celebration effects
export const triggerLaunchCelebration = () => {
  // Add celebration CSS classes
  document.body.classList.add('launch-celebration');
  
  // Create confetti effect
  createConfetti();
  
  // Show launch notification
  showLaunchNotification();
  
  // Remove celebration classes after 10 seconds
  setTimeout(() => {
    document.body.classList.remove('launch-celebration');
  }, 10000);
};

// Confetti effect for launch celebration
const createConfetti = () => {
  const colors = ['#0FC2C0', '#2B2D42', '#7209b7', '#533483', '#12c2e9'];
  
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.top = '-10px';
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.borderRadius = '50%';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '9999';
    confetti.style.animation = `confetti-fall ${Math.random() * 3 + 2}s linear forwards`;
    
    document.body.appendChild(confetti);
    
    // Remove confetti after animation
    setTimeout(() => {
      if (confetti.parentNode) {
        confetti.parentNode.removeChild(confetti);
      }
    }, 5000);
  }
};

// Show launch notification
const showLaunchNotification = () => {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #0FC2C0 0%, #12c2e9 100%);
    color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    z-index: 10000;
    max-width: 300px;
    animation: slideInRight 0.5s ease-out;
  `;
  
  notification.innerHTML = `
    <h4 style="margin: 0 0 10px 0; font-size: 18px;">🚀 We're Live!</h4>
    <p style="margin: 0; font-size: 14px;">Creova Technologies has officially launched! Welcome to the future of startup technology.</p>
  `;
  
  document.body.appendChild(notification);
  
  // Remove notification after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = 'slideOutRight 0.5s ease-in';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 500);
    }
  }, 5000);
};

// Add celebration CSS animations
export const addLaunchStyles = () => {
  if (!document.getElementById('launch-celebration-styles')) {
    const style = document.createElement('style');
    style.id = 'launch-celebration-styles';
    style.textContent = `
      @keyframes confetti-fall {
        to {
          transform: translateY(100vh) rotate(360deg);
          opacity: 0;
        }
      }
      
      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes slideOutRight {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
      
      .launch-celebration {
        animation: launch-pulse 0.5s ease-in-out;
      }
      
      @keyframes launch-pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
      }
    `;
    document.head.appendChild(style);
  }
};

// Initialize launch system
export const initializeLaunchSystem = () => {
  // Add celebration styles
  addLaunchStyles();
  
  // Setup launch trigger
  const cleanup = setupLaunchTrigger((event) => {
    if (event.type === 'LAUNCH_TRIGGERED') {
      // Trigger celebration effects
      triggerLaunchCelebration();
      
      // Reload the page to show post-launch content
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  });
  
  // Return cleanup function
  return cleanup;
};

// Export launch utilities
export default {
  getLaunchPhase,
  getTimeUntilLaunch,
  getLaunchDayMessage,
  getPreLaunchMessage,
  setupLaunchTrigger,
  triggerLaunchCelebration,
  initializeLaunchSystem
}; 