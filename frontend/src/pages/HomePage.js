import React, { useState } from "react"; 
import { FaMoon, FaSearch, FaHeart, FaUser, FaSmile, FaSadTear, FaMeh, FaGrinStars } from "react-icons/fa";
import { useNavigate, Link } from 'react-router-dom';

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
  const [mood, setMood] = useState(null);
  const [quote, setQuote] = useState("");
  const [selectedMood, setSelectedMood] = useState(""); // Store selected mood
  const navigate = useNavigate();

  const moodOptions = [
    { icon: <FaSmile />, label: "Happy", color: "text-yellow-300" },
    { icon: <FaSadTear />, label: "Sad", color: "text-blue-300" },
    { icon: <FaMeh />, label: "Neutral", color: "text-gray-300" },
    { icon: <FaGrinStars />, label: "Excited", color: "text-green-300" },
  ];

  const handleMoodSelection = (selectedMood) => {
    setMood(selectedMood);
    setSelectedMood(selectedMood); // Set the selected mood
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
            <h2 className="text-xl font-semibold mb-2 flex items-center">
              <FaUser className="mr-2" /> Profile
            </h2>
            <p>Welcome back, Luna!</p>
          </div>

          <div 
            className="w-full md:w-1/4 bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105 cursor-pointer"
            onClick={() => navigate("/favorites")}
          >
            <h2 className="text-xl font-semibold mb-2 flex items-center">
              <FaHeart className="mr-2" /> Favorites
            </h2>
            <p>You have 5 favorite quotes.</p>
          </div>

          {/* Stylish Search Bar */}
          <div className="w-full md:w-1/2 bg-white rounded-full shadow-md p-3 flex items-center space-x-3 transition-transform hover:scale-105">
            <FaSearch className="text-purple-500 text-xl" />
            <input
              type="text"
              placeholder="Search for quotes..."
              className="w-full p-2 border-none rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-inner"
            />
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg mt-8">
          <h2 className="text-2xl font-bold mb-4">Quote of the Day</h2>
          <Link 
            to="/quote-detail" 
            state={{ quote }} // Pass the quote using state
            className={`block cursor-pointer ${quote ? '' : 'pointer-events-none opacity-50'}`} // Disable link if no quote
          >
            {quote ? (
              <blockquote className="text-xl italic text-purple-700 border-l-4 border-purple-500 pl-4">
                "{quote}"
              </blockquote>
            ) : (
              <p className="text-center text-gray-500">Select your mood to get a quote!</p>
            )}
            <p className="mt-2 text-right text-purple-600">- Random Author</p>
          </Link>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg mt-8">
          <h2 className="text-2xl font-bold mb-4">How are you feeling today?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {moodOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleMoodSelection(option.label)}
                className={`flex items-center space-x-2 p-3 rounded-full transition-colors ${selectedMood === option.label ? 'bg-purple-500 text-white' : 'bg-purple-100 hover:bg-purple-200'}`}
                aria-label={`Select ${option.label} mood`}
              >
                <span className={`text-2xl ${option.color}`}>{option.icon}</span>
                <span>{option.label}</span>
              </button>
            ))}
          </div>
          {selectedMood && (
            <p className="mt-4 text-center text-lg">
              You're feeling <span className="font-semibold">{selectedMood}</span> today!
            </p>
          )}
        </section>
      </main>

      <footer className="bg-purple-800 text-white text-center p-4">
        <p>&copy; 2024 LunaQ. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;