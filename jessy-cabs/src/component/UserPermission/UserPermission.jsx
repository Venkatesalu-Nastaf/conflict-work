import React, { useState } from 'react'
import './UserPermission.css'
import Switch from '@mui/material/Switch';

export const UserPermission = ({ userid, permissionsData, handleSwitchChange, handleCheckboxChange, setReadState, readState, newState, modifyState, deleteState }) => {

  const [BOOKING, setBOOKING] = useState(false);
  const [BILLING, setBILLING] = useState(false);
  const [REGISTER, setREGISTER] = useState(false);
  const [SETTING, setSETTING] = useState(false);
  const [INFO, setINFO] = useState(false);


  const togglerow = (headdername) => {
    if (headdername === "BOOKING") {
      setBOOKING((prev) => !prev)
    } else if (headdername === "BILLING") {
      setBILLING((prev) => !prev)

    } else if (headdername === "REGISTER") {
      setREGISTER((prev) => !prev)

    } else if (headdername === "SETTING") {
      setSETTING((prev) => !prev)

    } else if (headdername === "INFO") {
      setINFO((prev) => !prev)
    }
  }


  return (

    <div className='permission-table'>
      <div className="table-containerr">
        <table>
          <thead>
            <tr className='table-header'>
              <th className='th-content'>PERMISSION</th>
              <th className='th-content th-headings'>READ</th>
              <th className='th-content th-headings'>NEW</th>
              <th className='th-content th-headings'>MODIFY</th>
              <th className='th-content th-headings'>DELETE</th>
            </tr>
          </thead>
          <tbody className='table-body'>
            <tr>
              <td className='td-content user-permission-table-title'>Full Permission</td>
              <td className='td-content'>
                <Switch checked={readState} onChange={handleSwitchChange('read')} />
              </td>
              <td className='td-content'>
                <Switch checked={newState} onChange={handleSwitchChange('new')} />
              </td>
              <td className='td-content'>
                <Switch checked={modifyState} onChange={handleSwitchChange('modify')} />
              </td>
              <td className='td-content'>
                <Switch checked={deleteState} onChange={handleSwitchChange('delete')} />

              </td>
            </tr>

            <tr className='user-permission-dashboard-row'>
              <td className='td-content Booking-table user-permission-table-title'>Dashbord </td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[20]?.read} onChange={handleCheckboxChange(20, 'read')} /></td>
            </tr>


            <tr >
              {/* <td className='td-content Booking-table' onClick={toggleDropdown}> <span>BOOKING</span>{isDropdownVisible ? (<span> <CiCircleChevUp className='table-up-down-icon' />  </span>) : (<span><CiCircleChevDown className='table-up-down-icon' /></span>)} */}
              <td className='td-content Booking-table user-permission-table-title' onClick={() => togglerow("BOOKING")}>BOOKING </td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[0]?.read} onChange={handleCheckboxChange(0, 'read')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[0]?.new} onChange={handleCheckboxChange(0, 'new')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[0]?.modify} onChange={handleCheckboxChange(0, 'modify')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[0]?.delete} onChange={handleCheckboxChange(0, 'delete')} /></td>
            </tr>

            {BOOKING && <>
              <tr>
                <td className='td-content'>Booking</td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[1]?.read} onChange={handleCheckboxChange(1, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[1]?.new} onChange={handleCheckboxChange(1, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[1]?.modify} onChange={handleCheckboxChange(1, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[1]?.delete} onChange={handleCheckboxChange(1, 'delete')} /></td>
              </tr>

              <tr>
                <td className='td-content'>Trip Status</td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[2]?.read} onChange={handleCheckboxChange(2, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[2]?.new} onChange={handleCheckboxChange(2, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[2]?.modify} onChange={handleCheckboxChange(2, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[2]?.delete} onChange={handleCheckboxChange(2, 'delete')} /></td>
              </tr>

              <tr>
                <td className='td-content'>Trip sheet</td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[3]?.read} onChange={handleCheckboxChange(3, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[3]?.new} onChange={handleCheckboxChange(3, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[3]?.modify} onChange={handleCheckboxChange(3, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[3]?.delete} onChange={handleCheckboxChange(3, 'delete')} /></td>
              </tr>
            </>}


            <tr >
              <td className='td-content Booking-table user-permission-table-title' onClick={() => togglerow("BILLING")}>BILLING </td>
              {/* <td className='td-content  Booking-table'  ><span>BILLING</span>{isbillingDropdownVisible ? (<span> <CiCircleChevUp className='table-up-down-icon' />  </span>) : (<span><CiCircleChevDown className='table-up-down-icon' /></span>)}</td> */}
              <td className='td-content'><input type="checkbox" checked={permissionsData[4]?.read} onChange={handleCheckboxChange(4, 'read')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[4]?.new} onChange={handleCheckboxChange(4, 'new')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[4]?.modify} onChange={handleCheckboxChange(4, 'modify')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[4]?.delete} onChange={handleCheckboxChange(4, 'delete')} /></td>
            </tr>

            {BILLING && <>
              <tr>
                <td className='td-content'>Billing</td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[5]?.read} onChange={handleCheckboxChange(5, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[5]?.new} onChange={handleCheckboxChange(5, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[5]?.modify} onChange={handleCheckboxChange(5, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[5]?.delete} onChange={handleCheckboxChange(5, 'delete')} /></td>
              </tr>

              <tr>
                <td className='td-content'>Transfer</td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[6]?.read} onChange={handleCheckboxChange(6, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[6]?.new} onChange={handleCheckboxChange(6, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[6]?.modify} onChange={handleCheckboxChange(6, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[6]?.delete} onChange={handleCheckboxChange(6, 'delete')} /></td>
              </tr>

              <tr>
                <td className='td-content'>Covering Bill</td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[7]?.read} onChange={handleCheckboxChange(7, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[7]?.new} onChange={handleCheckboxChange(7, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[7]?.modify} onChange={handleCheckboxChange(7, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[7]?.delete} onChange={handleCheckboxChange(7, 'delete')} /></td>
              </tr>

            </>}

            <tr >
              {/* <td className='td-content Booking-table'  ><span>REGISTER</span>{isregisterDropdownVisible ? (<span> <CiCircleChevUp className='table-up-down-icon' />  </span>) : (<span><CiCircleChevDown className='table-up-down-icon' /></span>)}</td> */}
              <td className='td-content Booking-table user-permission-table-title' onClick={() => togglerow("REGISTER")}>REGISTER </td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[8]?.read} onChange={handleCheckboxChange(8, 'read')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[8]?.new} onChange={handleCheckboxChange(8, 'new')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[8]?.modify} onChange={handleCheckboxChange(8, 'modify')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[8]?.delete} onChange={handleCheckboxChange(8, 'delete')} /></td>
            </tr>

            {REGISTER && <>
              <tr>
                <td className='td-content'>Customer</td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[9]?.read} onChange={handleCheckboxChange(9, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[9]?.new} onChange={handleCheckboxChange(9, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[9]?.modify} onChange={handleCheckboxChange(9, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[9]?.delete} onChange={handleCheckboxChange(9, 'delete')} /></td>
              </tr>

              <tr>
                <td className='td-content'>Supllier</td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[10]?.read} onChange={handleCheckboxChange(10, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[10]?.new} onChange={handleCheckboxChange(10, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[10]?.modify} onChange={handleCheckboxChange(10, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[10]?.delete} onChange={handleCheckboxChange(10, 'delete')} /></td>
              </tr>

              <tr>
                <td className='td-content'>Employee</td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[11]?.read} onChange={handleCheckboxChange(11, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[11]?.new} onChange={handleCheckboxChange(11, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[11]?.modify} onChange={handleCheckboxChange(11, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[11]?.delete} onChange={handleCheckboxChange(11, 'delete')} /></td>
              </tr>

            </>}


            <tr >
              {/* <td className='td-content Booking-table'  ><span>REGISTER</span>{issettingDropdownVisible ? (<span> <CiCircleChevUp className='table-up-down-icon' />  </span>) : (<span><CiCircleChevDown className='table-up-down-icon' /></span>)}</td> */}
              <td className='td-content user-permission-table-title' onClick={() => togglerow("SETTING")}>SETTING</td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[12]?.read} onChange={handleCheckboxChange(12, 'read')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[12]?.new} onChange={handleCheckboxChange(12, 'new')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[12]?.modify} onChange={handleCheckboxChange(12, 'modify')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[12]?.delete} onChange={handleCheckboxChange(12, 'delete')} /></td>
            </tr>

            {SETTING && <>
              <tr>
                <td className='td-content'>User Creation</td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[13]?.read} onChange={handleCheckboxChange(13, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[13]?.new} onChange={handleCheckboxChange(13, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[13]?.modify} onChange={handleCheckboxChange(13, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[13]?.delete} onChange={handleCheckboxChange(13, 'delete')} /></td>
              </tr>

              <tr>
                <td className='td-content'>Station Creation</td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[14]?.read} onChange={handleCheckboxChange(14, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[14]?.new} onChange={handleCheckboxChange(14, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[14]?.modify} onChange={handleCheckboxChange(14, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[14]?.delete} onChange={handleCheckboxChange(14, 'delete')} /></td>
              </tr>

              <tr>
                <td className='td-content'>Main Setting</td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[15]?.read} onChange={handleCheckboxChange(15, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[15]?.new} onChange={handleCheckboxChange(15, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[15]?.modify} onChange={handleCheckboxChange(15, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[15]?.delete} onChange={handleCheckboxChange(15, 'delete')} /></td>
              </tr>

            </>}



            <tr >
              {/* <td className='td-content Booking-table'  ><span>Info</span>{isinfoDropdownVisible ? (<span> <CiCircleChevUp className='table-up-down-icon' style={{ color: 'red' }} />  </span>) : (<span><CiCircleChevDown className='table-up-down-icon' /></span>)}</td> */}
              <td className='td-content user-permission-table-title' onClick={() => togglerow("INFO")}>INFO</td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[16]?.read} onChange={handleCheckboxChange(16, 'read')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[16]?.new} onChange={handleCheckboxChange(16, 'new')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[16]?.modify} onChange={handleCheckboxChange(16, 'modify')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[16]?.delete} onChange={handleCheckboxChange(16, 'delete')} /></td>
            </tr>

            {INFO && <>
              <tr>
                <td className='td-content'>Rate Type</td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[17]?.read} onChange={handleCheckboxChange(17, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[17]?.new} onChange={handleCheckboxChange(17, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[17]?.modify} onChange={handleCheckboxChange(17, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[17]?.delete} onChange={handleCheckboxChange(17, 'delete')} /></td>
              </tr>

              <tr>
                <td className='td-content'>Mailers</td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[18]?.read} onChange={handleCheckboxChange(18, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[18]?.new} onChange={handleCheckboxChange(18, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[18]?.modify} onChange={handleCheckboxChange(18, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[18]?.delete} onChange={handleCheckboxChange(18, 'delete')} /></td>
              </tr>

              <tr>
                <td className='td-content'>Fuel Info</td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[19]?.read} onChange={handleCheckboxChange(19, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[19]?.new} onChange={handleCheckboxChange(19, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[19]?.modify} onChange={handleCheckboxChange(19, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[19]?.delete} onChange={handleCheckboxChange(19, 'delete')} /></td>
              </tr>
            </>}
          </tbody>
        </table>
      </div>
    </div>
  )
}
