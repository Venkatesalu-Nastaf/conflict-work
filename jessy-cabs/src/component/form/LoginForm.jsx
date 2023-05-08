import React, { useState } from 'react';
import { emailValidator, passwordValidator } from '../regexValidator';
import '../../Style/Form.css';
import portalimg from '../../assets/img/portal-img.jpg';
import { useNavigate } from 'react-router-dom';
import { AiOutlineInstagram } from "@react-icons/all-files/ai/AiOutlineInstagram";
import { RiFacebookCircleFill } from "@react-icons/all-files/ri/RiFacebookCircleFill";
import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin";
import { BiHide } from "@react-icons/all-files/bi/BiHide";
import { AiOutlineEye } from "@react-icons/all-files/ai/AiOutlineEye";
const Login = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false)
  const toggle = () => {
    setOpen(!open)
  }
  const [input, setInput] = React.useState({ username: '', password: '' })
  const [errorMessage, seterrorMessage] = useState('')
  const [successMessage, setsuccessMessage] = useState('')
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  React.useEffect(() => {
    if (localStorage.getItem('auth')) navigate('/')
  })

  const formSumitter = (e) => {
    e.preventDefault()
    setsuccessMessage('')
    if (!emailValidator(input.username)) return seterrorMessage('Please enter valid user id');

    if (!passwordValidator(input.password))
      return seterrorMessage(
        'Password should have minimum 8 character with the combination of uppercase, lowercase, numbers and specialcharaters'
      );
    // setsuccessMessage('Successfully Validated');
    if (input.username !== 'admin@gmail.com' || input.password !== 'Admin@321') return seterrorMessage('Invalid user id');

    navigate("/");
    localStorage.setItem('auth', true)

  }
  return (
    <div className='portal-container'>
      <div className='portal-row' >
        <div className='left-col'>
          <img className='portalimg' src={portalimg} alt='portalimg'></img>
        </div>
        <div className='right-col'>

          <form className='portal' onSubmit={formSumitter} >
            <div className='title'>login</div>
            {errorMessage.length > 0 && <div style={{ marginBottom: '10px', color: 'red' }}>{errorMessage}</div>}
            {successMessage.length > 0 && (
              <div style={{ marginBottom: '10px', color: 'green' }}>{successMessage}</div>
            )}
            <div className='user-input'>
              <input type="text" name='username' autoComplete='off' onChange={handleChange} required />
              <div className='under-line' required></div>

              <label>
                Username
              </label>
            </div>
            <div className='user-input'>
              <input type={(open === false) ? 'password' : 'text'} name='password' autoComplete='off' onChange={handleChange} required/>
              <div className='under-line' required></div>
              <label>
                Password
              </label>
              <div className='pass-hide'>
                {
                  (open === false) ? <BiHide onClick={toggle} /> : <AiOutlineEye onClick={toggle} />
                }
              </div>
            </div>
            <div className='forget-link'>
              <a href="/">forget password </a>
            </div>
            <div className='group button-group'>
              <button type="submit" className='signup-btn' >
                <span>Login</span></button>
            </div>
            <div className="social__media__container">
              <a href="/" className="social facebook">
                <i ><RiFacebookCircleFill /></i>

              </a>
              <a href="/" className="social instagram">
                <i><AiOutlineInstagram /></i>
              </a>
              <a href="/" className="social linkedin">
                <i><FaLinkedin /></i>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
}

export default Login;
