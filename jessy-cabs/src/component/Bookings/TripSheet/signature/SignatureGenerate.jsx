import React, { useState, useEffect, useLayoutEffect } from 'react'
import './SignatureGenerate.css'
import { APIURL } from '../../../url';
import axios from 'axios'
import { format as datefunsdata, parse } from 'date-fns';
import Logo from "../../../../assets/img/logo.png";

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

    const uploaddata = () => {
        // localStorage.getItem("uploadtolldata");
        const data = localStorage.getItem("uploadtollparkdata");
        console.log(data, "dattataaaaaaaaaaaaa")
        setUploadToll(data)
    }
    //   useEffect(()=>{
    //     uploaddata()
    //   })
    useLayoutEffect(() => {
        uploaddata()
    }, [])



    const [fulldetails, setFulltripdetails] = useState([])
    const [expired, setExpired] = useState(() => {
        const expiredInSessionStorage =
            localStorage.getItem("expiredsign");
        return expiredInSessionStorage
            ? JSON.parse(expiredInSessionStorage)
            : false;
    });

    // const expiredInSessionStorage1 =localStorage.getItem("expiredsign") ? "true": false;
    // console.log(expiredInSessionStorage1,localStorage.getItem("expiredsign"),"erfcdfskdnmcnndnmnmnfdsnndnf")

    useEffect(() => {
        const signturedatafullly = async () => {
            const datatripid = tripId
            console.log(datatripid)

            if (datatripid) {

                try {
                    const response = await axios.get(`${apiUrl}/signaturedataurltrip/${datatripid}`)
                    const data = response.data
                    setFulltripdetails(data)
                    // setTimeout(() => {
                    //     setExpired(true);
                    //     sessionStorage.setItem("expiredsign", true);
                    //     localStorage.setItem("expiredsign", true);
                    //   }, 5000);
                }
                catch (err) {
                    setExpired(true);
                    console.log(err)
                }
            }
            else {
                setFulltripdetails([])
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
  
    const generateLink = async () => {
        try {
            setIsLoading(true); // Start loading
            console.log(isLoading,'loafing state')
            const tripno = tripId;
            const status = "Accept";
            const { dateTime, time } = getCurrentDateTimeFormatted();
            const signtauretimes = {
                status: status,
                datesignature: dateTime,
                signtime: time,
            };

            const response = await axios.post(`${apiUrl}/generate-link/${tripno}`);
            await axios.post(`${apiUrl}/signaturedatatimes/${tripno}`, signtauretimes);

            const data = response.data.link;
            window.location.href = data;

            sessionStorage.setItem("expiredsign", true);
            localStorage.setItem("expiredsign", true);
        } catch (error) {
            console.error("Error generating link:", error);
        } finally {
            setIsLoading(true); // Stop loading

            console.log(isLoading,'loafing state')
        }
    };
    const handlesignaturedata = () => {
        console.log("naviagte data")
        generateLink()
    }
    const handleTollParkinglink = () => {
        const tripdata = tripId;
        const uploadtollaprk = `http://jessycabs.com/UploadtollPark?Tripid=${tripdata}`
        // const uploadtollaprk=`http://localhost:3000/UploadtollPark?Tripid=${tripdata}`
        // window.open(uploadtollaprk,'_blank')
        window.location.href = uploadtollaprk;
        // setExpired(true);
        sessionStorage.setItem("expiredsign", true);
        localStorage.setItem("expiredsign", true);
    }


    const timeformtdata = (datatime) => {
        const time = parse(datatime, 'HH:mm:ss', new Date());

        // Format to get hours and minutes
        return datefunsdata(time, 'HH:mm');
    }

    return (
       
        <div  className={isLoading ? "loading-container" : ""} style={{ display: 'flex', justifyContent: 'center' }}>
             { isLoading ? (
          <div className="loading-spinners">
            <div className="logo-loading">
              <img src={Logo} alt="logo" />
            </div> 
          </div>
             ):(
            <div className='top-div signature-generate-main'>
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
                    {/* <input value={fulldetails[0]?.startdate?dayjs(fulldetails[0]?.startdate).format("YYYY-MM-DD"): ""} /> */}
                    {/* <input value={fulldetails[0]?.startdate ? datefunsdata(new Date(fulldetails[0].startdate), 'yyyy-MM-dd') : null} /> */}
                    <input value={fulldetails[0]?.startdate ? datefunsdata(new Date(fulldetails[0].startdate), 'dd-MM-yyyy') : null} />
                </div>
                <div className='signature-generate-input'>
                    <p>Starting Time :</p>
                    <input value={fulldetails[0]?.starttime ? timeformtdata(fulldetails[0]?.starttime) : null} />
                </div>
                <div className='signature-generate-input'>
                    <p>Starting KM : </p>
                    <input value={fulldetails[0]?.startkm || ""} />
                </div>
                <div className='signature-generate-input'>
                    <p>Closing Date </p>
                    {/* <input value={fulldetails[0]?.closedate ? dayjs(fulldetails[0]?.closedate).format("YYYY-MM-DD") : ""} /> */}
                    {/* <input value={fulldetails[0]?.closedate ? datefunsdata(new Date(fulldetails[0].closedate), 'yyyy-MM-dd') : null} /> */}
                    <input value={fulldetails[0]?.closedate ? datefunsdata(new Date(fulldetails[0].closedate), 'dd-MM-yyyy') : null} />
                </div>
                <div className='signature-generate-input'>
                    <p>Closing Time </p>
                    {/* <input value={fulldetails[0]?.closetime  /> */}
                    <input value={fulldetails[0]?.closetime ? timeformtdata(fulldetails[0]?.closetime) : null} />
                </div>
                <div className='signature-generate-input'>
                    <p>Closing KM </p>
                    <input value={fulldetails[0]?.closekm || ""} />
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
                    <button className='Accept-btn' onClick={handlesignaturedata}> Accept</button>
                    {uploadtoll === "true" ?
                        <button className='Accept-btn' onClick={handleTollParkinglink}>upload toll & parking</button> : <></>
                    }
                </div>
                
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