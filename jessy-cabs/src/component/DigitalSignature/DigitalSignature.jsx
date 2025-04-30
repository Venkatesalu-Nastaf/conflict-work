import React, { useRef, useState, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import "./DigitalSignature.css";
import { APIURL, Apiurltransfer } from "../url";
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { format as datefunsdata } from 'date-fns';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import CancelIcon from '@mui/icons-material/Cancel';

const DigitalSignature = () => {
  const apiUrl = APIURL;
  const [uploadtoll, setUploadToll] = useState()
  // THSI API FOR DRIVER APP APIURL TRANFER
  const apiurltransfer = Apiurltransfer;
  const sigCanvasRef = useRef(null);
  const [dsiabelbutton,setDisableButton]=useState(false);


  const tripIddata = new URLSearchParams(window.location.search).get("trip");


  const uniqueno = new URLSearchParams(window.location.search).get("uniqueNumber");
  const [successMessage, setSuccessMessage] = useState('')
  const[success,setSuccess]=useState(false)
  const[errorMessage,setErrorMessage]=useState('')

  const [expired, setExpired] = useState(false)
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
      // setExpired(1);

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


  const linkexpiredata = async () => {
    // const tripDATA1 = tripId;
    const tripDATA2 = decryptdata(tripIddata)
    try {
      const response = await axios.get(`${apiUrl}/getlinkExpireddataExppp/${tripDATA2}`);
      const data = response.data;
      const data2 = data[0]?.signExpired;
      // Safe access with optional chaining
      console.log(data2, "linkexppp")
      setExpired(data2);
      // setUploadToll(data3)
    } catch (err) {
      console.error("Error fetching expired data:", err);
      setExpired(true);
      // Default to true on error
    }
  };

  useEffect(() => {
    const tripDATA1 = decryptdata(tripIddata)
    // Call the function when the component mounts or when tripno/apiUrl changes
    if (tripDATA1) {
      linkexpiredata();
    }
  }, [tripIddata, apiUrl]);
  console.log(expired, "expired")

  const handleuploaddialog = async () => {
    const tripId = decryptdata(tripIddata)
    const updatedetails = {
      tripid: tripId,
      Expired: false,
      signExpired: true,
      UploadTollExpired: true,
      ExpiredUploadpage: true



    }
    // const tripId = decryptdata(tripIddata)
    // const data = `http://localhost:3000/SignatureGenerate?tripid=${tripId}`
    const data= `https://jessycabs.com/SignatureGenerate/?tripid=${tripId}`
    await axios.post(`${apiUrl}/signaturelinkExpiredatas/`, updatedetails)
    linkexpiredata()
    //  const data=`http://localhost:3000/SignatureGenerate?tripid=${tripId}`
    //  localStorage.setItem("expireuploadpage",false)
    //  sessionStorage.setItem("expiredsign", false);
    //  localStorage.setItem("expiredsign",false);
    //  localStorage.setItem("uploadtollparkdata",true);
    //  setExpired(true);
    //  sessionStorage.setItem("expired", true);
    //   localStorage.setItem("expired", true);
    window.location.href = data;
    //  window.open(data, '_blank');

  }
  const handleuploadclose = async () => {
    const tripId = decryptdata(tripIddata)
    const updatedetails = {
      tripid: tripId,
      Expired: true,
      signExpired: true,
      UploadTollExpired: true,
      ExpiredUploadpage: true



    }
    await axios.post(`${apiUrl}/signaturelinkExpiredatas/`, updatedetails)
    setUploadToll(false)
    setExpired(true);
    // sessionStorage.setItem("expired", true);
    // localStorage.setItem("expired", true);
    // localStorage.setItem("expireuploadpage",true)
  }

  // const expiredInSessionStorage =localStorage.getItem("expired") ? JSON.parse(expiredInSessionStorage): false;
  // console.log(expiredInSessionStorage,localStorage.getItem("expired"))

  // const decryptdata = (cipherText) => {

  //   try {
  //     if (cipherText) {
  //       const bytes = CryptoJS.AES.decrypt(cipherText, 'my-secret-key@123');
  //       const plainText = bytes.toString(CryptoJS.enc.Utf8);

  //       const parsedNumber = JSON.parse(plainText);

  //       return parsedNumber;
  //     }

  //   } catch (error) {
  //     console.error("Error during decryption:", error.message);

  //   }
  // };

  // const decryptunique = (cipherText) => {

  //   try {
  //     if (cipherText) {
  //       const bytes = CryptoJS.AES.decrypt(cipherText, 'my-secret-key@123');
  //       const plainText = bytes.toString(CryptoJS.enc.Utf8);

  //       const parsedNumber = JSON.parse(plainText);

  //       return parsedNumber;
  //     }

  //   } catch (error) {
  //     console.error("Error during decryption:", error.message);

  //   }
  // };



  const clearSignature = () => {
    sigCanvasRef.current.clear();
 

  };
  const clearSignaturedata = () => {
    sigCanvasRef.current.clear();
    clearsignaturedata()

  };

  const getCurrentDateTimeFormatted = () => {
    const now = new Date();
    const formattedDateTime = datefunsdata(now, 'yyyy-MM-dd HH:mm:ss');
    const formattedTime = datefunsdata(now, 'HH:mm:ss');
    const formatteddate = datefunsdata(now, 'yyyy-MM-dd');
    console.log(formatteddate,"for,mmm")

    const formattedtimes = datefunsdata(now, "HH:mm")
    return {
      dateTime: formattedDateTime,
      time: formattedTime,
      dates: formatteddate,
      timesdata: formattedtimes
    };
  };

  // const saveSignature = async () => {
  //   const dataUrl = sigCanvasRef.current.toDataURL("image/png");
  //   const status = "Updated"
  //   const datadate=Date.now().toString();
  //   const tripId = decryptdata(tripIddata)
  //   const uniquenodata = decryptunique(uniqueno)
  //   const { dateTime, time ,dates,timesdata} = getCurrentDateTimeFormatted();
  //   const signtauretimes={
  //       status:status,
  //       datesignature:dateTime,
  //       signtime:time,          
  //       updateclosedate:dates,
  //       updateclosetime:timesdata
  //      }
  //     const signaturedata={
  //       dataurlsign:dataUrl
  //     }

  //   try {
  //     await fetch(`${apiUrl}/api/saveSignaturewtid`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         signatureData: dataUrl,
  //         tripId: tripId,
  //         uniqueno: uniquenodata,
  //         imageName:datadate
  //       }),
  //     });
  //     // await axios.post(`${apiUrl}/signaturedatatimes/${tripId}/${status}`)
  //     await axios.post(`${apiUrl}/signaturedatatimes/${tripId}`,signtauretimes)
  //     setSuccessMessage("upload successfully")
  //     // THIS API FRO DRIVER APP
  //     await axios.post(`${apiurltransfer}/signatureimagesavedriver/${datadate}`,signaturedata)

  //     clearSignature();
  //     setUploadToll(true)
  //     // setTimeout(() => {
  //     //   setExpired(true);
  //     //   sessionStorage.setItem("expired", true);
  //     //   localStorage.setItem("expired", true);
  //     // }, 5000);
  //   } catch {
  //     setExpired(true);
  //   }
  // };

  const [isLoading, setIsLoading] = useState(false);
  //   const [progress, setProgress] = useState(0);
  // const [isSuccess, setIsSuccess] = useState(null);

  // Changes with loading  working good

 
  const saveSignature = async () => {

    
  if (sigCanvasRef.current.isEmpty()) {
   setErrorMessage("please sign the signature");
   setSuccess(false)
    return;
  }
    const dataUrl = sigCanvasRef.current.toDataURL("image/png");
    const status = "Updated";
    const datadate = Date.now().toString();
    const tripId = decryptdata(tripIddata);
    const uniquenodata = decryptunique(uniqueno);
    const { dateTime, time, dates, timesdata } = getCurrentDateTimeFormatted();
    const signtauretimes = {
      status: status,
      datesignature: dateTime,
      signtime: time,
      updateclosedate: dates,
      updateclosetime: timesdata,
    };
    const signaturedata = {
      dataurlsign: dataUrl,
    };
    const updatedetails = {
      tripid: tripId,
      Expired: true,
      signExpired: true,
      UploadTollExpired: false,
      ExpiredUploadpage: false



    }

    try {
      setIsLoading(true);

   const hh =   await fetch(`${apiUrl}/api/saveSignaturewtid`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          signatureData: dataUrl,
          tripId: tripId,
          uniqueno: uniquenodata,
          imageName: datadate,
        }),
      });
  //     console.log(hh,"llhh")
  // console.log(signtauretimes,"times")
  // console.log(updatedetails,"detils")
     const reponse = await axios.post(`${apiUrl}/signaturedatatimes/${tripId}`, signtauretimes);
      console.log(reponse,"ll")
      const response2 = await axios.post(`${apiUrl}/signaturelinkExpiredatas/`, updatedetails)
      console.log(response2,"ll2")
      

      // setSuccessMessage("Upload successfully");

      const res = await axios.post(`${apiurltransfer}/signatureimagesavedriver/${datadate}`, signaturedata);
      console.log(res, "yyy")
      setSuccess(true)
      setSuccessMessage("Upload successfully");
      setDisableButton(true)
      clearSignature();
      setUploadToll(true);
    } catch (error) {
      // setExpired(1)
      console.log(error)

    } finally {
      setIsLoading(false);
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
    const signtauretimes = {
      status: status,
      datesignature: dateTime,
      signtime: time
    }
    const tripId = decryptdata(tripIddata)

    try {
      // await axios.post(`${apiUrl}/signaturedatatimes/${tripId}/${status}`)
      await axios.post(`${apiUrl}/Acceptsignaturedatatimes/${tripId}`, signtauretimes)
    }
    catch (err) {
      console.log(err)
    }
  }

  const clearsignaturedata = async () => {
    const status = "clearSign"
    const { dateTime, time } = getCurrentDateTimeFormatted();
    const signtauretimes = {
      status: status,
      datesignature: dateTime,
      signtime: time
    }
    const tripId = decryptdata(tripIddata)

    try {
      // await axios.post(`${apiUrl}/signaturedatatimes/${tripId}/${status}`)
      await axios.post(`${apiUrl}/dataclearsignaturedatatimes/${tripId}`, signtauretimes)
    }
    catch (err) {
      console.log(err)
    }
  }



  return (
    <div>
      {!dsiabelbutton ? <>
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
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "70%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255,)",
            zIndex: 10,
          }}
        >
          <CircularProgress />
        </div>
      )}
      <div>
        <p style={{ textAlign: 'center',color: success ? 'green' : 'red' }}>{success ? successMessage : errorMessage}</p>
        

        {!dsiabelbutton ? <button  disabled={dsiabelbutton} className="clear-button" onClick={clearSignaturedata}>
          Clear Signature
        </button>:<></>
}
        <button className="clear-button" onClick={saveSignature}>
          Done
        </button>
      </div>
      </>:<></>}
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
