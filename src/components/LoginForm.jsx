import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import axios from 'axios'; // Import axios for making API calls

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();  // Initialize the useNavigate hook

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission

    try {
      // Send login request to server with email and password
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      // If login is successful, the response will contain a token or user data
      if (response.data.token) {
        // Store token in localStorage or sessionStorage
        localStorage.setItem('authToken', response.data.token);

        // Redirect to the dashboard after successful login
        navigate('/Portfolio');
      } else {
        setErrorMessage('Invalid credentials, please try again.');
      }
    } catch (error) {
      // Handle errors during the login process
      console.error(error);
      setErrorMessage('Login failed, please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-sm font-medium text-gray-500 mb-2">WELCOME BACK</h2>
        <h1 className="text-2xl font-bold text-black mb-6">Log In to your Account</h1>

        <form onSubmit={handleSubmit}>  {/* Attach handleSubmit to form */}
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}  // Bind email state to input
              placeholder="johnsondoe@nomail.com"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-700" htmlFor="password">Password</label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}  // Toggle between 'text' and 'password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}  // Bind password state to input
              placeholder="**********"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-10 right-3 text-gray-500"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.053 10.053 0 0112 19c-4.784 0-8.775-2.94-10.625-7 1.274-2.858 3.48-5.212 6.275-6.45m5.25-1.575A10.05 10.05 0 0112 5c4.784 0 8.775 2.94 10.625 7-1.274 2.858-3.48 5.212-6.275 6.45M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.98 8.386A10.053 10.053 0 0112 5c4.784 0 8.775 2.94 10.625 7-.781 1.754-1.89 3.282-3.246 4.467M15 12a3 3 0 01-3 3M12 9a3 3 0 013 3M12 15v.01M4.18 4.18L3.98 8.386m1.503 9.305a9.97 9.97 0 01-1.503-1.502m1.503-1.503M7 7l5 5m-5-5L12 7" />
                </svg>
              )}
            </button>
          </div>

          {/* Display error message if any */}
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

          <div className="mb-4 flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600" />
              <span className="ml-2 text-gray-700">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-indigo-600 text-sm">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white font-bold py-2 rounded-lg hover:bg-gray-900 transition duration-300"
          >
            CONTINUE
          </button>

          <div className="mt-4 text-center text-gray-600">Or</div>

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
              Log In with Google
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
              Log In with Facebook
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
              Log In with Apple
            </button>
          </div>

          <p className="mt-6 text-center text-gray-600">
            New User?{" "}
            <Link to="/signup" className="text-indigo-600 font-bold">
              SIGN UP HERE
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
