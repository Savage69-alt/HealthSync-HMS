import { FaTimes } from "react-icons/fa";
import HealthSummary from "./HealthSummary";

function HealthSummaryPopup({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-3xl shadow-2xl w-[700px] max-h-[90vh] overflow-y-auto p-6 relative">

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-3xl text-gray-500 hover:text-red-600 transition"
        >
          <FaTimes />
        </button>

        <HealthSummary />

      </div>

    </div>
  );
}

export default HealthSummaryPopup;