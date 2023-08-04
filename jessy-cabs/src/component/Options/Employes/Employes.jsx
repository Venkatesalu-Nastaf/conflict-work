import React, { useEffect } from 'react';
import './Employes.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Employe from './Employe/Employe';

const Employes = () => {
    const [value, setValue] = React.useState("employes");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        AOS.init({
          offset: 200, // Offset (in pixels) from the original trigger point
          duration: 600, // Animation duration (in milliseconds)
          easing: 'ease-in-out', // Easing function for animations
        });
      }, [])
    return (
        <div className="form-container-Emplyes">
            <div className="container-main">
                <div data-aos="fade-in">

                    <Box sx={{ width: "100%", typography: "body1" }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="Employes" value="employes" />
                                </TabList>
                            </Box>
                            <TabPanel value="employes"><Employe /></TabPanel>
                        </TabContext>
                    </Box>
                </div>
            </div>
        </div >
    )
}

export default Employes