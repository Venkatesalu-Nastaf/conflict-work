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
import React from 'react';
import "./EtripSheetMap.css";

const EtripSheetMap = ({ mapImgUrl }) => {
  return (
    <>
      <div>
        <p>Map</p>
        <div className='EtripSheetMap-card'>
          {mapImgUrl ? (
            <img src={mapImgUrl} alt="Map" className="map-image" />
          ) : (
            <p>No map available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default EtripSheetMap;
