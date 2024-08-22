import React, { useState, useContext } from 'react'
import { MenuItem } from '@mui/material';
import { TextField } from "@mui/material";
import DialogActions from '@mui/material/DialogActions';
import Button from "@mui/material/Button";
import { styled } from '@mui/system';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { PermissionContext } from "../../../../context/permissionContext";
import "./MessageIconPopup.css"

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const MessageIconPopup = () => {


  const handleCloseMessage = () => {
    setOpenmessage(false);
  };



  const [messageComment, setMessageComment] = useState('');

  const handleChangemessageComment = (event) => {
    setMessageComment(event.target.value);
  };


  const [textarea, setTextarea] = useState('');

  const handleChangetextare = (event) => {
    setTextarea(event.target.value);
  };


  const [time, setTime] = useState('');

  const handleChangetime = (event) => {
    setTime(event.target.value);
  };



  const { openmessage, setOpenmessage } = useContext(PermissionContext);


  return (
    <>
      {/* message icon popup*/}
      <React.Fragment>
        <BootstrapDialog
          onClose={handleCloseMessage}
          aria-labelledby="customized-dialog-title"
          open={openmessage}
          sx={{
            '& .MuiDialog-paper': {
              width: '30%', // Default width
              maxWidth: '600px', // Maximum width for larger screens
              '@media (max-width: 993px)': {
                width: '65%', // Width for mobile screens
              },
            },
          }}

        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Add Comments</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleCloseMessage}
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
              <label htmlFor="" className='message-icon-label'>Comments</label>
              <Box sx={{ Width: "100%", }}>
                <FormControl fullWidth variant="outlined">
                  <Select
                    id="demo-simple-select"
                    value={messageComment}
                    onChange={handleChangemessageComment}
                    displayEmpty
                    renderValue={messageComment !== "" ? undefined : () => "Select the comment "}
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.23)',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.87)',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.87)',
                      },
                    }}
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


            <div>
              <label htmlFor="" className='message-icon-label'>Details</label>

              <Box sx={{ Width: "100%" }}>
                <TextField
                  label="Your Text"
                  placeholder="Enter your text here..."
                  multiline
                  rows={4}
                  variant="outlined"
                  value={textarea}
                  onChange={handleChangetextare}
                  fullWidth
                />
              </Box>
            </div>

            <div>
              <label htmlFor="" className='message-icon-label'>start Time</label>

              <Box sx={{ Width: "100%" }}>
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

            <div>
              <label htmlFor="" className='message-icon-label'>End Time</label>

              <Box sx={{ Width: "100%" }}>
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
          </DialogContent>
          <DialogActions>
            <Button autoFocus className='add-btn-message'>
              Add
            </Button>
            <Button autoFocus onClick={handleCloseMessage} className='cancel-btn-message'>
              Cancel
            </Button>

          </DialogActions>
        </BootstrapDialog>
      </React.Fragment>
    </>
  )
}

export default MessageIconPopup;
