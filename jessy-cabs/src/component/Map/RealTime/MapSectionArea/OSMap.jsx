import React,{useEffect, useRef} from "react";
import { MapContainer, TileLayer, Marker, Popup,Tooltip,useMap} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import caricon from "../VehicleSection/VehicleInformationDrawer/mapicon.png";
import Runingicon from "../VehicleSection/VehicleInformationDrawer/Runingicon.png";
import "./osmap.css"




const customIcon = new L.Icon({
  iconUrl: caricon,
  iconSize: [80, 80],
  iconAnchor: [40, 80],
  popupAnchor: [0, -50],
});
const Runingcar = new L.Icon({
  iconUrl: Runingicon,
  iconSize: [80, 80],
  iconAnchor: [40, 80],
  popupAnchor: [0, -50],
});

// Custom blue cluster icon function
const createClusterIcon = (cluster) => {
  const count = cluster.getChildCount();
  return L.divIcon({
    html: `<div style="
      background-color: #007bff;
      color: white;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: bold;
      border: 2px solid white;
    ">${count}</div>`,
    className: "custom-cluster-icon",
    iconSize: [40, 40],
  });
};

// Jessy Cabs Location
const jessyCabsLocation = {
  lat: 13.031207,
  lng: 80.239396,
};

// Function to calculate distance (Haversine formula)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(2); // Distance in km (2 decimal places)
};

// const OSMap = ({ vehicleCurrentLocation,todayVehicle }) => {
//   const [lastVehicle, setLastVehicle] = useState(null);

//   const [intervalTrigger, setIntervalTrigger] = useState(0); // State for triggering updates
// console.log(vehicleCurrentLocation,vehicleCurrentLocation.length,"checkkkkkkkkkkkkk");

//   useEffect(() => {
//     const updateLastVehicle = () => {
//       if (todayVehicle?.length) {
//         setLastVehicle(todayVehicle[todayVehicle.length - 1]);
//       }
//       // setIntervalTrigger((prev) => prev + 1); 
//     };

//     updateLastVehicle(); // Initial update
//     console.log("Updating last vehicle...");

//     const interval = setInterval(updateLastVehicle, 3000);

//     return () => clearInterval(interval);
//   }, [todayVehicle]); 
// console.log(lastVehicle,"lastttttttttttttttttttttt",todayVehicle);

//   return (
//     <div style={{ height: "100vh", width: "100vw" }}>
//       <MapContainer center={[13.080555, 80.163118]} zoom={13} style={{ height: "100%", width: "100%" }}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />

//         {/* Marker Cluster Group with Custom Blue Cluster */}
//         <MarkerClusterGroup iconCreateFunction={createClusterIcon}>
//           {lastVehicle && (
//             <Marker
//               position={[parseFloat(lastVehicle.Latitude_loc), parseFloat(lastVehicle.Longtitude_loc)]}
//               icon={customIcon}
//             >
//               <Popup>
//                 <div><strong>Vehicle No:</strong> {lastVehicle.Vehicle_No}</div>
//                 <div><strong>Group:</strong> {lastVehicle.Group}</div>
//                 <div><strong>Driver:</strong> {lastVehicle.Driver}</div>
//                 <div><strong>Location:</strong> {lastVehicle.Location}</div>
//                 <div><strong>Nearest Address:</strong> {lastVehicle.Nearest_Address}</div>
//                 <div><strong>Distance to Jessy Cabs:</strong> {calculateDistance(jessyCabsLocation.lat, jessyCabsLocation.lng, parseFloat(lastVehicle.Latitude_loc), parseFloat(lastVehicle.Longtitude_loc))} km</div>
//               </Popup>
//             </Marker>
//           )}
//         </MarkerClusterGroup>
//       </MapContainer>
//     </div>
//   );
// };



//this component for Autozooming

const MapAutoZoom = ({ hover, todayVehicle }) => {
  const map = useMap();
  const hasAutoZoomed = useRef(false);
  useEffect(() => {
    if (hover?.vehRegNo && todayVehicle?.length > 0) {
      const matchedVehicle = todayVehicle.find(
        (v) => v.Vehicle_No === hover.vehRegNo
      );

      if (matchedVehicle?.Latitude_loc && matchedVehicle?.Longtitude_loc) {
        const lat = parseFloat(matchedVehicle.Latitude_loc);
        const lng = parseFloat(matchedVehicle.Longtitude_loc);
        map.flyTo([lat, lng], 14, { duration: 1.5 });
        return; 
      }
    }

  if (!hover && !hasAutoZoomed.current && todayVehicle?.length > 0) {
      const bounds = todayVehicle
        .filter(v => v.Latitude_loc && v.Longtitude_loc)
        .map(v => [parseFloat(v.Latitude_loc), parseFloat(v.Longtitude_loc)]);

      if (bounds.length > 0) {
        const leafletBounds = L.latLngBounds(bounds);
        map.flyToBounds(leafletBounds, { padding: [60, 60], duration: 1.5 });
        hasAutoZoomed.current = true; 
      }
    }

  }, [hover, todayVehicle, map]);

  return null;
};

const OSMap = ({todayVehicle,hover }) => {
  // console.log(vehicleCurrentLocation, vehicleCurrentLocation.length, "checkkkkkkkkkkkkk");
  // const center = useMemo(() => ({  lat: 13.080555,lng: 80.163118, }), [todayVehicle]);
// console.log(todayVehicle,"kk")

  // console.log(hover, " hoveredvalues");
  // console.log(todayVehicle, "today vehilce");
  
 const vehicleDetails = hover?.vehRegNo
  ? todayVehicle?.filter(v => v.Vehicle_No === hover.vehRegNo)?.map(v => ({
      ...v,
      ...hover
    }))
  : todayVehicle;

// console.log(vehicleDetails?.[0]?.Latitude_loc,"checkingggg");


  // return (
  //   // <div style={{ height: "100vh", width: "100vw" }}>
  //     <MapContainer center={[13.080555, 80.163118]} zoom={13} minZoom={1}  // Prevent zooming out too much
  //     // <MapContainer center={center} zoom={13} minZoom={1}
  //     maxZoom={19} style={{ height: "90%", width: "100%" }}>
  //       <TileLayer
  //         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  //         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  //       />

  //       {/* Marker Cluster Group with Custom Blue Cluster */}
  //       <MarkerClusterGroup iconCreateFunction={createClusterIcon}>
  //         {todayVehicle?.map((vehicle, index) => (
  //           <Marker
  //             key={index}
  //             position={[parseFloat(vehicle.Latitude_loc), parseFloat(vehicle.Longtitude_loc)]}
  //             icon={vehicle.Trip_Status === "On_Going" ? Runingcar : customIcon }
  //           >
              
  //               <Tooltip className="tooltip" direction="top"  offset={[0, -60]} opacity={1} permanent>
  //   <div style={{backgroundColor: '#203254', fontWeight: 'bold',
  //   color: '#FFF', borderRadius: '6px', boxShadow: '0px 2px 6px rgba(0,0,0,0.3)', width: '70px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', textAlign: 'center', overflow: 'hidden',padding: '2px',}}>
  //     {/* {vehicle.Vehicle_No} or any text you want */}
  //     {vehicle?.Vehicle_No.slice(-4)}

  //   </div>
  // </Tooltip>

  //             <Popup>
  //               <div><strong>Vehicle No:</strong> {vehicle.Vehicle_No}</div>
  //               <div><strong>Group1:</strong> {vehicle.Group}</div>
  //               <div><strong>Driver:</strong> {vehicle.Driver}</div>
  //               <div><strong>Location:</strong> {vehicle.Location}</div>
  //               <div><strong>Nearest Address:</strong> {vehicle.Nearest_Address}</div>
  //               <div><strong>Distance to Jessy Cabs:</strong> {calculateDistance(jessyCabsLocation.lat, jessyCabsLocation.lng, parseFloat(vehicle.Latitude_loc), parseFloat(vehicle.Longtitude_loc))} km</div>
  //             </Popup>
  //           </Marker>
  //         ))}
  //       </MarkerClusterGroup>
  //     </MapContainer>
  //   // </div>
  // );
  return (
    // <div style={{ height: "100vh", width: "100vw" }}>
      <MapContainer center={[13.080555, 80.163118]} zoom={13} minZoom={1}  // Prevent zooming out too much
      // <MapContainer center={center} zoom={13} minZoom={1}
      maxZoom={19} style={{ height: "90%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

         <MapAutoZoom hover={hover} todayVehicle={todayVehicle} />
        {/* Marker Cluster Group with Custom Blue Cluster */}
        <MarkerClusterGroup iconCreateFunction={createClusterIcon}>
          {vehicleDetails?.map((vehicle, index) => (
            <Marker
              key={index}
              position={[parseFloat(vehicle.Latitude_loc), parseFloat(vehicle.Longtitude_loc)]}
              icon={vehicle.Trip_Status === "On_Going" ? Runingcar : customIcon }
            >
              
                <Tooltip className="tooltip" direction="top"  offset={[0, -60]} opacity={1} permanent>
    <div style={{backgroundColor: '#203254', fontWeight: 'bold',
    color: '#FFF', borderRadius: '6px', boxShadow: '0px 2px 6px rgba(0,0,0,0.3)', width: '70px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', textAlign: 'center', overflow: 'hidden',padding: '2px',}}>
      {/* {vehicle.Vehicle_No} or any text you want */}
      {vehicle?.Vehicle_No.slice(-4)}

    </div>
  </Tooltip>

              <Popup>
                <div><strong>Vehicle No:</strong> {vehicle.Vehicle_No}</div>
                <div><strong>Group1:</strong> {vehicle.Group}</div>
                <div><strong>Driver:</strong> {vehicle.Driver}</div>
                <div><strong>Location:</strong> {vehicle.Location}</div>
                <div><strong>Nearest Address:</strong> {vehicle.Nearest_Address}</div>
                <div><strong>Distance to Jessy Cabs:</strong> {calculateDistance(jessyCabsLocation.lat, jessyCabsLocation.lng, parseFloat(vehicle.Latitude_loc), parseFloat(vehicle.Longtitude_loc))} km</div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    // </div>
  );
};

export default OSMap;
