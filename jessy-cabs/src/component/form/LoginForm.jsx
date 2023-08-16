import React, { useState } from "react";
// import { emailValidator, passwordValidator } from "./regexValidator";
import "./Form.css";
import portalimg from "../../assets/img/portal-img.jpg";
import { useNavigate } from "react-router-dom";
import { AiOutlineInstagram } from "@react-icons/all-files/ai/AiOutlineInstagram";
import { RiFacebookCircleFill } from "@react-icons/all-files/ri/RiFacebookCircleFill";
import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin";
import { BiHide } from "@react-icons/all-files/bi/BiHide";
import { AiOutlineEye } from "@react-icons/all-files/ai/AiOutlineEye";

const Login = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };
  // const [passwordVisible, setPasswordVisible] = useState(false); // Rename 'open' to 'passwordVisible'
  const [input, setInput] = useState({ username: '', userpassword: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState("");
  // const [username] = useState("");
  // const [userpassword] = useState("");

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  
  const formSubmitter = async (e) => {
    e.preventDefault();
    setErrorMessage('');
  
    try {
      const response = await fetch('http://localhost:8081/usercreation', {
        // method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        // body: JSON.stringify({
        //   username: input.username, // Use input.username from state
        //   userpassword: input.userpassword, // Use input.userpassword from state
        // }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Login successful
        setSuccessMessage(data.message);
        localStorage.setItem('auth', true);
        navigate('/home/dashboard');
      } else {
        // Login failed
        setErrorMessage(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred');
    }
  };

  return (
    <div className="portal-container">
      <div className="glasses">
        <div className="left-col">
          <img className="portalimg" src={portalimg} alt="portalimg" />
        </div>
        <div className="right-col">
          <form className="portal" onSubmit={formSubmitter}>
            <div className="title">Login</div>
            {errorMessage && (
              <div style={{ marginBottom: "10px", color: "red" }}>
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div style={{ marginBottom: "10px", color: "green" }}>
                {successMessage}
              </div>
            )}
            <div className="user-input">
              <input
                type="text"
                name="username"
                autoComplete="off"
                onChange={handleChange}
                required
              />
              <div className="under-line" />
              <label>Username</label>
            </div>
            <div className="user-input">
              <input
                type={open ? "text" : "password"}
                name="password"
                autoComplete="off"
                onChange={handleChange}
                required
              />
              <div className="under-line" />
              <label>Password</label>
              <div className="pass-hide">
                {open ? (
                  <AiOutlineEye onClick={toggle} />
                ) : (
                  <BiHide onClick={toggle} />
                )}
              </div>
            </div>
            <div className="forget-link">
              <a href="/">Forgot password</a>
            </div>
            <div className="group button-group">
              <button type="submit" className="signup-btn">
                <span>Login</span>
              </button>
            </div>
            <div className="social_media_container">
              <a href="/" className="social facebook">
                <i>
                  <RiFacebookCircleFill />
                </i>
              </a>
              <a href="/" className="social instagram">
                <i>
                  <AiOutlineInstagram />
                </i>
              </a>
              <a href="/" className="social linkedin">
                <i>
                  <FaLinkedin />
                </i>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
