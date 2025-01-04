import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import WelcomePage from "./Pages/Welcome/WelcomePage.jsx";
import SignInPage from "./Pages/Auth/SignInPage.jsx";
import SignUpPage from "./Pages/Auth/SignUpPage.jsx";
import ForgotPasswordPage from "./Pages/Auth/ForgotPassword.jsx";
import VerifyCodePage from "./Pages/Auth/VerifyCode.jsx";
import VerifyEmailPage from "./Pages/Auth/VerifyEmail.jsx";
import ResetPasswordPage from "./Pages/Auth/ResetPassword.jsx";
import AuthenticatedLayout from "./Layouts/AuthenticatedLayout.jsx";
import HomePage from "./Pages/Main/HomePage.jsx";
import ExplorePage from "./Pages/Main/ExplorePage.jsx";
import BroadcastPage from "./Pages/Main/BroadcastsPage.jsx";
import ShopPage from "./Pages/Main/ShopPage.jsx";
import DonatePage from "./Pages/Main/DonatePage.jsx";
import ProfilePage from "./Pages/Profile/ProfilePage.jsx";
import SearchPage from "./Pages/Search/SearchPage.jsx";
import Landing from "./Components/ShopComponents/LandingComponent.jsx";
import Details from "./Components/ShopComponents/DetailsComponent.jsx";
import Checkout from "./Components/ShopComponents/CheckoutComponent.jsx";
import DonationPage from "./Components/DonateComponents/DonationComponent.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Welcome Route */}
        <Route path="/welcome" element={<WelcomePage />} />

        {/* Auth Routes */}
        <Route path="/auth">
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="verify-code" element={<VerifyCodePage />} />
          <Route path="verify-email" element={<VerifyEmailPage />} />
          <Route path="new-password" element={<ResetPasswordPage />} />
        </Route>

        {/* Authenticated Layout */}
        <Route path="/" element={<AuthenticatedLayout />}>
          <Route index element={<HomePage />} />
          {/* Broadcasts Route */}
          <Route path="/broadcast" element={<BroadcastPage />}>
            <Route path="podcasts" element={<BroadcastPage />} />
            <Route path="word-of-power" element={<BroadcastPage />} />
            <Route path="wisdom-nuggets" element={<BroadcastPage />} />
            <Route path="motivationals" element={<BroadcastPage />} />
            <Route path="inspirational" element={<BroadcastPage />} />
            <Route path="testimony-of-jesus" element={<BroadcastPage />} />
          </Route>
          <Route path="explore" element={<ExplorePage />} />
          <Route path="shop" element={<ShopPage />}>
            <Route path="landing" element={<ShopPage />} />
            <Route path="details/:id" element={<ShopPage />} />
            <Route path="checkout" element={<ShopPage />} />
          </Route>
          <Route path="donate" element={<DonatePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
          <Route path="donations/donate" element={<DonationPage />} />

        {/* <Route path="/broadcast"  /> */}

      </Routes>
    </Router>
  );
}

export default App;
