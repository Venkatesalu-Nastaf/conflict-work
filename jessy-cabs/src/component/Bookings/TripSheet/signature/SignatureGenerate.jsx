import React, { useState, useEffect, useLayoutEffect } from 'react'
import './SignatureGenerate.css'
import { APIURL } from '../../../url';
import axios from 'axios'
import { format as datefunsdata, parse } from 'date-fns';
import Logo from "../../../../assets/img/logo.png";
import { Button } from '@mui/material';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { RiFileUploadLine } from "react-icons/ri";

const SignatureGenerate = () => {
  const apiUrl = APIURL;
  const [uploadtoll, setUploadToll] = useState()
  const tripId = new URLSearchParams(window.location.search).get("tripid");
  const getCurrentDateTimeFormatted = () => {
    const now = new Date();
    const formattedDateTime = datefunsdata(now, 'yyyy-MM-dd HH:mm:ss');
    const formattedTime = datefunsdata(now, 'HH:mm:ss');
    return {
      dateTime: formattedDateTime,
      time: formattedTime
    };
  };
  // console.log(tripId, "nolink")

  // const uploaddata = () => {
  //     // localStorage.getItem("uploadtolldata");
  //     const data = localStorage.getItem("uploadtollparkdata");
  //     console.log(data, "dattataaaaaaaaaaaaa")
  //     setUploadToll(data)
  // }
  // //   useEffect(()=>{
  // //     uploaddata()
  // //   })
  // useLayoutEffect(() => {
  //     uploaddata()
  // }, [])


  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadStatus1, setUploadStatus1] = useState(null);
  const[isAlert,setisAlert] = useState(null)

  const [fulldetails, setFulltripdetails] = useState([])
  const [startkm, setStartkm] = useState('');
  const [closekm, setClosekm] = useState();
  // const [expired, setExpired] = useState(() => {
  //     const expiredInSessionStorage =
  //         localStorage.getItem("expiredsign");
  //     return expiredInSessionStorage
  //         ? JSON.parse(expiredInSessionStorage)
  //         : false;
  // });

  // const expiredInSessionStorage1 =localStorage.getItem("expiredsign") ? "true": false;
  // console.log(expiredInSessionStorage1,localStorage.getItem("expiredsign"),"erfcdfskdnmcnndnmnmnfdsnndnf")

  const [expired, setExpired] = useState();
  const tripDATA1 = tripId
  const linkexpiredata = async () => {
    // const tripDATA1 = tripId;
    try {
      setIsLoading(true)
      const response = await axios.get(`${apiUrl}/getlinkExpireddataExppp/${tripDATA1}`);
      // console.log(data,"linkk")
      const data = response.data;
      console.log(data, "linkk")
      console.log(data.length, "ll")
      if (data.length > 0) {
        const data2 = data[0]?.Expired;
        const data3 = data[0]?.UploadTollExpired;
        console.log(data3, typeof (data3), "ppplink")// Safe access with optional chaining
        setIsLoading(false)
        setExpired(data2);
        setUploadToll(data3)
      }
      else {
        setExpired(1);
      }
    } catch (err) {
      console.error("Error fetching expired data:", err);
      setExpired(1);
      setUploadToll(1)// Default to true on error
    }
  };
  // console.log(expired, "kk")

  useEffect(() => {
    //  useLayoutEffect(() => {
    // Call the function when the component mounts or when tripno/apiUrl changes
    if (tripDATA1) {
      linkexpiredata();
    }
  }, [tripDATA1, apiUrl]);


  // console.log(uploadtoll, "typeof(", typeof (uploadtoll))

  useEffect(() => {
    const signturedatafullly = async () => {
      const datatripid = tripId
      console.log(datatripid)

      if (datatripid) {

        try {
          const response = await axios.get(`${apiUrl}/signaturedataurltrip/${datatripid}`)
          const data = response.data
          setFulltripdetails(data)
          console.log(data, "data");
          const startkm = data[0]?.startkm
          setStartkm(startkm)
          const closekm = data[0]?.closekm
          setClosekm(closekm)

          // setTimeout(() => {
          //     setExpired(true);
          //     sessionStorage.setItem("expiredsign", true);
          //     localStorage.setItem("expiredsign", true);
          //   }, 5000);
        }
        catch (err) {
          setExpired(1);
          console.log(err)
        }
      }
      else {
        setFulltripdetails([])
        setIsLoading(true)
      }
    }
    signturedatafullly()
  }, [apiUrl, tripId])


  // useEffect(() => {
  //     if (fulldetails.length > 0) {
  //         const expirationTimer = setTimeout(() => {
  //             setExpired(true);
  //             sessionStorage.setItem("expiredsign", true);
  //             localStorage.setItem("expiredsign", true);
  //         }, 30000);
  //         return () => clearTimeout(expirationTimer);
  //     }
  // }, [fulldetails]);

  const [isLoading, setIsLoading] = useState(false);
  if (expired) {
    return <div>This link has expired. Please generate a new link.</div>;
  }

  // const generateLink = async () => {


  //     try {
  //         const tripno = tripId
  //         const status = "Accept"
  //         const { dateTime, time } = getCurrentDateTimeFormatted();
  //         const signtauretimes = {
  //             status: status,
  //             datesignature: dateTime,
  //             signtime: time
  //         }
  //         const response = await axios.post(`${apiUrl}/generate-link/${tripno}`)
  //         // await axios.post(`${apiUrl}/signaturedatatimes/${tripno}/${status}`)
  //         await axios.post(`${apiUrl}/signaturedatatimes/${tripno}`, signtauretimes)


  //         const data = response.data.link
  //         window.location.href = data;
  //         // window.open(data, '_blank');
  //         // setExpired(true);
  //         sessionStorage.setItem("expiredsign", true);
  //         localStorage.setItem("expiredsign", true);

  //         // setLink(data);
  //         // getSignatureImage()
  //         // copyToClipboardf(data)
  //     } catch {
  //     }
  // };

  // const handleDataUpload = async () => {
  //     const tripid = fulldetails[0]?.tripid; // Replace with actual trip ID
  //     const updatedCustomerData = { startkm, closekm };
  //     console.log(updatedCustomerData, ' data of the customer')

  //     try {
  //       // Send both startkm and closekm in one PUT request
  //       const response = await axios.put(
  //         `${apiUrl}/tripsheet-edit/${tripid}`, 
  //         updatedCustomerData
  //       )

  //       console.log('Start KM and Close KM updated:', response.data);
  //     } catch (error) {
  //       // Handle error status
  //       setUploadStatus('failure');
  //       setTimeout(() => setUploadStatus(null), 1000);

  //       console.error('Failed to upload Start KM and Close KM:', error);
  //     }
  //   };

  const handleDataUpload = async () => {
    const tripid = fulldetails[0]?.tripid; // Replace with actual trip 
    const Hcl = fulldetails[0]?.Hybriddata;// Replace with actual trip ID
    const duty = fulldetails[0]?.duty;
    const updatedCustomerData = { startkm, closekm, Hcl, duty };
    console.log(updatedCustomerData, ' data of the customer');

    if (!startkm.trim() || !closekm.trim()) {
      setisAlert("Empty")
      setTimeout(() => setisAlert(null), 2000);
     
      return;
    }

    try {
      // Send both startkm and closekm in one PUT request
      const response = await axios.put(
        `${apiUrl}/tripsheet-updatekm/${tripid}`,
        updatedCustomerData
      );

      console.log('Start KM and Close KM updated:', response.data);
      if (response.status === 200) {
        setUploadStatus('success');
        setTimeout(() => setUploadStatus(null), 1000);
      }
    } catch (error) {
      console.error('Failed to upload Start KM and Close KM:', error.response ? error.response.data : error);
      setUploadStatus('failure');
      setTimeout(() => setUploadStatus(null), 1000);
    }
  };



  const generateLink = async () => {
    try {
      setIsLoading(true); // Start loading
      console.log(isLoading, 'loafing state')
      const tripno = tripId;
      const status = "Accept";
      const { dateTime, time } = getCurrentDateTimeFormatted();
      const signtauretimes = {
        status: status,
        datesignature: dateTime,
        signtime: time,
      };
      const updatedetails = {
        tripid: tripno,
        Expired: false,
        signExpired: false,
        UploadTollExpired: false,
        ExpiredUploadpage: false



      }
      console.log(signtauretimes, 'sign data')
      const response = await axios.post(`${apiUrl}/generate-link/${tripno}`);
      await axios.post(`${apiUrl}/signaturelinkExpiredatas/`, updatedetails)
      await axios.post(`${apiUrl}/signaturedatatimes/${tripno}`, signtauretimes);

      const data = response.data.link;
      // console.log(data,"lll")
      window.location.href = data;
      // setExpired(1);
      // sessionStorage.setItem("expiredsign", true);
      // localStorage.setItem("expiredsign", true);
    } catch (error) {
      console.error("Error generating link:", error);
      setExpired(1);
    } finally {
      setIsLoading(true); // Stop loading


      console.log(isLoading, 'loafing state')
    }
  };
  const handlesignaturedata = () => {
    console.log("naviagte data")
    generateLink()
  }
  const handleTollParkinglink = async () => {
    const tripdata = tripId;
    // const updatedetails = {
    //   tripid: tripdata,
    //   Expired: true,
    //   signExpired: true,
    //   UploadTollExpired: true,
    //   ExpiredUploadpage: false



    // }
    const updatedetails = {
      tripid: tripdata,
      Expired: true,
      signExpired: true,
      UploadTollExpired: true,
      ExpiredUploadpage: false



    }
    // const tripdata = tripId;
    // const uploadtollaprk = `http://localhost:3000/UploadtollPark?Tripid=${tripdata}`
    const uploadtollaprk = `https://jessycabs.com/UploadtollPark?Tripid=${tripdata}`
    await axios.post(`${apiUrl}/signaturelinkExpiredatas/`, updatedetails)
    linkexpiredata()
    // const uploadtollaprk=`http://localhost:3000/UploadtollPark?Tripid=${tripdata}`
    // window.open(uploadtollaprk,'_blank')
    window.location.href = uploadtollaprk;
    // setExpired(1)

  }


  const timeformtdata = (datatime) => {
    // console.log(datatime)
    const time = parse(datatime, 'HH:mm:ss', new Date());
    // Format to get hours and minutes
    return datefunsdata(time, 'HH:mm');
  }
  // console.log(fulldetails,"full")



  const handleUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf, .jpg, .jpeg, .png';
    input.onchange = handleFileChange
    input.click();
  }

  const handleFileChange = async (event) => {
    const tripid = tripId;
    const file = event.target.files[0];
    if (!file) return;

    const data = Date.now().toString();
    const formData = new FormData();
    formData.append('image', file);

    try {
      console.log('Uploading file:', { tripId, data, file });
      const response = await axios.put(`${apiUrl}/tripsheet_uploads/${tripid}/${data}`, formData);
      console.log('File uploaded successfully:', response.data);
      setUploadStatus('success');
      setTimeout(() => setUploadStatus(null), 1000);
    } catch (error) {
      console.error('Error uploading file:', error);
      //   alert('Failed to upload file. Please try again.');
      setUploadStatus('failure');
      setTimeout(() => setUploadStatus(null), 1000);
    }
  };

  const handleclosekmUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf, .jpg, .jpeg, .png';
    input.onchange = handleCloseKmFileChange
    input.click();
  }

  const handleCloseKmFileChange = async (event) => {
    const tripid = tripId;
    const file = event.target.files[0];
    if (!file) return;

    const data = Date.now().toString();
    const formcloseData = new FormData();
    formcloseData.append('image', file);
    try {
      console.log('Uploading Close KM image:', { tripId, data, file });
      const response = await axios.put(`${apiUrl}/tripsheet_uploadsclosekm/${tripid}/${data}`, formcloseData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },


      });
      setUploadStatus1('success');
      setTimeout(() => setUploadStatus1(null), 1000);
      console.log('Close KM image uploaded successfully:', response.data);
    } catch (error) {
      setUploadStatus1('failure');
      setTimeout(() => setUploadStatus1(null), 1000);
      console.error('Error uploading Close KM image:', error);
      //   alert('Failed to upload Close KM image. Please try again.');
    }
  };



  return (

    <div className={isLoading ? "loading-container" : ""} style={{ display: 'flex', justifyContent: 'center' }}>
      {isLoading ? (
        <div className="loading-spinners">
          <div className="logo-loading">
            <img src={Logo} alt="logo" />
          </div>
        </div>
      ) : (


        <div className='top-div signature-generate-main'>

          {expired ? <> </> : <>
            <div className='signature-generate-input'>
              <p>Trip Id : </p>
              <input value={fulldetails[0]?.tripid || ""} />
            </div>
            <div className='signature-generate-input'>
              <p>Guest Name : </p>
              <input value={fulldetails[0]?.guestname || ""} />
            </div>
            <div className='signature-generate-input'>
              <p>Guest MobileNo : </p>
              <input value={fulldetails[0]?.guestmobileno || ""} />
            </div>
            <div className='signature-generate-input'>
              <p>Vehicle Type : </p>
              <input value={`${fulldetails[0]?.vehicleName || ""} ${fulldetails[0]?.vehType || ""}`} />
            </div>
            <div className='signature-generate-input'>
              <p>Starting Date :</p>

              <input value={fulldetails[0]?.startdate ? datefunsdata(new Date(fulldetails[0].startdate), 'dd-MM-yyyy') : null} />
            </div>
            <div className='signature-generate-input'>
              <p>Starting Time :</p>
              <input value={fulldetails[0]?.starttime ? timeformtdata(fulldetails[0]?.starttime) : null} />
            </div>

            <div className='signature-generate-input'>
              <p>Closing Date </p>

              <input value={fulldetails[0]?.closedate ? datefunsdata(new Date(fulldetails[0].closedate), 'dd-MM-yyyy') : null} />
            </div>
            <div className='signature-generate-input'>
              <p>Closing Time </p>
              {/* <input value={fulldetails[0]?.closetime  /> */}
              <input value={fulldetails[0]?.closetime ? timeformtdata(fulldetails[0]?.closetime) : null} />
            </div>


            <div className="signature-generate-input">
              <p>Starting KM:</p>
              <div className="input-with-button">
                <input
                  value={startkm}
                  onChange={(e) => setStartkm(e.target.value)}
                />
                {/* <Button component="label" variant="contained" onClick={handleUpload}>
                  Upload
                </Button> */}
                   <span className='upload-icon'>
                        <RiFileUploadLine  onClick={handleUpload} />
                     </span>
              </div>
              {uploadStatus === 'success' && (
                <p style={{ color: 'green' }}>Successfully updated</p>
              )}
              {uploadStatus === 'failure' && (
                <p style={{ color: 'red' }}>Failed to upload.</p>
              )}
            </div>
            <div className="signature-generate-input">
              <p>Closing KM:</p>
              <div className="input-with-button">
                <input
                  value={closekm}
                  onChange={(e) => setClosekm(e.target.value)}
                />
                {/* <Button component="label" variant="contained" onClick={handleclosekmUpload}>
                  Upload
                </Button> */}
                 <span className='upload-icon'>
                        <RiFileUploadLine onClick={handleclosekmUpload} />
                     </span>
                     <Button component="label" variant="contained" style={{ marginLeft: 'auto' }} onClick={handleDataUpload}>Save </Button>
              </div>
              {uploadStatus1 === 'success' && (
                <p style={{ color: 'green' }}>Successfully updated</p>
              )}
              {uploadStatus1 === 'failure' && (
                <p style={{ color: 'red' }}>Failed to upload.</p>
              )}
               {isAlert === 'Empty' && (
                <p style={{ color: 'red' }}>Please Enter All Fields.</p>
              )}
            </div>
            <div className='signature-generate-input'>
              <p>Toll & Parking </p>
              <input value={`${fulldetails[0]?.toll || 0} & ${fulldetails[0]?.parking || 0}`} />
            </div>
            <div className='signature-generate-input'>
              <p>Permit</p>
              <input value={fulldetails[0]?.permit || ""} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
              {!uploadtoll ?

                <button className="Accept-btn" onClick={() => { handlesignaturedata(); handleDataUpload(); }}> Accept </button> : <></>}

              {uploadtoll ?
                <button className='Accept-btn' onClick={handleTollParkinglink}>upload toll & parking</button> : <></>
              }
            </div>

          </>}
        </div>
      )}

      {/* <>
                <div>
                    {uploadtoll === "true" ?
                        <button className='Accept-btn' onClick={handleTollParkinglink}>upload toll & parking</button> : <></>
                    }
                </div>
            </> */}




    </div>
  )

}

export default SignatureGenerate