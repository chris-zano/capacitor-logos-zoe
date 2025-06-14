import React, { useEffect } from "react";
import {
  HashRouter as Router, // Changed import to HashRouter
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { App as CapacitorApp } from "@capacitor/app";
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
import DevotionalPage from "./Pages/Devotional/DevotionalPage.jsx";
import CategoryChapter from "./Pages/Categories/CategoriesChaptes.jsx";
import CategoryContent from "./Pages/Categories/CategoryContent.jsx";
import CategoryArticle from "./Pages/Categories/CategoryArticle.jsx";
import ArticlePage from "./Pages/Articles/ArticlePage.jsx";
import PrayerRequestForm from "./Pages/PrayerCenter/PrayerCenter.jsx";
import Devotionals from "./Pages/Devotional/Devotionals.jsx";
import VideoPlayerPage from "./Pages/Videos/VideoPlayerPage.jsx";
import NotificationApi from "./NativeApis/Notifications.jsx";
import BibleContents from "./Pages/Bible/BibleContents.jsx";
import ChooseProfileAvatar from "./Pages/Profile/UploadProfilePicture.jsx";
import Bookmarks from "./Pages/Profile/Bookmarks.jsx";
import AboutUsPage from "./Pages/Profile/AboutPage.jsx";
import BibleChapters from "./Pages/Bible/BibleChapters.jsx";
import BookContent from "./Pages/Bible/BookContent.jsx";
import ScrollToTop from "./Components/ScrollToTop.jsx";
import OneTimeDonationPage from "./Components/DonateComponents/OneTimeDonation.jsx";
import DonationDetailsPage from "./Components/DonateComponents/DonationDetailsPage.jsx";
import FaqPage from "./Pages/Profile/FaqPage.jsx";
import PrivacyPolicyPage from "./Pages/Profile/PrivacyPolicyPage.jsx";
import ErrorBoundary from "./Components/ErrorBoundary.jsx";
import NotFoundPage from "./Components/404Component.jsx";
import EditProfilePage from "./Pages/Profile/EditProfilePage.jsx";

function App() {
  useEffect(() => {
    CapacitorApp.addListener("backButton", (event) => {
      if (
        window.location.hash === "#/auth/welcome" ||
        window.location.hash === "#/"
      ) {
        CapacitorApp.exitApp();
      } else {
        window.history.back();
      }
    });
    return () => {
      CapacitorApp.removeAllListeners();
    };
  }, []);
  return (
    <>
      {/* scroll to top */}
      <ScrollToTop />
      <ErrorBoundary>
        <Routes>
          {/* Auth Routes */}
          <Route path="/auth">
            <Route path="welcome" element={<WelcomePage />} />

            <Route path="login" element={<SignInPage />} />

            <Route path="register" element={<SignUpPage />} />

            <Route path="forgot-password" element={<VerifyEmailPage />} />

            <Route path="verify-code" element={<VerifyCodePage />} />

            <Route path="verify-email" element={<VerifyEmailPage />} />

            <Route path="new-password" element={<ResetPasswordPage />} />
          </Route>

          {/* Authenticated Layout */}
          <Route path="/" element={<AuthenticatedLayout />}>
            <Route index element={<HomePage />} />

            {/* Broadcasts Route */}
            <Route path="/broadcast" element={<BroadcastPage />}>
              <Route path="podcast" element={<BroadcastPage />} />

              <Route path="word-of-faith" element={<BroadcastPage />} />

              <Route path="prayers" element={<BroadcastPage />} />

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

            <Route path="avatars" element={<ChooseProfileAvatar />} />

            <Route path="bookmarks" element={<Bookmarks />} />
          </Route>
          <Route path="donations/donate" element={<DonationPage />} />

          <Route path="donations/one-time" element={<OneTimeDonationPage />} />

          <Route path="donations/details" element={<DonationDetailsPage />} />

          <Route
            path="/devotionals/devotional/:id"
            element={<DevotionalPage />}
          />

          <Route path="/categories/:id" element={<CategoryContent />} />

          <Route path="/categories/article/:id" element={<CategoryArticle />} />

          <Route path="/categories/chapters/:id" element={<CategoryChapter />} />

          <Route path="/articles/article/:id" element={<ArticlePage />} />

          <Route path="/prayer-center" element={<PrayerRequestForm />} />

          <Route path="/devotionals" element={<Devotionals />} />

          <Route path="/bible" element={<BibleContents />} />

          <Route path="/bible/chapters/:book" element={<BibleChapters />} />

          <Route path="/bible/verses/:book/:chapter" element={<BookContent />} />

          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/faqs" element={<FaqPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route
            path="/videos/video/:id/:category"
            element={<VideoPlayerPage />}
          />
          {/* catch all route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
}

export default App;