import { useState,useEffect} from "react";
import { APIURL } from "../../../url";
import axios from 'axios'
import dayjs from "dayjs";

const VehicleAddData = () => {
    const apiUrl=APIURL
    const [isOpenvehcile,setIsOpenvehicle] = useState(false);
    const [vechiclevalue, setVechicleValue] = useState("");
    const [error1,setError1]=useState(false);
    const [errorMessage1,setErrorMessage]=useState({})
    const [success1,setSuccess1]=useState(false);
    const [successMessage1,setSuccessMessage]=useState({})
    


    const hidePopup1 = () => {
        setSuccess1(false)
        setError1(false)
    }

    useEffect(() => {
        if (error1 || success1) {
            const timer = setTimeout(() => {
                hidePopup1();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error1, success1]);

    const handleinputchnagevehicle=(e)=>{
        setVechicleValue(e.target.value)
    }

    const handleADDvehicledata=async()=>{
  
        if(!vechiclevalue){
            setError1(true)
            setErrorMessage("Enter the vechcile value")
            return
        }
        
       
        try{
            const created_at=dayjs().format('YYYY-MM-DD')
            const vehicledata={
                vechiclevalue: vechiclevalue,
                created_at:created_at
             }
            await axios.post(`${apiUrl}/getvehciledatauniquevehilcle`,vehicledata)
            setIsOpenvehicle(false)
            setVechicleValue("")
            setSuccess1(true)
            setSuccessMessage("successfully added vehicle")
            

        }
        catch(err){
            setError1(true)
            setErrorMessage("Check Your Network Connection")
        }
    }

  
    return {
        handleinputchnagevehicle,handleADDvehicledata,vechiclevalue,isOpenvehcile,setIsOpenvehicle,error1,errorMessage1,success1,successMessage1,hidePopup1
    }
       
};



export default VehicleAddData;
