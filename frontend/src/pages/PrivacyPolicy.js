import React from 'react';
import HeroSection from '../components/HeroSection';

const PrivacyPolicy = () => (
  <div className="privacy-policy-page">
    <HeroSection
      title="Privacy Policy"
      subtitle="Your privacy is important to us. This policy explains how Creova Technologies collects, uses, and protects your information."
      backgroundType="animated"
    />
    <section className="section bg-light">
      <div className="container" style={{maxWidth: 900}}>
        <h2 className="mb-3">Introduction</h2>
        <p>Creova Technologies ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy describes how we collect, use, and safeguard your personal information when you use our website and services.</p>
        <h3 className="mt-4 mb-2">Information We Collect</h3>
        <ul>
          <li><strong>Personal Information:</strong> Name, email address, phone number, company, and other details you provide via forms or communication.</li>
          <li><strong>Usage Data:</strong> Information about how you use our website, including IP address, browser type, device information, and pages visited.</li>
          <li><strong>Cookies:</strong> We use cookies and similar technologies to enhance your experience and analyze site usage.</li>
        </ul>
        <h3 className="mt-4 mb-2">How We Use Information</h3>
        <ul>
          <li>To provide, operate, and improve our services</li>
          <li>To communicate with you about your inquiries, projects, or support requests</li>
          <li>To personalize your experience and deliver relevant content</li>
          <li>To analyze website usage and improve our offerings</li>
          <li>To comply with legal obligations</li>
        </ul>
        <h3 className="mt-4 mb-2">Data Security</h3>
        <p>We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet is 100% secure.</p>
        <h3 className="mt-4 mb-2">Cookies</h3>
        <p>We use cookies to remember your preferences, analyze traffic, and improve your experience. You can control cookies through your browser settings.</p>
        <h3 className="mt-4 mb-2">Third-Party Services</h3>
        <p>We may use third-party services (such as analytics or payment processors) that collect, use, and share information according to their own privacy policies. We encourage you to review those policies.</p>
        <h3 className="mt-4 mb-2">Your Rights</h3>
        <ul>
          <li>You have the right to access, update, or delete your personal information.</li>
          <li>You may opt out of marketing communications at any time.</li>
          <li>To exercise your rights, contact us at <a href="mailto:hello@creova.tech">hello@creova.tech</a>.</li>
        </ul>
        <h3 className="mt-4 mb-2">Changes to This Policy</h3>
        <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.</p>
        <h3 className="mt-4 mb-2">Contact Us</h3>
        <p>If you have any questions or concerns about this Privacy Policy, please contact us at <a href="mailto:hello@creova.tech">hello@creova.tech</a>.</p>
      </div>
    </section>
  </div>
);

export default PrivacyPolicy; 