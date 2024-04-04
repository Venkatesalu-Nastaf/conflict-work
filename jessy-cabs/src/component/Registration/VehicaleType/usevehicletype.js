import { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import { PermissionsContext } from "../../permissionContext/permissionContext.js"

import { APIURL } from "../../url.js";


const useVehicletype =()=>{
    const apiUrl=APIURL
    const[rows,setRows]=useState([])
    const[selectedvehicletype,setSelectedvechicletype]=useState({})
    const [enterPressCount, setEnterPressCount] = useState(0);

    const[vechiclebook,setVechiclebook]=useState({
        vehicleid:"",
        vehiclename:"",
        Groups:"",
        vehicletype:"",
        Active:"",
        Luxzuryvehicle:"",
        Segment:""
    })

    const handleChange = useCallback(
        (event) => {
          const { name, value,  type } = event.target;
          console.log(type,name,value,"datatraget")
    if (type === "radio") {
        setVechiclebook((prevBook) => ({
              ...prevBook,
              [name]: value,
            }));
            setSelectedvechicletype((prevData) => ({
              ...prevData,
              [name]: value,
            }));
           
          } else {
            const fieldValue = value;
            setVechiclebook((prevBook) => ({
              ...prevBook,
              [name]: fieldValue,
            }));
          
            setSelectedvechicletype((prevData) => ({
              ...prevData,
              [name]: fieldValue,
            }));
          
          }
        },
        [
          setVechiclebook,
          setSelectedvechicletype
        ]
      );

  console.log(vechiclebook,"databok")
      const handleAdd= async()=>{
        try{
            const addnewvehciletype={
                vehiclename:vechiclebook.vehiclename,
                Groups:vechiclebook.Groups,
                vehicletype:vechiclebook.vehicletype,
                Active:vechiclebook.Active,
                Luxzuryvehicle:vechiclebook.Luxzuryvehicle,
                Segment:vechiclebook.Segment
            }
            await axios.post(`${apiUrl}/vehicletypeinsert`,addnewvehciletype)

        }
        catch(err){
            console.log(err)
        }
      }

      const handleKeyEnter = useCallback(
        async (event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            if (enterPressCount === 0) {
              try {
                const data=event.target.value
                console.log(data,"tar")
                 const response = await axios.get(`${apiUrl}/vehicletype_name`, {
                    params: {
                        vehicletypename:data
                        // servicestation: servicestationValue
                    },
                });
                const vehicleData = response.data;
                console.log(vehicleData,"dataaaa")
                setRows(vehicleData);
              } catch (error) {
                // setError(true);
                // setErrorMessage("Error retrieving vehicle details.");
              }
            } else if (enterPressCount === 1) {
              const selectedRow = rows[0];
              if (selectedRow) {
                setSelectedvechicletype(selectedRow);
                handleChange({
                  target: { name: "vehiclename", value: selectedRow.customer },
                });
              }
            }
            setEnterPressCount((prevCount) => prevCount + 1);
          }
          if (event.target.value === "") {
            setEnterPressCount(0);
          }
        },
        [handleChange, rows, enterPressCount, apiUrl]
      );
    




    return{
        vechiclebook,
        rows,
        handleChange,
        handleKeyEnter,
        handleAdd

    }
}

export default useVehicletype 