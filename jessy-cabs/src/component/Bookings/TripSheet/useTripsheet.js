import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import {
    VehicleRate,
} from "./TripSheetdata";
import { APIURL } from "../../url";
import { Button } from '@mui/material';


const useTripsheet = () => {
    const apiUrl = APIURL;
    const [selectedCustomerData, setSelectedCustomerData] = useState({}); //------------
    const [selectedCustomerDatas, setSelectedCustomerDatas] = useState({
        vehType: '',
        driverName: '',
        vehRegNo: '',
        mobileNo: '',
    });
    const [selectedCustomerId, setSelectedCustomerId] = useState({});

    const [rows, setRows] = useState([]);
    const [row, setRow] = useState([]);
    const [starttime, setStartTime] = useState('');
    const [closetime, setCloseTime] = useState('');
    const [reporttime, setreporttime] = useState('');
    const [shedintime, setshedintime] = useState('');
    const [starttime2, setStartTime2] = useState('');
    const [closetime2, setCloseTime2] = useState('');

    const [formData, setFormData] = useState({});  ////-------------
    const [calcCheck, setCalcCheck] = useState(false);

    const location = useLocation();
    const [error, setError] = useState(false);
    const [shedKilometers, setShedKilometers] = useState('');
    const [additionalTime, setAdditionalTime] = useState('');
    const [success, setSuccess] = useState(false);
    const [info, setInfo] = useState(false);
    const [warning, setWarning] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [popupOpen, setPopupOpen] = useState(false);
    const [imgpopupOpen, setimgPopupOpen] = useState(false);
    const [mapimgpopupOpen, setMapimgPopupOpen] = useState(false);
    const [maplogimgpopupOpen, setMaplogimgPopupOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [warningMessage] = useState({});
    const [link, setLink] = useState('');
    const [isSignatureSubmitted] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [sign, setSign] = useState(false)
    const [smsguest, setSmsGuest] = useState(true);
    const [DriverSMS, setDriverSMS] = useState(true);
    const [sendEmail, setSendEmail] = useState(true);
    const [organizationdata, setorganizationData] = useState('');
    const [triggerdata, setTriggerData] = useState(true)

    const [signaturepopup, setSignaturepopup] = useState(false)
    const [signatureupload, setSignatureupload] = useState(false)



    //-------------------------calc-------------------

    let [calcPackage, setcalcPackage] = useState('')
    let [extraHR, setExtraHR] = useState('')
    let [extraKM, setExtraKM] = useState('')
    let [package_amount, setpackage_amount] = useState('')
    let [extrakm_amount, setextrakm_amount] = useState('')
    let [extrahr_amount, setextrahr_amount] = useState('')
    let [ex_kmAmount, setEx_kmAmount] = useState('')
    let [ex_hrAmount, setEx_HrAmount] = useState('')

    let [minHour, setMinHour] = useState()
    let [minKM, setMinKM] = useState()

    // nighht value --------------------
    let [nightBta, setNightBeta] = useState('')
    let [nightCount, setNightCount] = useState('')
    let [night_totalAmount, setnight_totalAmount] = useState('')


    //driver convinence --------------------------
    let [driverBeta, setdriverBeta] = useState('')
    let [driverbeta_Count, setdriverbeta_Count] = useState('')
    let [driverBeta_amount, setdriverBeta_amount] = useState(0)

    //--------------------------------------------------------------

    const [packageData, setPackageData] = useState({
        customer: '',
        vehType: '',
        duty: '',
        totalkm1: '',
        totaltime: '',
    });
    const [packageDetails, setPackageDetails] = useState({
        KMS: '',
        Hours: '',
        duty: '',
    });

    // ----------------------------------------vendorinfo-------------------
    const [lockdata, setLockData] = useState(false)
    const [vendorinfo, setVendorinfodata] = useState({
        vehicleName: '',

        // duty:"",
        vendor_ratename: "",
        vendor_vehicle: "",
        vendor_duty: "",
        vendorshedOutDate: "",
        vendorshedInDate: "",
        vendortotaldays: "",
        vendorreporttime: "",
        vendorshedintime: "",
        vendorTotaltime: "",
        vendorshedoutkm: "",
        vendorshedinkm: "",
        vendortotalkm: "",
        vendorRemarks: "",

    })

    const [vendorbilldata, setVendorbilldata] = useState({
        Vendor_Calcpackage: "",
        Vendor_KMS: "",
        Vendor_Hours: "",
        Vendor_rateAmount: "",
        Vendor_ExtraKms: "",
        Vendor_ExtraHours: "",
        Vendor_ExtraAmountKms: "",
        Vendor_ExtraAmountHours: "",
        Vendor_Bata: "",
        Vendor_NightHALT: "",
        Vendor_totalAmountKms: "",
        Vendor_totalAmountHours: "",
        Vendor_NightBataAmount: "",
        Vendor_NightbataTotalAmount: "",
        Vendor_BataAmount: "",
        Vendor_BataTotalAmount: "",
        Vendor_FULLTotalAmount: "",
    })
    const [vendorpassvalue, setVendorpassvalue] = useState({})
    const [vendornightdatatotalAmount, setVendorNightbhatatotalAmount] = useState('')
    const [vendorExtrahrTotalAmount, setVendorExtrahrTotaldataAmount] = useState('')
    const [vendorExtarkmTotalAmount, setVendorExtraKmTotalAmount] = useState('')

    const [escort, setEscort] = useState('No');
    const [transferreport, setTransferreport] = useState('No')
    const [accountinfodata, setAccountInfoData] = useState([])
    const [ratename, setRate_name] = useState("")
    const [signaturelinkcopy, setSignaturtCopied] = useState(false)
    const [rowsignature, setRowsSignature] = useState([])
    const [signaturelinkwhatsapp,setSignatureWhattsapplink]=useState()



    const maplogcolumns = [
        { field: "id", headerName: "Sno", width: 70 },
        { field: "tripid", headerName: "TripSheet No", width: 130 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 130,
            renderCell: (params) => (
                <Button
                    onClick={() => handleRemoveMapLogPoint(params)}
                    aria-label="open-dialog"
                >
                    <Button variant="contained" color="primary">
                        Remove
                    </Button>
                </Button>
            ),
        },
        { field: "date", headerName: "Trip Date", width: 160 },
        { field: "time", headerName: "Trip Time", width: 130 },
        { field: "trip_type", headerName: "Trip Type", width: 160 },
        { field: "place_name", headerName: "Place Name", width: 600 },

    ];



    const handleRemoveMapLogPoint = async (params) => {
        try {
            const id = params.id
            const resdata = await axios.delete(`${apiUrl}/dlete-mapLocationPoint/${id}`)
            if (resdata.status === 200) {
                handleTripmaplogClick()
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    const handleButtonClick = () => {
        const tripid = book.tripid || selectedCustomerData.tripid || selectedCustomerDatas.tripid || formData.tripid;
        if (!tripid) {
            setError(true);
            setErrorMessage("Please enter the tripid");
        } else {
            localStorage.setItem('selectedTripid', tripid);
            const newTab = window.open('/navigationmap', '_blank', 'noopener,noreferrer');
            if (newTab) {
                newTab.focus();
            } else {
            }
        }
    };

    //generate link

    const generateLink = async () => {
        try {
            const tripidNO = book.tripid || selectedCustomerData.tripid || selectedCustomerDatas.tripid || formData.tripid;
            if (!tripidNO) {
                setError(true);
                setErrorMessage("Please enter the tripid");
                return;
            }
            const tripid = selectedCustomerData.tripid || formData.tripid || book.tripid;
            const response = await axios.post(`${apiUrl}/generate-link/${tripid}`)
            const data = response.data.link
            setLink(data);
            getSignatureImage()
            // copyToClipboardf(data)
        } catch {
        }
    };


    const SignPage = async (event) => {
        event.preventDefault();
        if (link) {
            try {
                await navigator.clipboard.writeText(link);
                setSign(true);
                setTimeout(() => {
                    setSign(false);
                }, 2000);
            } catch (error) {
                console.error("Failed to copy text:", error);
                alert("Failed to copy text to clipboard. Please try again.");
            }
        } else {
            alert("No link data available.");
        }
    }
    // -----------------accountinfo--------------------------------
    useEffect(() => {
        const fetchdataccountinfodata = async () => {
            try {
                const response = await axios.get(`${apiUrl}/tripaccounttravelname`)
                const data = response.data
                // console.log(data, "accccccccc")
                setAccountInfoData(data)

            }
            catch (err) {
                console.log(err)
            }
        }
        fetchdataccountinfodata()
    }, [apiUrl])





    //---------------------------to copy the link-------------------

    const hiddenInputRef = useRef(null);

    const hiddenTextAreaRef = useRef(null);

    const copyToClipboard = (e) => {
        e.preventDefault()
        if (link) {
            // Create a hidden textarea and append it to the body
            const textArea = document.createElement("textarea");
            textArea.value = link;
            document.body.appendChild(textArea);

            // Select the text in the textarea
            textArea.select();
            textArea.setSelectionRange(0, 99999); // For mobile devices

            // Execute the copy command
            document.execCommand('copy');

            // Remove the textarea from the document
            document.body.removeChild(textArea);

            // Set the confirmation message
            setSign(true);
            setTimeout(() => {
                setSign(false);
            }, 2000);
        } else {
            alert("No link data available.");
        }
    };


    const copyToClipboardf = (data) => {
        // e.preventDefault()
        if (data) {
            // Create a hidden textarea and append it to the body
            const textArea = document.createElement("textarea");
            textArea.value = data;
            document.body.appendChild(textArea);

            // Select the text in the textarea
            textArea.select();
            textArea.setSelectionRange(0, 99999); // For mobile devices

            // Execute the copy command
            document.execCommand('copy');

            // Remove the textarea from the document
            document.body.removeChild(textArea);

            // Set the confirmation message
            setSign(true);
            setTimeout(() => {
                setSign(false);
            }, 2000);
        } else {
            alert("No link data available.");
        }
    };


    //----------------------------------------------




    const handlePopupClose = () => {
        setPopupOpen(false);
    };

    const [mapimageUrls, setMapImageUrls] = useState([]);


    // map1
    const handleTripmapClick = async () => {
        try {
            const tripid = selectedRow?.tripid || book?.tripid || selectedCustomerData?.tripid || formData?.tripid;
            if (!tripid) {
                return;
            }
            const response = await fetch(`${apiUrl}/getmapimages/${tripid}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseData = await response.blob();
            // Assuming you want to display the image directly
            const imageUrl = URL.createObjectURL(responseData);
            setMapImageUrls(imageUrl);
            setMapimgPopupOpen(true);
        } catch {
        }
    };



    const handleTripmaplogClick = async () => {
        try {
            const tripid = selectedRow?.tripid || book?.tripid || selectedCustomerData?.tripid || formData?.tripid;
            if (!tripid) {
                setError(true);
                setErrorMessage("Please enter the tripid");
            } else {
                const response = await axios.get(`${apiUrl}/get-gmapdata/${tripid}`);
                const data = response.data;
                setRow(data);
                setMaplogimgPopupOpen(true);
            }
        } catch {
        }
    };

    //refresh button function
    const handleRefresh = async () => {
        const tripid = book.tripid || selectedCustomerData.tripid || formData.tripid;
        const bookingno = formData.bookingno || selectedCustomerData.bookingno || book.bookingno;
        try {
            if (!tripid) {
                setError(true);
                setErrorMessage("Please enter the tripid");
            } else {
                const response = await axios.get(`${apiUrl}/tripuploadcollect/${tripid}/${bookingno}`);
                const data = response.data;

                //sepration of data----------------------------
                let tripResults = [];
                let bookingResults = [];

                data?.map((item) => {
                    if (item.type === "tripResults") {
                        tripResults = item.data
                    } else if (item.type === "bookingResults") {
                        bookingResults = item.data
                    }
                })
                const bothData = [...tripResults, ...bookingResults]
                //------------------------

                if (bothData.length > 0) {
                    const rowsWithUniqueId = bothData.map((row, index) => ({
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
            }
        } catch {
        }
    };


    //list data in row
    const [imageUrl, setImageUrl] = useState('');
    const handleTripRowClick = (params) => {
        setSelectedRow(params.row);
        const encodedPath = encodeURIComponent(params.row.path);
        setimgPopupOpen(true);
        setImageUrl(`${apiUrl}/get-image/${encodedPath}`);
    };
    const handleimgPopupClose = () => {
        setimgPopupOpen(false);
        setMapimgPopupOpen(false);
        setMaplogimgPopupOpen(false);
    };
    const [formValues, setFormValues] = useState({
        guestname: '',
        guestmobileno: '',
        email: '',
        pickup: '',
        useage: '',
        hireTypes: '',
        department: '',
        vehType: '',
        vehRegNo: '',
        driverName: '',
        mobileNo: '',
        reporttime: '',
        startdate: '',
    });
    // const [sendEmail, setSendEmail] = useState(false);

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



    useEffect(() => {
        const params = new URLSearchParams(location.search);
        //calc---------------
        const calcPackage = params.get('calcPackage');
        const extraHR = params.get('extraHR');
        const extraKM = params.get('extraKM');
        const package_amount = params.get('package_amount');
        const extrakm_amount = params.get('extrakm_amount');
        const extrahr_amount = params.get('extrahr_amount');
        const ex_kmAmount = params.get('ex_kmAmount');
        const ex_hrAmount = params.get('ex_hrAmount');
        const nightBta = params.get('nightBta');
        const nightCount = params.get('nightCount');
        const night_totalAmount = params.get('night_totalAmount');
        const driverBeta = params.get('driverBeta');
        const driverbeta_Count = params.get('driverbeta_Count');
        const driverBeta_amount = params.get('driverBeta_amount');
        const totalcalcAmount = params.get('totalcalcAmount');

        const escort = params.get('escort') || "No";
        const tranreport = params.get('transferreport') || "No";
        setTransferreport(tranreport)
        setEscort(escort)
        //----------------------

        const formData = {};

        // const parameterKeys = [
        //     'dispatchcheck', 'vehType', 'travelsemail', "vehicleName", 'travelsname', 'tripid', 'bookingno', 'billingno', 'apps', 'status', 'customer', 'orderedby', 'mobile', 'guestname', 'guestmobileno', 'email', 'address1', 'streetno', 'city', 'hireTypes', 'department', 'vehRegNo', 'vehType', 'driverName', 'mobileNo', 'driversmsexbetta', 'gps', 'duty', 'pickup', 'useage', 'request', 'startdate', 'closedate', 'totaldays', 'employeeno', 'reporttime', 'starttime', 'closetime', 'shedintime', 'additionaltime', 'advancepaidtovendor', 'customercode', 'request', 'startkm', 'closekm', 'shedkm', 'shedin', 'shedout', 'permit', 'parking', 'toll', 'vpermettovendor', 'vendortoll', 'customeradvance', 'email1', 'remark', 'smsguest', 'documentnotes', 'VendorTripNo', 'vehicles', 'duty1', 'startdate1', 'closedate1', 'totaldays1', 'locks', 'starttime2', 'closetime2', 'totaltime', 'startkm1', 'closekm1', 'totalkm1', 'remark1', 'escort', 'transferreport', 'calcPackage', 'extraHR', 'extraKM', 'package_amount', 'extrakm_amount', 'extrahr_amount', 'ex_kmAmount', 'ex_hrAmount', 'nightBta', 'nightCount', 'night_totalAmount', 'driverBeta', 'driverbeta_Count', 'driverBeta_amount', 'totalcalcAmount', 'nightThrs', 'dtc', 'dtc2', 'nightThrs2', 'exkmTkm2', 'exHrsTHrs2', 'netamount', 'vehcommission', 'caramount1', 'manualbills', 'pack', 'amount5', 'exkm1', 'amount6', 'exHrs1', 'amount7', 'night1', 'amount8', 'driverconvenience1', 'amount9', 'rud', 'netamount1', 'discount', 'ons', 'manualbills1', 'balance', 'fcdate', 'taxdate', 'insdate', 'stpermit', 'maintenancetype', 'kilometer', 'selects', 'documenttype', 'on1', 'smsgust', 'booker', 'emailcheck', 'manualbillss', 'reload', 'Groups', 'orderbyemail'
        // ];
        // parameterKeys.forEach(key => {
        //     const value = params.get(key);
        //     if (value !== null && value !== "null") {
        //         formData[key] = value;
        //     }
        // });

        const parameterKeys = [
            'dispatchcheck', 'vehType', 'travelsemail', "vehicleName", "vehicleName2", 'travelsname', 'tripid', 'bookingno', 'billingno', 'apps', 'status', 'customer', 'orderedby', 'mobile', 'guestname', 'guestmobileno', 'email', 'address1', 'streetno', 'city', 'hireTypes', 'department', 'vehRegNo', 'vehType', 'driverName', 'mobileNo', 'driversmsexbetta', 'gps', 'duty', 'pickup', 'useage', 'request', 'shedOutDate', 'startdate', 'closedate', 'totaldays', 'employeeno', 'reporttime', 'starttime', 'closetime', 'shedintime', 'additionaltime', 'advancepaidtovendor', 'customercode', 'request', 'startkm', 'closekm', 'shedkm', 'shedin', 'shedout', 'permit', 'parking', 'toll', 'vpermettovendor', 'vendortoll', 'customeradvance', 'email1', 'remark', 'smsguest', 'documentnotes', 'VendorTripNo', 'vehicles', 'duty1', 'startdate1', 'closedate1', 'totaldays1', 'locks', 'starttime2', 'closetime2', 'totaltime', 'startkm1', 'closekm1', 'totalkm1', 'remark1', 'escort', 'transferreport', 'calcPackage', 'extraHR', 'extraKM', 'package_amount', 'extrakm_amount', 'extrahr_amount', 'ex_kmAmount', 'ex_hrAmount', 'nightBta', 'nightCount', 'night_totalAmount', 'driverBeta', 'driverbeta_Count', 'driverBeta_amount', 'totalcalcAmount', 'nightThrs', 'dtc', 'dtc2', 'nightThrs2', 'exkmTkm2', 'exHrsTHrs2', 'netamount', 'vehcommission', 'caramount1', 'manualbills', 'pack', 'amount5', 'exkm1', 'amount6', 'exHrs1', 'amount7', 'night1', 'amount8', 'driverconvenience1', 'amount9', 'rud', 'netamount1', 'discount', 'ons', 'manualbills1', 'balance', 'fcdate', 'taxdate', 'insdate', 'stpermit', 'maintenancetype', 'kilometer', 'selects', 'documenttype', 'on1', 'smsgust', 'booker', 'emailcheck', 'manualbillss', 'reload', 'Groups', 'orderbyemail'
        ];
        parameterKeys.forEach(key => {
            const value = params.get(key);
            if (value !== null && value !== "null") {
                formData[key] = value;
            }
        });
        console.log(formData, "VALUESSS")


        const formvendorinfo = {};

        const parameterKeys1 = [
            "vendor_vehicle", "vendor_duty", "vendorshedOutDate", "vendorshedInDate", "vendortotaldays", "vendorreporttime", "vendorshedintime", "vendorTotaltime", "vendorshedoutkm", "vendorshedinkm", "vendortotalkm", "vendorRemarks", "Vendor_Calcpackage", "Vendor_rateAmount", "Vendor_ExtraKms", "Vendor_ExtraAmountKms", "Vendor_totalAmountKms", "Vendor_ExtraHours", "Vendor_ExtraAmountHours", "Vendor_totalAmountHours", "Vendor_NightHALT", "Vendor_NightBataAmount", "Vendor_NightbataTotalAmount", "Vendor_Bata", "Vendor_BataAmount", "Vendor_BataTotalAmount", "Vendor_FULLTotalAmount", "vendor_vpermettovendor", "vendor_toll", "vendor_advancepaidtovendor", "vendor_ratename"
        ];


        parameterKeys1.forEach(key => {
            const value = params.get(key);
            if (value !== null && value !== "null") {
                formvendorinfo[key] = value;
            }
        });
        //   console.log(formvendorinfo,"")


        setVendorpassvalue(formvendorinfo);
        setVendorinfodata(formvendorinfo);
        console.log(formvendorinfo, "nnnnnnnnnnn")



        let appsValue = params.get('apps') || 'Waiting';

        // Check if dispatchcheck is 

        if (formData['dispatchcheck'] === 'true' && formData['status'] === "pending") {
            formData['status'] = "Opened"
            // setIsEditMode(true);
            setIsEditMode(false);
        }
        // else {
        //     // setIsEditMode(false);
        //     setIsEditMode(true);
        // }

        // Remove dispatchcheck from formData
        delete formData['dispatchcheck'];
        formData['apps'] = appsValue;
        setTripSheetData(formData);
        setBook(formData);
        setFormData(formData);

        ///calc------
        setcalcPackage(calcPackage);
        setExtraHR(extraHR);
        setExtraKM(extraKM);
        setpackage_amount(package_amount);
        setextrakm_amount(extrakm_amount || formData.extrakm_amount);
        setextrahr_amount(extrahr_amount);
        setEx_kmAmount(ex_kmAmount);
        setEx_HrAmount(ex_hrAmount);
        setNightBeta(nightBta);
        setNightCount(nightCount);
        setnight_totalAmount(night_totalAmount);
        setdriverBeta(driverBeta);
        setdriverbeta_Count(driverbeta_Count);
        setdriverBeta_amount(driverBeta_amount);
        setTotalcalcAmount(totalcalcAmount || formData.totalcalcAmount);

        ///------

    }, [location]);




    useEffect(() => {
        window.history.replaceState(null, document.title, window.location.pathname);
        const initialFormData = {};
        setFormData(initialFormData);
    }, []);

    const bookData = {
        tripid: '',
        bookingno: '',
        status: '',
        tripsheetdate: '',
        billingno: '',
        apps: '',
        customer: '',
        orderedby: '',
        orderbyemail: '',
        mobile: '',
        guestname: '',
        guestmobileno: '',
        email: '',
        address1: '',
        department: '',
        vehRegNo: '',
        driverName: '',
        mobileNo: '',
        driversmsexbetta: '',
        gps: '',
        duty: '',
        pickup: '',
        useage: '',
        request: '',
        shedOutDate: '',
        vehicleName2: "",
        startdate: '',
        closedate: '',
        shedInDate: '',
        employeeno: '',
        reporttime: '',
        starttime: '',
        closetime: '',
        shedintime: '',
        advancepaidtovendor: '',
        customercode: '',
        shedkm: '',
        shedin: '',
        shedout: '',
        startkm: '',
        closekm: '',
        permit: '',
        parking: '',
        toll: '',
        emailcheck: '',
        vpermettovendor: '',
        vendortoll: '',
        customeradvance: '',
        email1: '',
        documentnotes: '',
        VendorTripNo: '',
        vehicles: '',
        duty1: '',
        startdate1: '',
        closedate1: '',
        totaldays: '',
        starttime2: '',
        closetime2: '',
        totaltime: '',
        startkm1: '',
        closekm1: '',
        totalkm1: '',
        remark: '',
        caramount: '',
        minkm: '',
        minhrs: '',
        package: '',
        amount: '',
        exkm: '',
        amount1: '',
        exHrs: '',
        amount2: '',
        night: '',
        amount3: '',
        driverconvenience: '',
        amount4: '',
        netamount: '',
        vehcommission: '',
        manualbills: '',
        pack: '',
        amount5: '',
        exkm1: '',
        amount6: '',
        exHrs1: '',
        amount7: '',
        night1: '',
        amount8: '',
        driverconvenience1: '',
        amount9: '',
        rud: '',
        netamount1: '',
        discount: '',
        ons: '',
        balance: '',
        fcdate: '',
        taxdate: '',
        insdate: '',
        stpermit: '',
        maintenancetype: '',
        kilometer: '',
        selects: '',
        documenttype: '',
        on1: '',
        smsguest: '',
        booker: '',
        DriverSMS: '',
        manualbillss: '',
        reload: '',
        locks: '',
        Groups: '',
        travelsemail: '',
        hireTypes: "",
        vehType: "",
        vehicleName: "",
        travelsname: "",
    }

    const [book, setBook] = useState(bookData);

    const handleCancel = () => {

        setBook(bookData);
        setSelectedCustomerDatas({});
        setSelectedCustomerData({});
        setFormData({});
        setFormValues({});
        setPackageData({});
        setPackageDetails({});
        setIsEditMode(false);
        calcCancel();
        setCalcCheck(false);
        setEscort("No");
        setMinHour();
        setMinKM();
        setTransferreport("No");
        setVendorinfodata({});
        setVendorbilldata({});

        localStorage.removeItem('selectedTripid');
    };



    const handlecheck = async () => {
        if (sendEmail) {

            try {

                const dataToSend = {
                    bookingno: formData.tripid || selectedCustomerData.tripid || book.tripid,
                    guestname: formValues.guestname || selectedCustomerData.guestname || book.guestname || formData.guestname,
                    guestmobileno: formValues.guestmobileno || selectedCustomerData.guestmobileno || book.guestmobileno || formData.guestmobileno,
                    email: formValues.email || selectedCustomerData.email || book.email || formData.email,
                    driverName: selectedCustomerDatas.driverName || selectedCustomerData.driverName || tripSheetData.driverName || selectedCustomerDatas.driverName || book.driverName,
                    // driverName: selectedCustomerDatas?.driverName || formData.driverName || selectedCustomerData.driverName || formValues.driverName || book.driverName,
                    vehRegNo: formData.vehRegNo || selectedCustomerData.vehRegNo || formValues.vehRegNo || selectedCustomerDatas.vehRegNo || book.vehRegNo,
                    mobileNo: formData.mobileNo || selectedCustomerData.mobileNo || formValues.mobileNo || selectedCustomerDatas.mobileNo || book.mobileNo || '',
                    vehType: formValues.vehType || selectedCustomerData.vehType || book.vehType || formData.vehType,
                    starttime: formData.reporttime || formData.reporttime || selectedCustomerData.reporttime || book.reporttime,
                    startdate: formData.startdate || formData.startdate || selectedCustomerData.startdate || book.startdate,
                    status: formData.status || book.status || selectedCustomerData.status,
                    customeremail: formData.orderbyemail || book.orderbyemail || selectedCustomerData.orderbyemail,
                    servicestation: formData.department || formValues.department || selectedCustomerData.department || book.department || '',
                    Sendmailauth: organizationdata.Sender_Mail,
                    Mailauthpass: organizationdata.EmailApp_Password


                };
                await axios.post(`${apiUrl}/send-tripsheet-email`, dataToSend);
                setSuccess(true);
                setSuccessMessage(" Mail Sent Successfully");
                // setSendEmail(false)
            } catch {

                setError(true);
                setErrorMessage("An error occurred while sending the email");
            }
        } else {
        }
    };



    //607
    const handleETripsheetClick = async (row) => {
        const tripid = book.tripid || selectedCustomerData.tripid || selectedCustomerDatas.tripid || formData.tripid;
        if (!tripid) {
            setError(true);
            setErrorMessage("please enter the tripid");
        }
        else {
            localStorage.setItem('selectedTripid', tripid);
            getMapImaage();
            getSignatureImage();
            invoiceRouteData();
            getAttachedImage();
            setPopupOpen(true);

        }
    };



    const handleDelete = async () => {

        const tripid = selectedCustomerData.tripid;
        try {
            if (tripid !== null && tripid !== "undefined" && tripid) {

                await axios.delete(`${apiUrl}/tripsheet/${selectedCustomerData.tripid}`);
                setFormData({});
                setSelectedCustomerData({});
                handleCancel();
                setSuccess(true);
                setSuccessMessage("Successfully Deleted");
            }

        } catch {
            setError(true);
            setErrorMessage("Check your Network Connection");
        }
    };

    const vehilcedetails = {
        vehRegNo: selectedCustomerDatas.vehRegNo || '',
        vehType: selectedCustomerDatas.vehType || '',
        driverName: selectedCustomerDatas.driverName || '',
        mobileNo: selectedCustomerDatas.mobileNo || '',
    }
    // useEffect(()=>{
    //     const fetchdataaccountdata=async()=>{
    //         try{
    //             const response=await axios.get(`${apiUrl}/tripaccounttravelname`)
    //             const data=response.data
    //             // setTravelmaildata(data.map(row=>row.vehicleTravels))
    //             console.log(data)
    //         }
    //         catch(err){
    //              console.log(err)
    //         }
    //     }
    //     fetchdataaccountdata()
    // },[])


    // const handleEdit = async () => {
    //     try {
    //         try {
    //             const selectedCustomer = rows.find((row) => row.tripid === selectedCustomerData.tripid || formData.tripid || book.tripid);
    //             const selectedBookingDate = selectedCustomerData.tripsheetdate || formData.tripsheetdate || dayjs();
    //             const updatedCustomer = {
    //                 ...book,
    //                 ...selectedCustomer,
    //                 ...vehilcedetails,
    //                 ...selectedCustomerData,
    //                 ...formData,
    //                 apps: book.apps || formData.apps || selectedCustomerData.apps,
    //                 starttime: starttime || book.starttime || formData.starttime || selectedCustomerData.starttime,
    //                 closetime: closetime || book.closetime || formData.closetime || selectedCustomerData.closetime,
    //                 reporttime: reporttime || book.reporttime || selectedCustomerData.reporttime || formData.reporttime,
    //                 shedintime: shedintime || book.shedintime || selectedCustomerData.shedintime || formData.shedintime,
    //                 starttime2: starttime2 || book.starttime2 || formData.startTime2 || selectedCustomerData.starttime2,
    //                 closetime2: closetime2 || book.closetime2 || formData.closetime2 || selectedCustomerData.closetime2,
    //                 additionaltime: additionalTime.additionaltime || book.additionaltime || formData.additionaltime || selectedCustomerData.additionaltime,
    //                 tripsheetdate: selectedBookingDate,
    //                 vehRegNo: formData.vehRegNo || selectedCustomerData.vehRegNo || formValues.vehRegNo || selectedCustomerDatas.vehRegNo || book.vehRegNo || '',
    //                 // driverName: formData.driverName || selectedCustomerData.driverName || formValues.driverName || selectedCustomerDatas.driverName || book.driverName || '',
    //                 driverName: selectedCustomerDatas.driverName || selectedCustomerData.driverName || tripSheetData.driverName || selectedCustomerDatas.driverName || book.driverName,
    //                 mobileNo: formData.mobileNo || selectedCustomerData.mobileNo || formValues.mobileNo || selectedCustomerDatas.mobileNo || book.mobileNo || '',
    //                 shedkm: shedKilometers.shedkm || book.shedkm || formData.shedkm || selectedCustomerData.shedkm,
    //                 totaldays: calculateTotalDays(),
    //                 totalkm1: calculateTotalKilometers(),
    //                 totaltime: calculateTotalTime(),
    //                 netamount: calculateTotalAmount(),
    //                 exkm: packageDetails[0]?.extraKMS,
    //                 exHrs: packageDetails[0]?.extraHours,
    //                 night: packageDetails[0]?.NHalt,
    //                 amount: packageDetails[0]?.Rate,
    //                 exkm1: packageDetails[0]?.extraKMS,
    //                 exHrs1: packageDetails[0]?.extraHours,
    //                 night1: packageDetails[0]?.NHalt,
    //                 amount5: packageDetails[0]?.Rate,
    //                 amount1: calculateExkmAmount(),
    //                 amount2: calculateExHrsAmount(),
    //                 amount3: calculateNightAmount(),
    //                 amount4: calculatedriverconvienceAmount(),
    //                 package: packageDetails[0]?.package,
    //                 pack: packageDetails[0]?.package,
    //                 minhrs: packageDetails[0]?.Hours,
    //                 minkm: packageDetails[0]?.KMS,
    //                 vehicleName: selectedCustomerDatas.vehicleName || formData.vehicleName || selectedCustomerData.vehicleName || formValues.vehicleName || packageData.vehicleName || book.vehicleName,
    //                 calcPackage, extraHR, extraKM, package_amount, extrakm_amount, extrahr_amount, ex_kmAmount, ex_hrAmount, nightBta, nightCount, night_totalAmount, driverBeta, driverbeta_Count, driverBeta_amount, totalcalcAmount, escort, minHour, minKM, transferreport

    //             };

    //             for (const key in updatedCustomer) {
    //                 if (key === '0') {
    //                     delete updatedCustomer[key];
    //                 }
    //             }

    //             await axios.put(`${apiUrl}/tripsheet-edit/${selectedCustomerData.tripid || book.tripid || formData.tripid || packageDetails.tripid}`, updatedCustomer);
    //             // handleCancel();
    //             setShedKilometers("")
    //             setAdditionalTime("")
    //             setSuccess(true);
    //             setSuccessMessage("Successfully updated");
    //             setRow([]);
    //             setRows([]);
    //             if (sendEmail) {
    //                 await handlecheck();
    //             }
    //             if (smsguest) {
    //                 await handleSendSMS()
    //             }
    //             if (DriverSMS) {
    //                 await handleDriverSendSMS()
    //             }

    //             setSendEmail(true)
    //             setDriverSMS(true)
    //             setSmsGuest(true)
    //             // setSuccess(true);
    //             handleCancel();
    //             // setSuccessMessage("Successfully updated");
    //         } catch {
    //             setError(true);
    //             setErrorMessage("Check your Network Connection");
    //         }
    //     } catch {
    //         setError(true);
    //         setErrorMessage("Check your Network Connection");
    //     }
    // };


    // handleConfirm

    const handleEdit = async () => {
        try {
            try {
                // const hiretypesdatavendor = selectedCustomerDatas.hiretypes || formData.hireTypes || selectedCustomerData.hireTypes || formValues.hireTypes || book.hireTypes;
                console.log(selectedCustomerDatas.travelsname, selectedCustomerData.travelsname, formData.travelsname, book.travelsname, "trvales")
                const selectedCustomer = rows.find((row) => row.tripid === selectedCustomerData.tripid || formData.tripid || book.tripid);
                const selectedBookingDate = selectedCustomerData.tripsheetdate || formData.tripsheetdate || dayjs();

                const updatedCustomer = {
                    ...book,
                    ...selectedCustomer,
                    ...vehilcedetails,
                    ...selectedCustomerData,
                    ...formData,
                    apps: book.apps || formData.apps || selectedCustomerData.apps,
                    travelsname: selectedCustomerDatas.travelsname || selectedCustomerData.travelsname || formData.travelsname || book.travelsname,
                    travelsemail: selectedCustomerDatas.travelsemail || selectedCustomerData.travelsemail || formData.travelsemail || book.travelsemail,
                    starttime: starttime || book.starttime || formData.starttime || selectedCustomerData.starttime,
                    closetime: closetime || book.closetime || formData.closetime || selectedCustomerData.closetime,
                    reporttime: reporttime || book.reporttime || selectedCustomerData.reporttime || formData.reporttime,
                    shedintime: shedintime || book.shedintime || selectedCustomerData.shedintime || formData.shedintime,
                    starttime2: starttime2 || book.starttime2 || formData.startTime2 || selectedCustomerData.starttime2,
                    closetime2: closetime2 || book.closetime2 || formData.closetime2 || selectedCustomerData.closetime2,
                    additionaltime: additionalTime.additionaltime || book.additionaltime || formData.additionaltime || selectedCustomerData.additionaltime,
                    tripsheetdate: selectedBookingDate,
                    hireTypes: selectedCustomerDatas.hiretypes || formData.hireTypes || formValues.hireTypes || selectedCustomerData.hireTypes || book.hireTypes,
                    vehRegNo: formData.vehRegNo || selectedCustomerData.vehRegNo || formValues.vehRegNo || selectedCustomerDatas.vehRegNo || book.vehRegNo || '',
                    driverName: selectedCustomerDatas?.driverName || selectedCustomerData.driverName || formData.driverName || formValues.driverName || book.driverName,
                    // mobileNo: formData.mobileNo || selectedCustomerData.mobileNo || formValues.mobileNo || selectedCustomerDatas.mobileNo || book.mobileNo || '',
                    mobileNo: selectedCustomerDatas?.mobileNo || formData.mobileNo || selectedCustomerData.mobileNo || formValues.mobileNo || book.mobileNo,
                    shedkm: shedKilometers.shedkm || book.shedkm || formData.shedkm || selectedCustomerData.shedkm,
                    vehicleName2: selectedCustomerDatas.vehicleName2 || formData.vehicleName2 || selectedCustomerData.vehicleName2 || formValues.vehicleName2 || packageData.vehicleName2 || book.vehicleName2,
                    orderbyemail: formData.orderbyemail || selectedCustomerDatas.orderbyemail || selectedCustomerData.orderbyemail || formValues.orderbyemail || book.orderbyemail,
                    totaldays: calculateTotalDays(),
                    totalkm1: calculateTotalKilometers(),
                    totaltime: calculateTotalTime(),
                    netamount: calculateTotalAmount(),
                    exkm: packageDetails[0]?.extraKMS,
                    exHrs: packageDetails[0]?.extraHours,
                    night: packageDetails[0]?.NHalt,
                    amount: packageDetails[0]?.Rate,
                    exkm1: packageDetails[0]?.extraKMS,
                    exHrs1: packageDetails[0]?.extraHours,
                    night1: packageDetails[0]?.NHalt,
                    amount5: packageDetails[0]?.Rate,
                    amount1: calculateExkmAmount(),
                    amount2: calculateExHrsAmount(),
                    amount3: calculateNightAmount(),
                    amount4: calculatedriverconvienceAmount(),
                    package: packageDetails[0]?.package,
                    pack: packageDetails[0]?.package,
                    minhrs: packageDetails[0]?.Hours,
                    minkm: packageDetails[0]?.KMS,
                    vehicleName: selectedCustomerDatas.vehicleName || formData.vehicleName || selectedCustomerData.vehicleName || formValues.vehicleName || packageData.vehicleName || book.vehicleName,
                    calcPackage, extraHR, extraKM, package_amount, extrakm_amount, extrahr_amount, ex_kmAmount, ex_hrAmount, nightBta, nightCount, night_totalAmount, driverBeta, driverbeta_Count, driverBeta_amount, totalcalcAmount, escort, minHour, minKM, transferreport,
                    // -------------------------vendor--------------------------------------------------------
                    vendor_vehicle: vendorinfo.vendor_vehicle || "",
                    vendor_duty: vendorinfo.vendor_duty || ratename || "",
                    vendor_ratename: vendorinfo.vendor_ratename || "",
                    vendorshedOutDate: vendorinfo.vendorshedOutDate || "",
                    vendorshedInDate: vendorinfo.vendorshedInDate || "",
                    vendortotaldays: calculatevendorTotalDays() || 0,
                    vendorreporttime: vendorinfo.vendorreporttime || "",
                    vendorshedintime: vendorinfo.vendorshedintime || "",
                    vendorTotaltime: calculatevendorTotalTime() || 0,
                    vendorshedoutkm: vendorinfo.vendorshedoutkm || "",
                    vendorshedinkm: vendorinfo.vendorshedinkm || "",
                    vendortotalkm: calculatevendorTotalKilometers() || 0,
                    vendorRemarks: vendorinfo.vendorRemarks || "",
                    Vendor_Calcpackage: vendorbilldata.Vendor_Calcpackage || vendorpassvalue.Vendor_Calcpackage,
                    Vendor_rateAmount: vendorbilldata.Vendor_rateAmount || vendorpassvalue.Vendor_rateAmount,
                    Vendor_ExtraKms: vendorbilldata.Vendor_ExtraKms || vendorpassvalue.Vendor_ExtraKms || 0,
                    Vendor_ExtraAmountKms: vendorbilldata.Vendor_ExtraAmountKms || vendorpassvalue.Vendor_ExtraAmountKms || 0,
                    Vendor_totalAmountKms: vendorbilldata.Vendor_totalAmountKms || vendorExtarkmTotalAmount || vendorpassvalue.Vendor_totalAmountKms || 0,
                    Vendor_ExtraHours: vendorbilldata.Vendor_ExtraHours || vendorpassvalue.Vendor_ExtraHours || 0,
                    Vendor_ExtraAmountHours: vendorbilldata.Vendor_ExtraAmountHours || vendorpassvalue.Vendor_ExtraAmountHours || 0,
                    Vendor_totalAmountHours: vendorbilldata.Vendor_totalAmountHours || vendorExtrahrTotalAmount || vendorpassvalue.Vendor_totalAmountHours || 0,
                    // Vendor_NightHALT: vendorbilldata.Vendor_NightHALT || vendorpassvalue.Vendor_NightHALT || 0,
                    Vendor_NightHALT: checkvendorNightBetaEligible() ? vendorbilldata.Vendor_NightHALT || vendorpassvalue.Vendor_NightHALT || 0 : 0,
                    Vendor_NightBataAmount: checkvendorNightBetaEligible() ? vendorbilldata.Vendor_NightBataAmount || vendorpassvalue.Vendor_NightBataAmount || 0 : 0,
                    // Vendor_NightbataTotalAmount: vendorbilldata.Vendor_NightbataTotalAmount || vendornightdatatotalAmount,
                    Vendor_NightbataTotalAmount: checkvendorNightBetaEligible() ? vendornightdatatotalAmount || vendornightdatatotalAmount || 0 : 0,
                    Vendor_Bata: vendorinfo?.vendor_duty === "Outstation" ? vendorbilldata.Vendor_Bata || vendorpassvalue.Vendor_Bata || 0 : 0,
                    Vendor_BataAmount: vendorinfo?.vendor_duty === "Outstation" ? vendorbilldata.Vendor_BataAmount || vendorpassvalue.Vendor_BataAmount || 0 : 0,
                    Vendor_BataTotalAmount: vendorinfo?.vendor_duty === "Outstation" ? vendorbilldata.Vendor_BataTotalAmount || 0 : 0,
                    Vendor_FULLTotalAmount: vendorbilldata.Vendor_FULLTotalAmount || 0,

                };


                for (const key in updatedCustomer) {
                    if (key === '0') {
                        delete updatedCustomer[key];
                    }
                }

                await axios.put(`${apiUrl}/tripsheet-edit/${selectedCustomerData.tripid || book.tripid || formData.tripid || packageDetails.tripid}`, updatedCustomer);
                // handleCancel();
                setShedKilometers("")
                setAdditionalTime("")

                setRow([]);
                setRows([]);
                if (sendEmail) {
                    await handlecheck();
                }

                setSendEmail(true)
                setDriverSMS(true)
                setSmsGuest(true)
                setSuccess(true);
                handleCancel();
                setSuccessMessage("Successfully updated");
                setLockData(false)
            } catch (err) {
                console.log(err, "erredit")
                setError(true);
                setErrorMessage("Check your Network Connection");
            }
        } catch (err) {
            console.log(err, "errrdit2")
            setError(true);
            setErrorMessage("Check your Network Connection");
        }
    };



    const handleConfirm = async () => {
        try {
            try {
                const selectedCustomer = rows.find((row) => row.tripid === selectedCustomerData.tripid || formData.tripid || book.tripid);
                const selectedBookingDate = selectedCustomerData.tripsheetdate || formData.tripsheetdate || dayjs();
                const updatedCustomer = {
                    ...book,
                    ...selectedCustomer,
                    ...vehilcedetails,
                    ...selectedCustomerData,
                    ...formData,
                    starttime: starttime || book.starttime || formData.startTime || selectedCustomerData.startTime,
                    closetime: closetime || book.closetime || formData.closetime || selectedCustomerData.closetime,
                    reporttime: reporttime || book.reporttime || selectedCustomerData.reporttime || formData.reporttime,
                    shedintime: shedintime || book.shedintime || selectedCustomerData.shedintime || formData.shedintime,
                    starttime2: starttime2 || book.starttime2 || formData.startTime2 || selectedCustomerData.starttime2,
                    closetime2: closetime2 || book.closetime2 || formData.closetime2 || selectedCustomerData.closetime2,
                    additionaltime: additionalTime.additionaltime,
                    tripsheetdate: selectedBookingDate,
                    vehRegNo: formData.vehRegNo || selectedCustomerData.vehRegNo || formValues.vehRegNo || selectedCustomerDatas.vehRegNo || book.vehRegNo || '',
                    vehType: VehicleRate.find((option) => option.optionvalue)?.label || formData.vehType || selectedCustomerData.vehType || formValues.vehType || selectedCustomerDatas.vehType || packageData.vehType || book.vehType || '',
                    driverName: formData.driverName || selectedCustomerData.driverName || formValues.driverName || selectedCustomerDatas.driverName || book.driverName || '',
                    mobileNo: formData.mobileNo || selectedCustomerData.mobileNo || formValues.mobileNo || selectedCustomerDatas.mobileNo || book.mobileNo || '',
                    shedkm: shedKilometers.shedkm,
                    vehicleName2: selectedCustomerDatas.vehicleName2 || formData.vehicleName2 || selectedCustomerData.vehicleName2 || formValues.vehicleName2 || packageData.vehicleName2 || book.vehicleName2,
                    totaldays: calculateTotalDays(),
                    totalkm1: calculateTotalKilometers(),
                    totaltime: calculateTotalTime(),
                    netamount: calculateTotalAmount(),
                    exkm: packageDetails[0]?.extraKMS,
                    exHrs: packageDetails[0]?.extraHours,
                    night: packageDetails[0]?.NHalt,
                    amount: packageDetails[0]?.Rate,
                    exkm1: packageDetails[0]?.extraKMS,
                    exHrs1: packageDetails[0]?.extraHours,
                    night1: packageDetails[0]?.NHalt,
                    amount5: packageDetails[0]?.Rate,
                    amount1: calculateExkmAmount(),
                    amount2: calculateExHrsAmount(),
                    amount3: calculateNightAmount(),
                    amount4: calculatedriverconvienceAmount(),
                    package: packageDetails[0]?.package,
                    pack: packageDetails[0]?.package,
                    minhrs: packageDetails[0]?.Hours,
                    minkm: packageDetails[0]?.KMS,
                };
                for (const key in updatedCustomer) {
                    if (key === '0') {
                        delete updatedCustomer[key];
                    }
                }
                await axios.put(`${apiUrl}/tripsheet-confirm/${selectedCustomerData.tripid || book.tripid || formData.tripid || packageDetails.tripid}`, updatedCustomer);
                handleCancel();
                setShedKilometers("")
                setAdditionalTime("")

                setRow([]);
                setRows([]);
                // handleDriverSendSMS();
                // handleSendSMS();
                // handlecheck();
                setSuccess(true);
                setSuccessMessage("Successfully updated");
            } catch {
                setError(true);
                setErrorMessage("Check your Network Connection");
            }
        } catch {
            setError(true);
            setErrorMessage("Check your Network Connection");
        }
    };


    // startdate: formData.shedOutDate || selectedCustomerDatas.shedOutDate || selectedCustomerData.shedOutDate || book.shedOutDate,
    //     startdate: formData.startdate || selectedCustomerDatas.startdate || selectedCustomerData.startdate || book.startdate,
    //         startdate: formData.closedate || selectedCustomerDatas.closedate || selectedCustomerData.closedate || book.closedate,
    //             startdate: formData.shedInDate || selectedCustomerDatas.shedInDate || selectedCustomerData.shedInDate || book.shedInDate,



    const handleAdd = async () => {

        const customer = formData.customer || selectedCustomerData.customer || book.customer || packageData.customer;
        const vehRegNo = formData.vehRegNo || selectedCustomerData.vehRegNo || formValues.vehRegNo || selectedCustomerDatas.vehRegNo || book.vehRegNo || '';
        const driverName = selectedCustomerDatas?.driverName || selectedCustomerData.driverName || formData.driverName || formValues.driverName || book.driverName;
        const mobileNo = selectedCustomerDatas?.mobileNo || formData.mobileNo || selectedCustomerData.mobileNo || formValues.mobileNo || book.mobileNo;
        const Email = formData.email || selectedCustomerData.email || formValues.email || book.email;
        const vehType = selectedCustomerDatas.vehType || formData.vehType || selectedCustomerData.vehType || book.vehType;
        // const
        if (!customer) {
            setError(true);
            setErrorMessage("Please fill customer field");
            return;
        }
        if (!vehRegNo) {
            setError(true);
            setErrorMessage("Please fill vehRegNo field");
            return;
        }
        if (!vehType) {
            setError(true);
            setErrorMessage("Please fill vehType field");
            return;
        }
        if (!driverName) {
            setError(true);
            setErrorMessage("Please fill driverName field");
            return;
        }
        if (!mobileNo) {
            setError(true);
            setErrorMessage("Please fill mobileNo field");
            return;
        }
        if (!Email) {
            setError(true);
            setErrorMessage("Please fill Email field");
            return;
        }

        try {
            const selectedBookingDate = selectedCustomerData.tripsheetdate || formData.tripsheetdate || dayjs();
            const updatedBook = {
                ...book,
                starttime2: starttime2 || book.starttime2 || formData.startTime2 || selectedCustomerData.starttime2,
                closetime2: closetime2 || book.closetime2 || formData.closetime2 || selectedCustomerData.closetime2,
                tripsheetdate: selectedBookingDate,
                totaldays: calculateTotalDays(),
                totalkm1: calculateTotalKilometers(),
                totaltime: calculateTotalTime(),
                netamount: calculateTotalAmount(),
                exkm: packageDetails[0]?.extraKMS,
                exHrs: packageDetails[0]?.extraHours,
                night: packageDetails[0]?.NHalt,
                amount: packageDetails[0]?.Rate,
                exkm1: packageDetails[0]?.extraKMS,
                exHrs1: packageDetails[0]?.extraHours,
                night1: packageDetails[0]?.NHalt,
                amount5: packageDetails[0]?.Rate,
                amount1: calculateExkmAmount(),
                amount2: calculateExHrsAmount(),
                amount3: calculateNightAmount(),
                amount4: calculatedriverconvienceAmount(),
                package: packageDetails[0]?.package,
                pack: packageDetails[0]?.package,
                minhrs: packageDetails[0]?.Hours,
                minkm: packageDetails[0]?.KMS,
                additionaltime: book.additionaltime || additionalTime.additionaltime,
                billingno: book.billingno,
                // closedate: book.closedate,
                closekm: book.closekm,
                closetime: book.closetime,
                customeradvance: book.customeradvance,
                email1: book.email1,
                parking: book.parking,
                permit: book.permit,
                travelsname: selectedCustomerDatas.travelsname || formData.travelsname || selectedCustomerData.travelsname || book.travelsname,
                remark: book.remark,
                reporttime: formData.reporttime || selectedCustomerData.reporttime || selectedCustomerDatas.reporttime || book.reporttime,
                shedin: book.shedin,
                shedintime: book.shedintime || formData.shedintime || selectedCustomerData.shedintime,
                shedkm: book.shedkm || shedKilometers.shedkm,
                shedout: formData.shedout || book.shedout || selectedCustomerData.shedout,
                shedOutDate: formData.shedOutDate || selectedCustomerDatas.shedOutDate || selectedCustomerData.shedOutDate || book.shedOutDate,
                startdate: formData.startdate || selectedCustomerDatas.startdate || selectedCustomerData.startdate || book.startdate,
                closedate: formData.closedate || selectedCustomerDatas.closedate || selectedCustomerData.closedate || book.closedate,
                shedInDate: formData.shedInDate || selectedCustomerDatas.shedInDate || selectedCustomerData.shedInDate || book.shedInDate,
                startkm: book.startkm,
                orderbyemail: formData.orderbyemail || selectedCustomerDatas.orderbyemail || selectedCustomerData.orderbyemail || formValues.orderbyemail || book.orderbyemail,
                starttime: formData.starttime || book.starttime || selectedBookingDate.starttime,
                toll: book.toll,
                vendortoll: book.vendortoll,
                vpermettovendor: book.vpermettovendor,
                driverName: driverName,
                request: selectedCustomerDatas.request || selectedCustomerData.request || formValues.request || book.request,
                vehicleName: selectedCustomerDatas.vehicleName || formData.vehicleName || selectedCustomerData.vehicleName || formValues.vehicleName || packageData.vehicleName || book.vehicleName,
                vehRegNo: formData.vehRegNo || selectedCustomerData.vehRegNo || formValues.vehRegNo || selectedCustomerDatas.vehRegNo || book.vehRegNo,
                Groups: selectedCustomerDatas.Groups || formData.Groups || selectedCustomerData.Groups || formValues.Groups || packageData.Groups || book.Groups,
                // hireTypes: selectedCustomerDatas.hiretypes || formData.hireTypes || formValues.hireTypes || selectedCustomerData.hireTypes || book.hireTypes,
                hireTypes: selectedCustomerDatas.hiretypes || formData.hireTypes || formValues.hireTypes || selectedCustomerData.hireTypes || book.hireTypes,
                mobileNo: formData.mobileNo || selectedCustomerData.mobileNo || formValues.mobileNo || selectedCustomerDatas.mobileNo || book.mobileNo,
                calcPackage, extraHR, extraKM, package_amount, extrakm_amount, extrahr_amount, ex_kmAmount, ex_hrAmount, nightBta, nightCount, night_totalAmount, driverBeta, driverbeta_Count, driverBeta_amount, totalcalcAmount,
                escort, minHour, minKM, transferreport,
                // -------vendordata-------------------------------------------------
                vendor_vehicle: vendorinfo.vendor_vehicle || "",
                vendor_duty: vendorinfo.vendor_duty || "",
                vendor_ratename: vendorinfo.vendor_ratename || ratename || "",
                vendorshedOutDate: vendorinfo.vendorshedOutDate || "",
                vendorshedInDate: vendorinfo.vendorshedInDate || "",
                vendortotaldays: calculatevendorTotalDays() || 0,
                vendorreporttime: vendorinfo.vendorreporttime || "",
                vendorshedintime: vendorinfo.vendorshedintime || "",
                vendorTotaltime: calculatevendorTotalTime() || 0,
                vendorshedoutkm: vendorinfo.vendorshedoutkm || 0,
                vendorshedinkm: vendorinfo.vendorshedinkm || 0,
                vendortotalkm: calculatevendorTotalKilometers() || 0,
                vendorRemarks: vendorinfo.vendorRemarks || "",
                Vendor_Calcpackage: vendorbilldata.Vendor_Calcpackage,
                Vendor_rateAmount: vendorbilldata.Vendor_rateAmount,
                Vendor_ExtraKms: vendorbilldata.Vendor_ExtraKms || 0,
                Vendor_ExtraAmountKms: vendorbilldata.Vendor_ExtraAmountKms || 0,
                Vendor_totalAmountKms: vendorbilldata.Vendor_totalAmountKms || vendorExtarkmTotalAmount || 0,
                Vendor_ExtraHours: vendorbilldata.Vendor_ExtraHours || 0,
                Vendor_ExtraAmountHours: vendorbilldata.Vendor_ExtraAmountHours || 0,
                Vendor_totalAmountHours: vendorbilldata.Vendor_totalAmountHours || vendorExtrahrTotalAmount || 0,
                Vendor_NightHALT: checkvendorNightBetaEligible() ? vendorbilldata.Vendor_NightHALT || 0 : 0,
                Vendor_NightBataAmount: checkvendorNightBetaEligible() ? vendorbilldata.Vendor_NightBataAmount || 0 : 0,

                Vendor_NightbataTotalAmount: checkvendorNightBetaEligible() ? vendornightdatatotalAmount || vendornightdatatotalAmount || 0 : 0,
                Vendor_Bata: vendorinfo?.vendor_duty === "Outstation" ? vendorbilldata.Vendor_Bata || 0 : 0,
                Vendor_BataAmount: vendorinfo?.vendor_duty === "Outstation" ? vendorbilldata.Vendor_BataAmount || 0 : 0,
                Vendor_BataTotalAmount: vendorinfo?.vendor_duty === "Outstation" ? vendorbilldata.Vendor_BataTotalAmount || 0 : 0,
                // Vendor_NightHALT: vendorbilldata.Vendor_NightHALT || 0,
                // Vendor_NightBataAmount: vendorbilldata.Vendor_NightBataAmount || 0,
                // Vendor_NightbataTotalAmount: vendorbilldata.Vendor_NightbataTotalAmount || vendornightdatatotalAmount,
                // Vendor_Bata: vendorbilldata.Vendor_Bata || 0,
                // Vendor_BataAmount: vendorbilldata.Vendor_BataAmount || 0,
                // Vendor_BataTotalAmount: vendorbilldata.Vendor_BataTotalAmount || 0,
                // Vendor_FULLTotalAmount: vendorbilldata.Vendor_FULLTotalAmount || 0,


            };

            await axios.post(`${apiUrl}/tripsheet-add`, updatedBook);
            handleCancel();
            setRow([]);
            setRows([]);
            setSuccess(true);
            handleSendSMS();
            handleDriverSendSMS();
            handlecheck();
            setSuccessMessage("Successfully Added");
            setLockData(false)
        } catch {
            setError(true);
            setErrorMessage("Check your Network Connection");
        }
    };




    // const handleAdd = async () => {

    //     const customer = formData.customer || selectedCustomerData.customer || book.customer || packageData.customer;
    //     const vehRegNo = formData.vehRegNo || selectedCustomerData.vehRegNo || formValues.vehRegNo || selectedCustomerDatas.vehRegNo || book.vehRegNo || '';
    //     const driverName = selectedCustomerDatas?.driverName || formData.driverName || selectedCustomerData.driverName || formValues.driverName || book.driverName;
    //     const mobileNo = formData.mobileNo || selectedCustomerData.mobileNo || formValues.mobileNo || selectedCustomerDatas.mobileNo || book.mobileNo || '';
    //     const Email = formData.email || selectedCustomerData.email || formValues.email || book.email;
    //     const vehType = selectedCustomerDatas.vehType || formData.vehType || selectedCustomerData.vehType || book.vehType;
    //     // const
    //     if (!customer) {
    //         setError(true);
    //         setErrorMessage("Please fill customer field");
    //         return;
    //     }
    //     if (!vehRegNo) {
    //         setError(true);
    //         setErrorMessage("Please fill vehRegNo field");
    //         return;
    //     }
    //     if (!vehType) {
    //         setError(true);
    //         setErrorMessage("Please fill vehType field");
    //         return;
    //     }
    //     if (!driverName) {
    //         setError(true);
    //         setErrorMessage("Please fill driverName field");
    //         return;
    //     }
    //     if (!mobileNo) {
    //         setError(true);
    //         setErrorMessage("Please fill mobileNo field");
    //         return;
    //     }
    //     if (!Email) {
    //         setError(true);
    //         setErrorMessage("Please fill Email field");
    //         return;
    //     }

    //     try {
    //         const selectedBookingDate = selectedCustomerData.tripsheetdate || formData.tripsheetdate || dayjs();
    //         const updatedBook = {
    //             ...book,
    //             starttime2: starttime2 || book.starttime2 || formData.startTime2 || selectedCustomerData.starttime2,
    //             closetime2: closetime2 || book.closetime2 || formData.closetime2 || selectedCustomerData.closetime2,
    //             tripsheetdate: selectedBookingDate,
    //             totaldays: calculateTotalDays(),
    //             totalkm1: calculateTotalKilometers(),
    //             totaltime: calculateTotalTime(),
    //             netamount: calculateTotalAmount(),
    //             exkm: packageDetails[0]?.extraKMS,
    //             exHrs: packageDetails[0]?.extraHours,
    //             night: packageDetails[0]?.NHalt,
    //             amount: packageDetails[0]?.Rate,
    //             exkm1: packageDetails[0]?.extraKMS,
    //             exHrs1: packageDetails[0]?.extraHours,
    //             night1: packageDetails[0]?.NHalt,
    //             amount5: packageDetails[0]?.Rate,
    //             amount1: calculateExkmAmount(),
    //             amount2: calculateExHrsAmount(),
    //             amount3: calculateNightAmount(),
    //             amount4: calculatedriverconvienceAmount(),
    //             package: packageDetails[0]?.package,
    //             pack: packageDetails[0]?.package,
    //             minhrs: packageDetails[0]?.Hours,
    //             minkm: packageDetails[0]?.KMS,
    //             additionaltime: book.additionaltime || additionalTime.additionaltime,
    //             billingno: book.billingno,
    //             closedate: book.closedate,
    //             closekm: book.closekm,
    //             closetime: book.closetime,
    //             customeradvance: book.customeradvance,
    //             email1: book.email1,
    //             parking: book.parking,
    //             permit: book.permit,
    //             travelsname: selectedCustomerDatas.travelsname || formData.travelsname || selectedCustomerData.travelsname || book.travelsname,
    //             remark: book.remark,
    //             reporttime: formData.reporttime || selectedCustomerData.reporttime || selectedCustomerDatas.reporttime || book.reporttime,
    //             shedin: book.shedin,
    //             shedintime: book.shedintime || formData.shedintime || selectedCustomerData.shedintime,
    //             shedkm: book.shedkm || shedKilometers.shedkm,
    //             shedout: formData.shedout || book.shedout || selectedCustomerData.shedout,
    //             startdate: formData.startdate || formData.startdate || selectedCustomerData.startdate || book.startdate,
    //             startkm: book.startkm,
    //             starttime: formData.starttime || book.starttime || selectedBookingDate.starttime,
    //             toll: book.toll,
    //             vendortoll: book.vendortoll,
    //             vpermettovendor: book.vpermettovendor,
    //             driverName: driverName,
    //             request: selectedCustomerDatas.request || selectedCustomerData.request || formValues.request || book.request,
    //             vehicleName: selectedCustomerDatas.vehicleName || formData.vehicleName || selectedCustomerData.vehicleName || formValues.vehicleName || packageData.vehicleName || book.vehicleName,
    //             vehRegNo: formData.vehRegNo || selectedCustomerData.vehRegNo || formValues.vehRegNo || selectedCustomerDatas.vehRegNo || book.vehRegNo,
    //             Groups: selectedCustomerDatas.Groups || formData.Groups || selectedCustomerData.Groups || formValues.Groups || packageData.Groups || book.Groups,
    //             hireTypes: selectedCustomerDatas.hiretypes || formData.hireTypes || formValues.hireTypes || selectedCustomerData.hireTypes || book.hireTypes,
    //             mobileNo: formData.mobileNo || selectedCustomerData.mobileNo || formValues.mobileNo || selectedCustomerDatas.mobileNo || book.mobileNo,
    //             calcPackage, extraHR, extraKM, package_amount, extrakm_amount, extrahr_amount, ex_kmAmount, ex_hrAmount, nightBta, nightCount, night_totalAmount, driverBeta, driverbeta_Count, driverBeta_amount, totalcalcAmount,
    //             escort, minHour, minKM, transferreport,
    //         };

    //         await axios.post(`${apiUrl}/tripsheet-add`, updatedBook);
    //         handleCancel();
    //         setRow([]);
    //         setRows([]);
    //         setSuccess(true);
    //         handleSendSMS();
    //         handleDriverSendSMS();
    //         handlecheck();
    //         setSuccessMessage("Successfully Added");
    //     } catch {
    //         setError(true);
    //         setErrorMessage("Check your Network Connection");
    //     }
    // };

    // ---------------venodr-----------------------
    const handleAutocompleteVendor = (event, value, name) => {
        const selectedOption = value ? value.label : '';
        if (lockdata) {
            setVendorinfodata((prevBook) => ({
                ...prevBook,
                [name]: selectedOption,
            }))
        }

    }

    const handleDatevendorChange = (date, name) => {
        const formattedDate = dayjs(date).format('YYYY-MM-DD');
        const parsedDate = dayjs(formattedDate).format('YYYY-MM-DD');
        if (lockdata) {
            setVendorinfodata((prevBook) => ({
                ...prevBook,
                [name]: parsedDate,
            }))
        }

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
        setSelectedCustomerDatas((prevData) => ({
            ...prevData,
            [name]: selectedOption,
        }));
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: selectedOption,
        }));
        setTripSheetData((prevValues) => ({
            ...prevValues,
            [name]: selectedOption,
        }));

        // if (!lockdata) {
        //     setVendorinfodata((prevValues) => ({
        //         ...prevValues,
        //         [name]: selectedOption,
        //     }))
        // }
    };

    const travelsdatafetch = async (travelsnamedata) => {
        console.log(travelsnamedata, "datata")
        try {
            const response = await axios.get(`${apiUrl}/travelsnamedetailfetch/${travelsnamedata}`)
            const data = response.data

            setDriverDetails(data)
            setSuccess(true);
            setSuccessMessage("successfully listed");

        } catch (error) {
            setError(true);
            setErrorMessage("Error retrieving vehicle details.");
        }
    }

    const handletravelsAutocompleteChange = (event, value, name) => {
        const selectedOption = value ? value.label : '';

        setBook((prevBook) => ({
            ...prevBook,
            [name]: selectedOption,
        }));
        setSelectedCustomerData((prevData) => ({
            ...prevData,
            [name]: selectedOption,
        }));
        setSelectedCustomerDatas((prevData) => ({
            ...prevData,
            [name]: selectedOption,
        }));
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: selectedOption,
        }));
        setTripSheetData((prevValues) => ({
            ...prevValues,
            [name]: selectedOption,
        }));
        travelsdatafetch(selectedOption)

        // if (!lockdata) {
        //     setVendorinfodata((prevValues) => ({
        //         ...prevValues,
        //         [name]: selectedOption,
        //     }))
        // }
    };



    const handleDateChange = (date, name) => {
        const formattedDate = dayjs(date).format('YYYY-MM-DD');
        const parsedDate = dayjs(formattedDate).format('YYYY-MM-DD');
        setBook((prevBook) => ({
            ...prevBook,
            [name]: parsedDate,
        }));
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: parsedDate,
        }));
        setSelectedCustomerData((prevValues) => ({
            ...prevValues,
            [name]: parsedDate,
        }));
        setTripSheetData((prevValues) => ({
            ...prevValues,
            [name]: parsedDate,
        }));
        if (!lockdata) {
            if (name === "shedOutDate") {
                setVendorinfodata((prev) => ({ ...prev, vendorshedOutDate: parsedDate }))

            }
            else if (name === "shedInDate") {
                setVendorinfodata((prev) => ({ ...prev, vendorshedInDate: parsedDate }))
            }
        }
    };

    // speeddaial
    const handleClick = async (event, actionName) => {
        event.preventDefault();
        try {
            if (actionName === 'List') {
            }
            else if (actionName === 'Cancel') {
                handleCancel();
                setRow([]);
                setRows([]);
            }
            else if (actionName === 'Delete') {
                handleDelete();
                handleCancel();
                setRow([]);
                setRows([]);
            }
            else if (actionName === 'Edit') {
                handleEdit();
            }
            else if (actionName === 'Add') {
                handleAdd();
            }

        } catch {
            setError(true);
            setErrorMessage("Check Network Connection")
        }
    };




    const handleUpload = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.pdf, .jpg, .jpeg, .png';
        input.onchange = handleFileChange;
        input.click();
    };

    const handleFileChange = (event) => {
        const documentType = formData.documenttype || selectedCustomerData.documenttype || book.documenttype || '';
        const tripid = book.tripid || selectedCustomerData.tripid || formData.tripid;
        const file = event.target.files[0];
        if (!file) return;
        if (file) {
            const formData = new FormData();
            formData.append('image', file);


            axios.put(`${apiUrl}/tripsheet_uploads/${tripid}/${documentType}`, formData)
        }
    };


    const calculateTotalTime = () => {
        const shedoutTime = formData.reporttime || selectedCustomerData.reporttime || selectedCustomerDatas.reporttime || book.reporttime
        // const shedinTime = formData.closetime || selectedCustomerData.closetime || book.closetime || '';
        const shedinTime = formData.shedintime || selectedCustomerData.shedintime || selectedCustomerDatas.shedintime || book.shedintime
        const additionalTimeValue = additionalTime.additionaltime || formData.additionaltime || selectedCustomerData.additionaltime || book.additionaltime;
        const totalDays = formData.totaldays || calculateTotalDays() || book.totaldays;

        if (shedoutTime && shedinTime) {
            const startTimeObj = dayjs(shedoutTime, 'HH:mm');
            const closeTimeObj = dayjs(shedinTime, 'HH:mm');
            let totalTimeMinutes = closeTimeObj.diff(startTimeObj, 'minutes');
            let additionalMinutes = 0;

            // Parse additional time value if available
            if (additionalTimeValue) {
                const hoursMatch = additionalTimeValue.match(/(\d+)h/);
                const minutesMatch = additionalTimeValue.match(/(\d+)m/);

                const additionalHours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
                const additionalMinutesFromHours = additionalHours * 60;
                additionalMinutes += additionalMinutesFromHours;

                const additionalMinutesValue = minutesMatch ? parseInt(minutesMatch[1]) : 0;
                additionalMinutes += additionalMinutesValue;
            }


            totalTimeMinutes += additionalMinutes;
            const hours = Math.floor(totalTimeMinutes / 60);
            const minutes = totalTimeMinutes % 60;

            //-------------converting sheOuttime in to minuts -------------
            const [ouHhourStr, outMinutsStr] = shedoutTime.split(':');
            const ouHhoursInt = parseInt(ouHhourStr, 10);
            const outMinutsInt = parseInt(outMinutsStr, 10);
            const shedOutIntValue = (ouHhoursInt * 60) + outMinutsInt;

            //------converting shedin time to minuts ------------
            const [inHoursStr, inMinutsStr] = shedinTime.split(':');
            const inHoursInt = parseInt(inHoursStr, 10);
            const inMinutsInt = parseInt(inMinutsStr, 10);
            const shedInIntValue = (inHoursInt * 60) + inMinutsInt;

            if (totalDays === 2) {
                let num1 = ((1440 - shedOutIntValue) + shedInIntValue)
                num1 += additionalMinutes;
                const hours = Math.floor(num1 / 60);
                const minutes = num1 % 60;
                return `${hours}h ${minutes}m`
            }

            if ((totalDays) >= 3) {
                let num2 = ((1440 - shedOutIntValue) + shedInIntValue) + ((totalDays - 2) * (24 * 60))
                num2 += additionalMinutes;
                const hours = Math.floor(num2 / 60);
                const minutes = num2 % 60;
                return `${hours}h ${minutes}m`
            }
            return `${hours}h ${minutes}m`;
        }
        return '';
    }

    const calculateExkmAmount = () => {
        const exkm = formData.exkm || selectedCustomerData.exkm || book.exkm || packageDetails[0]?.extraKMS;
        const exkmTkm = formData.exkmTkm || selectedCustomerData.exkmTkm || book.exkmTkm;
        if (exkm !== undefined && exkmTkm !== undefined) {
            const totalexKm = exkm * exkmTkm;
            return totalexKm;
        }
        return '';
    };

    const calculateExHrsAmount = () => {
        const exHrs = formData.exHrs || selectedCustomerData.exHrs || book.exHrs || packageDetails[0]?.extraHours;
        const exHrsTHrs = formData.exHrsTHrs || selectedCustomerData.exHrsTHrs || book.exHrsTHrs;
        if (exHrs !== undefined && exHrsTHrs !== undefined) {
            const totalexhrs = exHrs * exHrsTHrs;
            return totalexhrs;
        }
        return '';
    };

    const calculateNightAmount = () => {
        const night = formData.night || selectedCustomerData.night || book.night || packageDetails[0]?.NHalt;
        const nightThrs = formData.nightThrs || selectedCustomerData.nightThrs || book.nightThrs;
        if (night !== undefined && nightThrs !== undefined) {
            const totalnight = night * nightThrs;
            return totalnight;
        }
        return '';
    };

    const calculatedriverconvienceAmount = () => {
        const driverconvenience = formData.driverconvenience || selectedCustomerData.driverconvenience || book.driverconvenience;
        const dtc = formData.dtc || selectedCustomerData.dtc || book.dtc;
        if (driverconvenience !== undefined && dtc !== undefined) {
            const totaldriverconvience = driverconvenience * dtc;
            return totaldriverconvience;
        }
        return '';
    };


    const calculateExkmAmount2 = () => {
        const exkm1 = formData.exkm1 || selectedCustomerData.exkm1 || book.exkm1 || packageDetails[0]?.extraKMS;
        const exkmTkm2 = formData.exkmTkm2 || selectedCustomerData.exkmTkm2 || book.exkmTkm2;
        if (exkm1 !== undefined && exkmTkm2 !== undefined) {
            const totalexKm = exkm1 * exkmTkm2;
            return totalexKm;
        }
        return '';
    };

    const calculateExHrsAmount2 = () => {
        const exHrs1 = formData.exHrs1 || selectedCustomerData.exHrs1 || book.exHrs1 || packageDetails[0]?.extraHours;
        const exHrsTHrs2 = formData.exHrsTHrs2 || selectedCustomerData.exHrsTHrs2 || book.exHrsTHrs2;
        if (exHrs1 !== undefined && exHrsTHrs2 !== undefined) {
            const totalexhrs = exHrs1 * exHrsTHrs2;
            return totalexhrs;
        }
        return '';
    };

    const calculateNightAmount2 = () => {
        const night1 = formData.night || selectedCustomerData.night1 || book.night1 || packageDetails[0]?.NHalt;
        const nightThrs2 = formData.nightThrs2 || selectedCustomerData.nightThrs2 || book.nightThrs2;
        if (night1 !== undefined && nightThrs2 !== undefined) {
            const totalnight = night1 * nightThrs2;
            return totalnight;
        }
        return '';
    };

    const calculatedriverconvienceAmount2 = () => {
        const driverconvenience1 = formData.driverconvenience1 || selectedCustomerData.driverconvenience1 || book.driverconvenience1;
        const dtc2 = formData.dtc2 || selectedCustomerData.dtc2 || book.dtc2;
        if (driverconvenience1 !== undefined && dtc2 !== undefined) {
            const totaldriverconvience = driverconvenience1 * dtc2;
            return totaldriverconvience;
        }
        return '';
    };

    const calculateTotalDays = () => {
        const startDate = formData.startdate || selectedCustomerData.startdate || book.startdate;
        const closeDate = selectedCustomerData.closedate || selectedCustomerData.startdate || book.closedate;
        const shedoutdate = formData.shedOutDate || selectedCustomerData.shedOutDate || book.shedOutDate;
        const shedindate = formData.shedInDate || selectedCustomerData.shedInDate || book.shedInDate;


        if (shedoutdate && shedindate) {
            const shedOutDateObj = dayjs(shedoutdate);
            const shedindateObj = dayjs(shedindate);
            const totalDays = shedindateObj.diff(shedOutDateObj, 'days') + 1;
            if (totalDays > 0) {
                return totalDays;
            }
            return '';
        }
        else if (startDate && closeDate && !shedoutdate && !shedindate) {
            const startDateObj = dayjs(startDate);
            const closeDateObj = dayjs(closeDate);
            const totalDays = closeDateObj.diff(startDateObj, 'days') + 1;
            if (totalDays > 0) {
                return totalDays;
            }
            return '';
        }

        return '';
    };

    const calculateTotalKilometers = () => {
        const startKm = formData.shedout || book.shedout || selectedCustomerData.shedout || '';
        const closeKm = formData.shedin || book.shedin || selectedCustomerData.shedin || selectedCustomerDatas.shedin;

        if (startKm !== undefined && closeKm !== undefined) {
            let totalKm = parseInt(closeKm) - parseInt(startKm);
            const shedKmValue = parseInt(shedKilometers.shedkm) || parseInt(formData.shedkm) || parseInt(selectedCustomerData.shedkm) || parseInt(book.shedkm);
            if (!isNaN(shedKmValue)) {
                totalKm += shedKmValue;
            }
            return totalKm;
        }
        return '';
    };

    function calculateTotalAmount() {
        const amount = parseFloat(formData.amount || selectedCustomerData.amount || book.amount || packageDetails[0]?.Rate) || 0;
        const amount1 = parseFloat(formData.amount1 || selectedCustomerData.amount1 || book.amount1) || calculateExkmAmount() || 0;
        const amount2 = parseFloat(formData.amount2 || selectedCustomerData.amount2 || book.amount2) || calculateExHrsAmount() || 0;
        const amount3 = parseFloat(formData.amount3 || selectedCustomerData.amount3 || book.amount3) || calculateNightAmount() || 0;
        const amount4 = parseFloat(formData.amount4 || selectedCustomerData.amount4 || book.amount4) || calculatedriverconvienceAmount() || 0;

        const totalAmount = amount + amount1 + amount2 + amount3 + amount4;
        return totalAmount;
    }

    function calculateTotalAmount2() {
        const amount5 = parseFloat(formData.amount5 || selectedCustomerData.amount5 || book.amount5 || packageDetails[0]?.Rate);
        const amount6 = parseFloat(formData.amount6 || selectedCustomerData.amount6 || book.amount6) || calculateExkmAmount2();
        const amount7 = parseFloat(formData.amount7 || selectedCustomerData.amount7 || book.amount7) || calculateExHrsAmount2();
        const amount8 = parseFloat(formData.amount8 || selectedCustomerData.amount8 || book.amount8) || calculateNightAmount2();
        const amount9 = parseFloat(formData.amount9 || selectedCustomerData.amount9 || book.amount9) || calculatedriverconvienceAmount2();

        const totalAmount = amount5 + amount6 + amount7 + amount8 + amount9;
        return totalAmount;
    }

    // -=----------------vendorbill-----------------------------------------
    const calculatevendorTotalDays = () => {
        const shedoutdate = vendorinfo?.vendorshedOutDate || "";
        const shedindate = vendorinfo?.vendorshedInDate || ""

        if (shedoutdate && shedindate) {
            const shedOutDateObj = dayjs(shedoutdate);
            const shedindateObj = dayjs(shedindate);
            const totalDays = shedindateObj.diff(shedOutDateObj, 'days') + 1;
            if (totalDays > 0) {
                return totalDays;
            }
            return "";
        }

        return "";
    };
    const checkvendorNightBetaEligible = () => {
        const shedOutTime = vendorinfo?.vendorreporttime || ""

        const shedInTime = vendorinfo?.vendorshedintime || ""

        const totalDays = calculatevendorTotalDays() || vendorinfo?.vendortotaldays

        // console.log(totalDays,"vvvvvv",typeof(totalDays),totalDays<2)



        if (totalDays < 2) {
            let start = shedOutTime?.split(':').map(Number);
            let end = shedInTime?.split(':').map(Number);

            if (start && end) {
                let startMinutes = start[0] * 60 + start[1];
                let endMinutes = end[0] * 60 + end[1];

                let nightStart = 22 * 60;
                let nightEnd = 6 * 60;
                if (startMinutes < nightEnd) startMinutes += 24 * 60;
                if (endMinutes < nightEnd) endMinutes += 24 * 60;
                if (startMinutes >= nightStart) startMinutes += 24 * 60;

                const isStartInNight = (startMinutes >= nightStart || startMinutes < nightEnd);
                const isEndInNight = (endMinutes >= nightStart || endMinutes < nightEnd);

                // console.log("Night Time Check:", isStartInNight || isEndInNight);
                return isStartInNight || isEndInNight;
            }
            return false;
        }
        return true;
    };





    const calculatevendorTotalTime = () => {

        const shedoutTime = vendorinfo?.vendorreporttime || ""

        const shedinTime = vendorinfo?.vendorshedintime || ""

        const totalDays = calculatevendorTotalDays() || vendorinfo?.vendortotaldays


        if (shedoutTime && shedinTime) {
            const startTimeObj = dayjs(shedoutTime, 'HH:mm');
            const closeTimeObj = dayjs(shedinTime, 'HH:mm');
            let totalTimeMinutes = closeTimeObj.diff(startTimeObj, 'minutes');

            const hours = Math.floor(totalTimeMinutes / 60);
            const minutes = totalTimeMinutes % 60;

            //-------------converting sheOuttime in to minuts -------------
            const [ouHhourStr, outMinutsStr] = shedoutTime.split(':');
            const ouHhoursInt = parseInt(ouHhourStr, 10);
            const outMinutsInt = parseInt(outMinutsStr, 10);
            const shedOutIntValue = (ouHhoursInt * 60) + outMinutsInt;

            //------converting shedin time to minuts ------------
            const [inHoursStr, inMinutsStr] = shedinTime.split(':');
            const inHoursInt = parseInt(inHoursStr, 10);
            const inMinutsInt = parseInt(inMinutsStr, 10);
            const shedInIntValue = (inHoursInt * 60) + inMinutsInt;

            if (totalDays === 2) {
                let num1 = ((1440 - shedOutIntValue) + shedInIntValue)
                const hours = Math.floor(num1 / 60);
                const minutes = num1 % 60;
                return `${hours}h ${minutes}m`
            }

            if ((totalDays) >= 3) {
                let num2 = ((1440 - shedOutIntValue) + shedInIntValue) + ((totalDays - 2) * (24 * 60))
                const hours = Math.floor(num2 / 60);
                const minutes = num2 % 60;
                return `${hours}h ${minutes}m`
            }
            return `${hours}h ${minutes}m`;
        }
        return "";
    }

    const calculatevendorTotalKilometers = () => {
        const startKm = vendorinfo?.vendorshedoutkm || "";
        const closeKm = vendorinfo?.vendorshedinkm || "";

        if (startKm !== undefined && closeKm !== undefined) {
            let totalKm = parseInt(closeKm) - parseInt(startKm);

            return totalKm;
        }
        return "";
    };
    const [tripSheetData, setTripSheetData] = useState({
        customer: '',
        address1: '',
        orderedby: '',
        employeeno: '',
        request: '',
        customercode: '',
        guestname: '',
        tripid: '',
        startdate: '',
        duty: '',
        vehType: '',
        vehRegNo: '',
        driverName: '',
        mobileNo: '',
        closedate: '',
        starttime: '',
        startkm: '',
        closetime: '',
        closekm: '',
        totalkm1: '',
        totaltime: '',
        totalDays: '',
        remark: '',
        parking: '',
        permit: '',
    });


    // const handleChange = useCallback((event) => {
    //     const { name, value, checked } = event.target;

    //     setPackageData((prevData) => ({
    //         ...prevData,
    //         [name]: value,
    //     }));
    //     setPackageDetails((prevData) => ({
    //         ...prevData,
    //         [name]: value,
    //     }));
    //     setSelectedCustomerData((prevData) => ({
    //         ...prevData,
    //         [name]: value,
    //     }));
    //     setFormData((prevData) => ({
    //         ...prevData,
    //         [name]: value,
    //     }));
    //     setTripSheetData((prevData) => ({
    //         ...prevData,
    //         [name]: value,
    //     }));

    //     if (event.target.type === 'checkbox') {
    //         setBook((prevBook) => ({
    //             ...prevBook,
    //             [name]: checked,
    //         }));
    //         setSelectedCustomerData((prevData) => ({
    //             ...prevData,
    //             [name]: checked,
    //         }));
    //         setFormData((prevData) => ({
    //             ...prevData,
    //             [name]: checked,
    //         }));
    //         setFormValues((prevValues) => ({
    //             ...prevValues,
    //             [name]: checked,
    //         }));
    //         setTripSheetData((prevValues) => ({
    //             ...prevValues,
    //             [name]: checked,
    //         }));
    //     } else {
    //         if (name === 'starttime') {
    //             const formattedTime = value;
    //             setBook((prevBook) => ({
    //                 ...prevBook,
    //                 [name]: formattedTime,
    //             }));
    //             setSelectedCustomerData((prevData) => ({
    //                 ...prevData,
    //                 [name]: formattedTime,
    //             }));
    //             setFormData((prevData) => ({
    //                 ...prevData,
    //                 [name]: formattedTime,
    //             }));
    //             setTripSheetData((prevData) => ({
    //                 ...prevData,
    //                 [name]: formattedTime,
    //             }));
    //         } else {
    //             setBook((prevBook) => ({
    //                 ...prevBook,
    //                 [name]: value,
    //             }));
    //             setSelectedCustomerData((prevData) => ({
    //                 ...prevData,
    //                 [name]: value,
    //             }));
    //             setSelectedCustomerDatas((prevData) => ({
    //                 ...prevData,
    //                 [name]: value,
    //             }));
    //             setFormData((prevData) => ({
    //                 ...prevData,
    //                 [name]: value,
    //             }));
    //             setFormValues((prevValues) => ({
    //                 ...prevValues,
    //                 [name]: value,
    //             }));
    //             setTripSheetData((prevValues) => ({
    //                 ...prevValues,
    //                 [name]: value,
    //             }));
    //             setShedKilometers((prevValues) => ({
    //                 ...prevValues,
    //                 [name]: value,
    //             }));
    //             setAdditionalTime((prevValues) => ({
    //                 ...prevValues,
    //                 [name]: value,
    //             }));
    //         }
    //     }
    // }, [setSelectedCustomerData, setTripSheetData, setPackageDetails]);

    const handleChange = (event) => {
        const { name, value, checked } = event.target;

        setPackageData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setPackageDetails((prevData) => ({
            ...prevData,
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
        setTripSheetData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (event.target.type === 'checkbox') {
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
            setTripSheetData((prevValues) => ({
                ...prevValues,
                [name]: checked,
            }));

        } else {
            if (name === 'starttime') {
                const formattedTime = value;
                setBook((prevBook) => ({
                    ...prevBook,
                    [name]: formattedTime,
                }));
                setSelectedCustomerData((prevData) => ({
                    ...prevData,
                    [name]: formattedTime,
                }));
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: formattedTime,
                }));
                setTripSheetData((prevData) => ({
                    ...prevData,
                    [name]: formattedTime,
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
                setSelectedCustomerDatas((prevData) => ({
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
                setTripSheetData((prevValues) => ({
                    ...prevValues,
                    [name]: value,
                }));
                setShedKilometers((prevValues) => ({
                    ...prevValues,
                    [name]: value,
                }));
                setAdditionalTime((prevValues) => ({
                    ...prevValues,
                    [name]: value,
                }));

            }
        }
    };


    // prob004
    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const tripid = event.target.value;
            const loginUserName = await localStorage.getItem("username")

            try {

                if (tripid !== null && tripid !== "undefined" && tripid && loginUserName) {

                    const response = await axios.get(`${apiUrl}/tripsheet-enter/${tripid}`, { params: { loginUserName } });
                    const bookingDetails = response.data;

                    if (response.status === 200 && bookingDetails) {
                        if (bookingDetails.status === "Cancelled") {
                            setError(true)
                            setErrorMessage("Trip Cancelled")
                            setSelectedCustomerData({});
                            setSelectedCustomerId({});
                            return
                        }
                        else {
                            const { duty, shedInDate, reporttime, shedintime, shedout, shedin, remark, vehicleName, ...restdatavendor } = bookingDetails
                            setSelectedCustomerData(bookingDetails);
                            console.log(bookingDetails, "hhhhh")
                            setSelectedCustomerId(bookingDetails.tripid);
                            if (!lockdata) {


                                setVendorinfodata(restdatavendor)
                                setVendorbilldata(bookingDetails)
                            }

                            //--------------calc---------

                            setcalcPackage(bookingDetails.calcPackage);
                            setExtraHR(bookingDetails.extraHR);
                            setExtraKM(bookingDetails.extraKM);
                            setpackage_amount(bookingDetails.package_amount);
                            setextrakm_amount(bookingDetails.extrakm_amount);
                            setextrahr_amount(bookingDetails.extrahr_amount);
                            setEx_kmAmount(bookingDetails.ex_kmAmount);
                            setEx_HrAmount(bookingDetails.ex_hrAmount);
                            setNightBeta(Number(bookingDetails.nightBta));
                            setNightCount(bookingDetails.nightCount);
                            setnight_totalAmount(bookingDetails.night_totalAmount);
                            setdriverBeta(bookingDetails.driverBeta);
                            setdriverbeta_Count(bookingDetails.driverbeta_Count);
                            setdriverBeta_amount(bookingDetails.driverBeta_amount);
                            setTotalcalcAmount(bookingDetails.totalcalcAmount);

                            //---------------------------

                            setEscort(bookingDetails.escort)
                            setTransferreport(bookingDetails.transferreport)
                            //----------
                            setSmsGuest(false)
                            setSendEmail(false)
                            setDriverSMS(false)
                            setSuccess(true);
                            setSuccessMessage("Successfully listed");
                            setIsEditMode(true);
                        }
                    } else {
                        setError(true);
                        setErrorMessage("No data found");
                    }
                }
                else {
                    setError(true);
                    setErrorMessage("Enter tripid");
                }


                getMapImaage();
                getSignatureImage();
                invoiceRouteData();
                getAttachedImage();

            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setError(true);
                    setErrorMessage("Tripsheet not found");
                } else {
                    setError(true);
                    setErrorMessage("Failed to fetch data");
                }
            }
        }
    }



    const handleRowClick = (params) => {
        setSelectedCustomerDatas(params);
        console.log(params, "dataseleleelel")
        if (!lockdata) {
            // setVendorinfodata(params.vechicleName)
            setVendorinfodata({ ...vendorinfo, vendor_ratename: params.rateType })
            setRate_name(params.rateType)

            // setVendorinfodata({ ...vendorinfo, vendor_vehicle: params.vehicleName })
        }
        // handleChange({ target: { name: "vehRegNo", value: params.vehRegNo } });
        // // handleChange({ target: { name: "vehRegNo", value: params.vehRegNo } });
        // handleChange({ target: { name: "vehType", value: params.vehType } })
        // handleChange({ target: { name: "vehType", value: params.vehType } })

    };




    const handleSendSMS = async () => {
        if (smsguest || formData.smsguest || book.smsguest) {
            try {
                const dataToSend = {
                    tripid: formData.tripid || selectedCustomerData.tripid || book.tripid,
                    driverName: selectedCustomerDatas.driverName || selectedCustomerData.driverName || tripSheetData.driverName || selectedCustomerDatas.driverName || book.driverName,
                    // driverName: selectedCustomerDatas?.driverName || formData.driverName || selectedCustomerData.driverName || formValues.driverName || book.driverName,
                    mobileNo: formData.mobileNo || selectedCustomerData.mobileNo || formValues.mobileNo || selectedCustomerDatas.mobileNo || book.mobileNo || '',
                    guestname: formValues.guestname || selectedCustomerData.guestname || book.guestname || formData.guestname || '',
                    guestmobileno: formValues.guestmobileno || selectedCustomerData.guestmobileno || book.guestmobileno || formData.guestmobileno || '',
                    vehRegNo: formValues.vehRegNo || selectedCustomerData.vehRegNo || book.vehRegNo || formData.vehRegNo,
                    vehType: formValues.vehType || selectedCustomerData.vehType || book.vehType || formData.vehType,
                    reporttime: formValues.reporttime || formData.reporttime || selectedCustomerData.reporttime || book.reporttime || '',
                    startdate: formValues.startdate || formData.startdate || selectedCustomerData.startdate || book.startdate || '',
                    ofclanno: '044-49105959',
                };

                const response = await fetch(`${apiUrl}/tripguest-send-sms`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataToSend),
                });


                if (response.ok) {
                    setSuccess(true);
                    setSuccessMessage("SMS sent correctly");
                } else {
                    setError(true);
                    setErrorMessage("Failed to send SMS");
                }
            } catch {
            }
        }
    };
    //send sms from tripsheet to driver
    // const [DriverSMS, setDriverSMS] = useState(false);

    const handleDriverSendSMS = async () => {
        if (DriverSMS || formData.DriverSMS || book.DriverSMS) {
            try {
                const dataSend = {
                    tripid: formData.tripid || selectedCustomerData.tripid || book.tripid,
                    address1: formData.address1 || selectedCustomerData.address1 || formValues.address1 || selectedCustomerDatas.address1 || book.address1 || '',

                    mobileNo: formData.mobileNo || selectedCustomerData.mobileNo || formValues.mobileNo || selectedCustomerDatas.mobileNo || book.mobileNo || '',
                    guestname: formValues.guestname || selectedCustomerData.guestname || book.guestname || formData.guestname || '',
                    guestmobileno: formValues.guestmobileno || selectedCustomerData.guestmobileno || book.guestmobileno || formData.guestmobileno || '',
                    reporttime: formValues.reporttime || formData.reporttime || selectedCustomerData.reporttime || book.reporttime || '',
                    startdate: formValues.startdate || formData.startdate || selectedCustomerData.startdate || book.startdate || '',
                };

                const response = await fetch(`${apiUrl}/tripdriver-send-sms`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataSend),
                });

                if (response.ok) {
                    setSuccess(true);
                    setSuccessMessage("SMS sent correctly");
                } else {
                    setError(true);
                    setErrorMessage("Failed to send SMS");
                }
            } catch {
            }
        }
    };
    // for invoice page
    const [signimageUrl, setSignImageUrl] = useState('');
    const [attachedImage, setAttachedImage] = useState('');
    const [GmapimageUrl, setGMapImageUrl] = useState('');
    const [routeData, setRouteData] = useState('');


    const invoiceRouteData = async () => {
        const tripid = formData.tripid || selectedCustomerData.tripid || book.tripid;
        try {
            if (tripid !== null && tripid !== "undefined" && tripid) {
                const response = await fetch(`${apiUrl}/routedata/${encodeURIComponent(tripid)}`);  /// pob004

                if (response.status === 200) {
                    const routeData = await response.json();
                    setRouteData(routeData);
                }
                return;
            }
        } catch (error) {
            console.log("Error", error)
        }
    };

    const siganturediaglogclose = () => {
        setSignaturepopup(false)
    }

    const handlesignaturemageDownload = () => {
        const link = document.createElement('a');
        link.href = signimageUrl;
        link.download = 'image.png'; // You can change the file name and extension as needed
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    const getSignatureImage = async () => {
        const tripid = formData.tripid || selectedCustomerData.tripid || book.tripid;
        try {
            if (tripid !== null && tripid && tripid !== "undefined") {
                const response = await fetch(`${apiUrl}/get-signimage/${tripid}`);   /// prob004
                if (response.status === 200) {
                    const imageUrl = URL.createObjectURL(await response.blob());
                    setSignImageUrl(imageUrl);
                }
            }
        } catch (err) {
            console.log(err, 'error');
        }
    };
    const handleFileChangesignature = async (event) => {
        const file = event.target.files[0];
        const tripiddata = formData.tripid || selectedCustomerData.tripid || book.tripid
        if (file !== null) {
            const formData = new FormData();
            formData.append("signature_image", file);
            try {
                await axios.post(`${APIURL}/api/uploadsignaturedata/${tripiddata}`, formData);
                getSignatureImage()



            }
            catch (err) {
                console.log(err)
            }


        }
        else {
            return
        }
    };

    const handlesignaturemageDelete = async () => {
        const tripiddata = formData.tripid || selectedCustomerData.tripid || book.tripid
        try {

            const responsedata = await axios.delete(`${apiUrl}/api/signatureimagedelete/${tripiddata}`)
            setSignaturepopup(false);
            setSignImageUrl('')
            getSignatureImage()
        }
        catch (err) {
            console.log(err)

        }
    }



    const getMapImaage = async () => {
        try {
            const tripid = formData.tripid || selectedCustomerData.tripid || book.tripid;
            if (tripid !== null && tripid && tripid !== "undefined") {
                const response = await fetch(`${apiUrl}/getmapimages/${tripid}`);
                if (response.status === 200) {
                    const responseData = await response.blob();
                    const imageUrl = URL.createObjectURL(responseData);
                    setGMapImageUrl(imageUrl);

                }
            }
            return '';
        } catch (error) {
            console.log("Error", error)
        }
    };




    const getAttachedImage = async () => {
        try {
            const tripid = formData.tripid || selectedCustomerData.tripid || book.tripid;

            if (tripid !== null && tripid && tripid !== "undefined") {
                const response = await fetch(`${apiUrl}/get-attachedimage/${tripid}`);
                if (response.status === 200) {
                    const data = await response.json();
                    const attachedImageUrls = data.imagePaths.map(path => `${apiUrl}/images/${path}`);
                    setAttachedImage(attachedImageUrls);
                }
            }
        } catch (error) {
            console.log("Error", error)
        }
    };


    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const organizationname = localStorage.getItem('usercompany');

                if (!organizationname || organizationname === "undefined") {
                    return;
                }
                if (organizationname) {
                    const response = await fetch(`${apiUrl}/get-companyimage/${organizationname}`);

                    if (response.status === 200) {
                        const data = await response.json();
                        const attachedImageUrls = data.imagePaths.map(path => `${apiUrl}/public/org_logo/${path}`);
                        localStorage.setItem('selectedImage', JSON.stringify(attachedImageUrls));
                        setSelectedImage(attachedImageUrls);
                    } else {
                        const timer = setTimeout(fetchData, 2000);
                        return () => clearTimeout(timer);
                    }
                }
            } catch (error) {
                console.log("Error", error)
            }
        };

        fetchData();
    }, [apiUrl]);




    // useEffect(() => {
    //     const fetchData = async () => {
    //         const encoded = localStorage.getItem('usercompany');
    //         localStorage.setItem('usercompanyname', encoded);
    //         // const storedcomanyname = localStorage.getItem('usercompanyname');
    //         // const organizationname = decodeURIComponent(storedcomanyname);

    //         if (encoded === "undefined") {
    //             return;
    //         }

    //         try {
    //             const response = await fetch(`${apiUrl}/organizationdata/${encoded}`);
    //             if (response.status === 200) {

    //                 const userDataArray = await response.json();
    //                 if (userDataArray.length > 0) {
    //                     setorganizationData(userDataArray[0]);

    //                 }
    //             }

    //             else {
    //                 const timer = setTimeout(fetchData, 2000);
    //                 return () => clearTimeout(timer);
    //             }
    //         } catch (error) {
    //             console.log("Error", error)
    //         }
    //     };

    //     fetchData();
    // }, [apiUrl, sendEmail, location, organizationdata]);
    const dataname = localStorage.getItem('usercompany')

    useEffect(() => {
        const fetchData = async () => {
            const encoded = localStorage.getItem('usercompany');
            localStorage.setItem('usercompanyname', encoded);
            // const storedcomanyname = localStorage.getItem('usercompanyname');
            // const organizationname = decodeURIComponent(storedcomanyname);

            if (encoded === "undefined") {
                return;
            }

            try {
                const response = await fetch(`${apiUrl}/organizationdata/${encoded}`);
                if (response.status === 200) {

                    const userDataArray = await response.json();
                    if (userDataArray.length > 0) {
                        setorganizationData(userDataArray[0]);
                        setTriggerData(!triggerdata)

                    }

                }

                else {
                    const timer = setTimeout(fetchData, 2000);
                    return () => clearTimeout(timer);
                }
            } catch (error) {
                console.log("Error", error)
            }
        };

        fetchData();
    }, [apiUrl, sendEmail, location, organizationdata, triggerdata, dataname]);




    //-----------------------------------------------extra amounts 

    // let v_permit_vendor = Number(formData.vpermettovendor || selectedCustomerData.vpermettovendor || book.vpermettovendor || 0);
    let permit = Number(formData.permit || selectedCustomerData.permit || book.permit || 0);
    let parking = Number(formData.parking || selectedCustomerData.parking || book.parking || 0);
    let toll = Number(formData.toll || selectedCustomerData.toll || book.toll || 0);
    // let vender_toll = Number(formData.vendortoll || selectedCustomerData.vendortoll || book.vendortoll || 0);
    let customer_advance = Number(formData.customeradvance || selectedCustomerData.customeradvance || book.customeradvance || 0);

    //--------------------------------------------------------------------------
    // convert time into hours  
    function convertTimeToNumber(timeString) {
        // Split the time string into hours and minutes
        const [hours, minutes] = timeString.split('h').map(str => parseInt(str));

        // Calculate the total hours
        const totalHours = hours + (minutes || 0) / 60; // if no minutes provided, consider it as 0
        return totalHours;
    }


    useEffect(() => {
        const calcdata = () => {
            if (nightBta && nightCount > 1) {
                let nightTotalAmounts = Number(nightBta) * Number(nightCount)
                setnight_totalAmount(nightTotalAmounts)
            }
            else if (nightBta) {
                setnight_totalAmount(Number(nightBta))
            }
            else {
                setnight_totalAmount()
            }
        }
        calcdata();
    }, [nightBta, nightCount])



    const driverBeta_calc = (e) => {
        setdriverBeta(e.target.value)
    }

    const driverbeta_Count_calc = (e) => {
        setdriverbeta_Count(e.target.value)
    }

    const checkNightBetaEligible = () => {
        const shedOutTime = formData.reporttime || selectedCustomerData.reporttime || selectedCustomerDatas.reporttime || book.reporttime;
        const shedInTime = formData.shedintime || selectedCustomerData.shedintime || book.shedintime;

        const totalDays = calculateTotalDays();
        if (totalDays < 2) {
            let start = shedOutTime?.split(':').map(Number);
            let end = shedInTime?.split(':').map(Number);

            if (start && end) {
                let startMinutes = start[0] * 60 + start[1];
                let endMinutes = end[0] * 60 + end[1];

                let nightStart = 22 * 60;
                let nightEnd = 6 * 60;
                if (startMinutes < nightEnd) startMinutes += 24 * 60;
                if (endMinutes < nightEnd) endMinutes += 24 * 60;
                if (startMinutes >= nightStart) startMinutes += 24 * 60;

                const isStartInNight = (startMinutes >= nightStart || startMinutes < nightEnd);
                const isEndInNight = (endMinutes >= nightStart || endMinutes < nightEnd);

                // console.log("Night Time Check:", isStartInNight || isEndInNight);
                return isStartInNight || isEndInNight;
            }
            return false;
        }
        return true;
    };


    useEffect(() => {
        const calcdata = () => {
            if (driverBeta && driverbeta_Count > 1) {
                let driverbetaAmount = Number(driverBeta) * Number(driverbeta_Count)
                setdriverBeta_amount(Number(driverbetaAmount))

            } else if (driverBeta) {
                setdriverBeta_amount(Number(driverBeta))
            } else {
                setdriverBeta_amount()
            }
        }
        calcdata();
    }, [driverBeta, driverbeta_Count])


    //------------total amount calculations 

    let [totalcalcAmount, setTotalcalcAmount] = useState(0)

    // useEffect(() => {
    //     const totalAmountCalc = () => {
    //         // const totalcalc = Number(package_amount) + Number(ex_hrAmount) + Number(ex_kmAmount) + Number(night_totalAmount) + Number(driverBeta_amount) + Number(v_permit_vendor) + Number(permit) + Number(parking) + Number(toll) + Number(vender_toll);
    //         const totalcalc = Number(package_amount) + Number(ex_hrAmount) + Number(ex_kmAmount) + Number(night_totalAmount) + Number(driverBeta_amount) + Number(permit) + Number(parking) + Number(toll);
    //         const total = totalcalc - Number(customer_advance)
    //         const convetTotal = Math.ceil(total)
    //         setTotalcalcAmount(Number(convetTotal));
    //     }
    //     totalAmountCalc()
    // }, [package_amount, ex_hrAmount, ex_kmAmount, night_totalAmount, driverBeta_amount, customer_advance, parking, permit, toll])

    useEffect(() => {
        const totalAmountCalc = () => {
            // const totalcalc = Number(package_amount) + Number(ex_hrAmount) + Number(ex_kmAmount) + Number(night_totalAmount) + Number(driverBeta_amount) + Number(v_permit_vendor) + Number(permit) + Number(parking) + Number(toll) + Number(vender_toll);
            const totalcalc = Number(package_amount) + Number(ex_hrAmount) + Number(ex_kmAmount) + (checkNightBetaEligible() ? Number(night_totalAmount) : 0) + ((vendorinfo?.vendor_duty === "Outstation") ? Number(driverBeta_amount) : 0) + Number(permit) + Number(parking) + Number(toll);
            const total = totalcalc - Number(customer_advance)
            const convetTotal = Math.ceil(total)

            setTotalcalcAmount(Number(convetTotal));
        }
        totalAmountCalc()
    }, [package_amount, ex_hrAmount, ex_kmAmount, night_totalAmount, driverBeta_amount, customer_advance, parking, permit, toll, checkNightBetaEligible])

    // extra Amount calculation--------------------------
    useEffect(() => {
        const extraClac = () => {
            let extraAbout_hr = Number(extraHR) * Number(extrahr_amount)
            setEx_HrAmount(extraAbout_hr)
        }
        extraClac();
    }, [extraHR, extrahr_amount])

    useEffect(() => {
        const extraClac = () => {
            let extraAbout_km = Number(extraKM) * Number(extrakm_amount)
            setEx_kmAmount(extraAbout_km)
        }
        extraClac();
    }, [extraKM, extrakm_amount])

    //----------------------------------------------------

    // -------------------------------------------vendorbilldata--------------------

    useEffect(() => {
        const VendorextraClac = () => {
            let extraAbout_hr = Number(vendorbilldata?.Vendor_ExtraHours || vendorpassvalue.Vendor_ExtraHours) * Number(vendorbilldata?.Vendor_ExtraAmountHours || vendorpassvalue.Vendor_ExtraAmountHours)
            setVendorExtrahrTotaldataAmount(extraAbout_hr)
            // setVendorbilldata({ ...vendorbilldata, Vendor_totalAmountHours: extraAbout_hr })
            setVendorbilldata(prevData => ({
                ...prevData,
                Vendor_totalAmountHours: extraAbout_hr
            }));


        }
        VendorextraClac();
    }, [vendorbilldata?.Vendor_ExtraHours, vendorbilldata?.Vendor_ExtraAmountHours, vendorpassvalue.Vendor_ExtraHours, vendorpassvalue.Vendor_ExtraAmountHours])


    useEffect(() => {
        const VendorextraClac = () => {
            let extraAbout_km = Number(vendorbilldata.Vendor_ExtraKms || vendorpassvalue.Vendor_ExtraKms) * Number(vendorbilldata.Vendor_ExtraAmountKms || vendorpassvalue.Vendor_ExtraAmountKms)
            // setVendorExtraKmTotalAmount(extraAbout_km)

            setVendorbilldata(prevData => ({
                ...prevData,
                Vendor_totalAmountKms: extraAbout_km
            }));

            setVendorExtraKmTotalAmount(extraAbout_km)



        }
        VendorextraClac();
    }, [vendorbilldata.Vendor_ExtraKms, vendorbilldata.Vendor_ExtraAmountKms, vendorpassvalue.Vendor_ExtraKms, vendorpassvalue.Vendor_ExtraAmountKms])




    useEffect(() => {
        const calcdatavendor = () => {
            if ((vendorbilldata.Vendor_NightHALT || vendorpassvalue.Vendor_NightHALT) && (vendorbilldata.Vendor_NightBataAmount || vendorpassvalue.Vendor_NightBataAmount) > 1) {

                let vendornightTotalAmounts = Number(vendorbilldata.Vendor_NightHALT || vendorpassvalue.Vendor_NightHALT) * Number(vendorbilldata.Vendor_NightBataAmount || vendorpassvalue.Vendor_NightBataAmount)
                setVendorNightbhatatotalAmount(vendornightTotalAmounts)
            }
            else if (vendorbilldata.Vendor_NightHALT || vendorpassvalue.Vendor_NightHALT) {
                const data = vendorbilldata.Vendor_NightHALT || vendorpassvalue.Vendor_NightHALT
                setVendorNightbhatatotalAmount(data)


                // setVendorbilldata({...vendorbilldata,Vendor_NightbataTotalAmount:Number(vendorbilldata.Vendor_NightHALT)})
            }
            else {

                // setVendorbilldata({...vendorbilldata,Vendor_NightbataTotalAmount:""})
                setVendorNightbhatatotalAmount('')

            }
        }
        calcdatavendor();
    }, [vendorbilldata.Vendor_NightHALT, vendorbilldata.Vendor_NightBataAmount, vendorbilldata, vendorpassvalue.Vendor_NightHALT, vendorpassvalue.Vendor_NightBataAmount])



    useEffect(() => {
        const calcdatavendor = () => {
            if ((vendorbilldata.Vendor_Bata || vendorpassvalue.Vendor_Bata) && (vendorbilldata.Vendor_BataAmount || vendorpassvalue.Vendor_BataAmount) > 1) {

                let vendordriverbetaAmount = Number(vendorbilldata.Vendor_Bata || vendorpassvalue.Vendor_Bata) * Number(vendorbilldata.Vendor_BataAmount || vendorpassvalue.Vendor_BataAmount)
                setVendorbilldata({ ...vendorbilldata, Vendor_BataTotalAmount: Number(vendordriverbetaAmount) })

            } else if (vendorbilldata.Vendor_Bata || vendorpassvalue.Vendor_Bata) {

                setVendorbilldata({ ...vendorbilldata, Vendor_BataTotalAmount: Number(vendorbilldata.Vendor_Bata || vendorpassvalue.Vendor_Bata) })
            } else {
                setVendorbilldata({ ...vendorbilldata, Vendor_BataTotalAmount: "" })
            }
        }
        calcdatavendor();
    }, [vendorbilldata.Vendor_Bata, vendorbilldata.Vendor_BataAmount, vendorbilldata, vendorpassvalue.Vendor_Bata, vendorpassvalue.Vendor_BataAmount])


    function calculatevendorTotalAmount() {

        const amount = parseFloat(vendorbilldata.Vendor_rateAmount || vendorpassvalue.Vendor_rateAmount) || 0;
        const amount1 = parseFloat(vendorExtrahrTotalAmount || vendorbilldata.Vendor_totalAmountHours || vendorpassvalue.Vendor_totalAmountHours) || 0;
        const amount2 = parseFloat(vendorExtarkmTotalAmount || vendorbilldata.Vendor_totalAmountKms || vendorpassvalue.Vendor_totalAmountKms) || 0;
        const amount3 = parseFloat(vendorinfo?.vendor_duty === "Outstation" ? vendorbilldata.Vendor_BataTotalAmount || vendorpassvalue.Vendor_BataTotalAmount : 0) || 0;
        // const amount4 = parseFloat(vendornightdatatotalAmount || vendorbilldata.Vendor_NightbataTotalAmount || vendorpassvalue.Vendor_NightbataTotalAmount) || 0;
        const amount4 = parseFloat(checkvendorNightBetaEligible() ? vendornightdatatotalAmount || vendorbilldata.Vendor_NightbataTotalAmount || vendorpassvalue.Vendor_NightbataTotalAmount : 0) || 0;
        const amount5 = parseFloat(vendorinfo.vendor_vpermettovendor || vendorinfo?.vpermettovendor) || 0;
        const amount6 = parseFloat(vendorinfo.vendor_toll || vendorinfo?.vendortoll) || 0;
        const amount7 = parseFloat(vendorinfo.vendor_advancepaidtovendor || vendorinfo?.advancepaidtovendor) || 0;
        // console.log(amount4,"ammmm",vendorbilldata.Vendor_NightbataTotalAmount,"ff")vendor_toll
        console.log(vendorinfo.vendor_vpermettovendor, "callaveb", vendorinfo?.vpermettovendor)
        console.log(amount7, "ammmmmmm", vendorinfo.vendor_advancepaidtovendor, "adavs", vendorinfo?.advancepaidtovendor)

        console.log(amount, "a", amount1, "a1", amount2, "a2", amount3, "a3", amount4, "abcd", amount5, "vprmit", amount6, "aaa", checkvendorNightBetaEligible())

        const totalAmount = amount + amount1 + amount2 + amount3 + amount4 + amount5 + amount6;
        const fullAmount = totalAmount - amount7;
        const fullamountdata = Math.ceil(fullAmount);
        console.log(Math.ceil(fullAmount), "mathhhW32222hh")
        console.log(totalAmount, "fulltotalamount", typeof (fullAmount), Number(fullAmount), typeof (Number(fullAmount)))
        setVendorbilldata({ ...vendorbilldata, Vendor_FULLTotalAmount: fullamountdata })
        // return totalAmount;
    }


    useEffect(() => {
        calculatevendorTotalAmount()
    }, [vendorbilldata.Vendor_rateAmount, vendorbilldata.Vendor_totalAmountHours, vendorbilldata.Vendor_totalAmountKms, vendorbilldata.Vendor_NightbataTotalAmount, vendorbilldata.Vendor_BataTotalAmount, vendornightdatatotalAmount, vendorExtrahrTotalAmount, vendorExtarkmTotalAmount, vendorinfo.vpermettovendor, vendorinfo.vendortoll, vendorinfo.vendor_vpermettovendor, vendorinfo.vendor_toll, vendorinfo.vendor_advancepaidtovendor, vendorinfo?.advancepaidtovendor, checkvendorNightBetaEligible()])


    let vendordata, vendortotkm, vendortothr, vendortotalHours, vendorduty, vendorvehicleNames, vendorratetype;


    const handleVendorcalc = async () => {
        try {
            // vendorduty = vendorinfo.vendor_duty || vendorinfo.duty;
            // vendorvehicleNames = vendorinfo.vendor_vehicle || vendorinfo.vehicleName;
            vendorduty = vendorinfo.vendor_duty || ""
            vendorvehicleNames = vendorinfo.vendor_vehicle || ratename || "";
            vendortotkm = await (calculatevendorTotalKilometers() || vendorinfo.vendortotalkm);
            vendortothr = await (calculatevendorTotalTime() || vendorinfo.vendorTotaltime);
            // vendororganizationname = formData.customer || selectedCustomerData.customer || book.customer || packageData.customer || ''
            vendorratetype = vendorinfo.vendor_ratename || ratename || ""

            console.log(vendortotkm, "kkkcc", vendorratetype, vendortothr, "hrr", vendorduty, "duty", vendorvehicleNames, "namorg")


            if (!vendortotkm || !vendortothr || !vendorduty || !vendorvehicleNames || !vendorratetype) {
                setError(true);
                setErrorMessage("Check Hour & KM & duty and vehiletype.! ")
                return;
            }
            // if (vendorhiretype !== "Attached Vehicle") {
            //     setError(true);
            //     setErrorMessage(" check Its not Attached vehicle ")
            //     return;
            // }

            vendortotalHours = await convertTimeToNumber(vendortothr);
            console.log(vendortotalHours, "vendortotalhours")
            const consvertedTotalHour = parseFloat(vendortotalHours.toFixed(2))
            console.log(consvertedTotalHour, "vend")

            const response = await axios.get(`${apiUrl}/totalhrsuppiler-pack`, {
                params: {
                    totkm: vendortotkm,
                    // totalHours: vendortotalHours,
                    totalHours: consvertedTotalHour,
                    duty: vendorduty,
                    vehicleName: vendorvehicleNames,
                    organizationname: vendorratetype,
                    ratetype: "Supplier",
                }
            });
            vendordata = response.data;
            // console.log(vendordata,"vendorrrrrrrr")

            const packages = vendordata.package;
            const Hours = Number(vendordata.Hours);
            const KMS = Number(vendordata.KMS);
            const Rate = Number(vendordata.Rate);
            const extraHours = Number(vendordata.extraHours);
            const extraKMS = Number(vendordata.extraKMS);
            const NHalt = Number(vendordata.NHalt);
            const Bata = Number(vendordata.Bata);
            console.log(packages, Hours, KMS, Rate, extraHours, extraKMS, NHalt, Bata)
            let dataextrahous, dataextrakms

            if (consvertedTotalHour > Hours) {

                let time = consvertedTotalHour - Hours;
                console.log(time, "hhhhtime")
                const convertedTime = Number(time.toFixed(2))

                dataextrahous = convertedTime
            }

            if (vendortotkm > KMS) {

                let KM = (Number(vendortotkm) - Number(KMS))
                dataextrakms = KM
            }

            console.log(dataextrahous, "hrs", dataextrakms, "kmsss")




            setVendorbilldata({
                Vendor_Calcpackage: packages,
                Vendor_KMS: KMS,
                Vendor_Hours: Hours,
                Vendor_rateAmount: Rate,
                // Assuming these fields should have similar values
                // Assuming these fields should have similar values
                Vendor_ExtraAmountKms: extraKMS,
                Vendor_ExtraAmountHours: extraHours,
                Vendor_Bata: Bata,
                Vendor_NightHALT: NHalt,
                Vendor_ExtraHours: dataextrahous,
                Vendor_ExtraKms: dataextrakms,


            });
            //    
        }
        catch (err) {

            if (err.response.status === 404) {
                setError(true)
                setErrorMessage("Data Not Found")
            }
            else if (err.response.status === 500) {
                setError(true)
                setErrorMessage("Fetching Error")
            }
            else {
                console.log("pack fetch ", err)
            }

        }
    }



    const handlevendor_billdata = (event) => {
        const { name, value } = event.target;
        setVendorbilldata((prevBook) => ({
            ...prevBook,
            [name]: value,
        }))

    }
    const handlevendorinfofata = (event) => {
        const { name, value } = event.target;
        console.log(name, "value", value)
        if (lockdata) {
            if (name === "vendorshedoutkm") {
                vendorinfo.shedout = ""
                setVendorinfodata((data) => ({
                    ...data,
                    [name]: value,
                }))
            }
            else if (name === "vendorRemarks") {
                vendorinfo.remark = ""
                setVendorinfodata((data) => ({
                    ...data,
                    [name]: value,
                }))
            }
            else {
                vendorinfo.shedin = ""
                setVendorinfodata((data) => ({
                    ...data,
                    [name]: value,
                }))
            }
        }


    }        // -----------------------------------------------------------------------vendorbilldata------------------
    // cncel
    const calcCancel = () => {
        totalHours = "";
        totkm = "";
        totalcalcAmount = ""
        setcalcPackage();
        setExtraHR();
        setExtraKM();
        setpackage_amount();
        setextrakm_amount();
        setextrahr_amount();
        setEx_kmAmount();
        setEx_HrAmount();
        setNightBeta();
        setNightCount();
        setnight_totalAmount();
        setdriverBeta();
        setdriverbeta_Count();
        setdriverBeta_amount();
        setTotalcalcAmount();
    }

    // calc function

    let data, totkm, tothr, totalHours, duty, vehicleNames, organizationname;
    const handleCalc = async () => {
        try {

            duty = formData.duty || selectedCustomerData.duty || book.duty;
            vehicleNames = selectedCustomerDatas.vehicleName || formData.vehicleName || selectedCustomerData.vehicleName || formValues.vehicleName || packageData.vehicleName || book.vehicleName;
            // totkm = await (formData.totalkm1 || packageData.totalkm1 || book.totalkm1 || selectedCustomerData.totalkm1 || calculateTotalKilometers() || '');
            totkm = await (calculateTotalKilometers() || formData.totalkm1 || packageData.totalkm1 || book.totalkm1 || selectedCustomerData.totalkm1 || calculateTotalKilometers() || '');
            tothr = await (formData.totaltime || packageData.totaltime || book.totaltime || selectedCustomerData.totaltime || calculateTotalTime() || '');
            organizationname = formData.customer || selectedCustomerData.customer || book.customer || packageData.customer || ''


            if (!totkm || !tothr || !duty || !vehicleNames || !organizationname) {
                setError(true);
                setErrorMessage("Check Hour & KM & duty and vehiletype.! ")
                return;
            }

            totalHours = await convertTimeToNumber(tothr);
            const consvertedTotalHour = parseFloat(totalHours.toFixed(2))

            const response = await axios.get(`${apiUrl}/t4hr-pack`, {
                params: {
                    totkm: totkm,
                    totalHours: totalHours,
                    duty: duty,
                    vehicleName: vehicleNames,
                    organizationname: organizationname,
                }
            });
            data = response.data;

            const packages = data.package;
            const Hours = Number(data.Hours);
            const KMS = Number(data.KMS);
            const Rate = Number(data.Rate);
            const extraHours = Number(data.extraHours);
            const extraKMS = Number(data.extraKMS);
            const NHalt = Number(data.NHalt);
            const Bata = Number(data.Bata);

            // if (consvertedTotalHour > Hours) {

            //     let time = consvertedTotalHour - Hours;
            //     const convertedTime = Number(time.toFixed(2))
            //     setExtraHR(convertedTime);
            // }

            // if (totkm > KMS) {
            //     let KM = (Number(totkm) - Number(KMS))
            //     setExtraKM(KM);
            // }

            if (consvertedTotalHour > Hours) {
                let time = consvertedTotalHour - Hours;
                const convertedTime = Number(time.toFixed(2))
                setExtraHR(convertedTime);
            } else {
                setExtraHR('')
            }
            console.log("total km", totkm)
            if (totkm > KMS) {
                let KM = (Number(totkm) - Number(KMS))
                setExtraKM(KM);
            } else {
                setExtraKM("")
            }


            handleClickOpen() // for calc pop up

            setcalcPackage(packages);
            setpackage_amount(Rate);
            setextrakm_amount(extraKMS);
            setextrahr_amount(extraHours);
            setNightBeta(NHalt);
            setdriverBeta(Bata);

            setMinHour(Hours);
            setMinKM(KMS);
        }
        catch (err) {

            if (err.response.status === 404) {
                setError(true)
                setErrorMessage("Data Not Found")
            }
            else if (err.response.status === 500) {
                setError(true)
                setErrorMessage("Fetching Error")
            }
            else {
                console.log("pack fetch ", err)
            }

        }
    }


    // // check night beta
    // const checkNightBetaEligible = () => {
    //     // const totalTime = formData.totaltime || packageData.totaltime || book.totaltime || selectedCustomerData.totaltime || calculateTotalTime()
    //     const shedOutTime = formData.reporttime || selectedCustomerData.reporttime || selectedCustomerDatas.reporttime || book.reporttime;
    //     const shedInTime = formData.shedintime || selectedCustomerData.shedintime || book.shedintime;

    //     // const timeNumber = parseInt(totalTime?.split('h')[0])
    //     const totalDays = calculateTotalDays();
    //     if (totalDays < 2) {
    //         // console.log("totalDays", totalDays)
    //         let start = shedOutTime?.split(':').map(Number);
    //         let end = shedInTime?.split(':').map(Number);

    //         if (start && end) {
    //             // console.log("start && end", start, end)
    //             let startMinutes = start[0] * 60 + start[1];
    //             let endMinutes = end[0] * 60 + end[1];

    //             let nightStart = 22 * 60; // 22:00 in minutes
    //             let nightEnd = 6 * 60; // 06:00 in minutes

    //             if (startMinutes < nightEnd) startMinutes += 24 * 60;
    //             if (endMinutes < nightEnd) endMinutes += 24 * 60;
    //             console.log("!(endMinutes <= night", !(endMinutes <= nightStart || startMinutes >= nightEnd + 24 * 60))
    //             return !(endMinutes <= nightStart || startMinutes >= nightEnd + 24 * 60);
    //         }
    //         return
    //     }
    //     return true
    // }

    // const checkNightBetaEligible = () => {
    //     // const totalTime = formData.totaltime || packageData.totaltime || book.totaltime || selectedCustomerData.totaltime || calculateTotalTime()
    //     const shedOutTime = formData.reporttime || selectedCustomerData.reporttime || selectedCustomerDatas.reporttime || book.reporttime;
    //     const shedInTime = formData.shedintime || selectedCustomerData.shedintime || book.shedintime;

    //     const totalDays = calculateTotalDays();
    //     if (totalDays < 2) {
    //         let start = shedOutTime?.split(':').map(Number);
    //         let end = shedInTime?.split(':').map(Number);

    //         if (start && end) {
    //             let startMinutes = start[0] * 60 + start[1];
    //             let endMinutes = end[0] * 60 + end[1];

    //             let nightStart = 22 * 60; // 22:00 in minutes
    //             let nightEnd = 6 * 60; // 06:00 in minutes

    //             // Adjust for times before 06:00 by adding 24 hours in minutes
    //             if (startMinutes < nightEnd) startMinutes += 24 * 60;
    //             if (endMinutes < nightEnd) endMinutes += 24 * 60;

    //             // Adjust for start times after 22:00
    //             if (startMinutes >= nightStart) startMinutes += 24 * 60;

    //             console.log("Night Time Check:", (endMinutes <= nightStart || startMinutes >= nightEnd + 24 * 60));
    //             return (endMinutes <= nightStart || startMinutes >= nightEnd + 24 * 60);
    //         }
    //         return false;
    //     }
    //     return true;
    // };

    // // its for the single day
    //     const checkNightBetaEligible = () => {
    //         const shedOutTime = formData.reporttime || selectedCustomerData.reporttime || selectedCustomerDatas.reporttime || book.reporttime;
    //         const shedInTime = formData.shedintime || selectedCustomerData.shedintime || book.shedintime;

    //         const totalDays = calculateTotalDays();

    //         // If totalDays is 2 or more, automatically return true
    //         if (totalDays >= 2) {
    //             return true;
    //         }

    //         // Convert times to minutes since midnight
    //         let start = shedOutTime?.split(':').map(Number);
    //         let end = shedInTime?.split(':').map(Number);

    //         if (start && end) {
    //             let startMinutes = start[0] * 60 + start[1];
    //             let endMinutes = end[0] * 60 + end[1];

    //             let nightStart = 22 * 60; // 22:00 in minutes
    //             let nightEnd = 6 * 60; // 06:00 in minutes

    //             // Check if either time falls within the night period
    //             const isStartInNight = (startMinutes >= nightStart || startMinutes < nightEnd);
    //             const isEndInNight = (endMinutes >= nightStart || endMinutes < nightEnd);

    //             // If either start or end time overlaps with the night period, return true
    //             return isStartInNight || isEndInNight;
    //         }

    //         return false;
    //     };


    // const checkNightBetaEligible = () => {
    //     const shedOutTime = formData.reporttime || selectedCustomerData.reporttime || selectedCustomerDatas.reporttime || book.reporttime;
    //     const shedInTime = formData.shedintime || selectedCustomerData.shedintime || book.shedintime;

    //     const totalDays = calculateTotalDays();
    //     if (totalDays < 2) {
    //         let start = shedOutTime?.split(':').map(Number);
    //         let end = shedInTime?.split(':').map(Number);

    //         if (start && end) {
    //             let startMinutes = start[0] * 60 + start[1];
    //             let endMinutes = end[0] * 60 + end[1];

    //             let nightStart = 22 * 60;
    //             let nightEnd = 6 * 60;
    //             if (startMinutes < nightEnd) startMinutes += 24 * 60;
    //             if (endMinutes < nightEnd) endMinutes += 24 * 60;
    //             if (startMinutes >= nightStart) startMinutes += 24 * 60;

    //             const isStartInNight = (startMinutes >= nightStart || startMinutes < nightEnd);
    //             const isEndInNight = (endMinutes >= nightStart || endMinutes < nightEnd);

    //             // console.log("Night Time Check:", isStartInNight || isEndInNight);
    //             return isStartInNight || isEndInNight;
    //         }
    //         return false;
    //     }
    //     return true;
    // };




    const [vehileNames, setVehicleNames] = useState([])

    useEffect(() => {
        const getvehicleName = async () => {
            const response = await axios.get(`${apiUrl}/ge-tVehicleName`);
            const data = response.data;
            const name = data?.map((res) => res.vehicleName)

            setVehicleNames(name)
        }
        getvehicleName()

    }, [apiUrl])


    // const [escort, setEscort] = useState('No');
    // const [transferreport, setTransferreport] = useState('No')
    const handleEscortChange = (event) => {
        setEscort(event.target.value);
    };
    const handleTransferChange = (event) => {
        setTransferreport(event.target.value);
    };

    /// fro cal dialog box
    const [open, setOpen] = useState(false);

    const handleClickOpen = async () => {

        duty = formData.duty || selectedCustomerData.duty || book.duty;
        vehicleNames = selectedCustomerDatas.vehicleName || formData.vehicleName || selectedCustomerData.vehicleName || formValues.vehicleName || packageData.vehicleName || book.vehicleName;
        totkm = await (formData.totalkm1 || packageData.totalkm1 || book.totalkm1 || selectedCustomerData.totalkm1 || calculateTotalKilometers() || '');
        tothr = await (formData.totaltime || packageData.totaltime || book.totaltime || selectedCustomerData.totaltime || calculateTotalTime() || '');
        organizationname = formData.customer || selectedCustomerData.customer || book.customer || packageData.customer || ''

        if (!totkm || !tothr || !duty || !vehicleNames || !organizationname) {
            setError(true);
            setErrorMessage("Check Hour & KM & duty and vehiletype.! ")
            return;

        }
        else {
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };



    //---------------------------------------

    // fetch driver details 

    const [driverdetails, setDriverDetails] = useState([])

    const handleKeyEnterDriverDetails = async (e) => {
        if (e.key === "Enter") {
            e.preventDefault();

            try {
                const response = await axios.get(
                    `${apiUrl}/drivername-detailsaccount/${e.target.value}`
                );
                const vehicleData = response.data;
                setDriverDetails(vehicleData)
                setSuccess(true);
                setSuccessMessage("successfully listed");

            } catch (error) {
                setError(true);
                setErrorMessage("Error retrieving vehicle details.");
            }
        }
    }

    const handleimagedelete = async (imagepath) => {

        try {
            const path = imagepath?.path
            await axios.delete(`${apiUrl}/tripsheet-imagedelete`, { params: { path } })
        } catch (err) {

        }
    }

    const [signaturePopUpOpen, setSignaturePopUp] = useState(false)

    const handlesignaturePopUpClose = () => {
        setSignaturePopUp(false)
    }

    const handleSignaturePopUpOpen = () => {
        const tripid = book.tripid || selectedCustomerData.tripid || selectedCustomerDatas.tripid || formData.tripid;
        if (!tripid) {
            setError(true);
            setErrorMessage("Please Check TripId")
        }
        else {
            setSignaturePopUp(true)
        }
    }

    const vehicleRegisterNo = formData.vehRegNo || selectedCustomerData.vehRegNo || formValues.vehRegNo || selectedCustomerDatas.vehRegNo || book.vehRegNo || '';

    const [checkCloseKM, setCheckCloseKM] = useState({ maxShedInkm: '', maxTripId: "" })



    const customer = formData.customer || selectedCustomerData.customer || book.customer || packageData.customer;
    const tripID = formData.bookingno || selectedCustomerData.bookingno || book.bookingno;

    const transformFun = (data) => {

        if (/hcl/i.test(data.customer)) {
            return { shedOutkm: null, shedInKm: null, tripid: data.tripid, shedInDate: data.shedInDate, shedintime: data.shedintime }
        }
        return { shedOutkm: data.shedout, shedInKm: data.shedin, tripid: data.tripid, shedInDate: data.shedInDate, shedintime: data.shedintime }
    }

    // to fetch closed tripdata for valiation
    const [ClosedTripData, setClosedTripData] = useState([])

    useEffect(() => {

        const fetchData = async () => {
            if (!vehicleRegisterNo) return
            const data = await axios.get(`${apiUrl}/get-CancelTripData/${vehicleRegisterNo}`)

            console.log("data--", data)

            const mapdata = data && Array.isArray(data.data) && data.data.map(transformFun)
            setClosedTripData(mapdata);

            //to get KM
            let maxShedInkm = -Infinity;
            let maxTripId = null;
            mapdata && Array.isArray(mapdata) && mapdata.forEach((el) => {
                let shedInKm = el.shedInKm
                if (shedInKm > maxShedInkm) {
                    maxShedInkm = shedInKm;
                    maxTripId = el.tripid;
                }
            })
            setCheckCloseKM({ maxShedInkm: maxShedInkm, maxTripId: maxTripId })

            //TO get Date and Time
            console.log("mapdata", mapdata)
        }

        fetchData()
    }, [vehicleRegisterNo])




    // const transformFun = (data) => {
    //     return { shedOutkm: data.shedout, shedInKm: data.shedin, tripid: data.tripid, shedInDate: data.shedInDate, shedintime: data.shedintime }
    // }

    // to fetch closed tripdata for valiation
    // const [ClosedTripData, setClosedTripData] = useState([])
    // useEffect(() => {

    //     const fetchData = async () => {
    //         if (!vehicleRegisterNo) return
    //         const data = await axios.get(`${apiUrl}/get-CancelTripData/${vehicleRegisterNo}`)

    //         const mapdata = data && Array.isArray(data.data) && data.data.map(transformFun)
    //         setClosedTripData(mapdata)
    //         //to get KM
    //         let maxShedInkm = -Infinity;
    //         let maxTripId = null;
    //         mapdata && Array.isArray(mapdata) && mapdata.forEach((el) => {
    //             let shedInKm = el.shedInKm
    //             if (shedInKm > maxShedInkm) {
    //                 maxShedInkm = shedInKm;
    //                 maxTripId = el.tripid;
    //             }
    //         })
    //         setCheckCloseKM({ maxShedInkm: maxShedInkm, maxTripId: maxTripId })

    //         //TO get Date and Time
    //         console.log("mapdata", mapdata)


    //     }

    //     fetchData()
    // }, [vehicleRegisterNo])

    // console.log(vendorbilldata,"lastofupdateeeeeeeeeee")
    const generateAndCopyLinkdata = () => {
        const appsstatus = formData.apps || selectedCustomerData.apps || book.apps;
        console.log(appsstatus, "sttt")

        const tripid = formData.tripid || selectedCustomerData.tripid || book.tripid;
        if (!tripid) {
            setError(true)
            setErrorMessage("Enter the tripid")
            return
        }
        if (appsstatus === "Closed") {
            setError(true)
            setErrorMessage("Signature already uploaded")
            return
        }

        const paramsdata = {
            tripid: formData.tripid || selectedCustomerData.tripid || book.tripid
        };
         
        // Create the URL with the JSON string as a single query parameter
        const url = new URL(`${apiUrl}/SignatureGenerate`);
        Object.keys(paramsdata).forEach(key => url.searchParams.append(key, paramsdata[key]));
       


// 
        const generatedLinkdata = url.toString();
        console.log(generatedLinkdata,"data",url)
        setSignatureWhattsapplink(generatedLinkdata)


        // Create a temporary textarea element to copy the link
        setSignaturtCopied(true)
        const tempTextarea = document.createElement('textarea');
        tempTextarea.value = generatedLinkdata;
        document.body.appendChild(tempTextarea);
        tempTextarea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextarea);


        setTimeout(() => {
            setSignaturtCopied(false)
        }, 2000)

    }


    const signatruretimedetails = async () => {
        const tripidsign = book.tripid || formData.tripid || selectedCustomerData.tripid;
       
        if (tripidsign) {

            try {

                const response = await axios.get(`${apiUrl}/signaturetimedatadetails/${tripidsign}`)
                const data2 = response.data

                const rowsWithUniqueId = data2.map((row, index) => ({
                    ...row,
                    id5: index + 1,
                }));

                setRowsSignature(rowsWithUniqueId)
            }
            catch (err) {
                setRowsSignature([])
                console.log(err)

            }
        }
        else {

            setRowsSignature([])
        }
    }
    useEffect(() => {
        signatruretimedetails()
           
    }, [])

    const handleRefreshsign = () => {
        signatruretimedetails()
       
    };

    const columnssignature = [
        { field: "id5", headerName: "Sno", width: 70 },
        { field: "sign_logId", headerName: "LogID", width: 160 },
        { field: "logdatetime", headerName: "LogDateTime", width: 200 },
        { field: "startsigntime", headerName: "CTime", width: 130 },
        { field: "Signstatus", headerName: "SignStatus", width: 160 },
        {
           
            width: 300,
            renderHeader: () => (
                <Button variant="contained" color="primary" onClick={handleRefreshsign}>
                    Refresh
                </Button>
            )
        }
    ]


    return {
        selectedCustomerData, ex_kmAmount, ex_hrAmount,
        escort, setEscort, driverdetails,
        night_totalAmount, driverBeta_calc, driverbeta_Count_calc,
        driverBeta_amount, totalcalcAmount, driverBeta,
        selectedCustomerId, nightBta, nightCount, driverbeta_Count,
        vehileNames, handleEscortChange, handleClickOpen, open,
        handleClose,
        //  signaturePopUpOpen,
        handleSignaturePopUpOpen,
        rows, ClosedTripData,
        error, checkNightBetaEligible,
        success,
        info,
        warning,
        selectedImage,
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
        handleKeyDown,
        handleDateChange,
        handleAutocompleteChange,
        packageData,
        smsguest,
        sendEmail,
        setSendEmail,
        formValues,
        selectedCustomerDatas,
        setDriverSMS,
        DriverSMS,
        organizationdata,
        calculateTotalDays,
        setStartTime,
        setBook,
        setFormData,
        setSelectedCustomerData,
        setCloseTime,
        calculateTotalTime,
        popupOpen,
        setSmsGuest,
        // handleKeyEnter,
        setSelectedCustomerDatas,
        setreporttime,
        setshedintime,
        shedKilometers,
        calculateTotalKilometers,
        additionalTime,
        handleETripsheetClick,
        handlePopupClose,
        tripSheetData,
        attachedImage,
        routeData,
        signimageUrl,
        GmapimageUrl,
        setCloseTime2,
        setStartTime2,
        packageDetails,
        calculateExkmAmount,
        calculateExHrsAmount,
        calculateNightAmount,
        calculateTotalAmount,
        calculatedriverconvienceAmount,
        calculateExkmAmount2,
        calculateExHrsAmount2,
        calculateNightAmount2,
        calculatedriverconvienceAmount2,
        calculateTotalAmount2,
        handleTripmapClick,
        mapimgpopupOpen,
        handleimgPopupClose,
        mapimageUrls,
        handleTripmaplogClick,
        maplogimgpopupOpen,
        row,
        handleUpload,
        handleRefresh,
        handleButtonClick,
        handleTripRowClick,
        imgpopupOpen,
        generateLink,
        selectedRow,
        imageUrl,
        link,
        isSignatureSubmitted, checkCloseKM,
        isEditMode,
        handleEdit, setFormValues, copyToClipboard,
        SignPage, handlesignaturePopUpClose, signaturePopUpOpen,
        sign, handleCalc, calcPackage, extraHR, extraKM, package_amount, extrakm_amount, extrahr_amount, handleConfirm,
        setNightBeta, setNightCount, calcCheck, handleTransferChange, transferreport, handleKeyEnterDriverDetails, maplogcolumns, setError,
        setErrorMessage,
        handleimagedelete, signaturepopup, siganturediaglogclose, handlesignaturemageDownload, signatureupload, setSignatureupload, setSignaturepopup, handleFileChangesignature, getSignatureImage, handlesignaturemageDelete, setSign, setLink,
        handleVendorcalc, calculatevendorTotalDays, vendorinfo, setVendorinfodata, handleAutocompleteVendor, handleDatevendorChange, lockdata, setLockData, calculatevendorTotalTime, calculatevendorTotalKilometers, vendorbilldata, handlevendor_billdata,
        // calcvendordata,
        vendornightdatatotalAmount, vendorExtarkmTotalAmount, vendorExtrahrTotalAmount, handlevendorinfofata, vendorpassvalue, accountinfodata, handletravelsAutocompleteChange,
        generateAndCopyLinkdata,
        checkvendorNightBetaEligible,
        signaturelinkcopy, columnssignature, rowsignature,signaturelinkwhatsapp


    };
};

export default useTripsheet;