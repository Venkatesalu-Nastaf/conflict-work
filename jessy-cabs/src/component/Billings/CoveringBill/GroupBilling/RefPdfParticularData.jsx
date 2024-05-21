import React, { useState, useRef, useEffect } from "react";
import './RefPdfParticularData.css'
import generatePDF from 'react-to-pdf';
import useGroupbilling from "./useGroupbilling";
import { APIURL } from "../../../url";
import numWords from 'num-words'

const RefPdfParticularData = ({ pdfData, organizationdetails, imagename, refFromDate, refToDate, gstno, referenceno }) => {
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
    const [fullTotal, setFullTotal] = useState(0)
    const apiUrl = APIURL;
    const organisationimage = imagename
    const FromDate = refFromDate
    const ToDate = refToDate
    const refno = referenceno

    useEffect(() => {
        if (Array.isArray(gstno) && gstno.length > 0) { // Check if gstno is an array and not empty
            let gstNo = "";
            gstno.forEach((li) => {
                gstNo = li.gstTax;
            });
            setGst(gstNo);
        }
    }, [gstno]); // Add gstno as a dependency


    const Gst = gst / 2;

    useEffect(() => {
        let address = ""
        //  let address1 = ""
        //  let city = ""
        let customer = ""
        let totalamount = 0
        let totalcgst = 0
        let fullamount = 0
        //  pdfData?.map((li) => {
        //      address = li.address1
        //      customer = li.customer
        //      totalamount+=parseInt(li.netamount)
        //      totalcgst+=parseInt(li.netamount)*Gst/100
        //      fullamount+=parseInt(li.netamount)+parseInt(li.netamount)*Gst/100+parseInt(li.netamount)*Gst/100
        //  })
        pdfData?.forEach((li) => {
            address = li.address1
            customer = li.customer
            totalamount += parseInt(li.netamount)
            totalcgst += parseInt(li.netamount) * Gst / 100
            fullamount += parseInt(li.netamount) + parseInt(li.netamount) * Gst / 100 + parseInt(li.netamount) * Gst / 100
        })
        setCustomerAddress(address)
        setCustomer(customer)
        setFullAmount(totalamount)
        setTotalCgst(totalcgst)
        setFullTotal(fullamount)
    }, [pdfData, Gst])


    useEffect(() => {
        let addressone = ''
        // let addresstwo = ''
        let addressthree = ''
        let organisationname = ''
        // organizationdetails?.map((li) => {
        //     addressone = li.addressLine1
        //     addressthree = li.location
        //     organisationname = li.organizationname
        // })
        organizationdetails?.forEach((li) => {
            addressone = li.addressLine1
            addressthree = li.location
            organisationname = li.organizationname
        })
        setOrgaddress1(addressone)
        setOrgaddress3(addressthree)
        setOrgname(organisationname)
    }, [organizationdetails])

    const rupeestext = numWords(fullTotal);

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', width: '784px', padding: 20, }} ref={targetRef}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '50px' }}>
                    <div >
                        <h2 className="organisationnametext" style={{ textTransform: 'uppercase' }}>{orgname}</h2>
                        <h2 className="organisationtext">{customerAddress}</h2>
                    </div>
                    <div className="Taxinvoicediv">
                        <h3 className="Taxinvoicetext">
                            <span> </span>
                            <span className="invoice"> </span>
                        </h3>
                    </div>
                    <div className="imagediv">
                        <img src={`${apiUrl}/public/org_logo/${organisationimage}`} className="image" alt="organisationimage" />
                        {/* <h2 className="organisationtext"> GST : {organisationdetails[0].gstnumber}</h2> */}
                    </div>
                </div>

                <div className="mobilediv">
                    <h2 className="organisationtext">Tel : {organizationdetails[0]?.telephone} Mob :  {organizationdetails[0]?.contactPhoneNumber}</h2>

                    <h2 className="organisationtext"> GST : {organizationdetails[0]?.gstnumber}</h2>

                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '50px', borderBottom: '1px solid grey', paddingBottom: 5 }}>
                    <div >
                        <h2 className="organisationnametext" style={{ textTransform: 'uppercase' }}>{customer}</h2>
                        <h2 className="organisationtext">{orgaddress1}</h2>
                        <h2 className="organisationtext">{orgaddress3}</h2>
                    </div>
                    <div className="Taxinvoicediv">
                        <h3 className="Refnotext">
                            <span>Ref No :  </span>
                            <span className="invoice">{refno} </span>
                        </h3>
                    </div>
                </div>
                <div className="Datediv">
                    <p >From <span className="Datetext">{FromDate}</span> </p>
                    <p >To <span className="Datetext"> {ToDate}</span></p>
                </div>
                <div style={{}}>
                    <table>
                        <tr>
                            <td className="tableheadtext">S No</td>
                            <td className="tableheadtext">Bill No</td>
                            <td className="tableheadtext">Bill Date</td>
                            <td className="tableheadtext">Ordered By</td>
                            <td className="tableheadtext">Reported To</td>
                            <td className="tableheadtext">Amount</td>
                            <td className="tableheadtext" >CGST</td>
                            <td className="tableheadtext">SGST</td>
                            <td className="tableheadtext">Bill Amt</td>
                        </tr>
                        <tbody className="tablebody" style={{ height: pdfData.length <= 2 ? '180px' : '100%' }}>
                            {pdfData.map((li, index) => (
                                <tr key={index} className="tabledata">
                                    <td className="tdata">{index + 1}</td>
                                    <td className="tdata">{li.InvoiceNo}</td>
                                    <td className="tdata">{li.InvoiceDate}</td>
                                    <td className="tdata"> {li.customer}</td>
                                    <td className="tdata">{li.guestname}</td>
                                    <td className="tdata">{li.netamount}</td>
                                    <td className="tdata">{parseInt(li.netamount) * Gst / 100}</td>
                                    <td className="tdata">{parseInt(li.netamount) * Gst / 100}</td>
                                    <td className="tdata">{parseInt(li.netamount) + parseInt(li.netamount) * Gst / 100 + parseInt(li.netamount) * Gst / 100}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tr>
                            <td className="tdata">{ }</td>
                            <td className="tdata"> </td>
                            <td className="tdata"></td>
                            <td className="tdata"></td>
                            <td className="tdata">Total</td>
                            <td className="tdata">{fullAmount}</td>
                            <td className="tdata">{totalCgst}</td>
                            <td className="tdata">{totalCgst}</td>
                            <td className="tdata">{fullTotal}</td>
                        </tr>
                    </table>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}><h4>Rs .</h4><p style={{ marginLeft: 10 }}>{rupeestext.charAt(0).toUpperCase() + rupeestext.slice(1)}</p></div>
            </div>
            <div className="printdiv">
                <button className="print" onClick={() => generatePDF(targetRef, { filename: 'page.pdf' })}>PRINT</button>
                <button onClick={handlePopup} className="print">
                    Cancel
                </button>
            </div>
        </>
    )
}
export default RefPdfParticularData
