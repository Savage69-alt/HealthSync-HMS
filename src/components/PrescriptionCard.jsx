function PrescriptionCard({ prescription }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">

      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-2xl font-bold text-blue-700">
            🩺 Dr. {prescription.doctor_name}
          </h2>

          <p className="text-gray-500 mt-1">
            {new Date(prescription.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="space-y-4">

        <div>
          <h3 className="font-semibold text-gray-700">
            Diagnosis
          </h3>

          <p className="text-gray-600">
            {prescription.diagnosis}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700">
            Medicines
          </h3>

          <p className="text-gray-600 whitespace-pre-line">
            {prescription.medicines}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700">
            Dosage
          </h3>

          <p className="text-gray-600">
            {prescription.dosage}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700">
            Notes
          </h3>

          <p className="text-gray-600">
            {prescription.notes}
          </p>
        </div>

      </div>
    </div>
  );
}

export default PrescriptionCard;