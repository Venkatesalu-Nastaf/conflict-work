import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";
// import dayjs from "dayjs";
import "./PackageRateEntery.css";
import { RateType, PriceTag, VehicleType, Duty } from "./PackageRateEnteryData.js";
import Autocomplete from "@mui/material/Autocomplete";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import Box from "@mui/material/Box";
import TypeSpecimenOutlinedIcon from '@mui/icons-material/TypeSpecimenOutlined';
import RateReviewIcon from '@mui/icons-material/RateReview';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import EngineeringIcon from "@mui/icons-material/Engineering";
import { TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: "absolute",
  "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));
const actions = [
  { icon: <ChecklistIcon />, name: "List" },
  { icon: <CancelPresentationIcon />, name: "Cancel" },
  { icon: <DeleteIcon />, name: "Delete" },
  { icon: <ModeEditIcon />, name: "Edit" },
  { icon: <BookmarkAddedIcon />, name: "Add" },
];
// Table
const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "vehicleType", headerName: "Vehicle Type", width: 130 },
  { field: "duty", headerName: "Duty", width: 130 },
  { field: "Hours", headerName: "Hours", width: 130 },
  { field: "KMS", headerName: "KMS", width: 130 },
  { field: "Rate", headerName: "Rate", width: 130 },
  { field: "PerHour", headerName: "PerHours", width: 130 },
  { field: "PerKMS", headerName: "PerKMS", width: 130 },
  { field: "extraHours", headerName: "ExtraHours", width: 130 },
  { field: "extraKMS", headerName: "ExtraKMS", width: 130 },
  { field: "UptoHours", headerName: "ChTime", width: 130 },
  { field: "AKMS", headerName: "AllowKMS", width: 130 },
  { field: "ChKMS", headerName: "ChKMS", width: 130 },
  { field: "Bata", headerName: "Bata", width: 130 },
  { field: "NHalt", headerName: "NightHalt", width: 130 },
  // { field: "RateID", headerName: "RateID", width: 130 },
];

// const rows = [
//   {
//     id: 1,
//     VehicleType: 1,
//     Duty: 13,
//     Hours: "2023-06-08",
//     KMS: 11,
//     Rate: "7:00 PM",
//     PerHours: "7:00 PM",
//     PerKMS: "7:00 PM",
//     ExtraHours: "7:00 PM",
//     ExtraKMS: "7:00 PM",
//     ChTime: "7:00 PM",
//     AllowKMS: "7:00 PM",
//     ChKMS: "7:00 PM",
//     Bata: "7:00 PM",
//     NightHalt: "7:00 PM",
//     RateID: 1233,
//   },
//   {
//     id: 2,
//     VehicleType: 2,
//     Duty: 13,
//     Hours: "2023-06-08",
//     KMS: 11,
//     Rate: "7:00 PM",
//     PerHours: "7:00 PM",
//     PerKMS: "7:00 PM",
//     ExtraHours: "7:00 PM",
//     ExtraKMS: "7:00 PM",
//     ChTime: "7:00 PM",
//     AllowKMS: "7:00 PM",
//     ChKMS: "7:00 PM",
//     Bata: "7:00 PM",
//     NightHalt: "7:00 PM",
//     RateID: 1234,
//   },
// ];


const PackageRateEntery = () => {
  const [selectedCustomerData, setSelectedCustomerData] = useState({});
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [rows, setRows] = useState([]);
  const [actionName] = useState('');
  const [error, setError] = useState(false);

  // const convertToCSV = (data) => {
  //   const header = columns.map((column) => column.headerName).join(",");
  //   const rows = data.map((row) => columns.map((column) => row[column.field]).join(","));
  //   return [header, ...rows].join("\n");
  // };
  // const handleExcelDownload = () => {
  //   const csvData = convertToCSV(rows);
  //   const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
  //   saveAs(blob, "customer_details.csv");
  // };
  // const handlePdfDownload = () => {
  //   const pdf = new jsPDF();
  //   pdf.setFontSize(12);// Set the font size and font style
  //   pdf.setFont('helvetica', 'normal');
  //   pdf.text("Customer Details", 10, 10);// Add a title for the table
  //   const tableData = rows.map((row, index) => [index + 1, ...Object.values(row)]);
  //   pdf.autoTable({
  //     head: [['Sno', 'Customer ID', 'Name', 'Address', 'Phone', 'Active', 'Rate_Type', 'GST_NO', 'State', 'Driver_App']],
  //     body: tableData,
  //     startY: 20,
  //   }); // Create a table to display the data
  //   const pdfBlob = pdf.output('blob'); // Save the PDF to a Blob
  //   saveAs(pdfBlob, 'customer_details.pdf'); // Download the PDF
  // };

  const hidePopup = () => {
    setError(false);
  };
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000); // 3 seconds
      return () => clearTimeout(timer); // Clean up the timer on unmount
    }
  }, [error]);

  const [book, setBook] = useState({
    ratetype: '',
    pricetag: '',
    Validity: '',
    vehicleType: '',
    duty: '',
    Hours: '',
    KMS: '',
    Rate: '',
    PerHour: '',
    PerKMS: '',
    extraHours: '',
    extraKMS: '',
    UptoHours: '',
    AKMS: '',
    NHalt: '',
    Bata: '',
    ChKMS: '',
  });
  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;

    if (type === 'checkbox') {
      // For checkboxes, update the state based on the checked value
      setBook((prevBook) => ({
        ...prevBook,
        [name]: checked,
      }));
      setSelectedCustomerData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      // For other input fields, update the state based on the value
      setBook((prevBook) => ({
        ...prevBook,
        [name]: value,
      }));
      setSelectedCustomerData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleAutocompleteChange = (event, value, name) => {
    const selectedOption = value ? value.label : '';
    setBook((prevBook) => ({
      ...prevBook,
      [name]: selectedOption,
    }));
    setSelectedCustomerData((prevData) => ({
      ...prevData,
      [name]: selectedOption,
    }));
  };

  // const handleDateChange = (date) => {
  //   const startOfDay = dayjs(date).startOf('day').format();
  //   setBook((prevBook) => ({
  //     ...prevBook,
  //     date: startOfDay,
  //   }));
  // };
  const handleCancel = () => {
    setBook((prevBook) => ({
      ...prevBook,
      ratetype: '',
      pricetag: '',
      Validity: '',
      vehicleType: '',
      duty: '',
      Hours: '',
      KMS: '',
      Rate: '',
      PerHour: '',
      PerKMS: '',
      extraHours: '',
      extraKMS: '',
      UptoHours: '',
      AKMS: '',
      NHalt: '',
      Bata: '',
      ChKMS: '',
    }));
    setSelectedCustomerData({});
  };
  const handleRowClick = useCallback((params) => {
    console.log(params.row);
    const customerData = params.row;
    setSelectedCustomerData(customerData);
    setSelectedCustomerId(params.row.customerId);
  }, []);
  const handleClick = async (event, actionName, id) => {
    event.preventDefault();
    try {
      if (actionName === 'List') {
        console.log('List button clicked');
        const response = await axios.get('http://localhost:8081/ratemanagement');
        const data = response.data;
        setRows(data);
      } else if (actionName === 'Cancel') {
        console.log('Cancel button clicked');
        handleCancel();
      } else if (actionName === 'Delete') {
        console.log('Delete button clicked');
        await axios.delete(`http://localhost:8081/ratemanagement/${id}`);
        console.log('Customer deleted');
        setSelectedCustomerData(null);
        handleCancel();
      } else if (actionName === 'Edit') {
        console.log('Edit button clicked');
        const selectedCustomer = rows.find((row) => row.id === id);
        const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
        await axios.put(`http://localhost:8081/ratemanagement/${id}`, updatedCustomer);
        console.log('Customer updated');
        handleCancel();
      } else if (actionName === 'Add') {
        await axios.post('http://localhost:8081/ratemanagement', book);
        console.log(book);
        handleCancel();
      }
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };
  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  });

  return (
    <div className="PackageRateEntery-form">
      <form action="">
        <div className="PackageRateEntery-container-main">
          <div className="container-left">
            <div className="copy-title-btn">
              <div className="input-field">
                <div className="input" style={{ width: "300px" }}>
                  <div className="icone">
                    <TypeSpecimenOutlinedIcon color="action" />
                  </div>
                  {/* <Autocomplete
                    fullWidth
                    id="free-solo-demo"
                    freeSolo
                    size="small"
                    value={RateType.map((option) => option.optionvalue)}
                    options={RateType.map((option) => ({
                      label: option.Option
                    }))}
                    getOptionLabel={(option) => option.label || ""}
                    renderInput={(params) => (
                      <TextField {...params} name='ratetype' label="RateType" />
                    )}
                  /> */}
                  <Autocomplete
                    fullWidth
                    size="small"
                    id="free-solo-demo-ratetype"
                    freeSolo
                    onChange={(event, value) => handleAutocompleteChange(event, value, "ratetype")}
                    value={RateType.find((option) => option.optionvalue)?.label || ''}
                    options={RateType.map((option) => ({
                      label: option.Option,
                    }))}
                    getOptionLabel={(option) => option.label || ''}
                    renderInput={(params) => {
                      params.inputProps.value = selectedCustomerData?.ratetype || ''
                      return (
                        <TextField {...params} label="RateType" name="ratetype" inputRef={params.inputRef} />
                      )
                    }
                    }
                  />
                </div>
                <div className="input" style={{ width: "300px" }}>
                  <div className="icone">
                    <LocalOfferOutlinedIcon color="action" />
                  </div>
                  {/* <Autocomplete
                    fullWidth
                    id="free-solo-demo"
                    freeSolo
                    size="small"
                    value={PriceTag.map((option) => option.optionvalue)}
                    options={PriceTag.map((option) => ({
                      label: option.option,
                    }))}
                    getOptionLabel={(option) => option.label || ""}
                    renderInput={(params) => (
                      <TextField {...params} name='pricetag' label="PriceTag" />
                    )}
                  /> */}
                  <Autocomplete
                    fullWidth
                    size="small"
                    id="free-solo-demo-pricetag"
                    freeSolo
                    sx={{ width: "20ch" }}
                    onChange={(event, value) => handleAutocompleteChange(event, value, "pricetag")}
                    value={PriceTag.find((option) => option.optionvalue)?.label || ''}
                    options={PriceTag.map((option) => ({
                      label: option.option,
                    }))}
                    getOptionLabel={(option) => option.label || ''}
                    renderInput={(params) => {
                      params.inputProps.value = selectedCustomerData?.pricetag || ''
                      return (
                        <TextField {...params} label="PriceTag" name="pricetag" inputRef={params.inputRef} />
                      )
                    }
                    }
                  />
                </div>
                <div className="input">
                  <Button variant="contained">Show Rates</Button>
                </div>
              </div>
              <div className="input-field">
                <div className="input" style={{ width: "300px" }}>
                  <div className="icone">
                    <RateReviewIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="id"
                    sx={{ width: "300px" }}
                    label="Validity"
                    name="Validity"
                    autoComplete="new-password"
                    value={selectedCustomerData?.Validity || book.Validity}
                    onChange={handleChange}
                    variant="standard"
                  />
                </div>
                <div className="input" style={{ width: "300px" }}>
                  <div className="icone">
                    <CarCrashIcon color="action" />
                  </div>
                  {/* <Autocomplete
                    fullWidth
                    id="free-solo-demo"
                    freeSolo
                    size="small"
                    value={VehicleType.map((option) => option.optionvalue)}
                    options={VehicleType.map((option) => ({
                      label: option.option,
                    }))}
                    getOptionLabel={(option) => option.label || ""}
                    renderInput={(params) => (
                      <TextField {...params} name='vehicleType' label="VehicleType" />
                    )}
                  /> */}
                  <Autocomplete
                    fullWidth
                    size="small"
                    id="free-solo-demo-vehicleType"
                    freeSolo
                    sx={{ width: "20ch" }}
                    onChange={(event, value) => handleAutocompleteChange(event, value, "vehicleType")}
                    value={VehicleType.find((option) => option.optionvalue)?.label || ''}
                    options={VehicleType.map((option) => ({
                      label: option.option,
                    }))}
                    getOptionLabel={(option) => option.label || ''}
                    renderInput={(params) => {
                      params.inputProps.value = selectedCustomerData?.vehicleType || ''
                      return (
                        <TextField {...params} label="VehicleType" name="vehicleType" inputRef={params.inputRef} />
                      )
                    }
                    }
                  />
                </div>
                <div className="input">
                  <Button variant="outlined">Show All Date</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='PackageRateEntery-container-bottom'>
          <div className="input-field">
            <div className="input" style={{ width: "200px" }}>
              <div className="icone">
                <EngineeringIcon color="action" />
              </div>
              {/* <Autocomplete
                fullWidth
                id="free-solo-demo"
                freeSolo
                size="small"
                value={Duty.map((option) => option.optionvalue)}
                options={Duty.map((option) => ({
                  label: option.option,
                }))}
                getOptionLabel={(option) => option.label || ""}
                renderInput={(params) => (
                  <TextField {...params} name='duty' label="Duty" />
                )}
              /> */}
              <Autocomplete
                fullWidth
                size="small"
                id="free-solo-demo-duty"
                freeSolo
                sx={{ width: "20ch" }}
                onChange={(event, value) => handleAutocompleteChange(event, value, "duty")}
                value={Duty.find((option) => option.optionvalue)?.label || ''}
                options={Duty.map((option) => ({
                  label: option.option,
                }))}
                getOptionLabel={(option) => option.label || ''}
                renderInput={(params) => {
                  params.inputProps.value = selectedCustomerData?.duty || ''
                  return (
                    <TextField {...params} label="Duty" name="duty" inputRef={params.inputRef} />
                  )
                }
                }
              />
            </div>
            <div className="input" style={{ width: "100px" }}>
              <TextField
                type='number'
                size="small"
                id="id"
                label="Hours"
                name="Hours"
                autoComplete="new-password"
                value={selectedCustomerData?.Hours || book.Hours}
                onChange={handleChange}
              // variant="standard"
              />
            </div>
            <div className="input" style={{ width: "100px" }}>
              <TextField
                type='number'
                size="small"
                id="id"
                label="KMS"
                name="KMS"
                autoComplete="new-password"
                value={selectedCustomerData?.KMS || book.KMS}
                onChange={handleChange}
              />
            </div>
            <div className="input" style={{ width: "100px" }}>
              <TextField
                type='number'
                size="small"
                id="id"
                label="Rate"
                name="Rate"
                autoComplete="new-password"
                value={selectedCustomerData?.Rate || book.Rate}
                onChange={handleChange}
              />
            </div>
            <div className="input" style={{ width: "100px" }}>
              <TextField
                type='number'
                size="small"
                id="id"
                label="PerHour"
                name="PerHour"
                autoComplete="new-password"
                value={selectedCustomerData?.PerHour || book.PerHour}
                onChange={handleChange}
              />
            </div>
            <div className="input" style={{ width: "100px" }}>
              <TextField
                type='number'
                size="small"
                id="id"
                label="PerKMS"
                name="PerKMS"
                autoComplete="new-password"
                value={selectedCustomerData?.PerKMS || book.PerKMS}
                onChange={handleChange}
              />
            </div>
            <div className="input" style={{ width: "100px" }}>
              <TextField
                type='number'
                size="small"
                id="id"
                label="extraHours"
                name="extraHours"
                autoComplete="new-password"
                value={selectedCustomerData?.extraHours || book.extraHours}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="input-field">
            <div className="input" style={{ width: "100px" }}>
              <TextField
                type='number'
                size="small"
                id="id"
                label="extraKMS"
                name="extraKMS"
                autoComplete="new-password"
                value={selectedCustomerData?.extraKMS || book.extraKMS}
                onChange={handleChange}
              />
            </div>
            <div className="input" style={{ width: "100px" }}>
              <TextField
                type='number'
                size="small"
                id="id"
                label="UptoHours"
                name="UptoHours"
                autoComplete="new-password"
                value={selectedCustomerData?.UptoHours || book.UptoHours}
                onChange={handleChange}
              />
            </div>
            <div className="input" style={{ width: "100px" }}>
              <TextField
                type='number'
                size="small"
                id="id"
                label="A.KMS"
                name="AKMS"
                autoComplete="new-password"
                value={selectedCustomerData?.AKMS || book.AKMS}
                onChange={handleChange}
              />
            </div>
            <div className="input" style={{ width: "100px" }}>
              <TextField
                type='number'
                size="small"
                id="id"
                label="N.Halt"
                name="NHalt"
                autoComplete="new-password"
                value={selectedCustomerData?.NHalt || book.NHalt}
                onChange={handleChange}
              />
            </div>
            <div className="input" style={{ width: "100px" }}>
              <TextField
                type='number'
                size="small"
                id="id"
                label="Bata"
                name="Bata"
                autoComplete="new-password"
                value={selectedCustomerData?.Bata || book.Bata}
                onChange={handleChange}
              />
            </div>
            <div className="input" style={{ width: "100px" }}>
              <TextField
                type='number'
                size="small"
                id="id"
                label="ChKMS"
                name="ChKMS"
                autoComplete="new-password"
                value={selectedCustomerData?.ChKMS || book.ChKMS}
                onChange={handleChange}
              />
            </div>
            <div className="input" style={{ width: "100px" }}>
              <Button variant="contained">Save All</Button>
            </div>
          </div>
        </div>
        {error &&
          <div className='alert-popup Error' >
            <span className='cancel-btn' onClick={hidePopup}>x</span>
            <p>Something went wrong!</p>
          </div>
        }
        <Box sx={{ position: "relative", mt: 3, height: 320 }}>
          <StyledSpeedDial
            ariaLabel="SpeedDial playground example"
            icon={<SpeedDialIcon />}
            direction="left"
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={(event) => handleClick(event, action.name, selectedCustomerId)}
              />
            ))}
          </StyledSpeedDial>
        </Box>
        <div className="table-bookingCopy">
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              onRowClick={handleRowClick}
              pageSize={5}
              checkboxSelection
            />
          </div>

        </div>
      </form>
    </div>
  )
}

export default PackageRateEntery