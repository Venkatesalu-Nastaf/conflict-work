import React, { useContext } from 'react'
import { PiShareFatFill } from "react-icons/pi";
import { PermissionContext } from '../../../../context/permissionContext';

const ShareIcon = () => {
    const { setOpenshare } = useContext(PermissionContext);
    const clickSharepopupOpen = () => {
        setOpenshare(true);
    };

    return (
        <>
            <div onClick={clickSharepopupOpen}>
                <PiShareFatFill />

            </div>
        </>
    )
}

export default ShareIcon;