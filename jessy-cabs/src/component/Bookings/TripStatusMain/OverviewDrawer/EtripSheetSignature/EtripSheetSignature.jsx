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

import React from 'react';
import './EtripSheetSignature.css';

const EtripSheetSignature = ({signImageUrl}) => {
  return (
    <div>
      <p>Signature</p>
      <div className='EtripSheetSignature-card'>
        {signImageUrl ? (
          <img src={signImageUrl} alt="Signature" className="signature-image" />
        ) : (
          <p>No signature available</p>
        )}
      </div>
    </div>
  )

 }

 export default EtripSheetSignature;

