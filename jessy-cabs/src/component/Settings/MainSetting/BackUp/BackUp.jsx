import React, { useState, useEffect,useContext } from 'react';
import './BackUp.css';
import dayjs from "dayjs";
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";


// FontAwesomeIcon Link
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase, faDownload, faUpload } from "@fortawesome/free-solid-svg-icons";

import ClearIcon from '@mui/icons-material/Clear';
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import { PermissionContext } from '../../../context/permissionContext';

// date
const today = dayjs();
const tomorrow = dayjs().add(1, "day");
const BackUp = () => {
    const [info, setInfo] = useState(false);
    const [error, setError] = useState(false);
    const [warning, setWarning] = useState(false);
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [errorMessage] = useState({});
    const [warningMessage] = useState({});
    const [infoMessage] = useState({});

    const { permissions } = useContext(PermissionContext)
    const MainSetting_modify = permissions[16]?.modify;

    //for popup
    const hidePopup = () => {
        setSuccess(false);
        setError(false);
        setInfo(false);
        setWarning(false);
    };
    useEffect(() => {
        if (error || success || warning || info) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error, success, warning, info]);


    // LOADING
    function LinearProgressWithLabel(props) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress variant="determinate" {...props} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2" color="text.secondary">{`${Math.round(
                        props.value,
                    )}%`}</Typography>
                </Box>
            </Box>
        );
    }
    const [progress, setProgress] = useState(10);
    const [buffer, setBuffer] = useState(10);

    useEffect(() => {
        const progressRef = () => {
            if (progress >= 100) {
                clearInterval(timer);
            } else {
                const diff = Math.random() * 10;
                const diff2 = Math.random() * 10;
                setProgress((prevProgress) => {
                    const newProgress = prevProgress + diff;
                    return newProgress >= 100 ? 100 : newProgress;
                });
                setBuffer((prevBuffer) => prevBuffer + diff + diff2);

            }
        };

        const timer = setInterval(progressRef, 500);

        return () => {
            clearInterval(timer);
        };
    }, [progress]);
    const DownloadSuccess = () => {
        setSuccess(true);
        setSuccessMessage("Data Downloaded!");
    }
    return (
        <div className="BackUp-form">
            <form action="">
                <div className='main-content-form'>
                    <div className="BackUp-header">
                        <div className="input-field backup-inputs">
                            <div className="input">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoItem label="Start Date">
                                        <DatePicker
                                            id="start_date"
                                            format="DD/MM/YYYY"
                                            defaultValue={today}
                                            minDate={tomorrow}
                                            views={["year", "month", "day"]}
                                        />
                                    </DemoItem>
                                </LocalizationProvider>
                            </div>
                            <div className="input">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoItem label="END Date">
                                        <DatePicker
                                            id="end_date"
                                            format="DD/MM/YYYY"
                                            defaultValue={today}
                                            minDate={tomorrow}
                                            views={["year", "month", "day"]}
                                        />
                                    </DemoItem>
                                </LocalizationProvider>
                            </div>
                            <div className="input back-up-btns">
                                <Button  disabled={!MainSetting_modify} startIcon={<FontAwesomeIcon icon={faDatabase} size="lg" />} variant="contained">
                                    Data BackUp
                                </Button>
                            </div>
                            <div className="input back-up-btns">
                                <Button   disabled={!MainSetting_modify} startIcon={<FontAwesomeIcon icon={faUpload} size="lg" />} variant="contained">
                                    Import Data
                                </Button>
                            </div>
                        </div>
                        <div className="loading-spinner-container">
                            {progress >= 100 ? (
                                <div className="content">
                                    <div className="input-field">
                                        <div className="input back-up-btns">
                                            <Button onClick={DownloadSuccess} startIcon={<FontAwesomeIcon icon={faDownload} size="lg" />} variant="contained">
                                                Download
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Box sx={{ width: '85%', marginTop: '20%', marginBottom: '20%' }}>
                                    <LinearProgressWithLabel variant="buffer" value={progress} valueBuffer={buffer} />
                                </Box>
                            )}
                        </div>
                    </div>
                </div>

            </form>
            <div className='alert-popup-main'>
                {error &&
                    <div className='alert-popup Error' >
                        <div className="popup-icon"> <ClearIcon /> </div>
                        <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
                        <p>{errorMessage}</p>
                    </div>
                }
                {info &&
                    <div className='alert-popup Info' >
                        <div className="popup-icon"> <BsInfo /> </div>
                        <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
                        <p>{infoMessage}</p>
                    </div>
                }
                {warning &&
                    <div className='alert-popup Warning' >
                        <div className="popup-icon"> <ErrorOutlineIcon /> </div>
                        <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
                        <p>{warningMessage}</p>
                    </div>
                }
                {success &&
                    <div className='alert-popup Success' >
                        <div className="popup-icon"> <FileDownloadDoneIcon /> </div>
                        <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
                        <p>{successMessage}</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default BackUp