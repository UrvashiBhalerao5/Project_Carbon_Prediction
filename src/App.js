import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router components
import './App.css'; // Your custom CSS
import SignupForm from './components/SignupForm'; // Import SignupForm component
import LoginForm from './components/LoginForm'; // Import LoginForm component
import Sidebar from './components/Sidebar'; // Import Sidebar component
import Topbar from './components/topbar'; // Import Topbar component
import Portfolio from './components/Portfolio'; // Import Portfolio component
import Purchases from './components/Purchases'; // Import Purchases component
import LandingPage from './components/LandingPage'; // Import LandingPage component

// Layout Component: For routes that include Sidebar and Topbar
const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-300">
      <Sidebar /> {/* Sidebar visible on portfolio and purchases routes */}
      <div className="flex-1 flex flex-col">
        <Topbar /> {/* Topbar visible on portfolio and purchases routes */}
        <main className="p-4 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

// Main App Component: Where routing is defined
const App = () => {
  return (
    <Router>
      <div className="bg-gray-200 min-h-screen">
        <Routes>
          {/* Route Definitions */}
          <Route path="/" element={<LandingPage />} /> {/* Default route: LandingPage */}
          <Route path="/signup" element={<SignupForm />} /> {/* Signup route */}
          <Route path="/login" element={<LoginForm />} /> {/* Login route */}
          
          {/* Protected Routes that include Sidebar and Topbar */}
          <Route
            path="/portfolio"
            element={
              <Layout>
                <Portfolio />
              </Layout>
            }
          />
          <Route
            path="/purchases"
            element={
              <Layout>
                <Purchases />
              </Layout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
