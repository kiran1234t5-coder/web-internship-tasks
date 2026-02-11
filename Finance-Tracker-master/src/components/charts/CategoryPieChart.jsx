import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

function CategoryPieChart({ transactions }) {
  const categories = {};
  transactions.forEach((t) => {
    categories[t.type] = (categories[t.type] || 0) + t.amount;
  });

  const data = Object.keys(categories).map((k) => ({
    name: k,
    value: categories[k],
  }));

  const COLORS = ['#4f46e5', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          label
          fill="#8884d8"
        >
          {data.map((_, i) => (
            <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default CategoryPieChart;
