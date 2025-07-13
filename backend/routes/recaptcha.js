const express = require('express');
const router = express.Router();
const axios = require('axios');

// reCAPTCHA secret key (should be in environment variables)
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY || 'your_recaptcha_secret_key_here';

// Verify reCAPTCHA token
router.post('/verify', async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'reCAPTCHA token is required'
      });
    }

    // Verify token with Google
    const verificationResponse = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: RECAPTCHA_SECRET_KEY,
          response: token
        }
      }
    );

    const { success, score, action, challenge_ts, hostname } = verificationResponse.data;

    // Check if verification was successful
    if (!success) {
      return res.status(400).json({
        success: false,
        message: 'reCAPTCHA verification failed',
        errors: verificationResponse.data['error-codes']
      });
    }

    // Check score threshold (0.0 to 1.0, where 1.0 is very likely a good interaction)
    const minScore = 0.5;
    if (score < minScore) {
      return res.status(400).json({
        success: false,
        message: 'reCAPTCHA score too low',
        score: score,
        minScore: minScore
      });
    }

    // Log verification details for monitoring
    console.log('reCAPTCHA verification successful:', {
      score,
      action,
      hostname,
      timestamp: challenge_ts
    });

    res.json({
      success: true,
      score: score,
      action: action,
      message: 'reCAPTCHA verification successful'
    });

  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during reCAPTCHA verification'
    });
  }
});

// Middleware to verify reCAPTCHA for any route
const verifyRecaptcha = async (req, res, next) => {
  try {
    const { recaptchaToken } = req.body;

    if (!recaptchaToken) {
      return res.status(400).json({
        success: false,
        message: 'reCAPTCHA token is required'
      });
    }

    // Verify token with Google
    const verificationResponse = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: RECAPTCHA_SECRET_KEY,
          response: recaptchaToken
        }
      }
    );

    const { success, score, action } = verificationResponse.data;

    // Check if verification was successful and score is acceptable
    if (!success || score < 0.5) {
      return res.status(400).json({
        success: false,
        message: 'reCAPTCHA verification failed or score too low',
        score: score
      });
    }

    // Add verification result to request object
    req.recaptchaVerified = true;
    req.recaptchaScore = score;
    req.recaptchaAction = action;

    next();

  } catch (error) {
    console.error('reCAPTCHA middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during reCAPTCHA verification'
    });
  }
};

module.exports = { router, verifyRecaptcha }; 