import React from 'react';
import Button from "@mui/material/Button";
import "./ServiceReminder.css";
import { FaUpload } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";

const ServiceReminder = () => {

  return (
    <div className='ServiceReminder-total'>
      <div className='ServiceReminder-section'>
        <h3>Service Reminders</h3>
        <span>Schedule preventative maintenance and automatically receive email alerts when service is due soon or overdue. Predict due date based on asset utilization.</span>
        <div className='ServiceReminder-buttons'  >
          <Button variant='contained'><FaUpload /> Upload</Button>
          <Button variant='contained'><FaPlus /> Add Multiple Service Reminders</Button>
        </div>
      </div>
    </div>
  )
}

export default ServiceReminder
