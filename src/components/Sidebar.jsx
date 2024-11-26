import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Briefcase, Wallet, Home } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Projects', icon: Briefcase, path: '/projects' },
    { name: 'Portfolio', icon: ShoppingBag, path: '/portfolio' },
    { name: 'Wallet', icon: Wallet, path: '/wallet' },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col items-center py-6">
      <h1 className="text-2xl font-bold mb-8">CARBONTOKEN</h1>
      <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg mb-8 transition duration-300 ease-in-out">
        Buy CarbonToken
      </button>
      <nav className="flex flex-col w-full">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="flex items-center space-x-3 px-6 py-3 hover:bg-gray-800 transition duration-300 ease-in-out"
          >
            <item.icon size={20} />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;