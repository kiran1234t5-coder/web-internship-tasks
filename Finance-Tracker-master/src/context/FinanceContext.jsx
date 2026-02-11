import { createContext, useContext, useEffect, useState } from "react";

const FinanceContext = createContext();
const useFinance = () => useContext(FinanceContext);

function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState(
    JSON.parse(localStorage.getItem("transactions")) || []
  );

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (tx) => {
    setTransactions([...transactions, { ...tx, id: crypto.randomUUID() }]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  return (
    <FinanceContext.Provider
      value={{ transactions, addTransaction, deleteTransaction, income, expense }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export { FinanceProvider, useFinance };
