import React from 'react'
import "./PettyCash.css";

import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Button from "@mui/material/Button";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import Box from "@mui/material/Box";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import RateReviewIcon from '@mui/icons-material/RateReview';
import BadgeIcon from "@mui/icons-material/Badge";
import { TextField } from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DataGrid } from "@mui/x-data-grid";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';



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
    { field: "VoucherNo", headerName: "VoucherNo", width: 130 },
    { field: "PaymentDate", headerName: "Payment Date", width: 130 },
    { field: "BillName", headerName: "Bill Name", width: 130 },
    { field: "PaymentCategory", headerName: "Payment Category", width: 150 },
    { field: "Amount", headerName: "Amount", width: 130 },
];

const rows = [
    {
        id: 1,
        VoucherNo: 1,
        PaymentDate: "2023-06-07",
        BillName: "2023-06-07",
        PaymentCategory: "9:00 AM",
        Amount: 600,

    },
    {
        id: 2,
        VoucherNo: 2,
        PaymentDate: "2023-06-07",
        BillName: "2023-06-08",
        PaymentCategory: "7:00 PM",
        Amount: 500,

    },
    // Add more rows as needed
];

// date
const today = dayjs();
const tomorrow = dayjs().add(1, "day");

const PettyCash = () => {
    return (
        <div className="PettyCash-form">
            <form action="">
                <div className="PettyCash-page-header">
                    <div className="input-field">
                        <div className="input">
                            <div className="icone">
                                <BadgeIcon color="action" />
                            </div>
                            <TextField
                                size="small"
                                id="voucher"
                                label="Voucher No"
                                name="voucher"
                                autoFocus
                            />
                        </div>

                        <div className="input">
                            <div className="icone">
                                <RateReviewIcon color="action" />
                            </div>
                            <TextField
                                size="small"
                                id="id"
                                label="Bill Name"
                                name="ratename"
                                autoFocus
                            />
                        </div>
                        <div className="input">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoItem label="Date">
                                    <DatePicker
                                        defaultValue={today}
                                        minDate={tomorrow}
                                        views={["year", "month", "day"]}
                                    />
                                </DemoItem>
                            </LocalizationProvider>
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
                                label="Payment Category"
                                name="PaymentCategory"
                                autoFocus
                            />
                        </div>
                        <div className="input">
                            <div className="icone">
                                <BadgeIcon color="action" />
                            </div>
                            <TextField
                                size="small"
                                id="amount"
                                label="Amount"
                                name="amount"
                                autoFocus
                            />
                        </div>
                        <div className="input" style={{ width: "100px" }}>
                            <Button variant="contained">Add</Button>
                        </div>
                    </div>
                </div>
                <div className="detail-container-main">
                    <div className="container-left">
                        <div className="copy-title-btn-PettyCash">

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
                <div className="table-bookingCopy-PettyCash">
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

export default PettyCash