import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import ActionCards from "../../components/ActionCards";
import QuickActions from "../../components/QuickActions";
import patientImage from "../../assets/images/patient_.jpg";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import HealthSummaryPopup from "../../components/HealthSummaryPopup";
import AppointmentModal from "../../components/AppointmentModal";
import ProfileModal from "../../components/ProfileModal";
import AppointmentPopup from "../../components/AppointmentPopup";
import DashboardButton from "../../components/DashboardButton";
import MedicinePopup from "../../components/MedicinePopup";
import LabReportsPopup from "../../components/LabReportsPopup";
import PrescriptionPopup from "../../components/PrescriptionPopup";
import BillsPopup from "../../components/BillsPopup";

import {
  FaCalendarCheck,
  FaHeartPulse,
  FaCapsules,
  FaFlask,
  FaNotesMedical,
  FaMoneyBillWave,
} from "react-icons/fa6";

function Patient() {
  const { user, loading } = useAuth();

  // Existing States
  const [showProfile, setShowProfile] = useState(false);
  const [showAppointment, setShowAppointment] = useState(false);
  const [openAppointment, setOpenAppointment] = useState(false);

  // Popup States
  const [showHealth, setShowHealth] = useState(false);
  const [showMedicine, setShowMedicine] = useState(false);
  const [showLab, setShowLab] = useState(false);
  const [showPrescription, setShowPrescription] = useState(false);
  const [showBills, setShowBills] = useState(false);

  if (loading) {
    return (
      <h1 className="text-center mt-20 text-3xl">
        Loading...
      </h1>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen">

  <Sidebar
    onProfileClick={() => setShowProfile(true)}
  />

  <div className="ml-72 h-screen overflow-y-auto p-8">

    <Header
      name={user.full_name}
      role={user.role}
      image={patientImage}
    />

    <ActionCards
      onBookAppointment={() => setOpenAppointment(true)}
    />

    {/* Dashboard Buttons */}

    <div className="grid grid-cols-3 gap-8 mt-8">

      <DashboardButton
        title="Upcoming Appointment"
        subtitle="View Appointment"
        icon={<FaCalendarCheck />}
        color="from-blue-600 to-cyan-500"
        onClick={() => setShowAppointment(true)}
      />

      <DashboardButton
        title="Health Summary"
        subtitle="View Health Summary"
        icon={<FaHeartPulse />}
        color="from-green-600 to-emerald-500"
        onClick={() => setShowHealth(true)}
      />

      <DashboardButton
        title="Medicines"
        subtitle="Current Medicines"
        icon={<FaCapsules />}
        color="from-purple-600 to-indigo-500"
        onClick={() => setShowMedicine(true)}
      />

      <DashboardButton
        title="Lab Reports"
        subtitle="View Reports"
        icon={<FaFlask />}
        color="from-orange-500 to-red-500"
        onClick={() => setShowLab(true)}
      />

      <DashboardButton
        title="Prescriptions"
        subtitle="Doctor Prescriptions"
        icon={<FaNotesMedical />}
        color="from-pink-500 to-rose-500"
        onClick={() => setShowPrescription(true)}
      />

      <DashboardButton
        title="Bills"
        subtitle="Payment History"
        icon={<FaMoneyBillWave />}
        color="from-indigo-600 to-blue-500"
        onClick={() => setShowBills(true)}
      />

    </div>

    <QuickActions />

  </div>

  {/* Existing Popups */}

  <AppointmentModal
    isOpen={openAppointment}
    onClose={() => setOpenAppointment(false)}
  />

  <ProfileModal
    isOpen={showProfile}
    onClose={() => setShowProfile(false)}
  />

  <AppointmentPopup
    isOpen={showAppointment}
    onClose={() => setShowAppointment(false)}
  />

  <HealthSummaryPopup
  isOpen={showHealth}
  onClose={() => setShowHealth(false)}
/>
<MedicinePopup
  isOpen={showMedicine}
  onClose={() => setShowMedicine(false)}
/>
<LabReportsPopup
  isOpen={showLab}
  onClose={() => setShowLab(false)}
/>
<PrescriptionPopup
  isOpen={showPrescription}
  onClose={() => setShowPrescription(false)}
/>
<BillsPopup
  isOpen={showBills}
  onClose={() => setShowBills(false)}
/>

</div>
  );
}

export default Patient;