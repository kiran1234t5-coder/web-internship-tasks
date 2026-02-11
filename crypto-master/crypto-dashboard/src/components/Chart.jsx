import React, { useRef, useEffect, useContext, useMemo } from "react";
import { TradingContext } from "../context/TradingContext";
import { ThemeContext } from "../context/ThemeContext";
import useMarket from "../hooks/useMarket";

export default function Chart() {
  const { state, dispatch } = useContext(TradingContext);
  const { dark } = useContext(ThemeContext);
  const canvasRef = useRef(null);
  
  // Custom hook for market data
  useMarket(dispatch);

  // Price history maintain karne ke liye (Limited to 50 points)
  const prices = useMemo(() => {
    // Note: Real app mein ye state se aayega, yahan hum trend visualization ke liye assume kar rahe hain
    return state.history || []; 
  }, [state.history]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    // Pro Background & Grid
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = dark ? "#333" : "#eee";
    ctx.lineWidth = 1;

    // Draw Grid Lines
    for (let i = 0; i < width; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }

    // Draw Price Line (Trend)
    if (prices.length > 1) {
      ctx.beginPath();
      ctx.strokeStyle = "#00cec9"; // Pro Teal color
      ctx.lineWidth = 2;
      ctx.lineJoin = "round";

      prices.forEach((p, i) => {
        const x = (i / (prices.length - 1)) * width;
        const y = height - (p / state.maxPrice) * height; // Scaled price
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Add Gradient Area under the line
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, "rgba(0, 206, 201, 0.3)");
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    // Current Price Label
    ctx.fillStyle = dark ? "#fff" : "#000";
    ctx.font = "bold 14px Inter, sans-serif";
    ctx.fillText(`$${state.price.toLocaleString()}`, 10, 25);

  }, [state.price, prices, dark]);

  return (
    <div className="chart-container">
      <div className="chart-header">
        <span className="pair">BTC / USDT</span>
        <span className={`change ${state.change >= 0 ? "up" : "down"}`}>
          {state.change}%
        </span>
      </div>
      <canvas 
        ref={canvasRef} 
        width={600} 
        height={300} 
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </div>
  );
}