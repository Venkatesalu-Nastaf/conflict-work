import './invoice.css';
import { useRef } from 'react';
import { Button } from '@mui/material';
import generatePDF from 'react-to-pdf';

const Invoice = ({ tripSheetData, organizationdata, selectedImage, selectedCustomerData, attachedImage, signimageUrl, routeData, GmapimageUrl, selectedCustomerDatas, book, formData, totalhour }) => {
  const targetRef = useRef();
  return (
    <>
      <div className="invoice-wrapper" ref={targetRef}>
        <article className='artical-top'>

          <div className='invoice-container-header'>
            <div className="logo-image-invoice">
              {selectedImage && <img src={selectedImage[0]} alt={"Logo"} />}
            </div>
            <div className="invoice-address">
              <address >
                <p className='invoice-address-detials'>{organizationdata?.addressLine1}
                  {organizationdata?.addressLine2}
                  {organizationdata?.city}<br />
                  {organizationdata?.contactEmail}</p>
                <p className='invoice-contact-details'>Contact:-{organizationdata?.contactPhoneNumber}</p>
              </address>
            </div>
          </div>
          <div className="main-invoice-container">
            <div className='first-table-invoice-container'>
              <table id='table-invoice' className="firstleftTable">
                <tr>
                  <th id='table-header'><span>Client Name:</span></th>
                  <td id='table-data'><span >{tripSheetData.customer || selectedCustomerData.customer || selectedCustomerDatas.customer || book.customer}</span></td>
                </tr>
                <tr>
                  <th id='table-header'><span>Address:</span></th>
                  <td id='table-data'><span >{tripSheetData.address1 || selectedCustomerData.address1 || selectedCustomerDatas.address1 || book.address1} {tripSheetData.streetno || selectedCustomerData.streetno || selectedCustomerDatas.streetno || book.streetno} {tripSheetData.city || selectedCustomerData.city || selectedCustomerDatas.city || book.city}</span></td>
                </tr>
                <tr>
                  <th id='table-header'><span>Ordered By:</span></th>
                  <td id='table-data'><span>{tripSheetData.orderedby || selectedCustomerData.orderedby || selectedCustomerDatas.orderedby || book.orderedby}</span></td>
                </tr>
                <tr>
                  <th id='table-header'><span>Emp. No:</span></th>
                  <td id='table-data'><span>{tripSheetData.empolyeeno || selectedCustomerData.empolyeeno || selectedCustomerDatas.empolyeeno || book.empolyeeno}</span></td>
                </tr>
                <tr>
                  <th id='table-header'><span>CCode:</span></th>
                  <td id='table-data'><span>{tripSheetData.customercode || selectedCustomerData.customercode || selectedCustomerDatas.customercode || book.customercode}</span></td>
                </tr>
                <tr>
                  <th id='table-header'><span>Report To</span></th>
                  <td id='table-data'><span>{tripSheetData.guestname || selectedCustomerData.guestname || selectedCustomerDatas.guestname || book.guestname}</span></td>
                </tr>
                <tr>
                  <th id='table-header'><span >Reporting @</span></th>
                  <td id='table-data'><span>{tripSheetData.customer || selectedCustomerData.customer || selectedCustomerDatas.customer || book.customer}</span></td>
                </tr>
              </table>
              <table id='table-invoice' className="firstTable">
                <tr>
                  <th id='table-header'>Log No:</th>
                  <td id='table-data'>TS{tripSheetData.tripid || selectedCustomerData.tripid || selectedCustomerDatas.tripid || book.tripid}</td>
                </tr>
                <tr>
                  <th id='table-header'>Date:</th>
                  <td id='table-data'>{tripSheetData.startdate || selectedCustomerData.startdate || selectedCustomerDatas.startdate || book.startdate}</td>
                </tr>
                <tr>
                  <th id='table-header'>Duty Type:</th>
                  <td id='table-data'>{tripSheetData.duty || selectedCustomerData.duty || selectedCustomerDatas.duty || book.duty}</td>
                </tr>
                <tr>
                  <th id='table-header'>Vehicle Type:</th>
                  <td id='table-data'><span>{tripSheetData.vehType || selectedCustomerData.vehType || selectedCustomerDatas.vehType || book.vehType}</span></td>
                </tr>
                <tr>
                  <th id='table-header'><span >Vehicle No:</span></th>
                  <td id='table-data'><span>{tripSheetData.vehRegNo || selectedCustomerData.vehRegNo || selectedCustomerDatas.vehRegNo || book.vehRegNo}</span></td>
                </tr>
                <tr>
                  <th id='table-header'><span >Driver Name:</span></th>
                  <td id='table-data'><span>{tripSheetData.driverName || selectedCustomerData.driverName || selectedCustomerDatas.driverName || book.driverName}</span></td>
                </tr>
                <tr>
                  <th id='table-header'><span >Driver Mobile:</span></th>
                  <td id='table-data'><span>{tripSheetData.mobileNo || selectedCustomerData.mobileNo || selectedCustomerDatas.mobileNo || book.mobileNo}</span></td>
                </tr>
              </table>
            </div>
            <div >
              <label><span className='invoice-remarks-main'>Remarks : </span><span className='invoice-remarks-sub'>{tripSheetData.remark || selectedCustomerData.remark || selectedCustomerDatas.remark || book.remark}</span>
              </label>
            </div>
            <div className="secondTable">
              <div className='vehicale-details-table'>
                <table id='table-invoice' >
                  <thead>
                    <tr>
                      <th id='table-headers'><span ></span></th>
                      <th id='table-headers'><span >DATE</span></th>
                      <th id='table-headers'><span >HOURS</span></th>
                      <th id='table-headers'><span >KMS</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td id='table-datas'><span >Starting</span></td>
                      <td id='table-datas'><span >{tripSheetData.startdate || selectedCustomerData.startdate || selectedCustomerDatas.startdate || book.startdate}</span></td>
                      <td id='table-datas'><span >{tripSheetData.starttime || selectedCustomerData.starttime || selectedCustomerDatas.starttime || book.starttime}</span></td>
                      <td id='table-datas'><span >{tripSheetData.startkm || selectedCustomerData.startkm || selectedCustomerDatas.startkm || book.startkm}</span></td>
                    </tr>
                    <tr>
                      <td id='table-datas'><span >Closing</span></td>
                      <td id='table-datas'><span >{tripSheetData.closedate || selectedCustomerData.closedate || selectedCustomerDatas.closedate || book.closedate}</span></td>
                      <td id='table-datas'><span >{tripSheetData.closetime || selectedCustomerData.closetime || selectedCustomerDatas.closetime || book.closetime}</span></td>
                      <td id='table-datas'><span >{tripSheetData.closekm || selectedCustomerData.closekm || selectedCustomerDatas.closekm || book.closekm}</span></td>
                    </tr>
                    <tr>
                      <td id='table-datas'><span >Total</span></td>
                      <td id='table-datas'><span >{tripSheetData.totaldays || selectedCustomerData.totaldays || selectedCustomerDatas.totaldays || book.totaldays}</span>days</td>
                      <td id='table-datas'><span >{tripSheetData.totaltime || selectedCustomerData.totaltime || selectedCustomerDatas.totaltime || book.totaltime || formData.totaltime}</span></td>
                      <td id='table-datas'><span >{totalhour}</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="guest-signature-details">
                <div className="instruction">
                  <h5>SPL INSTRUCTION</h5>
                  <p id='line'>------------------</p>
                  <p id='line'>------------------</p>
                </div>
                <div className="guest-sign">
                  {signimageUrl !== "" ?
                    <img className='dialogboximg' src={signimageUrl} alt=" " /> : <div className='dialogboximg' ></div>}
                  <p className='guest-sign-text'>Guest Signature</p>
                </div>
              </div>
            </div>
          </div>
          <div className='total-values'>
            <div id='Totals'><span id='title'>Total Parking  </span><span>{tripSheetData.parking || selectedCustomerData.parking || selectedCustomerDatas.parking || book.parking}</span></div>
            <div id='Totals'><span id='title'>Total Toll  </span><span>{tripSheetData.toll || selectedCustomerData.toll || selectedCustomerDatas.toll || book.toll}</span></div>
            <div id='Totals'><span id='title'>Total Permit  </span><span>{tripSheetData.permit || selectedCustomerData.permit || selectedCustomerDatas.permit || book.permit}</span></div>
          </div>
          <div className='tripsheet-location-img'>
            <img src={GmapimageUrl} alt='mapimage' />
          </div>
          <div className="tripsheet-RouteSummary">
            <h2>Route Summary</h2>
            <ol type="1">
              {routeData.length > 0 && routeData?.map((data, index) => (
                <li><p key={index}><strong>{data.trip_type}</strong>: {data.place_name}</p></li>
              ))}
            </ol>
          </div>
          <div className='attached-toll'>
            <ol type="1">
              {Array.isArray(attachedImage) && attachedImage?.map((image, index) => (
                <img className='attached-image' key={index} src={image} alt={`image_${index}`} />
              ))}
            </ol>
          </div>
        </article>
      </div>
      <Button onClick={() => generatePDF(targetRef, { filename: 'E-tripsheet.pdf' })}>Print</Button>
    </>
  );
};

export default Invoice;
