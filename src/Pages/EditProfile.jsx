 import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const baseUrl = process.env.REACT_APP_LOCAL_URL;

const EditProfile = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const user = useSelector(store => store.user);

  const [editData, setEditData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    age: user?.age || "",
    gender: user?.gender || "",
    photoUrl: user?.photoUrl || "",
    skills: user?.skills || "",
    about: user?.about || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const updateHandler = async () => {
    try {
      const response = await axios.put(`${baseUrl}/update/${userId}`, editData, {
        withCredentials: true,
      });
      alert("Profile updated ✅");
      navigate("/profile");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Update failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">

        {/* Current Profile */}
        <div className="bg-slate-700 text-lg shadow-lg rounded-xl p-6 text-white">
          <div className="flex justify-center mb-4">
            <img src={user?.photoUrl || "/default-avatar.png"} alt="profile" className="w-28 h-28 rounded-full object-cover border" />
          </div>
          <h2 className="text-xl font-semibold text-center">{user?.firstName} {user?.lastName}</h2>
          <p>About: {user?.about}</p>
          <p>Age: {user?.age}</p>
          <p>Gender: {user?.gender}</p>
          <p>Skills: {Array.isArray(user?.skills) ? user.skills.join(", ") : user?.skills}</p>

          <div className="mt-6 flex gap-4">
            <Link to="/editprofile" className="w-full text-center bg-blue-600 py-2 rounded-lg hover:bg-blue-700">Edit Profile</Link>
            <Link to="/profile" className="w-full text-center bg-gray-200 py-2 rounded-lg hover:bg-gray-300">Cancel</Link>
          </div>
        </div>

        {/* Edit Form */}
        <div className="bg-slate-700 text-lg shadow-lg rounded-xl p-6 text-white">
          <h2 className="text-center">Edit Profile</h2>
          <div className="flex flex-col gap-3 mt-4">
            {["firstName", "lastName", "age", "skills", "about", "photoUrl"].map(field => (
              <input
                key={field}
                type={field === "age" ? "number" : "text"}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={editData[field]}
                onChange={handleChange}
                className="px-3 py-2 rounded-lg text-black"
              />
            ))}
            <button className="bg-green-600 text-white py-2 rounded" onClick={updateHandler}>Submit</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EditProfile;
