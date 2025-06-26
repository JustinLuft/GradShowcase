import React, { useState } from 'react';
import { auth } from '../firebase/firebase'; // adjust path as needed
import { signInWithEmailAndPassword } from 'firebase/auth';

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignIn = async (e: React.MouseEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('Successfully signed in!');
      // Redirect user after login, e.g., to home page
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        setMessage('No user found with this email.');
      } else if (error.code === 'auth/wrong-password') {
        setMessage('Incorrect password.');
      } else if (error.code === 'auth/invalid-email') {
        setMessage('Invalid email address.');
      } else {
        setMessage('Sign in failed: ' + error.message);
      }
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      

      {/* Main Content */}
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm bg-white/90">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
              <p className="text-gray-600">Sign in to your Build Carolina account</p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Email Field */}
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                />
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <a href="/forgot-password" className="text-sm text-pink-500 hover:text-pink-600 transition-colors duration-200">
                  Forgot your password?
                </a>
              </div>

              {/* Sign In Button */}
              <button
                onClick={handleSignIn}
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-pink-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
              >
                Sign In
              </button>
            </div>

            {/* Message Display */}
            {message && (
              <div className={`mt-6 p-4 rounded-lg text-center text-sm font-medium ${
                message.includes('Successfully') 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {message}
              </div>
            )}

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 text-sm">
                Don't have an account?{' '}
                <a href="/register" className="text-pink-500 hover:text-pink-600 font-medium transition-colors duration-200">
                  Create one here
                </a>
              </p>
            </div>
          </div>

          {/* Welcome Back Message */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Ready to showcase your talents?</p>
            <div className="flex justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-pink-500 rounded-full mr-2"></div>
                Your Portfolio
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                New Opportunities
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                Network Growth
              </div>
            </div>
          </div>

          {/* Quick Stats or Features */}
          <div className="mt-12 bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Join South Carolina's Tech Community
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-pink-500">500+</div>
                  <div className="text-sm text-gray-600">Graduates</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-500">150+</div>
                  <div className="text-sm text-gray-600">Companies</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-500">1000+</div>
                  <div className="text-sm text-gray-600">Connections</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;