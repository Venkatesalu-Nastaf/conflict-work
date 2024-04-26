import React, { useState } from 'react';
import { MenuItem, Select } from '@material-ui/core';
import './UserPermission.css'
import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Switch demo' } };
export const UserPermission = () => {

  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (


  
      <div className='permission-table '>
        {/* <h3 className='members-txt '>UserName</h3> */}
        <div className="table-container">
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
              <td className='td-content'>
      <Select
        value={selectedOption}
        onChange={handleChange}
        displayEmpty
        className='booking-dropdown'
      >
        <MenuItem value='' disabled>
          Select Option
        </MenuItem>
        <MenuItem value='option1'>Option 1</MenuItem>
        <MenuItem value='option2'>Option 2</MenuItem>
        <MenuItem value='option3'>Option 3</MenuItem>
      </Select>
    </td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
              </tr>
              <tr>
                {/* <td className='td-content'>Billing</td> */}
                <td className='td-content'>
      <Select
        value={selectedOption}
        onChange={handleChange}
        displayEmpty
        className='booking-dropdown'
      >
        <MenuItem value='' disabled>
          Select Option
        </MenuItem>
        <MenuItem value='option1'>Option 1</MenuItem>
        <MenuItem value='option2'>Option 2</MenuItem>
        <MenuItem value='option3'>Option 3</MenuItem>
      </Select>
    </td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
              </tr>
              <tr>
                <td className='td-content'>Register</td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
              </tr>
              <tr>
                <td className='td-content'>Settings</td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>


  )
}
