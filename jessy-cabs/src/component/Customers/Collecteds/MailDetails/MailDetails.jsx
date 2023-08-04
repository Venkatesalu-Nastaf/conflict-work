import React from "react";
import "./MailDetails.css";
import { Table } from "@mui/joy";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";

// ICONS
import SmsIcon from '@mui/icons-material/Sms';
import BadgeIcon from '@mui/icons-material/Badge';
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ChecklistIcon from "@mui/icons-material/Checklist";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

// TABLE START
function createData(Sno, Name, mobile) {
  return { Sno, Name, mobile };
}

const rows = [
  createData('1', "John Doe", "9912277222"),
  createData('2', "Jane Smith", "9123317892"),
  createData('3', "Michael Johnson", "73421288938"),
  createData('4', "Sarah Davis", "62779165285"),
  createData('5', "Robert Wilson", "7729734456"),
  createData('6', "Robert Wilson", "7729734456"),
  createData('7', "Robert Wilson", "7729734456"),
  createData('8', "Robert Wilson", "7729734456"),
];


function createDataTemplate(Sno, Id, messages) {
  return { Sno, Id, messages };
}

const rowsTemplate = [
  createDataTemplate('1', '123', 'Hello, how are you?'),
  createDataTemplate('2', '124', 'Reminder: Your appointment is tomorrow.'),
  createDataTemplate('3', '125', 'Congratulations! You won a prize.'),
  createDataTemplate('4', '126', 'URGENT: Action required. Please respond.'),
  createDataTemplate('5', '127', 'Thank you for your purchase.'),
  createDataTemplate('6', '128', 'We have a special offer just for you.'),
  createDataTemplate('7', '129', 'Important notice: Account security update.'),
  createDataTemplate('8', '130', 'You have a new message.'),
];
// TABLE END

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


const MailDetails = () => {
  return (
    <div className="mailDetails-form-container">
      <div className="mailDetails-form">
        <form action="">
          <div className="detail-container-main-mailDetails">
            <div className="container-left-mailDetails">
              <div className="mailDetails-header">
                <div className="input-field">
                  <div className="input" style={{ width: "400px" }}>
                    <div className="icone">
                      <AttachEmailIcon color="action" />
                    </div>
                    <TextField
                      size="small"
                      id="enteremailaddress"
                      label="Enter Email Address"
                      name="enteremailaddress"
                      sx={{ m: 1, width: "200ch" }}
                      autoFocus
                    />
                  </div>
                </div>
                <div className="input-field ">
                  <div className="input" style={{ width: "400px" }}>
                    <div className="icone">
                      <SmsIcon color="action" />
                    </div>
                    <TextField
                      multiline
                      rows={4}
                      name="MailMessage"
                      label="Mail Message"
                      id="MailMessage"
                      sx={{ m: 1, width: "200ch" }}
                      autoFocus
                    />
                  </div>
                </div>
                <div className="input-field">
                  <div className="input" style={{ width: "180px" }}>
                    <Button variant="contained">Send</Button>
                  </div>
                  <div className="input" style={{ width: "20px" }}>
                    <Button variant="outlined">Clear</Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-right-mailDetails">
              <div className="textbox-mailDetails">
                <div className="textboxlist-mailDetails">
                  <div className="textboxlist-customer ">
                    <div className="input-field">
                      <div className="input">
                        <div className="icone">
                          <BadgeIcon color="action" />
                        </div>
                        <TextField
                          size="small"
                          id="name"
                          label="Name"
                          name="name"
                          // sx={{ m: 1, width: "200ch" }}
                          autoFocus
                        />
                      </div>
                      <div className="input">
                        <div className="icone">
                          <AttachEmailIcon color="action" />
                        </div>
                        <TextField
                          size="small"
                          id="enteremailaddress"
                          label="Enter Email Address"
                          name="enteremailaddress"
                          autoFocus
                        />
                      </div>
                      <div className="input" style={{ width: "80px" }}>
                        <Button variant="contained">Save</Button>
                      </div>
                    </div>
                    <div className="mailDetails-list-update">
                      <Table stickyHeader hoverRow borderAxis="y">
                        <thead>
                          <tr>
                            <th style={{ width: "5%" }}>Sno</th>
                            <th style={{ width: "20%" }}>Name</th>
                            <th style={{ width: "35%" }}>Mobile</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((row) => (
                            <tr key={row.name}>
                              <td>{row.Sno}</td>
                              <td>{row.Name}</td>
                              <td>{row.mobile}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="detail-container-main-mailDetails">
            <div className="container-left-mailDetails">
              <div className="mailDetails-header">
                <div className="input-field">
                </div>
                <div className="input-field ">
                  <div className="input" style={{ width: "400px" }}>
                    <div className="icone">
                      <SmsIcon color="action" />
                    </div>
                    <TextField
                      multiline
                      rows={4}
                      name="CreateMailTemplate"
                      label="Create Mail Template"
                      id="CreateMailTemplate"
                      sx={{ m: 1, width: "200ch" }}
                      autoFocus
                    />
                  </div>
                </div>
                <div className="input-field">
                  <div className="input" style={{ width: "230px" }}>
                    <Button variant="contained">Update List</Button>
                  </div>
                  <div className="input" style={{ width: "20px" }}>
                    <Button variant="outlined">Clear</Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-right-mailDetails">
              <div className="textbox-mailDetails">
                <div className="textboxlist-mailDetails">
                  <div className="textboxlist-customer ">
                    <div className="mailDetails-list-update">
                      <Table stickyHeader hoverRow borderAxis="y">
                        <thead>
                          <tr>
                            <th style={{ width: "5%" }}>Sno</th>
                            <th style={{ width: "20%" }}>Id</th>
                            <th style={{ width: "35%" }}>Messages</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rowsTemplate.map((row) => (
                            <tr key={row.name}>
                              <td>{row.Sno}</td>
                              <td>{row.Id}</td>
                              <td>{row.messages}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
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
        </form>
      </div>
    </div>
  )
}

export default MailDetails