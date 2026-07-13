import React from "react";

function DashboardButton({
  title,
  subtitle,
  icon,
  color,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`bg-gradient-to-r ${color} text-white rounded-3xl shadow-lg p-8 hover:scale-105 transition duration-300 flex flex-col items-center justify-center h-56 w-full`}
    >
      <div className="text-5xl mb-5">
        {icon}
      </div>

      <h2 className="text-2xl font-bold text-center">
        {title}
      </h2>

      <p className="mt-2 text-white/90 text-center">
        {subtitle}
      </p>
    </button>
  );
}

export default DashboardButton;