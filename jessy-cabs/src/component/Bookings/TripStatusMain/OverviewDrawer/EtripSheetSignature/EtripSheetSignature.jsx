// import React from 'react';
// import "./EtripSheetSignature.css"

//  const EtripSheetSignature = () => {
//   return (
//     <>
//     <div>
//       <p>Signature</p>
    
//     <div className='EtripSheetSignature-card'>

//     </div>
//     </div>
//     </>
//   )
// }
// export default EtripSheetSignature;

import React,{useState,useEffect} from 'react';
import './EtripSheetSignature.css';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress
const EtripSheetSignature = ({signImageUrl}) => {
  const [loading, setLoading] = useState(true); // State for loading
  useEffect(() => {
    // Simulate a loading delay or fetch
    setLoading(true)
    const timer = setTimeout(() => {
      // Only set loading to false after checking if mapImgUrl is valid
      if (signImageUrl && signImageUrl.length > 0) {
        setLoading(false); // Valid image URL
      } else {
        setLoading(false); // No valid image URL
      }
    }, 1000); // Simulate a delay, adjust as needed

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, [signImageUrl]);
  return (
    <div>
      <p className='sign-heading'>Signature</p>
      <div className='EtripSheetSignature-card'>
        {/* {signImageUrl ? (
          <img src={signImageUrl} alt="Signature" className="signature-image" />
        ) : (
          <p>No signature available</p>
        )} */}
         {loading ? (
                    <div className="loading-container">
                      <CircularProgress />
                    </div>
                  ) : (
                    signImageUrl && signImageUrl.length > 0 ? (
                      // renderContent(mapImgUrl[currentIndex])
                      <img src={signImageUrl} alt="Map" className="map-image" />
                    ) : (
                      // <p>No images available</p>
                      <div className="no-sign-container">
                      <p>No Signature Available !</p>
                      

                    </div>
                    )
                  )}
      </div>
    </div>
  )

 }

 export default EtripSheetSignature;

