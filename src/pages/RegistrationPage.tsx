import React, { useState } from 'react';
import { auth } from '../firebase/firebase'; // adjust path accordingly
import { 
  createUserWithEmailAndPassword, 
  updateProfile 
} from 'firebase/auth';

const RegistrationPage: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  const validToken = 'JOIN2025'; // Change this to your actual access token

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (!firstName.trim() || !lastName.trim()) {
      setMessage('Please enter your first and last name.');
      return;
    }

    if (token.trim() !== validToken) {
      setMessage('Invalid registration token.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: `${firstName.trim()} ${lastName.trim()}`
        });
      }

      setMessage('Registration successful!');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setToken('');

      // Navigate to login page after a brief delay
      setTimeout(() => {
        window.location.href = '/create-profile';
      }, 1000);
      
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setMessage('Email is already registered.');
      } else if (error.code === 'auth/invalid-email') {
        setMessage('Invalid email address.');
      } else if (error.code === 'auth/weak-password') {
        setMessage('Password should be at least 6 characters.');
      } else {
        setMessage('Registration failed: ' + error.message);
      }
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      {/* <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold">
                <span className="text-blue-600">build</span>
                <span className="text-pink-500">carolina</span>
              </span>
            </div>
            <div className="flex space-x-4">
              <a href="/login" className="text-gray-600 hover:text-pink-500 transition-colors duration-200">
                Login
              </a>
            </div>
          </div>
        </div>
      </div> */}

      {/* Main Content */}
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          {/* Registration Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm bg-white/90">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Build Carolina</h1>
              <p className="text-gray-600">Create your account to showcase your tech talents</p>
            </div>

            {/* Form */}
            <div onSubmit={handleRegister} className="space-y-6">
              {/* Name Fields Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

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
                  placeholder="Password (min. 6 characters)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                />
              </div>

              {/* Token Field */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Registration Token"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                />
              </div>

              {/* Register Button */}
              <button
                onClick={handleRegister}
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-pink-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
              >
                Create Account
              </button>
            </div>

            {/* Message Display */}
            {message && (
              <div className={`mt-6 p-4 rounded-lg text-center text-sm font-medium ${
                message.includes('successful') 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {message}
              </div>
            )}

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 text-sm">
                Already have an account?{' '}
                <a href="/login" className="text-pink-500 hover:text-pink-600 font-medium transition-colors duration-200">
                  Sign in here
                </a>
              </p>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Join South Carolina's thriving tech community</p>
            <div className="flex justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-pink-500 rounded-full mr-2"></div>
                Showcase Skills
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                Get Discovered
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                Connect Locally
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;