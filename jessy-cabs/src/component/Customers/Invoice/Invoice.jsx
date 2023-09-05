import React from 'react';
import Logo from "../../Dashboard/MainDash/Sildebar/Logo-Img/logo.png";
import './invoice.css'; // Import your CSS file for styling
import { Button } from '@material-ui/core'; // Import necessary components
import ReactDOMServer from 'react-dom/server';


const PrintableInvoice = () => {



  return (
    <div className="invoice-wrapper">
      <article>
        <div className='invoice-container-header'>
          <div className="logo-image-invoice">
            <img src={Logo} alt="logo" />
          </div>
          <div className="invoice-address">
            <address >
              {/* <p><h3>JESSY CABS</h3></p> */}
              <p className='invoice-address-detials'>No:8/7, 11th Street, Nandanam(Extn.),
                Nandanam, Chennai-600 035
                booking@jessycabs.in</p>
              <p className='invoice-contact-details'>Tel: 044-24354247, Mob: 9841505689</p>
            </address>
          </div>
        </div>
        <div className="main-invoice-container">
          <div className='first-table-invoice-container'>
            <table id='table-invoice' className="firstleftTable">
              <tr>
                <th id='table-header'><span >Client Name:</span></th>
                <td id='table-data'><span >Prodapt</span></td>
              </tr>
              <tr>
                <th id='table-header'><span >Address:</span></th>
                <td id='table-data'><span >Prince Infocity-II,4th floor</span></td>
              </tr>
              <tr>
                <th id='table-header'><span >Ordered By:</span></th>
                <td id='table-data'><span>Prodapt</span></td>
              </tr>
              <tr>
                <th id='table-header'><span >Emp. No:</span></th>
                <td id='table-data'><span>1039</span></td>
              </tr>
              <tr>
                <th id='table-header'><span >CCode:</span></th>
                <td id='table-data'><span>1039</span></td>
              </tr>
              <tr>
                <th id='table-header'><span >Report To</span></th>
                <td id='table-data'><span>Mr. Arun Pai</span></td>
              </tr>
              <tr>
                <th id='table-header'><span >Reporting @</span></th>
                <td id='table-data'><span ></span></td>
              </tr>
              <tr>
                <th id='table-header'><span >Remarks:</span></th>
                <td id='table-data'><span ></span></td>
              </tr>
            </table>
            <table id='table-invoice' className="firstTable">
              <tr>
                <th id='table-header'>Log No:</th>
                <td id='table-data'>6786876</td>
              </tr>
              <tr>
                <th id='table-header'>Date:</th>
                <td id='table-data'>2356778</td>
              </tr>
              <tr>
                <th id='table-header'>Duty Type:</th>
                <td id='table-data'>Local</td>
              </tr>
              <tr>
                <th id='table-header'>Vehicle Type:</th>
                <td id='table-data'><span>SEDAN A/C</span></td>
              </tr>
              <tr>
                <th id='table-header'><span >Vehicle No:</span></th>
                <td id='table-data'><span>TN-11-BE-6744</span></td>
              </tr>
              <tr>
                <th id='table-header'><span >Driver Name:</span></th>
                <td id='table-data'><span>MR. ARUNACHALAM</span></td>
              </tr>
              <tr>
                <th id='table-header'><span >Driver Mobile:</span></th>
                <td id='table-data'><span>6369617469</span></td>
              </tr>
            </table>
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
                    <td id='table-datas'><span >24/08/2023</span></td>
                    <td id='table-datas'><span >01.01</span></td>
                    <td id='table-datas'><span >285</span></td>
                  </tr>
                  <tr>
                    <td id='table-datas'><span >Starting</span></td>
                    <td id='table-datas'><span >24/08/2023</span></td>
                    <td id='table-datas'><span >01.01</span></td>
                    <td id='table-datas'><span >285</span></td>
                  </tr>
                  <tr>
                    <td id='table-datas'><span >Total</span></td>
                    <td id='table-datas'><span >0</span></td>
                    <td id='table-datas'><span >0</span></td>
                    <td id='table-datas'><span >0</span></td>
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
                <p>Guest Signature</p>
              </div>
            </div>
          </div>
        </div>
        <div className='total-values'>
          <div id='Totals'><span id='title'>Total Parking  </span><span>00</span></div>
          <div id='Totals'><span id='title'>Total Permit  </span><span>00</span></div>
        </div>
      </article>
    </div>
  );
};
const Invoice = () => {
  const handlePrint = () => {
    const invoiceContent = ReactDOMServer.renderToString(<PrintableInvoice />);
    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write(`
        <html>
          <head>
          <title>LOG SHEET</title>
          <style>
          .invoice-wrapper {
            border: 0;
            box-sizing: content-box;
            color: inherit;
            font-family: inherit;
            font-size: inherit;
            font-style: inherit;
            font-weight: inherit;
            line-height: inherit;
            list-style: none;
            margin: 20;
            padding: 20;
            text-decoration: none;
            vertical-align: top;
          }
          
          .invoice-container-header {
            display: flex;
            align-content: center;
            justify-content: space-between;
          }
          
          .logo-image-invoice img {
            width: 100px;
          
          }
          
          .invoice-address {
            width: 230px;
          }
          
          .invoice-address .invoice-contact-details {
            font-weight: 600;
            font-size: 13px;
          }
          
          /* heading */
          
          .invoice-wrapper header {
            margin: 0 0 3em;
          }
          
          .invoice-wrapper h1 {
            font: bold 100% sans-serif;
            letter-spacing: 0.5em;
            text-align: center;
            text-transform: uppercase;
          }
          
          .invoice-wrapper header h1 {
            background: black;
            border-radius: 0.25em;
            color: white;
            margin: 0 0 1em;
            padding: 0.5em 0;
          }
          
          .invoice-wrapper header address {
            float: left;
            /* font-size: 75%; */
            /* font-style: normal; */
            /* line-height: 1.25; */
            /* margin: 0 1em 1em 0; */
          }
          
          /* .invoice-wrapper header address p {
            margin: 0 0 0.25em;
          } */
          
          .invoice-wrapper header span,
          header img {
            display: block;
            float: right;
          }
          
          
          .invoice-wrapper header img {
            max-height: 50%;
            max-width: 50%;
          }
          
          .invoice-wrapper header:after {
            clear: both;
            content: "";
            display: table;
          }
          
          /* article */
          
          
          
          .invoice-wrapper article h1 {
            clip: rect(0 0 0 0);
            position: absolute;
          }
          
          /* .invoice-wrapper article address {
            float: left;
            font-size: 125%;
            font-weight: bold;
          } */
          
          .invoice-wrapper article:after {
            clear: both;
            content: "";
            display: table;
          }
          
          /* table */
          .main-invoice-container {
            border: 1px solid #000;
          
          }
          
          .first-table-invoice-container {
            display: flex;
          }
          
          .secondTable {
            display: flex;
            border-top: 1px solid #000;
          }
          
          .vehicale-details-table {
            width: 60%;
            border-right: 1px solid #000;
          }
          
          .vehicale-details-table #table-headers,
          #table-datas {
            padding: 6px;
            border-radius: 2px;
            border: 1px solid #ccc;
          }
          
          .guest-signature-details {
            display: flex;
            width: 40%;
            padding: 5px;
          
          }
          
          .guest-signature-details .instruction {
            width: 70%;
            position: relative;
          }
          
          .guest-signature-details .guest-sign {
            width: 40%;
            position: relative;
          }
          
          .guest-signature-details .guest-sign p {
            position: absolute;
            bottom: 0;
            font-size: 10px;
            font-weight: bold;
            text-decoration: underline;
          }
          
          .invoice-wrapper #table-invoice {
            font-size: 75%;
            table-layout: auto;
            width: 100%;
          }
          
          .invoice-wrapper #table-invoice {
            border-collapse: separate;
            border-spacing: 2px;
          }
          
          .invoice-wrapper #table-header,
          #table-data {
            border-width: 1px;
            padding: 6px;
            position: relative;
            text-align: left;
          }
          
          .invoice-wrapper #table-header {
            background: #EEE;
            padding: 6px;
            border: none;
          }
          
          .invoice-wrapper #table-data {
            padding: 6px;
            border: none;
            /* width: 100px; */
          }
          
          /* table firstTable */
          .invoice-wrapper #table-invoice.firstleftTable {
            float: left;
            width: 45%;
            height: 50%;
          }
          
          .invoice-wrapper #table-invoice.firstTable {
            float: right;
            width: 45%;
            height: 50%;
          }
          
          .invoice-wrapper #table-invoice.firstbottomTable {
            float: right;
            width: 100%;
            height: 50%;
          }
          
          .invoice-wrapper #table-invoice.firstTable:after {
            clear: both;
            content: "";
            display: table;
          }
          
          
          /* table firstTable */
          
          .invoice-wrapper #table-invoice.firstTable #table-header {
            width: 40%;
          }
          
          .invoice-wrapper #table-invoice.firstTable #table-data {
            width: 60%;
          }
          
          .total-values {
            display: flex;
          }
          
          .total-values #Totals {
            margin: 10px;
          }
          
          .total-values #Totals #title {
            font-weight: bold;
          }
          
          .invoice-wrapper form {
            font: 16px/1 'Open Sans', sans-serif;
            overflow: auto;
            padding: 0.5in;
          }
          
          .invoice-wrapper form {
            background: #999;
            cursor: default;
          }
          
          .invoice-wrapper form {
            box-sizing: border-box;
            height: 11in;
            margin: 0 auto;
            overflow: hidden;
            padding: 0.5in;
            width: 8.5in;
          }
          
          .invoice-wrapper form {
            background: #FFF;
            border-radius: 1px;
            box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5);
          }
          
          .invoice-wrapper aside h1#notes {
            border: none;
            border-width: 0 0 1px;
            margin: 0 0 1em;
          }
          
          .invoice-wrapper aside h1#notes {
            border-color: #999;
            border-bottom-style: solid;
            border-bottom-width: 10%;
            font: bold 100% sans-serif;
            letter-spacing: 0.5em;
            text-align: center;
            text-transform: uppercase;
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
      <PrintableInvoice />
      <Button onClick={handlePrint}>Print</Button>
    </div>
  );
};

export default Invoice;
