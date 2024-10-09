import React from "react";
import usePopUpContent from "./usePopUpContent";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; // Adapter for dayjs
import dayjs from "dayjs";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const PopUpContent = ({ lat, lng, placeName, tripid, onAddMarker, onRemoveMarker, date, time, tripType, refresh }) => {
  
  const { submitMapPopUp, mapContent, setMapContent } = usePopUpContent({
    tripid,
    time,
    date,
    placeName,
    tripType
  });

  // Handle time change
  const handleChangetime = (value) => {
    const formattedTime = dayjs(value).format('hh:mm A'); // Format the time
    setMapContent((prevState) => ({
      ...prevState,
      time: formattedTime  // Update time field
    }));
  };

  // Handle date change
  const handledatechange = (value) => {
    const formattedDate = dayjs(value).format('YYYY-MM-DD'); // Format the date
    setMapContent((prevState) => ({
      ...prevState,
      date: formattedDate  // Update date field
    }));
  };

  const handletimeChange = (e) => {
    const { name, value } = e.target;
console.log(name,value,'ccccccc');

    setMapContent((prevState) => ({
        ...prevState,
        [name]: value // Dynamically update the field based on the input name
    }));
};
const handleChange = (value, name) => {
    console.log(value,name,'cccccccccccccccccccc');
    
    setMapContent((prevState) => ({
      ...prevState,
      [name]: value // Dynamically update the field based on the input name
    }));
  };

  const handleSubmit = async () => {
    onAddMarker(lat, lng, tripType, placeName, date, time, mapContent?.trip_type);
    const result = await submitMapPopUp({ lat, lng, placeName, tripid });

    if (result) {
      if (typeof refresh === "function") {
        refresh();
      }
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <DatePicker
          name="date"
          label="Select Date"
          value={dayjs(mapContent.date)}  // Wrap value with dayjs
          onChange={(newValue) => handledatechange(newValue)} // Update date change handler
        />
        
        <div style={{ display: "flex", gap: "20px", marginTop: "20px", marginBottom: "20px", alignItems: 'center' }}>
          <div>
            {/* <TimePicker
              label="Select Time"
              name="time"
              value={dayjs(mapContent.time, 'HH:MM A')}  // Wrap value with dayjs
              onChange={(newValue) => handleChangetime(newValue)}  // Update time change handler
            /> */}
            <input
                type="time"
                id="time"
                name="time"
                value={mapContent.time}
                onChange={handletimeChange}
                required
            />
          </div>

          <div>
            <FormControl sx={{ width: '150px' }}>
              <InputLabel id="dropdown-label">Choose an Option</InputLabel>
              <Select
                labelId="dropdown-label"
                value={mapContent?.trip_type}
                label="Choose an Option"
                name="trip_type"
                onChange={(e) => handleChange(e.target.value, "trip_type")}  // Handle trip_type changes
              >
                <MenuItem value="start">start</MenuItem>
                <MenuItem value="end">end</MenuItem>
                <MenuItem value="waypoint">waypoint</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", padding: "5px" }}>
          <button id="submitButton" onClick={handleSubmit} style={{ padding: "8px 5px", backgroundColor: "green", color: "white", border: "none", borderRadius: "8px" }}>
            Submit
          </button>
          <button id="DeleteButton" onClick={onRemoveMarker} style={{ padding: "8px 5px", backgroundColor: "red", color: "white", border: "none", borderRadius: "8px" }}>
            Delete
          </button>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default PopUpContent;
