import React, { useState} from 'react'
import './Uploadtollpark.css'
import { APIURL,Apiurltransfer } from '../../../url';
import axios from 'axios';
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

const UploadTollParking=()=>{
  // const [selectedfile,setSelectedfile]=useState("");
  const [expired, setExpired] = useState(() => {
    const expiredInSessionStorage =
      localStorage.getItem("expireuploadpage");
    return expiredInSessionStorage
      ? JSON.parse(expiredInSessionStorage)
      : false;
  });
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
const [documentTypedata,setDocumentTypedata]=useState("")
  


    const handleInputChange = (event) => {
      const { name, value } = event.target;

      setInputData((prevInputData) => ({
          ...prevInputData,
          [name]: value,
      }));
  };


  const handleFileChange = async (event,documentdata) => {
    // const document1data=documentdata;
      const tripid = tripId;
      const file = event.target.files[0];
      if (!file) return;
      try{
      if (file) {
          const data = Date.now().toString();
          const formData = new FormData();
          formData.append('image', file);
         
              // console.log(documentTypedata, "yypeenter34543243",documentdata);
            
              await axios.put(`${apiUrl}/tripsheet_uploads/${tripid}/${documentdata}/${data}`, formData);
                  await axios.post(`${apiurltransfer}/uploadfolrderapp/${data}`, formData);
                  //   await axios.post(`http://localhost:7000/uploadfolrderapp/${data}`, formData);
                setSuccess(true)
                setTimeout(() => {
                  setSuccess(false)
                  setDocumentTypedata("")
                },2000);
              
          } 
        }catch (error) {
              console.error('Error uploading file:', error);
          }



      
  };
  const handleUpload = (type) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf, .jpg, .jpeg, .png';
    // input.onchange = handleFileChange;
    input.onchange = (event) => handleFileChange(event, type);
    input.click();
    setDocumentTypedata(type)
    
};
 
  const handleCancel=()=>{
    console.log("cancle")
    setInputData((prevBook) => ({
      toll: '',
      parking: '',
  }));
  setDocumentTypedata("")
  }

  const handlesubmit= async()=>{
     const tripid=tripId;
     const toll=inputData.toll;
     const parking=inputData.parking;
   

     if(!toll){
      setError(true);
      setErrorMessage("ENTER TOLL Amount")
      return
     }
     if(!parking){
      setError(true);
      setErrorMessage("ENTER parking Amount")
      return
     }
     try{
      const updatedData = {
          tripid: tripid,
          toll: inputData.toll,// Include both toll and parking in the request data
          parking: inputData.parking, // Include parking
      };
      await axios.post(`${apiUrl}/uploadtollandparkinglink`, updatedData)
      setError(false)
      handleCancel()
      setDocumentTypedata("")
      setSuccess(true);
      setSuccessMessage("succesfully added")
    setTimeout(() => {
      setSuccess(false)
      setSuccessMessage()
      localStorage.setItem("expireuploadpage",true)
      setExpired(true)
      
    },1600);
      
    }
    catch(err){
      console.log(err)
    }
        

  }
  if (expired) {
    return <div>This link has expired. Please generate a new link.</div>;
  }

  
  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh' }}>
    <div>UploadTollParking</div>
    <div style={{display:"flex", gap:"10px", flexDirection: 'row', alignItems: 'center' }}>
      <h1>Enter Toll amount:</h1>
      <TextField id="standard-basic" label="toll amount" name="toll"  value={inputData.toll} onChange={handleInputChange} type="number"variant="standard" />

  
    <div className="input">
        <Button variant="contained" onClick={() => handleUpload("Toll")}>Select File & Upload Toll</Button> 
        {documentTypedata === "Toll" && success ? <p style={{color:"green"}}>{`${documentTypedata} image uploaded`}</p> : ""}
      </div>
      </div>
      <div style={{display:"flex", gap:"10px"}}>
      <h1>Enter parking amount:</h1>
      <TextField id="standard-basic" label="parking amount"   value={inputData.parking} name="parking" onChange={handleInputChange} type="number"variant="standard" />
      <div className="input">
        <Button variant="contained" onClick={() =>handleUpload("Parking")}>Select File & Upload Parking</Button>
        {documentTypedata === "Parking" && success ?<p style={{color:"green"}}>{`${documentTypedata} image uploaded`}</p> : ""}
      </div>
      </div>
      {error && <div className="error-message" style={{color:"red"}}>{errorMessage}</div>}

      <Button variant="contained" onClick={handlesubmit}>Submit</Button>
      {success && successMessage ? <p style={{color:"green",fontSize:13}}>{`${successMessage}`}</p>:""}
      </div>

    </>
  )
}

export default UploadTollParking