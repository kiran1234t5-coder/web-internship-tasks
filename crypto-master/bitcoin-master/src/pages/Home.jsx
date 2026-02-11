import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  BarChart3,
  ArrowRight,
  Shield,
  Zap,
  Globe
} from 'lucide-react';
import { generateBitcoinPrice } from '../utils/mockData';
import { useState, useEffect } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const [btcPrice, setBtcPrice] = useState(generateBitcoinPrice());

  useEffect(() => {
    const interval = setInterval(() => {
      setBtcPrice(generateBitcoinPrice());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: TrendingUp,
      title: 'Real-time Analytics',
      description: 'Track your marketing performance with live Bitcoin market data'
    },
    {
      icon: DollarSign,
      title: 'Revenue Tracking',
      description: 'Monitor your campaigns and revenue in real-time'
    },
    {
      icon: Users,
      title: 'Campaign Management',
      description: 'Create and manage multiple marketing campaigns efficiently'
    },
    {
      icon: BarChart3,
      title: 'Advanced Insights',
      description: 'Get detailed analytics and insights for better decisions'
    }
  ];

  const stats = [
    { label: 'Active Campaigns', value: '12', icon: Zap },
    { label: 'Total Revenue', value: '$2.4M', icon: DollarSign },
    { label: 'Global Reach', value: '180+', icon: Globe },
    { label: 'Secure Platform', value: '100%', icon: Shield }
  ];

  return (
    <div className="home-page">
      <section className="hero-section">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="hero-title">
            Bitcoin Marketing Dashboard
          </h1>
          <p className="hero-subtitle">
            Powerful marketing analytics and campaign management for the Bitcoin ecosystem
          </p>
          <div className="btc-price-display">
            <span className="btc-label">Bitcoin Price</span>
            <span className="btc-value">${btcPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
          <div className="hero-buttons">
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/dashboard')}
            >
              Get Started
              <ArrowRight size={20} />
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => navigate('/analytics')}
            >
              View Analytics
            </button>
          </div>
        </motion.div>
      </section>

      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Icon size={32} className="stat-icon" />
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="features-section">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Key Features
        </motion.h2>
        <div className="features-grid">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="feature-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="feature-icon">
                  <Icon size={40} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="insights-section">
        <motion.div
          className="insights-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2>Bitcoin Market Insights</h2>
          <div className="insights-content">
            <div className="insight-item">
              <span className="insight-label">24h Change</span>
              <span className="insight-value positive">+2.45%</span>
            </div>
            <div className="insight-item">
              <span className="insight-label">Market Cap</span>
              <span className="insight-value">$885.2B</span>
            </div>
            <div className="insight-item">
              <span className="insight-label">Volume (24h)</span>
              <span className="insight-value">$28.4B</span>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
