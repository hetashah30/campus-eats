
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { Minus, Plus, Trash, ArrowLeft, CheckCircle, BadgeIndianRupee, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { formatPrice } from '@/lib/formatters';

const Cart = () => {
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  
  const taxRate = 0.05; // 5% GST
  const subtotal = getTotalPrice();
  const tax = subtotal * taxRate;
  const deliveryFee = subtotal > 500 ? 0 : 40; // Free delivery for orders above ₹500
  const total = subtotal + tax + deliveryFee;
  
  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
    
    toast({
      title: "Cart updated",
      description: `Item quantity updated.`,
    });
  };
  
  const handlePaymentSubmit = () => {
    if (!deliveryAddress.trim()) {
      toast({
        title: "Delivery address required",
        description: "Please enter your delivery address to continue.",
        variant: "destructive"
      });
      return;
    }
    
    if (!contactNumber.trim()) {
      toast({
        title: "Contact number required",
        description: "Please enter your contact number to continue.",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessingPayment(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessingPayment(false);
      setIsPaymentDialogOpen(false);
      setIsConfirmationOpen(true);
      
      // Simulate order processing
      setTimeout(() => {
        clearCart();
        setIsConfirmationOpen(false);
        navigate('/dashboard/customer/orders');
      }, 3000);
    }, 2000);
  };
  
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-16 flex flex-col items-center justify-center">
          <div className="text-center max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-6 inline-block mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button asChild>
              <Link to="/menu">Browse Menu</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">Your Cart</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Items ({items.length})</h2>
              
              {items.map((item) => (
                <div key={item.id} className="flex py-4 border-b dark:border-gray-700">
                  <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-grow">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{item.name}</h3>
                      <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{formatPrice(item.price)} each</p>
                    <div className="flex items-center mt-2 justify-between">
                      <div className="flex items-center">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 rounded-full"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="mx-3 w-6 text-center">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 rounded-full"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => {
                          removeItem(item.id);
                          toast({
                            title: "Item removed",
                            description: `${item.name} has been removed from your cart.`
                          });
                        }}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="mt-6 flex flex-wrap gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    clearCart();
                    toast({
                      title: "Cart cleared",
                      description: "All items have been removed from your cart."
                    });
                  }}
                >
                  Clear Cart
                </Button>
                <Button variant="outline" onClick={() => navigate('/menu')}>
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex items-center mb-4">
                <BadgeIndianRupee className="h-5 w-5 text-brand-green mr-2" />
                <h2 className="text-xl font-bold">Order Summary</h2>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">GST (5%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Delivery Fee</span>
                  <span>{deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
              {deliveryFee === 0 && (
                <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm p-2 rounded-md mb-4 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <span>Free delivery on orders above {formatPrice(500)}</span>
                </div>
              )}
              {deliveryFee > 0 && (
                <div className="text-xs text-gray-500 mb-4">
                  Add {formatPrice(500 - subtotal)} more for free delivery
                </div>
              )}
              <Button className="w-full" onClick={() => setIsPaymentDialogOpen(true)}>
                Proceed to Checkout
              </Button>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
                By proceeding, you agree to our terms and conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Payment Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Checkout</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Delivery Address</label>
              <textarea
                className="w-full p-2 border dark:border-gray-700 dark:bg-gray-800 rounded min-h-[80px]"
                placeholder="Enter your full delivery address"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Contact Number</label>
              <input
                type="tel"
                className="w-full p-2 border dark:border-gray-700 dark:bg-gray-800 rounded"
                placeholder="Enter your phone number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Payment Method</label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="card"
                    name="payment"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="mr-2"
                  />
                  <label htmlFor="card" className="flex items-center">
                    <span>Credit/Debit Card</span>
                    <div className="flex gap-1 ml-2">
                      <div className="bg-blue-600 w-8 h-5 rounded"></div>
                      <div className="bg-red-600 w-8 h-5 rounded"></div>
                    </div>
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="upi"
                    name="payment"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="mr-2"
                  />
                  <label htmlFor="upi" className="flex items-center">
                    <span>UPI</span>
                    <div className="ml-2 bg-purple-600 text-white text-xs px-1 rounded">UPI</div>
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="wallet"
                    name="payment"
                    checked={paymentMethod === 'wallet'}
                    onChange={() => setPaymentMethod('wallet')}
                    className="mr-2"
                  />
                  <label htmlFor="wallet">Campus Wallet</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="cod"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mr-2"
                  />
                  <label htmlFor="cod">Cash on Delivery</label>
                </div>
              </div>
            </div>
            
            {paymentMethod === 'card' && (
              <div className="space-y-2">
                <div>
                  <label className="block text-sm mb-1">Card Number</label>
                  <input
                    type="text"
                    className="w-full p-2 border dark:border-gray-700 dark:bg-gray-800 rounded"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm mb-1">Expiry Date</label>
                    <input
                      type="text"
                      className="w-full p-2 border dark:border-gray-700 dark:bg-gray-800 rounded"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">CVV</label>
                    <input
                      type="text"
                      className="w-full p-2 border dark:border-gray-700 dark:bg-gray-800 rounded"
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {paymentMethod === 'upi' && (
              <div>
                <label className="block text-sm mb-1">UPI ID</label>
                <input
                  type="text"
                  className="w-full p-2 border dark:border-gray-700 dark:bg-gray-800 rounded"
                  placeholder="name@upi"
                />
              </div>
            )}
            
            {paymentMethod === 'wallet' && (
              <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
                <p className="font-medium">Campus Wallet Balance: {formatPrice(2000)}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {total <= 2000 ? 'Sufficient balance for this order.' : 'Insufficient balance for this order.'}
                </p>
              </div>
            )}
            
            <div className="flex justify-between pt-4 font-semibold">
              <span>Total Amount:</span>
              <span>{formatPrice(total)}</span>
            </div>
            
            <div className="pt-4">
              <Button 
                className="w-full" 
                onClick={handlePaymentSubmit}
                disabled={isProcessingPayment}
              >
                {isProcessingPayment ? (
                  <span className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  `Pay ${formatPrice(total)}`
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Order Confirmation Dialog */}
      <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
        <DialogContent className="text-center">
          <div className="flex flex-col items-center py-6">
            <div className="bg-brand-green/10 p-4 rounded-full mb-4">
              <CheckCircle className="h-16 w-16 text-brand-green" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your order has been placed successfully.
            </p>
            <div className="animate-pulse">
              <p className="text-sm text-brand-orange">Redirecting to your orders...</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Cart;
