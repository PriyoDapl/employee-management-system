'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { user, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user.role === 'employee') {
        router.push('/employee');
      } else if (user.role === 'management') {
        router.push('/management');
      }
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Client-side validation
    if (isSignup && formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const endpoint = isSignup ? '/api/auth/signup' : '/api/auth/login';
      const body = isSignup 
        ? { ...formData, role: userType } 
        : formData;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        const userData = { 
          email: formData.email, 
          role: isSignup ? userType : (data.user?.role || userType),
          ...data.user 
        };
        login(data.token, userData);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = (type) => {
    setUserType(type);
    setShowLogin(true);
    setIsSignup(false);
  };

  const handleSignupClick = (type) => {
    setUserType(type);
    setShowLogin(true);
    setIsSignup(true);
  };

  if (showLogin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {isSignup ? 'Sign Up' : 'Sign In'}
              </h1>
              <p className="text-gray-600 capitalize">
                {userType} Portal
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full text-black px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full text-black px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Please wait...' : (isSignup ? 'Create Account' : 'Sign In')}
              </button>

              <div className="text-center space-y-3">
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                  onClick={() => setIsSignup(!isSignup)}
                >
                  {isSignup ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
                </button>
                
                <div>
                  <button
                    type="button"
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => setShowLogin(false)}
                  >
                    ← Back to main page
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg w-full mx-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-3">
              Employee Management System
            </h1>
            <p className="text-gray-600">
              Please choose your login type
            </p>
          </div>
          
          {/* Login Options */}
          <div className="space-y-8">
            {/* Employee Section */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                Employee Portal
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleLoginClick('employee')}
                  className="py-3 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => handleSignupClick('employee')}
                  className="py-3 px-4 border-2 border-blue-600 text-blue-600 font-medium rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            </div>

            {/* Management Section */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                Management Portal
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleLoginClick('management')}
                  className="py-3 px-4 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => handleSignupClick('management')}
                  className="py-3 px-4 border-2 border-green-600 text-green-600 font-medium rounded-md hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
