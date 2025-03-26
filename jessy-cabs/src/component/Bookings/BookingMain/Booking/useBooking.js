import { useState, useEffect, useCallback,useMemo } from "react";
import axios from "axios";
import { useUser } from "../../../form/UserContext";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { APIURL } from "../../../url.js";
const useBooking = () => {
  const apiUrl = APIURL;
  const [selectedCustomerData, setSelectedCustomerData] = useState({});
  const [selectedCustomerId, setSelectedCustomerId] = useState({});
  const [actionName] = useState("");
  const [rows, setRows] = useState([]);
  const [row, setRow] = useState([]);
  const [rowdriver, setRowsdriver] = useState([]);
  const [toDate, setToDate] = useState(dayjs());
  const [fromDate, setFromDate] = useState(dayjs());
  const [reporttime, setreporttime] = useState("");
  const [vechiledata, setVehicleData] = useState([]);
  const [drivername, setDrivername] = useState([]);
  const [starttime, setStartTime] = useState("");
  const location = useLocation();
  const [error, setError] = useState(false);
  const [info, setInfo] = useState(false);
  const [infoMessage, setInfoMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [warningMessage, setWarningMessage] = useState({});
  const [searchText, setSearchText] = useState("");
  const [warning, setWarning] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupOpenmail, setpopupOpenmail] = useState(false);
  const [edit, setEdit] = useState(false)
  const [sendEmail, setSendEmail] = useState(true);
  const [sendmailguestsms, setSendmailGuestsms] = useState(false);
  const [organistaionsendmail, setOrganisationSendEmail] = useState([])
  const [datatrigger, setDatatrigger] = useState(false)
  const [accountinfodata, setAccountInfoData] = useState([])
  const [ratename, setRate_name] = useState("");
  const [vehileName, setVehicleName] = useState([]);
  const [CopyEmail, setCopyEmail] = useState(false);
  const [hybdridatabooking,setHybdriDatabooking] = useState(0);
  const handlePopupClose = () => {
    setPopupOpen(false);
    setpopupOpenmail(false);
  };
  const [nochangedata,setNoChangeData]=useState({})
  const [dialogmessage,setDialogMessage]=useState(false)
  
  const [escort, setEscort] = useState('No');
  const [transferreport, setTransferreport] = useState('No')
  const [isAddbtnload,setisAddbtnload] = useState(false)
  const [isEditbtnload,setisEditbtnload] = useState(false)
   const [deletefile, setDeleteFile] = useState([])
   const [deletefiledata, setDeleteFiledata] = useState([])
   const [messagedited,setMessageEdited]=useState('')
   const [messageditedbefore,setMessageEditedBefore]=useState('')
   const storedUsername = localStorage.getItem("username");


   const Roledatauser = localStorage.getItem("SuperAdmin")
   const datachangeAdmin = Roledatauser === "SuperAdmin" ? true :false;
  
  const [formValues, setFormValues] = useState({
    guestname: "",
    guestmobileno: "",
    email: "",
    useage: "",
    tripid: "",
    reporttime: "",
    startdate: "",
    address1: "",
    streetno: "",
    city: "",
  });
  const { user } = useUser();
  const [selectedCustomerDatas, setSelectedCustomerDatas] = useState({
    customer: "",
  });
  const [selectedCustomerdriver, setSelectedCustomerdriver] = useState({});
  const hidePopup = () => {
    setSuccess(false);
    setError(false);
    setInfo(false);
    setWarning(false);
  };

  useEffect(() => {
    if (error || warning || info || success) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, warning, info, success]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const statusValue = params.get("status") || "pending";
    const stationValue = params.get("servicestation");
    const payValue = params.get("paymenttype") || "BTC";
    const dispath = params.get("dispatchcheck");
    const shedOutDate = params.get("shedOutDate")|| dayjs()
    const startdate = params.get("startdate")|| dayjs();
    const messagedata = params.get("messageedited")|| '';
    
   
    if (dispath) {
      setSendEmail(false)
      setIsEditMode(dispath)
      setEdit(dispath)
      setMessageEditedBefore(messagedata)
    }
    const formData = {};
    const parameterKeys = [
      "bookingno",
      "bookingdate",
      "bookingtime",
      "status",
      "tripid",
      "customer",
      "orderedby",
      "mobile",
      "guestname",
      "guestmobileno",
      "email",
      "employeeno",
      "address1",
      "streetno",
      "city",
      "report",
      "paymenttype",
      "startdate",
      "starttime",
      "reporttime",
      "duty",
      "pickup",
      "customercode",
      "registerno",
      "flightno",
      "orderByEmail",
      "remarks",
      "servicestation",
      "advance",
      "useage",
      "username",
      "emaildoggle",
      "hireTypes",
      "travelsname",
      "vehRegNo",
      "vehicleName",
      "driverName",
      "mobileNo",
      "travelsemail",
      "Groups",
      "orderByEmail",
      "orderbyemail",
      "mobile",
      "vehiclemodule",
      "ratenamebook",
      "shedOutDate",
      "escort",
      'transferreport',
      'messageedited',
      'MessageText',


    ];

    parameterKeys.forEach((key) => {
      const value = params.get(key);
      if (value !== null && value !== "null") {
        formData[key] = value;
      }
    });
    formData["status"] = statusValue;
    // console.log(formData,'form datas')
    formData["servicestation"] = stationValue;
    formData["paymenttype"] = payValue;
    formData["shedOutDate"] = shedOutDate;
    formData["startdate"] = startdate;
    const ratetye = formData["ratenamebook"]
    setRate_name(ratetye)
    setBookingStatus(formData["status"])
    setBook(formData);
    setFormData(formData);
    // setMessageEdited()
    // console.log(formData,"ll")
  }, [location]);

  useEffect(() => {
    window.history.replaceState(null, document.title, window.location.pathname);
    const initialFormData = {};
    setFormData(initialFormData);
  }, []);
  const [orderByDropDown, setOrderByDropDown] = useState([])
  const bookDatdObj = {
    bookingno: "",
    bookingdate: dayjs(),
    bookingtime: "",
    status: "",
    tripid: "",
    customer: "",
    orderedby: "",
    orderByMobileNo: "",
    orderByEmail: '',
    mobile: "",
    guestname: "",
    guestmobileno: "",
    email: "",
    employeeno: "",
    address1: "",
    report: "",
    vehicleName: "",
    paymenttype: "",
    // shedOutDate: '',
    // startdate: "",
    shedOutDate:dayjs(),
    startdate: dayjs(),
    starttime: "",
    reporttime: "",
    duty: "",
    pickup: "",
    customercode: "",
    registerno: "",
    flightno: "",
    guestsms: "",
    sendemail: "",
    remarks: "",
    servicestation: "",
    advance: "",
    useage: "",
    username: "",
    emaildoggle: "",
    hireTypes: "",
    travelsname: "",
    vehRegNo: "",
    vehiclemodule: "",
    driverName: "",
    mobileNo: "",
    travelsemail: "",
    Groups: "",
    escort:'',
    transferreport:"",
    MessageText:""
  
  }

  const [book, setBook] = useState(bookDatdObj);
  // console.log(book ,'book datas')
  
  const handleCancel = () => {
    setBook(bookDatdObj);
    setOrderByDropDown([])
    setBookingStatus('pending')
    setFormValues({});
    setSelectedCustomerData({});
    setSelectedCustomerDatas({});
    setFormData({});
    setSelectedCustomerdriver({})
    setIsEditMode(false);
    setSelectetImg([])
    setNoChangeData({})
  };

  useEffect(() => {
    const fetchOrganizationnames = async () => {
      try {
        const response = await axios.get(`${apiUrl}/drivernamedrivercreation`);
        const data = response.data
        setDrivername(data)
      }
      catch (error) {
        console.log(error, "error");
      }
    };
    fetchOrganizationnames()
  }, [apiUrl])

  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  const [bookingStatus, setBookingStatus] = useState('pending');
  const handleChange = useCallback(
    (event) => {
      const { name, value, checked, type } = event.target;
      // console.log("wq",name,value)

      if (type === "checkbox") {
        setBook((prevBook) => ({
          ...prevBook,
          [name]: checked,
        }));
        setSelectedCustomerData((prevData) => ({
          ...prevData,
          [name]: checked,
        }));
        setFormData((prevData) => ({
          ...prevData,
          [name]: checked,
        }));
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: checked,
        }));
        setNoChangeData((prevValues) => ({
          ...prevValues,
          [name]: checked,
        }));
      } else if (type === "radio") {
        setBook((prevBook) => ({
          ...prevBook,
          [name]: value,
        }));
        setSelectedCustomerData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
        setNoChangeData((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
      } else {
        const fieldValue = value;
        if(name === "orderByMobileNo"){
          setBook((prevBook) => ({
            ...prevBook,
            ["mobile"]: fieldValue,
          }));
        }
        if(name === "orderByEmail"){
          setBook((prevBook) => ({
            ...prevBook,
            ["orderbyemail"]: fieldValue,
          }));
        
        }
        
        setBook((prevBook) => ({
          ...prevBook,
          [name]: fieldValue,
        }));
        setSelectedCustomerData((prevData) => ({
          ...prevData,
          [name]: fieldValue,
        }));
        setSelectedCustomerDatas((prevData) => ({
          ...prevData,
          [name]: fieldValue,
        }));
        setFormData((prevData) => ({
          ...prevData,
          [name]: fieldValue,
        }));
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: fieldValue,
        }));
        setSelectedCustomerdriver((prevValues) => ({
          ...prevValues,
          [name]: fieldValue,
        }));
        if(name !== "bookingno")
        setNoChangeData((prevValues) => ({
          ...prevValues,
          [name]: fieldValue,
        }));
      }
     
    },
    [
      setBook,
      setSelectedCustomerData,
      setFormData,
      setFormValues,
      setSelectedCustomerDatas,
      setSelectedCustomerdriver,
      
    ]
  );

 const handleChangetext = (event) => {
    const { name, value, } = event.target;
  // const { name, value} = event.target.value;
  console.log(name,value,"textt")
  setBook((prevBook) => ({
    ...prevBook,
    [name]: value,
  }));
  setSelectedCustomerData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
  setMessageEdited(storedUsername)
  setNoChangeData((prevState) => ({
    ...prevState,
    [name]:value
  }));

 }

//   const handleBookEscortChange = (event) => {
//     setEscort(event.target.value);
//     // console.log(escort,"escoret data")
// };
  // const handleBookEscortChange = (event) => {
  //   const selectedValue = event.target.value; // Get selected value
  //   setEscort(selectedValue); // Update state
  //   console.log("Selected Value:", selectedValue); // Debugging
  //   console.log(escort,'escort update')
  // };
 
// const handleAirportTransferChange = (event) => {
//   // const selectedValue = event.target.value;
//     setTransferreport(event.target.value);
//     // console.log(transferreport,"Airport data")
// };


  //Entering Manually...
  // console.log(nochangedata,"data")
  const handleVehicleChange = (event, value, name) => {
    console.log(name,value)
    if (name === "vehRegNo") {
      const manualInput = typeof value === "string" ? value : value?.label;

        // setNoChangeData((prevState) => ({
        //   ...prevState,
        //   vehRegNo: value,
      
        // }));

      if (manualInput) {
        const selectedVehicle = vechiledata?.find(option => option?.vehRegNo === manualInput);

        setBook(prevState => ({
          ...prevState,
          vehRegNo: manualInput,
          vehiclemodule: selectedVehicle?.vehType || prevState.vehiclemodule,  // Keep current value if not found
          Groups: selectedVehicle?.Groups || prevState.Groups,  // Same logic for Groups
          hireTypes: selectedVehicle?.hiretypes || prevState.hireTypes
        }));

        setSelectedCustomerData(prevState => ({
          ...prevState,
          vehRegNo: manualInput,
          vehiclemodule: selectedVehicle?.vehType || prevState.vehiclemodule,  // Keep current value if not found
          Groups: selectedVehicle?.Groups || prevState.Groups,  // Same logic for Groups
          hireTypes: selectedVehicle?.hiretypes || prevState.hireTypes
        }));

        // setNoChangeData((prevState) => ({
        //   ...prevState,
        //   vehRegNo: manualInput,
        //   vehiclemodule: selectedVehicle?.vehType || prevState.vehiclemodule,  // Keep current value if not found
        //   Groups: selectedVehicle?.Groups || prevState.Groups,  // Same logic for Groups
        //   hireTypes: selectedVehicle?.hiretypes || prevState.hireTypes
        // }));
      }
    }
  };

  useEffect(() => {
    const fetchdatafromvehcileinfo = async () => {
      try {
        const response = await axios.get(`${apiUrl}/vehicleinfodatavehcile`)
        const data = response.data
        setVehicleData(data)
      }
      catch (err) {
        console.log(err)
      }
    }
    fetchdatafromvehcileinfo()
  }, [apiUrl])

  const handleAutocompleteChange = (event, value, name) => {
  
    const selectedOption = value ? value.label : "";

    if (name === "orderedby") {
      const selectedOrder = orderByDropDown?.find(option => option?.orderedby === value?.label);
      // console.log(selectedOrder)
      if (selectedOrder) {
        setBook(prevState => ({
          ...prevState,
          orderedby: value?.label,
          orderByMobileNo: selectedOrder.orderByMobileNo,
          orderByEmail: selectedOrder.orderByEmail,
          // servicestation: selectedOrder.servicestation
        }));

        setSelectedCustomerData((prevState) => ({
          ...prevState,
          orderedby: value?.label,
          orderByMobileNo: selectedOrder.orderByMobileNo,
          orderByEmail: selectedOrder.orderByEmail,
          // servicestation: selectedOrder.servicestation
        }));
        setFormData((prevState) => ({
          ...prevState,
          orderedby: value?.label,
          orderByMobileNo: selectedOrder.orderByMobileNo,
          orderByEmail: selectedOrder.orderByEmail,
          // servicestation: selectedOrder.servicestation
        }));

        setNoChangeData((prevState) => ({
          ...prevState,
          orderedby: value?.label,
          orderByMobileNo: selectedOrder.orderByMobileNo,
          orderByEmail: selectedOrder.orderByEmail,
        }));

      } 
      else { 
        // If no match is found, clear the fields or handle it as necessary
        setBook(prevState => ({
          ...prevState,
          orderedby: value,
        
        }));

        setSelectedCustomerData((prevState) => ({
          ...prevState,
          orderedby: value,
      
        }));
        setFormData((prevState) => ({
          ...prevState,
          orderedby: value,
        
        }));
        // setNoChangeData((prevValues) => ({
        //   ...prevValues,
        //   orderedby: value,
        // }));
      }
    } else {
      setBook(prevState => ({
        ...prevState,
        [name]: selectedOption
      }));
      setSelectedCustomerData((prevData) => ({
        ...prevData,
        [name]: selectedOption,
      }));
      setFormData((prevData) => ({
        ...prevData,
        [name]: selectedOption,
      }));
      setNoChangeData((prevValues) => ({
        ...prevValues,
        [name]: selectedOption,
      }));
    }
  };
// console.log(book,"book")
  const custmorName = formData.customer || selectedCustomerData.customer || selectedCustomerDatas.customer || book.customer;

  useEffect(() => {

    const fetchcustomerData = async () => {
      try {
        if (!custmorName) return
        const response = await axios.get(
          `${apiUrl}/name-orderby/${custmorName}`
        );
        const resData = response.data;

        if (resData.success) {
          setOrderByDropDown(resData.data)
          // console.log(resData,"jjj")
          
          
          setBook(prev => ({ ...prev, orderByEmail: '', orderByMobileNo: "" }))
        } else {
          setOrderByDropDown([])
          setBook(prev => ({ ...prev, orderedby: '', orderByEmail: '', orderByMobileNo: "" }))
        }
      } catch (error) {
        // setError(true);
        // setErrorMessage("Error retrieving vehicle details.");
      }
    }
    fetchcustomerData()
  }, [custmorName, apiUrl])

  const handleDriverChange = (event, value, name) => {
   
    if (name === "driverName") {
      const manualInput = typeof value === "string" ? value : value?.label;
      if (manualInput) {
        const selectedDriver = drivername?.find(option => option.drivername === manualInput);
        setBook(prevState => ({
          ...prevState,
          driverName: manualInput,
          mobileNo: selectedDriver?.Mobileno || prevState.mobileNo, // Keep mobileNo if not found
        }));

        setSelectedCustomerData(prevState => ({
          ...prevState,
          driverName: manualInput,
          mobileNo: selectedDriver?.Mobileno || prevState.mobileNo, // Same logic as above
        }));


        // setNoChangeData((prevState) => ({
        //   ...prevState,
        //   driverName: manualInput,
        //   mobileNo: selectedDriver?.Mobileno || prevState.mobileNo, 
        // }));
      }
    }
  };


 

  

  const handleDateChange = (date, name) => {
    // const formattedDate = dayjs(date).format("DD-MM-YYYY");
    // const parsedDate = dayjs(formattedDate).format("DD-MM-YYYY");

    const formattedDate = dayjs(date).format("YYYY-MM-DD");
        const parsedDate = dayjs(formattedDate).format("YYYY-MM-DD");
    // console.log(parsedDate,"pp",formattedDate)
    let data = parsedDate
    if(data === "Invalid Date")
    {
     data = formattedDate
    }
    // setBook((prevBook) => ({
    //   ...prevBook,
    //   [name]: parsedDate || formattedDate,
    // }));
    // setFormValues((prevValues) => ({
    //   ...prevValues,
    //   [name]: parsedDate || formattedDate,
    // }));
    // setSelectedCustomerData((prevValues) => ({
    //   ...prevValues,
    //   [name]: parsedDate || ,
    // }));
    setBook((prevBook) => ({
      ...prevBook,
      [name]: data,
    }));
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: data,
    }));
    setSelectedCustomerData((prevValues) => ({
      ...prevValues,
      [name]: data,
    }));
    setNoChangeData((prevValues) => ({
      ...prevValues,
      [name]: data,
    }));
  };

  useEffect(() => {
    const fetchgetvehicleName = async () => {
      try {
        const response = await axios.get(`${apiUrl}/getvehicledatauniquevehicleNames`);
        const data = response.data
        const names = data.map(res => res.VechicleNames)
        setVehicleName(names)
      }
      catch (error) {
        console.log(error, "error");
      }
    };
    fetchgetvehicleName()
  }, [apiUrl,])

  // Dont Remove------------------------------
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`${apiUrl}/organizationdata`);
  //       if (response.status === 200) {
  //         const userDataArray = await response.json();
  //         if (userDataArray.length > 0) {
  //           setOrganisationSendEmail(userDataArray[0])
  //           setDatatrigger(!datatrigger)

  //         }
  //          else {
  //           // setErrorMessage('User data not found.');
  //           // setError(true);
  //         }
  //       }
  //     }
  //     catch {
  //     }
  //   };
  //   fetchData();
  // }, [apiUrl, datatrigger]);
  // // console.log(nochangedata,"nochnage")
  // --------------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(`${apiUrl}/organizationdata`);
            if (response.status === 200) {
                const userDataArray = await response.json();
                if (userDataArray.length > 0) {
                    setOrganisationSendEmail(userDataArray[0]);
                } 
                else {
                    // setErrorMessage('User data not found.'); 
                    // setError(true);
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    fetchData();
}, [apiUrl]);

  // ------its for dialog--------------------
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOpentrail, setDialogOpenTrail] = useState(false);
  const booking_id = formData.bookingno || selectedCustomerData.bookingno || book.bookingno;
  const handleButtonClick = () => {
    const booking_no = formData.bookingno || selectedCustomerData.bookingno || book.bookingno;
    if (!booking_no) {
      setError(true);
      setErrorMessage("PLease Enter Booking No");
      return; 
    }
    setDeleteFile([])
    showPdf();
  };
  const handleButtonClickwithouttripid = () => {
    setDialogOpenTrail(true)
    // setDeleteFile([])
    // showPdf();
  };
  const handleCloseDialogtrail = () => {
    setDialogOpenTrail(false);
  }

  // ------------------------------------------------------------
  const [allFile, setAllFile] = useState([]);
  const [AvilableimageCount, setAvilableimageCount] = useState(0)
  const showPdf = async () => {
    try {
      const response = await axios.get(`${apiUrl}/booking-docPDFView/${booking_id}`)
      if (response.data.files.length > 0) {
        setAllFile(response.data.files);
        setDialogOpen(true);
    }
  }
    catch (err) {
      // const errdata=err.response;
      // if(errdata.status === 404){
        setError(true);
          setErrorMessage("Image Not Found");
      }
    
  };
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  const [file, setFile] = useState(null);
  const addPdf = async (lastbookid, fileData) => {
    const uploadFile = fileData || file
    if (uploadFile !== null) {
      const createddata = dayjs().format('DD-MM-YYYY')
      const formData = new FormData();
      formData.append("file", uploadFile);
      formData.append("created_at", createddata);
      try {
        await axios.post(`${apiUrl}/bookingdatapdf/${lastbookid}`, formData)
        setFile(null)
      }
      catch (err) {
        console.log(err)
      }
    }
    else {
      return
    }
  };

  const handleChangeFile = (e) => {
    const booking_no = formData.bookingno || selectedCustomerData.bookingno || book.bookingno;
    const file = e.target.files[0]
    if (file) {
      setFile(file)
      setNoChangeData((prevValues) => ({
        ...prevValues,
        ["Attachimage"]:file,
      }));

      
    }
    if (booking_no && file) {
      addPdf(booking_no, file)
    }
    e.target.value = null
  }
  const [triggerCount, setTriggerCount] = useState(false)


    const getImageCount = async () => {
      try {
        if (!booking_id) return
        const response = await axios.get(`${apiUrl}/booking-docPDFView/${booking_id}`)
        const count = response.data.files.length

        if (count > 0) {
          setAvilableimageCount(count)
        }
      }
      catch (err) {
        // console.log(err,"rtyuiopoih")
        // const errdata=err.response;
        // console.log(errdata,"weeee")
        // if(err.response.status === 404){
          setAvilableimageCount(0)
        // }
       
   
      }
    }
    useEffect(()=>{

      getImageCount()
  }, [file, triggerCount, apiUrl, booking_id,])
  

  // useEffect(() => {
  //   const getImageCount = async () => {
  //     try {
  //       if (!booking_id) return
  //       const response = await axios.get(`${apiUrl}/booking-docPDFView/${booking_id}`)
  //       const count = response.data.files.length

  //       if (count > 0) {
  //         setAvilableimageCount(count)
  //       }
  //     }
  //     catch (err) {
  //       // console.log(err,"rtyuiopoih")
  //       // const errdata=err.response;
  //       // console.log(errdata,"weeee")
  //       // if(err.response.status === 404){
  //         setAvilableimageCount(0)
  //       // }
       
   
  //     }
  //   }
  //   getImageCount()
  // }, [file, triggerCount, apiUrl, booking_id,])

    //--------------------------------------------------------------

  const handlecheck = async (lastBookingno) => {
    if (sendEmail || sendmailguestsms) {
      const datamode = isEditMode ? selectedCustomerData.status || book.status || bookingStatus : bookingStatus || book.status
      try {
        const user = localStorage.getItem("username")
        const dataToSend = {
          guestname:
            formValues.guestname ||
            selectedCustomerData.guestname ||
            book.guestname ||
            formData.guestname,
          guestmobileno:
            formValues.guestmobileno ||
            selectedCustomerData.guestmobileno ||
            book.guestmobileno ||
            formData.guestmobileno,
          email: formValues.email || selectedCustomerData.email || book.email,
          pickup: formData.pickup || selectedCustomerData.pickup || formValues.pickup || book.pickup,
          useage: formData.useage || selectedCustomerData.useage || formValues.useage || book.useage,
          starttime: formValues.starttime || formData.starttime || selectedCustomerData.starttime || book.starttime || "",
          startdate: formValues.startdate || formData.startdate || selectedCustomerData.startdate || book.startdate || dayjs() || "",
          driverName: formData.driverName || selectedCustomerData.driverName || book.driverName || selectedCustomerdriver.driverName,
          vehicleName: formData.vehicleName || selectedCustomerData.vehicleName || book.vehicleName || selectedCustomerdriver.vehicleName,
          mobileNo: formData.mobileNo || selectedCustomerData.mobileNo || book.mobileNo || selectedCustomerdriver.mobileNo,
          vehRegNo: formData.vehRegNo || selectedCustomerData.vehRegNo || book.vehRegNo || selectedCustomerdriver.vehRegNo,
          tripid: formData.tripid || selectedCustomerData.tripid || book.tripid,
          servicestation: formData.servicestation || selectedCustomerData.servicestation || book.servicestation || selectedCustomerDatas.servicestation,
          requestno: formData.registerno || selectedCustomerData.registerno || book.registerno || "",
          duty: formData.duty || selectedCustomerData.duty || book.duty || "",
          bookingno: lastBookingno || '',
          customeremail: formData.orderByEmail || selectedCustomerData.orderByEmail || selectedCustomerDatas.orderByEmail || book.orderByEmail || "",
          username: user,
          Address: formData.address1 || selectedCustomerData.address1 || book.address1 || "",
          status: datamode,
          escort:formData.escort || selectedCustomerData.escort || book.escort || "No",
          transferreport:formData.transferreport || selectedCustomerData.transferreport || book.transferreport || "No",
          Sendmailauth: organistaionsendmail.Sender_Mail,
          Mailauthpass: organistaionsendmail.EmailApp_Password
        };

        await axios.post(`${apiUrl}/send-email`, dataToSend);
        setSuccess(true);
        setSuccessMessage("Mail Sent Successfully");
      } catch (error) {
        // console.log(error)
        setError(true);
        setErrorMessage("An error occured while sending mail");
      }
    } 
    else {
      setError(true);
      setErrorMessage("Send mail checkbox is not checked. Email not sent.");
    }
  };

  const [lastBookingNo, setLastBookingNo] = useState("");
  const reportdate = dayjs(book.startdate)
  const [imageDialogOpen, setImageDialogOpen] = useState(false)
  const [selectetImg, setSelectetImg] = useState([])
  // const removeSelectedImage = (index, e) => {
  //   e.preventDefault()
  //   setSelectetImg((prevImg) => prevImg?.filter((_, i) => i !== index))
  // }
  const handleImagechange2 = (e) => {
    // console.log(e,"isssssssssss")
    // console.log(e.target.files,"isetarget")
    const files = Array.from(e.target.files);
    setSelectetImg((prevImg) => [...prevImg, ...files]);
    // console.log(files,"filesdataaddnewimage")
    e.target.value = null
    
    // if (files.length > 0) {
    //   setImageDialogOpen(true);
    // }
  };
  // console.log(selectetImg,"selectimag lentgh")
  const handleCloseImageDialog = () => {
    setImageDialogOpen(false)
  }
  // console.log(selectetImg,"selectetImgdata")

  const handlebooklogDetails = async (updatebook, lastBookinglogno, modedata) => {
    const logupdatabookdetails = updatebook
    try {
      const updatedBooklogdetails = {
        bookingtime: logupdatabookdetails.bookingtime,
        bookingdate: logupdatabookdetails.bookingdate,
        starttime: formData.starttime || selectedCustomerData.starttime || book.starttime,
        status: logupdatabookdetails.status,
        guestname: logupdatabookdetails.guestname,
        guestmobileno: logupdatabookdetails.guestmobileno,
        address1: logupdatabookdetails.address1,
        vehicleName: logupdatabookdetails.vehicleName,
        startdate: logupdatabookdetails.startdate,
        duty: logupdatabookdetails.duty,
        useage: logupdatabookdetails.useage,
        travelsname: logupdatabookdetails.travelsname || null,
        vehRegNo: logupdatabookdetails.vehRegNo,
        customer: formData.customer || selectedCustomerData.customer || selectedCustomerDatas.customer || book.customer,
        Log_Date: dayjs().format("DD-MM-YYYY"),
        Log_Time: getCurrentTime(),
        mode: modedata,
        bookingno: lastBookinglogno,
        driverName: logupdatabookdetails.driverName,
        username: logupdatabookdetails.username,
        Escort:logupdatabookdetails.escort,
        Transferreport:logupdatabookdetails.transferreport

      };
      await axios.post(`${apiUrl}/bookinglogDetails`, updatedBooklogdetails)
    }
    catch (err) {
      setError(true);
      setErrorMessage("Failed To ADD BooklogDetails");
      // console.log(err, "err")
    }
  }

  const handlebookdeletebookingdoc = async (lastBookinglogno) => {
    try{
      await axios.delete(`${apiUrl}/bookingDLETEUPLOAD/${lastBookinglogno}`);
    }
    catch (err) {
    
      console.log(err, "err")
    }
  }
  //------------------------------------------------------
  
  const customerdatatimetoggle = useMemo(() => {
    return (
        formData.customer ||
        selectedCustomerData.customer ||
        selectedCustomerDatas.customer || book.customer
    );
}, [formData.customer, selectedCustomerData.customer, selectedCustomerDatas.customer , book.customer]);

  const fetchdatacustomerhybrid = useCallback(async () => {
    if (customerdatatimetoggle) {
        try {
            const response = await axios.get(`${apiUrl}/customerratenamedata/${customerdatatimetoggle}`);
            const data = response.data;
            if (data.length > 0) {
                const res = data[0].hybrid;
                // console.log(data,"cust")
                setHybdriDatabooking(res)
                // Update state with the fetched result
            } else {
              setHybdriDatabooking(0)
            }
        } catch (error) {

            console.error('Error fetching customer data:', error);
            setHybdriDatabooking(0)
          
        }
    } else {
      setHybdriDatabooking(0)
 

    }
}, [apiUrl, customerdatatimetoggle]); // Memoize the fetch function based on these dependencies

// Use useEffect to trigger the fetch function only when necessary
useEffect(() => {
    fetchdatacustomerhybrid();
}, [fetchdatacustomerhybrid]);
// console.log(selectetImg,"imgggg")
// console.log(formData.vehiclemodule,selectedCustomerData.vehiclemodule,book.vehiclemodule,selectedCustomerdriver.vehiclemodule,"jss")
  const handleAdd = async () => {
 
  //  const guestmobilenodata = selectedCustomerData.guestmobileno || book.guestmobileno
   const servicestationdata = selectedCustomerData.servicestation || book.servicestation
   const duty = selectedCustomerData.duty || book.duty
   const customerdatas = selectedCustomerData.customer|| book.customer
   const starttime = selectedCustomerData.starttime || book.starttime
   const guestname = selectedCustomerData.guestname || book.guestname
   const reporttime = selectedCustomerData.reporttime || book.reporttime
   const bookaddress = selectedCustomerData.address1 || book.address1


    // if (!selectedCustomerData.guestmobileno) {
    //   setError(true);
    //   setErrorMessage("Enter Guest Mobile Number");
    //   return;
    // }

    
    // if (!selectedCustomerData.guestmobileno) {
    //   setError(true);
    //   setErrorMessage("Enter Guest Mobile Number");
    //   return;
    // }
    // if (!selectedCustomerData.servicestation) {
    //   setError(true);
    //   setErrorMessage("Enter Station");
    //   return;
    // }
    // if (!reportdate) {
    //   setError(true);
    //   setErrorMessage("Enter Report Date");
    //   return;
    // }
    // if (!selectedCustomerData.customer) {
    //   setError(true)
    //   setErrorMessage("Enter Customer Name")
    //   return
    // }
    // if (!selectedCustomerData.starttime) {
    //   setError(true)
    //   setErrorMessage("Enter starting Time")
    //   return
    // }
   
    // if (!selectedCustomerData.guestname) {
    //   setError(true)
    //   setErrorMessage("Enter GuestName")
    //   return
    // }
    // if (!selectedCustomerData.address1) {
    //   setError(true);
    //   setErrorMessage("Enter Address Details");
    //   return;
    // }

    if (!customerdatas) {
      setError(true)
      setErrorMessage("Enter Customer Name")
      return
    }    
    if (!servicestationdata) {
      setError(true);
      setErrorMessage("Enter Station");
      return;
    }
    if (!guestname) {
      setError(true)
      setErrorMessage("Enter Guest Name")
      return
    }
    // if (!guestmobilenodata) {
    //   setError(true);
    //   setErrorMessage("Enter Guest Mobile Number");
    //   return;
    // }
    if (!bookaddress) {
      setError(true);
      setErrorMessage("Enter Address Details");
      return;
    }
    if (!duty) {
      setError(true);
      setErrorMessage("Enter Duty ");
      return;
    }
    if (!reporttime) {
      setError(true);
      setErrorMessage("Enter Shed Out Time");
      return;
    }
    if (!starttime) {
      setError(true)
      setErrorMessage("Enter Report Time")
      return
    }
    if (hybdridatabooking && selectetImg.length === 0 ) {
      setError(true);
      setErrorMessage("Attach the file");
      return;
    }

    try {
      setisAddbtnload(true)
      setDatatrigger(!datatrigger)
      const selectedBookingDate = dayjs().format("YYYY-MM-DD");
      const bookingstartdate = selectedCustomerData.startdate || formData.startdate || book.startdate || dayjs();
      const bookingstartdate1 = dayjs(bookingstartdate).format("YYYY-MM-DD");
      const bookingshedoutdata = selectedCustomerData.shedOutDate || formData.shedOutDate || book.shedOutDate || dayjs();
      const bookingshedoutdata1 = dayjs(bookingshedoutdata).format("YYYY-MM-DD");

      // Create a new object without the 'id' field from selectedCustomerData
      const { id, ...restSelectedCustomerData } = selectedCustomerData;

      const updatedBook = {
        bookingtime: getCurrentTime(),
        bookingdate: selectedBookingDate,
        starttime: restSelectedCustomerData.starttime || book.starttime,
        status: bookingStatus,
        mobile: selectedCustomerDatas.phoneno || selectedCustomerData.mobile,
        guestname: selectedCustomerData.guestname || formData.guestname || book.guestname || formValues.guestname,
        guestmobileno: formData.guestmobileno || selectedCustomerData.guestmobileno || formValues.guestmobileno || book.guestmobileno,
        email: formData.email || selectedCustomerData.email || formValues.email || book.email,
        employeeno: formData.employeeno || selectedCustomerData.employeeno || book.employeeno,
        address1: formData.address1 || selectedCustomerData.address1 || book.address1,
        report: formData.report || selectedCustomerData.report || book.report,
        vehicleName: formData.vehicleName || selectedCustomerData.vehicleName || book.vehicleName || selectedCustomerdriver.vehicleName,
        paymenttype: formData.paymenttype || selectedCustomerData.paymenttype || book.paymenttype,
        // startdate: bookingstartdate,
        // shedOutDate: bookingshedoutdata,
        startdate: bookingstartdate1,
        shedOutDate: bookingshedoutdata1,
        orderedby: book.orderedby || selectedCustomerData.orderedby || selectedCustomerDatas.orderedby || formData.orderedby,
        orderByMobileNo: book.orderByMobileNo || selectedCustomerData.orderByMobileNo || selectedCustomerDatas.orderByMobileNo || formData.orderByMobileNo || book.mobile,
        orderByEmail: book.orderByEmail || selectedCustomerData.orderByEmail || selectedCustomerDatas.orderByEmail || formData.orderByEmail ||book.orderbyemail ,
        duty: formData.duty || selectedCustomerData.duty || book.duty,
        pickup: formData.pickup || selectedCustomerData.pickup || formValues.pickup || book.pickup,
        customercode: formData.customercode || selectedCustomerData.customercode || book.customercode,
        useage: formData.useage || selectedCustomerData.useage || formValues.useage || book.useage,
        registerno: formData.registerno || selectedCustomerData.registerno || book.registerno,
        flightno: formData.flightno || selectedCustomerData.flightno || book.flightno,
        remarks: formData.remarks || selectedCustomerData.remarks || book.remarks,
        servicestation: formData.servicestation || selectedCustomerData.servicestation || book.servicestation || selectedCustomerDatas.servicestation,
        advance: formData.advance || selectedCustomerData.advance || book.advance,
        hireTypes: formData.hireTypes || selectedCustomerData.hireTypes || book.hireTypes || selectedCustomerdriver.hireTypes,
        travelsname: formData.travelsname || selectedCustomerData.travelsname || book.travelsname,
        vehRegNo: formData.vehRegNo || selectedCustomerData.vehRegNo || book.vehRegNo || selectedCustomerdriver.vehRegNo,
        vehiclemodule: formData.vehiclemodule || selectedCustomerData.vehiclemodule || book.vehiclemodule || selectedCustomerdriver.vehiclemodule ||"A/C",
        driverName: formData.driverName || selectedCustomerData.driverName || book.driverName || selectedCustomerdriver.driverName,
        mobileNo: formData.mobileNo || selectedCustomerData.mobileNo || book.mobileNo || selectedCustomerdriver.mobileNo,
        travelsemail: formData.travelsemail || selectedCustomerData.travelsemail || book.travelsemail,
        reporttime: restSelectedCustomerData.reporttime || book.reporttime,
        ratenamebook: ratename,
        username: storedUsername,
        Groups: selectedCustomerData.Groups || book.Groups || formData.Groups || selectedCustomerdriver.Groups,
        customer: restSelectedCustomerData.customer || book.customer,
        escort:formData.escort || selectedCustomerData.escort || book.escort || escort,
        transferreport:formData.transferreport || selectedCustomerData.transferreport || book.transferreport || transferreport,
        hybridhcldata:hybdridatabooking,
        messageedited:messagedited,
        MessageText:formData.MessageText || selectedCustomerData.MessageText || book.MessageText

      };
      // console.log(updatedBook,"pppp")

      setSendmailGuestsms(true)
      await axios.post(`${apiUrl}/booking`, updatedBook);
      const response = await axios.get(`${apiUrl}/last-booking-no`);
      const lastBookingno = response.data.bookingno;

      //image upload
      await Promise.all(selectetImg?.map(async (img) => {
        const createddata = dayjs().format('YYYY-MM-DD')
        const formImageData = new FormData();
        formImageData.append('file', img);
        formImageData.append('bookingId', lastBookingno)
        formImageData.append("created_at", createddata);
        await axios.post(`${apiUrl}/upload-booking-image`, formImageData)
      }))
      handlebooklogDetails(updatedBook, lastBookingno, "create")
      setImagedata([])
      setLastBookingNo(lastBookingno);
      setPopupOpen(true);
      handleCancel();
      setRowsdriver([])
      setRow([]);
      setRows([]);
      setSuccess(true);
      setisAddbtnload(false)
      setSuccessMessage("Successfully Added");
      handlecheck(lastBookingno);
      setEdit(false)
    } 
    // catch (error) {
    //   // const errdata=error.response;
    //   // if(errdata.status === 404){
    //     setError(true);
    //     setErrorMessage("Failed to Add Booking Data");
        
    
    // }
    catch (error) {
      // console.error("Error occurredddddd:", error);
   
      // Check if there's no response, indicating a network error
      if (error.message ) {
          setError(true);
          setErrorMessage("Check your Network Connection");
          // console.log('Network error');
      } else if (error.response) {
          setError(true);
          // Handle other Axios errors (like 4xx or 5xx responses)
          setErrorMessage("Failed to add : " + (error.response.data.message || error.message));
      } else {
          // Fallback for other errors
          setError(true);
          setErrorMessage("An unexpected error occurred: " + error.message);
      }
  }
  };

  const handleEdit = async (userid) => {

    
if (Object.keys(nochangedata).length === 0) {
  // console.error("Error: Data not changed");
  setError(true);
  setErrorMessage("Nothing To Change");
  return
}
    
    try {
      setisEditbtnload(true)
      const selectedCustomer = rows.find(
        (row) =>
          row.bookingno === selectedCustomerData.bookingno ||
          formData.bookingno
      );

      const selectedBookingDate = selectedCustomerData.bookingdate || formData.bookingdate || book.bookingdate || dayjs();
      const selectedbookingtime = selectedCustomerData.bookingtime || formData.bookingtime || book.bookingtime || getCurrentTime();
      const bookingstartdate = selectedCustomerData.startdate || formData.startdate || book.startdate || dayjs();
      const bookingshedoutdata = selectedCustomerData.shedOutDate || formData.shedOutDate || book.shedOutDate || dayjs();
      const bookingstartdate1 = dayjs(bookingstartdate).format("YYYY-MM-DD");
      const bookingshedoutdata1 = dayjs(bookingshedoutdata).format("YYYY-MM-DD");
      
      const { id, ...restSelectedCustomerData } = selectedCustomerData;
      const updatedCustomer = {
        ...selectedCustomer,
        bookingtime: selectedbookingtime,
        bookingdate: selectedBookingDate,
        starttime: restSelectedCustomerData.starttime,
        status: bookingStatus,
        mobile: selectedCustomerDatas.phoneno || selectedCustomerData.mobile,
        guestname: selectedCustomerData.guestname || formData.guestname || book.guestname || formValues.guestname,
        guestmobileno: formData.guestmobileno || selectedCustomerData.guestmobileno || formValues.guestmobileno || book.guestmobileno,
        email: formData.email || selectedCustomerData.email || formValues.email || book.email,
        employeeno: formData.employeeno || selectedCustomerData.employeeno || book.employeeno,
        address1: formData.address1 || selectedCustomerData.address1 || book.address1,
        report: formData.report || selectedCustomerData.report || book.report,
        vehicleName: formData.vehicleName || selectedCustomerData.vehicleName || book.vehicleName || selectedCustomerdriver.vehicleName,
        paymenttype: formData.paymenttype || selectedCustomerData.paymenttype || book.paymenttype,
        // shedOutDate: bookingshedoutdata,
        // startdate: bookingstartdate,
        shedOutDate: bookingshedoutdata1,
        startdate: bookingstartdate1,
        orderedby: book.orderedby || selectedCustomerData.orderedby || selectedCustomerDatas.orderedby || formData.orderedby,
        orderByMobileNo: book.orderByMobileNo || selectedCustomerData.orderByMobileNo || selectedCustomerDatas.orderByMobileNo || formData.orderByMobileNo,
        orderByEmail: book.orderByEmail || book.orderbyemail ||
        formData.orderByemail ||
        selectedCustomerData.orderByEmail ||
        selectedCustomerDatas.orderByEmail,
        duty: formData.duty || selectedCustomerData.duty || book.duty,
        pickup: formData.pickup || selectedCustomerData.pickup || formValues.pickup || book.pickup,
        customercode: formData.customercode || selectedCustomerData.customercode || book.customercode,
        useage: formData.useage || selectedCustomerData.useage || formValues.useage || book.useage,
        registerno: formData.registerno || selectedCustomerData.registerno || book.registerno,
        flightno: formData.flightno || selectedCustomerData.flightno || book.flightno,
        remarks: formData.remarks || selectedCustomerData.remarks || book.remarks,
        servicestation: formData.servicestation || selectedCustomerData.servicestation || book.servicestation || selectedCustomerDatas.servicestation || "",
        advance: formData.advance || selectedCustomerData.advance || book.advance,
        hireTypes: formData.hireTypes || selectedCustomerData.hireTypes || book.hireTypes || selectedCustomerdriver.hireTypes,
        travelsname: formData.travelsname || selectedCustomerData.travelsname || book.travelsname,
        vehRegNo: formData.vehRegNo || selectedCustomerData.vehRegNo || book.vehRegNo || selectedCustomerdriver.vehRegNo,
        vehiclemodule: formData.vehiclemodule || selectedCustomerData.vehiclemodule || book.vehiclemodule || selectedCustomerdriver.vehiclemodule ||"A/C",
        driverName: formData.driverName || selectedCustomerData.driverName || book.driverName || selectedCustomerdriver.driverName,
        mobileNo: formData.mobileNo || selectedCustomerData.mobileNo || book.mobileNo || selectedCustomerdriver.mobileNo,
        travelsemail: formData.travelsemail || selectedCustomerData.travelsemail || book.travelsemail,
        ratenamebook: ratename,
        reporttime: restSelectedCustomerData.reporttime,
        username: storedUsername,
        Groups: formData.Groups || selectedCustomerData.Groups || book.Groups || selectedCustomerdriver.Groups,
        customer: restSelectedCustomerData.customer,
        escort:formData.escort || selectedCustomerData.escort || book.escort,
        transferreport:formData.transferreport || selectedCustomerData.transferreport || book.transferreport,
        hybridhcldata:hybdridatabooking,
        messageedited:messagedited,
        MessageText:formData.MessageText || selectedCustomerData.MessageText || book.MessageText
      };

      const editbookno = book.bookingno || selectedCustomerData.bookingno || formData.bookingno
      const response = await axios.put(`${apiUrl}/booking/${book.bookingno || selectedCustomerData.bookingno || formData.bookingno}/${datachangeAdmin}`,
        updatedCustomer
      )
      handlebooklogDetails(updatedCustomer, editbookno, "Edited")
      if (response.data.success) {
        if (response.status === 201) {
          setSuccess(true);
          setSuccessMessage(response.data.message);
          setisEditbtnload(false)
          if (sendEmail) {
            handlecheck(editbookno);
          }
        } else {
          setInfo(true);
          setInfoMessage(response.data.message);
          setisEditbtnload(false)
        }
        setEdit(false)

      }
      setRow([]);
      setRowsdriver([])
      setRows([]);
      handleCancel();
      setSendEmail(true)
    } catch (error) {
      // console.error("An error occurred:", error);
      setError(true);
      setErrorMessage("Failed to Edit Booking Data");
    }
  };

  const handleClick = async (event, actionName) => {
    event.preventDefault();
    // try {

      if (actionName === "Cancel") {
        handleCancel();
        setRows([]);
        setRow([]);
        setRowsdriver([])
      } else if (actionName === "Delete") {
        const deletebookno = book.bookingno || selectedCustomerData.bookingno
        const response = await axios.delete(`${apiUrl}/booking/${book.bookingno || selectedCustomerData.bookingno}`);
        const updatedCustomer = { ...selectedCustomerData, ...book }
        if (response.data.success) {
          if (response.status === 201) {
            setSuccess(true);
            setSuccessMessage(response.data.message);
            handlebooklogDetails(updatedCustomer, deletebookno, "Delete")
            handlebookdeletebookingdoc(deletebookno)
            //  await axios.delete(`${apiUrl}/bookingDLETEUPLOAD/${book.bookingno || selectedCustomerData.bookingno}`);
            // handlebooklogDetails(updatedCustomer, deletebookno, "Delete")
          } else {
            setInfo(true);
            setInfoMessage(response.data.message)
          }
          setSelectedCustomerData(null);
          setFormData(null);
          handleCancel();
          setRow([]);
          setRows([]);
          setRowsdriver([])
        }
      } else if (actionName === "Edit") {
        setSendEmail(false)
        handleEdit()
      } else if (actionName === "Add") {
        handleAdd();
      }
    } 
    
    // catch (error) {
    //   console.error("An error occurred:", error);
    //   setError(true);
    //   setErrorMessage("Check Network Connection");
    // }
  // };


  // console.log(isEditbtnload,"load")

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setTriggerCount(prev => !prev)
      const loginUserName = await localStorage.getItem("username")
      
      try {
        // const response = await axios.get(
        //   `${apiUrl}/booking/${event.target.value}`
        // );
        const response = await axios.get(
          `${apiUrl}/booking/${event.target.value}`,{ params: { loginUserName } } );
        const bookingDetails = response.data;
        console.log(bookingDetails,"mmmmmmmmmmmmmmmmmmm")
        setSelectedCustomerData(bookingDetails);
        setSelectedCustomerId(bookingDetails.tripid);
        setBookingStatus(bookingDetails?.status);
        setMessageEditedBefore(bookingDetails?.messageedited)
        setMessageEdited(bookingDetails?.messageedited)
        setIsEditMode(true);
        setEdit(true);
        setSendEmail(false);
        setDatatrigger(!datatrigger);
        // setAvilableimageCount(bookingDetails.count)
      } 
      catch (error) {
        if (error.response && error.response.status === 404) {
            setError(true);
            setErrorMessage(`${error.response.data.error}`);
        } else {
            setError(true);
            // setErrorMessage("Failed to fetch data");
            setErrorMessage("Check your Network Connection");
        }
    }
      
      // catch(err) {

     
      //     setError(true);
      //       setErrorMessage("Booking Not Found");
   
  
  }
  };

  const [currentYear, setCurrentYear] = useState("");
  useEffect(() => {
    const current = new Date().getFullYear();
    const pastYear = current - 1;
    const value = `JESSY CABS ${pastYear}-${current}`;
    setCurrentYear(value);
  }, []);

  // const [enterPressCount, setEnterPressCount] = useState(0);

  // const handleKeyEnter = useCallback(
  //   async (event) => {
  //     if (event.key === "Enter") {
  //       event.preventDefault();
  //       if (enterPressCount === 0) {
  //         try {
  //           const response = await axios.get(
  //             `${apiUrl}/name-customers/${event.target.value}`
  //           );
  //           const vehicleData = response.data;

  //           setRows([vehicleData]);
  //         } catch (error) {
  //           setError(true);
  //           setErrorMessage("Error retrieving vehicle details.");
  //         }
  //       } else if (enterPressCount === 1) {
  //         const selectedRow = rows[0];
  //         if (selectedRow) {
  //           setSelectedCustomerDatas(selectedRow);
  //           handleChange({
  //             target: { name: "customer", value: selectedRow.customer },
  //           });
  //         }
  //       }
  //       setEnterPressCount((prevCount) => prevCount + 1);
  //     }
  //     if (event.target.value === "") {
  //       setEnterPressCount(0);
  //     }
  //   },
  //   [handleChange, rows, enterPressCount, apiUrl]
  // );

  // const handleKeyEnterdriver = async (event) => {
  //   if (event.key === "Enter") {
  //     event.preventDefault();
  //     try {
  //       setRowsdriver([])
  //       const response = await axios.get(
  //         `${apiUrl}/drivername-detailsaccountbooking/${event.target.value}`
  //       );
  //       const vehicleData = response.data;
  //       setRowsdriver(vehicleData)
  //       setSuccess(true);
  //       setSuccessMessage("successfully listed");

  //     } catch (error) {
  //       setError(true);
  //       setErrorMessage("Error retrieving vehicle details.");
  //     }
  //   }
  // }
  const handleRowClick = useCallback(
    (params) => {
      setSelectedCustomerDatas(params);
      handleChange({ target: { name: "customer", value: params.customer } });
    },
    [handleChange]
  );
  const handleRowClickdriver = (params) => {
    setSelectedCustomerdriver(params);
    setRate_name(params.rateType);
    const keys = Object.keys(params);
    // Iterate over the keys using forEach
    keys.forEach(key => {
      const value = params[key];
      if (key !== 'address1') {
        handleChange({ target: { name: key, value: value } });
      }
    });
  }

  useEffect(() => {
    if (user && user.username) {
      const username = user.username;
      localStorage.setItem("username", username);
    }
  }, [user]);
  // const storedUsername = localStorage.getItem("username");
  const [dialogdeleteOpen, setDialogdeleteOpen] = useState(false);
  const handleClosedeleteDialog = () => {
    setDialogdeleteOpen(false);
  };
  const [imagedata, setImagedata] = useState(null);
  const handleContextMenu = () => {
    axios.delete(`${apiUrl}/booking_doc-delete/` + imagedata + "/" + booking_id)
      .then((res) => {
        if (res.data.success) {
          setTriggerCount(prev => !prev)
          setDialogdeleteOpen(false);
          setDialogOpen(false);
          setImagedata([]);
          setDeleteFile([]);
          setSelectAll(false);
          setNoChangeData((prevValues) => ({
            ...prevValues,
            ["deleteimage"]: "yesdeleted",
          }));
        }
      })
      .catch((err) => {
        console.log("Error:", err);
      });
    setDialogdeleteOpen(false);
    setDialogOpen(false);
  };
  //-----------------------------------------------------

  const [selectAll, setSelectAll] = useState(false);
  const handleSelectAll = () => {
    if (selectAll) {
      setDeleteFile([]);
    } else {
      const allFiles = allFile.map(img => img.path);
      setDeleteFile(allFiles);
      setSelectAll(false)
    }
    setSelectAll(prevState => !prevState);
  };
 

  const handlecheckbox = (fileName) => {
    if (deletefile.includes(fileName)) {
      setDeleteFile(prevDeleteFile => prevDeleteFile.filter(file => file !== fileName));
    } else {
      setDeleteFile(prevDeleteFile => [...prevDeleteFile, fileName]);
    }
  };

  // const handlecheckbox1 = (fileName) => {
  //   if (deletefile.includes(fileName)) {
  //     setDeleteFile(prevDeleteFile => prevDeleteFile.filter(file => file !== fileName));
  //   } else {
  //     setDeleteFile(prevDeleteFile => [...prevDeleteFile, fileName]);
  //   }
  // };

  const handlecheckbox1 = (e) => {
    console.log(e,"ee")
    // e.preventDefault()
      // if (deletefile.includes(e)) {
        if (deletefiledata.includes(e)) {
      setDeleteFiledata(prevDeleteFile => prevDeleteFile.filter(file => file !== e));
    } else {
      setDeleteFiledata(prevDeleteFile => [...prevDeleteFile,e]);
    }
    // setSelectetImg((prevImg) => prevImg?.filter((_, i) => i !== index))
  }
  // console.log(deletefiledata,"deletefile")

  const handleimagedeletewithouttripid =(deletefiledata1) => {
    if (deletefiledata1.length > 0) {
      // const updatedSelectedImg = selectedImg.filter(file => file.name !== nameToRemove);
      // setSelectetImg((prevFileNames) => prevFileNames.filter(file => file.name !== nameToRemove));
      setSelectetImg((prevFileNames) =>
        prevFileNames.filter(file => !deletefiledata1.includes(file.name))
      );

      // setDialogdeleteOpen(true);
      setDialogOpenTrail(true)
      setDeleteFiledata([]);
    }
  };
  // console.log(deletefile,"deletefile")
  // console.log(selectetImg,"selecetdimg")

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

  useEffect(() => {
    const fetchdataccountinfodata = async () => {
      try {
        const response = await axios.get(`${apiUrl}/tripaccounttravelname`)
        const data = response.data
        setAccountInfoData(data)

      }
      catch (err) {
        console.log(err)
      }
    }
    fetchdataccountinfodata()
  }, [apiUrl])

  const travelsdatafetch = async (travelsnamedata) => {
    try {
      const response = await axios.get(`${apiUrl}/travelsnamedetailfetchbooking/${travelsnamedata}`)
      const data = response.data
      setRowsdriver(data)
      setSuccess(true);
      setSuccessMessage("successfully listed");

    } catch (error) {
   
          setError(true);
            setErrorMessage("Travles Data Not Found");
        
    
    
    
  }
  }

  const handletravelsAutocompleteChange = (event, value, name) => {
    const selectedOption = value ? value.label : '';

    setBook(prevState => ({
      ...prevState,
      [name]: selectedOption
    }));

    setSelectedCustomerData((prevData) => ({
      ...prevData,
      [name]: selectedOption,
    }));
    setFormData((prevData) => ({
      ...prevData,
      [name]: selectedOption,
    }));
    setNoChangeData((prevValues) => ({
      ...prevValues,
      [name]: selectedOption,
    }));
    
    travelsdatafetch(selectedOption)
  };


  const handleMessageData  = ()=>{
    setDialogMessage(true)
  }
  const handleCloseMessage = ()=>{
    setDialogMessage(false)
  }
  //--------------------------------------------------------

  return {
    handleSelectAll, handlecheckbox, selectAll, deletefile,
    selectedCustomerData,
    selectedCustomerId,
    rows,
    row,
    actionName,
    error,
    success,
    info,
    successMessage,
    errorMessage,
    book,
    handleClick,
    handleChange,
    handleRowClick,
    handleAdd,
    hidePopup,
    formData,
    vechiledata,
    setVehicleData,
    handleKeyDown,
    handleDateChange,
    getCurrentTime,
    setBook,
    handleVehicleChange,
    setSelectedCustomerData,
    selectedCustomerDatas,
    // handleKeyEnter,
    formValues,
    handleAutocompleteChange,
    setFormData,
    setStartTime,
    popupOpenmail,
    sendEmail,
    setSendEmail,
    currentYear,
    searchText,
    setSearchText,
    lastBookingNo,
    setreporttime,
    storedUsername,
    fromDate,
    popupOpen,
    handlePopupClose,
    setFromDate,
    toDate,
    setToDate,
    setFile,
    dialogOpen,
    handleCloseDialog,
    allFile,
    handleDriverChange,
    handleButtonClick,
    isEditMode,
    handleEdit,
    handleContextMenu,
    handleimagedelete,
    handleClosedeleteDialog,
    dialogdeleteOpen,
    setErrorMessage,
    setError,
    drivername,
    setDrivername,
    edit,
    setEdit,
    reporttime,
    starttime,
    // handleKeyEnterdriver,
     orderByDropDown,
    rowdriver,
    handleRowClickdriver,
    selectedCustomerdriver, handleChangeFile, AvilableimageCount, bookingStatus, setBookingStatus, handletravelsAutocompleteChange, accountinfodata,
    vehileName, infoMessage, handleImagechange2, selectetImg,handleimagedeletewithouttripid,deletefiledata,
    //  removeSelectedImage,
     imageDialogOpen, handleCloseImageDialog, setImageDialogOpen, CopyEmail, setCopyEmail, setWarning, setWarningMessage, warningMessage, warning,
    // handleBookEscortChange,
    // handleAirportTransferChange,
    transferreport,setTransferreport,escort,setEscort,setNoChangeData,nochangedata,handleCloseMessage,dialogmessage,handleMessageData,messagedited,messageditedbefore,
    isAddbtnload,setisAddbtnload,isEditbtnload,setisEditbtnload,handleButtonClickwithouttripid,dialogOpentrail,handleCloseDialogtrail,handlecheckbox1,handleChangetext
  };
};
export default useBooking;



