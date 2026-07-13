import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function ProfitChart() {
  const revenue = 240000;
  const expenses = 155000;
  const profit = revenue - expenses;

  const data = [
    {
      name: "Revenue",
      amount: revenue,
    },
    {
      name: "Expenses",
      amount: expenses,
    },
    {
      name: "Profit",
      amount: profit,
    },
  ];

  return (
    <div>

      {/* Summary Cards */}

      <div className="grid grid-cols-3 gap-6 mb-10">

        <div className="bg-green-100 rounded-2xl p-6">
          <h3 className="text-gray-600">Revenue</h3>
          <h1 className="text-3xl font-bold text-green-700">
            ₹{revenue.toLocaleString()}
          </h1>
        </div>

        <div className="bg-red-100 rounded-2xl p-6">
          <h3 className="text-gray-600">Expenses</h3>
          <h1 className="text-3xl font-bold text-red-700">
            ₹{expenses.toLocaleString()}
          </h1>
        </div>

        <div className="bg-blue-100 rounded-2xl p-6">
          <h3 className="text-gray-600">Profit</h3>
          <h1 className="text-3xl font-bold text-blue-700">
            ₹{profit.toLocaleString()}
          </h1>
        </div>

      </div>

      {/* Chart */}

      <div className="h-[300px]">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="amount"
              radius={[10, 10, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default ProfitChart;