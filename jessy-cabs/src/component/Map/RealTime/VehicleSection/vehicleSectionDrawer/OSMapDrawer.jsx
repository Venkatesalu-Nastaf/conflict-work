import React,{useState,useRef} from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import blackicon from '../VehicleInformationDrawer/blackmapicon.png';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { Button} from '@mui/material';

const customIcon = new L.Icon({
  iconUrl: require("leaflet/dist/images/marker-icon.png"), // Default marker
  iconSize: [25, 41], // Size of the icon
  iconAnchor: [12, 41], // Anchor point of the icon
  popupAnchor: [1, -34], // Popup position
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"), // Shadow
  shadowSize: [41, 41], // Shadow size
});

const blackCircleIcon = new L.Icon({
  iconUrl: blackicon,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [1, -10],
});

const OSMapDrawer = ({ vehicleCurrentLocation, vehNo, startMarkerPosition, currentPosition, currentDatePoints, startTripLocation, endTripLocation, tripWayPoints,todayVehicle }) => {
  const defaultCenter = [12.9716, 77.5946];

  // Extract start and current position
  // const startLat = startMarkerPosition?.Lattitude_loc;
  // const startLng = startMarkerPosition?.Longitude_loc;
  // Check if startTripLocation is a valid object with latitude and longitude
  const startLat = startTripLocation && startTripLocation[0]?.latitude ? startTripLocation[0]?.latitude : startMarkerPosition?.Lattitude_loc;
  const startLng = startTripLocation && startTripLocation[0]?.longitude ? startTripLocation[0]?.longitude : startMarkerPosition?.Longitude_loc;



  // Logging for debug
  console.log("Start Trip Location:", startTripLocation);
  console.log("Start Latitude:", startLat, "Start Longitude:", startLng);

  // const currentLat = currentPosition?.Lattitude_loc;
  // const currentLng = currentPosition?.Longitude_loc;
  const currentLat = endTripLocation && endTripLocation[0]?.latitude ? endTripLocation[0]?.latitude : currentPosition?.Lattitude_loc;
  const currentLng = endTripLocation && endTripLocation[0]?.longitude ? endTripLocation[0]?.longitude : currentPosition?.Longitude_loc;

  console.log("Start Marker Position:", startMarkerPosition);
  console.log("Current Date Points:", currentDatePoints);
  console.log(startTripLocation, "startTripLocation");
  console.log(endTripLocation, "endTripLocation");
  const [isPlaying, setIsPlaying] = useState(false); // State to control animation
  const [playInterval, setPlayInterval] = useState(null);
  const [speedState, setSpeedState] = useState(1000);
  const [dynamicPolyline, setDynamicPolyline] = useState([]);


  // Extract lat-lng coordinates from currentDatePoints for Polyline
  // const polylineCoordinates = currentDatePoints?.map(point => [
  //   parseFloat(point.Lattitude_loc),
  //   parseFloat(point.Longitude_loc)
  // ]) || [];
  // Extract lat-lng coordinates for Polyline
  console.log(startTripLocation, "ssssssssssssssssssssssss000000000000000000");
console.log(todayVehicle,"kkkkkkkkkkkkkkkkkk----------");

  const polylineCoordinates =
    startTripLocation?.length > 0 && endTripLocation?.length > 0
      ? [
        [
          parseFloat(startTripLocation[0]?.latitude || startTripLocation[0]?.Lattitude_loc),
          parseFloat(startTripLocation[0]?.longitude || startTripLocation[0]?.Longitude_loc),
        ],
        ...(tripWayPoints?.map(point => [
          parseFloat(point.latitude || point.Lattitude_loc),

          parseFloat(point.longitude || point.Longitude_loc),
        ]) || []),
        [
          parseFloat(endTripLocation[0]?.latitude || endTripLocation[0]?.Lattitude_loc),
          parseFloat(endTripLocation[0]?.longitude || endTripLocation[0]?.Longitude_loc),
        ],
      ]
      : currentDatePoints?.map(point => [
        parseFloat(point.latitude || point.Lattitude_loc),
        parseFloat(point.longitude || point.Longitude_loc),
      ]) || [];

      const togglePlayPause = () => {
        if (isPlaying) {
          setIsPlaying(false);
          clearInterval(playInterval); // Stop the animation
        } else {
          handledefault10xDrawPaths(); // Start the animation
        }
      };

      const stepRef = useRef(0); // Persist step across re-renders

      const handledefault10xDrawPaths = () => {
        if (stepRef.current >= currentDatePoints.length) {
          stepRef.current = 0; // Reset when reaching the last point
          setDynamicPolyline([]); // Clear the polyline
        }
        // setTrigger((prev) => !prev);
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
            // setCurrentPosition(newPoint1);
            setDynamicPolyline((prevPolyline) => [...prevPolyline, newPoint]);
    
            stepRef.current++; // Persist step count
          } else {
            clearInterval(interval);
            setIsPlaying(false);
          }
          setPlayInterval(interval);
        }, speedState);
      };
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <MapContainer
        center={startLat && startLng ? [parseFloat(startLat), parseFloat(startLng)] : defaultCenter}
        zoom={13}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Start Position Marker */}
        {startLat && startLng && (
          <Marker position={[parseFloat(startLat), parseFloat(startLng)]} icon={customIcon}>
            <Popup>
              Vehicle No: {vehNo} <br />
              Trip Status: {startMarkerPosition?.Trip_Status}
            </Popup>
          </Marker>
        )}

        {/* Current Position Marker */}
        {currentLat && currentLng && (
          <Marker position={[parseFloat(currentLat), parseFloat(currentLng)]} icon={blackCircleIcon}>
            <Popup>
              Vehicle No: {vehNo} <br />
              Trip Status: {currentPosition?.Trip_Status}
            </Popup>
          </Marker>
        )}

        {/* Polyline for tracking vehicle movement */}
        {polylineCoordinates.length > 1 && (
          <Polyline positions={polylineCoordinates} color="blue" weight={4} />
        )}

      </MapContainer>
      <div className='playArrow'>
        <Button onClick={togglePlayPause}>
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </Button>

      </div>
    </div>
  );
};

export default OSMapDrawer;
