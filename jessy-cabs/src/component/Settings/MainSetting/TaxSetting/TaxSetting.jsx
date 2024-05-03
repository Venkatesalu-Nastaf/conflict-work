import React, { useEffect, useContext } from 'react';
import './TaxSetting.css';
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { TaxType } from './TaxSettingData.js';
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import Autocomplete from "@mui/material/Autocomplete";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PermissionContext } from '../../../context/permissionContext.js';


// FontAwesomeIcon Link
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// ICONS
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import useTaxsettings from './useTaxsettings.js';
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";




const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
    position: "absolute",
    "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
        top: theme.spacing(2),
        left: theme.spacing(2),
    },
}));

// Table End

const TaxSetting = () => {

    const {
        selectedCustomerData,
        selectedCustomerId,
        rows,
        actionName,
        error,
        success,
        info,
        warning,
        successMessage,
        errorMessage,
        warningMessage,
        infoMessage,
        book,
        handleClick,
        handleChange,
        handleRowClick,
        handleAdd,
        hidePopup,
        formData,
        handleDateChange,
        handleAutocompleteChange,
        columns,
        isEditMode,
        handleEdit,
    } = useTaxsettings();

    useEffect(() => {
        if (actionName === 'List') {
            handleClick(null, 'List');
        }
    }, [actionName, handleClick]);


    // Permission-------------------------------------------
    const { permissions } = useContext(PermissionContext)

    const MainSetting_read = permissions[15]?.read;
    const MainSetting_new = permissions[15]?.new;
    const MainSetting_modify = permissions[15]?.modify;
    const MainSetting_delete = permissions[15]?.delete;

    return (
        <div className="TaxSetting-form">
            <form onSubmit={handleClick}>
                <div className="TaxSetting-header">
                    <div className="input-field tax-setting-input" style={{ padding: '0px 15px' }}>
                        <div className="input">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Date Tax From"
                                    value={formData.startdate || selectedCustomerData.DateTaxFrom ? dayjs(selectedCustomerData.DateTaxFrom) : null || book.DateTaxFrom ? dayjs(book.DateTaxFrom) : null}
                                    format="DD/MM/YYYY"
                                    onChange={(date) => handleDateChange(date, 'DateTaxFrom')}
                                >
                                    {({ inputProps, inputRef }) => (
                                        <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.DateTaxFrom} />
                                    )}
                                </DatePicker>
                            </LocalizationProvider>
                        </div>
                        <div className="input">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Date Tax To"
                                    value={formData.startdate || selectedCustomerData.DateTaxTo ? dayjs(selectedCustomerData.DateTaxTo) : null || book.DateTaxTo ? dayjs(book.DateTaxTo) : null}
                                    format="DD/MM/YYYY"
                                    onChange={(date) => handleDateChange(date, 'DateTaxTo')}
                                >
                                    {({ inputProps, inputRef }) => (
                                        <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.DateTaxTo} />
                                    )}
                                </DatePicker>
                            </LocalizationProvider>
                        </div>
                        <div className="input">
                            <div className="icone">
                                <FontAwesomeIcon icon={faNewspaper} size="xl" />
                            </div>
                            <TextField
                                margin="normal"
                                size="small"
                                id="STax"
                                label="State Tax"
                                name="STax"
                                autoComplete="new-password"
                                value={selectedCustomerData?.STax || book.STax}
                                onChange={handleChange}
                                variant="standard"
                            />
                        </div>
                        <div className="input">
                            <TextField
                                margin="normal"
                                size="small"
                                id="SBCess"
                                label="SBCess"
                                name="SBCess"
                                autoComplete="new-password"
                                value={selectedCustomerData?.SBCess || book.SBCess}
                                onChange={handleChange}
                                variant="standard"
                            />
                        </div>
                        <div className="input">
                            <TextField
                                margin="normal"
                                size="small"
                                id="KKCess"
                                label="KKCess"
                                name="KKCess"
                                autoComplete="new-password"
                                value={selectedCustomerData?.KKCess || book.KKCess}
                                onChange={handleChange}
                                variant="standard"
                            />
                        </div>
                        {/* </div>
                    <div className="input-field" style={{ padding: '0px 15px' }}> */}
                        <div className="input">
                            <div className="icone">
                                <FontAwesomeIcon icon={faNewspaper} size="xl" />
                            </div>
                            <TextField
                                margin="normal"
                                size="small"
                                id="STax-Dess"
                                label="STax-Des"
                                name="STax_Des"
                                autoComplete="new-password"
                                value={selectedCustomerData?.STax_Des || book.STax_Des}
                                onChange={handleChange}
                                variant="standard"
                            />
                        </div>
                        <div className="input">
                            <TextField
                                margin="normal"
                                size="small"
                                id="SBCess-Des"
                                label="SBCess-Des"
                                name="SBCess_Des"
                                autoComplete="new-password"
                                value={selectedCustomerData?.SBCess_Des || book.SBCess_Des}
                                onChange={handleChange}
                                variant="standard"
                            />
                        </div>
                        <div className="input">
                            <TextField
                                margin="normal"
                                size="small"
                                id="KKCess"
                                label="KKCess-Des"
                                name="KKCess_Des"
                                autoComplete="new-password"
                                value={selectedCustomerData?.KKCess_Des || book.KKCess_Des}
                                onChange={handleChange}
                                variant="standard"
                            />
                        </div>
                        <div className="input">
                            <div className="icone">
                                <QuizOutlinedIcon color="action" />
                            </div>
                            <Autocomplete
                                fullWidth
                                size="small"
                                id="free-solo-demo-taxtype"
                                freeSolo
                                sx={{ width: "20ch" }}
                                onChange={(event, value) => handleAutocompleteChange(event, value, "taxtype")}
                                value={TaxType.find((option) => option.Option)?.label || selectedCustomerData.taxtype || book.taxtype || ''}
                                options={TaxType.map((option) => ({
                                    label: option.Option,
                                }))}
                                getOptionLabel={(option) => option.label || selectedCustomerData.taxtype || book.taxtype || ''}
                                renderInput={(params) => {
                                    return (
                                        <TextField {...params} label="Tax Type" autoComplete="password" name="taxtype" inputRef={params.inputRef} />
                                    )
                                }
                                }
                            />
                        </div>

                        <div className="input" style={{ width: "70px" }}>
                            {isEditMode ? (
                                <Button variant="contained" disabled={!MainSetting_modify} onClick={handleEdit}>Edit</Button>
                            ) : (
                                <Button variant="contained" disabled={!MainSetting_new} onClick={handleAdd}>Add</Button>
                            )}
                        </div>
                    </div>
                </div>
                {error &&
                    <div className='alert-popup Error' >
                        <div className="popup-icon"> <ClearIcon style={{ color: '#fff' }} /> </div>
                        <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                        <p>{errorMessage}</p>
                    </div>
                }
                {warning &&
                    <div className='alert-popup Warning' >
                        <div className="popup-icon"> <ErrorOutlineIcon style={{ color: '#fff' }} /> </div>
                        <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                        <p>{warningMessage}</p>
                    </div>
                }
                {success &&
                    <div className='alert-popup Success' >
                        <div className="popup-icon"> <FileDownloadDoneIcon style={{ color: '#fff' }} /> </div>
                        <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                        <p>{successMessage}</p>
                    </div>
                }
                {info &&
                    <div className='alert-popup Info' >
                        <div className="popup-icon"> <BsInfo style={{ color: '#fff' }} /> </div>
                        <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                        <p>{infoMessage}</p>
                    </div>
                }
                <div className="TaxSetting-table-container">
                    <div className="SpeedDial" style={{ padding: '26px', }}>
                        <Box sx={{ position: "relative", mt: 3, height: 320 }}>
                            <StyledSpeedDial
                                ariaLabel="SpeedDial playground example"
                                icon={<SpeedDialIcon />}
                                direction="left"
                            >
                                {/* {actions.map((action) => (
                                    <SpeedDialAction
                                        key={action.name}
                                        icon={action.icon}
                                        tooltipTitle={action.name}
                                        onClick={(event) => handleClick(event, action.name, selectedCustomerId)}
                                    />
                                ))} */}


                                {MainSetting_read === 1 && (
                                    <SpeedDialAction
                                        key="list"
                                        icon={<ChecklistIcon />}
                                        tooltipTitle="List"
                                        onClick={(event) => handleClick(event, "List", selectedCustomerId)}
                                    />
                                )}
                                {MainSetting_modify === 1 && (
                                    <SpeedDialAction
                                        key="edit"
                                        icon={<ModeEditIcon />}
                                        tooltipTitle="Edit"
                                        onClick={(event) => handleClick(event, "Edit", selectedCustomerId)}
                                    />
                                )}
                                {MainSetting_delete === 1 && (
                                    <SpeedDialAction
                                        key="delete"
                                        icon={<DeleteIcon />}
                                        tooltipTitle="Delete"
                                        onClick={(event) => handleClick(event, "Delete", selectedCustomerId)}
                                    />
                                )}
                                {MainSetting_new === 1 && (
                                    <SpeedDialAction
                                        key="Add"
                                        icon={<BookmarkAddedIcon />}
                                        tooltipTitle="Add"
                                        onClick={(event) => handleClick(event, "Add", selectedCustomerId)}
                                    />
                                )}
                                <SpeedDialAction
                                    key="Cancel"
                                    icon={<CancelPresentationIcon />}
                                    tooltipTitle="Cancel"
                                    onClick={(event) => handleClick(event, "Cancel", selectedCustomerId)}
                                />

                            </StyledSpeedDial>
                        </Box>
                    </div>
                    <div className="table-TaxSetting">
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            onRowClick={handleRowClick}

                        />
                    </div>
                    <div className="input-field" style={{ marginTop: '-20px', marginLeft: '-25px', marginBottom: '25px' }}>
                        <div className="input" style={{ marginTop: '40px' }}>
                            <Button>
                                Refresh
                            </Button>
                        </div>
                        <div className="input" style={{ marginTop: '40px' }}>
                            <Button startIcon={<FontAwesomeIcon icon={faSave} size="lg" />} variant="contained">
                                Update
                            </Button>
                        </div>
                    </div>
                </div>
            </form>


        </div>
    )
}

export default TaxSetting