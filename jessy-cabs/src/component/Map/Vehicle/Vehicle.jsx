import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export const Vehicle = () => {
  const [vehicleNO, setVehicleNO] = React.useState('');

  const handleChange = (event) => {
    setVehicleNO(event.target.value);
  };
  return (
    <>
      <div className="form-container-realtime">
        <div className="main-content-container">
          {/* <p className="head-tab-type-2-all">
            <span className="Title-Name">Real Time</span>
          </p> */}
          <div className='main-content-form'>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '40%' }}>Vehicles</div>
              <div style={{ display: 'flex', width: '60%' }}>
                <span>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Vehicle No</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={vehicleNO}
                        label="Vehicle No"
                        onChange={handleChange}
                      >
                        <MenuItem value={'TN07CC1234'}>TN07CC1234</MenuItem>
                        <MenuItem value={'TN07CC1234'}>TN07CC1234</MenuItem>
                        <MenuItem value={'TN07CC1234'}>TN07CC1234</MenuItem>
                        <MenuItem value={'TN07CC1234'}>TN07CC1234</MenuItem>
                        <MenuItem value={'TN07CC1234'}>TN07CC1234</MenuItem>
                        <MenuItem value={'TN07CC1234'}>TN07CC1234</MenuItem>
                        <MenuItem value={'TN07CC1234'}>TN07CC1234</MenuItem>
                        <MenuItem value={'TN07CC1234'}>TN07CC1234</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
