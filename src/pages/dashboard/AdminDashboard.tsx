import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, CheckCircle, DollarSign, ShoppingBag, Store, User, Users } from 'lucide-react';

const AdminDashboard = () => {
  // Mock data
  const systemStats = [
    { title: 'Total Users', value: '1,254', icon: <Users className="h-4 w-4 text-gray-500" />, change: '+12%' },
    { title: 'Active Canteens', value: '8', icon: <Store className="h-4 w-4 text-gray-500" />, change: '+1' },
    { title: 'Total Orders', value: '8,652', icon: <ShoppingBag className="h-4 w-4 text-gray-500" />, change: '+23%' },
    { title: 'Total Revenue', value: '₹42,890', icon: <DollarSign className="h-4 w-4 text-gray-500" />, change: '+18%' },
  ];

  const canteens = [
    { id: 1, name: 'Main Cafeteria', orders: 342, revenue: 5240, status: 'active' },
    { id: 2, name: 'Engineering Block Canteen', orders: 186, revenue: 2840, status: 'active' },
    { id: 3, name: 'Science Block Café', orders: 253, revenue: 3150, status: 'active' },
    { id: 4, name: 'Library Coffee Shop', orders: 118, revenue: 1950, status: 'active' },
    { id: 5, name: 'Sports Complex Juice Bar', orders: 87, revenue: 1240, status: 'inactive' },
  ];

  const pendingApprovals = [
    { id: 'CA-001', name: 'Business School Café', owner: 'Maria Rodriguez', submittedDate: '2023-04-05' },
    { id: 'CA-002', name: 'Arts Block Snack Shop', owner: 'David Johnson', submittedDate: '2023-04-07' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400">System overview and management</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button>Create Announcement</Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="canteens">Canteens</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {systemStats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    {stat.icon}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-gray-500">{stat.change} from last month</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Canteen Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 p-4 text-xs font-medium bg-gray-50 dark:bg-gray-800">
                      <div className="col-span-4">Name</div>
                      <div className="col-span-2 text-right">Orders</div>
                      <div className="col-span-3 text-right">Revenue</div>
                      <div className="col-span-3 text-center">Status</div>
                    </div>
                    {canteens.map((canteen) => (
                      <div key={canteen.id} className="grid grid-cols-12 p-4 text-sm border-t">
                        <div className="col-span-4">{canteen.name}</div>
                        <div className="col-span-2 text-right">{canteen.orders}</div>
                        <div className="col-span-3 text-right">₹{canteen.revenue}</div>
                        <div className="col-span-3 text-center">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ₹{
                            canteen.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {canteen.status === 'active' ? (
                              <>
                                <span className="mr-1">●</span>
                                Active
                              </>
                            ) : (
                              <>
                                <span className="mr-1">●</span>
                                Inactive
                              </>
                            )}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Approvals</CardTitle>
                </CardHeader>
                <CardContent>
                  {pendingApprovals.length > 0 ? (
                    <div className="space-y-4">
                      {pendingApprovals.map((approval) => (
                        <div key={approval.id} className="flex flex-col md:flex-row justify-between border p-4 rounded-lg">
                          <div>
                            <h3 className="font-medium">{approval.name}</h3>
                            <p className="text-sm text-gray-500">Owner: {approval.owner}</p>
                            <p className="text-xs text-gray-500">Submitted: {approval.submittedDate}</p>
                          </div>
                          <div className="flex space-x-2 mt-4 md:mt-0">
                            <Button variant="outline" size="sm">View Details</Button>
                            <Button size="sm">Approve</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                      <h3 className="text-lg font-medium">All caught up!</h3>
                      <p className="text-gray-500 max-w-sm mt-1">
                        There are no pending approvals at the moment.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Announcements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium">System Maintenance</h3>
                        <span className="text-xs text-gray-500">Posted 2 days ago</span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        The system will undergo maintenance on April 15th from 2:00 AM to 4:00 AM. Some features may be temporarily unavailable.
                      </p>
                    </div>
                    <div className="border p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium">New Feature Release</h3>
                        <span className="text-xs text-gray-500">Posted 1 week ago</span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        We've released a new feature that allows canteen owners to create combo meal offers. Check it out in the menu management section.
                      </p>
                    </div>
                    <div className="mt-4 text-center">
                      <Button variant="outline" size="sm">View All Announcements</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Other tabs - simplified with placeholder content */}
          <TabsContent value="canteens">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Manage Canteens</CardTitle>
                <Button size="sm">Add New Canteen</Button>
              </CardHeader>
              <CardContent>
                <p>Canteen management interface will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>User Management</CardTitle>
                <Button size="sm">Add New User</Button>
              </CardHeader>
              <CardContent>
                <p>User management interface will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Platform Analytics</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center p-6">
                <div className="text-center">
                  <BarChart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                  <p>Analytics dashboard will appear here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
