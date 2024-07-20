import React, { useState, createContext } from "react";

export const ReportContext = createContext();

export const ReportProvider = ({ children }) => {
    const [customerName, setCustomerName] = useState('');

    return (
        <ReportContext.Provider value={{ customerName, setCustomerName }}>
            {children}
        </ReportContext.Provider>
    )
}