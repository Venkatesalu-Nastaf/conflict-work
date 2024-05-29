

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { APIURL } from "../../../url";

// Table START
const columns = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "ratetype", headerName: "Rate Type", width: 120 },
    { field: "duty", headerName: "Duty", width: 100 },
    { field: "OrganizationName", headerName: "Organization Name", width: 150 },
    { field: "vehicleType", headerName: "vehicle Type", width: 110 },
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
    { field: "Validity", headerName: "Validity", width: 80 },
];
// TABLE END

const usePackagerateentry = () => {

    const [fieldSets, setFieldSets] = useState([{
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
    }]);


    const [commonData, setCommonData] = useState({
        //static data
        ratetype: '',
        OrganizationName: "",
        vehicleType: '',
        Validity: '',
    });

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
    // const [infoMessage, setInfoMessage] = useState({});

    //-------editmode------------------
    const [isEditMode, setIsEditMode] = useState(false);
    //------------------------------------------------
    const [validitydata, setValiditydata] = useState([])
    const [datevalidity, setDatevalidity] = useState()


    useEffect(() => {
        const fetchOrganizationnames = async () => {
            try {
                const response = await axios.get(`${apiUrl}/ratetype`);
                const data = response.data
                setValiditydata(data)
            }
            catch (error) {
                console.log(error, "error");
            }
        };
        fetchOrganizationnames()
    }, [apiUrl])


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
        // Additional logic based on name if needed
        if (name === "pricetag") {
            getStartEndTimesByRateName(selectedOption);
        }
    };

    //----------------------------------------
    const handleAddExtra = () => {
        setFieldSets([...fieldSets, {
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

    function getStartEndTimesByRateName(rateName) {
        const filteredData = validitydata?.filter(item => item.ratename === rateName);
        const datas = filteredData?.map(item => ({
            startdate: item.starttime,
            enddate: item.closetime
        }));

        setDatevalidity(datas[0])
    }


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
            vehicleType: '',
            Validity: '',
        }))

        setIsEditMode(false);
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
        const { ratetype, OrganizationName, vehicleType, Validity } = customerData;
        setCommonData({
            ratetype,
            OrganizationName,
            vehicleType,
            Validity,
        });
        setSelectedCustomerId(params.row.id);
        setIsEditMode(true);
    }, []);



    const handleAdd = async () => {
        const dutys = fieldSets.map(fieldSet => fieldSet.duty); // Extract duties from fieldSets

        // Check if any duty is empty
        if (dutys.some(duty => !duty)) {
            setError(true);
            setErrorMessage("Enter Duty field and others..!");
            return;
        }

        try {
            // Combine commonData with each fieldSet
            const requestData = fieldSets.map(fieldSet => ({ ...commonData, ...fieldSet }));

            await axios.post(`${apiUrl}/ratemanagement-add`, requestData);
            // If successful, update state
            setSuccess(true);
            setSuccessMessage("Successfully Added");
            handleCancel()
        } catch (error) {
            setError(true);
            setErrorMessage("Check your Network Connection");
        }
    };


    useEffect(() => {
        const handleList = async () => {
            try {
                const response = await axios.get(`${apiUrl}/ratemanagement`);
                const data = response.data;
                setRows(data);
            } catch {
            }
        }
        handleList();
    }, [apiUrl]);


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
        }
        catch {

        }
    }

    const handleClick = async (event, actionName, duty) => {
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
    useEffect(() => {
        if (actionName === 'List') {
            handleClick(null, 'List');
        }
    });

    return {

        selectedCustomerId,
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
        datevalidity,
        handleAddExtra, fieldSets, commonData, handleCancelUI,

    };
};

export default usePackagerateentry;