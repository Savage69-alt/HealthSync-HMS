import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function RevenueChart() {
  // Demo data (replace with Supabase later)
  const data = [
    { month: "Jan", revenue: 25000 },
    { month: "Feb", revenue: 32000 },
    { month: "Mar", revenue: 28000 },
    { month: "Apr", revenue: 45000 },
    { month: "May", revenue: 39000 },
    { month: "Jun", revenue: 52000 },
  ];

  return (
    <div className="w-full h-[450px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip formatter={(value) => [`₹${value}`, "Revenue"]} />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#10b981"
            strokeWidth={4}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RevenueChart;