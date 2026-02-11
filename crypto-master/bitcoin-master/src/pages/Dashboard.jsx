import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  DollarSign, 
  Users,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { generateBitcoinPrice, mockCampaigns } from '../utils/mockData';
import Modal from '../components/Common/Modal';
import { useOutletContext } from 'react-router-dom';

const Dashboard = () => {
  const [btcPrice, setBtcPrice] = useState(generateBitcoinPrice());
  const [priceChange, setPriceChange] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const { addNotification } = useOutletContext() || {};

  useEffect(() => {
    const interval = setInterval(() => {
      const newPrice = generateBitcoinPrice();
      const change = ((newPrice - btcPrice) / btcPrice) * 100;
      setPriceChange(change);
      setBtcPrice(newPrice);
    }, 5000);
    return () => clearInterval(interval);
  }, [btcPrice]);

  const activeCampaigns = mockCampaigns.filter(c => c.status === 'active');
  const totalRevenue = mockCampaigns.reduce((sum, c) => sum + c.spent, 0);
  const totalConversions = mockCampaigns.reduce((sum, c) => sum + c.conversions, 0);

  const statsCards = [
    {
      title: 'Bitcoin Price',
      value: `$${btcPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: priceChange.toFixed(2),
      isPositive: priceChange >= 0,
      icon: DollarSign,
      color: '#f7931a'
    },
    {
      title: 'Active Campaigns',
      value: activeCampaigns.length.toString(),
      change: '+2',
      isPositive: true,
      icon: Activity,
      color: '#10b981'
    },
    {
      title: 'Total Revenue', 
      value: `$${(totalRevenue / 1000).toFixed(1)}K`,
      change: '+12.5%',
      isPositive: true,
      icon: DollarSign,
      color: '#3b82f6'
    },
    {
      title: 'Total Conversions',
      value: totalConversions.toLocaleString(),
      change: '+8.2%',
      isPositive: true,
      icon: Users,
      color: '#8b5cf6'
    }
  ];

  const handleCardClick = (card) => {
    setSelectedCard(card);
    if (addNotification) {
      addNotification(`Viewing details for ${card.title}`, 'info');
    }
  };

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Overview of your Bitcoin marketing performance</p>
      </div>

      <div className="stats-grid">
        {statsCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              className="stat-card-large"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => handleCardClick(card)}
            >
              <div className="stat-card-header">
                <div className="stat-card-icon" style={{ background: `${card.color}20`, color: card.color }}>
                  <Icon size={24} />
                </div>
                <div className={`stat-change ${card.isPositive ? 'positive' : 'negative'}`}>
                  {card.isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  {card.change}%
                </div>
              </div>
              <div className="stat-card-value">{card.value}</div>
              <div className="stat-card-title">{card.title}</div>
            </motion.div>
          );
        })}
      </div>

      <div className="dashboard-content">
        <motion.div
          className="dashboard-section"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2>Active Campaigns</h2>
          <div className="campaigns-preview">
            {activeCampaigns.slice(0, 3).map((campaign, index) => (
              <motion.div
                key={campaign.id}
                className="campaign-preview-card"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className="campaign-preview-header">
                  <h3>{campaign.name}</h3>
                  <span className={`status-badge status-${campaign.status}`}>
                    {campaign.status}
                  </span>
                </div>
                <div className="campaign-preview-stats">
                  <div>
                    <span className="label">Budget:</span>
                    <span className="value">${campaign.budget.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="label">Spent:</span>
                    <span className="value">${campaign.spent.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="label">Conversions:</span>
                    <span className="value">{campaign.conversions}</span>
                  </div>
                </div>
                <div className="campaign-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="dashboard-section"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2>Market Trends</h2>
          <div className="trends-card">
            <div className="trend-item">
              <div className="trend-header">
                <span>Bitcoin Dominance</span>
                <TrendingUp size={20} className="trend-up" />
              </div>
              <div className="trend-value">52.3%</div>
              <div className="trend-change positive">+1.2%</div>
            </div>
            <div className="trend-item">
              <div className="trend-header">
                <span>Market Sentiment</span>
                <TrendingUp size={20} className="trend-up" />
              </div>
              <div className="trend-value">Bullish</div>
              <div className="trend-change positive">Strong</div>
            </div>
            <div className="trend-item">
              <div className="trend-header">
                <span>Volatility Index</span>
                <Activity size={20} />
              </div>
              <div className="trend-value">Moderate</div>
              <div className="trend-change">24.5</div>
            </div>
          </div>
        </motion.div>
      </div>

      <Modal
        isOpen={!!selectedCard}
        onClose={() => setSelectedCard(null)}
        title={selectedCard?.title}
      >
        {selectedCard && (
          <div className="modal-details">
            <div className="detail-item">
              <span className="detail-label">Current Value:</span>
              <span className="detail-value">{selectedCard.value}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Change:</span>
              <span className={`detail-value ${selectedCard.isPositive ? 'positive' : 'negative'}`}>
                {selectedCard.change}%
              </span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Dashboard;
