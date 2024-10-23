import React, { useState, useContext } from "react";  
import { FaMoon, FaSearch, FaHeart, FaUser, FaSmile, FaSadTear, FaMeh, FaGrinStars } from "react-icons/fa";
import { useNavigate, Link } from 'react-router-dom';
import { FavoritesContext } from "../context/FavoritesContext"; // Assuming you have context for favorites

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
  const [rating, setRating] = useState(0); // For rating feedback
  const [comments, setComments] = useState(""); // For comments feedback
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false); // To show confirmation message
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

  const { favorites } = useContext(FavoritesContext); // Get favorites from context

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    // Handle the feedback submission logic (e.g., send it to the backend or store locally)
    console.log({ rating, comments });

    // Reset the form and show the confirmation message
    setRating(0);
    setComments("");
    setFeedbackSubmitted(true);
    
    // Optionally, you can also send feedback to a backend or analytics
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
          <div>
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            <FaHeart className="mr-2" /> Favorites</h2>
          <p>
            You have <span className="font-bold">{favorites.length}</span> favorite quotes.
          </p>
        </div>
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

        <section className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg mt-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Feedback</h2>

            {!feedbackSubmitted ? (
              <form onSubmit={handleFeedbackSubmit}>
                <label className="block mb-2 text-lg font-semibold">Rate this quote:</label>
                <div className="flex space-x-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className={`text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                    >
                      &#9733;
                    </button>
                  ))}
                </div>

                <label className="block mb-2 text-lg font-semibold">Comments:</label>
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                  rows="4"
                  placeholder="Share your thoughts..."
                ></textarea>

                <button
                  type="submit"
                  className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-all"
                >
                  Submit Feedback
                </button>
              </form>
            ) : (
              <p className="text-green-500 font-semibold mt-4">Thank you for your feedback!</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
