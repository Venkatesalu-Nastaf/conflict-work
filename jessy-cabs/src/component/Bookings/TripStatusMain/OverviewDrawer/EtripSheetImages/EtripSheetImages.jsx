// import React from 'react';
// import "./EtripSheetImages.css"

// const EtripSheetImages = (imageDetails) => {
//   return (
//     <>
//       <div>
//         <p>Images</p>
//         <div className='EtripSheetImages-card'>
//         {imageDetails ? (
//           <img src={imageDetails} alt="Images" className='map-image' />
//         ) : (
//           <p>No images available</p>
//         )}

//         </div>
//       </div>
//     </>
//   )
// }
// export default EtripSheetImages;
// import React from 'react';
// import "./EtripSheetImages.css";

// const EtripSheetImages = ({ imageDetails }) => {
//   return (
//     <>
//       <div>
//         <p>Images</p>
//         <div className='EtripSheetImages-card'>
//           {imageDetails && imageDetails.length > 0 ? (
//             imageDetails.map((image, index) => (
//               <div key={index} className="image-container">
//                 {/* Ensure image.url exists and is valid */}
//                 <img src={image.url} alt={`Image ${index}`} className='map-image' />
//               </div>
//             ))
//           ) : (
//             <p>No images available</p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default EtripSheetImages;

import React from 'react';
import "./EtripSheetImages.css";

const EtripSheetImages = ({ imageDetails }) => {
  return (
    <>
      <div>
        <p>Images</p>
        <div className='EtripSheetImages-card'>
          {imageDetails && imageDetails.length > 0 ? (
            imageDetails.map((image) => (
              <div key={image.id5} className="image-container">
                {/* Assuming image.url contains the image path */}
                <img src={image.url} alt={`Image ${image.id5}`} className='map-image' />
              </div>
            ))
          ) : (
            <p>No images available</p>
          )}
        </div>
      </div>
    </>
  );
}

export default EtripSheetImages;

