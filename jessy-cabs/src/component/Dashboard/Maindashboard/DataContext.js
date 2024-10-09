// DataContext.js
import React, { createContext, useContext, useState } from 'react';
const DataContext = createContext();

export const useData1 = () => {
    return useContext(DataContext);
};

export const DataProvider = ({ children }) => {

    const [sharedData, setSharedData] = useState('');
    const [filteredData, setFilteredData] = useState([])
    const [datatriguserinfo,SetDataTrigUser]=useState('')
    const [expanded,setExpanded]=useState(false);
    const [viewmonthdata,setViewMonthdata]=useState("monthly")
    const [todaybooking, setTodayBooking] = useState([]);
    const [mapButtonTrigger,setMapButtonTrigger] = useState(false)
    

const [triggerCustomerAdd,setTriggerCustomerAdd]=useState(false)


    return (
        <DataContext.Provider value={{ mapButtonTrigger,setMapButtonTrigger,triggerCustomerAdd, setTriggerCustomerAdd, sharedData, setSharedData, filteredData, setFilteredData,datatriguserinfo,SetDataTrigUser,expanded,setExpanded,todaybooking, setTodayBooking,viewmonthdata,setViewMonthdata}}>
            {children}
        </DataContext.Provider>
    );
};
