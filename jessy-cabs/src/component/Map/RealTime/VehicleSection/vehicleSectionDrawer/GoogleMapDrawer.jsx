import React, { useMemo, useState } from "react";
import { GoogleMap, LoadScript, MarkerF, useJsApiLoader, Polyline, InfoBox ,InfoWindow} from "@react-google-maps/api";
import { MarkerClustererF } from "@react-google-maps/api";
// import caricon from "../VehicleSection/VehicleInformationDrawer/mapicon.png"
import caricon from "../../VehicleSection/VehicleInformationDrawer/mapicon.png"
import startPointIcon from "../VehicleInformationDrawer/startPointIcon.png"
import startpoint from "../VehicleInformationDrawer/startpoint.png"
import Reach from "../VehicleInformationDrawer/Reach.png"
// import VehicleDetailsPopup from '../../VehicleModal/VehicleDetailsPopup';
import VehicleDetailsPopup from '../../../VehicleModal/VehicleDetailsPopup';
// import { VehicleMapData } from "../vehicleMapContext/vehcileMapContext"
import { VehicleMapData } from "../../../vehicleMapContext/vehcileMapContext"



// const GoogleMapDrawer = ()=>{
//     return(
//         <>
//         <div>
//             Google Map
//         </div>
//         </>
//     )
// }

const containerStyle = {
  width: "100%",
  height: "500px",
};


const GoogleMapDrawer = ({ vehNo, startMarkerPosition, currentPosition, currentDatePoints, }) => {
  // const defaultCenter = [12.9716, 77.5946];
    const [clickPosition, setClickPosition] = useState({ top: 0, left: 0 });
  // console.log(startMarkerPosition, currentPosition, currentDatePoints, "lang1111", vehNo)
   const {vehiclePoint, setVehiclePoint } = VehicleMapData();
  // const startTripLocation = startMarkerPosition && startMarkerPosition[0].Latitude_loc ? startMarkerPosition[0].Latitude_loc : 0


  // const center = useMemo(() => ({ lat: 13.080555, lng: 80.163118, }), [vehNo]);
  // lat: parseFloat(startMarkerPosition.Latitude_loc),
  // lng: parseFloat(startMarkerPosition.Longtitude_loc),
  const center = useMemo(() => ({ lat:parseFloat(startMarkerPosition.Latitude_loc), lng:parseFloat(startMarkerPosition.Longtitude_loc), }), [vehNo]);

  // const [showStartInfoBox, setShowStartInfoBox] = useState(false);
  const [showInfoBox, setShowInfoBox] = useState(false);
  // const center = useMemo(() => ({  lat: 13.080555,lng: 80.163118, }), []);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCn47dR5-NLfhq0EqxlgaFw8IEaZO5LnRE",
  });
  console.log(isLoaded, "lo")

  //  if (!isLoaded) {
  //    return <div>Loading...</div>;
  //  }
  const handlestartLocation = (location, e) => {
    console.log(location, "weeeeeeeeeeeeeeeeeeeeeee");
    console.log(e, "Mouse Event Data", e?.domEvent?.clientX, "wwwwww");

    const lat = parseFloat(location?.Latitude_loc);
    const lng = parseFloat(location?.Longtitude_loc);

   
    setClickPosition({
      lat,
      lng,
      pixelX: e?.domEvent?.clientX, 
      pixelY: e?.domEvent?.clientY, 
      vehno: location?.Vehicle_No
    });

    setVehiclePoint(true);
    console.log(lat, "Addressss111111", lng);

    // Reverse Geocoding to get Address
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results[0]) {
        console.log("Addressss:", results[0].formatted_address);
        setClickPosition(prev => ({
          ...prev,
          address: results[0].formatted_address // Add address to state
        }));
      } else {
        console.error("Geocoder failed due to:", status);
      }
    });
    // const origin = new window.google.maps.LatLng(jessyCabsLocation?.lat, jessyCabsLocation?.lng);
    // const destination = new window.google.maps.LatLng(parseFloat(location?.Lattitude_loc), parseFloat(location?.Longitude_loc));
    // console.log(destination, "mainnnnnnnnnnnn33333333", destination,);

    // const service = new window.google.maps.DistanceMatrixService();
    // service.getDistanceMatrix(
    //   {
    //     origins: [origin],
    //     destinations: [destination],
    //     travelMode: "DRIVING",
    //   },
    //   (response, status) => {
    //     console.log(status, "mainnnnnnnnnnnn");

    //     if (status === "OK") {
    //       const distanceText = response.rows[0].elements[0].distance.text;
    //       console.log(distanceText, "mainnnnnnnnnnnn111111111111");
    //       setOfficeDistance(distanceText)
    //       return
    //     } else {
    //       console.log(response, "mainnnnnnnnnnnn2222222222222");

    //     }
    //   }
    // );
  };




  return (
    // <LoadScript>
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
    >
{currentDatePoints.length > 0 && (
  <>
      <Polyline
        path={currentDatePoints?.map((point) => ({
          lat: parseFloat(point?.Latitude_loc),  // Convert string to float
          lng: parseFloat(point?.Longtitude_loc),
        }))}
        
        options={{
          strokeColor:"blue",
          strokeOpacity: 0.8,
          strokeWeight: 6,
        }}
      />


      <MarkerF
        key={startMarkerPosition.veh_id}
        position={{
          lat: parseFloat(startMarkerPosition.Latitude_loc),
          lng: parseFloat(startMarkerPosition.Longtitude_loc),
        }}
        title="startPosition"



        onClick={(e) => handlestartLocation(startMarkerPosition,e)} // Pass clicked location
        icon={{
          url: startpoint,
          scaledSize: new window.google.maps.Size(24, 24),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(12, 12),
          fillColor:"green"
        }}
        // onClick={() => setShowInfoBox(!showInfoBox)}
      />
    

{vehiclePoint && <VehicleDetailsPopup position={clickPosition} setVehiclePoint={setVehiclePoint} officeDistance={''} />}




      <MarkerF
        key={currentPosition.veh_id}
        position={{
          lat: parseFloat(currentPosition.Latitude_loc),
          lng: parseFloat(currentPosition.Longtitude_loc),
        }}
        title="ReachedPosition"
        onClick={(e) => handlestartLocation(currentPosition,e)} // Pass clicked location
        icon={{
          url:Reach,
          scaledSize: new window.google.maps.Size(24, 24),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(12, 12),
        }}
      />
      </>
)}

    </GoogleMap>
    // </LoadScript>
  );
};
export default GoogleMapDrawer;