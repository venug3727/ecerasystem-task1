import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { LogIn, User, Lock, AlertCircle } from 'lucide-react';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await login(formData.email, formData.password);
      navigate('/jobs');
    } catch (error) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDemoLogin = (role: 'admin' | 'user') => {
    const credentials = role === 'admin' 
      ? { email: 'admin@example.com', password: 'admin123' }
      : { email: 'user@example.com', password: 'user123' };
    
    setFormData(credentials);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-4 rounded-full w-16 h-16 mx-auto mb-6">
            <LogIn className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600">
            Sign in to access your account
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-4">
            <h3 className="text-white text-lg font-semibold">Sign In</h3>
          </div>
          
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-800 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>

        {/* Demo Accounts */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-500 to-gray-600 px-6 py-4">
            <h3 className="text-white text-lg font-semibold">Demo Accounts</h3>
          </div>
          
          <div className="p-6 space-y-4">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Admin Account</h4>
              <p className="text-sm text-gray-600 mb-3">
                Full access to manage jobs and view applications
              </p>
              <button
                onClick={() => handleDemoLogin('admin')}
                className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm"
              >
                Use Admin Demo
              </button>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-medium text-gray-800 mb-2">User Account</h4>
              <p className="text-sm text-gray-600 mb-3">
                Browse jobs and submit applications
              </p>
              <button
                onClick={() => handleDemoLogin('user')}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
              >
                Use User Demo
              </button>
            </div>
          </div>
        </div>

        {/* Credentials Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-800 mb-2">Demo Credentials:</h4>
          <div className="text-sm text-blue-700 space-y-1">
            <p><strong>Admin:</strong> admin@example.com / admin123</p>
            <p><strong>User:</strong> user@example.com / user123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 