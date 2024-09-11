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


const InvoicePdf = ({ book, logo, organizationaddress, organizationdata, customerData }) => {
    const { setParticularPdf, particularRefNo, setIndividualBilled, individualBilled } = PdfData();
    const [billingDate] = useState(dayjs());
    const { attachedImage, GmapimageUrl, signimageUrl, routeData, IndividualBillData, setIndividualBillData } = Invoice();
    const apiUrl = APIURL;
    const targetRef = useRef();

    const handlePopupClose = () => {
        setParticularPdf(false);
    }

    const formatAddress = (address) => {
        return address.split('\n').map((line, index) => <p key={index}>{line}</p>);
    }


    const startDate = dayjs(book.startdate);
    const billingdate = startDate.format('YYYY-MM-DD');
    const totalAmount = parseInt(book.totalcalcAmount); // Ensure the total amount is parsed as a number
    const cgst = totalAmount * 2.5 / 100 || 0;
    const sgst = totalAmount * 2.5 / 100 || 0;
    const paymentValue = totalAmount + cgst + sgst || 0;
    const AmountInWords = numWords(parseInt(paymentValue)) || 0;

    // setting the Billed details
    useEffect(() => {
        const Invoice_No = `RF${particularRefNo}`;
        const Trip_id = particularRefNo;
        const Status = "Billed";
        const Amount = book.totalcalcAmount || 0;
        const Bill_Date = dayjs(book.startdate).format('YYYY-MM-DD');
        const Customer = customerData.customer;

        setIndividualBillData({
            Invoice_No,
            Trip_id,
            Status,
            Amount,
            Bill_Date,
            Customer
        });
    }, [particularRefNo, book, customerData, setIndividualBillData]);

    const handlePrint = async () => {
        try {
            generatePDF(targetRef, { filename: 'page.pdf' });
            await axios.post(`${apiUrl}/IndividualBill`, IndividualBillData);
            setIndividualBilled(!individualBilled);
        } catch (error) {
            console.log('An error occurred:', error);
        } finally {
            setParticularPdf(false);
        }
    };

    return (
        <>
            <div className="refdiv">
                <div style={{ display: 'flex', flexDirection: 'column', width: '784px', padding: 20 }} ref={targetRef}>
                    <div className="outline-div">
                        <div className="header-div">
                            <div>
                                <p className="org-name">{organizationdata.organizationname}</p>
                                <p className="org-address">{organizationdata.addressLine1}</p>
                                <p className="org-address">{organizationdata.contactEmail}</p>
                                <p className="org-mobile">Tel : {organizationdata.telephone} Mob : {organizationdata.contactPhoneNumber}</p>
                            </div>
                            <div className="image-div">
                                <img src={logo} className="image" alt="organisationimage" />
                                <p className="org-gst">GSTIN : {organizationdata.gstnumber}</p>
                            </div>
                        </div>
                        <div className="taxinvoice">
                            <h2>TAX INVOICE</h2>
                        </div>
                        <div className="receiver-div">
                            <div>
                                <p className="details-receiver">Details of Receiver :</p>
                                <p className="receiver-details">{customerData.customer}</p>
                                {formatAddress(customerData.address1)}
                                <p className="receiver-details">{customerData.gstnumber}</p>
                            </div>
                            <div className="invno-div">
                                <p className="receiver-details">Invoice No : <span className="invoiceno">RF{particularRefNo}</span> </p>
                                <p className="receiver-details">Invoice Date : {billingDate.format('YYYY-MM-DD')} </p>
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
                                        <th>PARK/PERMIT</th>
                                        <th>AMOUNT</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr>
                                        <td className="tabledata" style={{ textAlign: '' }}>1</td>
                                        <td className="tabledata" style={{ textAlign: '' }}>{billingdate}</td>
                                        <td className="tabledata" style={{ textAlign: '' }}>{book.tripid}</td>
                                        <td className="tabledata" style={{ textAlign: '' }}>
                                            {book.orderedby} <br />
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
                                        <td className="tabledata" style={{ textAlign: '' }}>{parseInt(book.permit) + parseInt(book.parking) || 0}</td>
                                        <td className="tabledata" style={{ textAlign: '' }}>{book.totalcalcAmount || 0}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="total-div">
                            <div >
                                <h4>CGST 2.5% on {book.totalcalcAmount} :</h4>
                                <h4>SGST 2.5% on {book.totalcalcAmount} :</h4>
                                <h4>Total Amount :</h4>
                            </div>
                            <div className="amount-div">
                                <p className="amounttext" style={{marginTop: '23px'}}>{cgst.toFixed(0)}</p>
                                <p className="amounttext" style={{marginTop: '23px'}}>{sgst.toFixed(0)}</p>
                                <h4>{paymentValue.toFixed(0)}</h4>
                            </div>
                        </div>
                        <div className="sign-div">
                            <div>
                                <p className="rupees">{AmountInWords.charAt(0).toUpperCase() + AmountInWords.slice(1)} </p>{'\n'}
                                <p>Rupees Only</p>
                            </div>
                            <div style={{paddingBottom: '10px', paddingRight: '10px'}}>
                                <p className="sign-text">For JessyCabs</p>
                                {signimageUrl !== "" ?
                                    <img className='dialogboximg' src={signimageUrl} alt=" " /> : <div className='dialogboximg' ></div>}
                                <p className="sign-text">Authorised Signature</p>
                            </div>

                        </div>
                        <div className="google-map">
                            <div>
                                <h4 className="map-text">Map Image</h4>
                                {GmapimageUrl !== '' ? <img className="mapimage" src={GmapimageUrl} alt='' /> : <div></div>}

                            </div>
                            <div className="tripsheet-RouteSummary">
                                <h2>Route Summary</h2>
                                <ol type="1">
                                    {routeData.length > 0 && routeData.map((data, index) => (
                                        <li><p key={index}><strong>{data.trip_type}</strong>: {data.place_name}</p></li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                        <div>
                            {attachedImage.length > 0 ? <p className="attach-text">Attached Images</p> : <p className="attachtext"> No Attached Image</p>}
                            {attachedImage && Array.isArray(attachedImage) && attachedImage.length > 0 && attachedImage !== "" ?
                                attachedImage.map((image, index) => (
                                    <img key={index} src={image} alt='' className="attachimage" />
                                ))
                                :
                                <div></div>
                            }
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
