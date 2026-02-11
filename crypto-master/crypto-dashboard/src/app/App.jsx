import React, { useContext } from "react";
import Tabs from "./Tabs";
import ErrorBoundary from "./ErrorBoundary";
import { ThemeContext } from "../context/ThemeContext";

// Agar icons use karne hon (optional)
// import { SunIcon, MoonIcon } from "./Icons"; 

export default function App() {
  const { dark, toggle } = useContext(ThemeContext);

  // Dynamic class logic
  const themeClass = dark ? "bg-dark text-light" : "bg-light text-dark";

  return (
    <div className={`app-container ${themeClass}`}>
      <header className="app-header">
        <div className="brand">
          <span className="logo">🚀</span>
          <h2>Crypto Terminal Pro</h2>
        </div>
        
        <button 
          className="theme-toggle-btn" 
          onClick={toggle}
          aria-label="Toggle Theme"
        >
          {dark ? "🌙 Night Mode" : "☀️ Day Mode"}
        </button>
      </header>

      <main className="content-area">
        <ErrorBoundary>
          {/* Suspense add kiya ja sakta hai agar Tabs heavy hain */}
          <Tabs />
        </ErrorBoundary>
      </main>

      <footer className="app-footer">
        <p>© 2026 Crypto Terminal Pro • Live Data</p>
      </footer>
    </div>
  );
}