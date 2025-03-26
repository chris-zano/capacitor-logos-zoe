import { Outlet, useNavigate } from "react-router-dom";
import AppBarComponent from "../Components/AppBar.jsx";
import BottomNavBarComponent from "../Components/BottomNavBar.jsx";

const AuthenticatedLayout = () => {
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
