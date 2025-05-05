import React,{useMemo,useState}from "react";
import { GoogleMap, LoadScript, MarkerF,useJsApiLoader,InfoWindow,InfoBoxF,OverlayView} from "@react-google-maps/api";
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

const GoogleMapFile = ({ vehicleCurrentLocation }) => {
  // const centerdata = {  lat: 13.080555,lng: 80.163118, }
  // const center = useMemo(() => ({  lat: 13.080555,lng: 80.163118, }), [vehicleCurrentLocation]);
  console.log(vehicleCurrentLocation , "koVehicle Locations----------------");
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  // const center = useMemo(() => ({  lat: 13.080555,lng: 80.163118, }), []);
  const center = useMemo(() => ({  lat: 13.080555,lng: 80.163118, }), []);
  const libraries = ['places', 'geometry', 'drawing', 'visualization'];
    const { isLoaded } = useJsApiLoader({
       googleMapsApiKey: "AIzaSyCn47dR5-NLfhq0EqxlgaFw8IEaZO5LnRE",
       libraries,
     });
    //  console.log(isLoaded,"lo")
   
   
  return (
    // <LoadScript>
      <GoogleMap
      // options = {OPTIONS}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10
          
        }
      >
 <MarkerClustererF 
      
        > 
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
                // tooltip={vehicle?.Vehicle_No}
               
                // title={vehicle?.Vehicle_No}
             
                
                icon={{
                  url:caricon,
                  // scaledSize: new window.google.maps.Size(90, 90),
                  scaledSize: new window.google.maps.Size(90, 90),
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(45, 45),
                  
                }}
                 clusterer={clusterer}
                 onClick={() => setSelectedVehicle(vehicle)}
              
                 
              >
                 
      <InfoBoxF
    position={{
      lat: parseFloat(vehicle.Latitude_loc),
      lng: parseFloat(vehicle.Longtitude_loc),
    }}
    options={{
      
      pixelOffset: new window.google.maps.Size(3,-7),
      boxStyle: {
        width: '150px',
      },
      closeBoxURL: ``,
    }}
    
  >
    <div style={{
    width: '50px',
    height: '20px',
    backgroundColor: '#203254',
    borderRadius: '6px',
    boxShadow: '0px 2px 6px rgba(0,0,0,0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    overflow: 'hidden',
    // padding: '2px',
  }}>
     {vehicle?.Vehicle_No.slice(-4)}
    </div>
  </InfoBoxF> 

                 
           
            </MarkerF>

              
           ))
          }
       </MarkerClustererF>
      

      {selectedVehicle && (
        <InfoWindow
          position={{
            lat: parseFloat(selectedVehicle.Latitude_loc),
            lng: parseFloat(selectedVehicle.Longtitude_loc),
          }}
          onCloseClick={() => setSelectedVehicle(null)}
        >
          <div>
            <div><strong>Vehicle No:</strong> {selectedVehicle.Vehicle_No}</div>
            <div><strong>Group:</strong> {selectedVehicle.Group}</div>
            <div><strong>Driver:</strong> {selectedVehicle.Driver}</div>
            <div><strong>Location:</strong> {selectedVehicle.Location}</div>
            <div><strong>Nearest Address:</strong> {selectedVehicle.Nearest_Address}</div>
            <div><strong>Distance to Jessy Cabs:</strong> {calculateDistance(jessyCabsLocation.lat, jessyCabsLocation.lng, parseFloat(selectedVehicle.Latitude_loc), parseFloat(selectedVehicle.Longtitude_loc))} km</div>
          </div>
        </InfoWindow>
      )}

    
      </GoogleMap>
    // </LoadScript>
  );
};

export default GoogleMapFile;
