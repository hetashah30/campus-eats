
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatPrice, formatDate } from '@/lib/formatters';
import CustomerLayout from '@/components/CustomerLayout';
import { Filter, CheckCircle, XCircle, Clock, ArrowUpDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock orders data for demonstration
const mockOrders = [
  {
    id: 'ORD-1234',
    date: '2023-11-25',
    status: 'Delivered',
    items: [
      { name: 'Classic Burger', quantity: 1, price: 299 },
      { name: 'French Fries', quantity: 1, price: 149 },
      { name: 'Iced Coffee', quantity: 1, price: 99 },
    ],
    total: 547,
    shop: 'Campus Grill',
    shopImage: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=300&auto=format&fit=crop'
  },
  {
    id: 'ORD-1233',
    date: '2023-11-23',
    status: 'Delivered',
    items: [
      { name: 'Margherita Pizza', quantity: 1, price: 249 },
      { name: 'Mango Smoothie', quantity: 1, price: 129 },
    ],
    total: 378,
    shop: 'Pizza Corner',
    shopImage: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=300&auto=format&fit=crop'
  },
  {
    id: 'ORD-1232',
    date: '2023-11-20',
    status: 'Delivered',
    items: [
      { name: 'Chicken Biryani', quantity: 1, price: 299 },
      { name: 'Chocolate Brownie', quantity: 1, price: 149 },
    ],
    total: 448,
    shop: 'Spice Garden',
    shopImage: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=300&auto=format&fit=crop'
  },
  {
    id: 'ORD-1231',
    date: '2023-11-18',
    status: 'Processing',
    items: [
      { name: 'Paneer Tikka', quantity: 1, price: 249 },
      { name: 'Garlic Naan', quantity: 2, price: 69 },
      { name: 'Lassi', quantity: 1, price: 89 }
    ],
    total: 476,
    shop: 'Indian Delight',
    shopImage: 'https://images.unsplash.com/photo-1585937421612-70a008356cf4?q=80&w=300&auto=format&fit=crop'
  },
  {
    id: 'ORD-1230',
    date: '2023-11-15',
    status: 'Cancelled',
    items: [
      { name: 'Veggie Wrap', quantity: 1, price: 199 },
      { name: 'Cold Coffee', quantity: 1, price: 129 }
    ],
    total: 328,
    shop: 'Healthy Bites',
    shopImage: 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?q=80&w=300&auto=format&fit=crop'
  }
];

const CustomerOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const { toast } = useToast();
  
  const viewOrderDetails = (order: any) => {
    setSelectedOrder(order);
    setIsOrderDetailsOpen(true);
  };
  
  const handleReorder = (order: any) => {
    toast({
      title: "Reordering items",
      description: `${order.items.length} items from ${order.shop} added to cart.`
    });
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle className="h-4 w-4 text-brand-green" />;
      case 'Cancelled':
        return <XCircle className="h-4 w-4 text-brand-red" />;
      default:
        return <Clock className="h-4 w-4 text-brand-orange" />;
    }
  };
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
    }
  };

  // Filter and sort orders
  let filteredOrders = [...mockOrders];
  if (filterStatus) {
    filteredOrders = filteredOrders.filter(order => order.status === filterStatus);
  }
  
  filteredOrders.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  return (
    <CustomerLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">My Orders</h1>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-md p-1">
              <button 
                className={`px-3 py-1 rounded ${!filterStatus ? 'bg-white dark:bg-gray-700 shadow-sm' : ''}`}
                onClick={() => setFilterStatus(null)}
              >
                All
              </button>
              <button 
                className={`px-3 py-1 rounded ${filterStatus === 'Delivered' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''}`}
                onClick={() => setFilterStatus('Delivered')}
              >
                Delivered
              </button>
              <button 
                className={`px-3 py-1 rounded ${filterStatus === 'Processing' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''}`}
                onClick={() => setFilterStatus('Processing')}
              >
                Processing
              </button>
              <button 
                className={`px-3 py-1 rounded ${filterStatus === 'Cancelled' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''}`}
                onClick={() => setFilterStatus('Cancelled')}
              >
                Cancelled
              </button>
            </div>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
              className="flex items-center gap-1"
            >
              <ArrowUpDown className="h-4 w-4" />
              {sortOrder === 'newest' ? 'Newest' : 'Oldest'}
            </Button>
          </div>
        </div>
        
        {filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div 
                key={order.id} 
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 transition-all hover:shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="hidden sm:block w-12 h-12 rounded-md overflow-hidden">
                      <img 
                        src={order.shopImage} 
                        alt={order.shop} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-semibold">{order.shop}</h3>
                        <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{formatDate(order.date)}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Order #{order.id}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusClass(order.status)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </Badge>
                    <span className="font-semibold">{formatPrice(order.total)}</span>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-3 border-t dark:border-gray-700 pt-3">
                  {order.items.map((item, idx) => (
                    <span key={idx}>
                      {item.quantity}× {item.name}
                      {idx < order.items.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between mt-3">
                  <Button variant="ghost" size="sm" onClick={() => viewOrderDetails(order)}>
                    View Details
                  </Button>
                  {order.status !== 'Cancelled' && (
                    <Button variant="outline" size="sm" onClick={() => handleReorder(order)}>
                      Reorder
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <Filter className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium mb-2">No orders found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4 max-w-md mx-auto">
              {filterStatus 
                ? `You don't have any ${filterStatus.toLowerCase()} orders.` 
                : "You haven't placed any orders yet."}
            </p>
            {filterStatus && (
              <Button onClick={() => setFilterStatus(null)}>
                View All Orders
              </Button>
            )}
            {!filterStatus && (
              <Button asChild>
                <Link to="/menu">Browse Menu</Link>
              </Button>
            )}
          </div>
        )}
      </div>
      
      {/* Order Details Dialog */}
      <Dialog open={isOrderDetailsOpen} onOpenChange={setIsOrderDetailsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order #{selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-md overflow-hidden">
                  <img 
                    src={selectedOrder.shopImage} 
                    alt={selectedOrder.shop} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{selectedOrder.shop}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(selectedOrder.date)}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Status</span>
                <Badge className={getStatusClass(selectedOrder.status)}>
                  <span className="flex items-center gap-1">
                    {getStatusIcon(selectedOrder.status)}
                    {selectedOrder.status}
                  </span>
                </Badge>
              </div>
              
              <div className="space-y-2 pt-2 border-t dark:border-gray-700">
                <span className="text-sm font-medium">Items</span>
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>{item.quantity}× {item.name}</span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="pt-2 border-t dark:border-gray-700">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatPrice(selectedOrder.total * 0.95)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>GST (5%)</span>
                    <span>{formatPrice(selectedOrder.total * 0.05)}</span>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4 flex justify-between font-semibold dark:border-gray-700">
                <span>Total</span>
                <span>{formatPrice(selectedOrder.total)}</span>
              </div>
              
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setIsOrderDetailsOpen(false)}>
                  Close
                </Button>
                {selectedOrder.status !== 'Cancelled' && (
                  <Button onClick={() => handleReorder(selectedOrder)}>
                    Reorder
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </CustomerLayout>
  );
};

export default CustomerOrders;
