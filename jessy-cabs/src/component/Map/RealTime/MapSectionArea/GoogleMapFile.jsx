import React,{useMemo}from "react";
import { GoogleMap, LoadScript, MarkerF,useJsApiLoader} from "@react-google-maps/api";
import { MarkerClustererF } from "@react-google-maps/api";
import caricon from "../VehicleSection/VehicleInformationDrawer/mapicon.png"
// import caricon from "../VehicleSection/VehicleInformationDrawer/mapicon.png"
// import smallcar from "../../../../assets/img/smallcar.jpg";
// import

const containerStyle = {
  width: "100%",
  height: "500px",
};

// const defaultCenter = {
//   lat: 13.080555, // Default latitude
//   lng: 80.163118, // Default longitude
// };

const GoogleMapFile = ({ vehicleCurrentLocation }) => {
  const center = useMemo(() => ({  lat: 13.080555,lng: 80.163118, }), [vehicleCurrentLocation]);
  console.log(vehicleCurrentLocation, "Vehicle Locations----------------",center);
  // const center = useMemo(() => ({  lat: 13.080555,lng: 80.163118, }), []);
    const { isLoaded } = useJsApiLoader({
       googleMapsApiKey: "AIzaSyCn47dR5-NLfhq0EqxlgaFw8IEaZO5LnRE",
     });
     console.log(isLoaded,"lo")
   
    //  if (!isLoaded) {
    //    return <div>Loading...</div>;
    //  }


  
  return (
    // <LoadScript>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
          {/* <MarkerF
                // key={index}
                position={{
                  lat: parseFloat(13.080555),
                  lng: parseFloat(80.163118),
                  
                }}
                /> */}
       

       <MarkerClustererF> 
          {(clusterer) =>
          
            vehicleCurrentLocation?.map((vehicle, index) => (
              <MarkerF
                key={index}
                position={{
                  // lat: parseFloat(vehicle?.Lattitude_loc),
                  // lng: parseFloat(vehicle?.Longitude_loc),
                  lat: parseFloat(vehicle?.Latitude_loc), // Correct key
                  lng: parseFloat(vehicle?.Longtitude_loc),
                  
                }}
                // position={{
                //   lat: parseFloat(13.0299083),
                //   lng: parseFloat(80.240515),
                  
                // }}
                
                icon={{
                  url:caricon,
                  scaledSize: new window.google.maps.Size(90, 90),
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(45, 45),
                }}
                 clusterer={clusterer}
              />
            ))
          }
       </MarkerClustererF>
      </GoogleMap>
    // </LoadScript>
  );
};

export default GoogleMapFile;
