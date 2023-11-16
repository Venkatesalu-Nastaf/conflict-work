import React, { useEffect, useState } from "react";
import "./Cards.css";
import ClearIcon from '@mui/icons-material/Clear';
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import { cardsData } from "./Cards-Data.js";
import Card from "./Card/Card";

const Cards = () => {
  const [data, setData] = useState([]);
  const [warning, setWarning] = useState(false);
  const [error, setError] = useState(false);
  const [info, setInfo] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [warningMessage] = useState({});
  const [infoMessage] = useState({});


  const hidePopup = () => {
    setSuccess(false);
    setError(false);
    setInfo(false);
    setWarning(false);
  };
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);
  useEffect(() => {
    if (warning) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [warning]);
  useEffect(() => {
    if (info) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [info]);
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await cardsData();
        setData(result);
      } catch {
        setError(true);
        setErrorMessage("Something went wrong");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="Cards">
      {data.map((card, index) => (
        <div className="parentContainer" key={index}>
          <Card
            title={card.title}
            color={card.color}
            barValue={card.barValue}
            value={card.value}
            png={card.png}
            series={card.series}
          />
        </div>
      ))}
      {error &&
        <div className='alert-popup Error' >
          <div className="popup-icon"> <ClearIcon style={{ color: '#fff' }} /> </div>
          <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
          <p>{errorMessage}</p>
        </div>
      }
      {info &&
        <div className='alert-popup Info' >
          <div className="popup-icon"> <BsInfo style={{ color: '#fff' }} /> </div>
          <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
          <p>{infoMessage}</p>
        </div>
      }
      {warning &&
        <div className='alert-popup Warning' >
          <div className="popup-icon"> <ErrorOutlineIcon style={{ color: '#fff' }} /> </div>
          <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
          <p>{warningMessage}</p>
        </div>
      }
      {success &&
        <div className='alert-popup Success' >
          <div className="popup-icon"> <FileDownloadDoneIcon style={{ color: '#fff' }} /> </div>
          <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
          <p>{successMessage}</p>
        </div>
      }
    </div>
  );
};

export default Cards;