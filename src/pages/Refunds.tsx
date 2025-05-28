
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const Refunds = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Header */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-bold text-4xl mb-4 text-gray-900">Refund & Cancellation Policy</h1>
            <p className="text-gray-600">Last updated: May 6, 2025</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto prose prose-gray">
          <h2>1. Subscription Cancellations</h2>
          <p>
            You may cancel your subscription at any time through your account dashboard or by contacting our customer support team. Once you cancel, you will continue to have access to your paid features until the end of your current billing cycle. After that, your account will automatically be downgraded to the free plan or deactivated if no free plan is available.
          </p>
          
          <h2>2. Refund Policy</h2>
          <p>
            <strong>14-Day Money-Back Guarantee:</strong> We offer a 14-day money-back guarantee for new subscriptions. If you are not satisfied with our services within the first 14 days after your initial payment, you may request a full refund by contacting our support team.
          </p>
          <p>
            <strong>After 14 Days:</strong> After the initial 14-day period, we generally do not provide refunds for the following:
          </p>
          <ul>
            <li>Partial billing periods</li>
            <li>Unused time on your subscription</li>
            <li>Declining to use the service after payment</li>
            <li>Misunderstanding of features or service functionality</li>
          </ul>
          
          <h2>3. How to Request a Refund</h2>
          <p>
            To request a refund, please contact our support team at <a href="mailto:support@wallfeedback.com">support@wallfeedback.com</a> or through our <Link to="/contact" className="text-purple-600 hover:underline">Contact Page</Link>.
          </p>
          <p>
            Please include the following information in your refund request:
          </p>
          <ul>
            <li>Your account email address</li>
            <li>Reason for the refund request</li>
            <li>Date of purchase</li>
          </ul>
          
          <h2>4. Processing of Refunds</h2>
          <p>
            Approved refunds will be processed within 5-10 business days. Refunds will be issued to the original payment method used for the purchase. Depending on your payment provider, it may take additional time for the refunded amount to appear in your account.
          </p>
          
          <h2>5. Exceptions</h2>
          <p>
            In exceptional circumstances, we may consider refunds outside our standard policy. These situations are evaluated on a case-by-case basis and may include:
          </p>
          <ul>
            <li>Extended service outages</li>
            <li>Technical issues that severely impact your ability to use our service</li>
            <li>Other circumstances beyond your control</li>
          </ul>
          
          <h2>6. Annual Subscriptions</h2>
          <p>
            For annual subscriptions, after the 14-day money-back guarantee period, we may provide a prorated refund based on the unused portion of your subscription term, less any applicable discounts received for committing to an annual term. An administrative fee may apply.
          </p>
          
          <h2>7. Changes to This Policy</h2>
          <p>
            We reserve the right to modify this Refund Policy at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after changes to this policy constitutes your acceptance of the revised policy.
          </p>
          
          <h2>8. Contact Us</h2>
          <p>
            If you have any questions about our Refund & Cancellation Policy, please contact us at:
          </p>
          <p>
            Email: <a href="mailto:billing@wallfeedback.com">billing@wallfeedback.com</a><br />
            <Link to="/contact" className="text-purple-600 hover:underline">Contact Page</Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Refunds;
