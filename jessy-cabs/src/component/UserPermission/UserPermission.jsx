import React from 'react'
import './UserPermission.css'
import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Switch demo' } };
export const UserPermission = () => {
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
                <td className='td-content'>VIEW</td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
              </tr>
              <tr>
                <td className='td-content'>READ</td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
              </tr>
              <tr>
                <td className='td-content'>WRITE</td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
                <td className='td-content'><input type="checkbox" /></td>
              </tr>
              <tr>
                <td className='td-content'>EDIT</td>
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
