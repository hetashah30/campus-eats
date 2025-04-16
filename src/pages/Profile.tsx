
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Edit, Save, LogOut, User, Clock, MapPin, CreditCard } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock user data
  const [userData, setUserData] = useState({
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 98765 43210',
    address: 'Room 203, Hostel Block C, University Campus',
    joinDate: 'October 2023',
    orderCount: 24,
    favoriteItems: ['Butter Chicken', 'Paneer Tikka', 'Masala Dosa']
  });

  // Mock order history
  const recentOrders = [
    { 
      id: 'ORD48756', 
      date: '2023-04-08T14:30:00', 
      items: ['Butter Chicken', 'Naan'], 
      total: 429, 
      status: 'delivered' 
    },
    { 
      id: 'ORD48721', 
      date: '2023-04-05T13:15:00', 
      items: ['Paneer Tikka', 'Jeera Rice'], 
      total: 349, 
      status: 'delivered' 
    },
    { 
      id: 'ORD48692', 
      date: '2023-04-01T19:45:00', 
      items: ['Masala Dosa', 'Filter Coffee'], 
      total: 249, 
      status: 'delivered' 
    }
  ];
  
  // Handler for updating user information
  const handleSaveChanges = () => {
    setIsEditing(false);
    // In a real app, you would save the changes to the backend
  };
  
  // Mock logout handler
  const handleLogout = () => {
    // In a real app, perform logout actions
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">My Profile</h1>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Summary Card */}
            <Card className="md:col-span-1">
              <CardHeader className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-2xl bg-brand-orange text-white">
                    {userData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <CardTitle>{userData.name}</CardTitle>
                <CardDescription className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Clock className="h-3 w-3" />
                    <span>Member since {userData.joinDate}</span>
                  </div>
                  <Badge variant="outline" className="mt-2">
                    {userData.orderCount} orders
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="font-medium mb-2">Favorite Items</h3>
                <div className="space-y-1">
                  {userData.favoriteItems.map((item, index) => (
                    <div key={index} className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-md text-sm">
                      {item}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Main Content Area */}
            <div className="md:col-span-2">
              <Tabs defaultValue="details">
                <TabsList className="mb-6">
                  <TabsTrigger value="details">Personal Details</TabsTrigger>
                  <TabsTrigger value="orders">Order History</TabsTrigger>
                  <TabsTrigger value="addresses">Addresses</TabsTrigger>
                </TabsList>
                
                {/* Personal Details Tab */}
                <TabsContent value="details">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Manage your personal details</CardDescription>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => isEditing ? handleSaveChanges() : setIsEditing(true)}
                        className="gap-2"
                      >
                        {isEditing ? (
                          <>
                            <Save className="h-4 w-4" />
                            Save
                          </>
                        ) : (
                          <>
                            <Edit className="h-4 w-4" />
                            Edit
                          </>
                        )}
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input 
                            id="name" 
                            value={userData.name} 
                            readOnly={!isEditing} 
                            onChange={(e) => setUserData({...userData, name: e.target.value})}
                            className={!isEditing ? "bg-gray-50 dark:bg-gray-800" : ""}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            value={userData.email} 
                            readOnly={!isEditing} 
                            onChange={(e) => setUserData({...userData, email: e.target.value})}
                            className={!isEditing ? "bg-gray-50 dark:bg-gray-800" : ""}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input 
                            id="phone" 
                            value={userData.phone} 
                            readOnly={!isEditing} 
                            onChange={(e) => setUserData({...userData, phone: e.target.value})}
                            className={!isEditing ? "bg-gray-50 dark:bg-gray-800" : ""}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Order History Tab */}
                <TabsContent value="orders">
                  <Card>
                    <CardHeader>
                      <CardTitle>Order History</CardTitle>
                      <CardDescription>View your past orders</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {recentOrders.length > 0 ? (
                        <div className="space-y-4">
                          {recentOrders.map((order) => (
                            <div key={order.id} className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 overflow-hidden">
                              <div className="p-4 flex justify-between items-start">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-semibold">Order #{order.id}</h3>
                                    <Badge variant="outline" className="capitalize">{order.status}</Badge>
                                  </div>
                                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{new Date(order.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                  <div className="mt-2">
                                    {order.items.join(", ")}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <span className="font-semibold">₹{order.total}</span>
                                  <div className="mt-2">
                                    <Button variant="outline" size="sm">View Details</Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <Clock className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                          <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                          <p className="text-gray-500 dark:text-gray-400 mb-4">You haven't placed any orders yet</p>
                          <Button asChild>
                            <a href="/menu">Browse Menu</a>
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Addresses Tab */}
                <TabsContent value="addresses">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Saved Addresses</CardTitle>
                        <CardDescription>Manage your delivery addresses</CardDescription>
                      </div>
                      <Button variant="outline" size="sm" className="gap-2">
                        <MapPin className="h-4 w-4" />
                        Add Address
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="border dark:border-gray-700 rounded-lg p-4 relative">
                          <div className="absolute top-4 right-4">
                            <Badge>Default</Badge>
                          </div>
                          <h3 className="font-medium mb-1">Campus Hostel</h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">{userData.address}</p>
                          <div className="mt-4 flex gap-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm">Delete</Button>
                          </div>
                        </div>
                        <div className="border dark:border-gray-700 rounded-lg p-4">
                          <h3 className="font-medium mb-1">Home</h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">42, Green Park Colony, Sector 16, New Delhi, 110032</p>
                          <div className="mt-4 flex gap-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm">Delete</Button>
                            <Button variant="outline" size="sm">Set as Default</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;
