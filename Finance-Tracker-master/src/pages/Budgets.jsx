import { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import PageWrapper from "../components/layout/PageWrapper";

function Budgets() {
  const { transactions } = useFinance();
  const [budgets, setBudgets] = useState([
    { category: "Food", limit: 500, spent: 0 },
    { category: "Transport", limit: 200, spent: 0 },
    { category: "Entertainment", limit: 150, spent: 0 },
    { category: "Utilities", limit: 300, spent: 0 },
  ]);

  const [newBudget, setNewBudget] = useState({ category: "", limit: "" });

  const addBudget = (e) => {
    e.preventDefault();
    if (newBudget.category && newBudget.limit) {
      setBudgets([...budgets, { 
        ...newBudget, 
        limit: Number(newBudget.limit),
        spent: 0 
      }]);
      setNewBudget({ category: "", limit: "" });
    }
  };

  const deleteBudget = (index) => {
    setBudgets(budgets.filter((_, i) => i !== index));
  };

  const getBudgetStatus = (budget) => {
    const percentage = (budget.spent / budget.limit) * 100;
    if (percentage >= 100) return "over";
    if (percentage >= 80) return "warning";
    return "good";
  };

  return (
    <PageWrapper>
      <div className="budgets-content">
        <Card className="form-card">
          <h2>Add Budget Category</h2>
          <form className="budget-form" onSubmit={addBudget}>
            <input
              placeholder="Category"
              value={newBudget.category}
              required
              onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
            />
            <input
              type="number"
              placeholder="Limit"
              value={newBudget.limit}
              required
              onChange={(e) => setNewBudget({ ...newBudget, limit: e.target.value })}
            />
            <Button type="submit">Add Budget</Button>
          </form>
        </Card>

        <div className="budgets-grid">
          {budgets.map((budget, index) => {
            const status = getBudgetStatus(budget);
            const percentage = (budget.spent / budget.limit) * 100;
            
            return (
              <Card key={index} className={`budget-card ${status}`}>
                <div className="budget-header">
                  <h3>{budget.category}</h3>
                  <Button 
                    className="delete-btn"
                    onClick={() => deleteBudget(index)}
                  >
                    ×
                  </Button>
                </div>
                <div className="budget-info">
                  <p className="budget-amounts">
                    ${budget.spent} / ${budget.limit}
                  </p>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                  <p className="budget-percentage">{percentage.toFixed(1)}%</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </PageWrapper>
  );
}

export default Budgets;
