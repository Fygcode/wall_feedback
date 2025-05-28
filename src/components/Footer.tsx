
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center">
                <span className="text-white font-bold">W</span>
              </div>
              <span className="font-poppins font-semibold text-xl text-gray-800">WallFeedback</span>
            </Link>
            <p className="text-sm text-gray-500 mb-4">
              Collect and showcase testimonials with ease. Build trust, win more clients.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-800 mb-3">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/features" className="text-sm text-gray-500 hover:text-purple-500 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-gray-500 hover:text-purple-500 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-sm text-gray-500 hover:text-purple-500 transition-colors">
                  Testimonial Examples
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-800 mb-3">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-500 hover:text-purple-500 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-500 hover:text-purple-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-800 mb-3">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-gray-500 hover:text-purple-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-500 hover:text-purple-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/refunds" className="text-sm text-gray-500 hover:text-purple-500 transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-6">
          <p className="text-sm text-center text-gray-500">
            © {currentYear} WallFeedback. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
