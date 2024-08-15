import React, { useState } from 'react';
import { Drawer, IconButton } from '@mui/material';
import { Select, MenuItem, FormControl } from '@mui/material';
import {   FormControlLabel, Switch, } from '@mui/material';


import CloseIcon from '@mui/icons-material/Close';
import { RiFilter2Fill } from "react-icons/ri";



const FilterIcon = () => {
    const [filteropen, setFilteropen] = useState(false);

    const togglefilterDrawer = (open) => (event) => {
        setFilteropen(open);
    };

    const [selectFiltervalue, setSelectFiltervalue] = useState('');

    const handleSelectFilterChange = (event) => {
        setSelectFiltervalue(event.target.value);
    };
    return (
        <>
            <div onClick={togglefilterDrawer(true)}>
                <RiFilter2Fill />
            </div>

            <Drawer
                anchor="right"
                open={filteropen}
                onClose={togglefilterDrawer(false)}
            >
                <div
                    style={{
                        width: 250,
                        padding: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                    }}
                    role="presentation"
                >
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton onClick={togglefilterDrawer(false)}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <div style={{ padding: '10px' }}>
                        <FormControl variant="outlined" style={{ width: '100%',padding:"10px" }}>
                            <Select
                                value={selectFiltervalue}
                                onChange={handleSelectFilterChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                style={{ width: '100%' }} // Full width select
                            >
                                <MenuItem value="" disabled>
                                    Select a Group
                                </MenuItem>
                                <MenuItem value={10}>Option 1</MenuItem>
                                <MenuItem value={20}>Option 2</MenuItem>
                                <MenuItem value={30}>Option 3</MenuItem>
                            </Select>
                        </FormControl>

                        <button style={{border:"1px solid #ddd",background:"none", color:"#000000", width:"100%",padding:"10px", marginTop:"10px"}}>Filter by Tags</button>

                        <FormControl variant="outlined" style={{ width: '100%',padding:"10px" }}>
                            <Select
                                value={selectFiltervalue}
                                onChange={handleSelectFilterChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                style={{ width: '100%' }} // Full width select
                            >
                                <MenuItem value="" disabled>
                                    Select Category
                                </MenuItem>
                                <MenuItem value={10}>Option 1</MenuItem>
                                <MenuItem value={20}>Option 2</MenuItem>
                                <MenuItem value={30}>Option 3</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl variant="outlined" style={{ width: '100%',padding:"10px" }}>
                            <Select
                                value={selectFiltervalue}
                                onChange={handleSelectFilterChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                style={{ width: '100%' }} // Full width select
                            >
                                <MenuItem value="" disabled>
                                    Select Asset Type
                                </MenuItem>
                                <MenuItem value={10}>Option 1</MenuItem>
                                <MenuItem value={20}>Option 2</MenuItem>
                                <MenuItem value={30}>Option 3</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl variant="outlined" style={{ width: '100%',padding:"10px" }}>
                            <Select
                                value={selectFiltervalue}
                                onChange={handleSelectFilterChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                style={{ width: '100%' }} // Full width select
                            >
                                <MenuItem value="" disabled>
                                    Select Transporter
                                </MenuItem>
                                <MenuItem value={10}>Option 1</MenuItem>
                                <MenuItem value={20}>Option 2</MenuItem>
                                <MenuItem value={30}>Option 3</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl variant="outlined" style={{ width: '100%',padding:"10px" }}>
                            <Select
                                value={selectFiltervalue}
                                onChange={handleSelectFilterChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                style={{ width: '100%' }} // Full width select
                            >
                                <MenuItem value="" disabled>
                                    Select Next Route Point
                                </MenuItem>
                                <MenuItem value={10}>Option 1</MenuItem>
                                <MenuItem value={20}>Option 2</MenuItem>
                                <MenuItem value={30}>Option 3</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl variant="outlined" style={{ width: '100%',padding:"10px" }}>
                            <Select
                                value={selectFiltervalue}
                                onChange={handleSelectFilterChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                style={{ width: '100%' }} // Full width select
                            >
                                <MenuItem value="" disabled>
                                    Select Route
                                </MenuItem>
                                <MenuItem value={10}>Option 1</MenuItem>
                                <MenuItem value={20}>Option 2</MenuItem>
                                <MenuItem value={30}>Option 3</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl variant="outlined" style={{ width: '100%' ,padding:"10px"}}>
                            <Select
                                value={selectFiltervalue}
                                onChange={handleSelectFilterChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                style={{ width: '100%' }} // Full width select
                            >
                                <MenuItem value="" disabled>
                                    Select Address Book
                                </MenuItem>
                                <MenuItem value={10}>Option 1</MenuItem>
                                <MenuItem value={20}>Option 2</MenuItem>
                                <MenuItem value={30}>Option 3</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl variant="outlined" style={{ width: '100%' ,padding:"10px"}}>
                            <Select
                                value={selectFiltervalue}
                                onChange={handleSelectFilterChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                style={{ width: '100%' }} // Full width select
                            >
                                <MenuItem value="" disabled>
                                    Ev Battery Level
                                </MenuItem>
                                <MenuItem value={10}>Option 1</MenuItem>
                                <MenuItem value={20}>Option 2</MenuItem>
                                <MenuItem value={30}>Option 3</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl variant="outlined" style={{ width: '100%',padding:"10px" }}>
                            <Select
                                value={selectFiltervalue}
                                onChange={handleSelectFilterChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                style={{ width: '100%' }} // Full width select
                            >
                                <MenuItem value="" disabled>
                                    Job status Time
                                </MenuItem>
                                <MenuItem value={10}>Option 1</MenuItem>
                                <MenuItem value={20}>Option 2</MenuItem>
                                <MenuItem value={30}>Option 3</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl variant="outlined" style={{ width: '100%',padding:"10px" }}>
                            <Select
                                value={selectFiltervalue}
                                onChange={handleSelectFilterChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                style={{ width: '100%' }} // Full width select
                            >
                                <MenuItem value="" disabled>
                                    Exclude vehicle Status
                                </MenuItem>
                                <MenuItem value={10}>Option 1</MenuItem>
                                <MenuItem value={20}>Option 2</MenuItem>
                                <MenuItem value={30}>Option 3</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl variant="outlined" style={{ width: '100%',padding:"10px" }}>
                            <Select
                                value={selectFiltervalue}
                                onChange={handleSelectFilterChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                style={{ width: '100%' }} // Full width select
                            >
                                <MenuItem value="" disabled>
                                    ETA Delay
                                </MenuItem>
                                <MenuItem value={10}>Option 1</MenuItem>
                                <MenuItem value={20}>Option 2</MenuItem>
                                <MenuItem value={30}>Option 3</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl variant="outlined" style={{ width: '100%' ,padding:"10px"}}>
                            <Select
                                value={selectFiltervalue}
                                onChange={handleSelectFilterChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                style={{ width: '100%' }} // Full width select
                            >
                                <MenuItem value="" disabled>
                                    Vehicle Driver Assignment
                                </MenuItem>
                                <MenuItem value={10}>Option 1</MenuItem>
                                <MenuItem value={20}>Option 2</MenuItem>
                                <MenuItem value={30}>Option 3</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl variant="outlined" style={{ width: '100%',padding:"10px" }}>
                            <Select
                                value={selectFiltervalue}
                                onChange={handleSelectFilterChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                style={{ width: '100%' }} // Full width select
                            >
                                <MenuItem value="" disabled>
                                    Driver Workload Status
                                </MenuItem>
                                <MenuItem value={10}>Option 1</MenuItem>
                                <MenuItem value={20}>Option 2</MenuItem>
                                <MenuItem value={30}>Option 3</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl variant="outlined" style={{ width: '100%',padding:"10px" }}>
                            <Select
                                value={selectFiltervalue}
                                onChange={handleSelectFilterChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                style={{ width: '100%' }} // Full width select
                            >
                                <MenuItem value="" disabled>
                                    Vehicle Size
                                </MenuItem>
                                <MenuItem value={10}>Option 1</MenuItem>
                                <MenuItem value={20}>Option 2</MenuItem>
                                <MenuItem value={30}>Option 3</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl variant="outlined" style={{ width: '100%',padding:"10px" }}>
                            <Select
                                value={selectFiltervalue}
                                onChange={handleSelectFilterChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                style={{ width: '100%' }} // Full width select
                            >
                                <MenuItem value="" disabled>
                                    Parking Duration
                                </MenuItem>
                                <MenuItem value={10}>Option 1</MenuItem>
                                <MenuItem value={20}>Option 2</MenuItem>
                                <MenuItem value={30}>Option 3</MenuItem>
                            </Select>
                        </FormControl>


                        <p style={{borderTop:"1px solid #ccc",padding:"10px"}}>Not On Job</p>
                        <FormControl variant="outlined" style={{ width: '100%' }}>
                            <Select
                                value={selectFiltervalue}
                                onChange={handleSelectFilterChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                style={{ width: '100%' }} // Full width select
                            >
                                <MenuItem value="" disabled>
                                    Select Date Range
                                </MenuItem>
                                <MenuItem value={10}>Option 1</MenuItem>
                                <MenuItem value={20}>Option 2</MenuItem>
                                <MenuItem value={30}>Option 3</MenuItem>
                            </Select>
                        </FormControl>
<div style={{borderTop:"1px solid #ccc", display:"grid",marginTop:"10px", padding:"10px"}}>
<div><FormControlLabel control={<Switch />} label="Current Transporter" /></div>
                        <div><FormControlLabel control={<Switch />} label=" Vehicle With Critical DTCs" /></div>
</div>
                        

                        <p style={{borderTop:"1px solid #ccc",padding:"10px"}}>sort</p>
                        <FormControl variant="outlined" style={{ width: '100%' }}>
                            <Select
                                value={selectFiltervalue}
                                onChange={handleSelectFilterChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                style={{ width: '100%' }} // Full width select
                            >
                                <MenuItem value="" disabled>
                                    Sort By
                                </MenuItem>
                                <MenuItem value={10}>Option 1</MenuItem>
                                <MenuItem value={20}>Option 2</MenuItem>
                                <MenuItem value={30}>Option 3</MenuItem>
                            </Select>
                        </FormControl>

                        
                    </div>
                </div>
            </Drawer>


        </>
    )
}
export default FilterIcon;