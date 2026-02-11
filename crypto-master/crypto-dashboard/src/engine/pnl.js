/**
 * Pro PNL Calculator
 * @param {Object} pos - Position object { entryPrice, qty, side, totalFees }
 * @param {number} currentPrice - Market price
 * @returns {Object} Detailed PNL metrics
 */
export function calculatePNL(pos, currentPrice) {
  const { entryPrice, qty, side, totalFees = 0 } = pos;

  if (!entryPrice || !qty) {
    return { gross: 0, net: 0, roi: 0, status: "neutral" };
  }

  // 1. Gross PNL (Market movement)
  const grossPnl = side.toLowerCase() === "buy"
    ? (currentPrice - entryPrice) * qty
    : (entryPrice - currentPrice) * qty;

  // 2. Net PNL (After deducting trading fees)
  const netPnl = grossPnl - totalFees;

  // 3. ROI Percentage (Return on Investment)
  const initialValue = entryPrice * qty;
  const roi = (netPnl / initialValue) * 100;

  return {
    gross: grossPnl.toFixed(2),
    net: netPnl.toFixed(2),
    roi: roi.toFixed(2),
    isProfit: netPnl > 0,
    status: netPnl > 0 ? "PROFIT" : netPnl < 0 ? "LOSS" : "BREAK-EVEN"
  };
}

/**
 * Break-even Price Calculator
 * Traders ko pata hona chahiye ke kis price par unka loss zero hoga (including fees)
 */
export function getBreakEven(entryPrice, qty, totalFees, side) {
  const feePerUnit = totalFees / qty;
  return side.toLowerCase() === "buy" 
    ? entryPrice + feePerUnit 
    : entryPrice - feePerUnit;
}