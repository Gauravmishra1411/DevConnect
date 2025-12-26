import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ConnectionList = () => {
  const userId = localStorage.getItem("userId");

  const [connections, setConnections] = useState();
  const ConnectionList = async () => {
    try {
      const Response = await axios.get(
        "http://localhost:8000/user/connection/accepted",

        { withCredentials: true }
      );
      setConnections(Response?.data?.data);
      
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    ConnectionList();
    // window.location.reload();
  }, []);
  return (
    <>
      {userId.length > 0 && (
        <div className="connections-wrapper">
          <ul className="connections-list">
            <li className="connections-header">Connections</li>

            {connections?.map((item, index) => (
              <li key={index} className="connection-row">
                <div className="connection-avatar">
                  <img
                    src={item.toUserId?.photoUrl || "/default-avatar.png"}
                    alt="profile"
                  />
                </div>

                <div className="connection-info">
                  <div className="connection-name">
                    {item.toUserId?.firstName} {item.toUserId?.lastName}
                  </div>
                </div>

                <div className="connection-actions">
                  <Link to={`chat/${item.toUserId?._id}`}>
                    <button className="btn btn-outline btn-primary text-black">
                      Chat
                    </button>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default ConnectionList;
