import { FaCalendarCheck } from "react-icons/fa6";

function AppointmentButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-3xl shadow-lg p-8 hover:scale-105 transition flex flex-col items-center justify-center h-56 w-full"
    >
      <FaCalendarCheck className="text-5xl mb-4" />

      <h2 className="text-2xl font-bold">
        Upcoming Appointment
      </h2>

      <p className="mt-2 text-blue-100">
        View Appointment
      </p>
    </button>
  );
}

export default AppointmentButton;