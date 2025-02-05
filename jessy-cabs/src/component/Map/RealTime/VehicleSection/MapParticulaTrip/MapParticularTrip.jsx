import React, { useEffect,useState } from "react";
import { GoogleMap, MarkerF, LoadScript, Polyline } from "@react-google-maps/api";
import useMapParticularData from "./useMapParticularData";
import startPointIcon from "../VehicleInformationDrawer/startPointIcon.png"
import { chennaiCoordinates } from "../../MapSection/mapData";
import { Button } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import TripDetailModal from "../../../Modal/TripDetailModal";
import { VehicleMapData } from "../../../vehicleMapContext/vehcileMapContext";
const containerStyle = {
    width: '100%',
    height: '650px',
};

const center = {
    lat: 13.0827,
    lng: 80.2707,
};

const MapParticularTrip = ({ selectedTripid }) => {

    const { startTripLocation, endTripLocation, selectTripid, setSelectTripid, dynamicPolyline,
        fullPathTrip, handle10xDrawPaths, handle20xDrawPaths, handle50xDrawPaths, speedState, isPlaying, togglePlayPause
    } = useMapParticularData();

    const {tripModalOpen, setTripModalOpen } = VehicleMapData();
        const [clickPosition, setClickPosition] = useState({ top: 0, left: 0 });
    
    useEffect(() => {
        if (selectedTripid !== null) {
            setSelectTripid(selectedTripid)
        }
    }, [selectedTripid])


    const handleStartTrip = (event) => {
        setClickPosition({
            lat: startTripLocation?.latitude,
            lng: startTripLocation?.longitude,
            pixelX: event?.domEvent?.clientX,
            pixelY: event?.domEvent?.clientY,
        });
        setTripModalOpen(true);
    };
    const handleEndTrip = (event) => {
        setClickPosition({
            lat: endTripLocation?.latitude,
            lng: endTripLocation?.longitude,
            pixelX: event?.domEvent?.clientX,
            pixelY: event?.domEvent?.clientY,
        });
        setTripModalOpen(true)

    }
    return (
        <>
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12} >
                <div>
                    {dynamicPolyline.length > 0 ? (
                        <Polyline
                            path={dynamicPolyline}
                            options={{
                                strokeColor: "#189df3",
                                strokeOpacity: 0.8,
                                strokeWeight: 6,
                            }}
                        />
                    )
                        : <Polyline
                            path={fullPathTrip?.map((coord) => ({
                                lat: coord.latitude,
                                lng: coord.longitude,
                            }))}
                            options={{
                                strokeColor: "#189df3",
                                strokeOpacity: 0.8,
                                strokeWeight: 6,
                            }}
                        />
                    }

                    <MarkerF
                        position={{
                            lat: startTripLocation?.latitude,
                            lng: startTripLocation?.longitude,
                        }}
                        onClick={handleStartTrip}
                        icon={{
                            url: startPointIcon,
                            scaledSize: new window.google.maps.Size(24, 24),
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(12, 12),
                        }}
                    />
                    {tripModalOpen && <TripDetailModal position={clickPosition} setTripModalOpen={setTripModalOpen} />}
                </div>
                <div>
                    <MarkerF
                        position={{
                            lat: endTripLocation?.latitude,
                            lng: endTripLocation?.longitude,
                        }}
                        onClick={handleEndTrip}
                        icon={{
                            url: startPointIcon,
                            scaledSize: new window.google.maps.Size(24, 24),
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(12, 12),
                        }}
                    />
                    {tripModalOpen && <TripDetailModal position={clickPosition} setTripModalOpen={setTripModalOpen} />}
                </div>

            </GoogleMap>
            <div className='playButton'>
                <div>
                </div>
                <div className='playArrow'>
                    <Button onClick={togglePlayPause}>
                        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                    </Button>

                </div>
                <div className='playspeed'>

                    <p style={{ textAlign: 'center', margin: 0 }}>Play Speed</p>
                    <Button sx={{
                        backgroundColor: speedState === 1000 ? 'gray' : 'white',
                        color: speedState === 1000 ? 'white' : 'black',
                        '&:hover': { backgroundColor: 'lightgray' },
                    }} onClick={() => handle10xDrawPaths()}>10X</Button>

                    <Button sx={{
                        backgroundColor: speedState === 500 ? 'gray' : 'white',
                        color: speedState === 500 ? 'white' : 'black',
                        '&:hover': { backgroundColor: 'lightgray' },
                    }} onClick={() => handle20xDrawPaths()}>20X</Button>

                    <Button sx={{
                        backgroundColor: speedState === 100 ? 'gray' : 'white',
                        color: speedState === 100 ? 'white' : 'black',
                        '&:hover': { backgroundColor: 'lightgray' },
                    }} onClick={() => handle50xDrawPaths()}>50X</Button>
                </div>
            </div>
        </>
    );
};

export default MapParticularTrip;
