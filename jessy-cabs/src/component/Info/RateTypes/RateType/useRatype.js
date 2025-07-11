
import { useState, useEffect, useCallback, useRef } from 'react';
import jsPDF from 'jspdf';
import axios from "axios";
import { saveAs } from 'file-saver';
import { APIURL } from "../../../url";
import dayjs from "dayjs";
import Excel from 'exceljs';

// TABLE

const columns = [
    { field: "id", headerName: "Sno", width: 70 ,headerAlign: 'center' },
    { field: "driverid", headerName: "Driver ID", width: 130 ,headerAlign: 'center'},
    { field: "stations", headerName: "Station", width: 130 ,headerAlign: 'center'},
    { field: "ratetype", headerName: "Rate Type", width: 130 ,headerAlign: 'center'},
    { field: "ratename", headerName: "Ratename", width: 130 ,headerAlign: 'center'},
    { field: "active", headerName: "Active", width: 130 ,headerAlign: 'center'},
    { field: "starttime", headerName: "Start Date", width: 230 ,headerAlign: 'center',valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY') },
    { field: "closetime", headerName: "Close Date", width: 230,headerAlign: 'center',valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY')  },
];

const useRatype = () => {
    const apiUrl = APIURL;
    // const user_id = localStorage.getItem('useridno');
    const [isEditMode, setIsEditMode] = useState(false);
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
    const [warningMessage,setWarningMessage] = useState({});
    const [infoMessage, setInfoMessage] = useState({});
    const [cerendentialdata,setCredentialData]=useState()
    



    // handlechange-----------------
    const handleDateChange = (date, name) => {
        const formattedDate = dayjs(date).format("YYYY-MM-DD");
        const parsedDate = dayjs(formattedDate).format("YYYY-MM-DD");

        setBook((prevBook) => ({
            ...prevBook,
            [name]: parsedDate,
        }));

        setSelectedCustomerData((prevValues) => ({
            ...prevValues,
            [name]: parsedDate,
        }));
    };

    //-----------------popup---------------

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





    const handleExcelDownload = async () => {
        const workbook = new Excel.Workbook();
        const workSheetName = 'Worksheet-1';

        try {

            const fileName = "Ratetype Reports"
            // creating one worksheet in workbook
            const worksheet = workbook.addWorksheet(workSheetName);
            const headers = Object.keys(rows[0]);
            const idIndex = headers.indexOf('id');
            console.log(idIndex, "index")
            if (idIndex !== -1) {
                headers.splice(idIndex, 1);
                console.log(headers, "splice")
                headers.unshift('id');
                console.log(headers, "unsift")
            }
            console.log(headers, "out")
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
    // const handlePdfDownload = () => {
    //     const pdf = new jsPDF();
    //     pdf.setFontSize(12);
    //     pdf.setFont('helvetica', 'normal');
    //     pdf.text("Rate Type Details", 10, 10);

    //     const tableData = rows.map((row) => [
    //         row['id'],
    //         row['driverid'],
    //         row['ratename'],
    //         row['active'],
    //         row['starttime'],
    //         row['closetime']
    //     ]);

    //     pdf.autoTable({
    //         head: [['sno', 'Driver ID', 'Rate Type', 'Active', 'Start Time', 'Close Time']],
    //         body: tableData,
    //         startY: 20,
    //     });

    //     const pdfBlob = pdf.output('blob');
    //     saveAs(pdfBlob, 'Rate_Type.pdf');
    // };

    const handlePdfDownload = () => {
        const pdf = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: "tabloid" // [width, height] in inches
        });
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        pdf.text("Ratetype Details", 10, 10);
        const header = Object.keys(rows[0]);
        const idIndex = header.indexOf('id');
        console.log(idIndex, "index")
        if (idIndex !== -1) {
            header.splice(idIndex, 1);

            header.unshift('id');

        }

        // Extracting body
        const body = rows.map(row => Object.values(row));
        console.log(header.length, "len")

        let fontdata = 1;
        if (header.length <= 13) {
            fontdata = 16;
        }
        else if (header.length >= 14 && header.length <= 18) {
            fontdata = 11;
        }
        else if (header.length >= 19 && header.length <= 20) {
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
        console.log(fontdata, "data")

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
                fontSize: fontdata - 1,
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
        saveAs(pdfBlob, 'RateType_Details.pdf');
    };



    const [book, setBook] = useState({
        driverid: '',
        stations: '',
        ratetype:'',
        ratename: '',
        // validity: '',
        active: '',
        starttime:dayjs(),
        closetime:dayjs(),
    });

   

     const uniqueRatetype=async(customerdataname,ratenamedata)=>{
        // console.log(customerdataname,"namee")
        console.log(customerdataname,ratenamedata,"ratt")
        if(customerdataname && ratenamedata){

            const response= await axios.get(`${apiUrl}/getcustomeruniqueratetype/${customerdataname}/${ratenamedata}`)
            const responsedata=response.data;
            
            // console.log(response,"data")
            // console.log(responsedata?.length,"reeee")
           
            if(responsedata?.length >=1){
                
                setCredentialData(true)
                // return true;
            }
            else{
                setCredentialData(false)
                // return false;
            }
        } }

       const  handleChangecredent=(event)=>{
        const { name, value } = event.target;
        console.log(selectedCustomerData?.ratename || book.ratename,value,"valuee")
        const data=uniqueRatetype(selectedCustomerData?.ratetype || book.ratetype,value)
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
    



    const handleCancel = () => {
        setBook((prevBook) => ({
            ...prevBook,
            driverid: '',
            ratetype:'',
            stations: '',
            ratename: '',
            // validity: '',
            active: '',
            starttime:dayjs(),
            closetime:dayjs(),
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


    const handleAdd = async () => {
        const ratename = book.ratename;
        const stations = book.stations;
        const ratetype = book.ratetype;
        if (!stations) {
            setWarning(true);
            setWarningMessage("Fill The Ratename");
            return;
        }
        if (!ratetype) {
            setWarning(true);
            setWarningMessage("Fill The RateType");
            return;
        }
        if (!ratename) {
            setWarning(true);
            setWarningMessage("Fill The Ratename");
            return;
        }
        if (cerendentialdata === true) {
            setWarning(true);
            setWarningMessage(" Ratename Already Exists");
            return;
        }
        try {
            console.log(book.starttime,book.closetime)
            const starttime=book.starttime || selectedCustomerData.starttime||dayjs();
           const  closetime=  book.closetime || selectedCustomerData.closetime|| dayjs();
           console.log(starttime,"start",closetime,"clos")
            const updatedBook = {
                stations: book.stations || selectedCustomerData.stations,
                ratetype:book.ratetype || selectedCustomerData.ratetype,
                ratename: book.ratename || selectedCustomerData.ratename,
                // validity: book.validity || selectedCustomerData.validity,
                active: book.active || selectedCustomerData.active,
                // starttime: book.starttime || selectedCustomerData.starttime,
                // closetime: book.closetime || selectedCustomerData.closetime
                starttime:starttime,
                closetime:closetime
            }; 
             console.log(updatedBook)

            await axios.post(`${apiUrl}/ratetype`, updatedBook);
            handleCancel();

            setSuccess(true);
            setSuccessMessage("Successfully Added");
        } catch {
            setError(true);
            setErrorMessage("Check your Network Connection");
        }
    };


    useEffect(() => {
        const handlelist = async () => {
            const response = await axios.get(`${apiUrl}/ratetype`);
            const data = response.data;
            if (data.length > 0) {
                const rowsWithUniqueId = data.map((row, index) => ({
                    ...row,
                    id: index + 1,
                }));
                setRows(rowsWithUniqueId);
            } else {
                setRows([]);
            }
        }
        handlelist();
    }, [apiUrl,rows]);

    const handleEdit = async (driverid) => {

        if (cerendentialdata === true) {
            setWarning(true);
            setWarningMessage(" Ratename Already Exists");
            return;
        }
        try{
        const selectedCustomer = rows.find((row) => row.driverid === driverid);
        const updatedCustomer = {
            driverid: selectedCustomer,
            stations: selectedCustomerData.stations,
            ratetype:selectedCustomerData.ratetype,
            ratename: selectedCustomerData.ratename,
            // validity: selectedCustomerData.validity,
            active: selectedCustomerData.active,
            starttime: selectedCustomerData.starttime,
            closetime: selectedCustomerData.closetime
        };
        await axios.put(`${apiUrl}/ratetype/${selectedCustomerData?.driverid || book.driverid}`, updatedCustomer);
        setSuccess(true);
        setSuccessMessage("Successfully updated");
        handleCancel();
    }
    catch(err){
        setError(true);
        setErrorMessage("Check your Network Connection");
    }
    };

    const handleClick = async (event, actionName, driverid) => {
        event.preventDefault();
        try {
            if (actionName === 'List') {
                const response = await axios.get(`${apiUrl}/ratetype`);
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

            }

            else if (actionName === 'Delete') {
                await axios.delete(`${apiUrl}/ratetype/${selectedCustomerData?.driverid || book.driverid}`);
                setSelectedCustomerData(null);
                setSuccess(true);
                setSuccessMessage("Successfully Deleted");
                handleCancel();


            } else if (actionName === 'Edit') {

                const selectedCustomer = rows.find((row) => row.driverid === driverid);
                const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
                await axios.put(`${apiUrl}/ratetype/${selectedCustomerData?.driverid || book.driverid}`, updatedCustomer);
                setSuccess(true);
                setSuccessMessage("Successfully updated");
                handleCancel();

            }

            else {
                setInfo(true);
                setInfoMessage("There is some issue.");
            }

        } catch (err) {
            setError(true);
            setErrorMessage("Check your Network Connection");
        }
    };
    useEffect(() => {
        if (actionName === 'List') {
            handleClick(null, 'List');
        }
    });


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
        infoMessage,
        book,
        handleClick,
        handleChange,
        handleRowClick,
        handleAdd,
        hidePopup,
        handleAutocompleteChange,
        formData,
        setBook,
        handleExcelDownload,
        handlePdfDownload,
        columns,
        isEditMode,
        handleEdit,
        handleDateChange,cerendentialdata,handleChangecredent

    };
};

export default useRatype;