import React, { createContext, useContext, useState, useEffect } from 'react';
import { APIURL } from "../../../url";
import axios from 'axios';

const url = APIURL;

const DataContext = createContext();

export const useData = () => {
    return useContext(DataContext);
};

export const DataProvider2 = ({ children }) => {
    const [sharedData, setSharedData] = useState('');


    //------------------


    useEffect(() => {

        const handleImageView = async () => {

            try {
                const organizationname = localStorage.getItem('usercompany');
                if (organizationname) {
                    // console.log("orgname  if", organizationname)
                    // console.log(" datacontaxtorgname  if", organizationname)

                    await axios.get(`${url}/logo-view/${organizationname}`)
                        .then(res => {
                            if (res.status === 200) {
                                // setSelectedImage(res.data[0]?.fileName);
                                setSharedData(res.data[0]?.fileName)
                                // console.log("datacontaxt logo ", res.data[0]?.fileName)
                            }
                        })
                        .catch((error) => {
                            console.error("Error fetching image data:", error);
                        });
                } else {
                    console.log("org name undefind 222")
                }
            }
            catch (err) { }
        };
        handleImageView();

    }, [sharedData, setSharedData]);


    //-------------------

    return (
        <DataContext.Provider value={{ sharedData, setSharedData }}>
            {children}
        </DataContext.Provider>
    );
};