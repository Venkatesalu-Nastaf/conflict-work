import React, { useState, createContext,useContext } from "react";

export const ReportContext = createContext();
export const ReportData = () => {
    return useContext(ReportContext);
};
export const ReportProvider = ({ children }) => {
    const [customerName, setCustomerName] = useState('');
    const [value, setValue] = useState("MonthlyWise");
    const [values, setValues] = useState("VendorStatement");

    return (
        <ReportContext.Provider value={{ customerName, setCustomerName,value, setValue ,values ,setValues }}>
            {children}
        </ReportContext.Provider>
    )
}