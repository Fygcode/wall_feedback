
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./components/Dashboard/DashboardLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import NewRequest from "./pages/Dashboard/NewRequest";
import Testimonials from "./pages/Dashboard/Testimonials";
import Requests from "./pages/Dashboard/Requests";
import Settings from "./pages/Dashboard/Settings";
import TestimonialSubmit from "./pages/TestimonialSubmit";
import TestimonialWall from "./pages/TestimonialWall";
import EmbedWall from "./pages/EmbedWall";
import Auth from "./pages/Auth";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Refunds from "./pages/Refunds";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";
import { AuthProvider, useAuth } from "./context/authContext";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>; // Or a loading spinner
  return user ? <Outlet /> : <Navigate to="/auth" replace />;
};
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/pricing" element={<Pricing />} />

            {/* Submit route should be above dashboard */}
            <Route path="/submit/:company/:slug" element={<TestimonialSubmit />} />
            <Route path="/wall/:company?" element={<TestimonialWall />} />
            <Route path="/embed/:company?" element={<EmbedWall />} />

            {/* Dashboard Layout */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="new" element={<NewRequest />} />
                <Route path="testimonials" element={<Testimonials />} />
                <Route path="requests" element={<Requests />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Route>

            {/* Other pages */}
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/refunds" element={<Refunds />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
