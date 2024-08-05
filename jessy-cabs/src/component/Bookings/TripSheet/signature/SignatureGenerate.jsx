import React, { useState, useEffect } from 'react'
import './SignatureGenerate.css'
import { APIURL } from '../../../url';
import axios from 'axios'
import {format as datefunsdata} from 'date-fns';

const SignatureGenerate = () => {
    const apiUrl = APIURL;
    const[uploadtoll,setUploadToll]=useState()
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
  
  const uploaddata=()=>{
    // localStorage.getItem("uploadtolldata");
    const data= localStorage.getItem("uploadtollparkdata");
       console.log(data,"dattataaaaaaaaaaaaa")
       setUploadToll(data)
  }
  useEffect(()=>{
    uploaddata()
  })



    const [fulldetails, setFulltripdetails] = useState([])
    // const [expired, setExpired] = useState(() => {
    //     const expiredInSessionStorage =
    //         sessionStorage.getItem("expiredsign") && localStorage.getItem("expiredsign");
    //     return expiredInSessionStorage
    //         ? JSON.parse(expiredInSessionStorage)
    //         : false;
    // });
    const [expired, setExpired] = useState(() => {
        const expiredInSessionStorage =
         localStorage.getItem("expiredsign");
        return expiredInSessionStorage
            ? JSON.parse(expiredInSessionStorage)
            : false;
    });

    const expiredInSessionStorage1 =localStorage.getItem("expiredsign") ? "true": false;
    console.log(expiredInSessionStorage1,localStorage.getItem("expiredsign"),"erfcdfskdnmcnndnmnmnfdsnndnf")

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


    if (expired) {
        return <div>This link has expired. Please generate a new link.</div>;
    }

    const generateLink = async () => {


        try {
            const tripno = tripId
            const status = "Accept"
            const { dateTime, time } = getCurrentDateTimeFormatted();
            const signtauretimes={
                status:status,
                datesignature:dateTime,
                signtime:time            }
            const response = await axios.post(`${apiUrl}/generate-link/${tripno}`)
            // await axios.post(`${apiUrl}/signaturedatatimes/${tripno}/${status}`)
            await axios.post(`${apiUrl}/signaturedatatimes/${tripno}`,signtauretimes)


            const data = response.data.link
            window.open(data, '_blank');
            setExpired(true);
                sessionStorage.setItem("expiredsign", true);
                localStorage.setItem("expiredsign", true);

            // setLink(data);
            // getSignatureImage()
            // copyToClipboardf(data)
        } catch {
        }
    };
    const handlesignaturedata = () => {
        console.log("naviagte data")
        generateLink()
    }
     const handleTollParkinglink= ()=>{
        const tripdata=tripId;
         const uploadtollaprk=`http://taaftechnology.com/UploadtollPark?Tripid=${tripdata}`
        // const uploadtollaprk=`http://localhost:3000/UploadtollPark?Tripid=${tripdata}`
        window.open(uploadtollaprk,'_blank')
        setExpired(true);
        sessionStorage.setItem("expiredsign", true);
        localStorage.setItem("expiredsign", true);
     }


    return (
        <div>

            <div className='top-div'>
                <div>
                    <p>Trip Id : </p>
                    <input value={fulldetails[0]?.tripid || ""} />
                </div>
                <div>
                    <p>Guest Name : </p>
                    <input value={fulldetails[0]?.guestname || ""} />
                </div>
                <div>
                    <p>Guest MobileNo : </p>
                    <input value={fulldetails[0]?.guestmobileno || ""} />
                </div>
                <div>
                    <p>Vehicle Type : </p>
                    <input value={`${fulldetails[0]?.vehicleName || ""} ${fulldetails[0]?.vehType || ""}`} />
                </div>
                <div>
                    <p>Starting Date :</p>
                    <input value={fulldetails[0]?.startdate || ""} />
                </div>
                <div>
                    <p>Starting Time :</p>
                    <input value={fulldetails[0]?.starttime || ""} />
                </div>
                <div>
                    <p>Starting KM : </p>
                    <input value={fulldetails[0]?.startkm || ""} />
                </div>
                <div>
                    <p>Closing Date </p>
                    <input value={fulldetails[0]?.closedate || ""} />
                </div>
                <div>
                    <p>Closing Time </p>
                    <input value={fulldetails[0]?.closetime || ""} />
                </div>
                <div>
                    <p>Closing KM </p>
                    <input value={fulldetails[0]?.closekm || ""} />
                </div>
                <div>
                    <p>Toll & Parking </p>
                    <input value={`${fulldetails[0]?.toll || ""} & ${fulldetails[0]?.parking || ""}`} />
                </div>
                <div>
                    <p>Permit</p>
                    <input value={fulldetails[0]?.permit || ""} />
                </div>
                <button className='Accept-btn' onClick={handlesignaturedata}> Accept</button>
            </div>

            <>
            <div>
             {uploadtoll === "true" ?
            <button className='Accept-btn' onClick={handleTollParkinglink}>upload toll & parking</button> : <></>
             }
            </div>
            </>




        </div>
    )
}

export default SignatureGenerate