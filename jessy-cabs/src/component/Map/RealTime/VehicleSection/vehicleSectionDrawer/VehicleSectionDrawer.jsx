import React, { useState, useEffect, useMemo } from "react";
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

const VehcileSectionDrawer = ({ open, handleClose, vehicleCurrentLocation, vehNo,todayVehicle }) => {
    const [selectMap, setSelectMap] = useState("OSMap");
    const [filterDate, setFilterDate] = useState(null);
    const [startMarkerPosition, setStartMarkerPosition] = useState(null)
    const [currentPosition, setCurrentPosition] = useState(null)
    const [currentDatePoints, setCurrentDatePoints] = useState([]);
    const [selectedTripid, setSelectedTripid] = useState(null);
    const [startTripLocation, setStartTripLocation] = useState([]);
    const [endTripLocation, setEndTripLocation] = useState([]);
    const [dynamicPolyline, setDynamicPolyline] = useState([]);
    const [tripWayPoints, setTripWayPoints] = useState([]);

    const apiUrl = APIURL;
    const handleChangeMap = (event) => {
        setSelectMap(event.target.value);
    };
    const handleChange = (date) => {
        const formattedDate = dayjs(date).format("YYYY-MM-DD");
        console.log("Selected Date:", formattedDate);
        setFilterDate(formattedDate);
    };
    console.log(filterDate, "filterdateeeeeeeeeeeeee");
    useEffect(() => {
        const fetchData = async () => {
            //   const vehicleNo = vehicleListData?.map((li) => li.vehRegNo);

            // Ensure filterDate is always a valid date
            const selectedDate = filterDate ? filterDate : dayjs().format("YYYY-MM-DD");

            //   console.log(vehicleNo, vehicleListData, "Vehicle Numbers", selectedDate,vehicleSearchDetails);

            try {
                if (selectedDate !== "" || selectedDate !== null) {
                    const response = await axios.post(`${apiUrl}/particularGpsRecords`, {
                        selectedDate: selectedDate,
                        vehicleNumber: vehNo
                    });

                    const result = response.data;
                    console.log(result, "GPS Data Response");

                    // Sort response.data based on TripStartTime in ascending order
                    const sortedData = [...result].sort((a, b) => {
                        const timeA = parseInt(a.TripStartTime.replace(/[:.]/g, '').slice(0, 4)); // Convert HH:MM to numeric value
                        const timeB = parseInt(b.TripStartTime.replace(/[:.]/g, '').slice(0, 4));
                        return timeA - timeB;
                    });

                    console.log(sortedData, 'Sorted GPS Data -------------------');

                    setCurrentDatePoints(sortedData);
                    setStartMarkerPosition(sortedData[0]);
                    setCurrentPosition(sortedData[sortedData.length - 1]);
                }

            } catch (err) {
                console.error(err, "Error fetching GPS data");
            }
        };

        fetchData();
    }, [filterDate, apiUrl]);
    console.log(startMarkerPosition, "starttttttttttttttttttttttt");
    const tripidOptions = useMemo(() => {
        const filteredTrips = currentDatePoints.filter(item => item.Running_Date === filterDate && item.Trip_id !== "null");

        const uniqueTripids = [...new Set(filteredTrips.map(item => item.Trip_id))];

        return uniqueTripids.map(id => ({ label: `${id}`, value: id }));
    }, [currentDatePoints, filterDate, selectedTripid]);

    const handleTripidChange = (value) => {
        console.log(value, "valueeeeeeeeeeeee");

        setSelectedTripid(value?.value || null);
    };

    useEffect(() => {
        // getAddress();

        const startPoint = currentDatePoints?.filter(
            (point) => point.Trip_Status === "Start" && point.Running_Date === filterDate && point.Trip_id === selectedTripid
        );

        const endPoint = currentDatePoints?.filter(
            (point) => point.Trip_Status === "end" && point.Running_Date === filterDate && point.Trip_id === selectedTripid
        );
        const wayPoint = currentDatePoints?.filter(
            (point) => point.Running_Date === filterDate && point.Trip_id === selectedTripid
        )
        console.log(wayPoint, "wwwwwwwwwwwwwwwwwww");
        setTripWayPoints(wayPoint)
        // setCurrentDatePoints(wayPoint)
        // Set multiple start locations as an array
        if (startPoint.length > 0) {
            setStartTripLocation(startPoint.map(point => ({ latitude: point.Lattitude_loc, longitude: point.Longitude_loc })));
        } else {
            setStartTripLocation([]); // Reset if no data
        }

        // Set multiple end locations as an array
        if (endPoint.length > 0) {
            setEndTripLocation(endPoint.map(point => ({ latitude: point.Lattitude_loc, longitude: point.Longitude_loc })));
        } else {
            setEndTripLocation([]); // Reset if no data
            setDynamicPolyline([])
        }

    }, [currentPosition, filterDate, selectedTripid]);
    useEffect(() => {
        if (dynamicPolyline.length > 1) {
            setCurrentPosition({
                Lattitude_loc: startMarkerPosition.latitude,
                Longitude_loc: startMarkerPosition.longitude,
            });
        }
    }, [startMarkerPosition,selectedTripid]);
    //   console.log(currentDatePoints,"cccccccccccccc");
    console.log(startTripLocation, "startmarkerpositionnnnnnnnnn", endTripLocation);


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
                                options={tripidOptions || ""}
                                value={tripidOptions.find(option => option.value === selectedTripid) || null}
                                onChange={(label, value) => handleTripidChange(value)} // Correcting onChange
                                getOptionLabel={option => option.label}
                                renderInput={(params) => <TextField {...params} label="Select Trip ID" />}
                            />
                        </div>
                    </div>

                    <DialogContent>
                        <div style={{ width: "100%", height: "500px" }}>
                            {selectMap === "OSMap" && <OSMapDrawer vehicleCurrentLocation={vehicleCurrentLocation} vehNo={vehNo} startMarkerPosition={startMarkerPosition} currentPosition={currentPosition} currentDatePoints={currentDatePoints} startTripLocation={startTripLocation} endTripLocation={endTripLocation} tripWayPoints={tripWayPoints} todayVehicle={todayVehicle} />}
                            {selectMap === "GoogleMap" && <GoogleMapDrawer />}
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
};

export default VehcileSectionDrawer;
