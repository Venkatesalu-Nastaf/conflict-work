// DataContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';


const DataContext = createContext();

export const PdfData = () => {
    return useContext(DataContext);
};

export const PdfDataProvider = ({ children }) => {
    const [pdfPrint,setPdfPrint] = useState(false)
    
    return (
        <DataContext.Provider value={{pdfPrint,setPdfPrint }}>
            {children}
        </DataContext.Provider>
    );
};
