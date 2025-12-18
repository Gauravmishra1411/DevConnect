import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    skill: "",
    about: "",
    photo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/signup", data, {
        withCredentials: true,
      });
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700 px-2">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-6">

        <h2 className="text-2xl font-bold text-center mb-6 text-slate-800">
          Create Account
        </h2>

        <form onSubmit={formSubmit} className="space-y-4">

          {/* Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="firstName"
              placeholder="First Name"
              value={data.firstName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <input
              name="lastName"
              placeholder="Last Name"
              value={data.lastName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          {/* Age */}
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={data.age}
            onChange={handleChange}
            className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          {/* Gender */}
          <div>
            <p className="font-semibold mb-1">Gender</p>
            <div className="flex gap-6">
              {["male", "female", "other"].map((g) => (
                <label key={g} className="flex items-center gap-1 text-sm">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={data.gender === g}
                    onChange={handleChange}
                    className="accent-emerald-600"
                  />
                  {g}
                </label>
              ))}
            </div>
          </div>

          {/* Skill */}
          <input
            name="skill"
            placeholder="Skill"
            value={data.skill}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          {/* About */}
          <textarea
            name="about"
            placeholder="About"
            rows="3"
            value={data.about}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
          />

          {/* Photo */}
          <input
            type="url"
            name="photo"
            placeholder="Photo URL"
            value={data.photo}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-2 rounded-lg font-semibold hover:bg-emerald-700 transition"
          >
            Sign Up
          </button>

          <p className="text-center text-sm">
            Already have an account?
            <span
              className="text-emerald-600 cursor-pointer ml-1 font-semibold"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Signup;
