import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/hooks/use-cart';
import { formatPrice } from '@/lib/formatters';
import { Search, Star, Plus, Filter, ChevronDown, CheckCircle } from 'lucide-react';
import { allFoodItems } from '@/data/foodItems';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const categories = ['All', 'Breakfast', 'Lunch', 'Snacks', 'Beverages', 'Desserts'];

const Menu = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [dietaryFilter, setDietaryFilter] = useState('all'); // 'all', 'veg', 'non-veg'
  const [sortOption, setSortOption] = useState('popularity'); // 'popularity', 'price-low', 'price-high'
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  
  const { toast } = useToast();
  const { addItem, items } = useCart();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const filteredItems = allFoodItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesDietary = dietaryFilter === 'all' || 
                          (dietaryFilter === 'veg' && item.isVeg) || 
                          (dietaryFilter === 'non-veg' && !item.isVeg);
    
    return matchesSearch && matchesCategory && matchesDietary;
  });
  
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOption === 'popularity') return b.rating - a.rating;
    if (sortOption === 'price-low') return a.price - b.price;
    if (sortOption === 'price-high') return b.price - a.price;
    return 0;
  });
  
  const handleAddToCart = (item) => {
    const existingItem = items.find(cartItem => cartItem.id === item.id);
    
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
      category: item.category,
    });
    
    toast({
      title: existingItem ? "Cart updated" : "Added to cart",
      description: existingItem 
        ? `${item.name} quantity increased in your cart.`
        : `${item.name} has been added to your cart.`,
    });
  };
  
  const isInCart = (id: string) => {
    return items.some(item => item.id === id);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-8">Menu</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search menu items..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="py-4 space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Dietary Preferences</h3>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="all"
                          name="dietary"
                          checked={dietaryFilter === 'all'}
                          onChange={() => setDietaryFilter('all')}
                          className="mr-2"
                        />
                        <label htmlFor="all">All</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="veg"
                          name="dietary"
                          checked={dietaryFilter === 'veg'}
                          onChange={() => setDietaryFilter('veg')}
                          className="mr-2"
                        />
                        <label htmlFor="veg">Vegetarian</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="non-veg"
                          name="dietary"
                          checked={dietaryFilter === 'non-veg'}
                          onChange={() => setDietaryFilter('non-veg')}
                          className="mr-2"
                        />
                        <label htmlFor="non-veg">Non-Vegetarian</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-3">Sort By</h3>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="popularity"
                          name="sort"
                          checked={sortOption === 'popularity'}
                          onChange={() => setSortOption('popularity')}
                          className="mr-2"
                        />
                        <label htmlFor="popularity">Popularity</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="price-low"
                          name="sort"
                          checked={sortOption === 'price-low'}
                          onChange={() => setSortOption('price-low')}
                          className="mr-2"
                        />
                        <label htmlFor="price-low">Price: Low to High</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="price-high"
                          name="sort"
                          checked={sortOption === 'price-high'}
                          onChange={() => setSortOption('price-high')}
                          className="mr-2"
                        />
                        <label htmlFor="price-high">Price: High to Low</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => {
                    setDietaryFilter('all');
                    setSortOption('popularity');
                  }}>
                    Reset Filters
                  </Button>
                  <Button onClick={() => setIsFilterSheetOpen(false)}>
                    Apply Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  {selectedCategory} <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {categories.map((category) => (
                  <DropdownMenuItem 
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer py-2 px-4"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
        
        {sortedItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedItems.map((item) => (
              <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
                <Link to={`/menu/${item.id}`} className="block relative h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full px-2 py-1 flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{item.rating}</span>
                  </div>
                  {item.isVeg ? (
                    <div className="absolute top-2 left-2 bg-brand-green/90 text-white text-xs px-2 py-1 rounded-full">
                      Veg
                    </div>
                  ) : (
                    <div className="absolute top-2 left-2 bg-brand-red/90 text-white text-xs px-2 py-1 rounded-full">
                      Non-Veg
                    </div>
                  )}
                </Link>
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-medium text-brand-orange uppercase tracking-wide">{item.category}</span>
                      <h3 className="font-bold mt-1">{item.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                        {item.description}
                      </p>
                    </div>
                    <Button 
                      size="icon" 
                      className={`h-8 w-8 rounded-full flex-shrink-0 ${
                        isInCart(item.id) ? 'bg-green-600 hover:bg-green-700' : ''
                      }`}
                      onClick={() => handleAddToCart(item)}
                    >
                      {isInCart(item.id) ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className="mt-3">
                    <span className="font-semibold">{formatPrice(item.price)}</span>
                  </div>
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-2">No items found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">Try adjusting your search or filter criteria</p>
            <Button onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setDietaryFilter('all');
            }}>
              Reset Filters
            </Button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Menu;
