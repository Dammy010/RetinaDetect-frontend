import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import AboutPage from "../pages/AboutPage";
import HowItWorks from "../pages/HowItWorks";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import PredictPage from "../pages/PredictPage";
import PredictionHistory from "../pages/PredictionHistory";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Checking authentication...</p>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/predict"
        element={
          <PrivateRoute>
            <PredictPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/history"
        element={
          <PrivateRoute>
            <PredictionHistory />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
