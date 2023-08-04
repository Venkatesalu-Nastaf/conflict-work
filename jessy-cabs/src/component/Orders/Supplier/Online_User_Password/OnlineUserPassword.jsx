import React from "react";
import "./OnlineUserPassword.css";
import Button from "@mui/material/Button";
import SummarizeTwoToneIcon from "@mui/icons-material/SummarizeTwoTone";
import { FormControlLabel, FormControl, FormLabel, Radio, RadioGroup } from "@mui/material";

const Online_User_Password = () => {
  return (
    <form action="">
      <div className="User_Password_main">
        <span className="Title-Name">Booking</span>
        <div className="btns">
          <div>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Online Access
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="allowed"
                  control={<Radio />}
                  label="Allowed"
                />
                <FormControlLabel
                  value="blocked"
                  control={<Radio />}
                  label="Blocked"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div>
            <Button variant="outlined" startIcon={<SummarizeTwoToneIcon />}>
              list
            </Button>
          </div>
        </div>
        <div className="list-box">
          <div className="list-para">
            <span>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi
              suscipit praesentium fugit ipsum illo, cupiditate consequuntur
              officia nobis repellat adipisci quisquam veritatis possimus
              inventore sint necessitatibus cum exercitationem molestias a
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi
              suscipit praesentium fugit ipsum illo, cupiditate consequuntur
              officia nobis repellat adipisci quisquam veritatis possimus
              inventore sint necessitatibus cum exercitationem molestias a
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi
              suscipit praesentium fugit ipsum illo, cupiditate consequuntur
              officia nobis repellat adipisci quisquam veritatis possimus
              inventore sint necessitatibus cum exercitationem molestias a
            </span>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Online_User_Password;
