import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import "./DigitalSignature.css";
import { APIURL,Apiurltransfer } from "../url";
import axios from 'axios';
import CryptoJS from 'crypto-js';
import {format as datefunsdata} from 'date-fns';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";

const DigitalSignature = () => {
  const apiUrl = APIURL;
  const [uploadtoll,setUploadToll]=useState()
  // THSI API FOR DRIVER APP APIURL TRANFER
  const apiurltransfer=Apiurltransfer;
  const sigCanvasRef = useRef(null);

  const tripIddata = new URLSearchParams(window.location.search).get("trip");

  const uniqueno = new URLSearchParams(window.location.search).get("uniqueNumber");
  const [successMessage, setSuccessMessage] = useState('')
  // const [expired, setExpired] = useState(() => {
  //   const expiredInSessionStorage =
  //     sessionStorage.getItem("expired") && localStorage.getItem("expired");
  //   return expiredInSessionStorage
  //     ? JSON.parse(expiredInSessionStorage)
  //     : false;
  // });
  const [expired, setExpired] = useState(() => {
    const expiredInSessionStorage =
      localStorage.getItem("expired");
    return expiredInSessionStorage
      ? JSON.parse(expiredInSessionStorage)
      : false;
  });

  const handleuploaddialog=()=>{
    const tripId = decryptdata(tripIddata)
    const data= `http://taaftechnology.com/SignatureGenerate/?tripid=${tripId}`
  //  const data=`http://localhost:3000/SignatureGenerate?tripid=${tripId}`
   localStorage.setItem("expireuploadpage",false)
   sessionStorage.setItem("expiredsign", false);
   localStorage.setItem("expiredsign",false);
   localStorage.setItem("uploadtollparkdata",true);
  //  setExpired(true);
   sessionStorage.setItem("expired", true);
    localStorage.setItem("expired", true);
    window.location.href = data;
  //  window.open(data, '_blank');

  }
  const handleuploadclose=()=>{
    setUploadToll(false)
    setExpired(true);
    sessionStorage.setItem("expired", true);
    localStorage.setItem("expired", true);
    localStorage.setItem("expireuploadpage",true)
  }
  
  // const expiredInSessionStorage =localStorage.getItem("expired") ? JSON.parse(expiredInSessionStorage): false;
  // console.log(expiredInSessionStorage,localStorage.getItem("expired"))

  const decryptdata = (cipherText) => {

    try {
      if (cipherText) {
        const bytes = CryptoJS.AES.decrypt(cipherText, 'my-secret-key@123');
        const plainText = bytes.toString(CryptoJS.enc.Utf8);

        const parsedNumber = JSON.parse(plainText);

        return parsedNumber;
      }

    } catch (error) {
      console.error("Error during decryption:", error.message);

    }
  };

  const decryptunique = (cipherText) => {

    try {
      if (cipherText) {
        const bytes = CryptoJS.AES.decrypt(cipherText, 'my-secret-key@123');
        const plainText = bytes.toString(CryptoJS.enc.Utf8);

        const parsedNumber = JSON.parse(plainText);

        return parsedNumber;
      }

    } catch (error) {
      console.error("Error during decryption:", error.message);

    }
  };



  const clearSignature = () => {
    sigCanvasRef.current.clear();
  };

  const getCurrentDateTimeFormatted = () => {
    const now = new Date();
    const formattedDateTime = datefunsdata(now, 'yyyy-MM-dd HH:mm:ss');
    const formattedTime = datefunsdata(now, 'HH:mm:ss');
    const formatteddate = datefunsdata(now,"yyyy-MM-dd")
    const formattedtimes = datefunsdata(now,"HH:mm")
    return {
      dateTime: formattedDateTime,
      time: formattedTime,
      dates:formatteddate,
      timesdata:formattedtimes
    };
  };

  const saveSignature = async () => {
    const dataUrl = sigCanvasRef.current.toDataURL("image/png");
    const status = "Updated"
    const datadate=Date.now().toString();
    const tripId = decryptdata(tripIddata)
    const uniquenodata = decryptunique(uniqueno)
    const { dateTime, time ,dates,timesdata} = getCurrentDateTimeFormatted();
    const signtauretimes={
        status:status,
        datesignature:dateTime,
        signtime:time,          
        updateclosedate:dates,
        updateclosetime:timesdata
       }
      const signaturedata={
        dataurlsign:dataUrl
      }
  
    try {
      await fetch(`${apiUrl}/api/saveSignaturewtid`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          signatureData: dataUrl,
          tripId: tripId,
          uniqueno: uniquenodata,
          imageName:datadate
        }),
      });
      // await axios.post(`${apiUrl}/signaturedatatimes/${tripId}/${status}`)
      await axios.post(`${apiUrl}/signaturedatatimes/${tripId}`,signtauretimes)
      setSuccessMessage("upload successfully")
      // THIS API FRO DRIVER APP
      await axios.post(`${apiurltransfer}/signatureimagesavedriver/${datadate}`,signaturedata)
      
      clearSignature();
      setUploadToll(true)
      // setTimeout(() => {
      //   setExpired(true);
      //   sessionStorage.setItem("expired", true);
      //   localStorage.setItem("expired", true);
      // }, 5000);
    } catch {
      setExpired(true);
    }
  };

  // useEffect(() => {
  //   const expirationTimer = setTimeout(() => {
  //     setExpired(true);
  //     sessionStorage.setItem("expired", true);
  //     localStorage.setItem("expired", true);
  //   }, 30000);
  //   return () => clearTimeout(expirationTimer);
  // }, []);

  if (expired) {
    return <div>This link has expired. Please generate a new link.</div>;
  }
  const Startsignature = async () => {
    const status = "onSign"
    const { dateTime, time } = getCurrentDateTimeFormatted();
    const signtauretimes={
        status:status,
        datesignature:dateTime,
        signtime:time            }
    const tripId = decryptdata(tripIddata)

    try {
      // await axios.post(`${apiUrl}/signaturedatatimes/${tripId}/${status}`)
      await axios.post(`${apiUrl}/signaturedatatimes/${tripId}`,signtauretimes)
    }
    catch (err) {
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
        <p style={{ textAlign: 'center', color: "green" }}>{successMessage}...</p>
        <button className="clear-button" onClick={clearSignature}>
          Clear Signature
        </button>
        <button className="clear-button" onClick={saveSignature}>
          Done
        </button>
      </div>
      <Dialog open={uploadtoll}>
            <DialogContent>
             
              <p className="modal-warning-text">Are you want upload Toll and Parking</p>
            </DialogContent>
            <DialogActions className="yes-no-buttons">
              <Button
                onClick={handleuploaddialog}
                variant="contained"
                className="logout-btn"
              >
                Yes
              </Button>
              <Button
                onClick={handleuploadclose}
                variant="contained"
                className="logout-cancel-btn"
              >
                NO
              </Button>
            </DialogActions>
          </Dialog>
    </div>
  );
};

export default DigitalSignature;
