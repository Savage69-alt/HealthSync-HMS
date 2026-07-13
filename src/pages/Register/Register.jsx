import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.role
    ) {
      alert("Please fill all fields.");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });
    const user = data.user;

if (user) {
  const { error: profileError } = await supabase
    .from("profiles")
    .insert([
      {
        id: user.id,
        full_name: formData.fullName,
        email: formData.email,
        role: formData.role,
      },
    ]);

  if (profileError) {
    alert(profileError.message);
    return;
  }
}

    if (error) {
      alert(error.message);
      return;
    }

   alert("Registration Successful! Please login.");

navigate("/");

    console.log(data);

    setFormData({
      fullName: "",
      email: "",
      password: "",
      role: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center p-8">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-xl">
        <h1 className="text-4xl font-bold text-center mb-8">
          Create Account
        </h1>

        <form onSubmit={handleRegister} className="space-y-5">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border rounded-xl p-4"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-xl p-4"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded-xl p-4"
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border rounded-xl p-4"
          >
            <option value="">Select Role</option>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-4"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;