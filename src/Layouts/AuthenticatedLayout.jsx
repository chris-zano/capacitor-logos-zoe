import { Outlet, useNavigate } from "react-router-dom";
import {App as CapacitorApp} from "@capacitor/app"
import AppBarComponent from "../Components/AppBar.jsx";
import BottomNavBarComponent from "../Components/BottomNavBar.jsx";
import { useEffect } from "react";

const AuthenticatedLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Listen for the backButton event
    CapacitorApp.addListener("backButton", (event) => {
      // Prevent app from closing on back press
      if (window.location.pathname === "/" || window.location.pathname === "/auth/welcome") {
        CapacitorApp.exitApp(); // Close the app only on specific routes (home/welcome)
      } else {
        navigate(-1); // Go back to the previous route
      }
    });

    // Clean up the event listener when component unmounts
    return () => {
      CapacitorApp.removeAllListeners();
    };
  }, [navigate]);
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
