import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import PrescriptionModal from "./PrescriptionModal";
import BillModal from "./BillModal";

function PatientQueue() {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [showBillModal, setShowBillModal] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  async function fetchAppointments() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data: appointmentData, error: appointmentError } =
      await supabase
        .from("appointments")
        .select("*")
        .eq("doctor_id", user.id)
        .order("created_at", { ascending: false });

    if (appointmentError) {
      console.log(appointmentError);
      return;
    }

    const { data: profileData, error: profileError } =
      await supabase
        .from("profiles")
        .select("id, full_name");

    if (profileError) {
      console.log(profileError);
      return;
    }

    const mergedAppointments = appointmentData.map((appointment) => {
      const patient = profileData.find(
        (profile) => profile.id === appointment.patient_id
      );

      return {
        ...appointment,
        patient_name: patient ? patient.full_name : "Unknown Patient",
      };
    });

    setAppointments(mergedAppointments);
  }

  async function updateStatus(id, status) {
    const { error } = await supabase
      .from("appointments")
      .update({ status })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    await fetchAppointments();
  }

  function openPrescription(appointment) {
    setSelectedAppointment(appointment);
    setShowModal(true);
  }

  function openBill(appointment) {
    setSelectedAppointment(appointment);
    setShowBillModal(true);
  }

  return (
    <>
      <div className="bg-white rounded-3xl shadow-lg p-8">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            👥 Patient Queue
          </h2>
        </div>

        {appointments.length === 0 ? (
          <p className="text-center text-gray-500">
            No appointments found.
          </p>
        ) : (
          <div className="space-y-5">

            {appointments.map((appointment) => (

              <div
                key={appointment.id}
                className="bg-slate-100 rounded-2xl p-5 flex justify-between items-center"
              >

                <div>

                  <h3 className="text-xl font-bold">
                    {appointment.patient_name}
                  </h3>

                  <p>📅 {appointment.appointment_date}</p>

                  <p>🕒 {appointment.appointment_time}</p>

                  <p>📝 {appointment.reason}</p>

                  <p className="mt-2">
                    Status :
                    <span className="font-bold text-blue-600 ml-2">
                      {appointment.status}
                    </span>
                  </p>

                </div>

                <div className="flex flex-col gap-3">

                  {appointment.status === "Pending" && (
                    <>
                      <button
                        onClick={() =>
                          updateStatus(appointment.id, "Approved")
                        }
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(appointment.id, "Rejected")
                        }
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {appointment.status === "Approved" && (
                    <button
                      onClick={() =>
                        updateStatus(appointment.id, "Completed")
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                      Complete
                    </button>
                  )}

                  {appointment.status === "Completed" && (
                    <>
                      <button
                        onClick={() => openPrescription(appointment)}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                      >
                        🩺 Write Prescription
                      </button>

                      <button
                        onClick={() => openBill(appointment)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg"
                      >
                        💳 Generate Bill
                      </button>
                    </>
                  )}

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

      <PrescriptionModal
        appointment={selectedAppointment}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={fetchAppointments}
      />

      <BillModal
        appointment={selectedAppointment}
        isOpen={showBillModal}
        onClose={() => setShowBillModal(false)}
        onSuccess={fetchAppointments}
      />
    </>
  );
}

export default PatientQueue;