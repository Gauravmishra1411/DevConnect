import { useNavigate, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Feed from "./Feed";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/UserSlice";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const feedsDatas = useSelector((store) => store.feed);
  console.log(feedsDatas, "feedsDatas in Profile.jsx");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log(userId, "userId in Profile.jsx");
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
        setUser(res?.data.data);
        console.log("Profile data:", res?.data.data);
      } catch (error) {
        console.error("Profile error", error);
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <h2 className="text-center mt-20">Loading.....................</h2>;

  return (
    <>
      {" "}
      {userId.length > 0 && (
        <div className="min-h-screen bg-gray-100 flex relative">
          <div className="flex-1 flex justify-center pt-24">
            <div className="bg-white w-96 rounded-xl shadow-lg p-6">
              <div className="flex justify-center">
                <img
                  src={user?.photoUrl}
                  alt="profile"
                  className="w-24 h-24 rounded-full border-4 border-emerald-500"
                />
              </div>
              {user?.age}
              <h2 className="text-center text-black mt-4 text-xl font-bold uppercase">
                {user.firstName} {user.lastName}
              </h2>

              <p className="text-center text-gray-600 mt-2">
                {user.about || "No bio available"}
              </p>

              <div className="flex justify-center mt-6">
                <Link to="/edit-profile">
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg">
                    Edit Profile
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <Feed />
        </div>
      )}
    </>
  );
};

export default Profile;
