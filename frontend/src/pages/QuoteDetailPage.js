import React, { useContext } from 'react';
import { FaHeart, FaDownload, FaShareAlt } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext'; // Import the context

const QuoteDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToFavorites } = useContext(FavoritesContext); // Use context to access addToFavorites
  const quote = location.state?.quote;

  const handleAddToFavorites = () => {
    if (quote) {
      addToFavorites(quote); // Call context function to add quote to favorites
      console.log("Added to favorites:", quote);
    }
  };

  const handleDownloadQuote = () => {
    const element = document.createElement("a");
    const file = new Blob([quote], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "quote.txt";
    document.body.appendChild(element);
    element.click();
  };

  const handleShareQuote = () => {
    if (navigator.share) {
      navigator.share({
        title: 'LunaQ Quote',
        text: quote,
      })
      .catch(error => console.log('Error sharing', error));
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  return (
    <div className="min-h-screen bg-purple-100 text-purple-900 flex flex-col">
      <header className="bg-purple-600 text-white p-4 shadow-lg flex justify-between">
        <h1 className="text-3xl font-bold">Quote Detail</h1>
        <button
          className="text-white bg-purple-800 p-2 rounded-lg hover:bg-purple-900"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </header>

      <main className="container mx-auto p-4 flex-grow">
        <section className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg mt-8 text-center">
          <blockquote className="text-2xl italic text-purple-700 mb-4 border-l-4 border-purple-500 pl-4">
            "{quote}"
          </blockquote>

          <div className="flex justify-center gap-6 mt-4">
            <button
              className="bg-purple-500 text-white p-3 rounded-full hover:bg-purple-700"
              onClick={handleAddToFavorites}
            >
              <FaHeart className="inline-block mr-2" /> Add to Favorites
            </button>
            <button
              className="bg-purple-500 text-white p-3 rounded-full hover:bg-purple-700"
              onClick={handleDownloadQuote}
            >
              <FaDownload className="inline-block mr-2" /> Download
            </button>
            <button
              className="bg-purple-500 text-white p-3 rounded-full hover:bg-purple-700"
              onClick={handleShareQuote}
            >
              <FaShareAlt className="inline-block mr-2" /> Share
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-purple-800 text-white text-center p-4">
        <p>&copy; 2024 LunaQ. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default QuoteDetailPage;
