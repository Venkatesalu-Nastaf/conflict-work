import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ServiceRemainder from "./ServiceRemainder/ServiceRemainder"
import FuelLog from "./FuelLog/FuelLog"
import ServiceHistory from "./ServiceHistory/ServiceHistory"
import RenewalReminders from "./RenewalReminders/RenewalReminders"

const RemainderAndRecord = () => {
    // fortab
    const [remaindertabs, SetRemaindertabs] = React.useState('1');

    const handleRemaindertabs = (event, newValue) => {
        SetRemaindertabs(newValue);
    };
    return (
        <>
            <div>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={remaindertabs}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleRemaindertabs} aria-label="lab API tabs example">
                                <Tab label="Service Reminders" value="1" />
                                <Tab label="Renewal Reminders" value="2" />
                                <Tab label="Service History" value="3" />
                                <Tab label="Fuel Log" value="4" />

                            </TabList>
                        </Box>
                        <TabPanel value="1" >
                            <>
                                <ServiceRemainder />
                            </>
                        </TabPanel>
                        <TabPanel value="2" >
                            <>
                                <RenewalReminders />

                            </>
                        </TabPanel>
                        <TabPanel value="3" >
                            <>
                                <ServiceHistory />

                            </>
                        </TabPanel>

                        <TabPanel value="4" >
                            <>
                                <FuelLog />
                            </>
                        </TabPanel>

                    </TabContext>
                </Box>
            </div>
        </>
    )
}

export default RemainderAndRecord;
