import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeUser, addUser } from "../redux/UserSlice";
import { useState, useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [open, setOpen] = useState(false);
  // console.log(user.data.firstName, "user in Navbar.jsx");
  const logout = () => {
    localStorage.clear(null);
    navigate("/");
    dispatch(removeUser());
    setOpen(false);
  };
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      dispatch(addUser(storedUser));
    }
  }, []);

  return (
    <div className="hidden md:flex items-left gap-6">
      {user?.data ? (
        <>
          {/* Navigation Links */}
          <Link
            to="/myconnection"
            className="text-sm font-medium text-gray-200 hover:text-emerald-400 transition-colors duration-200"
          >
            My Connections
          </Link>

          <Link
            to="/connectionList"
            className="text-sm font-medium text-gray-200 hover:text-emerald-400 transition-colors duration-200"
          >
            ConnectedWithUs
          </Link>

          {/* User Info */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-600">
            <div className="text-left leading-tight">
              <p className="text-sm font-semibold capitalize">
                {user.data.firstName}
              </p>
              <p className="text-xs text-gray-400 capitalize">
                {user.data.lastName}
              </p>
            </div>

            {/* Avatar */}
            {user.data.photoUrl ? (
              <img
                src={user.data.photoUrl}
                alt="profile"
                className="w-9 h-9 rounded-full border border-gray-500 object-cover"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-semibold uppercase">
                {user.data.firstName?.[0]}
              </div>
            )}
          </div>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="ml-2 px-4 py-1.5 text-sm font-medium rounded-md bg-red-500 hover:bg-red-600 active:scale-95 transition-all duration-150"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          {/* Auth Buttons */}
          <Link
            to="/login"
            className="px-4 py-1.5 text-sm font-medium rounded-md bg-emerald-500 hover:bg-emerald-600 transition-colors duration-200"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-4 py-1.5 text-sm font-medium rounded-md bg-indigo-500 hover:bg-indigo-600 transition-colors duration-200"
          >
            Sign Up
          </Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
