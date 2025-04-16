import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md dark:bg-gray-900">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-brand-orange rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-800 dark:text-white">CampusEats</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-brand-orange dark:text-gray-200 dark:hover:text-brand-orange transition-colors">Home</Link>
            <Link to="/menu" className="text-gray-700 hover:text-brand-orange dark:text-gray-200 dark:hover:text-brand-orange transition-colors">Menu</Link>
            <Link to="/how-it-works" className="text-gray-700 hover:text-brand-orange dark:text-gray-200 dark:hover:text-brand-orange transition-colors">How It Works</Link>
            <Link to="/join" className="text-gray-700 hover:text-brand-orange dark:text-gray-200 dark:hover:text-brand-orange transition-colors">Join Us</Link>
          </div>
          
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {items.length > 0 && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {items.length}
                  </Badge>
                )}
              </Button>
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to={user?.role ? `/dashboard/${user.role}` : "/profile"}>
                  <Button variant="ghost" size="icon" title={user?.name || "Profile"}>
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="default" onClick={() => logout()}>
                  Logout
                </Button>
              </>
            ) : (
              <Button variant="default" asChild>
                <Link to="/login">Login</Link>
              </Button>
            )}
            
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={toggleMenu}>
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden mt-2 pb-3 space-y-1 animate-fade-in">
            <Link to="/" className="block py-2 px-4 text-gray-700 hover:bg-brand-orange/10 hover:text-brand-orange rounded-md transition-colors dark:text-gray-200">Home</Link>
            <Link to="/menu" className="block py-2 px-4 text-gray-700 hover:bg-brand-orange/10 hover:text-brand-orange rounded-md transition-colors dark:text-gray-200">Menu</Link>
            <Link to="/how-it-works" className="block py-2 px-4 text-gray-700 hover:bg-brand-orange/10 hover:text-brand-orange rounded-md transition-colors dark:text-gray-200">How It Works</Link>
            <Link to="/join" className="block py-2 px-4 text-gray-700 hover:bg-brand-orange/10 hover:text-brand-orange rounded-md transition-colors dark:text-gray-200">Join Us</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
