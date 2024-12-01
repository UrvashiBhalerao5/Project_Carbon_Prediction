import React, { useState, useEffect } from 'react';
import { Search, FileText, Building2, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MOCK_DATA = [
  {
    id: 1,
    projectName: "Green Energy Initiative",
    purchaseDate: "2024-03-28T12:00:00",
    location: "United States",
    projectType: "Energy Demand",
    available: "2000",
    price: "1 CO2 per 1 CAT",
    status: "active"
  },
  {
    id: 2,
    projectName: "Solar Farm Project",
    purchaseDate: "2024-03-27T14:30:00",
    location: "Germany",
    projectType: "Solar",
    available: "1500",
    price: "1.2 CO2 per 1 CAT",
    status: "pending"
  },
  {
    id: 3,
    projectName: "Wind Power Boost",
    purchaseDate: "2024-04-05T09:45:00",
    location: "Denmark",
    projectType: "Wind",
    available: "1800",
    price: "0.9 CO2 per 1 CAT",
    status: "active"
  },
  {
    id: 4,
    projectName: "Eco Energy Drive",
    purchaseDate: "2024-02-14T16:20:00",
    location: "India",
    projectType: "Energy Demand",
    available: "2200",
    price: "1.1 CO2 per 1 CAT",
    status: "completed"
  },
  {
    id: 5,
    projectName: "Solar Harvest",
    purchaseDate: "2024-03-10T13:15:00",
    location: "Australia",
    projectType: "Solar",
    available: "1200",
    price: "1.3 CO2 per 1 CAT",
    status: "active"
  },
  {
    id: 6,
    projectName: "Windstream Energy",
    purchaseDate: "2024-01-22T11:50:00",
    location: "Canada",
    projectType: "Wind",
    available: "1700",
    price: "0.8 CO2 per 1 CAT",
    status: "pending"
  },
  {
    id: 7,
    projectName: "Renew Power Boost",
    purchaseDate: "2024-03-03T18:05:00",
    location: "South Africa",
    projectType: "Energy Demand",
    available: "2400",
    price: "1.5 CO2 per 1 CAT",
    status: "active"
  },
  {
    id: 8,
    projectName: "SolarWave Project",
    purchaseDate: "2024-04-01T08:30:00",
    location: "Spain",
    projectType: "Solar",
    available: "1600",
    price: "1.4 CO2 per 1 CAT",
    status: "completed"
  },
  {
    id: 9,
    projectName: "Wind Horizon",
    purchaseDate: "2024-03-18T10:40:00",
    location: "Brazil",
    projectType: "Wind",
    available: "1900",
    price: "0.95 CO2 per 1 CAT",
    status: "active"
  },
  {
    id: 10,
    projectName: "Energy Axis",
    purchaseDate: "2024-03-22T15:25:00",
    location: "Japan",
    projectType: "Energy Demand",
    available: "2100",
    price: "1.2 CO2 per 1 CAT",
    status: "pending"
  },
  {
    id: 11,
    projectName: "SolarSpark",
    purchaseDate: "2024-02-11T09:30:00",
    location: "Mexico",
    projectType: "Solar",
    available: "1300",
    price: "1.1 CO2 per 1 CAT",
    status: "active"
  },
  {
    id: 12,
    projectName: "Wind Flow",
    purchaseDate: "2024-04-07T14:10:00",
    location: "Netherlands",
    projectType: "Wind",
    available: "2500",
    price: "1 CO2 per 1 CAT",
    status: "completed"
  },
  {
    id: 13,
    projectName: "Clean Power Rise",
    purchaseDate: "2024-01-19T17:30:00",
    location: "Italy",
    projectType: "Energy Demand",
    available: "2300",
    price: "1.3 CO2 per 1 CAT",
    status: "active"
  },
  {
    id: 14,
    projectName: "Solar Vision",
    purchaseDate: "2024-02-25T12:15:00",
    location: "France",
    projectType: "Solar",
    available: "1400",
    price: "1.25 CO2 per 1 CAT",
    status: "pending"
  },
  {
    id: 15,
    projectName: "Wind Stream",
    purchaseDate: "2024-03-12T13:45:00",
    location: "UK",
    projectType: "Wind",
    available: "2000",
    price: "0.85 CO2 per 1 CAT",
    status: "completed"
  },
];


function Purchases() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    search: "",
    projectType: "",
    auditAgency: "",
    status: ""
  });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [data, setData] = useState(MOCK_DATA);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemToSell, setItemToSell] = useState(null);
  const [unitsToSell, setUnitsToSell] = useState(1);

  const handleSellClick = (item) => {
    setItemToSell(item);
    setModalVisible(true);
  };

  const handleSellConfirm = () => {
    if (unitsToSell > itemToSell.available) {
      toast.error("You cannot sell more units than available!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
      return;
    }
    
    // Update the available stock after selling
    const updatedData = data.map(product =>
      product.id === itemToSell.id
        ? { ...product, available: product.available - unitsToSell }
        : product
    );
    
    setData(updatedData);
    setModalVisible(false);

    toast.success(`${unitsToSell} units of ${itemToSell.projectName} sold!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
  };

  
  
  const addToCart = (item) => {
    // Retrieve existing cart items from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
    
    // Check if item already exists in cart
    const existingItemIndex = existingCart.findIndex(cartItem => cartItem.id === item.id);
    
    if (existingItemIndex > -1) {
      // If item exists, increase quantity
      existingCart[existingItemIndex].quantity = 
        (existingCart[existingItemIndex].quantity || 1) + 1;
    } else {
      // If item doesn't exist, add new item with quantity 1
      existingCart.push({ ...item, quantity: 1 });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cartItems', JSON.stringify(existingCart));
    
    // Navigate to cart
    toast.success(`${item.projectName} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getFilteredData = () => {
    return MOCK_DATA.filter(item => {
      const searchMatch = item.projectName.toLowerCase().includes(filters.search.toLowerCase());
      const typeMatch = !filters.projectType || item.projectType.toLowerCase() === filters.projectType.toLowerCase();
      const statusMatch = !filters.status || item.status.toLowerCase() === filters.status.toLowerCase();
      return searchMatch && typeMatch && statusMatch;
    });
  };

  const getSortedData = () => {
    const filteredData = getFilteredData();
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };
  const buyProduct = (item) => {
    // Increase the available quantity in the data
    const updatedData = data.map((product) =>
      product.id === item.id ? { ...product, available: parseInt(product.available) + 1 } : product
    );
  
    setData(updatedData); // Update the state with the new data
  
    // Handle cart functionality (if needed)
    const existingCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingItemIndex = existingCart.findIndex(cartItem => cartItem.id === item.id);
  
    if (existingItemIndex > -1) {
      existingCart[existingItemIndex].quantity += 1; // Update cart quantity if item exists
    } else {
      existingCart.push({ ...item, quantity: 1 }); // Add new item to cart
    }
  
    localStorage.setItem('cartItems', JSON.stringify(existingCart)); // Save updated cart
  
    toast.success(`${item.projectName} purchased!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
  };
  

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Purchases</h2>
        <div className="flex gap-2">
          <span className="px-3 py-1 text-sm border rounded-full">
            Total Projects: {MOCK_DATA.length}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-9 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="relative">
          <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <select
            value={filters.projectType}
            onChange={(e) => handleFilterChange('projectType', e.target.value)}
            className="w-full pl-9 pr-4 py-2 border rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Project Type</option>
            <option value="Energy Demand">Energy Demand</option>
            <option value="Solar">Solar</option>
            <option value="Wind">Wind</option>
          </select>
        </div>

        <div className="relative">
          <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <select
            value={filters.auditAgency}
            onChange={(e) => handleFilterChange('auditAgency', e.target.value)}
            className="w-full pl-9 pr-4 py-2 border rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Audit Agency</option>
            <option value="agency1">Agency 1</option>
            <option value="agency2">Agency 2</option>
          </select>
        </div>

        <div className="relative">
          <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full pl-9 pr-4 py-2 border rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Available
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {getSortedData().map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src="/api/placeholder/40/40"
                      alt={item.projectName}
                      className="h-10 w-10 rounded-full"
                    />
                    <span className="ml-4 font-medium">{item.projectName}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src="/api/placeholder/24/24"
                      alt={item.location}
                      className="h-6 w-6"
                    />
                    <span className="ml-2">{item.location}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.projectType}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.available} ↑ CO2</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button 
                    className="px-4 py-2 mr-2 text-sm font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600"
                    onClick={() => addToCart(item)}
                  >
                    Buy
                  </button>
                  <button
                    className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600"
                    onClick={() =>  handleSellClick(item)}
                  >
                    Sell
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
            {/* Sell Modal */}
            {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-semibold mb-4">Sell Product</h3>
            <div className="mb-4">
              <label htmlFor="units" className="block text-sm font-medium text-gray-700">Units to Sell</label>
              <input
                id="units"
                type="number"
                value={unitsToSell}
                onChange={(e) => setUnitsToSell(Math.max(1, e.target.value))}
                className="mt-2 w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-between">
              <button
                className="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
                onClick={() => setModalVisible(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                onClick={handleSellConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Purchases;