import React, { useMemo, useState,useRef, useEffect } from "react";
import { GoogleMap, LoadScript, MarkerF, useJsApiLoader, Polyline, InfoBox ,InfoWindow} from "@react-google-maps/api";
// import { MarkerClustererF } from "@react-google-maps/api";
// import caricon from "../VehicleSection/VehicleInformationDrawer/mapicon.png"
import caricon from "../../VehicleSection/VehicleInformationDrawer/mapicon.png"
// import startPointIcon from "../VehicleInformationDrawer/startPointIcon.png"
// import startpoint from "../VehicleInformationDrawer/startpoint.png"
import endMarkerIcon from '../../../../Bookings/TripSheet/NavigationMap/endMarkerIcon.png'
import StartMarkerIcon from '../../../../Bookings/TripSheet/NavigationMap/StartMarkerIcon.png'
// import Reach from "../VehicleInformationDrawer/Reach.png"
// import VehicleDetailsPopup from '../../VehicleModal/VehicleDetailsPopup';
import VehicleDetailsPopup from '../../../VehicleModal/VehicleDetailsPopup';
// import { VehicleMapData } from "../vehicleMapContext/vehcileMapContext"
import { VehicleMapData } from "../../../vehicleMapContext/vehcileMapContext"
import { ApiKey } from "../../../../ApiKey/mapApiKey";


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


const GoogleMapDrawer = ({ vehNo, startMarkerPosition, currentPosition, currentDatePoints,dynamicPolyline,moveposition}) => {
  const mapRef = useRef(null); 
  // const defaultCenter = [12.9716, 77.5946];
    const [clickPosition, setClickPosition] = useState({ top: 0, left: 0 });
    const [prevPosition, setPrevPosition] = useState(null);
    const [calcdatavalue,setCalcDataValue]=useState({"jesscycabslat":0,"jesscycabslong":0,"Userlat":0,"Userlng":0})
  // console.log(startMarkerPosition, currentPosition, currentDatePoints, "lang1111", vehNo)
   const {vehiclePoint, setVehiclePoint } = VehicleMapData();
  // const startTripLocation = startMarkerPosition && startMarkerPosition[0].Latitude_loc ? startMarkerPosition[0].Latitude_loc : 0


  // const center = useMemo(() => ({ lat: 13.080555, lng: 80.163118, }), [vehNo]);
  // lat: parseFloat(startMarkerPosition.Latitude_loc),
  // lng: parseFloat(startMarkerPosition.Longtitude_loc),
  
  // const center = useMemo(() => ({ lat:parseFloat(startMarkerPosition.Latitude_loc) || 21.7679, lng:parseFloat(startMarkerPosition.Longtitude_loc ) || 78.8718, }), [vehNo,startMarkerPosition]);
  // const center = useMemo(() => ({ lat:parseFloat(startMarkerPosition.Latitude_loc), lng:parseFloat(startMarkerPosition.Longtitude_loc )}), [vehNo,startMarkerPosition]);
  const center = useMemo(() => {
    if (startMarkerPosition && Object.keys(startMarkerPosition).length > 0  ) {
      // console.log(startMarkerPosition,"val2222sttt")
      return {
        lat: parseFloat(startMarkerPosition.Latitude_loc),
        lng: parseFloat(startMarkerPosition.Longtitude_loc),
      };
    }
    else{
    return { lat: 21.7679, lng: 78.8718 }; // Default India center
    }
  }, [vehNo, startMarkerPosition]);

  // console.log(center, "Updated Center");
  // console.log(center,"val222jjjjj",startMarkerPosition,Object.keys(startMarkerPosition).length > 0)
  // const [zoom, setZoom] = useState(19);
  // const zoom = startMarkerPosition ? 15 : 4
  const zoom = useMemo(() => {
    if (startMarkerPosition && Object.keys(startMarkerPosition).length > 0  ) {
      // console.log(startMarkerPosition,"val2222sttt")
      return 15
    }
    else{
    return 4; // Default India center
    }
  }, [vehNo, startMarkerPosition]);
  // console.log(zoom,"val22222111zoom")
  //  console.log(dynamicPolyline,"poly")

  // const [showStartInfoBox, setShowStartInfoBox] = useState(false);
  // const [showInfoBox, setShowInfoBox] = useState(false);
  // const center = useMemo(() => ({  lat: 13.080555,lng: 80.163118, }), []);
  const { isLoaded } = useJsApiLoader({
    // googleMapsApiKey: "AIzaSyCn47dR5-NLfhq0EqxlgaFw8IEaZO5LnRE",
    googleMapsApiKey: ApiKey,
  });
  console.log(isLoaded, "lo")

  //  if (!isLoaded) {
  //    return <div>Loading...</div>;
  //  }
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    // console.log(lat1, lon1, lat2, lon2,"tolldwatch",typeof(lat1), typeof(lon1), typeof(lat2),typeof(lon2),)
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Earth's radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    // console.log(c,"tolldcall")
    return (R * c).toFixed(2); // Distance in km (2 decimal places)
  };


  const handlestartLocation = (location, e) => {
    console.log(location, "weeeeeeeeeeeeeeeeeeeeeee");
    console.log(e, "Mouse Event Data", e?.domEvent?.clientX, "wwwwww");

    const lat = parseFloat(location?.Latitude_loc);
    const lng = parseFloat(location?.Longtitude_loc);
    
      const jessyCabsLocation = {
      lat: 13.031207,
      lng: 80.239396,
    };
    setCalcDataValue({"jesscycabslat":jessyCabsLocation.lat,"jesscycabslong":jessyCabsLocation.lng,"Userlat":lat,"Userlng":lng})
    //  const  latjesscy = 13.031207 
    //  const  lngjessyc = 80.239396
   
   
    setClickPosition({
      lat,
      lng,
      pixelX: e?.domEvent?.clientX, 
      pixelY: e?.domEvent?.clientY, 
      vehno: location?.Vehicle_No
    });

    setVehiclePoint(true);

    // console.log(lat, "Addressss111111", lng);

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

    // const jessyCabsLocation = {
    //   lat: 13.031207,
    //   lng: 80.239396,
    // };
   
  
   



    
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
  
  
  // const handleZoomChange = useCallback(() => {
  //   if (map) {
  //     const newZoom = map.getZoom();
  //     console.log("Zoom changed to:", newZoom);
  //     setZoom(newZoom);
  //   }
  // }, []);

  // const [map, setMap] = useState(null);
// useEffect(()=>{    // mapRef.current = map;

//     if (mapRef.current && startMarkerPosition ) {
//       console.log("val222enetruseefffect",mapRef.current)
//      const bounds = new window.google.maps.LatLngBounds();
//       bounds.extend({
//         lat: parseFloat(startMarkerPosition.Latitude_loc),
//         lng: parseFloat(startMarkerPosition.Longtitude_loc),
//       });
//       bounds.extend({
//         lat: parseFloat(currentPosition.Latitude_loc),
//         lng: parseFloat(currentPosition.Longtitude_loc),
//       });

//       console.log(bounds, "val222Updated Bounds");
//       setZoom(15)
//       mapRef.current.fitBounds(bounds); 
//     // Adjust zoom to fit both markers
//     } else {
//       console.log(mapRef.current,"val2222233currenr") 
//       setZoom(4)
//     }
//   },[startMarkerPosition,currentPosition,vehNo])
// const onLoad = (map) => {
//     mapRef.current = map;
//   };


// const calculateRotation = (currentPos) => {
//   console.log(currentPos,"tolldcallll")
//   if (!currentPos) return 0;

//   const latDiff = currentPos.lat;
//   const lngDiff = currentPos.lng;

//   const angle = (Math.atan2(latDiff, lngDiff) * 180) / Math.PI;
//   console.log(angle,"tolld")
  
//   return angle;
// };
const OPTIONS = {
  minZoom: 4,
  maxZoom: 30,
}
// console.log(dynamicPolyline,"tolldpolyyyyy",moveposition)

  return (
    // <LoadScript>
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      options = {OPTIONS}
      
      // onLoad={onLoad}
      // onZoomChanged={handleZoomChange} //
    >
      {dynamicPolyline.length > 0 ? (
                                                  <Polyline
                                                      path={dynamicPolyline}
                                                      options={{
                                                          strokeColor: "#189df3",
                                                          strokeOpacity: 0.8,
                                                          strokeWeight: 6,
                                                      }}
                                                      
                                                  />
                                              ):<>
{/* {currentDatePoints.length > 0 && (
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
)} */}
{/* {currentDatePoints.length > 0 && ( */}
  
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
      </>
}
      {/* )} */}


      <MarkerF
        key={startMarkerPosition.veh_id}
        position={{
          lat: parseFloat(startMarkerPosition.Latitude_loc),
          lng: parseFloat(startMarkerPosition.Longtitude_loc),
        }}
        title="startPosition"



        onClick={(e) => handlestartLocation(startMarkerPosition,e)} // Pass clicked location
        icon={{
          url: StartMarkerIcon,
          scaledSize: new window.google.maps.Size(40, 40),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(12, 12),
          fillColor:"green"
        }}
        // onClick={() => setShowInfoBox(!showInfoBox)}
      />

{moveposition && (
    <MarkerF
        position={moveposition}
        icon={{
            url:caricon, // Replace with your car icon URL
            scaledSize: new window.google.maps.Size(30, 30),
            anchor: new window.google.maps.Point(15, 15),
          
            
             // Apply rotation
        }}
    />
)}



{vehiclePoint && <VehicleDetailsPopup position={clickPosition} setVehiclePoint={setVehiclePoint} officeDistance={calculateDistance(calcdatavalue.jesscycabslat,calcdatavalue.jesscycabslong,calcdatavalue.Userlat,calcdatavalue.Userlng)} />}




      <MarkerF
        key={currentPosition.veh_id}
        position={{
          lat: parseFloat(currentPosition.Latitude_loc),
          lng: parseFloat(currentPosition.Longtitude_loc),
        }}
        title="ReachedPosition"
        onClick={(e) => handlestartLocation(currentPosition,e)} // Pass clicked location
        icon={{
          url:endMarkerIcon,
          scaledSize: new window.google.maps.Size(40, 40),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(12, 12),
        }}
      />
      




    </GoogleMap>
    // </LoadScript>
  );
};
export default GoogleMapDrawer;