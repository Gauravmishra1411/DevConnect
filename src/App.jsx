import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./page/Body";
import Login from "./page/Login";
import Signup from "./page/Signup";
import Profile from "./page/Profile"; 
import ProtectedRoute from "./router/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />

          {/* 🔐 Protected Route */}
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
