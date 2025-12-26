import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/UserSlice";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Body = () => {
   
  const dispatch = useDispatch();

  useEffect(() => {
   
  }, []);
  // if (!user) return <h2 className="text-center mt-20">Loading.....................</h2>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Body;
