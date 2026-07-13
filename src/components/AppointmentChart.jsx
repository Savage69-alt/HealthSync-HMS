import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function AppointmentChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  async function fetchAnalytics() {
    const { data: appointments, error } = await supabase
      .from("appointments")
      .select("status");

    if (error) {
      console.log(error);
      return;
    }

    const counts = {
      Pending: 0,
      Approved: 0,
      Completed: 0,
      Rejected: 0,
    };

    appointments.forEach((item) => {
      counts[item.status]++;
    });

    setData([
      { name: "Pending", value: counts.Pending },
      { name: "Approved", value: counts.Approved },
      { name: "Completed", value: counts.Completed },
      { name: "Rejected", value: counts.Rejected },
    ]);
  }

  const COLORS = [
    "#FACC15",
    "#22C55E",
    "#3B82F6",
    "#EF4444",
  ];

  return (
    <div className="h-[450px]">

      <ResponsiveContainer width="100%" height="100%">

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={150}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}

export default AppointmentChart;