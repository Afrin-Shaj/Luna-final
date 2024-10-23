import React, { createContext, useState } from 'react';

export const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (quote) => {
    setFavorites((prevFavorites) => [...prevFavorites, quote]);
    console.log('Favorites Updated: ', favorites);
  };

  const removeFromFavorites = (quote) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav !== quote)
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;
