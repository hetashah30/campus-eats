
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { User, ShoppingCart, Bell, Star, Settings, LogOut, Home, Menu as MenuIcon } from 'lucide-react';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/use-cart';

interface CustomerLayoutProps {
  children: React.ReactNode;
}

const CustomerLayout = ({ children }: CustomerLayoutProps) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();
  
  // Mock unread notifications count
  const unreadNotifications = 2;
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    {
      name: 'Dashboard',
      path: '/dashboard/customer',
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: 'My Orders',
      path: '/dashboard/customer/orders',
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      name: 'Notifications',
      path: '/dashboard/customer/notifications',
      icon: <Bell className="h-5 w-5" />,
      badge: unreadNotifications > 0 ? unreadNotifications : null,
    },
    {
      name: 'Favorites',
      path: '/dashboard/customer/favorites',
      icon: <Star className="h-5 w-5" />,
    },
    {
      name: 'Settings',
      path: '/dashboard/customer/settings',
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon">
                    <MenuIcon className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64">
                  <div className="flex flex-col h-full">
                    <Link to="/" className="flex items-center space-x-2 py-4">
                      <div className="bg-brand-orange rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 6h18M3 12h18M3 18h18" />
                        </svg>
                      </div>
                      <span className="text-xl font-bold">CampusEats</span>
                    </Link>
                    
                    <div className="flex flex-col items-center py-4 mb-6 border-b dark:border-gray-700">
                      <div className="w-20 h-20 bg-brand-orange text-white rounded-full flex items-center justify-center text-2xl font-semibold mb-2">
                        JD
                      </div>
                      <h2 className="text-lg font-semibold">John Doe</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">john.doe@university.edu</p>
                    </div>
                    
                    <nav className="space-y-1 flex-1">
                      {navItems.map((item) => (
                        <Link 
                          key={item.path} 
                          to={item.path}
                          className={`flex items-center justify-between px-3 py-2 rounded-md ${
                            isActive(item.path)
                              ? 'bg-brand-orange/10 text-brand-orange font-medium'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div className="flex items-center space-x-3">
                            {item.icon}
                            <span>{item.name}</span>
                          </div>
                          {item.badge && (
                            <Badge variant="destructive">{item.badge}</Badge>
                          )}
                        </Link>
                      ))}
                    </nav>
                    
                    <div className="border-t dark:border-gray-700 pt-4 pb-2">
                      <Link 
                        to="/login" 
                        className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <LogOut className="h-5 w-5" />
                        <span>Logout</span>
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              
              <Link to="/" className="flex items-center space-x-2">
                <div className="bg-brand-orange rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18M3 12h18M3 18h18" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-gray-800 dark:text-white">CampusEats</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" asChild className="hidden md:flex">
                <Link to="/menu">Explore Menu</Link>
              </Button>
              
              <ThemeToggle />
              
              <Button variant="ghost" size="icon" asChild className="relative">
                <Link to="/menu">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-brand-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemCount > 9 ? '9+' : cartItemCount}
                    </span>
                  )}
                </Link>
              </Button>
              
              <Button variant="ghost" size="icon" asChild className="relative">
                <Link to="/dashboard/customer/notifications">
                  <Bell className="h-5 w-5" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-brand-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </Link>
              </Button>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-brand-orange text-white rounded-full flex items-center justify-center font-semibold">
                  JD
                </div>
                <span className="hidden md:inline text-sm font-medium">John Doe</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Sidebar - Desktop */}
          <div className="hidden md:block w-64 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sticky top-24">
            <div className="flex flex-col items-center py-4 mb-6 border-b dark:border-gray-700">
              <div className="w-20 h-20 bg-brand-orange text-white rounded-full flex items-center justify-center text-2xl font-semibold mb-2">
                JD
              </div>
              <h2 className="text-lg font-semibold">John Doe</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">john.doe@university.edu</p>
            </div>
            
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path}
                  className={`flex items-center justify-between px-3 py-2 rounded-md ${
                    isActive(item.path)
                      ? 'bg-brand-orange/10 text-brand-orange font-medium'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <Badge variant="destructive">{item.badge}</Badge>
                  )}
                </Link>
              ))}
              
              <Link 
                to="/login" 
                className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </Link>
            </nav>
          </div>
          
          {/* Mobile Action Buttons */}
          <div className="md:hidden w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm p-2 mb-4 flex justify-between">
            <Button variant="outline" asChild className="flex-1 mr-2">
              <Link to="/menu">Explore Menu</Link>
            </Button>
            <Button variant="outline" asChild className="flex-1">
              <Link to="/dashboard/customer/orders">My Orders</Link>
            </Button>
          </div>
          
          {/* Main Content */}
          <div className="flex-grow w-full md:w-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerLayout;
