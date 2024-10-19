import React, { useState, useEffect } from 'react'
import Button from "@mui/material/Button";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from '@mui/material/MenuItem';
import ClearIcon from '@mui/icons-material/Clear';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import Menu from '@mui/material/Menu';
import InputLabel from '@mui/material/InputLabel';
import Box from "@mui/material/Box";
import "./VehicleStatement.css";
import axios from 'axios'
import { APIURL } from '../../../url';
import dayjs from 'dayjs';
import { TextField } from '@mui/material';
import Excel from 'exceljs';
import { saveAs } from "file-saver";
import jsPDF from "jspdf";


const customer_colums = [
  { field: 'id', headerName: 'S.no', width: 70 },
  { field: 'vehRegNo', headerName: 'Vehicle', width: 160 },
  { field: 'totalTime', headerName: 'Tot. Time', width: 120 },
  { field: 'totalKilometers', headerName: 'TKMS', width: 120 },
  { field: 'totalPackageAmount', headerName: 'Amount', width: 130 },
  { field: 'totalcustomeradvance', headerName: 'Driver Advance', width: 130 },
  { field: 'balance', headerName: 'Balance', width: 130 },
  { field: "betaTotalAmount", headerName: "Beta", with: 100 }
]


const VehicleStatement = () => {
  const [data, setData] = useState({
    hireTypes: "",
    startDate: dayjs().format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD')
  })
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [successMessage, setSuccessMessage] = useState({});
  const [success, setSuccess] = useState(false);
  const [warning, setWarning] = useState(false);
  const [warningMessage] = useState({});
  const [ setTableData] = useState([])

  const [totalValues, setTotalValues] = useState({
    fullTotalKM: '',
    fullTotalHR: '',
    totalAmount: "",
    totalAdvance: "",
    totalBalance: "",
    totalBeta: '',
  })

  // customer--------------------------

  const transformCustomer = (data) => {
    const vehicleTotals = {};

    data?.forEach(element => {
      const { vehRegNo, totalkm1, totalcalcAmount, totaltime, customeradvance, driverBeta_amount } = element;

      if (!vehicleTotals[vehRegNo]) {
        vehicleTotals[vehRegNo] = {
          totalKilometers: 0,
          totalPackageAmount: 0,
          totalTime: 0,
          totalcustomeradvance: 0,
          balance: 0,
          betaTotalAmount: 0,

        };
      }

      vehicleTotals[vehRegNo].totalKilometers += parseFloat(totalkm1) || 0;
      vehicleTotals[vehRegNo].totalPackageAmount += parseFloat(totalcalcAmount) || 0;
      vehicleTotals[vehRegNo].totalcustomeradvance += parseFloat(customeradvance) || 0;
      vehicleTotals[vehRegNo].betaTotalAmount += parseFloat(driverBeta_amount) || 0;


      const totalTimeMinutes = convertTotalTimeToMinutes(totaltime);
      vehicleTotals[vehRegNo].totalTime += totalTimeMinutes || 0;
    });


    return Object.keys(vehicleTotals).map((vehRegNo, index) => ({
      id: index + 1,
      vehRegNo,
      totalKilometers: vehicleTotals[vehRegNo].totalKilometers,
      totalPackageAmount: vehicleTotals[vehRegNo].totalPackageAmount,
      totalTime: convertMinutesToTime(vehicleTotals[vehRegNo].totalTime),
      totalcustomeradvance: vehicleTotals[vehRegNo].totalcustomeradvance,
      balance: vehicleTotals[vehRegNo].totalPackageAmount - vehicleTotals[vehRegNo].totalcustomeradvance,
      betaTotalAmount: vehicleTotals[vehRegNo].betaTotalAmount,
    }));
  };


  // TIME CONVERTION TYPE HH:MM
  const convertTotalTimeToMinutes = (totaltime) => {
    const [hoursPart, minutesPart] = totaltime.split(' ');
    const hours = parseInt(hoursPart?.replace('h', ''), 10);
    const minutes = parseInt(minutesPart?.replace('m', ''), 10);

    return (hours * 60) + minutes;
  };

  const convertMinutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
  };

  // TIME CONVERTION TYPE 00:00
  const convertTimeToMinutes2 = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  //----------------------------------------

  //ATTACHED
  const transformAtached = (data) => {
    const vehicleTotals = {};

    data?.forEach(element => {
      const { vehRegNo, vendortotalkm, vendorTotaltime, Vendor_FULLTotalAmount, advancepaidtovendor, Vendor_BataTotalAmount } = element;

      if (!vehicleTotals[vehRegNo]) {
        vehicleTotals[vehRegNo] = {
          totalKilometers: 0,
          totalPackageAmount: 0,
          totalTime: 0,
          totalcustomeradvance: 0,
          balance: 0,
          betaTotalAmount: 0
        };
      }

      vehicleTotals[vehRegNo].totalKilometers += parseFloat(vendortotalkm) || 0;
      vehicleTotals[vehRegNo].totalPackageAmount += parseFloat(Vendor_FULLTotalAmount) || 0;
      vehicleTotals[vehRegNo].totalcustomeradvance += parseFloat(advancepaidtovendor) || 0;
      vehicleTotals[vehRegNo].betaTotalAmount += parseFloat(Vendor_BataTotalAmount) || 0;

      const totalTimeMinutes = convertTotalTimeToMinutes(vendorTotaltime);
      vehicleTotals[vehRegNo].totalTime += totalTimeMinutes || 0;
    });


    return Object.keys(vehicleTotals).map((vehRegNo, index) => ({
      id: index + 1,
      vehRegNo,
      totalKilometers: vehicleTotals[vehRegNo].totalKilometers,
      totalPackageAmount: vehicleTotals[vehRegNo].totalPackageAmount,
      totalTime: convertMinutesToTime(vehicleTotals[vehRegNo].totalTime),
      totalcustomeradvance: vehicleTotals[vehRegNo].totalcustomeradvance,
      balance: vehicleTotals[vehRegNo].totalPackageAmount - vehicleTotals[vehRegNo].totalcustomeradvance,
      betaTotalAmount: vehicleTotals[vehRegNo].betaTotalAmount,
    }));
  };


  // REDUCE FUNCION FOR OVERAL CALCULATION
  const reduceFun = (data) => {
    const result = data.reduce((accumulator, current) => {
      accumulator.totalTime += convertTimeToMinutes2(current.totalTime) || 0
      accumulator.totalKilometers += current.totalKilometers || 0;
      accumulator.totalPackageAmount += current.totalPackageAmount || 0;
      accumulator.totalAdvance += current.totalcustomeradvance || 0;
      accumulator.totaalBalance += current.balance || 0;
      accumulator.totalBeta += current.betaTotalAmount || 0;


      return accumulator
    }, { totalPackageAmount: 0, totalKilometers: 0, totaalBalance: 0, totalTime: 0, totalAdvance: 0, totalBeta: 0 })

    return result;
  }


  const [Customerdata, setCustomerData] = useState([])

  const showList = async (e) => {    
    e.preventDefault();
    const response = await axios.get(`${APIURL}/getvehicleInfo`, { params: data });
    // setTableData(response.data)
    const datas = response.data;    

    if (data.hireTypes === "Own  Vehicle") {
      const parseData = transformCustomer(datas)
      const reducedData = reduceFun(parseData)

      if (reducedData &&
        reducedData.totalKilometers !== 0 &&
        reducedData.totalTime !== 0 &&
        reducedData.totalPackageAmount !== 0 &&
        reducedData.totalAdvance !== 0 &&
        reducedData.totaalBalance !== 0 &&
        reducedData.totalBeta !== 0) {
        setTotalValues(prev => ({
          ...prev, fullTotalKM: reducedData.totalKilometers,
          fullTotalHR: convertMinutesToTime(reducedData.totalTime),
          totalAmount: reducedData.totalPackageAmount,
          totalAdvance: reducedData.totalAdvance,
          totalBalance: reducedData.totaalBalance,
          totalBeta: reducedData.totalBeta,
        }))

        setSuccess(true)
        setSuccessMessage("Successfully Listed")
      } else {
        setTotalValues({})
      }

      if (parseData.length > 0) {
        setCustomerData(parseData)
        const reducedData = reduceFun(parseData)

      } else {
        setCustomerData([])
        setError(true)
        setErrorMessage("No Data Found")
      }

    } else if (data.hireTypes === "Attached Vehicle") {
      const parseData = transformAtached(datas)
      if (parseData.length > 0) {
        const reducedData = reduceFun(parseData)

        if (reducedData) {
          setTotalValues(prev => ({
            ...prev, fullTotalKM: reducedData.totalKilometers,
            fullTotalHR: convertMinutesToTime(reducedData.totalTime),
            totalAmount: reducedData.totalPackageAmount,
            totalAdvance: reducedData.totalAdvance,
            totalBalance: reducedData.totaalBalance,
            totalBeta: reducedData.totalBeta,
          }))
          setSuccess(true)
          setSuccessMessage("Successfully Listed")
        } else {
          setTotalValues({})
        }

        setCustomerData(parseData)
        setData(prev => ({ ...prev, hireTypes: "Attached Vehicle" }))
      } else {
        setCustomerData([])
        setError(true)
        setErrorMessage("No Data Found")
      }

    } else {
      setCustomerData([])
      setError(true)
      setErrorMessage("Please Select Hire Types")
    }
  }

  //Excel

  const handleExcelDownload = async () => {
    const workbook = new Excel.Workbook();
    const workSheetName = 'Worksheet-1';

    try {

      const fileName = "VehicleStatement Reports"
      const worksheet = workbook.addWorksheet(workSheetName);
      const columns1 = customer_colums.map(({ field, headerName, ...rest }) => ({
        key: field,
        header: headerName,
        ...rest
      }));

      worksheet.columns = columns1;


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


      Customerdata.forEach((Customer, index) => {
        // Add advancepaidtovendor to Vendor_FULLTotalAmount
        worksheet.addRow(Customer);
        // Adjust column width based on the length of the cell values in the added row
        worksheet.columns.forEach((column) => {
          const cellValue = Customer[column.key] || ''; // Get cell value from singleData or use empty string if undefined
          const cellLength = cellValue.toString().length; // Get length of cell value as a string
          const currentColumnWidth = column.width || 0; // Get current column width or use 0 if undefined

          // Set column width to the maximum of current width and cell length plus extra space
          column.width = Math.max(currentColumnWidth, cellLength + 5);
        });
      });


      // Add the total row
      const totalRow = worksheet.addRow({});
      totalRow.getCell(columns1.findIndex(col => col.header === 'Vehicle') + 1).value = 'TOTAL';
      totalRow.getCell(columns1.findIndex(col => col.header === 'TTime') + 1).value = totalValues?.fullTotalHR;
      totalRow.getCell(columns1.findIndex(col => col.header === 'TKMS') + 1).value = totalValues?.fullTotalKM;
      totalRow.getCell(columns1.findIndex(col => col.header === 'Amount') + 1).value = totalValues?.totalAmount;
      totalRow.getCell(columns1.findIndex(col => col.header === 'D.Advance') + 1).value = totalValues?.totalAdvance;
      totalRow.getCell(columns1.findIndex(col => col.header === 'Balance') + 1).value = totalValues?.totalBalance;
      totalRow.getCell(columns1.findIndex(col => col.header === 'Beta') + 1).value = totalValues?.totalBeta;


      totalRow.eachCell((cell) => {
        cell.font = { bold: true };
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
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
      console.error('Something Went Wrong', error.message);
    } finally {
      // removing worksheet's instance to create new one
      workbook.removeWorksheet(workSheetName);
    }

  }


  //PDF

  const handlePdfDownload = () => {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "tabloid" // [width, height] in inches
    });
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'normal');
    const text = "VehicleStatement";

    // Get page width
    const pageWidth = pdf.internal.pageSize.getWidth();

    // Calculate text width
    const textWidth = pdf.getTextWidth(text);

    // Calculate the x position to center the text
    const xPos = (pageWidth - textWidth) / 2;

    // Add text to PDF at calculated position
    pdf.text(text, xPos, 10);


    const header = customer_colums.map(row => row.headerName)
    const rowValues = Customerdata.map(row => {
      return customer_colums.map(column => row[column.field]);
    });


    // Create the total row
    const totalRow = customer_colums.map(column => {
      if (column.headerName === 'Vehicle') return "TOTAL";
      if (column.headerName === 'TTime') return totalValues?.fullTotalHR;
      if (column.headerName === 'TKMS') return totalValues?.fullTotalKM;
      if (column.headerName === 'Amount') return totalValues?.totalAmount;
      if (column.headerName === 'D.Advance') return totalValues?.totalAdvance;
      if (column.headerName === 'Balance') return totalValues?.totalBalance;
      if (column.headerName === 'Beta') return totalValues?.totalBeta;

      return '';
    });
    rowValues.push(totalRow);


    pdf.autoTable({
      head: [header],
      body: rowValues,
      startY: 20,

      headStyles: {
        fontSize: 12,
        cellPadding: 1.5, // Decrease padding in header

        minCellHeigh: 8,
        valign: 'middle',

        font: 'helvetica', // Set font type for body

        cellWidth: 'wrap',
        // cellWidth: 'auto'
      },

      bodyStyles: {
        fontSize: 10,
        valign: 'middle',
        cellWidth: 'auto'
        // Adjust the font size for the body

      },
      willDrawCell: function (data) {
        // Check if this cell is part of the total row
        if (data.row.index === rowValues.length - 1) {
          const { cell } = data;
          const { x, y, width, height } = cell;

          // Set bold text and increased font size
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(11); // Increase the font size as needed

          // Draw top border
          pdf.setDrawColor(0); // Black color
          pdf.setLineWidth(0.5); // Line width
          pdf.line(x, y, x + width, y); // Draw top border

          // Draw bottom border
          pdf.line(x, y + height, x + width, y + height); // Draw bottom border
        }
      },
      columnWidth: 'auto'

    });
    const scaleFactor = pdf.internal.pageSize.getWidth() / pdf.internal.scaleFactor * 1.5;

    // Scale content
    pdf.scale(scaleFactor, scaleFactor);
    const pdfBlob = pdf.output('blob');
    saveAs(pdfBlob, 'VehicleStatement Reports.pdf');
  };
  useEffect(() => {
    if (error || success || warning) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success, warning]);

  const hidePopup = () => {
    setError(false);
    setSuccess(false);
    setWarning(false);
  };

  return (

    <>
      <div className='main-content-form'>
        <div className='input-field vendor-statement-input-field'>

          <div className="input">
            <div className="icone">
              <MdOutlineCalendarMonth color="action" />
            </div>

            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <InputLabel id="demo-simple-select-helper-label">Hire Type</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={data?.hireTypes}
                label="Owner Type"
                onChange={(e) => setData(prev => ({ ...prev, hireTypes: e.target.value }))}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Attached Vehicle"}>Attached Vehicle</MenuItem>
                <MenuItem value={"Own  Vehicle"}>Own  Vehicle</MenuItem>
                <MenuItem value={"lease"}>Lease</MenuItem>
              </Select>
            </FormControl>
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
                  value={data.startDate
                    ? dayjs(data.startDate)
                    : dayjs()}
                  onChange={(date) => setData(prev => ({ ...prev, startDate: dayjs(date).format('YYYY-MM-DD') }))}
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
                  value={data.endDate
                    ? dayjs(data.endDate)
                    : dayjs()}
                  onChange={(date) => setData(prev => ({ ...prev, endDate: dayjs(date).format('YYYY-MM-DD') }))}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>

          <div className='input' style={{ gap: '15px' }}>
            <Button variant="contained" onClick={showList}>List</Button>
          </div>
        </div>

        <div className="Download-btn download-btn-purchase" style={{ display: "flex", gap: "15px" }}>
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <React.Fragment>
                <Button variant="contained" endIcon={<ExpandCircleDownOutlinedIcon />} {...bindTrigger(popupState)}>
                  Download
                </Button>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem onClick={handleExcelDownload}>Excel</MenuItem>
                  <MenuItem onClick={handlePdfDownload}>PDF</MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>

          <div className='input'>
            <TextField
              name="fullTotalKM"
              className='customer-bill-input'
              value={totalValues.fullTotalKM || ''}
              label="Full Total KM"
              id="ex-fullTotalKM"
              size="small"
              autoComplete="password"
              variant="standard"
            />
          </div>

          <div className='input'>
            <TextField
              name="fullTotalHR"
              className='customer-bill-input'
              value={totalValues.fullTotalHR || ''}
              label="Full Total HR"
              id="ex-fullTotalHR"
              size="small"
              autoComplete="password"
              variant="standard"
            />
          </div>

          <div className='input'>
            <TextField
              name="totalAmount"
              className='customer-bill-input'
              value={totalValues.totalAmount || ''}
              label="Total Amount"
              id="ex-totalAmount"
              size="small"
              autoComplete="password"
              variant="standard"
            />
          </div>
          <div className='input'>
            <TextField
              name="totalAdvance"
              className='customer-bill-input'
              value={totalValues.totalAdvance || ''}
              label="Total Advance"
              id="ex-totalAdvance"
              size="small"
              autoComplete="password"
              variant="standard"
            />
          </div>
          <div className='input'>
            <TextField
              name="totalBalance"
              className='customer-bill-input'
              value={totalValues.totalBalance || ''}
              label="Total Balance"
              id="ex-totalBalance"
              size="small"
              autoComplete="password"
              variant="standard"
            />
          </div>
          <div className='input'>
            <TextField
              name="totalBeta"
              className='customer-bill-input'
              value={totalValues.totalBeta || ''}
              label="Total Beta"
              id="ex-totalBeta"
              size="small"
              autoComplete="password"
              variant="standard"
            />
          </div>
        </div>
        <div className='alert-popup-main'>
          {error &&
            <div className='alert-popup Error' >
              <div className="popup-icon"> <ClearIcon /> </div>
              <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
              <p>{errorMessage}</p>
            </div>
          }
          {success &&
            <div className='alert-popup Success' >
              <div className="popup-icon"> <FileDownloadDoneIcon /> </div>
              <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
              <p>{successMessage}</p>
            </div>
          }
          {warning &&
            <div className='alert-popup Warning' >
              <div className="popup-icon"> <ErrorOutlineIcon /> </div>
              <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
              <p>{warningMessage}</p>
            </div>
          }
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
              rows={Customerdata}
              columns={customer_colums}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
            // checkboxSelection
            />
          </Box>
        </div>



      </div>
    </>)
}



export default VehicleStatement