import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import Button from "@mui/material/Button";
import { PdfData } from "../../Transfer/TransferReport/PdfContext";
import generatePDF from 'react-to-pdf';
import './InvoicePdf.css';
import dayjs from "dayjs";
import numWords from 'num-words'
import Invoice from "./Invoice";
import { APIURL } from "../../../url";

import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;



const InvoicePdf = ({ book, logo, organizationdata, customerData, billdatadate, stateDetails, otherStations, invoicedata }) => {
    // const { setParticularPdf, particularRefNo, setIndividualBilled, individualBilled } = PdfData();
    const { setParticularPdf, particularRefNo, setIndividualBilled, individualBilled } = PdfData();
    // const [billingDate] = useState(dayjs());
    // console.log(billdatadate,"billlldate")
    const { attachedImage, GmapimageUrl, signimageUrl, routeData, IndividualBillData, setIndividualBillData } = Invoice();
    // console.log(attachedImage.length > 0, attachedImage)
    // const { attachedImage, GmapimageUrl, signimageUrl, routeData} = Invoice();
    // const apiUrl = APIURL;
    const targetRef = useRef();
    const [numPages, setNumPages] = useState(null);

    const handlePopupClose = () => {
        setParticularPdf(false);
    }
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);

    }

    const formatAddress = (address) => {
        return address?.split('\n').map((line, index) => <p key={index} style={{marginTop:'0px'}}>{line}</p>);
    }
    // console.log(otherStations,"pppp",otherStations?.data)


    // const startDate = dayjs(book.startdate);
    // const billingdate = startDate.format('YYYY-MM-DD');
    // const startDate = dayjs(book.startdate);
    // const billingdate = book.startdate ? dayjs(book.startdate).format('YYYY-MM-DD') : boo
    const tollparking = parseInt(book.permit | 0) + parseInt(book.parking || 0) + parseInt(book.toll || 0);
    const totalAmount = parseInt(book.totalcalcAmount || 0) - tollparking
    console.log(totalAmount,"booktotal")
    // const totalAmount = parseInt(book.totalcalcAmount); // Ensure the total amount is parsed as a number
    // const gstAmount = customerData?.gstTax / 2
    const gstAmount1 = otherStations?.data / 2;
    const othergst = otherStations?.data
    // const cgst = totalAmount * gstAmount / 100 || 0;
    // const sgst = totalAmount * gstAmount / 100 || 0;

    const cgst = totalAmount * gstAmount1 / 100 || 0;
    const sgst = totalAmount * gstAmount1 / 100 || 0;
    const paymentValue = totalAmount + cgst + sgst + tollparking || 0;
    const paymentValue1 = paymentValue.toFixed(0)
    console.log(paymentValue1, "ooooo")
    const AmountInWords = numWords(parseInt(paymentValue1)) || 0;
    // console.log(AmountInWords,"llll",paymentValue)

    // setting the Billed details
    // useEffect(() => {
    //     const Invoice_No = `RF${particularRefNo}`;
    //     const Trip_id = particularRefNo;
    //     const Status = "Billed";
    //     const Amount = book.totalcalcAmount || 0;
    //     // const Bill_Date = dayjs(book.startdate).format('YYYY-MM-DD');
    //     const Bill_Date = billingDate.format('YYYY-MM-DD');
    //     const Customer = customerData.customer;
    //     const billing_no = book.billingno;
    //     const guestname = book.guestname;

    //     setIndividualBillData({
    //         Invoice_No,
    //         Trip_id,
    //         Status,
    //         Amount,
    //         Bill_Date,
    //         Customer,
    //         billing_no,
    //         guestname
    //     });
    // }, [particularRefNo, book, customerData]);

    // console.log(stateDetails,'State details of indiviul billing ')

    const handlePrint = async () => {
        try {
            // generatePDF(targetRef, { filename: 'page.pdf' });
            generatePDF(targetRef, { filename: `${invoicedata}.pdf` });
            setIndividualBilled(!individualBilled);
            // await axios.post(`${apiUrl}/IndividualBill`, IndividualBillData);
        } catch (error) {
            console.log('An error occurred:', error);
        } finally {
            setParticularPdf(false);
        }
    };
    // console.log(customerData,"ppdata")

    // const handlePrint = async () => {
    //     setIndividualBilled(!individualBilled);
    //     setParticularPdf(false);
    //         generatePDF(targetRef, { filename: 'page.pdf' });


    // console.log(customerData,"lllllll")
    // const customerState = customerData.state;
    // const commonState = stateDetails?.find(item => item.state === customerState) || [];

    // console.log(commonState,"Common state of customers")


    // };
    // console.log(otherStations , "dfghjk");
    return (
        <>
            <div className="refdiv">
                <div style={{ display: 'flex', flexDirection: 'column', width: '784px', padding: 20 }} ref={targetRef}>
                    <div className="outline-div">
                        <div className="header-div">
                            <div style={{width:"60%"}}>
                                <p className="org-name">{organizationdata.organizationname}</p>
                                {otherStations.data6 !== null ? (
                                    // <h2 className="organisationtext">{commonState.address}</h2>
                                    <h2 className="organisationtext"  style={{height:"70px"}}>
                                        {otherStations.data5}
                                    {/* no. 55 thiruvalluvar purakm west tambaram chemnnai irumbiyur chengalpattu 45 */}

                                        </h2>
                                ) : (
                                    <>
                                        <h2 className="org-address" style={{height:"70px"}}>{organizationdata.addressLine1}</h2>
                                        {/* <h2 className="org-address">{orgaddress3}</h2> */}
                                    </>
                                )}

                                {/* <p className="org-address">{organizationdata.addressLine1}</p> */}
                                <p className="org-address">{organizationdata.contactEmail}</p>
                                <p className="org-mobile">Tel : {organizationdata.telephone} Mob : {organizationdata.contactPhoneNumber}</p>
                            </div>
                            <div className="image-div">
                                <img src={logo} className="image" alt="organisationimage" />
                                {otherStations.data6 !== null ?
                                    <p className="org-gst">GSTIN : {otherStations.data6}</p> :
                                    <p className="org-gst">GSTIN : {organizationdata.gstnumber}</p>}
                            </div>
                        </div>
                        <div className="taxinvoice">
                            <h2>TAX INVOICE</h2>
                        </div>
                        <div className="receiver-div">
                            <div>
                                <p className="details-receiver">Details of Receiver : {customerData.customer}</p>
                                {/* <p className="receiver-details">{customerData.customer}</p> */}
                                <div style={{ width: '300px',height:"80px" }}>
                                    {/* {formatAddress(customerData.address1)} */}
                                    {formatAddress(otherStations.data2)}
                                </div>
                                
                                {/* <p className="receiver-details">GSTIN : {customerData.gstnumber}</p> */}
                                <p className="receiver-details">GSTIN : {otherStations.data3}</p>
                            </div>
                            <div className="invno-div">
                                {/* <p className="receiver-details">Invoice No : {particularRefNo}</p> */}
                                <p className="receiver-details" style={{ paddingRight: "58px" }}>Invoice No : {invoicedata}</p>
                                {/* <p className="receiver-details">Invoice Date : {billingDate.format('YYYY-MM-DD')} </p> */}
                                {/* <p className="receiver-details">Invoice Date : {billdatadate ? billdatadate : billingDate.format('DD-MM-YYYY')} </p> */}
                                <p className="receiver-details">Invoice Date : {dayjs(billdatadate).format('DD-MM-YYYY')}</p>
                            </div>
                        </div>
                        <div className="table-div">
                            <table >
                                <thead>
                                    <tr>
                                        <th>SNO</th>
                                        <th>TRIP DATE</th>
                                        <th>TRIP NO</th>
                                        <th>PARTICULARS</th>
                                        <th>PARKING/PERMIT</th>
                                        <th>AMOUNT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="tabledata" style={{ textAlign: '' }}>1</td>
                                        <td className="tabledata" style={{ textAlign: '' }}>{book.startdate ? dayjs(book.startdate).format("DD-MM-YYYY") : ''}</td>
                                        <td className="tabledata" style={{ textAlign: '' }}>{book.tripid}</td>
                                        <td className="tabledata" style={{ textAlign: '' }}>
                                            {book.guestname} <br />
                                            {book.vehRegNo} /
                                            {book.duty} /
                                            T Kms: {book.totalkm1} <br />
                                            Vehicle Hire Charges {book.calcPackage} <br />
                                            Extra Kms {book.extraKM} @ Rs . {book.extrakm_amount}<br />
                                            Extra Hrs {book.extraHR} @ Rs . {book.extrahr_amount} <br />
                                            Night Bata {book.nightCount} Night @ Rs . {book.nightBta} <br />
                                            Driver Bata {book.driverbeta_Count} @ Rs . {book.driverBeta} <br />
                                            {book.useage}
                                        </td>
                                        <td className="tabledata" style={{ textAlign: '' }}>{parseInt(book.permit) + parseInt(book.parking) + parseInt(book.toll) || 0}.00</td>
                                        {/* <td className="tabledata" style={{ textAlign: '' }}>{book.totalcalcAmount || 0}.00</td> */}
                                        <td className="tabledata" style={{  }}>{totalAmount}.00</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td className="tabledata" style={{ textAlign: '' }}>{parseInt(book.permit) + parseInt(book.parking) + parseInt(book.toll) || 0}.00</td>
                                        {/* <td className="tabledata" style={{ textAlign: '' }}>{book.totalcalcAmount || 0}.00</td> */}
                                        <td className="tabledata" style={{  }}>{totalAmount}.00</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="total-div"
                        //  style={{ marginLeft: '50px' }}
                         >
                            {(otherStations?.otherdata === "InStations" ? (
                                <div style={{display:"flex", justifyContent:"end",gap:"10px"}}>

                                    <div >
                                        {/* <h4>CGST {gstAmount}% on {book.totalcalcAmount} :</h4>
                                <h4>SGST {gstAmount}% on {book.totalcalcAmount} :</h4> */}
                                        {gstAmount1 !== null && gstAmount1 !== undefined ? 

                                            <>
                                                <h4 style={{margin:"3px"}}>Amount :</h4>
                                                {/* <h4 style={{margin:"3px"}}>CGST {gstAmount1}% on {book.totalcalcAmount} :</h4>
                                                <h4 style={{margin:"3px"}}>SGST {gstAmount1}% on {book.totalcalcAmount} :</h4> */}
                                                <h4 style={{margin:"3px"}}>CGST {gstAmount1}% on {totalAmount} :</h4>
                                                <h4 style={{margin:"3px"}}>SGST {gstAmount1}% on {totalAmount} :</h4>
                                                <h4 style={{margin:"3px"}}>Parking & Permit:</h4>
                                                <h4 style={{margin:"3px"}}>Total Amount :</h4>
                                            </>:''}
                                    </div>
                                    <div className="amount-div">
                                        <p className="amounttext" style={{ marginTop: '3px' }}>{totalAmount || 0}.00</p>
                                        {/* <p className="amounttext" style={{ marginTop: '23px' }}>{cgst.toFixed(0)}.00</p>
                                        <p className="amounttext" style={{ marginTop: '23px' }}>{sgst.toFixed(0)}.00</p> */}
                                        <p className="amounttext" style={{ marginTop: '3px', paddingLeft: "14px" }}>{cgst.toFixed(2)}</p>
                                        <p className="amounttext" style={{ marginTop: '3px', paddingLeft: "14px" }}>{sgst.toFixed(2)}</p>
                                        <p className="amounttext" style={{ marginTop: '3px', paddingLeft: "14px" }}>{tollparking}.00</p>
                                        <p className="amounttext" style={{ marginTop: '3px' }}>{paymentValue.toFixed(0)}.00</p>
                                    </div>
                                </div>
                            ) : (
                                <div style={{display:"flex", justifyContent:"end",gap:"10px"}}>

                                    <div>
                                        {/* <h4>CGST {gstAmount}% on {book.totalcalcAmount} :</h4>
                                <h4>SGST {gstAmount}% on {book.totalcalcAmount} :</h4> */}
                                        <h4>IGST {othergst}% on {totalAmount} :</h4>
                                        <h4>Parking & Permit:</h4>
                                        <h4>Total Amount :</h4>
                                    </div>
                                    <div className="amount-div">
                                        {/* <p className="amounttext" style={{ marginTop: '23px' }}>{cgst.toFixed(0)}.00</p>
                                <p className="amounttext" style={{ marginTop: '23px' }}>{sgst.toFixed(0)}.00</p> */}
                                        <p className="amounttext" style={{ marginTop: '23px' }}>{paymentValue.toFixed(0)}.00</p>
                                        <p className="amounttext" style={{ marginTop: '23px' }}>{tollparking}.00</p>
                                        <p className="amounttext" style={{ marginTop: '23px' }}>{paymentValue.toFixed(0)}.00</p>

                                    </div>
                                </div>
                            )

                            )}
                        </div>

                        <div>
                            <p style={{ fontWeight: 'bold' }}>E.& O.E In Words-Rupees</p>
                        </div>
                        <div className="sign-div">
                            <div style={{ display: 'flex', flexDirection: 'column', width: "70%" }}>
                                <p className="rupees" style={{ fontWeight: "normal" }}>
                                    {AmountInWords.split(' ')
                                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                        .join(' ')}{' '}
                                    Rupees Only
                                </p>
                                <div>

                                    {gstAmount1 === 0 ?
                                        <div >
                                            <h4 style={{ fontWeight: 600, margin: "2px" }}>NOTE:</h4>
                                            <h4 style={{ padding: 2, wordSpacing: 3, margin: "2px" }}>
                                                IGST@5% or both CGST@2.5% & SGST@2.5% of Rs: {(totalAmount ? (totalAmount * 0.05).toFixed(2) : '0.00')} is to be paid by Service Recipient Under RCM as per Notification 22/2019 – Central tax (Rate) dated 30-09-2019
                                                </h4>
                                        </div> : ""
                                    }
                                </div>
                            </div>
                            <div style={{ paddingBottom: '10px', paddingRight: '10px', width: "30%", }}>
                                <p className="sign-text" >For JessyCabs Pvt Ltd</p>
                                {signimageUrl !== "" ?
                                    <img className='dialogboximg-iv' src={signimageUrl} alt=" " /> : <div className='dialogboximg-iv' ></div>}
                                <p className="sign-text" style={{ display: "flex", justifyContent: "flex-end" }}>Authorised Signature</p>
                            </div>
                        </div>
                        
                        

                    </div>

                    {GmapimageUrl !== '' ? 

                    <div className="google-map">
                                {/* <h4 className="map-text">Map Image</h4> */}
                                {GmapimageUrl !== '' ? (
                            <div className="map-section-in">

                                    <img
                                        className="mapimage"
                                        src={GmapimageUrl}
                                    // style={{ height: '200px',width:'200px' }} 
                                    />
                                    </div>

                                ) : (
                                    <div style={{height:"0px"}}></div>
                                )}

                                {routeData.length > 0 && (
                            <div className="tripsheet-RouteSummary-section">
                                        <h2>Route Summary</h2>
                                        <ol type="1">
                                            {routeData.map((data, index) => (
                                                <li key={index}>
                                                    <p><strong>{data.trip_type}</strong>: {data.place_name}</p>
                                                </li>
                                            ))}
                                        </ol>
                                        </div>
                                )}

                        </div> :
                        
                        // <div style={{height:'50px', border:"2px solid white"}}>
                        <div >
                        </div>
                        }



                    {/* <div className="pdf-division" >
                            {/* {attachedImage.length > 0 ? <p className="attach-text">Attached Images</p> : ""}
                            {attachedImage && Array.isArray(attachedImage) && attachedImage.length > 0 && attachedImage !== "" ?
                                attachedImage.map((image, index) => (
                                    <img key={index} src={image} alt='' className="attachimage" />
                                ))
                                :
                                <div></div>
                            } */}
                            {/* {attachedImage.length > 0 ? (
                                <>
                                    <p className="attach-text">Attached Images</p>
                                    {attachedImage.map((image, index) => (
                                        <img key={index} src={image} alt='' className="attachimage" loading="lazy" />
                                    ))}
                                </>
                            ) : (
                                <></>
                            )} */}
                            {/* {attachedImage.length > 0 ? (
                                <>

                                    {attachedImage.map((file, index) => {
                                        const fileExtension = file.substring(file.lastIndexOf('.') + 1);
                                        console.log(fileExtension); // Logs the file extension (e.g., "jpg", "pdf")
                                        return fileExtension === 'pdf' ? 
                                            <Document
                                                file={file}
                                                onLoadSuccess={onDocumentLoadSuccess}
                                            >
                                                {Array.from(new Array(numPages), (el, index) => (

                                                    <Page key={`page_${index + 1}`} pageNumber={index + 1} />

                                                ))}

                                            </Document>
                                         : ''
                                    })}
                                </>
                            ) : (
                                <></>
                            )}



                        </div> */} 


{attachedImage?.length > 0 ? <>


<div className="attached-pdf" >
  <ol type="1" style={{ listStyleType: "none", padding: 0 }}>
    {Array.isArray(attachedImage) &&
      
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
                    pageBreakAfter: isPdf ? "always" : "auto",
                    padding: "20px 20px 20px 20px",
                  }}
                  className='li-files'
                >
                  




                  <div className='uploading-pdf' >
                    <Document
                      file={file}
                      onLoadSuccess={onDocumentLoadSuccess}
                      style={{
                        margin: "auto",
                        width: "100%",
                        padding:"30px"
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
                            // border:"2px solid red",
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


<div className="attached-image">
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
                    padding: "0px 20px 0px 20px",
                    // marginBottom: "50",
                  }}
                  className='li-files'
                >



                  <div

                    className='uploading-img'
                  >
                    <img
                      src={file}
                      alt={`image_${index}`}
                      // style={{
                      //   width: "100%",
                      //   height: "100%",
                      //   // marginBottom: "50px"
                      // }}
                      className='image-hcl'
                    />
                  </div>



                </li> : ''}
            </>








          );
        })}
  </ol>
</div></>
:""
}

                        {/* <div className="image-division">
                         
                            {attachedImage.length > 0 ? (
                                <>

                                    {attachedImage.map((file, index) => {
                                        const fileExtension = file.substring(file.lastIndexOf('.') + 1);
                                        console.log(fileExtension); // Logs the file extension (e.g., "jpg", "pdf")
                                        return fileExtension !== 'pdf' ? 
                                            <img
                                            key={index}
                                            src={file}
                                            alt=""
                                            className="attachimage"
                                            loading="lazy"
                                        />
                                        : ''
                                    })}
                                </>
                            ) : (
                                <></>
                            )}



                        </div> */}






                </div>
                <div className="btns-last">
                    <Button variant="contained" color="primary" onClick={handlePrint}>
                        Print
                    </Button>
                    <Button onClick={handlePopupClose} variant="contained" color="primary">
                        Cancel
                    </Button>
                </div>
            </div>
        </>
    );
}

export default InvoicePdf;
