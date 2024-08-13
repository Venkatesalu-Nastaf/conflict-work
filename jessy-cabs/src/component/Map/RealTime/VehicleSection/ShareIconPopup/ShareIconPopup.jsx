import React, { useState, useContext } from 'react';
import { styled } from '@mui/system';
import Dialog from '@mui/material/Dialog';
import Textarea from '@mui/joy/Textarea';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import DialogActions from '@mui/material/DialogActions';
import Switch from '@mui/material/Switch';
import { TextField } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { PermissionContext } from '../../../../context/permissionContext';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const label = { inputProps: { 'aria-label': 'Size switch demo' } };

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];


const ShareIconPopup = () => {

  const { openshare, setOpenshare } = useContext(PermissionContext);
  const [time, setTime] = useState('');

  const handleChangetime = (event) => {
    setTime(event.target.value);
  };


  //   const [openshare, setOpenshare] = React.useState(false);

  //   const handleClickOpenshare = () => {
  //     setOpenshare(true);
  //   };
  const handleCloseshare = () => {
    setOpenshare(false);
  };



  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };


  const [date, setDate] = React.useState('');

  const handleChangeDate = (event) => {
    setDate(event.target.value);
  };

  const [day, setDay] = React.useState('');

  const handleChangeDay = (event) => {
    setDay(event.target.value);
  };




  return (
    <>
      <React.Fragment>
        <BootstrapDialog
          onClose={handleCloseshare}
          aria-labelledby="customized-dialog-title"
          open={openshare}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Share Vehicle's Realtime Tracking
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleCloseshare}
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
            <div>
              <div>
                <label htmlFor="">Share Vehicle's Realtime Tracking*</label>
                <Textarea name="Outlined" placeholder="Type in here…" variant="outlined" />

              </div>
              <div>
                <label htmlFor="">Select one or more vehicles to share*</label>
                <div>
                  <FormControl sx={{ m: 1, width: "100%" }}>
                    <Select
                      id="demo-multiple-name"
                      multiple
                      value={personName}
                      onChange={handleChange}
                      MenuProps={MenuProps}
                    >
                      {names.map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getStyles(name, personName, theme)}
                        >
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div>
                <label htmlFor="">Start Time</label>

                <div>
                  <Box sx={{ minWidth: 320, margin: '20px' }}>
                    <TextField
                      label="Select Time"
                      type="time"
                      value={time}
                      onChange={handleChangetime}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                      fullWidth
                    />
                  </Box>
                </div>
              </div>


              <div>
                <label htmlFor="">Expire the share after</label>
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                    <label htmlFor="">Days</label>
                    <Box sx={{ minWidth: 60 }}>
                      <FormControl fullWidth>
                        <Select
                          id="demo-simple-select"
                          value={date}
                          onChange={handleChangeDate}
                          displayEmpty
                        >
                          <MenuItem value={10}>1</MenuItem>
                          <MenuItem value={20}>2</MenuItem>
                          <MenuItem value={30}>3</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </div>


                  <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                    <label htmlFor="">Hours</label>
                    <Box sx={{ minWidth: 60 }}>
                      <FormControl fullWidth>
                        <Select
                          id="demo-simple-select"
                          value={day}
                          onChange={handleChangeDay}
                          displayEmpty
                        >
                          <MenuItem value={10}>1</MenuItem>
                          <MenuItem value={20}>2</MenuItem>
                          <MenuItem value={30}>3</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </div>






                </div>
              </div>


              <div style={{ display: "flex", gap: "5px" }}>
                <Switch {...label} defaultChecked />
                <p>
                  Share Only Vehicle Details (Don't share location)</p>
              </div>

              <div style={{ display: "flex", gap: "5px" }}>
                <Switch {...label} />
                <p>
                  Show Map View Only</p>
              </div>
              <Button>Send Link to Contacts</Button>
            </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus style={{ border: "1px solid #1976d2" }}>
              Add
            </Button>
            <Button autoFocus onClick={handleCloseshare} style={{ color: "red", border: "1px solid red", }}>
              Cancel
            </Button>

          </DialogActions>
        </BootstrapDialog>
      </React.Fragment>
    </>)
}


export default ShareIconPopup
