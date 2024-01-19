import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import "./Permission.css";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import BadgeIcon from "@mui/icons-material/Badge";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Permission = () => {
  const [routeData, setRouteData] = useState('');
  // const [selectedCustomerData, setSelectedCustomerData] = useState([]);

  const storedUsername = localStorage.getItem("username");

  useEffect(() => {
    const fetchData = async () => {
      const username = storedUsername;
      try {
        const response = await fetch(`http://localhost:8081/userdata/${encodeURIComponent(username)}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const routeData = await response.json();
        setRouteData(routeData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [storedUsername]);

  console.log(routeData[0]?.userid);

  const [userId, setUserId] = useState({
    userid: '',
  });

  const [permissionsData, setPermissionsData] = useState([
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
  ]);
  // TABLE END

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
    try {
      await axios.post('http://localhost:8081/save-permissions', {
        userId: userId.userid,
        permissions: permissionsData,
        page_name: permissionsData.name
      });

    } catch (error) {
      console.error('Error saving permissions:', error);
    }
  };

  const handleKeyDown = useCallback(async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
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

              // Keep the original "ID" and "Form Name" columns fixed
              return {
                id: permission.id,
                name: permission.name,
                read: Boolean(receivedPermission.read),
                new: Boolean(receivedPermission.new),
                modify: Boolean(receivedPermission.modify),
                delete: Boolean(receivedPermission.delete),
              };
            });
          });
        } else {
          console.error('Invalid response format: Expected an array.');
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

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
                >
                  Save
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
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Permission;
