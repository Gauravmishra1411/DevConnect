import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Feed from "./Feed";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/UserSlice";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/byfindid/${userId}`,
          { withCredentials: true }
        );
        dispatch(addUser(res.data));
        setUser(res.data);
      } catch (error) {
        console.error("Profile error", error);
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <h2 className="text-center mt-20">Loading...</h2>;

  return (
    <div className="min-h-screen bg-gray-100 flex relative">
      {/* LEFT : PROFILE */}
      <div className="flex-1 flex justify-center pt-24">
        <div className="bg-white w-96 rounded-xl shadow-lg p-6">
          <div className="flex justify-center">
            <img
              src={user.photoUrl || "/default-avatar.png"}
              alt="profile"
              className="w-24 h-24 rounded-full border-4 border-emerald-500"
            />
          </div>

          <h2 className="text-center mt-4 text-xl font-bold uppercase">
            {user.firstName} {user.lastName}
          </h2>

          <p className="text-center text-gray-600 mt-2">
            {user.about || "No bio available"}
          </p>

          <div className="flex justify-center mt-6">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT : FEED (Chat-style box) */}
      <div className="hidden md:block fixed right-6 bottom-6 w-80 h-[70vh] bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="bg-emerald-600 text-white px-4 py-3 font-semibold">
          Connection Requests
        </div>

        <div className="p-3 overflow-y-auto h-full">
          <Feed />
        </div>
      </div>
    </div>
  );
};

export default Profile;
