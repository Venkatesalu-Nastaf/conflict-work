import React, { useState, useCallback, useEffect } from "react";
import axios from 'axios';
import "./Permission.css";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import ClearIcon from '@mui/icons-material/Clear';
import BadgeIcon from "@mui/icons-material/Badge";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Permission = () => {
  // const [routeData, setRouteData] = useState('');
  // const [selectedCustomerData, setSelectedCustomerData] = useState([]);

  // const storedUsername = localStorage.getItem("username");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const username = storedUsername;
  //     try {
  //       const response = await fetch(`http://localhost:8081/userdata/${encodeURIComponent(username)}`);
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       const routeData = await response.json();
  //       setRouteData(routeData);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchData();
  // }, [storedUsername]);

  // const useridno = routeData[0]?.userid;

  // localStorage.setItem('useridno', useridno);
  // const storedUserId = localStorage.getItem('useridno');

  // // Display the value in the console
  // console.log('Stored UserId:', storedUserId);

  // console.log('user id display', useridno);
  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState({});

  const hidePopup = () => {
    setWarning(false);
  };

  useEffect(() => {
    if (warning) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000); // 3 seconds
      return () => clearTimeout(timer); // Clean up the timer on unmount
    }
  }, [warning]);

  const user_id = localStorage.getItem('useridno');

  // for page permission
  const [userPermissions, setUserPermissions] = useState({});

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const currentPageName = 'Permission';
        const response = await axios.get(`http://localhost:8081/user-permissions/${user_id}/${currentPageName}`);
        setUserPermissions(response.data);
        console.log('permission data', response.data);
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
    { id: 29, name: 'Vendor Report', read: false, new: false, modify: false, delete: false },
    { id: 30, name: 'Permission', read: false, new: false, modify: false, delete: false },
    { id: 31, name: 'Station Creation', read: false, new: false, modify: false, delete: false },
    { id: 32, name: 'Employee PayRoll', read: false, new: false, modify: false, delete: false },
    { id: 33, name: 'Fuel Info', read: false, new: false, modify: false, delete: false },
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
    const permissions = checkPagePermission();

    if (permissions.read && permissions.new && permissions.modify) {
      try {
        await axios.post('http://localhost:8081/save-permissions', {
          userId: userId.userid,
          permissions: permissionsData,
          page_name: permissionsData.name
        });
        handleCancel();
      } catch (error) {
        console.error('Error saving permissions:', error);
      }
    } else {
      setWarning(true);
      setWarningMessage("You do not have permission to add users on this page.");
    }
  };

  const handleKeyDown = useCallback(async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const permissions = checkPagePermission();

      if (permissions.read && permissions.read) {
        try {
          const response = await axios.get(`http://localhost:8081/userdataid/${event.target.value}`);
          console.log('Response from server:', response.data);

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
                console.log('recieved permission', receivedPermission.read_permission);

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

  return (
    <div className="permission-main">
      <div className="permission-form-container">
        <form>
          <span className="Title-Name">Permission</span>
          <div className="permission-header">
            <div className="input-field">
              <div className="input" style={{ width: "300px" }}>
                <div className="icone">
                  <BadgeIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  id="id"
                  label="ID"
                  name="userid"
                  value={userId.userid || ''}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  sx={{ m: 1, width: "200ch" }}
                  variant="standard"
                />
              </div>
              <div className="input" style={{ width: "100px" }}>
                <Button
                  startIcon={<FontAwesomeIcon icon={faSave} size="lg" />}
                  variant="outlined"
                  onClick={handleSavePermissions}
                  disabled={isFieldReadOnly("new")}
                >
                  Save
                </Button>
              </div>
              <div className="input" style={{ width: "100px" }}>
                <Button
                  startIcon={<FontAwesomeIcon icon={faSave} size="lg" />}
                  variant="outlined"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
            </div>
            <div className="secondary-table">
              <span className="Title-Name">Permission Table</span>
              <div className="table-Permission">
                <div className="table-container Scroll-Style">
                  <table className="responsive-table ">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Form Name</th>
                        <th>Read</th>
                        <th>New</th>
                        <th>Modify</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {permissionsData.map(permission => (
                        <tr key={permission.id}>
                          <td>{permission.id}</td>
                          <td>{permission.name}</td>
                          <td>
                            <input
                              type="checkbox"
                              checked={Boolean(permission.read)}
                              onChange={() => handlePermissionChange(permission.id, 'read')}
                            />
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              checked={Boolean(permission.new)}
                              onChange={() => handlePermissionChange(permission.id, 'new')}
                            />
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              checked={Boolean(permission.modify)}
                              onChange={() => handlePermissionChange(permission.id, 'modify')}
                            />
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              checked={Boolean(permission.delete)}
                              onChange={() => handlePermissionChange(permission.id, 'delete')}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {warning &&
                <div className='alert-popup Warning' >
                  <div className="popup-icon"> <ErrorOutlineIcon style={{ color: '#fff' }} /> </div>
                  <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                  <p>{warningMessage}</p>
                </div>
              }
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Permission;
