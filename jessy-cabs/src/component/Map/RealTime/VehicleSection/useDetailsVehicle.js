import React, { useState, useEffect } from "react";
import { APIURL } from "../../../url";
import axios from 'axios';
import { PermissionContext } from "../../../context/permissionContext";
import { useContext } from "react";

const useDetailsVehicle = () => {
    const apiUrl = APIURL;
    const [vehiclesData, setVehiclesData] = useState(null);
    const { vehicleListData, setVehicleListData, vehicleSearchDetails, setVehicleSearchDetails } = useContext(PermissionContext)

    //   get All vehicles List
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/getAllVehicleDetailsList`);
                console.log(response.data, "vehicle data");
                setVehiclesData(response.data)
                setVehicleListData(response.data)
            }
            catch (err) {
                console.log(err, "error");

            }
        }
        fetchData()
    }, [apiUrl])

    // get full vehicle details
    useEffect(() => {
        const fetchData = async () => {
            console.log(vehicleSearchDetails, "vehicle nooooo1");
    
            try {
                if (vehicleSearchDetails !== "") {
                    console.log(vehicleSearchDetails, "vehicle nooooo222222");
                    const response = await axios.get(`${apiUrl}/getVehicleParticularInfo`, {
                        params: { vehicleSearchDetails },
                    });
                    console.log(response.data, "vehicle particular data");
                    setVehicleListData(response.data);
                }
            } catch (err) {
                console.error(err, "error");
            }
        };
    
        fetchData();
    }, [apiUrl, vehicleSearchDetails]); // Removed vehicleListData from dependency array
    
    return {
        vehiclesData
    }
}
export default useDetailsVehicle;