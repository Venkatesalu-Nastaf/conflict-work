import React from 'react';

const TripDetails = ({ tripData }) => {
    if (!tripData) {
        return <div>No trip data available</div>;
    }
    return (
        <div>
            <h2>View Duty</h2>
            <div className="form-container-ViewDuty">
                <h1 className="trip-Title">Trip Details</h1>
                <form>
                    <div className='field-item'>
                        <input label='Trip Sheet No :' name="tripid" value={tripData.tripid} readonly />
                    </div>
                    <div className='field-item'>
                        <input label='Trip Date :' name="startdate" value={tripData.startdate} required />
                    </div>
                    <div className='field-item'>
                        <input label='Start Time :' name="starttime" value={tripData.starttime} required />
                    </div>
                    <div className='field-item'>
                        <input label='Start Kilometers :' name='startkm' value={tripData.startkm} required />
                    </div>
                    <div className='field-item'>
                        <input label='Closing Date :' name='closedate' value={tripData.closedate} required />
                    </div>
                    <div className='field-item'>
                        <input label='Closing Time :' name='closetime' value={tripData.closetime} required />
                    </div>
                    <div className='field-item'>
                        <input label='Closing Kilometers :' name='closekm' value={tripData.closekm} required />
                    </div>
                    <div className='field-item'>
                        <input label='Guest Name :' name="guestname" value={tripData.guestname} readonly />
                    </div>
                    <div className='field-item'>
                        <input label='Contact Number :' name="guestmobileno" value={tripData.guestmobileno} readonly />
                    </div>
                    <div className='field-item'>
                        <input label='Vehicle Type :' name="vehType" value={tripData.vehType} readonly />
                    </div>
                    <div className='field-item'>
                        <input label='Company Name ' name="customer" value={tripData.customer} readonly />
                    </div>
                    <div className='field-item'>
                        <input label='Advance :' name='advancepaidtovendor' value={tripData.advancepaidtovendor} required />
                    </div>
                    <div className='field-item'>
                        <input label='Toll :' name='toll' value={tripData.toll} required />
                    </div>
                    <div className='field-item'>
                        <input label='Parking :' name='parking' value={tripData.parking} required />
                    </div>
                    <div className='field-item'>
                        <input label='Address :' name='address1' value={tripData.address1} readonly />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TripDetails;
