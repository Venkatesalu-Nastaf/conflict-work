import React, { useRef} from 'react';
import SignatureCanvas from 'react-signature-canvas';
import './DigitalSignature.css';

const DigitalSignature = () => {
    const sigCanvasRef = useRef(null);
   

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
