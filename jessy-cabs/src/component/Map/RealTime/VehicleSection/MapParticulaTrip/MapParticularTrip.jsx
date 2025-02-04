import React, { useEffect } from "react";
import { GoogleMap, MarkerF, LoadScript, Polyline } from "@react-google-maps/api";
import useMapParticularData from "./useMapParticularData";
import startPointIcon from "../VehicleInformationDrawer/startPointIcon.png"
import { chennaiCoordinates } from "../../MapSection/mapData";
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
fullPathTrip
     } = useMapParticularData();
    useEffect(() => {
        if (selectedTripid !== null) {
            setSelectTripid(selectedTripid)
        }
    }, [selectedTripid])

    return (
        <>
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12} >
                <div>
                    <Polyline
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
                    <MarkerF
                        position={{
                            lat: startTripLocation?.latitude,
                            lng: startTripLocation?.longitude,
                        }}
                        // onClick={handleStartTrip}
                        icon={{
                            url: startPointIcon,
                            scaledSize: new window.google.maps.Size(24, 24),
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(12, 12),
                        }}
                    />
                    {/* {tripModalOpen && <TripDetailModal position={clickPosition} setTripModalOpen={setTripModalOpen} />} */}
                </div>
                <div>
                    <MarkerF
                        position={{
                            lat: endTripLocation?.latitude,
                            lng: endTripLocation?.longitude,
                        }}
                        // onClick={handleEndTrip}
                        icon={{
                            url: startPointIcon,
                            scaledSize: new window.google.maps.Size(24, 24),
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(12, 12),
                        }}
                    />
                    {/* {tripModalOpen && <TripDetailModal position={clickPosition} setTripModalOpen={setTripModalOpen} />} */}
                </div>

            </GoogleMap>
        </>
    );
};

export default MapParticularTrip;
