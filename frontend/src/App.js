import React from "react"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from './context/UserContext'; // Import the UserProvider
import { FavoritesProvider } from './context/FavoritesContext'; // Import the FavoritesProvider
import LandingPage from "./pages/LandingPage";
import LoginSignupPage from "./pages/LoginSignupPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage"; // To be created
import FavoritesPage from "./pages/FavoritesPage"; // To be created
import QuoteDetailPage from './pages/QuoteDetailPage';

const App = () => {
  return (
    <UserProvider> {/* Wrap the Router with UserProvider */}
      <FavoritesProvider> {/* Wrap the Router with FavoritesProvider */}
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginSignupPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/quote-detail" element={<QuoteDetailPage />} />
          </Routes>
        </Router>
      </FavoritesProvider>
    </UserProvider>
  );
};

export default App;
