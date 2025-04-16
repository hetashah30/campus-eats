
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle, Smartphone, CreditCard, Clock, MapPin, Gift, Users } from 'lucide-react';

const HowItWorks = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Steps for customers
  const customerSteps = [
    {
      title: 'Create an Account',
      description: 'Sign up for an account with your campus email to get started.',
      icon: <Users className="h-8 w-8 text-brand-orange" />,
    },
    {
      title: 'Browse the Menu',
      description: 'Explore our diverse menu with various filters to find exactly what you want.',
      icon: <Smartphone className="h-8 w-8 text-brand-orange" />,
    },
    {
      title: 'Add to Cart & Pay',
      description: 'Add your favorite items to cart and check out securely.',
      icon: <CreditCard className="h-8 w-8 text-brand-orange" />,
    },
    {
      title: 'Track Your Order',
      description: 'Follow your order in real-time and get notified when it\'s ready.',
      icon: <Clock className="h-8 w-8 text-brand-orange" />,
    },
    {
      title: 'Pick Up & Enjoy',
      description: 'Skip the lines and pick up your order when it\'s ready.',
      icon: <MapPin className="h-8 w-8 text-brand-orange" />,
    },
  ];

  // Common questions
  const faqs = [
    {
      question: 'How do I create an account?',
      answer: 'You can register using your campus email. Click on "Sign Up" and fill in your details. Verification is done via your campus email.'
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept credit/debit cards, UPI, campus wallets, and select mobile payment apps.'
    },
    {
      question: 'How long does it take to prepare my order?',
      answer: 'Preparation times vary by item, but most orders are ready in 15-20 minutes. You\'ll receive a notification when your order is ready for pickup.'
    },
    {
      question: 'Can I modify or cancel my order?',
      answer: 'Orders can be modified or cancelled within 2 minutes of placing them. After that, please contact the canteen directly for assistance.'
    },
    {
      question: 'Are there any discounts or loyalty programs?',
      answer: 'Yes! We offer student discounts, combo deals, and a points-based loyalty program. Check the promotions section in the app for current offers.'
    },
    {
      question: 'How do I become a canteen partner?',
      answer: 'If you operate a food service on campus, you can apply to become a partner through our "Join as Owner" section. Our team will review your application and get in touch.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">How CampusEats Works</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Discover how our platform streamlines campus dining and makes ordering food a breeze.
          </p>
        </div>
      </div>

      {/* Process Flow Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">The CampusEats Experience</h2>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Connection Line */}
            <div className="absolute hidden md:block left-1/2 top-12 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 -translate-x-1/2 z-0"></div>
            
            {/* Steps */}
            <div className="space-y-16">
              {customerSteps.map((step, index) => (
                <div key={index} className="relative z-10">
                  <div className={`flex flex-col md:flex-row items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                    {/* Step Icon */}
                    <div className="mb-4 md:mb-0 md:mx-8">
                      <div className="bg-white dark:bg-gray-800 rounded-full p-4 shadow-lg border border-gray-100 dark:border-gray-700">
                        {step.icon}
                      </div>
                    </div>
                    
                    {/* Step Content */}
                    <div className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md max-w-sm md:max-w-md ${index % 2 === 1 ? 'text-right md:mr-auto' : 'md:ml-auto'}`}>
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* App Features */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <CheckCircle className="h-10 w-10 text-brand-green mb-4" />
              <h3 className="text-xl font-semibold mb-2">Easy Ordering</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Browse the menu, filter by dietary preferences, and place orders in just a few taps.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <CreditCard className="h-10 w-10 text-brand-blue mb-4" />
              <h3 className="text-xl font-semibold mb-2">Multiple Payment Options</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Pay with credit/debit cards, UPI, campus wallet, or other payment methods.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <Clock className="h-10 w-10 text-brand-orange mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-time Tracking</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Follow your order status from preparation to ready-for-pickup with live updates.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <MapPin className="h-10 w-10 text-brand-red mb-4" />
              <h3 className="text-xl font-semibold mb-2">Skip the Line</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get notified when your order is ready and pick it up without waiting in line.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <Gift className="h-10 w-10 text-brand-yellow mb-4" />
              <h3 className="text-xl font-semibold mb-2">Rewards & Offers</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Earn points with each order and enjoy exclusive student discounts and combo deals.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <Users className="h-10 w-10 text-brand-purple mb-4" />
              <h3 className="text-xl font-semibold mb-2">Group Orders</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Coordinate orders with friends and classmates for convenient pickup and payment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-brand-orange text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Join thousands of students already using CampusEats to streamline their campus dining experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/signup">Create an Account</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/20" asChild>
              <Link to="/menu">Browse Menu</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorks;
