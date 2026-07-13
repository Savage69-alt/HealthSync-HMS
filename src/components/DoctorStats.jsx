import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import {
  FaUserGroup,
  FaCalendarCheck,
  FaNotesMedical,
  FaClock,
} from "react-icons/fa6";

function DoctorStats() {
  const [stats, setStats] = useState({
    todayPatients: 0,
    appointments: 0,
    approved: 0,
    completed: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
      .from("appointments")
      .select("appointment_date, status")
      .eq("doctor_id", user.id);
      console.log(data);

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    const todayPatients = data.filter(
      (item) => item.appointment_date === today
    ).length;

    const appointments = data.length;

    const approved = data.filter(
      (item) => item.status === "Approved"
    ).length;

    const completed = data.filter(
      (item) => item.status === "Completed"
    ).length;

    setStats({
      todayPatients,
      appointments,
      approved,
      completed,
    });

    setLoading(false);
  }

  const cards = [
    {
      title: "Today's Patients",
      value: loading ? "..." : stats.todayPatients,
      icon: <FaUserGroup />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Appointments",
      value: loading ? "..." : stats.appointments,
      icon: <FaCalendarCheck />,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Approved",
      value: loading ? "..." : stats.approved,
      icon: <FaNotesMedical />,
      color: "from-purple-500 to-indigo-500",
    },
    {
      title: "Completed",
      value: loading ? "..." : stats.completed,
      icon: <FaClock />,
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
      {cards.map((item, index) => (
        <div
          key={index}
          className={`bg-gradient-to-r ${item.color} text-white rounded-3xl p-6 shadow-lg`}
        >
          <div className="text-4xl mb-4">
            {item.icon}
          </div>

          <h3 className="text-lg">
            {item.title}
          </h3>

          <h1 className="text-4xl font-bold mt-3">
            {item.value}
          </h1>
        </div>
      ))}
    </div>
  );
}

export default DoctorStats;