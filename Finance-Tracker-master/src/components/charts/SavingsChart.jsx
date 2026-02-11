import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

function SavingsChart({ transactions }) {
  const monthlyData = {};
  
  transactions.forEach((t) => {
    const date = new Date(t.date || Date.now());
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = { month: monthKey, income: 0, expense: 0, savings: 0 };
    }
    
    if (t.type === 'income') {
      monthlyData[monthKey].income += t.amount;
    } else {
      monthlyData[monthKey].expense += t.amount;
    }
    
    monthlyData[monthKey].savings = monthlyData[monthKey].income - monthlyData[monthKey].expense;
  });

  const data = Object.values(monthlyData).sort((a, b) => a.month.localeCompare(b.month));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} />
        <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={2} />
        <Line type="monotone" dataKey="savings" stroke="#4f46e5" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default SavingsChart;
