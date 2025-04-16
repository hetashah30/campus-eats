
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import HowItWorks from "./pages/HowItWorks";
import Join from "./pages/Join";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CustomerDashboard from "./pages/dashboard/CustomerDashboard";
import ShopDashboard from "./pages/dashboard/ShopDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import CustomerOrders from "./pages/dashboard/CustomerOrders";
import CustomerNotifications from "./pages/dashboard/CustomerNotifications";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ThemeProvider defaultTheme="system">
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/menu/:id" element={<ProductDetail />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/join" element={<Join />} />
              <Route path="/join/:role" element={<Join />} />
              <Route path="/cart" element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              } />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Register />} />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/customer" element={
                <ProtectedRoute requiredRole="customer">
                  <CustomerDashboard />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/customer/orders" element={
                <ProtectedRoute requiredRole="customer">
                  <CustomerOrders />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/customer/notifications" element={
                <ProtectedRoute requiredRole="customer">
                  <CustomerNotifications />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/shop" element={
                <ProtectedRoute requiredRole="shop">
                  <ShopDashboard />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/admin" element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
