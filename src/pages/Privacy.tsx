
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Header */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-bold text-4xl mb-4 text-gray-900">Privacy Policy</h1>
            <p className="text-gray-600">Last updated: May 6, 2025</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto prose prose-gray">
          <h2>Introduction</h2>
          <p>
            At WallFeedback ("we," "our," or "us"), we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
          </p>
          <p>
            Please read this Privacy Policy carefully. By accessing or using our services, you acknowledge that you have read and understood this Privacy Policy.
          </p>
          
          <h2>Information We Collect</h2>
          <h3>Personal Information</h3>
          <p>We may collect personal information that you voluntarily provide when using our service, including:</p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Company name</li>
            <li>Website URL</li>
            <li>Testimonials and reviews you submit or collect</li>
            <li>Payment information (processed securely through our payment processor)</li>
          </ul>
          
          <h3>Automatically Collected Information</h3>
          <p>When you access our website or services, we may automatically collect certain information, including:</p>
          <ul>
            <li>IP address</li>
            <li>Browser type</li>
            <li>Device information</li>
            <li>Usage data</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
          
          <h2>How We Use Your Information</h2>
          <p>We may use your personal information for various purposes, including:</p>
          <ul>
            <li>Providing and maintaining our services</li>
            <li>Processing payments</li>
            <li>Responding to inquiries and customer service requests</li>
            <li>Sending administrative emails and updates</li>
            <li>Sending marketing communications (with your consent)</li>
            <li>Improving our website and services</li>
            <li>Analyzing usage patterns</li>
            <li>Preventing fraud and enforcing our terms of service</li>
          </ul>
          
          <h2>Disclosure of Your Information</h2>
          <p>We may share your information in the following situations:</p>
          <ul>
            <li><strong>Service Providers:</strong> We may share your information with third-party vendors who provide services on our behalf.</li>
            <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
            <li><strong>Legal Requirements:</strong> We may disclose your information if required by law or in response to valid requests from public authorities.</li>
          </ul>
          
          <h2>Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>
          
          <h2>Your Privacy Rights</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal information, including:
          </p>
          <ul>
            <li>Right to access your personal information</li>
            <li>Right to correct inaccurate information</li>
            <li>Right to delete your information</li>
            <li>Right to object to or restrict processing</li>
            <li>Right to data portability</li>
          </ul>
          <p>
            To exercise these rights, please contact us using the information provided below.
          </p>
          
          <h2>Children's Privacy</h2>
          <p>
            Our services are not intended for individuals under the age of 16. We do not knowingly collect or solicit personal information from children under 16.
          </p>
          
          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last Updated" date at the top of this page.
          </p>
          
          <h2>Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please contact us at:
          </p>
          <p>
            Email: <a href="mailto:privacy@wallfeedback.com">privacy@wallfeedback.com</a><br />
            <Link to="/contact" className="text-purple-600 hover:underline">Contact Page</Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Privacy;
