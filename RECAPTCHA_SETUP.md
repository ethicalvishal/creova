# 🔒 reCAPTCHA v3 Setup Guide

This guide explains how to set up Google reCAPTCHA v3 for enhanced spam protection on the Creova Technologies website.

## 🚀 What is reCAPTCHA v3?

reCAPTCHA v3 is Google's latest version that runs in the background without user interaction. It analyzes user behavior and assigns a score (0.0 to 1.0) based on how likely the interaction is from a human vs. a bot.

## 📋 Prerequisites

1. Google account
2. Access to Google reCAPTCHA admin console
3. Domain name for your website

## 🔧 Setup Steps

### 1. Create reCAPTCHA Keys

1. **Go to Google reCAPTCHA Admin Console:**
   - Visit: https://www.google.com/recaptcha/admin
   - Sign in with your Google account

2. **Create a new site:**
   - Click "Create" or "+" button
   - Choose "reCAPTCHA v3"
   - Add your domain(s):
     - `localhost` (for development)
     - `yourdomain.com` (for production)
     - `*.yourdomain.com` (for subdomains)

3. **Get your keys:**
   - **Site Key**: Used in frontend (public)
   - **Secret Key**: Used in backend (private)

### 2. Frontend Configuration

1. **Update Environment Variables:**
   Create `.env` file in `frontend/` directory:
   ```env
   REACT_APP_RECAPTCHA_SITE_KEY=your_site_key_here
   ```

2. **Update Configuration:**
   In `frontend/src/config/recaptcha.js`:
   ```javascript
   SITE_KEY: process.env.REACT_APP_RECAPTCHA_SITE_KEY || 'your_site_key_here',
   ```

### 3. Backend Configuration

1. **Install Dependencies:**
   ```bash
   cd backend
   npm install axios
   ```

2. **Update Environment Variables:**
   Create `.env` file in `backend/` directory:
   ```env
   RECAPTCHA_SECRET_KEY=your_secret_key_here
   ```

3. **Add reCAPTCHA Routes:**
   In `backend/app.js` or `backend/server.js`:
   ```javascript
   const { router: recaptchaRouter } = require('./routes/recaptcha');
   app.use('/api/recaptcha', recaptchaRouter);
   ```

4. **Protect Contact Form:**
   In `backend/routes/contact.js`:
   ```javascript
   const { verifyRecaptcha } = require('./recaptcha');
   
   router.post('/submit', verifyRecaptcha, async (req, res) => {
     // Your contact form logic here
     // req.recaptchaVerified will be true if verification passed
     // req.recaptchaScore will contain the score (0.0 to 1.0)
   });
   ```

## 🎯 Features Implemented

### ✅ Frontend Features
- **Invisible Protection**: No user interaction required
- **Automatic Token Generation**: Tokens generated on page load
- **Token Refresh**: New tokens generated after form submission
- **Visual Indicator**: Shows "Protected by Google reCAPTCHA v3"
- **Error Handling**: Graceful fallback if reCAPTCHA fails

### ✅ Backend Features
- **Token Verification**: Validates tokens with Google
- **Score Threshold**: Configurable minimum score (default: 0.5)
- **Middleware**: Reusable verification middleware
- **Logging**: Detailed logs for monitoring
- **Error Handling**: Comprehensive error responses

### ✅ Security Features
- **Score-Based Protection**: Different actions for different scores
- **Action-Specific Verification**: Different actions for different forms
- **Rate Limiting**: Built-in protection against abuse
- **Domain Verification**: Ensures tokens come from your domain

## 🔍 How It Works

1. **Page Load**: reCAPTCHA script loads and generates initial token
2. **Form Submission**: Fresh token generated and sent with form data
3. **Backend Verification**: Token verified with Google's servers
4. **Score Analysis**: Score checked against threshold (0.5)
5. **Response**: Form processed only if verification passes

## 📊 Score Interpretation

- **0.9 - 1.0**: Very likely human
- **0.7 - 0.9**: Likely human
- **0.5 - 0.7**: Possibly human
- **0.3 - 0.5**: Possibly bot
- **0.0 - 0.3**: Very likely bot

## 🛠 Configuration Options

### Score Threshold
```javascript
// In backend/routes/recaptcha.js
const minScore = 0.5; // Adjust based on your needs
```

### Token Timeout
```javascript
// In frontend/src/config/recaptcha.js
TOKEN_TIMEOUT: 2 * 60 * 1000, // 2 minutes
```

### Different Actions
```javascript
// For different forms
CONTACT_FORM: 'contact_form',
CAREER_APPLICATION: 'career_application',
NEWSLETTER_SIGNUP: 'newsletter_signup'
```

## 🚨 Troubleshooting

### Common Issues

1. **"reCAPTCHA verification failed"**
   - Check if site key and secret key match
   - Verify domain is added to reCAPTCHA console
   - Check if keys are correctly set in environment variables

2. **"Score too low"**
   - Lower the score threshold temporarily
   - Check if user behavior is triggering low scores
   - Monitor logs for patterns

3. **Script not loading**
   - Check internet connection
   - Verify site key is correct
   - Check browser console for errors

### Debug Mode

Enable debug logging:
```javascript
// In frontend/src/config/recaptcha.js
const DEBUG = process.env.NODE_ENV === 'development';
```

## 📈 Monitoring

### Logs to Monitor
- reCAPTCHA verification success/failure
- Score distributions
- Failed verification attempts
- Token generation errors

### Metrics to Track
- Average score per form submission
- Verification success rate
- Bot detection rate
- Performance impact

## 🔐 Security Best Practices

1. **Never expose secret key in frontend**
2. **Use environment variables for all keys**
3. **Implement rate limiting**
4. **Monitor for unusual patterns**
5. **Regularly update score thresholds**
6. **Log security events**

## 🎉 Benefits

- **Zero User Friction**: No CAPTCHA puzzles
- **Advanced Protection**: AI-powered bot detection
- **Scalable**: Works for any form on your site
- **Customizable**: Adjustable score thresholds
- **Analytics**: Detailed insights into user behavior

---

**Need Help?** Contact the development team for assistance with reCAPTCHA setup and configuration. 