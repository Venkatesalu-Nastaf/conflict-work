// DataContext.js
import React, { createContext, useContext, useState} from 'react';


const DataContext = createContext();

export const RefPdfData = () => {
    return useContext(DataContext);
};

export const RefPdfDataProvider = ({ children }) => {
    const [refPdfPrint,setRefPdfPrint] = useState(false)
    const [refCustomer,setRefCustomer] = useState('')
    const [referNo,setReferNo] = useState('')
   
    
    return (
        <DataContext.Provider value={{refPdfPrint,setRefPdfPrint,refCustomer,setRefCustomer,referNo,setReferNo}}>
            {children}
        </DataContext.Provider>
    );
};
