import React, { useState } from 'react'
import './UserPermission.css'
import Switch from '@mui/material/Switch';
// import { BiSolidDownArrow } from "react-icons/bi";
// import { BiSolidUpArrow } from "react-icons/bi";

import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";

const label = { inputProps: { 'aria-label': 'Switch demo' } };
export const UserPermission = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isbillingDropdownVisible, setIsbillingDropdownVisible] = useState(false);
  const [isregisterDropdownVisible, setIsregisterDropdownVisible] = useState(false);
  const [issettingDropdownVisible, setIssettingDropdownVisible] = useState(false);
  const [isinfoDropdownVisible, setIsinfoDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
    setIsbillingDropdownVisible(false);
  };

  const togglebillingDropdown = () => {
    setIsbillingDropdownVisible(!isbillingDropdownVisible);
    setIsDropdownVisible(false);

  };

  const toggleregisterDropdown = () => {
    setIsregisterDropdownVisible(!isregisterDropdownVisible);
    setIsDropdownVisible(false);
    setIsbillingDropdownVisible(false);

  };
  const togglesettingDropdown = () => {
    setIssettingDropdownVisible(!issettingDropdownVisible);
    setIsDropdownVisible(false);
    setIsbillingDropdownVisible(false);

  };

  const toggleinfoDropdown = () => {
    setIsinfoDropdownVisible(!isinfoDropdownVisible);
    setIsDropdownVisible(false);
    setIsbillingDropdownVisible(false);

  };

  return (


  
      <div className='permission-table'>
        {/* <h3 className='members-txt '>UserName</h3> */}
        <div className="table-containerr">
          <table>
            <thead>
              <tr className='table-header'>
                <th className='th-content'>PERMISSION</th>
                <th className='th-content th-headings'>VIEW</th>
                <th className='th-content th-headings'>READ</th>
                <th className='th-content th-headings'>WRITE</th>
                <th className='th-content th-headings'>EDIT</th>
              </tr>
            </thead>
            <tbody className='table-body'>
              <tr>
                <td className='td-content'>Full Permission</td>
                <td className='td-content'>
                <Switch {...label} />
                </td>
                <td className='td-content'>
                <Switch {...label} />
                </td>
                <td className='td-content'>
                  <Switch {...label} />
                </td>
                <td className='td-content'>
                  <Switch {...label} />
                </td>
              </tr>
              <tr>
              <td className='td-content Booking-table'  onClick={toggleDropdown}> <span>BOOKING</span>{isDropdownVisible ? (<span> <CiCircleChevUp className='table-up-down-icon'/>  </span>):(<span><CiCircleChevDown className='table-up-down-icon' /></span>)}

              
               </td>
              <td className='td-content'><input type="checkbox" /></td>
              <td className='td-content'><input type="checkbox" /></td>
              <td className='td-content'><input type="checkbox" /></td>
              <td className='td-content'><input type="checkbox" /></td>
              </tr>
            {isDropdownVisible && (
              <>
                  <tr>
                  <td className='td-content'>Booking</td>
                  <td className='td-content'><input type="checkbox" /></td>
                  <td className='td-content'><input type="checkbox" /></td>
                  <td className='td-content'><input type="checkbox" /></td>
                  <td className='td-content'><input type="checkbox" /></td>
                </tr>

                <tr>
                <td className='td-content'>Trip Status</td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                </tr>

                <tr>
                <td className='td-content'>Trip sheet</td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                </tr>

              </>

            
                 )}



              <tr onClick={togglebillingDropdown}>
                <td className='td-content  Booking-table'  ><span>BILLING</span>{isbillingDropdownVisible ? (<span> <CiCircleChevUp className='table-up-down-icon'/>  </span>):(<span><CiCircleChevDown className='table-up-down-icon' /></span>)}</td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
              </tr>


              {isbillingDropdownVisible && (
              <>
                  <tr>
                  <td className='td-content'>Billing</td>
                  <td className='td-content'><input type="checkbox" /></td>
                  <td className='td-content'><input type="checkbox" /></td>
                  <td className='td-content'><input type="checkbox" /></td>
                  <td className='td-content'><input type="checkbox" /></td>
                </tr>

                <tr>
                <td className='td-content'>Transfer</td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                </tr>

                <tr>
                <td className='td-content'>Covering Bill</td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                </tr>

              </>

            
                 )}












              <tr onClick={toggleregisterDropdown}>
                <td className='td-content Booking-table'  ><span>REGISTER</span>{isregisterDropdownVisible ? (<span> <CiCircleChevUp className='table-up-down-icon' />  </span>):(<span><CiCircleChevDown className='table-up-down-icon' /></span>)}</td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
              </tr>

              {isregisterDropdownVisible && (
              <>
                  <tr>
                  <td className='td-content'>Customer</td>
                  <td className='td-content'><input type="checkbox" /></td>
                  <td className='td-content'><input type="checkbox" /></td>
                  <td className='td-content'><input type="checkbox" /></td>
                  <td className='td-content'><input type="checkbox" /></td>
                </tr>

                <tr>
                <td className='td-content'>Supllier</td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                </tr>

                <tr>
                <td className='td-content'>Employee</td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                </tr>

              </>

            
                 )}




              <tr onClick={togglesettingDropdown}>
                <td className='td-content Booking-table'  ><span>REGISTER</span>{issettingDropdownVisible ? (<span> <CiCircleChevUp className='table-up-down-icon' />  </span>):(<span><CiCircleChevDown className='table-up-down-icon' /></span>)}</td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
              </tr>

              {issettingDropdownVisible && (
              <>
                  <tr>
                  <td className='td-content'>User Creation</td>
                  <td className='td-content'><input type="checkbox" /></td>
                  <td className='td-content'><input type="checkbox" /></td>
                  <td className='td-content'><input type="checkbox" /></td>
                  <td className='td-content'><input type="checkbox" /></td>
                </tr>

                <tr>
                <td className='td-content'>Station Creation</td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                </tr>

                <tr>
                <td className='td-content'>Main Setting</td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                </tr>

              </>

            
                 )}




              <tr onClick={toggleinfoDropdown}>
                <td className='td-content Booking-table'  ><span>Info</span>{isinfoDropdownVisible ? (<span> <CiCircleChevUp className='table-up-down-icon'  style={{color:'red'}}/>  </span>):(<span><CiCircleChevDown className='table-up-down-icon' /></span>)}</td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
              </tr>

              {isinfoDropdownVisible && (
              <>
                  <tr>
                  <td className='td-content'>Rate Type</td>
                  <td className='td-content'><input type="checkbox" /></td>
                  <td className='td-content'><input type="checkbox" /></td>
                  <td className='td-content'><input type="checkbox" /></td>
                  <td className='td-content'><input type="checkbox" /></td>
                </tr>

                <tr>
                <td className='td-content'>Mailers</td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                </tr>

                <tr>
                <td className='td-content'>Fuel Info</td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                </tr>

              </>

            
                 )}


            </tbody>
          </table>
        </div>
      </div>


  )
}
