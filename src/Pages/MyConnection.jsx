 

 import axios from "axios";
 import { useEffect, useState } from "react";
 import   "../index.css";

const MyConnection = () => {
  const [data, setData] = useState([]);
 const userId = localStorage.getItem("userId");
console.log("User in MyConnection jsx:", userId);
  const connectionReq = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/user/request`, {
        withCredentials: true,
      });

      setData(response?.data.data);
       
    } catch (err) {
      console.log(err.message);
    }
  };

  const clickHandler = async (value, id) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/connection/request/${value}/${id}`,
        {},
        { withCredentials: true }
      );
      alert(response.data.message);
      setData(response?.data.data);
    } catch (err) {
      console.error("API Error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    connectionReq();
    // window.location.reload();

  }, []);

  return (
   <div className="bg-indigo-50 max-w-4xl mx-auto p-4 space-y-4">
{userId ? (<> {data?.length > 0 ? (
    data.map((item, index) => (
      <ul
        key={index}
        className="list bg-base-100 rounded-xl shadow-md my-2 p-2"
      >
        <li className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 hover:bg-gray-100 transition-colors rounded-lg">
          {/* Profile Image */}
          <div>
            <img
              className="w-14 h-14 rounded-full object-cover"
              src={item?.fromUserId?.photoUrl}
              alt="profile"
            />
          </div>

          {/* User Info */}
          <div className="flex-1 text-center sm:text-left">
            <div className="font-semibold text-gray-800">
              {item?.fromUserId?.firstName} {item?.fromUserId?.lastName?.trim()}
            </div>
            <div className="text-xs uppercase font-semibold opacity-60">
              Joined: {new Date(item?.createdAt).toLocaleDateString()}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0">
            <button
              className="cursor-pointer bg-gradient-to from-green-600 to-green-400 shadow-lg px-6 py-2 rounded-xl text-white font-medium hover:scale-105 transform transition-all duration-300"
              onClick={() => clickHandler("accepted", item._id)}
            >
              Accept
            </button>

            <button
              className="cursor-pointer bg-gradient-to from-red-600 to-indigo-600 shadow-lg px-6 py-2 rounded-xl text-white font-medium hover:scale-105 transform transition-all duration-300"
              onClick={() => clickHandler("ignore", item._id)}
            >
              Rejected
            </button>
          </div>
        </li>
      </ul>
    ))
  ) : (
    <p className="text-center text-gray-500 py-10">No connections found.</p>
  )}</>):(<>""</>)}

 
</div>

  );
};

export default MyConnection;
