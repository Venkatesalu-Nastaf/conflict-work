
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import dayjs from "dayjs";
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Button from "@mui/material/Button";
import { APIURL } from "../../../url";
import Excel from 'exceljs';

const useEmployee = () => {
    const apiUrl = APIURL;
    // const user_id = localStorage.getItem('useridno');
    const [selectedCustomerData, setSelectedCustomerData] = useState({});
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [rows, setRows] = useState([]);
    const [actionName] = useState('');
    const [formData] = useState({});
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [info, setInfo] = useState(false);
    const [warning, setWarning] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [warningMessage] = useState({});
    // const [infoMessage, setInfoMessage] = useState({});
    const [searchText, setSearchText] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleButtonClick = (params) => {
        const { empid } = params.row;
        if (!empid) {
            setError(true);
            setErrorMessage("PLease Enter Booking No");
            return;
        }
        showPdf(empid);
    };

    // TABLE STRAT
    const columns = [
        { field: "id", headerName: "Sno", width: 50 },
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
                        <UploadFileIcon />
                        view
                    </Button>
                </Button>
            ),
        },
        { field: "empid", headerName: "Employe ID", width: 140 },
        { field: "empname", headerName: "Name", width: 130 },
        { field: "empemailid", headerName: "Email", width: 130 },
        { field: "empmobile", headerName: "Mobile", width: 130 },
        { field: "jobroll", headerName: "Job Roll", width: 130 },
        { field: "joiningdate", headerName: "Joining Date", width: 130 },
        { field: "gender", headerName: "Gender", width: 130 },
        { field: "bloodgroup", headerName: "Bloog Group", width: 130 },
        { field: "guardian", headerName: "Guardian", width: 130 },
        { field: "uanid", headerName: "UAN ID", width: 140 },
        { field: "esino", headerName: "ESI NO", width: 140 },
        { field: "fixedsalary", headerName: "Net Salary", width: 130 },
        { field: "licenceno", headerName: "Driving Licence No", width: 140 },
    ];
    // TABLE END


    // const convertToCSV = (data) => {
    //     const header = columns.map((column) => column.headerName).join(",");
    //     const rows = data.map((row) => columns.map((column) => row[column.field]).join(","));
    //     return [header, ...rows].join("\n");
    // };
    // const handleExcelDownload = () => {
    //     const csvData = convertToCSV(rows);
    //     const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    //     saveAs(blob, "customer_details.csv");
    // };
    // const handlePdfDownload = () => {
    //     const pdf = new jsPDF('landscape');
    //     pdf.setFontSize(12);
    //     pdf.setFont('helvetica', 'normal');
    //     pdf.text("Employee Details", 10, 10);

    //     const tableData = rows.map((row) => [
    //         row['id'],
    //         row['empid'],
    //         row['empname'],
    //         row['empemailid'],
    //         row['empmobile'],
    //         row['jobroll'],
    //         row['joiningdate'],
    //         row['gender'],
    //         row['bloodgroup'],
    //         row['address1'],
    //         row['aadharcard'],
    //         row['pancard'],
    //         row['address2'],
    //         row['guardian'],
    //         row['fixedsalary'],
    //         row['uanid'],
    //         row['esino'],
    //         row['uanid']
    //     ]);
    //     pdf.autoTable({
    //         head: [['Sno', 'Employe ID', 'Name', 'Email', 'Mobile', 'Job Roll', 'Joining Date', 'Gender', 'Blood Group', 'Guardian', 'UAN ID', 'ESI NO', 'Net Salary', 'Driving Licence No']],
    //         body: tableData,
    //         startY: 20,
    //         columnWidth: 'auto',
    //     });

    //     const pdfBlob = pdf.output('blob');
    //     saveAs(pdfBlob, 'Customer_Details.pdf');
    // };

    const handleExcelDownload=async()=>{
        const workbook = new Excel.Workbook();
        const workSheetName = 'Worksheet-1';

        try {

            const fileName = "Employeedateils"
            // creating one worksheet in workbook
            const worksheet = workbook.addWorksheet(workSheetName);
            const headers = Object.keys(rows[0]);
            //         console.log(headers,"hed")
            const columnsExcel = headers.map(key => ({ key, header: key }));
            
            worksheet.columns = columnsExcel;

            // updated the font for first row.
            worksheet.getRow(1).font = { bold: true };

            // Set background color for header cells
            worksheet.getRow(1).eachCell((cell, colNumber) => {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: '9BB0C1' } // Green background color
                };
            });


            worksheet.getRow(1).height = 30;
            // loop through all of the columns and set the alignment with width.
            worksheet.columns.forEach((column) => {
                column.width = column.header.length + 5;
                column.alignment = { horizontal: 'center', vertical: 'middle' };
            });

            rows.forEach((singleData, index) => {
             

                worksheet.addRow(singleData);

                // Adjust column width based on the length of the cell values in the added row
                worksheet.columns.forEach((column) => {
                    const cellValue = singleData[column.key] || ''; // Get cell value from singleData or use empty string if undefined
                    const cellLength = cellValue.toString().length; // Get length of cell value as a string
                    const currentColumnWidth = column.width || 0; // Get current column width or use 0 if undefined

                    // Set column width to the maximum of current width and cell length plus extra space
                    column.width = Math.max(currentColumnWidth, cellLength + 5);
                });
            });

            // loop through all of the rows and set the outline style.
            worksheet.eachRow({ includeEmpty: false }, (row) => {
                // store each cell to currentCell
                const currentCell = row._cells;

                // loop through currentCell to apply border only for the non-empty cell of excel
                currentCell.forEach((singleCell) => {

                    const cellAddress = singleCell._address;

                    // apply border
                    worksheet.getCell(cellAddress).border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' },
                    };
                });
            });
            // write the content using writeBuffer
            const buf = await workbook.xlsx.writeBuffer();

            // download the processed file
            saveAs(new Blob([buf]), `${fileName}.xlsx`);
        } catch (error) {
            console.error('<<<ERRROR>>>', error);
            console.error('Something Went Wrong', error.message);
        } finally {
            // removing worksheet's instance to create new one
            workbook.removeWorksheet(workSheetName);
        }

    }
    const handlePdfDownload = () => {
        const pdf = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: "tabloid" // [width, height] in inches
        });
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        pdf.text("Employee Details", 10, 10);
         const header = Object.keys(rows[0]);
      
        // Extracting body
        const body = rows.map(row => Object.values(row));
        console.log(header.length,"len")
      
        let fontdata = 1;
        if (header.length <= 13) {
            fontdata = 16;
        }
        else if (header.length >= 14 && header.length <= 17) {
            fontdata = 11;
        }
        else if (header.length >= 18 && header.length <= 20) {
          fontdata = 10;
      } else if (header.length >= 21 && header.length <= 23) {
            fontdata = 9;
        }
        else if (header.length >= 24 && header.length <= 26) {
            fontdata = 7;
        }
        else if (header.length >= 27 && header.length <= 30) {
            fontdata = 6;
        }
        else if (header.length >= 31 && header.length <= 35) {
            fontdata = 4;
        }
        else if (header.length >= 36 && header.length <= 40) {
            fontdata = 4;
        }
        else if (header.length >= 41 && header.length <= 46) {
            fontdata = 2;
        }
        console.log(fontdata,"data")
        
        pdf.autoTable({
            head: [header],
            body: body,
            startY: 20,
      
            headStyles: {
                // fontSize: 5,
                fontSize: fontdata,
                cellPadding: 1.5, // Decrease padding in header
      
                minCellHeigh: 8,
                valign: 'middle',
      
                font: 'helvetica', // Set font type for body
      
                cellWidth: 'wrap',
                // cellWidth: 'auto'
            },
      
            bodyStyles: {
                // fontSize:4,
                // fontSize: fontdata-1
                fontSize: fontdata-1,
                valign: 'middle',
                //  cellWidth: 'wrap',
                cellWidth: 'auto'
                // Adjust the font size for the body
      
            },
            columnWidth: 'auto'
      
      });
        const scaleFactor = pdf.internal.pageSize.getWidth() / pdf.internal.scaleFactor * 1.5;
        console.log(scaleFactor, "SCALE")
      
        // Scale content
        pdf.scale(scaleFactor, scaleFactor);
        const pdfBlob = pdf.output('blob');
        saveAs(pdfBlob, 'EmployeeReports.pdf');
      };


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



    const [book, setBook] = useState({
        empid: '',
        empname: '',
        empemailid: '',
        empmobile: '',
        jobroll: '',
        joiningdate: '',
        gender: '',
        bloodgroup: '',
        address1: '',
        aadharcard: '',
        pancard: '',
        guardian: '',
        fixedsalary: '',
        uanid: '',
        esino: '',
        licenceno: '',
    });
    const handleChange = (event) => {
        const { name, value, checked, type } = event.target;

        if (type === 'checkbox') {
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

    const handleCancel = () => {
        setBook((prevBook) => ({
            ...prevBook,
            empid: '',
            empname: '',
            empemailid: '',
            empmobile: '',
            jobroll: '',
            joiningdate: '',
            gender: '',
            bloodgroup: '',
            address1: '',
            aadharcard: '',
            pancard: '',
            guardian: '',
            fixedsalary: '',
            uanid: '',
            esino: '',
            licenceno: '',
        }));
        setSelectedCustomerData({});
        setIsEditMode(false);
    };

    const handleRowClick = useCallback((params) => {
        const customerData = params.row;
        setSelectedCustomerData(customerData);
        setSelectedCustomerId(params.row.customerId);
        setIsEditMode(true);
    }, []);

    //--------show pdf---------------
    const [allFile, setAllFile] = useState([]);

    const showPdf = (showID) => {
        axios.get(`${apiUrl}/employee-docView/${showID}`)
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

    ///--------------------------------------------

    const empid = selectedCustomerData?.empid || book.empid
    const [file, setFile] = useState(null);

    const addPdf = async () => {
        if (file !== null) {
            const formData = new FormData();
            formData.append("file", file);
            try {
                await axios.post(`${apiUrl}/employee-pdf/${empid}`, formData)
            }
            catch {
                setError(true);
                setErrorMessage('something wrong');
            }
        } else {
            return
        }
    }

    //----------------------------------------------
    const handleAdd = async () => {
        const empname = book.empname;
        if (!empname) {
            setError(true);
            setErrorMessage("Check your Employee ID");
            return;
        }
        try {
            await axios.post(`${apiUrl}/employees`, book);
            handleCancel();
            addPdf();
            setRows([]);
            setSuccess(true);
            setSuccessMessage("Successfully Added");
        } catch {
        }
    };

    const handleEdit = async (userid) => {
        const selectedCustomer = rows.find((row) => row.empid === empid);
        const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
        await axios.put(`${apiUrl}/employees/${book.empid || selectedCustomerData.empid}`, updatedCustomer);
        setSuccess(true);
        setSuccessMessage("Successfully updated");
        handleCancel();
        addPdf();
        setRows([]);
    };


    const handleClick = async (event, actionName, empid) => {
        event.preventDefault();
        try {
            if (actionName === 'List') {
                const response = await axios.get(`${apiUrl}/employees`);
                const data = response.data;
                if (data.length > 0) {
                    const rowsWithUniqueId = data.map((row, index) => ({
                        ...row,
                        id: index + 1,
                    }));
                    setRows(rowsWithUniqueId);
                    setSuccess(true);
                    setSuccessMessage("Successfully listed");
                } else {
                    setRows([]);
                    setError(true);
                    setErrorMessage("No data found");
                }
            }

            else if (actionName === 'Cancel') {
                handleCancel();
                setRows([]);
            }

            else if (actionName === 'Delete') {
                await axios.delete(`${apiUrl}/employees/${book.empid || selectedCustomerData.empid}`);
                setSelectedCustomerData(null);
                setSuccess(true);
                setSuccessMessage("Successfully Deleted");
                handleCancel();
                setRows([]);
            }

            else if (actionName === 'Edit') {
                const selectedCustomer = rows.find((row) => row.empid === empid);
                const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
                await axios.put(`${apiUrl}/employees/${book.empid || selectedCustomerData.empid}`, updatedCustomer);
                setSuccess(true);
                setSuccessMessage("Successfully updated");
                handleCancel();
                addPdf();
                setRows([]);
            }

        } catch {
            setError(true);
            setErrorMessage("Check your Network Connection");
        }
    };

    useEffect(() => {
        if (actionName === 'List') {
            handleClick(null, 'List');
        }
    });

    const handleShowAll = async () => {
        try {
            const response = await fetch(`${apiUrl}/table-for-employee?searchText=${searchText}`);
            const data = await response.json();
            if (data.length > 0) {
                const rowsWithUniqueId = data.map((row, index) => ({
                    ...row,
                    id: index + 1,
                }));
                setRows(rowsWithUniqueId);
                setSuccess(true);
                setSuccessMessage("successfully listed")
            } else {
                setRows([]);
                setError(true);
                setErrorMessage("no data found")
            }
        } catch {
            setError(true);
            setErrorMessage("sorry")
        }
    };

    const [dialogdeleteOpen, setDialogdeleteOpen] = useState(false);

    const handleClosedeleteDialog = () => {
        setDialogdeleteOpen(false);
    };

    const [imagedata, setImagedata] = useState(null);

    const handleimagedelete = (imageName) => {
        setImagedata(imageName)
        setDialogdeleteOpen(true);
    };

    const handleContextMenu = () => {
        axios.delete(`${apiUrl}/image-delete/` + imagedata)
            .then(res => {
                console.log("deleted")
            })
            .catch(err => console.log(err))
        setDialogdeleteOpen(false);
        setDialogOpen(false);
    };

    return {
        selectedCustomerData,
        selectedCustomerId,
        rows,
        actionName,
        error,
        success,
        info,
        warning,
        successMessage,
        errorMessage,
        warningMessage,
        // infoMessage,
        book,
        handleClick,
        handleChange,

        handleRowClick,
        handleAdd,
        hidePopup,
        formData,
        handleDateChange,
        handleExcelDownload,
        handlePdfDownload,
        columns,
        searchText,
        setSearchText,
        handleShowAll,
        allFile,
        handleCloseDialog,
        dialogOpen,
        setFile,
        isEditMode,
        handleEdit,
        handleContextMenu,
        handleimagedelete,
        handleClosedeleteDialog,
        dialogdeleteOpen,
        setError,
        setErrorMessage,
    };
};

export default useEmployee;