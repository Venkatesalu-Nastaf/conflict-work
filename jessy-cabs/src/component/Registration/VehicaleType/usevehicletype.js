import { useState, useEffect, useCallback } from "react";
import axios from "axios";

import { APIURL } from "../../url.js";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";


const useVehicletype =()=>{
    const apiUrl=APIURL
    const[rows,setRows]=useState([])
    const [enterPressCount, setEnterPressCount] = useState(0);
    const[edit,setEdit]=useState(false)
    const [error, setError] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [success, setSuccess] = useState(false);

    const[vechiclebook,setVechiclebook]=useState({
        vehicleid:"",
        vehiclename:"",
        Groups:"",
        vehicletype:"",
        Active:"",
        Luxzuryvehicle:"",
        Segment:""
    })

    const actions = [
        { icon: <CancelPresentationIcon />, name: "Clear" },
        { icon: <DeleteIcon />, name: "Delete" },
        { icon: <ModeEditIcon />, name: "Modify" },
        edit ? "" : { icon: <BookmarkAddedIcon />, name: "Add" }
      ];

      const hidePopup = () => {
        setSuccess(false);
        setError(false);
      
      };
      useEffect(() => {
        if (error ||success) {
          const timer = setTimeout(() => {
            hidePopup();
          }, 3000);
          return () => clearTimeout(timer);
        }
      }, [error, success]);
    
    
    
    const handleChange = useCallback(
        (event) => {
          const { name, value,  type } = event.target;
          console.log(type,name,value,"datatraget")
    if (type === "radio") {
        setVechiclebook((prevBook) => ({
              ...prevBook,
              [name]: value,
            }));
           
          } else {
            const fieldValue = value;
            setVechiclebook((prevBook) => ({
              ...prevBook,
              [name]: fieldValue,
            }));
          
          }
        },
        [ setVechiclebook ]
      );

 
      const handleAdd= async()=>{
        if(!vechiclebook.vehiclename&& !vechiclebook.Groups ){
            setError(true)
            setErrorMessage("All Fields Are Mandatory")
            return
        
        }
        if(!vechiclebook.vehicletype){
            setError(true)
            setErrorMessage("All Fields Are Mandatory")
            return
        }
        if(!vechiclebook.Active){
            setError(true)
            setErrorMessage("All Fields Are Mandatory")
            return

        }
        if(!vechiclebook.Luxzuryvehicle){
            setError(true)
            setErrorMessage("All Fields Are Mandatory")
            return

        }
      
        try{
            const{vehicleid,...restvechicle}=vechiclebook
            // const addnewvehciletype={
            //     // vehiclename:vechiclebook.vehiclename,
            //     // Groups:vechiclebook.Groups,
            //     // vehicletype:vechiclebook.vehicletype,
            //     // Active:vechiclebook.Active,
            //     // Luxzuryvehicle:vechiclebook.Luxzuryvehicle,
            //     // Segment:vechiclebook.Segment
            //     ...
            // }
            // const{vehicleid,...restvechicle}=vechiclebook
            // console.log(restvechicle,"vech")
            await axios.post(`${apiUrl}/vehicletypeinsert`,restvechicle)
            setVechiclebook({})
            setSuccess(true);
            setSuccessMessage("Successfully Added");

        }
        catch(err){
            console.error("An error occurred:", err);
            setError(true);
            setErrorMessage("Check your Network Connection");
        }
    
    }
      


    const handleUpdate=async()=>{
        try{
            const data=vechiclebook.vehicleid;
         

            const updatenew={
                            vehiclename:vechiclebook.vehiclename,
                            Groups:vechiclebook.Groups,
                            vehicletype:vechiclebook.vehicletype,
                            Active:vechiclebook.Active,
                            Luxzuryvehicle:vechiclebook.Luxzuryvehicle,
                            Segment:vechiclebook.Segment
                        }
            await axios.put(`${apiUrl}/vechupdate/${data}`,updatenew)
            setVechiclebook({})
            setEdit(false)
            setRows([])
            setSuccess(true);

        setSuccessMessage("Successfully Updated");
        }
        catch(error){
            
            console.error("An error occurred:", error);
            setError(true);
            setErrorMessage("Check your Network Connection");
        }
    }



      const handleKeyEnter = useCallback(
        async (event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            if (enterPressCount === 0) {
                if( event.target.value !== ""){
                    
              try {
                const data=event.target.value
                // console.log(data,"tar",typeof(data))
                 const response = await axios.get(`${apiUrl}/vehicletype_name`, {
                    params: {
                        vehicletypename:data
                    },
                });
                const vehicleData = response.data;
                // console.log(vehicleData,"dataaaa")
                setRows(vehicleData);
                setSuccess(true)
                setSuccessMessage("Successfully listed");
              } catch (error) {
                setRows([])
                setError(true);
                setVechiclebook({})
                console.log(error.response.data.error,"enter")
                setErrorMessage(error.response.data.error);
              }
            }
            else{
                setRows([])
                setVechiclebook({})
            }
            } else if (enterPressCount === 1) {
              const selectedRow = rows[0];
              if (selectedRow) {
                setVechiclebook(selectedRow);
                handleChange({
                  target: { name: "vehiclename", value: selectedRow.vehiclename },
                });
              }
            }
            setEnterPressCount((prevCount) => prevCount + 1);
          }
          if (event.target.value === "") {
            setEnterPressCount(0);
          }
        },
        [handleChange, rows, enterPressCount, apiUrl, setVechiclebook]
      );

    

    const handleRowClick = useCallback(
        (params) => {

            setEdit(true)
        setVechiclebook(params)
        },
        []
      );

      const handleClick = async (event, actionName) => {
        console.log(actionName,"deletename")
        event.preventDefault();
        try {
       
        if (actionName === "Clear") {
            setVechiclebook({})
            setRows([]);
            setEdit(false)
          } else if (actionName === "Delete") {
            // const permissions = checkPagePermission();
            // console.log(vechiclebook.vehicleid,"delete")
            const data=vechiclebook.vehicleid
            
            // console.log(data,"deletedata")
           await axios.delete(`${apiUrl}/vechicletype/${data}`);

              setVechiclebook({})
             setRows([]);
             setSuccess(true);
             setSuccessMessage("Successfully Deleted");

             
             
            } 
        
          
         else if (actionName === "Modify") {
            handleUpdate()

          } else if (actionName === "Add") {
            handleAdd();
          }
        } catch (error) {
          console.error("An error occurred:", error);
          setError(true);
          setErrorMessage("Check Network Connection");
        }
      };
    




    return{
        vechiclebook,
        rows,
        handleChange,
        handleKeyEnter,
        handleAdd,
        handleClick,
        setVechiclebook,
        handleUpdate,
        handleRowClick,
        edit,
        actions,
        successMessage,
        errorMessage,
        success,
        error

    }
}

export default useVehicletype 