import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import dayjs from "dayjs";
import "./BookingChart.css";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { VehicleModel } from "./BookingChart";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// ICONS
import ClearIcon from '@mui/icons-material/Clear';
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';

const BookingChart = () => {
  const user_id = localStorage.getItem('useridno');

  const [fromDate, setFromDate] = useState(dayjs());
  const [toDate, setToDate] = useState(dayjs());
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [info, setInfo] = useState(false);
  const [warning, setWarning] = useState(false);
  const [successMessage] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [warningMessage] = useState({});
  const [infoMessage] = useState({});

  // for page permission

  const [userPermissions, setUserPermissions] = useState({});

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const currentPageName = 'Booking';
        const response = await axios.get(`http://localhost:8081/user-permissions/${user_id}/${currentPageName}`);
        setUserPermissions(response.data);
        console.log('permission data', response.data);
      } catch (error) {
        console.error('Error fetching user permissions:', error);
      }
    };

    fetchPermissions();
  }, [user_id]);

  const checkPagePermission = () => {
    const currentPageName = 'Booking';
    const permissions = userPermissions || {};

    if (permissions.page_name === currentPageName) {
      return {
        read: permissions.read_permission === 1,
        new: permissions.new_permission === 1,
        modify: permissions.modify_permission === 1,
        delete: permissions.delete_permission === 1,
      };
    }

    return {
      read: false,
      new: false,
      modify: false,
      delete: false,
    };
  };

  const permissions = checkPagePermission();

  // Function to determine if a field should be read-only based on permissions
  const isFieldReadOnly = (fieldName) => {
    if (permissions.read) {
      // If user has read permission, check for other specific permissions
      if (fieldName === "delete" && !permissions.delete) {
        return true;
      }
      return false;
    }
    return true;
  };


  const hidePopup = () => {
    setSuccess(false);
    setError(false);
    setInfo(false);
    setWarning(false);
  };
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000); // 3 seconds
      return () => clearTimeout(timer); // Clean up the timer on unmount
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000); // 3 seconds
      return () => clearTimeout(timer); // Clean up the timer on unmount
    }
  }, [success]);
  useEffect(() => {
    if (warning) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000); // 3 seconds
      return () => clearTimeout(timer); // Clean up the timer on unmount
    }
  }, [warning]);
  useEffect(() => {
    if (info) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000); // 3 seconds
      return () => clearTimeout(timer); // Clean up the timer on unmount
    }
  }, [info]);
  const [vehicles, setVehicles] = useState(() => {
    const initialVehicles = VehicleModel.map((vehicle, index) => ({
      id: index + 1,
      registerno: index + 1,
      vehicleName: vehicle.carmodel,
      bookings: {},
    }));

    initialVehicles.forEach((vehicle) => {
      vehicle.length = vehicle.vehicleName.length;
    });
    return initialVehicles;
  });
  const showBookedStatusAll = useCallback(async (from, to) => {

    try {
      const response = await axios.get(`http://localhost:8081/bookingchart`, {
        params: {
          fromDate: from.format('YYYY-MM-DD'),
          toDate: to.format('YYYY-MM-DD'),
        },
      });
      const bookingData = response.data; // Fetch the booking data from the API response
      const bookingCounts = {};
      bookingData.forEach((booking) => {
        const vehicleName = booking.vehType;
        const formattedDate = dayjs(booking.bookingdate).format("YYYY-MM-DD");
        if (!bookingCounts[vehicleName]) {
          bookingCounts[vehicleName] = {};
        }
        bookingCounts[vehicleName][formattedDate] = {
          count: (bookingCounts[vehicleName][formattedDate]?.count || 0) + 1,
        };
      });
      setVehicles((prevVehicles) => {
        const updatedVehicles = prevVehicles.map((vehicle) => ({
          ...vehicle,
          bookings: {
            ...vehicle.bookings,
            ...bookingCounts[vehicle.vehicleName],
          },
        }));
        return updatedVehicles;
      });
    } catch {
      setErrorMessage("Check your Network Connection");
    }

  }, []);
  const generateColumns = () => {
    const columns = [
      { field: "id", headerName: "Sno", width: 70 },
      { field: "vehicleName", headerName: "Vehicle Name", width: 130 },
    ];
    let currentDate = dayjs(fromDate);
    const lastDate = dayjs(toDate);
    while (currentDate.isBefore(lastDate) || currentDate.isSame(lastDate, "day")) {
      const formattedDate = currentDate.format("YYYY-MM-DD");
      columns.push({
        field: formattedDate,
        headerName: formattedDate,
        width: 130,
        valueGetter: createValueGetter(formattedDate),
      });

      currentDate = currentDate.add(1, "day");
    }
    return columns;
  };
  const createValueGetter = (bookingDate) => (params) => {
    return params.row.bookings[bookingDate]?.count || 0;
  };
  const columns = generateColumns();
  return (
    <div className="BookingChart-form Scroll-Style-hide">
      <form action="">
        <div className="detail-container-main">
          <div className="container-left">
            <div className="copy-title-btn-BookingChart">
              <div className="input-field">
                <div className="input" style={{ width: "50%" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="From Date"
                      format="DD/MM/YYYY"
                      value={fromDate}
                      onChange={(date) => setFromDate(date)}
                    />
                  </LocalizationProvider>
                </div>
                <div className="input" style={{ width: "50%" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="To Date"
                      format="DD/MM/YYYY"
                      value={toDate}
                      onChange={(date) => setToDate(date)}
                    />
                  </LocalizationProvider>
                </div>
                <div className="input" style={{ width: "460px" }}>
                  <Button
                    variant="contained"
                    onClick={() => showBookedStatusAll(fromDate, toDate)}
                    disabled={isFieldReadOnly("read")}
                  >
                    Show Booked Status All
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {error &&
          <div className='alert-popup Error' >
            <div className="popup-icon"> <ClearIcon style={{ color: '#fff' }} /> </div>
            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
            <p>{errorMessage}</p>
          </div>
        }
        {warning &&
          <div className='alert-popup Warning' >
            <div className="popup-icon"> <ErrorOutlineIcon style={{ color: '#fff' }} /> </div>
            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
            <p>{warningMessage}</p>
          </div>
        }
        {success &&
          <div className='alert-popup Success' >
            <div className="popup-icon"> <FileDownloadDoneIcon style={{ color: '#fff' }} /> </div>
            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
            <p>{successMessage}</p>
          </div>
        }
        {info &&
          <div className='alert-popup Info' >
            <div className="popup-icon"> <BsInfo style={{ color: '#fff' }} /> </div>
            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
            <p>{infoMessage}</p>
          </div>
        }
        <div className="table-bookingCopy-BookingChart">
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              className="Scroll-Style"
              rows={vehicles}
              columns={columns}
              pageSize={5}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookingChart;
