import React, { useState } from 'react';
import { auth } from '../firebase/firebase'; // adjust path as needed
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('Successfully signed in!');
      // Redirect user after login, e.g., to home page
      navigate('/');
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
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>
      <form onSubmit={handleSignIn} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        <button
          type="submit"
          className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-800"
        >
          Sign In
        </button>
      </form>
      {message && <p className="mt-4 text-center text-sm">{message}</p>}
    </div>
  );
};

export default SignInPage;
