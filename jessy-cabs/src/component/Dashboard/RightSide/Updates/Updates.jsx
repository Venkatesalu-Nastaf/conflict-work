import React from "react";
import "./Update.css"
import { CgProfile } from "@react-icons/all-files/cg/CgProfile";
import { UpdatesData } from "../../../../Data/Data.js";

const Updates = () => {
  return (
    <div className="Updates">
      {UpdatesData.map((update) => {
        return (
          <div className="update">
            {/* <img src={CgProfile} alt="profile" /> */}
            <span className="img"><CgProfile/></span>
            <div className="noti">
              <div  style={{marginBottom: '0.5rem'}}>
                <span>{update.name}</span>
                <span> {update.noti}</span>
              </div>
                <span>{update.time}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Updates;