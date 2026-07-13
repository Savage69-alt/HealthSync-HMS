import { FaHeartPulse } from "react-icons/fa6";
import { FaEnvelope, FaLock, FaUserMd } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleLogin = async () => {
    if (!email || !password || !role) {
      alert("Please fill all fields.");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (profileError) {
      alert(profileError.message);
      return;
    }

    if (profile.role !== role.toLowerCase()) {
      alert("Selected role doesn't match your account.");
      return;
    }

    await refreshUser();

    switch (profile.role) {
      case "patient":
        navigate("/patient");
        break;

      case "doctor":
        navigate("/doctor");
        break;

      case "admin":
        navigate("/admin");
        break;

      default:
        navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-500 flex items-center justify-center p-8">

      <div className="w-full max-w-6xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden grid grid-cols-2">

        {/* LEFT PANEL */}

        <div className="relative bg-gradient-to-br from-teal-800 via-teal-700 to-emerald-600 text-white p-16 flex flex-col justify-between overflow-hidden">

          {/* Background Glow */}

          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10"></div>

          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-emerald-300/10"></div>

          {/* Logo */}

          <div>

            <div className="flex items-center gap-3">

              <FaHeartPulse className="text-5xl text-emerald-300" />

              <h1 className="text-4xl font-bold">
                HealthSync
              </h1>

            </div>

          </div>

          {/* Text */}

          <div>

            <h2 className="text-5xl font-bold leading-tight">

              Smart Healthcare

              <br />

              Management

              <br />

              System

            </h2>

            <p className="mt-8 text-teal-100 text-xl leading-9">

              Connect Doctors,
              Patients and Hospital
              Administration through
              one secure digital platform.

            </p>

          </div>

          {/* Footer */}

          <p className="text-teal-100">

            © 2026 HealthSync HMS

          </p>

        </div>

        {/* RIGHT SIDE */}

        <div className="bg-white p-16 flex flex-col justify-center">

          <h2 className="text-4xl font-bold text-gray-800 mb-3">
            Welcome Back
          </h2>

          <p className="text-gray-500 mb-10">
            Login to your HealthSync account
          </p>
                    {/* Email */}

          <div className="mb-5">

            <label className="block mb-2 font-semibold">
              Email
            </label>

            <div className="flex items-center border rounded-xl px-4 py-3 focus-within:border-teal-600">

              <FaEnvelope className="text-gray-400 mr-3" />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full outline-none"
              />

            </div>

          </div>

          {/* Password */}

          <div className="mb-5">

            <label className="block mb-2 font-semibold">
              Password
            </label>

            <div className="flex items-center border rounded-xl px-4 py-3 focus-within:border-teal-600">

              <FaLock className="text-gray-400 mr-3" />

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full outline-none"
              />

            </div>

          </div>

          {/* Role */}

          <div className="mb-8">

            <label className="block mb-2 font-semibold">
              Select Role
            </label>

            <div className="flex items-center border rounded-xl px-4 py-3 focus-within:border-teal-600">

              <FaUserMd className="text-gray-400 mr-3" />

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full outline-none bg-transparent"
              >
                <option value="">Select Role</option>
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
              </select>

            </div>

          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-xl text-lg font-semibold transition duration-300"
          >
            Login
          </button>

          <div className="text-center mt-6">

            <p className="text-gray-600">

              Don't have an account?{" "}

              <span
                onClick={() => navigate("/register")}
                className="text-teal-600 font-semibold cursor-pointer hover:underline"
              >
                Create Account
              </span>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;