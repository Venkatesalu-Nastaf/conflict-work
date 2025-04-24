import React, { useState, useRef, useEffect } from "react";
import './RefPdfParticularData.css'
import generatePDF from 'react-to-pdf';
import useGroupbilling from "./useGroupbilling";
// import { APIURL } from "../../../url";
import numWords from 'num-words'
import dayjs from 'dayjs';
import { useData } from "../../../Dashboard/MainDash/Sildebar/DataContext2";
// import { green } from "@mui/material/colors";

const RefPdfParticularData = ({ pdfData = [], organizationdetails = [], imagename, refFromDate, refToDate, gstno, referenceno, Branchstate, billingGroupData, customerData, stationData }) => {

    const { handlePopup } = useGroupbilling()
    const targetRef = useRef()
    const [orgname, setOrgname] = useState('')
    const [orgaddress1, setOrgaddress1] = useState('')
    // const [orgaddress2, setOrgaddress2] = useState('')
    const [orgaddress3, setOrgaddress3] = useState('')
    const [customerAddress, setCustomerAddress] = useState('')
    const [customer, setCustomer] = useState('')
    const [gst, setGst] = useState('')
    const [fullAmount, setFullAmount] = useState('')
    const [totalCgst, setTotalCgst] = useState(0)
    const [totalIGST, setTotalIGST] = useState(0);
    const [advance, setAdvance] = useState();
    const [fullTotal, setFullTotal] = useState(0)
    // const apiUrl = APIURL;
    // const organisationimage = imagename
    const FromDate = refFromDate
    // const ToDate = refToDate
    const refno = referenceno
    const BranchList = ['chennai', 'Bangalore', 'Hydrebad']
    const stateBranch = gstno[0]?.state;
    const servicestationname = gstno[0]?.servicestation
    // const commonState = Branchstate?.filter(item => item.state === stateBranch) || [];

    const commonState = Branchstate?.filter(item =>
        item?.state === stateBranch
    ) || [];

    const billingGroupMatch = billingGroupData[0]?.state;

    const stateToUse = billingGroupMatch ? billingGroupMatch : stateBranch;
    console.log(billingGroupMatch, 'commonbillingmatch', stateToUse, 'commonbr', Branchstate);

    const commonStates = Branchstate?.filter(item =>
        item.state === stateToUse
    ) || [];
    console.log(commonStates, 'common0000');

    console.log(billingGroupMatch, 'commonbillingmatch');


    console.log(stateBranch, commonState, 'commonstate group', commonState.length, gstno, billingGroupData);
    console.log(Branchstate, 'stationfromjessy');
    console.log(gstno, 'stationcustomer details');
    console.log(commonState, 'stationmatching details');


    useEffect(() => {
        if (Array.isArray(gstno) && gstno.length > 0) { // Check if gstno is an array and not empty
            let gstNo = "";
            gstno.forEach((li) => {
                gstNo = li.gstTax;
            });
            setGst(gstNo);
        }
    }, [gstno]);

    const Gst = customerData[0]?.gstTax / 2;
    const fullGST = customerData[0]?.gstTax

    useEffect(() => {
        let address = ""
        //  let address1 = ""
        //  let city = ""
        let customer = ""
        let totalamount = 0
        let totalcgst = 0
        let totaligst = 0
        let advanceamount = 0
        let fullamount = 0

        if (Array.isArray(pdfData)) {
            pdfData?.forEach((li) => {
                address = li.address1
                customer = li.customer
                totalamount += parseInt(li.totalcalcAmount)
                totalcgst += parseInt(li.totalcalcAmount) * Gst / 100
                totaligst += parseInt(li.totalcalcAmount) * fullGST / 100
                advanceamount += parseInt(li.customeradvance || 0)
                fullamount += parseInt(li.totalcalcAmount || 0) + parseInt(li.totalcalcAmount || 0) * Gst / 100 + parseInt(li.totalcalcAmount || 0) * Gst / 100 - (parseInt(li.customeradvance || 0) || 0)
            })
        }

        setCustomerAddress(address)
        setCustomer(customer)
        setFullAmount(totalamount.toFixed(0))
        setTotalCgst(totalcgst.toFixed(0))
        setTotalIGST(totaligst.toFixed(0))
        setAdvance(advanceamount)
        setFullTotal(fullamount.toFixed(0) || 0)
    }, [pdfData, Gst])

    useEffect(() => {
        let addressone = ''
        // let addresstwo = ''
        let addressthree = ''
        let organisationname = ''

        if (Array.isArray(organizationdetails)) {
            organizationdetails.forEach((li) => {
                addressone = li.addressLine1
                addressthree = li.location
                organisationname = li.organizationname
            })
        }

        setOrgaddress1(addressone)
        setOrgaddress3(addressthree)
        setOrgname(organisationname)
    }, [organizationdetails])

    const { logo } = useData()
    // Convert number to words
    // const convertToWords = (num) => {
    //     if (!num) return '';
    //     const [integerPart, decimalPart] = num.toString().split('.');
    //     let words = numWords(parseInt(integerPart));
    //     if (decimalPart) {
    //         words += ' point';
    //         for (let digit of decimalPart) {
    //             words += ` ${numWords(parseInt(digit))}`;
    //         }
    //     }
    //     return words;
    // };
    const convertToWords = (num) => {
        if (num >= 0) {

            if (!num) return '';
            const [integerPart, decimalPart] = num?.toString().split('.');
            let words = numWords(parseInt(integerPart));
            // console.log(words,integerPart,'words');

            if (decimalPart) {
                words += ' point';
                for (let digit of decimalPart) {
                    words += ` ${numWords(parseInt(digit))}`;
                }
            }
            return words;
        }
    };
    // const rupeestext = convertToWords(fullTotal) || '------';

    // const rupeestext = convertToWords(fullTotal);
    const commonBillingState = commonStates.length > 0 ? commonStates : commonState;
    console.log(commonBillingState, 'common--------');

    console.log(customerData, 'customer2222', stationData, 'full', fullAmount, 'totalCgst', totalCgst);

    // final calculation
    const cgstcalc = customerData[0]?.gstTax / 2;
    const sgstcalc = customerData[0]?.gstTax / 2;
    // const cgstAmount = Math.round(fullAmount * cgstcalc / 100 || 0);

    // const cgstAmount = fullAmount * cgstcalc / 100 || 0;

    // const igstcalc = customerData[0]?.gstTax;
    // const igstAmount = Math.round(fullAmount * igstcalc / 100 || 0)
    console.log(pdfData, "lll")

    const totalSum = pdfData?.reduce((sum, li) =>
        sum + Number(li.parking || 0) + Number(li.permit || 0) + Number(li.toll || 0), 0);
    const totalSumadvance = pdfData?.reduce(
        (sum, li) => sum + Number(li.customeradvance || 0),
        0
    );
    // const totalSumcalc = pdfData?.reduce(
    //     (sum, li) => sum + Number(li.totalcalcAmount || 0),
    //     0
    // );

    const totalSumcalc= pdfData?.reduce(
        (sum, li) =>
            sum + (Number(li.totalcalcAmount || 0) - (Number(li.parking || 0) + Number(li.permit || 0) + Number(li.toll || 0))),
        0
    );
    //   const totalAmountdata = Number(totalSum) + Number(totalSumadvance) + Number(totalSumcalc)
    const totalAmountdata = Number(totalSumcalc)

    //   const totalAmountdata = Number(42870)

    const cgstAmount = totalAmountdata * cgstcalc / 100 || 0;
    const paymentValue = totalAmountdata + cgstAmount + cgstAmount + totalSum || 0;
    const roundamount = paymentValue.toFixed(0)
    const igstcalc = customerData[0]?.gstTax;
    const igstAmount = totalAmountdata * igstcalc / 100 || 0
    const rupeestext = convertToWords(roundamount) || '------';


    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', width: '784px', padding: 20 }} ref={targetRef}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '50px' }}>
                    {/* <div>
                        <h2 className="organisationnametext" style={{ textTransform: 'uppercase' }}>{orgname}</h2>
                        <h2 className="organisationtext">{customerAddress}</h2>
                    </div> */}
                    <div>
                        <h2 className="organisationnametext" style={{ textTransform: 'uppercase' }}>{orgname}</h2>
                        <h2 className="organisationtext">{stationData[0]?.address}</h2>

                        {/* {commonBillingState.length > 0 ?  (
                            <h2 className="organisationtext">{commonBillingState[0].address}</h2>
                        ) : (
                            <>
                                <h2 className="organisationtext">{orgaddress1}</h2>
                                <h2 className="organisationtext">{orgaddress3}</h2>
                            </>
                        )} */}
                    </div>
                    <div className="Taxinvoicediv">
                        <h3 className="Taxinvoicetext">
                            <span> </span>
                            <span className="invoice"> </span>
                        </h3>
                    </div>
                    <div className="imagediv">
                        {/* <img src={`${apiUrl}/public/org_logo/${organisationimage}`} className="image" alt="organisationimage" /> */}
                        <img src={logo} className="image" alt="organisationimage" />
                    </div>
                </div>

                <div className="mobilediv">
                    <h2 className="organisationtext">Tel : {organizationdetails[0]?.telephone} Mob : {organizationdetails[0]?.contactPhoneNumber}</h2>
                    <h2 className="organisationtext-ref">GST : {stationData[0]?.gstno}</h2>
                    {/* <h2 className="organisationtext">GST : {stationData[0]?.gstnumber}</h2>  */}
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '50px', borderBottom: '1px solid grey', paddingBottom: 5 }}>
                    <div>
                        <h2 className="organisationnametext" style={{ textTransform: 'uppercase' }}>{customerData[0]?.customer}</h2>
                        <h2 className="organisationtext">{customerData[0]?.address1}</h2>
                        <h2 className="organisationtext"> {customerData[0]?.state}</h2>
                        <h2 className="organisationtext">GST : {customerData[0]?.gstnumber}</h2>

                        {/* <h2 className="organisationtext">{orgaddress1}</h2>
                        <h2 className="organisationtext">{orgaddress3}</h2> */}
                        {/* {
                        billingGroupData.length > 0 ?
                        <>
                        <h2 className="organisationtext">{billingGroupData[0]?.address1}</h2>
                        <h2 className="organisationtext">{billingGroupData[0]?.servicestation} {billingGroupData[0]?.state}</h2>
                        <h2 className="organisationtext">GST : {billingGroupData[0]?.gstnumber}</h2>
                        </> :
                        <>
                        <h2 className="organisationtext">{gstno[0]?.address1}</h2>
                        <h2 className="organisationtext">{gstno[0]?.servicestation} {gstno[0]?.state}</h2>
                        <h2 className="organisationtext">GST : {gstno[0]?.gstnumber}</h2>
                        </>
                        } */}

                    </div>
                    <div className="Taxinvoicediv">
                        <h3 className="Refnotext">
                            <span>Ref No: </span>
                            <span className="invoice">{refno}</span>
                        </h3>
                        <h3 className="Refnotext">
                            <span>HSN Code: </span>
                            <span className="invoice">996601</span>
                        </h3>
                    </div>
                </div>

                <div className="Datediv">

                    <p>From: <span className="Datetext">{dayjs(FromDate).format('DD-MM-YYYY')}</span></p>

                    <p>To: <span className="Datetext">{dayjs(FromDate).format('DD-MM-YYYY')}</span></p>
                </div>
                {/* <div>
                    <table className="table-ref">
                        <thead>
                            <tr>
                                <th className="tableheadtext">SNo</th>
                                <th className="tableheadtext">Bill No</th>
                                <th className="tableheadtext">Bill Date</th>
                                <th className="tableheadtext">Ordered By</th>
                                <th className="tableheadtext">Reported To</th>
                                <th className="tableheadtext">Amount</th>
                                {
                                    customerData[0]?.state === stationData[0]?.state && customerData[0]?.gstTax !== 0 && customerData[0]?.gstTax !== null && customerData[0]?.gstTax !== undefined ?
                                        <>
                                            <th className="tableheadtext">CGST</th>
                                            <th className="tableheadtext">SGST</th>
                                        </>
                                        :
                                        <>
                                            {customerData[0]?.gstTax !== 0 && customerData[0]?.gstTax !== null ? <th className="tableheadtext">IGST</th> : ""}
                                        </>
                                }
                                {pdfData.some(li => parseInt(li.customeradvance) > 0) && (
                                    <th className="tableheadtext">Cus Adv</th>
                                )}
                                <th className="tableheadtext">Bill Amt</th>
                            </tr>
                        </thead>
                        <tbody className="tablebody" style={{ height: pdfData.length <= 2 ? '180px' : '100%' }}>
                            {pdfData?.map((li, index) => (
                                <tr key={index} className="tabledata-ref">
                                    <td className="tdata">{index + 1}</td>
                                    <td className="tdata">{li.InvoiceNo}</td>
                                    <td className="tdata">{li.InvoiceDate ? dayjs(li.InvoiceDate).format("DD-MM-YYYY") : 'N/A'}</td>
                                    <td className="tdata">{li.customer}</td>
                                    <td className="tdata">{li.guestname}</td>
                                    <td className="tdata">{li.totalcalcAmount}</td>
                                    {
                                        customerData[0]?.state === stationData[0]?.state && customerData[0]?.gstTax !== 0 && customerData[0]?.gstTax !== null && customerData[0]?.gstTax !== undefined ?
                                            <>
                                                <td className="tdata">{(li.totalcalcAmount) * Gst / 100 || 0}</td>
                                                <td className="tdata">{(li.totalcalcAmount) * Gst / 100 || 0}</td>
                                            </>
                                            :
                                            <>
                                                {customerData[0]?.gstTax !== 0 && customerData[0]?.gstTax !== null ? <td className="tdata">{(li.totalcalcAmount) * fullGST / 100 || 0}</td> : ""}
                                            </>
                                    }

                                    {advance > 0 && <td className="tdata">{parseInt(li.customeradvance || 0)}</td>}

                                    <td className="tdata">
                                        {(parseInt(li.totalcalcAmount || 0) + parseInt(li.totalcalcAmount || 0) * Gst / 100 + parseInt(li.totalcalcAmount) * Gst / 100 || 0).toFixed(0) - parseInt(li.customeradvance || 0) || 0}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="tdata">{ }</td>
                                <td className="tdata"> </td>
                                <td className="tdata"></td>
                                <td className="tdata"></td>
                                <td className="tdata">Total</td>
                                <td className="tdata">{fullAmount}</td>
                                {customerData[0]?.state === stationData[0]?.state && customerData[0]?.gstTax !== 0 && customerData[0]?.gstTax !== null && customerData[0]?.gstTax !== undefined ?

                                    <>
                                        <td className="tdata">{cgstAmount || 0}</td>
                                        <td className="tdata">{cgstAmount || 0}</td>
                                    </>
                                    :
                                    <>
                                        {customerData[0]?.gstTax !== 0 && customerData[0]?.gstTax !== null ?
                                            <td className="tdata">{igstAmount || 0}</td> : ""}
                                    </>
                                }
                                {advance > 0 && (
                                    <td className="tdata">{advance}</td>
                                )}
                                <td className="tdata">{fullTotal || 0}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div> */}


                <div>
                    <table className="table-ref">
                        <thead>
                            <tr>
                                <th className="tableheadtext">SNo</th>
                                <th className="tableheadtext">Bill No</th>
                                <th className="tableheadtext">Bill Date</th>
                                <th className="tableheadtext">Ordered By</th>
                                <th className="tableheadtext">Reported To</th>
                                <th className="tableheadtext">Park/Permit</th>
                                <th className="tableheadtext">Cus Adv</th>
                                {/* <th className="tableheadtext">Amount</th> */}
                                <th className="tableheadtext">Total Amount</th>

                                {/* <th className="tableheadtext">Amount</th>
                                {
                                    customerData[0]?.state === stationData[0]?.state && customerData[0]?.gstTax !== 0 && customerData[0]?.gstTax !== null && customerData[0]?.gstTax !== undefined ?
                                        <>
                                            <th className="tableheadtext">CGST</th>
                                            <th className="tableheadtext">SGST</th>
                                        </>
                                        :
                                        <>
                                            {customerData[0]?.gstTax !== 0 && customerData[0]?.gstTax !== null ? <th className="tableheadtext">IGST</th> : ""}
                                        </>
                                }
                                {pdfData.some(li => parseInt(li.customeradvance) > 0) && (
                                    <th className="tableheadtext">Cus Adv</th>
                                )}
                                <th className="tableheadtext">Bill Amt</th> */}
                            </tr>
                        </thead>
                        <tbody className="tablebody" style={{ height: pdfData.length <= 2 ? '180px' : '100%' }}>
                            {pdfData?.map((li, index) => (
                                <tr key={index} className="tabledata-ref">
                                    <td className="tdata">{index + 1}</td>
                                    <td className="tdata">{li.InvoiceNo}</td>
                                    {/* <td className="tdata">{li.InvoiceDate}</td> */}
                                    <td className="tdata">{li.InvoiceDate ? dayjs(li.InvoiceDate).format("DD-MM-YYYY") : 'N/A'}</td>
                                    <td className="tdata">{li.customer}</td>
                                    <td className="tdata">{li.guestname}</td>
                                    {/* <td className="tdata">{Number(li.parking)+ Number(li.permit)+Number(li.toll)}</td> */}
                                    <td className="tdata">{[li.parking, li.permit, li.toll].reduce((sum, value) => sum + Number(value), 0)}.00</td>

                                    <td className="tdata">{li.customeradvance || 0}.00</td>
                                    {/* <td className="tdata">{li.totalcalcAmount -  (li.parking+li.permit, li.toll)}</td> */}
                                    <td className="tdata" style={{textAlign:'center'}}>{li.totalcalcAmount - (Number(li.parking || 0) + Number(li.permit || 0) + Number(li.toll || 0))}.00 </td>

                                    {/* <td className="tdata">
  {[li.parking, li.permit, li.toll, li.customeradvance || 0, li.totalcalcAmount || 0].reduce((sum, value) => sum + Number(value), 0)}
</td> */}

                                    {/* <td className="tdata">{li.totalcalcAmount}</td> */}
                                    {/* {
                                        customerData[0]?.state === stationData[0]?.state && customerData[0]?.gstTax !== 0 && customerData[0]?.gstTax !== null && customerData[0]?.gstTax !== undefined ?
                                            <>
                                                <td className="tdata">{(li.totalcalcAmount) * Gst / 100 || 0}</td>
                                                <td className="tdata">{(li.totalcalcAmount) * Gst / 100 || 0}</td>
                                            </>
                                            :
                                            <>
                                                {customerData[0]?.gstTax !== 0 && customerData[0]?.gstTax !== null ? <td className="tdata">{(li.totalcalcAmount) * fullGST / 100 || 0}</td> : ""}
                                            </>
                                    }

                                    {advance > 0 && <td className="tdata">{parseInt(li.customeradvance || 0)}</td>}

                                    <td className="tdata">
                                        {(parseInt(li.totalcalcAmount || 0) + parseInt(li.totalcalcAmount || 0) * Gst / 100 + parseInt(li.totalcalcAmount) * Gst / 100 || 0).toFixed(0) - parseInt(li.customeradvance || 0) || 0}
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                        {/* <tfoot>
                            <tr>
                                <td className="tdata">{ }</td>
                                <td className="tdata"> </td>
                                <td className="tdata"></td>
                                <td className="tdata"></td>
                                <td className="tdata">Total</td>
                                <td className="tdata">{fullAmount}</td>
                                {customerData[0]?.state === stationData[0]?.state && customerData[0]?.gstTax !== 0 && customerData[0]?.gstTax !== null && customerData[0]?.gstTax !== undefined ?

                                    <>
                                        <td className="tdata">{cgstAmount || 0}</td>
                                        <td className="tdata">{cgstAmount || 0}</td>
                                    </>
                                    :
                                    <>
                                        {customerData[0]?.gstTax !== 0 && customerData[0]?.gstTax !== null ?
                                            <td className="tdata">{igstAmount || 0}</td> : ""}
                                    </>
                                }
                                {advance > 0 && (
                                    <td className="tdata">{advance}</td>
                                )}
                                <td className="tdata">{fullTotal || 0}</td>
                            </tr>
                        </tfoot> */}



                        <tfoot>
                            <tr>
                                <td className="tdata">{ }</td>
                                <td className="tdata"> </td>
                                <td className="tdata"></td>
                                <td className="tdata"></td>
                                <td className="tdata">Total</td>
                                <td className="tdata">{totalSum}.00</td>
                                <td className="tdata">{totalSumadvance}.00</td>
                                <td className="tdata" style={{textAlign:"center"}}>{totalSumcalc}.00</td>
                                {/* <td className="tdata">
  {Number(totalSum) + Number(totalSumadvance) + Number(totalSumcalc)}
</td>                    */}

                                {/* {customerData[0]?.state === stationData[0]?.state && customerData[0]?.gstTax !== 0 && customerData[0]?.gstTax !== null && customerData[0]?.gstTax !== undefined ?

                                    <>
                                        <td className="tdata">{cgstAmount || 0}</td>
                                        <td className="tdata">{cgstAmount || 0}</td>
                                    </>
                                    :
                                    <>
                                        {customerData[0]?.gstTax !== 0 && customerData[0]?.gstTax !== null ?
                                            <td className="tdata">{igstAmount || 0}</td> : ""}
                                    </>
                                }
                                {advance > 0 && (
                                    <td className="tdata">{advance}</td>
                                )}
                                <td className="tdata">{fullTotal || 0}</td> */}
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <div className="total-div" >



                    {customerData[0]?.state === stationData[0]?.state ?
                        <>
                            <div >

                                {customerData[0]?.gstTax !== 0 && customerData[0]?.gstTax !== null && customerData[0]?.gstTax !== undefined ?
                                    <>

                                        <h4 style={{margin:"5px"}}>Amount :</h4>

                                        {/* <h4>CGST {Gst}% on {Number(totalSum) + Number(totalSumadvance) + Number(totalSumcalc)}:</h4> */}
                                        <h4 style={{margin:"5px"}}>CGST {Gst}% on {Number(totalSumcalc)}:</h4>


                                        {/* <h4>CGST {Gst}% on {Number(totalSum) + Number(totalSumadvance) + Number(totalSumcalc)}:</h4> */}
                                        <h4 style={{margin:"5px"}}>SGST {Gst}% on {Number(totalSumcalc)}:</h4>
                                        <h4 style={{margin:"5px"}}>Parking & Permit:</h4>

                                        <h4 style={{margin:"5px"}}>Total Amount :</h4> </> : <>
                                        <h4 style={{margin:"5px"}}>Amount :</h4> <h4></h4>
                                        <h4></h4>
                                        <h4 style={{ marginTop: '110px' }}>Total Amount :</h4>
                                    </>}
                            </div>
                            <div className="amount-div">
                             
                                <p className="amounttext" style={{margin:'5px'}}>{Number(totalSumcalc)}.00</p>


                                <p className="amounttext" style={{ marginTop: '5px', paddingLeft: "14px" }}>{cgstAmount.toFixed(2)}.00</p>
                                <p className="amounttext" style={{ marginTop: '5px', paddingLeft: "14px" }}>{cgstAmount.toFixed(2)}.00</p>
                                <p className="amounttext" style={{ marginTop: '5px', paddingLeft: "14px" }}>{totalSum}.00</p>
                                <p className="amounttext" style={{ marginTop: '5px' }}>{paymentValue.toFixed(0)}.00</p>
                            </div>
                        </> : <>

                            {customerData[0]?.gstTax !== 0 && customerData[0]?.gstTax !== null && <>
                                <div style={{ marginLeft: "100px" }}><h4>Amount :</h4>
                                    <h4>IGST {igstcalc}% on {totalAmountdata} :</h4>

                                    <h4>Total Amount :</h4>
                                </div>
                                <div className="amount-div">
                                    <p className="amounttext">{totalAmountdata}.00</p>

                                    <p className="amounttext" style={{ marginTop: '23px', paddingLeft: "14px" }}>{igstAmount.toFixed(2)}</p>

                                    <p className="amounttext" style={{ marginTop: '23px' }}>{paymentValue.toFixed(0)}.00</p>
                                </div>
                            </>
                            }
                        </>
                    }


                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingTop: '10px', textTransform: 'capitalize' }}><h4 style={{ margin: 0 }}>Rs.</h4><p style={{ marginLeft: 6, marginTop: '0px', fontWeight: 600 }}>{rupeestext} Rupees Only</p></div>
                {customerData[0]?.gstTax === 0 || customerData[0]?.gstTax === null ?
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <h4 style={{ fontWeight: 600, marginRight: '5px' }}>NOTE:</h4>
                        <h4 style={{ padding: 2, wordSpacing: 3 }}>
                            IGST@5% or both CGST@2.5% & SGST@2.5% of Rs:  {Number(totalSumcalc) > 0 ? (Number(totalSumcalc) * 0.05).toFixed(2) : '0.00'} is to be paid by Service Recipient Under RCM as per Notification 22/2019 – Central tax (Rate) dated 30-09-2019
                            </h4>
                    </div> : ""
                }

            </div>

            <div className="printdiv">
                <button className="print" onClick={() => generatePDF(targetRef, { filename: `${refno}.pdf` })}>Print</button>
                <button onClick={handlePopup} className="print">
                    Cancel
                </button>
            </div>

        </>
    )
}

export default RefPdfParticularData
