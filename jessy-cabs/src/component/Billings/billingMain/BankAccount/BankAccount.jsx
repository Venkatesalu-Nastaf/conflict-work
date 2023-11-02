import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./BankAccount.css";
import Button from "@mui/material/Button";
import ClearIcon from '@mui/icons-material/Clear';
import CancelIcon from '@mui/icons-material/Cancel';
import ListAltIcon from "@mui/icons-material/ListAlt";
import { Autocomplete, IconButton, TextField } from "@mui/material";
import { AiFillBank } from "@react-icons/all-files/ai/AiFillBank";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { AccountType } from './BankAccountData';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

const BankAccount = () => {
  const [showAddBankForm, setShowAddBankForm] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [bankDetails, setBankDetails] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [infoMessage] = useState('');
  const [warningMessage] = useState('');
  const [info, setInfo] = useState(false);
  const [successMessage, setSuccesMessage] = useState('');
  const [warning, setWarning] = useState(false);

  const hidePopup = () => {
    setError(false);
    setWarning(false);
    setInfo(false);
    setSuccess(false);
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

  const handleAddBankClick = () => {
    setShowAddBankForm(true);
  };
  const [book, setBook] = useState({
    bankname: '',
    capital: '',
    AccountType: '',
    bankname2: '',
    netbalance: '',
    totalin: '',
    totalout: '',
  });

  const handleCancel = () => {
    setBook((prevBook) => ({
      ...prevBook,
      bankname: '',
      capital: '',
      AccountType: '',
    }));
  };

  const handleAddBank = () => {
    const bankname = book.bankname;
    const capital = book.capital;
    if (!bankname || !capital) {
      setError(true);
      setErrorMessage('Please fill in all required fields.');
      return;
    }
    const newBank = {
      bankname,
      bankname2: book.bankname,
      capital,
      netbalance: book.capital,
      totalin: book.capital,
      totalout: 0,
    };
    setBankDetails((prevBankDetails) => [...prevBankDetails, newBank]);
    setEditingIndex(null);
  };

  const handleDeleteBank = (index) => {
    const updatedBankDetails = [...bankDetails];
    updatedBankDetails.splice(index, 1);
    setBankDetails(updatedBankDetails);
    setPopupOpen(false); // Close the dialog

  };

  const handleEditBank = (index) => {
    setEditingIndex(index);
  };

  const handleSaveEdit = () => {
    const bankname = book.bankname;
    const capital = book.capital;
    if (editingIndex !== null) {
      if (!bankname || !capital) {
        setError(true);
        setErrorMessage('Please fill in all required fields.');
        return;
      }
      const updatedBankDetails = [...bankDetails];
      updatedBankDetails[editingIndex] = {
        ...updatedBankDetails[editingIndex],
        bankname,
        capital,
        netbalance: capital,
      };
      setBankDetails(updatedBankDetails);
      setSuccess(true);
      setSuccesMessage('Successfully Added');
      setEditingIndex(null);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleAutocompleteChange = (event, newValue, name) => {
    const selectedOption = newValue ? newValue.label : '';
    setBook((prevBook) => ({
      ...prevBook,
      [name]: selectedOption,
    }));
  };

  const handleAdd = async () => {
    try {
      const updatebook = {
        ...book,
        bankname2: book.bankname,
        netbalance: book.capital,
        totalin: book.capital,
        totalout: 0,
      }
      await axios.post('http://localhost:8081/bankdetails', updatebook);
      handleAddBank();
      handleCancel();

    } catch (error) {
      console.error('Error updating customer:', error);
      setError(true);
      setErrorMessage('Check your Network Connection');
    }
  };

  useEffect(() => {
    // Make a GET request to fetch the bankDetails from the backend
    fetch('http://localhost:8081/getbankdetails')
      .then((response) => response.json())
      .then((data) => {
        // Set the retrieved data to your component's state
        setBankDetails(data);
      })
      .catch(() => {
        setError(true);
        setErrorMessage('Error fetching Bank details')
      });
  }, []);

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  const handleDelete = () => {
    setPopupOpen(true);
  };

  return (
    <div className="BankAccount-form Scroll-Style-hide">
      <form className="BankAccount-main-container">
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
                    value={book.bankname}
                    onChange={handleChange}
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <FontAwesomeIcon icon={faSackDollar} size="xl" />
                  </div>
                  <TextField
                    type="number"
                    size="small"
                    label="Capital Amount"
                    name="capital"
                    value={book.capital}
                    onChange={handleChange} // Fixed the 'name' property here
                  />
                </div>
                <div className="input" style={{ width: "230px" }}>
                  <div className="icone">
                    <ListAltIcon color="action" style={{ fontSize: "27px" }} />
                  </div>
                  <Autocomplete
                    fullWidth
                    size="small"
                    id="free-solo-demo-AccountType"
                    freeSolo
                    sx={{ width: "20ch" }}
                    onChange={(event, value) => handleAutocompleteChange(event, value, "AccountType")}
                    value={AccountType.find((option) => option.Option)?.label || book.AccountType || ''}
                    options={AccountType.map((option) => ({
                      label: option.Option,
                    }))}
                    getOptionLabel={(option) => option.label || book.AccountType || ''}
                    renderInput={(params) => {
                      return (
                        <TextField   {...params} label="Account Type" name="AccountType" inputRef={params.inputRef} />
                      )
                    }
                    }
                  />
                </div>
                <div className="input" style={{ width: "100px" }}>
                  <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={handleAdd}>
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
        <div className="BankDetails-mainContainer">
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
                    name="bankname2"
                    value={bank.bankname2}
                    onChange={handleChange}
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <AiFillBank color="action" style={{ fontSize: "27px" }} />
                  </div>
                  <TextField
                    size="small"
                    label="Net Balance"
                    name="netbalance"
                    type="number"
                    value={bank.netbalance}
                    onChange={handleChange}
                  />
                </div>
                <div className="bank-btn-amount-main" id={`bank-btn-amountIN`}>
                  <label htmlFor={`totalin-${index}`}>Total-In</label>
                  <input
                    className="bank-amount-input"
                    name="totalin"
                    type="number"
                    id={`totalin-${index}`}
                    value={bank.totalin}
                    onChange={handleChange}
                  />
                </div>
                <div className="bank-btn-amount-main" id={`bank-btn-amountOUT`}>
                  <label htmlFor={`totalout-${index}`}>Total-Out</label>
                  <input
                    className="bank-amount-input"
                    name="totalout"
                    type="number"
                    id={`totalout-${index}`}
                    value={bank.totalout}
                    onChange={handleChange}
                  />
                </div>
                <div className="button-container-bankAccount">
                  <div className="input" style={{ width: "80px" }}>
                    {editingIndex === index ? (
                      <IconButton color="primary" variant="contained" onClick={handleSaveEdit}>
                        <SaveIcon />
                      </IconButton>
                    ) : (
                      <IconButton color="primary" variant="contained" onClick={() => handleEditBank(index)}>
                        <EditIcon />
                      </IconButton>
                    )}
                  </div>
                  <div className="input" style={{ width: "80px" }}>
                    <IconButton color="error" variant="contained" onClick={handleDelete}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                  <Dialog open={popupOpen} onClose={handlePopupClose}>
                    <DialogContent>
                      Are you sure you want to Delete this
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleDeleteBank} variant="contained" color="primary">
                        Yes
                      </Button>
                      <Button onClick={handlePopupClose} variant="contained" color="primary">
                        No
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </div>
            </div>
          ))}
        </div>
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
