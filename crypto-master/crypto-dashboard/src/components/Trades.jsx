import React, { useContext } from "react";
import { TradingContext } from "../context/TradingContext";

export default function Trades() {
  const { state } = useContext(TradingContext);

  return (
    <div className="trades-container">
      <header className="trades-header">
        <h3>Market Trades</h3>
        <span className="live-indicator">● Live</span>
      </header>

      <div className="trades-table">
        <div className="table-head">
          <span>Price</span>
          <span>Amount</span>
          <span>Time</span>
        </div>

        <div className="table-body">
          {state.trades.length > 0 ? (
            state.trades.map((t) => {
              const isBuy = t.side.toLowerCase() === "buy";
              return (
                <div key={t.id} className={`trade-row ${isBuy ? "buy" : "sell"}`}>
                  <span className="price">
                    {t.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                  <span className="qty">{t.qty.toFixed(4)}</span>
                  <span className="time">
                    {new Date(t.timestamp || Date.now()).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit', 
                      second: '2-digit',
                      hour12: false 
                    })}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="no-trades">Waiting for market data...</div>
          )}
        </div>
      </div>
    </div>
  );
}