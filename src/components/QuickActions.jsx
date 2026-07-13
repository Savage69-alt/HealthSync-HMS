function QuickActions() {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-6">
        ⚡ Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <button className="bg-blue-600 text-white rounded-xl p-5 hover:bg-blue-700">
          📅 Book Appointment
        </button>

        <button className="bg-green-600 text-white rounded-xl p-5 hover:bg-green-700">
          📄 View Reports
        </button>

        <button className="bg-purple-600 text-white rounded-xl p-5 hover:bg-purple-700">
          💊 Prescriptions
        </button>

        <button className="bg-orange-500 text-white rounded-xl p-5 hover:bg-orange-600">
          💳 Pay Bills
        </button>

      </div>

    </div>
  );
}

export default QuickActions;