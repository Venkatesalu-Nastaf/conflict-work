import React, { useEffect, useState } from 'react';
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
dayjs.extend(isBetween);

const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "MobileNumber", headerName: "MobileNO", width: 130 },
  { field: "Message", headerName: "Message", width: 350 },
  { field: "SubmitDate", headerName: "Submit Date", width: 130 },
  { field: "DoneDate", headerName: "Done Date", width: 130 },
  { field: "Status", headerName: "Status", width: 130 },
];

// const rows = [
//   {
//     id: 1,
//     serialid: 222,
//     date: "2023-06-07",
//     time: "9:00 AM",
//     Phone: "Morning",
//     Message: "9:00 AM",
//     Status: "123 Street, Apt 4B, City",

//   },
//   {
//     id: 2,
//     serialid: 223,
//     date: "2023-06-08",
//     time: "9:00 AM",
//     Phone: "Evening",
//     Message: "2:00 PM",
//     Status: "456 Avenue, Unit 8, Town",
//   },
// ];




const SMSReport = () => {
  const apiurl=APIURL
  const [smsreport,setSmsReport]=useState([])
  const [filteredReport, setFilteredReport] = useState([]);

    const [fromDate, setFromDate] = useState(dayjs());
    const [toDate, setToDate] = useState(dayjs());
    const [datafilter,setDatafilter]=useState(true)
  

  
  

useEffect(()=>{
  const fetchdata=async()=>{
    try{
      const response=await axios.get(`${apiurl}/smsreportdata`)
      const data=response.data
      // console.log(response)
      const rowsWithUniqueId = data.map((row, index) => ({
        ...row,
        id: index + 1,
      }));
      // console.log(rowsWithUniqueId,"rrrrrr")

      setSmsReport(rowsWithUniqueId)

    }
    catch(err){
      console.log(err)
    }
  }
  fetchdata()
},[apiurl])


const filterData = () => {
  
  console.log(smsreport,"filterdatat")
  const filtered = smsreport.filter(report => {
  
  
      const submitDate = dayjs(report.SubmitDate, 'DD MMM YYYY HH:mm:ss');
      // return submitDate.isAfter(fromDate) && submitDate.isBefore(toDate);
      const startDateWithoutTime = fromDate.startOf('day'); // Start of the day for fromDate
const endDateWithoutTime = toDate.endOf('day'); 
    
return submitDate.isBetween(startDateWithoutTime,endDateWithoutTime, null, '[]');

  });
 

  setFilteredReport(filtered);
  setDatafilter(false)
  // setSmsReport(filtered)

}
const dataall=()=>{
  setDatafilter(true)

}


const handleExcelDownload = async () => {
  const workbook = new Excel.Workbook();
  const workSheetName = 'Worksheet-1';
    
  


  try {

    const fileName = "SMS Reports"
    // creating one worksheet in workbook
    const worksheet = workbook.addWorksheet(workSheetName);
    const keysToRemove = ["ErrorCode"];

    // const headers =datafilter? Object.keys(smsreport[0]).filter(key => !keysToRemove.includes(key)):Object.keys(filteredReport[0]).filter(key => !keysToRemove.includes(key))
    // // const headers = datafilter?Object.keys(smsreport[0]):Object.keys(filterData[0]);
    // console.log("headers:", headers);
    const headers = datafilter ? 
    (smsreport.length === 0 ? [] : Object.keys(smsreport[0]).filter(key => !keysToRemove.includes(key))) :
    (filteredReport.length === 0 ? [] : Object.keys(filteredReport[0]).filter(key => !keysToRemove.includes(key)));

    const row=datafilter?smsreport:filteredReport;
    const columns = headers.map(key => ({ key, header: key }));
    //         worksheet.columns = columnsexcel

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
    // write the content using writeBuffer
    const buf = await workbook.xlsx.writeBuffer();

    // download the processed file
    saveAs(new Blob([buf]), `${fileName}.xlsx`);
  } catch (error) {
    console.error('<<<ERRROR>>>', error);
    console.error('Something Went Wrong', error.message);
  } finally {
    // removing worksheet's instance to create new one
    workbook.removeWorksheet(workSheetName);
  }


}


  return (
    <div className="smsreport-form Scroll-Style-hide">
      <form action="">
        <div className="detail-container-main">
          <div className="container-left">
            <div className="copy-title-btn-SMSReport">
              <div className="input-field sms-report-inputfeild">
                <div className="input" style={{ width: "200px" }}>
                  {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="From Date" defaultValue={dayjs()} />
                  </LocalizationProvider> */}

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="From Date"
                        value={fromDate}
                        onChange={(newValue) => setFromDate(newValue)}
                    />
                </LocalizationProvider>
                </div>
                <div className="input" style={{ width: "200px" }}>
                  {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="To Date" defaultValue={dayjs()} />
                  </LocalizationProvider> */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="To Date"
                        value={toDate}
                        onChange={(newValue) => setToDate(newValue)}
                    />
                </LocalizationProvider>
                </div>
                <div className="input" style={{ width: "120px" }}>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<DescriptionIcon />}
                    onClick={handleExcelDownload}
                  >
                    Excel
                    
                  </Button>
                </div>
              
                <div className="input" style={{ width: "120px" }}>
                  <Button variant="contained" onClick={filterData}>Show</Button>
                </div>
                <div className="input" style={{ width: "120px" }}>
                  <Button variant="outlined" onClick={dataall}>Show All</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="table-bookingCopy-SMSReport">
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={datafilter?smsreport:filteredReport}
              columns={columns}
              pageSize={5}
              // checkboxSelection
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default SMSReport