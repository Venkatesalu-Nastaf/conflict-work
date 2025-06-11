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
// import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
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
import dayjs from 'dayjs'
import { TextField } from '@mui/material';
import Excel from 'exceljs';
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import { IoBusinessSharp } from "react-icons/io5";
import Autocomplete from "@mui/material/Autocomplete";


// const customer_colums = [
//   { field: 'id', headerName: 'S.no', width: 70 },
//   { field: 'vehRegNo', headerName: 'Vehicle', width: 160 },
//   { field: 'totalTime', headerName: 'Tot. Time', width: 120 },
//   { field: 'totalKilometers', headerName: 'TKMS', width: 120 },
//   { field: 'totalPackageAmount', headerName: 'Amount', width: 130 },
//   { field: 'totalcustomeradvance', headerName: 'Driver Advance', width: 130 },
//   { field: 'balance', headerName: 'Balance', width: 130 },
//   { field: "betaTotalAmount", headerName: "Beta", with: 100 },
//   { field: "fuelamount", headerName: "Fuel Amount", with: 100 },
//   { field: "grandTotal", headerName: "TotalAmount", with: 100 }
// ]



// const customer_colums = [
//   { field: 'id', headerName: 'S.no', width: 70 },
//   { field: 'vehRegNo', headerName: 'Vehicle', width: 160 },
//   { field: 'totalTime', headerName: 'Tot. Time', width: 120 },
//   { field: 'totalKilometers', headerName: 'TKMS', width: 120 },
//   { field: "betaTotalAmount", headerName: "Beta", with: 100 },
//   { field: "grandTotal", headerName: "TotalAmount", with: 100 },
//   // { field: 'totalPackageAmount', headerName: 'Amount', width: 130 },
//   { field: 'totalcustomeradvance', headerName: 'Driver Advance', width: 130 },
//   // { field: 'balance', headerName: 'Balance', width: 130 },
//   // { field: "betaTotalAmount", headerName: "Beta", with: 100 },
//   { field: "fuelamount", headerName: "Fuel Amount", with: 100 },
//   { field: 'totalPackageAmount', headerName: 'Total Balance', width: 130 },
//   // { field: "grandTotal", headerName: "TotalAmount", with: 100 }
// ]
// const customer_colums1 = [
//   { field: 'id', headerName: 'S.no', width: 70 },
//   { field: 'vehRegNo', headerName: 'Vehicle', width: 160 },
//   { field: 'totalTime', headerName: 'Tot. Time', width: 120 },
//   { field: 'totalKilometers', headerName: 'TKMS', width: 120 },
//   { field: "betaTotalAmount", headerName: "Beta", with: 100 },
//   { field: "grandTotal", headerName: "TotalAmount", with: 100 },
//   // { field: 'totalPackageAmount', headerName: 'Amount', width: 130 },
//   { field: 'totalcustomeradvance', headerName: 'Driver Advance', width: 130 },
//   // { field: 'balance', headerName: 'Balance', width: 130 },
//   // { field: "betaTotalAmount", headerName: "Beta", with: 100 },
//   { field: "fuelamount", headerName: "Fuel Amount", with: 100 },
//   // { field: 'totalPackageAmount', headerName: 'Total Balance', width: 130 },
//   // { field: "grandTotal", headerName: "TotalAmount", with: 100 }
// ]

const newColumnsVehicleStatement = [
  { field: 'id', headerName: 'S.no', width: 70 },
  { field: 'shedOutDate', headerName: 'ShedOutDate', width: 120 , valueFormatter: (params) => dayjs(params.value).format('DD-MM-YYYY'),},
  { field: 'tripid', headerName: 'TripID', width: 120 },
  { field: 'vehicleName', headerName: 'CarType', width: 120 },
  { field: 'driverName', headerName: 'DriverName',width: 150 },
  { field: 'vehRegNo', headerName: 'VehicleNo', width: 120 },
  { field: 'duty', headerName: 'DutyType', width: 120 },
  { field: 'totalkm1', headerName: 'TotalKM', width: 120 },
  { field: 'totaltime', headerName: 'TotalHRS', width: 120 },
  { field: 'totalcalcAmount', headerName: 'TotalAmount', width: 100 },
  { field: 'parking', headerName: 'Parking', width: 100 },
  { field: 'toll', headerName: 'Toll', width: 100 },
  { field: 'permit', headerName: 'Permit',width: 100 },
  { field: 'fuelamount', headerName: 'FuelAmount',width: 100 },
  { field: 'advancepaidtovendor', headerName: 'VendorAdvance', width: 120 },
  { field: 'FinalTotalAmount', headerName: 'Total', width: 120 },
]

const VehicleStatement = () => {
  const [data, setData] = useState({
    hireTypes: "",
    startDate: dayjs().format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD')
  })
  const superAdminstatement = localStorage.getItem("SuperAdmin")
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  // const [successMessage, setSuccessMessage] = useState({});
  const [success, setSuccess] = useState(false);
  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessgae] = useState({});
  // const [setTableData] = useState([])
  const [veghdata, setVehDatashow] = useState([])
  const [vehregvalue, setVehRegValue] = useState('')

  const [totalValues, setTotalValues] = useState({
    fullTotalKM: '',
    fullTotalHR: '',
    totalAmount: "0",
    totalAdvance: "0",
    totalBalance: "0",
    totalBeta: '0',
    fuelamount: "0",
    grandTotal: "0"

  })

  // customer--------------------------

  // const transformCustomer = (data) => {
  //   const vehicleTotals = {};

  //   data?.forEach(element => {
  //     const { vehRegNo, totalkm1, totalcalcAmount, totaltime, customeradvance, driverBeta_amount } = element;

  //     if (!vehicleTotals[vehRegNo]) {
  //       vehicleTotals[vehRegNo] = {
  //         totalKilometers: 0,
  //         totalPackageAmount: 0,
  //         totalTime: 0,
  //         totalcustomeradvance: 0,
  //         balance: 0,
  //         betaTotalAmount: 0,

  //       };
  //     }

  //     vehicleTotals[vehRegNo].totalKilometers += parseFloat(totalkm1) || 0;
  //     vehicleTotals[vehRegNo].totalPackageAmount += parseFloat(totalcalcAmount) || 0;
  //     vehicleTotals[vehRegNo].totalcustomeradvance += parseFloat(customeradvance) || 0;
  //     vehicleTotals[vehRegNo].betaTotalAmount += parseFloat(driverBeta_amount) || 0;


  //     const totalTimeMinutes = convertTotalTimeToMinutes(totaltime);
  //     vehicleTotals[vehRegNo].totalTime += totalTimeMinutes || 0;
  //   });


  //   return Object.keys(vehicleTotals).map((vehRegNo, index) => ({
  //     id: index + 1,
  //     vehRegNo,
  //     totalKilometers: vehicleTotals[vehRegNo].totalKilometers,
  //     totalPackageAmount: vehicleTotals[vehRegNo].totalPackageAmount,
  //     totalTime: convertMinutesToTime(vehicleTotals[vehRegNo].totalTime),
  //     totalcustomeradvance: vehicleTotals[vehRegNo].totalcustomeradvance,
  //     balance: vehicleTotals[vehRegNo].totalPackageAmount - vehicleTotals[vehRegNo].totalcustomeradvance,
  //     betaTotalAmount: vehicleTotals[vehRegNo].betaTotalAmount,
  //   }));
  // };


  // TIME CONVERTION TYPE HH:MM

  // const convertTotalTimeToMinutes = (totaltime) => {


  //   const [hoursPart, minutesPart] = totaltime.split(' ');
  //   const hours = parseInt(hoursPart?.replace('h', ''), 10);
  //   const minutes = parseInt(minutesPart?.replace('m', ''), 10);

  //   return (hours * 60) + minutes;
  // };
  // const convertTotalTimeToMinutes = (totaltime) => {
  //   console.log(totaltime, "ee")
  //   const hoursMatch = totaltime.match(/(\d+)h/);
  //   // const minutesMatch = totaltime.match(/(\d+)m/);
  //   const minutesMatch = totaltime.match(/(\d+)m/);

  //   // Extract hours and minutes, defaulting to 0 if not present
  //   const hours1 = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
  //   const minutes1 = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;
  //   console.log(hours1, "match", minutes1)
  //   // // const [hoursPart, minutesPart] = totaltime.split(' ');
  //   // const hours = parseInt(hoursPart?.replace('h', ''), 10);
  //   // const minutes = parseInt(minutesPart?.replace('m', ''), 10);

  //   return (hours1 * 60) + minutes1;
  // };

  // const convertMinutesToTime = (minutes) => {
  //   const hours = Math.floor(minutes / 60);
  //   const mins = minutes % 60;
  //   return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
  // };

  // // TIME CONVERTION TYPE 00:00
  // const convertTimeToMinutes2 = (time) => {
  //   const [hours, minutes] = time.split(':').map(Number);
  //   return hours * 60 + minutes;
  // };

  //----------------------------------------

  //ATTACHED
  // const transformAtached = (data) => {
  //   const vehicleTotals = {};

  //   data?.forEach(element => {
  //     const { vehRegNo, vendortotalkm, vendorTotaltime, Vendor_FULLTotalAmount, advancepaidtovendor, Vendor_BataTotalAmount, fuelamount, grandTotal } = element;

  //     if (!vehicleTotals[vehRegNo]) {
  //       vehicleTotals[vehRegNo] = {
  //         totalKilometers: 0,
  //         totalPackageAmount: 0,
  //         totalTime: 0,
  //         totalcustomeradvance: 0,
  //         balance: 0,
  //         betaTotalAmount: 0,
  //         fuelamount: 0,
  //         grandTotal: 0

  //       };
  //     }

  //     vehicleTotals[vehRegNo].totalKilometers += parseFloat(vendortotalkm) || 0;
  //     vehicleTotals[vehRegNo].totalPackageAmount += parseFloat(Vendor_FULLTotalAmount) || 0;
  //     vehicleTotals[vehRegNo].totalcustomeradvance += parseFloat(advancepaidtovendor) || 0;
  //     vehicleTotals[vehRegNo].betaTotalAmount += parseFloat(Vendor_BataTotalAmount) || 0;
  //     vehicleTotals[vehRegNo].fuelamount += parseFloat(fuelamount) || 0;
  //     vehicleTotals[vehRegNo].grandTotal += parseFloat(grandTotal) || 0;


  //     const totalTimeMinutes = convertTotalTimeToMinutes(vendorTotaltime);
  //     console.log(totalTimeMinutes, "min")
  //     vehicleTotals[vehRegNo].totalTime += totalTimeMinutes || 0;
  //   });


  //   return Object.keys(vehicleTotals).map((vehRegNo, index) => ({
  //     id: index + 1,
  //     vehRegNo,
  //     totalKilometers: vehicleTotals[vehRegNo].totalKilometers,
  //     totalPackageAmount: vehicleTotals[vehRegNo].totalPackageAmount,
  //     totalTime: convertMinutesToTime(vehicleTotals[vehRegNo].totalTime),
  //     totalcustomeradvance: vehicleTotals[vehRegNo].totalcustomeradvance,
  //     // balance: vehicleTotals[vehRegNo].totalPackageAmount - vehicleTotals[vehRegNo].totalcustomeradvance,
  //     balance: vehicleTotals[vehRegNo].totalPackageAmount,
  //     betaTotalAmount: vehicleTotals[vehRegNo].betaTotalAmount,
  //     fuelamount: vehicleTotals[vehRegNo].fuelamount,
  //     grandTotal: vehicleTotals[vehRegNo].grandTotal
  //   }));
  // };
  const transformAtached = (data) => {
    let totalHours = 0;
    let totalKM = 0;
    let totalBeta = 0;
    let totalCalcAmount = 0;
    let customerAdvance = 0;
    let FuelAmount = 0;
    let TotalBalance = 0;
  
    // console.log(data, "dataaaaaaaaa");
  
    data?.forEach((element) => {
      // Add total hours
      const timeStr = element.totaltime?.toString().trim(); // e.g., "4h"
      if (timeStr && timeStr.includes('h')) {
        const hours = parseFloat(timeStr.replace('h', '').trim());
        totalHours += hours || 0;
      }
  
      // Add total kilometers
      const km = parseFloat(element.totalkm1) || 0;
      totalKM += km;
      const beta = parseFloat(element.driverBeta_amount) || 0;
      totalBeta += beta;
      const totalAmount = parseFloat(element.totalcalcAmount) || 0;
      totalCalcAmount += totalAmount;
      const advance = parseFloat(element.advancepaidtovendor) || 0;
      customerAdvance += advance;
      const fuelPrice = parseFloat(element.fuelamount) || 0;
      FuelAmount += fuelPrice;
      const BalanceAmount = totalCalcAmount - (customerAdvance + FuelAmount) || 0;
      TotalBalance = BalanceAmount
      // console.log(BalanceAmount,"bbbbbbbbbbbbbbbbbbbbbbbb");
      
    });

    setTotalValues({
      fullTotalKM: totalKM,
      fullTotalHR: totalHours,
      totalAmount: totalCalcAmount || 0,
      totalAdvance: customerAdvance || 0,
      totalBalance: TotalBalance || 0,
      totalBeta: totalBeta || 0,
      fuelamount: FuelAmount || 0,
      grandTotal: (totalCalcAmount + totalBeta + FuelAmount), // or however you define grandTotal
    });
  
    // console.log("Total Hours:", totalHours);
    // console.log("Total Kilometers:", totalKM,totalBeta,totalCalcAmount,TotalBalance);
  };
  
  
  

  // REDUCE FUNCION FOR OVERAL CALCULATION
  // const reduceFun = (data) => {
  //   const result = data.reduce((accumulator, current) => {
  //     accumulator.totalTime += convertTimeToMinutes2(current.totalTime) || 0
  //     accumulator.totalKilometers += current.totalKilometers || 0;
  //     accumulator.totalPackageAmount += current.totalPackageAmount || 0;
  //     accumulator.totalAdvance += current.totalcustomeradvance || 0;
  //     accumulator.totaalBalance += current.balance || 0;
  //     accumulator.totalBeta += current.betaTotalAmount || 0;
  //     accumulator.grandTotal += current.grandTotal || 0;
  //     accumulator.fuelamount += current.fuelamount || 0;


  //     return accumulator
  //   }, { totalPackageAmount: 0, totalKilometers: 0, totaalBalance: 0, totalTime: 0, totalAdvance: 0, totalBeta: 0, fuelamount: 0, grandTotal: 0 })

  //   return result;
  // }

//   const reduceFun = (data) => {
//     const result = data.reduce((accumulator, current) => {
//       accumulator.totalTime += convertTimeToMinutes2(current.totalTime) || 0
//       accumulator.totalKilometers += current.totalKilometers || 0;
//       accumulator.totalPackageAmount += current.totalPackageAmount || 0;
//       accumulator.totalAdvance += current.totalcustomeradvance || 0;
//       accumulator.totaalBalance += current.balance || 0;
//       accumulator.totalBeta += current.betaTotalAmount || 0;
//       accumulator.grandTotal += parseFloat(current.totalcalcAmount) || 0;
//       accumulator.fuelamount += current.fuelamount || 0;

// console.log(accumulator,"accccccccccccccccccccccccccccccccccccccc",current);

//       return accumulator
//     }, { totalPackageAmount: 0, totalKilometers: 0, totaalBalance: 0, totalTime: 0, totalAdvance: 0, totalBeta: 0, fuelamount: 0, grandTotal: 0 })

//     return result;
//   }

  const [Customerdata, setCustomerData] = useState([])

  // const showList = async (e) => {    
  //   e.preventDefault();
  //   const response = await axios.get(`${APIURL}/getvehicleInfo`, { params: data });
  //   // setTableData(response.data)
  //   const datas = response.data;    

  //   if (data.hireTypes === "Own  Vehicle") {
  //     const parseData = transformCustomer(datas)
  //     const reducedData = reduceFun(parseData)

  //     if (reducedData &&
  //       reducedData.totalKilometers !== 0 &&
  //       reducedData.totalTime !== 0 &&
  //       reducedData.totalPackageAmount !== 0 &&
  //       reducedData.totalAdvance !== 0 &&
  //       reducedData.totaalBalance !== 0 &&
  //       reducedData.totalBeta !== 0) {
  //       setTotalValues(prev => ({
  //         ...prev, fullTotalKM: reducedData.totalKilometers,
  //         fullTotalHR: convertMinutesToTime(reducedData.totalTime),
  //         totalAmount: reducedData.totalPackageAmount,
  //         totalAdvance: reducedData.totalAdvance,
  //         totalBalance: reducedData.totaalBalance,
  //         totalBeta: reducedData.totalBeta,
  //       }))

  //       setSuccess(true)
  //       setSuccessMessage("Successfully Listed")
  //     } else {
  //       setTotalValues({})
  //     }

  //     if (parseData.length > 0) {
  //       setCustomerData(parseData)
  //       const reducedData = reduceFun(parseData)

  //     } else {
  //       setCustomerData([])
  //       setError(true)
  //       setErrorMessage("No Data Found")
  //     }

  //   } else if (data.hireTypes === "Attached Vehicle") {
  //     const parseData = transformAtached(datas)
  //     if (parseData.length > 0) {
  //       const reducedData = reduceFun(parseData)

  //       if (reducedData) {
  //         setTotalValues(prev => ({
  //           ...prev, fullTotalKM: reducedData.totalKilometers,
  //           fullTotalHR: convertMinutesToTime(reducedData.totalTime),
  //           totalAmount: reducedData.totalPackageAmount,
  //           totalAdvance: reducedData.totalAdvance,
  //           totalBalance: reducedData.totaalBalance,
  //           totalBeta: reducedData.totalBeta,
  //         }))
  //         setSuccess(true)
  //         setSuccessMessage("Successfully Listed")
  //       } else {
  //         setTotalValues({})
  //       }

  //       setCustomerData(parseData)
  //       setData(prev => ({ ...prev, hireTypes: "Attached Vehicle" }))
  //     } else {
  //       setCustomerData([])
  //       setError(true)
  //       setErrorMessage("No Data Found")
  //     }

  //   } else {
  //     setCustomerData([])
  //     setError(true)
  //     setErrorMessage("Please Select Hire Types")
  //   }
  // }

  // with try catch block
  const showList = async (e) => {
    e.preventDefault();
    if (data.hireTypes === '') {
      setCustomerData([]);
      setWarning(true);
      setWarningMessgae("Please Select Hire Types");
      return

    }

    if (vehregvalue === '') {
      setCustomerData([]);
      setWarning(true);
      setWarningMessgae("Please Select vehregno");
      return

    }

    try {
      const data2 = { ...data, vehregvalue }
      console.log(data2, "data222222222222222");

      const response = await axios.get(`${APIURL}/getvehicleInfostate`, { params: data2 });
      const dataresponse = response.data;
      // console.log(datas, "data222222222222222alldatassssssssssssssssssssssssssssssssss");
      // const datas = dataresponse.map((li) => {
      //   const totalAmount =
      //     parseFloat(li.totalcalcAmount || 0) +
      //     parseFloat(li.parking || 0) +
      //     parseFloat(li.toll || 0) +
      //     parseFloat(li.permit || 0) -
      //     (parseFloat(li.fuelamount || 0) + parseFloat(li.advancepaidtovendor || 0)); // if advancepaidtovendor is global
      
      //   return {
      //     ...li,
      //     FinalTotalAmount: totalAmount,
      //   };
      // });
      

      const datas = dataresponse.map((li) => {
        const totalAmount =
          parseFloat(li.totalcalcAmount || 0) +
          parseFloat(li.parking || 0) +
          parseFloat(li.toll || 0) +
          parseFloat(li.permit || 0) -
          (parseFloat(li.fuelamount || 0) + parseFloat(li.advancepaidtovendor || 0));
      
        // Format shedOutDate using dayjs
        const formattedShedOutDate = li.shedOutDate
          ? dayjs(li.shedOutDate).format('DD-MM-YYYY')
          : '';
      
        return {
          ...li,
          FinalTotalAmount: totalAmount,
          shedOutDate: formattedShedOutDate, // Replace original with formatted version
        };
      });
      
      // console.log(datas, "updated data with FinalTotalAmount");


      if (data.hireTypes === "Own Vehicle") {
        if (datas.length > 0) {

          const parseData = transformAtached(datas);
          // const parseData = transformCustomer(datas);
          console.log(parseData, "ddd")
          setCustomerData(datas)
          // const reducedData = reduceFun(parseData);

          // if (reducedData &&
          //   reducedData.totalKilometers !== 0 &&
          //   reducedData.totalTime !== 0 &&
          //   reducedData.totalPackageAmount !== 0 &&
          //   reducedData.totalAdvance !== 0 &&
          //   reducedData.totaalBalance !== 0 &&
          //   reducedData.totalBeta !== 0) {

          //   setTotalValues(prev => ({
          //     ...prev,
          //     fullTotalKM: reducedData.totalKilometers,
          //     fullTotalHR: convertMinutesToTime(reducedData.totalTime),
          //     // totalAmount: reducedData.totalPackageAmount,
          //     totalAmount: reducedData.grandTotal,
          //     totalAdvance: reducedData.totalAdvance || 0,
          //     totalBalance: reducedData.totaalBalance,
          //     totalBeta: reducedData.totalBeta,
          //     fuelamount: reducedData.fuelamount,
          //   }));

          //   setSuccess(true);
          //   setSuccessMessage("Successfully Listed");
          // } else {
          //   setTotalValues({});
          // }

          // if (parseData.length > 0) {
          //   setCustomerData(parseData);
            
          // } else {
          //   setCustomerData([]);
          //   setTotalValues({});
          //   setError(true);
          //   setErrorMessage("No Data Found");
          // }
        }
        else {
          setCustomerData([]);
          setTotalValues({});
          setError(true);
          setErrorMessage("No Data Found");
        }

      } else if (data.hireTypes === "Attached Vehicle") {
        if (datas.length > 0) {
          const parseData = transformAtached(datas);
          console.log(parseData, "ddd")
          setCustomerData(datas)
          // if (parseData.length > 0) {
          //   const reducedData = reduceFun(parseData);
          //   console.log(reducedData, "redu")

          //   if (reducedData) {
          //     setTotalValues(prev => ({
          //       ...prev,
          //       fullTotalKM: reducedData.totalKilometers,
          //       fullTotalHR: convertMinutesToTime(reducedData.totalTime),
          //       totalAmount: reducedData.grandTotal,
          //       // totalAmount: reducedData.totalPackageAmount,
          //       totalAdvance: reducedData.totalAdvance || 0,
          //       totalBalance: reducedData.totaalBalance,
          //       totalBeta: reducedData.totalBeta,
          //       fuelamount: reducedData.fuelamount,
          //     }));
          //     setSuccess(true);
          //     setSuccessMessage("Successfully Listed");
          //   } else {
          //     setTotalValues({});
          //   }

          //   setCustomerData(parseData);
          //   // setData(prev => ({ ...prev, hireTypes: "Attached Vehicle" }));
          // } else {
          //   setCustomerData([]);
          //   setTotalValues({});
          //   setError(true);
          //   setErrorMessage("No Data Found");
          // }
        }
        else {
          setCustomerData([]);
          setTotalValues({});
          setError(true);
          setErrorMessage("No Data Found");
        }

      }
      else if (data.hireTypes === "OutSide Travels") {
        if (datas.length > 0) {


          transformAtached(datas);
          setCustomerData(datas)
          // if (parseData.length > 0) {
          //   const reducedData = reduceFun(parseData);

          //   if (reducedData) {
          //     setTotalValues(prev => ({
          //       ...prev,
          //       fullTotalKM: reducedData.totalKilometers,
          //       fullTotalHR: convertMinutesToTime(reducedData.totalTime),
          //       totalAmount: reducedData.grandTotal,
          //       // totalAmount: reducedData.totalPackageAmount,
          //       totalAdvance: reducedData.totalAdvance || 0,
          //       totalBalance: reducedData.totaalBalance,
          //       totalBeta: reducedData.totalBeta,
          //       fuelamount: reducedData.fuelamount,
          //     }));
          //     setSuccess(true);
          //     setSuccessMessage("Successfully Listed");
          //   } else {
          //     setTotalValues({});
          //   }

          //   setCustomerData(parseData);
          //   // setData(prev => ({ ...prev, hireTypes: "lease" }));
          // } else {
          //   setCustomerData([]);
          //   setTotalValues({});
          //   setError(true);
          //   setErrorMessage("No Data Found");
          // }
        }
        else {
          setCustomerData([]);
          setTotalValues({});
          setError(true);
          setErrorMessage("No Data Found");
        }

      } else if (data.hireTypes === "DCO Vehicle") {
        if (datas.length > 0) {
          transformAtached(datas);
          // if (parseData.length > 0) {
          //   const reducedData = reduceFun(parseData);

            // if (reducedData) {
            //   setTotalValues(prev => ({
            //     ...prev,
            //     fullTotalKM: reducedData.totalKilometers,
            //     fullTotalHR: convertMinutesToTime(reducedData.totalTime),
            //     // totalAmount: reducedData.totalPackageAmount,
            //     totalAmount: reducedData.grandTotal,
            //     totalAdvance: reducedData.totalAdvance || 0,
            //     totalBalance: reducedData.totaalBalance,
            //     totalBeta: reducedData.totalBeta,
            //     fuelamount: reducedData.fuelamount,
            //   }));
            //   setSuccess(true);
            //   setSuccessMessage("Successfully Listed");
            // } else {
            //   setTotalValues({});
            // }
setCustomerData(datas)
            // setCustomerData(parseData);
            // setData(prev => ({ ...prev, hireTypes: "lease" }));
          // }
          // else {
          //   setCustomerData([]);
          //   setTotalValues({});
          //   setError(true);
          //   setErrorMessage("No Data Found");
          // }
        }
        else {
          setCustomerData([]);
          setTotalValues({});
          setError(true);
          setErrorMessage("No Data Found");
        }

      }
      else if (data.hireTypes === "All") {
        if (datas.length > 0) {
          transformAtached(datas);
          // const parseData = datas;
          

          // if (parseData.length > 0) {
          //   const reducedData = reduceFun(parseData);

          //   if (reducedData) {
          //     setTotalValues(prev => ({
          //       ...prev,
          //       fullTotalKM: reducedData.totalKilometers,
          //       fullTotalHR: convertMinutesToTime(reducedData.totalTime),
          //       // totalAmount: reducedData.totalPackageAmount,
          //       totalAmount: reducedData.grandTotal,
          //       totalAdvance: reducedData.totalAdvance || 0,
          //       totalBalance: reducedData.totaalBalance,
          //       totalBeta: reducedData.totalBeta,
          //       fuelamount: reducedData.fuelamount,
          //     }));
          //     setSuccess(true);
          //     setSuccessMessage("Successfully Listed");
          //   } else {
          //     setTotalValues({});
          //   }
          //   console.log(parseData,"ppppppppppppppppppppppppppppppppppppppppppppppppppppp---------------------");

          //   // setCustomerData(parseData);
            setCustomerData(datas);
          //   // setData(prev => ({ ...prev, hireTypes: "lease" }));
          // }
          // else {
          //   setCustomerData([]);
          //   setTotalValues({});
          //   setError(true);
          //   setErrorMessage("No Data Found");
          // }
        }
        else {
          setCustomerData([]);
          setTotalValues({});
          setError(true);
          setErrorMessage("No Data Found");
        }

      }
      // else {
      //         setCustomerData([]);
      //         setWarning(true);
      //         setWarningMessgae("Please Select Hire Types");
      //     }

    }
    // catch (error) {
    //     setError(true);
    //     setErrorMessage("An error occurred: " + error.message);
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
        setErrorMessage("Failed to add organization: " + (error.response.data.message || error.message));
      } else {
        // Fallback for other errors
        setError(true);
        setErrorMessage("An unexpected error occurred: " + error.message);
      }
    }
  };


  //Excel
  const handleExcelDownload = async () => {
    const workbook = new Excel.Workbook();
    const workSheetName = 'Vehicle Statement';
  
    try {
      const fileName = "VehicleStatement Reports";
      const worksheet = workbook.addWorksheet(workSheetName);
  
      // Step 1: Define worksheet columns using newColumnsVehicleStatement
      const columns = newColumnsVehicleStatement.map(({ field, headerName }) => ({
        key: field,
        header: headerName,
      }));
  
      worksheet.columns = columns;
  
      // Step 2: Style the header row (bold + left aligned)
      const headerRow = worksheet.getRow(1);
      headerRow.font = { bold: true };
      headerRow.height = 30;
      headerRow.eachCell((cell) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '9BB0C1' }
        };
        // cell.alignment = { vertical: 'middle', horizontal: 'centre' }; 
      });
      Customerdata.forEach((item) => {
        const rowData = {};
        columns.forEach(({ key }) => {
          let value = item[key] ?? '';
      
          // Extract only the hour part from totaltime like "1h 22m"
          if (key === 'totaltime' && typeof value === 'string') {
            const match = value.match(/(\d+)h/);
            value = match ? match[1] : ''; // only the number before 'h'
          }
      
          rowData[key] = value;
        });
      
        const newRow = worksheet.addRow(rowData);
      
        // Apply left alignment to each cell in this row
        newRow.eachCell((cell) => {
          cell.alignment = { horizontal: 'left', vertical: 'middle' };
        });
      });
  
      // Step 4: Auto-adjust column widths
      worksheet.columns.forEach((column) => {
        let maxLength = column.header.length;
        column.eachCell?.({ includeEmpty: true }, (cell) => {
          const length = cell.value?.toString().length || 0;
          if (length > maxLength) {
            maxLength = length;
          }
        });
        column.width = maxLength + 5;
      });
      const totalKms = Customerdata.reduce((sum, row) => sum + parseInt(row.totalkm1 || 0),0);
      const totalFinalAmount = Customerdata.reduce((sum, row) => sum + parseInt(row.FinalTotalAmount || 0),0)

      const totalRow = worksheet.addRow({});
      totalRow.getCell(newColumnsVehicleStatement.findIndex(col => col.headerName === 'DriverName') + 1).value = "TOTAL";
      totalRow.getCell(newColumnsVehicleStatement.findIndex(col => col.headerName === 'TotalKM') + 1).value = totalKms;
      totalRow.getCell(newColumnsVehicleStatement.findIndex(col => col.headerName === 'TotalHRS') + 1).value = totalValues?.fullTotalHR;
      totalRow.getCell(newColumnsVehicleStatement.findIndex(col => col.headerName === 'TotalAmount') + 1).value = totalValues?.totalAmount;
      totalRow.getCell(newColumnsVehicleStatement.findIndex(col => col.headerName === 'Total') + 1).value = totalFinalAmount;



      totalRow.eachCell((cell) => {
        cell.font = { bold: true };
        cell.alignment = { horizontal: 'left', vertical: 'middle' };
        cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };
    });
      // Step 5: Optional - Add border to all cells
      // worksheet.eachRow({ includeEmpty: false }, (row) => {
      //   row.eachCell((cell) => {
      //     cell.border = {
      //       top: { style: 'thin' },
      //       bottom: { style: 'thin' },
      //       left: { style: 'thin' },
      //       right: { style: 'thin' }
      //     };
      //     const isHeader = row.number === 1;
      //                   worksheet.getCell(cell).alignment = {
      //                       horizontal: isHeader ? 'center' : 'left',
      //                       vertical: 'middle',
      //                   };
      //   });
      // });
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
            const isHeader = row.number === 1;
            worksheet.getCell(cellAddress).alignment = {
                horizontal: isHeader ? 'center' : 'left',
                vertical: 'middle',
            };
        });
    });

   
      // Step 6: Download the file
      const buf = await workbook.xlsx.writeBuffer();
      saveAs(new Blob([buf]), `${fileName}.xlsx`);
    } catch (error) {
      console.error('Excel Download Error:', error.message);
    } finally {
      workbook.removeWorksheet(workSheetName);
    }
  };
  
  const handlePdfDownload = () => {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "tabloid"
    });
  
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'normal');
    const text = "VehicleStatement";
  
    const pageWidth = pdf.internal.pageSize.getWidth();
    const textWidth = pdf.getTextWidth(text);
    const xPos = (pageWidth - textWidth) / 2;
  
    pdf.text(text, xPos, 10);
  
    const header = newColumnsVehicleStatement.map(row => row.headerName);
    const rowValues = Customerdata.map(row => {
      return newColumnsVehicleStatement.map(column => row[column.field] ?? '');
    });
    const totalFinalAmount = Customerdata.reduce((sum, row) => sum + parseInt(row.FinalTotalAmount || 0),0)

    const totalRow = newColumnsVehicleStatement.map(column => {
      switch (column.headerName) {
        case 'CarType':
          return 'TOTAL';
        case 'TotalKM':
          return totalValues?.fullTotalKM;
        case 'TotalHRS':
          return totalValues?.fullTotalHR;
        case 'TotalAmount':
          return totalValues?.totalAmount;
        case 'FuelAmount':
          return totalValues?.fuelamount;
        case 'VendorAdvance':
          return totalValues?.totalAdvance;
        case 'Total':
          return totalFinalAmount;
        default:
          return '';
      }
    });
  
    rowValues.push(totalRow);
    let fontdata = 10;  // Default font size for readability
    if (header.length <= 13) fontdata = 16;
    else if (header.length >= 14 && header.length <= 18) fontdata = 6.5;
    // else if (header.length >= 19 && header.length <= 20) fontdata = 10;
    // else if (header.length >= 21 && header.length <= 23) fontdata = 9;
    // else if (header.length >= 24 && header.length <= 26) fontdata = 7;
    // else if (header.length >= 27 && header.length <= 30) fontdata = 6;
    // else if (header.length >= 31 && header.length <= 33) fontdata = 4;
    // else if (header.length >= 34 && header.length <= 35) fontdata = 3;
  
    pdf.autoTable({
      head: [header],
      body: rowValues,
      startY: 20,
      headStyles: {
        fontSize: fontdata,
        cellPadding: 1.5,
        minCellHeight: 8,
        valign: 'middle',
        font: 'helvetica',
        cellWidth: 'wrap'
      },
      bodyStyles: {
        fontSize: fontdata,
        valign: 'middle',
        cellWidth: 'auto'
      },
      willDrawCell: function (data) {
        if (data.row.index === rowValues.length - 1) {
          const { cell } = data;
          const { x, y, width, height } = cell;
  
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(11);
          pdf.setDrawColor(0);
          pdf.setLineWidth(0.5);
          pdf.line(x, y, x + width, y);
          pdf.line(x, y + height, x + width, y + height);
        }
      },
      columnWidth: 'auto'
    });
  
    const pdfBlob = pdf.output('blob');
    saveAs(pdfBlob, 'VehicleStatement Reports.pdf');
  };
  

  // const handleExcelDownload = async () => {
  //   const workbook = new Excel.Workbook();
  //   const workSheetName = 'Worksheet-1';

  //   try {

  //     const fileName = "VehicleStatement Reports"
  //     const worksheet = workbook.addWorksheet(workSheetName);
  //     const columns1 = customer_colums.map(({ field, headerName, ...rest }) => ({
  //       key: field,
  //       header: headerName,
  //       ...rest
  //     }));

  //     worksheet.columns = columns1;


  //     // updated the font for first row.
  //     worksheet.getRow(1).font = { bold: true };

  //     // Set background color for header cells
  //     worksheet.getRow(1).eachCell((cell, colNumber) => {
  //       cell.fill = {
  //         type: 'pattern',
  //         pattern: 'solid',
  //         fgColor: { argb: '9BB0C1' } // Green background color
  //       };
  //     });

  //     worksheet.getRow(1).height = 30;
  //     // loop through all of the columns and set the alignment with width.
  //     worksheet.columns.forEach((column) => {
  //       column.width = column.header.length + 5;
  //       column.alignment = { horizontal: 'left', vertical: 'left' };
  //     });

  //     console.log(Customerdata, "GG")
  //     Customerdata.forEach((Customer, index) => {
  //       // Add advancepaidtovendor to Vendor_FULLTotalAmount
  //       worksheet.addRow(Customer);
  //       // Adjust column width based on the length of the cell values in the added row
  //       worksheet.columns.forEach((column) => {
  //         const cellValue = Customer[column.key] || ''; // Get cell value from singleData or use empty string if undefined
  //         const cellLength = cellValue.toString().length; // Get length of cell value as a string
  //         const currentColumnWidth = column.width || 0; // Get current column width or use 0 if undefined

  //         // Set column width to the maximum of current width and cell length plus extra space
  //         column.width = Math.max(currentColumnWidth, cellLength + 5);
  //       });
  //     });


  //     // Add the total row
  //     // const totalRow = worksheet.addRow({});
  //     // totalRow.getCell(columns1.findIndex(col => col.header === 'Vehicle') + 1).value = 'TOTAL';
  //     // totalRow.getCell(columns1.findIndex(col => col.header === 'TTime') + 1).value = totalValues?.fullTotalHR;
  //     // totalRow.getCell(columns1.findIndex(col => col.header === 'TKMS') + 1).value = totalValues?.fullTotalKM;
  //     // totalRow.getCell(columns1.findIndex(col => col.header === 'Amount') + 1).value = totalValues?.totalAmount;
  //     // totalRow.getCell(columns1.findIndex(col => col.header === 'D.Advance') + 1).value = totalValues?.totalAdvance;
  //     // totalRow.getCell(columns1.findIndex(col => col.header === 'Balance') + 1).value = totalValues?.totalBalance;
  //     // totalRow.getCell(columns1.findIndex(col => col.header === 'Beta') + 1).value = totalValues?.totalBeta;
  //     // console.log(totalRow,"ooo")
  //     const totalRow = worksheet.addRow({});
  //     // console.log(totalRow,"ooo")
  //     totalRow.getCell(columns1.findIndex(col => col.header === 'Vehicle') + 1).value = 'TOTAL';
  //     totalRow.getCell(columns1.findIndex(col => col.header === 'Tot. Time') + 1).value = totalValues?.fullTotalHR;
  //     totalRow.getCell(columns1.findIndex(col => col.header === 'TKMS') + 1).value = totalValues?.fullTotalKM;

  //     // totalRow.getCell(columns1.findIndex(col => col.header === 'Amount') + 1).value = totalValues?.totalAmount;
  //     totalRow.getCell(columns1.findIndex(col => col.header === 'TotalAmount') + 1).value = totalValues?.totalAmount;
  //     totalRow.getCell(columns1.findIndex(col => col.header === 'Driver Advance') + 1).value = totalValues?.totalAdvance;
  //     //   { field: "fuelamount", headerName: "Fuel Amount", with: 100 },
  //     totalRow.getCell(columns1.findIndex(col => col.header === 'Fuel Amount') + 1).value = totalValues?.fuelamount;
  //     totalRow.getCell(columns1.findIndex(col => col.header === 'Total Balance') + 1).value = totalValues?.totalBalance;
  //     totalRow.getCell(columns1.findIndex(col => col.header === 'Beta') + 1).value = totalValues?.totalBeta;
  //     // console.log(totalRow,"ooo")

  //     totalRow.eachCell((cell) => {
  //       cell.font = { bold: true };
  //       cell.alignment = { horizontal: 'left', vertical: 'left' };
  //       cell.border = {
  //         top: { style: 'thin' },
  //         left: { style: 'thin' },
  //         bottom: { style: 'thin' },
  //         right: { style: 'thin' },
  //       };
  //     });


  //     // loop through all of the rows and set the outline style.
  //     worksheet.eachRow({ includeEmpty: false }, (row) => {
  //       // store each cell to currentCell
  //       const currentCell = row._cells;

  //       // loop through currentCell to apply border only for the non-empty cell of excel
  //       currentCell.forEach((singleCell) => {

  //         const cellAddress = singleCell._address;

  //         // apply border
  //         worksheet.getCell(cellAddress).border = {
  //           top: { style: 'thin' },
  //           left: { style: 'thin' },
  //           bottom: { style: 'thin' },
  //           right: { style: 'thin' },
  //         };
  //       });
  //     });


  //     // write the content using writeBuffer
  //     const buf = await workbook.xlsx.writeBuffer();

  //     // download the processed file
  //     saveAs(new Blob([buf]), `${fileName}.xlsx`);
  //   } catch (error) {
  //     console.error('Something Went Wrong', error.message);
  //   } finally {
  //     // removing worksheet's instance to create new one
  //     workbook.removeWorksheet(workSheetName);
  //   }

  // }


  //PDF

  // const handlePdfDownload = () => {
  //   const pdf = new jsPDF({
  //     orientation: "portrait",
  //     unit: "mm",
  //     format: "tabloid" // [width, height] in inches
  //   });
  //   pdf.setFontSize(16);
  //   pdf.setFont('helvetica', 'normal');
  //   const text = "VehicleStatement";

  //   // Get page width
  //   const pageWidth = pdf.internal.pageSize.getWidth();

  //   // Calculate text width
  //   const textWidth = pdf.getTextWidth(text);

  //   // Calculate the x position to center the text
  //   const xPos = (pageWidth - textWidth) / 2;

  //   // Add text to PDF at calculated position
  //   pdf.text(text, xPos, 10);


  //   const header = customer_colums.map(row => row.headerName)
  //   const rowValues = Customerdata.map(row => {
  //     return customer_colums.map(column => row[column.field]);
  //   });


  //   // Create the total row
  //   const totalRow = customer_colums.map(column => {
  //     if (column.headerName === 'Vehicle') return "TOTAL";
  //     if (column.headerName === 'Tot. Time') return totalValues?.fullTotalHR;
  //     if (column.headerName === 'TKMS') return totalValues?.fullTotalKM;
  //     // if (column.headerName === 'Amount') return totalValues?.totalAmount;
  //     if (column.headerName === 'TotalAmount') return totalValues?.totalAmount;
  //     if (column.headerName === 'Driver Advance') return totalValues?.totalAdvance;
  //     if (column.headerName === 'Fuel Amount') return totalValues?.fuelamount;
  //     if (column.headerName === 'Total Balance') return totalValues?.totalBalance;
  //     if (column.headerName === 'Beta') return totalValues?.totalBeta;

  //     return '';
  //   });
  //   rowValues.push(totalRow);


  //   pdf.autoTable({
  //     head: [header],
  //     body: rowValues,
  //     startY: 20,

  //     headStyles: {
  //       fontSize: 12,
  //       cellPadding: 1.5, // Decrease padding in header

  //       minCellHeigh: 8,
  //       valign: 'middle',

  //       font: 'helvetica', // Set font type for body

  //       cellWidth: 'wrap',
  //       // cellWidth: 'auto'
  //     },

  //     bodyStyles: {
  //       fontSize: 10,
  //       valign: 'middle',
  //       cellWidth: 'auto'
  //       // Adjust the font size for the body

  //     },
  //     willDrawCell: function (data) {
  //       // Check if this cell is part of the total row
  //       if (data.row.index === rowValues.length - 1) {
  //         const { cell } = data;
  //         const { x, y, width, height } = cell;

  //         // Set bold text and increased font size
  //         pdf.setFont('helvetica', 'bold');
  //         pdf.setFontSize(11); // Increase the font size as needed

  //         // Draw top border
  //         pdf.setDrawColor(0); // Black color
  //         pdf.setLineWidth(0.5); // Line width
  //         pdf.line(x, y, x + width, y); // Draw top border

  //         // Draw bottom border
  //         pdf.line(x, y + height, x + width, y + height); // Draw bottom border
  //       }
  //     },
  //     columnWidth: 'auto'

  //   });
  //   const scaleFactor = pdf.internal.pageSize.getWidth() / pdf.internal.scaleFactor * 1.5;

  //   // Scale content
  //   pdf.scale(scaleFactor, scaleFactor);
  //   const pdfBlob = pdf.output('blob');
  //   saveAs(pdfBlob, 'VehicleStatement Reports.pdf');
  // };
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


  // const handlechnage = (e)=>{
  //   setData(prev => ({ ...prev, hireTypes: e.target.value }))

  // }


  const fetchdataccountinfodata = async (dataveh) => {
    const datareg = dataveh
    try {
      const response = await axios.get(`${APIURL}/hiretypebasedvehicle/${datareg}`)
      const data = response.data
      const data3 = data.map(res => res.vehRegNo)
      const data2 = ["All", ...data3]

      setVehDatashow(data2)


      // setAccountInfoData(data2)

    }
    catch (err) {
      console.log(err)
    }
  }

  const handlechnage = (e) => {
    setData(prev => ({ ...prev, hireTypes: e.target.value }))
    fetchdataccountinfodata(e.target.value)

  }
  const handleInputChange = (event, newValue) => {
    const selectoption = newValue ? newValue.label : ''
    setVehRegValue(selectoption);
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
                //   onChange={(e) =>
                //      setData(prev => ({ ...prev, hireTypes: e.target.value }))}
                // >
                onChange={handlechnage}
              >
                <MenuItem value="">
                  {/* <em>None</em> */}
                </MenuItem>
                {/* <MenuItem value={"Attached Vehicle"}>Attached Vehicle</MenuItem>
                <MenuItem value={"Own Vehicle"}>Own Vehicle</MenuItem>
                <MenuItem value={"OutSide Travels"}>OutSide Travels</MenuItem>
                <MenuItem value={"DCO Vehicle"}>DCO Vehicle</MenuItem> */}
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={"Attached Vehicle"}>Attached Vehicle</MenuItem>
                <MenuItem value={"Own Vehicle"}>Own Vehicle</MenuItem>
                <MenuItem value={"OutSide Travels"}>OutSide Travels</MenuItem>
                <MenuItem value={"DCO Vehicle"}>DCO Vehicle</MenuItem>


              </Select>
            </FormControl>
          </div>
          <div className="input">
            <div className="icone">
              <IoBusinessSharp color="action" />
            </div>
            <Autocomplete
              fullWidth
              id="vendor_hire"
              freeSolo
              size="small"
              value={vehregvalue}
              // options={accountinfodata.map((option) => ({
              //   label: option?.travelsname,
              // }))}
              options={veghdata.map((option) => ({
                label: option,
              }))}
              getOptionLabel={(option) => option.label || vehregvalue || ""}
              onChange={handleInputChange}
              renderInput={(params) =>
                <TextField {...params} label="Vendor_hire" />
              }
            />
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
          <div className="input">
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
              name="totalBeta"
              className='customer-bill-input'
              value={totalValues.totalBeta || 0}
              label="Total Beta"
              id="ex-totalBeta"
              size="small"
              autoComplete="password"
              variant="standard"
            />
          </div>

          <div className='input'>
            <TextField
              name="totalAmount"
              className='customer-bill-input'
              value={totalValues.totalAmount || 0}
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
              value={totalValues.totalAdvance || 0}
              label="Total Advance"
              id="ex-totalAdvance"
              size="small"
              autoComplete="password"
              variant="standard"
            />
          </div>
          <div className='input'>
            <TextField
              name="Fuelamount"
              className='customer-bill-input'
              value={totalValues.fuelamount || 0}
              label="Total Fuel"
              id="ex-totalBeta"
              size="small"
              autoComplete="password"
              variant="standard"
            />
          </div>
          {superAdminstatement === "SuperAdmin" &&
            <div className='input'>
              <TextField
                name="totalBalance"
                className='customer-bill-input'
                value={totalValues.totalBalance || 0}
                label="Total Balance"
                id="ex-totalBalance"
                size="small"
                autoComplete="password"
                variant="standard"
              />
            </div>
          }
          {/* <div className='input'>
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
          </div> */}
          {/* <div className='input'>
            <TextField
              name="Fuelamount"
              className='customer-bill-input'
              value={totalValues.fuelamount || ''}
              label="Total Fuel"
              id="ex-totalBeta"
              size="small"
              autoComplete="password"
              variant="standard"
            />
          </div> */}
        </div>
        <div className='alert-popup-main'>
          {error &&
            <div className='alert-popup Error' >
              <div className="popup-icon"> <ClearIcon /> </div>
              <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
              <p>{errorMessage}</p>
            </div>
          }
          {/* {success &&
            <div className='alert-popup Success' >
              <div className="popup-icon"> <FileDownloadDoneIcon /> </div>
              <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
              <p>{successMessage}</p>
            </div>
          } */}
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
              // columns={customer_colums}
              // columns={superAdminstatement === "SuperAdmin" ? customer_colums : customer_colums1}
              columns = {newColumnsVehicleStatement}
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