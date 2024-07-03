import React from 'react'
import './SignatureGenerate.css'

const SignatureGenerate = ({ GuestName, tripid, guestMobileNo, vehicleName, vehicleType, startDate, startTime, startKM, closeDate, closeTime, closeKM, toll, parking, permit }) => {
    return (
        <div>

            <div className='top-div'>
                <div>
                    <p>Trip Id : </p>
                    <input value={tripid} />
                </div>
                <div>
                    <p>Guest Name : </p>
                    <input value={GuestName} />
                </div>
                <div>
                    <p>Guest MobileNo : </p>
                    <input value={guestMobileNo} />
                </div>
                <div>
                    <p>Vehicle Type : </p>
                    <input value={`${vehicleName} ${vehicleType}`} />
                </div>
                <div>
                    <p>Starting Date :</p>
                    <input value={startDate} />
                </div>
                <div>
                    <p>Starting Time :</p>
                    <input value={startTime} />
                </div>
                <div>
                    <p>Starting KM : </p>
                    <input value={startKM} />
                </div>
                <div>
                    <p>Closing Date </p>
                    <input value={closeDate} />
                </div>
                <div>
                    <p>Closing Time </p>
                    <input value={closeTime} />
                </div>
                <div>
                    <p>Closing KM </p>
                    <input value={closeKM} />
                </div>
                <div>
                    <p>Toll & Parking </p>
                    <input value={toll + parking} />
                </div>
                <div>
                    <p>Permit</p>
                    <input value={permit} />
                </div>
                <button className='Accept-btn'> Accept</button>
            </div>




        </div>
    )
}

export default SignatureGenerate