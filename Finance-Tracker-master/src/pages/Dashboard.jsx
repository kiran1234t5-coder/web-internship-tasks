import { useFinance } from "../context/FinanceContext";
import Card from "../components/ui/Card";
import IncomeExpenseChart from "../components/charts/IncomeExpenseChart";
import SavingsChart from "../components/charts/SavingsChart";
import PageWrapper from "../components/layout/PageWrapper";

function Dashboard() {
  const { income, expense, transactions } = useFinance();

  return (
    <PageWrapper>
      <div className="dashboard-content">
        <div className="cards">
          <Card className="income-card">
            <h3>Income</h3>
            <p className="amount">${income}</p>
          </Card>
          <Card className="expense-card">
            <h3>Expense</h3>
            <p className="amount">${expense}</p>
          </Card>
          <Card className="balance-card">
            <h3>Balance</h3>
            <p className="amount">${income - expense}</p>
          </Card>
        </div>

        <div className="charts">
          <Card className="chart-card">
            <h3>Income vs Expense</h3>
            <IncomeExpenseChart income={income} expense={expense} />
          </Card>
          
          <Card className="chart-card">
            <h3>Savings Trend</h3>
            <SavingsChart transactions={transactions} />
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}

export default Dashboard;
