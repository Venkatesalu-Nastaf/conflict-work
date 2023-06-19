import React from 'react'
import './OnlineUserPassword.css'
import { FormControlLabel, FormControl, FormLabel, Radio, RadioGroup, } from '@mui/material';
import SummarizeTwoToneIcon from '@mui/icons-material/SummarizeTwoTone';
import Button from '@mui/material/Button';

const Online_User_Password = () => {
    return (
        <div className='User_Password_main'>
            <div className='btns'>
                <div>
                <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Online Access</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="allowed" control={<Radio />} label="Allowed" />
                                <FormControlLabel value="blocked" control={<Radio />} label="Blocked" />
                            </RadioGroup>
                        </FormControl>
                </div>
                <div>
                <Button variant="outlined" startIcon={<SummarizeTwoToneIcon />}>
                            list
                        </Button>
                </div>
                
            </div>
            <div className='list-box'>
                    <p className='list-para'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi suscipit praesentium fugit ipsum illo, cupiditate consequuntur officia nobis repellat adipisci quisquam veritatis possimus inventore sint necessitatibus cum exercitationem molestias a.</p>
                </div>
        </div>
    )
}

export default Online_User_Password