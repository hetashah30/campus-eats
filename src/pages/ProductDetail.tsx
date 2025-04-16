import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/hooks/use-cart';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Minus, Plus, Star, ShoppingCart, Clock, CheckCircle, UserPlus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatPrice } from '@/lib/formatters';
import { allFoodItems, getSimilarProducts } from '@/data/foodItems';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addItem, items, updateQuantity } = useCart();
  const { isAuthenticated } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const foundProduct = allFoodItems.find(item => item.id === id);
    
    setQuantity(1);
    
    setTimeout(() => {
      setProduct(foundProduct);
      setSimilarProducts(getSimilarProducts(foundProduct));
      setIsLoading(false);
    }, 500);
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-8 flex justify-center items-center">
          <div className="animate-pulse flex flex-col space-y-4 w-full max-w-4xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-12 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg mt-8"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-16 flex flex-col items-center justify-center">
          <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/menu">Back to Menu</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    
    const existingItem = items.find(item => item.id === product.id);
    
    if (existingItem) {
      updateQuantity(product.id, existingItem.quantity + quantity);
      toast({
        title: "Cart updated",
        description: `${product.name} quantity updated to ${existingItem.quantity + quantity}.`,
      });
    } else {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image,
        category: product.category,
      });
      
      toast({
        title: "Added to cart",
        description: `${quantity}x ${product.name} has been added to your cart.`,
      });
    }
  };
  
  const isInCart = items.some(item => item.id === product.id);
  
  const avgRating = product.reviews 
    ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length 
    : product.rating;
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <span className="text-gray-500 dark:text-gray-400">Back to Menu</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto rounded-lg shadow-md"
            />
            {product.isVeg ? (
              <div className="absolute top-4 left-4 bg-brand-green/90 text-white px-3 py-1 rounded-full">
                Vegetarian
              </div>
            ) : (
              <div className="absolute top-4 left-4 bg-brand-red/90 text-white px-3 py-1 rounded-full">
                Non-Vegetarian
              </div>
            )}
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-brand-orange/10 text-brand-orange px-2 py-1 rounded text-sm font-medium">
                {product.category}
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                <span className="text-sm font-medium">{avgRating.toFixed(1)}</span>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {product.description}
            </p>
            
            <div className="flex items-center gap-3 mb-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Prep time: {product.preparationTime}</span>
            </div>
            
            <div className="flex items-center mb-6">
              {product.tags && product.tags.map(tag => (
                <span key={tag} className="mr-2 text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="text-2xl font-bold mb-6">{formatPrice(product.price)}</div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-md dark:border-gray-700">
                <button 
                  className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => handleQuantityChange(-1)}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-3 py-2 border-x dark:border-gray-700">{quantity}</span>
                <button 
                  className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => handleQuantityChange(1)}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              
              <Button 
                className="gap-2"
                onClick={handleAddToCart}
              >
                {isAuthenticated ? (
                  isInCart ? (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      Update Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </>
                  )
                ) : (
                  <>
                    <UserPlus className="h-4 w-4" />
                    Login to Order
                  </>
                )}
              </Button>
            </div>
            
            {!isAuthenticated && (
              <div className="mt-4 text-sm text-gray-500 bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                <p>You need to be logged in to place an order.</p>
              </div>
            )}
          </div>
        </div>
        
        <Tabs defaultValue="ingredients" className="mb-12">
          <TabsList className="mb-6">
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="ingredients" className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
            <ul className="list-disc list-inside space-y-2 pl-2">
              {product.ingredients?.map((ingredient, idx) => (
                <li key={idx} className="text-gray-700 dark:text-gray-300">{ingredient}</li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="nutrition" className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Nutritional Information</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Calories</p>
                <p className="font-bold">{product.nutritionalInfo?.calories}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Protein</p>
                <p className="font-bold">{product.nutritionalInfo?.protein}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Carbs</p>
                <p className="font-bold">{product.nutritionalInfo?.carbs}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Fat</p>
                <p className="font-bold">{product.nutritionalInfo?.fat}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Fiber</p>
                <p className="font-bold">{product.nutritionalInfo?.fiber}</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
            {product.reviews && product.reviews.length > 0 ? (
              <div className="space-y-4">
                {product.reviews.map((review, idx) => (
                  <div key={idx} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold">{review.user}</p>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No reviews yet.</p>
            )}
          </TabsContent>
        </Tabs>
        
        {similarProducts.length > 0 && (
          <div>
            <h3 className="text-xl font-bold mb-6">You may also like</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProducts.map((item) => (
                <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow group">
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
                    <span className="text-xs font-medium text-brand-orange uppercase tracking-wide">{item.category}</span>
                    <h3 className="font-bold mt-1">{item.name}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-semibold">{formatPrice(item.price)}</span>
                      <Button 
                        size="sm" 
                        onClick={() => {
                          addItem({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            quantity: 1,
                            image: item.image,
                            category: item.category,
                          });
                          
                          toast({
                            title: "Added to cart",
                            description: `${item.name} has been added to your cart.`,
                          });
                        }}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
