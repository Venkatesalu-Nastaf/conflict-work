import React from 'react';
import dayjs from "dayjs";
import './YearEndProcess.css';
import Button from "@mui/material/Button";
import BadgeIcon from "@mui/icons-material/Badge";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField, FormControlLabel, Checkbox } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// FontAwesomeIcon Link
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
            <div className="input-field checkbox" style={{ paddingTop: '40px' }}>
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
            <div className="input-field checkbox" style={{ paddingTop: '10px' }}>
              <FormControlLabel
                value="Pending-Billing"
                control={<Checkbox size="small" />}
                label="Pending Billing"
              />
            </div>
          </div>
          <div className="input-field">
            <div className="inputs" style={{
              width: "1430px", display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
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
          <div className="input-field" style={{ marginTop: '-20px', marginLeft: '-25px' }}>
            <div className="input" style={{ marginTop: '40px' }}>
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