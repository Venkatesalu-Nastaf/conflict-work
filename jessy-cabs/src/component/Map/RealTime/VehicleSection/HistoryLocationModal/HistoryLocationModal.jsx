import React, { useState, useContext } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { Slide } from '@mui/material';
import DialogContentText from '@mui/material/DialogContentText';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MenuItem } from '@mui/material';
import { TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { PermissionContext } from '../../../../context/permissionContext';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const optionshistoryLocation = [
  'Option 1',
  'Option 2',
  'Option 3',
  'Option 4',
  'Option 5',
];



const HistoryLocationModal = () => {
  const { historyLocation, setHistoryLocation } = useContext(PermissionContext);

  // const [historyLocation, setHistoryLocation] = React.useState(false);


  const handleClosehistoryLocation = () => {
    setHistoryLocation(false);
  };


  const [selecthistoryLocation, setSelecthistoryLocation] = useState('');

  const handleChangeselecthistoryLocation = (event) => {
    setSelecthistoryLocation(event.target.value);
  };


  const [selectedDatehistoryLocation, setSelectedDatehistoryLocation] = useState(null);

  const handleDateChangehistoryLocation = (newDate) => {
    setSelectedDatehistoryLocation(newDate);
  };


  return (
    <>
      <React.Fragment>

        <Dialog
          open={historyLocation}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClosehistoryLocation}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{
            '.MuiDialog-container': {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
          }}
        >
          <DialogTitle sx={{ m: 0, p: 2 }}>
            Historical Vehicle Location
            <p style={{ fontSize: "15px", fontWeight: "300", color: "rgb(134 134 134)", marginTop: "3px", }}>View the location and status of any vehicle at any time.</p>
            <IconButton
              aria-label="close"
              onClick={handleClosehistoryLocation}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <>
                <div style={{ borderTop: "1px solid #ccc" }}>
                  <div style={{ display: "flex", gap: "5px", padding: "20px", alignItems: "center" }}>

                    <FormControl sx={{ m: 1, width: 300 }}>
                      <Select
                        value={selecthistoryLocation}
                        onChange={handleChangeselecthistoryLocation}
                        displayEmpty
                        input={<OutlinedInput />}
                        renderValue={(selected) => {
                          if (selected.length === 0) {
                            return <em>Select an option</em>;
                          }
                          return selected;
                        }}
                      >
                        <MenuItem disabled value="">
                          <em>Select an option</em>
                        </MenuItem>
                        {optionshistoryLocation.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        value={selectedDatehistoryLocation}
                        onChange={handleDateChangehistoryLocation}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
              </>
            </DialogContentText>
          </DialogContent>

        </Dialog>
      </React.Fragment>
    </>
  )
}


export default HistoryLocationModal;