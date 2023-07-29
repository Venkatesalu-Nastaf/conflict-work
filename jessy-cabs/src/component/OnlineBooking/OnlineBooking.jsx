import React, { useState } from 'react';
import './OnlineBooking.css'
const OnlineBooking = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    mobile: '',
    email: '',
    pickup: '',
    drop: '',
    usage: ''
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can perform any necessary actions with the form data, such as sending it to a server
    console.log(formData);
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  

  return (
    <div className="booking-container">
      <h2 className='title'>Online Booking Form</h2>
      <form className="booking-forms" onSubmit={handleSubmit}>
        <div className='item'>
          <label className='input-lable' htmlFor="name">Guest Name:</label>
          <input
            className='input-item'
            type="text"
            id="name"
            name="name"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>
        <div className='item'>
          <label className='input-lable' htmlFor="mobile">Mobile:</label>
          <input
            className='input-item'

            type="text"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>
        <div className='item'>
          <label className='input-lable' htmlFor="email">Email:</label>
          <input
            className='input-item'

            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='items'>
          <div className='item'>
            <label className='input-lable' htmlFor="email">Booking Date:</label>
            <input type="date"
              className='input-item'
            />
          </div>
          <div className='item'>
            <label className='input-lable' htmlFor="email">Booking Time:</label>
            <input type="time"
              className='input-item'
            />
          </div>
        </div>
        <div className='item'>
          <label className='input-lable' htmlFor="pickup">Pickup Location:</label>
          <input
            className='input-item'
            type="text"
            id="pickup"
            name="pickup"
            value={formData.pickup}
            onChange={handleChange}
            required
          />
        </div>
        <div className='item'>
          <label className='input-lable' htmlFor="drop">Drop Location:</label>
          <input
            className='input-item'
            type="text"
            id="drop"
            name="drop"
            value={formData.drop}
            onChange={handleChange}
            required
          />
        </div>
        <div className='item'>
          <label className='input-lable' htmlFor="usage">Usage:</label>
          <select
            id='selects' 
            name="usage"
            value={formData.usage}
            onChange={handleChange}
            required
          >
            <option value="">UsageType</option>
            <option value="Local">Local</option>
            <option value="Oneway">Oneway</option>
            <option value="OutStation">OutStation</option>
            <option value="Transfer">Transfer</option>
          </select>
        </div>
        <div className='item'>
          <label className='input-lable' htmlFor="usage">Vehicle Type:</label>
          <select id='selects' name="vname" required="">
            <option>Vehicle Type</option>
            <option>Sedan</option>
            <option>Semi Premium</option>
            <option>Premium</option>
            <option>SUV</option>
            <option>Luxury</option>
            <option>Super Luxury</option>
            <option>Bus</option>
          </select>
        </div>
        <div className='item'>
          <label className='input-lable' htmlFor="usage">Remark:</label>
          <textarea className='textareas' placeholder='Enter Your Remarks'>

          </textarea>
        </div>
        <button className='btns-online' type="submit">Submit</button>
      </form>
    </div>
  );
};

export default OnlineBooking;
