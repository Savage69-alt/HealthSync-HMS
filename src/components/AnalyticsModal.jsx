import { FaXmark } from "react-icons/fa6";
import RevenueChart from "./RevenueChart";
import ExpenseChart from "./ExpenseChart";
import ProfitChart from "./ProfitChart";
import AppointmentChart from "./AppointmentChart";

function AnalyticsModal({ isOpen, onClose, type }) {

  if (!isOpen) return null;

  function getTitle() {
    switch (type) {
      case "revenue":
        return "Revenue Analytics";

      case "expense":
        return "Expense Analytics";

      case "profit":
        return "Profit Analytics";

      case "appointment":
        return "Appointment Analytics";

      default:
        return "Analytics";
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl w-[900px] h-[650px] shadow-2xl p-8 relative">

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-3xl hover:text-red-500"
        >
          <FaXmark />
        </button>

        <h1 className="text-3xl font-bold mb-8">
          {getTitle()}
        </h1>

        <div className="h-[500px]">
  {type === "revenue" && <RevenueChart />}

 {type === "expense" && <ExpenseChart />}

  {type === "profit" && <ProfitChart />}

   {type === "appointment" && (
  <AppointmentChart />
)}
</div>

      </div>

    </div>
  );
}

export default AnalyticsModal;