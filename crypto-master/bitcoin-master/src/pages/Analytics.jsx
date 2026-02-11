import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { generateAnalyticsData } from '../utils/mockData';
import { Calendar, TrendingUp, MousePointerClick, DollarSign, Users } from 'lucide-react';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30');
  const [selectedMetric, setSelectedMetric] = useState('impressions');

  const analyticsData = useMemo(() => generateAnalyticsData(parseInt(timeRange)), [timeRange]);

  const timeFilters = [
    { value: '7', label: '7 Days' },
    { value: '30', label: '30 Days' },
    { value: '90', label: '90 Days' },
    { value: '365', label: '1 Year' }
  ];

  const metrics = [
    { key: 'impressions', label: 'Impressions', icon: TrendingUp, color: '#3b82f6' },
    { key: 'clicks', label: 'Clicks', icon: MousePointerClick, color: '#10b981' },
    { key: 'conversions', label: 'Conversions', icon: Users, color: '#8b5cf6' },
    { key: 'revenue', label: 'Revenue', icon: DollarSign, color: '#f59e0b' }
  ];

  const totalStats = useMemo(() => {
    return {
      impressions: analyticsData.reduce((sum, d) => sum + d.impressions, 0),
      clicks: analyticsData.reduce((sum, d) => sum + d.clicks, 0),
      conversions: analyticsData.reduce((sum, d) => sum + d.conversions, 0),
      revenue: analyticsData.reduce((sum, d) => sum + d.revenue, 0)
    };
  }, [analyticsData]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const chartData = analyticsData.map(item => ({
    ...item,
    date: formatDate(item.date)
  }));

  return (
    <div className="analytics-page">
      <div className="page-header">
        <div>
          <h1>Analytics</h1>
          <p>Marketing performance insights and metrics</p>
        </div>
        <div className="time-filter">
          <Calendar size={20} />
          <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
            {timeFilters.map(filter => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="analytics-stats">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const value = totalStats[metric.key];
          const formattedValue = metric.key === 'revenue' 
            ? `$${(value / 1000).toFixed(1)}K`
            : value.toLocaleString();
          
          return (
            <motion.div
              key={metric.key}
              className={`analytics-stat-card ${selectedMetric === metric.key ? 'active' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedMetric(metric.key)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="stat-icon-wrapper" style={{ background: `${metric.color}20`, color: metric.color }}>
                <Icon size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-label">{metric.label}</div>
                <div className="stat-value">{formattedValue}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className="chart-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2>Performance Over Time</h2>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorImpressions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="impressions" 
              stroke="#3b82f6" 
              fillOpacity={1} 
              fill="url(#colorImpressions)"
              name="Impressions"
            />
            <Area 
              type="monotone" 
              dataKey="clicks" 
              stroke="#10b981" 
              fillOpacity={1} 
              fill="#10b98140"
              name="Clicks"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="charts-grid">
        <motion.div
          className="chart-card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3>Conversions Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="conversions" stroke="#8b5cf6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="chart-card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3>Revenue Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.slice(-7)}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;
