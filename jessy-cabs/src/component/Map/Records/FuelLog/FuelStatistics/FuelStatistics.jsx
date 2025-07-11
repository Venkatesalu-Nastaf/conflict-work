import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { ApproveTable } from './ApproveTable/ApproveTable';
import { OverallTable } from './OverallTable/OverallTable';
import { PendingmeTable } from './PendingmeTable/PendingmeTable';

const FuelStatistics = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <div style={{ width: "100%" }}>

                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Overall" value="1" />
                                <Tab label="Pending with me" value="2" />
                                <Tab label="Approve By Me" value="3" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <>
                                <ApproveTable />
                            </>
                        </TabPanel>
                        <TabPanel value="2">
                            <>
                                <OverallTable />
                            </>
                        </TabPanel>

                        <TabPanel value="3">
                            <>
                                <PendingmeTable />
                            </>
                        </TabPanel>
                    </TabContext>
                </Box>
            </div>
        </>
    )
}
export default FuelStatistics;
