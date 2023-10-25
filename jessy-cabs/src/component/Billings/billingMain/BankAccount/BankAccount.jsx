import React, { useState, useEffect } from 'react';
import "./BankAccount.css";
import Button from "@mui/material/Button";
import ClearIcon from '@mui/icons-material/Clear';
import CancelIcon from '@mui/icons-material/Cancel';
import ListAltIcon from "@mui/icons-material/ListAlt";
import { Autocomplete, TextField } from "@mui/material";
import { AiFillBank } from "@react-icons/all-files/ai/AiFillBank";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { AccountType } from './BankAccountData';

const BankAccount = () => {
  const [showAddBankForm, setShowAddBankForm] = useState(false);
  const [bankName, setBankName] = useState('');
  const [capitalAmount, setCapitalAmount] = useState('');
  const [error, setError] = useState(false);
  const [warning, setWarning] = useState(false);
  const [info, setInfo] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [warningMessage] = useState('');
  const [infoMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [bankDetails, setBankDetails] = useState([]);

  const hidePopup = () => {
    setError(false);
    setWarning(false);
    setInfo(false);
    setSuccess(false);
  };

  const handleAddBankClick = () => {
    setShowAddBankForm(true);
  };

  const handleAddBank = () => {
    if (!bankName || !capitalAmount) {
      setError(true);
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    const newBank = {
      bankName,
      capitalAmount,
      netBalance: capitalAmount,
      totalIn: capitalAmount,
      totalOut: 0,
    };

    setBankDetails([...bankDetails, newBank]);

    setSuccess(true);
    setSuccessMessage('Bank added successfully');

    setErrorMessage('');
    setBankName('');
    setCapitalAmount('');
    setShowAddBankForm(false);
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000); // 3 seconds
      return () => clearTimeout(timer); // Clean up the timer on unmount
    }
  }, [error]);
  useEffect(() => {
    if (warning) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000); // 3 seconds
      return () => clearTimeout(timer); // Clean up the timer on unmount
    }
  }, [warning]);
  useEffect(() => {
    if (info) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000); // 3 seconds
      return () => clearTimeout(timer); // Clean up the timer on unmount
    }
  }, [info]);
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000); // 3 seconds
      return () => clearTimeout(timer); // Clean up the timer on unmount
    }
  }, [success]);

  return (
    <div className="BankAccount-form Scroll-Style-hide">
      <form className='BankAccount-main-container'>
        <div className="BankAccount-detail-container-main">
          <div className="BankAccount-first-container">
            <div className="input bankaddbtn">
              <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={handleAddBankClick}>
                Add bank
              </Button>
            </div>
          </div>
          {showAddBankForm && (
            <div className="AddBankContainer-BankAccount">
              <div className="input-field">
                <div className="input">
                  <div className="icone">
                    <AiFillBank color="action" style={{ fontSize: "27px" }} />
                  </div>
                  <TextField
                    size="small"
                    label="Bank Name"
                    name="bankname"
                    autoFocus
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <FontAwesomeIcon icon={faSackDollar} size="xl" />
                  </div>
                  <TextField
                    type='number'
                    size="small"
                    label="Capital Amount"
                    name="capital"
                    value={capitalAmount}
                    onChange={(e) => setCapitalAmount(e.target.value)}
                  />
                </div>
                <div className="input" style={{ width: "230px" }}>
                  <div className="icone">
                    <ListAltIcon color="action" style={{ fontSize: "27px" }} />
                  </div>
                  <Autocomplete
                    fullWidth
                    size="small"
                    id="free-solo-demo-BankAccount"
                    freeSolo
                    sx={{ width: "20ch" }}
                    options={AccountType.map((option) => ({
                      label: option.Option,
                    }))}
                    getOptionLabel={(option) => option.label || ''}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="Account Type" name="AccountType" inputRef={params.inputRef} />
                      );
                    }}
                  />
                </div>
                <div className="input" style={{ width: "100px" }}>
                  <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={handleAddBank}>
                    Add
                  </Button>
                </div>
                <div className="input" style={{ width: "100px" }}>
                  <Button variant="contained" onClick={() => setShowAddBankForm(false)}>
                    <CancelIcon />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
        {bankDetails.map((bank, index) => (
          <div className="addedbanks-Details-BankAccount" key={index}>
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <AiFillBank color="action" style={{ fontSize: "27px" }} />
                </div>
                <TextField
                  size="small"
                  label="Bank Name"
                  name="bankname"
                  autoFocus
                  value={bank.bankName}
                />
              </div>
              <div className="input">
                <div className="icone">
                  <AiFillBank color="action" style={{ fontSize: "27px" }} />
                </div>
                <TextField
                  size="small"
                  label="Net Balance"
                  name="netBalance"
                  value={bank.netBalance}
                />
              </div>
              <div className="bank-btn-amount-main" id="bank-btn-amountIN">
                <label htmlFor={`totalIn-${index}`}>Total-In</label>
                <input className='bank-amount-input' type="number" id={`totalIn-${index}`} value={bank.totalIn} />
              </div>
              <div className="bank-btn-amount-main" id="bank-btn-amountOUT">
                <label htmlFor={`totalOut-${index}`}>Total-Out</label>
                <input className='bank-amount-input' type="number" id={`totalOut-${index}`} value={bank.totalOut} />
              </div>
            </div>
          </div>
        ))}
        {error && (
          <div className='alert-popup Error' >
            <div className="popup-icon"> <ClearIcon style={{ color: '#fff' }} /> </div>
            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
            <p>{errorMessage}</p>
          </div>
        )
        }
        {warning && (
          <div className='alert-popup Warning' >
            <div className="popup-icon"> <ErrorOutlineIcon style={{ color: '#fff' }} /> </div>
            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
            <p>{warningMessage}</p>
          </div>
        )
        }
        {info && (
          <div className='alert-popup Info' >
            <div className="popup-icon"> <BsInfo style={{ color: '#fff' }} /> </div>
            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
            <p>{infoMessage}</p>
          </div>
        )
        }
        {success && (
          <div className='alert-popup Success' >
            <div className="popup-icon"> <FileDownloadDoneIcon style={{ color: '#fff' }} /> </div>
            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
            <p>{successMessage}</p>
          </div>
        )
        }
      </form>
    </div>
  )
}

export default BankAccount;
