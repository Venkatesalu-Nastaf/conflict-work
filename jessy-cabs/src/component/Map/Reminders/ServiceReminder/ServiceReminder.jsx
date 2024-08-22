import React from 'react';
import Button from "@mui/material/Button";
import "./ServiceReminder.css";

const ServiceReminder = () => {
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '50px' }}>
      <div style={{ textAlign: 'center', width: '600px', border: '1px solid #ccc', borderRadius: '5px', padding: '20px' }}>
        <h3>Service Reminders</h3>
        <span>Schedule preventative maintenance and automatically receive email alerts when service is due soon or overdue. Predict due date based on asset utilization.</span>
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <Button variant='contained'>Upload</Button>
          <Button variant='contained'>Add Multiple Service Reminders</Button>
        </div>
      </div>
    </div>
  )
}

export default ServiceReminder
