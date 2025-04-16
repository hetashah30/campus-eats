
import { useState } from 'react';
import CustomerLayout from '@/components/CustomerLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, Clock, CheckCircle, X, AlertTriangle, Percent } from 'lucide-react';
import { formatDate } from '@/lib/formatters';

// Sample notifications data
const initialNotifications = [
  {
    id: 1,
    title: "Order Delivered",
    message: "Your order #ORD-1234 has been delivered successfully.",
    date: "2025-04-09T15:30:00",
    type: "order_delivery",
    read: false
  },
  {
    id: 2,
    title: "Order Processing",
    message: "Your order #ORD-1233 is being prepared and will be ready for pickup soon.",
    date: "2025-04-07T12:15:00",
    type: "order_update",
    read: false
  },
  {
    id: 3,
    title: "Special Discount",
    message: "Enjoy 20% off on all orders above ₹500 today!",
    date: "2025-04-06T09:00:00",
    type: "promotion",
    read: true
  },
  {
    id: 4,
    title: "New Menu Items",
    message: "Check out our new breakfast menu items. Available from 7 AM to 10 AM.",
    date: "2025-04-05T08:00:00",
    type: "promotion",
    read: true
  },
  {
    id: 5,
    title: "Order Cancelled",
    message: "Your order #ORD-1230 has been cancelled as requested.",
    date: "2025-04-03T16:45:00",
    type: "order_cancellation",
    read: true
  }
];

const CustomerNotifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState("all");
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({...notif, read: true})));
  };
  
  // Mark one as read
  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? {...notif, read: true} : notif
    ));
  };
  
  // Delete notification
  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };
  
  // Filter notifications
  const filteredNotifications = filter === "all" 
    ? notifications 
    : filter === "unread" 
      ? notifications.filter(n => !n.read)
      : notifications.filter(n => n.type === filter);
  
  // Get icon based on notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "order_delivery":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "order_update":
        return <Clock className="h-5 w-5 text-brand-orange" />;
      case "order_cancellation":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "promotion":
        return <Percent className="h-5 w-5 text-purple-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };
  
  return (
    <CustomerLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Notifications</h1>
            {unreadCount > 0 && (
              <Badge variant="default" className="bg-brand-orange hover:bg-brand-orange">
                {unreadCount} new
              </Badge>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-md p-1">
              <button 
                className={`px-3 py-1 text-sm rounded ${filter === 'all' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''}`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded ${filter === 'unread' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''}`}
                onClick={() => setFilter('unread')}
              >
                Unread
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded ${filter === 'order_update' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''}`}
                onClick={() => setFilter('order_update')}
              >
                Updates
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded ${filter === 'promotion' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''}`}
                onClick={() => setFilter('promotion')}
              >
                Offers
              </button>
            </div>
            
            {unreadCount > 0 && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={markAllAsRead}
              >
                Mark all as read
              </Button>
            )}
          </div>
        </div>
        
        {/* Notifications list */}
        <div className="space-y-4">
          {filteredNotifications.length > 0 ? filteredNotifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
                !notification.read ? 'border-l-4 border-l-brand-orange' : ''
              }`}
            >
              <CardContent className="p-4 flex">
                <div className="mr-4 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className={`font-medium ${!notification.read ? 'text-brand-orange' : ''}`}>
                        {notification.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.message}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(notification.date)}
                      </span>
                      <div className="flex gap-1 mt-2">
                        {!notification.read && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )) : (
            <Card className="bg-gray-50 dark:bg-gray-800/50">
              <CardContent className="p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                  <Bell className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">No notifications</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4 max-w-md mx-auto">
                  {filter === "all" 
                    ? "You're all caught up! No notifications at the moment." 
                    : `No ${filter === "unread" ? "unread" : filter.replace('_', ' ')} notifications to show.`}
                </p>
                {filter !== "all" && (
                  <Button onClick={() => setFilter("all")}>
                    View All Notifications
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </CustomerLayout>
  );
};

export default CustomerNotifications;
