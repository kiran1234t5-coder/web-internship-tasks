import React, { useContext, useMemo } from "react";
import { TradingContext } from "../context/TradingContext";

export default function Portfolio() {
  const { state } = useContext(TradingContext);

  // Profit/Loss calculation (Assuming an entry price for demo)
  const pnl = useMemo(() => {
    if (!state.position || state.position <= 0) return 0;
    const entryPrice = state.entryPrice || 95000; // Mock entry
    return ((state.price - entryPrice) / entryPrice) * 100;
  }, [state.price, state.position, state.entryPrice]);

  const isPositive = pnl >= 0;

  return (
    <div className="portfolio-card">
      <div className="portfolio-header">
        <h4>💰 My Portfolio</h4>
        <span className="badge">Verified</span>
      </div>

      <div className="stats-grid">
        <div className="stat-item">
          <label>Total Balance</label>
          <div className="value main-balance">
            ${state.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        </div>

        <div className="stat-item">
          <label>Open Position</label>
          <div className="value position-size">
            {state.position} <span className="unit">BTC</span>
          </div>
        </div>
      </div>

      <div className={`pnl-section ${isPositive ? "up" : "down"}`}>
        <div className="pnl-row">
          <span>Unrealized PNL:</span>
          <span className="pnl-value">
            {isPositive ? "▲" : "▼"} {Math.abs(pnl).toFixed(2)}%
          </span>
        </div>
        {/* Visual bar indicator */}
        <div className="pnl-progress-bg">
          <div 
            className="pnl-progress-fill" 
            style={{ width: `${Math.min(Math.abs(pnl) * 5, 100)}%` }}
          />
        </div>
      </div>

      <div className="portfolio-footer">
        <span>Equity: ${(state.balance + (state.position * state.price)).toFixed(2)}</span>
      </div>
    </div>
  );
}