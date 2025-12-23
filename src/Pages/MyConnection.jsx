import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addreq } from "../redux/ReqRecevied";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const baseurl = process.env.REACT_APP_LOCAL_URL;

const MyConnection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.reqrecived);

  const connectionReq = async () => {
    try {
      const response = await axios.get(`${baseurl}/user/request`, {
        withCredentials: true,
      });

      console.log("response data 👉", response.data.firstName);
      dispatch(addreq(response.data));
      console.log("connectionRequest..........", response);
    } catch (err) {
      console.log(err.message);
    }
  };

  // const clickHandler = async ({ value, id }) => {
  //   const responseed = await axios.post(
  //     `http://localhost:8000/connection/request/${value}/${id}`,
  //     {},
  //     { withCredentials: true }
  //   );

  //   if (responseed) {
  //     navigate("/MyConnection");
  //   }
  // };
  const clickHandler = async (value, id) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/connection/request/${value}/${id}`,
        {},
        { withCredentials: true }
      );
      alert(response.data.message);
    } catch (err) {
      console.error("API Error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    connectionReq();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      {connections?.data.map((item, index) => (
        <ul key={index} className="list bg-base-100 rounded-xl shadow-md">
          <li className="list-row flex flex-col sm:flex-row items-center gap-4 p-4">
            {/* Profile Image */}
            <img
              src={item.fromUserId.photoUrl}
              alt="photourl"
              className="w-14 h-14 rounded-full object-cover"
            />

            {/* User Info */}
            <div className="flex-1 text-center sm:text-left">
              <p className="font-semibold">
                {item.fromUserId.firstName} {item.fromUserId.lastName}
              </p>
              <p className="text-sm opacity-60">{item._id}</p>
            </div>
            <button
              className="cursor-pointer bg-gradient-to-b from-green-600 to-green-600 shadow-[0px_4px_32px_0_rgba(99,102,241,.70)] px-6 py-3 rounded-xl border-[1px] border-slate-500 text-white font-medium group"
              onClick={() => clickHandler("accepted", item._id)}
            >
              <div className="relative overflow-hidden">
                <p className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                  Accept
                </p>
                <p className="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                  click
                </p>
              </div>
            </button>
            <button
              className="cursor-pointer bg-gradient-to-b from bg-red-600 to-indigo-600 shadow-[0px_4px_32px_0_rgba(99,102,241,.70)] px-6 py-3 rounded-xl border-[1px] border-slate-500 text-white font-medium group"
              onClick={() => clickHandler("ignore", item._id)}
            >
              <div className="relative overflow-hidden">
                <p className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                  Reject
                </p>
                <p className="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                  click
                </p>
              </div>
            </button>

            {/* Actions */}
          </li>
        </ul>
      ))}
    </div>
  );
};

export default MyConnection;
