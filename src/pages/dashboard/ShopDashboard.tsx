
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, Clock, Package, ShoppingBag, Users, X, Bell, IndianRupee } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { formatPrice } from '@/lib/formatters';

const ShopDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [orders, setOrders] = useState([]);
  const [newOrders, setNewOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  // Mock data for now
  const recentActivity = [
    { action: 'New order received', time: '2 minutes ago', order: 'ORD-004' },
    { action: 'Order marked as ready', time: '15 minutes ago', order: 'ORD-002' },
    { action: 'Low stock alert: Burger Buns', time: '30 minutes ago' },
    { action: 'Daily sales report generated', time: '1 hour ago' },
  ];

  // Fetch orders when the component mounts
  useEffect(() => {
    fetchOrders();
    
    // Subscribe to new orders
    const ordersChannel = supabase
      .channel('orders-channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'orders',
          filter: `shop_id=eq.${user?.id}`
        },
        (payload) => {
          toast({
            title: "New Order Received!",
            description: `Order #${payload.new.id.substring(0, 8)} has been placed.`,
          });
          
          // Add new order to the state
          setNewOrders(prev => [...prev, payload.new]);
          fetchOrders(); // Refresh orders
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(ordersChannel);
    };
  }, [user]);
  
  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      // Using mock data for now, but in a real app this would fetch from Supabase
      setOrders([
        { id: 'ORD-001', customer: 'John Doe', items: 3, total: 2450, status: 'preparing', time: '5 mins ago' },
        { id: 'ORD-002', customer: 'Sarah Smith', items: 2, total: 1875, status: 'ready', time: '12 mins ago' },
        { id: 'ORD-003', customer: 'Mike Johnson', items: 1, total: 799, status: 'pending', time: '1 min ago' },
        { id: 'ORD-004', customer: 'Emily Davis', items: 4, total: 3225, status: 'pending', time: 'Just now' },
      ]);
      
      // Get new orders count
      const pendingOrders = orders.filter(order => order.status === 'pending');
      setNewOrders(pendingOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleOrderAction = (orderId, action) => {
    // Update order status locally
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        const newStatus = action === 'accept' ? 'preparing' : 'cancelled';
        return { ...order, status: newStatus };
      }
      return order;
    });
    
    setOrders(updatedOrders);
    
    // Remove from new orders
    setNewOrders(prev => prev.filter(order => order.id !== orderId));
    
    // Show toast
    toast({
      title: action === 'accept' ? "Order accepted" : "Order rejected",
      description: `Order #${orderId} has been ${action === 'accept' ? 'accepted' : 'rejected'}.`,
    });
    
    // In a real app, update the order in Supabase here
  };
  
  const handleStatusChange = (orderId, newStatus) => {
    // Update order status locally
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    });
    
    setOrders(updatedOrders);
    
    // Show toast
    toast({
      title: "Order status updated",
      description: `Order #${orderId} is now ${newStatus}.`,
    });
    
    // In a real app, update the order in Supabase here
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Shop Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage your food shop operations</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button variant="outline" className="relative">
              <Bell size={18} />
              {newOrders.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs h-5 w-5 flex items-center justify-center p-0">
                  {newOrders.length}
                </Badge>
              )}
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="outline">
              Settings
            </Button>
            <Button>
              Add New Item
            </Button>
          </div>
        </div>

        {newOrders.length > 0 && (
          <div className="mb-8 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <h3 className="font-semibold flex items-center gap-2">
              <Bell className="h-4 w-4" />
              New Orders Requiring Attention
            </h3>
            <div className="mt-3 space-y-3">
              {newOrders.map(order => (
                <div key={order.id} className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm">
                  <div>
                    <p className="font-medium">Order #{order.id}</p>
                    <p className="text-sm text-gray-500">{order.items} items · {formatPrice(order.total)}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      onClick={() => handleOrderAction(order.id, 'reject')}
                    >
                      Reject
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleOrderAction(order.id, 'accept')}
                    >
                      Accept
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">
              Orders
              {newOrders.length > 0 && (
                <Badge className="ml-2 bg-red-500 text-white">
                  {newOrders.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Today's Orders</CardTitle>
                  <ShoppingBag className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23</div>
                  <p className="text-xs text-gray-500">+15% from yesterday</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <IndianRupee className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatPrice(34250)}</div>
                  <p className="text-xs text-gray-500">+5% from yesterday</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                  <Clock className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-gray-500">2 need attention</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Popular Items</CardTitle>
                  <Package className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Burger</div>
                  <p className="text-xs text-gray-500">12 orders today</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.map(order => (
                      <div key={order.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-gray-500">{order.customer}</p>
                        </div>
                        <div>
                          <p className="text-sm">{order.items} items · {formatPrice(order.total)}</p>
                          <p className="text-xs text-gray-500">{order.time}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          order.status === 'pending' ? 'bg-gray-100 text-gray-800' : 
                          order.status === 'preparing' ? 'bg-blue-100 text-blue-800' : 
                          'bg-green-100 text-green-800'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
                            
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 border-b pb-2 last:border-0">
                        <div className="mt-0.5">
                          <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-1">
                            <Clock className="h-3 w-3 text-gray-500" />
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                          {activity.order && (
                            <p className="text-xs text-brand-orange mt-1">#{activity.order}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Active Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {orders.map(order => (
                    <div key={order.id} className="flex flex-col md:flex-row md:items-center justify-between border p-4 rounded-lg">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            order.status === 'pending' ? 'bg-gray-100 text-gray-800' : 
                            order.status === 'preparing' ? 'bg-blue-100 text-blue-800' : 
                            order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                          <h3 className="font-medium">{order.id}</h3>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{order.customer}</p>
                        <p className="text-sm mt-1">{order.items} items · {formatPrice(order.total)}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-4 md:mt-0">
                        <Button variant="outline" size="sm">Details</Button>
                        {order.status === 'pending' && (
                          <>
                            <Button 
                              size="sm" 
                              variant="destructive" 
                              onClick={() => handleStatusChange(order.id, 'cancelled')}
                            >
                              Reject
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => handleStatusChange(order.id, 'preparing')}
                            >
                              Accept
                            </Button>
                          </>
                        )}
                        {order.status === 'preparing' && (
                          <Button 
                            size="sm"
                            onClick={() => handleStatusChange(order.id, 'ready')}
                          >
                            Mark as Ready
                          </Button>
                        )}
                        {order.status === 'ready' && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleStatusChange(order.id, 'completed')}
                          >
                            Picked Up
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Menu Tab */}
          <TabsContent value="menu">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Menu Items</CardTitle>
                <Button size="sm">Add New Item</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Sample menu items */}
                  {[
                    { id: 1, name: 'Veg Burger', price: 149, category: 'Fast Food', available: true, image: '🍔' },
                    { id: 2, name: 'Masala Dosa', price: 129, category: 'South Indian', available: true, image: '🥞' },
                    { id: 3, name: 'Paneer Tikka', price: 199, category: 'Starters', available: true, image: '🧀' },
                    { id: 4, name: 'Cold Coffee', price: 89, category: 'Beverages', available: false, image: '☕' },
                  ].map(item => (
                    <div key={item.id} className="flex items-center justify-between border-b pb-3">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{item.image}</div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">{item.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-medium">{formatPrice(item.price)}</p>
                        <Badge variant={item.available ? "default" : "destructive"}>
                          {item.available ? 'Available' : 'Out of Stock'}
                        </Badge>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Inventory Tab */}
          <TabsContent value="inventory">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Inventory Management</CardTitle>
                <Button size="sm">Add New Item</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Sample inventory items */}
                  {[
                    { id: 1, name: 'Burger Buns', quantity: 15, unit: 'packs', status: 'low' },
                    { id: 2, name: 'Tomatoes', quantity: 5, unit: 'kg', status: 'low' },
                    { id: 3, name: 'Cheese Slices', quantity: 50, unit: 'pcs', status: 'normal' },
                    { id: 4, name: 'Potato', quantity: 20, unit: 'kg', status: 'normal' },
                    { id: 5, name: 'Mayonnaise', quantity: 3, unit: 'bottles', status: 'critical' },
                  ].map(item => (
                    <div key={item.id} className="flex items-center justify-between border-b pb-3">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.quantity} {item.unit}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={
                          item.status === 'normal' ? 'default' : 
                          item.status === 'low' ? 'secondary' : 
                          'destructive'
                        }>
                          {item.status === 'normal' ? 'Normal' : 
                           item.status === 'low' ? 'Low Stock' : 
                           'Critical'}
                        </Badge>
                        <Button variant="outline" size="sm">Update</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ShopDashboard;
