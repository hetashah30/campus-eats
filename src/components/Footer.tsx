
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-16 pb-8 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand info */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-brand-orange rounded-full p-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18M3 12h18M3 18h18" />
                </svg>
              </div>
              <span className="text-lg font-bold text-gray-800 dark:text-white">CampusEats</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              The ultimate campus canteen automation system. Order food, track delivery, and enjoy a seamless dining experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-brand-orange dark:text-gray-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-brand-orange dark:text-gray-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-brand-orange dark:text-gray-300">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/menu" className="text-gray-600 dark:text-gray-300 hover:text-brand-orange dark:hover:text-brand-orange transition-colors">Menu</Link></li>
              <li><Link to="/how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-brand-orange dark:hover:text-brand-orange transition-colors">How It Works</Link></li>
              <li><Link to="/join" className="text-gray-600 dark:text-gray-300 hover:text-brand-orange dark:hover:text-brand-orange transition-colors">Join Us</Link></li>
              <li><Link to="/faq" className="text-gray-600 dark:text-gray-300 hover:text-brand-orange dark:hover:text-brand-orange transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* For Everyone */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Join As</h3>
            <ul className="space-y-2">
              <li><Link to="/join/customer" className="text-gray-600 dark:text-gray-300 hover:text-brand-orange dark:hover:text-brand-orange transition-colors">Student/Customer</Link></li>
              <li><Link to="/join/owner" className="text-gray-600 dark:text-gray-300 hover:text-brand-orange dark:hover:text-brand-orange transition-colors">Canteen Owner</Link></li>
              <li><Link to="/join/admin" className="text-gray-600 dark:text-gray-300 hover:text-brand-orange dark:hover:text-brand-orange transition-colors">Administrator</Link></li>
              <li><Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-brand-orange dark:hover:text-brand-orange transition-colors">Login</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 dark:text-gray-300">Email: support@campuseats.com</li>
              <li className="text-gray-600 dark:text-gray-300">Phone: +1 (555) 123-4567</li>
              <li className="text-gray-600 dark:text-gray-300">Address: Campus Hub, University Ave</li>
              <li><Link to="/contact" className="text-brand-orange hover:underline">Send us a message</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8">
          <p className="text-center text-gray-600 dark:text-gray-300">
            &copy; {new Date().getFullYear()} CampusEats. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
