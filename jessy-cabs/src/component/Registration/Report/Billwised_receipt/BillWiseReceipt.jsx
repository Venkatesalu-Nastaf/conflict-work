import React from 'react'

import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// ICONS
import BadgeIcon from "@mui/icons-material/Badge";

export const BillWiseReceipt = () => {

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };

    return (
        <>
 <div className="Employe-form Scroll-Style-hide">
      <form >
        <div className="detail-container-main-Employe">
          <div className="container-Employe">
            <div className="input-field employee-input-feilds">
              <div className="input">
                <div className="icone">
                  <BadgeIcon color="action" />
                </div>
                <TextField
                  size="small"
                  id="voucher ID"
                  className="full-width"
                  label="voucher ID"
                  name="voucher ID"
                  autoComplete="new-password"
                  
                />
              </div>



              <div className="input">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className="icone">
                    <CalendarMonthIcon color="action" />
                  </div>
                  <DatePicker
                    id="Date"
                    label=" Date"
                    format="DD/MM/YYYY"
                  
                  >
                    
                  </DatePicker>
                </LocalizationProvider>
              </div>

              <div className="input">
                <div className="icone">
                  <WorkOutlineRoundedIcon color="action" />
                </div>
                <TextField
                  size="small"
                  id="cover Note"
                  className="full-width"
                  label="cover Note"
                  name="cover Note"
                  autoComplete="new-password"
                
                />
              </div>

              
              <div className="input">
                <div className="icone">
                  <WorkOutlineRoundedIcon color="action" />
                </div>
                <TextField
                  size="small"
                  id="cheque No"
                  className="full-width"
                  label="cheque No"
                  name="cheque No"
                  autoComplete="new-password"
                
                />
              </div>

              <div className="input">
                <div className="icone">
                  <WorkOutlineRoundedIcon color="action" />
                </div>
                <TextField
                  size="small"
                  id="Narration"
                  className="full-width"
                  label="Narration"
                  name="Narration"
                  autoComplete="new-password"
                
                />
              </div>

              <div className="input">
                <div className="icone">
                  <BadgeIcon color="action" />
                </div>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="demo-simple-select-standard-label">Customer Id</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={age}
          onChange={handleChange}
          label="Customer Id"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
              </div>

              <div className="input">
                <div className="icone">
                  <BadgeIcon color="action" />
                </div>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="demo-simple-select-standard-label">Account To</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={age}
          onChange={handleChange}
          label="Account To"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
              </div>

             
            </div>

            <div className="input-field " style={{marginTop:"30px"}}>
              
            <div className="input">
                <div className="icone">
                  <BadgeIcon color="action" />
                </div>
                <TextField
                  size="small"
                  id="voucher ID"
                  className="full-width"
                  label="voucher ID"
                  name="voucher ID"
                  autoComplete="new-password"
                  
                />
              </div>



              <div className="input">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className="icone">
                    <CalendarMonthIcon color="action" />
                  </div>
                  <DatePicker
                    id="Date"
                    label=" Date"
                    format="DD/MM/YYYY"
                  
                  >
                    
                  </DatePicker>
                </LocalizationProvider>
              </div>


              <div className="input">
                <div className="icone">
                  <BadgeIcon color="action" />
                </div>
                <TextField
                  size="small"
                  id="Bill Amount"
                  className="full-width"
                  label="Bill Amount"
                  name="Bill Amount"
                  
                />
              </div>

              <div className="input">
                <div className="icone">
                  <BadgeIcon color="action" />
                </div>
                <TextField
                  size="small"
                  id="Advanced"
                  className="full-width"
                  label="Advanced"
                  name="Advanced"
                  
                />
              </div>

              <div className="input">
                <div className="icone">
                  <BadgeIcon color="action" />
                </div>
                <TextField
                  size="small"
                  id="Paid"
                  className="full-width"
                  label="Paid"
                  name="Paid"
                  
                />
              </div>

              <div className="input">
                <div className="icone">
                  <BadgeIcon color="action" />
                </div>
                <TextField
                  size="small"
                  id="Received"
                  className="full-width"
                  label="Received"
                  name="Received"
                  
                />
              </div>

              <div className="input">
                <div className="icone">
                  <BadgeIcon color="action" />
                </div>
                <TextField
                  size="small"
                  id="Discount"
                  className="full-width"
                  label="Discount"
                  name="Discount"
                  
                />
              </div>

              <div className="input">
                <div className="icone">
                  <BadgeIcon color="action" />
                </div>
                <TextField
                  size="small"
                  id="Balance"
                  className="full-width"
                  label="Balance"
                  name="Balance"
                  
                />
              </div>

              <div className="input">
                <div className="icone">
                  <BadgeIcon color="action" />
                </div>
                <TextField
                  size="small"
                  id="unique id"
                  className="full-width"
                  label="unique id"
                  name="unique id"
                  
                />
              </div>
             
            </div>

          </div>
        </div>
       

      </form>
    </div>
        </>
    )
}
