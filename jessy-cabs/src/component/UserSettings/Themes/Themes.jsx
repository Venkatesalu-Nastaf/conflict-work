import React, { useState } from 'react';
import './Themes.css'; // Import your CSS file for styling

const Themes = () => {
  const [selectedTheme, setSelectedTheme] = useState(null);

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
  };

  return (
    <div className={`themes ${selectedTheme}`}>
      <div className="theme-options">
        <img
          src="theme1.jpg"
          alt="Theme 1"
          onClick={() => handleThemeChange('theme1')}
        />
        <img
          src="theme2.jpg"
          alt="Theme 2"
          onClick={() => handleThemeChange('theme2')}
        />
        {/* Add more theme options */}
      </div>
    </div>
  );
};

export default Themes;
