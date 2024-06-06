import { React, useState } from "react";
// import axios from 'axios';
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
//dialog box
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import { APIURL } from "../../../url";
import { useData } from "../../Maindashboard/DataContext";

// ICON
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
// import { BiBorderRadius } from "react-icons/bi";

// const apiUrl = APIURL;

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

export default function BasicTable() {

  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);

  const { filteredData } = useData();

  // const data1 = filteredData;
  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  const handleButtonClickTripsheet = (trip) => {
    console.log(trip, "ttt")
    setSelectedTrip(trip);
    setPopupOpen(true);
  };

  return (
    <div className="Table">
      <h1 className="live-driver-status-heading">Live Driver Status</h1>
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
            {(
              filteredData && filteredData.length > 0 ? (
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
                      <Button onClick={() => handleButtonClickTripsheet(trip)}>Details</Button>
                    </TableCell>
                    {/* <Dialog open={popupOpen} className="dialog-box-TripDetails" >
                      <div className="dialog-close-btn">
                        <DialogActions>
                          <IconButton onClick={handlePopupClose} aria-label="delete">
                            <HighlightOffIcon />
                          </IconButton>
                        </DialogActions>
                      </div>
                      <DialogContent>
                        {selectedTrip && <Tripdetails tripData={selectedTrip} />}
                      </DialogContent>
                    </Dialog> */}
                  </TableRow>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>No data available.</td>
                </tr>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={popupOpen} className="dialog-box-TripDetails" >
        <div className="dialog-close-btn">
          <DialogActions>
            <IconButton onClick={handlePopupClose} aria-label="delete">
              <HighlightOffIcon />
            </IconButton>
          </DialogActions>
        </div>
        <DialogContent className="Scroll-Style-Slim">
          {/* {selectedTrip && <Tripdetails tripData={selectedTrip} />} */}
          {selectedTrip && <Tripdetails tripData={selectedTrip} />}
        </DialogContent>
      </Dialog>
    </div>
  );
} 