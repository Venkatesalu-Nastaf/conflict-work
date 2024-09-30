import { React,useLayoutEffect, useState } from "react";
import axios from 'axios';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tripdetails from './Tripdetails'; //tripsheet details page
import format from 'date-fns/format';
import "./Table.css";
import { Button, IconButton } from "@mui/material";
import DialogActions from '@mui/material/DialogActions';

import { APIURL } from "../../../url";
import { useData1 } from "../../Maindashboard/DataContext";

// ICON
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import dayjs from "dayjs";
import Dialog from "@mui/material/Dialog";



import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DialogContent from "@mui/material/DialogContent";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const apiurl = APIURL;

const makeStyle = (status) => {
  if (status === 'Waiting' || status === 'On_Going') {
    return {
      background: 'rgb(145, 254, 159, 47%)',
      color: 'green',
      borderRadius: '24px',
      padding: '10px 20px',
      fontWeight: '600',
    }
  }
  else if (status === 'Closed') {
    return {
      background: '#ffadad8f',
      color: 'red',
      borderRadius: '24px',
      padding: '10px 20px',
      fontWeight: '600',
    }
  }
  else {
    return {
      background: '#59bfff',
      color: 'white',
      borderRadius: '24px',
      padding: '10px 20px',
      fontWeight: '600',
    }
  }
}

export default function BasicTable({ stationName }) {

  // const date = new Date();
  const datestart = dayjs().startOf('month').format('YYYY-MM-DD');
  const dateEnd = dayjs().endOf('month').format('YYYY-MM-DD');

  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [toDate, setToDate] = useState(dayjs());
  const [fromDate, setFromDate] = useState(dayjs());
  const [showdDate, setShowDate] = useState(false);


  const { filteredData, setTodayBooking, setViewMonthdata, setFilteredData } = useData1();

  const stationarray1 = stationName?.map((data) => data.Stationname)
  const stationarray = stationarray1?.filter(data => data !== 'All')
  // const stationarray = stationName?.Stationname.split(',');
  const showDateFunction = () => {

    setShowDate(!showdDate);

  }
const closeDateFunction = () => {

    setShowDate(false);

  }

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  const handleButtonClickTripsheet = (trip) => {
    // console.log(trip, "ttt")
    setSelectedTrip(trip);
    setPopupOpen(true);
  };

  const dateoftoday = dayjs().format("YYYY-MM-DD")

  const tripsheetfiltercurrntdate = async () => {
    try {
      const response = await axios.get(`${apiurl}/tripsheet-maindashcuurentdate/${dateoftoday}`)
      const response2 = await axios.get(`${apiurl}/customerreviewtoday/${stationarray}/${dateoftoday}`)
      const data2 = response2.data
      setTodayBooking(data2)
      const data = response.data;

      if (data.length >= 1) {
        setFilteredData(response.data)
      }
      else {
        // console.log(data.length,"daaa")
        setFilteredData([])
      }


    }
    catch (err) {
      console.log(err, "err")
    }
  }

  const tripsheetfiltercustomdate = async () => {
    try {
      const response = await axios.get(`${apiurl}/tripsheet-maindashcuurentdate?fromDate=${encodeURIComponent(fromDate.toISOString())}&toDate=${encodeURIComponent(toDate.toISOString())}`)
      const data = response.data;

      if (data.length >= 1) {
        setFilteredData(response.data)
      }
      else {
        setFilteredData([])
      }


    }
    catch (err) {
      console.log(err, "err")
    }
  }

  const custombookingdate = async () => {
    tripsheetfiltercustomdate()
    try {
      const response = await axios.get(`${apiurl}/customerreviecustomerdate?station=${stationarray}&fromDate=${fromDate}&toDate=${toDate}`)
      const data = response.data
      setTodayBooking(data)
      // setPopupOpen(false)
      setFromDate(dayjs())
      setToDate(dayjs())
      setShowDate(false)

    }
    catch (err) {
      console.log(err)
    }
  }

  const fetchalldata = async () => {
    try {
      const response = await fetch(`${apiurl}/tripsheet-maindash?fromDate=${datestart}&toDate=${dateEnd}`);
      if (response.status === 200) {
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setFilteredData(data);
          } else {
            setFilteredData([]);
          }
        } else {
        }
      }
    } catch {
    }
  };


  const handleWeeklyView = async () => {
    // toadybookingdate()
    setViewMonthdata("weekly");
    tripsheetfiltercurrntdate()
    // toadybookingdate()

  };

  const fetchdatachart = async () => {
    try {
      if (stationarray.length > 0) {
        // const response = await axios.get(`${apiurl}/customerreviewdataall/${stationarray}`)
        const response = await axios.get(`${apiurl}/customerreviewdataallmonth/${stationarray}/${datestart}/${dateEnd}`)
        const data = response.data
        setTodayBooking(data)
    
     

      }
      else {
        return
      }
    }
    catch (err) {
      console.log(err)


    }
  }

  useLayoutEffect(() => {
    fetchalldata()
    fetchdatachart()
    setViewMonthdata("monthly")
  }, [])

  const handleMonthlyView = () => {
    setViewMonthdata("monthly");
    fetchalldata()
    fetchdatachart()
  };


  return (
    <div className="Table">
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", alignItems: "center" }}>
        <h1 className="live-driver-status-heading">Live Driver Status</h1>
        <div className="button-container date-button-container">
          <button
            onClick={handleMonthlyView}
            className="graph-all-button">All</button>
          <button
            onClick={handleWeeklyView}
            className="graph-weekly-button">Today</button>
          {/* <button onClick={handleYesterdayView} className="graph-yesterday-button">custom date</button> */}
          <button
            onClick={showDateFunction}
            id="custom-date" className="graph-yesterday-button">custom date</button>
          {showdDate &&
            <div className="dashboard-date-popup">
              <div className="dashboard-date-popup-close"
                onClick={closeDateFunction}
              >x</div>
              <div className="dashboard-date-popup-main-division">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="From Date"
                    id="fromDate"
                    name="fromDate"
                    format="DD/MM/YYYY"
                    value={fromDate}
                    onChange={(date) => setFromDate(date)}
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="To Date"
                    name="toDate"
                    id="toDate"
                    format="DD/MM/YYYY"
                    value={toDate}
                    onChange={(date) => setToDate(date)}
                  />
                </LocalizationProvider>
              </div>
              <div className="dashboard-date-popup-search-division">
                <Button variant="contained"
                  onClick={custombookingdate}
                >
                  Search
                </Button>
              </div>
            </div>
          }
        </div>

      </div>


      <TableContainer
        className="Scroll-Style total-table"
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className="driverdetails-table-header">
              <TableCell align="left" className="driverdetails-table-head">Driver Name</TableCell>
              <TableCell align="left" className="driverdetails-table-head">Tracking ID</TableCell>
              <TableCell align="left" className="driverdetails-table-head">Date</TableCell>
              <TableCell align="left" className="driverdetails-table-head">Status</TableCell>
              <TableCell align="left" className="driverdetails-table-head">View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {( filteredData &&
              filteredData.length > 0 ? (
                filteredData.slice().reverse().map((trip) => (
                  <TableRow
                    key={trip.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" className="driver-name">{trip.driverName ? trip.driverName : 'Not Assigned'}</TableCell>
                    <TableCell align="left" className="driver-trip-id">TS{trip.tripid}</TableCell>
                    {/* <TableCell align="left">{trip.startdate}</TableCell> */}
                    <TableCell align="left" className="driver-trip-date">{trip.startdate ? format(new Date(trip.startdate), 'dd/MM/yyyy') : "dd/mm/yy"}</TableCell>
                    <TableCell className="driver-tripstatus"><span className="status" style={makeStyle(trip.apps)}>{trip.apps ? trip.apps : "Not Mentioned"}</span></TableCell>
                    <TableCell className="Details driver-details">
                      <div >
                      <Button onClick={() => handleButtonClickTripsheet(trip)}>Details</Button>
                      </div>
                    </TableCell>

                  </TableRow>
                ))
              ) : (
                // <tr>
                <TableCell style={{ justifyContent: 'center' }}>No data available.</TableCell>

                // <td colSpan={6}>No data available.</td>
                // </tr>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>




      <Dialog
        open={popupOpen}
        onClose={handlePopupClose}
        fullWidth={true}
        maxWidth="md" // This can be set to 'xs', 'sm', 'md', 'lg', or 'xl'
        sx={{
          '& .MuiDialog-paper': {
            width: '800px', // Adjust this value to increase the width
            maxWidth: '800px', // Ensure the width is strictly set to 800px
          },
        }}
        className="dialog-box-TripDetails"
      >
        <div className="dialog-close-btn">
          <DialogActions>
            <IconButton onClick={handlePopupClose} aria-label="close">
              <HighlightOffIcon />
            </IconButton>
          </DialogActions>
        </div>
        <DialogContent className="Scroll-Style-Slim">
          {selectedTrip && <Tripdetails tripData={selectedTrip} />}
        </DialogContent>
      </Dialog>


    </div>
  );
} 