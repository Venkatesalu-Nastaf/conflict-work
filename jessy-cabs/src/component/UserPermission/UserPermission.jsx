// import React, { useState } from 'react'
// import './UserPermission.css'
// import Switch from '@mui/material/Switch';
// import { FaChevronUp, FaChevronDown } from "react-icons/fa";
// const label = { inputProps: { 'aria-label': 'Switch demo' } };


// export const UserPermission = ({ userid, permissionsData, handleSwitchChange, handleCheckboxChange, setReadState, readState, newState, modifyState, deleteState,handleSwitchforthatrow,handleSwitchforallrows }) => {

//   const [BOOKING, setBOOKING] = useState(false);
//   const [BILLING, setBILLING] = useState(false);
//   const [REGISTER, setREGISTER] = useState(false);
//   const [SETTING, setSETTING] = useState(false);
//   const [INFO, setINFO] = useState(false);
//   const [MAP, setMAP] = useState(false);



//   const togglerow = (headdername) => {
//     if (headdername === "BOOKING") {
//       setBOOKING((prev) => !prev);
//     } else if (headdername === "BILLING") {
//       setBILLING((prev) => !prev)

//     } else if (headdername === "REGISTER") {
//       setREGISTER((prev) => !prev)

//     } else if (headdername === "SETTING") {
//       setSETTING((prev) => !prev)

//     } else if (headdername === "INFO") {
//       setINFO((prev) => !prev)
//     }
//     else if (headdername === "MAP") {
//       setMAP((prev) => !prev)
//     }

//   }


//   return (

//     <div className='permission-table'>
//       <div className="table-containerr">
//         <table>
//           <thead>
//             <tr className='table-header'>
//               <th className='th-content'>PERMISSION</th>
//               <th className='th-content th-headings'>READ</th>
//               <th className='th-content th-headings'>NEW</th>
//               <th className='th-content th-headings'>MODIFY</th>
//               <th className='th-content th-headings'>DELETE</th>
//             </tr>
//           </thead>
//           <tbody className='table-body'>
//             <tr className='user-permission-even-no-rows'>
//               <td className='td-content user-permission-table-title user-permission-table-first-row'>Full Permission</td>
//               <td className='td-content user-permission-table-first-row'>
//                 <Switch checked={readState} onChange={handleSwitchChange('read')} />
//               </td>
//               <td className='td-content user-permission-table-first-row'>
//                 <Switch checked={newState} onChange={handleSwitchChange('new')} />
//               </td>
//               <td className='td-content user-permission-table-first-row'>
//                 <Switch checked={modifyState} onChange={handleSwitchChange('modify')} />
//               </td>
//               <td className='td-content user-permission-table-first-row'>
//                 <Switch checked={deleteState} onChange={handleSwitchChange('delete')} />
//               </td>
//             </tr>

//             <tr className='user-permission-dashboard-row'>
//               <td className='td-content Booking-table user-permission-table-title'>Dashbord </td>
//               <td className='td-content'><input type="checkbox" checked={permissionsData[20]?.read} onChange={handleCheckboxChange(20, 'read')} /></td>
//             </tr>


//             <tr className='user-permission-even-no-rows'>
//               {/* <td className='td-content Booking-table' onClick={toggleDropdown}> <span>BOOKING</span>{isDropdownVisible ? (<span> <CiCircleChevUp className='table-up-down-icon' />  </span>) : (<span><CiCircleChevDown className='table-up-down-icon' /></span>)} */}
//               <td className='td-content Booking-table user-permission-table-title' onClick={() => togglerow("BOOKING")}>BOOKING {BOOKING ? (<span> <FaChevronUp /> </span>) : (<span><FaChevronDown /></span> )}</td> <td> <Switch
// checked={permissionsData[0]?.read && permissionsData[1]?.read && permissionsData[2]?.read && permissionsData[3]?.read}  onChange={handleSwitchforallrows(0,3)}
//   inputProps={{ 'aria-label': 'controlled' }}
// /> </td>
//               <td className='td-content'><input type="checkbox" checked={permissionsData[0]?.read} onChange={handleCheckboxChange(0, 'read')} /></td>
//               <td className='td-content'><input type="checkbox" checked={permissionsData[0]?.new} onChange={handleCheckboxChange(0, 'new')} /></td>
//               <td className='td-content'><input type="checkbox" checked={permissionsData[0]?.modify} onChange={handleCheckboxChange(0, 'modify')} /></td>
//               <td className='td-content'><input type="checkbox" checked={permissionsData[0]?.delete} onChange={handleCheckboxChange(0, 'delete')} /></td>
//             </tr>

//             {BOOKING && <>
//               <tr className='user-permission-even-no-rows'>
//                 <td className='td-content'>Booking <Switch
// checked={permissionsData[1]?.read && permissionsData[1]?.new && permissionsData[1]?.modify && permissionsData[1]?.delete}  onChange={handleSwitchforthatrow(1)}
//   inputProps={{ 'aria-label': 'controlled' }}
// />
//                   {/* <input type="checkbox" checked={permissionsData[1]?.read && permissionsData[1]?.new && permissionsData[1]?.modify && permissionsData[1]?.delete}  onChange={handleSwitchforthatrow(1)} /> */}
//                   </td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[1]?.read} onChange={handleCheckboxChange(1, 'read')} />
//                 </td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[1]?.new} onChange={handleCheckboxChange(1, 'new')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[1]?.modify} onChange={handleCheckboxChange(1, 'modify')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[1]?.delete} onChange={handleCheckboxChange(1, 'delete')} /></td>
//               </tr>

//               <tr className='user-permission-even-no-rows'>
//                 <td className='td-content'>Trip Status  <Switch
// checked={permissionsData[2]?.read && permissionsData[2]?.new && permissionsData[2]?.modify && permissionsData[2]?.delete}  onChange={handleSwitchforthatrow(2)}
//   inputProps={{ 'aria-label': 'controlled' }}
// /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[2]?.read} onChange={handleCheckboxChange(2, 'read')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[2]?.new} onChange={handleCheckboxChange(2, 'new')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[2]?.modify} onChange={handleCheckboxChange(2, 'modify')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[2]?.delete} onChange={handleCheckboxChange(2, 'delete')} /></td>
//               </tr>

//               <tr className='user-permission-even-no-rows'>
//                 <td className='td-content'>Trip sheet  <Switch
// checked={permissionsData[3]?.read && permissionsData[3]?.new && permissionsData[3]?.modify && permissionsData[3]?.delete}  onChange={handleSwitchforthatrow(3)}
//   inputProps={{ 'aria-label': 'controlled' }}
// /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[3]?.read} onChange={handleCheckboxChange(3, 'read')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[3]?.new} onChange={handleCheckboxChange(3, 'new')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[3]?.modify} onChange={handleCheckboxChange(3, 'modify')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[3]?.delete} onChange={handleCheckboxChange(3, 'delete')} /></td>
//               </tr>
//             </>}


//             <tr >
//               <td className='td-content Booking-table user-permission-table-title' onClick={() => togglerow("BILLING")}>BILLING {BILLING ? (<span> <FaChevronUp /> </span>) : (<span><FaChevronDown /></span>)}</td>
//               <td> <Switch
// checked={permissionsData[4]?.read && permissionsData[5]?.read && permissionsData[6]?.read && permissionsData[7]?.read}  onChange={handleSwitchforallrows(4,7)}
//   inputProps={{ 'aria-label': 'controlled' }}
// /> </td>
//               {/* <td className='td-content  Booking-table'  ><span>BILLING</span>{isbillingDropdownVisible ? (<span> <CiCircleChevUp className='table-up-down-icon' />  </span>) : (<span><CiCircleChevDown className='table-up-down-icon' /></span>)}</td> */}
//               <td className='td-content'><input type="checkbox" checked={permissionsData[4]?.read} onChange={handleCheckboxChange(4, 'read')} /></td>
//               <td className='td-content'><input type="checkbox" checked={permissionsData[4]?.new} onChange={handleCheckboxChange(4, 'new')} /></td>
//               <td className='td-content'><input type="checkbox" checked={permissionsData[4]?.modify} onChange={handleCheckboxChange(4, 'modify')} /></td>
//               <td className='td-content'><input type="checkbox" checked={permissionsData[4]?.delete} onChange={handleCheckboxChange(4, 'delete')} /></td>
//             </tr>

//             {BILLING && <>
//               <tr>
//                 <td className='td-content'>Billing <Switch
// checked={permissionsData[5]?.read && permissionsData[5]?.new && permissionsData[5]?.modify && permissionsData[5]?.delete}  onChange={handleSwitchforthatrow(5)}
//   inputProps={{ 'aria-label': 'controlled' }}
// /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[5]?.read} onChange={handleCheckboxChange(5, 'read')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[5]?.new} onChange={handleCheckboxChange(5, 'new')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[5]?.modify} onChange={handleCheckboxChange(5, 'modify')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[5]?.delete} onChange={handleCheckboxChange(5, 'delete')} /></td>
//               </tr>

//               <tr>
//                 <td className='td-content'>Transfer <Switch
// checked={permissionsData[6]?.read && permissionsData[6]?.new && permissionsData[6]?.modify && permissionsData[6]?.delete}  onChange={handleSwitchforthatrow(6)}
//   inputProps={{ 'aria-label': 'controlled' }}
// /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[6]?.read} onChange={handleCheckboxChange(6, 'read')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[6]?.new} onChange={handleCheckboxChange(6, 'new')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[6]?.modify} onChange={handleCheckboxChange(6, 'modify')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[6]?.delete} onChange={handleCheckboxChange(6, 'delete')} /></td>
//               </tr>

//               <tr>
//                 <td className='td-content'>Covering Bill <Switch
// checked={permissionsData[7]?.read && permissionsData[7]?.new && permissionsData[7]?.modify && permissionsData[7]?.delete}  onChange={handleSwitchforthatrow(7)}
//   inputProps={{ 'aria-label': 'controlled' }}
// /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[7]?.read} onChange={handleCheckboxChange(7, 'read')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[7]?.new} onChange={handleCheckboxChange(7, 'new')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[7]?.modify} onChange={handleCheckboxChange(7, 'modify')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[7]?.delete} onChange={handleCheckboxChange(7, 'delete')} /></td>
//               </tr>

//             </>}

//             <tr className='user-permission-even-no-rows'>
//               {/* <td className='td-content Booking-table'  ><span>REGISTER</span>{isregisterDropdownVisible ? (<span> <CiCircleChevUp className='table-up-down-icon' />  </span>) : (<span><CiCircleChevDown className='table-up-down-icon' /></span>)}</td> */}
//               <td className='td-content Booking-table user-permission-table-title' onClick={() => togglerow("REGISTER")}>REGISTER {REGISTER ? (<span> <FaChevronUp /> </span>) : (<span><FaChevronDown /></span>)}</td>
//               <td> <Switch
// checked={permissionsData[8]?.read && permissionsData[9]?.read && permissionsData[10]?.read && permissionsData[11]?.read}  onChange={handleSwitchforallrows(8,11)}
//   inputProps={{ 'aria-label': 'controlled' }}
// /> </td>
//               <td className='td-content'><input type="checkbox" checked={permissionsData[8]?.read} onChange={handleCheckboxChange(8, 'read')} /></td>
//               <td className='td-content'><input type="checkbox" checked={permissionsData[8]?.new} onChange={handleCheckboxChange(8, 'new')} /></td>
//               <td className='td-content'><input type="checkbox" checked={permissionsData[8]?.modify} onChange={handleCheckboxChange(8, 'modify')} /></td>
//               <td className='td-content'><input type="checkbox" checked={permissionsData[8]?.delete} onChange={handleCheckboxChange(8, 'delete')} /></td>
//             </tr>

//             {REGISTER && <>
//               <tr className='user-permission-even-no-rows'>
//                 <td className='td-content'>Customer <Switch
// checked={permissionsData[9]?.read && permissionsData[9]?.new && permissionsData[9]?.modify && permissionsData[9]?.delete}  onChange={handleSwitchforthatrow(9)}
//   inputProps={{ 'aria-label': 'controlled' }}
// /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[9]?.read} onChange={handleCheckboxChange(9, 'read')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[9]?.new} onChange={handleCheckboxChange(9, 'new')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[9]?.modify} onChange={handleCheckboxChange(9, 'modify')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[9]?.delete} onChange={handleCheckboxChange(9, 'delete')} /></td>
//               </tr>

//               <tr className='user-permission-even-no-rows'>
//                 <td className='td-content'>Supllier <Switch
// checked={permissionsData[10]?.read && permissionsData[10]?.new && permissionsData[10]?.modify && permissionsData[10]?.delete}  onChange={handleSwitchforthatrow(10)}
//   inputProps={{ 'aria-label': 'controlled' }}
// /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[10]?.read} onChange={handleCheckboxChange(10, 'read')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[10]?.new} onChange={handleCheckboxChange(10, 'new')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[10]?.modify} onChange={handleCheckboxChange(10, 'modify')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[10]?.delete} onChange={handleCheckboxChange(10, 'delete')} /></td>
//               </tr>

//               <tr className='user-permission-even-no-rows'>
//                 <td className='td-content'>Employee <Switch
// checked={permissionsData[11]?.read && permissionsData[11]?.new && permissionsData[11]?.modify && permissionsData[11]?.delete}  onChange={handleSwitchforthatrow(11)}
//   inputProps={{ 'aria-label': 'controlled' }}
// /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[11]?.read} onChange={handleCheckboxChange(11, 'read')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[11]?.new} onChange={handleCheckboxChange(11, 'new')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[11]?.modify} onChange={handleCheckboxChange(11, 'modify')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[11]?.delete} onChange={handleCheckboxChange(11, 'delete')} /></td>
//               </tr>

//             </>}


//             <tr >
//               {/* <td className='td-content Booking-table'  ><span>REGISTER</span>{issettingDropdownVisible ? (<span> <CiCircleChevUp className='table-up-down-icon' />  </span>) : (<span><CiCircleChevDown className='table-up-down-icon' /></span>)}</td> */}
//               <td className='td-content user-permission-table-title' onClick={() => togglerow("SETTING")}>SETTING {SETTING ? (<span> <FaChevronUp /> </span>) : (<span><FaChevronDown /></span>)}</td>
//               <td> <Switch
// checked={permissionsData[12]?.read && permissionsData[13]?.read && permissionsData[14]?.read && permissionsData[15]?.read}  onChange={handleSwitchforallrows(12,15)}
//   inputProps={{ 'aria-label': 'controlled' }}
// /> </td>
//               <td className='td-content'><input type="checkbox" checked={permissionsData[12]?.read} onChange={handleCheckboxChange(12, 'read')} /></td>
//               <td className='td-content'><input type="checkbox" checked={permissionsData[12]?.new} onChange={handleCheckboxChange(12, 'new')} /></td>
//               <td className='td-content'><input type="checkbox" checked={permissionsData[12]?.modify} onChange={handleCheckboxChange(12, 'modify')} /></td>
//               <td className='td-content'><input type="checkbox" checked={permissionsData[12]?.delete} onChange={handleCheckboxChange(12, 'delete')} /></td>
//             </tr>

//             {SETTING && <>
//               <tr>
//                 <td className='td-content'>User Creation <Switch
// checked={permissionsData[13]?.read && permissionsData[13]?.new && permissionsData[13]?.modify && permissionsData[13]?.delete}  onChange={handleSwitchforthatrow(13)}
//   inputProps={{ 'aria-label': 'controlled' }}
// /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[13]?.read} onChange={handleCheckboxChange(13, 'read')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[13]?.new} onChange={handleCheckboxChange(13, 'new')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[13]?.modify} onChange={handleCheckboxChange(13, 'modify')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[13]?.delete} onChange={handleCheckboxChange(13, 'delete')} /></td>
//               </tr>

//               <tr>
//                 <td className='td-content'>Station Creation <Switch
// checked={permissionsData[14]?.read && permissionsData[14]?.new && permissionsData[14]?.modify && permissionsData[14]?.delete}  onChange={handleSwitchforthatrow(14)}
//   inputProps={{ 'aria-label': 'controlled' }}
// /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[14]?.read} onChange={handleCheckboxChange(14, 'read')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[14]?.new} onChange={handleCheckboxChange(14, 'new')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[14]?.modify} onChange={handleCheckboxChange(14, 'modify')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[14]?.delete} onChange={handleCheckboxChange(14, 'delete')} /></td>
//               </tr>

//               <tr>
//                 <td className='td-content'>Main Setting <Switch
// checked={permissionsData[15]?.read && permissionsData[15]?.new && permissionsData[15]?.modify && permissionsData[15]?.delete}  onChange={handleSwitchforthatrow(15)}
//   inputProps={{ 'aria-label': 'controlled' }}
// /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[15]?.read} onChange={handleCheckboxChange(15, 'read')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[15]?.new} onChange={handleCheckboxChange(15, 'new')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[15]?.modify} onChange={handleCheckboxChange(15, 'modify')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[15]?.delete} onChange={handleCheckboxChange(15, 'delete')} /></td>
//               </tr>

//             </>}



//             <tr className='user-permission-even-no-rows'>
//               {/* <td className='td-content Booking-table'  ><span>Info</span>{isinfoDropdownVisible ? (<span> <CiCircleChevUp className='table-up-down-icon' style={{ color: 'red' }} />  </span>) : (<span><CiCircleChevDown className='table-up-down-icon' /></span>)}</td> */}
//               <td className='td-content user-permission-table-title' onClick={() => togglerow("INFO")}>INFO {INFO ? (<span> <FaChevronUp /> </span>) : (<span><FaChevronDown /></span>)}</td>
//               <td> <Switch
// checked={permissionsData[16]?.read && permissionsData[17]?.read && permissionsData[18]?.read && permissionsData[19]?.read}  onChange={handleSwitchforallrows(16,19)}
//   inputProps={{ 'aria-label': 'controlled' }}
// /> </td>
//               <td className='td-content'><input type="checkbox" checked={permissionsData[16]?.read} onChange={handleCheckboxChange(16, 'read')} /></td>
//               <td className='td-content'><input type="checkbox" checked={permissionsData[16]?.new} onChange={handleCheckboxChange(16, 'new')} /></td>
//               <td className='td-content'><input type="checkbox" checked={permissionsData[16]?.modify} onChange={handleCheckboxChange(16, 'modify')} /></td>
//               <td className='td-content'><input type="checkbox" checked={permissionsData[16]?.delete} onChange={handleCheckboxChange(16, 'delete')} /></td>
//             </tr>

//             {INFO && <>
//               <tr className='user-permission-even-no-rows'>
//                 <td className='td-content'>Rate Type <Switch
// checked={permissionsData[17]?.read && permissionsData[17]?.new && permissionsData[17]?.modify && permissionsData[17]?.delete}  onChange={handleSwitchforthatrow(17)}
//   inputProps={{ 'aria-label': 'controlled' }}
// /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[17]?.read} onChange={handleCheckboxChange(17, 'read')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[17]?.new} onChange={handleCheckboxChange(17, 'new')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[17]?.modify} onChange={handleCheckboxChange(17, 'modify')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[17]?.delete} onChange={handleCheckboxChange(17, 'delete')} /></td>
//               </tr>

//               <tr className='user-permission-even-no-rows'>
//                 <td className='td-content'>Mailers  <Switch
// checked={permissionsData[18]?.read && permissionsData[18]?.new && permissionsData[18]?.modify && permissionsData[18]?.delete}  onChange={handleSwitchforthatrow(18)}
//   inputProps={{ 'aria-label': 'controlled' }}
// /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[18]?.read} onChange={handleCheckboxChange(18, 'read')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[18]?.new} onChange={handleCheckboxChange(18, 'new')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[18]?.modify} onChange={handleCheckboxChange(18, 'modify')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[18]?.delete} onChange={handleCheckboxChange(18, 'delete')} /></td>
//               </tr>

//               <tr className='user-permission-even-no-rows'>
//                 <td className='td-content'>Fuel Info <Switch
// checked={permissionsData[19]?.read && permissionsData[19]?.new && permissionsData[19]?.modify && permissionsData[19]?.delete}  onChange={handleSwitchforthatrow(19)}
//   inputProps={{ 'aria-label': 'controlled' }}
// /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[19]?.read} onChange={handleCheckboxChange(19, 'read')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[19]?.new} onChange={handleCheckboxChange(19, 'new')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[19]?.modify} onChange={handleCheckboxChange(19, 'modify')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[19]?.delete} onChange={handleCheckboxChange(19, 'delete')} /></td>
//               </tr>

//             </>

//             }

// <tr className='user-permission-even-no-rows'>
//               {/* <td className='td-content Booking-table'  ><span>Info</span>{isinfoDropdownVisible ? (<span> <CiCircleChevUp className='table-up-down-icon' style={{ color: 'red' }} />  </span>) : (<span><CiCircleChevDown className='table-up-down-icon' /></span>)}</td> */}
//               <td className='td-content user-permission-table-title' onClick={() => togglerow("MAP")}>MAP {MAP ? (<span> <FaChevronUp /> </span>) : (<span><FaChevronDown /></span>)}</td>
//               <td> <Switch
// checked={permissionsData[21]?.read && permissionsData[22]?.read && permissionsData[23]?.read}  onChange={handleSwitchforallrows(21,26)}
//   inputProps={{ 'aria-label': 'controlled' }}
// /> </td>
//               <td className='td-content'><input type="checkbox" checked={permissionsData[21]?.read} onChange={handleCheckboxChange(21, 'read')} /></td>
//               <td className='td-content'><input type="checkbox" checked={permissionsData[21]?.new} onChange={handleCheckboxChange(21, 'new')} /></td>
//               <td className='td-content'><input type="checkbox" checked={permissionsData[21]?.modify} onChange={handleCheckboxChange(21, 'modify')} /></td>
//               <td className='td-content'><input type="checkbox" checked={permissionsData[21]?.delete} onChange={handleCheckboxChange(21, 'delete')} /></td>
//             </tr>
//             {MAP && <>

//               <tr className='user-permission-even-no-rows'>
//                 <td className='td-content'>RealTime<Switch
// checked={permissionsData[22]?.read && permissionsData[22]?.new && permissionsData[22]?.modify && permissionsData[22]?.delete}  onChange={handleSwitchforthatrow(22)}
//   inputProps={{ 'aria-label': 'controlled' }}
// /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[22]?.read} onChange={handleCheckboxChange(22, 'read')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[22]?.new} onChange={handleCheckboxChange(22, 'new')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[22]?.modify} onChange={handleCheckboxChange(22, 'modify')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[22]?.delete} onChange={handleCheckboxChange(22, 'delete')} /></td>
//               </tr>
//               <tr className='user-permission-even-no-rows'>
//                 <td className='td-content'>Vehicle<Switch
// checked={permissionsData[23]?.read && permissionsData[23]?.new && permissionsData[23]?.modify && permissionsData[23]?.delete}  onChange={handleSwitchforthatrow(23)}
//   inputProps={{ 'aria-label': 'controlled' }}
// /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[23]?.read} onChange={handleCheckboxChange(23, 'read')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[23]?.new} onChange={handleCheckboxChange(23, 'new')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[23]?.modify} onChange={handleCheckboxChange(23, 'modify')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[23]?.delete} onChange={handleCheckboxChange(23, 'delete')} /></td>
//               </tr>


//               <tr className='user-permission-even-no-rows'>
//                 <td className='td-content'>Reminders<Switch
// checked={permissionsData[24]?.read && permissionsData[24]?.new && permissionsData[24]?.modify && permissionsData[24]?.delete}  onChange={handleSwitchforthatrow(24)}
//   inputProps={{ 'aria-label': 'controlled' }}
// /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[24]?.read} onChange={handleCheckboxChange(24, 'read')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[24]?.new} onChange={handleCheckboxChange(24, 'new')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[24]?.modify} onChange={handleCheckboxChange(24, 'modify')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[24]?.delete} onChange={handleCheckboxChange(24, 'delete')} /></td>
//               </tr>
//               <tr className='user-permission-even-no-rows'>
//                 <td className='td-content'>History<Switch
// checked={permissionsData[25]?.read && permissionsData[25]?.new && permissionsData[25]?.modify && permissionsData[25]?.delete}  onChange={handleSwitchforthatrow(25)}
//   inputProps={{ 'aria-label': 'controlled' }}
// /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[25]?.read} onChange={handleCheckboxChange(25, 'read')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[25]?.new} onChange={handleCheckboxChange(25, 'new')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[25]?.modify} onChange={handleCheckboxChange(25, 'modify')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[25]?.delete} onChange={handleCheckboxChange(25, 'delete')} /></td>
//               </tr>
//               <tr className='user-permission-even-no-rows'>
//                 <td className='td-content'>Records<Switch
// checked={permissionsData[26]?.read && permissionsData[26]?.new && permissionsData[26]?.modify && permissionsData[26]?.delete}  onChange={handleSwitchforthatrow(26)}
//   inputProps={{ 'aria-label': 'controlled' }}
// /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[26]?.read} onChange={handleCheckboxChange(26, 'read')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[26]?.new} onChange={handleCheckboxChange(26, 'new')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[26]?.modify} onChange={handleCheckboxChange(26, 'modify')} /></td>
//                 <td className='td-content'><input type="checkbox" checked={permissionsData[26]?.delete} onChange={handleCheckboxChange(26, 'delete')} /></td>
//               </tr>

//               </>
// }
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }
import React, { useState } from 'react'
import './UserPermission.css'
import Switch from '@mui/material/Switch';
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
const label = { inputProps: { 'aria-label': 'Switch demo' } };


export const UserPermission = ({ userid, permissionsData, handleSwitchChange, handleCheckboxChange, setReadState, readState, newState, modifyState, deleteState, handleSwitchforthatrow, handleSwitchforallrows, handleCheckboxChangealldata }) => {

  const [BOOKING, setBOOKING] = useState(false);
  const [BILLING, setBILLING] = useState(false);
  const [REGISTER, setREGISTER] = useState(false);
  const [SETTING, setSETTING] = useState(false);
  const [INFO, setINFO] = useState(false);
  const [MAP, setMAP] = useState(false);



  const togglerow = (headdername) => {
    if (headdername === "BOOKING") {
      setBOOKING((prev) => !prev);
    } else if (headdername === "BILLING") {
      setBILLING((prev) => !prev)

    } else if (headdername === "REGISTER") {
      setREGISTER((prev) => !prev)

    } else if (headdername === "SETTING") {
      setSETTING((prev) => !prev)

    } else if (headdername === "INFO") {
      setINFO((prev) => !prev)
    }
    else if (headdername === "MAP") {
      setMAP((prev) => !prev)
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
              <th className='th-content th-headings'>CREATE</th>
              <th className='th-content th-headings'>MODIFY</th>
              <th className='th-content th-headings'>DELETE</th>
            </tr>
          </thead>
          <tbody className='table-body'>
            <tr className='user-permission-even-no-rows'>
              <td className='td-content user-permission-table-title user-permission-table-first-row'>Full Permission</td>
              <td className='td-content user-permission-table-first-row'>
                <Switch checked={readState} onChange={handleSwitchChange('read')} />
              </td>
              <td className='td-content user-permission-table-first-row'>
                <Switch checked={newState} onChange={handleSwitchChange('new')} />
              </td>
              <td className='td-content user-permission-table-first-row'>
                <Switch checked={modifyState} onChange={handleSwitchChange('modify')} />
              </td>
              <td className='td-content user-permission-table-first-row'>
                <Switch checked={deleteState} onChange={handleSwitchChange('delete')} />
              </td>
            </tr>

            <tr className='user-permission-dashboard-row'>
              <td className='td-content Booking-table user-permission-table-title'>Dashboard </td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[21]?.read} onChange={handleCheckboxChange(21, 'read')} /></td>
            </tr>


            <tr className='user-permission-even-no-rows'>
              {/* <td className='td-content Booking-table' onClick={toggleDropdown}> <span>BOOKING</span>{isDropdownVisible ? (<span> <CiCircleChevUp className='table-up-down-icon' />  </span>) : (<span><CiCircleChevDown className='table-up-down-icon' /></span>)} */}
              <td className='td-content Booking-table user-permission-table-title' onClick={() => togglerow("BOOKING")}>
                Booking {BOOKING ? (<span> <FaChevronUp /> </span>) : (<span><FaChevronDown /></span>)}
                <Switch
                  checked={permissionsData[0]?.read && permissionsData[1]?.read && permissionsData[2]?.read && permissionsData[3]?.read} onChange={handleSwitchforallrows(0, 3)}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[0]?.read} onChange={handleCheckboxChangealldata(0, 3, 'read')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[0]?.new} onChange={handleCheckboxChangealldata(0, 3, 'new')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[0]?.modify} onChange={handleCheckboxChangealldata(0, 3, 'modify')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[0]?.delete} onChange={handleCheckboxChangealldata(0, 3, 'delete')} /></td>
            </tr>

            {BOOKING && <>
              <tr className='user-permission-even-no-rows'>
                <td className='td-content'>
                  Booking <Switch
                    checked={permissionsData[1]?.read && permissionsData[1]?.new && permissionsData[1]?.modify && permissionsData[1]?.delete} onChange={handleSwitchforthatrow(1)}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                  {/* <input type="checkbox" checked={permissionsData[1]?.read && permissionsData[1]?.new && permissionsData[1]?.modify && permissionsData[1]?.delete}  onChange={handleSwitchforthatrow(1)} /> */}
                </td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[1]?.read} onChange={handleCheckboxChange(1, 'read')} />
                </td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[1]?.new} onChange={handleCheckboxChange(1, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[1]?.modify} onChange={handleCheckboxChange(1, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[1]?.delete} onChange={handleCheckboxChange(1, 'delete')} /></td>
              </tr>

              <tr className='user-permission-even-no-rows'>
                <td className='td-content'>Trip Status  <Switch
                  checked={permissionsData[2]?.read && permissionsData[2]?.new && permissionsData[2]?.modify && permissionsData[2]?.delete} onChange={handleSwitchforthatrow(2)}
                  inputProps={{ 'aria-label': 'controlled' }}
                /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[2]?.read} onChange={handleCheckboxChange(2, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[2]?.new} onChange={handleCheckboxChange(2, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[2]?.modify} onChange={handleCheckboxChange(2, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[2]?.delete} onChange={handleCheckboxChange(2, 'delete')} /></td>
              </tr>

              <tr className='user-permission-even-no-rows'>
                <td className='td-content'>Trip sheet  <Switch
                  checked={permissionsData[3]?.read && permissionsData[3]?.new && permissionsData[3]?.modify && permissionsData[3]?.delete} onChange={handleSwitchforthatrow(3)}
                  inputProps={{ 'aria-label': 'controlled' }}
                /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[3]?.read} onChange={handleCheckboxChange(3, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[3]?.new} onChange={handleCheckboxChange(3, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[3]?.modify} onChange={handleCheckboxChange(3, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[3]?.delete} onChange={handleCheckboxChange(3, 'delete')} /></td>
              </tr>
            </>}


            <tr >
              <td className='td-content Booking-table user-permission-table-title' onClick={() => togglerow("BILLING")}>
                Billing {BILLING ? (<span> <FaChevronUp /> </span>) : (<span><FaChevronDown /></span>)}
                <Switch
                  checked={permissionsData[4]?.read && permissionsData[5]?.read && permissionsData[6]?.read && permissionsData[7]?.read} onChange={handleSwitchforallrows(4, 8)}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </td>
              {/* <td className='td-content  Booking-table'  ><span>BILLING</span>{isbillingDropdownVisible ? (<span> <CiCircleChevUp className='table-up-down-icon' />  </span>) : (<span><CiCircleChevDown className='table-up-down-icon' /></span>)}</td> */}
              <td className='td-content'><input type="checkbox" checked={permissionsData[4]?.read} onChange={handleCheckboxChangealldata(4, 8, 'read')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[4]?.new} onChange={handleCheckboxChangealldata(4, 8, 'new')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[4]?.modify} onChange={handleCheckboxChangealldata(4, 8, 'modify')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[4]?.delete} onChange={handleCheckboxChangealldata(4, 8, 'delete')} /></td>
            </tr>

            {BILLING && <>
              <tr>
                <td className='td-content'>Billing <Switch
                  checked={permissionsData[5]?.read && permissionsData[5]?.new && permissionsData[5]?.modify && permissionsData[5]?.delete} onChange={handleSwitchforthatrow(5)}
                  inputProps={{ 'aria-label': 'controlled' }}
                /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[5]?.read} onChange={handleCheckboxChange(5, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[5]?.new} onChange={handleCheckboxChange(5, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[5]?.modify} onChange={handleCheckboxChange(5, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[5]?.delete} onChange={handleCheckboxChange(5, 'delete')} /></td>
              </tr>

              <tr>
                <td className='td-content'>Transfer <Switch
                  checked={permissionsData[6]?.read && permissionsData[6]?.new && permissionsData[6]?.modify && permissionsData[6]?.delete} onChange={handleSwitchforthatrow(6)}
                  inputProps={{ 'aria-label': 'controlled' }}
                /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[6]?.read} onChange={handleCheckboxChange(6, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[6]?.new} onChange={handleCheckboxChange(6, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[6]?.modify} onChange={handleCheckboxChange(6, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[6]?.delete} onChange={handleCheckboxChange(6, 'delete')} /></td>
              </tr>

              <tr>
                <td className='td-content'>Covering Bill <Switch
                  checked={permissionsData[7]?.read && permissionsData[7]?.new && permissionsData[7]?.modify && permissionsData[7]?.delete} onChange={handleSwitchforthatrow(7)}
                  inputProps={{ 'aria-label': 'controlled' }}
                /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[7]?.read} onChange={handleCheckboxChange(7, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[7]?.new} onChange={handleCheckboxChange(7, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[7]?.modify} onChange={handleCheckboxChange(7, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[7]?.delete} onChange={handleCheckboxChange(7, 'delete')} /></td>
              </tr>

              <tr>
                <td className='td-content'>Reports <Switch
                  checked={permissionsData[8]?.read && permissionsData[8]?.new && permissionsData[8]?.modify && permissionsData[8]?.delete} onChange={handleSwitchforthatrow(8)}
                  inputProps={{ 'aria-label': 'controlled' }}
                /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[8]?.read} onChange={handleCheckboxChange(8, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[8]?.new} onChange={handleCheckboxChange(8, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[8]?.modify} onChange={handleCheckboxChange(8, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[8]?.delete} onChange={handleCheckboxChange(8, 'delete')} /></td>
              </tr>

            </>}

            <tr className='user-permission-even-no-rows'>
              {/* <td className='td-content Booking-table'  ><span>REGISTER</span>{isregisterDropdownVisible ? (<span> <CiCircleChevUp className='table-up-down-icon' />  </span>) : (<span><CiCircleChevDown className='table-up-down-icon' /></span>)}</td> */}
              <td className='td-content Booking-table user-permission-table-title' onClick={() => togglerow("REGISTER")}>Register {REGISTER ? (<span> <FaChevronUp /> </span>) : (<span><FaChevronDown /></span>)}
                <Switch
                  checked={permissionsData[9]?.read && permissionsData[10]?.read && permissionsData[11]?.read && permissionsData[12]?.read && permissionsData[13]?.read} onChange={handleSwitchforallrows(9, 13)}
                  inputProps={{ 'aria-label': 'controlled' }}
                /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[9]?.read} onChange={handleCheckboxChangealldata(9, 13, 'read')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[9]?.new} onChange={handleCheckboxChangealldata(9, 13, 'new')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[9]?.modify} onChange={handleCheckboxChangealldata(9, 13, 'modify')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[9]?.delete} onChange={handleCheckboxChangealldata(9, 13, 'delete')} /></td>
            </tr>

            {REGISTER && <>
              <tr className='user-permission-even-no-rows'>
                <td className='td-content'>Rate Type<Switch
                  checked={permissionsData[10]?.read && permissionsData[10]?.new && permissionsData[10]?.modify && permissionsData[10]?.delete} onChange={handleSwitchforthatrow(10)}
                  inputProps={{ 'aria-label': 'controlled' }}
                /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[10]?.read} onChange={handleCheckboxChange(10, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[10]?.new} onChange={handleCheckboxChange(10, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[10]?.modify} onChange={handleCheckboxChange(10, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[10]?.delete} onChange={handleCheckboxChange(10, 'delete')} /></td>
              </tr>
              <tr className='user-permission-even-no-rows'>
                <td className='td-content'>Customer <Switch
                  checked={permissionsData[11]?.read && permissionsData[11]?.new && permissionsData[11]?.modify && permissionsData[11]?.delete} onChange={handleSwitchforthatrow(11)}
                  inputProps={{ 'aria-label': 'controlled' }}
                /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[11]?.read} onChange={handleCheckboxChange(11, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[11]?.new} onChange={handleCheckboxChange(11, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[11]?.modify} onChange={handleCheckboxChange(11, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[11]?.delete} onChange={handleCheckboxChange(11, 'delete')} /></td>
              </tr>

              <tr className='user-permission-even-no-rows'>
                <td className='td-content'>Supllier <Switch
                  checked={permissionsData[12]?.read && permissionsData[12]?.new && permissionsData[12]?.modify && permissionsData[12]?.delete} onChange={handleSwitchforthatrow(12)}
                  inputProps={{ 'aria-label': 'controlled' }}
                /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[12]?.read} onChange={handleCheckboxChange(12, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[12]?.new} onChange={handleCheckboxChange(12, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[12]?.modify} onChange={handleCheckboxChange(12, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[12]?.delete} onChange={handleCheckboxChange(12, 'delete')} /></td>
              </tr>

              <tr className='user-permission-even-no-rows'>
                <td className='td-content'>Station Creation <Switch
                  checked={permissionsData[13]?.read && permissionsData[13]?.new && permissionsData[13]?.modify && permissionsData[13]?.delete} onChange={handleSwitchforthatrow(13)}
                  inputProps={{ 'aria-label': 'controlled' }}
                /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[13]?.read} onChange={handleCheckboxChange(13, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[13]?.new} onChange={handleCheckboxChange(13, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[13]?.modify} onChange={handleCheckboxChange(13, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[13]?.delete} onChange={handleCheckboxChange(13, 'delete')} /></td>
              </tr>

            </>}


            <tr >
              {/* <td className='td-content Booking-table'  ><span>REGISTER</span>{issettingDropdownVisible ? (<span> <CiCircleChevUp className='table-up-down-icon' />  </span>) : (<span><CiCircleChevDown className='table-up-down-icon' /></span>)}</td> */}
              <td className='td-content user-permission-table-title' onClick={() => togglerow("SETTING")}>Setting {SETTING ? (<span> <FaChevronUp /> </span>) : (<span><FaChevronDown /></span>)}
                <Switch
                  checked={permissionsData[14]?.read && permissionsData[15]?.read && permissionsData[16]?.read} onChange={handleSwitchforallrows(14, 16)}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[14]?.read} onChange={handleCheckboxChangealldata(14, 16, 'read')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[14]?.new} onChange={handleCheckboxChangealldata(14, 16, 'new')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[14]?.modify} onChange={handleCheckboxChangealldata(14, 16, 'modify')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[14]?.delete} onChange={handleCheckboxChangealldata(14, 16, 'delete')} /></td>
            </tr>

            {SETTING && <>
              <tr>
                <td className='td-content'>User Creation <Switch
                  checked={permissionsData[15]?.read && permissionsData[15]?.new && permissionsData[15]?.modify && permissionsData[15]?.delete} onChange={handleSwitchforthatrow(15)}
                  inputProps={{ 'aria-label': 'controlled' }}
                /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[15]?.read} onChange={handleCheckboxChange(15, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[15]?.new} onChange={handleCheckboxChange(15, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[15]?.modify} onChange={handleCheckboxChange(15, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[15]?.delete} onChange={handleCheckboxChange(15, 'delete')} /></td>
              </tr>

              <tr>
                <td className='td-content'>Main Setting <Switch
                  checked={permissionsData[16]?.read && permissionsData[16]?.new && permissionsData[16]?.modify && permissionsData[16]?.delete} onChange={handleSwitchforthatrow(16)}
                  inputProps={{ 'aria-label': 'controlled' }}
                /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[16]?.read} onChange={handleCheckboxChange(16, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[16]?.new} onChange={handleCheckboxChange(16, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[16]?.modify} onChange={handleCheckboxChange(16, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[16]?.delete} onChange={handleCheckboxChange(16, 'delete')} /></td>
              </tr>



            </>}



            <tr className='user-permission-even-no-rows'>
              {/* <td className='td-content Booking-table'  ><span>Info</span>{isinfoDropdownVisible ? (<span> <CiCircleChevUp className='table-up-down-icon' style={{ color: 'red' }} />  </span>) : (<span><CiCircleChevDown className='table-up-down-icon' /></span>)}</td> */}
              <td className='td-content user-permission-table-title' onClick={() => togglerow("INFO")}>Info {INFO ? (<span> <FaChevronUp /> </span>) : (<span><FaChevronDown /></span>)}
                <Switch
                  checked={permissionsData[17]?.read && permissionsData[18]?.read && permissionsData[19]?.read && permissionsData[20]?.read} onChange={handleSwitchforallrows(17, 20)}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[17]?.read} onChange={handleCheckboxChange(17, 20, 'read')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[17]?.new} onChange={handleCheckboxChange(17, 20, 'new')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[17]?.modify} onChange={handleCheckboxChange(17, 20, 'modify')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[17]?.delete} onChange={handleCheckboxChange(17, 20, 'delete')} /></td>
            </tr>

            {INFO && <>

              <tr className='user-permission-even-no-rows'>
                <td className='td-content'>Mailers  <Switch
                  checked={permissionsData[18]?.read && permissionsData[18]?.new && permissionsData[18]?.modify && permissionsData[18]?.delete} onChange={handleSwitchforthatrow(18)}
                  inputProps={{ 'aria-label': 'controlled' }}
                /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[18]?.read} onChange={handleCheckboxChange(18, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[18]?.new} onChange={handleCheckboxChange(18, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[18]?.modify} onChange={handleCheckboxChange(18, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[18]?.delete} onChange={handleCheckboxChange(18, 'delete')} /></td>
              </tr>

              <tr className='user-permission-even-no-rows'>
                <td className='td-content'>Fuel Info <Switch
                  checked={permissionsData[19]?.read && permissionsData[19]?.new && permissionsData[19]?.modify && permissionsData[19]?.delete} onChange={handleSwitchforthatrow(19)}
                  inputProps={{ 'aria-label': 'controlled' }}
                /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[19]?.read} onChange={handleCheckboxChange(19, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[19]?.new} onChange={handleCheckboxChange(19, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[19]?.modify} onChange={handleCheckboxChange(19, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[19]?.delete} onChange={handleCheckboxChange(19, 'delete')} /></td>
              </tr>
              <tr className='user-permission-even-no-rows'>
                <td className='td-content'>Employee <Switch
                  checked={permissionsData[20]?.read && permissionsData[20]?.new && permissionsData[20]?.modify && permissionsData[20]?.delete} onChange={handleSwitchforthatrow(20)}
                  inputProps={{ 'aria-label': 'controlled' }}
                /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[20]?.read} onChange={handleCheckboxChange(20, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[20]?.new} onChange={handleCheckboxChange(20, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[20]?.modify} onChange={handleCheckboxChange(20, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[20]?.delete} onChange={handleCheckboxChange(20, 'delete')} /></td>
              </tr>

            </>

            }

            <tr>
              {/* <td className='td-content Booking-table'  ><span>Info</span>{isinfoDropdownVisible ? (<span> <CiCircleChevUp className='table-up-down-icon' style={{ color: 'red' }} />  </span>) : (<span><CiCircleChevDown className='table-up-down-icon' /></span>)}</td> */}
              <td className='td-content user-permission-table-title' onClick={() => togglerow("MAP")}>Map {MAP ? (<span> <FaChevronUp /> </span>) : (<span><FaChevronDown /></span>)}
                <Switch
                  checked={permissionsData[22]?.read && permissionsData[23]?.read && permissionsData[24]?.read && permissionsData[25]?.read && permissionsData[26]?.read && permissionsData[27]?.read} onChange={handleSwitchforallrows(22, 27)}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[22]?.read} onChange={handleCheckboxChangealldata(22, 27, 'read')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[22]?.new} onChange={handleCheckboxChangealldata(22, 27, 'new')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[22]?.modify} onChange={handleCheckboxChangealldata(22, 27, 'modify')} /></td>
              <td className='td-content'><input type="checkbox" checked={permissionsData[22]?.delete} onChange={handleCheckboxChangealldata(22, 27, 'delete')} /></td>
            </tr>
            {MAP && <>

              <tr>
                <td className='td-content'>RealTime<Switch
                  checked={permissionsData[23]?.read && permissionsData[23]?.new && permissionsData[23]?.modify && permissionsData[23]?.delete} onChange={handleSwitchforthatrow(23)}
                  inputProps={{ 'aria-label': 'controlled' }}
                /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[23]?.read} onChange={handleCheckboxChange(23, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[23]?.new} onChange={handleCheckboxChange(23, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[23]?.modify} onChange={handleCheckboxChange(23, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[23]?.delete} onChange={handleCheckboxChange(23, 'delete')} /></td>
              </tr>
              <tr>
                <td className='td-content'>Vehicle<Switch
                  checked={permissionsData[24]?.read && permissionsData[24]?.new && permissionsData[24]?.modify && permissionsData[24]?.delete} onChange={handleSwitchforthatrow(24)}
                  inputProps={{ 'aria-label': 'controlled' }}
                /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[24]?.read} onChange={handleCheckboxChange(24, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[24]?.new} onChange={handleCheckboxChange(24, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[24]?.modify} onChange={handleCheckboxChange(24, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[24]?.delete} onChange={handleCheckboxChange(24, 'delete')} /></td>
              </tr>


              <tr>
                <td className='td-content'>Reminders<Switch
                  checked={permissionsData[25]?.read && permissionsData[25]?.new && permissionsData[25]?.modify && permissionsData[25]?.delete} onChange={handleSwitchforthatrow(25)}
                  inputProps={{ 'aria-label': 'controlled' }}
                /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[25]?.read} onChange={handleCheckboxChange(25, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[25]?.new} onChange={handleCheckboxChange(25, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[25]?.modify} onChange={handleCheckboxChange(25, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[25]?.delete} onChange={handleCheckboxChange(25, 'delete')} /></td>
              </tr>
              <tr>
                <td className='td-content'>History<Switch
                  checked={permissionsData[26]?.read && permissionsData[26]?.new && permissionsData[26]?.modify && permissionsData[26]?.delete} onChange={handleSwitchforthatrow(26)}
                  inputProps={{ 'aria-label': 'controlled' }}
                /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[26]?.read} onChange={handleCheckboxChange(26, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[26]?.new} onChange={handleCheckboxChange(26, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[26]?.modify} onChange={handleCheckboxChange(26, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[26]?.delete} onChange={handleCheckboxChange(26, 'delete')} /></td>
              </tr>
              <tr>
                <td className='td-content'>Records<Switch
                  checked={permissionsData[27]?.read && permissionsData[27]?.new && permissionsData[27]?.modify && permissionsData[27]?.delete} onChange={handleSwitchforthatrow(27)}
                  inputProps={{ 'aria-label': 'controlled' }}
                /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[27]?.read} onChange={handleCheckboxChange(27, 'read')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[27]?.new} onChange={handleCheckboxChange(27, 'new')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[27]?.modify} onChange={handleCheckboxChange(27, 'modify')} /></td>
                <td className='td-content'><input type="checkbox" checked={permissionsData[27]?.delete} onChange={handleCheckboxChange(27, 'delete')} /></td>
              </tr>

            </>
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
