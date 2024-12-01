import React, { useState } from 'react';
import axios from 'axios';

function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Make API call to backend to sign up user
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        name,
        email,
        password,
      });
      console.log('Signup success', response.data);
      // Redirect to login or home page after successful signup
      window.location.href = '/login'; // Example: Redirect to login page
    } catch (err) {
      console.error(err);
      setError('An error occurred during signup');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Your Name</label>
            <input
              type="text"
              placeholder="Johnson Doe"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              placeholder="johnsondoe@nomail.com"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              placeholder="**********"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <div className="text-red-500 text-center mb-4">{error}</div>}

          <button className="w-full bg-black text-white font-bold py-2 rounded-lg hover:bg-gray-800 transition duration-300">
            Get Started
          </button>
        </form>

        <div className="mt-4 text-center text-gray-600">Or</div>

        {/* Social Login Buttons */}
        <div className="flex flex-col space-y-2 mt-4">
          <button
            type="button"
            className="w-full flex items-center justify-center bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition"
          >
            <img
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              alt="Google"
              className="w-6 h-6 mr-2"
            />
            Sign Up with Google
          </button>

          <button
            type="button"
            className="w-full flex items-center justify-center bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition"
          >
            <img
              src="https://img.icons8.com/color/48/000000/facebook-new.png"
              alt="Facebook"
              className="w-6 h-6 mr-2"
            />
            Sign Up with Facebook
          </button>

          <button
            type="button"
            className="w-full flex items-center justify-center bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition"
          >
            <img
              src="https://img.icons8.com/color/48/000000/mac-os.png"
              alt="Apple"
              className="w-6 h-6 mr-2"
            />
            Sign Up with Apple
          </button>
        </div>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 font-bold">
            LOG IN HERE
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignupForm;
