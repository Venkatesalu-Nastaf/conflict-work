import React, { useState, useEffect, useMemo } from "react";
import GoogleMapDrawer from "./GoogleMapDrawer";
import OSMapDrawer from "./OSMapDrawer";
import { MenuItem, Select, Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress } from "@mui/material";
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
import useDetailsVehicle from "../useDetailsVehicle";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const VehcileSectionDrawer = ({ open, handleClose, vehNo, todayVehicle }) => {
    const { isPlaying,
        handle10xDrawPaths, handle20xDrawPaths, handle50xDrawPaths,
        handledefault10xDrawPaths, speedState,
        togglePlayPause, dynamicPolyline1, setDynamicPolyline1, setIsPlaying, setDataStop, setSpeedState, moveposition, setMOVEPosition1

    } = useDetailsVehicle()
    console.log(vehNo, "vehhhhhhhhhhhhhhhhhhhhhhh")
    const [selectMap, setSelectMap] = useState("OSMap");
    const [filterDate, setFilterDate] = useState(dayjs());
    const [startMarkerPosition, setStartMarkerPosition] = useState({})
    const [currentPosition, setCurrentPosition] = useState(null)
    const [currentDatePoints, setCurrentDatePoints] = useState([]);
    const [currentriding, setCurrentRiding] = useState([]);
    const [selectedTripid, setSelectedTripid] = useState(null);
    const [startTripLocation, setStartTripLocation] = useState([]);
    const [endTripLocation, setEndTripLocation] = useState([]);
    const [startTripAddress, setStartTripAddress] = useState([]);
    const [endTripAddress, setEndTripAddress] = useState([]);
    // const [dynamicPolyline, setDynamicPolyline] = useState([]);
    const [tripWayPoints, setTripWayPoints] = useState([]);
    const [tripdropdown, settripdown] = useState([])
    const [ridingvaluedata, setRidingValue] = useState([]);
    const [tripvalue, setTripvalue] = useState([])

    const [valuetabs, setValuetabs] = useState('1');

    const [loading, setLoading] = useState(false)

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
            console.log(filterDate, "dateeeeeeeeeeee", selectedTripid)

            try {
                if (selectedTripid) {
                    console.log("enetr")
                    const response = await axios.post(`${apiUrl}/particularGpsRecords`, {
                        selectedDate: filterDate,
                        vehicleNumber: vehNo,
                        selectedTripiddata: selectedTripid
                    });

                    const result = response.data;
                    console.log(result, "GPS Data");
                    setCurrentDatePoints(result);
                    setDataStop(result)

                    const filteredData = result.slice(1, -1);
                    console.log(filteredData, "filetr")
                    // setCurrentDatePoints(filteredData);
                    setRidingValue(filteredData)


                    setStartMarkerPosition(result[0]);
                    setCurrentPosition(result[result.length - 1]);

                }
                else {
                    setCurrentDatePoints([]);
                    setDynamicPolyline1([])

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
                console.log(err, "Error fetching GPS data");
            }
        };

        fetchData();
    }, [filterDate, apiUrl, selectedTripid, vehNo]);

    // console.log(filterDate, "filterdateeeeeeeeeeeeee");
    //  useEffect(() => {
    //     const fetchData = async () => {
    //         //   const vehicleNo = vehicleListData?.map((li) => li.vehRegNo);

    //         // Ensure filterDate is always a valid date
    //         console.log("closeddate")
    //         // const selectedDate = filterDate ? filterDate : dayjs().format("YYYY-MM-DD");

    //         //   console.log(vehicleNo,"Vehicle Numbers");

    //         try {
    //             // if (selectedDate !== "" || selectedDate !== null) {
    //             if (filterDate) {
    //                 console.log(filterDate, "enetr")
    //                 const response = await axios.post(`${apiUrl}/getAlladddateandtripid`, {
    //                     selectedDate: filterDate,
    //                     vehicleNumber: vehNo
    //                 });

    //                 const result = response.data;
    //                 console.log(result, "GPS Datatripid");
    //                 settripdown(result)

    //             }
    //             else {
    //                 return
    //             }

    //         } catch (err) {
    //             console.error(err, "Error fetching GPS data");
    //         }
    //     };

    //     fetchData();
    // }, [filterDate, apiUrl, vehNo]);

    useEffect(() => {
        const fetchData = async () => {
            //   const vehicleNo = vehicleListData?.map((li) => li.vehRegNo);

            // Ensure filterDate is always a valid date
            // console.log("closeddate")
            // const selectedDate = filterDate ? filterDate : dayjs().format("YYYY-MM-DD");

            //   console.log(vehicleNo,"Vehicle Numbers");
            setLoading(true)

            try {
                // if (selectedDate !== "" || selectedDate !== null) {
                const hybrid = localStorage.getItem("SuperAdmin")
                // console.log(hybrid, "Hybridvalueeee");


                if (filterDate) {

                    const response = await axios.post(`${apiUrl}/getAlladddateandtripid/${hybrid}`, {
                        selectedDate: filterDate,
                        vehicleNumber: vehNo
                    });


                    const result = response.data;
                    // console.log(result, "GPS Datatripid");
                    settripdown(result)
                    setLoading(false);
                }
                else {
                    // settripdown([]);
                    return
                }

            } catch (err) {
                console.error(err, "Error fetching GPS data");
            }
        };

        fetchData();
    }, [filterDate, apiUrl, vehNo]);
    // console.log(startMarkerPosition, "GPS Data Responsestarttttttttttttttttttttttt");
    // console.log(currentPosition, "GPS Data Responsestarttttttttcuuuuuuttttttttttttttt");
    // const tripidOptions = useMemo(() => {
    //     const filteredTrips = currentDatePoints.filter(item => item.Running_Date === filterDate && item.Trip_id !== "null");

    //     const uniqueTripids = [...new Set(filteredTrips.map(item => item.Trip_id))];

    //     return uniqueTripids.map(id => ({ label: `${id}`, value: id }));
    // }, [currentDatePoints, filterDate, selectedTripid]);
    const getbasedtipidformap = async () => {
        console.log(selectedTripid, "gg")
        try {
            const resposefortrip = await axios.post(`${apiUrl}/gettripbasedmapdetails`, {

                tripid: selectedTripid
            });
            const result = resposefortrip.data
            setTripvalue(result)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (selectedTripid) { // Ensure `selectedTripid` is defined before making the request
            getbasedtipidformap();
        }
        else {
            setTripvalue([])
        }
    }, [selectedTripid]);


    const handleTripidChange = (event, value) => {
        console.log(value, "val22222",);
        // if (!value) {
        //     console.warn("Selected trip is null or undefined");
        //     return;
        // }
        const selectedOption = value ? value.label : null;
        // const seleteddata = value ? value.label : ""
        console.log(selectedOption, "ss")

        setSelectedTripid(selectedOption);
        setDynamicPolyline1([])
        setIsPlaying(false)
        setMOVEPosition1()
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
    const handleClose1 = () => {
        handleClose()
        setSelectMap("OSMap")
        setFilterDate(dayjs())
        settripdown([])
        setSelectedTripid('')
        // console.log("deletddatatta")
        setStartMarkerPosition({})
        setCurrentPosition([])
        setCurrentDatePoints([])
        setDynamicPolyline1([])
        setIsPlaying(false)
        setSpeedState(1000)


    }
    useEffect(() => {
        if (!open) {
            handleClose1()
        }

    }, [open])

    const GOOGLE_MAPS_API_KEY = "AIzaSyCn47dR5-NLfhq0EqxlgaFw8IEaZO5LnRE"; // Replace with your API key

    const getAddressFromLatLng = async (lat, lng) => {
        try {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
                params: {
                    latlng: `${lat},${lng}`,
                    key: GOOGLE_MAPS_API_KEY,
                },
            });

            if (response.data.status === "OK" && response.data.results.length > 0) {
                return response.data.results[0].formatted_address;
            } else {
                return "Address not found";
            }
        } catch (error) {
            console.error("Error fetching address:", error);
            return "Address not found";
        }
    };
    console.log(startMarkerPosition, "tolldps")

    useEffect(() => {
        if (startMarkerPosition) {
            getAddressFromLatLng(parseFloat(startMarkerPosition.Latitude_loc), parseFloat(startMarkerPosition.Longtitude_loc))
                .then((address) => setStartTripAddress(address));
        }
        if (currentPosition) {
            getAddressFromLatLng(parseFloat(currentPosition.Latitude_loc), parseFloat(currentPosition.Longtitude_loc))
                .then((address) => setEndTripAddress(address));
        }
    }, [startMarkerPosition, currentPosition]);

    const calculatedataandtime = (startvalue) => {

        console.log(startvalue, "val")
        if ((Object.keys(startvalue).length !== 0)) {
            console.log(startvalue, "starteeeeeeeeeeeeeeeeee", startvalue ? "eneter" : "noo")
            const dateformat = startvalue ? dayjs(startvalue?.Runing_Date).format("DD-MM-YYYY") : ""
            console.log(startvalue, "start")
            const data = startvalue?.Runing_Time
            const [hours, minutes] = data?.split(":");
            console.log(hours, minutes, "hours mminutes")



            return `${dateformat} & ${parseInt(hours, 10)}:${parseInt(minutes, 10)}`
            // return `${dateformat}`
        }
        return ''



    }

    const datastartdate = useMemo(() => {
        if (startMarkerPosition) {
            return calculatedataandtime(startMarkerPosition);
        }
        return null; // or some default value
    }, [startMarkerPosition])

    const dataEnddate = useMemo(() => {
        if (currentPosition !== null) {
            return calculatedataandtime(currentPosition);
        }
        return null; // or some default value
    }, [currentPosition])
    //  const dataEnddate = useMemo(() => calculatedataandtime(currentPosition), [startMarkerPosition]);
    // console.log(dynamicPolyline1,"poly")

    return (
        <>
            <div>


                <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth PaperProps={{
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
                    <div className="select-tripid-label">
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
                                options=
                                {tripdropdown.map((option) => ({
                                    label: option.Trip_id,
                                }))}
                                // value={selectedTripid || tripdropdown[0]?.Trip_id}
                                // value={selectedTripid || null}
                                value={
                                    loading
                                        ? null
                                        : tripdropdown.length === 0
                                            ? { label: 'No data found', disabled: true }
                                            : selectedTripid
                                                ? { label: selectedTripid }
                                                : null
                                }
                                loading={loading}
                                isOptionEqualToValue={(option, value) => option?.label === value.label}
                                // onChange={(value) => handleTripidChange(value)} // Correcting onChange
                                onChange={(event, value) => {
                                    console.log(event, value, "val22")
                                    if (event !== null) {

                                        handleTripidChange(event, value)
                                    }
                                }}
                                // getOptionLabel={option => option.label}
                                renderInput={(params) => <TextField
                                    {...params}
                                    label="Select Trip ID"
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <>
                                                {loading ? <CircularProgress color="primary" size={20} /> : null}
                                                {params.InputProps.endAdornment}
                                            </>
                                        ),
                                    }}
                                />}
                            />
                        </div>
                    </div>

                    <DialogContent>
                        <div className="vehicle">
                            {/* {selectMap === "OSMap" && <OSMapDrawer vehicleCurrentLocation={vehicleCurrentLocation} vehNo={vehNo} startMarkerPosition={startMarkerPosition} currentPosition={currentPosition} currentDatePoints={currentDatePoints} startTripLocation={startTripLocation} endTripLocation={endTripLocation} tripWayPoints={tripWayPoints} todayVehicle={todayVehicle} />} */}
                            <div className="vehicle-info">
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
                                                        {/* <div className='overview-content'>
                        `                                    <span className='overview-left'>Current Location:</span>
                                                        <span>{address}</span> *
                                                        </div>  */}`
                                                        <div className='overview-content'>
                                                            <span className='overview-left'>Vehicle No:</span>
                                                            <span>{vehNo}</span>
                                                        </div>
                                                        <div className='overview-content'>
                                                            <span className='overview-left'>Model:</span>
                                                            {/* <span>{vehicleListData[0]?.yearModel}</span> */}
                                                        </div>

                                                        {/* <div className='overview-content-border' >
                                                            <span className='overview-left'>Group:</span>
                                                        </div> */}
                                                        <div className='overview-content-border' >
                                                            <span className='overview-left'>vehicle Name:</span>
                                                            <span>{tripvalue[0]?.vehicleName}</span>
                                                        </div>

                                                        <div className='overview-content'>
                                                            <span className='overview-left'>Fuel Type:</span>
                                                            <span>{tripvalue[0]?.fueltype}</span>
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
                                                            <span className='overview-left'>Start Date & Time:</span>
                                                            <span>{datastartdate}</span>
                                                        </div>

                                                        <div className='overview-content'>
                                                            <span className='overview-left'>End Date & Time:</span>
                                                            <span>{dataEnddate}</span>
                                                        </div>
                                                        {selectedTripid &&
                                                            <>

                                                                <div className='overview-content'>
                                                                    <span className='overview-left'>Start Location:</span>
                                                                    <span>{startTripAddress}</span>
                                                                </div>

                                                                <div className='overview-content'>
                                                                    <span className='overview-left'>End Location:</span>
                                                                    <span>{endTripAddress}</span>
                                                                </div>
                                                            </>
                                                        }
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
                            <div className="g-map" >


                                {selectMap === "OSMap" && <OSMapDrawer vehNo={vehNo} startMarkerPosition={startMarkerPosition} currentPosition={currentPosition} currentDatePoints={currentDatePoints} dynamicPolyline={dynamicPolyline1} moveposition={moveposition} />}
                                {selectMap === "GoogleMap" && <GoogleMapDrawer vehNo={vehNo} startMarkerPosition={startMarkerPosition} currentPosition={currentPosition} currentDatePoints={currentDatePoints} dynamicPolyline={dynamicPolyline1} moveposition={moveposition} />}
                                <div className='playButton'>
                                    {/* <div className='playArrow'>
                                        <Button onClick={() => togglePlayPause()}>
                                            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                                        </Button>

                                    </div> */}
                                    <div className='playspeed'>

                                        <div className='playArrow'>
                                            <div>
                                                <Button onClick={() => togglePlayPause()}>
                                                    {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                                                </Button>
                                            </div>

                                            <p className="play-speed">Play Speed</p>

                                        </div>
                                        <div className='playspeed-buttons'>
                                            <Button className="speed-btn" sx={{
                                                backgroundColor: speedState === 1000 ? 'gray' : 'white',
                                                color: speedState === 1000 ? 'white' : 'black',
                                                '&:hover': { backgroundColor: 'lightgray' },
                                            }} onClick={() => handle10xDrawPaths()}>10X</Button>

                                            <Button className="speed-btn" sx={{
                                                backgroundColor: speedState === 500 ? 'gray' : 'white',
                                                color: speedState === 500 ? 'white' : 'black',
                                                '&:hover': { backgroundColor: 'lightgray' },
                                            }} onClick={() => handle20xDrawPaths()}>20X</Button>

                                            <Button className="speed-btn" sx={{
                                                backgroundColor: speedState === 100 ? 'gray' : 'white',
                                                color: speedState === 100 ? 'white' : 'black',
                                                '&:hover': { backgroundColor: 'lightgray' },
                                            }} onClick={() => handle50xDrawPaths()}>50X</Button>
                                        </div>
                                    </div>
                                </div>
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
