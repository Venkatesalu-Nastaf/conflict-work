import React, { createContext, useContext, useState, useEffect } from 'react';


const DataContext = createContext();

export const MailerTemplateData = () => {
    return useContext(DataContext);
};

export const MailerTemplateDataProvider = ({ children }) => {
    const [mailerTemplate,setMailerTemplate] = useState(false)
    
    return (
        <DataContext.Provider value={{mailerTemplate,setMailerTemplate }}>
            {children}
        </DataContext.Provider>
    );
};