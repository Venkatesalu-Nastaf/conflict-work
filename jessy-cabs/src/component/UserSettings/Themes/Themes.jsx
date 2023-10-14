import React from 'react';
import './Themes.css';
import { useThemes } from './ThemesContext'; // Import the useThemes hook

const Themes = () => {
  const { setSelectedTheme } = useThemes();

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
  };

  return (
    <div className="themes">
      <div className='theme-options-main'>
        <h2 className='Theme-Title'>Select Your Theme</h2>
        <div className="theme-options">
          <div className='theme-image'
            onClick={() => handleThemeChange('theme1')}
          >
            <img
              src="https://images.pexels.com/photos/3601426/pexels-photo-3601426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Theme 1"
            />
            <p>Beach Sunrise</p>
          </div>
          <div className='theme-image'
            onClick={() => handleThemeChange('theme2')}
          >
            <img
              src="https://images.pexels.com/photos/4039921/pexels-photo-4039921.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Theme 2"
            />
            <p>Evening City </p>
          </div>
          <div className='theme-image'
            onClick={() => handleThemeChange('theme3')}
          >
            <img
              src="https://images.pexels.com/photos/1036657/pexels-photo-1036657.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Theme 3"
            />
            <p>Afternoon City </p>
          </div>

          <div className='theme-image'
            onClick={() => handleThemeChange('theme4')}
          >
            <img
              src="https://images.pexels.com/photos/2816903/pexels-photo-2816903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Theme 4"
            />
            <p>Night City </p>
          </div>
        </div>
        <div className="theme-options">
          <div className='theme-image'
            onClick={() => handleThemeChange('theme5')}
          >
            <img
              src="https://images.pexels.com/photos/7476134/pexels-photo-7476134.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Theme 5"
            />
            <p>Art</p>
          </div>
          <div className='theme-image'
            onClick={() => handleThemeChange('theme6')}
          >
            <img
              src="https://images2.alphacoders.com/131/1311486.jpg"
              alt="Theme 6"
            />
            <p>Robot City </p>
          </div>
          <div className='theme-image'
            onClick={() => handleThemeChange('theme7')}
          >
            <img
              src="https://cdn.pixabay.com/photo/2017/10/10/07/48/hills-2836301_1280.jpg"
              alt="Theme 7"
            />
            <p>Green grass</p>
          </div>

          <div className='theme-image'
            onClick={() => handleThemeChange('theme8')}
          >
            <img
              src="https://i.pinimg.com/564x/5a/07/e4/5a07e41bcec71b2985edeb6a0e885461.jpg"
              alt="Theme 8"
            />
            <p>nature painting</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Themes;
