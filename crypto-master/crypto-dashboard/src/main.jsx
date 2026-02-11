import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import { TradingProvider } from "./context/TradingContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <TradingProvider>
      <App />
    </TradingProvider>
  </ThemeProvider>
);
