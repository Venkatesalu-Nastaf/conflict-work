import React, { useState, useContext } from 'react';
import { Drawer, IconButton, Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { PermissionContext } from "../../../context/permissionContext";
import EtripSheetImages from './EtripSheetImages/EtripSheetImages';
import EtripSheetMap from './EtripSheetMap/EtripSheetMap';
import EtripSheetSignature from './EtripSheetSignature/EtripSheetSignature';
import "./OverviewDrawer.css"
import { CiNoWaitingSign } from "react-icons/ci";
import EtripSheetTable from './EtripSheetTable/EtripSheetTable';

import { MdOutlineCalendarMonth } from "react-icons/md";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { SiStatuspal } from "react-icons/si";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { GiMatterStates } from "react-icons/gi";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Button from "@mui/material/Button";



const OverviewDrawer = () => {
  const { isDrawerOpen, setIsDrawerOpen } = useContext(PermissionContext)


  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const [showCards, SetShowCards] = useState(false);
  const handleShowCards = () => {
    SetShowCards(!showCards);
  }
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  return (
    <>
      <div>
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={closeDrawer}
          PaperProps={{
            sx: { width: '100%' }, // Full width
          }}
        >
          {/* Drawer content */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
            <Typography variant="h6">Overview</Typography>
            {/* Close button */}
            <IconButton onClick={closeDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>

          <div className='input-field' style={{ padding: '20px' }}>

            <div className="input">
              <div className="icone">
                <MdOutlineCalendarMonth color="action" />
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker", "DatePicker"]}>
                  <DatePicker
                    label="From Date"
                    format="DD/MM/YYYY"
                  // value={fromDate}
                  // onChange={(date) => setFromDate(date)}
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
                  // value={toDate}
                  // onChange={(date) => setToDate(date)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>

            <div className="input">
              <div className="icone">
                <SiStatuspal color="action" />
              </div>

              <Autocomplete
                fullWidth
                id="Status"
                freeSolo
                size="small"
                // value={statusvalue}
                // options={Status.map((option) => ({
                //   label: option.option,
                // }))}
                // onChange={(event, value) => handlestatusChange(event, value)}
                renderInput={(params) => {
                  return (
                    <TextField {...params} label="Status" inputRef={params.inputRef} />
                  );
                }}
              />
            </div>

            <div className="input">
              <div className="icone">
                <GiMatterStates color="action" />
              </div>
              <Autocomplete
                fullWidth
                id="Status"
                freeSolo
                size="small"
                // value={statusvalue}
                // options={Status.map((option) => ({
                //   label: option.option,
                // }))}
                // onChange={(event, value) => handlestatusChange(event, value)}
                renderInput={(params) => {
                  return (
                    <TextField {...params} label="Department" inputRef={params.inputRef} />
                  );
                }}
              />

            </div>

            <div className="input">
              <div className="icone">
                <GiMatterStates color="action" />
              </div>
              <Autocomplete
                fullWidth
                id="Status"
                freeSolo
                size="small"
                // value={statusvalue}
                // options={Status.map((option) => ({
                //   label: option.option,
                // }))}
                // onChange={(event, value) => handlestatusChange(event, value)}
                renderInput={(params) => {
                  return (
                    <TextField {...params} label="Customer" inputRef={params.inputRef} />
                  );
                }}
              />

            </div>

            <div className="input">
              <div className="icone">
                <GiMatterStates color="action" />
              </div>
              <Autocomplete
                fullWidth
                id="vehicleNo"
                freeSolo
                size="small"
                // value={VehNo}
                // options={vehicleNo?.map((option) => ({
                //   label: option.vehRegNo,
                // }))}
                // onChange={(event, value) => handleVechicleNoChange(event, value)}
                renderInput={(params) => {
                  return (
                    <TextField {...params} label="Vehicle No" inputRef={params.inputRef} />
                  );
                }}
              />
            </div>

            <div className='show-all-button'>
              <div className="input" >
                <Button variant="outlined" >Show</Button>
              </div>
              <div className="input">
                <Button className='text-nowrap' variant="contained" style={{ whiteSpace: 'nowrap' }}>Show All</Button>
              </div>
            </div>

          </div>

          <Box sx={{ padding: '16px' }}>
            {/* <Typography variant="body1">This is the content inside the full-page drawer.</Typography> */}
            <p onClick={handleShowCards}>Show Cards</p>
            {showCards ?
              <div className='top-cards'>
                <EtripSheetSignature />
                <EtripSheetMap />
                <EtripSheetImages />
              </div>
              :
              <div className='top-cards-hidden'>
                <CiNoWaitingSign />
                <p style={{ margin: '0px' }}>No data to show</p>
              </div>
            }
            <EtripSheetTable />
          </Box>
        </Drawer>
      </div>
    </>
  )
}
export default OverviewDrawer;
