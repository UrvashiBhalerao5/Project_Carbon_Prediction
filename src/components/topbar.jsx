import React, { useState } from 'react';
import { Search, User, Bell, Settings, LogOut, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Topbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const profileMenuItems = [
    { icon: <User size={16} />, label: 'Profile', onClick: () => console.log('Profile clicked') },
    { icon: <Bell size={16} />, label: 'Notifications', onClick: () => console.log('Notifications clicked') },
    { icon: <Settings size={16} />, label: 'Settings', onClick: () => console.log('Settings clicked') },
    { icon: <HelpCircle size={16} />, label: 'Help', onClick: () => console.log('Help clicked') },
    { 
      icon: <LogOut size={16} />, 
      label: 'Logout', 
      onClick: () => {
        console.log('Logout clicked'); 
        // Add your logout logic here, e.g., clearing tokens or user data

        // Navigate to the login page
        navigate('/login'); // Adjust the path as needed
      } 
    }
  ];

  return (
    <div className="flex items-center justify-between bg-white border-b px-6 py-4">
      {/* Left side - Search */}
      <div className="relative flex-1 max-w-xl">
        <div className={`relative transition-all duration-200 ${
          searchFocused ? 'scale-105' : 'scale-100'
        }`}>
          <Search 
            className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
              searchFocused ? 'text-blue-500' : 'text-gray-400'
            }`} 
            size={18} 
          />
          <input
            type="text"
            placeholder="Search projects, proponents, or documents..."
            className={`w-full pl-12 pr-4 py-2.5 rounded-full border-2 bg-gray-50
              placeholder:text-gray-400 text-gray-700
              transition-all duration-200 ease-in-out
              focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-lg
              ${searchFocused ? 'border-blue-500 bg-white' : 'border-gray-200'}`}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>
      </div>

      {/* Right side - Profile */}
      <div className="flex items-center gap-6 ml-4">
        {/* Notifications */}
        <button className="relative p-2 text-gray-500 hover:text-gray-700 transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={`flex items-center gap-3 py-2 px-3 rounded-full transition-all
              ${isProfileOpen ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
          >
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <span className="text-white font-medium">JD</span>
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="hidden md:block text-left">
              <div className="text-sm font-medium text-gray-700">John Doe</div>
              <div className="text-xs text-gray-500">Administrator</div>
            </div>
          </button>

          {/* Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-lg bg-white shadow-lg border border-gray-100 py-2 z-50">
              {profileMenuItems.map((item, index) => (
                <React.Fragment key={item.label}>
                  <button
                    onClick={item.onClick}
                    className="w-full px-4 py-2 flex items-center gap-3 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-400">{item.icon}</span>
                    <span className="text-sm">{item.label}</span>
                  </button>
                  {index === 3 && <hr className="my-2 border-gray-100" />}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
