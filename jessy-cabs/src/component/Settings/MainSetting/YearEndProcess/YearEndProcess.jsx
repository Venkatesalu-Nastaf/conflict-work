import React from 'react'
import './YearEndProcess.css'
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import BadgeIcon from "@mui/icons-material/Badge";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import {
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import dayjs from "dayjs";
import Button from "@mui/material/Button";

// FontAwesomeIcon Link
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons"
// date
const today = dayjs();
const tomorrow = dayjs().add(1, "day");
const YearEndProcess = () => {
  return (
    <div className="YearEndProcess-form">
      <form action="">
        <div className="YearEndProcess-header">
          <div className="input-field" style={{ padding: '0px 15px' }}>
            <div className="input">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoItem label="Last Year Data From">
                  <DatePicker
                    defaultValue={today}
                    minDate={tomorrow}
                    views={["year", "month", "day"]}
                  />
                </DemoItem>
              </LocalizationProvider>
            </div>
            <div className="input">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoItem label="Last Year Data To">
                  <DatePicker
                    defaultValue={today}
                    minDate={tomorrow}
                    views={["year", "month", "day"]}
                  />
                </DemoItem>
              </LocalizationProvider>
            </div>
            <div className="input-field checkbox" style={{ 'padding-top': '40px' }}>
              <FormControlLabel
                value="Update-Opening-Balance"
                control={<Checkbox size="small" />}
                label="Update Opening Balance"
              />
            </div>
          </div>
          <div className="input-field" style={{ padding: '0px 15px' }}>
            <div className="input">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoItem label="Opening Balance">
                  <DatePicker
                    defaultValue={today}
                    minDate={tomorrow}
                    views={["year", "month", "day"]}
                  />
                </DemoItem>
              </LocalizationProvider>
            </div>
            <div className="input" style={{ width: "300px" }}>
              <div className="icone">
                <BadgeIcon color="action" />
              </div>
              <TextField
                margin="normal"
                size="small"
                id="id"
                label="ID"
                name="id"
                sx={{ m: 1, width: "200ch" }}
                variant="standard"
              />
            </div>
            <div className="input" style={{ width: "100px" }}>
              <Button >
                Status
              </Button>
            </div>
            <div className="input-field checkbox" style={{ 'padding-top': '10px' }}>
              <FormControlLabel
                value="Pending-Billing"
                control={<Checkbox size="small" />}
                label="Pending Billing"
              />
            </div>
          </div>
          <div className="input-field">
            <div className="inputs" style={{
              'width': "1430px", 'display': 'flex',
              'flex-direction': 'column',
              'align-items': 'center',
              'justify-content': 'center',
            }}>
              <TextField
                className='sms-box'
                id="outlined-multiline-static"
                multiline
                sx={{ mt: '7', width: "110ch", }}
                rows={10}
              />
            </div>
          </div>
          <div className="input-field" style={{ 'margin-top': '-20px', 'margin-left': '-25px' }}>
            <div className="input" style={{ 'margin-top': '40px' }}>
              <Button startIcon={<FontAwesomeIcon icon={faSave} size="lg" />} variant="contained">
                Save
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default YearEndProcess