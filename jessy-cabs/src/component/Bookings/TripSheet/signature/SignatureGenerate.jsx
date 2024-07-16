import React,{useState,useEffect} from 'react'
import './SignatureGenerate.css'
import { useLocation } from "react-router-dom";
import { APIURL } from '../../../url';
import axios from 'axios'

const SignatureGenerate = () => {
    const  apiUrl=APIURL
    const currDate = new Date().toLocaleDateString();
const currTime = new Date().toLocaleTimeString();
console.log(currDate,"curr",currTime)

    const location = useLocation();
    const [customerdata,setCustomerData]=useState([])

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        //----------------------

        const formData = {};


        const parameterKeys = [
           "tripid","GuestName","guestMobileNo","vehicleName","vehicleType","startDate","startTime","startKM","closeDate","closeTime","closeKM","toll","parking","permit"
        ];
        parameterKeys.forEach(key => {
            const value = params.get(key);
            if (value !== null && value !== "null") {
                formData[key] = value;
            }
        });
        console.log(formData, "VALUESSS")
       setCustomerData(formData)


      
        //   console.log(formvendorinfo,"")



        ///------

    }, [location]);
    console.log(customerdata,"ddddd")

    const generateLink = async () => {
        const customertrip=customerdata.tripid
        try {
            const tripno=customertrip
            const status="Accept"
            console.log(customertrip,"kk",tripno,"tttt")
            
            // const tripid = selectedCustomerData.tripid || formData.tripid || book.tripid;
                // await axios.post(`${apiUrl}/signaturedatatimes/${tripno}/${status}}`)
            // const response = await axios.post(`${apiUrl}/generate-link/${tripno}`)
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
    const handlesignaturedata=()=>{
        console.log("naviagte data")
        generateLink()
    }
    
    return (
        <div>

            <div className='top-div'>
                <div>
                    <p>Trip Id : </p>
                    <input value={customerdata.tripid||""} />
                </div>
                <div>
                    <p>Guest Name : </p>
                    <input value={customerdata.GuestName||""} />
                </div>
                <div>
                    <p>Guest MobileNo : </p>
                    <input value={customerdata.guestMobileNo ||""} />
                </div>
                <div>
                    <p>Vehicle Type : </p>
                    <input value={`${customerdata.vehicleName} ${customerdata.vehicleType}`||""} />
                </div>
                <div>
                    <p>Starting Date :</p>
                    <input value={customerdata.startDate ||""} />
                </div>
                <div>
                    <p>Starting Time :</p>
                    <input value={customerdata.startTime||""} />
                </div>
                <div>
                    <p>Starting KM : </p>
                    <input value={customerdata.startKM||""} />
                </div>
                <div>
                    <p>Closing Date </p>
                    <input value={customerdata.closeDate||""} />
                </div>
                <div>
                    <p>Closing Time </p>
                    <input value={customerdata.closeTime||""} />
                </div>
                <div>
                    <p>Closing KM </p>
                    <input value={customerdata.closeKM ||""} />
                </div>
                <div>
                    <p>Toll & Parking </p>
                    <input value={`${customerdata.toll||""} & ${customerdata.parking||""}`} />
                </div>
                <div>
                    <p>Permit</p>
                    <input value={customerdata.permit || ""} />
                </div>
                <button className='Accept-btn' onClick={handlesignaturedata}> Accept</button>
            </div>




        </div>
    )
}

export default SignatureGenerate