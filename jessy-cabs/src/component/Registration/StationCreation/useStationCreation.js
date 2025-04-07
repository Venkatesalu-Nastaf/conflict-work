// useStationCreation.js
import { useState, useEffect, useCallback ,useMemo} from 'react';
import axios from 'axios';
import { APIURL } from "../../url";
import dayjs from 'dayjs';
import { stateToStations,allStations } from "../Customer/Customerdata";
import { useData } from '../../Dashboard/MainDash/Sildebar/DataContext2';

const useStationCreation = () => {
    const apiUrl = APIURL;
    // const user_id = localStorage.getItem('useridno');
    const [selectedCustomerData, setSelectedCustomerData] = useState({});
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [rows, setRows] = useState([]);
    const [actionName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [info, setInfo] = useState(false);
    const [warning, setWarning] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [warningMessage, setWarningMessage] = useState({});
    const [getMainBrachDetails, setGetMainBranchDetails] = useState('');
    const [loading, setLoading] = useState(false)
    // const [infoMessage, setInfoMessage] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);
    const [cerendentialdata, setCredentialData] = useState(false)

    const [selectedStation, setSelectedStation] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [stationUpdate,setstationUpdate] = useState(false)
    const [isDisabled,setisDisabled] = useState(false)
    const [stationDatas,setStationDatas] = useState({
        station:"",
        state:""
    })
    const [open, setOpen] = useState(false);

    const {isstationtrigger,setisStationtrigger} = useData();
    const [deletestationdata,setDeleteStationData] = useState(false)
    //-----------------popup---------------------

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

   

    //-------------------------------------------------

    const [book, setBook] = useState({
        // stationid: '',
        Stationname: '',
        shortname: '',
        state: '',
        active: '',
        ownbranch: '',
        address: '',
        gstno: '',
        created_at: dayjs(),

    });
    const handleChange = (event) => {
        const { name, value, checked, type } = event.target;
        console.log(name, value, 'mainbranch7777', book?.state);

        if (type === 'checkbox') {
            setBook((prevBook) => ({
                ...prevBook,
                [name]: checked,
            }));
            setSelectedCustomerData((prevData) => ({
                ...prevData,
                [name]: checked,
            }));
        } else {
            setBook((prevBook) => ({
                ...prevBook,
                [name]: value,
            }));
            setSelectedCustomerData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleCancel = () => {
        setBook((prevBook) => ({
            ...prevBook,
            // stationid: '',
            Stationname: '',
            state: '',
            shortname: '',
            active: '',
            ownbranch: '',
            address: '',
            gstno: '',

        }));
        setSelectedCustomerData({});
        setRows([]);
        setIsEditMode(false);
        setDeleteStationData(false)
    };


    const uniquestation = async (Stationname) => {
        // console.log(customerdataname,"namee")
        console.log(Stationname,'station');
        
        if (Stationname) {

            const response = await axios.get(`${apiUrl}/getcreduniquestationname/${Stationname}`)
            const responsedata = response.data;
             console.log(responsedata,'unique station data')

            // console.log(response,"data")
            console.log(responsedata?.length,"reeee")

            if (responsedata?.length >= 1) {
                setCredentialData(true)
                // return true;
            }
            else {
                setCredentialData(false)
                // return false;
            }
            setTimeout(() => setCredentialData(undefined), 1000); 
        }




    }

    // const getStateFromStation = (station) => {
    //     // Loop through stateToStations to find which state includes the station
    //     for (const [state, stations] of Object.entries(stateToStations)) {
    //       if (stations.includes(station)) {
    //         return state;
    //       }
    //     }
    //     return "";
    //   };
    const handlestationOnChange = (e)=>{
        const { name, value } = e.target;
        setStationDatas(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleStationAddData = ()=>{
       setOpen(true)
    }

    const handleSubmiStation = ()=>{
    //  console.log(stationDatas,"stationnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn",allStations);
    //  allStations.push(stationDatas?.station)
     
    }

    const getStateFromStation = useMemo(() => {
        return (station) => {
            for (const [state, stations] of Object.entries(stateToStations)) {
                if (stations.includes(station)) {
                    return state;
                }
            }
            return '';
        };
    }, []);
    
      
    //   const handleStationChange = (event, value) => {
    //     const stationName = value ? value.label : "";
    //     const stateName = getStateFromStation(stationName);
        
    //     handleChange({
    //       target: { name: "Stationname", value: stationName },
    //     });
      
    //     handleChange({
    //       target: { name: "state", value: stateName },
    //     });
    //   };

//     const handleStationChange = (event, value) => {
//   const station = value ? value.label : ''; // Update station with value.label
//   setSelectedStation(station);

//   // Find and set the corresponding state for the selected station
//   const foundState = Object.keys(stateToStations).find(state =>
//     stateToStations[state].includes(station)
//   );
  
//   setSelectedState(foundState || '');
// };
      
// const handleStationChange = (event, value) => {
//     const station = value ? value.label : ''; // Ensure the station is properly set
//     setSelectedStation(station);
    
//     // Find and set the corresponding state for the selected station
//     const foundState = Object.keys(stateToStations).find(state => 
//       stateToStations[state].includes(station)
//     );
  
//     if (foundState) {
//         setSelectedState(foundState); // Set the state if found
//         setBook(prevBook => ({
//             ...prevBook,
//             Stationname: station,  // Set only the Stationname property
//             state: foundState      // Set only the state property
//         }));
//     } else {
//         setSelectedState(''); // If no state is found, clear it
//         setBook(prevBook => ({
//             ...prevBook,
//             Stationname: station, // Set only the Stationname property
//             state: ''             // Set the state to empty if not found
//         }));
//         setSelectedStation(''); // Reset the selected station field
//         setSelectedState('');   // Reset the selected state field
    
//     }
// };

// const handleStationChange = (event, value) => {
//     const station = value ? value.label : '';
//     setSelectedStation(station);

//     const foundState = Object.keys(stateToStations).find(state => 
//       stateToStations[state].includes(station)
//     );

//     if (foundState) {
//         setSelectedState(foundState);
//         setBook(prevBook => ({
//             ...prevBook,
//             Stationname: station,
//             state: foundState
//         }));
        
//     } else {
//         setSelectedState('');
//         setBook(prevBook => ({
//             ...prevBook,
//             Stationname: station,
//             state: ''
//         }));
//         setSelectedStation('');
//         setSelectedState('');
//     }
// };

// const handleStationChange = async (event, value) => {
//     const station = value ? value.label : '';
//     setSelectedStation(station);

//     const foundState = Object.keys(stateToStations).find(state => 
//       stateToStations[state].includes(station)
//     );

//     if (foundState) {
//         setSelectedState(foundState);
//         setBook(prevBook => ({
//             ...prevBook,
//             Stationname: station,
//             state: foundState
//         }));

//         try {
//             // Call the API to check if the state already has address and GST number
//             const response = await axios.get(`${apiUrl}/stationcreation`);
//             const stateData = response.data; // Assuming response data is an array of station details
        
//             // Find the matching state details based on the selected state
//             const matchingStateData = stateData.find(
//                 data => data.state === foundState
//             );
        
//             if (matchingStateData) {
//                 if (matchingStateData.address && matchingStateData.gstno) {
//                     console.log('State has address and GST number:', matchingStateData);
//                     setisDisabled(true)
//                 } else {
//                     console.log('No address and GST found for the state:', matchingStateData.state);
//                     setisDisabled(isDisabled)
//                 }
//             } else {
//                 console.log('No data found for the selected state.');
//             }
//         } catch (error) {
//             console.error('Error fetching data from API:', error);
//         }
        

//     } else {
//         setSelectedState('');
//         setBook(prevBook => ({
//             ...prevBook,
//             Stationname: station,
//             state: ''
//         }));
//         setSelectedStation('');
//         setSelectedState('');
//     }
// };

// const handleStationChange = async (event, value) => {

//     console.log('onChange event:', event);
//     console.log('Selected value:', value);
//     const station = value ? value.label : '';
//     setSelectedStation(station);

//     // If the input field is empty, reset states and enable the field
//     if (!station) {
//         setSelectedState('');
//         setBook(prevBook => ({
//             ...prevBook,
//             Stationname: '',
//             state: ''
//         }));
//         setisDisabled(false); // Enable the field when the input is empty
//         return;
//     }

//     const foundState = Object.keys(stateToStations).find(state => 
//         stateToStations[state].includes(station)
//     );

//     if (foundState) {
//         setSelectedState(foundState);
//         setBook(prevBook => ({
//             ...prevBook,
//             Stationname: station,
//             state: foundState
//         }));

//         try {
//             // Call the API to check if the state already has address and GST number
//             const response = await axios.get(`${apiUrl}/stationcreation`);
//             const stateData = response.data; // Assuming response data is an array of station details
        
//             // Find the matching state details based on the selected state
//             const matchingStateData = stateData.find(
//                 data => data.state === foundState
//             );
        
//             if (matchingStateData) {
//                 if (matchingStateData.address && matchingStateData.gstno) {
//                     console.log('State has address and GST number:', matchingStateData);
//                     setisDisabled(true); // Disable the field if address and GST exist
//                 } else {
//                     console.log('No address and GST found for the state:', matchingStateData.state);
//                     setisDisabled(false); // Enable the field if no address or GST exists
//                 }
//             } else {
//                 console.log('No data found for the selected state.');
//                 setisDisabled(false); // Enable the field if no matching state data is found
//             }
//         } catch (error) {
//             console.error('Error fetching data from API:', error);
//         }

//     } else {
//         setSelectedState('');
//         setBook(prevBook => ({
//             ...prevBook,
//             Stationname: station,
//             state: ''
//         }));
//         setSelectedStation('');
//         setSelectedState('');
//         setisDisabled(false); // Enable the field if no state is found
//     }
// };

// const handleStationChange = async (event, value) => {
 
//     const station = value ? value.label : '';
//     setSelectedStation(station);
   

//     if (!station) {

//         setSelectedState('');
//         setBook(prevBook => ({
//             ...prevBook,
//             Stationname: '',
//             state: '',
//             address:'',
//             gstno:''
//         }));
//         setisDisabled(false);
//         return;
//     }

//     const foundState = Object.keys(stateToStations).find(state => 
//         stateToStations[state].includes(station)
//     );

//     if (foundState) {
//         setSelectedState(foundState);
//         setBook(prevBook => ({
//             ...prevBook,
//             Stationname: station,
//             state: foundState,
            
//         }));
//         setSelectedCustomerData(prevBook =>({
//             ...prevBook,
//             Stationname:station,
//             State:foundState,
            
//         }))

//         try {
//             const response = await axios.get(`${apiUrl}/stationcreation`);
//             const stateData = response.data;

//             const matchingStateData = stateData.find(
//                 data => data.state === foundState,

//             );

//             if (matchingStateData) {
//                 const hasDetails = matchingStateData.address && matchingStateData.gstno;
//                 console.log('Setting isDisabled to:', hasDetails);
//                 setisDisabled(true);
                
//             } else {
//                 setisDisabled(false);
//             }
//         } catch (error) {
//             console.error('Error fetching data from API:', error);
//         }
//     } else {
//         setSelectedState('');
//         setBook(prevBook => ({
//             ...prevBook,
//             Stationname: station,
//             state: '',
//             address:book.address,
//         }));
//         setSelectedStation('');
//         setSelectedState('');
//         setisDisabled(false);
//     }
// };

const handleStationChange = async (event, value) => {
    const station = value ? value.label : '';
    setSelectedStation(station);

    if (!station) {
        setSelectedState('');
        setBook(prevBook => ({
            ...prevBook,
            Stationname: '',
            state: '',
            address: '',
            gstno: ''
        }));
        setSelectedCustomerData(prevData => ({
            ...prevData,
            Stationname: '',
            state: '',
            address: '',
            gstno: ''
        }));
        setisDisabled(false);
        return;
    }

    const foundState = Object.keys(stateToStations).find(state => 
        stateToStations[state].includes(station)
    );

    if (foundState) {
        setSelectedState(foundState);

        try {
            const response = await axios.get(`${apiUrl}/stationcreation`);
            const stateData = response.data;

            const matchingStateData = stateData.find(
                data => data.state === foundState
            );

            if (matchingStateData) {
                const { gstno = '' } = matchingStateData;

                setBook(prevBook => ({
                    ...prevBook,
                    Stationname: station,
                    state: foundState,
                    gstno
                }));
                setSelectedCustomerData(prevData => ({
                    ...prevData,
                    Stationname: station,
                    state: foundState,
                    gstno
                }));
                setisDisabled(!!gstno);

            } else {
                setBook(prevBook => ({
                    ...prevBook,
                    Stationname: station,
                    state: foundState,
                    gstno: ''
                }));
                setSelectedCustomerData(prevData => ({
                    ...prevData,
                    Stationname: station,
                    state: foundState,
                    gstno: ''
                }));
                setisDisabled(false);
            }
        } catch (error) {
            console.error('Error fetching data from API:', error);
        }
    } else {
        setSelectedState('');
        setBook(prevBook => ({
            ...prevBook,
            Stationname: station,
            state: '',
            gstno: ''
        }));
        setSelectedCustomerData(prevData => ({
            ...prevData,
            Stationname: station,
            state: '',
            gstno: ''
        }));
        setisDisabled(false);
    }
};




 

    const handleChangeuniquestation = (event) => {
        const { name, value } = event.target;
        const datacrendital = uniquestation(value);
        console.log(datacrendital, "cred")
        setBook((prevBook) => ({
            ...prevBook,
            [name]: value,
        }));
        setSelectedCustomerData((prevData) => ({
            ...prevData,
            [name]: value,
        }));


    }
    const handleRowClick = useCallback((params) => {
        const customerData = params.row;
        setSelectedStation(customerData?.Stationname || "");
        setSelectedState(customerData?.state || ""); 
        setSelectedCustomerData(customerData);
        setSelectedCustomerId(params.row.customerId);
     
        setIsEditMode(true)
        
        
    }, []);

    // const handleAdd = async () => {
    //     const Stationname = book.Stationname;
    //     if (!Stationname) {
    //         setWarning(true);
    //         setWarningMessage("Fill Mandatery Fields");
    //         setstationUpdate(true)
    //         return;
            
    //     }
    //     if (cerendentialdata === true) {
    //         setWarning(true);
    //         setWarningMessage(" Station Name Already Exists");
    //         return;
    //     }

    //     try {
    //         await axios.post(`${apiUrl}/stationcreation`, book);
    //         setBook({
    //             Stationname: '',
    //             shortname: '',
    //             state: '',
    //             active: '',
    //             ownbranch: '',
    //             address: '',
    //             gstno: '',
    //             created_at: dayjs(),
    //         });
    //         handleCancel();
    //         // setRows([]);
    //         setSuccess(true);
    //         setSuccessMessage("Successfully Added");
    //         setstationUpdate(true)
    //     }
    //     // catch {
    //     //     setError(true);
    //     //     setErrorMessage("Failed to Add Stations");
    //     // }
    //     catch (error) {
    //         // console.error("Error occurredddddd:", error);

    //         // Check if there's no response, indicating a network error
    //         if (error.message) {
    //             setError(true);
    //             setErrorMessage("Check your Network Connection");
    //             console.log(book, 'Datas of stations')
    //             // console.log('Network error');
    //         } else if (error.response) {
    //             setError(true);
    //             // Handle other Axios errors (like 4xx or 5xx responses)
    //             setErrorMessage("Failed to Add Stations: " + (error.response.data.message || error.message));
    //         } else {
    //             // Fallback for other errors
    //             setError(true);
    //             setErrorMessage("An unexpected error occurred: " + error.message);
    //         }
    //     }
    // };

    const handleAdd = async () => {
        const Stationname = book.Stationname;
        
        if (!Stationname) {
            setWarning(true);
            setWarningMessage("Fill Mandatory Fields");
            // setstationUpdate(true);
            return;
        }
        if (cerendentialdata === true) {
            setWarning(true);
            setWarningMessage("Station Name Already Exists");
            return;
        }
    
        try {
            await axios.post(`${apiUrl}/stationcreation`, book);
            setBook({
                Stationname: '',
                shortname: '',
                state: '',
                active: '',
                ownbranch: '',
                address: '',
                gstno: '',
                created_at: dayjs(),
            });
            setisStationtrigger(!isstationtrigger)
            setSelectedState(''); // Clear the selected state
            setSelectedStation('');
            setSelectedCustomerData({});
            setIsEditMode(false);
            setRows([]); 
            setSuccess(true);
            setSuccessMessage("Successfully Added");
            setisDisabled(false)
            setCredentialData(false)
            setstationUpdate(true);
            uniquestation(Stationname)
        } catch (error) {
            if (error.message) {
                setError(true);
                setErrorMessage("Check your Network Connection");
            } else if (error.response) {
                setError(true);
                setErrorMessage("Failed to Add Stations: " + (error.response.data.message || error.message));
            } else {
                setError(true);
                setErrorMessage("An unexpected error occurred: " + error.message);
            }
        }
    };
    


    // const handleEdit = async () => {
        
    //     try {
    //         // const selectedCustomer = rows.find((row) => row.stationid === stationid);
    //         // console.log(selectedCustomer,"slecu")
    //         // const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
    //         const {id,...restdata} = selectedCustomerData
    //         // const updatedCustomer = {...restdata};
    //         console.log(restdata,"rest")
    //         console.log('editstation',selectedCustomerData?.stationid);
            

    //         await axios.put(`${apiUrl}/stationcreation/${selectedCustomerData?.stationid}`,restdata);
    //         setSuccess(true);
    //         setSuccessMessage("Successfully updated");
    //         setstationUpdate(true);
    //         setSelectedState(''); // Clear the selected state
    //         setSelectedStation('');
    //         setSelectedCustomerData({});
    //         handleCancel();

    //     }
    //     //  catch {
    //     //     setError(true);
    //     //     setErrorMessage("Failed to Edit StationS");
    //     // }
    //     catch (error) {
    //         // console.error("Error occurredddddd:", error);

    //         // Check if there's no response, indicating a network error
    //         if (error.message) {
    //             setError(true);
    //             setErrorMessage("Check your Network Connection");
    //             // console.log('Network error');
    //         } else if (error.response) {
    //             setError(true);
    //             // Handle other Axios errors (like 4xx or 5xx responses)
    //             setErrorMessage("Failed to Edit Stations: " + (error.response.data.message || error.message));
    //         } else {
    //             // Fallback for other errors
    //             setError(true);
    //             setErrorMessage("An unexpected error occurred: " + error.message);
    //         }
    //     }
    // };
    // console.log(selectedCustomerData?.state, 'mainbranchstate===',selectedCustomerData);

    const handleEdit = async () => {
        try {
            const { id, ...restdata } = selectedCustomerData;
            console.log(selectedCustomerData,'customer datas',restdata)
            await axios.put(`${apiUrl}/stationcreation/${selectedCustomerData?.stationid}`, restdata);
            console.log(selectedCustomerData,'customer datas2',restdata)
            setisStationtrigger(!isstationtrigger)
            setSuccess(true);
            setSuccessMessage("Successfully updated");
            setCredentialData(false)
            setstationUpdate(true);
            setRows([]); 
            setisDisabled(false)
            setSelectedState('');
            setSelectedStation('');
            setSelectedCustomerData({});
            setError(false);
            setErrorMessage('');
            handleCancel();
        } catch (error) {
            if (error.message) {
                setError(true);
                setErrorMessage("Check your Network Connection");
                setCredentialData(false)
            } else if (error.response) {
                setError(true);
                setErrorMessage("Failed to Edit Stations: " + (error.response.data.message || error.message));
                setCredentialData(false)
            } else {
                setError(true);
                setErrorMessage("An unexpected error occurred: " + error.message);
            }
        }
    };
    

    // get particular statedetails 
    useEffect(() => {
        const statename = selectedCustomerData?.state;
        if (statename && statename !== "") {
            const fetchData = async () => {
                console.log(statename, 'state22');
                try {
                    const response = await axios.get(`${apiUrl}/getAllStationDetails/${statename}`);
                    console.log(response.data, 'mainbranch');
                    setGetMainBranchDetails(response.data);

                    // Check if response data is empty
                    if (response.data && response.data.length > 0) {
                        const address = response.data[0]?.address;
                        const gst = response.data[0]?.gstno;
                        console.log(address, 'mainbranchaddress');

                        setSelectedCustomerData(prevData => ({
                            ...prevData,
                            // address: address,
                            gstno: gst,
                        }));
                    } else {
                        setSelectedCustomerData(prevData => ({
                            ...prevData,
                            // address: "",
                            gstno: ""
                        }));
                    }

                } catch (error) {
                    console.log(error, 'error');
                }
            };
            fetchData();
        }
    }, [apiUrl, selectedCustomerData?.state, book?.state]);

    useEffect(() => {
        const handleList = async () => {

            setLoading(true);
            setError(false);
            setErrorMessage("");

            try {
                const response = await axios.get(`${apiUrl}/stationcreation`);
                const data = response.data;
                console.log(data,'list of datas')
                

                if (data.length > 0) {
                    const rowsWithUniqueId = data.map((row, index) => ({
                        ...row,
                        id: index + 1,
                    }));
                    setRows(rowsWithUniqueId);
                    setLoading(false);
                    setCredentialData(false)
                    if (stationUpdate) {
                        localStorage.setItem("stationValue", "stationupadted");
                        console.log("Station updated and value set in localStorage.");
                        
                      }
                    

                } else {
                    setRows([]);
                    setLoading(false);
                }
            } catch (err) {
                console.error('Error fetching station creation data:', err);

                if (err.message === 'Network Error') {
                    setErrorMessage("Check network connection.");
                } else {
                    setErrorMessage("Failed to fetch data: " + (err.response?.data?.message || err.message));
                }
                setError(true);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };

        handleList();
    }, [apiUrl,stationUpdate,isstationtrigger]);
    

    // useEffect(() => {
    //     const handlelist = async () => {

    //         const response = await axios.get(`${apiUrl}/stationcreation`);
    //         const data = response.data;

    //         if (data.length > 0) {
    //             const rowsWithUniqueId = data.map((row, index) => ({
    //                 ...row,
    //                 id: index + 1,
    //             }));
    //             setRows(rowsWithUniqueId);
    //             // console.log(data, "Station Dtaaaytaa")
    //         } else {
    //             setRows([]);
    //         }
    //     }

    //     handlelist();
    // }, [apiUrl, rows]);


    const handleClick = async (event, actionName) => {
        event.preventDefault();
        try {
            if (actionName === 'List') {
                const response = await axios.get(`${apiUrl}/stationcreation`);
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
                setRows([]);
            }

            else if (actionName === 'Delete') {
                try{
                await axios.delete(`${apiUrl}/stationcreation/${selectedCustomerData?.stationid}`);
                setSelectedCustomerData(null);
                setSuccess(true);
                setSuccessMessage("Successfully Deleted");
                handleCancel();
                setRows([]);
                setSelectedState('');
                setSelectedStation('');
                setstationUpdate(true);
                setisStationtrigger(!isstationtrigger)
                setisDisabled(false)
                }
                catch(err){
                    setError(true);
                    setErrorMessage("check your network connection");
                }

            }

            else if (actionName === 'Edit') {
                handleEdit()
            } else if (actionName === 'Add') {
                handleAdd();
            }
        } catch (err) {
            setError(true);
            setErrorMessage("Failed to Retrive data");
        }
    };
    useEffect(() => {
        if (actionName === 'List') {
            handleClick(null, 'List');
        }
    },[isstationtrigger]);

    return {
        selectedCustomerData,
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
        book,
        handleClick,
        handleChange,
        handleRowClick,
        handleAdd,
        hidePopup,
        isEditMode,
        handleEdit,
        cerendentialdata,
        handleChangeuniquestation,
        getMainBrachDetails,
        loading,
        setLoading,
        getStateFromStation,
        handleStationChange,
        selectedStation, setSelectedStation,selectedState, setSelectedState,isDisabled,setisDisabled,cerendentialdata, setCredentialData,
        handleStationAddData,stationDatas,open,setOpen,handleSubmiStation,handlestationOnChange,setDeleteStationData,deletestationdata
    };
};

export default useStationCreation;