import React, { createContext, useReducer, useEffect, useContext, useMemo } from "react";

export const TradingContext = createContext();

// 1. Initial State with Persistence
const getInitialState = () => {
  const saved = localStorage.getItem("trading-state-pro");
  return saved ? JSON.parse(saved) : {
    price: 95000,
    history: [], // For the Chart
    balance: 10000,
    position: 0,
    entryPrice: 0,
    trades: [],
    lastUpdate: Date.now()
  };
};

function tradingReducer(state, action) {
  switch (action.type) {
    case "UPDATE_PRICE":
      // Price history ko manage karna (limit to last 50 points)
      const newHistory = [...state.history, action.price].slice(-50);
      return { 
        ...state, 
        price: action.price, 
        history: newHistory,
        lastUpdate: Date.now() 
      };

    case "BUY":
      const cost = state.price * action.qty;
      if (state.balance < cost) return state; // Insufficient funds guard

      return {
        ...state,
        balance: state.balance - cost,
        // Calculate weighted average entry price
        entryPrice: (state.position * state.entryPrice + cost) / (state.position + action.qty),
        position: state.position + action.qty,
        trades: [
          { id: crypto.randomUUID(), side: "BUY", price: state.price, qty: action.qty, time: Date.now() },
          ...state.trades.slice(0, 19) // Keep last 20 trades
        ]
      };

    case "SELL":
      if (state.position < action.qty) return state; // Short-sell guard

      return {
        ...state,
        balance: state.balance + state.price * action.qty,
        position: state.position - action.qty,
        entryPrice: state.position - action.qty === 0 ? 0 : state.entryPrice,
        trades: [
          { id: crypto.randomUUID(), side: "SELL", price: state.price, qty: action.qty, time: Date.now() },
          ...state.trades.slice(0, 19)
        ]
      };

    case "RESET":
      return getInitialState();

    default:
      return state;
  }
}



export function TradingProvider({ children }) {
  const [state, dispatch] = useReducer(tradingReducer, null, getInitialState);

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem("trading-state-pro", JSON.stringify(state));
  }, [state]);

  // Context value ko memoize karna taake unnecessary re-renders na hon
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <TradingContext.Provider value={value}>
      {children}
    </TradingContext.Provider>
  );
}

// Pro Custom Hook
export const useTrading = () => useContext(TradingContext);