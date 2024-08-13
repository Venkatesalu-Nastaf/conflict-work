import React, { useState, useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import TabList from '@mui/lab/TabList';
import { FaShare } from "react-icons/fa";
import { Drawer } from '@mui/material';
import { MenuItem } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { MdChangeHistory } from "react-icons/md";
import { GoHistory } from "react-icons/go";
import { FaCarOn } from "react-icons/fa6";
import TabContext from '@mui/lab/TabContext';
import { TextField } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { PermissionContext } from '../../../../context/permissionContext';

const VehicleInformationDrawer = () => {

    //vehicle section drawer
    const { open, setOpen } = useContext(PermissionContext);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(open);
    };

    const [dropdowndrawer, setDropdowndrawer] = React.useState('');

    const handleChangedropdowndrawer = (event) => {
        setDropdowndrawer(event.target.value);
    };


    const [valuetabs, setValuetabs] = React.useState('1');

    const handleChangetabs = (event, newValue) => {
        setValuetabs(newValue);
    };



    const [searchTermdirection, setSearchTermdirection] = useState('');

    const handleSearchChangedirection = (event) => {
        setSearchTermdirection(event.target.value);
    };


    const [selectedOptionnearby, setSelectedOptionnearby] = useState('');

    const handleSelectChangenearby = (event) => {
        setSelectedOptionnearby(event.target.value);
    };

    const [number, setNumber] = useState('');

    const handleNumberChange = (event) => {
        setNumber(event.target.value);
    };




    return (
        <>
            <div>
                <Drawer
                    anchor="left"
                    open={open}
                    onClose={toggleDrawer(false)}
                    PaperProps={{
                        sx: {
                            width: '100%',
                            height: '100%',
                        },
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                            <IconButton onClick={toggleDrawer(false)}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                        <Box sx={{ flexGrow: 1, p: 2 }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div>
                                    <p>Latest - 1060 (TN09DH1060)
                                    </p>
                                </div>
                                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                    <div>
                                        <FormControl sx={{ m: 1, minWidth: 180 }}>
                                            <Select
                                                id="demo-simple-select-autowidth"
                                                value={dropdowndrawer}
                                                onChange={handleChangedropdowndrawer}
                                                autoWidth
                                                displayEmpty
                                            >

                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={21}>Twenty one</MenuItem>
                                                <MenuItem value={22}>Twenty one and a half</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>

                                    <div style={{ border: "1px solid #ccc", display: "flex", gap: "3px", alignItems: "center", padding: "10px 20px", height: "11px", borderRadius: "8px" }}>
                                        <MdChangeHistory />
                                        <p style={{ margin: "0px" }}>History</p>
                                    </div>

                                    <div style={{ border: "1px solid #ccc", display: "flex", gap: "5px", alignItems: "center", padding: "10px 20px", height: "11px", borderRadius: "8px" }}>
                                        <GoHistory />
                                        <p style={{ margin: "0px" }}>History Location</p>
                                    </div>

                                    <div style={{ border: "1px solid #ccc", display: "flex", gap: "5px", alignItems: "center", padding: "10px 20px", height: "11px", borderRadius: "8px" }}>
                                        <FaCarOn />
                                        <p style={{ margin: "0px" }}>Details</p>
                                    </div>

                                    <div style={{ border: "1px solid #ccc", display: "flex", gap: "5px", alignItems: "center", backgroundColor: "#0078d4", color: "white", borderRadius: "8px", padding: "10px 20px", height: "11px" }}>
                                        <FaShare />

                                        <p style={{ margin: "0px" }}>Share Realtime Tracking </p>
                                    </div>

                                </div>
                            </div>


                            <div style={{ display: "flex" }}>

                                <div>
                                    <Box sx={{ width: '100%', typography: 'body1' }}>
                                        <TabContext value={valuetabs}>
                                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                <TabList onChange={handleChangetabs} aria-label="lab API tabs example">
                                                    <Tab label="Overview" value="1" />
                                                    <Tab label="Speed Graph" value="2" />
                                                    <Tab label="Directions" value="3" />
                                                    <Tab label="Near By" value="4" />
                                                </TabList>
                                            </Box>
                                            <TabPanel value="1" >
                                                <div style={{ border: "1px solid #ccc", padding: "20px" }}>


                                                    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                                                        <span style={{ width: "140px", display: "flex", gap: "10px", justifyContent: "space-between" }}>
                                                            <p>Parked</p>
                                                            <p>:</p>
                                                        </span>
                                                        <p style={{ color: 'green' }}>Speed 13km/h</p>

                                                    </div>
                                                    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                                                        <span style={{ width: "140px", display: "flex", gap: "10px", justifyContent: "space-between" }}>
                                                            <span>Current Location</span>
                                                            <span>:</span>
                                                        </span>


                                                        <span>Patel G Kulappa Road, Ramaswamipalya, Banasawadi, Bengaluru, Bangalore Urban, Karnataka</span>


                                                    </div>

                                                    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                                                        <span style={{ width: "140px", display: "flex", gap: "10px", justifyContent: "space-between" }}>

                                                            <span>Model</span>
                                                            <span>:</span>
                                                        </span>
                                                        <span>2016 TOYOTA ETIOS</span>

                                                    </div>

                                                    <div style={{ display: "flex", gap: "10px", borderBottom: "1px solid #ccc", marginTop: "10px" }}>
                                                        <span style={{ width: "140px", display: "flex", gap: "10px", justifyContent: "space-between" }}>

                                                            <span>Group</span>
                                                            <span>:</span>

                                                        </span>
                                                        <span>Bangalore</span>

                                                    </div>


                                                    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                                                        <span style={{ width: "140px", display: "flex", gap: "10px", justifyContent: "space-between" }}>

                                                            <span>Fuel Type</span>
                                                            <span>:</span>
                                                        </span>
                                                        <span>Diesel</span>


                                                    </div>

                                                    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                                                        <span style={{ width: "140px", display: "flex", gap: "10px", justifyContent: "space-between" }}>

                                                            <span>Distance</span>
                                                            <span>:</span>
                                                        </span>
                                                        <span>1.2 km</span>

                                                    </div>

                                                    <div style={{ display: "flex", gap: "10px", borderBottom: "1px solid #ccc", marginTop: "10px" }}>
                                                        <span style={{ width: "140px", display: "flex", gap: "10px", justifyContent: "space-between" }}>

                                                            <span>Time</span>
                                                            <span>:</span>
                                                        </span>
                                                        <span>25m</span>

                                                    </div>



                                                    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                                                        <span style={{ width: "140px", display: "flex", gap: "10px", justifyContent: "space-between" }}>

                                                            <span>Start Time</span>
                                                            <span>:</span>
                                                        </span>
                                                        <span>06 Aug 24, 11:21 AM</span>


                                                    </div>

                                                    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                                                        <span style={{ width: "140px", display: "flex", gap: "10px", justifyContent: "space-between" }}>

                                                            <span>End Time</span>
                                                            <span>:</span>
                                                        </span>
                                                        <span>06 Aug 24, 11:46 AM</span>

                                                    </div>

                                                    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                                                        <span style={{ width: "140px", display: "flex", gap: "10px", justifyContent: "space-between" }}>

                                                            <span>Start Location</span>
                                                            <span>:</span>
                                                        </span>
                                                        <span>Saint Thomas Town, Saint Thomas Town, Kacharakanahalli, Bengaluru, Bangalore Urban, Karnataka</span>

                                                    </div>

                                                    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                                                        <span style={{ width: "140px", display: "flex", gap: "10px", justifyContent: "space-between" }}>

                                                            <span>End Location</span>
                                                            <span>:</span>
                                                        </span>
                                                        <span>Patel G Kulappa Road, Ramaswamipalya, Banasawadi, Bengaluru, Bangalore Urban, Karnataka</span>


                                                    </div>






                                                </div>
                                            </TabPanel>
                                            <TabPanel value="2" >

                                            </TabPanel>
                                            <TabPanel value="3" >
                                                <div style={{ padding: "10px" }}>

                                                    <Box sx={{ m: 1, minWidth: 300 }}>
                                                        <TextField
                                                            id="search-input"
                                                            label="Search"
                                                            variant="outlined"
                                                            value={searchTermdirection}
                                                            onChange={handleSearchChangedirection}
                                                            fullWidth
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position="start">
                                                                        <SearchIcon />
                                                                    </InputAdornment>
                                                                ),
                                                                sx: { height: '40px' }, // Adjust the height as needed
                                                            }}
                                                            sx={{
                                                                '.MuiOutlinedInput-root': { height: '40px' }, // Adjust the height as needed
                                                                '.MuiInputLabel-root': { lineHeight: '40px' }, // Adjust the label's line-height as needed
                                                            }}
                                                        />
                                                    </Box>
                                                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                                        <button style={{ border: "1px solid gray", padding: "10px 20px", color: "#fff", backgroundColor: "gray", borderRadius: "8px" }}>Get Direction</button>
                                                    </div>
                                                </div>
                                            </TabPanel>
                                            <TabPanel value="4">
                                                <div style={{ padding: "10px" }}>
                                                    <div style={{ display: "flex", justifyContent: "space-between" }}>

                                                        <span style={{ width: "140px", display: "flex", gap: "3px", justifyContent: 'space-between' }}>
                                                            <span>Category</span>
                                                            <span>
                                                                :
                                                            </span>

                                                        </span>
                                                        <Box sx={{ m: 1, minWidth: 302 }}>
                                                            <TextField
                                                                id="select-input"
                                                                select
                                                                label="Select Option"
                                                                value={selectedOptionnearby}
                                                                onChange={handleSelectChangenearby}
                                                                variant="outlined"
                                                                fullWidth
                                                            >
                                                                <MenuItem value="">
                                                                    <em>None</em>
                                                                </MenuItem>
                                                                <MenuItem value={20}>Twenty</MenuItem>
                                                                <MenuItem value={21}>Twenty-one</MenuItem>
                                                                <MenuItem value={22}>Twenty-one and a half</MenuItem>
                                                            </TextField>
                                                        </Box>


                                                    </div>
                                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                        <span style={{ width: "140px", display: "flex", gap: "3px", justifyContent: 'space-between' }}>
                                                            <span>
                                                                Near By KM
                                                            </span>
                                                            <span>:</span>
                                                        </span>
                                                        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                                                            <Box sx={{ m: 1, minWidth: 120 }}>
                                                                <TextField
                                                                    id="number-input"
                                                                    label="Number"
                                                                    type="number"
                                                                    value={number}
                                                                    onChange={handleNumberChange}
                                                                    variant="outlined"
                                                                    fullWidth
                                                                />
                                                            </Box>


                                                            <button style={{ color: "gray", border: "1px solid gray", borderRadius: "8px", padding: "10px 20px", height: "40px" }}>Apply</button>


                                                        </div>
                                                    </div>
                                                    <div style={{ borderTop: "1px solid #ccc", display: "flex", justifyContent: "center" }}>
                                                        <p>No Petrol pump found.</p>
                                                    </div>
                                                </div>
                                            </TabPanel>
                                        </TabContext>
                                    </Box>
                                </div>



                            </div>

                        </Box>
                    </Box>
                </Drawer>
            </div>
        </>
    )
}


export default VehicleInformationDrawer;