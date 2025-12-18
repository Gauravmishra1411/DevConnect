 import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
// // import { useSelector } from "react-redux";
// const Body = () => {
//   // const user=useSelector((store)=>store.user)

//    return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <main className="flex-grow">
//         <Outlet />
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default Body;

import { useEffect } from "react";
import { useDispatch } from "react-redux"; 
import { addUser } from "../redux/UserSlice";

const Body = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      dispatch(addUser({ _id: userId }));
    }
  }, []);

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
