import React, { createContext, useContext, useState } from 'react';
import config from '../config/config';
const AppContext = createContext();

const useAppContext = () => {
  return useContext(AppContext);
};

 const AppContextProvider = ({ children }) => {
  const [category, setCategory] = useState(config.CATEGORY_MAP[localStorage.getItem('category')]||'fee');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const updateCategory = (newCategory) => {
    localStorage.setItem('category', newCategory);
    setCategory(config.CATEGORY_MAP[newCategory]);
  };

  return (
    <AppContext.Provider
      value={{
        category,
        updateCategory, // Rename setCategory to updateCategory
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContextProvider, useAppContext };