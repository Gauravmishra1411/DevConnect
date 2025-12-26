import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Pages/Body";
import Chat from "./Pages/Chat";

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";
import EditProfile from "./Pages/EditProfile";
import MyConnection from "./Pages/MyConnection";
import ConnectionList from "./Pages/ConnectionList";

const App = () => {
  // const userId = localStorage.getItem("userId");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="profile" element={<Profile />} />
          <Route path="myconnection" element={<MyConnection />} />
          <Route path="connectionList" element={<ConnectionList />} />
          <Route path="connectionList/chat/:id" element={<Chat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
