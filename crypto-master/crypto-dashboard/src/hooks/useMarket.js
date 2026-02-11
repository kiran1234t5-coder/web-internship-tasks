import { useEffect, useRef } from "react";

export default function useMarket(dispatch) {
  const timerRef = useRef(null);

  useEffect(() => {
    // Simulate real-time market data
    timerRef.current = setInterval(() => {
      const volatility = (Math.random() - 0.5) * 50; // Random price movement
      const basePrice = 95000;
      const newPrice = basePrice + volatility;

      // 1. Update Global Price
      dispatch({ type: "UPDATE_PRICE", price: newPrice });

      // 2. Mock Market Trades (Jo dusre log kar rahe hain)
      const mockTrade = {
        id: crypto.randomUUID(),
        side: Math.random() > 0.5 ? "buy" : "sell",
        price: newPrice + (Math.random() * 5),
        qty: Math.random() * 0.5,
        timestamp: Date.now()
      };
      
      dispatch({ type: "ADD_EXTERNAL_TRADE", trade: mockTrade });

    }, 1000); // Har 1 second mein tick

    return () => clearInterval(timerRef.current);
  }, [dispatch]);
}