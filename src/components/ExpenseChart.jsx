import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function ExpenseChart() {
  const data = [
    {
      category: "Staff",
      expense: 90000,
    },
    {
      category: "Medicines",
      expense: 45000,
    },
    {
      category: "Equipment",
      expense: 35000,
    },
    {
      category: "Electricity",
      expense: 12000,
    },
    {
      category: "Maintenance",
      expense: 18000,
    },
  ];

  return (
    <div className="h-[450px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="category" />

          <YAxis />

          <Tooltip formatter={(value) => [`₹${value}`, "Expense"]} />

          <Bar
            dataKey="expense"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpenseChart;