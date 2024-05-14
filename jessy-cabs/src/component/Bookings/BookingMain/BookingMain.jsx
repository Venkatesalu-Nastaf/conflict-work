import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Booking from "./Booking/Booking.jsx";
import TabContext from "@mui/lab/TabContext";
import BokkingChart from "./BookingChart/BookingChart.jsx";
import "./BookingMain.css";

const BookingMain = ({ stationName }) => {
  const [value, setValue] = React.useState("booking");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="form-container-booking">
      <div className="container-main">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box className='head-tab-booking' sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Booking" value="booking" />
                <Tab label="Booking Chart" value="bookingchart" />
              </TabList>
            </Box>
            <TabPanel value="booking">
              <Booking stationName={stationName} />
            </TabPanel>
            <TabPanel value="bookingchart" className="BokkingChart-render">
              <BokkingChart />
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
};

export default BookingMain;
