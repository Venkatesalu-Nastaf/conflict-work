import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import './DigitalSignature.css';

const DigitalSignature = () => {
    const sigCanvasRef = useRef(null);
    const clearSignature = () => {
        sigCanvasRef.current.clear();
    };

    const saveSignature = async () => {
        const dataUrl = sigCanvasRef.current.toDataURL('image/png');

        try {
            const response = await fetch('http://localhost:8081/api/saveSignature', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ signatureData: dataUrl }),
            });
            clearSignature();
            if (response.ok) {
            } else {
            }
        } catch {
        }
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
                <button className="clear-button" onClick={saveSignature}>Done</button>
            </div>

        </div>
    );
};

export default DigitalSignature;
