import './invoice.css';
import './InvoiceHCL.css';

// import './invoice.css';
import { useRef, useState } from 'react';
import { Button } from '@mui/material';
import generatePDF, { Margin } from 'react-to-pdf';
import dayjs from 'dayjs';
import { Document, Page } from 'react-pdf';
import { GoDotFill } from "react-icons/go";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const InvoiceHCL = ({ customerAddress, fueltype, pack, airportTransfer, tripSheetData, organizationdata, selectedImage, selectedCustomerData, attachedImage, signimageUrl, routeData, GmapimageUrl, selectedCustomerDatas, book, Totaltimes, TotalDays,loading,mapLoading,routeLoading }) => {


  const date = tripSheetData.startdate || selectedCustomerData.startdate || selectedCustomerDatas.startdate || book.startdate
  const shedOutDate = tripSheetData.shedOutDate || selectedCustomerData.shedOutDate || selectedCustomerDatas.shedOutDate || book.shedOutDate;
  const startDate = tripSheetData.startdate || selectedCustomerData.startdate || selectedCustomerDatas.startdate || book.startdate
  const endkm = tripSheetData.closekm || selectedCustomerData.closekm || selectedCustomerDatas.closekm || book.closekm
  const startkm = tripSheetData.startkm || selectedCustomerData.startkm || selectedCustomerDatas.startkm || book.startkm
  const shedinkm = tripSheetData.shedin || selectedCustomerData.shedin || selectedCustomerDatas.shedin || book.shedin
  const dutiesdata = tripSheetData.duty || selectedCustomerData.duty || selectedCustomerDatas.duty || book.duty
  const dutydata = dutiesdata === "Transfer" || dutiesdata === "Outstation" ? dutiesdata : pack
  const closedata = tripSheetData.shedInDate || selectedCustomerData.shedInDate || selectedCustomerDatas.shedInDate || book.shedInDate
  const closedata2 = tripSheetData.closedate || selectedCustomerData.closedate || selectedCustomerDatas.closedate || book.closedate
  const triplabel = tripSheetData.tripid || selectedCustomerData.tripid || selectedCustomerDatas.tripid || book.tripid
  const totaldaysvalue = dutiesdata === "Outstation" ? TotalDays : "-"
  // console.log(triplabel, "lllhcl")


  const Totalkm = Number(endkm)
  const Totalkmoutsation = Number(shedinkm)
  // console.log(attachedImage,"atthck")




  function removeSeconds(time) {
    // Split the time string by colon (:)
    if (time !== "undefined") {
      const timeParts = time?.split(':');

      // Check if there are seconds (length 3), return hours:minutes
      if (timeParts?.length === 3) {
        return `${timeParts[0]}:${timeParts[1]}`;
      }

      // If there's only hours:minutes, return it as is
      return time;
    }

  }
  const [numPages, setNumPages] = useState(0);




  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  // console.log(attachedImage, "yyyyyyyyyyyyyy");

  const targetRef = useRef();

  return (
    <>
      <div className="invoice-wrapper" ref={targetRef}>
        <article className='artical-top'>

          <div className='invoice-container-header'>
            <div className="logo-image-invoice">
              {selectedImage && <img src={selectedImage} alt={"Logo"} />}
            </div>
            <div className="invoice-address">
              <div>
                <p className='invoice-address-detials-hcl'>{organizationdata?.addressLine1}
                  {organizationdata?.addressLine2}
                  {organizationdata?.city}<br />
                  {organizationdata?.contactEmail}</p>
                <p className='invoice-contact-details-hcl'>Contact:-{organizationdata?.contactPhoneNumber}</p>
              </div>
            </div>
          </div>
          <div className="main-invoice-container">
            <div className='first-table-invoice-container'>
              <table id='table-invoice' className="firstleftTable">
                <tr>
                  <th id='table-header-hcl'><span>Client Name:</span></th>
                  <td id='table-data'><span >{tripSheetData.customer || selectedCustomerData.customer || selectedCustomerDatas.customer || book.customer}</span></td>
                </tr>
                <tr style={{ height: "60px" }}>
                  <th id='table-header-hcl'><span>Address:</span></th>
                  <td id='table-data' style={{ padding: "2px 6px" }}><p className='table-data-add-hcl'>{customerAddress}</p></td>
                </tr>
                <tr>
                  <th id='table-header-hcl'><span>Category:</span></th>
                  <td id='table-data'><span>{tripSheetData.orderedby || selectedCustomerData.orderedby || selectedCustomerDatas.orderedby || book.orderedby}</span></td>
                </tr>
                <tr>
                  <th id='table-header-hcl'><span>Fuel Type:</span></th>
                  <td id='table-data'><span>{fueltype}</span></td>
                </tr>

                <tr>
                  <th id='table-header-hcl'><span>Emp. No:</span></th>
                  <td id='table-data'><span>{tripSheetData.employeeno || selectedCustomerData.employeeno || selectedCustomerDatas.employeeno || book.employeeno}</span></td>
                </tr>
                <tr>
                  <th id='table-header-hcl'><span>Emp.Name:</span></th>
                  <td id='table-data'><span>{tripSheetData.guestname || selectedCustomerData.guestname || selectedCustomerDatas.guestname || book.guestname}</span></td>
                </tr>
                <tr style={{ height: "60px" }}>
                  <th id='table-header-hcl'><span>Report Add:</span></th>
                  <td id='table-data'><p className='table-data-add-hcl'>{tripSheetData.address1 || selectedCustomerData.address1 || selectedCustomerDatas.address1 || book.address1} {tripSheetData.streetno || selectedCustomerData.streetno || selectedCustomerDatas.streetno || book.streetno} {tripSheetData.city || selectedCustomerData.city || selectedCustomerDatas.city || book.city} </p></td>
                </tr>
                <tr>
                  <th id='table-header-hcl' ><span>Drop Address:</span></th>
                  <td id='table-data'><span>{tripSheetData.useage || selectedCustomerData.useage || selectedCustomerDatas.useage || book.useage} </span></td>
                </tr>

                {/* <tr>
                                    <th id='table-header-hcl'><span>Report To</span></th>
                                    <td id='table-data'><span>{tripSheetData.guestname || selectedCustomerData.guestname || selectedCustomerDatas.guestname || book.guestname}</span></td>
                                </tr>
                                <tr>
                                    <th id='table-header-hcl'><span >Reporting @</span></th>
                                    <td id='table-data'><span>{tripSheetData.customer || selectedCustomerData.customer || selectedCustomerDatas.customer || book.customer}</span></td>
                                </tr> */}
              </table>
              <table id='table-invoice' className="firstTable">
                <tr>
                  <th id='table-header-hcl'>Trip No:</th>
                  <td id='table-data'>TS{tripSheetData.tripid || selectedCustomerData.tripid || selectedCustomerDatas.tripid || book.tripid}</td>
                </tr>
                <tr>
                  <th id='table-header-hcl'>Date:</th>
                  <td id='table-data'>{dayjs(date).format('DD-MM-YYYY')}</td>
                </tr>
                <tr>
                  <th id='table-header-hcl'>Duty Type:</th>
                  <td id='table-data'>{tripSheetData.duty || selectedCustomerData.duty || selectedCustomerDatas.duty || book.duty}</td>
                </tr>
                {/* <tr>
                                    <th id='table-header-hcl'>Vehicle Name:</th>
                                    <td id='table-data'><span>{tripSheetData.vehicleName2 || selectedCustomerData.vehicleName2 || selectedCustomerDatas.vehicleName2 || book.vehicleName2}</span></td>
                                </tr> */}
                <tr>
                  <th id='table-header-hcl'>Vehicle Name:</th>
                  <td id='table-data'><span>{tripSheetData.vehicleName || selectedCustomerData.vehicleName || selectedCustomerDatas.vehicleName || book.vehicleName}</span></td>
                </tr>
                <tr>
                  <th id='table-header-hcl'><span >Vehicle No:</span></th>
                  <td id='table-data'><span>{tripSheetData.vehRegNo || selectedCustomerData.vehRegNo || selectedCustomerDatas.vehRegNo || book.vehRegNo}</span></td>
                </tr>
                <tr>
                  <th id='table-header-hcl'><span >Driver Name:</span></th>
                  <td id='table-data'><span>{selectedCustomerDatas.driverName || selectedCustomerData.driverName || tripSheetData.driverName || selectedCustomerDatas.driverName || book.driverName} </span></td>
                </tr>
                <tr>
                  <th id='table-header-hcl'><span >Driver Mobile:</span></th>
                  <td id='table-data'><span>{tripSheetData.mobileNo || selectedCustomerData.mobileNo || selectedCustomerDatas.mobileNo || book.mobileNo}</span></td>
                </tr>
                <tr>
                  <th id='table-header-hcl'><span >Request No:</span></th>
                  <td id='table-data'><span>{tripSheetData.request || selectedCustomerData.request || selectedCustomerDatas.request || book.request}</span></td>
                </tr>
                <tr>
                  <th id='table-header-hcl'><span >Service City:</span></th>
                  <td id='table-data'><span>{tripSheetData.department || selectedCustomerData.department || selectedCustomerDatas.department || book.department}</span></td>
                </tr>
                <tr>
                  <th id='table-header-hcl'><span >Package:</span></th>
                  <td id='table-data'><span>{dutydata}</span></td>
                </tr>
                <tr>
                  <th id='table-header-hcl'><span>Escort Route:</span></th>
                  <td id='table-data'><span>{tripSheetData.escort || selectedCustomerData.escort || selectedCustomerDatas.escort || book.escort}</span></td>
                </tr>
                <tr>
                  <th id='table-header-hcl'><span>Airport Transfer:</span></th>
                  <td id='table-data'><span>{airportTransfer || tripSheetData.empolyeeno || selectedCustomerData.empolyeeno || selectedCustomerDatas.empolyeeno || book.empolyeeno}</span></td>
                </tr>

                <tr>
                  <th id='table-header-hcl'><span>CCode:</span></th>
                  <td id='table-data'><span>{tripSheetData.customercode || selectedCustomerData.customercode || selectedCustomerDatas.customercode || book.customercode}</span></td>
                </tr>
                {/* <tr>
                                    <th id='table-header-hcl'><span >Segment:</span></th>
                                    <td id='table-data'><span>{tripSheetData.mobileNo || selectedCustomerData.mobileNo || selectedCustomerDatas.mobileNo || book.mobileNo}</span></td>
                                </tr> */}
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
                    {
                      dutiesdata === "Outstation" ?


                        <>
                          <tr>
                            <td id='table-datas-hcl'><span >Closing</span></td>
                            {/* <td id='table-datas-hcl'><span >{tripSheetData.shedInDate || selectedCustomerData.shedInDate || selectedCustomerDatas.shedInDate || book.shedInDate}</span></td> */}
                            <td id='table-datas-hcl'><span >{closedata ? dayjs(closedata).format("DD-MM-YYYY") : ""}</span></td>
                            <td id='table-datas-hcl'><span >{removeSeconds(tripSheetData.shedintime || selectedCustomerData.shedintime || selectedCustomerDatas.shedintime || book.shedintime)}</span></td>
                            <td id='table-datas-hcl'><span >{shedinkm}</span></td>
                          </tr>

                          <tr>
                            <td id='table-datas-hcl'><span >Releasing</span></td>
                            <td id='table-datas-hcl'><span >{closedata2 ? dayjs(closedata2).format("DD-MM-YYYY") : ""}</span></td>
                            {/* <td id='table-datas-hcl'><span >{tripSheetData.closedate || selectedCustomerData.closedate || selectedCustomerDatas.closedate || book.closedate}</span></td> */}
                            <td id='table-datas-hcl'><span >{removeSeconds(tripSheetData.closetime || selectedCustomerData.closetime || selectedCustomerDatas.closetime || book.closetime)}</span></td>
                            <td id='table-datas-hcl'><span >{endkm}</span></td>
                          </tr>
                          <tr>
                            <td id='table-datas-hcl'><span >Reporting</span></td>
                            <td id='table-datas-hcl'><span >{startDate ? dayjs(startDate).format("DD-MM-YYYY") : ""}</span></td>
                            <td id='table-datas-hcl'><span >{removeSeconds(tripSheetData.starttime || selectedCustomerData.starttime || selectedCustomerDatas.starttime || book.starttime)}</span></td>
                            <td id='table-datas-hcl'><span >{startkm}</span></td>
                          </tr>

                          <tr>
                            <td id='table-datas-hcl'><span >Starting</span></td>
                            <td id='table-datas-hcl'><span >{shedOutDate ? dayjs(shedOutDate).format("DD-MM-YYYY") : ""}</span></td>
                            <td id='table-datas-hcl'><span >{removeSeconds(tripSheetData.reporttime || selectedCustomerData.reporttime || selectedCustomerDatas.reporttime || book.reporttime)}</span></td>
                            <td id='table-datas-hcl'><span >-</span></td>
                          </tr>

                          <tr>
                            <td id='table-datas-hcl'><span >Total</span></td>
                            {/* <td id='table-datas-hcl'><span >{tripSheetData.totaldays || selectedCustomerData.totaldays || selectedCustomerDatas.totaldays || book.totaldays}</span>days</td>
                                            <td id='table-datas-hcl'><span >{tripSheetData.totaltime || selectedCustomerData.totaltime || selectedCustomerDatas.totaltime || book.totaltime || formData.totaltime}</span></td>
                                            <td id='table-datas-hcl'><span >{totalhour}</span></td> */}
                            {/* <td id='table-datas-hcl'><span >{TotalDays}</span></td> */}
                            <td id='table-datas-hcl'><span >{totaldaysvalue}</span></td>
                            <td id='table-datas-hcl'><span >{Totaltimes}</span></td>
                            <td id='table-datas-hcl'><span >{Totalkmoutsation}</span></td>
                          </tr>
                        </>
                        :
                        <>
                          <tr>
                            <td id='table-datas-hcl'><span >Closing</span></td>
                            {/* <td id='table-datas-hcl'><span >{tripSheetData.shedInDate || selectedCustomerData.shedInDate || selectedCustomerDatas.shedInDate || book.shedInDate}</span></td> */}
                            <td id='table-datas-hcl'><span >{closedata ? dayjs(closedata).format("DD-MM-YYYY") : ""}</span></td>
                            <td id='table-datas-hcl'><span >-</span></td>
                            <td id='table-datas-hcl'><span >-</span></td>
                          </tr>

                          <tr>
                            <td id='table-datas-hcl'><span >Releasing</span></td>
                            <td id='table-datas-hcl'><span >{closedata2 ? dayjs(closedata2).format("DD-MM-YYYY") : ""}</span></td>
                            {/* <td id='table-datas-hcl'><span >{tripSheetData.closedate || selectedCustomerData.closedate || selectedCustomerDatas.closedate || book.closedate}</span></td> */}
                            <td id='table-datas-hcl'><span >{removeSeconds(tripSheetData.closetime || selectedCustomerData.closetime || selectedCustomerDatas.closetime || book.closetime)}</span></td>
                            <td id='table-datas-hcl'><span >{Totalkm}</span></td>
                          </tr>
                          <tr>
                            <td id='table-datas-hcl'><span >Reporting</span></td>
                            <td id='table-datas-hcl'><span >{startDate ? dayjs(startDate).format("DD-MM-YYYY") : ""}</span></td>
                            <td id='table-datas-hcl'><span >{removeSeconds(tripSheetData.starttime || selectedCustomerData.starttime || selectedCustomerDatas.starttime || book.starttime)}</span></td>
                            <td id='table-datas-hcl'><span >{ }{0}</span></td>
                          </tr>

                          <tr>
                            <td id='table-datas-hcl'><span >Starting</span></td>
                            <td id='table-datas-hcl'><span >{shedOutDate ? dayjs(shedOutDate).format("DD-MM-YYYY") : ""}</span></td>
                            <td id='table-datas-hcl'><span >-</span></td>
                            <td id='table-datas-hcl'><span >-</span></td>
                          </tr>

                          <tr>
                            <td id='table-datas-hcl'><span >Total</span></td>
                            {/* <td id='table-datas-hcl'><span >{tripSheetData.totaldays || selectedCustomerData.totaldays || selectedCustomerDatas.totaldays || book.totaldays}</span>days</td>
                                            <td id='table-datas-hcl'><span >{tripSheetData.totaltime || selectedCustomerData.totaltime || selectedCustomerDatas.totaltime || book.totaltime || formData.totaltime}</span></td>
                                            <td id='table-datas-hcl'><span >{totalhour}</span></td> */}
                            {/* <td id='table-datas-hcl'><span >{TotalDays}</span></td> */}
                            <td id='table-datas-hcl'><span >{totaldaysvalue}</span></td>
                            <td id='table-datas-hcl'><span >{Totaltimes}</span></td>
                            <td id='table-datas-hcl'><span >{Totalkm}</span></td>
                          </tr>
                        </>
                    }
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
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "baseline" }}>
                    {loading ? (
                      <>
                      <div className='loading-spin-signature' ></div>
                        <p className='guest-sign-text' >Guest Signature</p>
                        </>
                    ) : (
                       signimageUrl !== "" ?
                      <div>
                        <img className='dialogboximg' src={signimageUrl} alt=" " />
                        <p className='guest-sign-text' >Guest Signature</p>

                      </div>

                      :
                      <div>
                        <div className='dialogboximg' ></div>
                        <p className='guest-sign-text' >Guest Signature</p>

                      </div>
                    
                    )}
                   
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div className='total-values-hcl'>
            <div id='Totals'><span id='title' style={{ fontWeight: "600" }}>Total Parking:  </span><span>{tripSheetData.parking || selectedCustomerData.parking || selectedCustomerDatas.parking || book.parking}</span></div>
            <div id='Totals'><span id='title' style={{ fontWeight: "600" }}>Total Toll:  </span><span>{tripSheetData.toll || selectedCustomerData.toll || selectedCustomerDatas.toll || book.toll}</span></div>
            <div id='Totals'><span id='title' style={{ fontWeight: "600" }}>Total Permit:  </span><span>{tripSheetData.permit || selectedCustomerData.permit || selectedCustomerDatas.permit || book.permit}</span></div>
          </div>


          <div className='total-map-section' >

            <div className='tripsheet-location-img-hcl'>

              {/* <img src={GmapimageUrl} alt='mapimage' /> */}
             {mapLoading ? (
              <div className='loading-spin'></div>
             ):(
               GmapimageUrl !== "" ?
                <img src={GmapimageUrl} alt='mapimage' /> : <></>
             )}
            </div>
            <div className="tripsheet-RouteSummary-hcl">
             {routeLoading ? (
              <div className='loading-spin-route'></div>
             ):(
               routeData.length > 0 && (
                <div >
                  <h2 style={{ margin: "0px", textAlign: "center", fontSize: "15px", fontWeight: '600' }}>Route Summary</h2>

                  {routeData.map((data, index) => (
                    <li key={index} className='li-routesummary'>
                      {/* <p style={{margin:'0px'}}><strong>{data.trip_type}</strong>: {data.place_name}</p> */}
                      <p style={{ margin: '0px' }}>
                        {/* <span style={{ marginRight: '5px' }}><GoDotFill /></span>  */}
                        <strong>{data.trip_type}</strong>: {data.place_name}</p>
                    </li>
                  ))}

                </div>
              )
             )}
            </div>

          </div>


          {/* <div className="attached-toll" ref={targetRef}>
        <ol type="1" style={{ listStyleType: "none", padding: 0 }}>
          {Array.isArray(attachedImage) &&
            attachedImage.map((file, index) => {
              const isPdf = file.endsWith(".pdf");
              return (
                <li
                  key={index}
                  style={{
                    pageBreakBefore: "always", 
                    padding: "20px",
                    marginBottom: "20px",
                  }}
                >
                  {isPdf ? (
                    <div>
                      <Document
                        file={file}
                        onLoadSuccess={onDocumentLoadSuccess}
                        style={{
                          width: "595px", // A4 width
                          height: "auto",
                          margin: "auto",
                        }}
                      >
                        {Array.from(new Array(numPages), (el, pageIndex) => (
                          <Page
                            key={`page_${pageIndex + 1}`}
                            pageNumber={pageIndex + 1}
                            scale={1}
                            style={{
                              display: "block",
                              width: "595px",
                              height: "auto",
                              marginBottom: "20px",
                              pageBreakBefore: "always",
                            }}
                          />
                        ))}
                      </Document>
                    </div>
                  ) : (
                    <img
                      src={file}
                      alt={`image_${index}`}
                      style={{
                        width: "595px", // A4 width
                        height: "auto",
                        marginBottom: "20px",
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                        pageBreakBefore: "always",
                      }}
                    />
                  )}
                </li>
              );
            })}
        </ol>
      </div> */}
        </article>
      </div>
      {attachedImage?.length > 0 ? <>


        <div className="attached-toll-hcl" >
          <ol type="1" style={{ listStyleType: "none", padding: 0 }}>
            {Array.isArray(attachedImage) &&
              // attachedImage.map((file, index) => {
              //   const isPdf = file.endsWith(".pdf");
              attachedImage
                .filter((file) => file && file.trim() !== "") // Filter out empty or invalid files
                .map((file, index) => {
                  const isPdf = file.endsWith(".pdf");
                  return (
                    <>
                      {isPdf ?
                        <li
                          key={index}
                          style={{
                            // pageBreakAfter: "always", 
                            pageBreakAfter: isPdf ? "always" : "auto",
                            // padding: "20px",
                            // marginBottom: "50",
                          }}
                          className='li-files'
                        >
                          {/* {isPdf ? (
                    <div style={{height:"500px", background:"red"}}>
                      <Document
                        file={file}
                        onLoadSuccess={onDocumentLoadSuccess}
                        style={{
                          width: "595px", 
                          height: "auto",
                          margin: "auto",
                        }}
                      >
                        {Array.from(new Array(numPages), (el, pageIndex) => (
                          <Page
                            key={page_${pageIndex + 1}}
                            pageNumber={pageIndex + 1}
                            scale={1}
                            style={{
                              display: "block",
                              width: "595px",
                              height: "auto",
                              marginBottom: "90px",
                            }}
                          />
                        ))}
                      </Document>
                    </div>
                  )  */}


                          {/* <div className='upload-pdf-hcl' >
                         <Document
                           file={file}
                           onLoadSuccess={onDocumentLoadSuccess}
                           style={{
                             // margin: "auto",
                             width:"100%"
                           }}
                         >
                           {Array.from(new Array(numPages), (el, pageIndex) => (
                             <Page
                               key={page_${pageIndex + 1}}
                               pageNumber={pageIndex + 1}
                               scale={0.9} // Adjust scale to fit the page to the desired size
                               style={{
                                 // display: "block",
                                 // width: "auto", // Let the width adjust automatically
                                 // margin: "20px auto", // Add spacing for better display
                               }}
                             />
                           ))}
                         </Document>
                       </div> */}




                          <div className='upload-pdf-hcl' >
                            <Document
                              file={file}
                              onLoadSuccess={onDocumentLoadSuccess}
                              style={{
                                margin: "auto",
                                width: "100%",
                                padding: "30px"
                              }}
                            >
                              {Array.from(new Array(numPages), (el, pageIndex) => (
                                <Page
                                  key={`page_${pageIndex + 1}`}
                                  pageNumber={pageIndex + 1}
                                  scale={0.7} // Adjust scale to fit the page to the desired size
                                  style={{
                                    // display: "block",
                                    width: "100%", // Let the width adjust automatically
                                    // margin: "20px auto", // Add spacing for better display
                                    border: "2px solid red",
                                  }}
                                />
                              ))}
                            </Document>
                          </div>




                        </li>
                        : ''}



                    </>

                  );
                })}
          </ol>
        </div>


        <div className="attached-toll-hcl">
          <ol type="1" style={{ listStyleType: "none", padding: 0 }}>
            {Array.isArray(attachedImage) &&

              attachedImage
                .filter((file) => file && file.trim() !== "") // Filter out empty or invalid files
                .map((file, index) => {
                  // const image = file.endsWith('.jpg', '.jpeg', '.png');
                  const image = !file.endsWith('.pdf');
                  return (
                    <>
                      {image ?
                        <li
                          key={index}
                          style={{
                            // pageBreakAfter: "always", 
                            // pageBreakAfter: isPdf ? "always" : "auto",
                            // padding: "20px 20px 0px 20px",
                            // marginBottom: "50",
                          }}
                          className='li-files'>



                          <div className='upload-img-hcl'>
                            {/* <img
                                  src={file}
                                  alt={`image_${index}`}                             
                                  className='image-hcl'
                                 
                                /> */}
                            {/* <img src={`${file}?t=${new Date().getTime()}`} alt={`image_${index}`} className='image-hcl' /> */}
                            <img src={`${file}`} alt={`image_${index}`} className='image-hcl' />

                          </div>



                        </li> : ''}
                    </>








                  );
                })}
          </ol>
        </div></>
        : ""
      }
      {/* <Button onClick={() => generatePDF(targetRef, { filename: 'E-tripsheet.pdf', margin: Margin.LARGE, })}>Print</Button> */}



      <Button
        onClick={async () => {
          const attachedImageArray = Array.isArray(attachedImage) ? attachedImage : [attachedImage];
          const imageFiles = attachedImageArray.filter((file) => !file.endsWith(".pdf"));

          const convertToBase64 = async (url) => {
            const res = await fetch(url);
            const blob = await res.blob();
            return new Promise((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.readAsDataURL(blob);
            });
          };

          const topCanvas = await html2canvas(targetRef.current, {
            scale: 2,
            useCORS: true,
          });
          const topImage = topCanvas.toDataURL("image/png");

          const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

          const pageWidth = doc.internal.pageSize.getWidth();
          const pageHeight = doc.internal.pageSize.getHeight();

          // const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
          const padding = 2;
          doc.addImage(topImage, "PNG", 0, 0, pageWidth - 2 * padding, pageHeight - 2 * padding);

          // doc.addImage(topImage, "PNG", 0, 0, 190, 270);

          // const pageWidth = doc.internal.pageSize.getWidth();
          // const pageHeight = doc.internal.pageSize.getHeight();

          const imgWidth = 150;
          const imgHeight = 130;
          const gap = 20;

          for (let i = 0; i < imageFiles.length; i += 2) {
            doc.addPage();

            const totalHeight = imgHeight * 2 + gap;

            const startY = (pageHeight - totalHeight) / 2;

            const centerX = (pageWidth - imgWidth) / 2;

            // const img1 = await convertToBase64(imageFiles[i]);
            // doc.addImage(img1, "PNG", centerX, startY, imgWidth, imgHeight);

            const base64 = await convertToBase64(imageFiles[i]);
            const isPng = base64.startsWith("data:image/png");
            const format = isPng ? "PNG" : "JPEG"; 
            doc.addImage(base64, format, centerX, startY, imgWidth, imgHeight);

            if (imageFiles[i + 1]) {
              const img2 = await convertToBase64(imageFiles[i + 1]);
              doc.addImage(img2, "PNG", centerX, startY + imgHeight + gap, imgWidth, imgHeight);
            }
          }


          doc.save(`TS${triplabel} E-tripsheet.pdf`);
        }}
      >
        Print
      </Button>

    </>
  );
};

export default InvoiceHCL;
