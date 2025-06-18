import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { 
  Briefcase, 
  Home, 
  Plus, 
  List, 
  Settings, 
  LogOut, 
  User as UserIcon,
  Shield
} from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { user, isAdmin, isAuthenticated, logout } = useUser();

  const getNavItems = () => {
    const baseItems = [
      { path: '/', label: 'Home', icon: Home },
      { path: '/jobs', label: 'All Jobs', icon: List },
    ];

    if (isAdmin) {
      return [
        ...baseItems,
        { path: '/add-job', label: 'Add Job', icon: Plus },
        { path: '/admin', label: 'Dashboard', icon: Settings },
      ];
    }

    return baseItems;
  };

  const navItems = getNavItems();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  if (!isAuthenticated) {
    return null; // Don't show navbar for unauthenticated users
  }

  return (
    <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-2 rounded-lg group-hover:shadow-lg transition-all duration-300">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-700 bg-clip-text text-transparent">
              JobPortal
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-indigo-100 text-indigo-700 shadow-sm'
                      : 'text-gray-800 hover:text-indigo-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}

            {/* User Menu */}
            <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-200">
              <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100">
                {isAdmin ? (
                  <Shield className="h-4 w-4 text-red-600" />
                ) : (
                  <UserIcon className="h-4 w-4 text-blue-600" />
                )}
                <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                  {user?.name}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  isAdmin 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {isAdmin ? 'Admin' : 'User'}
                </span>
              </div>
              
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;