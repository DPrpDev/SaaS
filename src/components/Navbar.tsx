import { Link, useLocation } from 'react-router-dom';
import { Server } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import ThemeSelector from './ThemeSelector';
import { useThemeStore } from '../store/themeStore';

const Navbar = () => {
  const { user, signOut } = useAuthStore();
  const { currentTheme } = useThemeStore();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isDashboard = location.pathname === '/dashboard';


  return (
    <nav className={`${isHomePage ? 'bg-dark7' : currentTheme.colors.surface} ${isHomePage ? 'shadow-lg' : 'shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Server className={`${isHomePage ? 'stroke-violet4' : currentTheme.colors.primary.split(' ')[0]} 'h-8 w-8'`} />
              <span className={`${isHomePage ? 'color-gray0' : currentTheme.colors.text} ml-2 text-xl font-bold `}>
                SaaSify
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${isHomePage ? 'color-violet2' : currentTheme.colors.text}`}
                >
                  Dashboard
                </Link>
                {isDashboard && <ThemeSelector />}
                <button
                  onClick={() => signOut()}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${isHomePage ? 'color-violet2' : currentTheme.colors.primary}`}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${isHomePage ? 'color-violet2' : currentTheme.colors.text}`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`px-4 py-2 rounded-md text-sm font-medium ${isHomePage ? 'color-violet2' : currentTheme.colors.primary}`}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;