import React, { useState, useEffect, createContext } from "react";
import axios from 'axios';
import { APIURL } from "../url";

const apiurl = APIURL;

export const PermissionContext = createContext();

export const PermissionProvider = ({ children }) => {

    const [permissions, setPermission] = useState([]);
    const [makeRender, setMakeRender] = useState(false);
    const [user_id, setUser_id] = useState("")
    const userid = localStorage.getItem('useridno') || user_id;
    const token=localStorage.getItem("tokensdata")
    

    useEffect(() => {
        const fetchPermission = async () => {
            try {

                // if (userid !== "undefined" && userid && userid !== undefined && userid !== null)
                if (userid !== "undefined" && userid && userid !== undefined && userid !== null&& token !== "undefined" && token && token !== undefined && token!== null)
                     {

                    const response = await axios.get(`${apiurl}/use-permissions/${userid}`, {
                        headers: {
                          'x-auth-token': token,
                          
                        }
                      })
                    console.log('response.data', response.data);
                    const data = response.data;
                    setPermission(data);
                }
                else {
                    const timer = setTimeout(fetchPermission, 2000);
                    return () => clearTimeout(timer);
                }
            }
            catch {

            }


        }
        fetchPermission();
    }, [makeRender, userid])



    return (
        <PermissionContext.Provider value={{ permissions, setPermission, makeRender, setMakeRender, setUser_id }}>
            {children}
        </PermissionContext.Provider>
    )

}