import React, { useRef, useEffect, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import "./DigitalSignature.css";
import { APIURL } from "../url";
import axios from 'axios';

const DigitalSignature = () => {
  const apiUrl = APIURL;
  const sigCanvasRef = useRef(null);
  const tripId = new URLSearchParams(window.location.search).get("tripid");
  const uniqueno = new URLSearchParams(window.location.search).get(
    "uniqueNumber"
  );
  const [successMessage,setSuccessMessage]=useState('')
  const [expired, setExpired] = useState(() => {
    const expiredInSessionStorage =
      sessionStorage.getItem("expired") && localStorage.getItem("expired");
    return expiredInSessionStorage
      ? JSON.parse(expiredInSessionStorage)
      : false;
  });

  const clearSignature = () => {
    sigCanvasRef.current.clear();
  };

  const saveSignature = async () => {
    const dataUrl = sigCanvasRef.current.toDataURL("image/png");
    const status="finished"

    try {
      await fetch(`${apiUrl}/api/saveSignaturewtid`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          signatureData: dataUrl,
          tripId: tripId,
          uniqueno: uniqueno,
        }),
      });
      await axios.post(`${apiUrl}/signaturedatatimes/${tripId}/${status}`)
        setSuccessMessage("upload successfully")
      clearSignature();
      setTimeout(() => {
        setExpired(true);
        sessionStorage.setItem("expired", true);
        localStorage.setItem("expired", true);
      }, 5000);
    } catch {
      setExpired(true);
    }
  };

  useEffect(() => {
    const expirationTimer = setTimeout(() => {
      setExpired(true);
      sessionStorage.setItem("expired", true);
      localStorage.setItem("expired", true);
    }, 30000);
    return () => clearTimeout(expirationTimer);
  }, []);

  if (expired) {
    return <div>This link has expired. Please generate a new link.</div>;
  }
  const Startsignature= async()=>{
    console.log("startsignature")
    const status="onSign"
    try{
      await axios.post(`${apiUrl}/signaturedatatimes/${tripId}/${status}`)
    }
    catch(err){
      console.log(err)
    }
  }
  


  return (
    <div>
      <SignatureCanvas
        ref={sigCanvasRef}
        penColor="black"
        canvasProps={{
          width: 500,
          height: 500,
          className: "signature-canvas signature-pad ",
        }}
        onBegin={Startsignature}
      />
      <div>
        <p style={{textAlign:'center',color:"green"}}>{successMessage}...</p>
        <button className="clear-button" onClick={clearSignature}>
          Clear Signature
        </button>
        <button className="clear-button" onClick={saveSignature}>
          Done
        </button>
      </div>
    </div>
  );
};

export default DigitalSignature;
