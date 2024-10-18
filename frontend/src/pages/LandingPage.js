import React from "react"; 
import { FaMoon } from "react-icons/fa"; // Import the half-moon icon
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const LandingPage = () => {
  const navigate = useNavigate(); // Create a navigate function

  const handleNavigate = () => {
    navigate('/login'); // Change '/login' to your LoginSignupPage route
  };

  return (
    <div className="min-h-screen bg-purple-100 font-sans">
      <header className="relative h-screen flex items-center justify-center bg-purple-800 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
          }}
        ></div>
        <div className="absolute inset-0 bg-purple-900 opacity-75"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-6xl font-bold mb-4 animate-fade-in-down flex items-center justify-center">
            <FaMoon className="mr-2 text-6xl" /> {/* Add the half-moon icon */}
            LunaQ
          </h1>
          <p className="text-2xl mb-8 animate-fade-in-up">
            Discover Inspiring Quotes Tailored Just for You
          </p>
          <button
            onClick={handleNavigate} // Update onClick to call handleNavigate
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          >
            Get Started
          </button>
        </div>
      </header>
    </div>
  );
};

export default LandingPage;
