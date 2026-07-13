import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

function BillModal({
  appointment,
  isOpen,
  onClose,
  onSuccess,
}) {
  const [consultationFee, setConsultationFee] = useState(500);
  const [medicineFee, setMedicineFee] = useState(0);
  const [labFee, setLabFee] = useState(0);
  const [otherFee, setOtherFee] = useState(0);

  const [loading, setLoading] = useState(false);

  const total =
    Number(consultationFee) +
    Number(medicineFee) +
    Number(labFee) +
    Number(otherFee);

  useEffect(() => {
    if (isOpen) {
      setConsultationFee(500);
      setMedicineFee(0);
      setLabFee(0);
      setOtherFee(0);
    }
  }, [isOpen]);

  if (!isOpen || !appointment) return null;

  async function saveBill() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("bills")
      .insert({
        appointment_id: appointment.id,
        patient_id: appointment.patient_id,
        doctor_id: user.id,

        consultation_fee: consultationFee,
        medicine_fee: medicineFee,
        lab_fee: labFee,
        other_fee: otherFee,

        total_amount: total,

        payment_status: "Pending",
      });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Bill Generated Successfully");

    onSuccess();
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">

      <div className="bg-white rounded-3xl w-[550px] max-h-[90vh] overflow-y-auto p-8 shadow-2xl">

        <h2 className="text-3xl font-bold mb-8">
          💳 Generate Bill
        </h2>

        <div className="space-y-5">

          <div>
            <label>Consultation Fee</label>

            <input
              type="number"
              value={consultationFee}
              onChange={(e)=>setConsultationFee(e.target.value)}
              className="w-full border rounded-xl p-3 mt-2"
            />
          </div>

          <div>
            <label>Medicine Fee</label>

            <input
              type="number"
              value={medicineFee}
              onChange={(e)=>setMedicineFee(e.target.value)}
              className="w-full border rounded-xl p-3 mt-2"
            />
          </div>

          <div>
            <label>Lab Fee</label>

            <input
              type="number"
              value={labFee}
              onChange={(e)=>setLabFee(e.target.value)}
              className="w-full border rounded-xl p-3 mt-2"
            />
          </div>

          <div>
            <label>Other Charges</label>

            <input
              type="number"
              value={otherFee}
              onChange={(e)=>setOtherFee(e.target.value)}
              className="w-full border rounded-xl p-3 mt-2"
            />
          </div>

          <div className="bg-blue-50 rounded-2xl p-5">

            <h2 className="text-xl font-bold">
              Total Amount
            </h2>

            <h1 className="text-4xl font-bold text-blue-700 mt-2">
              ₹ {total}
            </h1>

          </div>

        </div>

       <div className="sticky bottom-0 bg-white pt-6 mt-6 flex justify-end gap-4 border-t">

          <button
            onClick={onClose}
            className="bg-gray-300 px-6 py-3 rounded-xl"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={saveBill}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
          >
            {loading ? "Saving..." : "Generate Bill"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default BillModal;