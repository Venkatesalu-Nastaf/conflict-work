import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./TemplateSelection.css";
import Template from "../../../../assets/img/template-sample.svg";

const TemplateSelection = () => {

  const Navigate = useNavigate();
  const NavToTemplateCreation = ()=>{
    Navigate("/home/info/TemplateCreation");
    }
  return (
    <>
      <div style={{width: '100%'}}>
        <div style={{marginBottom: '20px', fontSize: '22px', fontWeight: '600'}}>Template Gallery</div>
        <div style={{display: 'flex'}}>
          <div style={{backgroundColor: "#fff", padding: '24px', height: '100vh', width: '220px'}}>
            <div style={{display: 'grid'}}>
              <button className='template-selection-btn'>All</button>
              <button className='template-selection-btn'>Basic</button>
              <button className='template-selection-btn'>Celebration</button>
              <button className='template-selection-btn'>Invitiation</button>
              <button className='template-selection-btn'>Follow up</button>
              <button className='template-selection-btn'>Product Promotion</button>
            </div>
          </div>
          <div style={{display: 'flex', flexWrap: 'wrap', width: '100%', backgroundColor: "#e9e9e9", padding: '25px'}}>
            <div className='blank-template' style={{marginRight: '25px', marginBottom: '20px'}}>
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
