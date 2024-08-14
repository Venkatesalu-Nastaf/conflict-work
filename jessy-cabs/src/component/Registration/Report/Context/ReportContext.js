import React, { useState, createContext,useContext } from "react";

export const ReportContext = createContext();
export const ReportData = () => {
    return useContext(ReportContext);
};
export const ReportProvider = ({ children }) => {
    const [customerName, setCustomerName] = useState('');
    const [value, setValue] = useState("Monthly Wise");

    return (
        <ReportContext.Provider value={{ customerName, setCustomerName,value, setValue }}>
            {children}
        </ReportContext.Provider>
    )
}