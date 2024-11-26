import React, { useState } from 'react';
import { Search, FileText, Building2, Filter } from 'lucide-react';

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
];

function Purchases() {
  const [filters, setFilters] = useState({
    search: "",
    projectType: "",
    auditAgency: "",
    status: ""
  });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Purchases</h2>
        <div className="flex gap-2">
          <span className="px-3 py-1 text-sm border rounded-full">
            Total Projects: {MOCK_DATA.length}
          </span>
        </div>
      </div>

      <FilterSection filters={filters} onFilterChange={handleFilterChange} />
      <TableSection 
        data={MOCK_DATA} 
        filters={filters}
        sortConfig={sortConfig}
        onSort={handleSort}
      />
    </div>
  );
}

function FilterSection({ filters, onFilterChange }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onFilterChange('search', e.target.value)}
          placeholder="Search projects..."
          className="w-full pl-9 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="relative">
        <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
        <select
          value={filters.projectType}
          onChange={(e) => onFilterChange('projectType', e.target.value)}
          className="w-full pl-9 pr-4 py-2 border rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Project Type</option>
          <option value="energy">Energy Demand</option>
          <option value="solar">Solar</option>
          <option value="wind">Wind</option>
        </select>
      </div>

      <div className="relative">
        <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
        <select
          value={filters.auditAgency}
          onChange={(e) => onFilterChange('auditAgency', e.target.value)}
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
          onChange={(e) => onFilterChange('status', e.target.value)}
          className="w-full pl-9 pr-4 py-2 border rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
}

function TableSection({ data, filters, sortConfig, onSort }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getFilteredData = () => {
    return data.filter(item => {
      const searchMatch = item.projectName.toLowerCase().includes(filters.search.toLowerCase());
      const typeMatch = !filters.projectType || item.projectType.toLowerCase() === filters.projectType;
      const statusMatch = !filters.status || item.status === filters.status;
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

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => onSort('projectName')}
            >
              Project Name
            </th>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => onSort('purchaseDate')}
            >
              Purchase Date
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
              Status
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
                {formatDate(item.purchaseDate)}
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
              <td className="px-6 py-4 whitespace-nowrap">
                {item.projectType}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.available} ↑ CO2
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.price}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  item.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Purchases;