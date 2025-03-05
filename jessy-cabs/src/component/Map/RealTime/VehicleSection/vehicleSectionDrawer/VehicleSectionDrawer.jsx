import React, { useState, useEffect, useMemo} from "react";
import GoogleMapDrawer from "./GoogleMapDrawer";
import OSMapDrawer from "./OSMapDrawer";
import { MenuItem, Select, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import useVehicleSectionDrawer from "./useVehicleSectionDrawer";
import dayjs from "dayjs";
import axios from "axios";
import { APIURL } from "../../../../url";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

const VehcileSectionDrawer = ({ open, handleClose, vehNo,todayVehicle }) => {
    console.log(vehNo,"vehhhhhhhhhhhhhhhhhhhhhhh")
    const [selectMap, setSelectMap] = useState("OSMap");
    const [filterDate, setFilterDate] = useState(dayjs());
    const [startMarkerPosition, setStartMarkerPosition] = useState(null)
    const [currentPosition, setCurrentPosition] = useState(null)
    const [currentDatePoints, setCurrentDatePoints] = useState([]);
    const [currentriding, setCurrentRiding] = useState([]);
    const [selectedTripid, setSelectedTripid] = useState(null);
    const [startTripLocation, setStartTripLocation] = useState([]);
    const [endTripLocation, setEndTripLocation] = useState([]);
    const [dynamicPolyline, setDynamicPolyline] = useState([]);
    const [tripWayPoints, setTripWayPoints] = useState([]);
    const [tripdropdown,settripdown]=useState([])
    const [ridingvaluedata,setRidingValue]=useState([])
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
        console.log(value, "valueeeeeeeeeeeee",value.label);
        const selectedOption = value ? value.label : "";
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
    setStartMarkerPosition([])
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


                <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
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
                                value={selectedTripid || ''}
                                isOptionEqualToValue={(option, value) => option.label === value.label}
                                // onChange={(value) => handleTripidChange(value)} // Correcting onChange
                                onChange={(event, value) => {
                                    handleTripidChange(event, value)
                                  }}
                                // getOptionLabel={option => option.label}
                                renderInput={(params) => <TextField {...params} label="Select Trip ID" />}
                            />
                        </div>
                    </div>

                    <DialogContent>
                        <div style={{ width: "100%", height: "500px" }}>
                            {/* {selectMap === "OSMap" && <OSMapDrawer vehicleCurrentLocation={vehicleCurrentLocation} vehNo={vehNo} startMarkerPosition={startMarkerPosition} currentPosition={currentPosition} currentDatePoints={currentDatePoints} startTripLocation={startTripLocation} endTripLocation={endTripLocation} tripWayPoints={tripWayPoints} todayVehicle={todayVehicle} />} */}
                                {selectMap === "OSMap" && <OSMapDrawer  vehNo={vehNo} startMarkerPosition={startMarkerPosition} currentPosition={currentPosition} currentDatePoints={currentDatePoints} />}
                            {selectMap === "GoogleMap" && <GoogleMapDrawer  vehNo={vehNo} startMarkerPosition={startMarkerPosition} currentPosition={currentPosition} currentDatePoints={currentDatePoints}  />}
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
