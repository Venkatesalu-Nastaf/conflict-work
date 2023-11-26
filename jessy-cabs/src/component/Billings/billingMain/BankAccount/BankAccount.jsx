import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./BankAccount.css";
import Button from "@mui/material/Button";
import Dialog from '@material-ui/core/Dialog';
import { AccountType } from './BankAccountData';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { AiFillBank } from "@react-icons/all-files/ai/AiFillBank";
import { Autocomplete, IconButton, TextField } from "@mui/material";

// ICONS
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import ListAltIcon from "@mui/icons-material/ListAlt";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";

const BankAccount = () => {
  const [showAddBankForm, setShowAddBankForm] = useState(false);
  const [totalcapital, setTotalCapital] = useState(0);
  const [totalIn, setTotalIn] = useState(0);
  const [totalOut, setTotalOut] = useState(0);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [bankDetails, setBankDetails] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [infoMessage] = useState('');
  const [warningMessage] = useState('');
  const [info, setInfo] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [warning, setWarning] = useState(false);
  // const [bank, setBank] = useState({ bankname2: '' });

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
    fetchData();
    setEditingIndex(null);
  };

  // const handleEditBank = (index) => {
  //   setEditingIndex(index);
  // };


  const handleSaveEdit = async (index, id) => {
    try {
      if (index >= 0 && index < bankDetails.length) {
        const updatedBank = bankDetails[index];
        const updateData = {
          id: updatedBank.id,
          bankname2: book.bankname2 || updatedBank.bankname2,
          netbalance: book.netbalance || updatedBank.netbalance,
          totalin: book.netbalance || updatedBank.totalin,
          totalout: book.totalout || updatedBank.totalout,
        };
        console.log('updated bankdetails', updateData);
        await axios.put(`http://localhost:8081/updatebankdetails/${updatedBank.id}`, updateData);
        setSuccess(true);
        setSuccessMessage('Successfully Updated');
        setEditingIndex(null);
      } else {
        console.error('Invalid index:', index);
      }
    } catch (error) {
      console.error('Error updating bank account:', error);
      setError(true);
      setErrorMessage('Error updating bank account. Please check your Network Connection.');
    }
  };

  // const handleDeleteBank = async (index) => {
  //   const idToDelete = document.querySelector('input[name="id"]').value;
  //   console.log('id of deleted account', idToDelete);
  //   if (!idToDelete) {
  //     return;
  //   }
  //   try {
  //     await axios.delete(`http://localhost:8081/deletebankdetails/${idToDelete}`);
  //     fetchData();
  //     handlePopupClose();
  //   } catch (error) {
  //     console.error('Error deleting bank account:', error);
  //     setError(true);
  //     setErrorMessage('Error deleting bank account. Please check your Network Connection.');
  //   }
  // };

  const handleDeleteBank = async (id) => {
    console.log('id of deleted account', id);
    if (!id) {
      return;
    }
    try {
      await axios.delete(`http://localhost:8081/deletebankdetails/${id}`);
      fetchData();
      handlePopupClose();
    } catch (error) {
      console.error('Error deleting bank account:', error);
      setError(true);
      setErrorMessage('Error deleting bank account. Please check your Network Connection.');
    }
  };

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    const updatedBankDetails = [...bankDetails];
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));

    updatedBankDetails[index] = {
      ...updatedBankDetails[index],
      [name]: value,
    };
    setBankDetails(updatedBankDetails);
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
      const newBank = {
        bankname: book.bankname,
        capital: book.capital,
        AccountType: book.AccountType,
        bankname2: book.bankname,
        netbalance: book.capital,
        totalin: book.capital,
        totalout: 0,
      };
      await axios.post('http://localhost:8081/bankdetails', newBank);
      handleAddBank();
      handleCancel();
    } catch {
      setError(true);
      setErrorMessage('Error adding bank account. Please check your Network Connection.');
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8081/getbankdetails');
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setBankDetails(data);
        } else {
          setBankDetails([]);
          setError(true);
          setErrorMessage("No data found");
        }
      } else {
        console.error('Error fetching bank details');
      }
    } catch (error) {
      console.error('Error fetching bank details:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  const handleDelete = () => {
    setPopupOpen(true);
  };

  const handleEditBank = (index) => {
    setEditingIndex(index);
  };
  //calculate totalout amount
  useEffect(() => {
    const calculatedTotalOut = bankDetails.reduce((total, bankDetail) => total + (parseInt(bankDetail.totalout, 10) || parseInt(book.totalout, 10) || 0), 0);
    setTotalOut(calculatedTotalOut);
  }, [bankDetails, book]);
  //calculate totalin amount
  useEffect(() => {
    const calculatedTotalIn = bankDetails.reduce((total, bankDetail) => total + (parseInt(bankDetail.totalin, 10) || parseInt(book.totalin, 10) || 0), 0);
    setTotalIn(calculatedTotalIn);
  }, [bankDetails, book]);
  //calculate totalcapital amount
  // useEffect(() => {
  //   const calculatedTotalCapital = bankDetails.reduce((total, bankDetail) => total + (parseInt(bankDetail.totalin, 10) || parseInt(book.totalin, 10) || 0), 0);
  //   setTotalCapital(calculatedTotalCapital);
  // }, [bankDetails, book]);
  useEffect(() => {
    // Make API request to fetch total capital amount
    axios.get('http://localhost:8081/totalCapital_from_billing')
      .then(response => {
        setTotalCapital(response.data.totalAmount);
      })
      .catch(error => {
        console.error('Error fetching total capital amount:', error);
      });
  }, []);

  return (
    <div className="BankAccount-form Scroll-Style-hide">
      <form className="BankAccount-main-container">
        <div className="total-account">
          <div className='amount-calculate'>
            <div className='total-inputs' >
              <label htmlFor="">Total Capital:</label>
              <input type="number" value={totalcapital} />
            </div>
            <div className='total-inputs' id={`bank-btn-amountIN`} >
              <label htmlFor="">Total-In:</label>
              <input type="number" value={totalIn} />
            </div>
            <div className='total-inputs' id={`bank-btn-amountOUT`} >
              <label htmlFor="">Total-Out:</label>
              <input type="number" value={totalOut} />
            </div>
          </div>
        </div>
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
                    value={book.bankname || ''}
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
                    value={book.capital || ''}
                    onChange={handleChange}
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
          {bankDetails.map((bankDetail, index) => (
            <div className="addedbanks-Details-BankAccount" key={index}>
              <div className="input-field">
                <div className="input">
                  <input type="hidden" name="id" value={bankDetails[index]?.id} />
                  <div className="icone">
                    <AiFillBank color="action" style={{ fontSize: "27px" }} />
                  </div>
                  <TextField
                    size="small"
                    label="Bank Name"
                    name="bankname2"
                    // value={bankDetails[index]?.bankname2 || book.bankname2 || ''}
                    value={editingIndex === index ? bankDetail.bankname2 : (bankDetail.bankname2 || book.bankname2 || '')}
                    onChange={(event) => handleChange(event, index)}
                    disabled={editingIndex !== index}
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
                    // value={bankDetails[index]?.netbalance || book.netbalance || ''}
                    value={editingIndex === index ? bankDetail.netbalance : (bankDetail.netbalance || book.netbalance || '')}
                    // onChange={handleChange}
                    onChange={(event) => handleChange(event, index)}
                    disabled={editingIndex !== index}
                  />
                </div>
                <div className="bank-btn-amount-main" id={`bank-btn-amountIN`}>
                  <label htmlFor={`totalin-${index}`}>Total-In</label>
                  <input
                    className="bank-amount-input"
                    name="totalin"
                    type="number"
                    id={`totalin-${index}`}
                    // value={bankDetails[index]?.totalin || book.netbalance || ''}
                    value={editingIndex === index ? bankDetail.totalin : (bankDetail.totalin || book.netbalance || '')}
                    // onChange={handleChange}
                    onChange={(event) => handleChange(event, index)}
                    disabled={editingIndex !== index}
                  />
                </div>
                <div className="bank-btn-amount-main" id={`bank-btn-amountOUT`}>
                  <label htmlFor={`totalout-${index}`}>Total-Out</label>
                  <input
                    className="bank-amount-input"
                    name="totalout"
                    type="number"
                    id={`totalout-${index}`}
                    // value={bankDetails[index]?.totalout || book.totalout || ''}
                    value={editingIndex === index ? bankDetail.totalout : (bankDetail.totalout || book.totalout || '')}
                    onChange={(event) => handleChange(event, index)}
                    disabled={editingIndex !== index}
                  />
                </div>
                <div className="button-container-bankAccount">
                  <div className="input" style={{ width: "80px" }}>
                    {editingIndex === index ? (
                      <IconButton color="primary" variant="contained" onClick={() => handleSaveEdit(index)}>
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
                      <Button onClick={() => handleDeleteBank(bankDetail.id)} variant="contained" color="primary">
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
