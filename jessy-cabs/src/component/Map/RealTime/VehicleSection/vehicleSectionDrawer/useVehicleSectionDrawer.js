import React,{useState,useEffect,useContext} from "react";
import dayjs from "dayjs";
import axios from "axios";
import { APIURL } from "../../../../url";
import { PermissionContext } from "../../../../context/permissionContext";

const useVehicleSectionDrawer = ()=>{
  const [filterDate, setFilterDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [vehiclesData, setVehiclesData] = useState(null);
    const [startMarkerPosition,setStartMarkerPosition] = useState(null)
    const [selectedVehNo,setSelectedVehNo] = useState(null);
    const apiUrl = APIURL;
    const { vehicleListData, setVehicleListData, vehicleSearchDetails, setVehicleSearchDetails } = useContext(PermissionContext);
 



    return{
        filterDate,setFilterDate,
        startMarkerPosition,
        setSelectedVehNo
    }
}
export default useVehicleSectionDrawer;