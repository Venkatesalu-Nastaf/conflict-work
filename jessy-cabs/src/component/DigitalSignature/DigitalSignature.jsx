import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import './DigitalSignature.css'

const DigitalSignature = () => {
    const sigCanvasRef = useRef(null);

    const clearSignature = () => {
        sigCanvasRef.current.clear();
    };
    return (
        <div>
            <SignatureCanvas
                ref={sigCanvasRef}
                penColor="black"
                canvasProps={{ width: 500, height: 500, className: 'signature-canvas signature-pad ' }}
            />
            <div>
                <button className="clear-button" onClick={clearSignature}>Clear Signature</button>
            </div>
        </div>
    )
}

export default DigitalSignature