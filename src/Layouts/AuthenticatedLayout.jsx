import { Outlet, useNavigate } from "react-router-dom";
import AppBarComponent from "../Components/AppBar.jsx";
import BottomNavBarComponent from "../Components/BottomNavBar.jsx";

const AuthenticatedLayout = () => {
  const user = JSON.parse(localStorage.getItem("user-data"));
  const navigate = useNavigate()

  if (!user) {
    navigate("/auth/welcome");
    return null;
  }

  return (
    <>
      <AppBarComponent />
      <main id="container-main">
        <Outlet />
      </main>
      <BottomNavBarComponent />
    </>
  );
};

export default AuthenticatedLayout;
