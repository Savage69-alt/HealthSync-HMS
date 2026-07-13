import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

function AppointmentModal({ isOpen, onClose }) {
  const { user } = useAuth();

  const [doctors, setDoctors] = useState([]);

  const [formData, setFormData] = useState({
    doctor_id: "",
    appointment_date: "",
    appointment_time: "",
    reason: "",
  });

  useEffect(() => {
    if (!isOpen) return;

    fetchDoctors();
  }, [isOpen]);

  const fetchDoctors = async () => {
    const { data, error } = await supabase
      .from("doctors")
      .select(`
        id,
        specialization,
        profiles (
          full_name
        )
      `);

    if (!error) setDoctors(data);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const bookAppointment = async () => {

    if (
      !formData.doctor_id ||
      !formData.appointment_date ||
      !formData.appointment_time ||
      !formData.reason
    ) {
      alert("Please fill all fields.");
      return;
    }
     console.log("Current user:", user);
console.log("Patient ID:", user.id);

    const { error } = await supabase
      .from("appointments")
      .insert([
        {
          patient_id: user.id,
          doctor_id: formData.doctor_id,
          appointment_date: formData.appointment_date,
          appointment_time: formData.appointment_time,
          reason: formData.reason,
          status: "Pending",
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Appointment Booked Successfully 🎉");

    onClose();

    setFormData({
      doctor_id: "",
      appointment_date: "",
      appointment_time: "",
      reason: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl p-8 w-[600px]">

        <h2 className="text-3xl font-bold mb-6">
          Book Appointment
        </h2>

        <select
          name="doctor_id"
          value={formData.doctor_id}
          onChange={handleChange}
          className="w-full border p-4 rounded-xl mb-4"
        >
          <option value="">Select Doctor</option>

          {doctors.map((doctor) => (
            <option
              key={doctor.id}
              value={doctor.id}
            >
              {doctor.profiles.full_name} — {doctor.specialization}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="appointment_date"
          value={formData.appointment_date}
          onChange={handleChange}
          className="w-full border p-4 rounded-xl mb-4"
        />

        <input
          type="time"
          name="appointment_time"
          value={formData.appointment_time}
          onChange={handleChange}
          className="w-full border p-4 rounded-xl mb-4"
        />

        <textarea
          name="reason"
          placeholder="Reason"
          value={formData.reason}
          onChange={handleChange}
          className="w-full border p-4 rounded-xl mb-6"
        />

        <div className="flex justify-end gap-4">

          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={bookAppointment}
            className="px-6 py-3 rounded-xl bg-blue-600 text-white"
          >
            Book Appointment
          </button>

        </div>

      </div>

    </div>
  );
}

export default AppointmentModal;