import React, { useState, useEffect } from "react";
import "./Form.css";
import axios from "axios";
import { useUser } from './UserContext';
import { useNavigate } from "react-router-dom";

// ICONS
import ClearIcon from '@mui/icons-material/Clear';
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import { BiHide } from "@react-icons/all-files/bi/BiHide";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { AiOutlineEye } from "@react-icons/all-files/ai/AiOutlineEye";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import { APIURL } from "../url.js";

import { useData } from "../Dashboard/MainDash/Sildebar/DataContext2.js";



const Login = () => {

  const { setLogoTrigger } = useData()

  const apiUrl = APIURL;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };
  const [input, setInput] = useState({ username: "", userpassword: "" });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [info, setInfo] = useState(false);
  const [warning, setWarning] = useState(false);
  const [successMessage, setSuccessMessage] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [warningMessage] = useState({});
  const [infoMessage] = useState({});
  const { loginUser, setUserdashboard } = useUser();

  const hidePopup = () => {
    setSuccess(false);
    setError(false);
    setInfo(false);
    setWarning(false);
  };

  useEffect(() => {
    if (error || success || warning || info) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success, warning, info]);


  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (localStorage.getItem("auth")) navigate("/");

  });

  const formSubmitter = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/login`, input);
      if (response.status === 200) {
        setUserdashboard(true) // its for logo trigger
        setLogoTrigger(prev => !prev)
        loginUser(input.username);
        localStorage.setItem("username", input.username);
        setSuccessMessage("Successfully Added");
        navigate("/home/dashboard");
        localStorage.setItem("auth", true);

      }
      else {
        setError(true);
        setErrorMessage("Check your Network Connection");
      }
    } catch {
      setError(true);
      setErrorMessage("An error occurred while logging in.");
    }
  };

  return (
    <div className="portal-container">
      <div className="glasses">
        <div className="right-col">
          <form className="portal"  >
            <div className="title">login</div>
            <div className='alert-popup-main'>
              {error &&
                <div className='alert-popup Error' >
                  <div className="popup-icon"> <ClearIcon style={{ color: '#fff' }} /> </div>
                  <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                  <p>{errorMessage}</p>
                </div>
              }
              {warning &&
                <div className='alert-popup Warning' >
                  <div className="popup-icon"> <ErrorOutlineIcon style={{ color: '#fff' }} /> </div>
                  <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                  <p>{warningMessage}</p>
                </div>
              }
              {success &&
                <div className='alert-popup Success' >
                  <div className="popup-icon"> <FileDownloadDoneIcon style={{ color: '#fff' }} /> </div>
                  <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                  <p>{successMessage}</p>
                </div>
              }
              {info &&
                <div className='alert-popup Info' >
                  <div className="popup-icon"> <BsInfo style={{ color: '#fff' }} /> </div>
                  <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                  <p>{infoMessage}</p>
                </div>
              }
            </div>
            <div className="user-input">
              <input
                type="text"
                name="username"
                autoComplete="off"
                onChange={handleChange}
                required
              />
              <div className="under-line" required></div>

              <label>Username</label>
            </div>
            <div className="user-input">
              <input
                type={open === false ? "password" : "text"}
                name="userpassword"
                autoComplete="off"
                onChange={handleChange}
                required
              />
              <div className="under-line" required></div>
              <label>Password</label>
              <div className="pass-hide">
                {open === false ? (
                  <BiHide onClick={toggle} />
                ) : (
                  <AiOutlineEye onClick={toggle} />
                )}
              </div>
            </div>
            <div className="forget-link">
              <a href="/">forget password !</a>
            </div>
            <div className="group button-group">
              <button type="submit" className="signup-btn" onClick={formSubmitter}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
