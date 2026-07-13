import { useState } from "react";
import { supabase } from "../lib/supabase";

function PrescriptionModal({
  appointment,
  isOpen,
  onClose,
  onSuccess,
}) {
  const [diagnosis, setDiagnosis] = useState("");
  const [medicines, setMedicines] = useState("");
  const [dosage, setDosage] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen || !appointment) return null;

  async function savePrescription() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("prescriptions").insert({
      appointment_id: appointment.id,
      doctor_id: user.id,
      patient_id: appointment.patient_id,
      diagnosis,
      medicines,
      dosage,
      notes,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Prescription saved successfully.");

    setDiagnosis("");
    setMedicines("");
    setDosage("");
    setNotes("");

    onSuccess();
    onClose();
  }

  return (
   <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
     <div className="bg-white w-[600px] max-h-[90vh] overflow-y-auto rounded-3xl p-8 shadow-2xl">

        <h2 className="text-3xl font-bold mb-6">
          🩺 Write Prescription
        </h2>

        <div className="space-y-5">

          <div>
            <label className="font-semibold">Diagnosis</label>

            <textarea
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              rows={3}
              className="w-full border rounded-xl p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">Medicines</label>

            <textarea
              value={medicines}
              onChange={(e) => setMedicines(e.target.value)}
              rows={3}
              className="w-full border rounded-xl p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">Dosage</label>

            <textarea
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              rows={2}
              className="w-full border rounded-xl p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">Notes</label>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full border rounded-xl p-3 mt-2"
            />
          </div>

        </div>

       <div className="sticky bottom-0 bg-white pt-4 flex justify-end gap-4">

          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>

          <button
            onClick={savePrescription}
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? "Saving..." : "Save Prescription"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default PrescriptionModal;