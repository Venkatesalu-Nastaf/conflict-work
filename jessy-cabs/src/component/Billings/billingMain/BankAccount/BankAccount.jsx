import React, { useEffect } from 'react';
import "./BankAccount.css";
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import { AccountType } from './BankAccountData';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
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
import useBankaccount from './useBankaccount';

const BankAccount = () => {

  const {
    actionName,
    error,
    success,
    info,
    warning,
    successMessage,
    errorMessage,
    warningMessage,
    infoMessage,
    book,
    handleClick,
    handleChange,
    handleAdd,
    hidePopup,
    totalcapital,
    totalIn,
    totalOut,
    handleAddBankClick,
    showAddBankForm,
    handleAutocompleteChange,
    setShowAddBankForm,
    bankDetails,
    editingIndex,
    handleSaveEdit,
    handleEditBank,
    handleDelete,
    popupOpen,
    handlePopupClose,
    // handleDeleteBank,
    handlesuredelete


    // ... (other state variables and functions)
  } = useBankaccount();


  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  }, [actionName, handleClick]);

  return (
    <div className="BankAccount-form Scroll-Style-hide">
      <form className="BankAccount-main-container">
        <div className="total-account">
          <div className='amount-calculate'>
            <div className='total-inputs' >
              <label htmlFor="totalCapital">Total Capital:</label>
              <input type="number" id="totalCapital" value={totalcapital} readOnly />
            </div>
            <div className='total-inputs' id={`bank-btn-amountIN`} >
              <label htmlFor="totalIn">Total-In:</label>
              <input type="number" id="totalIn" value={totalIn} readOnly />
            </div>
            <div className='total-inputs' id={`bank-btn-amountOUT`} >
              <label htmlFor="totalOut">Total-Out:</label>
              <input type="number" id="totalOut" value={totalOut !== isNaN ? totalOut : 0} readOnly />
            </div>
          </div>
        </div>
        <div className="BankAccount-detail-container-main">
          <div className="BankAccount-first-container">
            <div className="input bankaddbtn">
              <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={handleAddBankClick} >
                Add bank
              </Button>
            </div>
          </div>
          {showAddBankForm && (
            <div className="AddBankContainer-BankAccount">
              <div className="input-field input-field-bankaccount">
                <div className="input input-bankaccount">
                  <div className="icone">
                    <AiFillBank color="action" />
                  </div>
                  <TextField
                    size="small"
                    label="Bank Name"
                    name="bankname"
                    id="banknameHDFC"
                    autoFocus
                    value={book.bankname || ''}
                    onChange={handleChange}
                  />


                  
                </div>
                <div className="input input-bankaccount">
                  <div className="icone">
                    <FontAwesomeIcon icon={faSackDollar} size="xl" />
                  </div>
                  <TextField
                    type="number"
                    size="small"
                    label="Capital Amount"
                    name="capital"
                    id="capital"
                    value={book.capital || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="input input-bankaccount">
                  <div className="icone">
                    <ListAltIcon color="action" />
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
                <div className="inpu">
                  <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={handleAdd}>
                    Add
                  </Button>
                </div>
                <div className="inpu">
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
              <div className="input-field input-field-bankaccount input-Field-bank-account">

                <div className="input input-bankname">
                  <div className="icone">
                    <AiFillBank color="action" />
                  </div>
                  <TextField
                    size="small"
                    label="Bank Name"
                    id="bankname02"
                    name="bankname2"
                    value={editingIndex === index ? bankDetail.bankname2 : (bankDetail.bankname2 || book.bankname2 || '')}
                    onChange={(event) => handleChange(event, index)}
                    disabled={editingIndex !== index}
                  />
                </div>
                <div className="input input-bankname">
                  <div className="icone">
                    <AiFillBank color="action" />
                  </div>
                  <TextField
                    size="small"
                    label="Net Balance"
                    name="netbalance"
                    id="netbalance89"
                    type="number"
                    value={editingIndex === index ? (bankDetail.totalin - bankDetail.totalout) : (bankDetail.totalin - bankDetail.totalout)}
                    onChange={(event) => handleChange(event, index)}
                    disabled={editingIndex !== index}
                  />
                </div>
                <div className="bank-btn-amount-main input-bankname" id={`bank-btn-amountIN`}>
                  <label htmlFor={`totalin-${index}`}>TotalIn:</label>
                  <input
                    className="bank-amount-input"
                    name="totalin"
                    type="number"
                    id={`totalin-${index}`}
                    value={editingIndex === index ? bankDetail.totalin : (bankDetail.totalin || '')}
                    onChange={(event) => handleChange(event, index)}
                    disabled={editingIndex !== index}
                  />
                </div>
                <div className="bank-btn-amount-main input-bankname" id={`bank-btn-amountOUT`}>
                  <label htmlFor={`totalout-${index}`}>TotalOut:</label>
                  <input
                    className="bank-amount-input"
                    name="totalout"
                    type="number"
                    id={`totalout-${index}`}
                    value={editingIndex === index ? bankDetail.totalout : (bankDetail.totalout || book.totalout || '')}
                    onChange={(event) => handleChange(event, index)}
                    disabled={editingIndex !== index}
                  />

                </div>
                <div className="button-container-bankAccount">
                  <div className="inpt input-bank-account-icon">
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
                  <div className="inpt input-bank-account-icon">

                    <IconButton color="error" variant="contained" onClick={() => handleDelete(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                  <Dialog open={popupOpen} onClose={handlePopupClose}>
                    <DialogContent>
                      Are you sure you want to Delete this
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => handlesuredelete(bankDetail.id)} variant="contained" color="primary">
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
        <div className='alert-popup-main'>
          {error && (
            <div className='alert-popup Error' >
              <div className="popup-icon"> <ClearIcon /> </div>
              <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
              <p>{errorMessage}</p>
            </div>
          )
          }
          {warning && (
            <div className='alert-popup Warning' >
              <div className="popup-icon"> <ErrorOutlineIcon /> </div>
              <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
              <p>{warningMessage}</p>
            </div>
          )
          }
          {info && (
            <div className='alert-popup Info' >
              <div className="popup-icon"> <BsInfo /> </div>
              <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
              <p>{infoMessage}</p>
            </div>
          )
          }
          {success && (
            <div className='alert-popup Success' >
              <div className="popup-icon"> <FileDownloadDoneIcon /> </div>
              <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
              <p>{successMessage}</p>
            </div>
          )
          }
        </div>
      </form>
    </div>
  )
}

export default BankAccount;
