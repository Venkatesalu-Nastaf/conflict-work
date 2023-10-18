import React, { useState, useEffect } from 'react';
import './BackUp.css';
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// FontAwesomeIcon Link
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";

// date
const today = dayjs();
const tomorrow = dayjs().add(1, "day");
const BackUp = () => {
    // LOADING
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulating a delay to showcase the loading spinner
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className="BackUp-form">
            <form action="">
                <div className="BackUp-header">
                    <div className="input-field">
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
                    </div>
                    <div className="loading-spinner-container">
                        {loading && <div className="loading-spinner"></div>}
                        {!loading && <div className="content">Data Downloaded!</div>}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default BackUp