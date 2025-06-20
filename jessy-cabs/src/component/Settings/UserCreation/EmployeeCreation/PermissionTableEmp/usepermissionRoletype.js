import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { APIURL } from "../../../../url"
import dayjs from 'dayjs';
// import useEmplyeecreation from '../useEmplyeecreation';
// import EmployeeCreation from './EmployeeCreation';
// import { faMobilePhone } from '@fortawesome/free-solid-svg-icons';


const useEmplyeecreationrole = () => {
//    const {}= useEmplyeecreation();

    

    // console.log(permissionsData,"qmo")
    const apiUrl = APIURL;

    // const [selectedCustomerId, setSelectedCustomerId] = useState(null);
 
    // const [password, setPassword] = useState('');
    const [error1, setError1] = useState(false);
    const [errormessage1, setErrormessage1] = useState(false);
    const [success1, setSuccess1] = useState(false);
    const [info, setInfo] = useState(false);
 
    const [successMessage1, setSuccessMessage1] = useState({});
    // const [isEditable, setIsEditable] = useState(false);
    // const [errorMessage, setErrorMessage] = useState({});
    const [warning, setWarning] = useState(false);
    const [warningMessage] = useState({});
      const [rolefiledsdata,setRoleFieldData] =useState(["SuperAdmin","Assistant CFO","Booking Head","Billing_Headoffice","Hybrid_Customer"])
    const [rolefield,setRoleField]=useState('')
    const [rolefielddropdown,setRoleFielddropdown]=useState()
     const [isModalOpen, setModalOpen] = useState(false);
     const [roledatausers,setRoleDataUsers]=useState([])
     const [modalrolefield ,setModalRoleField]=useState()
     const[emptyroletype,setEmptyroletype]=useState(true)
    // console.log(rolefiledsdata)

    
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



    // const initialPermissionsData1 = [

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

     const initialPermissionsData1 = [

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




    const [permissionsData1, setPermissionsData1] = useState(initialPermissionsData1);
    // console.log(permissionsData,"fffff")

    const [readState1, setReadState1] = useState(false);
    const [newState1, setNewState1] = useState(false);
    const [modifyState1, setModifyState1] = useState(false);
    const [deleteState1, setDeleteState1] = useState(false);


    //-------------------------------------------------------------------------




    const updatePermissionsState1 = (permissionsData1) => {

        const isReadAllOne = !permissionsData1.some(permission => permission.read === 0);
        const isModifyAllOne = !permissionsData1.some(permission => permission.modify === 0);
        const isNewAllOne = !permissionsData1.some(permission => permission.new === 0);
        const isDeleteAllOne = !permissionsData1.some(permission => permission.delete === 0);


        setReadState1(isReadAllOne);
        setNewState1(isNewAllOne);
        setModifyState1(isModifyAllOne);
        setDeleteState1(isDeleteAllOne);
    };


    const handleSwitchChange1 = (permissionType) => () => {

        switch (permissionType) {
            case 'read':
                setReadState1(prevState => !prevState);
                break;
            case 'new':
                setNewState1(prevState => !prevState);
                break;
            case 'modify':
                setModifyState1(prevState => !prevState);
                break;
            case 'delete':
                setDeleteState1(prevState => !prevState);
                break;
            default:
                break;
        }

        // Use the corresponding state variable directly based on the permission type
        let newStateValue;
        switch (permissionType) {
            case 'read':
                newStateValue = readState1;
                break;
            case 'new':
                newStateValue = newState1;
                break;
            case 'modify':
                newStateValue = modifyState1;
                break;
            case 'delete':
                newStateValue = deleteState1;
                break;
            default:
                break;
        }

        // Update permissions data using the correct state value for the permission type
        setPermissionsData1(prevData =>
            prevData.map(permission => ({
                ...permission,
                [permissionType]: !newStateValue
            }))
        );
    };


    const handleSwitchforthatrow1 = (id) => (event) => {
        // console.log(id,"iiiiii")
        const { checked } = event.target;
        setPermissionsData1(prevData =>
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

    const handleSwitchforallrows1 = (id1, id2) => (event) => {
        // console.log(id1, id2, "mainid")


        const { checked } = event.target;
        setPermissionsData1(prevData =>
            prevData.map((permission, id) => {
                for (let i = id1; i <= id2; i++) {
                    // newState[i][field] = checked;
                    console.log(i, "ll")

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

    const handleCheckboxChange1 = useCallback((index, field) => (event) => {

        const { checked } = event.target;
        setPermissionsData1(prevData =>
            prevData.map((permission, i) => {
                // const start=0;
              
    
                if (i === index) {
                    // dataper()
                    datacahnges1()
                    return { ...permission, [field]: checked };
                }
               
                return permission;
            })
            
        );
       
    },[setPermissionsData1])




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
        datacahnges1()
    },[permissionsData1])

    const datacahnges1 = () => {
        
        setPermissionsData1(prevData => {
        
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
      

   

    const handleCheckboxChangealldata1 = (index1, index2, field) => (event) => {
        
        const { checked } = event.target;
        setPermissionsData1(prevData =>
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

   
  

    // TABLE END
    // console.log(permissionsData1,"per")

  




    // crud functions-------------------------------------
    // cancel
    const handleCancel1 = () => {
     

        setPermissionsData1(initialPermissionsData1);
        setRoleFielddropdown()
        setReadState1(false)
        setDeleteState1(false)
        setModifyState1(false)
        setNewState1(false);
        setModalRoleField('')
        setEmptyroletype(false)
        // handleemptyfieldbookuser()
        // setIsEditMode1(false)
    };
    





    

    // show list
 


    // const handleAdd = async () => {
     
    //     // const EmailApp_Password=book.EmailApp_Password



    //     // if (!EmailApp_Password) {
    //     //     return;
    //     // }
    //     try {

    //         const created_at = dayjs().format("YYYY-MM-DD")
    //         const data = { book, permissionsData, organistaionsendmail,templateMessageData, created_at }
    //         await axios.post(`${apiUrl}/usercreation-add`, data);
    //         handleCancel();
    //         handleList()
    //         setSuccess(true);
    //         setSuccessMessage("Successfully Added");
    //         setCredentialData()

    //     } catch (error) {
    //         setError(true);
    //         setErrorMessage("Failed To Add Data");
    //     }


    // };

    // console.log(permissionsData,"ppp")
    // // edit
    // const handleEdit = async (userid) => {
    //     try {

      

    //         const selectedCustomer = rows.find((row) => row.userid === userid);
    //         const updatedCustomer = { ...selectedCustomer, ...book, };
    //         const data = { updatedCustomer: updatedCustomer, permissionsData }


    //         await axios.put(`${apiUrl}/usercreation-edit/${book.userid}`, data);
    //         handleList()
    //         setSuccess(true);
    //         setSuccessMessage("Successfully updated");
    //         handleCancel();
    //         // handleList()



    //     } catch {
    //         setError(true);
    //         setErrorMessage("Failed to Update ");
    //     }
    // };

    // delete 
   



    //------------------------------------------------------



    /// list of options ---------------------------------
 


    // its for notification-----------
    const hidePopup1 = () => {
        setSuccess1(false);
        setError1(false);
        setInfo(false);
        setWarning(false);
    };

    useEffect(() => {
        if (error1 || success1 || warning || info) {
            const timer = setTimeout(() => {
                hidePopup1();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error1, success1, warning, info]);
    //-------------------------------------------------



    // const permissiondata = async (userId) => {
    //     const userid = userId;
    //     if (userid) {
    //         try {
    //             const response = await axios.get(`${apiUrl}/user-permissionget/${userid}`);
    //             const permissiondata = response?.data;
    //             if (permissiondata.length > 0) {
    //                 return permissiondata;
    //             }
    //         }
    //         catch {
    //         }
    //     }
    //     return;
    // }

    // to show list automatically
    // useEffect(() => {
    //     handleList();
    // }, [apiUrl, handleList]);

    // const handleRowClickUser = async (params) => {
    //     setBook(params)
    //     console.log("params-user", params)

    //     const user_permission = await permissiondata(params.userid);
    //     if (user_permission?.length > 0) {
    //         setPermissionsData(user_permission);
    //         updatePermissionsState(user_permission);

    //     }

    //     setSelectedCustomerId(params.customerId);
    //     setIsEditMode(true);
    //     // updatePermissionsState();
    //     // setShowPermission(false)
    // };


    const permisiionroledataget = async(datas)=>{
        // console.log(datas,"resdtatw")
        if (datas) {
            const response = await axios.get(`${apiUrl}/userrole-permissiongetroless/${datas}`)
            const responsedata = response.data;
            if (responsedata?.length >= 1) {
                setPermissionsData1(responsedata)
                // setPermissionsData(responsedata)
                updatePermissionsState1(responsedata)
                // setRoleDataUsers(responsedata)
                // setRoleField(true)
                // return true;
            }
            else {
                setPermissionsData1(initialPermissionsData1)
                setReadState1(false)
        setDeleteState1(false)
        setModifyState1(false)
        setNewState1(false);
                // setRoleField(false)
                // setRoleDataUsers([])
                // return false;
            }
        }
        else{
            setPermissionsData1(initialPermissionsData1)
            setReadState1(false)
            setDeleteState1(false)
            setModifyState1(false)
            setNewState1(false);
        }

    }

    const uniquevechicleRegno = async (veghnodata) => {
        
        if (veghnodata) {

            const response = await axios.get(`${apiUrl}/getAllrolefieldunique/${veghnodata}`)
            const responsedata = response.data;
            // console.log(responsedata,"ress")
            if (responsedata?.length >= 1) {
                // console.log(responsedata,"veh")
                permisiionroledataget(responsedata[0].userRole_id)
                setRoleDataUsers(responsedata)
                setRoleField(true)
                // return true;
            }
            else {
                setRoleField(false)
                setRoleDataUsers([])
                permisiionroledataget()
                
                // return false;
            }
        }
    }

    // console.log(roledatausers,"zzz")
  



    // console.log(roledatausers,"uuu")
    const handleAddrole = async () => {
    
        // if (!EmailApp_Password) {
        //     return;
        // }
        try {
            const rolefielddropdown1 =rolefielddropdown|| modalrolefield
            const created_at = dayjs().format("YYYY-MM-DD")
            const data = {rolefielddropdown1, permissionsData1, created_at }
            await axios.post(`${apiUrl}/userroledata-addfield`, data);
            handleCancel1();
           
            rolenamefield();
           setModalOpen(false)
            setSuccess1(true);
            setSuccessMessage1("UserRole Successfully Added");
           

        } catch (error) {
            // console.log(error,"err")

            if (error.message === 'Network Error') {
                setError1(true);
                setErrormessage1("Check your Network Connection");
                // setisAddload(false)
                // console.log('Network error');
            } else{

            
                setError1(true);
                // Handle other Axios errors (like 4xx or 5xx responses)
                setErrormessage1("Failed to Add Data");
                // setisAddload(false)
            
            // setError1(true);
            // setErrormessage1("Failed To Add Data");
        }


    };
}

    const handleEditrole = async () => {
    
        // if (!EmailApp_Password) {
        //     return;
        // }
        try {
            
            const rolename = rolefielddropdown || modalrolefield

            const roleuserid = roledatausers[0].userRole_id
            const created_at = dayjs().format("YYYY-MM-DD")
            const data = {rolename, permissionsData1, created_at }
            await axios.put(`${apiUrl}/userroledatacreation-edit/${roleuserid}`, data);
            handleCancel1();
            // handleemptyfieldbookuser()
           setModalOpen(false)
            setSuccess1(true);
            rolenamefield();
            setSuccessMessage1("UserRole Successfully Edited");
           

        } catch (error) {


            if (error.message === 'Network Error') {
                setError1(true);
                setErrormessage1("Check your Network Connection");
                // setisAddload(false)
                // console.log('Network error');
            } else{

            
              
            setError1(true);
            setErrormessage1("Failed To Edit Data");
        }


    };
}



    const handleRoleChange=(event,value)=>{
        const seleteddata = value ? value.label :""
    
        // console.log(value,"vv",seleteddata)
        console.log("kkk")
        uniquevechicleRegno(seleteddata)
          setRoleFielddropdown(seleteddata)
          setModalRoleField(seleteddata)

    }
    const handleRoleChange1=(event,value)=>{
        // const seleteddata = value ? value.label :value
        
        // console.log(value,"downvv22")
        console.log("ssss")
         uniquevechicleRegno(value)
          setRoleFielddropdown(value)
          setModalRoleField(value)
        
    }

    const handleOpenModal = (rolefielddropdown,RoleUser) =>{
        // console.log(RoleUser,rolefielddropdown,"down")
        if(!rolefielddropdown && !RoleUser){
            setError1(true);
            setErrormessage1("Enter the roll field");
            return
    
        }
        if(RoleUser){
             uniquevechicleRegno(RoleUser)
            // setRoleFielddropdown(RoleUser)
            setModalRoleField(RoleUser)
        }
         setModalOpen(true);
      }
      const handleCloseModal = () => setModalOpen(false);

// console.log(rolefiledsdata,"ll")

    const rolenamefield= useCallback(async () => {
        // setLoading(true);
        // setError(false);
        // setErrorMessage("");

        try {
            const response = await axios.get(`${apiUrl}/getAllrolefield`);
            const data = response.data;
            // const rowsWithUniqueId = data.map((row, index) => ({
            //     ...row,
            //     id: index + 1,
            // }));
            // setRows(rowsWithUniqueId);
            
            if(data.length > 0 ){
            // console.log(data,"data")
            
            const names = data.map(res => res.userRole_name)
            setRoleFieldData(prevData => {
                const updatedData = new Set([...prevData, ...names]); // Ensures unique values
                return Array.from(updatedData); // Convert back to an array
              });
            // setRoleFieldData(prevData => [...prevData, ...names]);
       
            // setRoleFieldData(names)
            }

          
        } catch (err) {
            // console.error(err);

            if (err.message === 'Network Error') {
                setErrormessage1("Check network connection.");
            } else {
                setErrormessage1("Failed to fetch data: " + (err.response?.data?.message || err.message));
            }
            setError1(true);
            // setLoading(false);
        } 
    }, [apiUrl]);


    useEffect(() => {
        rolenamefield();
    }, [rolenamefield]);

const handleButtondeleteClickrole = async()=>{
    try {
        const useridrole = roledatausers[0].userRole_id;
        await axios.delete(`${apiUrl}/userrolefield-delete/${useridrole}`);
        setModalOpen(false)
        setSuccess1(true);
        setSuccessMessage1("Successfully Deleted");
        setModalOpen(false)
        handleCancel1();

    }
    catch (error) {

        if (error.message === 'Network Error') {
            setError1(true);
            setErrormessage1("Check your Network Connection");
            // setisAddload(false)
            // console.log('Network error');
        } else{

        
          
            setError1(true);
            setErrormessage1("Failed to Delete Data");
    }
       
    }
}




    return {

    
        error1,
     
        info,
        warning,
        successMessage1,
        errormessage1,
        warningMessage,
        success1,
        hidePopup1,
        handleAddrole,
        handleEditrole,
    
        // handleAdd,
     handleCheckboxChangealldata1,modalrolefield,emptyroletype,setEmptyroletype,
         rolefield,setRoleField,
        rolefielddropdown,setRoleFielddropdown,rolefiledsdata,handleRoleChange,handleRoleChange1,permissionsData1,handleOpenModal,isModalOpen, setModalOpen,handleCloseModal,
       

        //ffor permission
        handleButtondeleteClickrole,handleSwitchChange1, handleCheckboxChange1, setReadState1, readState1, newState1, modifyState1, deleteState1, handleSwitchforthatrow1, handleSwitchforallrows1
    };
};

export default useEmplyeecreationrole;