import React, { createContext, useContext, useState } from 'react';

const ThemesContext = createContext();

export const ThemesProvider = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState("default");
  const [selectedavtar,setSelectedAvatar]=useState(" ")

  return (
    <ThemesContext.Provider value={{ selectedTheme, setSelectedTheme,selectedavtar,setSelectedAvatar }}>
      {children}
    </ThemesContext.Provider>
  );
};

export const useThemes = () => useContext(ThemesContext);
