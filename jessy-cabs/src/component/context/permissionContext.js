import React, { useState, useEffect, createContext } from "react";
import axios from 'axios';
import { APIURL } from "../url";

const apiurl = APIURL;

export const PermissionContext = createContext();

export const PermissionProvider = ({ children }) => {
      const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const [open, setOpen] = useState(false);
    const [openAddTag, setOpenAddTag] = React.useState(false);
    const [opendetailsDrawer, setOpendetailsDrawer] = useState(false);

    const [historyLocation, setHistoryLocation] = React.useState(false);
    const [openshare, setOpenshare] = React.useState(false);
    const [openDriverModify, setOpenDriverModify] = React.useState(false);
    const [openHistoryDrawer, setOpenHistoryDrawer] = useState(false);
    const [openmessage, setOpenmessage] = React.useState(false);

    const [permissions, setPermission] = useState([]);
    const [makeRender, setMakeRender] = useState(false);
    const [user_id, setUser_id] = useState("")
    
    const userid = localStorage.getItem('useridno') || user_id;
    // const token=localStorage.getItem("tokensdata")
 
    useEffect(() => {
        const fetchPermission = async () => {
            try {

                // if (userid !== "undefined" && userid && userid !== undefined && userid !== null)
                if (userid !== "undefined" && userid && userid !== undefined && userid !== null)
                     {

                    const response = await axios.get(`${apiurl}/use-permissions/${userid}`)
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
        <PermissionContext.Provider value={{ permissions, setPermission, makeRender, setMakeRender, setUser_id,openHistoryDrawer, setOpenHistoryDrawer,openmessage, setOpenmessage ,openshare, setOpenshare,openDriverModify, setOpenDriverModify,historyLocation, setHistoryLocation, openAddTag, setOpenAddTag ,opendetailsDrawer, setOpendetailsDrawer,open, setOpen, isDrawerOpen, setIsDrawerOpen}}>
            {children}
        </PermissionContext.Provider>
    )

}