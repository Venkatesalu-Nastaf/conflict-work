
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { APIURL } from "../../url";

const usePermission = () => {
    const [warning, setWarning] = useState(false);
    const [warningMessage] = useState({});
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState({});
    const [selectedCustomerDatas, setSelectedCustomerDatas] = useState({});
    const [userData, setUserData] = useState(null);
    // const user_id = localStorage.getItem('useridno');

    //-----------------popup---------------
    const hidePopup = () => {
        setSuccess(false);
        setError(false);
        setWarning(false);
    };
    useEffect(() => {
        if (error || warning || success) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error, warning, success]);

    //--------------------------------------------------
    const [userId, setUserId] = useState({
        userid: '',
    });

    const initialPermissionsData = [
        { id: 1, name: 'Account Master', read: false, new: false, modify: false, delete: false },
        { id: 2, name: 'Billing', read: false, new: false, modify: false, delete: false },
        { id: 3, name: 'Booking Master', read: false, new: false, modify: false, delete: false },
        { id: 4, name: 'Booking', read: false, new: false, modify: false, delete: false },
        { id: 5, name: 'CB Billing', read: false, new: false, modify: false, delete: false },
        { id: 6, name: 'Covering Letter', read: false, new: false, modify: false, delete: false },
        { id: 7, name: 'Customer Master', read: false, new: false, modify: false, delete: false },
        { id: 8, name: 'Driver Master', read: false, new: false, modify: false, delete: false },
        { id: 9, name: 'Fuel Entry', read: false, new: false, modify: false, delete: false },
        { id: 10, name: 'Group Master', read: false, new: false, modify: false, delete: false },
        { id: 11, name: 'Guest Master', read: false, new: false, modify: false, delete: false },
        { id: 12, name: 'Letter Import', read: false, new: false, modify: false, delete: false },
        { id: 13, name: 'MIS Report', read: false, new: false, modify: false, delete: false },
        { id: 14, name: 'MO Billing', read: false, new: false, modify: false, delete: false },
        { id: 15, name: 'Payments', read: false, new: false, modify: false, delete: false },
        { id: 16, name: 'Petty Cash Payments', read: false, new: false, modify: false, delete: false },
        { id: 17, name: 'Petty Cash Receipts', read: false, new: false, modify: false, delete: false },
        { id: 18, name: 'Profit', read: false, new: false, modify: false, delete: false },
        { id: 19, name: 'Rate For Contract', read: false, new: false, modify: false, delete: false },
        { id: 20, name: 'Rate For Customer', read: false, new: false, modify: false, delete: false },
        { id: 21, name: 'Rate For Vendor', read: false, new: false, modify: false, delete: false },
        { id: 22, name: 'Rate Type', read: false, new: false, modify: false, delete: false },
        { id: 23, name: 'Supplier Master', read: false, new: false, modify: false, delete: false },
        { id: 24, name: 'Tally Export', read: false, new: false, modify: false, delete: false },
        { id: 25, name: 'Trip Sheet', read: false, new: false, modify: false, delete: false },
        { id: 26, name: 'User Creation', read: false, new: false, modify: false, delete: false },
        { id: 27, name: 'Vehicle Type', read: false, new: false, modify: false, delete: false },
        { id: 28, name: 'Vendor Report', read: false, new: false, modify: false, delete: false },
        { id: 29, name: 'Permission', read: false, new: false, modify: false, delete: false },
        { id: 30, name: 'Station Creation', read: false, new: false, modify: false, delete: false },
        { id: 31, name: 'Employee PayRoll', read: false, new: false, modify: false, delete: false },
        { id: 32, name: 'Fuel Info', read: false, new: false, modify: false, delete: false },
        { id: 33, name: 'Tax settings', read: false, new: false, modify: false, delete: false },
        { id: 34, name: 'Dashboard page', read: false, new: false, modify: false, delete: false },
        { id: 35, name: 'Booking page', read: false, new: false, modify: false, delete: false },
        { id: 36, name: 'Billing page', read: false, new: false, modify: false, delete: false },
        { id: 37, name: 'Register page', read: false, new: false, modify: false, delete: false },
        { id: 38, name: 'Settings page', read: false, new: false, modify: false, delete: false },
        { id: 39, name: 'Info page', read: false, new: false, modify: false, delete: false },
        { id: 40, name: 'User page', read: false, new: false, modify: false, delete: false },
    ];

    const [permissionsData, setPermissionsData] = useState(initialPermissionsData);

    const handlePermissionChange = (permissionId, permissionType) => {
        setPermissionsData(prevData =>
            prevData.map(permission => {
                if (permission.id === permissionId) {
                    return { ...permission, [permissionType]: !permission[permissionType] };
                }
                return permission;
            })
        );
    };

    const handleHeaderCheckboxChange = (action, checked) => {
        const updatedPermissions = permissionsData.map(permission => ({
            ...permission,
            [action]: checked,
        }));
        setPermissionsData(updatedPermissions);
    };



    const isActionChecked = (action) => permissionsData.every(permission => permission[action]);

    const handleChange = useCallback(async (event) => {
        const { name, value } = event.target;
        setUserId((prevUserId) => ({
            ...prevUserId,
            [name]: value,
        }));

        try {
            const response = await fetch(`${APIURL}/usercreationgetdata/${value}`);
            const data = await response.json();
            setUserData(data);
        } catch {
        }
    }, []);

    const handleRowClick = useCallback((user) => {
        setSelectedCustomerDatas(user);
        setUserId((prevUserId) => ({ ...prevUserId, userid: user.userid }));
    }, []);

    const handleSavePermissions = async () => {
        if (!userId.userid) {
            setError(true);
            setErrorMessage("fill mantatory fields");
            return;
        }

        try {
            await axios.post(`${APIURL}/save-permissions`, {
                userId: userId.userid,
                permissions: permissionsData,
                page_name: permissionsData.name
            });
            setSuccess(true);
            setSuccessMessage("Successfully saved user permission");
            handleCancel();
        } catch {
        }
    };


    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            try {
                const response = await axios.get(`${APIURL}/userdataid/${event.target.value}`);

                if (Array.isArray(response.data)) {
                    const receivedPermissions = response.data;

                    const permissionMap = receivedPermissions.reduce((map, permission) => {
                        map[permission.page_name] = permission;
                        return map;
                    }, {});

                    setPermissionsData(prevPermissions => {
                        return prevPermissions.map(permission => {
                            const receivedPermission = permissionMap[permission.name] || {};

                            return {
                                id: permission.id,
                                name: permission.name,
                                read: Boolean(receivedPermission.read_permission),
                                new: Boolean(receivedPermission.new_permission),
                                modify: Boolean(receivedPermission.modify_permission),
                                delete: Boolean(receivedPermission.delete_permission),
                            };
                        });
                    });
                }
            } catch {
            }
        }
    };

    const handleCancel = () => {
        setUserId({ userid: '' });
        setPermissionsData(initialPermissionsData);
        setSelectedCustomerDatas({});
        setUserData(null);
    };

    return {
        error,
        success,
        warning,
        successMessage,
        errorMessage,
        warningMessage,
        handleChange,
        hidePopup,
        handleRowClick,
        selectedCustomerDatas,
        userId,
        handleKeyDown,
        userData,
        handleSavePermissions,
        handleCancel,
        permissionsData,
        handlePermissionChange, handleHeaderCheckboxChange, isActionChecked
    };
};

export default usePermission;