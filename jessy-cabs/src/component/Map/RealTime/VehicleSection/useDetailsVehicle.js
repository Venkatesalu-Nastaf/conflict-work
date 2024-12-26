import React,{useState,useEffect} from "react";
import { APIURL } from "../../../url";
import axios from 'axios'

const useDetailsVehicle = ()=>{
    const apiUrl = APIURL;
  const [vehiclesData,setVehiclesData] = useState(null)

//   get All vehicles List
useEffect(()=>{
    const fetchData = async()=>{
        try{
           const response = await axios.get(`${apiUrl}/getAllVehicleDetailsList`);
           console.log(response.data,"vehicle data");
           setVehiclesData(response.data)
        }
        catch(err){
            console.log(err,"error");
            
        }
    }
    fetchData()
},[apiUrl])

    return{
      vehiclesData
    }
}
export default useDetailsVehicle;