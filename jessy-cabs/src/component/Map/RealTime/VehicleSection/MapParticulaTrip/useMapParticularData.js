import React,{useState,useMemo,useEffect,useRef} from "react";
import { chennaiCoordinates } from "../../MapSection/mapData";

const useMapParticularData = ()=>{
    const [startTripLocation, setStartTripLocation] = useState({ latitude: null, longitude: null });
    const [endTripLocation, setEndTripLocation] = useState({ latitude: null, longitude: null });
    const [selectTripid,setSelectTripid] = useState(null);
    const [dynamicPolyline, setDynamicPolyline] = useState([]);
    const [fullPathTrip,setFullPathTrip] = useState([]);
    const [speedState, setSpeedState] = useState(1000);
    const [isPlaying, setIsPlaying] = useState(false); // State to control animation
    const [playInterval, setPlayInterval] = useState(null);
    const [speedValuename, setSpeedValuename] = useState("10x")
    

    useEffect(() => {
      if (speedValuename === "10x") {
        setSpeedState(1000)
      }
      if (speedValuename === "20x") {
        setSpeedState(500)
      }
      if (speedValuename === "50x") {
        setSpeedState(100)
      }
    }, [speedValuename])

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

  const togglePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      clearInterval(playInterval); // Stop the animation
    } else {
      handledefault10xDrawPaths(); // Start the animation
    }
  };
  const stepRef = useRef(0); // Persist step across re-renders

  const handledefault10xDrawPaths = ()=>{
    if (stepRef.current >= fullPathTrip.length) {
      stepRef.current = 0; // Reset when reaching the last point
      setDynamicPolyline([]); // Clear the polyline
    }
    // setTrigger((prev) => !prev);
    setIsPlaying(true);

    const totalSteps = fullPathTrip.length - 1;

    const interval = setInterval(() => {
      if (stepRef.current <= totalSteps && speedState) {
        const newPoint = {
          lat: fullPathTrip[stepRef.current].latitude,
          lng: fullPathTrip[stepRef.current].longitude,
        };
        // setCurrentPosition(newPoint);
        setDynamicPolyline((prevPolyline) => [...prevPolyline, newPoint]);

        stepRef.current++; // Persist step count
      } else {
        clearInterval(interval);
        setIsPlaying(false);
      }
      setPlayInterval(interval);
    }, speedState);
  }
      
  const handle10xDrawPaths = () => {
    setSpeedState(1000)
  }
  const handle20xDrawPaths = () => {
    setSpeedState(500)
  }


  const handle50xDrawPaths = () => {
    setSpeedState(100)
  }

    return{
         startTripLocation,endTripLocation,setSelectTripid,selectTripid,dynamicPolyline,setDynamicPolyline,fullPathTrip,
         handle10xDrawPaths,handle20xDrawPaths,handle50xDrawPaths,speedState,isPlaying,togglePlayPause,
    }
}
export default useMapParticularData;