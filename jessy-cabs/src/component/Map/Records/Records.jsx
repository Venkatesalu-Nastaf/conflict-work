import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ServiceHistory from "./ServiceHistory/ServiceHistory";
import FuelLog from "./FuelLog/FuelLog";

export const Records = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <div className="form-container-realtime">
                <div className="main-content-container">
                    {/* <div className='main-content-form'> */}

                        <Box sx={{ width: '100%', typography: 'body1' }}>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                        <Tab label="Service History" value="1" />
                                        <Tab label="Fuel Log" value="2" />
                                        {/* <Tab label="Item Three" value="3" /> */}
                                    </TabList>
                                </Box>
                                <TabPanel value="1">
                                    <>
                            <ServiceHistory/>
                                    </>
                                </TabPanel>
                                <TabPanel value="2">
                                    <><FuelLog /></>
                                </TabPanel>
                                {/* <TabPanel value="3">Item Three</TabPanel> */}
                            </TabContext>
                        </Box>
                    {/* </div> */}
                </div>
            </div>
        </>
    )
}
