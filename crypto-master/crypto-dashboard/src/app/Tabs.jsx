import React, { useState, useMemo } from "react";
import Chart from "../components/Chart";
import OrderBook from "../components/OrderBook";
import Trades from "../components/Trades";
import Portfolio from "../components/Portfolio";
import TradePanel from "../components/TradePanel";
import Backtest from "../components/Backtest";

// Tab configuration taake code clutter na ho
const TAB_CONFIG = [
  { id: "trade", label: "📈 Live Trade" },
  { id: "backtest", label: "🧪 Strategy Backtest" },
];

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("trade");

  return (
    <div className="terminal-wrapper">
      {/* Navigation Bar */}
      <nav className="tabs-nav">
        {TAB_CONFIG.map((t) => (
          <button
            key={t.id}
            className={`tab-btn ${activeTab === t.id ? "active" : ""}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {/* Content Area */}
      <div className="tab-content">
        {activeTab === "trade" ? (
          <div className="trading-dashboard">
            {/* Left: Main Chart Area */}
            <section className="chart-section">
              <Chart />
              <Portfolio />
            </section>

            {/* Right: Order Management */}
            <aside className="order-sidebar">
              <TradePanel />
              <div className="order-data-grid">
                <OrderBook />
                <Trades />
              </div>
            </aside>
          </div>
        ) : (
          <div className="backtest-container">
            <Backtest />
          </div>
        )}
      </div>
    </div>
  );
}