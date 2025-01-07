import './invoice.css';
import { useRef,useState } from 'react';
import { Button } from '@mui/material';
import generatePDF from 'react-to-pdf';
import dayjs from 'dayjs';
import { Document, Page } from 'react-pdf';

const Invoice = ({ tripSheetData, organizationdata, selectedImage, selectedCustomerData, attachedImage, signimageUrl, routeData, GmapimageUrl, selectedCustomerDatas, book,Totaltimes, totalkm,TotalDays }) => {


  const startkm = tripSheetData.shedin || selectedCustomerData.shedin || selectedCustomerDatas.shedin || book.shedin
  const endkm = tripSheetData.shedout || selectedCustomerData.shedout  || selectedCustomerDatas.shedout || book.shedout 
  const startdata = tripSheetData.shedInDate || selectedCustomerData.shedInDate || selectedCustomerDatas.shedInDate || book.shedInDate
 
  const tripidlable = tripSheetData.tripid || selectedCustomerData.tripid || selectedCustomerDatas.tripid || book.tripid
  // const enddata =
  const Totalkm = Number(startkm) - Number(endkm)

  function removeSeconds(time) {
    // Split the time string by colon (:)
    if(time !== "undefined"){
    const timeParts = time.split(':');

    // Check if there are seconds (length 3), return hours:minutes
    if (timeParts.length === 3) {
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
                  <th id='table-header'>Trip No:</th>
                  <td id='table-data'>TS{tripSheetData.tripid || selectedCustomerData.tripid || selectedCustomerDatas.tripid || book.tripid}</td>
                </tr>
                <tr>
                  <th id='table-header'>Date:</th>
                  <td id='table-data'>{tripSheetData.startdate || selectedCustomerData.startdate || selectedCustomerDatas.startdate || book.startdate ? dayjs(tripSheetData.startdate || selectedCustomerData.startdate || selectedCustomerDatas.startdate || book.startdate).format("DD-MM-YYYY"):""}</td>
                </tr>
                <tr>
                  <th id='table-header'>Duty Type:</th>
                  <td id='table-data'>{tripSheetData.duty || selectedCustomerData.duty || selectedCustomerDatas.duty || book.duty}</td>
                </tr>
                <tr>
                  <th id='table-header'>Vehicle Name:</th>
                  <td id='table-data'><span>{tripSheetData.vehicleName2 || selectedCustomerData.vehicleName2 || selectedCustomerDatas.vehicleName2 || book.vehicleName2}</span></td>
                </tr>
                <tr>
                  <th id='table-header'><span >Vehicle No:</span></th>
                  <td id='table-data'><span>{tripSheetData.vehRegNo || selectedCustomerData.vehRegNo || selectedCustomerDatas.vehRegNo || book.vehRegNo}</span></td>
                </tr>
                <tr>
                  <th id='table-header'><span >Driver Name:</span></th>
                  <td id='table-data'><span>{selectedCustomerDatas.driverName || selectedCustomerData.driverName || tripSheetData.driverName || selectedCustomerDatas.driverName || book.driverName}</span></td>
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
                 

                      <td id='table-datas'><span >Closing</span></td>
                      {/* <td id='table-datas'><span >{tripSheetData.shedInDate || selectedCustomerData.shedInDate || selectedCustomerDatas.shedInDate || book.shedInDate}</span></td> */}
                      <td id='table-datas'><span >{startdata ? dayjs(startdata).format('DD-MM-YYYY'):""}</span></td>
                      <td id='table-datas'><span >{removeSeconds(tripSheetData.shedintime || selectedCustomerData.shedintime || selectedCustomerDatas.shedintime || book.shedintime)}</span></td>
                      <td id='table-datas'><span >{tripSheetData.shedin || selectedCustomerData.shedin || selectedCustomerDatas.shedin || book.shedin}</span></td>
                    </tr>
                  
                    <tr>
                      <td id='table-datas'><span >Starting</span></td>
                      <td id='table-datas'><span >{tripSheetData.shedOutDate || selectedCustomerData.shedOutDate || selectedCustomerDatas.shedOutDate || book.shedOutDate ? dayjs(tripSheetData.shedOutDate || selectedCustomerData.shedOutDate || selectedCustomerDatas.shedOutDate || book.shedOutDate).format("DD-MM-YYYY"):""}</span></td>
                      <td id='table-datas'><span >{ removeSeconds(tripSheetData.reporttime || selectedCustomerData.reporttime || selectedCustomerDatas.reporttime || book.reporttime)}</span></td>
                      <td id='table-datas'><span >{tripSheetData.shedout || selectedCustomerData.shedout || selectedCustomerDatas.shedout || book.shedout}</span></td>

                      
                  
                    </tr>
                    
                    <tr>
                      <td id='table-datas'><span >Total</span></td>
                      {/* <td id='table-datas'><span >{tripSheetData.totaldays || selectedCustomerData.totaldays || selectedCustomerDatas.totaldays || book.totaldays}</span>days</td> */}
                      <td id='table-datas'><span >{TotalDays}</span>days</td>
                      {/* <td id='table-datas'><span >{tripSheetData.totaltime || selectedCustomerData.totaltime || selectedCustomerDatas.totaltime || book.totaltime || formData}</span></td> */}
                      <td id='table-datas'><span >{Totaltimes}</span></td>
                      <td id='table-datas'><span >{Totalkm}</span></td>
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

          <div style={{display:"flex",gap:"6px"}}>

          
          <div className='tripsheet-location-img'>

            {/* <img src={GmapimageUrl} alt='mapimage' /> */}
            {GmapimageUrl !== "" ?
              <img src={GmapimageUrl} alt='mapimage' style={{width:"100%", height:"100%"}}/> : <></>}
          </div>
          {/* <div className="tripsheet-RouteSummary">
            <h2>Route Summary</h2>
            <ol type="1">
              {routeData.length > 0 && routeData?.map((data, index) => (
                <li><p key={index}><strong>{data.trip_type}</strong>: {data.place_name}</p></li>
              ))}
            </ol>
          </div> */}
          <div  className="tripsheet-RouteSummary-normal">
            {routeData.length > 0 && (
              <div>
                <h2 style={{margin:"0px"}}>Route Summary</h2>
                <ol type="1">
                  {routeData.map((data, index) => (
                    <li key={index}>
                      <p><strong>{data.trip_type}</strong>: {data.place_name}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          </div>
          
          {/* <div className='attached-toll'>
            <ol type="1">
              {Array.isArray(attachedImage) && attachedImage?.map((image, index) => (
                <img className='attached-image' key={index} src={image} alt={`image_${index}`} />
              ))}
            </ol>
          </div> */}
          <div className="attached-toll">
            <ol type="1" style={{ listStyleType: "none", padding: 0 }}>
              {Array.isArray(attachedImage) &&
                attachedImage.map((file, index) => {
                  const isPdf = file.endsWith(".pdf");
                  return (
                    <>
                    {isPdf ?                   
                      <li
                      key={index}
                      style={{
                        pageBreakAfter: "always",
                        padding: "20px",
                        // marginBottom: "140px",
                       
                      }}
                    >
                        <div className='upload-pdf'>
                          <Document
                            file={file}
                            onLoadSuccess={onDocumentLoadSuccess}
                            style={{
                              width: "595px", // Width for A4 page
                              // height: "auto",
                              height: "595px",
                              margin: "auto",
                            
                            }}
                          >
                            {Array.from(new Array(numPages), (el, pageIndex) => (
                              <Page
                                key={`page_${pageIndex + 1}`}
                                pageNumber={pageIndex + 1}
                                scale={1}                               
                                className="custom-page-invoice"

                                
                              />
                            ))}
                          </Document>
                        </div>
                      
                    </li> :
                    
                    ''}

                    </>
                    
                  );
                })}
            </ol>
          </div>

          <div className="attached-toll">
            <ol type="1" style={{ listStyleType: "none", padding: 0 }}>
              {Array.isArray(attachedImage) &&
                attachedImage.map((file, index) => {
                  const isimage = !file.endsWith(".pdf");
                  return (
                    <>

                    {isimage ? 

                      <li
                      key={index}
                      style={{
                        pageBreakAfter: "always",
                        padding: "20px",
                        // marginBottom: "140px",
                       
                      }}
                      className='li-files'
                    >
                    

                        <div

                          className='upload-img'
                        >
                          <img
                            src={file}
                            alt={`image_${index}`}
                            style={{
                              width: "100%",
                              height: "100%",
                              // marginBottom: "20px",
                            }}
                          />
                        </div>
                      
                    </li>

                    :''}

                    </>
                   
                  );
                })}
            </ol>
          </div>

        </article>
      </div>
      <Button onClick={() => generatePDF(targetRef, { filename: `TS${tripidlable}E-tripsheet.pdf`,resolution:3,
      method:'save',
      page:{
        margin: { top: 10, right: 10, bottom: 38, left: 10 },
        format: "a4",
        orientation: "portrait",
      },
      canvas: {
        mimeType: "image/jpeg",
        qualityRatio: 5,
      },
       })}>Print</Button>
      {/* <Button
  onClick={() => {
    const pdfFiles = attachedImage.filter((file) => file.endsWith(".pdf"));
    const imageFiles = attachedImage.filter((file) => !file.endsWith(".pdf"));

    // Custom settings for PDF files
    const pdfOptions = {
      filename: "E-tripsheet.pdf",
      resolution: 3,
      method: "save",
      page: {
        margin: { top: 10, right: 10, bottom: 35, left: 10 },
        format: "a4",
        orientation: "portrait",
      },
      canvas: {
        mimeType: "image/jpeg",
        qualityRatio: 5,
      },
    };

    // Custom settings for image files
    const imageOptions = {
      filename: "E-tripsheet.pdf",
      resolution: 2,
      method: "save",
      page: {
        margin: { top: 5, right: 5, bottom: 5, left: 5 },
        format: "a4",
        orientation: "portrait",
      },
      canvas: {
        mimeType: "image/png",
        qualityRatio: 1.5,
      },
    };

    // Decide which options to use
    if (pdfFiles.length > 0 && imageFiles.length === 0) {
      generatePDF(targetRef, pdfOptions); // If only PDFs exist
    } else if (imageFiles.length > 0 && pdfFiles.length === 0) {
      generatePDF(targetRef, imageOptions); // If only images exist
    } else {
      // Handle mixed content (adjust as needed)
      generatePDF(targetRef, {
        ...pdfOptions,
        filename: "E-tripsheet.pdf",
      });
    }
  }}
>
  Print
</Button> */}
    </>
  );
};

export default Invoice;
