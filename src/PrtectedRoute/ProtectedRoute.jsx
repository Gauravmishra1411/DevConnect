import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuths] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setIsAuths(true);
    }
    setLoading(false);
  }, []);

  if (loading) return <h2>Loading...</h2>;

  return isAuth ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
