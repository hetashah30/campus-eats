import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, CreditCard, Star, Utensils } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const featuredItems = [
  {
    id: '1',
    name: 'Classic Burger',
    price: 150,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500&auto=format&fit=crop',
    rating: 4.8,
    category: 'Burger'
  },
  {
    id: '2',
    name: 'Margherita Pizza',
    price: 250,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=500&auto=format&fit=crop',
    rating: 4.7,
    category: 'Pizza'
  },
  {
    id: '3',
    name: 'Chicken Biryani',
    price: 180,
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=500&auto=format&fit=crop',
    rating: 4.9,
    category: 'Indian'
  },
  {
    id: '4',
    name: 'Vegan Salad Bowl',
    price: 120,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500&auto=format&fit=crop',
    rating: 4.6,
    category: 'Salad'
  },
];

const steps = [
  {
    title: 'Browse Menu',
    description: 'Explore our diverse menu with easy filtering options',
    icon: <Utensils className="h-10 w-10 text-brand-orange" />,
  },
  {
    title: 'Place Order',
    description: 'Add items to cart and place your order in just a few clicks',
    icon: <CreditCard className="h-10 w-10 text-brand-green" />,
  },
  {
    title: 'Track & Receive',
    description: 'Track your order status in real-time and get notified when it\'s ready',
    icon: <Clock className="h-10 w-10 text-brand-yellow" />,
  },
];

const userTypes = [
  {
    title: 'Students',
    description: 'Order food, track delivery, and enjoy a seamless dining experience',
    linkTo: '/join/customer',
    color: 'bg-brand-orange/10 border-brand-orange',
  },
  {
    title: 'Canteen Owners',
    description: 'Manage your menu, orders, and inventory all in one place',
    linkTo: '/join/owner',
    color: 'bg-brand-green/10 border-brand-green',
  },
  {
    title: 'Administrators',
    description: 'Monitor platform activity, manage users, and access analytics',
    linkTo: '/join/admin',
    color: 'bg-brand-blue/10 border-brand-blue',
  },
];

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="relative bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-24 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white mb-6">
              Campus Food,
              <span className="text-brand-orange"> Simplified.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
              Order food from your campus canteen, track your order, and enjoy a seamless dining experience with our automation system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/menu">Explore Menu</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/how-it-works">How It Works</Link>
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-orange/20 rounded-full blur-3xl dark:bg-brand-orange/10"></div>
              <img 
                src="https://media.istockphoto.com/id/1427534719/photo/unrecognizable-friends-and-family-sharing-food-at-dinning-room.jpg?s=612x612&w=0&k=20&c=fjDIjCxYrauptYQ0zV5KNRbCDv7I3yjn7n-B69r1soo=" 
                alt="Campus Food" 
                className="relative z-10 rounded-2xl shadow-lg w-full object-cover h-[400px]"
              />
              <div className="absolute -bottom-5 -right-5 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg z-20">
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                  <span className="font-bold text-xl">4.9</span>
                  <span className="text-gray-500">rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Menu</h2>
            <Button variant="link" asChild>
              <Link to="/menu" className="flex items-center">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredItems.map((item) => (
              <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full px-2 py-1 flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{item.rating}</span>
                  </div>
                </div>
                <div className="p-4">
                  <span className="text-xs font-medium text-brand-orange uppercase tracking-wide">{item.category}</span>
                  <h3 className="font-bold mt-1">{item.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-semibold">₹{item.price}</span>
                    <Button size="sm" variant="ghost" asChild>
                      <Link to={`/menu/${item.id}`}>View</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our platform makes ordering food from your campus canteen quick, easy, and convenient.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md relative">
                <div className="mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 text-gray-300">
                    <ArrowRight className="h-6 w-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link to="/how-it-works">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">For Everyone in the Campus Ecosystem</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our platform caters to all members of the campus community with tailored experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {userTypes.map((type, index) => (
              <div key={index} className={`p-6 rounded-xl border ${type.color} transition-transform hover:-translate-y-1`}>
                <h3 className="text-xl font-bold mb-2">{type.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{type.description}</p>
                <Button variant="link" className="p-0" asChild>
                  <Link to={type.linkTo} className="flex items-center">
                    Join as {type.title.slice(0, -1)} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 px-4 bg-brand-orange text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Simplify Campus Dining?</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Join thousands of students and canteen operators already using CampusEats
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/signup">Create an Account</Link>
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
