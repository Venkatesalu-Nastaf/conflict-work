import React, { Component, useRef, useEffect, useState } from 'react';

import "./TemplateCreation.css"
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { TfiText } from "react-icons/tfi";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { TiTick } from "react-icons/ti";
import { AiOutlineClose } from "react-icons/ai";
import { BsExclamationCircle } from "react-icons/bs";
import { BiBorderRadius } from 'react-icons/bi';

const TemplateCreation = () => {


  const navigate = useNavigate();
  const BackToSelection = () => {
    navigate("/home/info/mailer/TemplateSelection");
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSave = () => {
    // Your save logic here
    handleClose();
  };


  const fileInputRef = useRef(null);

  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    // Handle the file upload logic here
    // console.log('Selected file:', file);
  };

  const [content, setContent] = useState('');

  const handleChange = (value) => {
    setContent(value);
  };

  const [openmodals, setOpenmodals] = React.useState(false);
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

  return (
    <>



      <div className='word-head'>
        <div className='back-input'>
          <div style={{ cursor: 'pointer' }}><p className='back-section text-white' onClick={BackToSelection}> <IoChevronBack /></p></div>

          <div>
            <div>
              <input type="text" className='template-name' placeholder='Enter a template name' />
            </div>
            <div>
              <input type="text" className='template-subject' placeholder='Enter a template subject' />
            </div>
          </div>
        </div>


        <div className='right-header'>

          <div className='flex items-center'>
            <p onClick={handleFileUploadClick} className='attachments' style={{ cursor: 'pointer', textDecoration: 'underline', color: 'white' }}>
              Attachments
            </p>
            <input
              type="file"
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
              {/* <button onClick={handleOpenmodal}>Modal</button> */}
              <Modal
                keepMounted
                open={openmodals}
                onClose={handleClosemodal}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
              >
                <Box className="mass-email-box" sx={style1}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <BsExclamationCircle
                      style={{
                        color: '#7c7c7c',
                        fontSize: 40
                      }}
                    />
                  </div>
                  <Typography id="keep-mounted-modal-description" style={{ textAlign: 'center' }} sx={{ mt: 2 }}>
                    Are you sure want to cancel?
                  </Typography>
                  <div className='mt-10' style={{ display: 'flex', justifyContent: 'center' }}>
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
            <Button
              variant="contained"
              aria-controls="save-menu"
              aria-haspopup="true"
              onClick={handleClick}
              className='save-button-template'
            >
              Save
            </Button>
            <Menu
              id="save-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleSave}>Save</MenuItem>
              <MenuItem onClick={handleClose}>Save As Draft</MenuItem>
            </Menu>
          </div>

        </div>



      </div>




      <ReactQuill
        theme="snow"
        value={content}
        onChange={handleChange}
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

    </>

  )
}


export default TemplateCreation;