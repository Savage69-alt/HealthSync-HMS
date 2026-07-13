import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { downloadInvoice } from "../utils/InvoiceGenerator";

function MyBills() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetchBills();
  }, []);

  async function fetchBills() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    // Fetch bills
    const { data: billData, error } = await supabase
      .from("bills")
      .select("*")
      .eq("patient_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    // Fetch doctor names
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, full_name");

    const merged = billData.map((bill) => {
      const doctor = profiles.find(
        (profile) => profile.id === bill.doctor_id
      );

      return {
        ...bill,
        doctor_name: doctor?.full_name || "Unknown Doctor",
      };
    });

    setBills(merged);
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        💳 My Bills
      </h2>

      {bills.length === 0 ? (
        <p className="text-gray-500 text-center">
          No bills available.
        </p>
      ) : (
        <div className="space-y-5">

          {bills.map((bill) => (

            <div
              key={bill.id}
              className="bg-slate-100 rounded-2xl p-6 flex justify-between items-center"
            >

              <div>

                <h3 className="text-xl font-bold">
                  Dr. {bill.doctor_name}
                </h3>

                <p className="mt-2">
                  Amount :
                  <span className="font-bold text-green-600 ml-2">
                    ₹{bill.total_amount}
                  </span>
                </p>

                <p className="mt-2">
                  Status :
                  <span
                    className={`font-bold ml-2 ${
                      bill.payment_status === "Paid"
                        ? "text-green-600"
                        : "text-orange-500"
                    }`}
                  >
                    {bill.payment_status}
                  </span>
                </p>

                <p className="text-gray-500 mt-2">
                  {new Date(bill.created_at).toLocaleDateString()}
                </p>

              </div>

             <button
  onClick={() => downloadInvoice(bill)}
  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
>
  📄 Download Invoice
</button>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default MyBills;