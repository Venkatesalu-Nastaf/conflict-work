import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Button from "@mui/material/Button";
import { APIURL } from "../../../url";
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import dayjs from "dayjs";
import Excel from 'exceljs';





const useDrivercreation = () => {
    const apiUrl = APIURL;
    const create_atdata=dayjs().format("YYYY-MM-DD");
    // const user_id = localStorage.getItem('useridno');
    const [showPasswords, setShowPasswords] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [selectedCustomerData, setSelectedCustomerData] = useState({});
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [rows, setRows] = useState([]);
    const [actionName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [info, setInfo] = useState(false);
    const [warning, setWarning] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [warningMessage,setWarningMessage] = useState({});
    const [infoMessage, setInfoMessage] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);
    const [searchText, setSearchText] = useState("")
    const [fromDate, setFromDate] = useState(dayjs())
    const [toDate, setToDate] = useState(dayjs())
    //venkat 
    const [Deleted, setDeleted] = useState(false);
    const [checkbox, setCheckbox] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [edit, setEdit] = useState(false)
    const [cerendentialdata,setCredentialData]=useState();
    const [cerendentialdata2,setCredentialData2]=useState();
    const [organistaionsendmail, setOrganisationSendEmail] = useState([])
    const [datatrigger, setDatatrigger] = useState(false)
    // const [profileimage,setProfileimage]=useState('')
    // console.log(profileimage,"imagedata")
    // venkat


    // venkat
    const handleSelectAll = () => {
        if (selectAll) {
            setDeleteFile([]);
            // setCheckbox([])
        } else {
            const allFiles = allFile.map(img => img.fileName);
            setDeleteFile(allFiles);
            // setCheckbox(allFiles)
            setSelectAll(false)
        }
        setSelectAll(prevState => !prevState);
    };
    // venkat

    // TABLE START
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
        { field: "driverid", headerName: "Driver Id", width: 100 },
        { field: "drivername", headerName: "Driver Name", width: 130 },
        { field: "username", headerName: "User Name", width: 130 },
        { field: "userpassword", headerName: "Password", width: 130 },
        { field: "stations", headerName: "Stations", width: 130 },
        { field: "Mobileno", headerName: "Mobile No", width: 130 },
        {
            field: "joiningdate", headerName: "Joining Date", width: 130,
            valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),

        },
        // { field: "viewfor", headerName: "Access", width: 130 },
        // { field: "designation", headerName: "Designation", width: 130 },
        // { field: "stationname", headerName: "Station", width: 130 },
        { field: "licenseno", headerName: "License No", width: 130 },
        { field: "badgeno", headerName: "Badge No", width: 130 },
        { field: "aadharno", headerName: "Aadhar Card No", width: 130 },
        {
            field: "licenseexpdate", headerName: "License Exp Date", width: 130,
            valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
        },
        { field: "badgeexpdate", headerName: "Badge Exp Date", width: 130 },
        { field: "active", headerName: "Active", width: 160 },
    ];

    const [book, setBook] = useState({

        drivername: '',
        username: '',
        stations: '',
        Mobileno: '',
        userpassword: '',
        joiningdate: dayjs(),
        active: "yes",
        address1: '',
        licenseno: '',
        licenseexpdate: '',
        badgeno: '',
        badgeexpdate: '',
        aadharno: '',
        Email:'',
        Profile_image:null,
        created_at:dayjs().format("YYYY-MM-DD")
    });

    const handleFileChange = (e) => {
        setBook({
            ...book,
            Profile_image: e.target.files[0]
        });

        setSelectedCustomerData((prevValues) => ({
            ...prevValues,
            Profile_image: e.target.files[0],
        }));

        setSuccess(true);
        setSuccessMessage("Uploaded successfully");
    };

    

    const handleExcelDownload=async()=>{
        const workbook = new Excel.Workbook();
        const workSheetName = 'Worksheet-1';

        try {

            const fileName = "Drivercreation Reports"
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
        pdf.text("Driver Details", 10, 10);
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
        saveAs(pdfBlob, 'drivercreationReports.pdf');
      };

    // TABLE END

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
            // if (name === 'userpassword') {
            //     setPassword(value);
            // }
            // else if (name === 'userconfirmpassword') {
            //     setConfirmPassword(value);
            // }
        }
    };

    const handleDateChange = (date, name) => {
        const formattedDate = dayjs(date).format("YYYY-MM-DD");
        const parsedDate = dayjs(formattedDate).format("YYYY-MM-DD");
        // console.log(formattedDate, "driver", parsedDate)
        setBook((prevBook) => ({
            ...prevBook,
            [name]: parsedDate,
        }));

        setSelectedCustomerData((prevValues) => ({
            ...prevValues,
            [name]: parsedDate,
        }));
    };


    const uniquedrivernameno=async(drivernamedata)=>{
        // console.log(customerdataname,"namee")
        // console.log(customerdataname,ratenamedata,"ratt")
        if(drivernamedata){

            const response= await axios.get(`${apiUrl}/getcreduniquedrivername/${drivernamedata}`)
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

        const uniquedriverusername=async(driverusernamedata)=>{
            // console.log(customerdataname,"namee")
            // console.log(customerdataname,ratenamedata,"ratt")
            if(driverusernamedata){
    
                const response= await axios.get(`${apiUrl}/getcreduniqueusername/${driverusernamedata}`)
                const responsedata=response.data;
                
                // console.log(response,"data")
                // console.log(responsedata?.length,"reeee")
               
                if(responsedata?.length >=1){
                    
                    setCredentialData2(true)
                    // return true;
                }
                else{
                    setCredentialData2(false)
                    // return false;
                }
            } }

       const  handleChangecredentdrivername=(event)=>{
        const { name, value } = event.target;
       
        const data=uniquedrivernameno(value)
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

       const  handleChangecredentusername=(event)=>{
        const { name, value } = event.target;
       
        const data=uniquedriverusername(value)
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
            drivername: '',
            username: '',
            stations: '',
            Mobileno: '',
            userpassword: '',
            joiningdate: dayjs(),
            active: "yes",
            address1: '',
            licenseno: '',
            licenseexpdate: '',
            badgeno: '',
            badgeexpdate: '',
            aadharno: '',
            Email:''
        }));
        setSelectedCustomerData({});
        setIsEditMode(false);
    };

    // const user__id = selectedCustomerData?.driverid || book.driverid;
    const [file, setFile] = useState(null);

    const addPdf = async (driveruserid) => {
        if (file !== null) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("created_at", create_atdata); // assuming create_atdata is defined elsewhere

            try {
                await axios.post(`${apiUrl}/driver-pdf/${driveruserid}`, formData);
                setFile(null); // Reset the file after successful upload

                // Set success state and message
                setSuccess(true);
                setSuccessMessage("Mail Sent Successfully");
            } catch (error) {
                // Log the error and show error message
                console.error("File upload failed:", error);
                setError(true);
                setErrorMessage('Something went wrong');
            }
        } else {
            return;
        }
    };
    



    // licence
    const [licencepdf, setLicencepdf] = useState(null)

    const licenceSubmit = async (driveruserid) => {
        if (licencepdf !== null) {
            const formData = new FormData();
            formData.append("file", licencepdf);
            formData.append("created_at",create_atdata)
            
            try {
                await axios.post(`${apiUrl}/driver-licencepdf/${driveruserid}`, formData);
                setFile(null);
            }
            catch {
                setError(true);
                setErrorMessage('something wrong');
            }
        } else {
            return
        }
        setFile(null);
    };
    const handleFileUpload = (e) => {
        setLicencepdf(e.target.files[0]);

        // If needed, update other states like book or selected customer data
        // setBook({ ...book, Licencepdf: e.target.files[0] });

        setSuccess(true);  // Assuming you have success state
        setSuccessMessage("Uploaded successfully");  // Set the success message
    };
    const [allFile, setAllFile] = useState([]);

    const showPdf = (showID) => {
        axios.get(`${apiUrl}/pdf-view/${showID}`)
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
        
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleButtonClick = (params) => {
        console.log(params, 'params');
        const { driverid } = params.row;
        if (!driverid) {
            setError(true);
            setErrorMessage("PLease Enter driverid No");
            return;
        }
        showPdf(driverid);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };
    
  useEffect(() => {
    const fetchData = async () => {
    //   const organizationname = localStorage.getItem('usercompany');

      try {
        // if (!organizationname) return
        // const response = await fetch(`${apiUrl}/organizationdata/${organizationname}`);
        const response = await fetch(`${apiUrl}/organizationdata`);
        if (response.status === 200) {

          const userDataArray = await response.json();
          if (userDataArray.length > 0) {
            setOrganisationSendEmail(userDataArray[0])
            setDatatrigger(!datatrigger)

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
  }, [apiUrl, datatrigger]);
//   console.log(organistaionsendmail,"dataatatta")


    const handlecheckmaildriver = async (lastBookingno) => {
      
         
          try {
          
            const dataToSend = {
              userid:lastBookingno,
              Drivername:book.drivername,
              UserName:book.username,
              password:book.userpassword,
              Sendmailauth: organistaionsendmail.Sender_Mail,
              Mailauthpass: organistaionsendmail.EmailApp_Password,
              Email:book.Email
    
    
    
            };
            // const dataToSend = {
            //     userid:lastBookingno,
            //     Drivername:selectedCustomerData.drivername,
            //     UserName:selectedCustomerData.username,
            //     password:selectedCustomerData.userpassword,
            //     Sendmailauth: organistaionsendmail.Sender_Mail,
            //     Mailauthpass: organistaionsendmail.EmailApp_Password,
            //     Email:selectedCustomerData.Email
      
      
      
            //   };
           
            console.log(dataToSend, "datta")
            await axios.post(`${apiUrl}/send-emaildriverdata`, dataToSend);
            setSuccess(true);
            setSuccessMessage("Mail Sent Successfully");
          } catch (error) {
            console.log(error,"dd")
            setError(true);
            setErrorMessage("An error occured while sending mail", error);
          }
        }
        //  else {
        //   setError(true);
        //   setErrorMessage("Send mail checkbox is not checked. Email not sent.");
        // }
    //   };
    

    const handleAdd = async () => {
        if (!book.stations && !book.drivername) {
            setWarning(true);
            setWarningMessage("All fields are mandatory");
            return
        }
        if (!book.Email) {
            setWarning(true);
            setWarningMessage("All fields are mandatory");
            return
        }
        if (!book.userpassword && !book.address1) {
            setWarning(true);
            setWarningMessage("All fields are mandatory");
            return
        }

        if (!book.Mobileno && !book.licenseno) {
            setWarning(true);
            setWarningMessage("All fields are mandatory");
            return
        }
        if (!book.licenseexpdate) {
            setWarning(true);
            setWarningMessage("All fields are mandatory");
            return
        }
        if (cerendentialdata === true) {
            setWarning(true);
            setWarningMessage(" Drivername Already Exists");
            return;
        }
        if (cerendentialdata2 === true) {
            setWarning(true);
            setWarningMessage(" UserName Already Exists");
            return;
        }

        try {

            const formData = new FormData();
            for (const key in book) {
                console.log(key,book[key])
                formData.append(key, book[key]);
              }
               // await axios.post(`${apiUrl}/drivercreation`, formData, {
            //     headers: {
            //       'x-auth-token': token,
                  
            //     }
            //   })

            await axios.post(`${apiUrl}/drivercreation`, formData,)
            
            const response = await axios.get(`${apiUrl}/lastdrivergetid`);
            const lastdriveridno = response.data.driverid;
            licenceSubmit(lastdriveridno);
            addPdf(lastdriveridno);
            handlecheckmaildriver(lastdriveridno)
            setRows([]);
            setSuccess(true);
            setSuccessMessage("Successfully Added");
            // addPdf(lastdriveridno);
            handleCancel();
        } catch (error) {
            setError(true)
            setErrorMessage("Check your Network Connection");
        }
    }




    const handleShowAll = async () => {
        try {
            const response = await fetch(
                `${apiUrl}/searchfordriver?searchText=${searchText}&fromDate=${fromDate}&toDate=${toDate}`
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
            setErrorMessage("Check your Network Connection");
        }
    };

    const handleenterSearch = async (e) => {
        if (e.key === "Enter") {

            try {
                const response = await fetch(
                    `${apiUrl}/searchfordriver?searchText=${searchText}`
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
                setErrorMessage("Check your Network Connection");
            }

        }
    };

    const handleEdit = async (userid) => {
        setEdit(true)
        const data = selectedCustomerData.driverid
        const formData = new FormData();
        const {id,driverid,...restselected}=selectedCustomerData
        console.log(restselected,"data")

        for (const key in restselected) {
            console.log(key,restselected[key])
            formData.append(key, restselected[key]);
          }
        
        // const updatedriver = {
        //     drivername: selectedCustomerData.drivername,
        //     username: selectedCustomerData.username,
        //     stations: selectedCustomerData.stations,
        //     Mobileno: selectedCustomerData.Mobileno,
        //     userpassword: selectedCustomerData.userpassword,
        //     joiningdate: selectedCustomerData.joiningdate,
        //     active: selectedCustomerData.active,
        //     address1: selectedCustomerData.address1,
        //     licenseno: selectedCustomerData.licenseno,
        //     licenseexpdate: selectedCustomerData.licenseexpdate,
        //     badgeno: selectedCustomerData.badgeno,
        //     badgeexpdate: selectedCustomerData.badgeexpdate,
        //     city: selectedCustomerData.city,
        //     aadharno: selectedCustomerData.aadharno,
        // }


        await axios.put(`${apiUrl}/drivercreation/${selectedCustomerId}`,formData);
        // await axios.put(`${apiUrl}/drivercreation/${selectedCustomerId}`,updatedriver);
        setSuccess(true);
        setSuccessMessage('Successfully updated');
        handleCancel();
        addPdf(data);
        licenceSubmit(data);
        // handlecheckmaildriver(data)
        setRows([]);
        setEdit(true)
    };

    const handleClick = async (event, actionName, userid) => {
        event.preventDefault();
        try {
            if (actionName === 'List') {
                const response = await axios.get(`${apiUrl}/drivercreation`);
                const data = response.data;

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
                setRows([]);
            }

            else if (actionName === 'Delete') {
                await axios.delete(`${apiUrl}/drivercreation/${selectedCustomerData?.driverid || userid}`);
                setSelectedCustomerData(null);
                setSuccess(true);
                setSuccessMessage('Successfully Deleted');
                handleCancel();
                setRows([]);
            }

            else if (actionName === 'Edit') {
                handleEdit()
                // setSuccess(true);
                // setSuccessMessage('Successfully updated');
                // handleCancel();
                // addPdf();
                // licenceSubmit();
                // setRows([]);
            } else {
                setInfo(true);
                setInfoMessage('There is some issue ');
            }
        } catch (error) {
            setError(true);
            setErrorMessage('Check your Network Connection');
        }
    };

    //---------- popup------------------
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

    //------------------------------------

    useEffect(() => {
        if (actionName === 'List') {
            handleClick(null, 'List');
        }
    });
    const handleRowClick = useCallback((params) => {
        const customerData = params.row;
        setSelectedCustomerData(customerData);
        setSelectedCustomerId(params.row.driverid);

        setIsEditMode(true);
        setEdit(true)
    }, []);

    const handleClickShowPasswords = () => {
        setShowPasswords((show) => !show);
    };

    const handleMouseDownPasswords = (event) => {
        event.preventDefault();
    };

    const handleClickShowPassword = () => {
        setShowPassword((show) => !show);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [dialogdeleteOpen, setDialogdeleteOpen] = useState(false);

    const handleClosedeleteDialog = () => {
        setDialogdeleteOpen(false);
    };

    // venkat

    const [imagedata, setImagedata] = useState([]);

    const handleimagedelete = (imageName) => {
        // console.log(deletefile, 'fileeee');
        // console.log(deletefile.length, 'lennnnn');
        setSelectAll(false)
        if (deletefile.length > 0) {
            setSelectAll(false)
            // console.log(imageName, 'val---')
            setImagedata(prevDeleteFile => [...prevDeleteFile, imageName]);
            setDialogdeleteOpen(true);
            setDeleteFile([])
        }
    };
    const [deletefile, setDeleteFile] = useState([])



    const handlecheckbox = (fileName) => {
        if (deletefile.includes(fileName)) {
            setDeleteFile(prevDeleteFile => prevDeleteFile.filter(file => file !== fileName));
        } else {
            setDeleteFile(prevDeleteFile => [...prevDeleteFile, fileName]);
            setCheckbox(prevDeleteFile => [...prevDeleteFile, fileName]);
        }
    };


    const handleDeleted = () => {
        setDeleted(true)
        setTimeout(() => {
            setDeleted(false)
        }, 2000)
    }

    const handleContextMenu = () => {
        try {
            // Assuming imagedata is the filename or identifier of the image to be deleted
            axios.delete(`${apiUrl}/driver_proof/` + imagedata)
                .then(response => {
                    // console.log("Image deleted:", imagedata);
                    setDialogdeleteOpen(false);
                    setDialogOpen(false);
                    setImagedata([]);
                    handleDeleted();
                })
                .catch(error => {
                    console.error("Error deleting image:", error);
                    // Handle error
                });
        } catch (error) {
            console.error("Error:", error);
            // Handle error
        }


        // Reset imagedata and deleteFile arrays regardless of checkbox state
        setImagedata([]);
        setDeleteFile([]);
    };
    // venkat

    // venkat-saturday

    const handleDocumentDownload = async () => {
        try {
            // Filter selected files
            const selectedFiles = allFile.filter((img) => deletefile.includes(img.fileName));

            // Download each file
            for (const file of selectedFiles) {
                const response = await axios.get(`${apiUrl}/public/driver_doc/` + file.fileName, {
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
            console.error('Error downloading files:', error);
            // Handle error if needed
        }
    };


    //       const handleDocumentDownload = async () => {
    //     try {
    //         // Filter selected files
    //         const selectedFiles = allFile.filter((img) => deletefile.includes(img.fileName));

    //         // Download each file
    //         for (const file of selectedFiles) {
    //             const response = await axios.get(`${apiUrl}/public/driver_doc/` + file.fileName, {
    //                 responseType: 'blob', // Important to get a binary response
    //             });

    //             // Save the file to the downloads directory
    //             saveAs(response.data, file.fileName);
    //         }
    //     } catch (error) {
    //         console.error('Error downloading files:', error);
    //         // Handle error if needed
    //     }
    // };

    // const handleDocumentDownload = () => {
    //     // Filter selected files
    //     const selectedFiles = allFile.filter((img) => deletefile.includes(img.fileName));

    //     // Open each file URL in a new tab
    //     selectedFiles.forEach((file, index) => {
    //         const url = `${apiUrl}/public/driver_doc/${file.fileName}`;
    //         console.log(url);
    //         window.open(url, '_blank');


    //     });
    // };

    // venkat-saturday


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
        handleDateChange,
        showPasswords,
        handleClickShowPasswords,
        handleMouseDownPasswords,
        // passwordsMatch,
        columns,
        showPassword,
        handleClickShowPassword,
        handleMouseDownPassword,
        handleCloseDialog,
        dialogOpen,
        allFile,
        setFile,
        setLicencepdf,
        isEditMode,
        handleEdit,
        handleContextMenu,
        handleimagedelete,
        handleClosedeleteDialog,
        dialogdeleteOpen,
        setError,


        // venkat
        setErrorMessage,
        handlecheckbox,
        deletefile,
        Deleted,
        checkbox,
        setCheckbox,
        setDeleteFile,
        selectAll,
        setSelectAll,
        handleSelectAll,
        handleDocumentDownload,
        searchText, setSearchText, fromDate, setFromDate, toDate, setToDate, handleenterSearch, handleShowAll, edit,
        handlePdfDownload,
        handleExcelDownload,
        handleFileChange,handleFileUpload, handleChangecredentdrivername,handleChangecredentusername,cerendentialdata,cerendentialdata2
        
        // venkat
    };
};

export default useDrivercreation;