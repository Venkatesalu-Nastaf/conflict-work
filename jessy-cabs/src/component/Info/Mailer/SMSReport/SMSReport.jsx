import React, { useEffect, useState, useCallback } from 'react';
import "./SMSReport.css";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DescriptionIcon from "@mui/icons-material/Description";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { APIURL } from '../../../url';
import axios from 'axios'
import Excel from 'exceljs';
import { saveAs } from "file-saver";
import isBetween from 'dayjs/plugin/isBetween';
import Box from "@mui/material/Box";
import ClearIcon from '@mui/icons-material/Clear';
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import {  CircularProgress } from '@mui/material';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';

dayjs.extend(isBetween);

const columns = [
  { field: "id", headerName: "Sno", width: 50 },
  { field: "MobileNumber", headerName: "Number", width: 120 },
  { field: "Message", headerName: "Message", width: 550 },
  { field: "SubmitDate", headerName: "Submit Date", width: 160 },
  { field: "DoneDate", headerName: "Done Date", width: 160 },
  { field: "Status", headerName: "Status", width: 110 },
];


const SMSReport = () => {
  const apiurl = APIURL
  const [smsreport, setSmsReport] = useState([])
  const [filteredReport, setFilteredReport] = useState([]);
  const [fromDate, setFromDate] = useState(dayjs());
  const [toDate, setToDate] = useState(dayjs());
  const [datafilter, setDatafilter] = useState(true)
  const [info, setInfo] = useState(false);
  const [infoMessage, setINFOMessage] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({});

  const hidePopup = () => {

    setInfo(false);

  };
  useEffect(() => {
    if (info) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [info]);

  // const fetchdata = useCallback(async () => {
  //   try {
  //     const response = await axios.get(`${apiurl}/smsreportdata`);
  //     const data = response.data;
  //     const rowsWithUniqueId = data.map((row, index) => ({
  //       ...row,
  //       id: index + 1,
  //     }));
  //     setSmsReport(rowsWithUniqueId);
  //     console.log('datafetched')
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, [apiurl]); // useCallback dependency array

  // useEffect(() => {
  //   fetchdata();
  // }, [fetchdata]);


  // const fetchdata = useCallback(async () => {
  //   setLoading(true); // Step 2: Set loading to true before fetching data
  //   try {
  //     const response = await axios.get(`${apiurl}/smsreportdata`);
  //     const data = response.data;
  //     const rowsWithUniqueId = data.map((row, index) => ({
  //       ...row,
  //       id: index + 1,
  //     }));
  //     setSmsReport(rowsWithUniqueId);
  //     console.log('data fetched');
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setLoading(false); // Step 3: Set loading to false after fetching data
  //   }
  // }, [apiurl]);

  // useEffect(() => {
  //   fetchdata();
  // }, [fetchdata]);


  const fetchdata = useCallback(async () => {
    setLoading(true); // Set loading to true before fetching data
    setError(false); // Reset error state before making a new request
    try {
      const response = await axios.get(`${apiurl}/smsreportdata`);
      const data = response.data;
      const rowsWithUniqueId = data.map((row, index) => ({
        ...row,
        id: index + 1,
      }));
      setSmsReport(rowsWithUniqueId);
      console.log('Data fetched');
    } catch (err) {
      if (err.message === 'Network Error') {
        setErrorMessage("Check network connection.");
      } else {
        setErrorMessage("Failed to fetch data: " + (err.response?.data?.message || err.message));
      }
      setError(true);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  }, [apiurl]);

  useEffect(() => {
    fetchdata();
  }, [fetchdata]);




  // const filterData = () => {

  //   console.log(smsreport, "filterdatat")
  //   const filtered = smsreport.filter(report => {


  //     const submitDate = dayjs(report.SubmitDate, 'DD MMM YYYY');
  //     const startDateWithoutTime = fromDate.startOf('day'); // Start of the day for fromDate
  //     const endDateWithoutTime = toDate.endOf('day');

  //     return submitDate.isBetween(startDateWithoutTime, endDateWithoutTime, null, '[]');

  //   });
  //   if (filtered.length === 0) {
  //     console.log("errr")
  //     setInfo(true)
  //     setINFOMessage("Data Not Found")
  //   }
  //   setFilteredReport(filtered);
  //   setDatafilter(false)
  // }
  const filterData = () => {
    // setLoading(true); 
  
    console.log(smsreport, "filterdatat");
    const filtered = smsreport.filter(report => {
      const submitDate = dayjs(report.SubmitDate, 'DD MMM YYYY');
      const startDateWithoutTime = fromDate.startOf('day'); // Start of the day for fromDate
      const endDateWithoutTime = toDate.endOf('day');
  
      return submitDate.isBetween(startDateWithoutTime, endDateWithoutTime, null, '[]');
    });
  
    if (filtered.length === 0) {
      console.log("errr");
      setInfo(true);
      setINFOMessage("Data Not Found");
      setLoading(true)
    }
    
    setFilteredReport(filtered);
    setDatafilter(false);
    setLoading(false); // Set loading to false after filtering is complete
  };
  
  const dataall = () => {
    setDatafilter(true)
    fetchdata()
  }

  const handleExcelDownload = async () => {
    const workbook = new Excel.Workbook();
    const workSheetName = 'Worksheet-1';
    try {

      const fileName = "SMS Reports"
      // creating one worksheet in workbook
      const worksheet = workbook.addWorksheet(workSheetName);
      const keysToRemove = ["ErrorCode"];

      const headers = datafilter ?
        (smsreport.length === 0 ? [] : Object.keys(smsreport[0]).filter(key => !keysToRemove.includes(key))) :
        (filteredReport.length === 0 ? [] : Object.keys(filteredReport[0]).filter(key => !keysToRemove.includes(key)));

      const row = datafilter ? smsreport : filteredReport;
      const columns = headers.map(key => ({ key, header: key }));
      worksheet.columns = columns;

      // updated the font for first row.
      worksheet.getRow(1).font = { bold: true };

      // Set background color for header cells
      worksheet.getRow(1).eachCell((cell, colNumber) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '9BB0C1' } // Green background color
        };
      });


      worksheet.getRow(1).height = 30;
      // loop through all of the columns and set the alignment with width.
      worksheet.columns.forEach((column) => {
        column.width = column.header.length + 5;
        column.alignment = { horizontal: 'center', vertical: 'middle' };
      });

      row.forEach((singleData, index) => {


        worksheet.addRow(singleData);

        // Adjust column width based on the length of the cell values in the added row
        worksheet.columns.forEach((column) => {
          const cellValue = singleData[column.key] || ''; // Get cell value from singleData or use empty string if undefined
          const cellLength = cellValue.toString().length; // Get length of cell value as a string
          const currentColumnWidth = column.width || 0; // Get current column width or use 0 if undefined

          // Set column width to the maximum of current width and cell length plus extra space
          column.width = Math.max(currentColumnWidth, cellLength + 5);
        });
      });

      // loop through all of the rows and set the outline style.
      worksheet.eachRow({ includeEmpty: false }, (row) => {
        // store each cell to currentCell
        const currentCell = row._cells;

        // loop through currentCell to apply border only for the non-empty cell of excel
        currentCell.forEach((singleCell) => {

          const cellAddress = singleCell._address;

          // apply border
          worksheet.getCell(cellAddress).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          };
        });
      });
      const buf = await workbook.xlsx.writeBuffer();

      saveAs(new Blob([buf]), `${fileName}.xlsx`);
    } catch (error) {
      console.error('<<<ERRROR>>>', error);
      console.error('Something Went Wrong', error.message);
    } finally {
      workbook.removeWorksheet(workSheetName);
    }
  }
  return (
    <div className="smsreport-form main-content-form Scroll-Style-hide">
      <form action="">
        <div className="detail-container-main">
          <div className="container-left">
            <div className="copy-title-btn-SMSReport">
              <div className="input-field sms-report-inputfeild">
                <div className="input">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      id="from-date"
                      className='full-width'
                      label="From Date"
                      value={fromDate}
                      onChange={(newValue) => setFromDate(newValue)}
                      format='DD-MM-YYYY'
                    />
                  </LocalizationProvider>
                </div>
                <div className="input">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      id="to-date"
                      className='full-width'
                      label="To Date"
                      value={toDate}
                      onChange={(newValue) => setToDate(newValue)}
                      format='DD-MM-YYYY'
                    />
                  </LocalizationProvider>
                </div>
                <div className="input">
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<DescriptionIcon />}
                    onClick={handleExcelDownload}
                    className='full-width'
                  >
                    Excel

                  </Button>
                </div>
                <div className='input' style={{ gap: '15px' }}>
                  <div className="">
                    <Button variant="contained" onClick={filterData}>Show</Button>
                  </div>
                  <div className="">
                    <Button variant="outlined" onClick={dataall}>Show All</Button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className="table-bookingCopy-SMSReport">
          <div className='sms-report-table'>

            {/* <Box
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
                rows={datafilter ? smsreport : filteredReport}
                columns={columns}
                pageSize={5}
              />
            </Box> */}
             {/* <Box
      sx={{
        height: 400,
        position: 'relative', // Make Box relative to position the spinner
        '& .MuiDataGrid-virtualScroller': {
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#457cdc',
            borderRadius: '20px',
            minHeight: '60px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#3367d6',
          },
        },
      }}
    >
      {loading ? (
        <Box
          sx={{
            position: 'absolute', // Position the spinner absolutely
            top: '50%', // Center vertically
            left: '50%', // Center horizontally
            transform: 'translate(-50%, -50%)', // Adjust for the spinner's dimensions
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <DataGrid
          rows={datafilter ? smsreport : filteredReport}
          columns={columns}
          pageSize={5}
          autoHeight
        />
      )}
    </Box> */}
    <Box
  sx={{
    height: 400,
    position: 'relative', // Make Box relative to position the spinner
    overflow: 'hidden', // Ensure no overflow from the Box itself
    '& .MuiDataGrid-virtualScroller': {
      '&::-webkit-scrollbar': {
        width: '8px',
        height: '8px',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: '#f1f1f1',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#457cdc',
        borderRadius: '20px',
        minHeight: '60px',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: '#3367d6',
      },
    },
  }}
>
  {loading ? (
    <Box
      sx={{
        position: 'absolute', // Position the spinner absolutely
        top: '50%', // Center vertically
        left: '50%', // Center horizontally
        transform: 'translate(-50%, -50%)', // Adjust for the spinner's dimensions
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <DataGrid
      rows={datafilter ? smsreport : filteredReport}
      columns={columns}
      pageSize={5}
      autoHeight={false} // Ensure autoHeight is false
      sx={{
        height: '100%', // Take full height of the parent Box
        overflow: 'auto', // Allow overflow within the DataGrid
      }}
    />
  )}
</Box>

          </div>
        </div>
        <div className='alert-popup-main'>
          {info &&
            <div className='alert-popup Info' >
              <div className="popup-icon"> <BsInfo /> </div>
              <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
              <p>{infoMessage}</p>
            </div>
          }
        </div>
        <div className='alert-popup-main'>
                  {success &&
                    <div className='alert-popup Success' >
                      <div className="popup-icon"> <FileDownloadDoneIcon /> </div>
                      <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
                      <p>{successMessage}</p>
                    </div>
                  }
                  {error &&
                    <div className='alert-popup Error' >
                      <div className="popup-icon"> <ClearIcon /> </div>
                      <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
                      <p>{errorMessage}</p>
                    </div>
                  }
                  </div>
      </form>
    </div>
  )
}

export default SMSReport