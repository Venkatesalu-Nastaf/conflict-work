import React,{useState,useMemo,useEffect} from "react";
import { chennaiCoordinates } from "../../MapSection/mapData";

const useMapParticularData = ()=>{
    const [startTripLocation, setStartTripLocation] = useState({ latitude: null, longitude: null });
    const [endTripLocation, setEndTripLocation] = useState({ latitude: null, longitude: null });
    const [selectTripid,setSelectTripid] = useState(null);
    const [dynamicPolyline, setDynamicPolyline] = useState([]);
    const [fullPathTrip,setFullPathTrip] = useState([]);

  useEffect(() => {    
    const startPoint = chennaiCoordinates.find(
        (point) => point.TripType === "start" && String(point.Tripid) === String(selectTripid)
    );
    const endPoint = chennaiCoordinates.find(
        (point) => point.TripType === "end" && String(point.Tripid) === String(selectTripid)
    );
    const fullPoint = chennaiCoordinates.filter(
        (point) => String(point.Tripid) === String(selectTripid)
    );
    
    
    
    if(fullPoint){
        setFullPathTrip(fullPoint)
    }

    if (startPoint) {
      setStartTripLocation({ latitude: startPoint.latitude, longitude: startPoint.longitude });
    }
    if (endPoint) {
      setEndTripLocation({ latitude: endPoint?.latitude, longitude: endPoint?.longitude })
    }
  }, [selectTripid])
      


    return{
         startTripLocation,endTripLocation,setSelectTripid,selectTripid,dynamicPolyline,setDynamicPolyline,fullPathTrip
    }
}
export default useMapParticularData;