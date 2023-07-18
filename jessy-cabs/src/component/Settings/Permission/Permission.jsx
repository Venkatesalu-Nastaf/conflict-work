import React, { useState } from "react";
import "./Permission.css";
import { TextField } from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

const Permission = () => {
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
    // Add more permissions...
  ]);

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
                  name="id"
                  sx={{ m: 1, width: "200ch" }}
                  variant="standard"
                />
              </div>
              <div className="input" style={{ width: "100px" }}>
                <Button
                  startIcon={<FontAwesomeIcon icon={faSave} size="lg" />}
                  variant="outlined"
                >
                  Save
                </Button>
              </div>
            </div>
            <div className="secondary-table">
              <span className="Title-Name">Permission Table</span>
              <div className="table-Permission">
                <table>
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
                            checked={permission.read}
                            onChange={() => handlePermissionChange(permission.id, 'read')}
                          />
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            checked={permission.new}
                            onChange={() => handlePermissionChange(permission.id, 'new')}
                          />
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            checked={permission.modify}
                            onChange={() => handlePermissionChange(permission.id, 'modify')}
                          />
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            checked={permission.delete}
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
        </form>
      </div>
    </div>
  );
};

export default Permission;
