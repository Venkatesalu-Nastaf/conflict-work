// DataContext.js
import React, { createContext, useContext, useState } from 'react';


const DataContext = createContext();

export const PdfData = () => {
    return useContext(DataContext);
};

export const PdfDataProvider = ({ children }) => {
    const [pdfPrint,setPdfPrint] = useState(false)
    const [billingPage,setBillingPage] = useState(null)
    const [transferReport,setTransferReport] = useState(null)

   
    
    return (
        <DataContext.Provider value={{pdfPrint,setPdfPrint,billingPage,setBillingPage,transferReport,setTransferReport}}>
            {children}
        </DataContext.Provider>
    );
};
