import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const user = JSON.parse(sessionStorage.getItem("user"));

  if (!user || user.email !== "admin@gmail.com") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;


