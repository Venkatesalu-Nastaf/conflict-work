import React from 'react';
import "./Specification.css";

const Specification = () => {

  // const [age, setAge] = React.useState('');

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };
  return (
    <div className='add-vehicle-specification-main-division'>
      <div className='add-vehicle-specification-heading'>
        Dimensions
      </div>
      <div className='add-vehicle-specification-division'>
        <div className='add-vehicle-specification-input'>
          <label htmlFor="">Width</label>
          <input type="text" />
        </div>

        <div className='add-vehicle-specification-input'>
          <label htmlFor="">Height</label>
          <input type="text" />
        </div>

        <div className='add-vehicle-specification-input'>
          <label htmlFor="">Length</label>
          <input type="text" />
        </div>

        <div className='add-vehicle-specification-input'>
          <label htmlFor="">Interior Volume</label>
          <input type="text" />
        </div>

        <div className='add-vehicle-specification-input'>
          <label htmlFor="">Passenger Volume</label>
          <input type="text" />
        </div>

        <div className='add-vehicle-specification-input'>
          <label htmlFor="">Maker*</label>
          <input type="text" />
        </div>

        <div className='add-vehicle-specification-input'>
          <label htmlFor="">Cargo Volume</label>
          <input type="text" />
        </div>

        <div className='add-vehicle-specification-input'>
          <label htmlFor="">Ground Clearance</label>
          <input type="text" />
        </div>

        <div className='add-vehicle-specification-input'>
          <label htmlFor="">Bed Length</label>
          <input type="text" />
        </div>

      </div>

      <div className='add-vehicle-specification-heading'>
        Weight
      </div>

      <div className='add-vehicle-specification-division'>
        <div className='add-vehicle-specification-input'>
          <label htmlFor="">Curb Weight</label>
          <input type="text" />
        </div>

        <div className='add-vehicle-specification-input'>
          <label htmlFor="">Gross Vehicle Weight Rating</label>
          <input type="text" />
        </div>

      </div>

      <div className='add-vehicle-specification-heading'>
        Performance
      </div>

      <div className='add-vehicle-specification-division'>
        <div className='add-vehicle-specification-input'>
          <label htmlFor="">Towing Capacity</label>
          <input type="text" />
        </div>

        <div className='add-vehicle-specification-input'>
          <label htmlFor="">Max Payload</label>
          <input type="text" />
        </div>

      </div>

      <div className='add-vehicle-specification-heading'>
        Fuel Economy
      </div>

      <div className='add-vehicle-specification-division'>
        <div className='add-vehicle-specification-input'>
          <label htmlFor="">EPA City</label>
          <input type="text" />
        </div>

        <div className='add-vehicle-specification-input'>
          <label htmlFor="">EPA Highway</label>
          <input type="text" />
        </div>

        <div className='add-vehicle-specification-input'>
          <label htmlFor="">EPA Combined</label>
          <input type="text" />
        </div>

      </div>

      <div className='add-vehicle-specification-heading'>
        Mileage
      </div>

      <div className='add-vehicle-specification-division'>
        <div className='add-vehicle-specification-input'>
          <label htmlFor="">CNG Mileage</label>
          <input type="text" />
        </div>

        <div className='add-vehicle-specification-input'>
          <label htmlFor="">Refer Mileage</label>
          <input type="text" />
        </div>

        <div className='add-vehicle-specification-input'>
          <label htmlFor="">Empty Mileage</label>
          <input type="text" />
        </div>

        <div className='add-vehicle-specification-input'>
          <label htmlFor="">Loaded Mileage</label>
          <input type="text" />
        </div>

      </div>

      <div className='add-vehicle-specification-heading'>
        Fuel Tank Capacity
      </div>

      <div className='add-vehicle-specification-division'>
        <div className='add-vehicle-specification-input'>
          <label htmlFor="">Primary Tank Capacity</label>
          <input type="text" />
        </div>

        <div className='add-vehicle-specification-input'>
          <label htmlFor="">Secondary Tank Capacity</label>
          <input type="text" />
        </div>

      </div>

      <div className='add-vehicle-specification-heading'>
        Adblue Tank Capacity
      </div>

      <div className='add-vehicle-specification-division'>
        <div className='add-vehicle-specification-input'>
          <label htmlFor="">Adblue Tank Capacity</label>
          <input type="text" />
        </div>
      </div>

    </div>
  )
}

export default Specification
