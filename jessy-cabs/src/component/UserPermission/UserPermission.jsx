import React, { useState } from 'react'
import './UserPermission.css'
import Switch from '@mui/material/Switch';
// import Checkbox from '@mui/material/Checkbox';
// import { BiSolidDownArrow } from "react-icons/bi";
// import { BiSolidUpArrow } from "react-icons/bi";

// import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";

// const label = { inputProps: { 'aria-label': 'Switch demo' } };
export const UserPermission = () => {



  // const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  // const [isbillingDropdownVisible, setIsbillingDropdownVisible] = useState(false);
  // const [isregisterDropdownVisible, setIsregisterDropdownVisible] = useState(false);
  // const [issettingDropdownVisible, setIssettingDropdownVisible] = useState(false);
  // const [isinfoDropdownVisible, setIsinfoDropdownVisible] = useState(false);

  // const toggleDropdown = () => {
  //   setIsDropdownVisible(!isDropdownVisible);
  //   setIsbillingDropdownVisible(false);
  // };

  // const togglebillingDropdown = () => {
  //   setIsbillingDropdownVisible(!isbillingDropdownVisible);
  //   setIsDropdownVisible(false);

  // };

  // const toggleregisterDropdown = () => {
  //   setIsregisterDropdownVisible(!isregisterDropdownVisible);
  //   setIsDropdownVisible(false);
  //   setIsbillingDropdownVisible(false);

  // };
  // const togglesettingDropdown = () => {
  //   setIssettingDropdownVisible(!issettingDropdownVisible);
  //   setIsDropdownVisible(false);
  //   setIsbillingDropdownVisible(false);

  // };

  // const toggleinfoDropdown = () => {
  //   setIsinfoDropdownVisible(!isinfoDropdownVisible);
  //   setIsDropdownVisible(false);
  //   setIsbillingDropdownVisible(false);

  // };

  // ayyanar--------------------------------------------

  const initialPermissionsData = [

    { id: 0, name: 'BOOKING', read: false, new: false, modify: false, delete: false },
    { id: 1, name: 'Booking', read: false, new: false, modify: false, delete: false },
    { id: 2, name: 'Trip Status', read: false, new: false, modify: false, delete: false },
    { id: 3, name: 'Trip sheet', read: false, new: false, modify: false, delete: false },
    { id: 4, name: 'BILLING', read: false, new: false, modify: false, delete: false },
    { id: 5, name: 'Billing', read: false, new: false, modify: false, delete: false },
    { id: 6, name: 'Transfer', read: false, new: false, modify: false, delete: false },
    { id: 7, name: 'Covering Bill', read: false, new: false, modify: false, delete: false },
    { id: 8, name: 'REGISTER', read: false, new: false, modify: false, delete: false },
    { id: 9, name: 'Customer', read: false, new: false, modify: false, delete: false },
    { id: 10, name: 'Supllier', read: false, new: false, modify: false, delete: false },
    { id: 11, name: 'Employee', read: false, new: false, modify: false, delete: false },
    { id: 12, name: 'REGISTER', read: false, new: false, modify: false, delete: false },
    { id: 13, name: 'User Creation', read: false, new: false, modify: false, delete: false },
    { id: 14, name: 'Station Creation', read: false, new: false, modify: false, delete: false },
    { id: 15, name: 'Main Setting', read: false, new: false, modify: false, delete: false },
    { id: 16, name: 'Info', read: false, new: false, modify: false, delete: false },
    { id: 17, name: 'Rate Type', read: false, new: false, modify: false, delete: false },
    { id: 18, name: 'Mailers', read: false, new: false, modify: false, delete: false },
    { id: 19, name: 'Fuel Info', read: false, new: false, modify: false, delete: false },

  ];

  const [permissionsData, setPermissionsData] = useState(initialPermissionsData);
  // console.log("permissionsData", permissionsData)


  // const handleCheckboxChange = (id, feild) => (event) => {
  //   const { checked } = event.target;
  //   setPermissionsData(prevData =>
  //     prevData.map(permission => {
  //       if (permission?.id === id) {
  //         return { ...permission, [feild]: checked }
  //       }
  //     })
  //   )
  // }

  // console.log("permissionsData", permissionsData[0]?.read)
  // console.log("permissionsData", permissionsData[0])



  // const handleSwitchChange = (permissionType) => (event) => {
  //   const { checked } = event.target;
  //   setPermissionsData(prevData =>
  //     prevData.map(permission => ({
  //       ...permission,
  //       [permissionType]: checked,
  //     }))
  //   );
  // };


  // const handleSwitchChange = (permissionType) => (checked) => {
  //   setPermissionsData(prevData =>
  //     prevData.map(permission => ({
  //       ...permission,
  //       [permissionType]: checked,
  //     }))
  //   );
  // };

  const handleSwitchChange = (permissionType) => (checked) => {
    console.log("per", permissionType)
    setPermissionsData(prevData =>
      prevData.map(permission => ({
        ...permission,
        [permissionType]: !permission[permissionType], // Toggle the state of the permission type
      }))
    );
  };

  const handleCheckboxChange = (id, field) => (event) => {
    const { checked } = event.target;
    setPermissionsData(prevData =>
      prevData.map(permission => {
        if (permission.id === id) {
          return { ...permission, [field]: checked };
        }
        return permission;
      })
    );
  };



  //-----------------------------------------------------

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
              <td className='td-content'>Full Permission</td>
              <td className='td-content'>
                <Switch checked={permissionsData?.read} onChange={handleSwitchChange('read')} />
              </td>
              <td className='td-content'>
                <Switch checked={permissionsData?.new} onChange={handleSwitchChange('new')} />
              </td>
              <td className='td-content'>
                <Switch checked={permissionsData?.modify} onChange={handleSwitchChange('modify')} />
              </td>
              <td className='td-content'>
                <Switch checked={permissionsData?.delete} onChange={handleSwitchChange('delete')} />

              </td>
            </tr>
            <tr >
              {/* <td className='td-content Booking-table' onClick={toggleDropdown}> <span>BOOKING</span>{isDropdownVisible ? (<span> <CiCircleChevUp className='table-up-down-icon' />  </span>) : (<span><CiCircleChevDown className='table-up-down-icon' /></span>)} */}
              <td className='td-content Booking-table'>BOOKING </td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[0]?.read} onChange={handleCheckboxChange(permissionsData[0]?.id, 'read')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[0]?.new} onChange={handleCheckboxChange(permissionsData[0]?.id, 'new')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[0]?.modify} onChange={handleCheckboxChange(permissionsData[0]?.id, 'modify')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[0]?.delete} onChange={handleCheckboxChange(permissionsData[0]?.id, 'delete')} /></td>
            </tr>

            <>
              <tr>
                <td className='td-content'>Booking</td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[1]?.read} onChange={handleCheckboxChange(permissionsData[1]?.id, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[1]?.new} onChange={handleCheckboxChange(permissionsData[1]?.id, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[1]?.modify} onChange={handleCheckboxChange(permissionsData[1]?.id, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[1]?.delete} onChange={handleCheckboxChange(permissionsData[1]?.id, 'delete')} /></td>
              </tr>

              <tr>
                <td className='td-content'>Trip Status</td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[2]?.read} onChange={handleCheckboxChange(permissionsData[2]?.id, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[2]?.new} onChange={handleCheckboxChange(permissionsData[2]?.id, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[2]?.modify} onChange={handleCheckboxChange(permissionsData[2]?.id, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[2]?.delete} onChange={handleCheckboxChange(permissionsData[2]?.id, 'delete')} /></td>
              </tr>

              <tr>
                <td className='td-content'>Trip sheet</td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[3]?.read} onChange={handleCheckboxChange(permissionsData[3]?.id, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[3]?.new} onChange={handleCheckboxChange(permissionsData[3]?.id, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[3]?.modify} onChange={handleCheckboxChange(permissionsData[3]?.id, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[3]?.delete} onChange={handleCheckboxChange(permissionsData[3]?.id, 'delete')} /></td>
              </tr>
            </>



            <tr >
              <td className='td-content Booking-table'>BILLING </td>
              {/* <td className='td-content  Booking-table'  ><span>BILLING</span>{isbillingDropdownVisible ? (<span> <CiCircleChevUp className='table-up-down-icon' />  </span>) : (<span><CiCircleChevDown className='table-up-down-icon' /></span>)}</td> */}
              <td className='td-content'><input type="checkbox" checked={permissionsData[4]?.read} onChange={handleCheckboxChange(permissionsData[4]?.id, 'read')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[4]?.new} onChange={handleCheckboxChange(permissionsData[4]?.id, 'new')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[4]?.modify} onChange={handleCheckboxChange(permissionsData[4]?.id, 'modify')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[4]?.delete} onChange={handleCheckboxChange(permissionsData[4]?.id, 'delete')} /></td>
            </tr>


            {/* {isbillingDropdownVisible && ( */}
            <>
              <tr>
                <td className='td-content'>Billing</td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[5]?.read} onChange={handleCheckboxChange(permissionsData[5]?.id, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[5]?.new} onChange={handleCheckboxChange(permissionsData[5]?.id, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[5]?.modify} onChange={handleCheckboxChange(permissionsData[5]?.id, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[5]?.delete} onChange={handleCheckboxChange(permissionsData[5]?.id, 'delete')} /></td>
              </tr>

              <tr>
                <td className='td-content'>Transfer</td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[6]?.read} onChange={handleCheckboxChange(permissionsData[6]?.id, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[6]?.new} onChange={handleCheckboxChange(permissionsData[6]?.id, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[6]?.modify} onChange={handleCheckboxChange(permissionsData[6]?.id, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[6]?.delete} onChange={handleCheckboxChange(permissionsData[6]?.id, 'delete')} /></td>
              </tr>

              <tr>
                <td className='td-content'>Covering Bill</td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[7]?.read} onChange={handleCheckboxChange(permissionsData[7]?.id, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[7]?.new} onChange={handleCheckboxChange(permissionsData[7]?.id, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[7]?.modify} onChange={handleCheckboxChange(permissionsData[7]?.id, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[7]?.delete} onChange={handleCheckboxChange(permissionsData[7]?.id, 'delete')} /></td>
              </tr>

            </>
            {/* )} */}

            <tr >
              {/* <td className='td-content Booking-table'  ><span>REGISTER</span>{isregisterDropdownVisible ? (<span> <CiCircleChevUp className='table-up-down-icon' />  </span>) : (<span><CiCircleChevDown className='table-up-down-icon' /></span>)}</td> */}
              <td className='td-content Booking-table'>REGISTER </td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[8]?.read} onChange={handleCheckboxChange(permissionsData[8]?.id, 'read')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[8]?.new} onChange={handleCheckboxChange(permissionsData[8]?.id, 'new')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[8]?.modify} onChange={handleCheckboxChange(permissionsData[8]?.id, 'modify')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[8]?.delete} onChange={handleCheckboxChange(permissionsData[8]?.id, 'delete')} /></td>
            </tr>

            {/* {isregisterDropdownVisible && ( */}
            <>
              <tr>
                <td className='td-content'>Customer</td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[9]?.read} onChange={handleCheckboxChange(permissionsData[9]?.id, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[9]?.new} onChange={handleCheckboxChange(permissionsData[9]?.id, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[9]?.modify} onChange={handleCheckboxChange(permissionsData[9]?.id, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[9]?.delete} onChange={handleCheckboxChange(permissionsData[9]?.id, 'delete')} /></td>
              </tr>

              <tr>
                <td className='td-content'>Supllier</td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[10]?.read} onChange={handleCheckboxChange(permissionsData[10]?.id, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[10]?.new} onChange={handleCheckboxChange(permissionsData[10]?.id, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[10]?.modify} onChange={handleCheckboxChange(permissionsData[10]?.id, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[10]?.delete} onChange={handleCheckboxChange(permissionsData[10]?.id, 'delete')} /></td>
              </tr>

              <tr>
                <td className='td-content'>Employee</td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[11]?.read} onChange={handleCheckboxChange(permissionsData[11]?.id, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[11]?.new} onChange={handleCheckboxChange(permissionsData[11]?.id, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[11]?.modify} onChange={handleCheckboxChange(permissionsData[11]?.id, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[11]?.delete} onChange={handleCheckboxChange(permissionsData[11]?.id, 'delete')} /></td>
              </tr>

            </>
            {/* )} */}

            <tr >
              {/* <td className='td-content Booking-table'  ><span>REGISTER</span>{issettingDropdownVisible ? (<span> <CiCircleChevUp className='table-up-down-icon' />  </span>) : (<span><CiCircleChevDown className='table-up-down-icon' /></span>)}</td> */}
              <td className='td-content'>REGISTER</td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[12]?.read} onChange={handleCheckboxChange(permissionsData[12]?.id, 'read')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[12]?.new} onChange={handleCheckboxChange(permissionsData[12]?.id, 'new')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[12]?.modify} onChange={handleCheckboxChange(permissionsData[12]?.id, 'modify')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[12]?.delete} onChange={handleCheckboxChange(permissionsData[12]?.id, 'delete')} /></td>
            </tr>

            {/* {issettingDropdownVisible && ( */}
            <>
              <tr>
                <td className='td-content'>User Creation</td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[13]?.read} onChange={handleCheckboxChange(permissionsData[13]?.id, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[13]?.new} onChange={handleCheckboxChange(permissionsData[13]?.id, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[13]?.modify} onChange={handleCheckboxChange(permissionsData[13]?.id, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[13]?.delete} onChange={handleCheckboxChange(permissionsData[13]?.id, 'delete')} /></td>
              </tr>

              <tr>
                <td className='td-content'>Station Creation</td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[14]?.read} onChange={handleCheckboxChange(permissionsData[14]?.id, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[14]?.new} onChange={handleCheckboxChange(permissionsData[14]?.id, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[14]?.modify} onChange={handleCheckboxChange(permissionsData[14]?.id, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[14]?.delete} onChange={handleCheckboxChange(permissionsData[14]?.id, 'delete')} /></td>
              </tr>

              <tr>
                <td className='td-content'>Main Setting</td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[15]?.read} onChange={handleCheckboxChange(permissionsData[15]?.id, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[15]?.new} onChange={handleCheckboxChange(permissionsData[15]?.id, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[15]?.modify} onChange={handleCheckboxChange(permissionsData[15]?.id, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[15]?.delete} onChange={handleCheckboxChange(permissionsData[15]?.id, 'delete')} /></td>
              </tr>

            </>
            {/* )} */}

            <tr >
              {/* <td className='td-content Booking-table'  ><span>Info</span>{isinfoDropdownVisible ? (<span> <CiCircleChevUp className='table-up-down-icon' style={{ color: 'red' }} />  </span>) : (<span><CiCircleChevDown className='table-up-down-icon' /></span>)}</td> */}
              <td className='td-content'>Info</td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[16]?.read} onChange={handleCheckboxChange(permissionsData[16]?.id, 'read')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[16]?.new} onChange={handleCheckboxChange(permissionsData[16]?.id, 'new')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[16]?.modify} onChange={handleCheckboxChange(permissionsData[16]?.id, 'modify')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[16]?.delete} onChange={handleCheckboxChange(permissionsData[16]?.id, 'delete')} /></td>
            </tr>

            {/* {isinfoDropdownVisible && ( */}
            <>
              <tr>
                <td className='td-content'>Rate Type</td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[17]?.read} onChange={handleCheckboxChange(permissionsData[17]?.id, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[17]?.new} onChange={handleCheckboxChange(permissionsData[17]?.id, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[17]?.modify} onChange={handleCheckboxChange(permissionsData[17]?.id, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[17]?.delete} onChange={handleCheckboxChange(permissionsData[17]?.id, 'delete')} /></td>
              </tr>

              <tr>
                <td className='td-content'>Mailers</td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[18]?.read} onChange={handleCheckboxChange(permissionsData[18]?.id, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[18]?.new} onChange={handleCheckboxChange(permissionsData[18]?.id, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[18]?.modify} onChange={handleCheckboxChange(permissionsData[18]?.id, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[18]?.delete} onChange={handleCheckboxChange(permissionsData[18]?.id, 'delete')} /></td>
              </tr>

              <tr>
                <td className='td-content'>Fuel Info</td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[19]?.read} onChange={handleCheckboxChange(permissionsData[19]?.id, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[19]?.new} onChange={handleCheckboxChange(permissionsData[19]?.id, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[19]?.modify} onChange={handleCheckboxChange(permissionsData[19]?.id, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[19]?.delete} onChange={handleCheckboxChange(permissionsData[19]?.id, 'delete')} /></td>
              </tr>
            </>
            {/* )} */}

          </tbody>
        </table>
      </div>
    </div>


  )
}
