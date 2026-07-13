import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import {
  FaUserInjured,
  FaUserDoctor,
  FaCalendarCheck,
  FaNotesMedical,
} from "react-icons/fa6";

function AdminStats() {
  const [stats, setStats] = useState({
    patients: 0,
    doctors: 0,
    appointments: 0,
    prescriptions: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    setLoading(true);

    const [
      { count: patientCount },
      { count: doctorCount },
      { count: appointmentCount },
      { count: prescriptionCount },
    ] = await Promise.all([
      supabase
        .from("patients")
        .select("*", { count: "exact", head: true }),

      supabase
        .from("doctors")
        .select("*", { count: "exact", head: true }),

      supabase
        .from("appointments")
        .select("*", { count: "exact", head: true }),

      supabase
        .from("prescriptions")
        .select("*", { count: "exact", head: true }),
    ]);

    setStats({
      patients: patientCount || 0,
      doctors: doctorCount || 0,
      appointments: appointmentCount || 0,
      prescriptions: prescriptionCount || 0,
    });

    setLoading(false);
  }

  const cards = [
    {
      title: "Patients",
      value: loading ? "..." : stats.patients,
      icon: <FaUserInjured />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Doctors",
      value: loading ? "..." : stats.doctors,
      icon: <FaUserDoctor />,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Appointments",
      value: loading ? "..." : stats.appointments,
      icon: <FaCalendarCheck />,
      color: "from-purple-500 to-indigo-500",
    },
    {
      title: "Prescriptions",
      value: loading ? "..." : stats.prescriptions,
      icon: <FaNotesMedical />,
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`bg-gradient-to-r ${card.color} text-white rounded-3xl p-6 shadow-lg`}
        >
          <div className="text-4xl mb-4">
            {card.icon}
          </div>

          <h3 className="text-lg">
            {card.title}
          </h3>

          <h1 className="text-4xl font-bold mt-3">
            {card.value}
          </h1>
        </div>
      ))}
    </div>
  );
}

export default AdminStats;