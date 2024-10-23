// FavoritesPage.js
import React, { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext'; // Adjust the path as needed

const FavoritesPage = () => {
  const { favorites } = useContext(FavoritesContext); // Access favorites from context

  return (
    <div className="min-h-screen bg-purple-100 text-purple-900 flex flex-col">
      <header className="bg-purple-600 text-white p-4 shadow-lg">
        <h1 className="text-3xl font-bold text-center">Favorites</h1>
      </header>

      <main className="container mx-auto p-4 flex-grow">
        {favorites.length === 0 ? (
          <p className="text-center text-lg">No favorite quotes yet!</p>
        ) : (
          <ul className="list-disc">
            {favorites.map((quote, index) => (
              <li key={index} className="mb-2">
                <blockquote className="text-xl italic text-purple-700">
                  "{quote}"
                </blockquote>
              </li>
            ))}
          </ul>
        )}
      </main>

    
    </div>
  );
};

export default FavoritesPage;