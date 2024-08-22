import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import "./ContactRenewalReminder.css";

const ContactRenewalReminder = () => {

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div className='add-vehicle-details-main-division'>
      <div className='add-vehicle-details-heading'>
        Identification
      </div>
      <div className='add-vehicle-details-inputfield'>
        <div className='add-vehicle-details-input'>
          <label htmlFor="">Vehicle No*</label>
          <input type="text" />
        </div>

        <div className='add-vehicle-details-input'>
          <label htmlFor="">Vehicle Name*</label>
          <input type="text" />
        </div>

        <div className='add-vehicle-details-input'>
          <label htmlFor="">VIN/Chasis No</label>
          <input type="text" />
        </div>

        <div className='add-vehicle-details-input'>
          <label htmlFor="">Vehicle Type*</label>
          {/* <input type="text" /> */}
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

        <div className='add-vehicle-details-input'>
          <label htmlFor="">Registration Year*</label>
          <input type="text" />
        </div>

        <div className='add-vehicle-details-input'>
          <label htmlFor="">Maker*</label>
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

        <div className='add-vehicle-details-input'>
          <label htmlFor="">Model*</label>
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

        <div className='add-vehicle-details-input'>
          <label htmlFor="">Fuel Type*</label>
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

        <div className='add-vehicle-details-input'>
          <label htmlFor="">Fuel Card No*</label>
          <input type="text" />
        </div>

        <div className='add-vehicle-details-input'>
          <label htmlFor="">Mileage</label>
          <input type="text" />
        </div>

        <div className='add-vehicle-details-input'>
          <label htmlFor="">Trim</label>
          <input type="text" />
        </div>

        <div className='add-vehicle-details-input'>
          <label htmlFor="">Registration State</label>
          <input type="text" />
        </div>

        <div className='add-vehicle-details-input'>
          <label htmlFor="">Hour Meter Reading</label>
          <input type="text" />
        </div>

        <div className='add-vehicle-details-input'>
          <label htmlFor="">Registration Date</label>
          <input type="text" />
        </div>

        <div className='add-vehicle-details-input'>
          <label htmlFor="">Axle</label>
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

        <div className='add-vehicle-details-input'>
          <label htmlFor="">Vendor Name</label>
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

        <div className='add-vehicle-details-input'>
          <label htmlFor="">Branches</label>
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

        <div className='add-vehicle-details-input'>
          <label htmlFor="">Transporter</label>
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

        <div className='add-vehicle-details-input'>
          <label htmlFor="">Current Transporter</label>
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

      </div>

      <div className='add-vehicle-details-heading'>
        Classifications
      </div>

      <div className='add-vehicle-details-inputfield'>
        <div className='add-vehicle-details-input'>
          <label htmlFor="">Vehicle Status*</label>
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

        <div className='add-vehicle-details-input'>
          <label htmlFor="">Group</label>
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

        <div className='add-vehicle-details-input'>
          <label htmlFor="">Driver</label>
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

        <div className='add-vehicle-details-input'>
          <label htmlFor="">Vehicle Ownership*</label>
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

      </div>

      <div className='add-vehicle-details-heading'>
        Vehicle Cost
      </div>

      <div className='add-vehicle-details-inputfield'>
        <div className='add-vehicle-details-input'>
          <label htmlFor="">Purchase Value/Initial Value</label>
          <input type="text" />
        </div>

        <div className='add-vehicle-details-input'>
          <label htmlFor="">Scrapping Value</label>
          <input type="text" />
        </div>

        <div className='add-vehicle-details-input'>
          <label htmlFor="">Life Time of the Vehicle (KM)</label>
          <input type="text" />
        </div>
      </div>

      <div className='add-vehicle-details-heading'>
        Additional Details
      </div>

      <div className='add-vehicle-details-inputfield'>
        <div className='add-vehicle-details-input'>
          <label htmlFor="">Color</label>
          <input type="text" />
        </div>

        <div className='add-vehicle-details-input'>
          <label htmlFor="">Body Type</label>
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

        <div className='add-vehicle-details-input'>
          <label htmlFor="">Body Subtype</label>
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

        <div className='add-vehicle-details-input'>
          <label htmlFor="">MSRP</label>
          <input type="text" />
        </div>

        <div className='add-vehicle-details-input'>
          <label htmlFor="">Tags</label>
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

        <div className='add-vehicle-details-input'>
          <label htmlFor="">Custom Name</label>
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

      </div>


    </div>
  )
}

export default ContactRenewalReminder
