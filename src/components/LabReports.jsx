function LabReports() {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6">
        🧪 Recent Lab Reports
      </h2>

      <div className="space-y-4">

        <div className="bg-slate-100 p-5 rounded-xl">
          <h3 className="font-bold">Complete Blood Count</h3>
          <p className="text-gray-500">26 June 2026</p>
        </div>

        <div className="bg-slate-100 p-5 rounded-xl">
          <h3 className="font-bold">Blood Sugar</h3>
          <p className="text-gray-500">20 June 2026</p>
        </div>

        <div className="bg-slate-100 p-5 rounded-xl">
          <h3 className="font-bold">Cholesterol Test</h3>
          <p className="text-gray-500">15 June 2026</p>
        </div>

      </div>
    </div>
  );
}

export default LabReports;