import React from "react";
import Tabs from "./Tabs";
import ErrorBoundary from "./ErrorBoundary";
import { useTheme } from "../context/ThemeContext";
import { useTrading } from "../context/TradingContext";
import useKeyboard from "../hooks/useKeyboard";

export default function App() {
  const { dark, toggle } = useTheme();
  const { state, dispatch } = useTrading();

  // Global Hotkeys: Shift+B (Buy), Shift+S (Sell)
  useKeyboard(
    () => dispatch({ type: "BUY", qty: 0.1 }),
    () => dispatch({ type: "SELL", qty: 0.1 })
  );

  return (
    <div className={`app-wrapper ${dark ? "dark-mode" : "light-mode"}`}>
      <header className="main-header">
        <div className="brand">
          <span className="live-dot"></span>
          <h1>BITCOIN TERMINAL <span>PRO</span></h1>
        </div>
        
        <div className="ticker-tape">
          <span className="price">${state.price.toLocaleString()}</span>
          <span className={state.change >= 0 ? "up" : "down"}>
            {state.change >= 0 ? "▲" : "▼"} {state.change}%
          </span>
        </div>

        <button className="theme-toggle" onClick={toggle}>
          {dark ? "🌙 Night" : "☀️ Day"}
        </button>
      </header>

      <main className="terminal-body">
        <ErrorBoundary>
          <Tabs />
        </ErrorBoundary>
      </main>

      <footer className="status-bar">
        <div className="connection">● System Status: Operational</div>
        <div className="latency">Latency: 14ms</div>
        <div className="time">{new Date().toLocaleTimeString()}</div>
      </footer>
    </div>
  );
}