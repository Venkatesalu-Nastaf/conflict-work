import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Button, FormControlLabel, Switch } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import "./DownLoadIcon.css"
import { FaFileDownload } from "react-icons/fa";

const DownLoadIcon = () => {


    const [opendownloadpopup, setOpendownloadpopup] = useState(false);

    const handledownloadpopupOpen = () => {
        setOpendownloadpopup(true);
    };

    const handledownloadpopupClose = () => {
        setOpendownloadpopup(false);
    };

    const handleDownloadPdf = () => {
        // Logic for downloading PDF
        console.log('Download PDF');
    };

    const handleDownloadExcel = () => {
        // Logic for downloading Excel
        console.log('Download Excel');
    };
    return (
        <>
            <div onClick={handledownloadpopupOpen}>
                <FaFileDownload />
            </div>
            <Dialog open={opendownloadpopup} onClose={handledownloadpopupClose}
                maxWidth="sm"  // Set maxWidth to "sm" to limit the width
                fullWidth={false}  // Ensure the modal does not take full width
                sx={{ padding: "10px" }} >
                <DialogTitle>
                    Realtime Vehicles Report
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={handledownloadpopupClose}
                        aria-label="close"
                        style={{ position: 'absolute', right: 8, top: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent className='dialog-content-download' >

                    <p>Select the data to be in included in the report.</p>
                    <div className='dialog-dowload-first'>
                        <div>
                            <div><FormControlLabel control={<Switch />} label="Driver" /></div>
                            <div><FormControlLabel control={<Switch />} label="Distance" /></div>
                            <div><FormControlLabel control={<Switch />} label="Speed" /></div>
                            <div><FormControlLabel control={<Switch />} label="Time" /></div>
                            <div><FormControlLabel control={<Switch />} label="Current Location" /></div>
                        </div>

                        <div>
                            <div><FormControlLabel control={<Switch />} label="Nearest Address" /></div>
                            <div><FormControlLabel control={<Switch />} label="Tags" /></div>
                            <div><FormControlLabel control={<Switch />} label="Job Details" /></div>
                            <div><FormControlLabel control={<Switch />} label="Transporter" /></div>
                        </div>

                    </div>
                    <p className='downloadicon-warning' >Select the data to be in included in the report.</p>

                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={handleDownloadPdf} className='Download-PDF-btn'>
                        Download PDF
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleDownloadExcel} className='Download-PDF-btn'>
                        Download Excel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}


export default DownLoadIcon;