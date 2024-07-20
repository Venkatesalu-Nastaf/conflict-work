import React, { useState, useEffect } from 'react'
import './SignatureGenerate.css'
import { APIURL } from '../../../url';
import axios from 'axios'

const SignatureGenerate = () => {
    const apiUrl = APIURL
    const tripId = new URLSearchParams(window.location.search).get("tripid");



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

    console.log(expired,"datata")
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


    useEffect(() => {
        if (fulldetails.length > 0) {
            const expirationTimer = setTimeout(() => {
                setExpired(true);
                sessionStorage.setItem("expiredsign", true);
                localStorage.setItem("expiredsign", true);
            }, 30000);
            return () => clearTimeout(expirationTimer);
        }
    }, [fulldetails]);


    if (expired) {
        return <div>This link has expired. Please generate a new link.</div>;
    }

    const generateLink = async () => {


        try {
            const tripno = tripId
            const status = "Accept"
            const response = await axios.post(`${apiUrl}/generate-link/${tripno}`)
            await axios.post(`${apiUrl}/signaturedatatimes/${tripno}/${status}`)


            const data = response.data.link
            window.open(data, '_blank');

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




        </div>
    )
}

export default SignatureGenerate