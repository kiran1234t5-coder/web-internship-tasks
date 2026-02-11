import React, { useMemo } from "react";

export default function OrderBook({ data }) {
  // Mock data agar props se na aa raha ho
  const orders = useMemo(() => {
    return data || {
      bids: [[101.50, 0.5], [101.20, 1.2], [100.80, 0.8]], // [Price, Amount]
      asks: [[102.50, 0.4], [102.80, 0.9], [103.10, 1.5]]
    };
  }, [data]);

  // Visual depth calculation ke liye logic
  const maxTotal = 5; // Isse hum bar ki width calculate karenge

  return (
    <div className="order-book-container">
      <div className="order-book-header">
        <h4>Order Book</h4>
        <div className="spread">Spread: $1.00</div>
      </div>

      <div className="order-grid-labels">
        <span>Price (USDT)</span>
        <span>Amount (BTC)</span>
      </div>

      {/* ASKS (Sellers) - Red Section */}
      <div className="orders-list asks">
        {orders.asks.map(([price, amount], i) => (
          <div key={`ask-${i}`} className="order-row">
            <div className="depth-bar ask-bar" style={{ width: `${(amount / maxTotal) * 100}%` }} />
            <span className="price text-red">{price.toFixed(2)}</span>
            <span className="amount">{amount.toFixed(4)}</span>
          </div>
        ))}
      </div>

      {/* MID PRICE */}
      <div className="mid-price">
        <span className="current-price">102.00</span>
        <span className="status-icon">↓</span>
      </div>

      {/* BIDS (Buyers) - Green Section */}
      <div className="orders-list bids">
        {orders.bids.map(([price, amount], i) => (
          <div key={`bid-${i}`} className="order-row">
            <div className="depth-bar bid-bar" style={{ width: `${(amount / maxTotal) * 100}%` }} />
            <span className="price text-green">{price.toFixed(2)}</span>
            <span className="amount">{amount.toFixed(4)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}