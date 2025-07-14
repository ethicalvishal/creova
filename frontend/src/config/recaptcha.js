// reCAPTCHA Configuration
export const RECAPTCHA_CONFIG = {
  // Replace with your actual reCAPTCHA site key
  SITE_KEY: process.env.REACT_APP_RECAPTCHA_SITE_KEY || '6LcXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  
  // reCAPTCHA actions for different forms
  ACTIONS: {
    CONTACT_FORM: 'contact_form',
    CAREER_APPLICATION: 'career_application',
    NEWSLETTER_SIGNUP: 'newsletter_signup'
  },
  
  // Minimum score threshold (0.0 to 1.0)
  MIN_SCORE: 0.5,
  
  // Timeout for token refresh (in milliseconds)
  TOKEN_TIMEOUT: 2 * 60 * 1000, // 2 minutes
};

import { API_URL } from '../constants';

// Helper function to load reCAPTCHA script
export const loadRecaptchaScript = () => {
  return new Promise((resolve, reject) => {
    if (window.grecaptcha) {
      resolve(window.grecaptcha);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_CONFIG.SITE_KEY}`;
    script.onload = () => resolve(window.grecaptcha);
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

// Helper function to execute reCAPTCHA
export const executeRecaptcha = async (action) => {
  try {
    await loadRecaptchaScript();
    return await window.grecaptcha.execute(RECAPTCHA_CONFIG.SITE_KEY, { action });
  } catch (error) {
    console.error('reCAPTCHA execution failed:', error);
    return null;
  }
};

// Helper function to verify reCAPTCHA token on backend
export const verifyRecaptchaToken = async (token) => {
  try {
    const response = await fetch(`${API_URL.replace('/careers','').replace('/blog','')}/verify-recaptcha`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token })
    });
    
    const data = await response.json();
    return data.success && data.score >= RECAPTCHA_CONFIG.MIN_SCORE;
  } catch (error) {
    console.error('reCAPTCHA verification failed:', error);
    return false;
  }
}; 