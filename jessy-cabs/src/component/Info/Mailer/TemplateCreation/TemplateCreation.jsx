import React, { useRef, useState, useEffect } from 'react';
import "./TemplateCreation.css";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import axios from 'axios';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import ClearIcon from '@mui/icons-material/Clear';
import { BsExclamationCircle } from "react-icons/bs";
import { APIURL } from '../../../url';
import { useLocation } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";



const TemplateCreation = () => {
  const apiurl = APIURL;
  const [templatedata, setTemplateData] = useState({
    TemplateName: '',
    TemplateSubject: '',
    TemplateMessageData: '',
  });

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({});
  const [editmode, setEditmode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [imagedata, setImageData] = useState([])
  const [imagedataedit, setImagedataedit] = useState([])
  const fileInputRef = useRef(null);
  const [filedata, setFiledata] = useState(null)


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const parameterKeys = ["Templatecheck", "Templateid", "TemplateName", "TemplateSubject", "TemplateMessageData"];
    const TemplateFormData = {};

    parameterKeys.forEach(key => {
      const value = params.get(key);
      if (value !== null && value !== "null") {
        TemplateFormData[key] = value;
      }
    });

    if (TemplateFormData["Templatecheck"] === "true") {
      setEditmode(true);
    } else {
      setEditmode(false);
    }



    setTemplateData(TemplateFormData);
    const attacheimagedataedit = async (templateid) => {
      try {
        if (templateid) {
          const response = await axios.get(`${apiurl}/gettemplateattachimage/${templateid}`);
          const dataimage = response.data;
          setImagedataedit(dataimage);
        }
      } catch (err) {
        console.log(err);
      }
    };

    // attacheimagedataedit(TemplateFormData["Templateid"]);
    attacheimagedataedit(TemplateFormData["Templateid"])


  }, [location, apiurl, setImageData]);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setTemplateData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleQuillChange = (content) => {
    setTemplateData(prevData => ({
      ...prevData,
      TemplateMessageData: content,
    }));
  };
  const handleFileInputChange = (event) => {
    const files = event.target.files;
    setImageData((prevImages) => [...prevImages, ...files]);
    if (editmode) {

      setFiledata(files)
      setImagedataedit((prevImages) => [...prevImages, ...files]);
    }

  };


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

  const handleADD = async () => {
    if (!templatedata.TemplateName) {
      setError(true);
      setErrorMessage("Please fill TemplateName");
      return;
    }
    if (!templatedata.TemplateSubject) {
      setError(true);
      setErrorMessage("Please fill TemplateSubject");
      return;
    }
    if (!templatedata.TemplateMessageData) {
      setError(true);
      setErrorMessage("Please fill TemplateMessageData");
      return;
    }
    try {
      const data = { ...templatedata }

      await axios.post(`${apiurl}/templatedatainsert`, data);
      const response = await axios.get(`${apiurl}/lasttemplateid`);

      const lasttempalateidno = response.data.Templateid;
      Attacheimagedata(lasttempalateidno)
      setTemplateData({})
      setSuccess(true);
      setSuccessMessage("Successfully Added");

    } catch (err) {
      console.log(err);
    }
  };

  const Attacheimagedata = async (lastno) => {
    const formDataToSend = new FormData();
    imagedata.forEach((file, index) => {
      formDataToSend.append('imagestemplate', file); // Assuming imagedata is an array of File objects
    });

    try {
      const response = await axios.post(`${apiurl}/templateattachmentimage/${lastno}`, formDataToSend)
      console.log(response)
      setImageData([])
    }
    catch (err) {
      console.log(err)

    }
  }


  const handleEdit = async () => {
    const formDataeditToSend = new FormData();
    imagedataedit.forEach((file, index) => {
      formDataeditToSend.append('imagestemplate', file); // Assuming imagedata is an array of File objects
    });
    try {

      const { Templateid, Templatecheck, ...restdatatemplate } = templatedata
      await axios.put(`${apiurl}/templatedataypdate/${templatedata.Templateid}`, restdatatemplate)

      if (filedata) {
        await axios.post(`${apiurl}/templateattachmentimage/${templatedata.Templateid}`, formDataeditToSend)

      }
      navigate("/home/info/mailer");

    }
    catch (err) {
      console.log(err)
    }
  }

  const BackToSelection = () => {
    navigate("/home/info/mailer/TemplateSelection");
  };

  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };



  const [openmodals, setOpenmodals] = useState(false);
  const handleOpenmodal = () => {
    setOpenmodals(true);
  };
  const handleClosemodal = () => setOpenmodals(false);
  const style1 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '15px',
  };



  const handleCancel = (indexToRemove) => {
    setImageData(prevImageData => prevImageData.filter((_, index) => index !== indexToRemove));
  };
  const handleeditCancel = async (data, indexToRemove) => {
    const temaplateimage = data.templateimage

    if (window.confirm('Are you sure you want to remove this image?')) {
      setImagedataedit(prevImageData => prevImageData.filter((_, index) => index !== indexToRemove));
      await axios.delete(`${apiurl}/templatesingledataimage/${templatedata.Templateid}/${temaplateimage}`)

    }
  };


  return (
    <>
      <div className='Scroll-Style-hide template-creation-main-div'>
        <div className='mail-template-division'>
          <div className='word-head'>
            <div className='back-input'>
              <div className='back-section-div'><p className='back-section text-white' onClick={BackToSelection}><IoChevronBack /></p></div>
              <div>
                <div>
                  <input type="text" className='template-name' name="TemplateName" value={templatedata.TemplateName || ''} onChange={handleChange} placeholder='Enter a template name' />
                </div>
                <div>
                  <input type="text" className='template-subject' name="TemplateSubject" value={templatedata.TemplateSubject || ''} onChange={handleChange} placeholder='Enter a template subject' />
                </div>
              </div>
            </div>
            <div className='right-header'>
              <div className='flex items-center'>
                <p onClick={handleFileUploadClick} className='attachments template-creation-attachments'>
                  Attachments
                </p>
                <input
                  type="file"
                  id="imagestemplate"
                  name="imagestemplate"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileInputChange}
                />
              </div>
              <div>
                <button onClick={handleOpenmodal} className='cancel-button-template'>
                  Cancel
                </button>
                <div>
                  <Modal
                    keepMounted
                    open={openmodals}
                    onClose={handleClosemodal}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                  >
                    <Box className="mass-email-box" sx={style1}>
                      <div className='cancel-popup-icon-division'>
                        <BsExclamationCircle className='cancel-popup-icon' />
                      </div>
                      <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                        Are you sure want to cancel?
                      </Typography>
                      <div className='cancel-popup-confirm-division'>
                        <button onClick={BackToSelection} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded">
                          Yes, I'm sure
                        </button>
                        <button onClick={handleClosemodal} className="border border-solid border-red-500 hover:bg-red-700 text-red-500 hover:text-white font-bold py-2 px-4 mx-2 rounded">
                          No, cancel
                        </button>
                      </div>
                    </Box>
                  </Modal>
                </div>
              </div>
              <div>
                <button className='preview-button-template cancel-button-template'>
                  Preview
                </button>
              </div>
              <div>
                {editmode ? (
                  <Button
                    variant="contained"
                    aria-controls="save-menu"
                    aria-haspopup="true"
                    onClick={handleEdit}
                    className='save-button-template'
                  >
                    Edit
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    aria-controls="save-menu"
                    aria-haspopup="true"
                    onClick={handleADD}
                    className='save-button-template'
                  >
                    Save
                  </Button>
                )}
              </div>
            </div>
          </div>
          <ReactQuill
            theme="snow"
            value={templatedata.TemplateMessageData}
            onChange={handleQuillChange}
            className='quill-editor'
            modules={{
              toolbar: [
                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                [{ 'size': [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                ['link', 'image', 'video'],
                ['clean']
              ],
            }}
          />
          {editmode ?
            <>
              {imagedataedit.length > 0 && (
                <div className='template-creation-document-main-division'>
                  {imagedataedit.map((data, index) => (
                    <div className='template-creation-document-sub-division' key={index}>
                      <p className='template-creation-document-text'>{data.templateimage || data.name}</p>
                      <Button onClick={() => handleeditCancel(data, index)}><IoCloseSharp /></Button>  {/* Cancel icon with onClick handler */}
                    </div>

                  ))}
                </div>
              )}
            </> :
            <>
              {imagedata.length > 0 && (
                <div className='template-creation-document-main-division'>
                  {imagedata.map((data, index) => (
                    <div className='template-creation-document-sub-division' key={index}>
                      <p className='template-creation-document-text'>{data.name}</p>
                      <Button onClick={() => handleCancel(index)}><IoCloseSharp /></Button>  {/* Cancel icon with onClick handler */}
                    </div>
                  ))}
                </div>
              )}</>
          }
        </div>

      </div>


      <div className='alert-popup-main'>
        {error && (
          <div className='alert-popup Error'>
            <div className="popup-icon"> <ClearIcon /> </div>
            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
            <p>{errorMessage}</p>
          </div>
        )}
        {success && (
          <div className='alert-popup Success'>
            <div className="popup-icon"> <FileDownloadDoneIcon /> </div>
            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
            <p>{successMessage}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default TemplateCreation;
