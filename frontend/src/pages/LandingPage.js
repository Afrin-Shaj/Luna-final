import React, { useState, useEffect } from 'react';
import { FaMoon } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleNavigate = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-purple-100 font-sans overflow-hidden">
      <header className="relative h-screen flex items-center justify-center bg-purple-800 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center transform scale-110 transition-transform duration-10000 ease-in-out hover:scale-100"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
          }}
        ></div>
        <div className="absolute inset-0 bg-purple-900 opacity-75"></div>
        <div className={`relative z-10 text-center transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="text-6xl font-bold mb-4 flex items-center justify-center">
            <FaMoon className="mr-2 text-6xl animate-pulse" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              LunaQ
            </span>
          </h1>
          <p className="text-2xl mb-8 animate-fadeIn">
            Discover Inspiring Quotes Tailored Just for You
          </p>
          <button
            onClick={handleNavigate}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 animate-bounce"
          >
            Get Started
          </button>
        </div>
      </header>
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          className="relative block w-full h-16"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="fill-purple-100"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default LandingPage;