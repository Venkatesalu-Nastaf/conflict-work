import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { APIURL } from "../../../url";
import dayjs from 'dayjs';
import encryption from '../../../dataEncrypt';
// import EmployeeCreation from './EmployeeCreation';
// import { faMobilePhone } from '@fortawesome/free-solid-svg-icons';



const useEmplyeecreation = () => {
    const apiUrl = APIURL;
  
    const [showPasswords, setShowPasswords] = useState(false);
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [rows, setRows] = useState([]);
    const [actionName] = useState('');
    // const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [info, setInfo] = useState(false);
    const [isOpenvehcile,setIsOpenvehicle] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [isEditable, setIsEditable] = useState(false);
    const [errorMessage, setErrorMessage] = useState({});
    const [warning, setWarning] = useState(false);
    const [warningMessage, setWarningMessage] = useState({});
    const [templateMessageData, setTemplateMessageData] = useState(null);
    const [organistaionsendmail, setOrganisationSendEmail] = useState([])
    const [cerendentialdata, setCredentialData] = useState()
    const [showPermission, setShowPermission] = useState(true);
    const [emptyrole,setEmptyrole] = useState(true);
    const [deleteuserceationdata,setDeleteUsercreation]=useState(false)
  
   
    // const [rolefiledsdata,setRoleFieldData] =useState([])
    // const [rolefield,setRoleField]=useState('')
    // const [rolefielddropdown,setRoleFielddropdown]=useState()
    // console.log(rolefiledsdata)


    ////-------------permission --------------------------

    // const initialPermissionsData = [

    //     { id: 0, name: 'BOOKING', read: false, new: false, modify: false, delete: false },
    //     { id: 1, name: 'Booking', read: false, new: false, modify: false, delete: false },
    //     { id: 2, name: 'Trip Status', read: false, new: false, modify: false, delete: false },
    //     { id: 3, name: 'Trip sheet', read: false, new: false, modify: false, delete: false },

    //     { id: 4, name: 'BILLING', read: false, new: false, modify: false, delete: false },
    //     { id: 5, name: 'Billing', read: false, new: false, modify: false, delete: false },
    //     { id: 6, name: 'Transfer', read: false, new: false, modify: false, delete: false },
    //     { id: 7, name: 'Covering Bill', read: false, new: false, modify: false, delete: false },

    //     { id: 8, name: 'REGISTER', read: false, new: false, modify: false, delete: false },
    //     { id: 9, name: 'Customer', read: false, new: false, modify: false, delete: false },
    //     { id: 10, name: 'Supllier', read: false, new: false, modify: false, delete: false },
    //     { id: 11, name: 'Employee', read: false, new: false, modify: false, delete: false },

    //     { id: 12, name: 'SETTING', read: false, new: false, modify: false, delete: false },
    //     { id: 13, name: 'User Creation', read: false, new: false, modify: false, delete: false },
    //     { id: 14, name: 'Station Creation', read: false, new: false, modify: false, delete: false },
    //     { id: 15, name: 'Main Setting', read: false, new: false, modify: false, delete: false },

    //     { id: 16, name: 'INFO', read: false, new: false, modify: false, delete: false },
    //     { id: 17, name: 'Rate Management', read: false, new: false, modify: false, delete: false },
    //     { id: 18, name: 'Mailers', read: false, new: false, modify: false, delete: false },
    //     { id: 19, name: 'Fuel Info', read: false, new: false, modify: false, delete: false },
    //     { id: 20, name: 'Dashbord', read: false },
    //     { id: 21, name: 'Map', read: false, new: false, modify: false, delete: false  },
    //     { id: 22, name: 'RealTime', read: false, new: false, modify: false, delete: false  },
    //     { id: 23, name: 'Vehicle', read: false, new: false, modify: false, delete: false  },
    //     { id: 24, name: 'Reminders', read: false, new: false, modify: false, delete: false  },
    //     { id: 25, name: 'History', read: false, new: false, modify: false, delete: false  },
    //     { id: 26, name: 'Records', read: false, new: false, modify: false, delete: false  },
    // ];
    // dummy
    // const initialPermissionsData = [

    //     { id: 0, name: 'BOOKING', read: false, new: false, modify: false, delete: false },
    //     { id: 1, name: 'Booking', read: false, new: false, modify: false, delete: false },
    //     { id: 2, name: 'Trip Status', read: false, new: false, modify: false, delete: false },
    //     { id: 3, name: 'Trip sheet', read: false, new: false, modify: false, delete: false },

    //     { id: 4, name: 'BILLING', read: false, new: false, modify: false, delete: false },
    //     { id: 5, name: 'Billing', read: false, new: false, modify: false, delete: false },
    //     { id: 6, name: 'Transfer', read: false, new: false, modify: false, delete: false },
    //     { id: 7, name: 'Covering Bill', read: false, new: false, modify: false, delete: false },
    //     { id: 8, name: 'Reports', read: false, new: false, modify: false, delete: false },

    //     { id: 9, name: 'REGISTER', read: false, new: false, modify: false, delete: false },
    //     { id: 10, name: 'Rate Type', read: false, new: false, modify: false, delete: false },
    //     { id: 11, name: 'Customer', read: false, new: false, modify: false, delete: false },
    //     { id: 12, name: 'Supllier', read: false, new: false, modify: false, delete: false },
    //     { id: 13, name: 'Station Creation', read: false, new: false, modify: false, delete: false },
    //     // { id: 11, name: 'Employee', read: false, new: false, modify: false, delete: false },

    //     { id: 14, name: 'SETTING', read: false, new: false, modify: false, delete: false },
    //     { id: 15, name: 'User Creation', read: false, new: false, modify: false, delete: false },
    //     { id: 16, name: 'Main Setting', read: false, new: false, modify: false, delete: false },

    //     { id: 17, name: 'INFO', read: false, new: false, modify: false, delete: false },
    //     // { id: 17, name: 'Rate Management', read: false, new: false, modify: false, delete: false },
    //     { id: 18, name: 'Mailers', read: false, new: false, modify: false, delete: false },
    //     { id: 19, name: 'Fuel Info', read: false, new: false, modify: false, delete: false },
    //     { id: 20, name: 'Employee', read: false, new: false, modify: false, delete: false },
    //     { id: 21, name: 'Dashboard', read: false },
    //     // { id: 11, name: 'Employee', read: false, new: false, modify: false, delete: false },
    //     { id: 22, name: 'Map', read: false, new: false, modify: false, delete: false },
    //     { id: 23, name: 'RealTime', read: false, new: false, modify: false, delete: false },
    //     { id: 24, name: 'Vehicle', read: false, new: false, modify: false, delete: false },
    //     { id: 25, name: 'Reminders', read: false, new: false, modify: false, delete: false },
    //     { id: 26, name: 'History', read: false, new: false, modify: false, delete: false },
    //     { id: 27, name: 'Records', read: false, new: false, modify: false, delete: false },
    // ];



    // const initialPermissionsData = [

    //     { id: 0, name: 'BOOKING', read: false, new: false, modify: false, delete: false },
    //     { id: 1, name: 'Booking', read: false, new: false, modify: false, delete: false },
    //     { id: 2, name: 'Trip Status', read: false, new: false, modify: false, delete: false },
    //     { id: 3, name: 'Trip sheet', read: false, new: false, modify: false, delete: false },

    //     { id: 4, name: 'BILLING', read: false, new: false, modify: false, delete: false },
    //     { id: 5, name: 'Billing', read: false, new: false, modify: false, delete: false },
    //     { id: 6, name: 'Transfer', read: false, new: false, modify: false, delete: false },
    //     { id: 7, name: 'Covering Bill', read: false, new: false, modify: false, delete: false },
    //     { id: 8, name: 'Reports', read: false, new: false, modify: false, delete: false },

    //     { id: 9, name: 'REGISTER', read: false, new: false, modify: false, delete: false },
    //     { id: 10, name: 'Rate Type', read: false, new: false, modify: false, delete: false },
    //     { id: 11, name: 'Customer', read: false, new: false, modify: false, delete: false },
    //     { id: 12, name: 'Supllier', read: false, new: false, modify: false, delete: false },
    //     { id: 13, name: 'Station Creation', read: false, new: false, modify: false, delete: false },
    //     // { id: 11, name: 'Employee', read: false, new: false, modify: false, delete: false },

    //     { id: 14, name: 'SETTING', read: false, new: false, modify: false, delete: false },
    //     { id: 15, name: 'User Creation', read: false, new: false, modify: false, delete: false },
    //     { id: 16, name: 'Main Setting', read: false, new: false, modify: false, delete: false },

    //     { id: 17, name: 'INFO', read: false, new: false, modify: false, delete: false },
    //     // { id: 17, name: 'Rate Management', read: false, new: false, modify: false, delete: false },
    //     { id: 18, name: 'Mailers', read: false, new: false, modify: false, delete: false },
    //     { id: 19, name: 'Fuel Info', read: false, new: false, modify: false, delete: false },
    //     { id: 20, name: 'Employee', read: false, new: false, modify: false, delete: false },
    //     { id: 21, name: 'Agreement', read: false, new: false, modify: false, delete: false },
    //     { id: 22, name: 'Dashboard', read: false },
    //     // { id: 11, name: 'Employee', read: false, new: false, modify: false, delete: false },
    //     { id: 23, name: 'Map', read: false, new: false, modify: false, delete: false },
    //     { id: 24, name: 'RealTime', read: false, new: false, modify: false, delete: false },
    //     { id: 25, name: 'Vehicle', read: false, new: false, modify: false, delete: false },
    //     { id: 26, name: 'Reminders', read: false, new: false, modify: false, delete: false },
    //     { id: 27, name: 'History', read: false, new: false, modify: false, delete: false },
    //     { id: 28, name: 'Records', read: false, new: false, modify: false, delete: false },
    // ];

    // const initialPermissionsData = [

    //     { id: 0, name: 'BOOKING', read: false, new: false, modify: false, delete: false },
    //     { id: 1, name: 'Booking', read: false, new: false, modify: false, delete: false },
    //     { id: 2, name: 'Trip Status', read: false, new: false, modify: false, delete: false },
    //     { id: 3, name: 'Trip sheet', read: false, new: false, modify: false, delete: false },

    //     { id: 4, name: 'BILLING', read: false, new: false, modify: false, delete: false },
    //     { id: 5, name: 'Billing', read: false, new: false, modify: false, delete: false },
    //     { id: 6, name: 'Transfer', read: false, new: false, modify: false, delete: false },
    //     { id: 7, name: 'Covering Bill', read: false, new: false, modify: false, delete: false },
    //     { id: 8, name: 'Reports', read: false, new: false, modify: false, delete: false },

    //     { id: 9, name: 'REGISTER', read: false, new: false, modify: false, delete: false },
    //     { id: 10, name: 'Rate Type', read: false, new: false, modify: false, delete: false },
    //     { id: 11, name: 'Customer', read: false, new: false, modify: false, delete: false },
    //     { id: 12, name: 'Supllier', read: false, new: false, modify: false, delete: false },
    //     { id: 13, name: 'Station Creation', read: false, new: false, modify: false, delete: false },
    //     // { id: 11, name: 'Employee', read: false, new: false, modify: false, delete: false },

    //     { id: 14, name: 'SETTING', read: false, new: false, modify: false, delete: false },
    //     { id: 15, name: 'User Creation', read: false, new: false, modify: false, delete: false },
    //     { id: 16, name: 'Main Setting', read: false, new: false, modify: false, delete: false },

    //     { id: 17, name: 'INFO', read: false, new: false, modify: false, delete: false },
    //     // { id: 17, name: 'Rate Management', read: false, new: false, modify: false, delete: false },
    //     { id: 18, name: 'Mailers', read: false, new: false, modify: false, delete: false },
    //     { id: 19, name: 'Log Details', read: false, new: false, modify: false, delete: false },
    //     { id: 20, name: 'Employee', read: false, new: false, modify: false, delete: false },
    //     { id: 21, name: 'Agreement', read: false, new: false, modify: false, delete: false },
    //     { id: 22, name: 'Dashboard', read: false },
    //     // { id: 11, name: 'Employee', read: false, new: false, modify: false, delete: false },
    //     { id: 23, name: 'Map', read: false, new: false, modify: false, delete: false },
    //     { id: 24, name: 'RealTime', read: false, new: false, modify: false, delete: false },
    //     { id: 25, name: 'Vehicle', read: false, new: false, modify: false, delete: false },
    //     { id: 26, name: 'Reminders', read: false, new: false, modify: false, delete: false },
    //     { id: 27, name: 'History', read: false, new: false, modify: false, delete: false },
    //     { id: 28, name: 'Records', read: false, new: false, modify: false, delete: false },
    // ];


      const initialPermissionsData = [

        { id: 0, name: 'BOOKING', read: false, new: false, modify: false, delete: false },
        { id: 1, name: 'Booking', read: false, new: false, modify: false, delete: false },
        { id: 2, name: 'Trip Status', read: false, new: false, modify: false, delete: false },
        { id: 3, name: 'Trip sheet', read: false, new: false, modify: false, delete: false },

        { id: 4, name: 'BILLING', read: false, new: false, modify: false, delete: false },
        { id: 5, name: 'Billing', read: false, new: false, modify: false, delete: false },
        { id: 6, name: 'Transfer', read: false, new: false, modify: false, delete: false },
        { id: 7, name: 'Covering Bill', read: false, new: false, modify: false, delete: false },
        { id: 8, name: 'Reports', read: false, new: false, modify: false, delete: false },
         { id: 9, name: 'Vendor Reports', read: false, new: false, modify: false, delete: false },

        { id: 10, name: 'REGISTER', read: false, new: false, modify: false, delete: false },
        { id: 11, name: 'Rate Type', read: false, new: false, modify: false, delete: false },
        { id: 12, name: 'Customer', read: false, new: false, modify: false, delete: false },
        { id: 13, name: 'Supllier', read: false, new: false, modify: false, delete: false },
        { id: 14, name: 'Station Creation', read: false, new: false, modify: false, delete: false },
        // { id: 11, name: 'Employee', read: false, new: false, modify: false, delete: false },

        { id: 15, name: 'SETTING', read: false, new: false, modify: false, delete: false },
        { id: 16, name: 'User Creation', read: false, new: false, modify: false, delete: false },
        { id: 17, name: 'Main Setting', read: false, new: false, modify: false, delete: false },

        { id: 18, name: 'INFO', read: false, new: false, modify: false, delete: false },
        // { id: 17, name: 'Rate Management', read: false, new: false, modify: false, delete: false },
        { id: 19, name: 'Mailers', read: false, new: false, modify: false, delete: false },
        { id: 20, name: 'Log Details', read: false, new: false, modify: false, delete: false },
        { id: 21, name: 'Employee', read: false, new: false, modify: false, delete: false },
        { id: 22, name: 'Agreement', read: false, new: false, modify: false, delete: false },
        { id: 23, name: 'Dashboard', read: false },
        // { id: 11, name: 'Employee', read: false, new: false, modify: false, delete: false },
        { id: 24, name: 'Map', read: false, new: false, modify: false, delete: false },
        { id: 25, name: 'RealTime', read: false, new: false, modify: false, delete: false },
        { id: 26, name: 'Vehicle', read: false, new: false, modify: false, delete: false },
        { id: 27, name: 'Reminders', read: false, new: false, modify: false, delete: false },
        { id: 28, name: 'History', read: false, new: false, modify: false, delete: false },
        { id: 29, name: 'Records', read: false, new: false, modify: false, delete: false },
        { id: 30, name: 'Payment', read: false, new: false, modify: false, delete: false },
        { id: 31, name: 'Vendorpayment', read: false, new: false, modify: false, delete: false },
        { id: 32, name: 'Customerpayment', read: false, new: false, modify: false, delete: false },

    ];


    const [permissionsData, setPermissionsData] = useState(initialPermissionsData);
    // console.log(permissionsData,"fffff")

    const [readState, setReadState] = useState(false);
    const [newState, setNewState] = useState(false);
    const [modifyState, setModifyState] = useState(false);
    const [deleteState, setDeleteState] = useState(false);


    //-------------------------------------------------------------------------




    const updatePermissionsState = (permissionsData1) => {

        const isReadAllOne = !permissionsData1.some(permission => permission.read === 0);
        const isModifyAllOne = !permissionsData1.some(permission => permission.modify === 0);
        const isNewAllOne = !permissionsData1.some(permission => permission.new === 0);
        const isDeleteAllOne = !permissionsData1.some(permission => permission.delete === 0);


        setReadState(isReadAllOne);
        setNewState(isNewAllOne);
        setModifyState(isModifyAllOne);
        setDeleteState(isDeleteAllOne);
    };


    const handleSwitchChange = (permissionType) => () => {

        switch (permissionType) {
            case 'read':
                setReadState(prevState => !prevState);
                break;
            case 'new':
                setNewState(prevState => !prevState);
                break;
            case 'modify':
                setModifyState(prevState => !prevState);
                break;
            case 'delete':
                setDeleteState(prevState => !prevState);
                break;
            default:
                break;
        }

        // Use the corresponding state variable directly based on the permission type
        let newStateValue;
        switch (permissionType) {
            case 'read':
                newStateValue = readState;
                break;
            case 'new':
                newStateValue = newState;
                break;
            case 'modify':
                newStateValue = modifyState;
                break;
            case 'delete':
                newStateValue = deleteState;
                break;
            default:
                break;
        }

        // Update permissions data using the correct state value for the permission type
        setPermissionsData(prevData =>
            prevData.map(permission => ({
                ...permission,
                [permissionType]: !newStateValue
            }))
        );
    };


    const handleSwitchforthatrow = (id) => (event) => {
        // console.log(id,"iiiiii")
        const { checked } = event.target;
        setPermissionsData(prevData =>
            prevData.map((permission, i) => {
                if (i === id) {
                    return {
                        ...permission,
                        read: checked,
                        new: checked,  // Toggles all the fields together
                        modify: checked,
                        delete: checked
                    }
                }
                return permission;
            })
        );
    }

    const handleSwitchforallrows = (id1, id2) => (event) => {
        // console.log(id1, id2, "mainid")


        const { checked } = event.target;
        setPermissionsData(prevData =>
            prevData.map((permission, id) => {
                for (let i = id1; i <= id2; i++) {
                    // newState[i][field] = checked;
                    // console.log(i, "ll")

                    if (id === i) {
                        return {
                            ...permission,
                            read: checked,
                            new: checked,  // Toggles all the fields together
                            modify: checked,
                            delete: checked
                        }
                    }
                }
                return permission;
            })
        );
    }



    //----------------------------------------------------

    // const handleCheckboxChange = (index, field) => (event) => {

    //     const { checked } = event.target;
    //     setPermissionsData(prevData =>
    //         prevData.map((permission, i) => {
    //             if (i === index) {
    //                 return { ...permission, [field]: checked };
    //             }
    //             return permission;
    //         })
    //     );
    // }

    const handleCheckboxChange = useCallback((index, field) => (event) => {

        const { checked } = event.target;
        setPermissionsData(prevData =>
            prevData.map((permission, i) => {
                // const start=0;
              
    
                if (i === index) {
                    // dataper()
                    datacahnges()
                    return { ...permission, [field]: checked };
                }
               
                return permission;
            })
            
        );
       
    },[setPermissionsData])




//  const indexRanges = [
//         { start: 1, end: 3 },
//         { start: 5, end: 8 },
//         { start: 10, end: 13 },
//         { start: 15, end: 16 },
//         { start: 18, end: 20 },
//         { start: 23, end: 27 }
//       ];

// const indexRanges = [
//     { start: 1, end: 3 },
//     { start: 5, end: 8 },
//     { start: 10, end: 13 },
//     { start: 15, end: 16 },
//     { start: 18, end: 21 },
//     { start: 24, end: 28 }
//   ];
      
     const indexRanges = [
    { start: 1, end: 3 },
    { start: 5, end: 9},
    { start: 11, end: 14 },
    { start: 16, end: 17 },
    { start: 19, end: 22 },
    { start: 25, end: 29},
    { start: 31, end: 32}
  ];
      useEffect(()=>{
        datacahnges()
    },[permissionsData])

    const datacahnges = () => {
        
        setPermissionsData(prevData => {
        
          const updatedData = [...prevData];     
          indexRanges.forEach(range => {
            const readTrue = prevData.slice(range.start, range.end + 1).some(item => item.read === true || item.read === 1);
            const newTrue = prevData.slice(range.start, range.end + 1).some(item => item.new === true || item.new === 1);
            const modifyTrue = prevData.slice(range.start, range.end + 1).some(item => item.modify === true || item.modify === 1);
            const deleteTrue = prevData.slice(range.start, range.end + 1).some(item => item.delete === true || item.delete === 1);
    
            updatedData[range.start - 1] = {
              ...updatedData[range.start - 1],
              read: readTrue,
              new: newTrue,
              modify: modifyTrue,
              delete: deleteTrue
            };
          });
          return updatedData;
        });
      };
      

   

    const handleCheckboxChangealldata = (index1, index2, field) => (event) => {
        
        const { checked } = event.target;
        setPermissionsData(prevData =>
            prevData.map((permission, id) => {
                for (let i = index1; i <= index2; i++) {
                    if (id === i) {
                        return { ...permission, [field]: checked };
                    }
                }
                return permission;
            })
        );
    }
    ///----------------------------------------------------

    const [book, setBook] = useState({
        userid: '',
        username: '',
        email: '',
        mobileno: '',
        stationname: '',
        designation: '',
        organizationname: '',
        employeeid:'',
        userpassword: '',
        EmailApp_Password: '',
        Sender_Mail:'',
        active: false,
        // superAdmin: false,
        RoleUser:""
    });
  

    // TABLE END

    const handleChange = (event) => {
        const { name, value, checked, type } = event.target;

        if (type === 'checkbox') {
            setBook((prevBook) => ({
                ...prevBook,
                [name]: checked,
            }));

        } else {
            setBook((prevBook) => ({
                ...prevBook,
                [name]: value,
            }));

            // if (name === 'userpassword') {
            //     setPassword(value);
            // }
        }
    };


    const handleAutocompleteChange = (event, value, name) => {
        const selectedOption = value ? value.label : '';
        setBook((prevBook) => ({
            ...prevBook,
            [name]: selectedOption,
        }));

    };

    // crud functions-------------------------------------
    // cancel
    const handleCancel = () => {
        setBook((prevBook) => ({
            userid: '',
            username: '',
            email: '',
            mobileno: '',
            stationname: '',
            designation: '',
            organizationname: '',
            employeeid:'',
            userpassword: '',
            EmailApp_Password: '',
            Sender_Mail:'',
            active: false,
             RoleUser:" ",
            // superAdmin: false
        }));

        setPermissionsData(initialPermissionsData);
        setReadState(false)
        setDeleteState(false)
        setModifyState(false)
        setNewState(false);
        setIsEditMode(false)
        setEmptyrole(false);
        setDeleteUsercreation(false)
    
    };
    
    // useEffect(() => {
    //     const fetchData = async () => {
    //         //   const organizationname = localStorage.getItem('usercompany');
    //         try {
    //             // if (!organizationname) return
    //             const response = await fetch(`${apiUrl}/organizationdata`);
    //             if (response.status === 200) {
                     
    //                 const userDataArray = await response.json();
    //                 //   console.log(userDataArray,'userdata');
    //                 if (userDataArray.length > 0) {
    //                     setOrganisationSendEmail(userDataArray[0])
    //                     // setDatatrigger(!datatrigger)
    //                 } else {
    //                     setErrorMessage('User data not found.');
    //                     setError(true);
    //                 }
    //             }   
    //         }
    //         catch {
    //         }
    //     };
    //     fetchData();
    // }, [apiUrl]);

    useEffect(() => {
        const fetchData = async () => {
            //   const organizationname = localStorage.getItem('usercompany');
            try {
                // if (!organizationname) return
                const response = await fetch(`${apiUrl}/organisationdataforsendingemail`);
                if (response.status === 200) {
                     
                    const userDataArray = await response.json();
                    //   console.log(userDataArray,'userdata');
                    if (userDataArray.length > 0) {
                        setOrganisationSendEmail(userDataArray[0])
                        // setDatatrigger(!datatrigger)
                    } else {
                        setErrorMessage('User data not found.');
                        setError(true);
                    }
                }
            }
            catch {
            }
        };
        fetchData();
    }, [apiUrl]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${apiUrl}/TemplateUser--Creation`);
                if (response.status === 200) {
                    const userDataArray = await response.json();
                    // console.log("Fetched data:", userDataArray);
                    
                    if (userDataArray.length > 0) {
                        setTemplateMessageData(userDataArray[0].TemplateMessageData);
                    } else {
                        setErrorMessage('User data not found.',"fortempl");
                        setError(true);
                    }

                } else {
                    console.log("Failed to fetch data, status:", response.status);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
        fetchData();
    }, [apiUrl]);   

    // console.log(book,"book")

    // useEffect(() => {
    //     const fetchTemplateMessage = async () => {
    //         try {
    //             const response = await fetch(`${apiUrl}/TemplateMessage`, {
    //                 method: 'POST',
    //                 headers: { 'Content-Type': 'application/json' },
    //                 body: JSON.stringify({ templateInfo: 'credential_template' }) // Use an identifier for the specific template
    //             });
    //             if (response.status === 200) {
    //                 const data = await response.json();
    //                 setTemplateMessageData(data); // Assuming this state holds the template message
    //             } else {
    //                 setErrorMessage('Template message not found.');
    //                 setError(true);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching template message:', error);
    //         }
    //     };
    //     fetchTemplateMessage();
    // }, [apiUrl]);


    //encrypt the url;
 
    const uniqueusercreationname = async (usernname) => {
     
        if (usernname) {
            const encryptedUsername = encryption(usernname)
            // console.log(encryptedUsername,"checking"); 
            
            const fullUrl = `${apiUrl}/getuniqueusercreationdata/${encryptedUsername}`
            // console.log(fullUrl,"checking the url");       
            const response = await axios.get(fullUrl)
         
            const responsedata = response.data;

            if (responsedata?.length >= 1) {
                setCredentialData(true)
                // return true;
            }
            else {
                setCredentialData(false)
                // return false;
            }
        }

    }
    const handleChangeuniquecreation = (event) => {
        const { name, value } = event.target;
        const datacrendital = uniqueusercreationname(value);
        // console.log(datacrendital, "cred")
        setBook((prevBook) => ({
            ...prevBook,
            [name]: value,
        }));



    }

    // show list
    const handleList = useCallback(async () => {
        // console.log("hiiicsal")
        try {
            const response = await axios.get(`${apiUrl}/usercreation`);
            const data = response.data;
            // console.log(data , "checking the values ");
            
            setRows(data);
            // return data;
        } catch {
        }
    }, [apiUrl])
    // useEffect(() => {
    //     handleList();
    // }, [handleList]);


    const handleAdd = async () => {
        const username = book.username;
        const branchName = book.stationname;
        const designation = book.designation;
        const organisation = book.organizationname
        const employeeid=book.employeeid
        const active = book.active
        const email = book.email
        const mobileno = book.mobileno
        const password = book.userpassword
        // const EmailApp_Password=book.EmailApp_Password
        // console.log(book,"checking add values");
    
        if (!password) {
            setWarning(true);
            setWarningMessage("Fill password");
            return;
        }

        if (!username) {
            setWarning(true);
            setWarningMessage("Fill UserName..");
            return;
        }
        if (!email) {
            setWarning(true);
            setWarningMessage("Fill Email");
            return;
        }
        if (!mobileno) {
            setWarning(true);
            setWarningMessage("Fill Mobileno");
            return;
        }

        if (!branchName) {
            setWarning(true);
            setWarningMessage("Fill BranchName..");
            return;
        }

        if (!designation) {
            setWarning(true);
            setWarningMessage("Fill Designation..");
            return;
        }
        if (!employeeid) {
            setWarning(true);
            setWarningMessage("Fill Employee ID..");
            return;
        }

        if (!organisation) {
            setWarning(true);
            setWarningMessage("Fill Organisation..");
            return;
        }
        if (!active) {
            setWarning(true);
            setWarningMessage("Fill Active..");
            return;
        }

        if (cerendentialdata === true) {
            setWarning(true);
            setWarningMessage(" User Name Already Exists");
            return;
        }
        // if (!EmailApp_Password) {
        //     return;
        // }
        try {

            const created_at = dayjs().format("YYYY-MM-DD")
            const data = { book, permissionsData, organistaionsendmail,templateMessageData, created_at }
            await axios.post(`${apiUrl}/usercreation-add`, data);
            
            handleCancel();
            handleList()
            setSuccess(true);
            setSuccessMessage("Successfully Added");
            setCredentialData()
        

        } catch (error) {
            setError(true);
            setErrorMessage("Failed To Add Data");
        }


    };

    // console.log(permissionsData,"ppp")
    // edit
    const handleEdit = async (userid) => {
        try {

            const username = book.username;
            const branchName = book.stationname;
            const designation = book.designation;        
            const organisation = book.organizationname
            const employeeid=book.employeeid
            const active = book.active
            const email = book.email
            const mobileno = book.mobileno
            const password = book.userpassword
            // const EmailApp_Password=book.EmailApp_Password
            // console.log(book,"checking the edit values")


            if (!password) {
                setError(true);
                setErrorMessage("Fill password");
                return;
            }

            if (!username) {
                setError(true);
                setErrorMessage("Fill UserName..");
                return;
            }
            if (!email) {
                setError(true);
                setErrorMessage("Fill Email..");
                return;
            }
            if (!mobileno) {
                setError(true);
                setErrorMessage("Fill Mobile..");
                return;
            }

            if (!branchName) {
                setError(true);
                setErrorMessage("Fill BranchName..");
                return;
            }

            if (!designation) {
                setError(true);
                setErrorMessage("Fill Designation..");
                return;
            }
            if (!employeeid) {
                setError(true);
                setErrorMessage("Fill Employee ID..");
                return;
            }

            if (!organisation) {
                setError(true);
                setErrorMessage("Fill Organisation..");
                return;
            }

            if (!active) {
                setError(true);
                setErrorMessage("Fill Active..");
                return;
            }
            // if (!EmailApp_Password) {
            //     return;
            // }

            const selectedCustomer = rows.find((row) => row.userid === userid);
            const updatedCustomer = { ...selectedCustomer, ...book, };
            const data = { updatedCustomer: updatedCustomer, permissionsData }
            // console.log(book.active);
            await axios.put(`${apiUrl}/usercreation-edit/${book.userid}`, data);
            handleList()
            setCredentialData();
            setSuccess(true);
            setSuccessMessage("Successfully updated");
            handleCancel();
            // handleList()

        } catch {
            setError(true);
            setErrorMessage("Failed to Update ");
        }
    };

    // delete 
    const handleDelete = async () => {
        try {
            await axios.delete(`${apiUrl}/usercreation-delete/${book.userid}`);
            // console.log(book.userid,"successfully delleted")
            setSuccess(true);
            setSuccessMessage("Successfully Deleted");
            await handleList();
            handleCancel();

        }
        catch (err) {
            setError(true);
            setErrorMessage("Failed to Delete Data");
        }
    }




    //------------------------------------------------------



    /// list of options ---------------------------------
    const handleClick = async (event, actionName) => {
        event.preventDefault();


        if (actionName === 'List') {


            try {
                const response = await axios.get(`${apiUrl}/usercreation`);
                const data = response.data;

                setRows(data);
                setSuccess(true);
                setSuccessMessage("Successfully Listed");

            } catch {
                setError(true);
                setErrorMessage("Failed to Retrive Data ");
            }

        } else if (actionName === 'Cancel') {

            handleCancel();
            handleList();
        } else if (actionName === 'Delete') {

            handleDelete();
            handleList();
        } else if (actionName === 'Edit') {
            handleEdit();
            handleList();
        }
        else if (actionName === 'Add') {
            handleAdd();
            handleList();
        }
      
    };


    // its for notification-----------
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



    const permissiondata = async (userId) => {
        const userid = userId;
        const encryptId = encryption(userid)
        // console.log(encryptId,"checking the id");    
        if (encryptId) {
            try {
                const response = await axios.get(`${apiUrl}/user-permissionget/${encryptId}`);
                const permissiondata = response?.data;
                if (permissiondata.length > 0) {
                    return permissiondata;
                }
            }
            catch {
            }
        }
        return;
    }

    // to show list automatically
    useEffect(() => {
        handleList();
    }, [apiUrl, handleList]);

    const handleRowClickUser = async (params) => {
        setBook(params)
        // console.log("params-user", params)

        const user_permission = await permissiondata(params.userid);
        if (user_permission?.length > 0) {
            setPermissionsData(user_permission);
            updatePermissionsState(user_permission);

        }

        setSelectedCustomerId(params.customerId);
        setIsEditMode(true);
        // updatePermissionsState();
        // setShowPermission(false)
    };


    const handleClickShowPasswords = () => {
        setShowPasswords((show) => !show);
    };

    const handleMouseDownPasswords = (event) => {
        event.preventDefault();
    };

    const handleAutocompleteChangeStationName = (event, newValue, name) => {

        // console.log(newValue, "bill")

        setBook((prevBook) => ({
            ...prevBook,
            [name]: newValue,
        }));
        // setSelectedCustomerData((prevData) => ({
        //     ...prevData,
        //     [name]: newValue,
        // }));
    };


    // const uniquevechicleRegno = async (veghnodata) => {
    //     if (veghnodata) {

    //         const response = await axios.get(`${apiUrl}/getAllrolefieldunique/${veghnodata}`)
    //         const responsedata = response.data;
    //         if (responsedata?.length >= 1) {

    //             setRoleField(true)
    //             // return true;
    //         }
    //         else {
    //             setRoleField(false)
    //             // return false;
    //         }
    //     }
    // }

    // const handleRoleChange=(event,value)=>{
    //     const seleteddata = value ? value.label :""
    
    //     console.log(value,"vv",seleteddata)
    //     const data = uniquevechicleRegno(seleteddata)
    //       setRoleFielddropdown(seleteddata)

    // }
    // const handleRoleChange1=(event,value)=>{
    //     // const seleteddata = value ? value.label :value
    //     console.log(value,"vv22")
    //     const data = uniquevechicleRegno(value)
    //       setRoleFielddropdown(value)
    // }



    // const rolenamefield= useCallback(async () => {
    //     // setLoading(true);
    //     setError(false);
    //     setErrorMessage("");

    //     try {
    //         const response = await axios.get(`${apiUrl}/getAllrolefield`);
    //         const data = response.data;
    //         // const rowsWithUniqueId = data.map((row, index) => ({
    //         //     ...row,
    //         //     id: index + 1,
    //         // }));
    //         // setRows(rowsWithUniqueId);
    //         if(data.length > 0 ){
    //         console.log(data,"data")
    //         const names = data.map(res => res.userRole_name)
       
    //         setRoleFieldData(names)
    //         }

          
    //     } catch (err) {
    //         console.error(err);

    //         if (err.message === 'Network Error') {
    //             setErrorMessage("Check network connection.");
    //         } else {
    //             setErrorMessage("Failed to fetch data: " + (err.response?.data?.message || err.message));
    //         }
    //         setError(true);
    //         // setLoading(false);
    //     } 
    // }, [apiUrl]);


    // useEffect(() => {
    //     rolenamefield();
    // }, [rolenamefield]);
    const updatePermissionsStateforrole = (permissionsData1) => {

        const isReadAllOne = !permissionsData1.some(permission => permission.read === 0);
        const isModifyAllOne = !permissionsData1.some(permission => permission.modify === 0);
        const isNewAllOne = !permissionsData1.some(permission => permission.new === 0);
        const isDeleteAllOne = !permissionsData1.some(permission => permission.delete === 0);


        setReadState(isReadAllOne);
        setNewState(isNewAllOne);
        setModifyState(isModifyAllOne);
        setDeleteState(isDeleteAllOne);
    };

    const permisiionrolefield = async(datas)=>{
        // console.log(datas,"resusedtatw")
        if(datas){
        try{
            
    
            const response = await axios.get(`${apiUrl}/userrole-permissiongetroless/${datas}`)
            const responsedata = response.data;
            // console.log(responsedata,"resuseperrrr")
          
            setPermissionsData(responsedata)
            updatePermissionsStateforrole(responsedata)
            
                // setPermissionsData(responsedata)
                // updatePermissionsState1(responsedata)
                // setRoleDataUsers(responsedata)
                // setRoleField(true)
                // return true;
        }
        catch(err){
          console.log(err)
        }
    }
    else{
        // console.log(datas,"resuse esle")
        setPermissionsData(initialPermissionsData)
    }
           
        
    }
    
    const handlerolepermissiondata = async (event,veghnodata) => {
          const seleteddata = veghnodata ? veghnodata.label :""
        //   console.log(seleteddata,"resusesele") 
    try{    
        if(!seleteddata ||typeof seleteddata !== 'string'){
            // console.log("stop")
            return;
        }      
            const response = await axios.get(`${apiUrl}/getAllrolefieldunique/${seleteddata}`)
            const responsedata = response.data;
            if(responsedata.length > 0){
            // console.log(responsedata.length,"resuses",responsedata[0].userRole_id)
            setBook((prevBook) => ({
                ...prevBook,
                RoleUser:seleteddata,
            }));
       
                // console.log(responsedata,"veh")
                permisiionrolefield(responsedata[0].userRole_id)
        }
        else{
            setBook((prevBook) => ({
                ...prevBook,
                RoleUser:"",
            }));
            setPermissionsData(initialPermissionsData)
            setReadState(false)
            setDeleteState(false)
            setModifyState(false)
            setNewState(false);

        }
            // }
    }
    catch(err){
    //   console.log(err,"resuseee")
    }             
                return true;            
    }
   const handlenochangedatarole=(value)=>{
    setBook((prevBook) => ({
        ...prevBook,
        RoleUser:value,
    }));
   }
  
    return {

        selectedCustomerId, handleAutocompleteChangeStationName,
        rows,
        actionName,
        error,
        success,
        isEditable,
        setIsEditable,
        info,
        warning,
        successMessage,
        errorMessage,
        warningMessage,
        book,
        handleClick,
        handleChange,
        handleRowClickUser,
        handleAdd,
        isOpenvehcile,
        setIsOpenvehicle,
        hidePopup,
        handleAutocompleteChange,
        showPasswords,
        handleClickShowPasswords,
        handleMouseDownPasswords,
        isEditMode,handlenochangedatarole,setBook,emptyrole,setEmptyrole,
        handleEdit, handleChangeuniquecreation, cerendentialdata, showPermission, setShowPermission, handleCheckboxChangealldata,setPermissionsData,handlerolepermissiondata,deleteuserceationdata,setDeleteUsercreation,
        // rolefield,setRoleField,
        // rolefielddropdown,setRoleFielddropdown,rolefiledsdata,handleRoleChange,handleRoleChange1,

        //ffor permission
        // deleteuserceationdata,setDeleteUsercreation,
        setCredentialData ,
        
        permissionsData, handleSwitchChange, handleCheckboxChange, setReadState,setModifyState,setDeleteState,setNewState, readState, newState, modifyState, deleteState, handleSwitchforthatrow, handleSwitchforallrows
    };
};

export default useEmplyeecreation;