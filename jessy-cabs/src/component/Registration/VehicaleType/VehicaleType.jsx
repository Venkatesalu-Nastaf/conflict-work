import React from "react";
import "./VehicaleType.css";
import Box from "@mui/material/Box";

import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { AiOutlineFileSearch } from "react-icons/ai";
import { AiFillAlert } from "react-icons/ai";
import { AiFillTags } from "react-icons/ai";
import { FaCar } from "react-icons/fa";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

// ICONS
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import useVehicletype from "./usevehicletype";

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
    const{
        rows,
        handleKeyEnter,
        vechiclebook,
        handleChange,
        handleAdd
    }=useVehicletype()
    console.log(rows,"datarows")
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
                    vechiclebook.vehicleid||
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
                  autoComplete="new-password"
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
                  {/* <TextField
                    size="small"
                    id="groups"
                    label="Groups"
                    name="Groups"
                    autoComplete="new-password"
                    value={
                        vechiclebook.Groups ||
                        ""
                      }
                      onChange={handleChange}
                  /> */}
                  <Autocomplete
                      fullWidth
                      id="free-solo-demo"
                      freeSolo
                      size="small"
                    //   value={customer || selectedCustomerDatas.customer || (tripData.length > 0 ? tripData[0].customer : '') || ''}
                    //   options={luxuryoptions}
                      options={GroupTypes.map((option) => ({
                        label: option.Option,
                      }))}
                      onChange={handleChange}
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
                    // id="combo-box-demo"
                    options={VehicaleTypes.map((option) => ({
                      label: option.Option,
                    }))}
                    // sx={{ width: 300 }}
                    onChange={handleChange}
                    
                    renderInput={(params) => (
                      <TextField {...params} label="Vehicale Type" />
                    )}
                  />
                </div>
                <div className="input radio">
                  {/* <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Active
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="Active"
                      autoComplete="new-password"
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
                  </FormControl> */}

<FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                  Active
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="Active"
                    autoComplete="new-password"
                    value={
                      vechiclebook.Active||
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
                      autoComplete="new-password"

                      value={
                        vechiclebook.Luxzuryvehicle||
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
                    id="Segement"
                    label="Segement"
                    name="Segement"
                    value={
                        vechiclebook.Segment||
                        ""
                      }
                      onChange={handleChange}
                  />
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
                            // onClick={() => handleRowClick(row)}
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

          <Button
              variant="contained"
               onClick={handleAdd}
              //  disabled={isFieldReadOnly("new")}
               >
                Add New</Button>

          {/* <Box sx={{ position: "relative", mt: 3, height: 320 }}>
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
                  onClick={(event) =>
                    handleClick(event, action.name, selectedCustomerId)
                  }
                />
              ))}
            </StyledSpeedDial>
          </Box> */}
          {/* <div className="VehicaleType-search-container">
            <div className="input-field" style={{ justifyContent: "center" }}>
              <div className="input" style={{ width: "230px" }}>
                <div className="icone">
                  <AiOutlineFileSearch
                    color="action"
                    style={{ fontSize: "27px" }}
                  />
                </div>
                <TextField
                  size="small"
                  id="id"
                  label="Search"
                  name="searchText"
                />
              </div>
              <div className="input" style={{ width: "140px" }}>
                <Button variant="contained">Search</Button>
              </div>
            </div>
          </div> */}
        </form>
      </div>
    </>
  );
};

export default VehicaleType;