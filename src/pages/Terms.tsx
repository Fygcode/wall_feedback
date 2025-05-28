
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const Terms = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Header */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-bold text-4xl mb-4 text-gray-900">Terms of Service</h1>
            <p className="text-gray-600">Last updated: May 6, 2025</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto prose prose-gray">
          <h2>1. Agreement to Terms</h2>
          <p>
            These Terms of Service ("Terms") govern your access to and use of the WallFeedback website and services. By accessing or using our services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use our services.
          </p>
          
          <h2>2. Description of Service</h2>
          <p>
            WallFeedback provides a platform for businesses to collect, manage, and display testimonials from their clients. Our services include testimonial collection forms, testimonial display walls, and related tools for showcasing social proof.
          </p>
          
          <h2>3. User Accounts</h2>
          <p>
            To access certain features of our services, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate and complete information when creating your account and to update your information to keep it accurate and current.
          </p>
          
          <h2>4. Subscription and Payments</h2>
          <p>
            Certain features of our services require a paid subscription. By subscribing to our services, you agree to pay all fees in accordance with the pricing and payment terms in effect at the time of subscription. All payments are processed through secure third-party payment processors.
          </p>
          <p>
            Subscription fees are charged at the beginning of each billing cycle. Subscriptions automatically renew unless canceled before the renewal date. For information about cancellations and refunds, please see our <Link to="/refunds" className="text-purple-600 hover:underline">Refund Policy</Link>.
          </p>
          
          <h2>5. User Content</h2>
          <p>
            Our services allow you to collect and display testimonials and other content from your clients ("User Content"). You retain ownership of your User Content, but you grant us a non-exclusive, worldwide, royalty-free license to use, store, and display your User Content for the purpose of providing and improving our services.
          </p>
          <p>
            You are responsible for ensuring that you have the right to collect and display all User Content, and that such content does not violate any laws or infringe on any third-party rights.
          </p>
          
          <h2>6. Prohibited Conduct</h2>
          <p>
            You agree not to:
          </p>
          <ul>
            <li>Use our services for any illegal purpose</li>
            <li>Submit false or misleading testimonials</li>
            <li>Infringe or violate the rights of others</li>
            <li>Interfere with or disrupt our services</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Use our services to transmit harmful code or content</li>
          </ul>
          
          <h2>7. Intellectual Property</h2>
          <p>
            All content, features, and functionality of our services, including but not limited to text, graphics, logos, and software, are owned by WallFeedback and are protected by copyright, trademark, and other intellectual property laws.
          </p>
          
          <h2>8. Termination</h2>
          <p>
            We may terminate or suspend your account and access to our services at our sole discretion, without notice, for conduct that we determine violates these Terms or is harmful to other users, us, or third parties, or for any other reason.
          </p>
          
          <h2>9. Disclaimer of Warranties</h2>
          <p>
            OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMISSIBLE UNDER APPLICABLE LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED.
          </p>
          
          <h2>10. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL WALLFEEDBACK BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF OUR SERVICES.
          </p>
          
          <h2>11. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless WallFeedback and its officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses arising out of or in any way connected with your use of our services, your User Content, or your violation of these Terms.
          </p>
          
          <h2>12. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without giving effect to any principles of conflicts of law.
          </p>
          
          <h2>13. Changes to These Terms</h2>
          <p>
            We may revise these Terms at any time by posting an updated version on our website. Your continued use of our services after the posting of revised Terms means that you accept and agree to the changes.
          </p>
          
          <h2>14. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <p>
            Email: <a href="mailto:legal@wallfeedback.com">legal@wallfeedback.com</a><br />
            <Link to="/contact" className="text-purple-600 hover:underline">Contact Page</Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Terms;
