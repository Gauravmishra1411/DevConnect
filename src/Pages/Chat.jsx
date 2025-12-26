import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
const Chat = () => {
  const user = useSelector((state) => state.user);

  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const [yourdetail, setYourDetail] = useState("");
  console.log(user.data, "id from params");
const {_id} = user.data;
  useEffect(() => {
    // if (!id || !user) return;
    const yourDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/byfindid/${_id}`, {
          withCredentials: true,
        });
        setYourDetail(res.data.data);
        console.log(res.data, "your detail response");
      } catch (err) {
        console.log(err.message);
      }
    };

    const targetDetail = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/byfindid/${id}`, {
          withCredentials: true,
        });
        setDetail(res.data.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    yourDetails();
    targetDetail();
  }, [id]);
 
  console.log(yourdetail, "yourdetail");
  return (
    <div className="relative h-[450px] w-1/2 bg-amber-300 border-4 p-4 flex flex-col">
      {/* RECEIVER */}
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src={detail?.photoUrl} alt="profile" />
          </div>
        </div>

        <div className="chat-header">{detail?.firstName}</div>

        <div className="chat-bubble">message.1....</div>
      </div>

      {/* SENDER */}
      <div className="chat chat-end mt-4">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src={yourdetail?.photoUrl} alt="profile" />
          </div>
        </div>

        <div className="chat-header text-zinc-600">
          {yourdetail?.firstName}{" "}
        </div>

        <div className="chat-bubble chat-bubble-info">message.2....</div>
      </div>

      {/* INPUT */}
      <div className="mt-auto flex gap-2 pt-4">
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Type a message"
        />
        <button className="btn btn-primary">Send</button>
      </div>
    </div>
  );
};

export default Chat;
