import React, { useEffect, useState } from "react";
import "./MailDetails.css";
// import { Table } from "@mui/joy";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
// ICONS
import SmsIcon from '@mui/icons-material/Sms';
import SendIcon from '@mui/icons-material/Send';
// import BookIcon from '@mui/icons-material/Book';
import DeleteIcon from "@mui/icons-material/Delete";
import { AiOutlineFileSearch } from "react-icons/ai";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ChecklistIcon from "@mui/icons-material/Checklist";
import SpeedDialAction from "@mui/material/SpeedDialAction";
// import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

import xlsx from "../../../../assets/files/SampleXLSXFile.xlsx";
import { APIURL } from "../../../url";
import axios from 'axios'
import * as XLSX from 'xlsx';
import ClearIcon from '@mui/icons-material/Clear';

import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';




// const rowsTemplate = [
// createDataTemplate('1', '123', 'Hello, how are you?'),
// createDataTemplate('2', '124', 'Reminder: Your appointment is tomorrow.'),
// createDataTemplate('3', '125', 'Congratulations! You won a prize.'),
// createDataTemplate('4', '126', 'URGENT: Action required. Please respond.'),
// createDataTemplate('5', '127', 'Thank you for your purchase.'),
// ];
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
  const apiurl = APIURL
  const [templatedata, setTemplateData] = useState([])
  const [selecteddata, setSelectedData] = useState([])
  const [file, setFile] = useState(null);
  const [triggerdata, setTriggerData] = useState(false)
  const [data, setData] = useState({});
  const [templateimage, setTemplateimage] = useState([])
  const [error, setError] = useState(false);
  const [successMessage, setSuccessMessage] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const columns = [
    { field: "idno", headerName: "Sno", width: 70 },
    { field: "Templateid", headerName: "Templateid", width: 130 },
    { field: "TemplateName", headerName: "Template Name", width: 130 },
    { field: "TemplateSubject", headerName: "Template Subject", width: 130 },
    {
      field: 'TemplateMessageData',
      headerName: 'Template Message',
      width: 300,
      renderCell: (params) => {
        return (
          <span>{convertToPlain(params.value)}</span>
        );
      }
    },
    {
      field: 'Edit',
      headerName: 'Edit',
      width: 130,
      renderCell: (params) => (
        <Button
          onClick={() => handleButtonEditClick(params)}
          aria-label="edit"
          variant="contained"
          color="primary"
        >
          Edit
        </Button>
      ),
    },
    {
      field: 'Delete',
      headerName: 'Delete',
      width: 130,
      renderCell: (params) => (
        <Button
          onClick={() => handleButtondeleteClick(params)}
          aria-label="delete"
          variant="contained"
          color="primary"
        >
          Delete
        </Button>
      ),
    },

  ]

  const hidePopup = () => {
    setSuccess(false);
    setError(false);
  };

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(`${apiurl}/templatedataall`)
        const data = response.data
        const rowuniqueid = data.map((row, index) => ({
          ...row,
          idno: index + 1


        }))
        setTemplateData(rowuniqueid)
        setTriggerData(false)
      }
      catch (err) {
        console.log(err)
      }
    }
    fetchdata()
  }, [apiurl, triggerdata])

  function convertToPlain(html) {

    if (html) {
      var tempDivElement = document.createElement("div");
      tempDivElement.innerHTML = html;
      return tempDivElement.textContent || tempDivElement.innerText || "";
    }
    return ""
  }


  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0].name;
    const file = event.target.files[0];
    setFile(selectedFile)
    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      let indexToRemove = 0;
      jsonData.splice(indexToRemove, 1);
      let objects = jsonData.map(sublist => {
        return {
          Email: sublist[0],
          CustomerName: sublist[1]
        };
      });
      setData(objects);

    };

    reader.readAsBinaryString(file);
  };

  const handleButtondeleteClick = async (params) => {
    const { Templateid } = params.row;
    try {
      setTemplateData((prevData) => prevData.filter(template => template.Templateid !== Templateid));
      await axios.delete(`${apiurl}/templatedatadelete/${Templateid}`)
      setSelectedData([])

      // setTemplateData((prevData) => prevData.filter(template => template.Templateid !== Templateid));
      await axios.delete(`${apiurl}/templatedeleteimageedata/${Templateid}`)
    }
    catch (err) {
      console.log(err)
    }

  }

  // const handleButtondeleteClick = async(params) => {
  //   console.log(params, 'params');
  //   const { Templateid } = params.row;
  //   try{
  //     const response=await axios.delete(`${apiurl}/templatedatadelete/${Templateid}`)
  //     await axios.delete(`${apiurl}/templatedeleteimageedata/${Templateid}`)
  //     console.log(response)
  //     setTriggerData(true)

  //   }
  //   catch(err){
  //     console.log(err)
  //   }

  // }
  // const handletableClick=async(params)=>{
  //   console.log(params,"data")
  //   setSelectedData(params.row)

  // }


  const handleButtonEditClick = async (params) => {
    // console.log(params, 'params');
    // console.log(params.row,params.row.Templateid)
    const Templatecheck = "true"
    const mailerPageUrl = `/home/info/mailer/TemplateCreation?Templatecheck=${Templatecheck}&Templateid=${params.row.Templateid}&TemplateName=${params.row.TemplateName}&TemplateSubject=${params.row.TemplateSubject}&TemplateMessageData=${params.row.TemplateMessageData}&TemplateimageData=${templateimage}`

    window.location.href = mailerPageUrl
  }

  const handleIconClick = () => {
    document.getElementById('fileInput').click();
  };

  // const [file, setFile] = useState(null);

  // const handleFileChange = (e) => {

  //   const selectedFile = e.target.files[0].name;
  //   console.log(selectedFile);
  //   setFile(selectedFile);
  // };




  const handleTemplateCreation = () => {
    navigate("/home/info/mailer/TemplateSelection");
  }

  const Attachedimagedata = async (templateid) => {
    // console.log(templateid)
    try {
      const response = await axios.get(`${apiurl}/gettemplateattachimage/${templateid}`)

      const Temp = response.data

      if (Temp.length > 0) {
        setTemplateimage(Temp)
      }
      //  setTemplateData([])

    }
    catch (err) {
      console.log(err)
    }
  }

  const handletableClick = async (params) => {

    setSelectedData(params.row)
    Attachedimagedata(params.row.Templateid)
    // setTriggerData(true)


  }

  const handlesendbulkemail = async () => {
    // const datatemplate=selecteddata


    if (selecteddata.length === 0) {
      setError(true)
      setErrorMessage("Select the Data")
      return
    }
    if (file === null) {
      setError(true)
      setErrorMessage("Select the Excel File")
      return
    }
    try {

      const datatosend = {
        templatemessage: selecteddata,
        emaildata: data,
        templateimagedata: templateimage
      }
      const response = await axios.post(`${apiurl}/send-emailtemplate`, datatosend)
      console.log(response)
      setData({})
      setFile(null)
      setSelectedData([])
      setSuccess(true)
      setSuccessMessage("Mail Sent Successfully")


      // const mailMessageTextField = document.getElementById('MailMessage');

      //   mailMessageTextField.value = '';




    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="mailDetails-form-container">
      <div className="mailDetails-form Scroll-Style-hide">
        <form action="">
          <div className="detail-container-main-mailDetails">
            <div className="container-left-mailDetails">
              <div className="mailDetails-header">
                <div className="input-field" style={{ justifyContent: "center" }}>
                  <div className="input" style={{ width: "180px" }}>
                    <a href={xlsx} download><Button variant="outlined">Excel Format</Button></a>
                  </div>
                  <div className="input" style={{ width: "100px" }} onClick={handleIconClick}>
                    <Button variant="contained">Upload</Button>
                  </div>
                  <input
                    type="file"
                    id="fileInput"
                    onChange={handleFileUpload}
                    // onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                </div>
                <div style={{ textAlign: "center", marginTop: '10px', color: 'green', fontWeight: '600' }}>{file}</div>
                <div className="input-field ">
                  <div className=" input-mailer"  style={{ width: "400px" }}>
                    <div className="icone">
                      <SmsIcon color="action" />
                    </div>
                    <TextField
                      multiline
                      rows={4}
                      name="MailMessage"
                      label="Mail Message"
                      id="MailMessage"
                      value={convertToPlain(selecteddata.TemplateMessageData) || ''}
                      className="mail-textarea1"
                      sx={{ m: 1, width: "200ch" }}
                    />
                  </div>
                </div>
                <div className="input-field mail-textarea1-btn">
                  <div className="input" >
                    <Button variant="contained" onClick={handlesendbulkemail} endIcon={<SendIcon />}>
                      Send
                    </Button>
                  </div>
                  <div className="input" style={{ width: "20px" }}>
                    <Button variant="outlined">Clear</Button>
                  </div>
                </div>
                <div className='alert-popup-main'>
                  {success &&
                    <div className='alert-popup Success' >
                      <div className="popup-icon"> <FileDownloadDoneIcon style={{ color: '#fff' }} /> </div>
                      <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                      <p>{successMessage}</p>
                    </div>
                  }
                  {error &&
                    <div className='alert-popup Error' >
                      <div className="popup-icon"> <ClearIcon style={{ color: '#fff' }} /> </div>
                      <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                      <p>{errorMessage}</p>
                    </div>
                  }
                </div>
              </div>
            </div>
            <div className="container-right-mailDetails">
              <div className="textbox textbox-mailer">

                <div className="textboxlist-mailer">
                  <div className="textboxlist-customer ">
                    <div className="input-field" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
                      <div>
                        <div className="input template-input" style={{ width: "300px" }}>
                          <div className="icone">
                            <AiOutlineFileSearch style={{ fontSize: '23px' }} />
                          </div>
                          <TextField
                            size="small"
                            id="templatename"
                            label="Template Name"
                            name="templatename"
                            sx={{ m: 1, width: "200ch" }}
                          />
                        </div>
                      </div>
                      <div className="template-search-btn" style={{ display: 'flex' }}>
                        <div className="input" style={{ width: "100px" }}>
                          <Button variant="contained">Search</Button>
                        </div>
                        <div className="input" onClick={handleTemplateCreation}>
                          <Button variant="contained">Create Template</Button>
                        </div>
                      </div>
                    </div>
                    {/* <div className="mailDetails-list-update">
                      <Table stickyHeader hoverRow borderAxis="y">
                        <thead>
                          <tr>
                            <th style={{ width: "5%" }}>Sno</th>
                            <th style={{ width: "20%" }}>Templateid</th>
                            <th style={{ width: "20%" }}>UsedFor</th>
                          </tr>
                        </thead>
                        <tbody>
                          {templatedata?.map((row) => (
                            <tr key={row.id}>
                              <td>{row.Sno}</td>
                              <td>{row.templateid}</td>
                              <td>{row.TemplateName}</td>
                              <td>{row.TemplateSubject}</td>
                              <td>{row.TemplateMessageData}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div> */}

                    <div className="table-bookingCopy-TransferDataEntry" style={{ marginTop: '10px' }}>
                      <div style={{ height: 400, width: "100%" }}>
                        <DataGrid
                          rows={templatedata}
                          columns={columns}
                          onRowClick={handletableClick}


                        />
                      </div>
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