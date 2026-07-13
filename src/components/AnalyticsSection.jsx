import {
  FaChartLine,
  FaMoneyBillTrendUp,
  FaChartPie,
  FaCalendarCheck,
} from "react-icons/fa6";

function AnalyticsSection({ openModal }) {
  const cards = [
    {
      title: "Revenue Analytics",
      type: "revenue",
      icon: <FaMoneyBillTrendUp size={35} />,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Expense Analytics",
      type: "expense",
      icon: <FaChartPie size={35} />,
      color: "from-red-500 to-orange-500",
    },
    {
      title: "Profit Analytics",
      type: "profit",
      icon: <FaChartLine size={35} />,
      color: "from-purple-500 to-indigo-600",
    },
    {
      title: "Appointment Analytics",
      type: "appointment",
      icon: <FaCalendarCheck size={35} />,
      color: "from-blue-500 to-cyan-500",
    },
  ];

  return (
    <div className="mt-8">

      <h2 className="text-2xl font-bold mb-6">
        📊 Analytics
      </h2>

      <div className="grid grid-cols-2 gap-6">

        {cards.map((card) => (
          <button
            key={card.type}
            onClick={() => openModal(card.type)}
            className={`bg-gradient-to-r ${card.color} rounded-3xl text-white p-8 shadow-lg hover:scale-105 transition duration-300 text-left`}
          >
            <div className="mb-5">
              {card.icon}
            </div>

            <h3 className="text-2xl font-bold">
              {card.title}
            </h3>

            <p className="mt-2 opacity-90">
              Click to view analytics
            </p>

          </button>
        ))}

      </div>
    </div>
  );
}

export default AnalyticsSection;