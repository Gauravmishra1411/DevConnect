import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../redux/FeedSlice";
import { useEffect } from "react";

const Feed = () => {
  const feedsDatas = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const connectionReq = async (id, status) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/connection/send/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      alert(response.data.message);
    } catch (err) {
      console.error("connection error", err.response?.data || err.message);
    }
  };

  const getFeed = async () => {
    try {
      const response = await axios.get("http://localhost:8000/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(response.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className="space-y-3">
      {feedsDatas?.data?.length === 0 && (
        <p className="text-center text-gray-500 text-sm">
          No new connection requests
        </p>
      )}

      {feedsDatas?.data?.map((item) => (
        <div
          key={item._id}
          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition"
        >
          {/* Avatar */}
          <img
            src={item.photoUrl || "/default-avatar.png"}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover"
          />

          {/* Info */}
          <div className="flex-1">
            <p className="font-semibold text-sm uppercase">
              {item.firstName} {item.lastName}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              className="text-xs bg-emerald-500 hover:bg-emerald-600 text-white px-2 py-1 rounded"
              onClick={() => connectionReq(item._id, "intersted")}
            >
              Accept
            </button>

            <button
              className="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
              onClick={() => connectionReq(item._id, "rejected")}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
