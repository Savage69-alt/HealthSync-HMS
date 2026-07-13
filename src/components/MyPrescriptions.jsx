import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import PrescriptionCard from "./PrescriptionCard";

function MyPrescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  async function fetchPrescriptions() {
    setLoading(true);

    // Logged in patient
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    // Fetch prescriptions
    const { data, error } = await supabase
      .from("prescriptions")
      .select("*")
      .eq("patient_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    // Fetch doctor names
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, full_name");

    const merged = data.map((prescription) => {
      const doctor = profiles.find(
        (profile) => profile.id === prescription.doctor_id
      );

      return {
        ...prescription,
        doctor_name: doctor ? doctor.full_name : "Unknown Doctor",
      };
    });

    setPrescriptions(merged);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="text-center py-10 text-lg">
        Loading prescriptions...
      </div>
    );
  }

  return (
    <div className="mt-8">

      <h1 className="text-3xl font-bold mb-6">
        🩺 My Prescriptions
      </h1>

      {prescriptions.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 shadow text-center text-gray-500">
          No prescriptions available.
        </div>
      ) : (
        <div className="grid gap-6">
          {prescriptions.map((prescription) => (
            <PrescriptionCard
              key={prescription.id}
              prescription={prescription}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyPrescriptions;