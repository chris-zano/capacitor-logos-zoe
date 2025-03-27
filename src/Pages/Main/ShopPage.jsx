import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import "../../styles/shop.css";
import Landing from "../../Components/ShopComponents/LandingComponent.jsx";
import Checkout from "../../Components/ShopComponents/CheckoutComponent.jsx";
import Details from "../../Components/ShopComponents/DetailsComponent.jsx";

const ShopPage = () => {
  const location = useLocation();
  const fileUrl =
    location.pathname === "/shop" ? "shop" : location.pathname.split("/")[2];

  return (
    <div className="shop-page">
      {fileUrl === "shop" && <Landing />}
      {fileUrl === "landing" && <Landing />}
      {fileUrl === "details" && <Details />}
    </div>
  );
};

export default ShopPage;
