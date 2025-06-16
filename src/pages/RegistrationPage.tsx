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
        window.location.href = '/CreateProfilePage';
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
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          placeholder="First Name"
          className="w-full p-2 border rounded"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          className="w-full p-2 border rounded"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
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
        <input
          type="text"
          placeholder="Registration Token"
          className="w-full p-2 border rounded"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Register
        </button>
      </form>
      {message && <p className="mt-4 text-center text-sm">{message}</p>}
    </div>
  );
};

export default RegistrationPage;
