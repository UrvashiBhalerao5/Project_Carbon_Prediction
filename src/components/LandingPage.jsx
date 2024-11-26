import React from 'react';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
      {/* Top Navigation Bar */}
      <header className="w-full flex items-center justify-between px-8 py-4 bg-white shadow-md">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="https://img.icons8.com/color/48/000000/google-logo.png" // Replace with your logo image URL
            alt="Logo"
            className="w-8 h-8"
          />
          <span className="text-lg font-semibold">Groww</span>
        </div>

        {/* Search Bar */}
        <div className="flex items-center border border-gray-300 rounded-lg shadow-sm overflow-hidden w-2/4">
          <input
            type="text"
            placeholder="What are you looking for today?"
            className="w-full px-4 py-2 outline-none"
          />
          <button className="px-4 py-2 bg-green-500 text-white hover:bg-green-600 transition">
            Search
          </button>
        </div>

        {/* Login/Register Button (Top) */}
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          onClick={() => (window.location.href = '/login')}
        >
          Login/Register
        </button>
      </header>

      {/* Main Section */}
      <main className="flex flex-col items-center justify-center flex-1 px-4 text-center">
        <h1 className="text-5xl font-extrabold mb-4">All things finance, right here.</h1>
        <p className="text-lg text-gray-600 mb-8">Built for a growing India.</p>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
            onClick={() => (window.location.href = '/signup')}
          >
            Get Started
          </button>
        </div>
      </main>

      {/* Illustration */}
      <div className="mt-12">
        <img
          src="your-illustration.png" // Replace with your actual illustration/image URL
          alt="Illustration"
          className="w-full max-w-3xl"
        />
      </div>
    </div>
  );
};

export default LandingPage;
