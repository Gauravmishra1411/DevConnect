import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/UserSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const loginHandler = async () => {
    setLoading(true);
    try {
      const responseLogin = await axios.post(
        "http://localhost:8000/signin",
        formData,
        { withCredentials: true }
      );

      if (responseLogin.data.success) {
        localStorage.setItem("userId", responseLogin.data.data._id);
        dispatch(addUser(responseLogin.data.data));
        navigate("/profile");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) navigate("/profile");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-2xl font-bold text-center mb-6 text-slate-800">
          Login to your account
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Buttons */}
        <button
          onClick={loginHandler}
          disabled={loading}
          className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center mt-4 text-sm">
          Don’t have an account?
          <span
            className="text-emerald-600 cursor-pointer ml-1"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
