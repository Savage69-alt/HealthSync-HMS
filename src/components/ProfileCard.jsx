import patientImage from "../assets/images/patient_.jpg";
import { useAuth } from "../context/AuthContext";

function ProfileCard() {
  const { user } = useAuth();

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <div className="flex flex-col items-center">

        <img
          src={patientImage}
          alt="Patient"
          className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover"
        />

        <h2 className="mt-5 text-3xl font-bold">
          {user.full_name}
        </h2>

        <p className="text-gray-500 mt-2">
          Patient ID : {user.id.slice(0, 8).toUpperCase()}
        </p>

        <p className="text-gray-500">
          {user.email}
        </p>

      </div>

      <div className="grid grid-cols-2 gap-4 mt-8">

        <div className="bg-slate-100 rounded-2xl p-4 text-center">
          <p className="text-gray-500">Role</p>
          <h3 className="text-2xl font-bold capitalize">
            {user.role}
          </h3>
        </div>

        <div className="bg-slate-100 rounded-2xl p-4 text-center">
          <p className="text-gray-500">Phone</p>
          <h3 className="text-lg font-bold">
            {user.phone || "Not Added"}
          </h3>
        </div>

        <div className="bg-slate-100 rounded-2xl p-4 text-center">
          <p className="text-gray-500">Status</p>
          <h3 className="text-2xl font-bold text-green-600">
            Active
          </h3>
        </div>

        <div className="bg-slate-100 rounded-2xl p-4 text-center">
          <p className="text-gray-500">Account</p>
          <h3 className="text-2xl font-bold text-blue-600">
            Verified
          </h3>
        </div>

      </div>

      <button className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold transition">
        Edit Profile
      </button>

    </div>
  );
}

export default ProfileCard;