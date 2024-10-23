import React from "react"; 
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ProfileProvider } from './context/ProfileContext';
import  FavoritesProvider  from './context/FavoritesContext';
import { AuthProvider } from './context/AuthContext';

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";  // Updated to use LoginPage
import SignupPage from "./pages/SignupPage"; // New SignupPage component
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import FavoritesPage from "./pages/FavoritesPage";
import QuoteDetailPage from './pages/QuoteDetailPage';
import UserInputPage from "./pages/UserInputPage";
import ForgotPassword from './component/ForgotPassword';
import ResetPassword from './component/ResetPassword';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Public Route Component (redirects to homepage if already logged in)
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (token) {
    return <Navigate to="/homepage" replace />;
  }
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <ProfileProvider>
        <FavoritesProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route 
                path="/" 
                element={
                  <PublicRoute>
                    <LandingPage />
                  </PublicRoute>
                } 
              />
              <Route 
                path="/login" 
                element={
                  <PublicRoute>
                    <LoginPage />  // Updated to use LoginPage
                  </PublicRoute>
                } 
              />
              <Route 
                path="/signup" 
                element={
                  <PublicRoute>
                    <SignupPage />  // New SignupPage route
                  </PublicRoute>
                } 
              />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />

              {/* Protected Routes */}
              <Route 
                path="/homepage" 
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/favorites" 
                element={
                  <ProtectedRoute>
                    <FavoritesPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/quote-detail" 
                element={
                  <ProtectedRoute>
                    <QuoteDetailPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/user-input" 
                element={
                  <ProtectedRoute>
                    <UserInputPage />
                  </ProtectedRoute>
                } 
              />

              {/* Catch all route - redirect to landing page */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </FavoritesProvider>
      </ProfileProvider>
    </AuthProvider>
  );
};

export default App;
