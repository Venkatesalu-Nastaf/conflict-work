import React from 'react';
import './Reportinvoice.css';
import { Button } from '@material-ui/core';
import ReactDOMServer from 'react-dom/server';
import Logo from "../../../../Dashboard/MainDash/Sildebar/Logo-Img/logo.png";

const PrintableInvoice = ({ tripSheetData, book, roundOff, TotalAmountValue, BalanceValue, selectedCustomerData, selectedCustomerDatas, formData }) => {

    return (
        <>
            <div className='Reportinvoice-invoice' >
                <div className="Reportinvoice-table-container">
                    <div className="page-title">
                        <div className="sheet-logo">
                            <img src={Logo} alt="logo" />
                        </div>
                        <div className="sheet-type">
                            <h1>Tax Invoice</h1>
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
                </div>
            </div>
        </>
        // <body>
        //     <div id="invoiceholder">
        //         <div id="invoice" className="effect2">
        //             <div id="invoice-top">
        //                 <div className="logo"><img src={Logo} alt="logo" /></div>
        //                 <div className="title">
        //                     {/* <h1>Tax Invoie</h1> */}
        //                 </div>
        //             </div>
        //             <div id="invoice-mid">
        //                 <div className="righttitle">
        //                     <p>OUR GSTIN : 33AVNPM9362R1ZK<br />
        //                         State : Tamilnadu, Code : 33<br />
        //                         PAN No : AVNPM9362R<br />
        //                         {/* SAC CODE : 996601 */}
        //                     </p>
        //                 </div>
        //                 <div id="message">
        //                     <h2>Jessy Cabs,</h2>
        //                     <p>No:8/, 11th street, Nandanam[Extn.],<br />
        //                         Nandanam, Chennai - 600035<br />
        //                         jessycabs.india@yahoo.com<br />
        //                         Tel:044-24354247,Mob:9841505689</p>
        //                 </div>

        //                 <div className="clearfix">
        //                     <div className="col-left">
        //                         <div className="clientinfo">
        //                             <table className="table">
        //                                 <tbody>
        //                                     <tr>
        //                                         <td className="tabledatas"><label id="invoice_total">Organization :</label></td>
        //                                         <td className="tabledatas"><span>hcl</span></td>
        //                                     </tr>
        //                                     <tr>
        //                                         <td className="tabledatas"><label id="invoice_total">Address :</label></td>
        //                                         <td className="tabledatas"><span>karle town-Sez Unit1, No.288,38,39,123P,124,125,126,128 and<br />129P, Ground Floor to 3rd Floor of Block-1, Bangalore</span></td>
        //                                     </tr>
        //                                     <tr>
        //                                         <td className="tabledatas"><label id="payment_term">GSTIN :</label></td>
        //                                         <td className="tabledatas"><span>29AAACH1645p3z5, State: Karnataka, Code: 29</span></td>
        //                                     </tr>
        //                                     <tr>
        //                                         <td className="tabledatas"><label id="note">Guest Name :</label></td>
        //                                         <td className="tabledatas"><span>Akash</span></td>
        //                                     </tr>
        //                                 </tbody>
        //                             </table>
        //                         </div>
        //                     </div>
        //                     <div className="col-right">
        //                         <table className="table">
        //                             <tbody>
        //                                 <tr><td><span>Service City</span></td><td><label id="invoice_total">Bangalore</label></td></tr>
        //                                 <tr><td><span>Trip Date</span></td><td><label id="payment_term">10/11/2023</label></td></tr>
        //                                 <tr><td><span>Trip No</span></td><td><label id="note">TS1001</label></td></tr>
        //                                 <tr><td><span>Vehicle Type</span></td><td><label id="note">SADAN A/C</label></td></tr>
        //                                 <tr><td><span>Vehicle No</span></td><td><label id="note">TN 14 B 1942</label></td></tr>
        //                                 <tr><td><span>Request ID</span></td><td><label id="note">4337267</label></td></tr>
        //                             </tbody>
        //                         </table>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div id="invoice-bot">
        //                 <div id="table">
        //                     <table className="table-main">
        //                         <thead>
        //                             <tr className="tabletitle">
        //                                 <th>Description</th>
        //                                 <th>Trip Id</th>
        //                                 <th>Date</th>
        //                                 <th>Rate</th>
        //                                 <th>Total</th>
        //                             </tr>
        //                         </thead>
        //                         <tr className="list-item">
        //                             <td data-label="Description" className="tabledata">1000/SADAN A/C</td>
        //                             <td className="tabledata" data-label="Unit Price" >TS1001</td>
        //                             <td className="tabledata" data-label="Unit Price" >10/11/2023</td>
        //                             <td className="tabledata" data-label="Unit Price" >2000</td>
        //                             <td className="tabledata" data-label="Total" >1000</td>
        //                         </tr>
        //                         <tr className="list-item total-row">
        //                             <th colSpan="4" className="tableitem">Total Amount</th>
        //                             <td data-label="Grand Total" className="tableitem">1000</td>
        //                         </tr>
        //                         <tr className="list-item total-row">
        //                             <th colSpan="4" className="tableitem">GST @ 5%</th>
        //                             <td data-label="Grand Total" className="tableitem">50</td>
        //                         </tr>
        //                         <tr className="list-item total-row">
        //                             <th colSpan="4" className="tableitem">Rounded Off</th>
        //                             <td data-label="Grand Total" className="tableitem">0.15</td>
        //                         </tr>
        //                         <tr className="list-item total-row">
        //                             <th colSpan="4" className="tableitem">Net Payable</th>
        //                             <td data-label="Grand Total" className="tableitem" id="tabletotal">4000</td>
        //                         </tr>
        //                     </table>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </body>
    );
};
const Invoice = ({ tripSheetData, selectedCustomerData, TotalAmountValue, BalanceValue, selectedCustomerDatas, book, roundOff, formData }) => {

    const handlePrint = () => {
        const invoiceContent = ReactDOMServer.renderToString(
            <PrintableInvoice tripSheetData={tripSheetData} BalanceValue={BalanceValue} TotalAmountValue={TotalAmountValue} roundOff={roundOff} selectedCustomerData={selectedCustomerData} formData={formData} book={book} selectedCustomerDatas={selectedCustomerDatas} />
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
            /* text-align: center; */
            /* border-bottom: 1px solid #ddd; */
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
            margin-left: 90px;
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
            <PrintableInvoice tripSheetData={tripSheetData} BalanceValue={BalanceValue} TotalAmountValue={TotalAmountValue} roundOff={roundOff} book={book} selectedCustomerData={selectedCustomerData} selectedCustomerDatas={selectedCustomerDatas} formData={formData} />
            <Button variant="contained" onClick={handlePrint}>Print</Button>
        </div>
    );
};

export default Invoice;

