
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContext";



const Header = () => {
  const { user } = useAuth();
  const username = user?.user_metadata?.username || "User";
  return (
    <header className="border-b border-gray-100">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center">
            <span className="text-white font-bold">W</span>
          </div>
          <span className="font-poppins font-semibold text-xl text-gray-800">WallFeedback</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium text-gray-600 hover:text-purple-500 transition-colors">
            Home
          </Link>
          <Link to="/features" className="text-sm font-medium text-gray-600 hover:text-purple-500 transition-colors">
            Features
          </Link>
          {/* <Link to="/pricing" className="text-sm font-medium text-gray-600 hover:text-purple-500 transition-colors"> */}
           <Link to="/" className="text-sm font-medium text-gray-600 hover:text-purple-500 transition-colors">
            Pricing
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {/* {isLoggedIn ? (
            <Link to="/dashboard">
              <Button variant="default" className="gradient-bg">
                Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/auth" className="text-sm font-medium text-gray-600 hover:text-purple-500 transition-colors">
                Log in
              </Link>
              <Link to="/auth">
                <Button variant="default" className="gradient-bg">
                  Sign up
                </Button>
              </Link>
            </>
          )} */}


          <div className="flex items-center space-x-4">
            {user ? (
              <>

                <span className="flex flex-col text-sm text-gray-600">
                  <span>Welcome, {username}</span>
                  <span>{user.email}</span>
                </span>

                <Link to="/dashboard">
                  <Button variant="default" className="gradient-bg">
                    Dashboard
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/auth" className="text-sm font-medium text-gray-600 hover:text-purple-500 transition-colors">
                  Log in
                </Link>
                <Link to="/auth">
                  <Button variant="default" className="gradient-bg">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
