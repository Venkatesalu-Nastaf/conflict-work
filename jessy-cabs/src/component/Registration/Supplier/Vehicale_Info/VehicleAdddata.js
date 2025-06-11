import { useState, useEffect } from "react";
import { APIURL } from "../../../url";
import axios from 'axios'
import dayjs from "dayjs";

const VehicleAddData = () => {
    const apiUrl = APIURL
    const [isOpenvehcile, setIsOpenvehicle] = useState(false);
    const [vechiclevalue, setVechicleValue] = useState("");
    const [error1, setError1] = useState(false);
    const [errorMessage1, setErrorMessage] = useState({})
    const [success1, setSuccess1] = useState(false);
    const [successMessage1, setSuccessMessage] = useState({})
    const [vehicleNamesList, setVehicleNamesList] = useState(null);
    const [vehicleListTrigger, setVehicleListTrigger] = useState(null);
    const [editData, setEditData] = useState(null)
    const [deleteData, setDeleteData] = useState(null)
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)



    const hidePopup1 = () => {
        setSuccess1(false)
        setError1(false)
    }

    useEffect(() => {
        if (error1 || success1) {
            const timer = setTimeout(() => {
                hidePopup1();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error1, success1]);

    const handleinputchnagevehicle = (e) => {
        setVechicleValue(e.target.value)
    }

    const handleADDvehicledata = async () => {

        if (!vechiclevalue) {
            setError1(true)
            setErrorMessage("Enter the vehicle value")
            return
        }

        const isDuplicate = vehicleNamesList?.some(
            (vehicle) => vehicle.VechicleNames.toLowerCase() === vechiclevalue.toLowerCase()
        );

        if (isDuplicate) {
            setError1(true);
            setErrorMessage("This vehicle already exists");
            return;
        }
        try {
            const created_at = dayjs().format('YYYY-MM-DD')
            const vehicledata = {
                vechiclevalue: vechiclevalue,
                created_at: created_at
            }
            await axios.post(`${apiUrl}/getvehciledatauniquevehilcle`, vehicledata)
            // setIsOpenvehicle(false)
            setVehicleListTrigger((prev) => !prev)
            setVechicleValue("")
            setSuccess1(true)
            setSuccessMessage("successfully added vehicle")


        }
        catch (error) {

            setError1(true)
            setErrorMessage("failed to retrive data")
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/getVehicleNamesList`);
                // console.log(response.data, "vehicles list");

                const vehiclesWithIds = response.data.map((vehicle, index) => ({
                    ...vehicle,
                    id: index + 1,
                    dbid: vehicle?.id
                }));

                setVehicleNamesList(vehiclesWithIds);
            } catch (err) {
                console.error(err, "error");
            }
        };

        fetchData();
    }, [apiUrl, vehicleListTrigger]);

    const handleVehicleEditName = async (row) => {
        setEditModal(true)
        // console.log(row, "editrowdata");
        const vehicleName = row
        setEditData(vehicleName)
    }

    const vehicleNameEditFun = async () => {
        if (editData?.VechicleNames === "") { // Ensure `editData` is not empty or null
            setError1(true);
            setErrorMessage("Enter VehicleName");
            return;
        }

        const vehicleName = editData?.VechicleNames;
        const id = editData?.dbid
        // console.log(vehicleName, "vehiclenameeeeeeeee", id);

        try {
            await axios.post(`${apiUrl}/updateVehicleNamesList`, { vehicleName, id });
            // console.log(response, "Vehicle name updated successfully");
            setSuccess1(true)
            setSuccessMessage("Successfully updated")
            setVehicleListTrigger((prev) => !prev)
            setEditModal(false)
        } catch (error) {
            console.error("Error updating vehicle name:", error);
            setError1(true);
            setErrorMessage("Failed to update vehicle name");
        }
    };


    const vehicleNameDeleteFun = async () => {
        const id = deleteData?.dbid;
        
    
        if (!id) {
            setError1(true);
            setErrorMessage("Invalid vehicle ID");
            return;
        }
    
        try {
             await axios.post(`${apiUrl}/deleteVehicleNamesList`, {
                id
            });
            // console.log(response.data, "deleted successfully");
            setSuccess1(true);
            setSuccessMessage("Vehicle deleted successfully");
            setVehicleListTrigger((prev) => !prev)
            setDeleteModal(false)
        } catch (error) {
            console.error(error, "error");
            setError1(true);
            setErrorMessage("Failed to delete vehicle");
        }
    };
    
    const handleVehicleDeleteName = (row) => {
        setDeleteModal(true)
        const vehicleName = row
        setDeleteData(vehicleName)
    }
    return {
        handleinputchnagevehicle, handleADDvehicledata, vechiclevalue, isOpenvehcile, setIsOpenvehicle, error1, errorMessage1, success1, successMessage1, hidePopup1,
        vehicleNamesList,
        handleVehicleDeleteName, handleVehicleEditName, editModal, setEditModal, deleteModal, setDeleteModal, vehicleNameEditFun,vehicleNameDeleteFun, editData, setEditData
    }

};



export default VehicleAddData;
