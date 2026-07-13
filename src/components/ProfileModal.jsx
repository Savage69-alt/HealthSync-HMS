import { FaTimes } from "react-icons/fa";
import ProfileCard from "./ProfileCard";

function ProfileModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl w-[650px] max-h-[90vh] overflow-y-auto p-6 relative shadow-2xl">

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-3xl text-gray-500 hover:text-red-600 transition"
        >
          <FaTimes />
        </button>

        <ProfileCard />

      </div>

    </div>
  );
}

export default ProfileModal;