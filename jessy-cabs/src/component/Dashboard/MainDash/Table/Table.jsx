import { React, useState, useEffect } from "react";
// import axios from 'axios';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tripdetails from './Tripdetails';//tripsheet details page

import "./Table.css";
import { Button, IconButton } from "@mui/material";
//dialog box
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

// ICON
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
const makeStyle = (status) => {
  if (status === 'Waiting' || status === 'On_Going') {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
    }
  }
  else if (status === 'Closed') {
    return {
      background: '#ffadad8f',
      color: 'red',
    }
  }
  else {
    return {
      background: '#59bfff',
      color: 'white',
    }
  }
}

export default function BasicTable() {
  const [filteredData, setFilteredData] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8081/tripsheet');
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setFilteredData(data);
        } else {
          setFilteredData([]);
        }
      } else {
        console.error('Error fetching tripsheets');
      }
    } catch (error) {
      console.error('Error fetching tripsheets:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const handleButtonClickTripsheet = (selectedRow) => {
  //   const bookingPageUrl = `/home/bookings/tripsheet?tripid=${selectedRow.tripid || ''}&bookingno=${selectedRow.bookingno || ''}&status=${selectedRow.status || ''}&billingno=${selectedRow.billingno || ''}&apps=${selectedRow.apps || ''}&customer=${selectedRow.customer || ''}&orderedby=${selectedRow.orderedby || ''}&mobile=${selectedRow.mobile || ''}&guestname=${selectedRow.guestname || ''}&guestmobileno=${selectedRow.guestmobileno || ''}&email=${selectedRow.email || ''}&employeeno=${selectedRow.employeeno || ''}&guestmobileno=${selectedRow.guestmobileno || ''}&email=${selectedRow.email || ''}&address1=${selectedRow.address1 || ''}&streetno=${selectedRow.streetno || ''}&city=${selectedRow.city || ''}&hireTypes=${selectedRow.hireTypes || ''}&department=${selectedRow.department || ''}&vehRegNo=${selectedRow.vehRegNo || ''}&vehType=${selectedRow.vehType || ''}&driverName=${selectedRow.driverName || ''}&mobileNo=${selectedRow.mobileNo || ''}&driversmsexbetta=${selectedRow.driversmsexbetta || ''}&gps=${selectedRow.gps || ''}&duty=${selectedRow.duty || ''}&pickup=${selectedRow.pickup || ''}&useage=${selectedRow.useage || ''}&request=${selectedRow.request || ''}&startdate=${selectedRow.startdate || ''}&closedate=${selectedRow.closedate || ''}&totaldays=${selectedRow.totaldays || ''}&employeeno=${selectedRow.employeeno || ''}&reporttime=${selectedRow.reporttime || ''}&shedkm=${selectedRow.shedkm || ''}&shedin=${selectedRow.shedin || ''}&shedout=${selectedRow.shedout || ''}&starttime=${selectedRow.starttime || ''}&closetime=${selectedRow.closetime || ''}&additionaltime=${selectedRow.additionaltime || ''}&advancepaidtovendor=${selectedRow.advancepaidtovendor || ''}&customercode=${selectedRow.customercode || ''}&startkm=${selectedRow.startkm || ''}&closekm=${selectedRow.closekm || ''}&permit=${selectedRow.permit || ''}&parking=${selectedRow.parking || ''}&toll=${selectedRow.toll || ''}&vpermettovendor=${selectedRow.vpermettovendor || ''}&vendortoll=${selectedRow.vendortoll || ''}&customeradvance=${selectedRow.customeradvance || ''}&email1=${selectedRow.email1 || ''}&remark=${selectedRow.remark || ''}&smsguest=${selectedRow.smsguest || ''}&documentnotes=${selectedRow.documentnotes || ''}&VendorTripNo=${selectedRow.VendorTripNo || ''}&vehicles=${selectedRow.vehicles || ''}&duty1=${selectedRow.duty1 || ''}&startdate1=${selectedRow.startdate1 || ''}&closedate1=${selectedRow.closedate1 || ''}&totaldays1=${selectedRow.totaldays1 || ''}&locks=${selectedRow.locks || ''}&starttime2=${selectedRow.starttime2 || ''}&closetime2=${selectedRow.closetime2 || ''}&totaltime=${selectedRow.totaltime || ''}&startkm1=${selectedRow.startkm1 || ''}&closekm1=${selectedRow.closekm1 || ''}&totalkm1=${selectedRow.totalkm1 || ''}&remark1=${selectedRow.remark1 || ''}&caramount=${selectedRow.caramount || ''}&minkm=${selectedRow.minkm || ''}&minhrs=${selectedRow.minhrs || ''}&package=${selectedRow.package || ''}&amount=${selectedRow.amount || ''}&exkm=${selectedRow.exkm || ''}&amount1=${selectedRow.amount1 || ''}&exHrs=${selectedRow.exHrs || ''}&amount2=${selectedRow.amount2 || ''}&night=${selectedRow.night || ''}&amount3=${selectedRow.amount3 || ''}&driverconvenience=${selectedRow.driverconvenience || ''}&amount4=${selectedRow.amount4 || ''}&netamount=${selectedRow.netamount || ''}&vehcommission=${selectedRow.vehcommission || ''}&caramount1=${selectedRow.caramount1 || ''}&manualbills=${selectedRow.manualbills || ''}&pack=${selectedRow.pack || ''}&amount5=${selectedRow.amount5 || ''}&exkm1=${selectedRow.exkm1 || ''}&amount6=${selectedRow.amount6 || ''}&exHrs1=${selectedRow.exHrs1 || ''}&amount7=${selectedRow.amount7 || ''}&night1=${selectedRow.night1 || ''}&amount8=${selectedRow.amount8 || ''}&driverconvenience1=${selectedRow.driverconvenience1 || ''}&amount9=${selectedRow.amount9 || ''}&rud=${selectedRow.rud || ''}&netamount1=${selectedRow.netamount1 || ''}&discount=${selectedRow.discount || ''}&ons=${selectedRow.ons || ''}&manualbills1=${selectedRow.manualbills1 || ''}&balance=${selectedRow.balance || ''}&fcdate=${selectedRow.fcdate || ''}&taxdate=${selectedRow.taxdate || ''}&insdate=${selectedRow.insdate || ''}&stpermit=${selectedRow.stpermit || ''}&maintenancetype=${selectedRow.maintenancetype || ''}&kilometer=${selectedRow.kilometer || ''}&selects=${selectedRow.selects || ''}&documenttype=${selectedRow.documenttype || ''}&on1=${selectedRow.on1 || ''}&smsgust=${selectedRow.smsgust || ''}&booker=${selectedRow.booker || ''}&emailcheck=${selectedRow.emailcheck || ''}&valueprint=${selectedRow.valueprint || ''}&manualbillss=${selectedRow.manualbillss || ''}&reload=${selectedRow.reload || ''}`;
  //   window.location.href = bookingPageUrl;
  // }

  // const handleButtonClickTripsheet = (selectedRow) => {
  //   if (!selectedRow) {
  //     console.error("Selected row is undefined");
  //     return;
  //   } else {
  //     const bookingPageUrl = `/home/bookings/tripsheet?` +
  //       `tripid=${encodeURIComponent(selectedRow.tripid || '')}` +
  //       `&bookingno=${encodeURIComponent(selectedRow.bookingno || '')}` +
  //       `&status=${encodeURIComponent(selectedRow.status || '')}` +
  //       `&billingno=${encodeURIComponent(selectedRow.billingno || '')}` +
  //       `&apps=${encodeURIComponent(selectedRow.apps || '')}` +
  //       `&customer=${encodeURIComponent(selectedRow.customer || '')}` +
  //       `&orderedby=${encodeURIComponent(selectedRow.orderedby || '')}` +
  //       `&mobile=${encodeURIComponent(selectedRow.mobile || '')}` +
  //       `&guestname=${encodeURIComponent(selectedRow.guestname || '')}` +
  //       `&guestmobileno=${encodeURIComponent(selectedRow.guestmobileno || '')}` +
  //       `&email=${encodeURIComponent(selectedRow.email || '')}` +
  //       `&employeeno=${encodeURIComponent(selectedRow.employeeno || '')}` +
  //       `&guestmobileno=${encodeURIComponent(selectedRow.guestmobileno || '')}` +
  //       `&email=${encodeURIComponent(selectedRow.email || '')}` +
  //       `&address1=${encodeURIComponent(selectedRow.address1 || '')}` +
  //       `&streetno=${encodeURIComponent(selectedRow.streetno || '')}` +
  //       `&city=${encodeURIComponent(selectedRow.city || '')}` +
  //       `&hireTypes=${encodeURIComponent(selectedRow.hireTypes || '')}` +
  //       `&department=${encodeURIComponent(selectedRow.department || '')}` +
  //       `&vehRegNo=${encodeURIComponent(selectedRow.vehRegNo || '')}` +
  //       `&vehType=${encodeURIComponent(selectedRow.vehType || '')}` +
  //       `&driverName=${encodeURIComponent(selectedRow.driverName || '')}` +
  //       `&mobileNo=${encodeURIComponent(selectedRow.mobileNo || '')}` +
  //       `&driversmsexbetta=${encodeURIComponent(selectedRow.driversmsexbetta || '')}` +
  //       `&gps=${encodeURIComponent(selectedRow.gps || '')}` +
  //       `&duty=${encodeURIComponent(selectedRow.duty || '')}` +
  //       `&pickup=${encodeURIComponent(selectedRow.pickup || '')}` +
  //       `&useage=${encodeURIComponent(selectedRow.useage || '')}` +
  //       `&request=${encodeURIComponent(selectedRow.request || '')}` +
  //       `&startdate=${encodeURIComponent(selectedRow.startdate || '')}` +
  //       `&closedate=${encodeURIComponent(selectedRow.closedate || '')}` +
  //       `&totaldays=${encodeURIComponent(selectedRow.totaldays || '')}` +
  //       `&employeeno=${encodeURIComponent(selectedRow.employeeno || '')}` +
  //       `&reporttime=${encodeURIComponent(selectedRow.reporttime || '')}` +
  //       `&shedkm=${encodeURIComponent(selectedRow.shedkm || '')}` +
  //       `&shedin=${encodeURIComponent(selectedRow.shedin || '')}` +
  //       `&shedout=${encodeURIComponent(selectedRow.shedout || '')}` +
  //       `&starttime=${encodeURIComponent(selectedRow.starttime || '')}` +
  //       `&closetime=${encodeURIComponent(selectedRow.closetime || '')}` +
  //       `&additionaltime=${encodeURIComponent(selectedRow.additionaltime || '')}` +
  //       `&advancepaidtovendor=${encodeURIComponent(selectedRow.advancepaidtovendor || '')}` +
  //       `&customercode=${encodeURIComponent(selectedRow.customercode || '')}` +
  //       `&startkm=${encodeURIComponent(selectedRow.startkm || '')}` +
  //       `&closekm=${encodeURIComponent(selectedRow.closekm || '')}` +
  //       `&permit=${encodeURIComponent(selectedRow.permit || '')}` +
  //       `&parking=${encodeURIComponent(selectedRow.parking || '')}` +
  //       `&toll=${encodeURIComponent(selectedRow.toll || '')}` +
  //       `&vpermettovendor=${encodeURIComponent(selectedRow.vpermettovendor || '')}` +
  //       `&vendortoll=${encodeURIComponent(selectedRow.vendortoll || '')}` +
  //       `&customeradvance=${encodeURIComponent(selectedRow.customeradvance || '')}` +
  //       `&email1=${encodeURIComponent(selectedRow.email1 || '')}` +
  //       `&remark=${encodeURIComponent(selectedRow.remark || '')}` +
  //       `&smsguest=${encodeURIComponent(selectedRow.smsguest || '')}` +
  //       `&documentnotes=${encodeURIComponent(selectedRow.documentnotes || '')}` +
  //       `&VendorTripNo=${encodeURIComponent(selectedRow.VendorTripNo || '')}` +
  //       `&vehicles=${encodeURIComponent(selectedRow.vehicles || '')}` +
  //       `&duty1=${encodeURIComponent(selectedRow.duty1 || '')}` +
  //       `&startdate1=${encodeURIComponent(selectedRow.startdate1 || '')}` +
  //       `&closedate1=${encodeURIComponent(selectedRow.closedate1 || '')}` +
  //       `&totaldays1=${encodeURIComponent(selectedRow.totaldays1 || '')}` +
  //       `&locks=${encodeURIComponent(selectedRow.locks || '')}` +
  //       `&starttime2=${encodeURIComponent(selectedRow.starttime2 || '')}` +
  //       `&closetime2=${encodeURIComponent(selectedRow.closetime2 || '')}` +
  //       `&totaltime=${encodeURIComponent(selectedRow.totaltime || '')}` +
  //       `&startkm1=${encodeURIComponent(selectedRow.startkm1 || '')}` +
  //       `&closekm1=${encodeURIComponent(selectedRow.closekm1 || '')}` +
  //       `&totalkm1=${encodeURIComponent(selectedRow.totalkm1 || '')}` +
  //       `&remark1=${encodeURIComponent(selectedRow.remark1 || '')}` +
  //       `&caramount=${encodeURIComponent(selectedRow.caramount || '')}` +
  //       `&minkm=${encodeURIComponent(selectedRow.minkm || '')}` +
  //       `&minhrs=${encodeURIComponent(selectedRow.minhrs || '')}` +
  //       `&package=${encodeURIComponent(selectedRow.package || '')}` +
  //       `&amount=${encodeURIComponent(selectedRow.amount || '')}` +
  //       `&exkm=${encodeURIComponent(selectedRow.exkm || '')}` +
  //       `&amount1=${encodeURIComponent(selectedRow.amount1 || '')}` +
  //       `&exHrs=${encodeURIComponent(selectedRow.exHrs || '')}` +
  //       `&amount2=${encodeURIComponent(selectedRow.amount2 || '')}` +
  //       `&night=${encodeURIComponent(selectedRow.night || '')}` +
  //       `&amount3=${encodeURIComponent(selectedRow.amount3 || '')}` +
  //       `&driverconvenience=${encodeURIComponent(selectedRow.driverconvenience || '')}` +
  //       `&amount4=${encodeURIComponent(selectedRow.amount4 || '')}` +
  //       `&netamount=${encodeURIComponent(selectedRow.netamount || '')}` +
  //       `&vehcommission=${encodeURIComponent(selectedRow.vehcommission || '')}` +
  //       `&caramount1=${encodeURIComponent(selectedRow.caramount1 || '')}` +
  //       `&manualbills=${encodeURIComponent(selectedRow.manualbills || '')}` +
  //       `&pack=${encodeURIComponent(selectedRow.pack || '')}` +
  //       `&amount5=${encodeURIComponent(selectedRow.amount5 || '')}` +
  //       `&exkm1=${encodeURIComponent(selectedRow.exkm1 || '')}` +
  //       `&amount6=${encodeURIComponent(selectedRow.amount6 || '')}` +
  //       `&exHrs1=${encodeURIComponent(selectedRow.exHrs1 || '')}` +
  //       `&amount7=${encodeURIComponent(selectedRow.amount7 || '')}` +
  //       `&night1=${encodeURIComponent(selectedRow.night1 || '')}` +
  //       `&amount8=${encodeURIComponent(selectedRow.amount8 || '')}` +
  //       `&driverconvenience1=${encodeURIComponent(selectedRow.driverconvenience1 || '')}` +
  //       `&amount9=${encodeURIComponent(selectedRow.amount9 || '')}` +
  //       `&rud=${encodeURIComponent(selectedRow.rud || '')}` +
  //       `&netamount1=${encodeURIComponent(selectedRow.netamount1 || '')}` +
  //       `&discount=${encodeURIComponent(selectedRow.discount || '')}` +
  //       `&ons=${encodeURIComponent(selectedRow.ons || '')}` +
  //       `&manualbills1=${encodeURIComponent(selectedRow.manualbills1 || '')}` +
  //       `&balance=${encodeURIComponent(selectedRow.balance || '')}` +
  //       `&fcdate=${encodeURIComponent(selectedRow.fcdate || '')}` +
  //       `&taxdate=${encodeURIComponent(selectedRow.taxdate || '')}` +
  //       `&insdate=${encodeURIComponent(selectedRow.insdate || '')}` +
  //       `&stpermit=${encodeURIComponent(selectedRow.stpermit || '')}` +
  //       `&maintenancetype=${encodeURIComponent(selectedRow.maintenancetype || '')}` +
  //       `&kilometer=${encodeURIComponent(selectedRow.kilometer || '')}` +
  //       `&selects=${encodeURIComponent(selectedRow.selects || '')}` +
  //       `&documenttype=${encodeURIComponent(selectedRow.documenttype || '')}` +
  //       `&on1=${encodeURIComponent(selectedRow.on1 || '')}` +
  //       `&smsgust=${encodeURIComponent(selectedRow.smsgust || '')}` +
  //       `&booker=${encodeURIComponent(selectedRow.booker || '')}` +
  //       `&emailcheck=${encodeURIComponent(selectedRow.emailcheck || '')}` +
  //       `&valueprint=${encodeURIComponent(selectedRow.valueprint || '')}` +
  //       `&manualbillss=${encodeURIComponent(selectedRow.manualbillss || '')}` +
  //       `&reload=${encodeURIComponent(selectedRow.reload || '')}`;
  //     window.location.href = bookingPageUrl;
  //   }
  // }

  // const [tripSheetData, setTripSheetData] = useState({
  //   customer: '',
  //   address1: '',
  //   orderedby: '',
  //   employeeno: '',
  //   customercode: '',
  //   guestname: '',
  //   tripid: '',
  //   startdate: '',
  //   duty: '',
  //   vehType: '',
  //   vehRegNo: '',
  //   driverName: '',
  //   mobileNo: '',
  //   closedate: '',
  //   starttime: '',
  //   startkm: '',
  //   closetime: '',
  //   closekm: '',
  //   totalkm1: '',
  //   totaltime: '',
  //   totalDays: '',
  //   remark: '',
  //   parking: '',
  //   permit: '',
  // });

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  const handleButtonClickTripsheet = (trip) => {
    setSelectedTrip(trip);
    setPopupOpen(true);
  };


  return (
    <div className="Table">
      <h1>Live Driver Status</h1>

      <TableContainer
        className="Scroll-Style"
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Driver</TableCell>
              <TableCell align="left">Tracking ID</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {filteredData && filteredData.length > 0 ? (
              filteredData.slice().reverse().map((trip) => (
                <TableRow
                  key={trip.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{trip.driverName}</TableCell>
                  <TableCell align="left">TS{trip.tripid}</TableCell>
                  <TableCell align="left">{trip.startdate}</TableCell>
                  <TableCell align="left"><span className="status" style={makeStyle(trip.apps)}>{trip.apps}</span></TableCell>
                  <TableCell align="left" className="Details">
                    <Button onClick={() => handleButtonClickTripsheet(trip)}>Details</Button>
                  </TableCell>

                  <Dialog open={popupOpen} className="dialog-box-TripDetails" >
                    <div className="dialog-close-btn">
                      <DialogActions>
                        <IconButton onClick={handlePopupClose} aria-label="delete">
                          <HighlightOffIcon />
                        </IconButton>
                      </DialogActions>
                    </div>
                    <DialogContent>
                      <Tripdetails />
                      {selectedTrip && <Tripdetails tripData={selectedTrip} />}
                    </DialogContent>
                  </Dialog>

                </TableRow>
              ))
            ) : (
              <tr>
                <td colSpan={6}>No data available.</td>
              </tr>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
} 