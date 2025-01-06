import React, { useState, useEffect } from 'react'
import Button from "@mui/material/Button";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Box from "@mui/material/Box";
import dayjs from "dayjs";

// import SellIcon from "@mui/icons-material/Sell";
import ClearIcon from "@mui/icons-material/Clear";
import "./LogDetails.css";
import axios from 'axios'
import { APIURL } from '../../../url'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Autocomplete } from "@mui/material";
import { TextField } from '@mui/material';
import PermIdentityIcon from "@mui/icons-material/PermIdentity";


const LogDetails = () => {
  const apiurl = APIURL
  const [logdetails, setLogDetails] = useState([])
  const [selecteddata, setSelectedData] = useState('')
  const [selectbooking, setSelectedBooking] = useState()
  const [selectcolumns, setSelectedColumns] = useState([{}])
  const [error, setError] = useState(false);
  const [info, setInfo] = useState(false);
  const [infoMessage, setInfoMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [warning, setWarning] = useState(false)
  const [warningMessage, setWarningMessage] = useState({});
  const [success, setSuccess] = useState(false);
  const [allUserNames, setAllUserNames] = useState([])
  const [logDateDetails, setLogDateDetails] = useState({
    selectType: "",
    selectbookingId: "",
    fromDate: dayjs().format('YYYY-MM-DD'),
    toDate: dayjs().format('YYYY-MM-DD'),
    userName: "",
  })


  // const handlecolumnvalues = (data) => {
  //   const headers = Object.keys(data[0]);
  //   const columns = headers.map(key => ({ field: key, headerName: key, width: 150 }));

  //   setSelectedColumns(columns)
  // }
  const handlecolumnvalues = (data) => {
    const headers = Object.keys(data[0]);

    const columns = headers.map((key) => {
      let valueFormatter = null;

      // Apply date formatting for specific fields
      // if (["Log_Time", "Log_Date", "bookingdate", "startdate", "tripsheet_date", "shedInDate", "shedOutDate", "Reportdate", "closedate"].includes(key)) {
      //   valueFormatter = (params) => {
      //     return params.value ? dayjs(params.value).format('DD-MM-YYYY') : '';
      //   };
      // }

      // // Apply time formatting for specific time fields
      // if (["Log_Date", "Log_Time", "bookingtime", "starttime", "Reporttime", "ShedOutTime",].includes(key)) {
      //   valueFormatter = (params) => {
      //     return params.value ? dayjs(params.value, 'HH:mm').format('HH:mm') : '';
      //   };
      // }

      if (["bookingdate", "startdate", "tripsheet_date", "shedInDate", "shedOutDate", "Reportdate", "closedate"].includes(key)) {
        valueFormatter = (params) => {
          return params.value ? dayjs(params.value).format('DD-MM-YYYY') : '';
        };
      }

      // Apply time formatting for specific time fields
      if (["Log_Time", "bookingtime", "starttime", "Reporttime", "ShedOutTime",].includes(key)) {
        valueFormatter = (params) => {
          return params.value ? dayjs(params.value, 'HH:mm').format('HH:mm') : '';
        };
      }


      return {
        field: key,
        headerName: key,
        width: 150,
        valueFormatter, // Attach the valueFormatter if it's a date or time field
      };
    });

    setSelectedColumns(columns);
  };

  // get All usernames
  useEffect(() => {
    const fetchUserNames = async () => {
      const response = await axios.get(`${apiurl}/getAllUserNames`);
      const data = response.data;
      // console.log(data, "data")
      const usernamedatas = data?.map(li => li.username)
      setAllUserNames(usernamedatas)
    }
    fetchUserNames()
  }, [apiurl])

  const handleshowdetails = async () => {

    if (!logDateDetails.selectType) {
      setWarning(true);
      setWarningMessage("Select Type")
      return
    }
    if (!logDateDetails.userName) {
      setWarning(true);
      setWarningMessage("Select userName ")
      return
    }

    try {
      // const response = await axios.get(`${apiurl}/bookinglogdetailsget/${selectbooking}`);
      const response = await axios.get(`${apiurl}/bookinglogdetailsget`, {
        params: logDateDetails,
      });
      const data = response.data;
      if (data.length > 0) {


        setLogDetails(data)
        handlecolumnvalues(data)
        setSuccess(true);
        setSuccessMessage("Succesfully listed")
      }
      else {
        setLogDetails([])
        setError(true);
        setErrorMessage("Data not found")

      }
    }
    //  catch (err) {
    //   setError(true);
    //   setErrorMessage("check ur Network Connection")
    // }
    catch (error) {
      // console.error("Error occurredddddd:", error);

      // Check if there's no response, indicating a network error
      if (error.message) {
        setError(true);
        setErrorMessage("Check your Network Connection");
        // console.log('Network error');
      } else if (error.response) {
        setError(true);
        // Handle other Axios errors (like 4xx or 5xx responses)
        setErrorMessage("Failed to Show Log Details: " + (error.response.data.message || error.message));
      } else {
        // Fallback for other errors
        setError(true);
        setErrorMessage("An unexpected error occurred: " + error.message);
      }
    }
  }
  const hidePopup = () => {
    setSuccess(false);
    setError(false);
    setInfo(false);
    setWarning(false);
  };

  useEffect(() => {
    if (error || warning || info || success) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, warning, info, success]);


  const handleshowdetailstripsheet = async () => {

    if (!logDateDetails.selectType) {
      setWarning(true);
      setWarningMessage("Select Type")
      return
    }

    if (!logDateDetails.userName) {
      setWarning(true);
      setWarningMessage("Select userName")
      return
    }

    try {
      const response = await axios.get(`${apiurl}/trpisheetlogdetailst`, {
        params: logDateDetails,
      });
      const data = response.data;
      console.log(data, "ff")
      if (data.length > 0) {


        setLogDetails(data)
        handlecolumnvalues(data)
        setSuccess(true);
        setSuccessMessage("Succesfully listed")
      }
      else {
        // setLogDetails([])
        setError(true);
        setErrorMessage("Data not found")
        setLogDetails([])
        // return
      }
    }


    // catch (err) {
    //   console.log(err)
    //   setError(true);
    //   setErrorMessage("check ur Network Connection")
    // }
    catch (error) {
      // console.error("Error occurredddddd:", error);

      // Check if there's no response, indicating a network error
      if (error.message) {
        setError(true);
        setErrorMessage("Check your Network Connection");
        // console.log('Network error');
      } else if (error.response) {
        setError(true);
        // Handle other Axios errors (like 4xx or 5xx responses)
        setErrorMessage("Failed to Show Log Details: " + (error.response.data.message || error.message));
      } else {
        // Fallback for other errors
        setError(true);
        setErrorMessage("An unexpected error occurred: " + error.message);
      }
    }
  }


  const handleKeyDownlogDetails = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (!logDateDetails.selectType) {
        setWarning(true);
        setWarningMessage("Select Type")
        return
      }
      if (!logDateDetails.selectbookingId) {
        setWarning(true);
        setWarningMessage("Enter Id")
        return
      }
      console.log(event.target.value,"valueee")
      
      try {
        const response = await axios.get(`${apiurl}/handlelogdetails/${event.target.value}/${logDateDetails?.selectType}` );
        // const response = await axios.get(
        //   `${apiUrl}/booking/${event.target.value}`,{ params: { loginUserName } } );
        const bookingDetails = response.data;
        console.log(bookingDetails,"mmmmmmmmmmmmmmmmmmm")
        if (bookingDetails.length > 0) {


          setLogDetails(bookingDetails)
          handlecolumnvalues(bookingDetails)
          setSuccess(true);
          setSuccessMessage("Succesfully listed")
        }
        else {
          setLogDetails([])
          setError(true);
          setErrorMessage("Data not found")
  
        }
        // setSelectedCustomerData(bookingDetails);
        // setSelectedCustomerId(bookingDetails.tripid);
        // setBookingStatus(bookingDetails?.status);
        // setIsEditMode(true);
        // setEdit(true);
        // setSendEmail(false);
        // setDatatrigger(!datatrigger);
        // setAvilableimageCount(bookingDetails.count)
      } 
      catch (error) {
        if (error.response && error.response.status === 404) {
            setError(true);
            setErrorMessage(`${error.response.data.error}`);
        } else {
            setError(true);
            // setErrorMessage("Failed to fetch data");
            setErrorMessage("Check your Network Connection");
        }
    }
      
      // catch(err) {

     
      //     setError(true);
      //       setErrorMessage("Booking Not Found");
   
  
  }
  };

  const handleFromDateChange = (date) => {
    setLogDateDetails((prevState) => ({
      ...prevState,
      fromDate: date.format('YYYY-MM-DD')
    }));
  };

  const handleToDateChange = (date) => {
    setLogDateDetails((prevState) => ({
      ...prevState,
      toDate: date.format('YYYY-MM-DD')
    }));
  };

  const handleUserNameChange = (event, newValue) => {
    setLogDateDetails((prev) => ({
      ...prev,
      userName: newValue || '',
    }));
  };
  const handleSelectTripId = (event) => {
    const { value } = event.target;

    setLogDateDetails((prev) => ({
      ...prev,
      selectbookingId: value || "",
    }));
  };
  const handleSelectType = (event) => {
    const { value } = event.target;

    setLogDateDetails((prevDetails) => ({
      ...prevDetails,
      selectType: value,
    }));
  };
  return (

    <>
      <div className='main-content-form' >
        <div className='input-field vendor-statement-input-field' style={{ alignItems: 'flex-end', marginBottom: "15px" }}>

          <div className="input">
            <div className="icone">
              <MdOutlineCalendarMonth color="action" />
            </div>

            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel id="demo-simple-select-helper-label">Select Type</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={logDateDetails.selectType}
                label="Owner Type"
                onChange={handleSelectType}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Booking"}>Booking</MenuItem>
                <MenuItem value={"Tripsheet"}>Tripsheet</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="input">
            <div style={{}}>
              <label htmlFor="" style={{ fontSize: "20px", marginRight: "10px" }}>Id</label>
              <input type="text" 
              value={logDateDetails.selectbookingId} 
              style={{ backgroundColor: 'transparent', border: '1px solid #ccc', borderRadius: '5px', padding: '10px 5px' }}
                onChange={handleSelectTripId}
                onKeyDown={handleKeyDownlogDetails}
              />
            </div>
          </div>
          <div className="input">
            <div className="icone">
              <MdOutlineCalendarMonth color="action" />
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  label="From Date"
                  format="DD/MM/YYYY"
                  name='fromDate'
                  onChange={handleFromDateChange}
                  value={dayjs(logDateDetails.fromDate)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="input dispatch-input">
            <div className="icone">
              <MdOutlineCalendarMonth color="action" />
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  label="To Date"
                  format="DD/MM/YYYY"
                  name='toDate'
                  onChange={handleToDateChange}
                  value={dayjs(logDateDetails.toDate)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="input">
            <div className="icone">
              <PermIdentityIcon color="action" />
            </div>
            <Autocomplete
              fullWidth
              id="free-solo-customer"
              freeSolo
              size="small"
              options={allUserNames}
              value={logDateDetails.userName}
              onChange={handleUserNameChange} // Calls the updated function
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Usernames"
                  name="usernamedata"
                  inputRef={params.inputRef}
                />
              )}
            />

          </div>

          <div className="input">
            {logDateDetails.selectType === "Booking" ?
              <Button variant='contained' onClick={handleshowdetails}>Search</Button> :
              <Button variant='contained' onClick={handleshowdetailstripsheet}>Search</Button>
            }
          </div>
        </div>
        <div className='purchaseSummary-table'>
          <Box
            sx={{
              height: 400, // Adjust this value to fit your needs
              '& .MuiDataGrid-virtualScroller': {
                '&::-webkit-scrollbar': {
                  width: '8px', // Adjust the scrollbar width here
                  height: '8px', // Adjust the scrollbar width here
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: '#f1f1f1',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#457cdc',
                  borderRadius: '20px',
                  minHeight: '60px', // Minimum height of the scrollbar thumb (scroll indicator)

                },
                '&::-webkit-scrollbar-thumb:hover': {
                  backgroundColor: '#3367d6',
                },
              },
            }}
          >
            <DataGrid
              rows={logdetails}
              columns={selectcolumns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
            />
          </Box>
        </div>
        <div className="alert-popup-main">
          {error && (
            <div className="alert-popup Error">
              <div className="popup-icon">
                {" "}
                <ClearIcon />{" "}
              </div>
              <span className="cancel-btn" onClick={hidePopup}>
                <ClearIcon color="action" />{" "}
              </span>
              <p>{errorMessage}</p>
            </div>
          )}

          {info && (
            <div className="alert-popup Info">
              <div className="popup-icon">
                <BsInfo />
              </div>
              <span className="cancel-btn" onClick={hidePopup}>
                <ClearIcon color="action" />
              </span>
              <p>{infoMessage}</p>
            </div>
          )}
          {success && (
            <div className="alert-popup Success">
              <div className="popup-icon">
                <FileDownloadDoneIcon />
              </div>
              <span className="cancel-btn" onClick={hidePopup}>
                <ClearIcon color="action" />
              </span>
              <p>{successMessage}</p>
            </div>
          )}
          {warning &&
            <div className='alert-popup Warning' >
              <div className="popup-icon"> <ErrorOutlineIcon /> </div>
              <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
              <p>{warningMessage}</p>
            </div>
          }
        </div>



      </div>
    </>)
}



export default LogDetails