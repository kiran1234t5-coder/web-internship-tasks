import { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import PageWrapper from "../components/layout/PageWrapper";

function Transactions() {
  const { transactions, addTransaction, deleteTransaction } = useFinance();
  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "income",
  });

  const submit = (e) => {
    e.preventDefault();
    addTransaction({ 
      ...form, 
      amount: Number(form.amount),
      date: new Date().toISOString()
    });
    setForm({ title: "", amount: "", type: "income" });
  };

  return (
    <PageWrapper animation={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
      <div className="transactions-content">
        <Card className="form-card">
          <h2>Add Transaction</h2>
          <form className="transaction-form" onSubmit={submit}>
            <input
              placeholder="Title"
              value={form.title}
              required
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <input
              type="number"
              placeholder="Amount"
              value={form.amount}
              required
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <Button type="submit">Add</Button>
          </form>
        </Card>

        <Card className="list-card">
          <h2>Transaction History</h2>
          <ul className="transaction-list">
            {transactions.map((t) => (
              <li key={t.id} className={`transaction-item ${t.type}`}>
                <div className="transaction-info">
                  <span className="title">{t.title}</span>
                  <span className="amount">${t.amount}</span>
                  <span className="type">({t.type})</span>
                </div>
                <Button 
                  className="delete-btn"
                  onClick={() => deleteTransaction(t.id)}
                >
                  ❌
                </Button>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </PageWrapper>
  );
}

export default Transactions;
