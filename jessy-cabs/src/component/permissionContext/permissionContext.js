import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { APIURL } from '../url';

export const PermissionsContext = createContext();

export const PermissionsProvider = ({ children }) => {
    const [userPermissions, setUserPermissions] = useState({});
    const user_id = localStorage.getItem('useridno');
    // console.log("user id", user_id)

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                if (user_id !== "undefined") {
                    console.log("user_id ", user_id)
                    const response = await axios.get(`${APIURL}/user-permissions/${user_id}`);
                    const permissionsData = response.data;
                    console.log("per ", permissionsData)
                    setUserPermissions(permissionsData);
                }
            } catch (error) {
                console.error("Error fetching permissions:", error);
            }
        };

        fetchPermissions();
    }, [user_id]);

    return (
        <PermissionsContext.Provider value={{ userPermissions }}>
            {children}
        </PermissionsContext.Provider>
    );
};
