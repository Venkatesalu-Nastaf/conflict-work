import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { APIURL } from '../../../url';

const apiUrl = APIURL
const DataContext = createContext();

export const useData = () => {
    return useContext(DataContext);
};

export const DataProvider2 = ({ children }) => {

    // its for organisation logo
    const [logotrigger, setLogoTrigger] = useState(false) //for logo trigger 
    const [logo, setLogo] = useState("")


    // const fetchOrgLogo = async () => {
    //     try {
    //         const organizationname = localStorage.getItem('usercompany');
    //         if (!organizationname || organizationname === undefined) return
    //         const response = await axios.get(`${apiUrl}/fetchorg-logo/${organizationname}`)

    //         if (response?.status === 200) {
    //             const logoImage = response?.data[0]?.fileName;
    //             // setLogoImage(logoImage)
    //             setLogo(logoImage)
    //             setLogoTrigger(false)
    //         }
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    // useEffect(() => {
    //     fetchOrgLogo()
    // }, [logotrigger])

    //-------------------

    return (
        <DataContext.Provider value={{ logotrigger, setLogoTrigger, logo, setLogo }}>
            {children}
        </DataContext.Provider>
    );
};