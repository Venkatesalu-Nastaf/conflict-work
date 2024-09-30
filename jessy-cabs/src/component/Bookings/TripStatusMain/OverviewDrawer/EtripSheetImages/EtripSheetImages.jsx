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
// import { APIURL } from '../../../../url';

// const EtripSheetImages = ({ imageDetails }) => {
//   const apiUrl = APIURL;

//   return (
//     <>
//       <div>
//         <p>Images</p>
//         <div className='EtripSheetImages-card'>
//           {imageDetails && imageDetails.length > 0 ? (
//             imageDetails.map((image) => (
//               <div key={image.id} className="image-container">
//                 {/* Assuming image.path contains the image path */}
//                 <img
//                   src={`${apiUrl}/get-image/${image.path}`}
//                   alt={`Image ${image.id}`}
//                   className='map-image'
//                 />
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

// import React, { useState } from 'react';
// import "./EtripSheetImages.css";
// import { APIURL } from '../../../../url';

// const EtripSheetImages = ({ imageDetails }) => {
//   const apiUrl = APIURL;
//   const [currentIndex, setCurrentIndex] = useState(0); // State to track the current image index

//   // Function to go to the next image
//   const nextImage = () => {
//     if (currentIndex < imageDetails.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   };

//   // Function to go to the previous image
//   const prevImage = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//   };

//   return (
//     <>
//       <div>
//         <p>Images</p>
//         <div className='EtripSheetImages-card'>
//           {imageDetails && imageDetails.length > 0 ? (
//             <div className="image-container">
//               {/* Display only the current image */}
//               <img
//                 src={`${apiUrl}/get-image/${imageDetails[currentIndex].path}`}
//                 alt={`Image ${imageDetails[currentIndex].id}`}
//                 className='map-image'
//               />
//             </div>
//           ) : (
//             <p>No images available</p>
//           )}
//         </div>
//         <div className="navigation-buttons">
//           <button onClick={prevImage} disabled={currentIndex === 0}>
//             Previous
//           </button>
//           <button onClick={nextImage} disabled={currentIndex === imageDetails.length - 1}>
//             Next
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// export default EtripSheetImages;

// import React, { useState } from 'react';
// import "./EtripSheetImages.css";
// import { APIURL } from '../../../../url';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// const EtripSheetImages = ({ imageDetails }) => {
//   const apiUrl = APIURL;
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextImage = () => {
//     if (currentIndex < imageDetails.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   };

//   const prevImage = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//   };

//   return (
//     <>
//       <div>
//         <p>Images</p>
//         <div className='EtripSheetImages-card'>
//           <div className="image-container">
//             {imageDetails && imageDetails.length > 0 ? (
//               <img
//                 src={`${apiUrl}/get-image/${imageDetails[currentIndex].path}`}
//                 alt={`Image ${imageDetails[currentIndex].id}`}
//                 className='map-image'
//               />
//             ) : (
//               <p>No images available</p>
//             )}
//             {/* Navigation arrows */}
//             <div className="arrow left-arrow" onClick={prevImage} style={{ visibility: currentIndex === 0 ? 'hidden' : 'visible' }}>
//               <ArrowBackIcon />
//             </div>
//             <div className="arrow right-arrow" onClick={nextImage} style={{ visibility: currentIndex === imageDetails.length - 1 ? 'hidden' : 'visible' }}>
//               <ArrowForwardIcon />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default EtripSheetImages;
import React, { useState } from 'react';
import "./EtripSheetImages.css";
import { APIURL } from '../../../../url';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';

const EtripSheetImages = ({ imageDetails }) => {
  const apiUrl = APIURL;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);

  const nextImage = () => {
    if (currentIndex < imageDetails.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const openImageDialog = () => {
    setOpenDialog(true);
  };

  const closeImageDialog = () => {
    setOpenDialog(false);
    setCurrentIndex(0); // Reset index when closing dialog
  };

  return (
    <>
      <div>
        <p>Images</p>
        <div className='EtripSheetImages-card'>
          <div className="image-container" onClick={openImageDialog}>
            {imageDetails && imageDetails.length > 0 ? (
              <img
                src={`${apiUrl}/get-image/${imageDetails[currentIndex].path}`}
                alt={`Image ${imageDetails[currentIndex].id}`}
                className='map-image'
              />
            ) : (
              <p>No images available</p>
            )}
            {/* Navigation arrows */}
            <div className="arrow left-arrow" onClick={prevImage} style={{ visibility: currentIndex === 0 ? 'hidden' : 'visible' }}>
              <ArrowBackIcon />
            </div>
            <div className="arrow right-arrow" onClick={nextImage} style={{ visibility: currentIndex === imageDetails.length - 1 ? 'hidden' : 'visible' }}>
              <ArrowForwardIcon />
            </div>
          </div>
        </div>
      </div>

      {/* Dialog for showing all images */}
      <Dialog open={openDialog} onClose={closeImageDialog} fullWidth>
        <DialogTitle>Image Gallery</DialogTitle>
        <DialogContent>
          <div className='image-gallery'>
            {imageDetails && imageDetails.length > 0 ? (
              imageDetails.map((image, index) => (
                <div key={image.id} className="image-gallery-item" onClick={() => setCurrentIndex(index)}>
                  <img
                    src={`${apiUrl}/get-image/${image.path}`}
                    alt={`Image ${image.id}`}
                    className='gallery-image'
                  />
                </div>
              ))
            ) : (
              <p>No images available</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default EtripSheetImages;

