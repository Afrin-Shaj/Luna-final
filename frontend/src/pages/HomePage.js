// HomePage.js
import React, { useState } from "react";  
import { FaMoon, FaSearch, FaHeart, FaUser, FaSmile, FaSadTear, FaMeh, FaGrinStars } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // Import the context

const quotesData = {
  Happy: [
    "The best way to predict the future is to create it.",
    "Happiness is not by chance, but by choice."
  ],
  Sad: [
    "Tears come from the heart and not from the brain.",
    "The sun will rise and we will try again."
  ],
  Neutral: [
    "Sometimes you win, sometimes you learn.",
    "The only limit to our realization of tomorrow will be our doubts of today."
  ],
  Excited: [
    "The future belongs to those who believe in the beauty of their dreams.",
    "Excitement is the key to creativity."
  ],
};

const HomePage = () => {
  const { profile } = useUser(); // Get profile from context
  const [mood, setMood] = useState(null);
  const [quote, setQuote] = useState("");
  const [selectedMood, setSelectedMood] = useState(""); 
  const navigate = useNavigate();

  const moodOptions = [
    { icon: <FaSmile />, label: "Happy", color: "text-yellow-300" },
    { icon: <FaSadTear />, label: "Sad", color: "text-blue-300" },
    { icon: <FaMeh />, label: "Neutral", color: "text-gray-300" },
    { icon: <FaGrinStars />, label: "Excited", color: "text-green-300" },
  ];

  const handleMoodSelection = (selectedMood) => {
    setMood(selectedMood);
    setSelectedMood(selectedMood);
    const randomQuote = quotesData[selectedMood][Math.floor(Math.random() * quotesData[selectedMood].length)];
    setQuote(randomQuote);
  };

  return (
    <div className="min-h-screen bg-purple-100 text-purple-900 flex flex-col">
      <header className="bg-purple-600 text-white p-6 shadow-lg flex items-center justify-center">
        <FaMoon className="mr-2 text-3xl" />
        <h1 className="text-4xl font-bold">LunaQ</h1>
      </header>

      <main className="container mx-auto p-4 flex-grow">
        <section className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div 
            className="w-full md:w-1/4 bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105 cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            <h2 className="text-xl font-semibold mb-2">User Profile</h2>
            <p>Name: {profile.name}</p>
            <p>Email: {profile.email}</p>
            <p>Preferences: {profile.preferences}</p>
            <p>Religion: {profile.religion}</p>
            <p>Interest: {profile.interest}</p>
            <p>Profession: {profile.profession}</p>
          </div>

          <div className="w-full md:w-3/4 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Choose Your Mood</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {moodOptions.map((option) => (
                <div 
                  key={option.label}
                  className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition duration-200 ${option.color} hover:scale-105`}
                  onClick={() => handleMoodSelection(option.label)}
                >
                  {option.icon}
                  <span className="mt-2">{option.label}</span>
                </div>
              ))}
            </div>

            {quote && (
              <div className="mt-6 p-4 border border-purple-300 rounded-lg">
                <h3 className="text-xl font-semibold">Your Quote:</h3>
                <p className="italic">"{quote}"</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-purple-800 text-white text-center p-4">
        <p>&copy; 2024 LunaQ. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
