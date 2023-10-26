import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import './DigitalSignature.css';
import { useLocation } from 'react-router-dom';

const DigitalSignature = () => {
    const sigCanvasRef = useRef(null);
    const [tripid, setTripId] = useState(null);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const tripidFromURL = searchParams.get('tripid');
    if (tripidFromURL) {
        setTripId(tripidFromURL);
    }

    const clearSignature = () => {
        sigCanvasRef.current.clear();
    };

    const saveSignature = async () => {
        const dataUrl = sigCanvasRef.current.toDataURL('image/png'); // Get the signature data as a data URL

        try {
            const response = await fetch('http://localhost:8081/api/saveSignature', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ signatureData: dataUrl }), // Store the data URL string
            });
            console.log('signature result', response.data);

            clearSignature();
            if (response.ok) {
                // Signature saved successfully
                console.log('Signature saved successfully');
            } else {
                // Handle error
                console.error('Failed to save signature');
            }
        } catch (error) {
            console.error('Error:', error);
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
