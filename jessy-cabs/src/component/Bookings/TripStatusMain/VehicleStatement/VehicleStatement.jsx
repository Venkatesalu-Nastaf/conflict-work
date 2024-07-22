import React, { useState } from 'react'
// import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { MdOutlineCalendarMonth } from "react-icons/md";
// import { GiMatterStates } from "react-icons/gi";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import Checkbox from '@mui/material/Checkbox';
// import FormControlLabel from '@mui/material/FormControlLabel';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import Menu from '@mui/material/Menu';
import InputLabel from '@mui/material/InputLabel';
import Box from "@mui/material/Box";
import "./VehicleStatement.css";
import axios from 'axios'
import { APIURL } from '../../../url';
import dayjs from 'dayjs';


const customer_colums = [
  { field: 'id', headerName: 'S.no', width: 70 },
  { field: 'vehRegNo', headerName: 'Vehicle', width: 160 },
  { field: 'totalTime', headerName: 'TotalTime', width: 120 },
  { field: 'totalKilometers', headerName: 'TotalKilometers', width: 120 },
  { field: 'totalPackageAmount', headerName: 'totalPackageAmount', width: 130 },
  { field: 'totalcustomeradvance', headerName: 'TotalAdvancedvance', width: 130 },
  { field: 'balance', headerName: 'Balance', width: 130 },
]


const VehicleStatement = () => {

  const [data, setData] = useState({
    hireTypes: "",
    startDate: "",
    endDate: ""
  })

  const [tableData, setTableData] = useState([])

  // customer--------------------------

  const transformCustomer = (data) => {
    const vehicleTotals = {};

    data?.forEach(element => {
      const { vehRegNo, totalkm1, totalcalcAmount, totaltime, customeradvance } = element;

      if (!vehicleTotals[vehRegNo]) {
        vehicleTotals[vehRegNo] = {
          totalKilometers: 0,
          totalPackageAmount: 0,
          totalTime: 0,
          totalcustomeradvance: 0,
          balance: 0,
        };
      }

      vehicleTotals[vehRegNo].totalKilometers += parseFloat(totalkm1) || 0;
      vehicleTotals[vehRegNo].totalPackageAmount += parseFloat(totalcalcAmount) || 0;
      vehicleTotals[vehRegNo].totalcustomeradvance += parseFloat(customeradvance) || 0;

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

  const convertMinutesToTime2 = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
  };
  //----------------------------------------

  //ATTACHED
  const transformAtached = (data) => {
    const vehicleTotals = {};

    data?.forEach(element => {
      const { vehRegNo, vendortotalkm, vendorTotaltime, Vendor_FULLTotalAmount, advancepaidtovendor } = element;

      if (!vehicleTotals[vehRegNo]) {
        vehicleTotals[vehRegNo] = {
          totalKilometers: 0,
          totalPackageAmount: 0,
          totalTime: 0,
          totalcustomeradvance: 0,
          balance: 0,
        };
      }

      vehicleTotals[vehRegNo].totalKilometers += parseFloat(vendortotalkm) || 0;
      vehicleTotals[vehRegNo].totalPackageAmount += parseFloat(Vendor_FULLTotalAmount) || 0;
      vehicleTotals[vehRegNo].totalcustomeradvance += parseFloat(advancepaidtovendor) || 0;

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
    }));
  };


  // REDUCE FUNCION FOR OVERAL CALCULATION
  const reduceFun = (data) => {
    const result = data.reduce((accumulator, current) => {
      accumulator.totalPackageAmount += current.totalPackageAmount || 0;
      accumulator.totalKilometers += current.totalKilometers || 0;
      accumulator.totaalBalance += current.balance || 0;
      accumulator.totalTime += convertTimeToMinutes2(current.totalTime) || 0

      return accumulator
    }, { totalPackageAmount: 0, totalKilometers: 0, totaalBalance: 0, totalTime: 0 })

    return result;
  }




  const [Customerdata, setCustomerData] = useState([])

  const showList = async (e) => {
    e.preventDefault();
    const response = await axios.get(`${APIURL}/getvehicleInfo`, { params: data });
    setTableData(response.data)
    const datas = response.data;
    console.log("datas", datas)


    if (data.hireTypes === "Own  Vehicle") {
      const parseData = transformCustomer(datas)
      console.log("parsedata", parseData)

      if (parseData.length > 0) {
        setCustomerData(parseData)
        const reducedData = reduceFun(parseData)

      } else {
        setCustomerData([])
        alert("no Data Found")
      }

    } else if (data.hireTypes === "Attached Vehicle") {
      const parseData = transformAtached(datas)
      if (parseData.length > 0) {
        const reducedData = reduceFun(parseData)
        setCustomerData(parseData)
        setData(prev => ({ ...prev, hireTypes: "Attached Vehicle" }))
      } else {
        setCustomerData([])
        alert("no Data Found")
      }

    } else {
      setCustomerData([])
      alert("no Data Found")
    }
  }


  return (

    <>
      <div className='main-content-form'>
        <div className='input-field'>

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
                  value={data.startDate}
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
                  value={data.endDate}
                  onChange={(date) => setData(prev => ({ ...prev, endDate: dayjs(date).format('YYYY-MM-DD') }))}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>


          <Button variant="contained" onClick={showList}>List</Button>
          <Button variant="contained">List All</Button>


        </div>

        <div className="Download-btn download-btn-purchase">
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <React.Fragment>
                <Button variant="contained" endIcon={<ExpandCircleDownOutlinedIcon />} {...bindTrigger(popupState)}>
                  Download
                </Button>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem >Excel</MenuItem>
                  <MenuItem >PDF</MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
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