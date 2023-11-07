import React, { useState, useEffect } from 'react';
import './BackUp.css';
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// FontAwesomeIcon Link
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase, faUpload } from "@fortawesome/free-solid-svg-icons";

// date
const today = dayjs();
const tomorrow = dayjs().add(1, "day");
const BackUp = () => {
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
    return (
        <div className="BackUp-form">
            <form action="">
                <div className="BackUp-header">
                    <div className="input-field" style={{ justifyContent: 'center', marginTop: '20px' }}>
                        <div className="input">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoItem label="Start Date">
                                    <DatePicker
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
                                        defaultValue={today}
                                        minDate={tomorrow}
                                        views={["year", "month", "day"]}
                                    />
                                </DemoItem>
                            </LocalizationProvider>
                        </div>
                        <div className="input" style={{ marginTop: '40px' }}>
                            <Button startIcon={<FontAwesomeIcon icon={faDatabase} size="lg" />} variant="contained">
                                Data BackUp
                            </Button>
                        </div>
                        <div className="input" style={{ marginTop: '40px' }}>
                            <Button startIcon={<FontAwesomeIcon icon={faUpload} size="lg" />} variant="contained">
                                Import Data
                            </Button>
                        </div>
                    </div>
                    <div className="loading-spinner-container">
                        {progress >= 100 ? (
                            <div className="content">Data Downloaded!</div>
                        ) : (
                            <Box sx={{ width: '85%', marginTop: '20%' }}>
                                <LinearProgressWithLabel variant="buffer" value={progress} valueBuffer={buffer} />
                            </Box>
                        )}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default BackUp