import React from "react";
import "./VehicaleType.css";
import Box from "@mui/material/Box";


import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { AiFillTags } from "react-icons/ai";
import { FaCar } from "react-icons/fa";

import ClearIcon from "@mui/icons-material/Clear";

// ICONS

import EmailIcon from "@mui/icons-material/Email";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import useVehicletype from "./usevehicletype";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";

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

export const VehicaleTypes = [
  {
    Option: "A/C",
    // optionvalue: "a/c",
  },
  {
    Option: "Non A/C",
    // optionvalue: "non_a/c",
  },
];
export const GroupTypes = [
  {
    Option: "Luxzury",
    // optionvalue: "a/c",
  },
  {
    Option: "Normal",
    // optionvalue: "non_a/c",
  },
];

const VehicaleType = () => {
  const {
    rows,
    handleKeyEnter,
    vechiclebook,
    handleChange,
    handleAdd,
    handleUpdate,
    handleRowClick,
    edit,
    actions,
    handleClick,
    hidePopup,

    setVechiclebook,
    successMessage,
    success,
    errorMessage,
    error,
  } = useVehicletype()

  return (
    <>
      <div className="VehicaleType-form Scroll-Style-hide">
        <form>
          <div className="detail-container-main-VehicaleType">
            <div className="container-VehicaleType">
              <div className="input-field">
                <div className="input" style={{ width: "215px" }}>
                  <div className="icone">
                    <AiFillTags />

                  </div>
                  {/* <TextField
                    size="small"
                    id="ID"
                    label="ID"
                    name="ID"
                  /> */}
                  <TextField
                    name="vehicleid"
                    label="vehicleid"
                    id="vehicleid"

                    value={
                      vechiclebook.vehicleid ||
                      ""
                    }
                    onChange={handleChange}
                    //   onKeyDown={handleKeyDown}
                    variant="standard"
                    autoFocus
                  />
                </div>
                <div className="input" style={{ width: "300px" }}>
                  <div className="icone">
                    <FaCar />

                  </div>
                  <TextField
                    name="vehiclename"

                    value={
                      vechiclebook.vehiclename ||
                      ""
                    }
                    onChange={handleChange}
                    onKeyDown={handleKeyEnter}
                    label="vehiclename"
                    id="standard-size-normal"
                    variant="standard"
                  />
                </div>
              </div>
              <div className="input-field">
                <div className="input" style={{ width: "215px" }}>
                  <div className="icone">
                    <EmailIcon color="action" />
                  </div>
                  <Autocomplete
                    fullWidth
                    id="free-solo-demo"
                    freeSolo
                    size="small"
                    value={vechiclebook?.Groups || ''}
                    options={GroupTypes?.map((option) => ({
                      label: option?.Option,
                    }))}
                    onChange={(event, value) => setVechiclebook((prevBook) => ({
                      ...prevBook,
                      "Groups": value?.label,
                    }))}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="Groups" inputRef={params.inputRef} />
                      );
                    }}
                  />
                </div>
                <div className="input radio">
                  <Autocomplete
                    fullWidth
                    id="free-solo-demo"
                    freeSolo
                    size="small"
                    value={vechiclebook?.vehicletype || ''}
                    options={VehicaleTypes?.map((option) => ({
                      label: option?.Option,
                    }))}
                    onChange={(event, value) => setVechiclebook((prevBook) => ({
                      ...prevBook,
                      "vehicletype": value?.label,
                    }))}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="vehicle Type" inputRef={params.inputRef} />
                      );
                    }}
                  />
                </div>
                <div className="input radio">

                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Active
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="Active"

                      value={
                        vechiclebook.Active ||
                        ""
                      }
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
              <div className="input-field">
                <div className="input radio">
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Luxury Vehicle
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="Luxzuryvehicle"


                      value={
                        vechiclebook.Luxzuryvehicle ||
                        ""
                      }
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="Yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="No"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div className="input" style={{ width: "215px" }}>
                  <div className="icone">
                    <ContactMailIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="Segment"
                    label="Segment"
                    name="Segment"
                    value={
                      vechiclebook.Segment ||
                      ""
                    }
                    onChange={handleChange}
                  />
                </div>
                <div className="input">
                  {
                    edit ?
                      <Button
                        variant="contained"
                        onClick={handleUpdate}
                      //  disabled={isFieldReadOnly("new")}
                      >
                        Edit</Button>
                      :

                      <Button
                        variant="contained"
                        onClick={handleAdd}
                      //  disabled={isFieldReadOnly("new")}
                      >
                        Add</Button>
                  }
                </div>
              </div>
            </div>
            <div className="VehicaleType-container-right">
              <div className="VehicaleType-update-main">
                <div className="VehicaleType-update">
                  <div
                    className="Scroll-Style"
                    style={{ overflow: "scroll", height: "220px" }}
                  >
                    <table>
                      <thead id="update-header">
                        <tr>
                          <th>ID</th>
                          <th>Vehicle_Name</th>
                          <th>Vehicle_Type</th>
                          <th>status</th>
                          <th>Group</th>
                        </tr>
                      </thead>
                      <tbody>

                        {rows?.length === 0 ? (
                          <tr>
                            <td colSpan={6}>No data available.</td>
                          </tr>
                        ) : (
                          rows?.map((row) => (
                            <tr
                              id="update-row"
                              key={row.id}
                              onClick={() => handleRowClick(row)}

                            >
                              <td>{row.vehicleid}</td>
                              <td>{row.vehiclename}</td>
                              <td>{row.vehicletype}</td>
                              <td>{row.Active}</td>
                              <td>{row.Groups}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
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
                action.icon ? (
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={(event) =>
                      handleClick(event, action.name)
                    }
                  />
                ) : null
              ))}
            </StyledSpeedDial>
          </Box>
          {error && (
            <div className="alert-popup Error">
              <div className="popup-icon">
                {" "}
                <ClearIcon style={{ color: "#fff" }} />{" "}
              </div>
              <span className="cancel-btn" onClick={hidePopup}>
                <ClearIcon color="action" style={{ fontSize: "14px" }} />{" "}
              </span>
              <p>{errorMessage}</p>
            </div>
          )}

          {success && (
            <div className="alert-popup Success">
              <div className="popup-icon">
                {" "}
                <FileDownloadDoneIcon style={{ color: "#fff" }} />{" "}
              </div>
              <span className="cancel-btn" onClick={hidePopup}>
                <ClearIcon color="action" style={{ fontSize: "14px" }} />{" "}
              </span>
              <p>{successMessage}</p>
            </div>
          )}

        </form>
      </div>
    </>
  );
};

export default VehicaleType;