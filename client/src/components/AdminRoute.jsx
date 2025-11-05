// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const AdminRoute = ({ children }) => {
//   const { user } = useAuth();

//   if (!user) return <Navigate to="/login" replace />;

//   if (user.role !== "admin") return <Navigate to="/products" replace />;

//   return children;
// };

// export default AdminRoute;
// src/components/AdminRoute.jsx
// import { Navigate } from "react-router-dom";

// const AdminRoute = ({ children }) => {
//   const user = JSON.parse(sessionStorage.getItem("user"));

//   if (!user) return <Navigate to="/login" />;

//   return user.role === "admin" ? children : <Navigate to="/" />;
// };

// export default AdminRoute;

import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const user = JSON.parse(sessionStorage.getItem("user"));

  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;


