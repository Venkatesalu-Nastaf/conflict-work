import React from 'react';
import './Tripdetails.css'
import { TextField } from "@mui/material";
import { Button} from "@mui/material";

const makeStyle = (status) => {
    if (status === 'Waiting' || status === 'On_Going') {
        return {
            background: 'rgb(145 254 159 / 47%)',
            color: 'green',
            border: '2px solid rgb(145 254 159 / 47%)',
        }
    }
    else if (status === 'Closed') {
        return {
            background: '#ffadad8f',
            color: 'red',
            border: '2px solid #ffadad8f',

        }
    }
    else {
        return {
            background: '#59bfff',
            color: 'white',
            border: '2px solid #59bfff',
        }
    }
}

const TripDetails = ({ tripData }) => {
    if (!tripData || !tripData.tripid || tripData.tripid === "" || !tripData.startdate || tripData.startdate === "" /* Add other properties as needed */) {
        // return <div>No trip data available</div>;
        return;
    }
    return (
        <div>
            <h1 className="trip-Title">View Duty</h1>
            <form className='TripDetails-container'>
                <div className="field-item">
                    <div className="input">
                        <label htmlFor="tripid">Trip No :</label>
                        <TextField size='small' id="tripid" name="tripid" value={tripData.tripid} readOnly />
                    </div>
                    <div className="input">
                        <label htmlFor="startdate">Trip Date :</label>
                        <TextField size='small' id="startdate" name="startdate" value={tripData.startdate} required />
                    </div>
                    <div className="input">
                        <label htmlFor="starttime">Start Time :</label>
                        <TextField size='small' id="starttime" name="starttime" value={tripData.starttime} required />
                    </div>
                </div>

                <div className='field-item'>
                    <div className="input">
                        <label htmlFor="startkm">Start Kilometers :</label>
                        <TextField size='small' id="startkm" name='startkm' value={tripData.startkm} required />
                    </div>
                    <div className="input">
                        <label htmlFor="closedate">Closing Date :</label>
                        <TextField size='small' id="closedate" name='closedate' value={tripData.closedate} required />
                    </div>
                    <div className="input">
                        <label htmlFor="closetime">Closing Time :</label>
                        <TextField size='small' id="closetime" name='closetime' value={tripData.closetime} required />
                    </div>
                </div>
                <div className='field-item'>
                    <div className="input">
                        <label htmlFor="closekm">Closing Kilometers :</label>
                        <TextField size='small' id="closekm" name='closekm' value={tripData.closekm} required />
                    </div>
                    <div className="input">
                        <label htmlFor="guestname">Guest Name :</label>
                        <TextField size='small' id="guestname" name="guestname" value={tripData.guestname} readOnly />
                    </div>
                    <div className="input">
                        <label htmlFor="guestmobileno">Contact Number :</label>
                        <TextField size='small' id="guestmobileno" name="guestmobileno" value={tripData.guestmobileno} readOnly />
                    </div>
                </div>
                <div className='field-item'>
                    <div className="input">
                        <label htmlFor="vehType">Vehicle Type :</label>
                        <TextField size='small' id="vehType" name="vehType" value={tripData.vehType} readOnly />
                    </div>
                    <div className="input">
                        <label htmlFor="customer">Company Name :</label>
                        <TextField size='small' id="customer" name="customer" value={tripData.customer} readOnly />
                    </div>
                    <div className="input">
                        <label htmlFor="advancepaidtovendor">Advance :</label>
                        <TextField size='small' id="advancepaidtovendor" name='advancepaidtovendor' value={tripData.advancepaidtovendor} required />
                    </div>
                </div>
                <div className='field-item'>
                    <div className="input">
                        <label htmlFor="toll">Toll :</label>
                        <TextField size='small' id="toll" name='toll' value={tripData.toll} required />
                    </div>
                    <div className="input">
                        <label htmlFor="parking">Parking :</label>
                        <TextField size='small' id="parking" name='parking' value={tripData.parking} required />
                    </div>
                    <div className="input">
                        <label htmlFor="address1">Address :</label>
                        <TextField size='small' id="address1" name='address1' value={tripData.address1} readOnly />
                    </div>
                </div>
                <div className='field-item'>
                    <div className="input">
                        <span style={makeStyle(tripData.apps)} className="dialog-status" >{tripData.apps}</span>
                    </div>
                    <div className="input">
                        <Button>Trip Sheet</Button>
                    </div>
                </div>
            </form>
        </div>
    );

};

export default TripDetails;
