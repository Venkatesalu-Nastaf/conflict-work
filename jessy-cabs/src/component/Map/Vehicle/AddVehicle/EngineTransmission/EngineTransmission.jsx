import React from 'react';
import {
  Autocomplete,
  InputAdornment,
  TextField,
} from "@mui/material";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "./EngineTransmission.css";

const EngineTransmission = () => {

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div className='add-vehicle-specification-main-division'>
      <div className='add-vehicle-specification-heading'>
        Engine
      </div>
      <div className='add-vehicle-specification-division'>
        <div className='add-vehicle-specification-input'>
          <label htmlFor="">Engine Summary</label>
          <input type="text" />
        </div>

        <div className='add-vehicle-specification-input'>
          <label htmlFor="">Engine Brand</label>
          <input type="text" />
        </div>

        <div className='add-vehicle-specification-input'>
          <label htmlFor="">Aspiration</label>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Vehicle Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Vehicle Type"
                onChange={handleChange}
              >
                <MenuItem value={'Car'}>Car</MenuItem>
                <MenuItem value={'Bus'}>Bus</MenuItem>
                <MenuItem value={'Bike'}>Bike</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>

        <div className='add-vehicle-specification-input'>
          <label htmlFor="">Block Type</label>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Vehicle Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Vehicle Type"
                onChange={handleChange}
              >
                <MenuItem value={'Car'}>Car</MenuItem>
                <MenuItem value={'Bus'}>Bus</MenuItem>
                <MenuItem value={'Bike'}>Bike</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>

        <div className='add-vehicle-specification-input'>
          <label htmlFor="">Bore</label>
          <input type="text" />
        </div>

        <div className='add-vehicle-specification-input'>
          <label htmlFor="">Cam Type</label>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Vehicle Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Vehicle Type"
                onChange={handleChange}
              >
                <MenuItem value={'Car'}>Car</MenuItem>
                <MenuItem value={'Bus'}>Bus</MenuItem>
                <MenuItem value={'Bike'}>Bike</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>

        <div className='add-vehicle-specification-input'>
          <label htmlFor="">Compression</label>
          <input type="text" />
        </div>

        <div className='add-vehicle-specification-input'>
          <label htmlFor="">Cylinders</label>
          <input type="text" />
        </div>

        <div className='add-vehicle-specification-input'>
          <label htmlFor="">Displacement</label>
          <input type="text" />
        </div>

        <div className='add-vehicle-specification-input'>
          <label htmlFor="">Fuel Induction</label>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Vehicle Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Vehicle Type"
                onChange={handleChange}
              >
                <MenuItem value={'Car'}>Car</MenuItem>
                <MenuItem value={'Bus'}>Bus</MenuItem>
                <MenuItem value={'Bike'}>Bike</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>

        <div className='add-vehicle-specification-input'>
          <label htmlFor="">Fuel Quality</label>
          <input type="text" />
        </div>

        <div className='add-vehicle-specification-input'>
          <label htmlFor="">Max HP</label>
          <input type="text" />
        </div>

        <div className='add-vehicle-specification-input'>
          <label htmlFor="">Max Torque</label>
          <input type="text" />
        </div>

        <div className='add-vehicle-specification-input'>
          <label htmlFor="">Redline RPM</label>
          <input type="text" />
        </div>

        <div className='add-vehicle-specification-input'>
          <label htmlFor="">Stroke</label>
          <input type="text" />
        </div>

        <div className='add-vehicle-specification-input'>
          <label htmlFor="">Valves</label>
          <input type="text" />
        </div>

      </div>

      <div className='add-vehicle-specification-heading'>
        Transmission
      </div>

      <div className='add-vehicle-specification-division'>
        <div className='add-vehicle-specification-input'>
          <label htmlFor="">Transmission Summary</label>
          <input type="text" />
        </div>

        <div className='add-vehicle-specification-input'>
          <label htmlFor="">Transmission Brand</label>
          <input type="text" />
        </div>

        <div className='add-vehicle-specification-input'>
          <label htmlFor="">Transmission Type</label>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Vehicle Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Vehicle Type"
                onChange={handleChange}
              >
                <MenuItem value={'Car'}>Car</MenuItem>
                <MenuItem value={'Bus'}>Bus</MenuItem>
                <MenuItem value={'Bike'}>Bike</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>

        <div className='add-vehicle-specification-input'>
          <label htmlFor="">Transmission Gears</label>
          <input type="text" />
        </div>
      </div>

    </div>
  )
}

export default EngineTransmission
