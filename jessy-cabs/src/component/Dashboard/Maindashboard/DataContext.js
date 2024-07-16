// DataContext.js
import React, { createContext, useContext, useState } from 'react';
// import { APIURL } from "../../url"
// import axios from 'axios';

// const apiUrl = APIURL

const DataContext = createContext();

export const useData1 = () => {
    return useContext(DataContext);
};

export const DataProvider = ({ children }) => {

    const [sharedData, setSharedData] = useState('');
    const [filteredData, setFilteredData] = useState([])
    const [datatriguserinfo,SetDataTrigUser]=useState('')
    const [expanded,setExpanded]=useState(false)

const [triggerCustomerAdd,setTriggerCustomerAdd]=useState(false)


    return (
        <DataContext.Provider value={{ triggerCustomerAdd, setTriggerCustomerAdd, sharedData, setSharedData, filteredData, setFilteredData,datatriguserinfo,SetDataTrigUser,expanded,setExpanded }}>
            {children}
        </DataContext.Provider>
    );
};
