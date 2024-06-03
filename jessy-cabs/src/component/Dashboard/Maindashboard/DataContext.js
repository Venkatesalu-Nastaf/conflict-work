// DataContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { APIURL } from "../../url"
import axios from 'axios';

const apiUrl = APIURL

const DataContext = createContext();

export const useData = () => {
    return useContext(DataContext);
};

export const DataProvider = ({ children }) => {

    const [sharedData, setSharedData] = useState('');
    const [filteredData, setFilteredData] = useState([])
    const [datatriguserinfo,SetDataTrigUser]=useState('')


    useEffect(() => {
        const handleImageView = () => {
            const userid = localStorage.getItem('useridno');
            axios.get(`${apiUrl}/userprofileview/${userid}`)
                .then(res => {
                    if (res.status === 200) {

                        setSharedData(res.data[0]?.filename)
                        const data = res.data[0]?.filename
                        localStorage.getItem("profileimages", data)

                    } else {
                        const timer = setTimeout(handleImageView, 100);
                        return () => clearTimeout(timer);
                    }
                })
        };
        handleImageView();
    }, [sharedData, setSharedData]);

    return (
        <DataContext.Provider value={{ sharedData, setSharedData, filteredData, setFilteredData,datatriguserinfo,SetDataTrigUser }}>
            {children}
        </DataContext.Provider>
    );
};
