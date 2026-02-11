import React, { useContext, useState } from "react";
import { TradingContext } from "../context/TradingContext";

export default function TradePanel() {
  const { state, dispatch } = useContext(TradingContext);
  const [qty, setQty] = useState(0.1);
  const [orderType, setOrderType] = useState("market"); // market vs limit

  const totalCost = (qty * state.price).toFixed(2);
  const balanceExceeded = totalCost > state.balance;

  return (
    <div className="trade-panel">
      {/* Order Type Selector */}
      <div className="order-type-tabs">
        <button 
          className={orderType === "market" ? "active" : ""} 
          onClick={() => setOrderType("market")}
        >
          Market
        </button>
        <button 
          className={orderType === "limit" ? "active" : ""} 
          onClick={() => setOrderType("limit")}
        >
          Limit
        </button>
      </div>

      <div className="input-section">
        <div className="input-box">
          <label>Quantity (BTC)</label>
          <input 
            type="number" 
            step="0.01"
            value={qty} 
            onChange={(e) => setQty(Math.max(0, +e.target.value))} 
          />
        </div>

        {/* Quick percentage selectors */}
        <div className="percent-btns">
          {[25, 50, 75, 100].map(p => (
            <button key={p} onClick={() => setQty((state.balance * (p/100) / state.price).toFixed(4))}>
              {p}%
            </button>
          ))}
        </div>
      </div>

      <div className="trade-summary">
        <div className="summary-row">
          <span>Est. Total:</span>
          <span className={balanceExceeded ? "text-error" : ""}>${totalCost}</span>
        </div>
        <div className="summary-row">
          <span>Available:</span>
          <span>${state.balance.toFixed(2)}</span>
        </div>
      </div>

      <div className="action-buttons">
        <button 
          className="btn-buy" 
          disabled={balanceExceeded || qty <= 0}
          onClick={() => dispatch({ type: "BUY", qty: Number(qty) })}
        >
          Buy / Long
        </button>
        <button 
          className="btn-sell" 
          disabled={state.position < qty}
          onClick={() => dispatch({ type: "SELL", qty: Number(qty) })}
        >
          Sell / Short
        </button>
      </div>
      
      {balanceExceeded && <p className="error-msg">⚠️ Insufficient Balance</p>}
    </div>
  );
}