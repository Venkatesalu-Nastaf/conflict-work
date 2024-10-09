import React, { useState, useContext } from "react";
import axios from "axios";
import dayjs from 'dayjs';
import { APIURL } from "../../../url";
const usePopUpContent = (initialData) => { // Accept initial data
    // const [mapContent, setMapContent] = useState({
    //     tripid: initialData?.tripid || '',
    //     time: initialData?.time || '',
    //     date: initialData?.date || '',
    //     place_name: initialData?.placeName || '',
    //     Location_Alpha: '',
    //     trip_type: initialData?.tripType || 'start',
    //     Latitude: '',
    //     Longitude: ''
    // });


    // In the component
    const [mapContent, setMapContent] = useState({
        tripid: initialData?.tripid || '',
        time: initialData?.time || dayjs().format('HH:mm'),
        // Format the initial date if present, otherwise format the current date or leave it empty
        date: initialData?.date ? dayjs(initialData?.date).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'),
        place_name: initialData?.placeName || '',
        Location_Alpha: '',
        trip_type: initialData?.tripType || 'start',
        Latitude: '',
        Longitude: ''
    });

    const apiUrl = APIURL;

    const submitMapPopUp = async (lat) => {

        let alpha = '';

        if (mapContent.trip_type === "start") {
            alpha = "A";
        } else if (mapContent.trip_type === "waypoint") {
            alpha = "B";
        } else if (mapContent.trip_type === "end") {
            alpha = "C";
        }

        // Update the map content state with the new latitude and longitude
        setMapContent(prevContent => ({
            ...prevContent,
            Latitude: lat.lat,
            Longitude: lat.lng,
            Location_Alpha: alpha,
            place_name: lat.placeName,
        }));

        // Construct the payload data for the POST request
        const payload = {
            tripid: lat.tripid,
            placeName: lat.placeName,
            Location_Alpha: alpha,
            latitude: lat.lat,
            longitude: lat.lng,
            date: mapContent.date,
            time: mapContent.time,
            tripType: mapContent.trip_type,
        };
        console.log(payload, 'payload');

        // Send POST request to the backend
        try {
            const response = await axios.post(`${apiUrl}/gmappost-submitForm`, payload);
            console.log(response.data, 'response from backend');
            return true
        } catch (error) {
            console.error('Error submitting map pop-up data:', error);
            return false
        }
    };

    const deletePopUp = async () => {
        // Handle deletion logic if required
    };

    return {
        submitMapPopUp,
        deletePopUp,
        mapContent,
        setMapContent,


    };
};

export default usePopUpContent;
