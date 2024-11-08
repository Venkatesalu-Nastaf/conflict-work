import { useState, useEffect, useCallback,useMemo } from 'react';
import axios from 'axios';
import { APIURL } from "../../../url";

// Table START
const columns = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "ratetype", headerName: "Rate Type", width: 120 },
    { field: "duty", headerName: "Duty", width: 100 },
    { field: "stations", headerName: "Stations", width: 100 },
    { field: "OrganizationName", headerName: "Organization Name", width: 150 },
    { field: "vehicleName", headerName: "vehicle Type", width: 110 },
    { field: "package", headerName: "Package", width: 80 },
    { field: "Hours", headerName: "Hours", width: 70 },
    { field: "KMS", headerName: "KMS", width: 70 },
    { field: "Rate", headerName: "Rate", width: 70 },
    { field: "UptoHours", headerName: "Upto Hours", width: 100 },
    { field: "UptoKMS", headerName: "UptoKMS", width: 90 },
    { field: "extraHours", headerName: "Extra Hours", width: 100 },
    { field: "extraKMS", headerName: "Extra KMS", width: 90 },
    { field: "AKMS", headerName: "AKMS", width: 70 },
    { field: "NHalt", headerName: "NHalt", width: 70 },
    { field: "Bata", headerName: "Bata", width: 70 },
];
// TABLE END
const usePackagerateentry = () => {
    // const [fieldSets, setFieldSets] = useState([{
    //     // dinamic data
    //     duty: '',
    //     package: '',
    //     Hours: '',
    //     KMS: '',
    //     Rate: '',
    //     UptoHours: '',
    //     UptoKMS: '',
    //     extraHours: 0,
    //     extraKMS: 0,
    //     AKMS: 0,
    //     NHalt: '',
    //     Bata: '',
    // }]);
    const [fieldSets, setFieldSets] = useState([{
        // dinamic data
        duty: '',
        package: '',
        Hours: 0,
        KMS: 0,
        Rate: 0,
        UptoHours: 0,
        UptoKMS: 0,
        extraHours: 0,
        extraKMS: 0,
        AKMS: 0,
        NHalt: 0,
        Bata: 0,
    }]);

    const [commonData, setCommonData] = useState({
        ratetype: '',
        OrganizationName: "",
        vehicleName: '',
        Validity: '',
        stations:'',
    });

    const [ratename, setRatename] = useState([])

    //------------------------------

    const apiUrl = APIURL;
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [rows, setRows] = useState([]);
    const [actionName] = useState('');

    //error message
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [info, setInfo] = useState(false);
    const [warning, setWarning] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [warningMessage] = useState({});
    const [infoMessage, setInfoMessage] = useState({});

    //-------editmode------------------
    const [isEditMode, setIsEditMode] = useState(false);
    //------------------------------------------------
    const [validitydata, setValiditydata] = useState([])

    const [loading, setLoading] = useState(false)
   
    const memoizedUrl = useMemo(() => {
        if (!commonData.ratetype || !commonData.OrganizationName) {
            return null;
        }
        return `${apiUrl}/ratemanagementdatavalidityfromratetype/${commonData.ratetype}/${commonData.OrganizationName}`;
    }, [apiUrl, commonData.ratetype, commonData.OrganizationName]);
    useEffect(() => {
        if (!memoizedUrl) {
            return; // Exit early if URL is invalid
        }
        const fetchOrganizationnames = async () => {
            try {
                const response = await axios.get(memoizedUrl);
                const data = response.data;
                setValiditydata(data);
            } catch (error) {
                console.log(error, "error");
            }
        };
        fetchOrganizationnames();
    }, [memoizedUrl]);

    useEffect(() => {
        const fetchOrganizationnames = async () => {
            const data=commonData.ratetype
            if(!data){
                return
            }
         
            try {
                const response = await axios.get(`${apiUrl}/ratetypevendor/${commonData.ratetype}`);
                const data = response.data
                setRatename(data.map(row => row.ratename))
            }
            catch (error) {
                console.log(error, "error");
            }
        };
        fetchOrganizationnames()
    }, [apiUrl, commonData.ratetype])

    //// popup-----------------------------------------

    const hidePopup = () => {
        setSuccess(false);
        setError(false);
        setInfo(false);
        setWarning(false);
    };

    useEffect(() => {
        if (error || success || warning || info) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error, success, warning, info]);

    //------on change---------------------------------------------

    const handleChange = (event, index) => {
        const { name, value } = event.target;
        const newFieldSets = [...fieldSets];
        newFieldSets[index][name] = value;
        setFieldSets(newFieldSets);
        setCommonData(prevCommonData => ({
            ...prevCommonData,
            [name]: value
        }));
    };

    const handleAutocompleteChange = (event, value, name, index) => {
        const selectedOption = value ? value.label : '';

        if (index !== undefined) {
            // Handle Autocomplete fields with index (inside map function)
            const newFieldSets = [...fieldSets];
            newFieldSets[index][name] = selectedOption;
            setFieldSets(newFieldSets);
        } else {
            // Handle Autocomplete fields without index (outside map function)
            setCommonData(prevCommonData => ({
                ...prevCommonData,
                [name]: selectedOption,
            }));
        }
    };

    //----------------------------------------
    // const handleAddExtra = () => {
    //     setFieldSets([...fieldSets, {
    //         duty: '',
    //         package: '',
    //         Hours: '',
    //         KMS: '',
    //         Rate: '',
    //         UptoHours: '',
    //         UptoKMS: '',
    //         extraHours: '',
    //         extraKMS: '',
    //         AKMS: '',
    //         NHalt: '',
    //         Bata: '',
    //     }]);
    // };

    const handleAddExtra = () => {
        setFieldSets([...fieldSets, {
            duty: '',
            package: '',
            Hours: 0,
            KMS: 0,
            Rate: 0,
            UptoHours: 0,
            UptoKMS: 0,
            extraHours: 0,
            extraKMS: 0,
            AKMS: 0,
            NHalt: 0,
            Bata: 0,
        }]);
    };

    const handleCancelUI = (index) => {
        if (fieldSets.length === 1) {
            return;
        }
        const newDatas = [...fieldSets];
        newDatas.splice(index, 1);
        setFieldSets(newDatas);
    };

    // -------------------------------------------------------------
    
    const handleCancel = () => {
        setFieldSets((prefiled) => ([{
            // dinamic data
            duty: '',
            package: '',
            Hours: '',
            KMS: '',
            Rate: '',
            UptoHours: '',
            UptoKMS: '',
            extraHours: '',
            extraKMS: '',
            AKMS: '',
            NHalt: '',
            Bata: '',
        }]));

        setCommonData(prev => ({
            ratetype: '',
            OrganizationName: '',
            vehicleName: '',
            Validity: '',
            stations:''
        }))
        setIsEditMode(false);
        setValiditydata([])
    };

    const handleRowClick = useCallback((params) => {
        const customerData = params.row;

        const { duty, package: pkg, Hours, KMS, Rate, UptoHours, UptoKMS, extraHours, extraKMS, AKMS, NHalt, Bata } = customerData;
        setFieldSets([{
            duty,
            package: pkg,
            Hours,
            KMS,
            Rate,
            UptoHours,
            UptoKMS,
            extraHours,
            extraKMS,
            AKMS,
            NHalt,
            Bata,
        }]);
        // Extract relevant properties for commonData
        const { ratetype, OrganizationName, vehicleName, Validity,stations} = customerData;
        setCommonData({
            ratetype,
            OrganizationName,
            vehicleName,
            Validity,
            stations
        });
        setSelectedCustomerId(params.row.id);
        setIsEditMode(true);
    }, []);

    // const handleList = useCallback(async () => {
    //     try {
    //         const response = await axios.get(`${apiUrl}/ratemanagement`);
    //         const data = response.data;
    //         setRows(data);
    //         setLoading(tru)
    //         // console.log(data,'data is received')
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }, [apiUrl]); // Add any dependencies needed inside this array

    // const handleList = useCallback(async () => {
    //     setLoading(true)
    //     try {
    //         setLoading(true); // Set loading to true before making the API call
    //         const response = await axios.get(`${apiUrl}/ratemanagement`);
    //         const data = response.data;
    //         setRows(data); // Set the rows with the received data
    //         if (data.length > 0) {
    //             setLoading(false)
    //         }else{
    //             setLoading(false)
    //         }
    //     } catch (err) {
    //         console.log(err); // Log any errors that occur
    //         setLoading(false)
    //     } finally {
    //         setLoading(false); // Set loading to false once the request is done, whether successful or not
    //     }
    // }, [apiUrl]);

    const handleList = useCallback(async () => {
        setLoading(true); // Set loading to true before making the API call
    
        try {
            const response = await axios.get(`${apiUrl}/ratemanagement`);
            const data = response.data;
            setRows(data); // Set the rows with the received data
            if (data.length > 0) {
                setLoading(false);
            } else {
                setLoading(false);
            }
        } catch (err) {
            console.log(err); // Log any errors that occur
    
            // Check if it's a network error
            if (err.message === 'Network Error') {
                alert("Network Error: Please check your internet connection.");
            }
    
            setLoading(false);
        } finally {
            setLoading(false); // Ensure loading is set to false once the request is done, whether successful or not
        }
    }, [apiUrl]);
    
    

    useEffect(() => {
        handleList();
    }, [handleList]);

    const handleAdd = async () => {
        const dutys = fieldSets.map(fieldSet => fieldSet.duty);
         // Extract duties from fieldSets
        // Check if any duty is empty
        const rateType = commonData?.ratetype;
            const orgName = commonData?.OrganizationName;
            const vehicleType = commonData?.vehicleName;
            const stations=commonData?.stations;
            if(!rateType){
                setInfo(true)
                setInfoMessage("Enter The Ratetype") 
                return  
            }
            if(!orgName){
                setInfo(true)
                setInfoMessage("Enter The Ratename") 
                return  
            }
            if(!vehicleType){
                setInfo(true)
                setInfoMessage("Enter The Vehicletype") 
                return  
            }
            if(!stations){
                setInfo(true)
                setInfoMessage("Enter The Stations") 
                return  
            }

        if (dutys.some(duty => !duty)) {
            setError(true);
            setErrorMessage("Enter Duty field and others..!");
            return;
        }
        try {

            const requestData = fieldSets.map(fieldSet => ({ ...commonData, ...fieldSet }));
            // const requestData = fieldSets.map(fieldSet => ({ ...commonData, ...fieldSet }));
            await axios.post(`${apiUrl}/ratemanagement-add`, requestData);
            // If successful, update state
            setSuccess(true);
            setSuccessMessage("Successfully Added");
            handleCancel()
            handleList()
        } 
        // catch (error) {
        //     setError(true);
        //     setErrorMessage("Check your Network Connection");
        // }
        catch (error) {
            // console.error("Error occurredddddd:", error);
         
            // Check if there's no response, indicating a network error
            if (error.message ) {
                setError(true);
                setErrorMessage("Check your Network Connection");
                // console.log('Network error');
            } else if (error.response) {
                setError(true);
                // Handle other Axios errors (like 4xx or 5xx responses)
                setErrorMessage("Failed to add organization: " + (error.response.data.message || error.message));
            } else {
                // Fallback for other errors
                setError(true);
                setErrorMessage("An unexpected error occurred: " + error.message);
            }
        }
    };
    const handleShow = async () => {
        try {
            const rateType = commonData?.ratetype;
            const orgName = commonData?.OrganizationName || '';
            const vehicleType = commonData?.vehicleName || '';
            const stations=commonData?.stations || '';
            const payload = { rateType, orgName, vehicleType,stations }
            const response = await axios.get(`${apiUrl}/ratemanagement-show`, { params: payload });
            const data = response.data;
            if (data.length > 0) {
                setRows(data);
            } else {
                setRows([]);
                setInfo(true)
                setInfoMessage("No Data Found..!")
            }

        } 
        // catch (err) {
        //     console.log("err", err)
        // }
        catch (error) {
            // console.error("Error occurredddddd:", error);
         
            // Check if there's no response, indicating a network error
            if (error.message ) {
                setError(true);
                setErrorMessage("Check your Network Connection");
                // console.log('Network error');
            } else if (error.response) {
                setError(true);
                // Handle other Axios errors (like 4xx or 5xx responses)
                setErrorMessage("Failed to add organization: " + (error.response.data.message || error.message));
            } else {
                // Fallback for other errors
                setError(true);
                setErrorMessage("An unexpected error occurred: " + error.message);
            }
        }
    }

    //Edit
    const handleEdit = async () => {
        try {
            const updatedData = {
                ...commonData,
                ...fieldSets[0] // Assuming fieldSets contains only one set of data
            };
            await axios.put(`${apiUrl}/ratemanagement-edit/${selectedCustomerId}`, updatedData);
            setSuccess(true);
            setSuccessMessage("Successfully updated");
            handleCancel();
            setRows([]);
            handleList()

        } catch {
            setError(true);
            setErrorMessage("Check your Network Connection");
        }
    };
    const handledelete = async () => {
        try {

            await axios.delete(`${apiUrl}/ratemanagement/${selectedCustomerId}`);
            setSuccess(true);
            setSuccessMessage("Successfully Deleted");
            handleCancel();
            setRows([]);
            handleList()
        }
        catch {

        }
    }

    const handleClick = async (event, actionName) => {
        event.preventDefault();
        try {
            if (actionName === 'List') {
                const response = await axios.get(`${apiUrl}/ratemanagement`);
                const data = response.data;
                if (data.length > 0) {
                    setRows(data);
                    setSuccess(true);
                    setSuccessMessage("Successfully listed");
                } else {
                    setRows([]);
                    setError(true);
                    setErrorMessage("No data found");
                }
            }

            else if (actionName === 'Cancel') {
                handleCancel();
            }

            else if (actionName === 'Delete') {
                handledelete();
            }

            else if (actionName === 'Edit') {
                handleEdit();
            }

            else if (actionName === 'Add') {
                handleAdd();
            }
        } catch {
            setError(true);
            setErrorMessage("Check your Network Connection");
        }
    };

    return {
        rows,
        actionName,
        error,
        success,
        info,
        warning,
        successMessage,
        errorMessage,
        warningMessage,
        handleClick,
        handleChange,
        handleRowClick,
        handleAdd,
        hidePopup,
        handleAutocompleteChange,
        columns,
        isEditMode,
        handleEdit,
        handleShow,
        handleAddExtra, fieldSets, commonData, handleCancelUI, ratename, infoMessage,validitydata,loading,setLoading
    };
};

export default usePackagerateentry;