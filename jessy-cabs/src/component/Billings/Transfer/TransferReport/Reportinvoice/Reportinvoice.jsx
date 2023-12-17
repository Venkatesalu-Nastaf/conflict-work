import React from 'react';
// import './Reportinvoice.css';
import { Button } from '@material-ui/core';
import ReactDOMServer from 'react-dom/server';
import Logo from "../../../../Dashboard/MainDash/Sildebar/Logo-Img/logo.png";
// import Logo from "../../../Dashboard/MainDash/Sildebar/Logo-Img/logo.png";

const PrintableInvoice = ({ tripSheetData, book, roundOff, TotalAmountValue, BalanceValue, selectedCustomerData, selectedCustomerDatas, formData }) => {

    return (
        <body>
            <div id="invoiceholder">
                <div id="invoice" className="effect2">
                    <div id="invoice-top">
                        <div className="logo"><img src={Logo} alt="logo" /></div>
                        <div className="title">
                            <h1>Tax Invoice</h1>
                        </div>
                    </div>
                    <div id="invoice-mid">
                        <div className="righttitle">
                            <p>OUR GSTIN : 33AVNPM9362R1ZK<br />
                                State : Tamilnadu, Code : 33<br />
                                PAN No : AVNPM9362R<br />
                                SAC CODE : 996601
                            </p>
                        </div>
                        <div id="message">
                            <h2>Jessy Cabs,</h2>
                            <p>No:8/, 11th street, Nandanam[Extn.],<br />
                                Nandanam, Chennai - 600035<br />
                                jessycabs.india@yahoo.com<br />
                                Tel:044-24354247,Mob:9841505689</p>
                        </div>

                        <div className="clearfix">
                            <div className="col-left">
                                <div className="clientinfo">
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <td className="tabledatas"><label id="invoice_total">Organization :</label></td>
                                                <td className="tabledatas"><span>hcl</span></td>
                                            </tr>
                                            <tr>
                                                <td className="tabledatas"><label id="invoice_total">Address :</label></td>
                                                <td className="tabledatas"><span>karle town-Sez Unit1, No.288,38,39,123P,124,125,126,128 and<br />129P, Ground Floor to 3rd Floor of Block-1, Bangalore</span></td>
                                            </tr>
                                            <tr>
                                                <td className="tabledatas"><label id="payment_term">GSTIN :</label></td>
                                                <td className="tabledatas"><span>29AAACH1645p3z5, State: Karnataka, Code: 29</span></td>
                                            </tr>
                                            <tr>
                                                <td className="tabledatas"><label id="note">Guest Name :</label></td>
                                                <td className="tabledatas"><span>Akash</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="col-right">
                                <table className="table">
                                    <tbody>
                                        <tr><td><span>Service City</span></td><td><label id="invoice_total">Bangalore</label></td></tr>
                                        <tr><td><span>Trip Date</span></td><td><label id="payment_term">10/11/2023</label></td></tr>
                                        <tr><td><span>Trip No</span></td><td><label id="note">TS1001</label></td></tr>
                                        <tr><td><span>Vehicle Type</span></td><td><label id="note">SADAN A/C</label></td></tr>
                                        <tr><td><span>Vehicle No</span></td><td><label id="note">TN 14 B 1942</label></td></tr>
                                        <tr><td><span>Request ID</span></td><td><label id="note">4337267</label></td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div id="invoice-bot">
                        <div id="table">
                            <table className="table-main">
                                <thead>
                                    <tr className="tabletitle">
                                        <th>Description</th>
                                        <th>Trip Id</th>
                                        <th>Date</th>
                                        <th>Rate</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tr className="list-item">
                                    <td data-label="Description" className="tabledata">1000/SADAN A/C</td>
                                    <td className="tabledata" data-label="Unit Price" >TS1001</td>
                                    <td className="tabledata" data-label="Unit Price" >10/11/2023</td>
                                    <td className="tabledata" data-label="Unit Price" >2000</td>
                                    <td className="tabledata" data-label="Total" >1000</td>
                                </tr>
                                <tr className="list-item total-row">
                                    <th colSpan="4" className="tableitem">Total Amount</th>
                                    <td data-label="Grand Total" className="tableitem">1000</td>
                                </tr>
                                <tr className="list-item total-row">
                                    <th colSpan="4" className="tableitem">GST @ 5%</th>
                                    <td data-label="Grand Total" className="tableitem">50</td>
                                </tr>
                                <tr className="list-item total-row">
                                    <th colSpan="4" className="tableitem">Rounded Off</th>
                                    <td data-label="Grand Total" className="tableitem">0.15</td>
                                </tr>
                                <tr className="list-item total-row">
                                    <th colSpan="4" className="tableitem">Net Payable</th>
                                    <td data-label="Grand Total" className="tableitem" id="tabletotal">4000</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </body>
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
          #invoiceholder body {
            background: #E0E0E0;
            font-family: 'Roboto', sans-serif;
        }
        
        #invoiceholder .clearfix::after {
            content: "";
            clear: both;
            display: table;
        }
        
        #invoiceholder .col-left {
            float: left;
        }
        
        #invoiceholder .col-right {
            float: right;
        }
        
        #invoiceholder h1 {
            font-size: 1.5em;
            color: #000;
        }
        
        #invoiceholder h2 {
            font-size: .9em;
        }
        
        #invoiceholder h3 {
            font-size: 1.2em;
            font-weight: 300;
            line-height: 2em;
        }
        
        #invoiceholder p {
            font-size: .75em;
            color: #000;
            line-height: 1.2em;
        }
        
        #invoiceholder a {
            text-decoration: none;
            color: #00a63f;
        }
        
        #invoiceholder {
            width: 100%;
            height: 100%;
            padding: 50px 0;
        }
        
        #invoiceholder #invoice {
            position: relative;
            margin: 0 auto;
            width: 700px;
            background: #FFF;
        }
        
        [id*='invoice-'] {
            padding: 20px;
        }
        
        #invoiceholder #invoice-top {
            border-bottom: 2px solid #00a63f;
        }
        
        #invoice-mid #message {
            border-bottom: 2px solid #00a63f;
        }
        
        #table .table-main #tabletotal {
            border-top: 2px solid #00a63f;
        }
        
        #invoiceholder #invoice-mid {
            min-height: 110px;
        }
        
        #invoiceholder #invoice-bot {
            min-height: 240px;
        }
        
        #invoiceholder .logo {
            display: inline-block;
            vertical-align: middle;
            width: 110px;
            overflow: hidden;
        }
        
        #invoiceholder .info {
            display: inline-block;
            vertical-align: middle;
            margin-left: 20px;
        }
        
        #invoiceholder .logo img,
        #invoiceholder .clientlogo img {
            width: 100%;
        }
        
        #invoiceholder .clientlogo {
            display: inline-block;
            vertical-align: middle;
            width: 50px;
        }
        
        #invoiceholder .clientinfo {
            display: inline-block;
            vertical-align: middle;
            margin-left: 20px
        }
        
        #invoiceholder .title {
            float: right;
        }
        
        #invoice-mid .righttitle {
            float: right;
        }
        
        #invoiceholder .title p {
            text-align: right;
        }
        
        #invoiceholder #message {
            margin-bottom: 30px;
            display: block;
        }
        
        #invoiceholder h2 {
            margin-bottom: 5px;
            color: #000;
        }
        
        #invoiceholder .col-right td {
            color: #000;
            padding: 5px 8px;
            border: 0;
            font-size: 0.75em;
            border-bottom: 1px solid #eeeeee;
        }
        
        #invoiceholder .col-right td label {
            margin-left: 5px;
            font-weight: 600;
            color: #000;
        }
        
        #invoiceholder .cta-group a {
            display: inline-block;
            padding: 7px;
            border-radius: 4px;
            background: rgb(196, 57, 10);
            margin-right: 10px;
            min-width: 100px;
            text-align: center;
            color: #fff;
            font-size: 0.75em;
        }
        
        #invoiceholder .cta-group .btn-primary {
            background: #00a63f;
        }
        
        #invoiceholder .cta-group.mobile-btn-group {
            display: none;
        }
        
        #invoiceholder table {
            width: 100%;
            border-collapse: collapse;
        }
        
        #invoiceholder .tabledata {
            padding: 10px;
            border-bottom: 1px solid #cccaca;
            font-size: 0.70em;
            text-align: left;
        }
        
        #invoiceholder .tabledatas {
            padding: 10px;
            border-bottom: none;
            font-size: 0.70em;
            text-align: left;
        }
        
        
        #invoiceholder .tabletitle th {
            border-bottom: 2px solid #ddd;
            text-align: right;
        }
        
        #invoiceholder .tabletitle th:nth-child(2) {
            text-align: left;
        }
        
        #invoiceholder th {
            font-size: 0.7em;
            text-align: left;
            padding: 5px 10px;
        }
        
        #invoiceholder .item {
            width: 50%;
        }
        
        #invoiceholder .list-item td {
            text-align: right;
        }
        
        #invoiceholder .list-item td:nth-child(2) {
            text-align: left;
        }
        
        #invoiceholder .total-row th,
        #invoiceholder .total-row td {
            text-align: right;
            font-weight: 700;
            font-size: .75em;
            border: 0 none;
        }
        
        #invoiceholder footer {
            border-top: 1px solid #eeeeee;
            ;
            padding: 15px 20px;
        }
        
        #invoiceholder .effect2 {
            position: relative;
        }
        
        #invoiceholder .effect2:before,
        .effect2:after {
            z-index: -1;
            position: absolute;
            content: "";
            bottom: 15px;
            left: 10px;
            width: 50%;
            top: 80%;
            max-width: 300px;
            background: #777;
            -webkit-transform: rotate(-3deg);
            -moz-transform: rotate(-3deg);
            -o-transform: rotate(-3deg);
            -ms-transform: rotate(-3deg);
            transform: rotate(-3deg);
        }
        
        #invoiceholder .effect2:after {
            -webkit-transform: rotate(3deg);
            -moz-transform: rotate(3deg);
            -o-transform: rotate(3deg);
            -ms-transform: rotate(3deg);
            transform: rotate(3deg);
            right: 10px;
            left: auto;
        }
        
        @media screen and (max-width: 767px) {
            #invoiceholder h1 {
                font-size: .9em;
            }
        
            #invoiceholder #invoice {
                width: 100%;
            }
        
            #invoiceholder #message {
                margin-bottom: 20px;
            }
        
            [id*='invoice-'] {
                padding: 20px 10px;
            }
        
            #invoiceholder .logo {
                width: 140px;
            }
        
            #invoiceholder .title {
                float: none;
                display: inline-block;
                vertical-align: middle;
                margin-left: 40px;
            }
        
            #invoiceholder .title p {
                text-align: left;
            }
        
            #invoiceholder .col-left,
            #invoiceholder .col-right {
                width: 100%;
            }
        
            #invoiceholder .table {
                margin-top: 20px;
            }
        
            #invoiceholder #table {
                white-space: nowrap;
                overflow: auto;
            }
        
            #invoiceholder td {
                white-space: normal;
            }
        
            #invoiceholder .cta-group {
                text-align: center;
            }
        
            #invoiceholder .cta-group.mobile-btn-group {
                display: block;
                margin-bottom: 20px;
            }
        
            #invoiceholder .table-main {
                border: 0 none;
            }
        
            #invoiceholder .table-main thead {
                border: none;
                clip: rect(0 0 0 0);
                height: 1px;
                margin: -1px;
                overflow: hidden;
                padding: 0;
                position: absolute;
                width: 1px;
            }
        
            #invoiceholder .table-main tr {
                border-bottom: 2px solid #eee;
                display: block;
                margin-bottom: 20px;
            }
        
            #invoiceholder .table-main td {
                font-weight: 700;
                display: block;
                padding-left: 40%;
                max-width: none;
                position: relative;
                border: 1px solid #cccaca;
                text-align: left;
            }
        
            #invoiceholder .table-main td:before {
                content: attr(data-label);
                position: absolute;
                left: 10px;
                font-weight: normal;
                text-transform: uppercase;
            }
        
            #invoiceholder .total-row th {
                display: none;
            }
        
            #invoiceholder .total-row td {
                text-align: left;
            }
        
            #invoiceholder footer {
                text-align: center;
            }
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

