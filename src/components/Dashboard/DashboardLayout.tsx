
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  LayoutDashboard,
  Settings,
  Star,
  Plus,
  Menu,
  X,
  LogOut,
  User
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { supabase } from "@/supabaseClient";
import { useAuth } from "@/context/authContext";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Mock user data (would typically come from auth context)

  const { user: authUser } = useAuth(); 

  const user = authUser
    ? {
      name: authUser.user_metadata?.full_name || "User",
      email: authUser.email || "No email",
      avatar: authUser.user_metadata?.avatar_url || "",
      initials: authUser.user_metadata?.full_name
        ? authUser.user_metadata.full_name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
        : "U",
    }
    : {
      name: "Jane Smith",
      email: "jane@example.com",
      avatar: "",
      initials: "JS"
    };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const handleLogout = async () => {
    try {
      // Logout from Supabase session
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error logging out:", error);
        toast.error("Failed to log out. Please try again.");
        return;
      }

      // Success message and redirect
      toast.success("Successfully logged out");
      window.location.href = "/auth";
    } catch (err) {
      console.error("Unexpected error during logout:", err);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top navbar */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-500 hover:text-purple-500 hover:bg-gray-100 focus:outline-none md:hidden"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <Link to="/" className="flex items-center space-x-2 mx-4">
              <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center">
                <span className="text-white font-bold">W</span>
              </div>
              <span className="font-poppins font-semibold text-xl text-gray-800">WallFeedback</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {/* <Link to="/dashboard/new">
              <Button className="gradient-bg space-x-2">
                <Plus size={16} />
                <span>New Request</span>
              </Button>
            </Link> */}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative rounded-full h-8 w-8 flex items-center justify-center">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-purple-100 text-purple-700">{user.initials}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <div className="flex flex-col space-y-1 p-2">
                  <p className="font-medium text-sm">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`bg-white border-r border-gray-100 w-64 flex-shrink-0 fixed md:static inset-y-0 left-0 transform z-20 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            } transition-transform duration-200 ease-in-out`}
        >
          <div className="h-full flex flex-col pt-5 pb-4">
            <nav className="flex-1 px-2 space-y-1">
              <Link
                to="/dashboard"
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive("/dashboard") && !isActive("/dashboard/testimonials") && !isActive("/dashboard/requests") && !isActive("/dashboard/settings")
                    ? "bg-purple-50 text-purple-600"
                    : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                  }`}
              >
                <LayoutDashboard className={`mr-3 h-5 w-5 ${isActive("/dashboard") && !isActive("/dashboard/testimonials") && !isActive("/dashboard/requests") && !isActive("/dashboard/settings") ? "text-purple-600" : "text-gray-400"}`} />
                Dashboard
              </Link>

              <Link
                to="/dashboard/testimonials"
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive("/dashboard/testimonials")
                    ? "bg-purple-50 text-purple-600"
                    : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                  }`}
              >
                <Star className={`mr-3 h-5 w-5 ${isActive("/dashboard/testimonials") ? "text-purple-600" : "text-gray-400"}`} />
                Testimonials
              </Link>

              <Link
                to="/dashboard/requests"
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive("/dashboard/requests")
                    ? "bg-purple-50 text-purple-600"
                    : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                  }`}
              >
                <Calendar className={`mr-3 h-5 w-5 ${isActive("/dashboard/requests") ? "text-purple-600" : "text-gray-400"}`} />
                Requests
              </Link>

              <Link
                to="/dashboard/settings"
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive("/dashboard/settings")
                    ? "bg-purple-50 text-purple-600"
                    : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                  }`}
              >
                <Settings className={`mr-3 h-5 w-5 ${isActive("/dashboard/settings") ? "text-purple-600" : "text-gray-400"}`} />
                Settings
              </Link>
            </nav>

            <div className="px-4 mt-auto">
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-purple-800">Free Plan</h4>
                <p className="text-xs text-purple-600 mt-1">3/3 testimonials used</p>
                <Link to="/pricing">
                  <Button variant="default" className="w-full mt-3 text-sm gradient-bg">
                    Upgrade Plan
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </aside>

        {/* Backdrop when sidebar is open on mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 z-10 md:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
