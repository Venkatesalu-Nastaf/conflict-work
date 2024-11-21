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

    const handlePopupClose = () => {
        setParticularPdf(false);
    }

    const formatAddress = (address) => {
        return address?.split('\n').map((line, index) => <p key={index}>{line}</p>);
    }
    // console.log(otherStations,"pppp",otherStations?.data)


    // const startDate = dayjs(book.startdate);
    // const billingdate = startDate.format('YYYY-MM-DD');
    // const startDate = dayjs(book.startdate);
    // const billingdate = book.startdate ? dayjs(book.startdate).format('YYYY-MM-DD') : boo
    const totalAmount = parseInt(book.totalcalcAmount); // Ensure the total amount is parsed as a number
    // const gstAmount = customerData?.gstTax / 2
    const gstAmount1 = otherStations?.data / 2;
    const othergst = otherStations?.data
    // const cgst = totalAmount * gstAmount / 100 || 0;
    // const sgst = totalAmount * gstAmount / 100 || 0;

    const cgst = totalAmount * gstAmount1 / 100 || 0;
    const sgst = totalAmount * gstAmount1 / 100 || 0;
    const paymentValue = totalAmount + cgst + sgst || 0;
    // console.log(paymentValue,"ooooo")
    const AmountInWords = numWords(parseInt(paymentValue)) || 0;
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
            generatePDF(targetRef, { filename: 'page.pdf' });
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
    return (
        <>
            <div className="refdiv">
                <div style={{ display: 'flex', flexDirection: 'column', width: '784px', padding: 20 }} ref={targetRef}>
                    <div className="outline-div">
                        <div className="header-div">
                            <div>
                                <p className="org-name">{organizationdata.organizationname}</p>
                                {otherStations.data6 !== null ? (
                                    // <h2 className="organisationtext">{commonState.address}</h2>
                                    <h2 className="organisationtext">{otherStations.data5}</h2>
                                ) : (
                                    <>
                                        <h2 className="org-address">{organizationdata.addressLine1}</h2>
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
                                <div style={{ width: '300px' }}>
                                    {/* {formatAddress(customerData.address1)} */}
                                    {formatAddress(otherStations.data2)}
                                </div>
                                {/* <p className="receiver-details">GSTIN : {customerData.gstnumber}</p> */}
                                <p className="receiver-details">GSTIN : {otherStations.data3}</p>
                            </div>
                            <div className="invno-div">
                                {/* <p className="receiver-details">Invoice No : {particularRefNo}</p> */}
                                <p className="receiver-details">Invoice No : {invoicedata}</p>
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
                                        <th>TRIP DT</th>
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
                                            {book.pickup}
                                        </td>
                                        <td className="tabledata" style={{ textAlign: '' }}>{parseInt(book.permit) + parseInt(book.parking) + parseInt(book.toll)|| 0}.00</td>
                                        <td className="tabledata" style={{ textAlign: '' }}>{book.totalcalcAmount || 0}.00</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td className="tabledata" style={{ textAlign: '' }}>{parseInt(book.permit) + parseInt(book.parking) + parseInt(book.toll) || 0}.00</td>
                                        <td className="tabledata" style={{ textAlign: '' }}>{book.totalcalcAmount || 0}.00</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="total-div" style={{ marginLeft: '50px' }}>
                            { (otherStations?.otherdata === "InStations" ? (
                                <>
                                
                                    <div style={{ marginLeft: "100px" }}>
                                        {/* <h4>CGST {gstAmount}% on {book.totalcalcAmount} :</h4>
                                <h4>SGST {gstAmount}% on {book.totalcalcAmount} :</h4> */}
                                      { gstAmount1 !== 0 ? <><h4>Amount :</h4> <h4>CGST {gstAmount1}% on {book.totalcalcAmount} :</h4>
                                        <h4>SGST {gstAmount1}% on {book.totalcalcAmount} :</h4> 
                                        <h4>Total Amount :</h4> </> : <>
                                        <h4>Amount :</h4> <h4></h4>
                                        <h4></h4> 
                                        <h4 style={{ marginTop: '110px' }}>Total Amount :</h4> </>}
                                    </div>
                                    <div className="amount-div">
                                    <p className="amounttext" style={{ marginTop: '23px' }}>{book.totalcalcAmount || 0}.00</p>
                                        {/* <p className="amounttext" style={{ marginTop: '23px' }}>{cgst.toFixed(0)}.00</p>
                                        <p className="amounttext" style={{ marginTop: '23px' }}>{sgst.toFixed(0)}.00</p> */}
                                        <p className="amounttext" style={{ marginTop: '23px' }}>{cgst.toFixed(2)}</p>
                                        <p className="amounttext" style={{ marginTop: '23px' }}>{sgst.toFixed(2)}</p>
                                        <p className="amounttext" style={{ marginTop: '23px' }}>{paymentValue.toFixed(0)}.00</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                gstAmount1 !== 0 &&(
                                    <div style={{ marginLeft: "100px" }}>
                                        {/* <h4>CGST {gstAmount}% on {book.totalcalcAmount} :</h4>
                                <h4>SGST {gstAmount}% on {book.totalcalcAmount} :</h4> */}
                                        <h4>IGST {othergst}% on {book.totalcalcAmount} :</h4>

                                        <h4>Total Amount :</h4>
                                    </div>
                                    <div className="amount-div">
                                        {/* <p className="amounttext" style={{ marginTop: '23px' }}>{cgst.toFixed(0)}.00</p>
                                <p className="amounttext" style={{ marginTop: '23px' }}>{sgst.toFixed(0)}.00</p> */}
                                        <p className="amounttext" style={{ marginTop: '23px' }}>{paymentValue.toFixed(0)}.00</p>
                                    </div>)
                                </>
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
                                                IGST@5% or both CGST@2.5% & SGST@2.5% of Rs:335 is to be paid by Service Recepient Under RCM as per Notification 22/2019 – Central tax (Rate) dated 30-09-2019
                                            </h4>
                                        </div> : ""
                                    }
                                </div>
                            </div>

                            <div style={{ paddingBottom: '10px', paddingRight: '10px', width: "30%", }}>
                                <p className="sign-text" style={{ display: "flex", marginLeft: "80px" }}>For JessyCabs</p>
                                {signimageUrl !== "" ?
                                    <img className='dialogboximg' src={signimageUrl} alt=" " style={{ marginLeft: "100px" }} /> : <div className='dialogboximg' ></div>}
                                <p className="sign-text" style={{ display: "flex", justifyContent: "flex-end" }}>Authorised Signature</p>
                            </div>

                        </div>
                        <div className="google-map">
                            <div>
                                {/* <h4 className="map-text">Map Image</h4> */}
                                {GmapimageUrl !== '' ? <img className="mapimage" src={GmapimageUrl} alt='' /> : <div></div>}

                            </div>
                            <div className="tripsheet-RouteSummary">
                                {routeData.length > 0 && (
                                    <>
                                        <h2>Route Summary</h2>
                                        <ol type="1">
                                            {routeData.map((data, index) => (
                                                <li key={index}>
                                                    <p><strong>{data.trip_type}</strong>: {data.place_name}</p>
                                                </li>
                                            ))}
                                        </ol>
                                    </>
                                )}
                            </div>

                        </div>
                        <div>
                            {/* {attachedImage.length > 0 ? <p className="attach-text">Attached Images</p> : ""}
                            {attachedImage && Array.isArray(attachedImage) && attachedImage.length > 0 && attachedImage !== "" ?
                                attachedImage.map((image, index) => (
                                    <img key={index} src={image} alt='' className="attachimage" />
                                ))
                                :
                                <div></div>
                            } */}
                            {attachedImage.length > 0 ? (
                                <>
                                    <p className="attach-text">Attached Images</p>
                                    {attachedImage.map((image, index) => (
                                        <img key={index} src={image} alt='' className="attachimage" loading="lazy" />
                                    ))}
                                </>
                            ) : (
                                <></>
                            )}

                        </div>

                    </div>
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
