import React, { useState } from "react";

export default function Backtest() {
  const [isRunning, setIsRunning] = useState(false);

  const handleStartBacktest = () => {
    setIsRunning(true);
    // Mock simulation
    setTimeout(() => setIsRunning(false), 3000);
  };

  return (
    <div className="backtest-wrapper">
      <header className="backtest-header">
        <div>
          <h3>🧪 Strategy Backtester</h3>
          <p className="subtitle">Historical performance analysis</p>
        </div>
        <button 
          className={`run-btn ${isRunning ? "loading" : ""}`} 
          onClick={handleStartBacktest}
          disabled={isRunning}
        >
          {isRunning ? "Running Analysis..." : "Start Backtest"}
        </button>
      </header>

      <div className="backtest-grid">
        {/* Settings Panel */}
        <section className="settings-panel">
          <h4>Parameters</h4>
          <div className="input-group">
            <label>Strategy</label>
            <select>
              <option>RSI Mean Reversion</option>
              <option>MACD Crossover</option>
              <option>Bollinger Breakout</option>
            </select>
          </div>
          
          <div className="input-group">
            <label>Timeframe</label>
            <select>
              <option>1m</option>
              <option>15m</option>
              <option>1h</option>
              <option>1d</option>
            </select>
          </div>
        </section>

        {/* Results Preview (Empty State) */}
        <section className="results-panel">
          {isRunning ? (
            <div className="loader-box">
              <div className="spinner"></div>
              <p>Fetching historical data...</p>
            </div>
          ) : (
            <div className="empty-results">
              <span className="icon">📊</span>
              <p>Configure parameters and click 'Start' to see results.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}