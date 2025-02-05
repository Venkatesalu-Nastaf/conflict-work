import React, { useState, useEffect } from 'react'
import './Uploadtollpark.css'
import { APIURL, Apiurltransfer } from '../../../url';
import axios from 'axios';
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

const UploadTollParking = () => {

  const [expired, setExpired] = useState()
  const apiUrl = APIURL;
  const apiurltransfer = Apiurltransfer;
  const tripId = new URLSearchParams(window.location.search).get("Tripid");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState({});

  const [inputData, setInputData] = useState({
    toll: '',
    parking: '',
  });
  const [documentTypedata, setDocumentTypedata] = useState({Toll: "", Parking: ""});




  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setInputData((prevInputData) => ({
      ...prevInputData,
      [name]: value,
    }));
  };
  const tripDATA1 = tripId
  const linkexpiredata = async () => {
    // const tripDATA1 = tripId;
    const tripDATA2 = tripId;
    try {
      const response = await axios.get(`${apiUrl}/getlinkExpireddataExppp/${tripDATA2}`);
      const data = response.data;
      if (data.length > 0) {
        const data2 = data[0]?.ExpiredUploadpage;
        // Safe access with optional chaining
        console.log(data2, "linkexppp", typeof (data2), "nummm")
        setExpired(data2);
      } else {
        setExpired(1);
      }
      // setUploadToll(data3)
    } catch (err) {
      console.error("Error fetching expired data:", err);
      setExpired(1);
      // Default to true on error
    }
  };

  useEffect(() => {

    // Call the function when the component mounts or when tripno/apiUrl changes
    if (tripDATA1) {
      linkexpiredata();
    }
  }, [tripId, apiUrl]);

  const handleFileChange = async (event, documentdata) => {
    // const document1data=documentdata;
    const tripid = tripId;
    const file = event.target.files[0];
    if (!file) return;
    try {
      if (file) {
        const data = Date.now().toString();
        const formData = new FormData();
        formData.append('image', file);

        // console.log(documentTypedata, "yypeenter34543243",documentdata);

        await axios.put(`${apiUrl}/tripsheet_uploads/${tripid}/${documentdata}/${data}`, formData);
        await axios.post(`${apiurltransfer}/uploadfolrderapp/${data}`, formData);
        //   await axios.post(`http://localhost:7000/uploadfolrderapp/${data}`, formData);
        setSuccess(true)
        setDocumentTypedata({...documentTypedata, [documentdata]: documentdata})
      
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }




  };
  console.log(documentTypedata.Toll,documentTypedata,documentTypedata["Toll"],"yypeenter34543243")
  const handleUpload = (type) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf, .jpg, .jpeg, .png';
    // input.onchange = handleFileChange;
    input.onchange = (event) => handleFileChange(event, type);
    input.click();
    // setDocumentTypedata(type)

  };

  const handleCancel = () => {
    console.log("cancle")
    setInputData((prevBook) => ({
      toll: '',
      parking: '',
    }));
    setDocumentTypedata({
      Toll: "",
      Parking: ""
    })
  }

  const handlesubmit = async () => {
    const tripid = tripId;
   
    try {
      const updatedData = {
        tripid: tripid,
        toll: inputData.toll || 0,// Include both toll and parking in the request data
        parking: inputData.parking || 0, // Include parking
      };
      const updatedetails = {
        tripid: tripId,
        Expired: true,
        signExpired: true,
        UploadTollExpired: true,
        ExpiredUploadpage: true



      }
      await axios.post(`${apiUrl}/uploadtollandparkinglink`, updatedData)
      await axios.post(`${apiUrl}/signaturelinkExpiredatas/`, updatedetails)



      setError(false)
      handleCancel()
      setDocumentTypedata("")
      setSuccess(true);
      setSuccessMessage("succesfully added")
      setTimeout(() => {
        setSuccess(false)
        setSuccessMessage()
        // localStorage.setItem("expireuploadpage", true)
        setExpired(true)

      }, 1600);

    }
    catch (err) {
      console.log(err)
    }


  }

  if (expired) {
    return <div>This link has expired. Please generate a new link.</div>;
  }


  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh' }}>
        <h1>Upload Toll Parking</h1>
        <div style={{ display: "flex", gap: "10px", flexDirection: 'row', alignItems: 'end', marginBottom: '20px' }}>
          <div style={{ display: 'grid' }}>
            <h4 style={{ margin: '0px' }}>Enter Toll amount:</h4>
            <TextField id="standard-basic" label="toll amount" name="toll" size='small' value={inputData.toll} onChange={handleInputChange} type="number" />
          </div>

          <div className="input" style={{ display: 'grid' }}>
            <Button variant="contained"  style={{ backgroundColor :documentTypedata["Toll"] === "Toll" && success  ? "green" : "#4169E1" }} onClick={() => handleUpload("Toll")}>Upload Toll</Button>

          </div>
        </div>
        <div style={{ display: "flex", gap: "10px", flexDirection: 'row', alignItems: 'end', marginBottom: '20px' }}>
          <div style={{ display: 'grid' }}>
            <h4 style={{ margin: '0px' }}>Enter parking amount:</h4>
            <TextField id="standard-basic" label="parking amount" value={inputData.parking} name="parking" size='small' onChange={handleInputChange} type="number" />
          </div>
          <div className="input" style={{ display: 'grid'}}>
            <Button variant="contained"  style={{backgroundColor:documentTypedata['Parking'] === "Parking" && success ? "green" : "#4169E1"}} onClick={() => handleUpload("Parking")}>Upload Parking</Button>

          </div>
        </div>
        {error && <div className="error-message" style={{ color: "red" }}>{errorMessage}</div>}

        <Button variant="contained" onClick={handlesubmit}>Submit</Button>
        {success && successMessage ? <p style={{ color: "green", fontSize: 13 }}>{`${successMessage}`}</p> : ""}
      </div>

    </>
  )
}

export default UploadTollParking