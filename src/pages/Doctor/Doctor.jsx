import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import DoctorStats from "../../components/DoctorStats";
import PatientQueue from "../../components/PatientQueue";
import doctorImage from "../../assets/images/doctor.jpg";
import { useAuth } from "../../context/AuthContext";

function Doctor() {
   const { user, loading } = useAuth();
   console.log(user);

if (loading) {
  return <h1 className="text-center mt-20 text-3xl">Loading...</h1>;
}
  return (
   <div className="bg-slate-100 min-h-screen">

  <Sidebar />

  <div className="ml-72 h-screen overflow-y-auto p-8">
      
      <Header
    name={user.full_name}
    role={user.role}
    image={doctorImage}
/>
       <DoctorStats />
       <div className="mt-8">
    <PatientQueue />
</div>

       

      </div>

    </div>
  );
}

export default Doctor;