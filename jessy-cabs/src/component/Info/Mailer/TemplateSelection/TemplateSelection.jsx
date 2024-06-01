import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./TemplateSelection.css";
import Template from "../../../../assets/img/template-sample.svg";
import { IoChevronBack } from "react-icons/io5";

const TemplateSelection = () => {

  const Navigate = useNavigate();
  const NavToTemplateCreation = () => {
    Navigate("/home/info/mailer/TemplateCreation");
  }

  const backToMailer = () => {
    Navigate("/home/info/mailer");
  }

  return (
    <>
      <div className='template-selection-main'>
        <div className='template-selection-back-division' onClick={backToMailer}> <IoChevronBack /></div>
        <div className='d-flex'>
          <div className='template-selection-menu'>
            <div className='d-grid'>
              <button className='template-selection-btn'>All</button>
              <button className='template-selection-btn'>Basic</button>
              <button className='template-selection-btn'>Celebration</button>
              <button className='template-selection-btn'>Invitiation</button>
              <button className='template-selection-btn'>Follow up</button>
              <button className='template-selection-btn'>Product Promotion</button>
            </div>
          </div>
          <div className='template-selection-template-section'>
            <div className='blank-template'>
              <div class="overlay">
                <div class="text">
                  <button className='template-select-button' onClick={NavToTemplateCreation}>Select</button>
                </div>
              </div>
            </div>
            <div className='template-images'>
              <img className="cards-image" src={Template} alt="" />
              <div className="overlay">
                <div className="text">
                  <button className='template-select-button'>Select</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TemplateSelection
