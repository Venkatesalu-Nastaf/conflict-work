import React, { useState, useEffect, useMemo} from "react";
import GoogleMapDrawer from "./GoogleMapDrawer";
import OSMapDrawer from "./OSMapDrawer";
import { MenuItem, Select, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import TabList from '@mui/lab/TabList';
import useVehicleSectionDrawer from "./useVehicleSectionDrawer";
import dayjs from "dayjs";
import axios from "axios";
import { APIURL } from "../../../../url";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import { MdChangeHistory } from "react-icons/md";
import { GoHistory } from "react-icons/go";
import { FaCarOn } from "react-icons/fa6";
import TabContext from '@mui/lab/TabContext';
import Box from '@mui/material/Box';

const VehcileSectionDrawer = ({ open, handleClose, vehNo,todayVehicle }) => {
    console.log(vehNo,"vehhhhhhhhhhhhhhhhhhhhhhh")
    const [selectMap, setSelectMap] = useState("OSMap");
    const [filterDate, setFilterDate] = useState(dayjs());
    const [startMarkerPosition, setStartMarkerPosition] = useState({})
    const [currentPosition, setCurrentPosition] = useState(null)
    const [currentDatePoints, setCurrentDatePoints] = useState([]);
    const [currentriding, setCurrentRiding] = useState([]);
    const [selectedTripid, setSelectedTripid] = useState(null);
    const [startTripLocation, setStartTripLocation] = useState([]);
    const [endTripLocation, setEndTripLocation] = useState([]);
    const [dynamicPolyline, setDynamicPolyline] = useState([]);
    const [tripWayPoints, setTripWayPoints] = useState([]);
    const [tripdropdown,settripdown]=useState([])
    const [ridingvaluedata,setRidingValue]=useState([]);
    
        const [valuetabs, setValuetabs] = useState('1');
    
        const handleChangetabs = (event, newValue) => {
            setValuetabs(newValue);
        };
    // const [tripidvalue,setTripidValue]=useState()

    const apiUrl = APIURL;
    const handleChangeMap = (event) => {
        setSelectMap(event.target.value);
    };
    const handleChange = (date) => {
        const formattedDate = dayjs(date).format("YYYY-MM-DD");
        console.log("Selected Date:", formattedDate);
        setFilterDate(formattedDate);
        setSelectedTripid('')
    };
    // console.log(filterDate, "filterdateeeeeeeeeeeeee");
    useEffect(() => {
        const fetchData = async () => {
            //   const vehicleNo = vehicleListData?.map((li) => li.vehRegNo);

            // Ensure filterDate is always a valid date
            // const selectedDate = filterDate ? filterDate : dayjs().format("YYYY-MM-DD");

            //   console.log(vehicleNo,"Vehicle Numbers");
            console.log(filterDate,"dateeeeeeeeeeee",selectedTripid)

            try {
                if (selectedTripid){
                    console.log("enetr")
                    const response = await axios.post(`${apiUrl}/particularGpsRecords`, {
                        selectedDate: filterDate,
                        vehicleNumber: vehNo,
                        selectedTripiddata : selectedTripid
                    });

                    const result = response.data;
                    console.log(result, "GPS Data"); 
                    setCurrentDatePoints(result); 

                    const filteredData = result.slice(1, -1);
                    console.log(filteredData,"filetr")
                    // setCurrentDatePoints(filteredData);
                    setRidingValue(filteredData)

                  
                    setStartMarkerPosition(result[0]);
                    setCurrentPosition(result[result.length - 1]);
                }
                else{
                    setCurrentDatePoints([]); 

                    // const filteredData = result.slice(1, -1);
                    // console.log(filteredData,"filetr")
                    // setCurrentDatePoints(filteredData);
                    setRidingValue([])

                  
                    setStartMarkerPosition({});
                    setCurrentPosition([]);
                    return
                }
            }
            

             catch (err) {
                console.error(err, "Error fetching GPS data");
            }
        };

        fetchData();
    }, [filterDate, apiUrl,selectedTripid,vehNo]);

    // console.log(filterDate, "filterdateeeeeeeeeeeeee");
    useEffect(() => {
        const fetchData = async () => {
            //   const vehicleNo = vehicleListData?.map((li) => li.vehRegNo);

            // Ensure filterDate is always a valid date
            console.log("closeddate")
            // const selectedDate = filterDate ? filterDate : dayjs().format("YYYY-MM-DD");

            //   console.log(vehicleNo,"Vehicle Numbers");

            try {
                // if (selectedDate !== "" || selectedDate !== null) {
                if(filterDate){
                    console.log(filterDate,"enetr")
                    const response = await axios.post(`${apiUrl}/getAlladddateandtripid`, {
                        selectedDate: filterDate,
                        vehicleNumber: vehNo
                    });

                    const result = response.data;
                    console.log(result, "GPS Datatripid");  
                    settripdown(result)
                  
                }
                else
                {
                    return
                }   

            } catch (err) {
                console.error(err, "Error fetching GPS data");
            }
        };

        fetchData();
    }, [filterDate, apiUrl,vehNo]);
    // console.log(startMarkerPosition, "GPS Data Responsestarttttttttttttttttttttttt");
    // console.log(currentPosition, "GPS Data Responsestarttttttttcuuuuuuttttttttttttttt");
    // const tripidOptions = useMemo(() => {
    //     const filteredTrips = currentDatePoints.filter(item => item.Running_Date === filterDate && item.Trip_id !== "null");

    //     const uniqueTripids = [...new Set(filteredTrips.map(item => item.Trip_id))];

    //     return uniqueTripids.map(id => ({ label: `${id}`, value: id }));
    // }, [currentDatePoints, filterDate, selectedTripid]);

    const handleTripidChange = (event,value) => {
        console.log(value, "val22222",);
        // if (!value) {
        //     console.warn("Selected trip is null or undefined");
        //     return;
        // }
        const selectedOption = value ? value.label :null;
        // const seleteddata = value ? value.label : ""
        console.log(selectedOption,"ss")

        setSelectedTripid(selectedOption);
    };
  

    // useEffect(() => {
    //     // getAddress();

    //     const startPoint = currentDatePoints?.filter(
    //         (point) => point.Trip_Status === "Start" && point.Running_Date === filterDate && point.Trip_id === selectedTripid
    //     );

    //     const endPoint = currentDatePoints?.filter(
    //         (point) => point.Trip_Status === "end" && point.Running_Date === filterDate && point.Trip_id === selectedTripid
    //     );
    //     const wayPoint = currentDatePoints?.filter(
    //         (point) => point.Running_Date === filterDate && point.Trip_id === selectedTripid
    //     )
    //     console.log(wayPoint, "wwwwwwwwwwwwwwwwwww");
    //     setTripWayPoints(wayPoint)
    //     // setCurrentDatePoints(wayPoint)
    //     // Set multiple start locations as an array
    //     if (startPoint.length > 0) {
    //         setStartTripLocation(startPoint.map(point => ({ latitude: point.Lattitude_loc, longitude: point.Longitude_loc })));
    //     } else {
    //         setStartTripLocation([]); // Reset if no data
    //     }

    //     // Set multiple end locations as an array
    //     if (endPoint.length > 0) {
    //         setEndTripLocation(endPoint.map(point => ({ latitude: point.Lattitude_loc, longitude: point.Longitude_loc })));
    //     } else {
    //         setEndTripLocation([]); // Reset if no data
    //         setDynamicPolyline([])
    //     }

    // }, [currentPosition, filterDate, selectedTripid]);
    // useEffect(() => {
    //     if (dynamicPolyline.length > 1) {
    //         setCurrentPosition({
    //             Lattitude_loc: startMarkerPosition.latitude,
    //             Longitude_loc: startMarkerPosition.longitude,
    //         });
    //     }
    // }, [startMarkerPosition,selectedTripid]);
    // //   console.log(currentDatePoints,"cccccccccccccc");
    // console.log(startTripLocation, "startmarkerpositionnnnnnnnnn", endTripLocation);
    const handleClose1 = ()=>{
        handleClose()
        setSelectMap("OSMap")
    setFilterDate(dayjs())
    settripdown([])
    setSelectedTripid('')
    // console.log("deletddatatta")
    setStartMarkerPosition({})
    setCurrentPosition([])
    setCurrentDatePoints([])
    

    }
    useEffect(()=>{
        if(!open){
            handleClose1()
        }

    },[open])
    


    return (
        <>
            <div>


                <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth   PaperProps={{
                                style: {
                                //   width: 'fit-content',
                                  maxWidth: '90%',
                                  padding: '10px',
                                },
                              }}>
                    <DialogTitle></DialogTitle>
                    <Select
                        labelId="map-select-label"
                        id="map-select"
                        value={selectMap}
                        onChange={handleChangeMap}
                        displayEmpty
                        style={{ marginBottom: "10px", width: "150px" }}
                    >
                        <MenuItem value="OSMap">OSMap</MenuItem>
                        <MenuItem value="GoogleMap">Google Map</MenuItem>
                    </Select>
                    <div style={{ display: 'flex' }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="filterDate"
                                id="shedOutDate"
                                format="DD/MM/YYYY"
                                value={filterDate ? dayjs(filterDate) : dayjs()}
                                onChange={(date) => handleChange(date)}
                            />
                        </LocalizationProvider>
                        <div>
                            <Autocomplete
                                fullWidth
                                // size="small"
                                sx={{ width: 180 }}
                                // options={tripidOptions || ""}
                                options={tripdropdown.map((option) => ({
                                    label: option.Trip_id,
                                  }))}
                                // value={selectedTripid || tripdropdown[0]?.Trip_id}
                                value={selectedTripid || null}
                                isOptionEqualToValue={(option, value) => option?.label === value.label}
                                // onChange={(value) => handleTripidChange(value)} // Correcting onChange
                                onChange={(event, value) => {
                                    console.log(event,value,"val22")
                                    if(event !== null){

                                    handleTripidChange(event, value)
                                    }
                                  }}
                                // getOptionLabel={option => option.label}
                                renderInput={(params) => <TextField {...params} label="Select Trip ID" />}
                            />
                        </div>
                    </div>

                    <DialogContent>
                        <div style={{ width: "100%", height: "500px",display:"flex" }}>
                            {/* {selectMap === "OSMap" && <OSMapDrawer vehicleCurrentLocation={vehicleCurrentLocation} vehNo={vehNo} startMarkerPosition={startMarkerPosition} currentPosition={currentPosition} currentDatePoints={currentDatePoints} startTripLocation={startTripLocation} endTripLocation={endTripLocation} tripWayPoints={tripWayPoints} todayVehicle={todayVehicle} />} */}
                            <div style={{ width: "40%", height: "500px",overflow:"scroll"}}>
                            <div className='vehicle-info-content' >

<div className='vehicle-info-content-info'>
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
                <div className='overview-content-head'>


                    <div className='overview-content' >
                        <p className='overview-left'>Parked:</p>
                        <p style={{ color: 'green' }}>Speed 13km/h</p>
                    </div>
                    <div className='overview-content'>
                        <span className='overview-left'>Current Location:</span>
                        {/* <span>{address}</span> */}
                    </div>
                    <div className='overview-content'>
                        <span className='overview-left'>Model:</span>
                        {/* <span>{vehicleListData[0]?.yearModel}</span> */}
                    </div>

                    <div className='overview-content-border' >
                        <span className='overview-left'>Group:</span>
                    </div>

                    <div className='overview-content'>
                        <span className='overview-left'>Fuel Type:</span>
                        {/* <span>{vehicleListData[0]?.fueltype}</span> */}
                    </div>

                    <div className='overview-content-dropdown'>
                        <div>
                            <span className='overview-left'>Distance:</span>
                            <span>1.2 km</span>
                        </div>
                        {/* <div>
                            <Autocomplete
                                fullWidth
                                // size="small"
                                sx={{ width: 180 }}
                                options={tripidOptions || ""}
                                value={tripidOptions.find(option => option.value === selectedTripid) || null}
                                onChange={(label, value) => handleTripidChange(value)} // Correcting onChange
                                getOptionLabel={option => option.label}
                                renderInput={(params) => <TextField {...params} label="Select Trip ID" />}
                            />
                        </div> */}
                    </div>

                    <div className='overview-content-border'>
                        <span className='overview-left'>Time:</span>
                        <span>25m</span>
                    </div>

                    <div className='overview-content'>
                        <span className='overview-left'>Start Time:</span>
                        <span>06 Aug 24, 11:21 AM</span>
                    </div>

                    <div className='overview-content'>
                        <span className='overview-left'>End Time:</span>
                        <span>06 Aug 24, 11:46 AM</span>
                    </div>

                    <div className='overview-content'>
                        <span className='overview-left'>Start Location:</span>
                        <span>Saint Thomas Town, Saint Thomas Town, Kacharakanahalli, Bengaluru, Bangalore Urban, Karnataka</span>
                    </div>

                    <div className='overview-content'>
                        <span className='overview-left'>End Location:</span>
                        <span>Patel G Kulappa Road, Ramaswamipalya, Banasawadi, Bengaluru, Bangalore Urban, Karnataka</span>
                    </div>
                </div>
            </TabPanel>
            <TabPanel value="2" >

            </TabPanel>
            <TabPanel value="3" >
                <div className='directions-vehicle-info' >
                    <Box sx={{ m: 1, minWidth: 300 }}>
                        {/* <TextField
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
                        /> */}
                    </Box>
                    <div className='Getdirection' >
                        <button className='Getdirection-btn'>Get Direction</button>
                    </div>
                </div>
            </TabPanel>
            <TabPanel value="4">
                <div className='directions-vehicle-info'>
                    <div className='direction-content'>

                        <span>Category :</span>
                        <Box sx={{ m: 1, minWidth: 302 }}>
                            {/* <TextField
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
                            </TextField> */}
                        </Box>


                    </div>
                    <div className='direction-content'>
                        <span>
                            Near By KM :
                        </span>
                        <div className='direction-box'>
                            <Box sx={{ m: 1, minWidth: 120 }}>
                                {/* <TextField
                                    id="number-input"
                                    label="Number"
                                    type="number"
                                    value={number}
                                    onChange={handleNumberChange}
                                    variant="outlined"
                                    fullWidth
                                /> */}
                            </Box>
                            <button className='direction-apply-btn' >Apply</button>
                        </div>
                    </div>
                    <div className='warning-no-petrol' >
                        <p>No Petrol pump found.</p>
                    </div>
                </div>
            </TabPanel>
        </TabContext>
    </Box>
</div>
</div>

                            </div>
                            <div style={{ width: "70%", height: "500px" }}>

                        
                                {selectMap === "OSMap" && <OSMapDrawer  vehNo={vehNo} startMarkerPosition={startMarkerPosition} currentPosition={currentPosition} currentDatePoints={currentDatePoints} />}
                            {selectMap === "GoogleMap" && <GoogleMapDrawer  vehNo={vehNo} startMarkerPosition={startMarkerPosition} currentPosition={currentPosition} currentDatePoints={currentDatePoints}  />}
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose1} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
};

export default VehcileSectionDrawer;
