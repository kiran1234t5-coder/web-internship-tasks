import { useFinance } from "../context/FinanceContext";
import Card from "../components/ui/Card";
import CategoryPieChart from "../components/charts/CategoryPieChart";
import SavingsChart from "../components/charts/SavingsChart";
import PageWrapper from "../components/layout/PageWrapper";

function Reports() {
  const { transactions } = useFinance();

  const calculateStats = () => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const savings = totalIncome - totalExpense;
    const savingsRate = totalIncome > 0 ? (savings / totalIncome) * 100 : 0;
    
    return {
      totalIncome,
      totalExpense,
      savings,
      savingsRate,
      transactionCount: transactions.length
    };
  };

  const stats = calculateStats();

  return (
    <PageWrapper animation={{ scale: 0.95 }} animate={{ scale: 1 }}>
      <div className="reports-content">
        <div className="stats-cards">
          <Card className="stat-card">
            <h3>Total Income</h3>
            <p className="stat-value">${stats.totalIncome}</p>
          </Card>
          <Card className="stat-card">
            <h3>Total Expense</h3>
            <p className="stat-value">${stats.totalExpense}</p>
          </Card>
          <Card className="stat-card">
            <h3>Total Savings</h3>
            <p className="stat-value">${stats.savings}</p>
          </Card>
          <Card className="stat-card">
            <h3>Savings Rate</h3>
            <p className="stat-value">{stats.savingsRate.toFixed(1)}%</p>
          </Card>
        </div>

        <div className="charts">
          <Card className="chart-card">
            <h3>Expense Breakdown</h3>
            <CategoryPieChart transactions={transactions} />
          </Card>
          
          <Card className="chart-card">
            <h3>Savings Trend</h3>
            <SavingsChart transactions={transactions} />
          </Card>
        </div>

        <Card className="summary-card">
          <h3>Summary</h3>
          <div className="summary-content">
            <p>You have made <strong>{stats.transactionCount}</strong> transactions.</p>
            <p>Your current savings rate is <strong>{stats.savingsRate.toFixed(1)}%</strong>.</p>
            {stats.savingsRate >= 20 ? (
              <p className="positive">Great job! You're saving well.</p>
            ) : stats.savingsRate >= 10 ? (
              <p className="neutral">Good progress! Try to save a bit more.</p>
            ) : (
              <p className="negative">Consider reducing expenses to improve savings.</p>
            )}
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
}

export default Reports;
