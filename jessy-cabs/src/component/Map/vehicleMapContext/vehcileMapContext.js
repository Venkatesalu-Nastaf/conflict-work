import React, { createContext, useContext, useState, useEffect } from 'react';

const VehicleMapContext = createContext();

export const VehicleMapData = () => {
    return useContext(VehicleMapContext);
};

export const VehicleMapDataProvider = ({ children }) => {
    const [jessyCabsDistance, setJessyCabsDistance] = useState(null);
    const [vehcilecurrentAddress,setVehiclecurrentAddress] = useState(null);
    const [tripModalOpen,setTripModalOpen] = useState(null);
    const [vehiclePoint,setVehiclePoint] = useState(null);
    const [vehicleTab,setVehicleTab] = useState(null);
    const [hover, setHover] = useState(null);

    return (
        <VehicleMapContext.Provider value={{
            jessyCabsDistance, setJessyCabsDistance,vehcilecurrentAddress,setVehiclecurrentAddress,tripModalOpen,setTripModalOpen,
            vehicleTab,setVehicleTab,vehiclePoint,setVehiclePoint,hover,setHover
        }}>
            {children}
        </VehicleMapContext.Provider>
    );
};
