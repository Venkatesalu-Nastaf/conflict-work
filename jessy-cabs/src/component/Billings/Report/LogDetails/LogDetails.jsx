import React, { useState,useEffect } from 'react'
import Button from "@mui/material/Button";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Box from "@mui/material/Box";
import InfoIcon from "@mui/icons-material/Info";
// import SellIcon from "@mui/icons-material/Sell";
import ClearIcon from "@mui/icons-material/Clear";
import "./LogDetails.css";
import axios from 'axios'
import { APIURL } from '../../../url'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
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
  const [warning,setWarning]=useState(false)
  const [warningMessage, setWarningMessage] = useState({});
  const [success, setSuccess] = useState(false);
 

  const handlecolumnvalues = (data) => {
    const headers = Object.keys(data[0]);
    const columns = headers.map(key => ({ field: key, headerName: key, width: 150 }));

    setSelectedColumns(columns)
  }

  const handleshowdetails = async () => {
    if(!selectbooking || !selecteddata)
      {
          setWarning(true);
          setWarningMessage("Select Type and Enter  Id ")
          return
      }

    try {
      const response = await axios.get(`${apiurl}/bookinglogdetailsget/${selectbooking}`);
      const data = response.data;
      console.log(data, "ff")
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
    } catch (err) {
      setError(true);
      setErrorMessage("check ur Network Connection")
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
    if(!selectbooking || !selecteddata)
    {
        setWarning(true);
        setWarningMessage("Select Type and Enter  Id ")
        return
    }

    try {
      const response = await axios.get(`${apiurl}/trpisheetlogdetailst/${selectbooking}`);
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

    
    catch (err) {
      console.log(err)
      setError(true);
      setErrorMessage("check ur Network Connection")
    }
  }



  return (

    <>
      <div className='main-content-form'>
        <div className='input-field vendor-statement-input-field' style={{ alignItems: 'flex-end' }}>

          <div className="input">
            <div className="icone">
              <MdOutlineCalendarMonth color="action" />
            </div>

            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel id="demo-simple-select-helper-label">Select Type</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={selecteddata}
                label="Owner Type"
                onChange={(e) => setSelectedData(e.target.value)}
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
              <label htmlFor="">Id</label>
              <input type="text" value={selectbooking} style={{ backgroundColor: 'transparent', border: '1px solid #ccc', borderRadius: '5px', padding: '10px 5px' }}
                onChange={(e) => setSelectedBooking(e.target.value)}
              />
            </div>
          </div>
        
          <div className="input">
            {selecteddata && selecteddata === "Booking" ?
            <Button variant='contained' onClick={handleshowdetails}>Search</Button>:
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