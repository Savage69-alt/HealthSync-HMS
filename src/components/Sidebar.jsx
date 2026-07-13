import {
  FaHouse,
  FaCalendarCheck,
  FaUserDoctor,
  FaFileMedical,
  FaPrescriptionBottleMedical,
  FaFlask,
  FaMoneyBillWave,
  FaHeartPulse,
  FaUser,
  FaGear,
  FaCircleQuestion,
  FaArrowRightFromBracket,
} from "react-icons/fa6";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

function Sidebar({ onProfileClick }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(error.message);
      return;
    }

    alert("Logged out successfully!");
    navigate("/");
  };

  const menus = [
    { icon: <FaHouse />, name: "Dashboard" },
    { icon: <FaCalendarCheck />, name: "Appointments" },
    { icon: <FaUserDoctor />, name: "Doctors" },
    { icon: <FaFileMedical />, name: "Medical Records" },
    { icon: <FaPrescriptionBottleMedical />, name: "Prescriptions" },
    { icon: <FaFlask />, name: "Lab Reports" },
    { icon: <FaMoneyBillWave />, name: "Bills" },
    { icon: <FaHeartPulse />, name: "Health Tracker" },
    { icon: <FaUser />, name: "My Profile" },
    { icon: <FaGear />, name: "Settings" },
    { icon: <FaCircleQuestion />, name: "Help & Support" },
    { icon: <FaArrowRightFromBracket />, name: "Logout" },
  ];

  return (
    <aside className="fixed left-0 top-0 w-72 h-screen bg-gradient-to-b from-blue-700 via-blue-600 to-cyan-500 text-white flex flex-col z-50 shadow-xl">

      {/* Logo */}
      <div className="p-6">
        <h1 className="text-4xl font-extrabold">
          ❤️ HealthSync
        </h1>

        <p className="text-blue-100 mt-2">
          Healthcare Management System
        </p>
      </div>

      {/* Menu */}
     <div className="flex-1 px-5 overflow-y-auto sidebar-scroll">
        {menus.map((item, index) => (
          <div
            key={index}
           onClick={() => {
  if (item.name === "My Profile") {
    onProfileClick();
    return;
  }

  if (item.name === "Logout") {
    handleLogout();
    return;
  }
}}
            className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer mb-2 transition-all duration-300 hover:bg-white hover:text-blue-700 hover:translate-x-2"
          >
            <span className="text-xl">
              {item.icon}
            </span>

            <span className="font-semibold">
              {item.name}
            </span>
          </div>
        ))}

      </div>

      {/* Emergency */}
     <div className="m-5 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 p-4">

  <h3 className="font-bold text-lg">
    Emergency
  </h3>

  <p className="mt-1 text-sm">
    24 / 7 Support
  </p>

  <h2 className="text-2xl font-bold mt-2">
    +91 9876543210
  </h2>

</div>

    </aside>
  );
}

export default Sidebar; 