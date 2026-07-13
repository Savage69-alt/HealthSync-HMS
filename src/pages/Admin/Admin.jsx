import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { useAuth } from "../../context/AuthContext";
import AdminStats from "../../components/AdminStats";
import RecentAppointments from "../../components/RecentAppointments";
import { useState } from "react";
import AnalyticsSection from "../../components/AnalyticsSection";
import AnalyticsModal from "../../components/AnalyticsModal";

import adminImage from "../../assets/images/admin.jpeg";

function Admin() {
  const [showAnalytics, setShowAnalytics] = useState(false);
const [analyticsType, setAnalyticsType] = useState("");

function openModal(type) {
  setAnalyticsType(type);
  setShowAnalytics(true);
}
  const { user, loading } = useAuth();

if (loading) {
  return <h1 className="text-center mt-20 text-3xl">Loading...</h1>;
}
  return (
    <div className="flex bg-slate-100 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-8">

       <Header
    name={user.full_name}
    role={user.role}
    image={adminImage}
/>

       <AdminStats />

<div className="grid grid-cols-1 mt-6">
  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-3xl p-6 shadow-lg">
    <h3 className="text-lg">Revenue</h3>
    <h1 className="text-5xl font-bold mt-3">₹2.4L</h1>
  </div>
  <RecentAppointments />
  <AnalyticsSection openModal={openModal} />
</div>
          
      </div>
         <AnalyticsModal
  isOpen={showAnalytics}
  onClose={() => setShowAnalytics(false)}
  type={analyticsType}
/>
    </div>
  );
}

export default Admin;