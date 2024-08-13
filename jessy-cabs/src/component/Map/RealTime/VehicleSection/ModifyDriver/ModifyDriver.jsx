import React, { useState, useContext } from 'react';
import { styled } from '@mui/system';
import { MenuItem } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from '@mui/material/InputLabel';
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { PermissionContext } from '../../../../context/permissionContext';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const ModifyDriver = () => {
  const { openDriverModify, setOpenDriverModify } = useContext(PermissionContext);

  // const [openDriverModify, setOpenDriverModify] = React.useState(false);

  // const handleClickOpenDriverModify = () => {
  //   setOpenDriverModify(true);
  // };
  const handleCloseDriverModify = () => {
    setOpenDriverModify(false);
  };

  const [changeDriverName, setChangeDriverName] = useState('');

  const handleChangeDriverName = (event) => {
    setChangeDriverName(event.target.value);
  };


  const [selectedDateDriverAssign, setSelectedDateDriverAssign] = useState(null);

  const handleDateChangeDriverAssign = (newValue) => {
    setSelectedDateDriverAssign(newValue);
  };



  const [newDrivercreation, setNewDrivercreation] = React.useState(false);

  const handleDrivercreation = () => {
    setNewDrivercreation(true);
    setOpenDriverModify(false);

  };
  const handleCloseDrivercreation = () => {
    setNewDrivercreation(false);
  };


  const [newDriverSelect, setNnewDriverSelect] = useState('');

  const handleNewDriverSelect = (event) => {
    setNnewDriverSelect(event.target.value);
  };



  return (
    <>
      {/* modify driver edit icon */}
      <React.Fragment>

        <BootstrapDialog
          onClose={handleCloseDriverModify}
          aria-labelledby="customized-dialog-title"
          open={openDriverModify}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Modify Driver
          </DialogTitle>
          {/* <p> Add, Edit and Delete Driver</p> */}



          <IconButton
            aria-label="close"
            onClick={handleCloseDriverModify}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Typography gutterBottom>
              <>
                <div style={{ padding: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                    <p style={{ width: "150px" }}>vehicle:</p>
                    <p style={{ fontWeight: "700", fontSize: "15px" }}>3125 (KA01AN3125)</p>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", borderBottom: "1px solid #ccc" }}>
                    <p style={{ width: "150px" }}>Drivers Name:</p>
                    <p style={{ fontWeight: "700", fontSize: "15px" }}>SAGAYARAJ
                    </p>
                  </div>


                  <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                    <p style={{ width: "150px" }}>Change Driver:</p>
                    <Box sx={{ m: 1, minWidth: 320 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Option</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={changeDriverName}
                          label="Option"
                          onChange={handleChangeDriverName}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </div>


                  <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                    <p style={{ width: "150px" }}>Assigned From:</p>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Box sx={{ m: 1, minWidth: 300 }}>
                        <DatePicker
                          label="Select Date"
                          value={selectedDateDriverAssign}
                          onChange={handleDateChangeDriverAssign}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </Box>
                    </LocalizationProvider>
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <p style={{ color: "#0078d4" }} onClick={handleDrivercreation}>Add New Driver</p>
                  </div>

                </div>
              </>
            </Typography>

          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleCloseDriverModify} style={{ backgroundColor: "#0078d4", color: "#fff", borderRadius: "8px", border: "1px solid #0078d4", fontWeight: "600" }}>
              Update driver
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </React.Fragment>


      {/*new driver modal  */}
      <React.Fragment>

        <BootstrapDialog
          onClose={handleCloseDrivercreation}
          aria-labelledby="customized-dialog-title"
          open={newDrivercreation}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Modify Drivers
          </DialogTitle>



          <IconButton
            aria-label="close"
            onClick={handleCloseDrivercreation}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Typography gutterBottom>
              <>
                <div style={{ padding: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                    <p style={{ width: "150px" }}>vehicle:</p>
                    <p style={{ fontWeight: "700", fontSize: "15px" }}>3125 (KA01AN3125)</p>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                    <p style={{ width: "150px" }}>First Name:</p>
                    <Box sx={{ m: 1, minWidth: 300 }}>
                      <TextField
                        id="simple-input"
                        variant="outlined"
                        // value={value}
                        // onChange={handleChange}
                        fullWidth
                        placeholder="Enter Your First Name"
                      />
                    </Box>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                    <p style={{ width: "150px" }}>Last Name:</p>
                    <Box sx={{ m: 1, minWidth: 300 }}>
                      <TextField
                        id="simple-input"
                        variant="outlined"
                        // value={value}
                        // onChange={handleChange}
                        fullWidth
                        placeholder="Enter Your Name"
                      />
                    </Box>
                  </div>


                  <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                    <p style={{ width: "150px" }}>Mobile Number:</p>
                    <Box sx={{ m: 1, minWidth: 300 }}>
                      <TextField
                        id="simple-input"
                        variant="outlined"
                        // value={value}
                        // onChange={handleChange}
                        fullWidth
                        placeholder="Enter Mobile Number"
                      />
                    </Box>
                  </div>


                  <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                    <p style={{ width: "150px" }}>Group:</p>
                    <Box sx={{ m: 1, minWidth: 300 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Option</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={newDriverSelect}
                          label="Option"
                          onChange={handleNewDriverSelect}
                        >

                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </div>



                </div>
              </>
            </Typography>

          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleCloseDriverModify} style={{ backgroundColor: "#0078d4", color: "#fff", borderRadius: "8px", border: "1px solid #0078d4", fontWeight: "600" }}>
              Create and Save
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </React.Fragment>

    </>)
}


export default ModifyDriver;