import React from 'react';
import ClearIcon from "@mui/icons-material/Clear";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import useBooking from '../Bookings/BookingMain/Booking/useBooking';

const AlertPopup = () => {

  const {

    error,
    success,
    info,
    // warning,
    successMessage,
    errorMessage,
    // warningMessage,
    infoMessage,
    hidePopup,
    warningMessage,
    warning,
    handleClick,
  } = useBooking();
  return (
    <div>
      <div className="alert-popup-main">
        {error && (
          <div className="alert-popup Error">
            <div className="popup-icon">
              {" "}
              <ClearIcon />{" "}
            </div>
            <span className="cancel-btn" onClick={hidePopup}>
              <ClearIcon color="action" />{" "}
            </span>
            <p>{errorMessage}</p>
          </div>
        )}

        {info && (
          <div className="alert-popup Info">
            <div className="popup-icon">
              <BsInfo />
            </div>
            <span className="cancel-btn" onClick={hidePopup}>
              <ClearIcon color="action" />
            </span>
            <p>{infoMessage}</p>
          </div>
        )}
        {success && (
          <div className="alert-popup Success">
            <div className="popup-icon">
              <FileDownloadDoneIcon />
            </div>
            <span className="cancel-btn" onClick={hidePopup}>
              <ClearIcon color="action" />
            </span>
            <p>{successMessage}</p>
          </div>
        )}
        {warning &&
          <div className='alert-popup Warning' >
            <div className="popup-icon"> <ErrorOutlineIcon /> </div>
            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
            <p>{warningMessage}</p>
          </div>
        }
      </div>
    </div>
  )
}

export default AlertPopup
