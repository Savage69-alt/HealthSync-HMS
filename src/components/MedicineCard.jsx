function MedicineCard() {

  const medicines = [

    {
      name: "Paracetamol 500mg",
      time: "Morning & Night"
    },

    {
      name: "Vitamin D",
      time: "After Breakfast"
    },

    {
      name: "Calcium Tablet",
      time: "After Lunch"
    }

  ];

  return (

    <div className="bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-6">

        💊 Current Medicines

      </h2>

      <div className="space-y-4">

        {medicines.map((med,index)=>(

          <div
            key={index}
            className="bg-slate-100 rounded-xl p-5">

            <h3 className="font-bold">

              {med.name}

            </h3>

            <p className="text-gray-500 mt-2">

              {med.time}

            </p>

          </div>

        ))}

      </div>

    </div>

  );

}

export default MedicineCard;