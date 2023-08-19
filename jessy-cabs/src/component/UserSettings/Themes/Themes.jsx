import React from 'react';
import './Themes.css';

const Themes = ({ handleThemeChange }) => {
  return (
    <div className="themes">
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
