import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Autocomplete, TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // You can use another date adapter if needed
import Button from "@mui/material/Button";
import "./ServiceHistory.css"
import { FaUpload } from "react-icons/fa6";
import { CiFilter } from "react-icons/ci";
import { IoDownloadOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import Overall from "./Overall/Overall";
import PendingServiceHistory from "./PendingServiceHistory/PendingServiceHistory";


const options = [
    { label: "Option 1", value: 1 },
    { label: "Option 2", value: 2 },
    { label: "Option 3", value: 3 },
    { label: "Option 4", value: 4 },
];
const ServiceHistory = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [selectedOption, setSelectedOption] = useState(null);

    const [selectedDate, setSelectedDate] = useState(null);


    return (
        <>
            <div className='service-total-history'>



                <div className='service-history-btns'>
                    <div>
                        <Autocomplete
                            value={selectedOption}
                            onChange={(event, newValue) => {
                                setSelectedOption(newValue);
                            }}
                            options={options}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Search..."  // No label, just placeholder
                                    variant="outlined"
                                    sx={{ minWidth: 200 }} // Set minimum width to 200px
                                />
                            )}
                        />
                    </div>

                    <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                value={selectedDate}
                                onChange={(newValue) => setSelectedDate(newValue)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder="Select date" // No label, only placeholder
                                        variant="outlined"
                                        sx={{ minWidth: 200 }} // Set minimum width to 200px
                                    />
                                )}
                            />
                        </LocalizationProvider>
                    </div>

                    <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                value={selectedDate}
                                onChange={(newValue) => setSelectedDate(newValue)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder="Select date" // No label, only placeholder
                                        variant="outlined"
                                        sx={{ minWidth: 200 }} // Set minimum width to 200px
                                    />
                                )}
                            />
                        </LocalizationProvider>
                    </div>




                    <div>
                        <Button variant='contained' ><CiFilter className='btn-icon' /> Filter</Button>
                    </div>
                    <div>
                        <Button variant='outlined'><FaUpload className='btn-icon' /></Button>
                    </div>
                    <div>
                        <Button variant='contained'><IoDownloadOutline className='btn-icon' /> Report</Button>
                    </div>
                    <div>
                        <Button variant='contained'><FaPlus className='btn-icon' /> Add service</Button>
                    </div>


                </div>


                <div style={{width:"100%"}}>

                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="Overall" value="1" />
                                    <Tab label="Pending with me" value="2" />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <>
                                    <Overall />
                                </>
                            </TabPanel>
                            <TabPanel value="2">
                                <>
                                    <PendingServiceHistory />
                                </>
                            </TabPanel>
                        </TabContext>
                    </Box>
                </div>
            </div>
        </>
    )
}
export default ServiceHistory;
