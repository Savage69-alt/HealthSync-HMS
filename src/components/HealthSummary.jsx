function HealthSummary() {

    const healthData = [

        { title: "Blood Pressure", value: "120/80", color: "bg-blue-100 text-blue-700" },

        { title: "Heart Rate", value: "76 bpm", color: "bg-red-100 text-red-600" },

        { title: "Blood Sugar", value: "96 mg/dL", color: "bg-green-100 text-green-600" },

        { title: "BMI", value: "22.8", color: "bg-purple-100 text-purple-700" }

    ];

    return (

        <div className="bg-white rounded-3xl shadow-lg p-8">

            <h2 className="text-3xl font-bold mb-8">

                ❤️ Health Summary

            </h2>

            <div className="grid grid-cols-2 gap-5">

                {healthData.map((item,index)=>(

                    <div
                        key={index}
                        className={`${item.color} rounded-2xl p-6`}>

                        <p className="text-sm font-semibold">

                            {item.title}

                        </p>

                        <h2 className="text-3xl font-bold mt-3">

                            {item.value}

                        </h2>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default HealthSummary;