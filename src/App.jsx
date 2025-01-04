import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
          <Route path="explore" element={<ExplorePage />} />
          <Route path="broadcast" element={<BroadcastPage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="donate" element={<DonatePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
