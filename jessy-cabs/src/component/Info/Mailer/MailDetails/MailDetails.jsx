import React, { useEffect, useState, useRef,useContext,useCallback } from "react";
import "./MailDetails.css";
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
import DeleteIcon from "@mui/icons-material/Delete";
import { AiOutlineFileSearch } from "react-icons/ai";
import { CircularProgress } from '@mui/material';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ChecklistIcon from "@mui/icons-material/Checklist";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { PermissionContext } from '../../../context/permissionContext';
import xlsx from "../../../../assets/files/SampleXLSXFile.xlsx";
import { APIURL } from "../../../url";
import axios from 'axios'
import * as XLSX from 'xlsx';
import ClearIcon from '@mui/icons-material/Clear';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';

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




const MailDetails = () => {
  const apiurl = APIURL
  const [templatedata, setTemplateData] = useState([])
  const [selecteddata, setSelectedData] = useState([])
  const [file, setFile] = useState(null);
  const [data, setData] = useState({});
  const [templateimage, setTemplateimage] = useState([])
  const [error, setError] = useState(false);
  const [successMessage, setSuccessMessage] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [success, setSuccess] = useState(false);
  // const [templateMessageData, setTemplateMessageData] = useState(null);

  const [loading, setLoading] = useState(false)
  const [searchname, setSearchname] = useState('')
  const navigate = useNavigate();
  const [organistaionsendmail, setOrganisationSendEmail] = useState([])
  const [datatrigger, setDataTrigger] = useState(false)
  const fileInputRef = useRef(null);
  const { permissions } = useContext(PermissionContext)
  const Mailer_create=permissions[18]?.new ;
  const Mailer_modify=permissions[18]?.modify ;
  const Mailer_delete=permissions[18]?.delete ;
  const Mailer_read = permissions[18]?.read ;

  const columns = [
    { field: "idno", headerName: "Sno", width: 50 },
    { field: "Templateid", headerName: "Templateid", width: 80 },
    { field: "TemplateName", headerName: "Template Name", width: 120 },
    { field: "TemplateInfo", headerName: "Template Info", width: 120 },  
    { field: "TemplateSubject", headerName: "Template Subject", width: 170 },
    {
      field: 'TemplateMessageData',
      headerName: 'Template Message',
      width: 350,
      renderCell: (params) => (
        <span>{convertToPlain(params.value)}</span>
      ),
    },
    {
      field: 'Edit',
      headerName: 'Edit',
      width: 90,
      renderCell: (params) => (
        <Button
          disabled={!Mailer_modify}
          onClick={() => handleButtonEditClick(params)}
          aria-label="edit"
          sx={{ color: '#1976d2' }}
        >
          <ModeEditIcon />
        </Button>
      ),
    },
    {
      field: 'Delete',
      headerName: 'Delete',
      width: 90,
      renderCell: (params) => (
        params.row.TemplateInfo ? null : (
          <Button
            disabled={!Mailer_delete}
            onClick={() => handleButtondeleteClick(params)}
            aria-label="delete"
            sx={{ color: 'red' }}
          >
            <DeleteIcon />
          </Button>
        )
      ),
    },
  ];

  // useEffect(()=>{

  // })
  
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


//   const handleList = useCallback(async () => {
//     try {
//         const response = await axios.get(`${apiurl}/templatedataall`)
//         const data = response.data 
//         const rowuniqueid = data.map((row, index) => ({
//           ...row,
//           idno: index + 1
//         }))

//         setTemplateData(rowuniqueid)
//     } catch (err) {
//         console.log(err);
//     }
// }, [apiurl]); // Add any dependencies needed inside this array

const handleList = useCallback(async () => {
  setLoading(true);
  setError(false); // Reset error state before making a new request
  try {
      const response = await axios.get(`${apiurl}/templatedataall`);
      const data = response.data;
      
      const rowuniqueid = data.map((row, index) => ({
          ...row,
          idno: index + 1,
      }));
      
      setTemplateData(rowuniqueid);
      
      if (data.length > 0) {
          setLoading(false);
      } else {
          setLoading(false);
      }
  } catch (err) {
      if (err.message === 'Network Error') {
          setErrorMessage("Check network connection.");
      } else {
          setErrorMessage("Failed to Show: " + (err.response?.data?.message || err.message));
      }
      setError(true);
  } finally {
      setLoading(false);
  }
}, [apiurl]);

useEffect(() => {
    handleList();
}, [handleList]);


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
    setDataTrigger(!datatrigger)
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

      await axios.delete(`${apiurl}/templatedeleteimageedata/${Templateid}`)
      setSuccess(true)
      setSuccessMessage("Deleted Successfully")
    }
    catch (err) {
      setError(true)
      setErrorMessage("Failed to Delete Data")
    }

  }


  const handleButtonEditClick = async (params) => {
    const Templatecheck = "true"
    const mailerPageUrl = `/home/info/mailer/TemplateCreation?Templatecheck=${Templatecheck}&Templateid=${params.row.Templateid}&TemplateName=${params.row.TemplateName}&TemplateSubject=${params.row.TemplateSubject}&TemplateInfo=${params.row.TemplateInfo}&TemplateMessageData=${params.row.TemplateMessageData}&TemplateimageData=${templateimage}`

    window.location.href = mailerPageUrl
  }

  const handleIconClick = () => {

    fileInputRef.current.click();
  };

  const handleTemplateCreation = () => {
    navigate("/home/info/mailer/TemplateSelection");
  }

  const handleClick =(namedata)=>{
  
    if(namedata === "list"){

      handleList()
      setSearchname("")
    }
    else{
      handleTemplateCreation()
    }
  
  }

  const Attachedimagedata = async (templateid) => {
    try {
      const response = await axios.get(`${apiurl}/gettemplateattachimage/${templateid}`)
      const Temp = response.data
      if (Temp.length > 0) {
        setTemplateimage(Temp)
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  const handletableClick = async (params) => {

    setSelectedData(params.row)
    Attachedimagedata(params.row.Templateid)
    setDataTrigger(!datatrigger)
  }

  const handlesendbulkemail = async () => {
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
    if (data.length === 0) {
      setError(true)
      setErrorMessage("Enter the Mail In  Excel")
      return
    }
    try {

      const datatosend = {
        templatemessage: selecteddata,
        emaildata: data,
        templateimagedata: templateimage,
        Sendmailauth: organistaionsendmail.Sender_Mail,
        Mailauthpass: organistaionsendmail.EmailApp_Password

      }


      const response = await axios.post(`${apiurl}/send-emailtemplate`, datatosend)
      console.log(response)
      setData({})
      setFile(null)
      fileInputRef.current.value = '';
      setSelectedData([])
      setSuccess(true)
      setSuccessMessage("Mail Sent Successfully")


    }
    catch (err) {
      console.log(err)
      setError(true)
      setErrorMessage("Mail Not send")
    }
  }

  const handleCleardata = () => {
    setData({})
    setFile(null)
    setSelectedData([])
    fileInputRef.current.value = '';

  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiurl}/organizationdata`);
        if (response.status === 200) {

          const userDataArray = await response.json();
          if (userDataArray.length > 0) {
            setOrganisationSendEmail(userDataArray[0])
            setDataTrigger(!datatrigger)
          } else {
            // setErrorMessage('User data not found.');
            // setError(true);
          }
        }
      }
      catch {
      }
    };
    fetchData();
  }, [apiurl, selecteddata, file, datatrigger]);
  const handleShowdata = async () => {
    try {
      const response = await fetch(
        `${apiurl}/tabletemplateseatch?searchText=${searchname}`
      );
      const data = await response.json();
      if (data.length > 0) {
        const rowsWithUniqueId = data.map((row, index) => ({
          ...row,
          id: index + 1,
        }));
        setTemplateData(rowsWithUniqueId)
        setSuccess(true);
        setSuccessMessage("successfully listed");
      } else {
        setTemplateData([]);
        setError(true);
        setErrorMessage("no data found");
      }
    } 
    // catch {
    //   setError(true);
    //   setErrorMessage("Failed to Retrive Data");
    // }
    catch (error) {
      // console.error("Error occurredddddd:", error);
   
      // Check if there's no response, indicating a network error
      if (error.message ) {
          setError(true);
          setErrorMessage("Check your Network Connection");
          // console.log('Network error');
      } else if (error.response) {
          setError(true);
          // Handle other Axios errors (like 4xx or 5xx responses)
          // setErrorMessage("Failed to Search: " + (error.response.data.message || error.message));
      } else {
          // Fallback for other errors
          setError(true);
          setErrorMessage("An unexpected error occurred: " + error.message);
      }
  }
  };

  return (
    <div className="mailDetails-form-container">
      <div className="mailDetails-form main-content-form Scroll-Style-hide">
        <form action="">
          <div className="detail-container-main-mailDetails">
            <div className="container-left-mailDetails">
              <div className="mailDetails-header">
                <div className="input-field mail-details-input-field">
                  <div className="">
                    <a href={xlsx} download><Button variant="outlined">Excel Format</Button></a>
                  </div>
                  <div className="" onClick={handleIconClick}>
                    <Button variant="contained">Upload</Button>
                  </div>
                  <input
                    type="file"
                    id="fileInput_upload"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                </div>
                <div className="mail-message-division">{file}</div>
                <div className="input-field input-feild-mailer">
                  <div className=" input-mailer">
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
                <div className="input-field  input-feild-mailer mail-textarea1-btn">
                  <div className="input" >
                    <Button variant="contained"  disabled={!Mailer_create} onClick={handlesendbulkemail} endIcon={<SendIcon />}>
                      Send
                    </Button>
                  </div>
                  <div className="input">
                    <Button variant="outlined" onClick={handleCleardata}>Clear</Button>
                  </div>
                </div>
                <div className='alert-popup-main'>
                  {success &&
                    <div className='alert-popup Success' >
                      <div className="popup-icon"> <FileDownloadDoneIcon /> </div>
                      <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
                      <p>{successMessage}</p>
                    </div>
                  }
                  
                  {error &&
                    <div className='alert-popup Error' >
                      <div className="popup-icon"> <ClearIcon /> </div>
                      <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
                      <p>{errorMessage}</p>
                    </div>
                  }
                </div>
              </div>
            </div>
            <div className="container-right-mailDetails">
              <div className="textbox-mailer">
                <div className="textboxlist-mailer">
                  <div className="textboxlist-customer ">
                    <div className="input-field mailer-search-input-field">
                      <div>
                        <div className="input template-input">
                          <div className="icone">
                            <AiOutlineFileSearch />
                          </div>
                          <TextField
                            size="small"
                            id="searchname"
                            label="Search Name"
                            name="Searchname"
                            value={searchname || ""}
                            sx={{ m: 1, width: "200ch" }}
                            onChange={(e) => setSearchname(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="template-search-btn">
                        <div className="input">
                          <Button variant="contained" onClick={() => handleShowdata()}>Search</Button>
                        </div>
                        <div className="input" >
                          <Button  disabled={!Mailer_create} onClick={handleTemplateCreation} variant="contained">Create Template</Button>
                        </div>
                      </div>
                    </div>
                    <div className="table-bookingCopy-mailer">
                      <div className="mail-details-table">
                        <Box
                          sx={{
                            height: 400, // Adjust this value to fit your needs
                            position: 'relative',
                            '& .MuiDataGrid-virtualScroller': {
                              '&::-webkit-scrollbar': {
                                width: '8px', // Adjust the scrollbar width here
                                height: '8px', // Adjust the scrollbar width here
                              },
                              '&::-webkit-scrollbar-track': {
                                backgroundColor: '#f1f1f1',
                              },
                              '&::-webkit-scrollbar-thumb': {
                                backgroundColor: '#457cdc',
                                borderRadius: '20px',
                                minHeight: '60px', // Minimum height of the scrollbar thumb (scroll indicator)

                              },
                              '&::-webkit-scrollbar-thumb:hover': {
                                backgroundColor: '#3367d6',
                              },
                            },
                          }}
                        >
                            {loading ? ( 
                                <Box
                                    sx={{
                                        position: 'absolute', 
                                        top: '50%',
                                        left: '50%', 
                                        transform: 'translate(-50%, -50%)', 
                                    }}
                                >
                                    <CircularProgress />
                                </Box>
                            ) : (

                          <DataGrid
                            rows={templatedata}
                            columns={columns}
                            onRowClick={handletableClick}
                          />
                            )}
                        </Box>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="input-field full-width" style={{ marginLeft: '60px' }}>
    <div className="inputs sms-format-keyword-input">
        <span className="Title-Name" style={{ fontWeight: 600 }}>Key-Words</span>
        <TextField
            className="sms-box"
            fullWidth
            id="outlined-7"
            multiline
            sx={{ mt: 1, width: "100%" }}
            rows={4}
            defaultValue="1. USER CREATION : ${username} - Username , ${userpassword} - Password
2. DRIVER INFO : ${Drivername} - Driver Name , ${userid} - Driver UserID, ${UserName} - Driver Username , ${password} -Driver App Password
3. AGREEMENT MAIL FOR CUSTOMER : ${user.customer} - Customer Name , ${subscriptionEnd.format} - Agreement End Date , ${previousDay.format} - Previous Date 
4. AGREEMENT MAIL FOR OWNER : ${user.customer} - Customer Name , (${user.email}) - Customer Email ID , ${subscriptionEnd.format} - Agreement End Date"

            InputProps={{
                readOnly: true,
            }}
        />
    </div>
</div>


          {/* <Box className='common-speed-dail'>
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
          </Box> */}

<Box className="common-speed-dail">
                    <StyledSpeedDial
                        ariaLabel="SpeedDial playground example"
                        icon={<SpeedDialIcon />}
                        direction="left"
                    >

                        {Mailer_read === 1 && (
                            <SpeedDialAction
                                key="list"
                                icon={<ChecklistIcon />}
                                tooltipTitle="List"
                                onClick={()=>handleClick("list")}
                            />
                        )}
                     
                      
                        {Mailer_create === 1 && (
                            <SpeedDialAction
                                key="Add"
                                icon={<BookmarkAddedIcon />}
                                tooltipTitle="Add"
                                onClick={() =>handleClick("Add")}
                            />
                        )}
                       year
                    </StyledSpeedDial>
                </Box>
        </form>
      </div>
    </div>
  )
}

export default MailDetails