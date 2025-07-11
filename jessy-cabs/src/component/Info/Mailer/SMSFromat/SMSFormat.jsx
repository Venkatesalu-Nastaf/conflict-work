import React from 'react';
import './SMSFormat.css';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';

// FontAwesomeIcon Link
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

const SMSFormat = () => {
    return (
        <div className="SMSFormat-form">
            <form action="">
                <div className="SMSFormat-header">
                    <div className="input-field sms-input-field">
                        <div className="inputs sms-format-input">
                            <span className="Title-Name">Booking Confirmtion SMS</span>
                            <TextField
                                className='sms-box'
                                id="outlined-1"
                                multiline
                                sx={{ mt: 2, width: "53ch" }}
                                rows={4}
                                defaultValue="Greetings from JESSY CABS Booking confirmation for <GN>  Vehicle Type <VT> on <RD> @<RP>. by <RT> Booking No <BN> For Asst. Ph no.044 49105959"
                            />
                        </div>
                        <div className="inputs sms-format-input">
                            <span className="Title-Name">Booking Vehicle Confirm</span>
                            <TextField
                                className='sms-box'
                                id="outlined-static2"
                                multiline
                                sx={{ mt: 2, width: "53ch" }}
                                rows={4}
                                defaultValue="Reporting to <GN> Vehicle Details - <VT> Vehicle Number - <VR>, Driver Name-<DR> Mobile No <DM> Trip Date <RD> Reporting Time <RT> from JESSY CABS 044 49105959"
                            />
                        </div>
                    </div>
                    <div className="input-field sms-input-field">
                        <div className="inputs sms-format-input">
                            <span className="Title-Name">Booking Cancelled</span>
                            <TextField
                                className='sms-box'
                                id="outlined-static3"
                                multiline
                                sx={{ mt: 2, width: "53ch" }}
                                rows={4}
                                defaultValue=""
                            />
                        </div>
                        <div className="inputs sms-format-input">
                            <span className="Title-Name">Trip Sheet SMS</span>
                            <TextField
                                className='sms-box'
                                id="outlined-static4"
                                multiline
                                sx={{ mt: 2, width: "53ch" }}
                                rows={4}
                                defaultValue="Reporting to <GN> Vehicle Details - <VT> Vehicle Number - <VR>, Driver Name-<DR> Mobile No <DM> Trip Date <RD> Reporting Time <RT> from JESSY CABS 044 49105959"
                            />
                        </div>
                    </div>
                    <div className="input-field sms-input-field">
                        <div className="inputs sms-format-input">
                            <span className="Title-Name">Trip Sheet Driver</span>
                            <TextField
                                className='sms-box'
                                id="outlined-static5"
                                multiline
                                sx={{ mt: 2, width: "53ch" }}
                                rows={4}
                                defaultValue="Trip details from JESSY CABS Guest Name <GN> contact no <GM> T.S no <TN> Reporting Date:<RD>  Reporting Time <RT> Reporting Address <RA>"
                            />
                        </div>
                        <div className="inputs sms-format-input">
                            <span className="Title-Name">URL Trip Closing</span>
                            <TextField
                                className='sms-box'
                                id="outlined-static6"
                                multiline
                                sx={{ mt: 2, width: "53ch" }}
                                rows={4}
                                defaultValue="Please Click the linke to close E-Tripsheet"
                            />
                        </div>
                    </div>
                    <div className="input-field" style={{ marginTop: "20px" }}>
                        <div className="input">
                            <Button startIcon={<FontAwesomeIcon icon={faUpload} size="lg" />} variant="contained">
                                Update
                            </Button>
                        </div>
                    </div>
                    <div className="input-field full-width">
                        <div className="inputs sms-format-keyword-input">
                            <span className="Title-Name">Key-Words</span>
                            <TextField
                                className='sms-box'

                                fullWidth
                                id="outlined-7"
                                multiline
                                sx={{ mt: 1, width: "100%" }}
                                rows={4}
                                defaultValue="<VR>-VEHICLE REGNO, <VN>-VEHICLE NO, <DC>-DRIVER CELL, <CN>-COMPANY NAME, <CL>-COMAPNY CELL, <GN>-GUEST NAME,<VT>-VEHICLE, <DM>-DRIVER MOBILE, <DN>-DRIVER NAME, <GN>-GUST NAME, <CM>-COMPANY MOBILE,<BN>-BOOKING NO, <RD>-REPORT DATE, <RT>-REPORT TIME, <RP>-REPORTING PLACE"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SMSFormat