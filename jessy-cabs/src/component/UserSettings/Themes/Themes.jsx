import React, { useState } from "react";
import axios from "axios";
import "./Themes.css";
import { useThemes } from "./ThemesContext";
import { APIURL } from "../../url";
import { IoCheckmarkOutline } from "react-icons/io5";

const Themes = () => {
  const apiUrl = APIURL;
  const { setSelectedTheme ,selectedTheme} = useThemes();
  // const storedusertheme = JSON.parse(localStorage.getItem("selectedusertheme"));
// const [storedusertheme,setStoredusertheme]=useState(JSON.parse(localStorage.getItem("selectedusertheme")))
  const [themeOne, setThemeOne] = useState(false);
  const [themeTwo, setThemeTwo] = useState(false);
  const [themeThree, setThemeThree] = useState(false);
  const [themeFour, setThemeFour] = useState(false);
  const [themeFive, setThemeFive] = useState(false);
  const [themeSix, setThemeSix] = useState(false);
  const [themeSeven, setThemeSeven] = useState(false);
  const [themeEight, setThemeEight] = useState(false);
  console.log('sssss',typeof(selectedTheme));
  // useEffect(()=>{
  //   setStoredusertheme(JSON.parse(localStorage.getItem("selectedusertheme")));

  // },[selectedTheme])



  const handleThemeChange = async (theme, themeNo) => {
    
    console.log(theme,themeNo,'stheme');
    const userid = localStorage.getItem('useridno');
    setSelectedTheme(theme);
    
    if (themeNo === 1) {
      setThemeOne(true);
      setThemeTwo(false);
      setThemeThree(false);
      setThemeFour(false);
      setThemeFive(false);
      setThemeSix(false);
      setThemeSeven(false);
      setThemeEight(false);
    }
    else if (themeNo === 2) {
      setThemeTwo(true);
      setThemeOne(false);
      setThemeThree(false);
      setThemeFour(false);
      setThemeFive(false);
      setThemeSix(false);
      setThemeSeven(false);
      setThemeEight(false);
    }
    else if (themeNo === 3) {
      setThemeThree(true);
      setThemeOne(false);
      setThemeTwo(false);
      setThemeFour(false);
      setThemeFive(false);
      setThemeSix(false);
      setThemeSeven(false);
      setThemeEight(false);
    }
    else if (themeNo === 4) {
      setThemeFour(true);
      setThemeOne(false);
      setThemeTwo(false);
      setThemeThree(false);
      setThemeFive(false);
      setThemeSix(false);
      setThemeSeven(false);
      setThemeEight(false);
    }
    else if (themeNo === 5) {
      setThemeFive(true);
      setThemeOne(false);
      setThemeTwo(false);
      setThemeThree(false);
      setThemeFour(false);
      setThemeSix(false);
      setThemeSeven(false);
      setThemeEight(false);
    }
    else if (themeNo === 6) {
      setThemeSix(true);
      setThemeOne(false);
      setThemeTwo(false);
      setThemeThree(false);
      setThemeFour(false);
      setThemeFive(false);
      setThemeSeven(false);
      setThemeEight(false);
    }
    else if (themeNo === 7) {
      setThemeSeven(true);
      setThemeOne(false);
      setThemeTwo(false);
      setThemeThree(false);
      setThemeFour(false);
      setThemeFive(false);
      setThemeSix(false);
      setThemeEight(false);
    }
    else if (themeNo === 8) {
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
            className={`theme-image ${selectedTheme === 'theme1' ? "theme-active" : ""}`}
            onClick={() => handleThemeChange("theme1", 1)}
          >
            {themeOne || selectedTheme === 'theme1' ? (
              <span className="theme-selected-checkbox"><IoCheckmarkOutline /></span>
            ) : (
              <span className="theme-unselected-checkbox">
                <span></span>
              </span>
            )}
            <img src="https://nastaf.com/themes/theme-1.jpg" alt="Theme 1" />
            <p>Beach Sunrise</p>
          </div>
          <div
            className={`theme-image ${themeTwo || selectedTheme === 'theme2' ? "theme-active" : ""}`}
            onClick={() => handleThemeChange("theme2", 2)}
          >
            {themeTwo || selectedTheme === 'theme2' ? (
              <span className="theme-selected-checkbox"><IoCheckmarkOutline /></span>
            ) : (
              <span className="theme-unselected-checkbox">
                <span></span>
              </span>
            )}

            <img src="https://nastaf.com/themes/theme-2.jpg" alt="Theme 2" />
            <p>Evening City </p>
          </div>
          <div
            className={`theme-image ${themeThree || selectedTheme === 'theme3' ? "theme-active" : ""}`}
            onClick={() => handleThemeChange("theme3", 3)}
          >
            {themeThree || selectedTheme === 'theme3' ? (
              <span className="theme-selected-checkbox"><IoCheckmarkOutline /></span>
            ) : (
              <span className="theme-unselected-checkbox">
                <span></span>
              </span>
            )}

            <img src="https://nastaf.com/themes/theme-3.jpg" alt="Theme 3" />
            <p>Afternoon City </p>
          </div>

          <div
            className={`theme-image ${themeFour || selectedTheme === 'theme4' ? "theme-active" : ""}`}
            onClick={() => handleThemeChange("theme4", 4)}
          >
            {themeFour || selectedTheme === 'theme4' ? (
              <span className="theme-selected-checkbox"><IoCheckmarkOutline /></span>
            ) : (
              <span className="theme-unselected-checkbox">
                <span></span>
              </span>
            )}

            <img src="https://nastaf.com/themes/theme-4.jpg" alt="Theme 4" />
            <p>Night City </p>
          </div>
        </div>
        <div className="theme-options">
          <div
            className={`theme-image ${themeFive || selectedTheme === 'theme5' ? "theme-active" : ""}`}
            onClick={() => handleThemeChange("theme5", 5)}
          >
            {themeFive || selectedTheme === 'theme5' ? (
              <span className="theme-selected-checkbox"><IoCheckmarkOutline /></span>
            ) : (
              <span className="theme-unselected-checkbox">
                <span></span>
              </span>
            )}
            <img src="https://nastaf.com/themes/theme-5.jpg" alt="Theme 5" />
            <p>Art</p>
          </div>
          <div
            className={`theme-image ${themeSix || selectedTheme === 'theme6' ? "theme-active" : ""}`}
            onClick={() => handleThemeChange("theme6", 6)}
          >
            {themeSix || selectedTheme === 'theme6' ? (
              <span className="theme-selected-checkbox"><IoCheckmarkOutline /></span>
            ) : (
              <span className="theme-unselected-checkbox">
                <span></span>
              </span>
            )}
            <img src="https://nastaf.com/themes/theme-6.jpg" alt="Theme 6" />
            <p>Robot City </p>
          </div>
          <div
            className={`theme-image ${themeSeven || selectedTheme === 'theme7' ? "theme-active" : ""}`}
            onClick={() => handleThemeChange("theme7", 7)}
          >
            {themeSeven || selectedTheme === 'theme7' ? (
              <span className="theme-selected-checkbox"><IoCheckmarkOutline /></span>
            ) : (
              <span className="theme-unselected-checkbox">
                <span></span>
              </span>
            )}
            <img src="https://nastaf.com/themes/theme-7.jpg" alt="Theme 7" />
            <p>Green grass</p>
          </div>

          <div
            className={`theme-image ${themeEight || selectedTheme === 'theme8' ? "theme-active" : ""}`}
            onClick={() => handleThemeChange("theme8", 8)}
          >
            {themeEight || selectedTheme === 'theme8' ? (
              <span className="theme-selected-checkbox"><IoCheckmarkOutline /></span>
            ) : (
              <span className="theme-unselected-checkbox">
                <span></span>
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
