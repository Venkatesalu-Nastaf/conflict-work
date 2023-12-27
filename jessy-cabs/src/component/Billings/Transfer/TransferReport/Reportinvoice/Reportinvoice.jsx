import React from 'react';
import './Reportinvoice.css';
import { Button } from '@material-ui/core';
import ReactDOMServer from 'react-dom/server';
import Logo from "../../../../Dashboard/MainDash/Sildebar/Logo-Img/logo.png";
import Signature from "../../../billingMain/Accountsinvoice/signature-1692258849846.png";
const PrintableInvoice = ({ routeData, selectedTripData }) => {
    console.log('customer name in reportinvoice', selectedTripData.customer);
    return (
        <>
            <div className='Reportinvoice-invoice' >
                <div className="Reportinvoice-table-container">
                    <div className="page-title">
                        <div className="sheet-logo">
                            <img src={Logo} alt="logo" />
                        </div>
                        <div className="sheet-type">
                            {/* <h1>Tax Invoice</h1> */}
                            <h1>{routeData?.customer} </h1>
                        </div>
                    </div>
                    <div className="header-title">
                        <div className="left-title">
                            <h3>JESSYCABS</h3>
                            <p>Flat No 2, II Floor, Swathi Complex, (Venkatnarayana Road)
                                Nandanam, Chennai - 600017
                                booking@jessycabs.in
                                <span>Tel:044-24354247,Mob:9841505689</span>
                            </p>
                        </div>
                        <div className="right-title">
                            <dl className="dl-horizontal">
                                <dt>GSTIN</dt>
                                <dd><strong>: 33AVNPM9362R1ZK</strong></dd>
                                <dt>Sac Code</dt>
                                <dd>: 996601</dd>
                            </dl>
                        </div>
                    </div>
                    <div className="header-title">
                        <div className="left-title">
                            <dl className="dl-horizontal">
                                <dt>Organisation</dt>
                                <dd><strong>:HCL CAPITAL PRIVATE LIMITED</strong><br />06, Siddhartha, Plot 96, Nehru Place,
                                    South East Delhi,</dd>
                                <dt>GSTIN</dt>
                                <dd>: 07AAACM9201G1ZR</dd>
                            </dl>
                        </div>
                        <div className="right-title">
                            <dl className="dl-horizontal">
                                <dt>Invoice No</dt>
                                <dd><strong>: 27188</strong></dd>
                                <dt>Invoice Date</dt>
                                <dd>: 31/07/2023</dd>
                                <dt>Group Ref No</dt>
                                <dd>: 83837</dd>
                            </dl>
                        </div>
                    </div>
                    <div className='Reportinvoice-description-table'>
                        <table>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Trip Date</th>
                                    <th>Trip No</th>
                                    <th>Particulars</th>
                                    <th>Parking Permit</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>18/10/23</td>
                                    <td>25/10/23</td>
                                    <td className='Reportinvoice-description-table-header'><span>Vijay Sir</span><br />Tn-09-DD-7071\Local\TKms:61\Hrs:8\CRYSTA A/C
                                        Vehicle Hire Charges For (8HRS & 80 KMS) Night Bata: 1Night @ Rs.150 <br />Tambaram
                                    </td>
                                    <td>365.00</td>
                                    <td>4000.00 <br /> 150.00</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>18/10/23</td>
                                    <td>25/10/23</td>
                                    <td className='Reportinvoice-description-table-header'><span>Vijay Sir</span><br />Tn-09-DD-7071\Local\TKms:61\Hrs:8\CRYSTA A/C
                                        Vehicle Hire Charges For (8HRS & 80 KMS) Night Bata: 1Night @ Rs.150 <br />Tambaram
                                    </td>
                                    <td>365.00</td>
                                    <td>4000.00 <br /> 150.00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="Reportinvoice-total-details">
                        <div className="Reportinvoice-amount">
                            <p>sixteen thousand, eight hundred sixty-five</p>
                        </div>
                        <div className="Reportinvoice-Total-details">
                            <dl >
                                <dt>SUB Total</dt>
                                <dd>16500.00</dd>
                                <dd>0.00</dd>
                                <dt>Parking & Permit</dt>
                                <dd>365.00</dd>
                                <dt>Total Amount</dt>
                                <dd>16865.00</dd>
                            </dl>
                        </div>
                    </div>
                    <div className="Reportinvoice-details-report">
                        <div className="Reportinvoice-gst-details">
                            <p>GST is to be paid by Service Recepient Under RCM as per Notification 22/19 - Centraltax (Rate) dated 30-09-2019 <br /><span>E.& O.E In Words-Rupees</span></p>
                        </div>
                        <div className="Reportinvoice-signature">
                            <img src={Signature} alt="Guest Signature" />
                            <span className="Reportinvoice-signature-title">Guest Signature</span>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};
const Invoice = ({ routeData, selectedTripData }) => {

    const handlePrint = () => {
        const invoiceContent = ReactDOMServer.renderToString(
            <PrintableInvoice routeData={routeData} selectedTripData={selectedTripData} />
        );
        const printWindow = window.open('', '_blank');
        printWindow.document.open();
        printWindow.document.write(`
        <html>
          <head>
          <title>TAX INVOICE</title>
          <style>
          .Reportinvoice-table-container {
            font-size: 13px;
            border: 1.5px solid #000;
        }
        
        .Reportinvoice-description-table {
            border-bottom: 1.5px solid #000;
        
        }
        
        .page-title {
            width: 40%;
            padding: 10px 0px;
            display: flex;
            align-items: center;
            /* justify-content: start; */
        
        }
        
        .page-title .sheet-logo img {
            width: 80px;
        
        }
        
        .page-title .sheet-type {
            width: 53%;
            display: flex;
            justify-content: flex-end;
        }
        
        .Reportinvoice-description-table-header {
            width: 60%;
        }
        .Reportinvoice-description-table table{
            border-collapse: collapse;
        }
        .Reportinvoice-description-table th {
            padding: 10px;
        
        }
        
        .Reportinvoice-description-table thead {
            background: #b4b3b3 !important;
            border-bottom: 1.5px solid #000;
        }
        
        .Reportinvoice-description-table .Reportinvoice-description-table-header {
            /* text-align: left !important; */
            padding: 10px;
        }
        
        .Reportinvoice-description-table td {
            text-align: left !important;
            border: 1px solid #000;
            padding: 20px 10px;
        }
        
        .page-title {
            text-align: center;
            width: 100%;
            border-bottom: 1.5px solid #000;
        
        }
        
        .header-title {
            padding: 0px 10px;
            display: flex;
            /* align-items: center; */
            justify-content: space-between;
            border-bottom: 1.5px solid #000;
        }
        
        .left-title {
            width: 55%;
        }
        
        .left-title p {
            width: 80%;
        }
        
        .left-title p span {
            font-weight: 800;
            display: block;
        }
        
        .right-title {
            float: right;
            width: 35%;
        }
        
        .dl-horizontal dt {
            float: left;
            overflow: hidden;
            clear: left;
            font-weight: 900;
            text-align: right;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        
        .dl-horizontal dd {
            margin-left: 95px;
        }
        
        .Reportinvoice-total-details {
            padding: 0px 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            border-bottom: 1.5px solid #000;
        }

        .Reportinvoice-total-details .Reportinvoice-amount {
            width: 80%;

        }

        .Reportinvoice-total-details .Reportinvoice-Total-details {
            width: 40%;
        }

        .Reportinvoice-total-details .Reportinvoice-Total-details dl dt {
            float: left;
            overflow: hidden;
            clear: left;
            font-weight: 900;
            text-align: right;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .Reportinvoice-total-details .Reportinvoice-Total-details dl dd {
            margin-left: 190px;
        }

        .Reportinvoice-details-report {
            padding: 0px 10px;
            display: flex;
            align-items: center;
            position: relative;
            justify-content: space-between;
        }

        .Reportinvoice-details-report .Reportinvoice-gst-details p {
            width: 50%;
        }

        .Reportinvoice-details-report .Reportinvoice-gst-details p span {
            position: absolute;
            bottom: 0;
            left: 10px;
        }
        .Reportinvoice-details-report .Reportinvoice-signature .Reportinvoice-signature-title {
            display: flex;
            justify-content: center;
            font-weight: 600;
        }
        .Reportinvoice-details-report .Reportinvoice-signature {
            position: relative;
            width: 30%;
        }

        .Reportinvoice-details-report .Reportinvoice-signature img {
            width: 100px;
            display: flex;
            margin: 0px auto;
        }
        </style>
          </head>
          <body>
          ${invoiceContent}
          </body>
        </html>
      `);
        printWindow.document.close();

        printWindow.onload = () => {
            printWindow.print();
            printWindow.close();
        };
    };

    return (
        <div className="invoice-wrapper">
            <PrintableInvoice routeData={routeData} selectedTripData={selectedTripData} />
            <Button variant="contained" onClick={handlePrint}>Print</Button>
        </div>
    );
};

export default Invoice;

