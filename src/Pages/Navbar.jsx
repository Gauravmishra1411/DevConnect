import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../redux/UserSlice";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    dispatch(removeUser());
    navigate("/login");
    setOpen(false);
  };

  return (
    <nav className="bg-slate-800 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link to="/login" className="text-xl font-bold tracking-wide">
            DevConnect
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="hover:text-emerald-400 transition"
                >
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="bg-red-500 px-4 py-1 rounded-md hover:bg-red-600 transition"
                >
                  Logout
                </button>
                {user?.photoUrl ? (
                  <img
                    src={user.photoUrl}
                    alt={user?.firstName?.charAt(0).toUpperCase()}
                    className="w-9 h-9 rounded-full border border-white object-cover"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold uppercase border border-white">
                    {user?.firstName?.charAt(0)}
                  </div>
                )}
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-emerald-500 px-4 py-1 rounded-md hover:bg-emerald-600"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-indigo-500 px-4 py-1 rounded-md hover:bg-indigo-600"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-slate-700 px-4 py-3 space-y-3">
          {user ? (
            <>
              <Link
                to="/profile"
                className="block hover:text-emerald-400"
                onClick={() => setOpen(false)}
              >
                Profile
              </Link>

              <button onClick={logout} className="block text-left text-red-400">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block hover:text-emerald-400"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block hover:text-emerald-400"
                onClick={() => setOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
