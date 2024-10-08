import React,{useState,useContext} from "react";
import usePopUpContent from "./usePopUpContent";
const PopUpContent = ({ lat, lng, placeName, tripid, onAddMarker,onRemoveMarker, date, time, tripType,refresh }) => {
    
    // Pass initial values to the hook
    const { submitMapPopUp,  mapContent, setMapContent } = usePopUpContent({
        tripid,
        time,
        date,
        placeName,
        tripType
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setMapContent((prevState) => ({
            ...prevState,
            [name]: value // Dynamically update the field based on the input name
        }));
    };
const handleSubmit = async()=>{
    onAddMarker(lat, lng, tripType,placeName,date,time,mapContent?.trip_type);
  const result =  await submitMapPopUp({ lat, lng, placeName, tripid });

  if(result){
      if(typeof refresh === 'function'){
    refresh()
      }

  }

}
    return (
        <div>
            <label htmlFor="date">Date:</label>
            <input
                type="date"
                id="date"
                name="date"
                value={mapContent.date}
                onChange={handleChange}
                required
            /><br />
            <label htmlFor="time">Time:</label>
            <input
                type="time"
                id="time"
                name="time"
                value={mapContent.time}
                onChange={handleChange}
                required
            /><br />
            <label htmlFor="tripType">Trip Type:</label>
            <select
                id="tripType"
                name="trip_type"
                value={mapContent.trip_type}
                onChange={handleChange}
            >
                <option value="start">Start</option>
                <option value="end">End</option>
                <option value="waypoint">Waypoint</option>
            </select><br />
            <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: 5 }}>
                <button
                    id="submitButton"
                    onClick={() => {
                        handleSubmit()
                         // Add the marker after form submission
                    }}
                >
                    Submit
                </button>
                <button id="DeleteButton"  onClick={onRemoveMarker}>Delete</button>
            </div>
        </div>
    );
};

export default PopUpContent;
