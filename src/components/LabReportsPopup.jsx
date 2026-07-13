import { FaTimes } from "react-icons/fa";
import LabReports from "./LabReports";

function LabReportsPopup({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl w-[700px] max-h-[90vh] overflow-y-auto p-6 relative shadow-2xl">

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-3xl text-gray-500 hover:text-red-600"
        >
          <FaTimes />
        </button>

        <LabReports />

      </div>

    </div>
  );
}

export default LabReportsPopup;