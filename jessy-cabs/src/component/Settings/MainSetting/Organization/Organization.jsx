import React, { useEffect, useContext } from 'react';
import "./Organization.css";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { TextField,MenuItem } from "@mui/material";

// ICONS
import ClearIcon from '@mui/icons-material/Clear';
import BadgeIcon from "@mui/icons-material/Badge";
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import SettingsPhoneIcon from '@mui/icons-material/SettingsPhone';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import useOrganization from './useOrganization';
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import { PermissionContext } from '../../../context/permissionContext';
// REACT ICONS
import { BiBuildings } from "@react-icons/all-files/bi/BiBuildings";

const Organization = ({ logoImage }) => {


    const {
        selectedCustomerData,
        // actionName,
        error,
        success,
        warning,
        successMessage,
        errorMessage,
        warningMessage,
        book,
        info,
        infoMessage,
        // handleClick,
        handleChange,
        hidePopup,

        editMode,
        handleUpload,
        toggleEditMode,
        handleKeyDown,
        handleUpdate,
        AddNewKey,
        handleAddNewAPIKey,
        handleApiKeyChange,
        allApiKey,
        // updateKey,
        handleUpdateChange,
        handleUpdateApiKey,
        selectedApikey
    } = useOrganization();

    // useEffect(() => {
    //     if (actionName === 'List') {
    //         handleClick(null, 'List');
    //     }
    // }, [actionName, handleClick]);

    // Permission ------------
    const { permissions } = useContext(PermissionContext)
    const MainSetting_modify = permissions[17]?.modify;



    return (
        <div className="organisation-form Scroll-Style-hide">
            <form>
                <div className='main-content-form'>
                    <div className="detail-container-main-organisation">
                        <div className="container-organisation">
                            <div className="container-organisation-main">
                                <div className='container-organisation-left'>
                                    <div className="input-field">
                                        <div className="input">
                                            <Avatar
                                                // sx={{ width: "12ch", height: "12ch" }}
                                                style={{
                                                    width: '12ch',
                                                    height: '12ch',
                                                    textAlign: 'center',
                                                    objectFit: 'fill',
                                                    color: 'transparent',
                                                    textIndent: '10000px'
                                                }}
                                                alt="logoimage"
                                                src={logoImage}
                                            >
                                                {logoImage ? null : (
                                                    <div className='organisation-avatar-icon'>
                                                        <BiBuildings />
                                                    </div>
                                                )}
                                            </Avatar>
                                        </div>
                                    </div>
                                    {editMode ?
                                        <div className="input-field">
                                            <div className="input-field">
                                                <div className='input'>
                                                    <div className='input-field' style={{ marginTop: '10px' }}>
                                                        <Button color="primary" size='small' variant="contained" disabled={!MainSetting_modify} onClick={handleUpload} component="label" > Edit</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> : <div></div>
                                    }
                                </div>
                                <div className='container-organisation-right'>
                                    <div className="input-field organisation-details-input-feilds">
                                        <div className="input input-buttons-small">
                                            <div className="icone">
                                                <BadgeIcon color="action" />
                                            </div>
                                            <TextField
                                                margin="normal"
                                                size="small"
                                                id="organizationname"
                                                label="Organization Name"
                                                name="organizationname"
                                                sx={{ width: "280px" }}
                                                value={selectedCustomerData?.organizationname || book.organizationname}
                                                onChange={handleChange}
                                                onKeyDown={handleKeyDown}
                                                disabled={!editMode}
                                            />
                                        </div>
                                        <div className="input input-buttons-small">
                                            <div className="icone">
                                                <WorkspacePremiumIcon color="action" />
                                            </div>
                                            <TextField
                                                size="small"
                                                id="organizationtype"
                                                label="Organization Type"
                                                name="organizationtype"
                                                sx={{ width: "280px" }}
                                                autoComplete="new-password"
                                                value={selectedCustomerData?.organizationtype || book.organizationtype}
                                                onChange={handleChange}
                                                disabled={!editMode}
                                            />
                                        </div>

                                        {/* </div>
                                <div className="input-field organisation-details-input-feilds"> */}
                                        <div className="input input-buttons-small">
                                            <div className="icone">
                                                <SettingsPhoneIcon color="action" />
                                            </div>
                                            <TextField
                                                type='number'
                                                size="small"
                                                id="contactPhoneNumber"
                                                label="Mobile"
                                                name="contactPhoneNumber"
                                                sx={{ width: "280px" }}
                                                autoComplete="new-password"
                                                value={selectedCustomerData?.contactPhoneNumber || book.contactPhoneNumber}
                                                onChange={handleChange}
                                                disabled={!editMode}
                                            />
                                        </div>
                                        <div className="input input-buttons-small">
                                            <div className="icone">
                                                <AttachEmailIcon color="action" />
                                            </div>
                                            <TextField
                                                sx={{ width: "280ch" }}
                                                size="small"
                                                id="contactEmail"
                                                label="Email"
                                                name="contactEmail"
                                                autoComplete="new-password"
                                                value={selectedCustomerData?.contactEmail || book.contactEmail}
                                                onChange={handleChange}
                                                disabled={!editMode}
                                            />
                                        </div>
                                    </div>
                                    <div className="user-photo-edit">
                                        {/* <IconButton color="primary" disabled={!MainSetting_modify} onClick={toggleEditMode} size='small' variant="outlined" component="label">
                                            <ModeEditIcon />
                                        </IconButton> */}
                                         <IconButton color="primary" disabled={!MainSetting_modify} 
                                         onClick={()=>{
                                            if(editMode){
                                                handleUpdate();
                                            }else{
                                                toggleEditMode();
                                            }
                                         }}
                                         size='small' variant="outlined" component="label"
                                         >
                                            <ModeEditIcon />
                                         </IconButton>

                                    </div>

                                    <div className='alert-popup-main'>
                                        {error &&
                                            <div className='alert-popup Error' >
                                                <div className="popup-icon"> <ClearIcon /> </div>
                                                <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
                                                <p>{errorMessage}</p>
                                            </div>
                                        }
                                        {success &&
                                            <div className='alert-popup Success' >
                                                <div className="popup-icon"> <FileDownloadDoneIcon /> </div>
                                                <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
                                                <p>{successMessage}</p>
                                            </div>
                                        }
                                        {warning &&
                                            <div className='alert-popup Warning' >
                                                <div className="popup-icon"> <ErrorOutlineIcon /> </div>
                                                <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
                                                <p>{warningMessage}</p>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="organisation-details ">
                        <div className="input-field organisation-details-input">
                            <div className='organisation-details-input-sub-division'>
                                <div className="input organization-input">
                                    <label htmlFor="">Type of Organization:</label>
                                    <TextField
                                        sx={{ width: "100%" }}
                                        size="small"
                                        id="organizationType"
                                        name="organizationtype"
                                        className='organisation-input-field'
                                        value={selectedCustomerData?.organizationtype || book.organizationtype}
                                        onChange={handleChange}
                                        disabled={!editMode}
                                    />
                                </div>
                                <div className="input organization-input">
                                    <label htmlFor="">Website:</label>
                                    <TextField
                                        sx={{ width: "100%" }}
                                        size="small"
                                        id="website"
                                        name="website"
                                        className='organisation-input-field'
                                        value={selectedCustomerData?.website || book.website}
                                        onChange={handleChange}
                                        disabled={!editMode}
                                    />
                                </div>

                                <div className="input organization-input">
                                    <label htmlFor="">PAN Number:</label>
                                    <TextField
                                        sx={{ width: "100%" }}
                                        size="small"
                                        id="pannumber"
                                        name="pannumber"
                                        className='organisation-input-field'
                                        value={selectedCustomerData?.pannumber || book.pannumber}
                                        onChange={handleChange}
                                        disabled={!editMode}
                                    />
                                </div>
                                <div className="input organization-input">
                                    <label htmlFor="">Address:</label>
                                    <TextField
                                        size="small"
                                        sx={{ width: "225px" }}
                                        name="addressLine1"
                                        className='address-field organisation-address-field'
                                        value={selectedCustomerData?.addressLine1 || book.addressLine1}
                                        onChange={handleChange}
                                        // label="Address"
                                        id="remark"
                                        multiline
                                        rows={3}
                                        autoComplete="password"
                                        disabled={!editMode}
                                    />
                                </div>
                                <div className="input organization-input">
                                    <label htmlFor="">Location:</label>
                                    <TextField
                                        sx={{ width: "100%" }}
                                        size="small"
                                        id="location"
                                        name="location"
                                        className='organisation-input-field'
                                        value={selectedCustomerData?.location || book.location}
                                        onChange={handleChange}
                                        disabled={!editMode}
                                    />
                                </div>
                                <div className="input organization-input">
                                    <label htmlFor="">Employees:</label>
                                    <TextField
                                        sx={{ width: "100%" }}
                                        size="small"
                                        id="employees"
                                        name="employees"
                                        className='organisation-input-field'
                                        value={selectedCustomerData?.employees || book.employees}
                                        onChange={handleChange}
                                        disabled={!editMode}
                                    />
                                </div>
                                <div className="input organization-input">
                                    <label htmlFor="">Organisation Type: </label>
                                    <TextField
                                        sx={{ width: "100%" }}
                                        size="small"
                                        id="partnershipsAlliances"
                                        name="partnershipsAlliances"
                                        className='organisation-input-field'
                                        value={selectedCustomerData?.partnershipsAlliances || book.partnershipsAlliances}
                                        onChange={handleChange}
                                        disabled={!editMode}
                                    />
                                </div>
                                <div className="input organization-input">
                                    <label htmlFor="">GST Number:</label>
                                    <TextField
                                        sx={{ width: "100%" }}
                                        size="small"
                                        id="taxIDNumber"
                                        name="gstnumber"
                                        className='organisation-input-field'
                                        value={selectedCustomerData?.gstnumber || book.gstnumber}
                                        onChange={handleChange}
                                        disabled={!editMode}
                                    />
                                </div>
                                <div className="input organization-input">
                                    <label htmlFor="">Telephone No:</label>
                                    <TextField
                                        sx={{ width: "100%" }}
                                        size="small"
                                        id="telephone"
                                        name="telephone"
                                        className='organisation-input-field'
                                        value={selectedCustomerData.telephone || book.telephone || ''}
                                        onChange={handleChange}
                                        disabled={!editMode}
                                    />
                                </div>
                                <div className="input organization-input">
                                    <label htmlFor="">Sender Mail:</label>
                                    <TextField
                                        sx={{ width: "100%" }}
                                        size="small"
                                        id="Sender_Mail"
                                        name="Sender_Mail"
                                        className='organisation-input-field'
                                        value={selectedCustomerData.Sender_Mail || book.Sender_Mail || ''}
                                        onChange={handleChange}
                                        disabled={!editMode}
                                    />
                                </div>
                                <div className="input organization-input">
                                    <label htmlFor="">App Password:</label>
                                    <TextField
                                        sx={{ width: "100%" }}
                                        size="small"
                                        id="EmailApp_Password"
                                        name="EmailApp_Password"
                                        className='organisation-input-field'
                                        value={selectedCustomerData.EmailApp_Password || book.EmailApp_Password || ''}
                                        onChange={handleChange}
                                        disabled={!editMode}
                                    />
                                </div>
                                <div className="input organization-input">
                                    <div style={{ display: 'grid', justifyContent: 'center' }}>
                                        <label htmlFor="">Bank Details:</label>
                                        <TextField
                                            sx={{ width: "225px" }}
                                            name="BankDetails"
                                            className='address-field organisation-address-field Scroll-Style-hide'
                                            value={selectedCustomerData?.BankDetails || book.BankDetails}
                                            onChange={handleChange}
                                            // label="BankDetails"
                                            id="Bank"
                                            multiline
                                            rows={5}
                                            autoComplete="password"
                                            disabled={!editMode} />
                                    </div>

                                </div>
                                <div className="input organization-input">
                                    <div style={{ display: 'grid', justifyContent: 'center' }}>
                                        <label htmlFor="">Add New API KEY :</label>
                                        <TextField
                                            sx={{ width: "250px" }}
                                            name="newApi"
                                            className='address-field organisation-address-field Scroll-Style-hide'
                                            value={AddNewKey}
                                            onChange={handleApiKeyChange}
                                            // label="BankDetails"
                                            id="mapApi"
                                            // multiline
                                            // rows={5}
                                            // autoComplete="password"
                                            disabled={!editMode} />
                                    </div>
                                    <div>
                                        {editMode ? 
                                        <Button variant='contained' onClick={handleAddNewAPIKey}>
                                            ADD
                                        </Button> : ""}
                                    </div>
                                </div>
                                <div className="input organization-input">
                                    <div style={{ display: 'grid', justifyContent: 'center' }}>
                                        <label htmlFor="mapApi">Map Api Key :</label>
                                        <TextField
                                            select
                                            sx={{ width: "410px" }}
                                            name="BankDetails"
                                            className='address-field organisation-address-field Scroll-Style-hide'
                                            value={selectedApikey}
                                            onChange={handleUpdateChange}
                                            id="mapApi"
                                            disabled={!editMode}
                                        >
                                            {allApiKey.map((key, index) => (
                                                <MenuItem key={index} value={key}>
                                                    {key}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </div>
                                    <div>
                                        {editMode ?
                                        <Button variant='contained' onClick={handleUpdateApiKey}>
                                            Edit
                                        </Button> : ""}
                                    </div>
                                </div>
                                {/* <textarea /> */}
                            </div>
                            {editMode ? (
                                <div className="input-field save-cancel-inputs">
                                    <div className="input">
                                        <Button variant="outlined" onClick={toggleEditMode}>
                                            Cancel
                                        </Button>
                                    </div>
                                    <div className="input">
                                        <Button variant="contained" onClick={handleUpdate} disabled={!MainSetting_modify}   >
                                            Update
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div></div>

                            )}

                        </div>
                        <div className='alert-popup-main'>
                            {info &&
                                <div className='alert-popup Info' >
                                    <div className="popup-icon"> <BsInfo /> </div>
                                    <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
                                    <p>{infoMessage}</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default Organization