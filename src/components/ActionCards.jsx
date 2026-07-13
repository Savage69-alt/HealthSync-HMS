import { FaCalendarPlus } from "react-icons/fa6";

function ActionCards({ onBookAppointment }) {

  const actions = [
    {
      title: "Book Appointment",
      icon: <FaCalendarPlus />,
      color: "from-pink-500 to-red-500",
    },
  ];

  return (

    <div className="grid grid-cols-1 mt-8">

      {actions.map((action, index) => (

        <div
          key={index}
          onClick={onBookAppointment}
          className={`bg-gradient-to-r ${action.color}
          rounded-3xl
          p-8
          text-white
          shadow-xl
          cursor-pointer
          hover:scale-105
          duration-300
          text-center`}
        >

          <div className="text-5xl mb-5">

            {action.icon}

          </div>

          <h3 className="font-bold text-2xl">

            {action.title}

          </h3>

        </div>

      ))}

    </div>

  );

}

export default ActionCards;