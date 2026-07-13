import { FaHeartPulse } from "react-icons/fa6";

function HealthSummaryButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-3xl shadow-lg p-8 hover:scale-105 transition w-full h-[280px]"
    >
      <div className="flex flex-col items-center justify-center h-full">

        <FaHeartPulse className="text-6xl mb-5" />

        <h2 className="text-3xl font-bold">
          Health Summary
        </h2>

        <p className="mt-3 text-green-100">
          View Health Details
        </p>

      </div>
    </button>
  );
}

export default HealthSummaryButton;