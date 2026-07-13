import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function RecentAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  async function fetchAppointments() {
    // Latest 5 appointments
    const { data: appointmentData, error } = await supabase
      .from("appointments")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    if (error) {
      console.log(error);
      return;
    }

    // Fetch profiles
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, full_name");

    // Fetch doctors
    const { data: doctors } = await supabase
      .from("doctors")
      .select("id, specialization");

    const merged = appointmentData.map((appointment) => {
      const patient = profiles.find(
        (p) => p.id === appointment.patient_id
      );

      const doctorProfile = profiles.find(
        (p) => p.id === appointment.doctor_id
      );

      const doctor = doctors.find(
        (d) => d.id === appointment.doctor_id
      );

      return {
        ...appointment,
        patient_name: patient?.full_name || "Unknown",
        doctor_name: doctorProfile?.full_name || "Unknown",
        specialization: doctor?.specialization || "",
      };
    });

    setAppointments(merged);
  }

  function badge(status) {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Approved":
        return "bg-green-100 text-green-700";

      case "Completed":
        return "bg-blue-100 text-blue-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100";
    }
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        📋 Recent Appointments
      </h2>

      <table className="w-full">

        <thead>
          <tr className="text-left border-b">
            <th className="pb-3">Patient</th>
            <th className="pb-3">Doctor</th>
            <th className="pb-3">Date</th>
            <th className="pb-3">Time</th>
            <th className="pb-3">Status</th>
          </tr>
        </thead>

        <tbody>

          {appointments.map((appointment) => (

            <tr
              key={appointment.id}
              className="border-b hover:bg-gray-50"
            >
              <td className="py-4">
                {appointment.patient_name}
              </td>

              <td>
                Dr. {appointment.doctor_name}
              </td>

              <td>
                {appointment.appointment_date}
              </td>

              <td>
                {appointment.appointment_time}
              </td>

              <td>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${badge(
                    appointment.status
                  )}`}
                >
                  {appointment.status}
                </span>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default RecentAppointments;