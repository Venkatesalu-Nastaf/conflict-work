import { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";

import {
    VehicleRate,
} from "./TripSheetdata";
import { APIURL, Apiurltransfer } from "../../url";
import { Button } from '@mui/material';
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";

const useTripsheet = () => {
    const signatureurlinkurl = "http://taaftechnology.com/SignatureGenerate"
    const apiUrl = APIURL;
    // THIS APIURL TRANSFER FRO DRIVER APP
    const apiurltransfer = Apiurltransfer;
    //  const signatureurlinkurl=`http://localhost:3000/SignatureGenerate`
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
    const [ratepackage, setRatePackage] = useState('')
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
    const [warningMessage, setWarningMessage] = useState({});
    const [infoMessage, setINFOMessage] = useState({});
    const [link, setLink] = useState('');
    const [isSignatureSubmitted] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    // const [isEditMode, setIsEditMode] = useState(true);
    const [sign, setSign] = useState(false)
    const [smsguest, setSmsGuest] = useState(true);
    const [DriverSMS, setDriverSMS] = useState(true);
    const [sendEmail, setSendEmail] = useState(true);
    const [organizationdata, setorganizationData] = useState('');
    const [triggerdata, setTriggerData] = useState(true)

    const [signaturepopup, setSignaturepopup] = useState(false)
    const [signatureupload, setSignatureupload] = useState(false)
    const [isHybridCustomer, setIsHybridCustomer] = useState(false)
    const [nightTotalCount, setNightTotalCount] = useState(0)
    const [nightTotalAmount, setNightTotalAmount] = useState(0)
    const [vendornightcount, setVendornightCount] = useState()
    const [cusnightcount, setcusnightCount] = useState()

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
    let [nightBta, setNightBeta] = useState('0')
    let [nightCount, setNightCount] = useState('0')
    let [night_totalAmount, setnight_totalAmount] = useState('0')


    //driver convinence --------------------------
    let [driverBeta, setdriverBeta] = useState('0')
    let [driverbeta_Count, setdriverbeta_Count] = useState('0')
    let [driverBeta_amount, setdriverBeta_amount] = useState('0')

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
    const [signaturelinkwhatsapp, setSignatureWhattsapplink] = useState()
    const [selectedMapRow, setSelectedMapRow] = useState("");
    const [CopyEmail, setCopyEmail] = useState(false);

    const [kmValue, setKmValue] = useState({
        shedOutState: '',
        startKMState: '',
        closeKMState: '',
        shedInState: '',
        shedOutDate: '',
        startDate: '',
        closeDate: '',
        shedInDate: '',
        start_totalDays: '',
        close_totalDays: '',
        shedIn_TotalDays: '',
        close_shedOut_totalDays: '',
        totalDays: '',
    })

    const [conflictkm, setConflictKMData] = useState({
        maximumkm: 0,
        maxtripid: "",


    })
    const [maxconflict, setMaxConflict] = useState({
        maxconflictdata: 0,
        maxTripid: "",
    })
    const [timeToggle, setTimeToggle] = useState('');
    const [lockdatavendorbill, setLockDatavendorBill] = useState(false)
    const [lockdatacustomerbill, setLockDatacustomerBill] = useState(false)



    const maplogcolumns = [
        { field: "id", headerName: "Sno", width: 70 },
        { field: "tripid", headerName: "TripSheet No", width: 120 },

        { field: "time", headerName: "Trip Time", width: 100 },

        { field: "date", headerName: "Trip Date", width: 100, },
        { field: "trip_type", headerName: "Trip Type", width: 120 },
        { field: "place_name", headerName: "Place Name", width: 120 },
        {
            field: '',
            headerName: 'Edit',
            width: 120,
            renderCell: (params) => (
                <Button
                    onClick={() => handleEditMapLogPoint(params)}
                    aria-label="open-dialog"
                >
                    <Button variant="contained" color="primary" style={{ display: 'flex', gap: "5px" }}>
                        <FiEdit3 style={{ fontSize: "18px" }} />
                    </Button>
                </Button>
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <Button
                    onClick={() => handleRemoveMapLogPoint(params)}
                    aria-label="open-dialog"

                >
                    <Button variant="contained" color="primary" style={{ display: 'flex', gap: "5px" }}>
                        <RiDeleteBinLine style={{ fontSize: "18px" }} />
                    </Button>
                </Button>
            ),
        },

    ];


    const [openEditMapLog, setOpenEditMapLog] = useState(false);
    const handleOpenMapLog = () => setOpenEditMapLog(true);
    const handleCloseMapLog = () => setOpenEditMapLog(false);
    const handleRemoveMapLogPoint = async (params) => {
        try {
            const id = params.id;
            const resdata = await axios.delete(`${apiUrl}/dlete-mapLocationPoint/${id}`)
            if (resdata.status === 200) {
                handleTripmaplogClick()
            }
        } catch (err) {
            console.log(err.message)
        }
    }
    const handleEditMapDetails = async () => {

        if (!selectedMapRow) return;

        const { tripid, time, date, trip_type } = selectedMapRow;

        try {
            const response = await axios.post(`${apiUrl}/updateGPS-LOG/${tripid}`, { time, date, trip_type });
            if (response.status === 200) {
                setOpenEditMapLog(false); // Close the modal
            }
        } catch (err) {
            console.error('Error updating GPS log:', err);
        }
    };

    const handleEditMapLogPoint = (params) => {

        setSelectedMapRow(params.row); // Store the selected row data
        handleOpenMapLog(); // Open the modal
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { tripid } = selectedMapRow;
                const response = await axios.get(`${apiUrl}/get-gmapdata/${tripid}`);
                const data = response.data;
                setRow(data);
            } catch (error) {
                console.error('Error fetching map data:', error);
            }
        };
        fetchData()
    }, [openEditMapLog, selectedMapRow, apiUrl])

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
            'dispatchcheck', 'vehType', 'shedInDate', 'travelsemail', "vehicleName", "vehicleName2", 'travelsname', 'tripid', 'bookingno', 'billingno', 'apps', 'status', 'customer', 'orderedby', 'mobile', 'guestname', 'guestmobileno', 'email', 'address1', 'streetno', 'city', 'hireTypes', 'department', 'vehRegNo', 'vehType', 'driverName', 'mobileNo', 'driversmsexbetta', 'gps', 'duty', 'pickup', 'useage', 'request', 'shedOutDate', 'startdate', 'closedate', 'totaldays', 'employeeno', 'reporttime', 'starttime', 'closetime', 'shedintime', 'additionaltime', 'advancepaidtovendor', 'customercode', 'request', 'startkm', 'closekm', 'shedkm', 'shedin', 'shedout', 'permit', 'parking', 'toll', 'vpermettovendor', 'vendortoll', 'customeradvance', 'email1', 'remark', 'smsguest', 'documentnotes', 'VendorTripNo', 'vehicles', 'duty1', 'startdate1', 'closedate1', 'totaldays1', 'locks', 'starttime2', 'closetime2', 'totaltime', 'startkm1', 'closekm1', 'totalkm1', 'remark1', 'escort', 'transferreport', 'calcPackage', 'extraHR', 'extraKM', 'package_amount', 'extrakm_amount', 'extrahr_amount', 'ex_kmAmount', 'ex_hrAmount', 'nightBta', 'nightCount', 'night_totalAmount', 'driverBeta', 'driverbeta_Count', 'driverBeta_amount', 'totalcalcAmount', 'nightThrs', 'dtc', 'dtc2', 'nightThrs2', 'exkmTkm2', 'exHrsTHrs2', 'netamount', 'vehcommission', 'caramount1', 'manualbills', 'pack', 'amount5', 'exkm1', 'amount6', 'exHrs1', 'amount7', 'night1', 'amount8', 'driverconvenience1', 'amount9', 'rud', 'netamount1', 'discount', 'ons', 'manualbills1', 'balance', 'fcdate', 'taxdate', 'insdate', 'stpermit', 'maintenancetype', 'kilometer', 'selects', 'documenttype', 'on1', 'smsgust', 'booker', 'emailcheck', 'manualbillss', 'reload', 'Groups', 'orderbyemail'
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



        let appsValue = params.get('apps') || 'Waiting';

        // Check if dispatchcheck is 

        if (formData['dispatchcheck'] === 'true' && formData['status'] === "pending") {
            formData['status'] = "Opened"
            // setIsEditMode(true);
            setIsEditMode(false);
        }
        else if (formData['dispatchcheck'] === 'true' && formData['status'] !== 'pending') {
            // setIsEditMode(false);
            setSmsGuest(false)
            setSendEmail(false)
            setDriverSMS(false)
            setIsEditMode(true);
        }

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
        setdriverbeta_Count('0')
        setNightCount('0')
        setTransferreport("No");
        setVendorinfodata({});
        setVendorbilldata({});
        setIsHybridCustomer(false)
        setKmValue({
            shedOutState: '',
            startKMState: '',
            closeKMState: '',
            shedInState: '',
            shedOutDate: '',
            startDate: '',
            closeDate: '',
            shedInDate: '',
            start_totalDays: '',
            close_totalDays: '',
            shedIn_TotalDays: '',
            close_shedOut_totalDays: '',
            totalDays: '',
        })
        setConflictKMData({
            maximumkm: 0,
            maxtripid: "",


        })
        setMaxConflict({
            maxconflictdata: 0,
            maxTripid: "",
        })
        setCheckCloseKM({ maxShedInkm: '', maxTripId: "" })

        localStorage.removeItem('selectedTripid');
    };


    const handlecheck = async () => {
        const statusdata = formData.status || book.status || selectedCustomerData.status;

        if (sendEmail) {

            // if (statusdata !== 'Opened' || statusdata !== 'Cancelled') {
            //     setWarning(true)
            //     setWarningMessage("Check Your Trip Status")
            //     return
            // }

            if (statusdata === 'Opened' || statusdata === 'Cancelled') {

                try {

                    const dataToSend = {
                        bookingno: formData.tripid || selectedCustomerData.tripid || book.tripid,
                        guestname: formValues.guestname || selectedCustomerData.guestname || book.guestname || formData.guestname,
                        guestmobileno: formValues.guestmobileno || selectedCustomerData.guestmobileno || book.guestmobileno || formData.guestmobileno,
                        email: formValues.email || selectedCustomerData.email || book.email || formData.email,
                        driverName: selectedCustomerDatas.driverName || selectedCustomerData.driverName || tripSheetData.driverName || selectedCustomerDatas.driverName || book.driverName,
                        // driverName: selectedCustomerDatas?.driverName || formData.driverName || selectedCustomerData.driverName || formValues.driverName || book.driverName,
                        vehRegNo: formData.vehRegNo || selectedCustomerDatas.vehRegNo || selectedCustomerData.vehRegNo || formValues.vehRegNo || book.vehRegNo,
                        mobileNo: formData.mobileNo || selectedCustomerDatas.mobileNo || selectedCustomerData.mobileNo || formValues.mobileNo || book.mobileNo || '',
                        vehType: formData.vehType || selectedCustomerData.vehType || book.vehType || formValues.vehType,
                        // starttime: formData.reporttime || formData.reporttime || selectedCustomerData.reporttime || book.reporttime,
                        requestno: selectedCustomerDatas.request || selectedCustomerData.request || formValues.request || book.request,
                        starttime: formData.starttime || formData.starttime || selectedCustomerData.starttime || book.starttime,
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
                setWarning(true);
                setWarningMessage("Check Your Trip Status ,Mail Not Send");
            }
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
                await getSignatureImage()

                const selectedCustomer = rows.find((row) => row.tripid === selectedCustomerData.tripid || formData.tripid || book.tripid);
                const selectedBookingDate = selectedCustomerData.tripsheetdate || formData.tripsheetdate || dayjs();
                const dattasign = signimageUrl ? "Closed" : book.apps || formData.apps || selectedCustomerData.apps


                const updatedCustomer = {
                    ...book,
                    ...selectedCustomer,
                    ...vehilcedetails,
                    ...selectedCustomerData,
                    ...formData,
                    // apps: book.apps || formData.apps || selectedCustomerData.apps,
                    apps: dattasign,

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
                    vehRegNo: selectedCustomerDatas.vehRegNo || formData.vehRegNo || selectedCustomerData.vehRegNo || formValues.vehRegNo || book.vehRegNo || '',
                    driverName: selectedCustomerDatas?.driverName || selectedCustomerData.driverName || formData.driverName || formValues.driverName || book.driverName,
                    // mobileNo: formData.mobileNo || selectedCustomerData.mobileNo || formValues.mobileNo || selectedCustomerDatas.mobileNo || book.mobileNo || '',
                    mobileNo: selectedCustomerDatas?.mobileNo || formData.mobileNo || selectedCustomerData.mobileNo || formValues.mobileNo || book.mobileNo,
                    shedkm: shedKilometers.shedkm || book.shedkm || formData.shedkm || selectedCustomerData.shedkm,
                    vehicleName2: selectedCustomerDatas.vehicleName2 || formData.vehicleName2 || selectedCustomerData.vehicleName2 || formValues.vehicleName2 || packageData.vehicleName2 || book.vehicleName2,
                    orderbyemail: formData.orderbyemail || selectedCustomerDatas.orderbyemail || selectedCustomerData.orderbyemail || formValues.orderbyemail || book.orderbyemail,
                    // totaldays: calculateTotalDays(),
                    totaldays: calculateTotalDay(),
                    totalkm1: calculateTotalKilometers(),
                    totaltime: calculateTotalTimes(),
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
                    Vendor_NightHALT: vendorbilldata.Vendor_NightHALT || vendorpassvalue.Vendor_NightHALT || 0,
                    Vendor_NightBataAmount: vendorbilldata.Vendor_NightBataAmount || vendorpassvalue.Vendor_NightBataAmount || 0,
                    // Vendor_NightbataTotalAmount: vendorbilldata.Vendor_NightbataTotalAmount || vendornightdatatotalAmount,
                    Vendor_NightbataTotalAmount: vendornightdatatotalAmount || vendornightdatatotalAmount || 0,
                    Vendor_Bata: vendorbilldata.Vendor_Bata || vendorpassvalue.Vendor_Bata || 0,
                    Vendor_BataAmount: vendorbilldata.Vendor_BataAmount || vendorpassvalue.Vendor_BataAmount || 0,
                    Vendor_BataTotalAmount: vendorbilldata.Vendor_BataTotalAmount || 0,
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

                if (smsguest) {
                    await handleSendSMS()
                }
                if (DriverSMS) {
                    await handleDriverSendSMS()
                }

                setSendEmail(true)
                setDriverSMS(true)
                setSmsGuest(true)
                setSuccess(true);
                handleCancel();
                setSuccessMessage("Successfully updated");
                setLockData(false)
                setLockDatavendorBill(false)
                setLockDatacustomerBill(false)
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
                    // totaldays: calculateTotalDays(),
                    totalkm1: calculateTotalKilometers(),
                    totaltime: calculateTotalTimes(),
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
            const dattasign = signimageUrl ? "Closed" : book.apps;
            const updatedBook = {
                ...book,
                apps: dattasign,
                starttime2: starttime2 || book.starttime2 || formData.startTime2 || selectedCustomerData.starttime2,
                closetime2: closetime2 || book.closetime2 || formData.closetime2 || selectedCustomerData.closetime2,
                tripsheetdate: selectedBookingDate,
                totaldays: calculateTotalDay(),
                totalkm1: calculateTotalKilometers(),
                totaltime: calculateTotalTimes(),
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
                travelsemail: selectedCustomerDatas.travelsemail || selectedCustomerData.travelsemail || formData.travelsemail || book.travelsemail,
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
                Vendor_NightHALT: vendorbilldata.Vendor_NightHALT || 0,
                Vendor_NightBataAmount: vendorbilldata.Vendor_NightBataAmount || 0,

                Vendor_NightbataTotalAmount: vendornightdatatotalAmount || vendornightdatatotalAmount || 0,
                Vendor_Bata: vendorbilldata.Vendor_Bata || 0,
                Vendor_BataAmount: vendorbilldata.Vendor_BataAmount || 0,
                Vendor_BataTotalAmount: vendorbilldata.Vendor_BataTotalAmount || 0,
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
            setLockDatavendorBill(false)
            setLockDatacustomerBill(false)
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
        const tripid = book.tripid || selectedCustomerData.tripid || formData.tripid;

        if (!tripid) {
            setError(true);
            setErrorMessage("Enter The Tripid.");
            return
        }
        else {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.pdf, .jpg, .jpeg, .png';
            input.onchange = handleFileChange;
            input.click();
        }
    };

    const handleFileChange = async (event) => {
        const documentType = formData.documenttype || selectedCustomerData.documenttype || book.documenttype || '';
        const tripid = book.tripid || selectedCustomerData.tripid || formData.tripid;
        const file = event.target.files[0];
        if (!file) return;
        if (file) {
            const data = Date.now().toString();
            const formData = new FormData();
            formData.append('image', file);

            //     // axios.put(`${apiUrl}/tripsheet_uploads/${tripid}/${documentType}`, formData)
            //    await axios.put(`${apiUrl}/tripsheet_uploads/${tripid}/${documentType}/${data}`, formData)
            //    // Second PUT request if documentType is toll or parking
            // //    this apiurl transfer for driver app --------------
            //         if (documentType === 'Toll' || documentType === 'Parking') {
            //             console.log(documentType,"enter")
            //             await axios.post(`${apiurltransfer}/uploadfolrderapp/${data}`, formData);
            //         }

            try {

                await axios.put(`${apiUrl}/tripsheet_uploads/${tripid}/${documentType}/${data}`, formData);

                if (documentType === 'Toll' || documentType === 'Parking') {
                    await axios.post(`${apiurltransfer}/uploadfolrderapp/${data}`, formData);
                    //   await axios.post(`http://localhost:7000/uploadfolrderapp/${data}`, formData);
                }
            } catch (error) {
                console.error('Error uploading file:', error);
            }



        }
    };


    // const calculateTotalTime = () => {
    //     const shedoutTime = formData.reporttime || selectedCustomerData.reporttime || selectedCustomerDatas.reporttime || book.reporttime
    //     // const shedinTime = formData.closetime || selectedCustomerData.closetime || book.closetime || '';
    //     const shedinTime = formData.shedintime || selectedCustomerData.shedintime || selectedCustomerDatas.shedintime || book.shedintime
    //     const additionalTimeValue = additionalTime.additionaltime || formData.additionaltime || selectedCustomerData.additionaltime || book.additionaltime;
    //     // const totalDays = formData.totaldays || calculateTotalDays() || book.totaldays;
    //     const totalDays = formData.totaldays || calculateTotalDay() || book.totaldays;


    //     if (shedoutTime && shedinTime) {
    //         const startTimeObj = dayjs(shedoutTime, 'HH:mm');
    //         const closeTimeObj = dayjs(shedinTime, 'HH:mm');
    //         let totalTimeMinutes = closeTimeObj.diff(startTimeObj, 'minutes');
    //         let additionalMinutes = 0;

    //         // Parse additional time value if available
    //         if (additionalTimeValue) {
    //             const hoursMatch = additionalTimeValue.match(/(\d+)h/);
    //             const minutesMatch = additionalTimeValue.match(/(\d+)m/);

    //             const additionalHours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
    //             const additionalMinutesFromHours = additionalHours * 60;
    //             additionalMinutes += additionalMinutesFromHours;

    //             const additionalMinutesValue = minutesMatch ? parseInt(minutesMatch[1]) : 0;
    //             additionalMinutes += additionalMinutesValue;
    //         }


    //         totalTimeMinutes += additionalMinutes;
    //         const hours = Math.floor(totalTimeMinutes / 60);
    //         const minutes = totalTimeMinutes % 60;

    //         //-------------converting sheOuttime in to minuts -------------
    //         const [ouHhourStr, outMinutsStr] = shedoutTime.split(':');
    //         const ouHhoursInt = parseInt(ouHhourStr, 10);
    //         const outMinutsInt = parseInt(outMinutsStr, 10);
    //         const shedOutIntValue = (ouHhoursInt * 60) + outMinutsInt;

    //         //------converting shedin time to minuts ------------
    //         const [inHoursStr, inMinutsStr] = shedinTime.split(':');
    //         const inHoursInt = parseInt(inHoursStr, 10);
    //         const inMinutsInt = parseInt(inMinutsStr, 10);
    //         const shedInIntValue = (inHoursInt * 60) + inMinutsInt;

    //         if (totalDays === 2) {
    //             let num1 = ((1440 - shedOutIntValue) + shedInIntValue)
    //             num1 += additionalMinutes;
    //             const hours = Math.floor(num1 / 60);
    //             const minutes = num1 % 60;

    //             return `${hours}h ${minutes}m`
    //         }

    //         if ((totalDays) >= 3) {
    //             let num2 = ((1440 - shedOutIntValue) + shedInIntValue) + ((totalDays - 2) * (24 * 60))
    //             num2 += additionalMinutes;
    //             const hours = Math.floor(num2 / 60);
    //             const minutes = num2 % 60;
    //             return `${hours}h ${minutes}m`
    //         }
    //         return `${hours}h ${minutes}m`;
    //     }
    //     return '';
    // }



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


    const calculateTotalDay = () => {
        const startDate = formData.startdate || selectedCustomerData.startdate || book.startdate;
        const closeDate = selectedCustomerData.closedate || selectedCustomerData.startdate || book.closedate;
        const shedoutdate = formData.shedOutDate || selectedCustomerData.shedOutDate || book.shedOutDate;
        const shedindate = formData.shedInDate || selectedCustomerData.shedInDate || book.shedInDate;

        // const formattedStartDate = dayjs(startDate).format('YYYY-MM-DD');
        // const formattedCloseDate = dayjs(closeDate).format('YYYY-MM-DD');
        // const formattedShedOutDate = dayjs(shedoutdate).format('YYYY-MM-DD');
        // const formattedShedInDate = dayjs(shedindate).format('YYYY-MM-DD');

        if (shedoutdate && shedindate) {
            const shedOutDateObj = dayjs(shedoutdate).startOf('day');
            const shedindateObj = dayjs(shedindate).startOf('day');

            if (shedOutDateObj.isAfter(shedindateObj)) {
                console.log('Shed Out Date is greater than Shed In Date');
                return 'Shed Out Date is greater';
            } else if (shedOutDateObj.isSame(shedindateObj)) {
                return 0;
            } else {
                const totalDays = shedindateObj.diff(shedOutDateObj, 'days');
                return totalDays;
            }
        } else if (startDate && closeDate && !shedoutdate && !shedindate) {
            const startDateObj = dayjs(startDate).startOf('day');
            const closeDateObj = dayjs(closeDate).startOf('day');

            const totalDays = closeDateObj.diff(startDateObj, 'days') + 1;
            if (totalDays > 0) {
                return totalDays;
            }
            return '';
        }

        return '';
    };

    // const fetchdatacustomerTimeToggle = async () => {

    //     const customerdata = formData.customer || selectedCustomerData.customer || book.customer || packageData.customer || '';

    //     if (customerdata) {

    //         const response = await axios.get(`${apiUrl}/customerratenamedata/${customerdata}`)
    //         const data = response.data
    //         if (data.length > 0) {
    //             console.log(data.length, "eneter")
    //             const res = response.data[0].TimeToggle
    //             console.log(res,"eneter")
    //             return res
    //         }

    //         return ""
    //     }

    //     else {
    //         return ''
    //     }

    // }

    const customerdatatimetoggle = useMemo(() => {
        return (
            formData.customer ||
            selectedCustomerData.customer ||
            book.customer ||
            packageData.customer ||
            ''
        );
    }, [formData.customer, selectedCustomerData.customer, book.customer, packageData.customer]);


    const fetchdatacustomerTimeToggle = useCallback(async () => {
        if (customerdatatimetoggle) {
            try {
                const response = await axios.get(`${apiUrl}/customerratenamedata/${customerdatatimetoggle}`);
                const data = response.data;
                if (data.length > 0) {
                    const res = data[0].TimeToggle;
                    setTimeToggle(res); // Update state with the fetched result
                } else {
                    setTimeToggle('');
                }
            } catch (error) {
                console.error('Error fetching customer data:', error);
                setTimeToggle('');
            }
        } else {
            setTimeToggle('');
        }
    }, [apiUrl, customerdatatimetoggle]); // Memoize the fetch function based on these dependencies

    // Use useEffect to trigger the fetch function only when necessary
    useEffect(() => {
        fetchdatacustomerTimeToggle();
    }, [fetchdatacustomerTimeToggle]);
    // console.log(fetchdatacustomerTimeToggle(),"time")


    const calculateTotalTimes = () => {
        const shedoutTime = formData.reporttime || selectedCustomerData.reporttime || selectedCustomerDatas.reporttime || book.reporttime
        // const shedinTime = formData.closetime || selectedCustomerData.closetime || book.closetime || '';
        const shedinTime = formData.shedintime || selectedCustomerData.shedintime || selectedCustomerDatas.shedintime || book.shedintime
        const additionalTimeValue = additionalTime.additionaltime || formData.additionaltime || selectedCustomerData.additionaltime || book.additionaltime;
        const totalDays = formData.totaldays || calculateTotalDay() || book.totaldays;
        // const shedoutdate = formData.shedOutDate || selectedCustomerData.shedOutDate || book.shedOutDate;
        // const shedindate = formData.shedInDate || selectedCustomerData.shedInDate || book.shedInDate;
        const datatimetoggle = timeToggle;

        // const formattedShedOutDate = dayjs(shedoutdate).format('YYYY-MM-DD');
        // const formattedShedInDate = dayjs(shedindate).format('YYYY-MM-DD');



        // let additionalMinutes = 0;
        let additionalHours = 0;
        let additionalMinutesValue = 0;

        // Parse additional time value if available
        if (additionalTimeValue) {
            const hoursMatch = additionalTimeValue.match(/(\d+)h/);
            const minutesMatch = additionalTimeValue.match(/(\d+)m/);

            additionalHours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
            // const additionalMinutesFromHours = additionalHours * 60;
            // additionalMinutes += additionalMinutesFromHours;

            additionalMinutesValue = minutesMatch ? parseInt(minutesMatch[1]) : 0;
            // additionalMinutes += additionalMinutesValue;
        }

        // Convert minutes to a two-digit string
        const formattedMinutes = additionalMinutesValue.toString().padStart(2, '0');
        // const additionalMin = Number(formattedMinutes)
        // const additionalMin = parseInt(formattedMinutes, 10); // 1 as a number


        // Combine hours and minutes into a single decimal format
        let combinedTime = `${additionalHours}.${formattedMinutes}`;

        if (shedinTime && shedoutTime) {

            if (calculateTotalDay() === 0) {
                // Split the time strings into hours and minutes
                const [shedoutHours, shedoutMinutes] = shedoutTime?.split(':').map(Number);
                const [shedinHours, shedinMinutes] = shedinTime?.split(':').map(Number);

                // Convert hours to minutes and add minutes
                const totalShedoutMinutes = (shedoutHours * 60) + shedoutMinutes;
                const totalShedinMinutes = (shedinHours * 60) + shedinMinutes;
                const combinedTotal = (additionalHours * 60) + Number(formattedMinutes);
                // const a = Number(shedoutMinutes) + Number(shedinMinutes);

                // Calculate the difference in minutes
                let minuteDifference = totalShedinMinutes - totalShedoutMinutes + combinedTotal;

                if (minuteDifference < 0) {
                    minuteDifference += 24 * 60;
                }


                // Convert the difference back to hours and minutes
                const hours = Math.floor(minuteDifference / 60);
                const minutes = minuteDifference % 60;


                if (datatimetoggle === 0) {
                    // console.log(`${hours}h ${minutes}m`,"datamm")
                    const dataminutes = minutes >= 30 ? `${hours + 1}h ` : `${hours}h `;
                    return dataminutes
                }
                else {
                    return `${hours}h ${minutes}m`;
                }
            }



            if (calculateTotalDay() === 1) {

                const newTimeString = shedoutTime?.replace(":", ".");
                const newTimeStrings = shedinTime?.replace(":", ".");
                // const a = Number(newTimeStrings) + Number(newTimeString);

                const c = 23.60 - Number(newTimeString) + Number(newTimeStrings);
                const formattedC = c.toFixed(2);
                const combined = combinedTime;
                const [hours1, minutes1] = formattedC.toString().split('.').map(Number);
                const [hours2, minutes2] = combined.toString().split('.').map(Number);

                let totalHours = hours1 + hours2;
                let totalMinutes = minutes1 + minutes2;
                if (totalMinutes >= 100) {
                    const quotient = Math.floor(totalMinutes / 60); // Get the quotient
                    totalMinutes = totalMinutes % 60; // Get the remainder
                    totalHours += quotient; // Add the quotient to starttotal
                }
                const formattedTotal = `${totalHours}.${totalMinutes}`;

                // const d = 
                const [integerPart, decimalPart] = formattedTotal.toString().split('.').map(Number);

                if (decimalPart >= 60) {
                    // Increment the integer part by 1

                    let newIntegerPart = integerPart;
                    const additionalHours = Math.floor(decimalPart / 60);

                    // Add the additional hours to totalHours
                    newIntegerPart += additionalHours;
                    // Subtract 60 from the decimal part
                    const newDecimalPart = decimalPart % 60;

                    // Return the adjusted time in the format "XX.XX"
                    const RemainTotalCalculation = `${newIntegerPart}.${newDecimalPart.toString().padStart(2, '0')}`
                    const [hours, minutes] = RemainTotalCalculation?.toString().split('.').map(Number);

                    const formattedMinutes = parseInt(minutes, 10);
                    if (datatimetoggle === 0) {
                        // console.log(`${hours}h ${minutes}m`,"datamm")
                        const dataminutes = formattedMinutes >= 30 ? `${hours + 1}h` : `${hours}h`;
                        return dataminutes
                    }
                    else {
                        return `${hours}h ${formattedMinutes}m`;
                    }

                    // return `${hours}h ${formattedMinutes}m`;


                    // return `${newIntegerPart}.${newDecimalPart.toString().padStart(2, '0')}`;
                }
                if (decimalPart < 60) {
                    const [hours, minutes] = formattedTotal?.toString().split('.').map(Number);

                    const formattedMinutes = parseInt(minutes, 10);
                    if (datatimetoggle === 0) {
                        // console.log(`${hours}h ${minutes}m`,"datamm")
                        const dataminutes = formattedMinutes >= 30 ? `${hours + 1}h` : `${hours}h`;
                        return dataminutes
                    }
                    else {
                        return `${hours}h ${formattedMinutes}m`;
                    }

                    // return `${hours}h ${formattedMinutes}m`;
                }

            }
            // const newTimeString = shedoutTime?.replace(":", ".");
            // const newTimeStrings = shedinTime?.replace(":", ".");
            // // const totaldays = calculateTotalDay()
            // const LongTripDays = totalDays - 1;
            // // const LongTripHours = LongTripDays * 24;
            // const startendhours = 23.60 - Number(newTimeString) + Number(newTimeStrings);
            // const formattedHours = startendhours.toFixed(2);
            if (calculateTotalDay() >= 2) {
                const newTimeString = shedoutTime?.replace(":", ".");
                const newTimeStrings = shedinTime?.replace(":", ".");
                // const totaldays = calculateTotalDay()
                const LongTripDays = totalDays - 1;
                const LongTripHours = LongTripDays * 24;
                const LongHours = LongTripHours.toFixed(2);

                const combined = combinedTime;

                // const startendhours = 23.60 - Number(newTimeString) + Number(newTimeStrings);

                const starthour1 = 23.60 - Number(newTimeString);
                const starthour = Number(starthour1).toFixed(2)

                const [startintegerPart, startdecimalPart] = starthour.toString().split('.').map(Number);
                const [endintegerPart, enddecimalPart] = newTimeStrings.toString().split('.').map(Number);

                let starttotal = Number(startintegerPart) + Number(endintegerPart);
                let endtotal = Number(startdecimalPart) + Number(enddecimalPart)

                if (endtotal >= 100) {
                    const quotient = Math.floor(endtotal / 60); // Get the quotient
                    endtotal = endtotal % 60; // Get the remainder
                    starttotal += quotient; // Add the quotient to starttotal
                }
                const startendhours1 = `${starttotal}.${endtotal}`

                const TotalHoursCalc = Number(startendhours1) + Number(LongHours)

                const formattedHours = Number(TotalHoursCalc).toFixed(2);

                const [integerPart, decimalPart] = formattedHours.toString().split('.').map(Number);
                const [hours2, minutes2] = combined.toString().split('.');


                let totalHours = Number(integerPart) + Number(hours2);
                let totalMinutes = Number(decimalPart) + Number(minutes2);
                const formattedTotal = `${totalHours}.${totalMinutes}`
                const [integerParts, newdecimalPart] = formattedTotal.toString().split('.').map(Number);

                if (newdecimalPart >= 60) {
                    // Increment the integer part by 1

                    let IntegerPart = integerParts;
                    const additionalHours = Math.floor(newdecimalPart / 60);

                    // Add the additional hours to totalHours
                    IntegerPart += additionalHours;
                    //  const newIntegerPart = integerPart + 1;
                    let Decimalvalue;


                    const newDecimalPart = newdecimalPart % 60;

                    Decimalvalue = Number(`${IntegerPart}.${newDecimalPart.toString().padStart(2, '0')}`)
                    // const TotalLongTripHours = LongTripHours + Number(Decimalvalue)
                    const formattedDecimalValue = Decimalvalue.toFixed(2);


                    const [hours, minutes] = formattedDecimalValue?.toString().split('.').map(Number);

                    const formattedMinutes = minutes.toString().padStart('0', 2); // Ensure two digits for minutes

                    if (datatimetoggle === 0) {
                        // console.log(`${hours}h ${minutes}m`,"datamm",datatimetoggle)
                        const dataminutes = formattedMinutes >= 30 ? `${hours + 1}h` : `${hours}h`;
                        return dataminutes
                    }
                    else {
                        return `${hours}h ${formattedMinutes}m`;
                    }

                    // return `${hours}h ${formattedMinutes}m`;


                    // Example usage:
                    //  const TotalLongTripHours = LongTripHours + Number(Decimalvalue)


                    //  return `${newIntegerPart}.${newDecimalPart.toString().padStart(2, '0')}`;
                }
                if (newdecimalPart < 60) {

                    const RemainTotalCalculation = LongTripHours + Number(formattedHours);
                    const a = RemainTotalCalculation.toFixed(2)

                    const [hours, minutes] = formattedTotal?.toString().split('.').map(Number);

                    const formattedMinutes = minutes.toString().padStart(2, '0'); // Ensure two digits for minutes
                    if (datatimetoggle === 0) {
                        // console.log(`${hours}h ${minutes}m`,"datamm",datatimetoggle)
                        const dataminutes = formattedMinutes >= 30 ? `${hours + 1}h` : `${hours}h`;
                        return dataminutes
                    }
                    else {
                        return `${hours}h ${formattedMinutes}m`;
                    }

                    // return `${hours}h ${formattedMinutes}m`;

                }



            }

        }

    }
    // calculateTotalTimes()

    useEffect(() => {
        calculateTotalTimes()
    }, [selectedCustomerData.shedintime, selectedCustomerDatas.shedintime, selectedCustomerData.reporttime, book.reporttime, book.shedintime,])



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
            const shedOutDateObj = dayjs(shedoutdate).startOf('day');
            const shedindateObj = dayjs(shedindate).startOf('day');

            if (shedOutDateObj.isAfter(shedindateObj)) {
                return 'Shed Out Date is greater';
            } else if (shedOutDateObj.isSame(shedindateObj)) {
                return 0;
            } else {
                const totalDays = shedindateObj.diff(shedOutDateObj, 'days');
                return totalDays;
            }
        }

        return '';
    };


    // const calculatevendorTotalTime = () => {

    //     const shedoutTime = vendorinfo?.vendorreporttime || ""

    //     const shedinTime = vendorinfo?.vendorshedintime || ""
    //     // const totalDays = calculatevendorTotalDays() || vendorinfo?.vendortotaldays
    //     const totalDays = calculatevendorTotalDays()


    //     if (shedoutTime && shedinTime) {
    //         if (calculateTotalDay() === 0) {
    //             // Split the time strings into hours and minutes
    //             const [shedoutHours, shedoutMinutes] = shedoutTime?.split(':').map(Number);
    //             const [shedinHours, shedinMinutes] = shedinTime?.split(':').map(Number);
    //             // Convert hours to minutes and add minutes
    //             const totalShedoutMinutes = (shedoutHours * 60) + shedoutMinutes;
    //             const totalShedinMinutes = (shedinHours * 60) + shedinMinutes;



    //             // Calculate the difference in minutes
    //             let minuteDifference = totalShedinMinutes - totalShedoutMinutes;

    //             // If the difference is negative, it means the in time is on the next day
    //             if (minuteDifference < 0) {
    //                 minuteDifference += 24 * 60; // Add 24 hours worth of minutes
    //             }


    //             // Convert the difference back to hours and minutes
    //             const hours = Math.floor(minuteDifference / 60);
    //             const minutes = minuteDifference % 60;


    //             return `${hours}h ${minutes}m`;
    //         }
    //         if (totalDays === 1) {

    //             const newTimeString = shedoutTime?.replace(":", ".");
    //             const newTimeStrings = shedinTime?.replace(":", ".");
    //             // const a = Number(newTimeStrings) + Number(newTimeString);

    //             const c = 23.60 - Number(newTimeString) + Number(newTimeStrings);
    //             const formattedC = c.toFixed(2);
    //             // const combined = combinedTime;
    //             const [hours1, minutes1] = formattedC.toString().split('.').map(Number);
    //             // const [hours2, minutes2] = combined.toString().split('.').map(Number);

    //             let totalHours = hours1
    //             let totalMinutes = minutes1
    //             if (totalMinutes >= 100) {
    //                 const quotient = Math.floor(totalMinutes / 60); // Get the quotient
    //                 totalMinutes = totalMinutes % 60; // Get the remainder
    //                 totalHours += quotient; // Add the quotient to starttotal
    //             }
    //             const formattedTotal = `${totalHours}.${totalMinutes}`;

    //             // const d = 
    //             const [integerPart, decimalPart] = formattedTotal.toString().split('.').map(Number);
    //             if (decimalPart >= 60) {
    //                 // Increment the integer part by 1

    //                 let newIntegerPart = integerPart;
    //                 const additionalHours = Math.floor(decimalPart / 60);

    //                 // Add the additional hours to totalHours
    //                 newIntegerPart += additionalHours;
    //                 // Subtract 60 from the decimal part
    //                 const newDecimalPart = decimalPart % 60;

    //                 // Return the adjusted time in the format "XX.XX"
    //                 const RemainTotalCalculation = `${newIntegerPart}.${newDecimalPart.toString().padStart(2, '0')}`
    //                 const [hours, minutes] = RemainTotalCalculation?.toString().split('.').map(Number);

    //                 const formattedMinutes = parseInt(minutes, 10);

    //                 return `${hours}h ${formattedMinutes}m`;


    //                 // return ${newIntegerPart}.${newDecimalPart.toString().padStart(2, '0')};
    //             }
    //             if (decimalPart < 60) {
    //                 const [hours, minutes] = formattedTotal?.toString().split('.').map(Number);

    //                 const formattedMinutes = parseInt(minutes, 10);

    //                 return `${hours}h ${formattedMinutes}m`;
    //             }

    //         }
    //         if (totalDays >= 2) {
    //             const newTimeString = shedoutTime?.replace(":", ".");
    //             const newTimeStrings = shedinTime?.replace(":", ".");
    //             // const totaldays = calculateTotalDay()
    //             const LongTripDays = totalDays - 1;
    //             const LongTripHours = LongTripDays * 24;
    //             const LongHours = LongTripHours.toFixed(2);

    //             // const combined = combinedTime;

    //             // const startendhours = 23.60 - Number(newTimeString) + Number(newTimeStrings);
    //             const starthour1 = 23.60 - Number(newTimeString);
    //             const starthour = Number(starthour1).toFixed(2)
    //             const [startintegerPart, startdecimalPart] = starthour.toString().split('.').map(Number);
    //             const [endintegerPart, enddecimalPart] = newTimeStrings.toString().split('.').map(Number);
    //             let starttotal = Number(startintegerPart) + Number(endintegerPart);
    //             let endtotal = Number(startdecimalPart) + Number(enddecimalPart)
    //             if (endtotal >= 100) {
    //                 const quotient = Math.floor(endtotal / 60); // Get the quotient
    //                 endtotal = endtotal % 60; // Get the remainder
    //                 starttotal += quotient; // Add the quotient to starttotal
    //             }
    //             const startendhours1 = `${starttotal}.${endtotal}`

    //             const TotalHoursCalc = Number(startendhours1) + Number(LongHours)

    //             const formattedHours = Number(TotalHoursCalc).toFixed(2);

    //             const [integerPart, decimalPart] = formattedHours.toString().split('.').map(Number);
    //             // const [hours2, minutes2] = combined.toString().split('.');


    //             let totalHours = Number(integerPart)
    //             let totalMinutes = Number(decimalPart)
    //             const formattedTotal = `${totalHours}.${totalMinutes}`
    //             const [integerParts, newdecimalPart] = formattedTotal.toString().split('.').map(Number);

    //             if (newdecimalPart >= 60) {
    //                 // Increment the integer part by 1

    //                 let IntegerPart = integerParts;
    //                 const additionalHours = Math.floor(newdecimalPart / 60);

    //                 // Add the additional hours to totalHours
    //                 IntegerPart += additionalHours;
    //                 //  const newIntegerPart = integerPart + 1;
    //                 let Decimalvalue;


    //                 const newDecimalPart = newdecimalPart % 60;

    //                 Decimalvalue = Number(`${IntegerPart}.${newDecimalPart.toString().padStart(2, '0')}`)
    //                 const TotalLongTripHours = LongTripHours + Number(Decimalvalue)
    //                 const formattedDecimalValue = Decimalvalue.toFixed(2);


    //                 const [hours, minutes] = formattedDecimalValue?.toString().split('.').map(Number);

    //                 const formattedMinutes = minutes.toString().padStart('0', 2); // Ensure two digits for minutes


    //                 return `${hours}h ${formattedMinutes}m`;


    //                 // Example usage:
    //                 //  const TotalLongTripHours = LongTripHours + Number(Decimalvalue)


    //                 //  return ${newIntegerPart}.${newDecimalPart.toString().padStart(2, '0')};
    //             }
    //             if (newdecimalPart < 60) {

    //                 const RemainTotalCalculation = LongTripHours + Number(formattedHours);
    //                 const a = RemainTotalCalculation.toFixed(2)
    //                 console.log(RemainTotalCalculation, a, 'venkat3');

    //                 const [hours, minutes] = formattedTotal?.toString().split('.').map(Number);

    //                 const formattedMinutes = minutes.toString().padStart(2, '0'); // Ensure two digits for minutes

    //                 return `${hours}h ${formattedMinutes}m`;

    //             }



    //         }

    //     }
    // }

    const calculatevendorTotalTime = () => {
        const shedoutTime = vendorinfo?.vendorreporttime || ""

        const shedinTime = vendorinfo?.vendorshedintime || ""
        // const totalDays = calculatevendorTotalDays() || vendorinfo?.vendortotaldays
        const totalDays = calculatevendorTotalDays()
        const additionalTimeValue = additionalTime.additionaltime || formData.additionaltime || selectedCustomerData.additionaltime || book.additionaltime;
        const datatimetoggle = timeToggle


        let additionalMinutes = 0;
        let additionalHours = 0;
        let additionalMinutesValue = 0;

        // Parse additional time value if available
        if (additionalTimeValue) {
            const hoursMatch = additionalTimeValue.match(/(\d+)h/);
            const minutesMatch = additionalTimeValue.match(/(\d+)m/);

            additionalHours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
            const additionalMinutesFromHours = additionalHours * 60;
            additionalMinutes += additionalMinutesFromHours;

            additionalMinutesValue = minutesMatch ? parseInt(minutesMatch[1]) : 0;
            additionalMinutes += additionalMinutesValue;
        }

        // Convert minutes to a two-digit string
        const formattedMinutes = additionalMinutesValue.toString().padStart(2, '0');
        // const additionalMin = Number(formattedMinutes)
        // const additionalMin = parseInt(formattedMinutes, 10); // 1 as a number


        // Combine hours and minutes into a single decimal format
        let combinedTime = `${additionalHours}.${formattedMinutes}`;

        if (shedinTime && shedoutTime) {

            if (calculatevendorTotalDays() === 0) {
                // Split the time strings into hours and minutes
                const [shedoutHours, shedoutMinutes] = shedoutTime?.split(':').map(Number);
                const [shedinHours, shedinMinutes] = shedinTime?.split(':').map(Number);

                // Convert hours to minutes and add minutes
                const totalShedoutMinutes = (shedoutHours * 60) + shedoutMinutes;
                const totalShedinMinutes = (shedinHours * 60) + shedinMinutes;
                const combinedTotal = (additionalHours * 60) + Number(formattedMinutes);
                const a = Number(shedoutMinutes) + Number(shedinMinutes);

                // Calculate the difference in minutes
                let minuteDifference = totalShedinMinutes - totalShedoutMinutes + combinedTotal;

                if (minuteDifference < 0) {
                    minuteDifference += 24 * 60;
                }


                // Convert the difference back to hours and minutes
                const hours = Math.floor(minuteDifference / 60);
                const minutes = minuteDifference % 60;
                if (datatimetoggle === 0) {
                    // console.log(`${hours}h ${minutes}m`,"datamm")
                    const dataminutes = minutes >= 30 ? `${hours + 1}h` : `${hours}h`;
                    return dataminutes
                }
                else {
                    return `${hours}h ${minutes}m`;
                }


                // return `${hours}h ${minutes}m`;
            }



            if (calculatevendorTotalDays() === 1) {

                const newTimeString = shedoutTime?.replace(":", ".");
                const newTimeStrings = shedinTime?.replace(":", ".");
                // const a = Number(newTimeStrings) + Number(newTimeString);

                const c = 23.60 - Number(newTimeString) + Number(newTimeStrings);
                const formattedC = c.toFixed(2);
                const combined = combinedTime;
                const [hours1, minutes1] = formattedC.toString().split('.').map(Number);
                const [hours2, minutes2] = combined.toString().split('.').map(Number);

                let totalHours = hours1 + hours2;
                let totalMinutes = minutes1 + minutes2;
                if (totalMinutes >= 100) {
                    const quotient = Math.floor(totalMinutes / 60); // Get the quotient
                    totalMinutes = totalMinutes % 60; // Get the remainder
                    totalHours += quotient; // Add the quotient to starttotal
                }
                const formattedTotal = `${totalHours}.${totalMinutes}`;

                // const d = 
                const [integerPart, decimalPart] = formattedTotal.toString().split('.').map(Number);

                if (decimalPart >= 60) {
                    // Increment the integer part by 1

                    let newIntegerPart = integerPart;
                    const additionalHours = Math.floor(decimalPart / 60);

                    // Add the additional hours to totalHours
                    newIntegerPart += additionalHours;
                    // Subtract 60 from the decimal part
                    const newDecimalPart = decimalPart % 60;

                    // Return the adjusted time in the format "XX.XX"
                    const RemainTotalCalculation = `${newIntegerPart}.${newDecimalPart.toString().padStart(2, '0')}`
                    const [hours, minutes] = RemainTotalCalculation?.toString().split('.').map(Number);

                    const formattedMinutes = parseInt(minutes, 10);
                    if (datatimetoggle === 0) {
                        // console.log(`${hours}h ${minutes}m`,"datamm")
                        const dataminutes = formattedMinutes >= 30 ? `${hours + 1}h` : `${hours}h`;
                        return dataminutes
                    }
                    else {
                        //    console.log(`${hours}h ${formattedMinutes}m`,"datamm")
                        return `${hours}h ${formattedMinutes}m`;
                    }

                    // return `${hours}h ${formattedMinutes}m`;


                    // return `${newIntegerPart}.${newDecimalPart.toString().padStart(2, '0')}`;
                }
                if (decimalPart < 60) {
                    const [hours, minutes] = formattedTotal?.toString().split('.').map(Number);

                    const formattedMinutes = parseInt(minutes, 10);
                    if (datatimetoggle === 0) {
                        // console.log(`${hours}h ${minutes}m`,"datamm")
                        const dataminutes = formattedMinutes >= 30 ? `${hours + 1}h` : `${hours}h`;
                        return dataminutes
                    }
                    else {
                        return `${hours}h ${formattedMinutes}m`;
                    }

                    // return `${hours}h ${formattedMinutes}m`;
                }

            }
            // const newTimeString = shedoutTime?.replace(":", ".");
            // const newTimeStrings = shedinTime?.replace(":", ".");
            // // const totaldays = calculateTotalDay()
            // const LongTripDays = totalDays - 1;
            // // const LongTripHours = LongTripDays * 24;
            // const startendhours = 23.60 - Number(newTimeString) + Number(newTimeStrings);
            // const formattedHours = startendhours.toFixed(2);
            if (calculatevendorTotalDays() >= 2) {
                const newTimeString = shedoutTime?.replace(":", ".");
                const newTimeStrings = shedinTime?.replace(":", ".");
                // const totaldays = calculateTotalDay()
                const LongTripDays = totalDays - 1;
                const LongTripHours = LongTripDays * 24;
                const LongHours = LongTripHours.toFixed(2);

                const combined = combinedTime;

                // const startendhours = 23.60 - Number(newTimeString) + Number(newTimeStrings);

                const starthour1 = 23.60 - Number(newTimeString);
                const starthour = Number(starthour1).toFixed(2)

                const [startintegerPart, startdecimalPart] = starthour.toString().split('.').map(Number);
                const [endintegerPart, enddecimalPart] = newTimeStrings.toString().split('.').map(Number);

                let starttotal = Number(startintegerPart) + Number(endintegerPart);
                let endtotal = Number(startdecimalPart) + Number(enddecimalPart)

                if (endtotal >= 100) {
                    const quotient = Math.floor(endtotal / 60); // Get the quotient
                    endtotal = endtotal % 60; // Get the remainder
                    starttotal += quotient; // Add the quotient to starttotal
                }
                const startendhours1 = `${starttotal}.${endtotal}`

                const TotalHoursCalc = Number(startendhours1) + Number(LongHours)

                const formattedHours = Number(TotalHoursCalc).toFixed(2);

                const [integerPart, decimalPart] = formattedHours.toString().split('.').map(Number);
                const [hours2, minutes2] = combined.toString().split('.');


                let totalHours = Number(integerPart) + Number(hours2);
                let totalMinutes = Number(decimalPart) + Number(minutes2);
                const formattedTotal = `${totalHours}.${totalMinutes}`
                const [integerParts, newdecimalPart] = formattedTotal.toString().split('.').map(Number);

                if (newdecimalPart >= 60) {
                    // Increment the integer part by 1

                    let IntegerPart = integerParts;
                    const additionalHours = Math.floor(newdecimalPart / 60);

                    // Add the additional hours to totalHours
                    IntegerPart += additionalHours;
                    //  const newIntegerPart = integerPart + 1;
                    let Decimalvalue;


                    const newDecimalPart = newdecimalPart % 60;

                    Decimalvalue = Number(`${IntegerPart}.${newDecimalPart.toString().padStart(2, '0')}`)
                    // const TotalLongTripHours = LongTripHours + Number(Decimalvalue)
                    const formattedDecimalValue = Decimalvalue.toFixed(2);


                    const [hours, minutes] = formattedDecimalValue?.toString().split('.').map(Number);

                    const formattedMinutes = minutes.toString().padStart('0', 2); // Ensure two digits for minutes
                    if (datatimetoggle === 0) {
                        // console.log(`${hours}h ${minutes}m`,"datamm")
                        const dataminutes = formattedMinutes >= 30 ? `${hours + 1}h` : `${hours}h`;
                        return dataminutes
                    }
                    else {
                        return `${hours}h ${formattedMinutes}m`;
                    }


                    // return `${hours}h ${formattedMinutes}m`;


                    // Example usage:
                    //  const TotalLongTripHours = LongTripHours + Number(Decimalvalue)


                    //  return `${newIntegerPart}.${newDecimalPart.toString().padStart(2, '0')}`;
                }
                if (newdecimalPart < 60) {

                    const RemainTotalCalculation = LongTripHours + Number(formattedHours);
                    const a = RemainTotalCalculation.toFixed(2)

                    const [hours, minutes] = formattedTotal?.toString().split('.').map(Number);

                    const formattedMinutes = minutes.toString().padStart(2, '0'); // Ensure two digits for minutes
                    if (datatimetoggle === 0) {
                        // console.log(`${hours}h ${minutes}m`,"datamm")
                        const dataminutes = formattedMinutes >= 30 ? `${hours + 1}h` : `${hours}h`;
                        return dataminutes
                    }
                    else {
                        return `${hours}h ${formattedMinutes}m`;
                    }

                    // return `${hours}h ${formattedMinutes}m`;

                }



            }

        }
    }




    const calculatevendorTotalKilometers = () => {
        const startKm = vendorinfo?.vendorshedoutkm || "";
        const closeKm = vendorinfo?.vendorshedinkm || "";

        // if (startKm !== undefined && closeKm !== undefined) {
        //     let totalKm = parseInt(closeKm) - parseInt(startKm);

        //     return totalKm;
        // }
        // return "";

        if (startKm !== undefined && closeKm !== undefined) {
            let totalKm = parseInt(closeKm) - parseInt(startKm);
            const shedKmValue = parseInt(shedKilometers.shedkm) || parseInt(formData.shedkm) || parseInt(selectedCustomerData.shedkm) || parseInt(book.shedkm);
            if (!isNaN(shedKmValue)) {
                totalKm += shedKmValue;
            }
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
        setSelectedCustomerDatas((prevData) => ({
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

                    handleCancel()
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
                            setLockData(false)
                            setLockDatavendorBill(false)
                            setLockDatacustomerBill(false)
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
        if (!lockdata) {
            // setVendorinfodata(params.vechicleName)
            setVendorinfodata({ ...vendorinfo, vendor_ratename: params.rateType })
            setRate_name(params.rateType)

            // setVendorinfodata({ ...vendorinfo, vendor_vehicle: params.vehicleName })
        }
        // handleChange({ target: { name: "vehRegNo", value: params.vehRegNo } });
        // // handleChange({ target: { name: "vehRegNo", value: params.vehRegNo } });
        // handleChange({ target: { name: "vehType", value: params.vehType } })
        handleChange({ target: { name: "vehType", value: params.vehType } })

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
                    // vehRegNo: formValues.vehRegNo || selectedCustomerData.vehRegNo || book.vehRegNo || formData.vehRegNo,
                    vehRegNo: formData.vehRegNo || selectedCustomerData.vehRegNo || formValues.vehRegNo || selectedCustomerDatas.vehRegNo || book.vehRegNo,
                    vehType: selectedCustomerData.vehType || book.vehType || formValues.vehType || formData.vehType,
                    // vehType: formValues.vehType || selectedCustomerData.vehType || book.vehType || formData.vehType,
                    // reporttime: formValues.reporttime || formData.reporttime || selectedCustomerData.reporttime || book.reporttime || '',
                    reporttime: formValues.starttime || formData.starttime || selectedCustomerData.starttime || book.starttime || '',
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
    //   console.log(formData.address1 ,"ff", selectedCustomerData.address1 ,"ss", formValues.address1 ,"val", selectedCustomerDatas.address1 ,"datas",book.address1 )
    const handleDriverSendSMS = async () => {
        if (DriverSMS || formData.DriverSMS || book.DriverSMS) {
            try {

                const dataSend = {
                    tripid: formData.tripid || selectedCustomerData.tripid || book.tripid,
                    address1: formData.address1 || selectedCustomerData.address1 || formValues.address1 || book.address1 || selectedCustomerDatas.address1 || '',

                    mobileNo: formData.mobileNo || selectedCustomerData.mobileNo || formValues.mobileNo || selectedCustomerDatas.mobileNo || book.mobileNo || '',
                    guestname: formValues.guestname || selectedCustomerData.guestname || book.guestname || formData.guestname || '',
                    guestmobileno: formValues.guestmobileno || selectedCustomerData.guestmobileno || book.guestmobileno || formData.guestmobileno || '',
                    // reporttime: formValues.reporttime || formData.reporttime || selectedCustomerData.reporttime || book.reporttime || '',
                    reporttime: formValues.starttime || formData.starttime || selectedCustomerData.starttime || book.starttime || '',
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
            const datadate = Date.now().toString();
            const formData = new FormData();
            formData.append("signature_image", file);
            try {
                await axios.post(`${APIURL}/api/uploadsignaturedata/${tripiddata}/${datadate}`, formData);
                // await axios.post(`http://localhost:7000/signatureimagesavedriver/${datadate}`,formData)
                getSignatureImage()
                // THIS API FRO DRIVER APP 
                await axios.post(`${apiurltransfer}/signatureimageuploaddriver/${datadate}`, formData)



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



    useEffect(() => {
        const fetchData = async () => {


            try {
                // const response = await fetch(`${apiUrl}/organizationdata/${encoded}`);
                const response = await fetch(`${apiUrl}/organizationdata`);
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
    }, [apiUrl, sendEmail, location, organizationdata, triggerdata]);





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
        // const [hours, minutes] = timeString.split('h').map(str => parseInt(str));
        // console.log(hours,minutes,"totalm")

        // // Calculate the total hours
        // const totalHours = hours + (minutes || 0) / 60; // if no minutes provided, consider it as 0
        // return totalHours;
        console.log(timeString, "hhh")
        const [hoursPart, minutesPart] = timeString.split('h');

        // Convert hours to an integer
        const hours = parseInt(hoursPart);

        // Extract the numeric value from minutes
        const minutes = parseInt(minutesPart) || 0;

        // Convert minutes to a decimal format with two digits
        console.log(minutes, "mmm")
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
        console.log(formattedMinutes, "mmminutes")

        // Combine hours and minutes into a single number as a string and convert to a number
        // const totalHours = parseFloat(`${hours}.${formattedMinutes}`);
        const totalHours = `${hours}.${formattedMinutes}`;
        console.log(totalHours, "hooo")
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
    let calcNight = 0
    useEffect(() => {
        const NightCount = () => {
            const shedOutTime = formData.reporttime || selectedCustomerData.reporttime || selectedCustomerDatas.reporttime || book.reporttime;
            const shedInTime = formData.shedintime || selectedCustomerData.shedintime || book.shedintime;
            const TotalDay = calculateTotalDay();
            const newTimeString = shedOutTime?.replace(":", ".");
            const newTimeStrings = shedInTime?.replace(":", ".");

            let calcNight = 0;

            if (calculateTotalDay() === 0) {
                if (Number(newTimeStrings) > 22.0 || Number(newTimeString) <= 6.00) {
                    calcNight = 1;
                }
                if (Number(newTimeStrings) > 22.0 && Number(newTimeString) <= 6.00) {
                    calcNight = 2;
                }
            } else if (TotalDay > 0) {
                if (newTimeStrings >= 22.0) {
                    calcNight = TotalDay + 1;
                } else {
                    calcNight = TotalDay;
                }
            }
            // setNightCount(calcNight);
            setcusnightCount(calcNight)

        };
        // setNightTotalCount(calculateTotalDay())


        NightCount();
    }, [formData, selectedCustomerData, selectedCustomerDatas, book]);



    // const NightCount = ()=>{
    //     const shedOutTime = formData.reporttime || selectedCustomerData.reporttime || selectedCustomerDatas.reporttime || book.reporttime;
    //     const shedInTime = formData.shedintime || selectedCustomerData.shedintime || book.shedintime;
    //     const TotalDay = calculateTotalDay()
    //     console.log(shedInTime,shedOutTime,calculateTotalDay(),TotalDay,typeof(TotalDay),'countdays');
    //     if(TotalDay===0){
    //         if(shedInTime>22.0){

    //         }
    //     }
    //     if(TotalDay>0){
    //         if(shedInTime>22.0){
    //          calcNight=TotalDay+1;
    //          setNightTotalCount(calcNight)
    //         }
    //         console.log('countdays12');

    //             calcNight=calculateTotalDay()
    //             setNightTotalCount(calcNight)
    //     }

    //     console.log(calcNight,'countdays123456');


    // }
    // console.log(calcNight,nightTotalCount,'countdays1234');

    // NightCount()



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
            const totalcalc = Number(package_amount) + Number(ex_hrAmount) + Number(ex_kmAmount) + Number(night_totalAmount || 0) + Number(driverBeta_amount) + Number(permit) + Number(parking) + Number(toll);
            const total = totalcalc - Number(customer_advance)
            const convetTotal = Math.ceil(total)
            setTotalcalcAmount(Number(convetTotal));
        }
        totalAmountCalc()
    }, [package_amount, ex_hrAmount, ex_kmAmount, night_totalAmount, driverBeta_amount, customer_advance, parking, permit, toll,])

    // extra Amount calculation--------------------------
    useEffect(() => {
        const extraClac = () => {
            let extraAbout_hr = Number(extraHR) * Number(extrahr_amount);
            const extarhour = Math.round(extraAbout_hr)
            console.log(extarhour, "hr", typeof (extarhour))

            setEx_HrAmount(extarhour)
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
            let extraAbout_hr = Math.round(Number(vendorbilldata?.Vendor_ExtraHours || vendorpassvalue.Vendor_ExtraHours) * Number(vendorbilldata?.Vendor_ExtraAmountHours || vendorpassvalue.Vendor_ExtraAmountHours))
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

    const calcNightCount = useMemo(() => {
        const shedOutTime = vendorinfo?.vendorreporttime || "";
        const shedInTime = vendorinfo?.vendorshedintime || "";
        const TotalDay = calculatevendorTotalDays() || vendorinfo?.vendortotaldays;

        const newTimeString = shedOutTime?.replace(":", ".");
        const newTimeStrings = shedInTime?.replace(":", ".");

        let calcNight = 0;

        if (TotalDay === 0) {
            if (Number(newTimeStrings) > 22.0 || Number(newTimeString) <= 6.00) {
                calcNight = 1;
            }
            if (Number(newTimeStrings) > 22.0 && Number(newTimeString) <= 6.00) {
                calcNight = 2;
            }
        } else if (TotalDay > 0) {
            if (newTimeStrings >= 22.0) {
                calcNight = TotalDay + 1;
            } else {
                calcNight = TotalDay;
            }
        }

        return calcNight;
    }, [vendorinfo, calculatevendorTotalDays]);

    useEffect(() => {
        setVendornightCount(calcNightCount);
    }, [calcNightCount]);

    useEffect(() => {
        const calcdatavendor = () => {

            const a = vendorbilldata.Vendor_NightHALT || vendorpassvalue.Vendor_NightHALT
            const b = vendorbilldata.Vendor_NightBataAmount || vendorpassvalue.Vendor_NightBataAmount


            let vendornightTotalAmounts = Number(a) * Number(b)
            setVendorNightbhatatotalAmount(vendornightTotalAmounts)


        }
        calcdatavendor();
    }, [vendorbilldata.Vendor_NightHALT, vendorbilldata.Vendor_NightBataAmount, vendorbilldata, vendorpassvalue.Vendor_NightHALT, vendorpassvalue.Vendor_NightBataAmount])


    useEffect(() => {
        const calcdatavendor = () => {

            const a = vendorbilldata.Vendor_Bata || vendorpassvalue.Vendor_Bata;
            const b = vendorbilldata.Vendor_BataAmount || vendorpassvalue.Vendor_BataAmount

            let vendordriverbetaAmount = Number(a) * Number(b)
            setVendorbilldata({ ...vendorbilldata, Vendor_BataTotalAmount: Number(vendordriverbetaAmount) })

        }
        calcdatavendor();
    }, [vendorbilldata.Vendor_Bata, vendorbilldata.Vendor_BataAmount, vendorbilldata, vendorpassvalue.Vendor_Bata, vendorpassvalue.Vendor_BataAmount])
    function calculatevendorTotalAmount() {

        const amount = parseFloat(vendorbilldata.Vendor_rateAmount || vendorpassvalue.Vendor_rateAmount) || 0;
        const amount1 = parseFloat(vendorExtrahrTotalAmount || vendorbilldata.Vendor_totalAmountHours || vendorpassvalue.Vendor_totalAmountHours) || 0;
        const amount2 = parseFloat(vendorExtarkmTotalAmount || vendorbilldata.Vendor_totalAmountKms || vendorpassvalue.Vendor_totalAmountKms) || 0;
        const amount3 = parseFloat(vendorbilldata.Vendor_BataTotalAmount || vendorpassvalue.Vendor_BataTotalAmount || 0);
        // const amount4 = parseFloat(vendornightdatatotalAmount || vendorbilldata.Vendor_NightbataTotalAmount || vendorpassvalue.Vendor_NightbataTotalAmount) || 0;
        const amount4 = parseFloat(vendornightdatatotalAmount || vendorbilldata.Vendor_NightbataTotalAmount || vendorpassvalue.Vendor_NightbataTotalAmount || 0);
        const amount5 = parseFloat(vendorinfo.vendor_vpermettovendor || vendorinfo?.vpermettovendor) || 0;
        const amount6 = parseFloat(vendorinfo.vendor_toll || vendorinfo?.vendortoll) || 0;
        const amount7 = parseFloat(vendorinfo.vendor_advancepaidtovendor || vendorinfo?.advancepaidtovendor) || 0;


        const totalAmount = amount + amount1 + amount2 + amount3 + amount4 + amount5 + amount6;
        const fullAmount = totalAmount - amount7;
        const fullamountdata = Math.ceil(fullAmount);
        setVendorbilldata({ ...vendorbilldata, Vendor_FULLTotalAmount: fullamountdata })
        // return totalAmount;
    }


    useEffect(() => {
        calculatevendorTotalAmount()
    }, [vendorbilldata.Vendor_rateAmount, vendorbilldata.Vendor_totalAmountHours, vendorbilldata.Vendor_totalAmountKms, vendorbilldata.Vendor_NightbataTotalAmount, vendorbilldata.Vendor_BataTotalAmount, vendornightdatatotalAmount, vendorExtrahrTotalAmount, vendorExtarkmTotalAmount, vendorinfo.vpermettovendor, vendorinfo.vendortoll, vendorinfo.vendor_vpermettovendor, vendorinfo.vendor_toll, vendorinfo.vendor_advancepaidtovendor, vendorinfo?.advancepaidtovendor])


    let vendordata, vendortotkm, vendortothr, vendortotalHours, vendorduty, vendorvehicleNames, vendorratetype;


    const handleVendorcalc = async () => {
        handleCalc()
        try {
            // vendorduty = vendorinfo.vendor_duty || vendorinfo.duty;
            // vendorvehicleNames = vendorinfo.vendor_vehicle || vendorinfo.vehicleName;
            vendorduty = vendorinfo.vendor_duty || ""
            vendorvehicleNames = vendorinfo.vendor_vehicle || "";
            vendortotkm = await (calculatevendorTotalKilometers() || vendorinfo.vendortotalkm);
            vendortothr = await (calculatevendorTotalTime() || vendorinfo.vendorTotaltime);
            // vendororganizationname = formData.customer || selectedCustomerData.customer || book.customer || packageData.customer || ''
            vendorratetype = vendorinfo.vendor_ratename || ratename || ""



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
            // const consvertedTotalHour = parseFloat(vendortotalHours.toFixed(2))
            const consvertedTotalHour = vendortotalHours
            console.log(consvertedTotalHour, "totalfffffffffffffh")

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
            const nHaltdays = Number(vendornightcount);
            const batahaltdays = Number(calculatevendorTotalDays())
            console.log(packages, Hours, KMS, Rate, extraHours, extraKMS, NHalt, Bata)
            let dataextrahous, dataextrakms

            // if (consvertedTotalHour > Hours) {

            //     let time = consvertedTotalHour - Hours;
            //     console.log(time, "hhhhtime")
            //     const convertedTime = Number(time.toFixed(2))

            //     dataextrahous = convertedTime
            // }
            if (consvertedTotalHour > Hours) {
                // const matches = calculatevendorTotalTime().match(/(\d+)h\s*(\d+)m/);
                const matches = consvertedTotalHour
                if (matches) {
                    // const hours = parseInt(matches[1], 10);
                    // const minutes = parseInt(matches[2], 10);

                    // Convert minutes to decimal
                    // const decimalMinutes = (minutes / 60).toFixed(2).substring(2); // Convert to '07'
                    // const decimalMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();


                    // Combine hours and decimal minutes
                    // const decimalTime = parseFloat(`${hours}.${decimalMinutes}`);


                    // let time = matches.toFixed(2) - Hours.toFixed(2);
                    let time = matches - Hours.toFixed(2);
                    const convertedTime = Number(time.toFixed(2))

                    console.log(convertedTime, "totalextra",)
                    dataextrahous = convertedTime
                }


            }
            // if (vendortotkm > KMS) {

            //     let KM = (Number(vendortotkm) - Number(KMS))
            //     dataextrakms = KM
            // }



            if (vendortotkm > KMS && vendorduty !== "Outstation") {

                let KM = (Number(vendortotkm) - Number(KMS))
                dataextrakms = KM
            }

            if (vendorduty === "Outstation") {
                // console.log(vendorduty,"dutydata")
                let km = (Number(vendortotkm) <= Number(KMS)) ? Number(KMS) : Number(vendortotkm)
                dataextrakms = km
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
                Vendor_NightBataAmount: nHaltdays,
                Vendor_BataAmount: batahaltdays

            });
            setSuccess(true)
            setSuccessMessage("successfully listed")
            // handleCalc()
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
        console.log(name, value)
        if (lockdatavendorbill) {
            setVendorbilldata((prevBook) => ({
                ...prevBook,
                [name]: value,
            }))
        }
        else {
            setWarning(true);
            setWarningMessage("IS not locked,locked Enter Again");
        }

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


    // useEffect(async()=>{
    //  const customerdata =  formData.customer || selectedCustomerData.customer || book.customer || packageData.customer || '';
    //  console
    //  if(customerdata){
    //     console.log(customerdata,"customerdatatatat")
    //  try{
    //     const response = await axios.get(`${apiUrl}/customerratenamedata/${customerdata}`)
    //     const res=response.data
    //     console.log(res,"cuuuu")
    //  }
    //  catch(err){
    //     console.log(err)
    //  }


    //  }
    // },[ formData.customer ])



    const fetchdatacustomeraratename = async () => {

        const customerdata = formData.customer || selectedCustomerData.customer || book.customer || packageData.customer || '';

        if (customerdata) {

            const response = await axios.get(`${apiUrl}/customerratenamedata/${customerdata}`)
            const data = response.data
            if (data.length > 0) {
                console.log(data.length, "eneter")
                const res = response.data[0].rateType
                console.log(res, "eneter")
                return res
            }

            return ""
        }

        else {
            return ''
        }

    }


    useEffect(() => {
        const a = calculateTotalDay()

        const newAmount = nightCount * nightBta;
        const betaAmount = Number(driverBeta) * driverbeta_Count;

        setdriverBeta_amount(betaAmount)
        setnight_totalAmount(newAmount);
    }, [nightCount, nightBta, driverBeta, driverbeta_Count]);


    // calc function

    let data, totkm, tothr, totalHours, duty, vehicleNames, organizationname, totalamount;
    const handleCalc = async () => {

        try {

            duty = formData.duty || selectedCustomerData.duty || book.duty;
            vehicleNames = selectedCustomerDatas.vehicleName || formData.vehicleName || selectedCustomerData.vehicleName || formValues.vehicleName || packageData.vehicleName || book.vehicleName;
            // totkm = await (formData.totalkm1 || packageData.totalkm1 || book.totalkm1 || selectedCustomerData.totalkm1 || calculateTotalKilometers() || '');
            totkm = await (calculateTotalKilometers() || formData.totalkm1 || packageData.totalkm1 || book.totalkm1 || selectedCustomerData.totalkm1 || calculateTotalKilometers() || '');
            tothr = await (calculateTotalTimes() || formData.totaltime || packageData.totaltime || book.totaltime || selectedCustomerData.totaltime || '');
            // organizationname = formData.customer || selectedCustomerData.customer || book.customer || packageData.customer || ''
            organizationname = await fetchdatacustomeraratename()

            if (!totkm || !tothr || !duty || !vehicleNames || !organizationname) {
                setError(true);
                setErrorMessage("Check Hour & KM & duty and vehiletype.! ")
                return;
            }

            // totalHours = await convertTimeToNumber(tothr);

            // const consvertedTotalHour = parseFloat(totalHours.toFixed(2))

            // console.log(tothr,"totalhrccc")
            totalHours = await convertTimeToNumber(tothr);
            // console.log(totalHours,"totalhandcccc")
            const consvertedTotalHour = totalHours
            // console.log(consvertedTotalHour,"totalccccc")

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

            const ratepackage = data.package
            // const packages = Number(data.package);
            const Hours = Number(data.Hours);
            const KMS = Number(data.KMS);
            const Rate = Number(data.Rate);
            const extraHours = Number(data.extraHours);
            const extraKMS = Number(data.extraKMS);
            const NHalt = Number(data.NHalt);
            const nightHatDays = Number(cusnightcount)
            const NHaltAmount = Number(data.NHalt) * nightHatDays;
            setNightCount(nightHatDays);
            setdriverbeta_Count(calculateTotalDay())
            setnight_totalAmount(NHaltAmount)
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
                // const matches = calculateTotalTimes().match(/(\d+)h\s*(\d+)m/);
                // console.log(matches,"atch")
                // if (matches) {
                //     const hours = parseInt(matches[1], 10);
                //     const minutes = parseInt(matches[2], 10);

                //     // Convert minutes to decimal
                //     // const decimalMinutes = (minutes / 60).toFixed(2).substring(2); // Convert to '07'
                //     const decimalMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();


                //     // Combine hours and decimal minutes
                //     const decimalTime = parseFloat(`${hours}.${decimalMinutes}`);

                //     let time = decimalTime.toFixed(2) - Hours.toFixed(2);
                //     const convertedTime = Number(time.toFixed(2))
                //     console.log(convertedTime ,"totalextra")

                //     setExtraHR(convertedTime);
                // }
                const matches = consvertedTotalHour
                console.log(matches, "atch")
                if (matches) {

                    let time = matches - Hours.toFixed(2);
                    const convertedTime = Number(time.toFixed(2))
                    console.log(convertedTime, "totalextra")

                    setExtraHR(convertedTime);
                }


            } else {
                setExtraHR('')
            }
            console.log("total km", totkm)
            // if (totkm > KMS) {
            //     let KM = (Number(totkm) - Number(KMS))
            //     setExtraKM(KM);
            // } else {
            //     setExtraKM("")
            // }

            if (totkm > KMS && duty !== "Outstation") {
                let KM = (Number(totkm) - Number(KMS))
                setExtraKM(KM);
            } else if (duty === "Outstation") {
                console.log("duty", duty)
                let km = (Number(totkm) <= Number(KMS)) ? Number(KMS) : Number(totkm)
                console.log(km)
                setExtraKM(km)
            }
            else {
                setExtraKM("")
            }


            handleClickOpen() // for calc pop up
            setRatePackage(ratepackage)
            setcalcPackage(ratepackage);
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

    // useEffect(() => {
    //     const getvehicleName = async () => {
    //         const response = await axios.get(`${apiUrl}/ge-tVehicleName`);
    //         const data = response.data;
    //         const name = data?.map((res) => res.vehicleName)
    //         console.log(name)
    //         // setVehicleNames(name)
    //     }
    //     getvehicleName()

    // }, [apiUrl])
    useEffect(() => {
        const getvehicleName = async () => {
            const response = await axios.get(`${apiUrl}/getvehicledatauniquevehicleNames`);
            const data = response.data
            const names = data?.map(res => res.VechicleNames)

            setVehicleNames(names)
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

        // duty = formData.duty || selectedCustomerData.duty || book.duty;
        // vehicleNames = selectedCustomerDatas.vehicleName || formData.vehicleName || selectedCustomerData.vehicleName || formValues.vehicleName || packageData.vehicleName || book.vehicleName;
        // totkm = await (formData.totalkm1 || packageData.totalkm1 || book.totalkm1 || selectedCustomerData.totalkm1 || calculateTotalKilometers() || '');
        // tothr = await (formData.totaltime || packageData.totaltime || book.totaltime || selectedCustomerData.totaltime || calculateTotalTimes() || '');
        // organizationname = formData.customer || selectedCustomerData.customer || book.customer || packageData.customer || ''

        // if (!totkm || !tothr || !duty || !vehicleNames || !organizationname) {
        //     setError(true);
        //     setErrorMessage("Check Hour & KM & duty and vehiletype.! ")
        //     return;

        // }
        // else {
        setOpen(true);
        // }
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

    const vehicleRegisterNo = formData.vehRegNo || selectedCustomerDatas.vehRegNo || selectedCustomerData.vehRegNo || formValues.vehRegNo || book.vehRegNo || '';


    const [checkCloseKM, setCheckCloseKM] = useState({ maxShedInkm: '', maxTripId: "" })


    const [hybridCheckCus, setHybridCheckCus] = useState([])
    useEffect(() => {
        const getCustomer = async () => {
            const response = await axios.get(`${apiUrl}/get-customer`)
            const data = response.data.map(el => ({ customer: el.customer, hybrid: el.hybrid }))
            setHybridCheckCus(data)
        }
        getCustomer()
    }, [apiUrl])

    const customer = formData.customer || selectedCustomerData.customer || book.customer || packageData.customer;
    const tripID = formData.bookingno || selectedCustomerData.bookingno || book.bookingno;

    const transformFun = (data) => {
        const hybridcheck = hybridCheckCus.find((el) => customer === el.customer)

        // if (/hcl/i.test(data.customer)) {
        if (hybridcheck && hybridcheck.hybrid) {
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

            const mapdata = data && Array.isArray(data.data) && data.data.map(transformFun)
            setClosedTripData(mapdata);
            console.log("mapdata", mapdata)

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
        }

        fetchData()
    }, [apiUrl, vehicleRegisterNo])

    // New KM CONFLICT
    // const shedoutkm2 = useMemo(() => {
    //     return Number(formData.shedout || book.shedout || selectedCustomerDatas.shedout || selectedCustomerData.shedout || '');
    // }, [formData.shedout, book.shedout, selectedCustomerDatas.shedout, selectedCustomerData.shedout]);
    // useEffect(() => {

    //     const fetchData = async () => {
    //         if (!vehicleRegisterNo) return
    //         // const shedoutkm1=Number(formData.shedout || book.shedout || selectedCustomerDatas.shedout || selectedCustomerData.shedout ||'');
    //         const shedoutkm1 = shedoutkm2
    //         console.log(shedoutkm1, "km")

    //         const data = await axios.get(`${apiUrl}/tripshedin/${vehicleRegisterNo}/${shedoutkm1}`)

    //         // const mapdata = data && Array.isArray(data.data) && data.data.map(transformFun1)
    //         const mapdata = data.data;
    //         if (mapdata.length > 0) {

    //             setConflictKMData({ maximumkm: mapdata[0].shedin || mapdata[0].closekm || mapdata[0].startkm || mapdata[0].shedout || 0, maxtripid: mapdata[0].tripid })
    //         }
    //         else {
    //             setConflictKMData({ maximumkm: 0, maxtripid: null })
    //         }
    //     }

    //     // }



    //     fetchData()
    // }, [apiUrl, vehicleRegisterNo, shedoutkm2])
    const transformFun1 = (data) => {

        return { shedout: data.shedout || null, shedin: data.shedin || null, tripid: data.tripid, closekm: data.closekm || null, startkm: data.startkm || null }
    }

    const shedoutkm = formData.shedout || book.shedout || selectedCustomerDatas.shedout || selectedCustomerData.shedout || '';


    useEffect(() => {

        const fetchData = async () => {
            if (!vehicleRegisterNo) return

            const data = await axios.get(`${apiUrl}/get-CancelTripDatanewdatatry/${vehicleRegisterNo}`)
            //  console.log(mapdata?.data,"data")
            const mapdata = data && Array.isArray(data.data) && data.data.map(transformFun1)
            // setClosedTripData(mapdata);
            // console.log("mapdata", mapdata,mapdata.length)
            if (mapdata.length > 0) {

                const allValues = mapdata.flatMap(trip => [
                    Number(trip.shedout) || 0,
                    Number(trip.shedin) || 0,
                    Number(trip.closekm) || 0,
                    Number(trip.startkm) || 0,
                ]);
                const maxValue = Math.max(...allValues);
                const maxTrip = mapdata.find(trip => {
                    return (
                        Number(trip.shedout) === maxValue ||
                        Number(trip.shedin) === maxValue ||
                        Number(trip.closekm) === maxValue ||
                        Number(trip.startkm) === maxValue
                    );
                });
                // Find the maximum value
                //   const maxValue = Math.max(...allValues);

                //   console.log(maxValue,"maxxx",maxTrip); 
                setMaxConflict({ maxconflictdata: maxValue || 0, maxTripid: maxTrip.tripid })

                const shedoutkm1 = Number(formData.shedout || book.shedout || selectedCustomerDatas.shedout || selectedCustomerData.shedout || '');


                const getTripWithValueInRange = (data, value) => {
                    return data.find(trip => {
                        // Convert fields to numbers, treat empty values as extremes
                        const shedin = parseFloat(trip.shedin) || null;
                        const shedout = parseFloat(trip.shedout) || null || Infinity;
                        const startkm = parseFloat(trip.startkm) || null;
                        const closekm = parseFloat(trip.closekm) || null;

                        // Define default to use if necessary
                        //   const defaultValue = startkm;

                        // Check if value falls between shedin and shedout
                        const isWithinShedRange = shedin !== null && value <= shedin && value >= shedout;
                        //   console.log(isWithinShedRange,'kkk')

                        // Check if value falls between startkm and shedout if shedin is empty

                        const isWithinStartkmAndShedout = shedin === null && closekm !== null && value <= closekm && value >= shedout;

                        // Check if value falls between startkm and closekm if shedout is empty
                        const isWithinStartkmAndClosekm = closekm === null && value >= shedout && value <= startkm;
                        const isWithinStartkmAndClosekm2 = startkm === null && value === shedout;

                        // Check if shedin and closekm are empty, and use startkm
                        //   const useStartkmIfShedinAndClosekmEmpty = shedin === null && closekm === null && value === startkm;

                        // Return true if any of the conditions are met
                        return isWithinShedRange || isWithinStartkmAndShedout || isWithinStartkmAndClosekm || isWithinStartkmAndClosekm2;
                    });
                };

                //   const result = getTripWithValueInRange(tripData, valueToCheck);
                //   console.log(result, "getdata");

                if (shedoutkm1 > 1) {
                    // console.log(shedoutkm1,"sehdout")
                    const result = getTripWithValueInRange(mapdata, shedoutkm1);
                    //   console.log(result, "getdata");
                    if (result !== undefined) {
                        setConflictKMData({ maximumkm: result.shedin || result?.closekm || result.startkm || result.shedout || 0, maxtripid: result?.tripid })
                    }
                    else {
                        setConflictKMData({ maximumkm: 0, maxtripid: null })
                    }
                }
            }
            // }
            else {
                setConflictKMData({ maximumkm: 0, maxtripid: null })
            }
        }

        fetchData()
    }, [apiUrl, vehicleRegisterNo, shedoutkm])

    const generateAndCopyLinkdata = async () => {
        const appsstatus = formData.apps || selectedCustomerData.apps || book.apps;
        console.log(appsstatus, "sttt")

        const tripid = formData.tripid || selectedCustomerData.tripid || book.tripid;
        if (!tripid) {
            setWarning(true)
            setWarningMessage("Enter the tripid")
            return
        }
        if (appsstatus === "Closed") {
            setInfo(true)
            setINFOMessage("Signature already uploaded")
            return
        }

        const paramsdata = {
            tripid: formData.tripid || selectedCustomerData.tripid || book.tripid
        };

        // Create the URL with the JSON string as a single query parameter
        const url = new URL(signatureurlinkurl);
        Object.keys(paramsdata).forEach(key => url.searchParams.append(key, paramsdata[key]));



        // 
        const generatedLinkdata = url.toString();
        setSignatureWhattsapplink(generatedLinkdata)

        // Create a temporary textarea element to copy the link
        setSignaturtCopied(true)
        // const tempTextarea = document.createElement('textarea');
        // tempTextarea.value = generatedLinkdata;
        // document.body.appendChild(tempTextarea);
        // console.log(tempTextarea,"aree")
        // tempTextarea.select();
        // document.execCommand('copy');

        // document.body.removeChild(tempTextarea);
        console.log(generatedLinkdata, "grn", typeof (generatedLinkdata),"hh")
        if (generatedLinkdata) {
            await navigator.clipboard.writeText(generatedLinkdata);
        }
        localStorage.setItem("expiredsign", false);
        localStorage.setItem("expired", false);
        localStorage.setItem("uploadtollparkdata", false);
        localStorage.setItem("expireuploadpage", false);

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
    // useEffect(() => {
    //     signatruretimedetails()

    // }, [])

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

    // CUSTOMER GET HYBRID

    useEffect(() => {

        console.log("customer", customer, "trip", tripID)
        const handleHybridCheck = async () => {
            if (tripID && customer) {
                const response = await axios.get(`${apiUrl}/getCustomer-hybrid/${customer}`)
                console.log("customer---", response)
                setIsHybridCustomer((response?.data.hybrid === 1) ? true : false)
            } else {
                return
            }
        }
        handleHybridCheck()
    }, [customer, tripID, apiUrl])



    return {
        selectedCustomerData, ex_kmAmount, ex_hrAmount,
        escort, setEscort, driverdetails,
        night_totalAmount, driverBeta_calc, driverbeta_Count_calc,
        driverBeta_amount, totalcalcAmount, driverBeta, setdriverBeta, setdriverbeta_Count, setdriverBeta_amount,
        selectedCustomerId, nightBta, nightCount, driverbeta_Count,
        vehileNames, handleEscortChange, handleClickOpen, open,
        handleClose,
        //  signaturePopUpOpen,
        handleSignaturePopUpOpen,
        rows, ClosedTripData,
        error, isHybridCustomer,
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
        formData,
        handleOpenMapLog,
        handleCloseMapLog,
        openEditMapLog,
        setOpenEditMapLog,
        handleEditMapDetails,
        handleKeyDown,
        handleDateChange,
        selectedMapRow,
        setSelectedMapRow,
        handleAutocompleteChange, setKmValue, kmValue,
        packageData,
        smsguest,
        sendEmail,
        setSendEmail,
        formValues,
        selectedCustomerDatas,
        setDriverSMS,
        DriverSMS,
        organizationdata,
        setStartTime,
        setBook,
        setFormData,
        setSelectedCustomerData,
        setCloseTime,
        // calculateTotalTime,
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
        // generateLink,
        selectedRow,
        imageUrl,
        link,
        isSignatureSubmitted, checkCloseKM,
        isEditMode,
        handleEdit, setFormValues,
        //  copyToClipboard,
        // SignPage,
        handlesignaturePopUpClose, signaturePopUpOpen,
        sign, handleCalc, calcPackage, extraHR, extraKM, package_amount, extrakm_amount, extrahr_amount, handleConfirm,
        setNightBeta, setNightCount, calcCheck, handleTransferChange, transferreport, handleKeyEnterDriverDetails, maplogcolumns, setError,
        setErrorMessage,
        handleimagedelete, signaturepopup, siganturediaglogclose, handlesignaturemageDownload, signatureupload, setSignatureupload, setSignaturepopup, handleFileChangesignature, getSignatureImage, handlesignaturemageDelete, setSign, setLink,
        handleVendorcalc, calculatevendorTotalDays, vendorinfo, setVendorinfodata, handleAutocompleteVendor, handleDatevendorChange, lockdata, setLockData, calculatevendorTotalTime, calculatevendorTotalKilometers, vendorbilldata, handlevendor_billdata,
        // calcvendordata,
        vendornightdatatotalAmount, vendorExtarkmTotalAmount, vendorExtrahrTotalAmount, handlevendorinfofata, vendorpassvalue, accountinfodata, handletravelsAutocompleteChange,
        generateAndCopyLinkdata,
        ratepackage,
        calculateTotalDay,
        calculateTotalTimes,
        nightTotalCount, setNightTotalCount,
        nightTotalAmount, setNightTotalAmount,
        maxconflict, setExtraKM, setextrakm_amount, setExtraHR, setextrahr_amount,
        signaturelinkcopy, columnssignature, rowsignature, setWarning, setWarningMessage, setSignImageUrl, signaturelinkwhatsapp, CopyEmail, setCopyEmail, conflictkm, lockdatavendorbill, setLockDatavendorBill, lockdatacustomerbill, setLockDatacustomerBill

    };
};

export default useTripsheet;