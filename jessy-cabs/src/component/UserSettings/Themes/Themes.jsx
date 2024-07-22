import React, { useState } from "react";
import axios from "axios";
import "./Themes.css";
import { useThemes } from "./ThemesContext";
import { APIURL } from "../../url";
import { IoCheckmarkOutline } from "react-icons/io5";

const Themes = () => {
  const apiUrl = APIURL;
  const { setSelectedTheme } = useThemes();
  const storedusertheme = JSON.parse(localStorage.getItem("selectedusertheme"));

  const [themeOne, setThemeOne] = useState(false);
  const [themeTwo, setThemeTwo] = useState(false);
  const [themeThree, setThemeThree] = useState(false);
  const [themeFour, setThemeFour] = useState(false);
  const [themeFive, setThemeFive] = useState(false);
  const [themeSix, setThemeSix] = useState(false);
  const [themeSeven, setThemeSeven] = useState(false);
  const [themeEight, setThemeEight] = useState(false);



  const handleThemeChange = async (theme, themeNo) => {
    const userid = localStorage.getItem('useridno');
    setSelectedTheme(theme);
    console.log(themeNo);
    if (themeNo == 1) {
      setThemeOne(true);
      setThemeTwo(false);
      setThemeThree(false);
      setThemeFour(false);
      setThemeFive(false);
      setThemeSix(false);
      setThemeSeven(false);
      setThemeEight(false);
    }
    else if (themeNo == 2) {
      setThemeTwo(true);
      setThemeOne(false);
      setThemeThree(false);
      setThemeFour(false);
      setThemeFive(false);
      setThemeSix(false);
      setThemeSeven(false);
      setThemeEight(false);
    }
    else if (themeNo == 3) {
      setThemeThree(true);
      setThemeOne(false);
      setThemeTwo(false);
      setThemeFour(false);
      setThemeFive(false);
      setThemeSix(false);
      setThemeSeven(false);
      setThemeEight(false);
    }
    else if (themeNo == 4) {
      setThemeFour(true);
      setThemeOne(false);
      setThemeTwo(false);
      setThemeThree(false);
      setThemeFive(false);
      setThemeSix(false);
      setThemeSeven(false);
      setThemeEight(false);
    }
    else if (themeNo == 5) {
      setThemeFive(true);
      setThemeOne(false);
      setThemeTwo(false);
      setThemeThree(false);
      setThemeFour(false);
      setThemeSix(false);
      setThemeSeven(false);
      setThemeEight(false);
    }
    else if (themeNo == 6) {
      setThemeSix(true);
      setThemeOne(false);
      setThemeTwo(false);
      setThemeThree(false);
      setThemeFour(false);
      setThemeFive(false);
      setThemeSeven(false);
      setThemeEight(false);
    }
    else if (themeNo == 7) {
      setThemeSeven(true);
      setThemeOne(false);
      setThemeTwo(false);
      setThemeThree(false);
      setThemeFour(false);
      setThemeFive(false);
      setThemeSix(false);
      setThemeEight(false);
    }
    else if (themeNo == 8) {
      setThemeEight(true);
      setThemeOne(false);
      setThemeTwo(false);
      setThemeThree(false);
      setThemeFour(false);
      setThemeFive(false);
      setThemeSix(false);
      setThemeSeven(false);
    }

    localStorage.removeItem("selectedusertheme");
    await axios.post(`${apiUrl}/updatethemename`, {
      userid: userid,
      theme: theme
    });
  };

  return (
    <div className="themes">
      <div className="theme-options-main">
        <h2 className="Theme-Title">Select Your Theme</h2>
        <div className="theme-options">
          <div
            className={`theme-image ${themeOne || storedusertheme == 'theme1' ? "theme-active" : ""}`}
            onClick={() => handleThemeChange("theme1", 1)}
          >
            {themeOne || storedusertheme == 'theme1' ? (
              <span style={{ position: 'absolute', top: '5px', left: '5px', backgroundColor: '#0000ff8c', borderRadius: '50%', height: '24px', width: '24px', padding: '5px' }}><IoCheckmarkOutline style={{ backgroundColor: 'blue', color: 'white', padding: '4px', borderRadius: '50%' }} /></span>
            ) : (
              <span style={{ position: 'absolute', top: '5px', left: '5px' }}>
                <span style={{ width: '15px', height: '15px', display: 'block', border: '1px solid', borderRadius: '50%' }}></span>
              </span>
            )}
            <img src="https://nastaf.com/themes/theme-1.jpg" alt="Theme 1" />
            <p>Beach Sunrise</p>
          </div>
          <div
            className={`theme-image ${themeTwo || storedusertheme == 'theme2' ? "theme-active" : ""}`}
            onClick={() => handleThemeChange("theme2", 2)}
          >
            {themeTwo || storedusertheme == 'theme2' ? (
              <span style={{ position: 'absolute', top: '5px', left: '5px' }}><IoCheckmarkOutline style={{ backgroundColor: 'blue', color: 'white', padding: '4px', borderRadius: '50%' }} /></span>
            ) : (
              <span style={{ position: 'absolute', top: '5px', left: '5px' }}>
                <span style={{ width: '15px', height: '15px', display: 'block', border: '1px solid', borderRadius: '50%' }}></span>
              </span>
            )}

            <img src="https://nastaf.com/themes/theme-2.jpg" alt="Theme 2" />
            <p>Evening City </p>
          </div>
          <div
            className={`theme-image ${themeThree || storedusertheme == 'theme3' ? "theme-active" : ""}`}
            onClick={() => handleThemeChange("theme3", 3)}
          >
            {themeThree || storedusertheme == 'theme3' ? (
              <span style={{ position: 'absolute', top: '5px', left: '5px' }}><IoCheckmarkOutline style={{ backgroundColor: 'blue', color: 'white', padding: '4px', borderRadius: '50%' }} /></span>
            ) : (
              <span style={{ position: 'absolute', top: '5px', left: '5px' }}>
                <span style={{ width: '15px', height: '15px', display: 'block', border: '1px solid', borderRadius: '50%' }}></span>
              </span>
            )}

            <img src="https://nastaf.com/themes/theme-3.jpg" alt="Theme 3" />
            <p>Afternoon City </p>
          </div>

          <div
            className={`theme-image ${themeFour || storedusertheme == 'theme4' ? "theme-active" : ""}`}
            onClick={() => handleThemeChange("theme4", 4)}
          >
            {themeFour || storedusertheme == 'theme4' ? (
              <span style={{ position: 'absolute', top: '5px', left: '5px' }}><IoCheckmarkOutline style={{ backgroundColor: 'blue', color: 'white', padding: '4px', borderRadius: '50%' }} /></span>
            ) : (
              <span style={{ position: 'absolute', top: '5px', left: '5px' }}>
                <span style={{ width: '15px', height: '15px', display: 'block', border: '1px solid', borderRadius: '50%' }}></span>
              </span>
            )}

            <img src="https://nastaf.com/themes/theme-4.jpg" alt="Theme 4" />
            <p>Night City </p>
          </div>
        </div>
        <div className="theme-options">
          <div
            className={`theme-image ${themeFive || storedusertheme == 'theme5' ? "theme-active" : ""}`}
            onClick={() => handleThemeChange("theme5", 5)}
          >
            {themeFive || storedusertheme == 'theme5' ? (
              <span style={{ position: 'absolute', top: '5px', left: '5px' }}><IoCheckmarkOutline style={{ backgroundColor: 'blue', color: 'white', padding: '4px', borderRadius: '50%' }} /></span>
            ) : (
              <span style={{ position: 'absolute', top: '5px', left: '5px' }}>
                <span style={{ width: '15px', height: '15px', display: 'block', border: '1px solid', borderRadius: '50%' }}></span>
              </span>
            )}
            <img src="https://nastaf.com/themes/theme-5.jpg" alt="Theme 5" />
            <p>Art</p>
          </div>
          <div
            className={`theme-image ${themeSix || storedusertheme == 'theme6' ? "theme-active" : ""}`}
            onClick={() => handleThemeChange("theme6", 6)}
          >
            {themeSix || storedusertheme == 'theme6' ? (
              <span style={{ position: 'absolute', top: '5px', left: '5px' }}><IoCheckmarkOutline style={{ backgroundColor: 'blue', color: 'white', padding: '4px', borderRadius: '50%' }} /></span>
            ) : (
              <span style={{ position: 'absolute', top: '5px', left: '5px' }}>
                <span style={{ width: '15px', height: '15px', display: 'block', border: '1px solid', borderRadius: '50%' }}></span>
              </span>
            )}
            <img src="https://nastaf.com/themes/theme-6.jpg" alt="Theme 6" />
            <p>Robot City </p>
          </div>
          <div
            className={`theme-image ${themeSeven || storedusertheme == 'theme7' ? "theme-active" : ""}`}
            onClick={() => handleThemeChange("theme7", 7)}
          >
            {themeSeven || storedusertheme == 'theme7' ? (
              <span style={{ position: 'absolute', top: '5px', left: '5px' }}><IoCheckmarkOutline style={{ backgroundColor: 'blue', color: 'white', padding: '4px', borderRadius: '50%' }} /></span>
            ) : (
              <span style={{ position: 'absolute', top: '5px', left: '5px' }}>
                <span style={{ width: '15px', height: '15px', display: 'block', border: '1px solid', borderRadius: '50%' }}></span>
              </span>
            )}
            <img src="https://nastaf.com/themes/theme-7.jpg" alt="Theme 7" />
            <p>Green grass</p>
          </div>

          <div
            className={`theme-image ${themeEight || storedusertheme == 'theme8' ? "theme-active" : ""}`}
            onClick={() => handleThemeChange("theme8", 8)}
          >
            {themeEight || storedusertheme == 'theme8' ? (
              <span style={{ position: 'absolute', top: '5px', left: '5px' }}><IoCheckmarkOutline style={{ backgroundColor: 'blue', color: 'white', padding: '4px', borderRadius: '50%' }} /></span>
            ) : (
              <span style={{ position: 'absolute', top: '5px', left: '5px' }}>
                <span style={{ width: '15px', height: '15px', display: 'block', border: '1px solid', borderRadius: '50%' }}></span>
              </span>
            )}
            <img src="https://nastaf.com/themes/theme-8.jpg" alt="Theme 8" />
            <p>nature painting</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Themes;
