import React,{useState,useEffect} from "react";
import axios from "axios"
import { APIURL } from "../../../url";

const useMapSection = ()=>{
    const [currentVehiclePoint,setCurrentVehiclePoint] = useState(null);
    const [todayDate,setTodayDate] = useState('');
    const [allVehicleData,setAllVehcileData] = useState('');
    const apiUrl = APIURL;
    const menuItem = localStorage.getItem('activeMenuItem');

    useEffect(()=>{
        const fetchData = async()=>{
            try{
              const response = await axios.post(`${apiUrl}/getAllVehicleCurrentLocation`);
              console.log(response.data,"alllllvehicleeeee");
              setCurrentVehiclePoint(response.data)
              
            }
            catch(err){

            }
        }
        fetchData()
    },[apiUrl])
      //   get All vehicles List
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/getAllVehicleDetailsList`);
        console.log(response.data, "vehicle data");
  
        setAllVehcileData(response.data)
      }
      catch (err) {
        console.log(err, "error");

      }
    }
    fetchData()
  }, [apiUrl,menuItem])
    return{
        currentVehiclePoint,setCurrentVehiclePoint,allVehicleData
    }
}
export default useMapSection;