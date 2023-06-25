import React from 'react'
import { TaxType } from './TaxSettingData.js'
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import BadgeIcon from "@mui/icons-material/Badge";
import { TextField } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import Autocomplete from "@mui/material/Autocomplete";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";

// FontAwesomeIcon Link
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons"
import { faNewspaper } from "@fortawesome/free-solid-svg-icons"
// date
const today = dayjs();
const tomorrow = dayjs().add(1, "day");

// Table Start
const columns = [
    { field: "id", headerName: "Sno", width: 70 },
    { field: "From_Date", headerName: "From_Date", width: 130 },
    { field: "To_Date", headerName: "To_Date", width: 130 },
    { field: "STax", headerName: "STax", width: 160 },
    { field: "SBCess", headerName: "SBCess", width: 130 },
    { field: "KK_Cess", headerName: "KK_Cess", width: 130 },
    { field: "Rid", headerName: "Rid", width: 130 },
    { field: "StaxDes", headerName: "StaxDes", width: 130 },
    { field: "SBCessDes", headerName: "SBCessDes", width: 130 },
    { field: "KKCessDes", headerName: "KKCessDes", width: 130 },
    { field: "TAX", headerName: "TAX", width: 130 },
];

const rows = [
    {
        id: 1,
        From_Date: 1,
        To_Date: "Password 1",
        STax: "John Doe",
        SBCess: "Morning",
        KK_Cess: "9:00 AM",
        Rid: "9:00 AM",
        StaxDes: "XYZ Car",
        SBCessDes: "XYZ Car",
        KKCessDes: "XYZ Car",
        TAX: "XYZ Car",
    },
    {
        id: 2,
        From_Date: 2,
        To_Date: "Password 2",
        STax: "Jane Smith",
        SBCess: "Evening",
        KK_Cess: "2:00 PM",
        Rid: "XYZ Car",
        StaxDes: "XYZ Car",
        SBCessDes: "XYZ Car",
        KKCessDes: "XYZ Car",
        TAX: "XYZ Car",
    },

    // Add more rows as needed
];
// Table End
const TaxSetting = () => {
    return (
        <div className="FuelRate-form">
            <form action="">
                <div className="FuelRate-header">
                    <div className="input-field" style={{ padding: '0px 15px' }}>
                        <div className="input">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoItem label="Date Tax From">
                                    <DatePicker
                                        defaultValue={today}
                                        minDate={tomorrow}
                                        views={["year", "month", "day"]}
                                    />
                                </DemoItem>
                            </LocalizationProvider>
                        </div>
                        <div className="input">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoItem label="Date Tax From">
                                    <DatePicker
                                        defaultValue={today}
                                        minDate={tomorrow}
                                        views={["year", "month", "day"]}
                                    />
                                </DemoItem>
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
                                label="STax"
                                name="STax"
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
                                variant="standard"
                            />
                        </div>
                    </div>
                    <div className="input-field" style={{ padding: '0px 15px' }}>
                        <div className="input">
                            <div className="icone">
                                <FontAwesomeIcon icon={faNewspaper} size="xl" />
                            </div>
                            <TextField
                                margin="normal"
                                size="small"
                                id="STax-Dess"
                                label="STax-Des"
                                name="STax-Des"
                                variant="standard"
                            />
                        </div>
                        <div className="input">
                            <TextField
                                margin="normal"
                                size="small"
                                id="SBCess-Des"
                                label="SBCess-Des"
                                name="SBCess-Des"
                                variant="standard"
                            />
                        </div>
                        <div className="input">
                            <TextField
                                margin="normal"
                                size="small"
                                id="KKCess"
                                label="KKCess-Des"
                                name="KKCess-Des"
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
                                id="free-solo-demo"
                                freeSolo
                                value={TaxType.map((option) => option.optionvalue)}
                                options={TaxType.map((option) => ({
                                    label: option.Option,
                                }))}
                                getOptionLabel={(option) => option.label || ""}
                                renderInput={(params) => (
                                    <TextField {...params} label="Tax Type" />
                                )}
                            />
                        </div>
                        <div className="input" style={{ width: "70px" }}>
                            <IconButton aria-label="delete">
                                <FontAwesomeIcon icon={faCirclePlus} style={{ color: "#1b1c1d", }} />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </form>
            <div className="FuelRate-table-container">
                <div className="table-FuelRate">
                    <DataGrid
                        rows={rows}
                        columns={columns}
                    />
                </div>
            </div>
        </div>
    )
}

export default TaxSetting