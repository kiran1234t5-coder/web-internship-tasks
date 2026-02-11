// Mock Bitcoin price data
export const generateBitcoinPrice = () => {
  const basePrice = 45000;
  const variation = (Math.random() - 0.5) * 2000;
  return basePrice + variation;
};

// Mock campaign data
export const mockCampaigns = [
  {
    id: 1,
    name: 'Bitcoin Awareness Campaign',
    status: 'active',
    budget: 50000,
    spent: 32000,
    impressions: 1250000,
    clicks: 45000,
    conversions: 890,
    startDate: '2024-01-15',
    endDate: '2024-03-15'
  },
  {
    id: 2,
    name: 'Crypto Investment Education',
    status: 'active',
    budget: 30000,
    spent: 18000,
    impressions: 890000,
    clicks: 32000,
    conversions: 650,
    startDate: '2024-02-01',
    endDate: '2024-04-01'
  },
  {
    id: 3,
    name: 'Bitcoin Trading Platform',
    status: 'paused',
    budget: 75000,
    spent: 45000,
    impressions: 2100000,
    clicks: 78000,
    conversions: 1200,
    startDate: '2024-01-01',
    endDate: '2024-06-01'
  },
  {
    id: 4,
    name: 'Blockchain Technology Showcase',
    status: 'completed',
    budget: 40000,
    spent: 40000,
    impressions: 1560000,
    clicks: 56000,
    conversions: 980,
    startDate: '2023-12-01',
    endDate: '2024-01-31'
  }
];

// Mock transaction data
export const mockTransactions = [
  {
    id: 1,
    date: '2024-03-15',
    type: 'Purchase',
    amount: 0.5,
    value: 22500,
    status: 'completed',
    hash: 'a1b2c3d4e5f6...'
  },
  {
    id: 2,
    date: '2024-03-14',
    type: 'Sale',
    amount: 0.25,
    value: 11250,
    status: 'completed',
    hash: 'b2c3d4e5f6a1...'
  },
  {
    id: 3,
    date: '2024-03-13',
    type: 'Purchase',
    amount: 1.0,
    value: 45000,
    status: 'pending',
    hash: 'c3d4e5f6a1b2...'
  },
  {
    id: 4,
    date: '2024-03-12',
    type: 'Purchase',
    amount: 0.75,
    value: 33750,
    status: 'completed',
    hash: 'd4e5f6a1b2c3...'
  },
  {
    id: 5,
    date: '2024-03-11',
    type: 'Sale',
    amount: 0.3,
    value: 13500,
    status: 'completed',
    hash: 'e5f6a1b2c3d4...'
  }
];

// Mock analytics data
export const generateAnalyticsData = (days = 30) => {
  const data = [];
  const now = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      impressions: Math.floor(Math.random() * 50000) + 10000,
      clicks: Math.floor(Math.random() * 2000) + 500,
      conversions: Math.floor(Math.random() * 100) + 20,
      revenue: Math.floor(Math.random() * 5000) + 1000
    });
  }
  
  return data;
};
