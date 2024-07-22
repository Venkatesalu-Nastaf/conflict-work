import React, { useRef, useEffect, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import "./DigitalSignature.css";
import { APIURL } from "../url";
import axios from 'axios';
import CryptoJS from 'crypto-js';
import {format as datefunsdata} from 'date-fns';

const DigitalSignature = () => {
  const apiUrl = APIURL;
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
    return {
      dateTime: formattedDateTime,
      time: formattedTime
    };
  };

  const saveSignature = async () => {
    const dataUrl = sigCanvasRef.current.toDataURL("image/png");
    const status = "Updated"
    const tripId = decryptdata(tripIddata)
    const uniquenodata = decryptunique(uniqueno)
    const { dateTime, time } = getCurrentDateTimeFormatted();
    const signtauretimes={
        status:status,
        datesignature:dateTime,
        signtime:time            }

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
        }),
      });
      // await axios.post(`${apiUrl}/signaturedatatimes/${tripId}/${status}`)
      await axios.post(`${apiUrl}/signaturedatatimes/${tripId}`,signtauretimes)
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
    </div>
  );
};

export default DigitalSignature;
