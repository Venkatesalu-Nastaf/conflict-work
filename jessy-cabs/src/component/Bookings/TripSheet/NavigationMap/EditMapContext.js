import React, { useState, createContext,useContext } from "react";

export const EditMapContext = createContext();
export const EditContext = () => {
    return useContext(EditMapContext);
};
export const EditMapProvider = ({ children }) => {
    const [editDataTrigger,setEditDataTrigger] = useState(false);

    return (
        <EditMapContext.Provider value={{ editDataTrigger,setEditDataTrigger }}>
            {children}
        </EditMapContext.Provider>
    )
}