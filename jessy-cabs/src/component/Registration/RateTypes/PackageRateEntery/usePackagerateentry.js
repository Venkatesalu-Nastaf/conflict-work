import { useState, useEffect, useCallback, useMemo } from 'react';
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
    { field: "extraHours", headerName: "Extra Hours", width: 100 },
    { field: "extraKMS", headerName: "Extra KMS", width: 90 },
    { field: "UptoHours", headerName: "Upto Hours", width: 100 },
    { field: "UptoKMS", headerName: "UptoKMS", width: 90 },
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
        vehicleName: [],
        Validity: '',
        stations: [],
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
    const [isbtnloading, setisbtnloading] = useState(false)
    const [multipleSelect, setMultipleSelect] = useState(false);
    const [selectedrowdelete,setSelectedRowDelete]=useState([])

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
            const data = commonData.ratetype
            if (!data) {
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

    const handleChange11 = (event, index) => {
        const { name, value } = event.target;

        const newFieldSets = [...fieldSets];
        newFieldSets[index][name] = value;
        newFieldSets[index]["package"] = `${newFieldSets[index]["Hours"]}HRS&${newFieldSets[index]["KMS"]}KMS `;
        setFieldSets(newFieldSets);

        setCommonData(prevCommonData => ({
            ...prevCommonData,
            [name]: value
        }));
    };
    // console.log(commonData,"Data")

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
            vehicleName: [],
            Validity: '',
            stations: []
        }))
        setIsEditMode(false);
        setValiditydata([])
        setSelectedRowDelete([])
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
        const { ratetype, OrganizationName, vehicleName, Validity, stations } = customerData;
        console.log(customerData, "rateeeeeeeeeeeeeeee");

        setCommonData({
            ratetype,
            OrganizationName,
            // vehicleName,
            vehicleName: Array.isArray(vehicleName) ? vehicleName : (vehicleName ? [vehicleName] : []),
            Validity,
            // stations
            stations: Array.isArray(stations) ? stations : (stations ? [stations] : []),

        });
        setSelectedCustomerId(params.row.id);
        console.log(params.row.id,"parmas");
        setMultipleSelect(true)
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

    // const handleAdd = async () => {
    //     const dutys = fieldSets.map(fieldSet => fieldSet.duty);
    //     // Extract duties from fieldSets
    //     // Check if any duty is empty
    //     const rateType = commonData?.ratetype;
    //     const orgName = commonData?.OrganizationName;
    //     const vehicleType = commonData?.vehicleName;
    //     const stations = commonData?.stations;
    //     console.log(stations,"postttttttttttttttttttt",vehicleType);

    //     if (!rateType) {
    //         setInfo(true)
    //         setInfoMessage("Enter The Ratetype")
    //         return
    //     }
    //     if (!orgName) {
    //         setInfo(true)
    //         setInfoMessage("Enter The Ratename")
    //         return
    //     }
    //     if (!vehicleType) {
    //         setInfo(true)
    //         setInfoMessage("Enter The Vehicletype")
    //         return
    //     }
    //     if (!stations) {
    //         setInfo(true)
    //         setInfoMessage("Enter The Stations")
    //         return
    //     }

    //     if (dutys.some(duty => !duty)) {
    //         setError(true);
    //         setErrorMessage("Enter Duty field and others..!");
    //         return;
    //     }
    //     try {
    //         setisbtnloading(true)
    //         // const fieldsToDefault = ['AKMS', 'Bata', 'Hours', 'KMS', 'NHalt', 'Rate', 'UptoHours', 'UptoKMS', 'extraHours', 'extraKMS'];

    //         // // Set default value of 0 for empty fields
    //         // fieldsToDefault.forEach((field) => {
    //         //     if (!updatedData[field] || updatedData[field] === "") {
    //         //         updatedData[field] = 0;
    //         //     }
    //         // });

    //         // const requestData1 = fieldSets.map(fieldSet => ({ ...commonData, ...fieldSet }));
    //         // console.log(requestData1,"requestsample")
    //         const fieldsToDefault = ['AKMS', 'Bata', 'Hours', 'KMS', 'NHalt', 'Rate', 'UptoHours', 'UptoKMS', 'extraHours', 'extraKMS'];
    //         const normalizeFields = (obj, fields) => {
    //             return fields.reduce((acc, field) => {
    //                 acc[field] = obj[field] === null || obj[field] === "" || obj[field] === undefined ? 0 : obj[field];
    //                 return acc;
    //             }, { ...obj });
    //         };

    //         const requestData = fieldSets.map(fieldSet => {
    //             // Merge commonData with the normalized fieldSet
    //             const normalizedFieldSet = normalizeFields(fieldSet, fieldsToDefault);
    //             return { ...commonData, ...normalizedFieldSet };
    //         });
    //           console.log(requestData,"Dataadd")
    //         // const requestData = fieldSets.map(fieldSet => ({ ...commonData, ...fieldSet }));
    //         // await axios.post(`${apiUrl}/ratemanagement-add`, requestData);
    //         // If successful, update state
    //         setSuccess(true);
    //         setSuccessMessage("Successfully Added");
    //         setisbtnloading(false)
    //         handleCancel()
    //         handleList()
    //     }
    //     // catch (error) {
    //     //     setError(true);
    //     //     setErrorMessage("Check your Network Connection");
    //     // }
    //     catch (error) {
    //         // console.error("Error occurredddddd:", error);

    //         // Check if there's no response, indicating a network error
    //         if (error.message) {
    //             setError(true);
    //             setisbtnloading(false)
    //             setErrorMessage("Check your Network Connection");
    //             // console.log('Network error');
    //         } else if (error.response) {
    //             setError(true);
    //             setisbtnloading(false)
    //             // Handle other Axios errors (like 4xx or 5xx responses)
    //             setErrorMessage("Failed to add organization: " + (error.response.data.message || error.message));
    //         } else {
    //             // Fallback for other errors
    //             setError(true);
    //             setisbtnloading(false)
    //             setErrorMessage("An unexpected error occurred: " + error.message);
    //         }
    //     }
    // };

    const handleAdd = async () => {
        const dutys = fieldSets.map(fieldSet => fieldSet.duty);
        const rateType = commonData?.ratetype;
        const orgName = commonData?.OrganizationName;
        const vehicleTypes = commonData?.vehicleName || []; // Ensure it's an array
        const stations = commonData?.stations || []; // Ensure it's an array

        if (!rateType) {
            setInfo(true);
            setInfoMessage("Enter The Ratetype");
            return;
        }
        if (!orgName) {
            setInfo(true);
            setInfoMessage("Enter The Ratename");
            return;
        }
        if (!vehicleTypes.length) {
            setInfo(true);
            setInfoMessage("Enter The Vehicle Type");
            return;
        }
        if (!stations.length) {
            setInfo(true);
            setInfoMessage("Enter The Stations");
            return;
        }
        if (dutys.some(duty => !duty)) {
            setError(true);
            setErrorMessage("Enter Duty field and others..!");
            return;
        }

        try {
            setisbtnloading(true);

            const fieldsToDefault = ['AKMS', 'Bata', 'Hours', 'KMS', 'NHalt', 'Rate', 'UptoHours', 'UptoKMS', 'extraHours', 'extraKMS'];
            const normalizeFields = (obj, fields) => {
                return fields.reduce((acc, field) => {
                    acc[field] = obj[field] === null || obj[field] === "" || obj[field] === undefined ? 0 : obj[field];
                    return acc;
                }, { ...obj });
            };

            const requestData = [];

            fieldSets.forEach(fieldSet => {
                const normalizedFieldSet = normalizeFields(fieldSet, fieldsToDefault);

                // stations.forEach(station => {
                //     vehicleTypes.forEach(vehicle => {
                //         requestData.push({
                //             ...commonData,
                //             ...normalizedFieldSet,
                //             station: station, // Assigning one station per entry
                //             vehicleName: vehicle // Assigning one vehicle per entry
                //         });
                //     });
                // });
                stations.forEach(station => {
                    vehicleTypes.forEach(vehicle => {
                        const { stations, ...filteredCommonData } = commonData; // Remove stations key
                        requestData.push({
                            ...filteredCommonData,
                            ...normalizedFieldSet,
                            stations: station, // Assigning one station per entry
                            vehicleName: vehicle // Assigning one vehicle per entry
                        });
                    });
                });

            });

            console.log(requestData, "Dataadd");

            // await axios.post(`${apiUrl}/ratemanagement-add`, requestData);
            await axios.post(`${apiUrl}/ratemanagement-add`, requestData);

            // for (const data of requestData) {
            // await Promise.all(requestData.map(data => axios.post(`${apiUrl}/ratemanagement-add`, data)));
            // }

            setSuccess(true);
            setSuccessMessage("Successfully Added");
            setisbtnloading(false);
            handleCancel();
            handleList();
        } catch (error) {
            setError(true);
            setisbtnloading(false);
            if (error.message) {
                setErrorMessage("Check your Network Connection");
            } else if (error.response) {
                setErrorMessage("Failed to add organization: " + (error.response.data.message || error.message));
            } else {
                setErrorMessage("An unexpected error occurred: " + error.message);
            }
        }
    };


    const handleShow = async () => {
        try {
            const rateType = commonData?.ratetype;
            const orgName = commonData?.OrganizationName || '';
            const vehicleType = commonData?.vehicleName || '';
            const stations = commonData?.stations || '';
            const payload = { rateType, orgName, vehicleType, stations }
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
            if (error.message) {
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
        setisbtnloading(true)
        if ((commonData.vehicleName.length > 1) && multipleSelect === true) {
            setError(true)
            setErrorMessage("Enter Any One VehicleName.")
            setisbtnloading(false)
            return
        }
        if ((commonData.vehicleName.length === 0) && multipleSelect === true) {
            setError(true)
            setErrorMessage("Please Select The VehicleName.")
            setisbtnloading(false)
            return
        }
        if (multipleSelect === true && (commonData.stations.length > 1)) {
            setError(true)
            setErrorMessage("Enter Any One Station.")
            setisbtnloading(false)
            return
        }
        if (multipleSelect === true && (commonData.stations.length === 0)) {
            setError(true)
            setErrorMessage("Please Select The Station.")
            setisbtnloading(false)
            return
        }
        try {
            const updatedData = {
                ...commonData,
                ...fieldSets[0] // Assuming fieldSets contains only one set of data
            };
            const fieldsToDefault = ['AKMS', 'Bata', 'Hours', 'KMS', 'NHalt', 'Rate', 'UptoHours', 'UptoKMS', 'extraHours', 'extraKMS'];

            fieldsToDefault.forEach((field) => {
                if (!updatedData[field] || updatedData[field] === "") {
                    updatedData[field] = 0;
                }
            });
            console.log(updatedData, 'rateupdate');
            await axios.put(`${apiUrl}/ratemanagement-edit/${selectedCustomerId}`, updatedData);
            setSuccess(true);
            setisbtnloading(false)
            setSuccessMessage("Successfully updated");
            setMultipleSelect(false)
            handleCancel();
            setRows([]);
            handleList()

        } catch {
            setError(true);
            setisbtnloading(false)
            setErrorMessage("Check your Network Connection");
        }
    };
    const handledelete = async () => {
        try {

            await axios.delete(`${apiUrl}/ratemanagement/${selectedrowdelete}`);
            setSuccess(true);
            setSuccessMessage("Successfully Deleted");
            handleCancel();
            setSelectedRowDelete([])
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
    const handleAutocompleteMultipleChange = (event, value, name) => {
        setCommonData(prevCommonData => ({
            ...prevCommonData,
            [name]: value?.map(option => option?.label), // ✅ Store only labels (array of strings)
        }));
    };
    // console.log(selectedrowdelete,"delete")/


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
        handleAutocompleteMultipleChange,
        columns,
        isEditMode,
        handleEdit,
        handleShow, handleChange11,
        handleAddExtra, fieldSets, commonData, handleCancelUI, ratename, infoMessage, validitydata, loading, setLoading, isbtnloading, setisbtnloading,
        multipleSelect,setSelectedRowDelete,selectedrowdelete
    };
};

export default usePackagerateentry;