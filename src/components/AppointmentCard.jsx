import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

function AppointmentCard() {
  const { user } = useAuth();

  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    if (user) {
      fetchAppointment();
    }
  }, [user]);

  const fetchAppointment = async () => {

    const { data, error } = await supabase
      .from("appointments")
      .select(`
        appointment_date,
        appointment_time,
        status,
        reason,
        doctors (
          specialization,
          profiles (
            full_name
          )
        )
      `)
      .eq("patient_id", user.id)
.in("status", ["Pending", "Approved"])
.order("appointment_date", { ascending: true })
.order("appointment_time", { ascending: true })
.limit(1)
.single();

    if (error) {
      console.log(error);
      return;
    }

    setAppointment(data);
  };

  if (!appointment) {
    return (
      <div className="bg-white rounded-3xl shadow-lg p-8">

        <h2 className="text-2xl font-bold">
          📅 Upcoming Appointment
        </h2>

        <p className="mt-8 text-gray-500">
          No upcoming appointments.
        </p>

      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-6">
        📅 Upcoming Appointment
      </h2>

      <div className="bg-blue-50 rounded-2xl p-6">

        <h3 className="text-2xl font-bold">
          {appointment.doctors.profiles.full_name}
        </h3>

        <p className="text-gray-500 mt-2">
          {appointment.doctors.specialization}
        </p>

        <div className="mt-5 space-y-2">

          <p>📅 {appointment.appointment_date}</p>

          <p>🕙 {appointment.appointment_time}</p>

          <p>📝 {appointment.reason}</p>

          <p>
            Status :
            <span className="font-bold text-blue-600 ml-2">
              {appointment.status}
            </span>
          </p>

        </div>

      </div>

    </div>
  );
}

export default AppointmentCard;