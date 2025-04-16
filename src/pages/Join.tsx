
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, ChevronDown } from 'lucide-react';

const Join = () => {
  const { role } = useParams();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [role]);
  
  // Different roles and their features
  const roles = {
    customer: {
      title: 'Join as a Customer',
      subtitle: 'Order food, skip lines, and enjoy a seamless dining experience',
      benefits: [
        'Browse the full menu with detailed information',
        'Place orders in advance for quick pickup',
        'Pay securely with multiple payment options',
        'Track your order status in real-time',
        'View order history and reorder your favorites',
        'Rate and review menu items',
        'Earn rewards and redeem special offers',
      ],
      image: 'https://plus.unsplash.com/premium_photo-1739369169172-af9151ed2eea?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fGNhbnRlZW4lMjBjdXN0b21lcnxlbnwwfHwwfHx8MA%3D%3D',
    },
    owner: {
      title: 'Join as a Canteen Owner',
      subtitle: 'Streamline operations and grow your food service business',
      benefits: [
        'Manage your menu and inventory in one place',
        'Receive and process orders more efficiently',
        'Track sales and performance with detailed analytics',
        'Get insights into popular items and peak hours',
        'Create and manage special offers and combos',
        'Receive notifications for low stock items',
        'Build customer loyalty through improved service',
      ],
      image: 'https://media.istockphoto.com/id/1174650335/photo/portrait-of-owner-waiter-at-restaurant.jpg?s=612x612&w=0&k=20&c=r24cNKG0kcbaZEUxLzcaY86on-Yly9uE1N0zlpit9q8=',
    },
    admin: {
      title: 'Join as an Administrator',
      subtitle: 'Oversee platform operations and ensure seamless service',
      benefits: [
        'Approve and manage canteen owner registrations',
        'Access platform-wide analytics and reports',
        'Monitor user activity and engagement metrics',
        'Post campus-wide announcements and offers',
        'Manage user accounts and resolve issues',
        'Ensure compliance with campus guidelines',
        'Drive adoption and usage across campus',
      ],
      image: 'https://images.unsplash.com/photo-1543269664-7eef42226a21?q=80&w=1200&auto=format&fit=crop',
    },
  };
  
  // Testimonials
  const testimonials = [
    {
      name: 'Alex Johnson',
      role: 'Student',
      quote: 'CampusEats has completely changed how I get food on campus. No more waiting in long lines during lunch rush!',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
    },
    {
      name: 'Maria Rodriguez',
      role: 'Canteen Owner',
      quote: 'The platform has streamlined our operations and allowed us to serve more students efficiently. Our sales have increased by 30%!',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop',
    },
    {
      name: 'David Chen',
      role: 'University Admin',
      quote: 'The analytics and oversight capabilities have helped us improve campus dining services across all our locations.',
      image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop',
    },
  ];
  
  // If no specific role is selected, show all options
  if (!role || !roles[role]) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Join the CampusEats Community</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Select your role to get started with our campus canteen automation system
            </p>
          </div>
        </div>
        
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {Object.entries(roles).map(([key, info]) => (
                <div key={key} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img src={info.image} alt={info.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-2">{info.title}</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 h-12 line-clamp-2">{info.subtitle}</p>
                    <Button className="w-full" asChild>
                      <Link to={`/join/${key}`}>Learn More</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    );
  }
  
  // Role-specific page
  const roleInfo = roles[role];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div 
        className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 py-16 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7)), url(${roleInfo.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <Link to="/join" className="inline-flex items-center text-brand-orange mb-4 hover:underline">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Roles
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">{roleInfo.title}</h1>
          <p className="text-lg text-gray-700 max-w-2xl mb-8">
            {roleInfo.subtitle}
          </p>
          <Button size="lg" asChild>
            <Link to="/signup">Sign Up Now</Link>
          </Button>
        </div>
      </div>
      
      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12">Key Benefits</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {roleInfo.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="h-6 w-6 text-brand-green mr-3 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300">{benefit}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button size="lg" asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Getting started with CampusEats is quick and easy. Here's how:
          </p>
          
          {role === 'customer' && (
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                    <div className="bg-brand-orange/10 text-brand-orange w-10 h-10 rounded-full flex items-center justify-center mb-4">1</div>
                    <h3 className="text-xl font-semibold mb-2">Sign Up with Your Campus Email</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Create your account using your official campus email address for verification.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 flex justify-center">
                  <ArrowRight className="hidden md:block h-8 w-8 text-gray-300" />
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2 md:order-2">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                    <div className="bg-brand-orange/10 text-brand-orange w-10 h-10 rounded-full flex items-center justify-center mb-4">2</div>
                    <h3 className="text-xl font-semibold mb-2">Complete Your Profile</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Add your details, preferred payment methods, and dietary preferences.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 md:order-1 flex justify-center">
                  <ArrowRight className="hidden md:block h-8 w-8 text-gray-300 transform rotate-90 md:rotate-0" />
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                    <div className="bg-brand-orange/10 text-brand-orange w-10 h-10 rounded-full flex items-center justify-center mb-4">3</div>
                    <h3 className="text-xl font-semibold mb-2">Start Ordering!</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Browse the menu, place orders, and enjoy a seamless dining experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {role === 'owner' && (
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                    <div className="bg-brand-orange/10 text-brand-orange w-10 h-10 rounded-full flex items-center justify-center mb-4">1</div>
                    <h3 className="text-xl font-semibold mb-2">Apply for Registration</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Fill out the application form with your canteen's details and documentation.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 flex justify-center">
                  <ArrowRight className="hidden md:block h-8 w-8 text-gray-300" />
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2 md:order-2">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                    <div className="bg-brand-orange/10 text-brand-orange w-10 h-10 rounded-full flex items-center justify-center mb-4">2</div>
                    <h3 className="text-xl font-semibold mb-2">Verification & Approval</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Our admin team will verify your details and approve your account.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 md:order-1 flex justify-center">
                  <ArrowRight className="hidden md:block h-8 w-8 text-gray-300 transform rotate-90 md:rotate-0" />
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                    <div className="bg-brand-orange/10 text-brand-orange w-10 h-10 rounded-full flex items-center justify-center mb-4">3</div>
                    <h3 className="text-xl font-semibold mb-2">Set Up Your Menu & Start Selling</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Add your menu items, set prices, and start receiving orders through the platform.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {role === 'admin' && (
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                    <div className="bg-brand-orange/10 text-brand-orange w-10 h-10 rounded-full flex items-center justify-center mb-4">1</div>
                    <h3 className="text-xl font-semibold mb-2">Contact Our Team</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Reach out to discuss implementing CampusEats at your institution.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 flex justify-center">
                  <ArrowRight className="hidden md:block h-8 w-8 text-gray-300" />
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2 md:order-2">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                    <div className="bg-brand-orange/10 text-brand-orange w-10 h-10 rounded-full flex items-center justify-center mb-4">2</div>
                    <h3 className="text-xl font-semibold mb-2">System Setup & Configuration</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      We'll help configure the platform according to your campus needs and requirements.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 md:order-1 flex justify-center">
                  <ArrowRight className="hidden md:block h-8 w-8 text-gray-300 transform rotate-90 md:rotate-0" />
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                    <div className="bg-brand-orange/10 text-brand-orange w-10 h-10 rounded-full flex items-center justify-center mb-4">3</div>
                    <h3 className="text-xl font-semibold mb-2">Training & Deployment</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Receive training for your administrative team and roll out the system campus-wide.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                    <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex justify-between items-center p-6 cursor-pointer">
                  <h3 className="text-lg font-semibold">What are the requirements to join as a {role}?</h3>
                  <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6 text-gray-600 dark:text-gray-300">
                  {role === 'customer' && "You need to be a student, faculty, or staff member at a participating campus with a valid campus email address."}
                  {role === 'owner' && "You need to operate a food service business on campus and provide necessary documentation like business registration, food safety certifications, etc."}
                  {role === 'admin' && "You need to be part of the campus administration with authority to implement campus-wide systems."}
                </div>
              </details>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex justify-between items-center p-6 cursor-pointer">
                  <h3 className="text-lg font-semibold">Is there a fee to join?</h3>
                  <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6 text-gray-600 dark:text-gray-300">
                  {role === 'customer' && "No, it's completely free for customers to join and use the platform."}
                  {role === 'owner' && "We charge a small commission on each order processed through the platform. Contact us for detailed pricing."}
                  {role === 'admin' && "There's a subscription fee based on campus size and number of connected canteens. Please contact us for a custom quote."}
                </div>
              </details>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex justify-between items-center p-6 cursor-pointer">
                  <h3 className="text-lg font-semibold">How long does the approval process take?</h3>
                  <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6 text-gray-600 dark:text-gray-300">
                  {role === 'customer' && "Customer accounts are approved instantly upon email verification."}
                  {role === 'owner' && "The approval process typically takes 2-3 business days after all required documentation is submitted."}
                  {role === 'admin' && "Implementation timelines vary based on campus size and requirements, typically 2-4 weeks from initial consultation."}
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 px-4 bg-brand-orange text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join CampusEats?</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            {role === 'customer' && "Start enjoying seamless campus dining today!"}
            {role === 'owner' && "Grow your campus food service business with our platform!"}
            {role === 'admin' && "Transform your campus dining experience with CampusEats!"}
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/signup">Sign Up Now</Link>
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Join;
