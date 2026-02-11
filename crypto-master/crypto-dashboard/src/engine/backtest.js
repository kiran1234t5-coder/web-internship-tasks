/**
 * Pro Backtesting Engine
 * @param {Array} data - Array of price objects or numbers
 * @param {Object} options - Initial settings (balance, fee, etc.)
 */
export function backtest(data, options = { initialBalance: 10000, fee: 0.001 }) {
  let balance = options.initialBalance;
  let equityCurve = [balance];
  let totalTrades = 0;
  let wins = 0;

  // 1. Data check
  if (!data || data.length < 10) return { error: "Insufficient data" };

  for (let i = 10; i < data.length; i++) {
    const currentPrice = data[i];
    const prevPrice = data[i - 5];
    
    // 2. Simple Momentum Strategy: 
    // Agar current price 5 periods pehle se zyada hai, toh "Buy/Long"
    const isBullish = currentPrice > prevPrice;
    
    // Price change percentage calculate karein
    const priceChangePct = (currentPrice - data[i - 1]) / data[i - 1];

    if (isBullish) {
      // Simulate profit/loss based on price movement
      const profit = balance * priceChangePct;
      const feeCost = Math.abs(profit * options.fee); // Transaction cost
      
      balance += (profit - feeCost);
      totalTrades++;
      if (profit > 0) wins++;
    }

    equityCurve.push(Number(balance.toFixed(2)));
  }

  // 3. Performance Metrics calculate karein
  const totalReturn = ((balance - options.initialBalance) / options.initialBalance) * 100;
  const winRate = totalTrades > 0 ? (wins / totalTrades) * 100 : 0;

  return {
    finalBalance: balance.toFixed(2),
    totalReturn: totalReturn.toFixed(2) + "%",
    winRate: winRate.toFixed(2) + "%",
    tradesCount: totalTrades,
    equityCurve, // Isse hum chart draw kar sakte hain
    status: totalReturn > 0 ? "PROFITABLE" : "LOSING"
  };
}