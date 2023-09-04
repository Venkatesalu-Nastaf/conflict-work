import React from 'react';
import './invoice.css'; // Import your CSS file for styling
import { Button } from '@material-ui/core'; // Import necessary components
import ReactDOMServer from 'react-dom/server';


const PrintableInvoice = () => {
  
 

  return (
    <div className="invoice-wrapper">
      <article>
        <address >
          <p><h3>JESSY CABS</h3></p>
          <p>No:8/7, 11th Street, Nandanam(Extn.),</p>
          <p>Nandanam, Chennai-600 035</p>
          <p>booking@jessycabs.in</p>
          <p>Tel: 044-24354247, Mob: 9841505689</p>
        </address>
        <table className="firstTable">
          <tr>
            <th><span >Log No:</span></th>
            <td><span >6786876</span></td>
          </tr>
          <tr>
            <th><span >Date:</span></th>
            <td><span >2356778</span></td>
          </tr>
          <tr>
            <th><span >Duty Type:</span></th>
            <td><span>Local</span></td>
          </tr>
          <tr>
            <th><span >Vehicle Type:</span></th>
            <td><span>SEDAN A/C</span></td>
          </tr>
          <tr>
            <th><span >Vehicle No:</span></th>
            <td><span>TN-11-BE-6744</span></td>
          </tr>
          <tr>
            <th><span >Driver Name:</span></th>
            <td><span>MR. ARUNACHALAM</span></td>
          </tr>
          <tr>
            <th><span >Driver Mobile:</span></th>
            <td><span>6369617469</span></td>
          </tr>
        </table>
        <table className="firstleftTable">
          <tr>
            <th><span >Client Name:</span></th>
            <td><span >Prodapt</span></td>
          </tr>
          <tr>
            <th><span >Address:</span></th>
            <td><span >Prince Infocity-II,4th floor</span></td>
          </tr>
          <tr>
            <th><span >Ordered By:</span></th>
            <td><span>Prodapt</span></td>
          </tr>
          <tr>
            <th><span >Emp. No:</span></th>
            <td><span>1039</span></td>
          </tr>
          <tr>
            <th><span >CCode:</span></th>
            <td><span>1039</span></td>
          </tr>
          <tr>
            <th><span >Report To</span></th>
            <td><span>Mr. Arun Pai</span></td>
          </tr>
        </table>
        <table className="firstbottomTable">
          <tr>
            <th><span >Remarks:</span></th>
            <td><span ></span></td>
          </tr>
        </table>
        <table className="secondTable">
          <thead>
            <tr>
              <th><span ></span></th>
              <th><span >DATE</span></th>
              <th><span >HOURS</span></th>
              <th><span >KMS</span></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span >Closing</span></td>
              <td><span >24/08/2023</span></td>
              <td><span >01.01</span></td>
              <td><span >285</span></td>
            </tr>
            <tr>
              <td><span >Starting</span></td>
              <td><span >24/08/2023</span></td>
              <td><span >01.01</span></td>
              <td><span >285</span></td>
            </tr>
            <tr>
              <td><span >Total</span></td>
              <td><span >0</span></td>
              <td><span >0</span></td>
              <td><span >0</span></td>
            </tr>
          </tbody>
        </table>
      </article>
      {/* <img src={imageUrl} alt="Uploaded Invoice" /> */}
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
          
          .invoice-wrapper header span {
            margin: 0 0 1em 1em;
            max-height: 25%;
            max-width: 60%;
            position: relative;
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
          
          .invoice-wrapper article,
          article address,
          table {
            margin: 0 0 3em;
          }
          
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
          
          .invoice-wrapper table {
            font-size: 75%;
            table-layout: auto;
            width: 100%;
          }
          
          .invoice-wrapper table {
            border-collapse: separate; 
            border-spacing: 2px;
          }
          
          .invoice-wrapper th,
          td {
            border-width: 1px;
            padding: 1em;
            position: relative;
            text-align: left;
          }
          
          .invoice-wrapper th,
          td {
            border-radius: 0.25em;
            border-style: solid;
          }
          
          .invoice-wrapper th {
            background: #EEE;
            border-color: #BBB;
          }
          
          .invoice-wrapper td {
            border-color: #DDD;
          }
          
          /* table firstTable */
          .invoice-wrapper table.firstleftTable {
            float: left;
            width: 45%;
          
          }
          
          .invoice-wrapper table.firstTable {
            float: right;
            width: 45%;
        
          }
          .invoice-wrapper table.firstbottomTable {
            float: right;
            width: 100%;
            
          }
          
          .invoice-wrapper table.firstTable:after {
            clear: both;
            content: "";
            display: table;
          }
          
          /* table firstTable */
          
          .invoice-wrapper table.firstTable th {
            width: 40%;
          }
          
          .invoice-wrapper table.firstTable td {
            width: 60%;
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
