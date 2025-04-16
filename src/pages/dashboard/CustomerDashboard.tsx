
import { useState } from 'react';
import { Link } from 'react-router-dom';
import CustomerLayout from '@/components/CustomerLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { formatPrice, formatDate } from '@/lib/formatters';
import { ShoppingBag, Bell, Clock, Calendar, FileText, TrendingUp, MapPin, History } from 'lucide-react';

const CustomerDashboard = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // Mock user data - in a real app, this would come from authentication context
  const user = {
    name: "John Doe",
    email: "customer@example.com",
    points: 720,
    pendingOrders: 2,
    completedOrders: 12,
    savedAddresses: 3,
  };
  
  // Mock recent orders
  const recentOrders = [
    {
      id: "ORD-1234",
      date: "2025-04-09",
      total: 547,
      status: "Delivered",
      items: 3,
      shop: "Campus Grill"
    },
    {
      id: "ORD-1233",
      date: "2025-04-07",
      total: 378,
      status: "Processing",
      items: 2,
      shop: "Pizza Corner"
    },
  ];
  
  // Handle tracking button click
  const handleTrackOrder = (orderId: string) => {
    toast({
      title: "Tracking Order",
      description: `Tracking information for order ${orderId}`,
    });
  };
  
  return (
    <CustomerLayout>
      <div className="space-y-6">
        {/* Welcome Message */}
        <div className="bg-brand-orange/10 dark:bg-brand-orange/5 p-6 rounded-xl">
          <h1 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h1>
          <p className="text-muted-foreground">
            Your campus dining simplified. What would you like to eat today?
          </p>
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/menu" className="no-underline">
            <Card className="hover:shadow-md transition-shadow bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-850 h-full">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                <ShoppingBag className="h-8 w-8 text-brand-orange mb-3" />
                <h3 className="font-medium">Explore Menu</h3>
                <p className="text-sm text-muted-foreground mt-1">Browse food options</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/dashboard/customer/orders" className="no-underline">
            <Card className="hover:shadow-md transition-shadow bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-850 h-full">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                <History className="h-8 w-8 text-brand-orange mb-3" />
                <h3 className="font-medium">My Orders</h3>
                <p className="text-sm text-muted-foreground mt-1">Track order history</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/cart" className="no-underline">
            <Card className="hover:shadow-md transition-shadow bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-850 h-full">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                <ShoppingBag className="h-8 w-8 text-brand-orange mb-3" />
                <h3 className="font-medium">View Cart</h3>
                <p className="text-sm text-muted-foreground mt-1">Checkout your order</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/dashboard/customer/notifications" className="no-underline">
            <Card className="hover:shadow-md transition-shadow bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-850 h-full">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                <Bell className="h-8 w-8 text-brand-orange mb-3" />
                <h3 className="font-medium">Notifications</h3>
                <p className="text-sm text-muted-foreground mt-1">Check updates</p>
              </CardContent>
            </Card>
          </Link>
        </div>
        
        {/* Order Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Loyalty Points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-brand-green mr-2" />
                <span className="text-2xl font-bold">{user.points}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Earn points with every order
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-brand-orange mr-2" />
                <span className="text-2xl font-bold">{user.pendingOrders}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Orders in progress
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-brand-green mr-2" />
                <span className="text-2xl font-bold">{user.completedOrders}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Total orders completed
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Recent Orders</CardTitle>
              <Link to="/dashboard/customer/orders">
                <Button variant="link" size="sm" className="text-brand-orange">
                  View All
                </Button>
              </Link>
            </div>
            <CardDescription>
              Track your most recent food orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentOrders.length > 0 ? (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0">
                    <div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-brand-orange" />
                        <span className="text-sm text-muted-foreground">{formatDate(order.date)}</span>
                      </div>
                      <p className="font-medium mt-1">{order.shop}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                          {order.id}
                        </span>
                        <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                          {order.items} items
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{formatPrice(order.total)}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${
                        order.status === "Delivered" 
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" 
                          : "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
                      }`}>
                        {order.status}
                      </span>
                      <div className="mt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleTrackOrder(order.id)}
                        >
                          Track Order
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <p>No recent orders found.</p>
                <Button variant="outline" className="mt-2" asChild>
                  <Link to="/menu">Browse Menu</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Saved Addresses */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Saved Delivery Locations</CardTitle>
              <Button variant="outline" size="sm">
                Add New
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 border-b pb-3">
                <MapPin className="h-5 w-5 text-brand-orange flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Hostel B-12</p>
                  <p className="text-sm text-muted-foreground">Room 304, North Campus</p>
                </div>
              </div>
              <div className="flex items-start gap-3 border-b pb-3">
                <MapPin className="h-5 w-5 text-brand-orange flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Library</p>
                  <p className="text-sm text-muted-foreground">Main Reading Hall, Section C</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-brand-orange flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Engineering Block</p>
                  <p className="text-sm text-muted-foreground">Seminar Hall 2, First Floor</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CustomerLayout>
  );
};

export default CustomerDashboard;
