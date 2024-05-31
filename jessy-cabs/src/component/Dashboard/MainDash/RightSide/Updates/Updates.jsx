import React from "react";
import "./Update.css";
import { CgProfile } from "@react-icons/all-files/cg/CgProfile";
import { UpdatesData } from "./Update-Data.js";

const Updates = () => {
  return (
    <div className="Updates">
      <h3 className="updates-heading"> Updates</h3>

      {UpdatesData.map((update) => {
        return (
          <div className="update" key={update.id}>
            <div className="img">
              <CgProfile />
            </div>
            <div className="noti">
              <div className="updates-notification-division">
                <span className="update-username">{update.name}</span>
                <span> {update.noti}</span>
                <span className="update-time">{update.time}..</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Updates;
