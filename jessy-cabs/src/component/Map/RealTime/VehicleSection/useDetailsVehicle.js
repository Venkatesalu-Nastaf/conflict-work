import React, { useState, useEffect } from "react";
import { APIURL } from "../../../url";
import axios from 'axios';
import { PermissionContext } from "../../../context/permissionContext";
import { useContext } from "react";
import { chennaiCoordinates } from "../MapSection/mapData";
import { VehicleMapData } from "../../vehicleMapContext/vehcileMapContext";

const useDetailsVehicle = () => {
  const apiUrl = APIURL;
  const [vehiclesData, setVehiclesData] = useState(null);
  const { vehicleListData, setVehicleListData, vehicleSearchDetails, setVehicleSearchDetails } = useContext(PermissionContext)
  const [currentPosition, setCurrentPosition] = useState({ lat: chennaiCoordinates[chennaiCoordinates.length - 1].latitude, lng: chennaiCoordinates[chennaiCoordinates.length - 1].longitude }); // State to animate the marker
  const [isPlaying, setIsPlaying] = useState(false); // State to control animation
  const [isPolylineVisible, setIsPolylineVisible] = useState(true); // State
  const [startMarkerPosition, setStartMarkerPosition] = useState(chennaiCoordinates[0])
  const [dynamicPolyline, setDynamicPolyline] = useState([]);
  const [trigger, setTrigger] = useState(null);
  const [speedState, setSpeedState] = useState(1000);
  const [speedValuename, setSpeedValuename] = useState("10x")
  const [address, setAddress] = useState("");
  const { vehcilecurrentAddress, setVehiclecurrentAddress } = VehicleMapData();
  const [startTripLocation, setStartTripLocation] = useState({ latitude: null, longitude: null });
  const [endTripLocation,setEndTripLocation] = useState({ latitude: null, longitude: null });


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
  }, [apiUrl])

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
  }, [apiUrl, vehicleSearchDetails]);
  useEffect(() => {
    if (dynamicPolyline.length > 1) {
      setCurrentPosition({
        lat: startMarkerPosition.latitude,
        lng: startMarkerPosition.longitude,
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
  useEffect(() => {
    if (currentPosition && chennaiCoordinates.length > 1) {
      const prevPosition = chennaiCoordinates[chennaiCoordinates.length - 2];
      const newRotation = calculateBearing(prevPosition, currentPosition);
      setRotation(newRotation);
    }
  }, [currentPosition, chennaiCoordinates]);
  const calculateAngle = (prevPosition, currentPosition) => {
    if (!prevPosition || !currentPosition) return 0;

    const deltaY = currentPosition.lat - prevPosition.lat;
    const deltaX = currentPosition.lng - prevPosition.lng;

    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI); // Convert radians to degrees
    return angle;
  };
   

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
    const totalSteps = chennaiCoordinates.length - 1;
    let prevPosition = null; // Initialize previous position

    const interval = setInterval(() => {
      if (step <= totalSteps) {
        const newPoint = {
          lat: chennaiCoordinates[step].latitude,
          lng: chennaiCoordinates[step].longitude,
        };

        const angle = calculateAngle(prevPosition, newPoint); // Calculate angle
        setCurrentPosition({ ...newPoint, angle }); // Update position with angle

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

  useEffect(() => {
    if (speedValuename === "10x") {
      setSpeedState(1000)
    }
    if (speedValuename === "20x") {
      setSpeedState(500)
    }
    if (speedValuename === "50x") {
      setSpeedState(100)
    }
  }, [speedValuename])






  const handledefault10xDrawPaths = () => {
    setTrigger((pre) => !pre)
    setIsPlaying(true);
    setDynamicPolyline([]);
    let step = 0;
    const totalSteps = chennaiCoordinates.length - 1;

    const interval = setInterval(() => {
      if (step <= totalSteps && speedState) {
        const newPoint = {
          lat: chennaiCoordinates[step].latitude,
          lng: chennaiCoordinates[step].longitude,
        };
        setCurrentPosition(newPoint);

        setDynamicPolyline((prevPolyline) => [...prevPolyline, newPoint]);
        step++;
      } else {
        clearInterval(interval);
        setIsPlaying(false);
      }
    }, speedState);
  }
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
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentPosition?.lat},${currentPosition?.lng}&key=${API_KEY}`
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
    } catch (error) {
        console.error("Error fetching address:", error);
        setAddress("Error occurred while fetching address");
    }
};


  useEffect(() => {
    getAddress()
    const startPoint = chennaiCoordinates.find((point) => point.TripType === "start");
    const endPoint = chennaiCoordinates.find((point) => point.TripType === "end");


    if (startPoint) {
      setStartTripLocation({ latitude: startPoint.latitude, longitude: startPoint.longitude });
    }
    if(endPoint){
      setEndTripLocation({latitude:endPoint?.latitude,longitude:endPoint?.longitude})
    }
  }, [currentPosition])
  console.log(address, "current address");

  return {
    vehiclesData, currentPosition, setCurrentPosition, isPolylineVisible, setIsPolylineVisible, isPlaying, setIsPlaying, setStartMarkerPosition, startMarkerPosition, dynamicPolyline,
    handleDrawPaths, handledefault10xDrawPaths, handle10xDrawPaths, handle20xDrawPaths, handle50xDrawPaths, rotation, speedState, address,startTripLocation,
    endTripLocation
  }
}
export default useDetailsVehicle;