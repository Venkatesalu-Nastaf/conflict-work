import React from 'react'
import "./RealtimeMap.css"
import { TextField, FormControlLabel, FormControl, FormLabel, Radio, RadioGroup, Checkbox, Switch,Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

export const RealtimeMap = () => {
  return (
    <>
       <div className="form-container form-container-customer">
      <div className="main-content-container">
        <form>
          <p className="head-tab-type-2-all">
            <span className="Title-Name">Customer</span>
          </p>
          <div className='main-content-form'>
            <div className="Customer-page-header">
              <div className="input-field Customer-page-input-field">
                <div className="input">
                  <div className="icone">
                    <AccountBalanceWalletIcon color="action" />
                  </div>
                  <TextField
                    // margin="normal"
                    size="small"
                    name="customerId"
                    label="Customer ID"
                    id="customerId"
                    className='full-width'
                    autoComplete="new-password"
                    // value={selectedCustomerData?.customerId || book.customerId}
                    // onChange={handleChange}
                  // variant="standard"
                  />
                </div>
              </div>
            </div>

          
        
          </div>

        </form>
      </div>
    </div>
      
        
       
        
   

    </>
  )
}
