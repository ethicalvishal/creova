import React from 'react';
import HeroSection from '../components/HeroSection';

const TermsOfService = () => (
  <div className="terms-of-service-page">
    <HeroSection
      title="Terms of Service"
      subtitle="Please read these terms carefully before using Creova Technologies' website and services."
      backgroundType="animated"
    />
    <section className="section bg-light">
      <div className="container" style={{maxWidth: 900}}>
        <h2 className="mb-3">Acceptance of Terms</h2>
        <p>By accessing or using the Creova Technologies website or services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree, please do not use our services.</p>
        <h3 className="mt-4 mb-2">Use of Services</h3>
        <ul>
          <li>You may use our website and services only for lawful purposes and in accordance with these terms.</li>
          <li>You agree not to misuse, disrupt, or attempt to gain unauthorized access to our systems or data.</li>
        </ul>
        <h3 className="mt-4 mb-2">User Responsibilities</h3>
        <ul>
          <li>You are responsible for the accuracy of information you provide to us.</li>
          <li>You must maintain the confidentiality of your account credentials.</li>
          <li>You agree not to use our services for any illegal or harmful activities.</li>
        </ul>
        <h3 className="mt-4 mb-2">Intellectual Property</h3>
        <p>All content, trademarks, logos, and intellectual property on this website are the property of Creova Technologies or its licensors. You may not use, reproduce, or distribute any content without our written permission.</p>
        <h3 className="mt-4 mb-2">Disclaimers</h3>
        <p>Our services are provided "as is" and "as available" without warranties of any kind. We do not guarantee that the website or services will be error-free, secure, or uninterrupted.</p>
        <h3 className="mt-4 mb-2">Limitation of Liability</h3>
        <p>Creova Technologies is not liable for any indirect, incidental, or consequential damages arising from your use of our website or services.</p>
        <h3 className="mt-4 mb-2">Termination</h3>
        <p>We reserve the right to suspend or terminate your access to our services at any time, for any reason, without notice.</p>
        <h3 className="mt-4 mb-2">Governing Law</h3>
        <p>These terms are governed by the laws of the jurisdiction in which Creova Technologies operates, without regard to conflict of law principles.</p>
        <h3 className="mt-4 mb-2">Changes to Terms</h3>
        <p>We may update these Terms of Service from time to time. Changes will be posted on this page with an updated effective date.</p>
        <h3 className="mt-4 mb-2">Contact Us</h3>
        <p>If you have any questions about these Terms of Service, please contact us at <a href="mailto:hello@creova.tech">hello@creova.tech</a>.</p>
      </div>
    </section>
  </div>
);

export default TermsOfService; 