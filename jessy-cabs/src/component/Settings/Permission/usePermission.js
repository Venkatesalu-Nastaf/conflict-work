import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const usePermission = () => {

    const [warning, setWarning] = useState(false);
    const [warningMessage, setWarningMessage] = useState({});
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState({});

    const hidePopup = () => {
        setSuccess(false);
        setError(false);
        setWarning(false);
    };
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error]);
    useEffect(() => {
        if (warning) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [warning]);
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    const user_id = localStorage.getItem('useridno');

    // for page permission
    const [userPermissions, setUserPermissions] = useState({});

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const currentPageName = 'Permission';
                const response = await axios.get(`http://localhost:8081/user-permissions/${user_id}/${currentPageName}`);
                setUserPermissions(response.data);
            } catch (error) {
                console.error('Error fetching user permissions:', error);
            }
        };

        fetchPermissions();
    }, [user_id]);

    const checkPagePermission = useCallback(() => {
        const currentPageName = 'Permission';
        const permissions = userPermissions || {};

        if (permissions.page_name === currentPageName) {
            return {
                read: permissions.read_permission === 1,
                new: permissions.new_permission === 1,
                modify: permissions.modify_permission === 1,
                delete: permissions.delete_permission === 1,
            };
        }

        return {
            read: false,
            new: false,
            modify: false,
            delete: false,
        };
    }, [userPermissions]);

    const permissions = checkPagePermission();

    // Function to determine if a field should be read-only based on permissions
    const isFieldReadOnly = (fieldName) => {
        if (permissions.read) {
            // If user has read permission, check for    other specific permissions
            if (fieldName === "delete" && !permissions.delete) {
                return true;
            }
            return false;
        }
        return true;
    };

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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserId((prevBook) => ({
            ...prevBook,
            [name]: value,
        }));
    };

    const handleSavePermissions = async () => {
        if (!userId.userid) {
            setError(true);
            setErrorMessage("fill mantatory fields");
            return;
        }

        const permissions = checkPagePermission();

        if (permissions.read && permissions.new && permissions.modify) {
            try {
                await axios.post('http://localhost:8081/save-permissions', {
                    userId: userId.userid,
                    permissions: permissionsData,
                    page_name: permissionsData.name
                });
                setSuccess(true);
                setSuccessMessage("Successfully saved user permission");
                handleCancel();
            } catch (error) {
                console.error('Error saving permissions:', error);
            }
        } else {
            setWarning(true);
            setWarningMessage("You do not have permission.");
        }
    };

    const handleKeyDown = useCallback(async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const permissions = checkPagePermission();

            if (permissions.read && permissions.read) {
                try {
                    const response = await axios.get(`http://localhost:8081/userdataid/${event.target.value}`);

                    if (Array.isArray(response.data)) {
                        const receivedPermissions = response.data;

                        // Create a map from page_name to permission object
                        const permissionMap = receivedPermissions.reduce((map, permission) => {
                            map[permission.page_name] = permission;
                            return map;
                        }, {});

                        // Update the state with the received permissions
                        setPermissionsData(prevPermissions => {
                            return prevPermissions.map(permission => {
                                const receivedPermission = permissionMap[permission.name] || {};

                                // Keep the original "ID" and "Form Name" columns fixed
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
                    } else {
                        console.error('Invalid response format: Expected an array.');
                    }

                } catch (error) {
                    console.error(error);
                }
            } else {
                setWarning(true);
                setWarningMessage("You do not have permission.");
            }
        }
    }, [checkPagePermission]);

    const handleCancel = () => {
        setUserId({ userid: '' });
        setPermissionsData(initialPermissionsData);
    };



    return {
        error,
        success,
        warning,
        successMessage,
        errorMessage,
        warningMessage,
        handleChange,
        isFieldReadOnly,
        hidePopup,
        userId,
        handleKeyDown,
        handleSavePermissions,
        handleCancel,
        permissionsData,
        handlePermissionChange,

    };
};

export default usePermission;