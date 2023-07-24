import React from 'react'
import "./RateType.css";
import { Stations } from "./RateTypeData.js";
import Autocomplete from "@mui/material/Autocomplete";

import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import Box from "@mui/material/Box";
import WarehouseIcon from '@mui/icons-material/Warehouse';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import RateReviewIcon from '@mui/icons-material/RateReview';
import BadgeIcon from "@mui/icons-material/Badge";
import {
    TextField,
    FormControlLabel,
    FormControl,
    FormLabel,
    Radio,
    RadioGroup,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";


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
const actions = [
    { icon: <ChecklistIcon />, name: "List" },
    { icon: <CancelPresentationIcon />, name: "Cancel" },
    { icon: <DeleteIcon />, name: "Delete" },
    { icon: <ModeEditIcon />, name: "Edit" },
    { icon: <BookmarkAddedIcon />, name: "Add" },
];
// TABLE

const columns = [
    { field: "id", headerName: "Sno", width: 70 },
    { field: "RateType", headerName: "Rate Type", width: 130 },
    { field: "CustomerType", headerName: "Customer Type", width: 130 },
    { field: "Active", headerName: "Active", width: 130 },
    { field: "StartTime", headerName: "Start Time", width: 130 },
    { field: "CloseTime", headerName: "Close Time", width: 130 },
];

const rows = [
    {
        id: 1,
        RateType: 1,
        CustomerType: 12,
        Active: "2023-06-07",
        StartTime: "9:00 AM",
        CloseTime: "7:00 PM",

    },
    {
        id: 2,
        RateType: 2,
        CustomerType: 13,
        Active: "2023-06-08",
        StartTime: "7:00 PM",
        CloseTime: "7:00 PM",

    },
    // Add more rows as needed
];

const RateType = () => {

    return (
        <div className="ratetype-form">
            <form action="">
                <div className="detail-container-main">
                    <div className="container-left">
                        <div className="copy-title-btn">
                            <div className="input-field">
                                <div className="input">
                                    <div className="icone">
                                        <BadgeIcon color="action" />
                                    </div>
                                    <TextField
                                        size="small"
                                        id="id"
                                        label="ID"
                                        name="driverid"
                                        autoFocus
                                    />
                                </div>
                                <div className="input" style={{ width: "300px" }}>
                                    <div className="icone">
                                        <WarehouseIcon color="action" />
                                    </div>
                                    <Autocomplete
                                        fullWidth
                                        id="free-solo-demo"
                                        freeSolo
                                        size="small"
                                        value={Stations.map((option) => option.optionvalue)}
                                        options={Stations.map((option) => ({
                                            label: option.Option,
                                        }))}
                                        getOptionLabel={(option) => option.label || ""}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Stations" />
                                        )}
                                    />
                                </div>
                                <div className="input">
                                    <div className="icone">
                                        <RateReviewIcon color="action" />
                                    </div>
                                    <TextField
                                        size="small"
                                        id="id"
                                        label="Rate Name"
                                        name="ratename"
                                        autoFocus
                                    />
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input" style={{ width: "300px" }}>
                                    <div className="icone">
                                        <FactCheckIcon color="action" />
                                    </div>
                                    <TextField
                                        size="small"
                                        id="id"
                                        label="Validity"
                                        name="validity"
                                        autoFocus
                                    />
                                </div>
                                <div className="input radio" style={{ width: "120px" }}>
                                    <FormControl>
                                        <FormLabel id="demo-row-radio-buttons-group-label">
                                            Active
                                        </FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="active"
                                        >
                                            <FormControlLabel
                                                value="yes"
                                                control={<Radio />}
                                                label="Yes"
                                            />
                                            <FormControlLabel
                                                value="no"
                                                control={<Radio />}
                                                label="No"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div className="input times">
                                    <label>Start Time</label>
                                    <input
                                        type="time"
                                        name='starttime'
                                    />
                                </div>
                                <div className="input times">
                                    <label>Close Time</label>
                                    <input
                                        type="time"
                                        name='starttime'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Box sx={{ position: "relative", mt: 3, height: 320 }}>
                    <StyledSpeedDial
                        ariaLabel="SpeedDial playground example"
                        icon={<SpeedDialIcon />}
                        direction="left"
                    >
                        {actions.map((action) => (
                            <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                            />
                        ))}
                    </StyledSpeedDial>
                </Box>
                <div className="table-bookingCopy">
                    <div style={{ height: 400, width: "100%" }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            checkboxSelection
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default RateType