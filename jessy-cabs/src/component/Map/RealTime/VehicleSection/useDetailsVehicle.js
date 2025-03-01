import React, { useState, useEffect, useMemo, useRef } from "react";
import { APIURL } from "../../../url";
import axios from 'axios';
import { PermissionContext } from "../../../context/permissionContext";
import { useContext } from "react";
import { chennaiCoordinates } from "../MapSection/mapData";
import { VehicleMapData } from "../../vehicleMapContext/vehcileMapContext";
import dayjs from "dayjs";

const useDetailsVehicle = () => {
  const apiUrl = APIURL;
  const [vehiclesData, setVehiclesData] = useState(null);
  const { vehicleListData, setVehicleListData, vehicleSearchDetails, setVehicleSearchDetails } = useContext(PermissionContext)
  const [currentPosition, setCurrentPosition] = useState({ lat: chennaiCoordinates[chennaiCoordinates.length - 1].latitude, lng: chennaiCoordinates[chennaiCoordinates.length - 1].longitude }); // State to animate the marker
  const [currentPosition1, setCurrentPosition1] = useState(null); // State to animate the marker
  const [isPlaying, setIsPlaying] = useState(false); // State to control animation
  const [isPolylineVisible, setIsPolylineVisible] = useState(true); // State
  const [startMarkerPosition, setStartMarkerPosition] = useState(chennaiCoordinates[0])
  const [startMarkerPosition1, setStartMarkerPosition1] = useState(null)
  const [dynamicPolyline, setDynamicPolyline] = useState([]);
  const [trigger, setTrigger] = useState(null);
  const [speedState, setSpeedState] = useState(1000);
  const [speedValuename, setSpeedValuename] = useState("10x")
  const [address, setAddress] = useState("");
  const { vehcilecurrentAddress, setVehiclecurrentAddress } = VehicleMapData();
  // const [startTripLocation, setStartTripLocation] = useState({ latitude: null, longitude: null });
  // const [endTripLocation, setEndTripLocation] = useState({ latitude: null, longitude: null });
  const [startTripLocation, setStartTripLocation] = useState([]);
  const [endTripLocation, setEndTripLocation] = useState([]);
  const [selectedTripid, setSelectedTripid] = useState(null);
  // const [isPlaying, setIsPlaying] = useState(false);
  const [playInterval, setPlayInterval] = useState(null);
  const [filterDate, setFilterDate] = useState()
  const [dateWiseFilter, setDateWiseFilter] = useState(null);
  const [currentDatePoints,setCurrentDatePoints] = useState([]);
  const menuItem = localStorage.getItem('activeMenuItem');

  const togglePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      clearInterval(playInterval); // Stop the animation
    } else {
      handledefault10xDrawPaths(); // Start the animation
    }
  };

  const [rotation, setRotation] = useState(0);
  //   get All vehicles List
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/getAllVehicleDetailsList`);
        console.log(response.data, "vehicle data");
        setVehiclesData(response.data)
        setVehicleListData(response.data)
      }
      catch (err) {
        console.log(err, "error");

      }
    }
    fetchData()
  }, [apiUrl,])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`${apiUrl}/getAllVehicleDetailsList`);
  //       console.log(response.data, "vehicle data");
  //       setVehiclesData(response.data);
  //       setVehicleListData(response.data);
  //     } catch (err) {
  //       console.log(err, "error");
  //     }
  //   };
  
  //   // Set an interval to call the API every 1 second
  //   const intervalId = setInterval(fetchData, 1000);
  
  //   // Cleanup the interval when the component unmounts or apiUrl changes
  //   return () => clearInterval(intervalId);
  // }, [apiUrl]); // The effect will re-run when `apiUrl` changes
  
  

  // get full vehicle details
  useEffect(() => {
    const fetchData = async () => {
      console.log(vehicleSearchDetails, "vehicle nooooo1");

      try {
        if (vehicleSearchDetails !== "") {
          console.log(vehicleSearchDetails, "vehicle nooooo222222");
          const response = await axios.get(`${apiUrl}/getVehicleParticularInfo`, {
            params: { vehicleSearchDetails },
          });
          console.log(response.data, "vehicle particular data");
          setVehicleListData(response.data);
        }
      } catch (err) {
        console.error(err, "error");
      }
    };

    fetchData();
  }, [apiUrl, vehicleSearchDetails,menuItem]);
  useEffect(() => {
    if (dynamicPolyline.length > 1) {
      setCurrentPosition1({
        Lattitude_loc: startMarkerPosition.latitude,
        Longitude_loc: startMarkerPosition.longitude,
      });
    }
  }, [startMarkerPosition]);

  const calculateBearing = (prevPosition, newPosition) => {
    const lat1 = (prevPosition.lat * Math.PI) / 180;
    const lon1 = (prevPosition.lng * Math.PI) / 180;
    const lat2 = (newPosition.lat * Math.PI) / 180;
    const lon2 = (newPosition.lng * Math.PI) / 180;

    const dLon = lon2 - lon1;
    const y = Math.sin(dLon) * Math.cos(lat2);
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
    const bearing = (Math.atan2(y, x) * 180) / Math.PI;

    return (bearing + 360) % 360; // Normalize to 0–360 degrees
  };
  // useEffect(() => {
  //   if (currentPosition && chennaiCoordinates.length > 1) {
  //     const prevPosition = chennaiCoordinates[chennaiCoordinates.length - 2];
  //     const newRotation = calculateBearing(prevPosition, currentPosition);
  //     setRotation(newRotation);
  //   }
  // }, [currentPosition, chennaiCoordinates]);
  // const calculateAngle = (prevPosition, currentPosition) => {
  //   if (!prevPosition || !currentPosition) return 0;

  //   const deltaY = currentPosition.lat - prevPosition.lat;
  //   const deltaX = currentPosition.lng - prevPosition.lng;

  //   const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI); // Convert radians to degrees
  //   return angle;
  // };


  // const handleDrawPaths = () => {
  //     setTrigger((pre) => !pre)
  //     setIsPlaying(true);
  //     setDynamicPolyline([]);
  //     let step = 0;
  //     const totalSteps = chennaiCoordinates.length - 1;

  //     const interval = setInterval(() => {
  //         if (step <= totalSteps) {
  //             const newPoint = {
  //                 lat: chennaiCoordinates[step].latitude,
  //                 lng: chennaiCoordinates[step].longitude,
  //             };
  //             setCurrentPosition(newPoint);

  //             // Update the dynamic polyline to include the new point
  //             setDynamicPolyline((prevPolyline) => [...prevPolyline, newPoint]);
  //             step++;
  //         } else {
  //             clearInterval(interval); // Stop the animation
  //             setIsPlaying(false); // Reset the animation state
  //         }
  //     }, 1000); // Update interval (1 second per step)
  // };
  const handleDrawPaths = () => {
    setTrigger((pre) => !pre);
    setIsPlaying(true);
    setDynamicPolyline([]);
    let step = 0;
    const totalSteps = currentDatePoints.length - 1;
    let prevPosition = null; // Initialize previous position

    const interval = setInterval(() => {
      if (step <= totalSteps) {
        const newPoint = {
          lat: currentDatePoints[step].Lattitude_loc,
          lng: currentDatePoints[step].Longitude_loc,
        };
        const newPoint1 = {
          Lattitude_loc: currentDatePoints[step].Lattitude_loc,
          Longitude_loc: currentDatePoints[step].Longitude_loc,
        };
        // const angle = calculateAngle(prevPosition, newPoint); // Calculate angle
        setCurrentPosition1({ ...newPoint1 }); // Update position with angle

        // Update the dynamic polyline to include the new point
        setDynamicPolyline((prevPolyline) => [...prevPolyline, newPoint]);
        prevPosition = newPoint; // Update previous position
        step++;
      } else {
        clearInterval(interval); // Stop the animation
        setIsPlaying(false); // Reset the animation state
      }
    }, 1000); // Update interval (1 second per step)
  };




  const stepRef = useRef(0); // Persist step across re-renders

  const handledefault10xDrawPaths = () => {
    if (stepRef.current >= currentDatePoints.length) {
      stepRef.current = 0; // Reset when reaching the last point
      setDynamicPolyline([]); // Clear the polyline
    }
    setTrigger((prev) => !prev);
    setIsPlaying(true);

    const totalSteps = currentDatePoints.length - 1;

    const interval = setInterval(() => {
      if (stepRef.current <= totalSteps && speedState) {
        const newPoint = {
          lat: parseFloat(currentDatePoints[stepRef.current].Lattitude_loc),
          lng: parseFloat(currentDatePoints[stepRef.current].Longitude_loc),
        };
        const newPoint1 = {
          Lattitude_loc: parseFloat(currentDatePoints[stepRef.current].Lattitude_loc),
          Longitude_loc: parseFloat(currentDatePoints[stepRef.current].Longitude_loc),
        };
        setCurrentPosition1(newPoint1);
        setDynamicPolyline((prevPolyline) => [...prevPolyline, newPoint]);

        stepRef.current++; // Persist step count
      } else {
        clearInterval(interval);
        setIsPlaying(false);
      }
      setPlayInterval(interval);
    }, speedState);
  };

  const handleChange = (date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");

    setFilterDate(formattedDate);
  };
  // const handledefault10xDrawPaths = () => {
  //   setTrigger((pre) => !pre)
  //   setIsPlaying(true);
  //   setDynamicPolyline([]);
  //   let step = 0;
  //   const totalSteps = chennaiCoordinates.length - 1;

  //   const interval = setInterval(() => {
  //     if (step <= totalSteps && speedState) {
  //       const newPoint = {
  //         lat: chennaiCoordinates[step].latitude,
  //         lng: chennaiCoordinates[step].longitude,
  //       };
  //       setCurrentPosition(newPoint);

  //       setDynamicPolyline((prevPolyline) => [...prevPolyline, newPoint]);
  //       step++;
  //     } else {
  //       clearInterval(interval);
  //       setIsPlaying(false);
  //     }
  //     setPlayInterval(interval);
  //   }, speedState);
  // }
  const handle10xDrawPaths = () => {
    setSpeedState(1000)
  }
  const handle20xDrawPaths = () => {
    setSpeedState(500)
  }
  const handle50xDrawPaths = () => {
    setSpeedState(100)
  }
  // const handle20xDrawPaths = () => {
  //     setTrigger((pre) => !pre)
  //     setIsPlaying(true);
  //     setDynamicPolyline([]);
  //     let step = 0;
  //     const totalSteps = chennaiCoordinates.length - 1;

  //     const interval = setInterval(() => {
  //         if (step <= totalSteps) {
  //             const newPoint = {
  //                 lat: chennaiCoordinates[step].latitude,
  //                 lng: chennaiCoordinates[step].longitude,
  //             };
  //             setCurrentPosition(newPoint);

  //             // Update the dynamic polyline to include the new point
  //             setDynamicPolyline((prevPolyline) => [...prevPolyline, newPoint]);
  //             step++;
  //         } else {
  //             clearInterval(interval); // Stop the animation
  //             setIsPlaying(false); // Reset the animation state
  //         }
  //     }, 500); // Update interval (1 second per step)
  // }
  // const handle50xDrawPaths = () => {
  //     setTrigger((pre) => !pre)
  //     setIsPlaying(true);
  //     setDynamicPolyline([]);
  //     let step = 0;
  //     const totalSteps = chennaiCoordinates.length - 1;

  //     const interval = setInterval(() => {
  //         if (step <= totalSteps) {
  //             const newPoint = {
  //                 lat: chennaiCoordinates[step].latitude,
  //                 lng: chennaiCoordinates[step].longitude,
  //             };
  //             setCurrentPosition(newPoint);

  //             // Update the dynamic polyline to include the new point
  //             setDynamicPolyline((prevPolyline) => [...prevPolyline, newPoint]);
  //             step++;
  //         } else {
  //             clearInterval(interval); // Stop the animation
  //             setIsPlaying(false); // Reset the animation state
  //         }
  //     }, 100); // Update interval (1 second per step)
  // }

  // get current Point Address
  const API_KEY = "AIzaSyCp2ePjsrBdrvgYCQs1d1dTaDe5DzXNjYk";
  // const getAddress = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentPosition?.lat},${currentPosition?.lng}&key=${API_KEY}`
  //       );
  //       if (response.data.status === "OK") {
  //         const formattedAddress = response.data.results[0]?.formatted_address;
  //         setAddress(formattedAddress || "Address not found");
  //         setVehiclecurrentAddress(formattedAddress || "Address not found")
  //       } else {
  //         setAddress("Unable to fetch address");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching address:", error);
  //       setAddress("Error occurred while fetching address");
  //     }
  //   };
  const getAddress = async () => {
    try {
      console.log(currentPosition1,"cccccccccccc");
      if(currentPosition1!==undefined){
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentPosition1?.Lattitude_loc},${currentPosition1?.Longitude_loc}&key=${API_KEY}`
      );

      if (response.data.status === "OK") {
        const addressComponents = response.data.results[0]?.address_components;
        let road = "";
        let area = "";
        let district = "";
        let city = "";
        let state = "";
        let pincode = "";

        addressComponents.forEach(component => {
          if (component.types.includes("route")) {
            road = component.long_name; // Road name
          }
          if (component.types.includes("sublocality") || component.types.includes("sublocality_level_1")) {
            area = component.long_name; // Area name
          }
          if (component.types.includes("administrative_area_level_2")) {
            district = component.long_name; // District (or city in some cases)
          }
          if (component.types.includes("locality")) {
            city = component.long_name; // City (if needed)
          }
          if (component.types.includes("administrative_area_level_1")) {
            state = component.long_name; // State
          }
          if (component.types.includes("postal_code")) {
            pincode = component.long_name; // Pincode
          }
        });

        // If district is empty, use city (sometimes district info is stored as locality)
        if (!district) {
          district = city;
        }

        const formattedAddress = `${road}, ${area}, ${district}, ${state} - ${pincode}`;
        setAddress(formattedAddress || "Address not found");
        setVehiclecurrentAddress(formattedAddress || "Address not found");
      } else {
        setAddress("Unable to fetch address");
      }
    }
    } catch (error) {
      console.log("Error fetching address:", error);
      setAddress("Error occurred while fetching address");
    }
  };


  useEffect(() => {
    // getAddress();

    const startPoint = currentDatePoints?.filter(
      (point) => point.Trip_Status === "Start" && point.Running_Date === filterDate
    );

    const endPoint = currentDatePoints?.filter(
      (point) => point.Trip_Status === "end" && point.Running_Date === filterDate
    );

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

  }, [currentPosition1, filterDate,vehicleListData]);

  // useEffect(() => {    
  //   getAddress();

  //   const filteredCoordinates = chennaiCoordinates.filter((point) => point.TripDate === filterDate);
  //   console.log(filterDate,"ffilterrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr++++++++++++++++++",filteredCoordinates);

  //   // Find all start and end points within the filtered data
  //   const startPoints = filteredCoordinates.filter((point) => point.TripType === "start");
  //   const endPoints = filteredCoordinates.filter((point) => point.TripType === "end");

  //   console.log(startPoints, "Start Points");
  //   console.log(endPoints, "End Points");

  //   // Set multiple start locations as an array
  //   if (startPoints.length > 0) {
  //     setStartTripLocation(startPoints.map(point => ({ latitude: point.latitude, longitude: point.longitude })));
  //   }

  //   // Set multiple end locations as an array (if needed)
  //   if (endPoints.length > 0) {
  //     setEndTripLocation(endPoints.map(point => ({ latitude: point.latitude, longitude: point.longitude })));
  //   }

  // }, [currentPosition, filterDate]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const vehicleNo = vehicleListData?.map((li) => li.vehRegNo);
      
  //     // Ensure filterDate is always a valid date
  //     const selectedDate = filterDate ? filterDate : dayjs().format("YYYY-MM-DD");
  
  //     console.log(vehicleNo,vehicleListData, "Vehicle Numbers", selectedDate, );
  
  //     try {
  //       const response = await axios.post(`${apiUrl}/particularGpsRecords`, {
  //         selectedDate:selectedDate,    
  //         vehicleNumber: vehicleNo
  //       });
  //       const result = response.data;
  //       console.log(result,"gettttttttttttttttttttttttttttttttttttttt");
  //       const timesPoint = result.map(li=>li.TripStartTime);
  //       console.log(timesPoint,"gettttttttttttttttttttttttttttttttttttttttt00000000000000");
  //       const formattedTimesPoint = timesPoint.map(time => {
  //         const [hours, minutes] = time.split(':');
  //         return `${hours}.${minutes}`;
  //       });
        
  //       console.log(formattedTimesPoint,'gettttttttttttttttttttttttttttttttttttttttttttt-------------------');
        
  //       setCurrentDatePoints(response.data);
  //       setStartMarkerPosition1(response.data[0]);
  //       setCurrentPosition1(response.data[result.length-1])
  //       console.log(response.data, "GPS Data Response");
  
  //     } catch (err) {
  //       console.error(err, "Error fetching GPS data");
  //     }
  //   };
  
  //   fetchData();
  // }, [ filterDate,vehicleListData]);

  useEffect(() => {
    const fetchData = async () => {
      const vehicleNo = vehicleListData?.map((li) => li.vehRegNo);
      
      // Ensure filterDate is always a valid date
      const selectedDate = filterDate ? filterDate : dayjs().format("YYYY-MM-DD");
  
      console.log(vehicleNo, vehicleListData, "Vehicle Numbers", selectedDate,vehicleSearchDetails);
  
      try {
        if(selectedDate!=="" || selectedDate!==null){
        const response = await axios.post(`${apiUrl}/particularGpsRecords`, {
          selectedDate: selectedDate,
          vehicleNumber: vehicleSearchDetails
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
        setStartMarkerPosition1(sortedData[0]);
        setCurrentPosition1(sortedData[sortedData.length - 1]);
      }
  
      } catch (err) {
        console.error(err, "Error fetching GPS data");
      }
    };
  
    fetchData();
  }, [filterDate, vehicleListData]);
  
  // console.log(currentPosition1,"uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");
  

  // console.log(currentDatePoints,"currentDatepoints");
  // console.log(startMarkerPosition1,"uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuussssssssssssssssssssssssssssssss");
  

  useEffect(() => {
    const filteredCoordinates = chennaiCoordinates.filter((point) => point.TripDate === filterDate);

    setDateWiseFilter(filteredCoordinates)
  }, [chennaiCoordinates, filterDate])

// console.log(startMarkerPosition,"starttttttttttttttttttttttttttttttttttttt");

  // const tripidOptions = useMemo(() => {
  //   const uniqueTripids = [...new Set(chennaiCoordinates.map(item => item.Tripid))].filter(id => id !== "null");
  //   return uniqueTripids.map(id => ({ label: `${id}`, value: id }));
  // }, [chennaiCoordinates]);
  const tripidOptions = useMemo(() => {
    const filteredTrips = currentDatePoints.filter(item => item.Running_Date === filterDate && item.Trip_id !== "null");

    const uniqueTripids = [...new Set(filteredTrips.map(item => item.Trip_id))];

    return uniqueTripids.map(id => ({ label: `${id}`, value: id }));
  }, [currentDatePoints, filterDate]);

  return {
    vehiclesData, currentPosition, setCurrentPosition, isPolylineVisible, setIsPolylineVisible, isPlaying, setIsPlaying, setStartMarkerPosition, startMarkerPosition, dynamicPolyline,
    handleDrawPaths, handledefault10xDrawPaths, handle10xDrawPaths, handle20xDrawPaths, handle50xDrawPaths, rotation, speedState, address, startTripLocation,
    endTripLocation, tripidOptions, selectedTripid, setSelectedTripid, togglePlayPause, filterDate, handleChange, dateWiseFilter,currentDatePoints,
    startMarkerPosition1,setCurrentPosition1,currentPosition1
  }
}
export default useDetailsVehicle;