import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import dayjs from "dayjs";
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import Button from "@mui/material/Button";
import { APIURL } from "../../../url";
import Excel from 'exceljs';

const useVehicleinfo = () => {
    const apiUrl = APIURL;
    const [selectedCustomerData, setSelectedCustomerData] = useState({});
    const createddata = dayjs().format('YYYY-MM-DD')
    const [actionName] = useState('');
    const [rows, setRows] = useState([]);
    const [rows1, setRows1] = useState([]);
    const [info, setInfo] = useState(false);
    const [toDate, setToDate] = useState(dayjs());
    const [fromDate, setFromDate] = useState(dayjs());
    const [searchText, setSearchText] = useState('');
    const [error, setError] = useState(false);
    const [warning, setWarning] = useState(false);
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [templateMessageData, setTemplateMessageData] = useState('');
    const [errorMessage, setErrorMessage] = useState({});
    const [warningMessage, setWarningMessage] = useState({});
    const [organistaionsendmail, setOrganisationSendEmail] = useState([])
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [drivername, setDrivername] = useState([]);
    const [vehiclenames, setVehilcNames] = useState([]);
    const [enterPressCount, setEnterPressCount] = useState(0);
    const [edit, setEdit] = useState(false)
    const [cerendentialdata, setCredentialData] = useState()

    const [loading, setLoading] = useState(false)
    const [isVButonLoading, setisVButtonLoading] = useState(false);
    const [deletevehciledata,setDeletevehciledata] = useState(false)
    const columns = [
        { field: "id", headerName: "Sno", width: 70 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 130,
            renderCell: (params) => (
                <Button
                    onClick={() => handleButtonClick(params)}
                    aria-label="open-dialog"
                >
                    <Button variant="contained" color="primary">
                        view
                    </Button>
                </Button>
            ),
        },
        { field: "vehicleId", headerName: "Vehicle ID", width: 130 },
        { field: "vehicleName", headerName: "Vehicle Name", width: 130 },
        {
            field: "doadate", headerName: "Attached Date", width: 130,
            valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
        },
        { field: "vehRegNo", headerName: "Vehicle Reg No", width: 130 },
        { field: "stations", headerName: "Stations", width: 170 },
        { field: "hiretypes", headerName: "Hire types", width: 170 },
        // { field: "vehType", headerName: "Vehicle Type", width: 130 },
        { field: "fueltype", headerName: "Fuel Type", width: 130 },
        { field: "Groups", headerName: "Groups Type", width: 130 },
        { field: "owner", headerName: "Owner", width: 90 },
        { field: "mobileNo", headerName: "Mobile No", width: 130 },
        { field: "email", headerName: "Email", width: 130 },
        { field: "segement", headerName: "Segment", width: 130 },
        { field: "yearModel", headerName: "Year Model", width: 130 },
        { field: "insuranceno", headerName: "Insurance No", width: 130 },
        {
            field: "insduedate", headerName: "Insurance Due Date", width: 150,
            // valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
            valueFormatter: (params) => params.value ? dayjs(params.value).format("DD/MM/YYYY") : '-',

        },

        { field: "nationalpermito", headerName: "Notional Permit No", width: 150 },
        {
            field: "npdate", headerName: "Notional Permit Date", width: 150,
            // valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
            valueFormatter: (params) => params.value ? dayjs(params.value).format("DD/MM/YYYY") : '',
        },
        { field: "statepermito", headerName: "State Permit No", width: 130 },
        {
            field: "spdate", headerName: "State Permit Date", width: 130,
            // valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
            valueFormatter: (params) => params.value ? dayjs(params.value).format("DD/MM/YYYY") : '',
        },
        {
            field: "rcbookno", headerName: "RC Book No", width: 130,
            // valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
        },
        {
            field: "fcdate", headerName: "FC Date", width: 130,
            // valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
            valueFormatter: (params) => params.value ? dayjs(params.value).format("DD/MM/YYYY") : '',
        },
        { field: "avgmileage", headerName: "AVG Mileage", width: 130 },
        { field: "driverName", headerName: "Driver Name", width: 130 },
        { field: "tankCap", headerName: "Tank Cap", width: 130 },
    ];

    const handleSelectAll = () => {
        if (selectAll) {
            setDeleteFile([]);
        } else {
            const allFiles = allFile.map(img => img.fileName);
            setDeleteFile(allFiles);
            setSelectAll(false)
        }
        setSelectAll(prevState => !prevState);
    };

    //to see pdf
    const [allFile, setAllFile] = useState([]);
    const showPdf = (showID) => {
        axios.get(`${apiUrl}/vehicle-docView/${showID}`)
            .then(res => {
                if (res.data.length > 0) {
                    setAllFile(res.data);
                    setDialogOpen(true);
                } else {
                    setError(true);
                    setErrorMessage('No data found');
                }
            })
            .catch()
    }
    const handleCloseDialog = () => {
        setDialogOpen(false);
    };
    const [dialogOpen, setDialogOpen] = useState(false);
    const handleButtonClick = (params) => {
        const { vehicleId } = params.row;
        setDeleteFile([])
        showPdf(vehicleId);
    };

    //-------popup---------------------
    const hidePopup = () => {
        setSuccess(false);
        setError(false);
        setInfo(false);
        setWarning(false);
    };

    useEffect(() => {
        if (error || success || warning || info) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error, success, warning, info]);

    //---------------------------------------

    // const handleExcelDownload = async () => {
    //     const workbook = new Excel.Workbook();
    //     const workSheetName = 'Worksheet-1';
    //     try {
    //         const fileName = "VehicleStatement Reports"
    //         // creating one worksheet in workbook
    //         const worksheet = workbook.addWorksheet(workSheetName);
    //         const headers = Object.keys(rows[0]);
    //         //         console.log(headers,"hed")
    //         const columnsExcel = headers.map(key => ({ key, header: key }));
    //         worksheet.columns = columnsExcel;
    //         // updated the font for first row.
    //         worksheet.getRow(1).font = { bold: true };
    //         // Set background color for header cells
    //         worksheet.getRow(1).eachCell((cell, colNumber) => {
    //             cell.fill = {
    //                 type: 'pattern',
    //                 pattern: 'solid',
    //                 fgColor: { argb: '9BB0C1' } // Green background color
    //             };
    //         });
    //         worksheet.getRow(1).height = 30;
    //         // loop through all of the columns and set the alignment with width.
    //         worksheet.columns.forEach((column) => {
    //             column.width = column.header.length + 5;
    //             column.alignment = { horizontal: 'center', vertical: 'middle' };
    //         });
    //         rows.forEach((singleData, index) => {

    //             console.log(singleData,'dats of vehicle info')
    //             worksheet.addRow(singleData);
    //             // Adjust column width based on the length of the cell values in the added row
    //             worksheet.columns.forEach((column) => {
    //                 const cellValue = singleData[column.key] || ''; // Get cell value from singleData or use empty string if undefined
    //                 const cellLength = cellValue.toString().length; // Get length of cell value as a string
    //                 const currentColumnWidth = column.width || 0; // Get current column width or use 0 if undefined
    //                 // Set column width to the maximum of current width and cell length plus extra space
    //                 column.width = Math.max(currentColumnWidth, cellLength + 5);
    //             });
    //         });

    //         // loop through all of the rows and set the outline style.
    //         worksheet.eachRow({ includeEmpty: false }, (row) => {
    //             // store each cell to currentCell
    //             const currentCell = row._cells;
    //             // loop through currentCell to apply border only for the non-empty cell of excel
    //             currentCell.forEach((singleCell) => {
    //                 const cellAddress = singleCell._address;
    //                 // apply border
    //                 worksheet.getCell(cellAddress).border = {
    //                     top: { style: 'thin' },
    //                     left: { style: 'thin' },
    //                     bottom: { style: 'thin' },
    //                     right: { style: 'thin' },
    //                 };
    //             });
    //         });
    //         // write the content using writeBuffer
    //         const buf = await workbook.xlsx.writeBuffer();
    //         // download the processed file
    //         saveAs(new Blob([buf]), `${fileName}.xlsx`);
    //     } catch (error) {
    //         console.error('<<<ERRROR>>>', error);
    //         console.error('Something Went Wrong', error.message);
    //     } finally {
    //         // removing worksheet's instance to create new one
    //         workbook.removeWorksheet(workSheetName);
    //     }
    // }


    const handleExcelDownload = async () => {
        const workbook = new Excel.Workbook();
        const workSheetName = 'Worksheet-1';
        try {
            const fileName = "VehicleStatement Reports";
            // Creating one worksheet in workbook
            const worksheet = workbook.addWorksheet(workSheetName);
            const headers = Object.keys(rows[0]);

            // Preprocessing rows to format date fields and handle empty values
            const transformDate = (dateStr) => {
                return dateStr ? dayjs(dateStr).format('DD-MM-YYYY') : null;
            };

            const transformedRows = rows.map(row => {
                const transformedRow = {};
                for (const key in row) {
                    if (row[key] === null || row[key] === '' || row[key] === undefined) {
                        transformedRow[key] = null;
                    } else if (
                        ['created_at', 'doadate', 'fcdate', 'insduedate', 'npdate', 'spdate'].includes(key)
                    ) {
                        transformedRow[key] = transformDate(row[key]);
                    } else {
                        transformedRow[key] = row[key];
                    }
                }
                return transformedRow;
            });

            // Set headers
            const columnsExcel = headers.map(key => ({ key, header: key }));
            worksheet.columns = columnsExcel;

            // Update the font for the first row
            worksheet.getRow(1).font = { bold: true };
            // Set background color for header cells
            worksheet.getRow(1).eachCell((cell, colNumber) => {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: '9BB0C1' }, // Blue background color
                };
            });
            worksheet.getRow(1).height = 30;

            // Loop through all of the columns and set alignment and width
            worksheet.columns.forEach((column) => {
                column.width = column.header.length + 5;
                // column.alignment = { horizontal: 'center', vertical: 'middle' };
            });

            // Add rows to worksheet
            transformedRows.forEach((singleData, index) => {
                worksheet.addRow(singleData);
                // Adjust column width based on the cell values in the added row
                worksheet.columns.forEach((column) => {
                    const cellValue = singleData[column.key] || ''; // Get cell value or use empty string
                    const cellLength = cellValue.toString().length; // Get length of cell value
                    const currentColumnWidth = column.width || 0; // Get current column width
                    column.width = Math.max(currentColumnWidth, cellLength + 5); // Adjust column width
                });
            });

            // Apply borders to all non-empty cells
            worksheet.eachRow({ includeEmpty: false }, (row) => {
                const currentCell = row._cells;
                currentCell.forEach((singleCell) => {
                    const cellAddress = singleCell._address;
                    worksheet.getCell(cellAddress).border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' },
                    };
                    const isHeader = row.number === 1;
                    worksheet.getCell(cellAddress).alignment = {
                        horizontal: isHeader ? 'center' : 'left',
                        vertical: 'middle',
                    };
                });
            });
            

            // Write the content using writeBuffer
            const buf = await workbook.xlsx.writeBuffer();
            // Download the processed file
            saveAs(new Blob([buf]), `${fileName}.xlsx`);
        } catch (error) {
            console.error('<<<ERROR>>>', error);
            console.error('Something Went Wrong', error.message);
        } finally {
            // Removing worksheet's instance to create a new one
            workbook.removeWorksheet(workSheetName);
        }
    };


    // const handlePdfDownload = () => {
    //     const pdf = new jsPDF({
    //         orientation: "landscape",
    //         unit: "mm",
    //         format: "tabloid" // [width, height] in inches
    //     });
    //     pdf.setFontSize(10);
    //     pdf.setFont('helvetica', 'normal');
    //     pdf.text("VehicleInfo Details", 10, 10);
    //     const header = Object.keys(rows[0]);
    //     // Extracting body
    //     const body = rows.map(row => Object.values(row));
    //     console.log(rows,'dats in pdf vehocle ')
    //     let fontdata = 1;
    //     if (header.length <= 13) {
    //         fontdata = 16;
    //     }
    //     else if (header.length >= 14 && header.length <= 18) {
    //         fontdata = 11;
    //     }
    //     else if (header.length >= 19 && header.length <= 20) {
    //         fontdata = 10;
    //     } else if (header.length >= 21 && header.length <= 23) {
    //         fontdata = 9;
    //     }
    //     else if (header.length >= 24 && header.length <= 26) {
    //         fontdata = 7;
    //     }
    //     else if (header.length >= 27 && header.length <= 30) {
    //         fontdata = 6;
    //     }
    //     else if (header.length >= 31 && header.length <= 35) {
    //         fontdata = 4;
    //     }
    //     else if (header.length >= 36 && header.length <= 40) {
    //         fontdata = 4;
    //     }
    //     else if (header.length >= 41 && header.length <= 46) {
    //         fontdata = 2;
    //     }
    //     pdf.autoTable({
    //         head: [header],
    //         body: body,
    //         startY: 20,

    //         headStyles: {
    //             // fontSize: 5,
    //             fontSize: fontdata,
    //             cellPadding: 1.5, // Decrease padding in header
    //             minCellHeigh: 8,
    //             valign: 'middle',
    //             font: 'helvetica', // Set font type for body
    //             cellWidth: 'wrap',
    //             // cellWidth: 'auto'
    //         },
    //         bodyStyles: {
    //             // fontSize:4,
    //             // fontSize: fontdata-1
    //             fontSize: fontdata - 1,
    //             valign: 'middle',
    //             //  cellWidth: 'wrap',
    //             cellWidth: 'auto'
    //             // Adjust the font size for the body
    //         },
    //         columnWidth: 'auto'
    //     });
    //     const scaleFactor = pdf.internal.pageSize.getWidth() / pdf.internal.scaleFactor * 1.5;
    //     console.log(scaleFactor, "SCALE")
    //     // Scale content
    //     pdf.scale(scaleFactor, scaleFactor);
    //     const pdfBlob = pdf.output('blob');
    //     saveAs(pdfBlob, 'VehicleStatementReports.pdf');
    // };

    const handlePdfDownload = () => {
        const pdf = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: "tabloid", // [width, height] in inches
        });

        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        pdf.text("VehicleInfo Details", 10, 10);

        // Transform date format
        const transformDate = (dateStr) => {
            return dateStr ? dayjs(dateStr).format('DD-MM-YYYY') : null;
        };

        // Preprocess the rows
        const transformedRows = rows.map(row => {
            const transformedRow = {};
            for (const key in row) {
                if (
                    ['created_at', 'doadate', 'fcdate', 'insduedate', 'npdate', 'spdate'].includes(key)
                ) {
                    transformedRow[key] = transformDate(row[key]);
                } else {
                    transformedRow[key] = row[key] || null; // Replace empty strings with null
                }
            }
            return transformedRow;
        });

        const header = Object.keys(transformedRows[0]);
        const body = transformedRows.map(row => Object.values(row)); // Extract body from transformed rows

        let fontdata = 1;
        if (header.length <= 13) fontdata = 16;
        else if (header.length >= 14 && header.length <= 18) fontdata = 11;
        else if (header.length >= 19 && header.length <= 20) fontdata = 10;
        else if (header.length >= 21 && header.length <= 23) fontdata = 9;
        else if (header.length >= 24 && header.length <= 26) fontdata = 7;
        else if (header.length >= 27 && header.length <= 30) fontdata = 6;
        else if (header.length >= 31 && header.length <= 35) fontdata = 4;
        else if (header.length >= 36 && header.length <= 40) fontdata = 4;
        else if (header.length >= 41 && header.length <= 46) fontdata = 2;

        pdf.autoTable({
            head: [header],
            body: body,
            startY: 20,
            headStyles: {
                fontSize: fontdata,
                cellPadding: 1.5,
                minCellHeight: 8,
                valign: 'middle',
                font: 'helvetica',
                cellWidth: 'wrap',
            },
            bodyStyles: {
                fontSize: fontdata - 1,
                valign: 'middle',
                cellWidth: 'auto',
            },
            columnWidth: 'auto',
        });

        const scaleFactor = pdf.internal.pageSize.getWidth() / pdf.internal.scaleFactor * 1.5;
        pdf.scale(scaleFactor, scaleFactor);

        const pdfBlob = pdf.output('blob');
        saveAs(pdfBlob, 'VehicleStatementReports.pdf');
    };

    // const handlePdfDownload = () => {
    //     const pdf = new jsPDF('p', 'pt', 'letter');
    //     pdf.setFontSize(16); // Increase font size for the title
    //     const title = "Vehicle Statement Reports";
    //     const titleWidth = pdf.getStringUnitWidth(title) * 16; // Calculate title width
    //     const centerX = (pdf.internal.pageSize.width - titleWidth) / 2; // Calculate center position for title
    //     pdf.text(title, centerX, 40); // Center the title
    //     pdf.setFontSize(12); // Reset font size for the data

    //     // Define the starting position for the data
    //     let yPos = 70;
    //     const labelWidth = 200; // Adjust as needed
    //     const valueWidth = 300; // Adjust as needed
    //     const lineHeight = 20; // Adjust as needed
    //     let totalPages = 1; // Initial number of pages

    //     // Iterate through the data and print labels and values
    //     rows.forEach((rowData) => {
    //         console.log(rows,"vehrow")
    //         // Check if the current row will fit on the current page
    //         if (yPos + lineHeight > pdf.internal.pageSize.height - 40) {
    //             // Add a new page if the row won't fit
    //             pdf.addPage();
    //             yPos = 70; // Reset yPos for the new page
    //             totalPages++; // Increment total pages
    //         }
    //         console.log(book,"selecetd")

    //         // For each row, iterate through the properties of selectedCustomerData
    //         Object.entries(book).forEach(([label, value]) => {

    //             // Skip if the label is 'id' or undefined value
    //             if (label === 'id' || rowData[label] === undefined) return;

    //             // Format label and value into a string
    //             // const text = `${label}: ${rowData[label]}`;

    //             // Check if the label is 'active'
    //             if (label === 'active') {
    //                 console.log(label,typeof(label))
    //                 // Draw a line below the label 'active'
    //                 pdf.setDrawColor(0); // Set border color to black
    //                 pdf.setLineWidth(0.5); // Set border width
    //                 pdf.line(40, yPos + 15, 40 + labelWidth + valueWidth, yPos + 15);// Draw line
    //             }

    //             // Check if the text exceeds the remaining space on the page
    //             if (yPos + lineHeight > pdf.internal.pageSize.height - 40) {
    //                 // Add a new page if the text exceeds the remaining space
    //                 pdf.addPage();
    //                 yPos = 70; // Reset yPos for the new page
    //                 totalPages++; // Increment total pages
    //             }

    //             // Print label
    //             pdf.text(label, 40, yPos);

    //             // Print value next to the label
    //             pdf.text(rowData[label], 40 + labelWidth, yPos);

    //             // Move to the next line
    //             yPos += lineHeight;
    //         });

    //         // Add some space between rows
    //         yPos += lineHeight;
    //     });

    //     // Save the PDF file with the calculated number of pages
    //     pdf.save(`VehicleStatementReports (${totalPages} pages).pdf`);
    // };
    useEffect(() => {
        const fetchOrganizationnames = async () => {
            try {
                const response = await axios.get(`${apiUrl}/drivernamevechicleinfo`);
                const data = response.data
                const names = data.map(res => res.drivername)
                setDrivername(names)

            }
            catch (error) {
                console.log(error, "error");
            }
        };
        fetchOrganizationnames()
    }, [apiUrl])


    const [book, setBook] = useState({

        vehicleName: '',
        hiretypes: '',
        // vehType: '',
        fueltype: '',
        Groups: '',
        doadate: dayjs(),
        vehRegNo: '',
        stations: '',
        segement: '',
        owner: '',
        mobileNo: '',
        email: '',
        yearModel: '',
        insuranceno: '',
        insduedate: '',
        nationalpermito: '',
        npdate: '',
        avgmileage: '',
        statepermito: '',
        spdate: '',
        financer: '',
        rcbookno: '',
        fcdate: '',
        driverName: '',
        tankCap: '',
        active: 'yes',
        created_at: dayjs(),
    });

    const handleCancel = () => {
        setBook((prevBook) => ({
            ...prevBook,
            vehicleName: '',
            hiretypes: '',
            // vehType: '',
            fueltype: '',
            Groups: '',
            doadate: dayjs(),
            vehRegNo: '',
            stations: '',
            segement: '',
            owner: '',
            mobileNo: '',
            email: '',
            yearModel: '',
            insuranceno: '',
            insduedate: '',
            nationalpermito: '',
            npdate: '',
            avgmileage: '',
            statepermito: '',
            spdate: '',
            financer: '',
            rcbookno: '',
            fcdate: '',
            driverName: '',
            tankCap: '',
            active: 'yes',
            created_at: dayjs(),

        }));
        setSelectedCustomerData({});
        setIsEditMode(false);
        setDeletevehciledata(false)
    };

    const handleAutocompleteChange = (event, value, name) => {
        const selectedOption = value ? value.label : '';
        setBook((prevBook) => ({
            ...prevBook,
            [name]: selectedOption,
        }));
        setSelectedCustomerData((prevData) => ({
            ...prevData,
            [name]: selectedOption,
        }));
    };
    const handleChange = (event) => {
        const { name, value, checked } = event.target;

        if (event.target.type === 'checkbox') {
            setBook((prevBook) => ({
                ...prevBook,
                [name]: checked,
            }));
            setSelectedCustomerData((prevData) => ({
                ...prevData,
                [name]: checked,
            }));
        } else {
            setBook((prevBook) => ({
                ...prevBook,
                [name]: value,
            }));
            setSelectedCustomerData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleDateChange = (date, name) => {
        const formattedDate = dayjs(date).format('YYYY-MM-DD');
        const parsedDate = dayjs(formattedDate).format('YYYY-MM-DD');
        setBook((prevBook) => ({
            ...prevBook,
            [name]: parsedDate,
        }));
        setSelectedCustomerData((prevBook) => ({
            ...prevBook,
            [name]: parsedDate,
        }));
    };

    const uniquevechicleRegno = async (veghnodata) => {
        if (veghnodata) {

            const response = await axios.get(`${apiUrl}/uniquevechregnodata/${veghnodata}`)
            const responsedata = response.data;
            if (responsedata?.length >= 1) {

                setCredentialData(true)
                // return true;
            }
            else {
                setCredentialData(false)
                // return false;
            }
        }
    }

    const handleChangecredent = (event) => {
        const { name, value } = event.target;
        const data = uniquevechicleRegno(value)
        console.log(data)
        setBook((prevBook) => ({
            ...prevBook,
            [name]: value,
        }));
        setSelectedCustomerData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

    }

    const handleKeyEnter = useCallback(
        async (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                if (enterPressCount === 0) {
                    if (event.target.value !== "") {

                        try {
                            const data = event.target.value
                            const response = await axios.get(`${apiUrl}/vechiclenameinfo`, {
                                params: {
                                    vehicletypename: data
                                },
                            });
                            const vehicleData = response.data;

                            setRows1(vehicleData);
                            setSuccess(true)
                            setSuccessMessage("Successfully listed");
                        } catch (error) {
                            setRows1([])
                            setError(true);
                            setSelectedCustomerData({})
                            setErrorMessage(error.response.data.error);
                        }
                    }
                    else {
                        setRows1([])
                        setSelectedCustomerData({})
                    }
                } else if (enterPressCount === 1) {
                    const selectedRow = rows1[0];
                    if (selectedRow) {
                        setSelectedCustomerData(selectedRow);
                        handleChange({
                            target: { name: "vehicleName", value: selectedRow.vehicleName },
                        });
                    }
                }
                setEnterPressCount((prevCount) => prevCount + 1);
            }
            if (event.target.value === "") {
                setEnterPressCount(0);
            }
        },
        [rows1, enterPressCount, apiUrl, setSelectedCustomerData]
    );

    // insurence copy-1
    const [insurance, setInsurance] = useState(null);
    const addInsurence_copy = async (vehicleid) => {
        if (insurance !== null) {
            const formData = new FormData();
            formData.append("file", insurance);
            formData.append("created_at", createddata);
            try {
                await axios.post(`${apiUrl}/insurance-pdf/${vehicleid}`, formData)
                setInsurance(null)
            }
            catch (err) {
                console.log(err)
                setError(true);
                setErrorMessage("failed to insert Insurance pdf");
            }
        } else {
            return
        }
        setInsurance(null);
    };

    // nationalPermit copyy---3
    const [nationalPermit, setNationalPermit] = useState(null);
    const addNationalPermit_copy = async (vehicleid) => {
        if (nationalPermit !== null) {
            const formData = new FormData();
            formData.append("file", nationalPermit);
            formData.append("created_at", createddata);
            try {
                await axios.post(`${apiUrl}/nationalPermit-pdf/${vehicleid}`, formData);
                setNationalPermit(null);
            }
            catch {
                setError(true);
                setErrorMessage('"failed to insert NationalPermit pdf');
            }
        } else {
            return
        }
        setNationalPermit(null);
    };

    // statePermit copyy---4
    const [statePermit, setStatePermit] = useState(null);
    const addStatePermit_copy = async (vechicleid) => {
        if (statePermit !== null) {
            const formData = new FormData();
            formData.append("file", statePermit);
            formData.append("created_at", createddata);
            try {
                await axios.post(`${apiUrl}/statePermit-pdf/${vechicleid}`, formData);
                setStatePermit(null);
            }
            catch {
                setError(true);
                setErrorMessage('failed to insert StatePermit pdf');
            }
        } else {
            return
        }
        setStatePermit(null);
    };

    const handleUploadFile = (e) => {
        if (e.target.files[0]) {
            // Additional logic for handling the file upload
            setSuccess(true);  // Assuming you have success state
            setSuccessMessage("Uploaded successfully");  // Set the success message

            console.log('File selected:', e.target.files[0]);
        }
    };

    // rcBook copyy---5
    const [rcBook, setRcbook] = useState(null);
    const addRcBook_copy = async (vechicleid) => {
        if (rcBook !== null) {
            const formData = new FormData();
            formData.append("file", rcBook);
            formData.append("created_at", createddata);
            try {
                await axios.post(`${apiUrl}/rcBook-pdf/${vechicleid}`, formData);
                setRcbook(null);
            }
            catch {
                setError(true);
                setErrorMessage('failed to insert rcBook-pdf ');
            }
        } else {
            return
        }
        setRcbook(null);
    };

    // FcCopy copyy---6
    const [fcCopy, setFcCopy] = useState(null);
    const addFcCopy_copy = async (vechicleid) => {
        if (fcCopy !== null) {
            const formData = new FormData();
            formData.append("file", fcCopy);
            formData.append("created_at", createddata);
            try {
                await axios.post(`${apiUrl}/fcCopy-pdf/${vechicleid}`, formData);
                setFcCopy(null);
            }
            catch {
                setError(true);
                setErrorMessage('failed to insert fcCopy-pdf');
            }
        } else {
            return
        }
        setFcCopy(null);
    };

    const handleAdd = async () => {
        if (!book.vehicleName) {
            setWarning(true);
            setWarningMessage("Enter Vehicle Name");
            return;
        }
        if (!book.hiretypes) {
            setWarning(true);
            setWarningMessage("Enter Hiretypes");
            return;
        }
        if (!book.fueltype) {
            setWarning(true);
            setWarningMessage("Enter Fueltype");
            return;
        }
        if (!book.Groups) {
            setWarning(true);
            setWarningMessage("Enter Groups");
            return;
        }

        // if (!book.vehType) {
        //     setWarning(true);
        //     setWarningMessage("Choose vehicletype");
        //     return;
        // }
        if (!book.mobileNo) {
            setWarning(true);
            setWarningMessage("Enter MobileNo");
            return;
        }
        // if (!book.driverName) {
        //     setWarning(true);
        //     setWarningMessage(" Choose Drivername");
        //     return;

        // }
        if (!book.vehRegNo) {
            setWarning(true);
            setWarningMessage("Enter VehicleRegNo");
            return;
        }
        if (!book.stations) {
            setWarning(true);
            setWarningMessage("Choose Stations");
            return;
        }
        if (!book.owner) {
            setWarning(true);
            setWarningMessage("Enter The Owner Name");
            return;
        }
        if (cerendentialdata === true) {
            setWarning(true);
            setWarningMessage(" VehicleRegNo Already Exists");
            return;
        }
        setisVButtonLoading(true)
        try {

            const data = { ...book }
            await axios.post(`${apiUrl}/vehicleinfo`, data);
            const response = await axios.get(`${apiUrl}/lastvechileinfogetid`); 
            const lastvehicleidno = response.data.vehicleId;
            addFcCopy_copy(lastvehicleidno);
            addRcBook_copy(lastvehicleidno);
            addStatePermit_copy(lastvehicleidno);
            handlecheckmaildriver(book.fcdate);
            addNationalPermit_copy(lastvehicleidno);
            addInsurence_copy(lastvehicleidno);
            handleCancel();
            setCredentialData()
            setRows([]);
            handleList();
            setSuccess(true);
            setSuccessMessage("Successfully Added");
            setisVButtonLoading(false)
        }
        //  catch {
        //     setError(true);
        //     setErrorMessage("Failed to Add vehicle details");
        // }
        catch (error) {
            // console.error("Error occurredddddd:", error);

            // Check if there's no response, indicating a network error
            if (error.message) {
                setError(true);
                setErrorMessage("Check your Network Connection");
                // console.log('Network error');
                setisVButtonLoading(false)
            } else if (error.response) {
                setError(true);
                // Handle other Axios errors (like 4xx or 5xx responses)
                setErrorMessage("Failed to Add: " + (error.response.data.message || error.message));
                setisVButtonLoading(false)
            } else {
                // Fallback for other errors
                setError(true);
                setErrorMessage("An unexpected error occurred: " + error.message);
                setisVButtonLoading(false)
            }
        }
    };

    const [deletefile, setDeleteFile] = useState([])
    const handlecheckbox = (fileName) => {
        if (deletefile.includes(fileName)) {
            setDeleteFile(prevDeleteFile => prevDeleteFile.filter(file => file !== fileName));
        } else {
            setDeleteFile(prevDeleteFile => [...prevDeleteFile, fileName]);
        }
    };

    const handleDocumentDownload = async () => {
        try {
            // Filter selected files
            const selectedFiles = allFile.filter((img) => deletefile.includes(img.fileName));
            // Download each file
            for (const file of selectedFiles) {
                const response = await axios.get(`${apiUrl}/public/vehicle_doc/` + file.fileName, {
                    responseType: 'blob', // Important to get a binary response
                });
                // Convert image blob to base64 data URL
                const reader = new FileReader();
                reader.readAsDataURL(response.data);
                reader.onloadend = () => {
                    const imageDataUrl = reader.result;
                    // Create PDF document
                    const pdf = new jsPDF();
                    const imgWidth = pdf.internal.pageSize.getWidth();
                    const imgHeight = pdf.internal.pageSize.getHeight();
                    pdf.addImage(imageDataUrl, 'JPEG', 0, 0, imgWidth, imgHeight);
                    // Save PDF file
                    pdf.save(file.fileName + '.pdf');
                };
            }
        } catch (error) {
            // console.error('Error downloading files:', error);
            setError(true)
            setErrorMessage("Failed to print Documnet")
            // Handle error if needed
        }
    };

    const handleEdit = async () => {
        setisVButtonLoading(true)
        try {

            const { id, vehicleId, ...restselectedcustomerdata } = selectedCustomerData
            await axios.put(`${apiUrl}/vehicleinfo/${selectedCustomerData.vehicleId}`, restselectedcustomerdata);
            // console.log(restselectedcustomerdata,"checking");      
            addFcCopy_copy(selectedCustomerData.vehicleId);
            addRcBook_copy(selectedCustomerData.vehicleId);
            addStatePermit_copy(selectedCustomerData.vehicleId);
            addNationalPermit_copy(selectedCustomerData.vehicleId);
            addInsurence_copy(selectedCustomerData.vehicleId);
            handleCancel();
            setCredentialData()
            setRows1([]);
            setRows([])
            setSuccess(true);
            setSuccessMessage("Successfully Updated");
            setisVButtonLoading(false)
            handleList();
        }
        // catch {
        //     setError(true);
        //     setErrorMessage("Failed to Edit Vehicle Detials");
        // }
        catch (error) {
            // console.error("Error occurredddddd:", error);

            // Check if there's no response, indicating a network error
            if (error.message) {
                setError(true);
                setErrorMessage("Check your Network Connection");
                // console.log('Network error');
                setisVButtonLoading(false)
            } else if (error.response) {
                setError(true);
                // Handle other Axios errors (like 4xx or 5xx responses)
                setErrorMessage("Failed to Edit Vehicle Details: " + (error.response.data.message || error.message));
                setisVButtonLoading(false)
            } else {
                // Fallback for other errors
                setError(true);
                setErrorMessage("An unexpected error occurred: " + error.message);
                setisVButtonLoading(false)
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${apiUrl}/organisationdatafordriveremail`);
                if (response.status === 200) {
                    const userDataArray = await response.json();
                    //   console.log(userDataArray,'userdata');
                    if (userDataArray.length > 0) {
                        setOrganisationSendEmail(userDataArray[0])
                        // setDatatrigger(!datatrigger)
                    } else {
                        setErrorMessage('User data not found.');
                        setError(true);
                    }   
                }
            }
            catch {
            }
        };
        fetchData();
    }, [apiUrl]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${apiUrl}/TemplateforFCdate`);
                if (response.status === 200) {
                    const userDataArray = await response.json();
                    if (userDataArray.length > 0) {
                        setTemplateMessageData(userDataArray[0].TemplateMessageData); // Ensure key matches exactly
                    } 
                } else {
                    console.log("Failed to fetch data, status:", response.status);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
        fetchData();
    }, [apiUrl],[templateMessageData]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${apiUrl}/Templateforstatepermitdate`);
                if (response.status === 200) {
                    const userDataArray = await response.json();
                    if (userDataArray.length > 0) {
                        setTemplateMessageData(userDataArray[0].TemplateMessageData); // Ensure key matches exactly
                    } 
                } else {
                    console.log("Failed to fetch data, status:", response.status);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
        fetchData();
    }, [apiUrl],[templateMessageData]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${apiUrl}/Templateforinsuranceduedate`);
                if (response.status === 200) {
                    const userDataArray = await response.json();
                    if (userDataArray.length > 0) {
                        setTemplateMessageData(userDataArray[0].TemplateMessageData); // Ensure key matches exactly
                    } 
                } else {
                    console.log("Failed to fetch data, status:", response.status);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
        fetchData();
    }, [apiUrl],[templateMessageData]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${apiUrl}/Templatefornationalpermitdate`);
                if (response.status === 200) {
                    const userDataArray = await response.json();
                    if (userDataArray.length > 0) {
                        setTemplateMessageData(userDataArray[0].TemplateMessageData); // Ensure key matches exactly
                    } 
                } else {
                    console.log("Failed to fetch data, status:", response.status);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
        fetchData();
    }, [apiUrl],[templateMessageData]);

    const handlecheckmaildriver = async () => {
        try {
            // Add templateMessageData to the dataToSend object
            const dataToSend = {
                email: book.email,
                fcdate:book.fcdate,
                // todate:book.todate,
                Sendmailauth: organistaionsendmail.Sendmailauth,
                Mailauthpass: organistaionsendmail.Mailauthpass,
                templateMessageData
            };
    
            // console.log("Sending data:", dataToSend); // For debugging purposes
            // await axios.post(`${apiUrl}/send-emailagreementdata`, dataToSend);
            setSuccess(true);
            setSuccessMessage("Mail Sent Successfully");
        } catch (error) {
            console.error("Error sending email:", error); // Added console log for debugging
            setError(true);
            setErrorMessage("An error occurred while sending mail");
        }
    };

    const handleClick = async (event,actionName) => {
        // try{
        if (actionName === 'List') {
            const response = await axios.get(`${apiUrl}/vechileinfogetdata`);
            const data = response.data;
            console.log(data,"check");       

            if (data.length > 0) {
                const rowsWithUniqueId = data.map((row, index) => ({
                    ...row,
                    id: index + 1,
                }));
                setRows(rowsWithUniqueId);
                setSuccess(true);
                setSuccessMessage('Successfully listed');
            } else {
                setRows([]);
                setError(true);
                setErrorMessage('No data found');
            }

        }
        else if (actionName === 'Cancel') {
            handleCancel();
            setRows1([]);
            setRows([]);

        }
        else if (actionName === 'Delete') {
            try{
            await axios.delete(`${apiUrl}/vehicleinfo/${selectedCustomerData.vehicleId}`);
            // console.log(selectedCustomerData?.vehicleId);      
            setSelectedCustomerData({});
            handleCancel();
            setRows([]);
            setRows1([]);
            setSuccess(true);
            setSuccessMessage("Successfully Deleted");
            handleList();
        }
        catch(err){
            setError(true);
            setErrorMessage("check your network connection");
        }
        }
        else if (actionName === 'Edit') {
            handleEdit()
        }
        else if (actionName === 'Add') {
            handleAdd();
        }
    }
    // catch {
    //     setError(true);
    //     setErrorMessage("Check your Network Connection");
    // }
    // };

    // useEffect(() => {
    //     if (actionName === 'List') {
    //         handleClick(null, 'List');
    //     }
    // });


    // const handleList = useCallback(async () => {
    //     setLoading(true)
    //     try {
    //         const response = await axios.get(`${apiUrl}/vechileinfogetdata`);
    //       const data = response.data;
    //       const rowsWithUniqueId = data.map((row, index) => ({
    //         ...row,
    //         id: index + 1,
    //       }));
    //     //   setRows(rowsWithUniqueId);
    //       setRows(rowsWithUniqueId);
    //     //   console.log(data,'Datas of vehicle name ')
    //     if (data.length > 0) {
    //         setLoading(false)
    //     }else{
    //         setLoading(false)
    //     }
    //     } catch (err) {
    //       console.log(err);
    //       setLoading(false)
    //     }
    //     finally {
    //         setLoading(false); // Set loading to false once the request is done, whether successful or not
    //     }
    //   }, [apiUrl]); // Add dependencies like apiUrl

    const handleList = useCallback(async () => {
        setLoading(true);
        setError(false);
        setErrorMessage("");

        try {
            const response = await axios.get(`${apiUrl}/vechileinfogetdata`);
            const data = response.data;
            // console.log(data,"getting the values");
            
            const rowsWithUniqueId = data.map((row, index) => ({
                ...row,
                id: index + 1,
            }));
            setRows(rowsWithUniqueId);

            if (data.length > 0) {
                setLoading(false);
            } else {
                setLoading(false);
            }
        } catch (err) {
            console.error(err);

            if (err.message === 'Network Error') {
                setErrorMessage("Check network connection.");
            } else {
                setErrorMessage("Failed to fetch data: " + (err.response?.data?.message || err.message));
            }
            setError(true);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }, [apiUrl]);


    useEffect(() => {
        handleList();
    }, [handleList]);

    //search funtion
    const handleSearch = async () => {
        try {
            const response = await fetch(`${apiUrl}/searchvehicleinfo?searchText=${searchText}&fromDate=${fromDate}&toDate=${toDate}`);
            const data = await response.json();
            // console.log(data, "typedata")
            if (data.length > 0) {
                const rowsWithUniqueId = data.map((row, index) => ({
                    ...row,
                    id: index + 1,
                }));
                setRows(rowsWithUniqueId);
                setSelectedCustomerData(rowsWithUniqueId)
                setSuccess(true);
                setSuccessMessage("Successfully listed")
            } else {
                setRows([]);
                setError(true);
                setErrorMessage("No data found")
            }
        }
        // catch {
        //     setError(true);
        //     setErrorMessage("failed to Fetch vehcile")
        // }
        catch (error) {
            // console.error("Error occurredddddd:", error);

            // Check if there's no response, indicating a network error
            if (error.message) {
                setError(true);
                setErrorMessage("Check your Network Connection");
                // console.log('Network error');
            } else if (error.response) {
                setError(true);
                // Handle other Axios errors (like 4xx or 5xx responses)
                setErrorMessage("Failed to Search: " + (error.response.data.message || error.message));
            } else {
                // Fallback for other errors
                setError(true);
                setErrorMessage("An unexpected error occurred: " + error.message);
            }
        }
    };

    const handleenterSearch = async (e) => {
        if (e.key === "Enter") {

            try {
                const response = await fetch(
                    `${apiUrl}/searchvehicleinfo?searchText=${searchText}`
                );
                const data = await response.json();

                if (data.length > 0) {
                    const rowsWithUniqueId = data.map((row, index) => ({
                        ...row,
                        id: index + 1,
                    }));
                    setRows(rowsWithUniqueId);
                    setSuccess(true);
                    setSuccessMessage("successfully listed");
                } else {
                    setRows([]);
                    setError(true);
                    setErrorMessage("no data found");
                }
            } catch {
                setError(true);
                setErrorMessage("failed to Fetch vehcile");
            }

        }
    };

    const handleRowClick = useCallback((params) => {
        const customerData = params
        setSelectedCustomerData(customerData);
        handleChange({
            target: { name: "vehicleName", value: customerData.vehicleName },
        });
        setCredentialData()
        setEdit(true)
        setIsEditMode(true);
    }, []);
    const handleRowClick1 = useCallback((params) => {
        const customerData = params.row;
        setSelectedCustomerData(customerData);
        setCredentialData()
        setEdit(true)
        setIsEditMode(true);
    }, []);

    const [dialogdeleteOpen, setDialogdeleteOpen] = useState(false);
    const handleClosedeleteDialog = () => {
        setDialogdeleteOpen(false);
    };
    const [imagedata, setImagedata] = useState(null);
    const handleimagedelete = (imageName) => {
        if (deletefile.length > 0) {
            setImagedata(prevDeleteFile => {
                if (!prevDeleteFile || !Array.isArray(prevDeleteFile)) {
                    return [imageName]; // Initialize as array if not already
                }
                return [...prevDeleteFile, imageName]; // Spread if already an array
            });
            setDialogdeleteOpen(true);
            setDeleteFile([]);
        }
    };
    const handleContextMenu = () => {
        try {
            axios.delete(`${apiUrl}/vehicle_documents/` + imagedata)
                .then(() => {
                    setDialogdeleteOpen(false);
                    setDialogOpen(false);
                    setImagedata([]);
                    setDeleteFile([]);
                    setSelectAll(false)
                })
                .catch(error => {
                    console.log(error, 'error');
                });
        } catch (error) {
            console.log(error, 'error');
        }
        setDialogdeleteOpen(false);
        setDialogOpen(false);
        setSelectAll(false)
    };

    return {
        selectedCustomerData,
        rows,
        actionName,
        error,
        success,
        info,
        warning,
        successMessage,
        errorMessage,
        warningMessage,
        book,
        handleClick,
        handleChange,
        handleRowClick,
        handleRowClick1,
        handleAdd,
        hidePopup,
        handleDateChange,
        searchText,
        setSearchText,
        fromDate,
        setFromDate,
        toDate,
        setToDate,
        handleSearch,
        handleExcelDownload,
        handlePdfDownload,
        columns,
        setInsurance,
        setNationalPermit,
        setStatePermit,
        setRcbook,
        setFcCopy,
        allFile,
        handleCloseDialog,
        handleUploadFile,
        templateMessageData,
        setTemplateMessageData,
        dialogOpen,
        isEditMode,
        handleEdit,
        handleContextMenu, handleimagedelete, handleClosedeleteDialog, dialogdeleteOpen, setError, setErrorMessage,
        handlecheckbox,
        deletefile,
        setDeleteFile,
        setSelectAll,
        selectAll,
        handleSelectAll,
        handleDocumentDownload, drivername, handleAutocompleteChange, handleKeyEnter, handleenterSearch, rows1, edit, handleChangecredent, cerendentialdata,
        vehiclenames, setVehilcNames, loading, setLoading, isVButonLoading, setisVButtonLoading,setDeletevehciledata,deletevehciledata
    };
};

export default useVehicleinfo;