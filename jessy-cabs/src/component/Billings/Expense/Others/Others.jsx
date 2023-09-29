import React, { useState } from 'react'
import "./Others.css";
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OfficeRent from './Rent/OfficeRent';

const Others = () => {
  const [selectOtherExpense, setSelectOtherExpense] = useState('');


  // Function to handle option selection
  const handleChange = (event) => {
    setSelectOtherExpense(event.target.value);
  };
  return (
    <div className="Others-form Scroll-Style-hide">
      <form >
        <div className="input-field">
          <div className="input" style={{ width: "300px" }}>
            <FormControl sx={{ m: 1, minWidth: 210 }} size="small">
              <InputLabel id="demo-select-small-label">Select Other Expense</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={selectOtherExpense}
                label="Select Other Expense"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Office-Rent</MenuItem>
                <MenuItem value={20}>Insurance</MenuItem>
                <MenuItem value={30}>Utilities</MenuItem>
                <MenuItem value={40}>Office-Supplies</MenuItem>
                <MenuItem value={50}>Vehicle-Expense</MenuItem>
                <MenuItem value={60}>Business-License & Permits</MenuItem>
                <MenuItem value={70}>Interst-Payments & Bank-Fees</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        {selectOtherExpense === 10 && <div><OfficeRent /></div>}
        {selectOtherExpense === 20 && <div>Content for Option 2</div>}
        {selectOtherExpense === 30 && <div>Content for Option 3</div>}
        {selectOtherExpense === 40 && <div>Content for Option 3</div>}
        {selectOtherExpense === 50 && <div>Content for Option 3</div>}
        {selectOtherExpense === 60 && <div>Content for Option 3</div>}
        {selectOtherExpense === 70 && <div>Content for Option 3</div>}
      </form>
    </div>
  )
}

export default Others