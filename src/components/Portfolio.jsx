import React, { useState, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const generateDates = (days) => {
  const dates = [];
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
  }
  return dates;
};

const generateRandomData = (days, base, variance) => {
  return Array.from({ length: days + 1 }, (_, i) => {
    return Math.floor(base + Math.random() * variance * (1 + i / days));
  });
};

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('Projects');
  const [activeTimeFilter, setActiveTimeFilter] = useState('1W');

  const timeFilters = [
    { label: '1D', days: 1 },
    { label: '1W', days: 7 },
    { label: '1M', days: 30 },
    { label: '1Y', days: 365 }
  ];

  const getTimeFrameData = useMemo(() => {
    const selectedFilter = timeFilters.find(f => f.label === activeTimeFilter);
    const days = selectedFilter?.days || 7;
    
    return {
      labels: generateDates(days),
      circulation: generateRandomData(days, 2000, 8000),
      burned: generateRandomData(days, 1000, 7000)
    };
  }, [activeTimeFilter]);

  const calculateChange = (data) => {
    const latest = data[data.length - 1];
    const previous = data[data.length - 2];
    const percentChange = ((latest - previous) / previous) * 100;
    return {
      value: latest,
      change: percentChange.toFixed(2),
      increased: percentChange > 0
    };
  };

  const circulationStats = useMemo(() => 
    calculateChange(getTimeFrameData.circulation),
    [getTimeFrameData]
  );

  const burnedStats = useMemo(() => 
    calculateChange(getTimeFrameData.burned),
    [getTimeFrameData]
  );

  const chartData = {
    labels: getTimeFrameData.labels,
    datasets: [
      {
        label: 'Available in circulation',
        data: getTimeFrameData.circulation,
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
      {
        label: 'Have been burned',
        data: getTimeFrameData.burned,
        borderColor: '#eab308',
        backgroundColor: 'rgba(234, 179, 8, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#000',
        bodyColor: '#666',
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 10,
        displayColors: true,
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${context.parsed.y.toLocaleString()} ${
              context.datasetIndex === 0 ? 'CC' : 't CO2'
            }`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            size: 12
          },
          callback: (value) => value.toLocaleString()
        }
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Portfolio</h2>
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
          {['Projects', 'Carboncoin'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">Portfolio Value</h3>
              <p className="text-sm text-gray-500">Track your portfolio performance</p>
            </div>
            <div className="flex gap-2">
              {timeFilters.map(({ label }) => (
                <button
                  key={label}
                  onClick={() => setActiveTimeFilter(label)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTimeFilter === label
                      ? 'bg-green-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="h-[400px]">
            <Line data={chartData} options={options} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-4 rounded-lg bg-gray-50">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-600">Available in circulation</span>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold">
                {circulationStats.value.toLocaleString()} CC
              </div>
              <div className={`flex items-center text-sm ${
                circulationStats.increased ? 'text-green-600' : 'text-red-600'
              }`}>
                {circulationStats.increased ? <TrendingUp className="w-4 h-4 mr-1" /> : 
                                            <TrendingDown className="w-4 h-4 mr-1" />}
                {Math.abs(circulationStats.change)}%
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-gray-50">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-sm text-gray-600">Have been burned</span>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold">
                {burnedStats.value.toLocaleString()} t CO2
              </div>
              <div className={`flex items-center text-sm ${
                burnedStats.increased ? 'text-green-600' : 'text-red-600'
              }`}>
                {burnedStats.increased ? <TrendingUp className="w-4 h-4 mr-1" /> : 
                                       <TrendingDown className="w-4 h-4 mr-1" />}
                {Math.abs(burnedStats.change)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;