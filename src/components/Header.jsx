import { FaBell, FaCalendarDays } from "react-icons/fa6";
import patientImage from "../assets/images/patient_.jpg";

function Header({ name, role,image }) {
  const today = new Date();

const currentDate = today.toLocaleDateString("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const currentDay = today.toLocaleDateString("en-IN", {
  weekday: "long",
});
  return (
   <div className="bg-white rounded-3xl shadow-md p-6 flex justify-between items-center gap-8">

      {/* Left */}

     <div className="flex-1 min-w-0">

  <h1 className="text-5xl font-bold text-slate-800 leading-tight break-words">
    Welcome Back,
    <span className="text-blue-600"> {name} 👋</span>
  </h1>

  <p className="text-gray-500 mt-3 text-lg">
    Here's your health overview for today.
  </p>

</div>

      {/* Right */}

     <div className="flex items-center gap-6 flex-shrink-0">

        {/* Notification */}

        <div className="relative">

          <button className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center hover:bg-blue-600 hover:text-white transition">

            <FaBell className="text-xl"/>

          </button>

          <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">

            3

          </span>

        </div>

        {/* Date */}
       <div className="flex items-center gap-3 bg-slate-100 px-5 py-3 rounded-2xl">

  <FaCalendarDays className="text-blue-600" />

  <div>

    <p className="font-semibold">
      {currentDate}
    </p>

    <p className="text-sm text-gray-500">
      {currentDay}
    </p>

  </div>

</div>
       
        {/* Profile */}

        <div className="flex items-center gap-3">
     <img
    src={image}
    alt="profile"
    className="w-14 h-14 rounded-full border-2 border-blue-600 object-cover"
/>

          <div>

            <h3 className="font-bold">
  {name}
</h3>

            <p className="text-sm text-gray-500">

              {role}

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Header;