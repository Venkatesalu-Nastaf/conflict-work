import React, { useRef } from 'react';
import './PdfInvoice.css';
import { useData } from "../../../Dashboard/MainDash/Sildebar/DataContext2";
import dayjs from 'dayjs';
import { useInvoice } from './invoiceContext';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import autoTable from 'jspdf-autotable';

const PdfInvoice = () => {

    const targetRef = useRef()

    const { logo } = useData()

    const { setOpenInvoice } = useInvoice()

    const invoiceRows = [
        { billNo: 'BILL-1001', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'rajesh', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1002', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'jorge', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1003', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'harish', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1004', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'vijay', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1005', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'amit', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1006', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'naveen', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1007', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'arun', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1008', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'kiran', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1009', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'suresh', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1010', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'manoj', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1011', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'vignesh', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1012', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'lokesh', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1013', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'sathish', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1014', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'ajay', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1015', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'nithin', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1016', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'deepak', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1017', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'mohan', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1018', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'karthik', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1019', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'dinesh', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1020', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'ravi', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1001', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'rajesh', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1002', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'jorge', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1003', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'harish', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1004', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'vijay', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1005', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'amit', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1006', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'naveen', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1007', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'arun', parkPermit: 10, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1008', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'kiran', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1009', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'suresh', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1010', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'manoj', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1011', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'vignesh', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1012', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'lokesh', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1013', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'sathish', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1014', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'ajay', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1015', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'nithin', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1016', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'deepak', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1017', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'mohan', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1018', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'karthik', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1019', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'dinesh', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1020', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'ravi', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1013', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'sathish', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1014', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'ajay', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1015', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'nithin', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1016', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'deepak', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1017', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'mohan', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1018', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'karthik', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1019', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'dinesh', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1020', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'ravi', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1001', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'rajesh', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1002', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'jorge', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1003', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'harish', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1004', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'vijay', parkPermit: 340, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1005', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'amit', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1006', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'naveen', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1007', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'arun', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1008', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'kiran', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1009', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'suresh', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1010', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'manoj', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1011', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'vignesh', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1012', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'lokesh', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1013', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'sathish', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1014', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'ajay', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1015', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'nithin', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1016', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'deepak', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1017', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'mohan', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1018', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'karthik', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1019', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'dinesh', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1020', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'ravi', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
         { billNo: 'BILL-1004', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'vijay', parkPermit: 340, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1005', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'amit', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1006', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'naveen', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1007', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'arun', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1008', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'kiran', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1009', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'suresh', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1010', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'manoj', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1011', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'vignesh', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1012', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'lokesh', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1013', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'sathish', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1014', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'ajay', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1015', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'nithin', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1016', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'deepak', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1017', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'mohan', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1018', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'karthik', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1019', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'dinesh', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
        { billNo: 'BILL-1020', billDate: '17-05-2025', orderedBy: 'Zai Pvt Ltd', reportedTo: 'ravi', parkPermit: 0, cusAdv: 0, totalAmount: 0 },
    ];

    function numberToWords(num) {
        const a = [
            '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
            'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen',
            'Eighteen', 'Nineteen'
        ];
        const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

        const numToWords = (n) => {
            if (n < 20) return a[n];
            if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + a[n % 10] : '');
            if (n < 1000) return a[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' and ' + numToWords(n % 100) : '');
            if (n < 100000) return numToWords(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 !== 0 ? ' ' + numToWords(n % 1000) : '');
            if (n < 10000000) return numToWords(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 !== 0 ? ' ' + numToWords(n % 100000) : '');
            return numToWords(Math.floor(n / 10000000)) + ' Crore' + (n % 10000000 !== 0 ? ' ' + numToWords(n % 10000000) : '');
        };

        const rupees = Math.floor(num);
        const paise = Math.round((num - rupees) * 100);

        let words = rupees === 0 ? "Zero" : numToWords(rupees);
        words += " Rupees";

        if (paise > 0) {
            words += " and " + numToWords(paise) + " Paise";
        }

        return words + " Only";
    }


    const handlePrint = async () => {

        const doc = new jsPDF("p", "mm", "a4");

        const element = targetRef.current;
        if (!element) return;

        const canvas = await html2canvas(element, { scale: 2 });
        const imgdata = canvas.toDataURL('image/png');
        const pageWidth = doc.internal.pageSize.getWidth();
        // const pageHeight = doc.internal.pageSize.getHeight();
        const imgProps = doc.getImageProperties(imgdata);
        const imgHeight = (imgProps.height * pageWidth) / imgProps.width;
        doc.addImage(imgdata, 'PNG', 0, 0, pageWidth, imgHeight);

        const startY = imgHeight;
        const tableColumn = ["SNo", "Bill No", "Bill Date", "Ordered By", "Reported To", "Park/Permit", "Cus Adv", "Total Amount"];
        const tableRows = invoiceRows.map((row, i) => [
            i + 1,
            row.billNo,
            row.billDate,
            row.orderedBy,
            row.reportedTo,
            row.parkPermit,
            row.cusAdv,
            row.totalAmount
        ]);

        const totalParkPermit = invoiceRows.reduce((sum, row) => sum + Number(row.parkPermit || 0), 0);
        const totalCusAdv = invoiceRows.reduce((sum, row) => sum + Number(row.cusAdv || 0), 0);
        const totalAmount = invoiceRows.reduce((sum, row) => sum + Number(row.totalAmount || 0), 0);

        tableRows.push([
            '', '', '', '', 'Total',
            // totalParkPermit.toFixed(2),
            // totalCusAdv.toFixed(2),
            // totalAmount.toFixed(2)
            totalParkPermit,
            totalCusAdv,
            totalAmount
        ]);

        let tableEndY = 0;

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: startY,
            margin: { top: 20, left: 5, right: 5 },
            tableWidth: 'auto',
            headStyles: {
                fillColor: [211, 211, 211],
                textColor: [64, 64, 64],
                fontSize: 10,
                fontStyle: 'bold',
                halign: 'center',
                valign: 'middle',
                cellPadding: 3,
                lineColor: [128, 128, 128],
                lineWidth: 0.3,
            },
            bodyStyles: {
                fontSize: 9,
                cellPadding: 3,
                lineColor: [162, 161, 161],
                lineWidth: 0.3,
                textColor: [0, 0, 0],
                fillColor: undefined,
            },
            styles: {
                font: 'helvetica',
                textColor: [0, 0, 0],
            },
            didParseCell: function (data) {
                const rowIndex = data.row.index;
                if (data.section === 'body' && rowIndex % 2 === 0) {
                    data.cell.styles.fillColor = undefined;
                }
                if (data.row.raw[4] === 'Total') {
                    data.cell.styles.fontStyle = 'bold';
                    data.cell.styles.textColor = [0, 0, 0];
                    data.cell.styles.fillColor = undefined;
                }
            },
            didDrawPage: function (data) {
                tableEndY = data.cursor.y + 10;
            }
        });

        const cgst = (totalAmount * 0.025).toFixed(2);
        const sgst = (totalAmount * 0.025).toFixed(2);
        const grandTotal = (parseFloat(totalAmount) + parseFloat(cgst) + parseFloat(sgst)).toFixed(2);

        const rightAlign = (label, value, yOffset) => {
            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            doc.text(`${label}:`, pageWidth - 60, tableEndY + yOffset);
            doc.setFont(undefined, 'bold');
            doc.text(`${value}`, pageWidth - 20, tableEndY + yOffset, { align: 'right' });
        };

        rightAlign("Amount", totalAmount.toFixed(2), 0);
        rightAlign(`CGST 2.5%`, cgst, 8);
        rightAlign(`SGST 2.5%`, sgst, 16);
        rightAlign("Total Amount", grandTotal, 24);


        const amountInWords = numberToWords(parseFloat(grandTotal));
        doc.setFont(undefined, 'normal');
        doc.setFontSize(10);
        doc.text("Rs.", 10, tableEndY + 40);
        doc.setFont(undefined, 'bold');
        doc.text(amountInWords, 20, tableEndY + 40, { maxWidth: pageWidth - 30 });

        doc.save(`invoice_${Date.now()}.pdf`);
        setOpenInvoice(false);
    };

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', width: '784px', padding: 20 }} ref={targetRef}>

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '50px' }}>
                    <div>
                        <h2 className="vendorinvoicetext" style={{ textTransform: 'uppercase' }}>jessy cabs</h2>
                        <h2 className="vendorinvoicetextno">No.66,ggggggggg</h2>
                    </div>
                    <div className="imagediv">
                        <img src={logo} className="image-vendor" alt="organisationimage" />
                    </div>
                </div>

                <div className="mobilediv-vendor">
                    <h2 className="organisationtext-vendor">Tel : 044-49105959 Mob : 9841505689</h2>
                    <h2 className="organisationtext-ref-vendor">GST : 456456AESW</h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '50px', borderBottom: '1px solid grey', paddingBottom: 5 }}>
                    <div>
                        <h2 className="organisationnametext" style={{ textTransform: 'uppercase' }}>zai pvt ltd</h2>
                        <h2 className="organisationtext-vendor">Srinivasan Street Harish,Madipakkam</h2>
                        <h2 className="organisationtext-vendor">Andhra Pradesh</h2>
                        <h2 className="organisationtext-vendor">GST : 123455678</h2>
                    </div>
                    <div className="Taxinvoicediv-vendor">
                        <h3 className="Refnotext-vendor">
                            <span>Ref No: </span>
                            <span className="invoice-vendor">RF1001</span>
                        </h3>
                    </div>
                </div>

                <div className="Datediv-vendor">
                    <p>From: <span className="Datetext-vendor">{dayjs(new Date()).format('DD-MM-YYYY')}</span></p>
                    <p>To: <span className="Datetext-vendor">{dayjs(new Date()).format('DD-MM-YYYY')}</span></p>
                </div>

            </div>

            <div>
                <table className="table-ref-vendor">
                    <thead>
                        <tr>
                            <th className="tableheadtext-vendor">SNo</th>
                            <th className="tableheadtext-vendor">Bill No</th>
                            <th className="tableheadtext-vendor">Bill Date</th>
                            <th className="tableheadtext-vendor">Ordered By</th>
                            <th className="tableheadtext-vendor">Reported To</th>
                            <th className="tableheadtext-vendor">Park/Permit</th>
                            <th className="tableheadtext-vendor">Cus Adv</th>
                            <th className="tableheadtext-vendor">Total Amount</th>
                        </tr>
                    </thead>

                    <tbody className="tablebody">
                        {invoiceRows.map((row, index) => (
                            <tr className="tabledata-ref-vendor" key={index}>
                                <td className="tdata-vendor">{index + 1}</td>
                                <td className="tdata-vendor">{row.billNo}</td>
                                <td className="tdata-vendor">{row.billDate}</td>
                                <td className="tdata-vendor">{row.orderedBy}</td>
                                <td className="tdata-vendor">{row.reportedTo}</td>
                                <td className="tdata-vendor">0</td>
                                <td className="tdata-vendor">0</td>
                                <td className="tdata-vendor" style={{ textAlign: 'center' }}>0</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td className="tdata-vendor"></td>
                            <td className="tdata-vendor"></td>
                            <td className="tdata-vendor"></td>
                            <td className="tdata-vendor"></td>
                            <td className="tdata-vendor">Total</td>
                            <td className="tdata-vendor">0</td>
                            <td className="tdata-vendor">0</td>
                            <td className="tdata-vendor" style={{ textAlign: "center" }}>0</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div className="total-div-vendor" >
                <div>
                    <h4 style={{ margin: "5px" }}>Amount :</h4>
                    <h4 style={{ margin: "5px" }}>CGST 2.5% on 0 :</h4>
                    <h4 style={{ margin: "5px" }}>SGST 2.5% on 0 :</h4>
                    <h4 style={{ margin: "5px" }}>Total Amount :</h4>
                </div>
                <div className="amount-div">
                    <p className="amounttext" style={{ margin: '5px' }}>0.00</p>
                    <p className="amounttext" style={{ marginTop: '5px', paddingLeft: "14px" }}>0.00</p>
                    <p className="amounttext" style={{ marginTop: '5px', paddingLeft: "14px" }}>0.00</p>
                    <p className="amounttext" style={{ marginTop: '5px', paddingLeft: "14px" }}>0.00</p>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingTop: '10px', textTransform: 'capitalize' }}>
                <h4 style={{ margin: 0 }}>Rs.</h4>
                <p style={{ marginLeft: 6, marginTop: '0px', fontWeight: 600 }}>Zero</p>
            </div>



            <div className="printdiv-vendor">
                <button onClick={() => setOpenInvoice(false)} className="print-vendor">
                    Cancel
                </button>
                <button className="print-vendor" onClick={() => handlePrint()} >Print</button>
            </div>

        </div>
    )
}

export default PdfInvoice
