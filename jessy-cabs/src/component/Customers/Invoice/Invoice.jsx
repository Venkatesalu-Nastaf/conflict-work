import React from 'react';
import './invoice.css'; // Import your CSS file for styling
import { Button } from '@material-ui/core'; // Import necessary components

// const Invoice = () => {

//   const handlePrint = () => {
//     window.print();
//   };

//   return (
//     <body className="invoice-wrapper">
//       <article>
//         <address >
//           <p><h3>JESSY CABS</h3></p>
//           <p>No:8/7, 11th Street, Nandanam(Extn.),</p>
//           <p>Nandanam, Chennai-600 035</p>
//           <p>booking@jessycabs.in</p>
//           <p>Tel: 044-24354247, Mob: 9841505689</p>
//         </address>


//         <table className="firstTable">
//           <tr>
//             <th><span >Log No:</span></th>
//             <td><span >T75321</span></td>
//           </tr>
//           <tr>
//             <th><span >Date:</span></th>
//             <td><span >24/08/2023</span></td>
//           </tr>
//           <tr>
//             <th><span >Duty Type:</span></th>
//             <td><span>Local</span></td>
//           </tr>
//           <tr>
//             <th><span >Vehicle Type:</span></th>
//             <td><span>SEDAN A/C</span></td>
//           </tr>
//           <tr>
//             <th><span >Vehicle No:</span></th>
//             <td><span>TN-11-BE-6744</span></td>
//           </tr>
//           <tr>
//             <th><span >Driver Name:</span></th>
//             <td><span>MR. ARUNACHALAM</span></td>
//           </tr>
//           <tr>
//             <th><span >Driver Mobile:</span></th>
//             <td><span>6369617469</span></td>
//           </tr>
//         </table>
//         <table className="firstleftTable">
//           <tr>
//             <th><span >Client Name:</span></th>
//             <td><span >Prodapt</span></td>
//           </tr>
//           <tr>
//             <th><span >Address:</span></th>
//             <td><span >Prince Infocity-II,4th floor</span></td>
//           </tr>
//           <tr>
//             <th><span >Ordered By:</span></th>
//             <td><span>Prodapt</span></td>
//           </tr>
//           <tr>
//             <th><span >Emp. No:</span></th>
//             <td><span>1039</span></td>
//           </tr>
//           <tr>
//             <th><span >CCode:</span></th>
//             <td><span>1039</span></td>
//           </tr>
//           <tr>
//             <th><span >Report To</span></th>
//             <td><span>Mr. Arun Pai</span></td>
//           </tr>
//         </table>

//         <table className="firstbottomTable">
//           <tr>
//             <th><span >Remarks:</span></th>
//             <td><span ></span></td>
//           </tr>
//         </table>

//         <table className="secondTable">
//           <thead>
//             <tr>
//               <th><span ></span></th>
//               <th><span >DATE</span></th>
//               <th><span >HOURS</span></th>
//               <th><span >KMS</span></th>

//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td><span >Closing</span></td>
//               <td><span >24/08/2023</span></td>
//               <td><span >01.01</span></td>
//               <td><span >285</span></td>
//             </tr>
//             <tr>
//               <td><span >Starting</span></td>
//               <td><span >24/08/2023</span></td>
//               <td><span >01.01</span></td>
//               <td><span >285</span></td>
//             </tr>
//             <tr>
//               <td><span >Total</span></td>
//               <td><span >0</span></td>
//               <td><span >0</span></td>
//               <td><span >0</span></td>
//             </tr>
//           </tbody>
//         </table>

//       </article>

//       {/* <aside>
//         <h1 id="notes">Additional Notes</h1>
//         <div >
//           <p>A finance charge of 1.5% will be made on unpaid balances after 30 days.</p>
//         </div>
//       </aside> */}

//       <Button onClick={handlePrint} variant="contained" color="primary">
//         Print
//       </Button>

//     </body>
//   );
// };



const PrintableInvoice = () => {
  return (
    <div className="printable-invoice">
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
            <td><span >T75321</span></td>
          </tr>
          <tr>
            <th><span >Date:</span></th>
            <td><span >24/08/2023</span></td>
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
      {/* <aside>
        <h1 id="notes">Additional Notes</h1>
        <div >
          <p>A finance charge of 1.5% will be made on unpaid balances after 30 days.</p>
        </div>
      </aside> */}
    </div>
  );
};

const Invoice = () => {

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Printable Invoice</title>
          <link rel="stylesheet" type="text/css" href="./invoice.css"> <!-- Include your CSS file -->
        </head>
        <body>
          ${PrintableInvoice().outerHTML}
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
