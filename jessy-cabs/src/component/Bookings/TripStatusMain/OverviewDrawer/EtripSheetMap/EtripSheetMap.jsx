// import React from 'react';
// import "./EtripSheetMap.css"

// const EtripSheetMap = () => {
//   return (
//     <>
//       <div>
//         <p>Map</p>

//         <div className='EtripSheetMap-card'>

//         </div>
//       </div>
//     </>
//   )
// }

// export default EtripSheetMap;
import React, { useState, useEffect } from 'react';
import "./EtripSheetMap.css";
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress

const EtripSheetMap = ({ mapImgUrl }) => {

  const [loading, setLoading] = useState(true); // State for loading
  // useEffect(() => {
  //   if (mapImgUrl.length > 0) {
  //     setLoading(false); // Set loading to false once images are available
  //   }
  // }, [mapImgUrl]);
  // useEffect(() => {
  //   // Check if mapImgUrl is valid and set loading accordingly
  //   if (mapImgUrl && mapImgUrl.length > 0) {
  //     setLoading(false); // Set loading to false once an image URL is available
  //   } else {
  //     setLoading(false); // Set loading to false if no URL is provided
  //   }
  // }, [mapImgUrl]);

  useEffect(() => {
    // Simulate a loading delay or fetch
   setLoading(true);
    const timer = setTimeout(() => {
      // Only set loading to false after checking if mapImgUrl is valid
      if (mapImgUrl && mapImgUrl.length > 0) {
        setLoading(false); // Valid image URL
      } else {
        setLoading(false); // No valid image URL
      }
    }, 1000); // Simulate a delay, adjust as needed

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, [mapImgUrl]);
  return (
    <>
      <div>
        <p className='map-heading'> Trip Map</p>
        <div className='EtripSheetMap-card'>
          {/* {mapImgUrl ? (
            <img src={mapImgUrl} alt="Map" className="map-image" />
          ) : (
            <p>No map available!</p>
          )} */}
           {loading ? (
                    <div className="loading-map-container">
                      <CircularProgress />
                    </div>
                  ) : (
                    mapImgUrl && mapImgUrl.length > 0 ? (
                      // renderContent(mapImgUrl[currentIndex])
                      <img src={mapImgUrl} alt="Map" className="map-image" />
                    ) : (
                      // <p>No images available</p>
                      <div className="no-map-container">
                      <p>No Trip Map Available !</p>
                      

                    </div>
                    )
                  )}
        </div>
      </div>
    </>
  );
};

export default EtripSheetMap;
