import { useState, useEffect, useMemo, useCallback, useContext } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
// import {
//     VehicleRate,
// } from "./TripSheetdata";
import { APIURL, Apiurltransfer } from "../../url";
import { Button } from '@mui/material';
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
import { PermissionContext } from '../../context/permissionContext';
import { useData1 } from '../../Dashboard/Maindashboard/DataContext';

const useTripsheet = () => {
    const { mapButtonTrigger } = useData1()
    const { permissions } = useContext(PermissionContext)
    const Tripsheet_modify1 = permissions[3]?.modify;
    const Tripsheet_delete1 = permissions[3]?.delete;
    // const signatureurlinkurl = "https://jessycabs.com/SignatureGenerate"
    //  const signatureurlinkurl = "https://192.168.1.79/SignatureGenerate"
    const apiUrl = APIURL;
    const superAdminAccess = localStorage.getItem("SuperAdmin")
    const loginusername = localStorage.getItem("username")
    // const tripno = formData.tripid || selectedCustomerData.tripid || book.tripid;
    // const statusCheck = formData.status || selectedCustomerData.status || book.status;
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
    const [selectedStatus, setSelectedStatus] = useState('');
    const [error, setError] = useState(false);
    const [shedKilometers, setShedKilometers] = useState('');
    const [additionalTime, setAdditionalTime] = useState('');
    // const [photos, setPhotos] = useState([]);
    const [success, setSuccess] = useState(false);
    const [info, setInfo] = useState(false);
    const [vechiledata, setVehicleData] = useState([]);
    const [warning, setWarning] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [popupOpen, setPopupOpen] = useState(false);
    const [imgpopupOpen, setimgPopupOpen] = useState(false);
    const [mapimgpopupOpen, setMapimgPopupOpen] = useState(false);
    const [maplogimgpopupOpen, setMaplogimgPopupOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [drivername, setDrivername] = useState([]);
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
    // const [isHybridCustomer, setIsHybridCustomer] = useState(false)
    const [nightTotalCount, setNightTotalCount] = useState(0)
    const [nightTotalAmount, setNightTotalAmount] = useState(0)
    const [vendornightcount, setVendornightCount] = useState()
    const [cusnightcount, setcusnightCount] = useState()
    // const [EditMap, setEditMap] = useState(false)
    const [groupTripId, setGroupTripId] = useState()
    const [manualTripID, setManualTripID] = useState([])
    const [editMap, setEditMap] = useState(false)
    const [mapPopUp, setMapPopUp] = useState(false)
    const [outStationHide, setOutStationHide] = useState(false);
    const [enterTrigger, setEnterTrigger] = useState(null)
    // const [conflicthcldatavalue, setConflictHCLDataValue] = useState([])
    const [conflicthcldatavalue, setConflictHCLDataValue] = useState({
        Hcldatakmvalue: 0,
        HclMaxConflctdata: 0
    });

    // Loading//

    const [isAddload, setisAddload] = useState(false)
    const [isEditload, setisEditload] = useState(false)

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

    //-----------------------------------------------------------------
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
    const [conflictLoad, setConflictLoad] = useState(null)
    const [selectedStatuschecking, setSelectedStatuschecking] = useState('');
    const [openModalConflict, setOpenModalConflict] = useState(null)
    const [openConflictKMPopup, setOpenConflictKMPopup] = useState(null);
    const [overetripsheetstatus,setOverViewETripsheet]=useState(false)
    const [overetripsheetoutstation,setOverViewETripsheetOutstation]=useState(null)
    // ----------------------------------------vendorinfo-------------------
    const [lockdata, setLockData] = useState(false)
    // const [lockdata, setLockData] = useState(true)
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
        fuelamount: "",
        vendorparking: "",
        vendortoll: "",
        vpermettovendor: ""
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
    const [copydatalink, setCopyDataLink] = useState(false)
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
    const [minTimeData, setMinTimeData] = useState(null)
    const [maxTimeData, setMaxTimeData] = useState(null)
    const [shedInTimeData, setShedInTimeData] = useState(null)
    const [conflictkm, setConflictKMData] = useState({
        maximumkm: 0,
        maxtripid: "",
    })
    const [maxconflict, setMaxConflict] = useState({
        maxconflictdata: 0,
        maxTripid: "",
    })
    const [timeToggle, setTimeToggle] = useState('');
    const [timeTogglevendor, setTimeToggleVendor] = useState('');
    // const [lockdatavendorbill, setLockDatavendorBill] = useState(false)
    // const [lockdatacustomerbill, setLockDatacustomerBill] = useState(false)
    const [lockdatavendorbill, setLockDatavendorBill] = useState(true)
    const [lockdatacustomerbill, setLockDatacustomerBill] = useState(true)
    const [manualMarkTrigger, setManualMarkTrigger] = useState(false)
    const [hybridhclcustomer, setHybridHclCustomer] = useState('')
    const [hybridhclnavigate, setHybridHclNavigate] = useState('')
    const [timetogglenavigate, setTimeToggleNaviagate] = useState('')
    const [timetogglevendornavigate, setTimeToggleVendorNaviagate] = useState('')

    // Hide some field for tripsheet
    const [hideField, setHideField] = useState(null)
    const [editButtonStatusCheck, SetEditButtonStatusCheck] = useState(false)
    const [conflictCompareDatas, setConflictCompareDatas] = useState(null)
    const [conflictMinimumTimeDatas, setConflictMinimumTimeDatas] = useState(null)

    // for invoice page
    const [signimageUrl, setSignImageUrl] = useState('');
    const [attachedImage, setAttachedImage] = useState('');
    const [GmapimageUrl, setGMapImageUrl] = useState('');

    // const [isentertripID,setisenterTripid] = useState(false)

    const [temporaryStatus, setTemporaryStatus] = useState(null);
    const [emptyState, setEmptyState] = useState(false);
    const [userStatus, setUserStatus] = useState(null);

    const [routeData, setRouteData] = useState('');
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
        // fuelamount: '',
        permit: '',
    });
    // const [conflictenddate, setConflictEndDate] = useState({
    //     maxShedInDate: null, TripIdconflictdate: null, conflictTimer: null
    // })
    const [checkstatusapps, setCheckStatusApp] = useState([])
    const usernamedata = localStorage.getItem("username");
    const [nochangedata,setNoChangeData]=useState({})
    const [checksignandMapverify, setCheckSignandMapVerify] = useState(false)
    const [checksignmapmessage, setCheckSignMapMessage] = useState('')
   
    
    const maplogcolumns = [
        { field: "id", headerName: "Sno", width: 70 },
        { field: "tripid", headerName: "TripSheet No", width: 120 },
        { field: "time", headerName: "Trip Time", width: 100 },
        // { field: "date", headerName: "Trip Date", width: 100, },
        {
            field: "date",
            headerName: "Trip Date",
            width: 100,
            renderCell: (params) => dayjs(params.value).format("DD-MM-YYYY"), // Change format as needed
        },
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
                    // disabled={!Tripsheet_modify1}
                    // disabled={!Tripsheet_modify1 || (superAdminAccess === "0" && temporaryStatus)}
                    disabled={!Tripsheet_modify1 || (superAdminAccess !== "SuperAdmin" && temporaryStatus)}
                >
                    <Button disabled={!Tripsheet_modify1 || (superAdminAccess !== "SuperAdmin" && temporaryStatus)} variant="contained" color="primary" style={{ display: 'flex', gap: "5px" }}>
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
                    // disabled={!Tripsheet_delete1}
                    disabled={!Tripsheet_delete1 || (superAdminAccess !== "SuperAdmin" && temporaryStatus)}
                >
                    <Button disabled={!Tripsheet_delete1 || (superAdminAccess !== "SuperAdmin" && temporaryStatus)} variant="contained" color="primary" style={{ display: 'flex', gap: "5px" }}>
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


    // const handleButtonClick = () => {
    //     const tripid = book.tripid || selectedCustomerData.tripid || selectedCustomerDatas.tripid || formData.tripid;
    //     if (!tripid) {
    //         setError(true);
    //         setErrorMessage("Please enter the tripid");
    //     } else {
    //         localStorage.setItem('selectedTripid', tripid);
    //         const newTab = window.open('/navigationmap', '_blank', 'noopener,noreferrer');
    //         if (newTab) {
    //             newTab.focus();
    //         } else {
    //         }
    //     }
    // };

    const handleButtonClick = () => {
        // console.log(manualTripID, 'manu');

        if (manualTripID.length > 0) {
            console.log(manualTripID, 'manualll');

            setError(true)
            setErrorMessage("Already Map Is Created")
            return
        }
        const tripid = book.tripid || selectedCustomerData.tripid || selectedCustomerDatas.tripid || formData.tripid;
        const starttime = book.starttime || selectedCustomerData.starttime || selectedCustomerDatas.starttime || formData.starttime;
        const endtime = book.closetime || selectedCustomerData.closetime || selectedCustomerData.closetime || formData.closetime;
        const startdate = dayjs(book.startdate || selectedCustomerData.startdate || selectedCustomerDatas.startdate || formData.startdate).format('YYYY-MM-DD');
        const closedate = dayjs(book.closedate || selectedCustomerData.closedate || selectedCustomerDatas.closedate || formData.closedate).format('YYYY-MM-DD');

        if (!tripid) {
            setError(true);
            setErrorMessage("Please enter the tripid");
        } else {
            localStorage.setItem('selectedTripid', tripid);

            const newTab = window.open(`/navigationmap?tripid=${tripid}&starttime=${starttime}&endtime=${endtime}&startdate=${startdate}&closedate=${closedate}`, '_blank', 'noopener,noreferrer');
            if (newTab) {
                newTab.focus();
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
    const [mapimageUrls1, setMapImageUrls1] = useState("");


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

    const handleTripmapverify = async () => {
        try {
            const tripid = book?.tripid || selectedCustomerData?.tripid || formData?.tripid;
            // console.log(tripid,"urlstripiii")
            if (!tripid) {
                return;
            }
            // const response = await fetch(`${apiUrl}/getmapimages/${tripid}`);
            // if (!response.ok) {
            //     throw new Error(`HTTP error! Status: ${response.status}`);
            // }
            const response = await axios.get(`${apiUrl}/getmapimagesverfiy/${tripid}`);

            const responseData = response.data
            // console.log(responseData,"urlstripiii")
            if (responseData.length > 0) {
                // setCheckSignandMapVerify(true)
                // setCheckSignMapMessage("Map and Signature Verified")
                setMapImageUrls1(responseData);
            } else {

                // Assuming you want to display the image directly
                // const imageUrl = URL.createObjectURL(responseData);
                setMapImageUrls1("");
            }
            // setMapimgPopupOpen(true);
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
                console.log(data, 'mapdata')
            }
        } catch {
        }
    };

    //refresh button function
    const handleRefresh = async () => {
        const tripid = book.tripid || selectedCustomerData.tripid || formData.tripid;
        // const bookingno = formData.bookingno || selectedCustomerData.bookingno || book.bookingno;
        try {
            if (!tripid) {
                setError(true);
                setErrorMessage("Please enter the tripid");
            } else {
                const response = await axios.get(`${apiUrl}/tripuploadcollect/${tripid}/${tripid}`);
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

        //calc----------------------------------------------------
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
        const HCLDATA = Number(params.get('hybriddatahcl')) || 0
        const timetoggledata = Number(params.get('TimeToggle')) || 0
        const timetogglevendor = Number(params.get('VendorTimeToggle')) || 0
        const lockdatavendor = Number(params.get('lockdatavalue'))
        console.log(lockdatavendor,"lockvendorlog")
        setHybridHclNavigate(HCLDATA)
        setTimeToggleNaviagate(timetoggledata)
        setTimeToggleVendorNaviagate(timetogglevendor)
        setTransferreport(tranreport)
        setEscort(escort)
        setLockData(lockdatavendor)
        setConflictLoad((prevConflictLoad) => !prevConflictLoad);
        //----------------------
        const formData = {};
        const parameterKeys = [
            'dispatchcheck', 'vehType', 'shedInDate', 'tripsheetdate', 'travelsemail', "vehicleName", "vehicleName2", 'travelsname', 'tripid', 'bookingno', 'billingno', 'apps', 'status', 'customer', 'orderedby', 'mobile', 'guestname', 'guestmobileno', 'email', 'address1', 'streetno', 'city', 'hireTypes', 'department', 'vehRegNo', 'vehType', 'driverName', 'mobileNo', 'driversmsexbetta', 'gps', 'duty', 'pickup', 'useage', 'request', 'shedOutDate', 'startdate', 'closedate', 'totaldays', 'employeeno', 'reporttime', 'starttime', 'closetime', 'shedintime', 'additionaltime', 'advancepaidtovendor', 'customercode', 'request', 'startkm', 'closekm', 'shedkm', 'shedin', 'shedout', 'permit', 'parking', 'toll', 'vpermettovendor', 'vendortoll', 'vendorparking', 'fuelamount', 'customeradvance', 'email1', 'remark', 'smsguest', 'documentnotes', 'VendorTripNo', 'vehicles', 'duty1', 'startdate1', 'closedate1', 'totaldays1', 'locks', 'starttime2', 'closetime2', 'totaltime', 'startkm1', 'closekm1', 'totalkm1', 'remark1', 'escort', 'transferreport', 'calcPackage', 'extraHR', 'extraKM', 'package_amount', 'extrakm_amount', 'extrahr_amount', 'ex_kmAmount', 'ex_hrAmount', 'nightBta', 'nightCount', 'night_totalAmount', 'driverBeta', 'driverbeta_Count', 'driverBeta_amount', 'totalcalcAmount', 'nightThrs', 'dtc', 'dtc2', 'nightThrs2', 'exkmTkm2', 'exHrsTHrs2', 'netamount', 'vehcommission', 'caramount1', 'manualbills', 'pack', 'amount5', 'exkm1', 'amount6', 'exHrs1', 'amount7', 'night1', 'amount8', 'driverconvenience1', 'amount9', 'rud', 'netamount1', 'discount', 'ons', 'manualbills1', 'balance', 'fcdate', 'taxdate', 'insdate', 'stpermit', 'maintenancetype', 'kilometer', 'selects', 'documenttype', 'on1', 'smsgust', 'booker', 'emailcheck', 'manualbillss', 'reload', 'Groups', 'orderbyemail'
        ];
        parameterKeys.forEach(key => {
            const value = params.get(key);
            if (value !== null && value !== "null") {
                formData[key] = value;
            }
        });

        const formvendorinfo = {};
        const parameterKeys1 = [
            "vendor_vehicle", "vendor_duty", 'vendorparking', 'fuelamount', "vendorshedOutDate", "vendorshedInDate", "vendortotaldays", "vendorreporttime", "vendorshedintime", "vendorTotaltime", "vendorshedoutkm", "vendorshedinkm", "vendortotalkm", "vendorRemarks", "Vendor_Calcpackage", "Vendor_rateAmount", "Vendor_ExtraKms", "Vendor_ExtraAmountKms", "Vendor_totalAmountKms", "Vendor_ExtraHours", "Vendor_ExtraAmountHours", "Vendor_totalAmountHours", "Vendor_NightHALT", "Vendor_NightBataAmount", "Vendor_NightbataTotalAmount", "Vendor_Bata", "Vendor_BataAmount", "Vendor_BataTotalAmount", "Vendor_FULLTotalAmount", "vendor_vpermettovendor", "vendor_vendorparking", "vendor_toll", "vendor_advancepaidtovendor", "vendor_ratename"
        ];
        parameterKeys1.forEach(key => {
            const value = params.get(key);
            if (value !== null && value !== "null") {
                formvendorinfo[key] = value;
            }
        });
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
        console.log(formData, 'formdataaa');

        setTripSheetData(formData);
        setBook(formData);
        setFormData(formData);
        setSelectedStatus(formData['status'])
        setSelectedStatuschecking(formData['status'])
        ///calc--------------------------------------
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
        GroupTripId: ""
    }

    const [book, setBook] = useState(bookData);
    const tripno = formData.tripid || selectedCustomerData.tripid || book.tripid;
    const statusCheck = formData.status || selectedCustomerData.status || book.status;
    const handleCancel = () => {
        setBook(bookData);
        setSelectedCustomerDatas({});
        setSelectedCustomerData({});
        setFormData({});
        setFormValues({});
        setPackageData({});
        setPackageDetails({});
        setTripSheetData({})
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
        // setIsHybridCustomer(false)
        // ===---------------
        setAttachedImage("")
        setGMapImageUrl("")
        setRouteData('')
        setSignImageUrl('')
        // -----------
        setSignatureWhattsapplink()
        setCopyDataLink(false)
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
        setNoChangeData({})
        // setCheckCloseKM({ maxShedInkm: '', maxTripId: "" })
        // setConflictEndDate({ maxShedInDate: null, TripIdconflictdate: null, conflictTimer: null })
        localStorage.removeItem('selectedTripid');
    };
    const handlecheck = async () => {
        const statusdata = formData.status || book.status || selectedCustomerData.status;
        if (sendEmail) {
            if (statusdata === 'Opened' || statusdata === 'Cancelled') {
                try {
                    const dataToSend = {
                        bookingno: formData.tripid || selectedCustomerData.tripid || book.tripid,
                        guestname: formValues.guestname || selectedCustomerData.guestname || book.guestname || formData.guestname,
                        guestmobileno: formValues.guestmobileno || selectedCustomerData.guestmobileno || book.guestmobileno || formData.guestmobileno,
                        email: formValues.email || selectedCustomerData.email || book.email || formData.email,
                        driverName: selectedCustomerDatas.driverName || selectedCustomerData.driverName || tripSheetData.driverName || selectedCustomerDatas.driverName || book.driverName,
                        vehRegNo: formData.vehRegNo || selectedCustomerDatas.vehRegNo || selectedCustomerData.vehRegNo || formValues.vehRegNo || book.vehRegNo,
                        mobileNo: formData.mobileNo || selectedCustomerDatas.mobileNo || selectedCustomerData.mobileNo || formValues.mobileNo || book.mobileNo || '',
                        vehType: selectedCustomerDatas.vehicleName || formData.vehicleName || selectedCustomerData.vehicleName || formValues.vehicleName || packageData.vehicleName || book.vehicleName,
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
        if (!isEditMode) {

            return
        }
        if(overetripsheetstatus && overetripsheetoutstation === "oustation") {
            setWarning(true);
            setWarningMessage("Status is closed, u dont have permission open this E-Tripsheet.");
            return
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
                const updatedCustomer = { ...selectedCustomerData }
                await axios.delete(`${apiUrl}/tripsheet/${selectedCustomerData.tripid}`);
                handleTripsheetlogDetails(updatedCustomer, tripid, "Delete")
                setFormData({});
                setSelectedCustomerData({});
                handleCancel();
                setSuccess(true);
                setSuccessMessage("Successfully Deleted");
            }

        } catch {
            setError(true);
            setErrorMessage("Data Not Deleted ");
        }
    };

    const vehilcedetails = {
        vehRegNo: selectedCustomerDatas.vehRegNo || '',
        vehType: selectedCustomerDatas.vehType || '',
        driverName: selectedCustomerDatas.driverName || '',
        mobileNo: selectedCustomerDatas.mobileNo || '',
    }

    // handleConfirm

    const tripID1 = useMemo(() => {
        return book.tripid || selectedCustomerData.tripid || formData.tripid;
    }, [book.tripid || selectedCustomerData.tripid || formData.tripid]);

    useEffect(() => {
        // Only make the API call if tripID1 is defined (not null or undefined)
        if (tripID1) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`${apiUrl}/Checkstatusandappsclosed/${tripID1}`);
                    const data = response.data;

                    setCheckStatusApp(data)

                    // Further processing of the data
                } catch (err) {
                    console.log(err);
                }
            };

            fetchData(); // Trigger the async function to fetch data
        }
    }, [tripID1, apiUrl]);

    const getCurrentTime = () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        return `${hours}:${minutes}`;
    };


    const handleTripsheetlogDetails = async (updatebook, lastBookinglogno, modedata) => {
        const logupdatabookdetails = updatebook
        try {
            const updatedBooklogdetails = {
                tripsheet_date: logupdatabookdetails.tripsheetdate,
                shedOutDate: logupdatabookdetails.shedOutDate,
                Reportdate: logupdatabookdetails.startdate,
                closedate: logupdatabookdetails.closedate,
                shedInDate: logupdatabookdetails.shedInDate,
                totaldays: logupdatabookdetails.totaldays,
                ShedOutTime: removeSeconds(logupdatabookdetails.reporttime),
                Reporttime: removeSeconds(logupdatabookdetails.starttime),
                closetime: removeSeconds(logupdatabookdetails.closetime),
                shedintime: removeSeconds(logupdatabookdetails.shedintime),
                totaltime: logupdatabookdetails.totaltime,
                additionaltime: logupdatabookdetails.additionaltime,
                shedout: logupdatabookdetails.shedout,
                startkm: logupdatabookdetails.startkm,
                closekm: logupdatabookdetails.closekm,
                shedin: logupdatabookdetails.shedin,
                totalkm1: logupdatabookdetails.totalkm1,
                shedkm: logupdatabookdetails.shedkm,
                Travelsname: logupdatabookdetails.travelsname,
                status: logupdatabookdetails.status,
                apps: logupdatabookdetails.apps,
                vehicleName: logupdatabookdetails.vehicleName,
                vehRegNo: logupdatabookdetails.vehRegNo,
                Log_Date: dayjs().format("DD-MM-YYYY"),
                Log_Time: getCurrentTime(),
                mode: modedata,
                tripsheet_no: lastBookinglogno,
                driverName: logupdatabookdetails.driverName,
                username: usernamedata

            };
            await axios.post(`${apiUrl}/TripsheetlogDetailslogged`, updatedBooklogdetails);
        }
        catch (err) {
            setError(true);
            setErrorMessage("Tripsheetlog Data not Added ");
            // console.log(err, "err")
        }
    }




    // const hybridatahcldatakm = ()=>{
    //     const hybridatahcl1 = hybridhclcustomer || hybridhclnavigate
    //     const hclconfict = Number(formData.Hcldatakmvalue || selectedCustomerData.Hcldatakmvalue || selectedCustomerDatas.Hcldatakmvalue || book.Hcldatakmvalue) || 0
    //     const hclconfict2 = Number(formData.HclMaxConflctdata || selectedCustomerData.HclMaxConflctdata || selectedCustomerDatas.HclMaxConflctdata || book.HclMaxConflctdata) || 0
    //     const kmmax = maxconflict?.maxconflictdata
    //     const addkmvaluedata = Number(hclconfict) + Number(kmmax) 

    //     // Hcldatakmvalue
    //         // HclMaxConflctdata
    //   const datakm =  formData.closekm || selectedCustomerData.closekm || selectedCustomerDatas.closekm || book.closekm
    //     if(hybridatahcl1 === 1){
    //         if(datakm !== "" ){
    //         if(hclconfict === 0){
    //           setConflictHCLDataValue({Hcldatakmvalue :addkmvaluedata,HclMaxConflctdata:kmmax})
    //         }
    //         else{
    //             setConflictHCLDataValue({Hcldatakmvalue : hclconfict,HclMaxConflctdata:hclconfict2}) 
    //         }

    //         }
    //         else{
    //             setConflictHCLDataValue({Hcldatakmvalue :0,HclMaxConflctdata:0})
    //         }
    //     }
    //     else{
    //         setConflictHCLDataValue({Hcldatakmvalue :0,HclMaxConflctdata:0})

    //     }
    // }
    const datakm1 = formData.closekm || selectedCustomerData.closekm || selectedCustomerDatas.closekm || book.closekm;
    const dutytype = formData.duty || selectedCustomerData.duty || book.duty;
    const hclOutstation = formData.shedin || book.shedin || selectedCustomerData.shedin || selectedCustomerDatas.shedin;

    const hybridatahcldatakm = async () => {
        const hybridatahcl1 = hybridhclcustomer || hybridhclnavigate;

        const shedKmValue1 = parseInt(shedKilometers.shedkm) || parseInt(formData.shedkm) || parseInt(selectedCustomerData.shedkm) || parseInt(book.shedkm);

        const hclconfict = Number(
            formData.Hcldatakmvalue ||
            selectedCustomerData.Hcldatakmvalue ||
            selectedCustomerDatas.Hcldatakmvalue ||
            book.Hcldatakmvalue
        ) || 0;

        const hclconfict2 = Number(
            formData.HclMaxConflctdata ||
            selectedCustomerData.HclMaxConflctdata ||
            selectedCustomerDatas.HclMaxConflctdata ||
            book.HclMaxConflctdata
        ) || 0;

        const kmmax = maxconflict?.maxconflictdata || 0;
        // const addkmvaluedata = hclconfict + kmmax;

        const datakm = formData.closekm || selectedCustomerData.closekm || selectedCustomerDatas.closekm || book.closekm;
        // const addkmvaluedata = Number(datakm) || 0 + kmmax 
        const addkmvaluedata = (Number(datakm) || 0) + kmmax + (Number(shedKmValue1) || 0);
        const Outstationkmdata = (Number(hclOutstation) || 0) + kmmax + (Number(shedKmValue1) || 0);
        const addTotalKmvaluedata = dutytype === "Outstation" ? Outstationkmdata : addkmvaluedata

        // console.log(hclconfict, "hcl", hclconfict2)
        const editHcldatakmvalue = hclconfict2 + (Number(hclOutstation) || 0) + (Number(shedKmValue1) || 0);
        const editHclnormal = hclconfict2 + (Number(datakm) || 0) + (Number(shedKmValue1) || 0);
        const editHclOutstationKmvalue = dutytype === "Outstation" ? editHcldatakmvalue : editHclnormal

        // console.log(editHclOutstationKmvalue, "wwwwwwwwwww", editHclnormal, editHcldatakmvalue, dutytype);
        // console.log(addkmvaluedata,"localll",addTotalKmvaluedata,"locallll",hclconfict,editHclOutstationKmvalue);


        if (hybridatahcl1 === 1) {
            if (datakm) {

                setConflictHCLDataValue({
                    Hcldatakmvalue: hclconfict === 0 ? addTotalKmvaluedata : editHclOutstationKmvalue,

                    // Hcldatakmvalue: dutytype === "Outstation" ? addkmvaluedata : hclconfict,
                    HclMaxConflctdata: hclconfict === 0 ? kmmax : hclconfict2
                });
            } else {
                setConflictHCLDataValue({ Hcldatakmvalue: 0, HclMaxConflctdata: 0 });
            }
        } else {
            setConflictHCLDataValue({ Hcldatakmvalue: 0, HclMaxConflctdata: 0 });
        }
    };

    useEffect(() => {
        hybridatahcldatakm()
    }, [datakm1, hclOutstation])

    const status1 = formData.status || selectedCustomerData.status || book.status
    const dayhcl1 = hybridhclcustomer || hybridhclnavigate
    // console.log(mapimageUrls1, "urls", typeof (mapimageUrls1), mapimageUrls)
    const checksignatureandmap = async () => {
        // handleTripmapClick()
        await handleTripmapverify()
        // await getSignatureImage()
        getSignatureImageverify()
        // console.log(tripID1, "userStatusdatatripi", typeof (tripID1))
        //    const status1 = formData.status || selectedCustomerData.status || book.status
        if (tripID1 && userStatus !== null) {
            // console.log(tripID1, "userStatusdatatripienetr", typeof (tripID1))
            //     const station = userStatus
            //     const dayhcl1 = hybridhclcustomer || hybridhclnavigate

            // if (stationmap.includes("All") || stationmap.includes("Chennai")) {
            if (userStatus.includes("All") || userStatus.includes("Chennai")) {
                if (dayhcl1 === 1 && status1 === "Closed") {

                    if (!signimageUrl && !mapimageUrls1 && mapimageUrls1 === "") {
                        setCheckSignandMapVerify(true)
                        setCheckSignMapMessage("Please upload the signature and Map")
                        return true;
                    }
                    else if (!signimageUrl) {
                        setCheckSignandMapVerify(true)
                        setCheckSignMapMessage("Please upload the signature")
                        // setError(true);
                        // setErrorMessage("Please upload the signature");
                        return true;
                    } else if (!mapimageUrls1 && mapimageUrls1 === "") {
                        setCheckSignandMapVerify(true)
                        setCheckSignMapMessage("Please upload the map image")
                        // setError(true);
                        // setErrorMessage("Please upload the map image");
                        return true;
                    }
                    else {
                        setCheckSignandMapVerify(false)
                        return false
                    }

                } else {
                    // if(dayhcl1 === 0 && status1 === "Closed"){
                    if (!signimageUrl && status1 === "Closed") {
                        setCheckSignandMapVerify(true)
                        setCheckSignMapMessage("Please upload the signature")
                        // setError(true);
                        // setErrorMessage("Please upload the signature");
                        return true;
                    }
                    // }
                    else {
                        // console.log("withoyttripid")
                        setCheckSignandMapVerify(false)
                        return false
                    }


                }

            }
            // else if( !stationmap.includes('Chennai') && !stationmap.includes('All')){
            //     else if( !userStatus.includes('Chennai') && !userStatus.includes('All')){
            //     if(!signimageUrl && status1 === "Temporary Closed"){
            //         setCheckSignandMapVerify(true)
            //         setCheckSignMapMessage("Please upload the signature")
            //         // setError(true);
            //         // setErrorMessage("Please upload the signature");
            //         return;
            //     }

            // }
            else {
                setCheckSignandMapVerify(false);
                return false;
            }
        }
        else {
            setCheckSignandMapVerify(false);
            return false
        }
    }
    useEffect(() => {
        checksignatureandmap()
    }, [isEditMode, status1, hybridhclcustomer, hybridhclnavigate, signimageUrl, mapimageUrls1])

    // console.log(checksignandMapverify, "userStatusdata", typeof (checksignandMapverify))

    const handleEdit = async () => {
        // const dutytype = formData.duty || selectedCustomerData.duty || book.duty;
        // handleTripmapClick()
        await checksignatureandmap()

        const driverName = selectedCustomerDatas?.driverName || selectedCustomerData.driverName || formData.driverName || formValues.driverName || book.driverName;
        const statusdata = checkstatusapps?.length > 0 ? checkstatusapps : "";
        const checkdata = statusdata[0];
        // const superpower = localStorage.getItem("SuperAdmin")
        const tripidbookno = selectedCustomerData.tripid || book.tripid || formData.tripid || packageDetails.tripid;

        // Log the type of superpower
        // if (
        //     (checkdata?.status === "Billed" && checkdata?.apps === "Closed" && Number(superpower) === 0) ||
        //     (checkdata?.status === "Closed" && checkdata?.apps === "Closed" && Number(superpower) === 0)
        // ) {

        if (
            (checkdata?.status === "Billed" && checkdata?.apps === "Closed" && superAdminAccess  !== "SuperAdmin") ||
            (checkdata?.status === "Closed" && checkdata?.apps === "Closed" && superAdminAccess  !== "SuperAdmin" )
        ) {
            setError(true);
            setErrorMessage(`Tripsheet has been ${checkdata?.status}`);
            return;
        }
        if (checksignandMapverify) {
            setError(true);
            setErrorMessage(checksignmapmessage);
            return;
        }
        if (Object.keys(nochangedata).length === 0) {
            // console.error("Error: Data not changed");
            setError(true);
            setErrorMessage("Nothing To Change");
            return
          }

        try {
            setisEditload(true)
            try {
                await getSignatureImage()
                await hybridatahcldatakm()

                const selectedCustomer = rows.find((row) => row.tripid === selectedCustomerData.tripid || formData.tripid || book.tripid);
                // const selectedBookingDate = selectedCustomerData.tripsheetdate || formData.tripsheetdate || dayjs();
                const selectedBookingDate = selectedCustomerData.tripsheetdate || formData.tripsheetdate || book.tripsheetdate || dayjs();
                const dattasign = signimageUrl ? "Closed" : book.apps || formData.apps || selectedCustomerData.apps
                const updatedCustomer = {
                    ...book,
                    ...selectedCustomer,
                    ...vehilcedetails,
                    ...selectedCustomerData,
                    ...formData,
                    apps: dattasign,
                    bookingno: tripidbookno,
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
                    mobileNo: selectedCustomerDatas?.mobileNo || formData.mobileNo || selectedCustomerData.mobileNo || formValues.mobileNo || book.mobileNo,
                    shedkm: shedKilometers.shedkm || book.shedkm || formData.shedkm || selectedCustomerData.shedkm,
                    vehicleName2: selectedCustomerDatas.vehicleName2 || formData.vehicleName2 || selectedCustomerData.vehicleName2 || formValues.vehicleName2 || packageData.vehicleName2 || book.vehicleName2,
                    orderbyemail: formData.orderbyemail || selectedCustomerDatas.orderbyemail || selectedCustomerData.orderbyemail || formValues.orderbyemail || book.orderbyemail,
                    totaldays: parseInt(calculateTotalDay() || 0) || 0,
                    totalkm1: calculateTotalKilometers(),
                    totaltime: calculateTotalTimes(),
                    netamount: calculateTotalAmount(),
                    TotalTimeWithoutAddHours: calculatewithoutadditonalhour(),
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
                    calcPackage, extraHR: parseFloat(extraHR || 0) || 0, extraKM: parseFloat(extraKM || 0) || 0, package_amount: parseInt(package_amount || 0) || 0, extrakm_amount: parseFloat(extrakm_amount || 0) || 0, extrahr_amount: parseFloat(extrahr_amount || 0) || 0, ex_kmAmount, ex_hrAmount, nightBta: parseFloat(nightBta || 0) || 0, nightCount: parseFloat(nightCount || 0) || 0, night_totalAmount, driverBeta: parseFloat(driverBeta || 0), driverbeta_Count: parseFloat(driverbeta_Count || 0), driverBeta_amount, totalcalcAmount, escort, minHour, minKM, transferreport,
                    // -------------------------vendor--------------------------------------------------------
                    vendor_vehicle: vendorinfo.vendor_vehicle || "",
                    vendor_duty: vendorinfo.vendor_duty || "",
                    fuelamount: vendorinfo.fuelamount || "",
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
                    Vendor_NightHALT: vendorbilldata.Vendor_NightHALT || vendorpassvalue.Vendor_NightHALT || 0,
                    Vendor_NightBataAmount: vendorbilldata.Vendor_NightBataAmount || vendorpassvalue.Vendor_NightBataAmount || 0,
                    Vendor_NightbataTotalAmount: vendornightdatatotalAmount || vendornightdatatotalAmount || 0,
                    Vendor_Bata: vendorbilldata.Vendor_Bata || vendorpassvalue.Vendor_Bata || 0,
                    Vendor_BataAmount: vendorbilldata.Vendor_BataAmount || vendorpassvalue.Vendor_BataAmount || 0,
                    Vendor_BataTotalAmount: vendorbilldata.Vendor_BataTotalAmount || 0,
                    Vendor_FULLTotalAmount: vendorbilldata.Vendor_FULLTotalAmount || 0,
                    Hybriddata: hybridhclcustomer || 0,
                    TimeToggleData: timeToggle || 0,
                    VendorTimeToggle: timeTogglevendor,
                    Hcldatakmvalue: conflicthcldatavalue.Hcldatakmvalue,
                    HclMaxConflctdata: conflicthcldatavalue.HclMaxConflctdata,
                    lockdatavalue:lockdata

                };
                const VehcileHistory = {
                    tripid: book.tripid || formData.tripid || selectedCustomerData.tripid,
                    VehicleNo: formData.vehRegNo || selectedCustomerData.vehRegNo || formValues.vehRegNo || selectedCustomerDatas.vehRegNo || book.vehRegNo,
                    shedouttime: formData.reporttime || selectedCustomerData.reporttime || selectedCustomerDatas.reporttime || book.reporttime,
                    reporttime: formData.starttime || book.starttime || selectedBookingDate.starttime || selectedCustomerData.starttime,
                    closetime: formData.closetime || selectedCustomerData.closetime || book.closetime || null,
                    shedintime: book.shedintime || formData.shedintime || selectedCustomerData.shedintime || null,
                    shedoutdate: formData.shedOutDate || selectedCustomerDatas.shedOutDate || selectedCustomerData.shedOutDate || book.shedOutDate,
                    reportdate: formData.startdate || selectedCustomerDatas.startdate || selectedCustomerData.startdate || book.startdate,
                    closedate: formData.closedate || selectedCustomerDatas.closedate || selectedCustomerData.closedate || book.closedate || null,
                    shedindate: formData.shedInDate || selectedCustomerDatas.shedInDate || selectedCustomerData.shedInDate || book.shedInDate || null,
                    shedoutkm: formData.shedout || book.shedout || selectedCustomerData.shedout || 0,
                    reportkm: formData.startkm || selectedCustomerData.startkm || selectedCustomerDatas.startkm || book.startkm || 0,
                    closekm: formData.closekm || selectedCustomerData.closekm || selectedCustomerDatas.closekm || book.closekm || 0,
                    shedinkm: formData.shedin || book.shedin || selectedCustomerData.shedin || selectedCustomerDatas.shedin || 0,
                    totalkm: calculateTotalKilometers(),
                    drivername: driverName,
                };
                console.log(VehcileHistory, "editVehicleHistory");

                const tripsheetlogtripid = selectedCustomerData.tripid || book.tripid || formData.tripid || packageDetails.tripid;

                for (const key in updatedCustomer) {
                    if (key === '0') {
                        delete updatedCustomer[key];
                    }
                }
                await axios.put(`${apiUrl}/tripsheet-edit/${selectedCustomerData.tripid || book.tripid || formData.tripid || packageDetails.tripid}`, updatedCustomer);
                await axios.put(`${apiUrl}/vehicleHistory/${selectedCustomerData.tripid || book.tripid || formData.tripid || packageDetails.tripid}`, VehcileHistory)
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
                handleTripsheetlogDetails(updatedCustomer, tripsheetlogtripid, "Edited")
                setSendEmail(true)
                setDriverSMS(true)
                setSmsGuest(true)
                setSuccess(true);
                handleCancel();
                setisEditload(false)
                setSuccessMessage("Successfully updated");
                setLockData(false)
                // setLockDatavendorBill(false)
                // setLockDatacustomerBill(false)
                // setLockData(true)
                setLockDatavendorBill(true)
                setLockDatacustomerBill(true)
                setCheckSignandMapVerify(false)
                //    const data2= await  checksignatureandmap()
                //    console.log(data2,"userStatusdata2")

                handleClose()
            } catch (err) {
                // console.log(err, "erredit")
                setError(true);
                setisEditload(false)
                setErrorMessage("Check your Network Connection");

            }
        } catch (err) {
            // console.log(err, "errrdit2")
            setError(true);
            setisEditload(false)
            setErrorMessage("Check your Network Connection");
        }
    };

    // const handleConfirm = async () => {
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
    //                 starttime: starttime || book.starttime || formData.startTime || selectedCustomerData.startTime,
    //                 closetime: closetime || book.closetime || formData.closetime || selectedCustomerData.closetime,
    //                 reporttime: reporttime || book.reporttime || selectedCustomerData.reporttime || formData.reporttime,
    //                 shedintime: shedintime || book.shedintime || selectedCustomerData.shedintime || formData.shedintime,
    //                 starttime2: starttime2 || book.starttime2 || formData.startTime2 || selectedCustomerData.starttime2,
    //                 closetime2: closetime2 || book.closetime2 || formData.closetime2 || selectedCustomerData.closetime2,
    //                 additionaltime: additionalTime.additionaltime,
    //                 tripsheetdate: selectedBookingDate,
    //                 vehRegNo: formData.vehRegNo || selectedCustomerData.vehRegNo || formValues.vehRegNo || selectedCustomerDatas.vehRegNo || book.vehRegNo || '',
    //                 vehType: VehicleRate.find((option) => option.optionvalue)?.label || formData.vehType || selectedCustomerData.vehType || formValues.vehType || selectedCustomerDatas.vehType || packageData.vehType || book.vehType || '',
    //                 driverName: formData.driverName || selectedCustomerData.driverName || formValues.driverName || selectedCustomerDatas.driverName || book.driverName || '',
    //                 mobileNo: formData.mobileNo || selectedCustomerData.mobileNo || formValues.mobileNo || selectedCustomerDatas.mobileNo || book.mobileNo || '',
    //                 shedkm: shedKilometers.shedkm,
    //                 vehicleName2: selectedCustomerDatas.vehicleName2 || formData.vehicleName2 || selectedCustomerData.vehicleName2 || formValues.vehicleName2 || packageData.vehicleName2 || book.vehicleName2,
    //                 totalkm1: calculateTotalKilometers(),
    //                 totaltime: calculateTotalTimes(),
    //                 TotalTimeWithoutAddHours: calculatewithoutadditonalhour(),
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
    //             };
    //             for (const key in updatedCustomer) {
    //                 if (key === '0') {
    //                     delete updatedCustomer[key];
    //                 }
    //             }
    //             await axios.put(`${apiUrl}/tripsheet-confirm/${selectedCustomerData.tripid || book.tripid || formData.tripid || packageDetails.tripid}`, updatedCustomer);
    //             handleCancel();
    //             setShedKilometers("")
    //             setAdditionalTime("")

    //             setRow([]);
    //             setRows([]);
    //             setSuccess(true);
    //             setSuccessMessage("Successfully updated");
    //         } catch {
    //             setError(true);
    //             setErrorMessage("Check your Network Connection");
    //         }
    //     } catch {
    //         setError(true);
    //         setErrorMessage("Check your Network Connection");
    //     }
    // };



    const handleAdd = async () => {

        const customer = formData.customer || selectedCustomerData.customer || book.customer || packageData.customer;
        const vehRegNo = formData.vehRegNo || selectedCustomerData.vehRegNo || formValues.vehRegNo || selectedCustomerDatas.vehRegNo || book.vehRegNo || '';
        const driverName = selectedCustomerDatas?.driverName || selectedCustomerData.driverName || formData.driverName || formValues.driverName || book.driverName;
        const mobileNo = selectedCustomerDatas?.mobileNo || formData.mobileNo || selectedCustomerData.mobileNo || formValues.mobileNo || book.mobileNo;
        const Email = formData.email || selectedCustomerData.email || formValues.email || book.email;
        const vehType = selectedCustomerDatas.vehType || formData.vehType || selectedCustomerData.vehType || book.vehType;
        const tripnodata = formData.tripid || selectedCustomerData.tripid || book.tripid
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
            setisAddload(true)
            // const selectedBookingDate = selectedCustomerData.tripsheetdate || formData.tripsheetdate || dayjs().format("");
            const selectedBookingDate = dayjs().format("YYYY-MM-DD");
            const dattasign = book.apps;
            const updatedBook = {
                ...book,
                bookingno: formData.tripid || selectedCustomerData.tripid || book.tripid,
                apps: dattasign,
                starttime2: starttime2 || book.starttime2 || formData.startTime2 || selectedCustomerData.starttime2,
                closetime2: closetime2 || book.closetime2 || formData.closetime2 || selectedCustomerData.closetime2,
                tripsheetdate: selectedBookingDate,
                totaldays: calculateTotalDay(),
                totalkm1: calculateTotalKilometers(),
                totaltime: calculateTotalTimes(),
                TotalTimeWithoutAddHours: calculatewithoutadditonalhour(),
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
                // closedate: formData.closedate || selectedCustomerDatas.closedate || selectedCustomerData.closedate || book.closedate,
                closedate: formData.closedate || selectedCustomerDatas.closedate || selectedCustomerData.closedate || book.closedate ||formData.shedOutDate || selectedCustomerDatas.shedOutDate || selectedCustomerData.shedOutDate || book.shedOutDate,
                shedInDate: formData.shedInDate || selectedCustomerDatas.shedInDate || selectedCustomerData.shedInDate || book.shedInDate,
                startkm: book.startkm,
                orderbyemail: formData.orderbyemail || selectedCustomerDatas.orderbyemail || selectedCustomerData.orderbyemail || formValues.orderbyemail || book.orderbyemail,
                starttime: formData.starttime || book.starttime || selectedBookingDate.starttime,
                toll: book.toll,
                vendortoll: book.vendortoll,
                vendorparking: book.vendorparking,
                fuelamount: book.fuelamount,
                vpermettovendor: book.vpermettovendor,
                driverName: driverName,
                request: selectedCustomerDatas.request || selectedCustomerData.request || formValues.request || book.request,
                vehicleName: selectedCustomerDatas.vehicleName || formData.vehicleName || selectedCustomerData.vehicleName || formValues.vehicleName || packageData.vehicleName || book.vehicleName,
                vehRegNo: formData.vehRegNo || selectedCustomerData.vehRegNo || formValues.vehRegNo || selectedCustomerDatas.vehRegNo || book.vehRegNo,
                Groups: selectedCustomerDatas.Groups || formData.Groups || selectedCustomerData.Groups || formValues.Groups || packageData.Groups || book.Groups,
                hireTypes: selectedCustomerDatas.hiretypes || formData.hireTypes || formValues.hireTypes || selectedCustomerData.hireTypes || book.hireTypes,
                mobileNo: formData.mobileNo || selectedCustomerData.mobileNo || formValues.mobileNo || selectedCustomerDatas.mobileNo || book.mobileNo,
                calcPackage, extraHR, extraKM, package_amount, extrakm_amount, extrahr_amount, ex_kmAmount, ex_hrAmount, nightBta, nightCount, night_totalAmount, driverBeta, driverbeta_Count, driverBeta_amount, totalcalcAmount,
                escort, minHour, minKM, transferreport,
                // -------vendordata-------------------------------------------------
                vendor_vehicle: vendorinfo.vendor_vehicle || "",
                vendor_duty: vendorinfo.vendor_duty || "",
                fuelamount: vendorinfo.fuelamount || "",
                vendorparking: vendorinfo.vendorparking || "",
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
                Hybriddata: hybridhclcustomer || 0,
                TimeToggleData: timeToggle,
                VendorTimeToggle: timeTogglevendor,
                HclMaxConflctdata: 0,
                Hcldatakmvalue: 0,
                lockdatavalue:lockdata
            };
            // console.log(updatedBook," book")
            const VehcileHistory = {
                tripid: book.tripid,
                VehicleNo: formData.vehRegNo || selectedCustomerData.vehRegNo || formValues.vehRegNo || selectedCustomerDatas.vehRegNo || book.vehRegNo,
                shedouttime: formData.reporttime || selectedCustomerData.reporttime || selectedCustomerDatas.reporttime || book.reporttime,
                reporttime: formData.starttime || book.starttime || selectedBookingDate.starttime || null,
                closetime: book.closetime || null,
                shedintime: book.shedintime || formData.shedintime || selectedCustomerData.shedintime || null,
                shedoutdate: formData.shedOutDate || selectedCustomerDatas.shedOutDate || selectedCustomerData.shedOutDate || book.shedOutDate || null,
                reportdate: formData.startdate || selectedCustomerDatas.startdate || selectedCustomerData.startdate || book.startdate || null,
                closedate: formData.closedate || selectedCustomerDatas.closedate || selectedCustomerData.closedate || book.closedate || null,
                shedindate: formData.shedInDate || selectedCustomerDatas.shedInDate || selectedCustomerData.shedInDate || book.shedInDate || null,
                shedoutkm: formData.shedout || book.shedout || selectedCustomerData.shedout || 0,
                reportkm: book.startkm || 0,
                closekm: book.closekm || 0,
                shedinkm: book.shedin || 0,
                totalkm: calculateTotalKilometers(),
                drivername: driverName,

            };
            await axios.post(`${apiUrl}/tripsheet-add`, updatedBook);
            await axios.post(`${apiUrl}/addVehicleHistoryData`, VehcileHistory)
            console.log(VehcileHistory, "vehiclehistory");

            handleTripsheetlogDetails(updatedBook, tripnodata, "create")
            setRow([]);
            setRows([]);
            handleCancel();
            setSuccess(true);
            handleSendSMS();
            handleDriverSendSMS();
            handlecheck();
            setisAddload(false)
            setSuccessMessage("Successfully Added");
            setLockData(false)
            // setLockDatavendorBill(false)
            // setLockDatacustomerBill(false)
            // setLockData(true)
            setLockDatavendorBill(true)
            setLockDatacustomerBill(true)
        }
        // catch {
        //     setError(true);
        //     setErrorMessage("Check your Network Connection");
        // }
        catch (error) {
            // console.error("Error occurredddddd:", error);

            // Check if there's no response, indicating a network error
            if (error.message) {
                setError(true);
                setErrorMessage("Check your Network Connection");
                setisAddload(false)
                // console.log('Network error');
            } else if (error.response) {
                setError(true);
                // Handle other Axios errors (like 4xx or 5xx responses)
                setErrorMessage("Failed to Add: " + (error.response.data.message || error.message));
                setisAddload(false)
            } else {
                // Fallback for other errors
                setError(true);
                setErrorMessage("An unexpected error occurred: " + error.message);
                setisAddload(false)
            }
        }
    };

    // ---------------venodr-----------------------
    const handleAutocompleteVendor = (event, value, name) => {
        const selectedOption = value ? value.label : '';
        if (!lockdata) {
            setVendorinfodata((prevBook) => ({
                ...prevBook,
                [name]: selectedOption,
            }))
            setNoChangeData((prevData) => ({
                ...prevData,
                [name]: selectedOption,
            }))
        }
    }
    const handleDatevendorChange = (date, name) => {
        const formattedDate = dayjs(date).format('YYYY-MM-DD');
        const parsedDate = dayjs(formattedDate).format('YYYY-MM-DD');
        if (!lockdata) {
            setVendorinfodata((prevBook) => ({
                ...prevBook,
                [name]: parsedDate,
            }))
            setNoChangeData((prevData) => ({
                ...prevData,
                [name]: parsedDate,
            }))
        }
    }

    const handleAutocompleteChange = (event, value, name) => {
        const selectedOption = value ? value.label : '';

        if (name === "status") { // Or any specific criteria
            setSelectedStatuschecking(selectedOption || 'Opened');
        }

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
         setNoChangeData((prevValues) => ({
            ...prevValues,
            [name]: selectedOption,
        }));
        // Uncomment if you want to control VendorInfo visibility based on `lockdata`
        // if (!lockdata) {
        //     setVendorinfodata((prevValues) => ({
        //         ...prevValues,
        //         [name]: selectedOption,
        //     }));
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
        setNoChangeData((prevValues) => ({
            ...prevValues,
            [name]: selectedOption,
        }));
        travelsdatafetch(selectedOption)

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
        setNoChangeData((prevValues) => ({
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

            if (actionName === 'Cancel') {
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
        const documentType = formData.documenttype || selectedCustomerData.documenttype || book.documenttype;
        if (!tripid) {
            setError(true);
            setErrorMessage("Enter The Tripid.");
            return
        }
        if (!documentType) {
            setError(true)
            setErrorMessage("Please Select the Document Type")
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
            setNoChangeData({...nochangedata,uploaddata:file})
            try {
                await axios.put(`${apiUrl}/tripsheet_uploads/${tripid}/${documentType}/${data}`, formData);
                setSuccess(true);
                setSuccessMessage("Successfully added");

                if (documentType === 'Toll' || documentType === 'Parking') {
                    await axios.post(`${apiurltransfer}/uploadfolrderapp/${data}`, formData);
                    setSuccessMessage("Successfully added");
                }
                // setSuccess(true);
                setFormData((prev) => ({
                    ...prev,
                    documenttype: '',
                }));
                setSelectedCustomerData((prev) => ({
                    ...prev,
                    documenttype: '',
                }));
                setBook((prev) => ({
                    ...prev,
                    documenttype: '',
                }));
            } catch (error) {
                // if (!error.response) {
                //     setErrorMessage('Check your network and try again.');
                // } else {  
                // }
                // setErrorMessage('Failed to upload');

                // setError(true);

            }



        }
    };
    // const handleFileChange = async (event) => {
    //     const documentType = formData.documenttype || selectedCustomerData.documenttype || book.documenttype || '';
    //     const tripid = book.tripid || selectedCustomerData.tripid || formData.tripid;
    //     const file = event.target.files[0];
    //     if (!file) return;
    //     if (file) {
    //         const data = Date.now().toString();
    //         const formData = new FormData();
    //         formData.append('image', file);

    //         try {

    //             await axios.put(`${apiUrl}/tripsheet_uploads/${tripid}/${documentType}/${data}`, formData);
    //             setSuccess(true)
    //             setSuccessMessage("Sucessfully Added")
    //             if (documentType === 'Toll' || documentType === 'Parking') {
    //                 await axios.post(`${apiurltransfer}/uploadfolrderapp/${data}`, formData);
    //                 //   await axios.post(`http://localhost:7000/uploadfolrderapp/${data}`, formData);
    //                 setSuccess(true)
    //                 setSuccessMessage("Sucessfully Added")
    //             }
    //             setFormData((prev) => ({
    //                 ...prev,
    //                 documenttype: '',
    //             }));
    //             setSelectedCustomerData((prev) => ({
    //                 ...prev,
    //                 documenttype: '',
    //             }));
    //             setBook((prev) => ({
    //                 ...prev,
    //                 documenttype: '',
    //             }));
    //         } catch (error) {
    //             console.error('Error uploading file:', error);
    //             setError(true)
    //             setErrorMessage('Failled to upload')
    //         }



    //     }
    // };


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

// -----------this for E-trisheet and overview hide based on status and station"

const Etripsheetoverview = ()=>{
  const userdatastatusstation = userStatus
  if(userdatastatusstation !== null){

  if (statusCheck === "Closed" && superAdminAccess !== "SuperAdmin" &&
    (!userdatastatusstation.includes("Chennai") && !userdatastatusstation.includes("All"))
)
{
setOverViewETripsheet(true)
setOverViewETripsheetOutstation("oustation")

return
}

else if( 
    (statusCheck === "Closed") && superAdminAccess !== "SuperAdmin" &&
    (userdatastatusstation.includes("Chennai") || userdatastatusstation.includes("All"))
){
    setOverViewETripsheet(true)
    setOverViewETripsheetOutstation("Instation")
    return
}
else{
    setOverViewETripsheet(false)
    setOverViewETripsheetOutstation(null)
    return
}
  }
  else{
    setOverViewETripsheet(false)
    setOverViewETripsheetOutstation(null)
    
    return
  }



}




useEffect(() => {
    Etripsheetoverview();
  }, [statusCheck, userStatus, superAdminAccess]);








// ------------------------------------------

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
        const closeDate = formData.closedate || selectedCustomerData.closedate || book.closedate;
        const shedoutdate = formData.shedOutDate || selectedCustomerData.shedOutDate || book.shedOutDate;
        const shedindate = formData.shedInDate || selectedCustomerData.shedInDate || book.shedInDate;
        if (shedoutdate && shedindate) {
            const shedOutDateObj = dayjs(shedoutdate).startOf('day');
            const shedindateObj = dayjs(shedindate).startOf('day');

            if (shedOutDateObj.isAfter(shedindateObj)) {
                // console.log('Shed Out Date is greater than Shed In Date');
                // return 'Shed Out Date is greater';
                return 0;
            } else if (shedOutDateObj.isSame(shedindateObj)) {
                return 1;
            } else {
                const totalDays = shedindateObj.diff(shedOutDateObj, 'days');
                return totalDays + 1;
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
                    setTimeToggle(0);
                }
            } catch (error) {
                console.error('Error fetching customer data:', error);
                setTimeToggle(0);
            }
        } else {
            setTimeToggle(0);
        }
    }, [apiUrl, customerdatatimetoggle]); // Memoize the fetch function based on these dependencies

    // Use useEffect to trigger the fetch function only when necessary
    useEffect(() => {
        fetchdatacustomerTimeToggle();
    }, [fetchdatacustomerTimeToggle]);

    const VendorTimetoggle = useMemo(() => {
        return (
            selectedCustomerDatas.travelsname ||
            formData.travelsname ||
            selectedCustomerData.travelsname ||
            book.travelsname ||
            ""
        );
    }, [selectedCustomerDatas.travelsname, formData.travelsname, selectedCustomerData.travelsname, book.travelsname]);
    const fetchdatavendorTimeToggle = useCallback(async () => {
        if (VendorTimetoggle) {
            try {
                const response = await axios.get(`${apiUrl}/AccountinfoTimetOOGLE/${VendorTimetoggle}`);
                const data = response.data;
                if (data.length > 0) {
                    const res = data[0].TimeToggle;
                    // console.log(typeof(res),"custommmmm")

                    setTimeToggleVendor(res); // Update state with the fetched result
                } else {
                    setTimeToggleVendor(0);
                }
            } catch (error) {
                console.error('Error fetching customer data:', error);
                setTimeToggleVendor(0);
            }
        } else {
            setTimeToggleVendor(0);
        }
    }, [apiUrl, VendorTimetoggle]);

    useEffect(() => {
        fetchdatavendorTimeToggle()
    }, [fetchdatavendorTimeToggle]);



    const fetchdatacustomerhybrid = useCallback(async () => {
        if (customerdatatimetoggle) {
            try {
                const response = await axios.get(`${apiUrl}/customerratenamedata/${customerdatatimetoggle}`);
                const data = response.data;
                if (data.length > 0) {
                    const res = data[0].hybrid;
                    // console.log(data,"cust")
                    setHybridHclCustomer(res)
                    // Update state with the fetched result
                } else {
                    setHybridHclCustomer('')
                }
            } catch (error) {

                console.error('Error fetching customer data:', error);
                setHybridHclCustomer('')
            }
        } else {
            setHybridHclCustomer('')

        }
    }, [apiUrl, customerdatatimetoggle]); // Memoize the fetch function based on these dependencies

    // Use useEffect to trigger the fetch function only when necessary
    useEffect(() => {
        fetchdatacustomerhybrid();
    }, [fetchdatacustomerhybrid]);
    // console.log(fetchdatacustomerTimeToggle(),"time")

    // function removeSeconds(time) {
    //     console.log(time,"ddd")
    //     // Split the time string by colon (:)
    //     const timeParts = time.split(':');

    //     // Check if there are seconds (length 3), return hours:minutes
    //     if (timeParts.length === 3) {
    //       return `${timeParts[0]}:${timeParts[1]}`;
    //     }

    //     // If there's only hours:minutes, return it as is
    //     return time;
    //   }


    const calculateTotalTimes = () => {
        const shedoutTime = formData.reporttime || selectedCustomerData.reporttime || selectedCustomerDatas.reporttime || book.reporttime
        const shedinTime = formData.shedintime || selectedCustomerData.shedintime || selectedCustomerDatas.shedintime || book.shedintime
        const additionalTimeValue = additionalTime.additionaltime || formData.additionaltime || selectedCustomerData.additionaltime || book.additionaltime;
        const totalDays = formData.totaldays || calculateTotalDay() || book.totaldays;
        // const datatimetoggle = timeToggle;
        const duty = formData.duty || selectedCustomerData.duty || book.duty;
        const datatimetoggle = timeToggle || timetogglenavigate
        // console.log( timeToggle,"hhh",timetogglenavigate,datatimetoggle)
        const starttimehybrid = removeSeconds(formData.starttime || selectedCustomerData.starttime || book.starttime || selectedCustomerDatas.starttime)

        const closetimehybrid = removeSeconds(formData.closetime || selectedCustomerData.closetime || book.closetime)

        const hybriddata = hybridhclcustomer || hybridhclnavigate



        if (hybriddata === 1) {
            let additionalHours = 0;
            let additionalMinutesValue = 0;

            // Parse additional time value if available
            if (additionalTimeValue) {
                const hoursMatch = additionalTimeValue.match(/(\d+)h/);
                const minutesMatch = additionalTimeValue.match(/(\d+)m/);

                additionalHours = hoursMatch ? parseInt(hoursMatch[1]) : 0;

                additionalMinutesValue = minutesMatch ? parseInt(minutesMatch[1]) : 0;
            }

            // Convert minutes to a two-digit string
            const formattedMinutes = additionalMinutesValue.toString().padStart(2, '0');


            // Combine hours and minutes into a single decimal format
            let combinedTime = `${additionalHours}.${formattedMinutes}`;

            // if (starttimehybrid && closetimehybrid) {
            if (starttimehybrid && closetimehybrid && duty !== "Outstation") {

                if (calculateTotalDay() === 1) {
                    // Split the time strings into hours and minutes
                    const [shedoutHours, shedoutMinutes] = starttimehybrid?.split(':').map(Number);
                    const [shedinHours, shedinMinutes] = closetimehybrid?.split(':').map(Number);

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



                if (calculateTotalDay() === 2) {

                    const newTimeString = starttimehybrid?.replace(":", ".");
                    const newTimeStrings = closetimehybrid?.replace(":", ".");
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
                    }
                    if (decimalPart < 60) {
                        const [hours, minutes] = formattedTotal?.toString().split('.').map(Number);

                        const formattedMinutes = parseInt(minutes, 10);
                        if (datatimetoggle === 0) {
                            const dataminutes = formattedMinutes >= 30 ? `${hours + 1}h` : `${hours}h`;
                            return dataminutes
                        }
                        else {
                            return `${hours}h ${formattedMinutes}m`;
                        }

                    }

                }
                if (calculateTotalDay() > 2) {
                    const newTimeString = starttimehybrid?.replace(":", ".");
                    const newTimeStrings = closetimehybrid?.replace(":", ".");

                    const LongTripDays = totalDays - 2;
                    const LongTripHours = LongTripDays * 24;
                    const LongHours = LongTripHours.toFixed(2);

                    const combined = combinedTime;

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
                        // console.log(a);
                        const [hours, minutes] = formattedTotal?.toString().split('.').map(Number);

                        const formattedMinutes = minutes.toString().padStart(2, '0'); // Ensure two digits for minutes
                        if (datatimetoggle === 0) {

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
            else {

                if (shedoutTime && shedinTime && duty === "Outstation") {


                    if (calculateTotalDay() === 1) {
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



                    if (calculateTotalDay() === 2) {

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
                        }
                        if (decimalPart < 60) {
                            const [hours, minutes] = formattedTotal?.toString().split('.').map(Number);

                            const formattedMinutes = parseInt(minutes, 10);
                            if (datatimetoggle === 0) {
                                const dataminutes = formattedMinutes >= 30 ? `${hours + 1}h` : `${hours}h`;
                                return dataminutes
                            }
                            else {
                                return `${hours}h ${formattedMinutes}m`;
                            }

                        }

                    }
                    if (calculateTotalDay() > 2) {
                        const newTimeString = shedoutTime?.replace(":", ".");
                        const newTimeStrings = shedinTime?.replace(":", ".");

                        const LongTripDays = totalDays - 2;
                        const LongTripHours = LongTripDays * 24;
                        const LongHours = LongTripHours.toFixed(2);

                        const combined = combinedTime;

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
                            // console.log(a);
                            const [hours, minutes] = formattedTotal?.toString().split('.').map(Number);

                            const formattedMinutes = minutes.toString().padStart(2, '0'); // Ensure two digits for minutes
                            if (datatimetoggle === 0) {

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

            return ''
        }
        else {

            let additionalHours = 0;
            let additionalMinutesValue = 0;

            // Parse additional time value if available
            if (additionalTimeValue) {
                const hoursMatch = additionalTimeValue.match(/(\d+)h/);
                const minutesMatch = additionalTimeValue.match(/(\d+)m/);

                additionalHours = hoursMatch ? parseInt(hoursMatch[1]) : 0;

                additionalMinutesValue = minutesMatch ? parseInt(minutesMatch[1]) : 0;
            }

            // Convert minutes to a two-digit string
            const formattedMinutes = additionalMinutesValue.toString().padStart(2, '0');


            // Combine hours and minutes into a single decimal format
            let combinedTime = `${additionalHours}.${formattedMinutes}`;

            if (shedinTime && shedoutTime) {


                if (calculateTotalDay() === 1) {
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



                if (calculateTotalDay() === 2) {

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
                    }
                    if (decimalPart < 60) {
                        const [hours, minutes] = formattedTotal?.toString().split('.').map(Number);

                        const formattedMinutes = parseInt(minutes, 10);
                        if (datatimetoggle === 0) {
                            const dataminutes = formattedMinutes >= 30 ? `${hours + 1}h` : `${hours}h`;
                            return dataminutes
                        }
                        else {
                            return `${hours}h ${formattedMinutes}m`;
                        }

                    }

                }
                if (calculateTotalDay() > 2) {
                    const newTimeString = shedoutTime?.replace(":", ".");
                    const newTimeStrings = shedinTime?.replace(":", ".");
                    const LongTripDays = totalDays - 2;
                    const LongTripHours = LongTripDays * 24;
                    const LongHours = LongTripHours.toFixed(2);

                    const combined = combinedTime;

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
                        console.log(a);
                        const [hours, minutes] = formattedTotal?.toString().split('.').map(Number);

                        const formattedMinutes = minutes.toString().padStart(2, '0'); // Ensure two digits for minutes
                        if (datatimetoggle === 0) {

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
            return ''
        }

    }
    // calculateTotalTimes()


    useEffect(() => {
        calculateTotalTimes()
    }, [selectedCustomerData.shedintime, selectedCustomerDatas.shedintime, selectedCustomerData.reporttime, book.reporttime, book.shedintime,])



    const calculateTotalKilometers = () => {
        const startKm = formData.shedout || book.shedout || selectedCustomerData.shedout || '';
        const closeKm = formData.shedin || book.shedin || selectedCustomerData.shedin || selectedCustomerDatas.shedin;
        const hybridatahcl = hybridhclcustomer || hybridhclnavigate

        // if (hybridhclcustomer === 1) {
        if (hybridatahcl === 1) {

            const shedKmValue = parseInt(shedKilometers.shedkm || 0) || parseInt(formData.shedkm || 0) || parseInt(selectedCustomerData.shedkm || 0) || parseInt(book.shedkm || 0);
            const closekm = formData.closekm || selectedCustomerData.closekm || selectedCustomerDatas.closekm || book.closekm || ''
            const hclOutstation = formData.shedin || book.shedin || selectedCustomerData.shedin || selectedCustomerDatas.shedin;
            const hclKM = dutytype === "Outstation" ? parseInt(hclOutstation || 0) + shedKmValue || 0 : parseInt(closekm) + shedKmValue || 0;
            return hclKM

        }

        // if (startKm !== undefined && closeKm !== undefined && hybridhclcustomer !== 1) {
        if (startKm !== undefined && closeKm !== undefined && hybridatahcl !== 1) {
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
    // const calculatevendorTotalDays = () => {
    //     const shedoutdate = vendorinfo?.vendorshedOutDate || "";
    //     const shedindate = vendorinfo?.vendorshedInDate || ""


    //     if (shedoutdate && shedindate) {
    //         const shedOutDateObj = dayjs(shedoutdate).startOf('day');
    //         const shedindateObj = dayjs(shedindate).startOf('day');

    //         if (shedOutDateObj.isAfter(shedindateObj)) {
    //             return 'Shed Out Date is greater';
    //         } else if (shedOutDateObj.isSame(shedindateObj)) {
    //             return 0;
    //         } else {
    //             const totalDays = shedindateObj.diff(shedOutDateObj, 'days');
    //             return totalDays;
    //         }
    //     }

    //     return '';
    // };

    // const handleDriverChange = (event, value, name) => {
    //     // const selectedOption = value ? value.label : "";
    //     if (name === "driverName") {
    //         const selectedDriver = drivername?.find(option => option.drivername === value.label); // Compare with drivername
    //         // console.log(selectedDriver, 'Selected driver'); // Check in the console

    //         if (selectedDriver) {
    //             setBook(prevState => ({
    //                 ...prevState,
    //                 driverName: value.label,
    //                 mobileNo: selectedDriver.Mobileno,
    //             }));

    //             setSelectedCustomerData(prevState => ({
    //                 ...prevState,
    //                 driverName: value.label,
    //                 mobileNo: selectedDriver.Mobileno,
    //             }));
    //         }
    //     }
    // };
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
            }
        }
    };

    // useEffect(() => {
    //     const fetchOrganizationnames = async () => {
    //         try {
    //             const response = await axios.get(`${apiUrl}/drivernamedrivercreation`);
    //             const data = response.data
    //             // const names = data.map(res => res.drivername)
    //             console.log(data)
    //             setDrivername(data)


    //         }
    //         catch (error) {
    //             console.log(error, "error");
    //         }
    //     };
    //     fetchOrganizationnames()
    // }, [apiUrl])
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


    const handleVehicleChange = (event, value, name) => {
        if (name === "vehRegNo") {
            const manualInput = typeof value === "string" ? value : value?.label;

            if (manualInput) {
                const selectedVehicle = vechiledata?.find(option => option?.vehRegNo === manualInput);

                setBook(prevState => ({
                    ...prevState,
                    vehRegNo: manualInput,
                    vehType: selectedVehicle?.vehType || prevState.vehType,  // Ensure key is "vehType" here
                    Groups: selectedVehicle?.Groups || prevState.Groups,  // Same logic for Groups
                    hireTypes: selectedVehicle?.hiretypes || prevState.hireTypes,
                    vehicleName2: selectedVehicle?.vehicleName || prevState.vehicleName2
                }));

                setSelectedCustomerData(prevState => ({
                    ...prevState,
                    vehRegNo: manualInput,
                    vehType: selectedVehicle?.vehType || prevState.vehType,  // Consistently use "vehType"
                    Groups: selectedVehicle?.Groups || prevState.Groups,  // Same logic for Groups
                    hireTypes: selectedVehicle?.hiretypes || prevState.hireTypes,
                    vehicleName2: selectedVehicle?.vehicleName || prevState.vehicleName2
                }));
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
    const calculatevendorTotalDays = () => {
        const shedoutdate = vendorinfo?.vendorshedOutDate || "";
        const shedindate = vendorinfo?.vendorshedInDate || ""


        if (shedoutdate && shedindate) {
            const shedOutDateObj = dayjs(shedoutdate).startOf('day');
            const shedindateObj = dayjs(shedindate).startOf('day');

            if (shedOutDateObj.isAfter(shedindateObj)) {
                // return 'Shed Out Date is greater';
                return 0;
            } else if (shedOutDateObj.isSame(shedindateObj)) {
                return 1;
            } else {
                const totalDays = shedindateObj.diff(shedOutDateObj, 'days');
                return totalDays + 1;
            }
        }

        return '';
    };


    const calculatevendorTotalTime = () => {
        const shedoutTime = vendorinfo?.vendorreporttime || ""
        const shedinTime = vendorinfo?.vendorshedintime || ""
        const totalDays = calculatevendorTotalDays()
        // const additionalTimeValue = additionalTime.additionaltime || formData.additionaltime || selectedCustomerData.additionaltime || book.additionaltime;
        const datatimetoggle = timeTogglevendor || timetogglevendornavigate


        // let additionalMinutes = 0;
        // let additionalHours = 0;
        // let additionalMinutesValue = 0;

        // // Parse additional time value if available
        // if (additionalTimeValue) {
        //     const hoursMatch = additionalTimeValue.match(/(\d+)h/);
        //     const minutesMatch = additionalTimeValue.match(/(\d+)m/);

        //     additionalHours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
        //     const additionalMinutesFromHours = additionalHours * 60;
        //     additionalMinutes += additionalMinutesFromHours;

        //     additionalMinutesValue = minutesMatch ? parseInt(minutesMatch[1]) : 0;
        //     additionalMinutes += additionalMinutesValue;
        // }

        // // Convert minutes to a two-digit string
        // const formattedMinutes = additionalMinutesValue.toString().padStart(2, '0');
        // // Combine hours and minutes into a single decimal format
        // let combinedTime = `${additionalHours}.${formattedMinutes}`;
        if (shedinTime && shedoutTime) {

            if (calculatevendorTotalDays() === 1) {
                // Split the time strings into hours and minutes
                const [shedoutHours, shedoutMinutes] = shedoutTime?.split(':').map(Number);
                const [shedinHours, shedinMinutes] = shedinTime?.split(':').map(Number);
                // Convert hours to minutes and add minutes
                const totalShedoutMinutes = (shedoutHours * 60) + shedoutMinutes;
                const totalShedinMinutes = (shedinHours * 60) + shedinMinutes;
                // const combinedTotal = (additionalHours * 60) + Number(formattedMinutes);
                const a = Number(shedoutMinutes) + Number(shedinMinutes);
                // Calculate the difference in minutes
                // let minuteDifference = totalShedinMinutes - totalShedoutMinutes + combinedTotal;
                let minuteDifference = totalShedinMinutes - totalShedoutMinutes
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



            if (calculatevendorTotalDays() === 2) {

                const newTimeString = shedoutTime?.replace(":", ".");
                const newTimeStrings = shedinTime?.replace(":", ".");
                // const a = Number(newTimeStrings) + Number(newTimeString);

                const c = 23.60 - Number(newTimeString) + Number(newTimeStrings);
                const formattedC = c.toFixed(2);
                // const combined = combinedTime;
                const [hours1, minutes1] = formattedC.toString().split('.').map(Number);
                // const [hours2, minutes2] = combined.toString().split('.').map(Number);

                // let totalHours = hours1 + hours2;
                // let totalMinutes = minutes1 + minutes2;
                let totalHours = hours1
                let totalMinutes = minutes1
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
            if (calculatevendorTotalDays() > 2) {
                const newTimeString = shedoutTime?.replace(":", ".");
                const newTimeStrings = shedinTime?.replace(":", ".");
                // const totaldays = calculateTotalDay()
                const LongTripDays = totalDays - 2;
                const LongTripHours = LongTripDays * 24;
                const LongHours = LongTripHours.toFixed(2);

                // const combined = combinedTime;

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
                // const [hours2, minutes2] = combined.toString().split('.');


                // let totalHours = Number(integerPart) + Number(hours2);
                // let totalMinutes = Number(decimalPart) + Number(minutes2);
                let totalHours = Number(integerPart)
                let totalMinutes = Number(decimalPart)
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
        // const startKm = vendorinfo?.vendorshedoutkm || "";
        // const closeKm = vendorinfo?.vendorshedinkm || "";

        // if (startKm !== undefined && closeKm !== undefined) {
        //     let totalKm = parseInt(closeKm) - parseInt(startKm);

        //     return totalKm;
        // }
        // return "";

        if (startKm !== undefined && closeKm !== undefined) {
            let totalKm = parseInt(closeKm) - parseInt(startKm);
            // const shedKmValue = parseInt(shedKilometers.shedkm) || parseInt(formData.shedkm) || parseInt(selectedCustomerData.shedkm) || parseInt(book.shedkm);
            // if (!isNaN(shedKmValue)) {
            //     totalKm += shedKmValue;
            // }
            return totalKm;
        }
        return "";
    };



    // const [tripSheetData, setTripSheetData] = useState({
    //     customer: '',
    //     address1: '',
    //     orderedby: '',
    //     employeeno: '',
    //     request: '',
    //     customercode: '',
    //     guestname: '',
    //     tripid: '',
    //     startdate: '',
    //     duty: '',
    //     vehType: '',
    //     vehRegNo: '',
    //     driverName: '',
    //     mobileNo: '',
    //     closedate: '',
    //     starttime: '',
    //     startkm: '',
    //     closetime: '',
    //     closekm: '',
    //     totalkm1: '',
    //     totaltime: '',
    //     totalDays: '',
    //     remark: '',
    //     parking: '',
    //     permit: '',
    // });


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
        if (name === "shedout") {
            setEnterTrigger((prev) => !prev)
        }
        if (name === "tripid") {
            setConflictLoad(null)
            setEnterTrigger(null)
        }
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
        if(name !== "tripid")
        setNoChangeData((prevData) => ({
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
            setNoChangeData((prevData) => ({
                ...prevData,
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
                setNoChangeData((prevData) => ({
                    ...prevData,
                    [name]:formattedTime,
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
                // setNoChangeData((prevData) => ({
                //     ...prevData,
                //     [name]:value,
                // }));
                if(name !== "tripid")
                    setNoChangeData((prevData) => ({
                        ...prevData,
                        [name]: value,
                    }));

            }
        }
    };
    // console.log(lockdata,"lockdatamovess")


    // prob004
    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const tripid = event.target.value;
            const loginUserName = await localStorage.getItem("username")


            try {
                setManualMarkTrigger(!manualMarkTrigger)
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
                            setSelectedStatus(bookingDetails.status); // Set selected status based on booking details
                            setSelectedStatuschecking(bookingDetails.status)
                            // if (!lockdata) {


                                setVendorinfodata(restdatavendor)
                                setVendorbilldata(bookingDetails)
                            // }

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
                            setGroupTripId(bookingDetails.GroupTripId)
                            setHybridHclCustomer(bookingDetails.Hybriddata)
                            setTimeToggle(bookingDetails.TimeToggleData)
                            setTimeToggleVendor(bookingDetails.VendorTimeToggle)
                            setEnterTrigger((prev) => !prev)
                            //---------------------------

                            setEscort(bookingDetails.escort)
                            setTransferreport(bookingDetails.transferreport)
                            //----------
                            setSmsGuest(false)
                            setSendEmail(false)
                            setDriverSMS(false)
                            setSuccess(true);
                            setSuccessMessage("Successfully listed");
                            setConflictLoad((prevConflictLoad) => !prevConflictLoad);
                            // setisenterTripid(true)
                            setIsEditMode(true);
                            // setLockData(false)
                            setLockData(bookingDetails.lockdatavalue)
                            // setLockDatavendorBill(false)
                            // setLockDatacustomerBill(false)
                            // setLockData(true)
                            setLockDatavendorBill(true)
                            setLockDatacustomerBill(true)
                            localStorage.setItem('selectedTripid', tripid);
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
                    setSelectedCustomerData({})
                    setSelectedCustomerDatas({})
                    setFormData({})
                    setFormValues({})
                    // setBook({})
                    setErrorMessage(`${error.response.data.error}`);
                    // setErrorMessage(" You Don't Have Accesss To This Tripsheet Based On Service Station");
                } else {
                    setError(true);
                    // setErrorMessage("Failed to fetch data");
                    setErrorMessage("Check your Network Connection");
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


        // new code..............
        const keys = Object.keys(params);
        keys.forEach(key => {
            const value = params[key];
            if (key !== "rateType") {
                handleChange({ target: { name: key, value: value } });
            }

        });
        //   ----------------------------------

        // handleChange({ target: { name: "vehType", value: params.vehType } })
    }








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
                    // vehType: selectedCustomerData.vehType || book.vehType || formValues.vehType || formData.vehType,
                    vehType: selectedCustomerDatas.vehicleName || formData.vehicleName || selectedCustomerData.vehicleName || formValues.vehicleName || packageData.vehicleName || book.vehicleName,

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
    // // for invoice page
    // const [signimageUrl, setSignImageUrl] = useState('');
    // const [attachedImage, setAttachedImage] = useState('');
    // const [GmapimageUrl, setGMapImageUrl] = useState('');
    // const [routeData, setRouteData] = useState('');


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
                    // setSuccess(true)
                    // setSuccessMessage('Signature Added Sucessfully')

                }
            }
        } catch (err) {
            console.log(err, 'error');
            setWarning(true);
            setWarningMessage("Failed to fetch signature image. Please try again.");

        }
    };


    const getSignatureImageverify = async () => {
        const tripid = formData.tripid || selectedCustomerData.tripid || book.tripid;
        try {
            if (tripid !== null && tripid && tripid !== "undefined") {
                const response = await fetch(`${apiUrl}/get-signimage/${tripid}`);   /// prob004
                if (response.status === 200) {
                    const imageUrl = URL.createObjectURL(await response.blob());
                    setSignImageUrl(imageUrl);
                    // setSuccess(true)
                    // setSuccessMessage('Signature Added Sucessfully')

                }
            }
        } catch (err) {
            console.log(err, 'error');
            setWarning(true);
            setWarningMessage("Failed to fetch signature image. Please try again.");

        }
    };



    const handleFileChangesignature = async (event) => {
        const file = event.target.files[0];
        const tripiddata = formData.tripid || selectedCustomerData.tripid || book.tripid
        if (file !== null) {
            const datadate = Date.now().toString();
            const formData = new FormData();
            setNoChangeData({...nochangedata,signatureimagedata:file})
            formData.append("signature_image", file);
            try {
                await axios.post(`${APIURL}/api/uploadsignaturedata/${tripiddata}/${datadate}`, formData);
                // await axios.post(`http://localhost:7000/signatureimagesavedriver/${datadate}`,formData)
                getSignatureImage()
                setSignImageUrl(imageUrl);
                setSuccess(true)
                setSuccessMessage('Signature Added Sucessfully')
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
                let nightTotalAmounts = Math.round(Number(nightBta) * Number(nightCount))

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
    // let calcNight = 0
    useEffect(() => {
        const NightCount = () => {
            const shedOutTime = formData.reporttime || selectedCustomerData.reporttime || selectedCustomerDatas.reporttime || book.reporttime;
            const shedInTime = formData.shedintime || selectedCustomerData.shedintime || book.shedintime;
            const starttimedata = removeSeconds(formData.starttime || selectedCustomerData.starttime || book.starttime || selectedCustomerDatas.starttime)

            const closetimedata = removeSeconds(formData.closetime || selectedCustomerData.closetime || book.closetime)
    
            const hybriddata = hybridhclcustomer || hybridhclnavigate
            const TotalDay = calculateTotalDay();
            
            const duty = formData.duty || selectedCustomerData.duty || book.duty;
            // const newTimeString = shedOutTime?.replace(":", ".");
            // const newTimeStrings = shedInTime?.replace(":", ".");

            // const newTimeString = hybriddata === 0 ? shedOutTime?.replace(":", ".") : starttimedata?.replace(":", ".")
            // const newTimeStrings = hybriddata === 0 ? shedInTime?.replace(":", ".") : closetimedata?.replace(":", ".")

            const newTimeString = hybriddata === 0 ? shedOutTime?.replace(":", "."): hybriddata === 1 && duty === "Outstation" ? shedOutTime?.replace(":", "."): starttimedata?.replace(":", ".");
            const newTimeStrings = hybriddata === 0 ? shedInTime?.replace(":", "."): hybriddata === 1 && duty === "Outstation" ? shedInTime?.replace(":", "."):closetimedata?.replace(":", ".");

            // console.log(newTimeString,"night2222",newTimeStrings)


            let calcNight = 0;
            
            // let a = 0;

            if(duty !== "Outstation") {
           
            if (calculateTotalDay() === 1) {
                if (Number(newTimeStrings) >= 22.0 && Number(newTimeString) <= 6.00) {
                    // console.log(2,"night1")
                    calcNight = 2;
                }
              if(Number(newTimeStrings) < 22.0 && Number(newTimeString) <= 6.00) {
                // console.log(1,"night2")
                calcNight = 1;
              }
              if(Number(newTimeStrings) > 22.0 && Number(newTimeString) > 6.00) {
                // console.log(1,"night3")
                calcNight = 1;
              }
                
              
            }
         
             if (TotalDay > 1) {
              
                // console.log(TotalDay,"days")
                if(Number(newTimeStrings) >= 22.0 && Number(newTimeString) <= 6.00) {
                    // console.log(TotalDay + 1,"days1")
                    calcNight = TotalDay + 1 ;
                }
                if(Number(newTimeStrings) < 22.0 && Number(newTimeString) <= 6.00){
                    calcNight = TotalDay;
                    // console.log(TotalDay ,"days2")
                }
                if(Number(newTimeStrings) < 22.0 && Number(newTimeString) > 6.00){
                    calcNight = TotalDay -1;
                    // console.log(TotalDay ,"days3")
                }
                if(Number(newTimeStrings) >= 22.0 && Number(newTimeString) > 6.00){
                    calcNight = TotalDay;
                    // console.log(TotalDay ,"days4")
                }
                // console.log(calcNight,"daysnii")
                
                

                // calcNight = TotalDay-1;
            }
            // console.log(calcNight,"nightousttaion")
            // setNightCount(calcNight);
            setcusnightCount(calcNight)
        }
        else{
            if (calculateTotalDay() === 1) {
                if (Number(newTimeString) <= 6.00) {
                    
                    calcNight = 1;
                }
            }  


             if (TotalDay > 1) {
                if (Number(newTimeString) <= 6.00) {
                    console.log(Number(newTimeString))
                    calcNight = TotalDay  ;
                }
                else{
                    calcNight = TotalDay-1;
                }
                

                // calcNight = TotalDay-1;
            }
            // console.log(calcNight,"nightousttion")
            // setNightCount(calcNight);
            setcusnightCount(calcNight)
        }

        };
        // setNightTotalCount(calculateTotalDay())


        NightCount();
    }, [formData, selectedCustomerData, selectedCustomerDatas, book]);
    // console.log(cusnightcount,"count")



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


    const datatimeminutescahrges = (extraHR111, ex_hrAmount11) => {

        const extraHR11 = extraHR111 || 0
        const datatimetoggle = timeToggle || timetogglenavigate

        console.log(extraHR11, "kk", typeof (extraHR11), ex_hrAmount11, datatimetoggle)


        if (datatimetoggle === 1) {
            console.log(extraHR11, "enetr111111111111")
            if (extraHR11) {
                // if (extraHR11 !== 0 && extraHR11 !== null && !extraHR11) {
                console.log(extraHR, "lldaaa", typeof (extraHR))
                const [hrda, mida = 0] = extraHR11.toString().split('.').map(Number);
                console.log(hrda, "Hour part", mida, "Minute part", ex_hrAmount11);
                const onehrdata = Number(hrda) * Number(ex_hrAmount11)
                const result = Math.round((ex_hrAmount11 / 60) * 10) / 10;
                const etrxamin = result * Number(mida)
                const totalamountwithmin = onehrdata + etrxamin
                const totalamounthrmin = Math.round(totalamountwithmin)
                console.log(onehrdata, "ooooomnedd", result, etrxamin, totalamountwithmin, totalamounthrmin)
                return totalamountwithmin
                // const totalamounthrmin = Math.round(totalamountwithmin)
                // console.log(onehrdata,"ooooomnedd",result,etrxamin,totalamountwithmin,totalamounthrmin)
            }
            else {
                console.log(extraHR11, "enetroooooooooo")
                return 0
            }
        }
        else {
            console.log("enetr")
            let extraAbout_hr1 = Number(extraHR) * Number(extrahr_amount);
            return extraAbout_hr1
        }
    }





    useEffect(() => {
        const extraClac = () => {
            // let extraAbout_hr = Number(extraHR) * Number(extrahr_amount);
            const daghr = datatimeminutescahrges(extraHR, extrahr_amount)
            console.log(daghr, "datagr")

            // const extarhour = Math.round(extraAbout_hr)
            const extarhour = Math.round(daghr)
            setEx_HrAmount(extarhour)
        }
        extraClac();
    }, [extraHR, extrahr_amount])
    // useEffect(() => {
    //     const extraClac = async() => {
    //         let extraAbout_hr = Number(extraHR) * Number(extrahr_amount);
    //         datatimeminutescahrges(extraHR,extrahr_amount)
    //         const extarhour = Math.round(extraAbout_hr)
    //         setEx_HrAmount(extarhour)
    //     }
    //     extraClac();
    // }, [extraHR, extrahr_amount])

    useEffect(() => {
        const extraClac = () => {
            let extraAbout_km = Math.round(Number(extraKM) * Number(extrakm_amount))
            setEx_kmAmount(extraAbout_km)
        }
        extraClac();
    }, [extraKM, extrakm_amount])

    //----------------------------------------------------

    // -------------------------------------------vendorbilldata--------------------


    const vendordatatimeminutescahrges = (vendorhr, vendorhramount) => {

        console.log(vendorhr, "kkkkkkkhrrrven", typeof (vendorhr))
        const datatimetoggle = timeTogglevendor || timetogglevendornavigate
        if (datatimetoggle === 1) {
            if (vendorhr !== 0) {

                const [hrdavendor, midavendor = 0] = vendorhr.toString().split('.').map(Number);
                console.log(hrdavendor, "Hour part", midavendor, "Minute vendorpart", vendorhramount);
                const onehrdata = Number(hrdavendor) * Number(vendorhramount)
                const result = Math.round((vendorhramount / 60) * 10) / 10;
                console.log(result, "clatimeeeee")
                const etrxamin = result * Number(midavendor)
                const totalamountwithmin = onehrdata + etrxamin
                const totalamounthrmin = Math.round(totalamountwithmin)
                console.log(onehrdata, "ooooomneddvendor", result, etrxamin, totalamountwithmin, totalamounthrmin)
                return totalamounthrmin

            }
            else {
                return 0
            }
        }
        else {

            let extraAbout_hr1 = Number(vendorhr) * Number(vendorhramount);
            return extraAbout_hr1
        }
    }

    useEffect(() => {
        const VendorextraClac = () => {
            // let extraAbout_hr = Math.round(Number(vendorbilldata?.Vendor_ExtraHours || vendorpassvalue.Vendor_ExtraHours) * Number(vendorbilldata?.Vendor_ExtraAmountHours || vendorpassvalue.Vendor_ExtraAmountHours))
            const extravendorhr = Number(vendorbilldata?.Vendor_ExtraHours || vendorpassvalue.Vendor_ExtraHours) || 0
            console.log(extravendorhr, typeof (extravendorhr), "extratratimechanges")
            const extraTotslhramount = Number(vendorbilldata?.Vendor_ExtraAmountHours || vendorpassvalue.Vendor_ExtraAmountHours || 0)
            const vendorTotalfullamount = vendordatatimeminutescahrges(extravendorhr, extraTotslhramount)
            // setVendorExtrahrTotaldataAmount(extraAbout_hr)
            setVendorExtrahrTotaldataAmount(vendorTotalfullamount)
            // setVendorbilldata({ ...vendorbilldata, Vendor_totalAmountHours: extraAbout_hr })
            // setVendorbilldata(prevData => ({
            //     ...prevData,
            //     Vendor_totalAmountHours: extraAbout_hr
            // }));
            setVendorbilldata(prevData => ({
                ...prevData,
                Vendor_totalAmountHours: vendorTotalfullamount
            }));


        }
        VendorextraClac();
    }, [vendorbilldata?.Vendor_ExtraHours, vendorbilldata?.Vendor_ExtraAmountHours, vendorpassvalue.Vendor_ExtraHours, vendorpassvalue.Vendor_ExtraAmountHours])


    // useEffect(() => {
    //     const VendorextraClac = () => {
    //         let extraAbout_hr = Math.round(Number(vendorbilldata?.Vendor_ExtraHours || vendorpassvalue.Vendor_ExtraHours) * Number(vendorbilldata?.Vendor_ExtraAmountHours || vendorpassvalue.Vendor_ExtraAmountHours))
    //         setVendorExtrahrTotaldataAmount(extraAbout_hr)
    //         // setVendorbilldata({ ...vendorbilldata, Vendor_totalAmountHours: extraAbout_hr })
    //         setVendorbilldata(prevData => ({
    //             ...prevData,
    //             Vendor_totalAmountHours: extraAbout_hr
    //         }));


    //     }
    //     VendorextraClac();
    // }, [vendorbilldata?.Vendor_ExtraHours, vendorbilldata?.Vendor_ExtraAmountHours, vendorpassvalue.Vendor_ExtraHours, vendorpassvalue.Vendor_ExtraAmountHours])

    useEffect(() => {
        const VendorextraClac = () => {
            let extraAbout_km = Math.round(Number(vendorbilldata.Vendor_ExtraKms || vendorpassvalue.Vendor_ExtraKms) * Number(vendorbilldata.Vendor_ExtraAmountKms || vendorpassvalue.Vendor_ExtraAmountKms))
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
        const duty = vendorinfo?.vendor_duty;

        let calcNight = 0;
        if(duty !== "Outstation") {

        if (TotalDay === 1) {
            // if (Number(newTimeStrings) >= 22.0 || Number(newTimeString) <= 6.00) {
            //     calcNight = 1;
            // }
            if (Number(newTimeStrings) >= 22.0 && Number(newTimeString) <= 6.00) {
                // console.log(2,"night1")
                calcNight = 2;
            }
          if(Number(newTimeStrings) < 22.0 && Number(newTimeString) <= 6.00) {
            // console.log(1,"night2")
            calcNight = 1;
          }
          if(Number(newTimeStrings) > 22.0 && Number(newTimeString) > 6.00) {
            // console.log(1,"night3")
            calcNight = 1;
          }
        }

     
        if (TotalDay > 1) {
          

            if(Number(newTimeStrings) >= 22.0 && Number(newTimeString) <= 6.00) {
                // console.log(TotalDay + 1,"days1")
                calcNight = TotalDay + 1 ;
            }
            if(Number(newTimeStrings) < 22.0 && Number(newTimeString) <= 6.00){
                calcNight = TotalDay;
                // console.log(TotalDay ,"days2")
            }
            if(Number(newTimeStrings) < 22.0 && Number(newTimeString) > 6.00){
                calcNight = TotalDay -1;
                // console.log(TotalDay ,"days3")
            }
            if(Number(newTimeStrings) >= 22.0 && Number(newTimeString) > 6.00){
                calcNight = TotalDay;
                // console.log(TotalDay ,"days4")
            }

       

    }
}  else{
    if (TotalDay === 1) {
        if (Number(newTimeString) <= 6.00) {
            calcNight = 1;
        }
    }
   
     if (TotalDay > 1) {
        if (Number(newTimeString) <= 6.00) {
            calcNight = TotalDay  ;
        }
        else{
            calcNight = TotalDay-1;
        }

       
        

        
    }
    // console.log(calcNight,"nightousttion")
  
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


            let vendornightTotalAmounts = Math.round(Number(a) * Number(b))
            setVendorNightbhatatotalAmount(vendornightTotalAmounts)


        }
        calcdatavendor();
    }, [vendorbilldata.Vendor_NightHALT, vendorbilldata.Vendor_NightBataAmount, vendorbilldata, vendorpassvalue.Vendor_NightHALT, vendorpassvalue.Vendor_NightBataAmount])

    useEffect(() => {
        const calcdatavendor = () => {

            const a = vendorbilldata.Vendor_Bata || vendorpassvalue.Vendor_Bata;
            const b = vendorbilldata.Vendor_BataAmount || vendorpassvalue.Vendor_BataAmount

            let vendordriverbetaAmount = Math.round(Number(a) * Number(b))
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
        // const amount5 = parseFloat(vendorinfo.vendor_vpermettovendor || vendorinfo?.vpermettovendor) || 0;
        // const amount6 = parseFloat(vendorinfo.vendor_toll || vendorinfo?.vendortoll) || 0;
        // const amount7 = parseFloat(vendorinfo.vendor_advancepaidtovendor || vendorinfo?.advancepaidtovendor) || 0;
        // const amount8 = parseFloat(vendorinfo.vendor_vendorparking || vendorinfo?.vendorparking) || 0;
        // const amount9 = parseFloat(vendorinfo.vendor_fuelamount || vendorinfo?.fuelamount) || 0;

        const amount5 = parseFloat(vendorinfo.vendor_vpermettovendor || vendorinfo?.vpermettovendor) || 0;
        const amount6 = parseFloat(vendorinfo.vendor_toll || vendorinfo?.vendortoll) || 0;
        // console.log(vendorinfo.vendor_toll,"totalAmount1vvvvv",vendorinfo?.vendortoll)
        const amount7 = parseFloat(vendorinfo.vendor_advancepaidtovendor || vendorinfo?.advancepaidtovendor) || 0;
        const amount8 = parseFloat(vendorinfo?.vendorparking) || 0;
        const amount9 = parseFloat(vendorinfo.fuelamount) || 0;

        // console.log(amount, "1", amount1, "2", amount2, "3", amount3, "4", amount4, "5", amount5, "6", amount6, "8", amount8)


        const totalAmount = amount + amount1 + amount2 + amount3 + amount4 + amount5 + amount6 + amount8;
        // const fullAmount = totalAmount - amount7 - amount9;
        const fullAmount1 = totalAmount - amount7
        // console.log(fullAmount1, "totalAmount2check", amount7)
        const fullAmount = fullAmount1 - amount9;
        // console.log(fullAmount, "fullcheck")
        const fullamountdata = Math.ceil(fullAmount);
        setVendorbilldata({ ...vendorbilldata, Vendor_FULLTotalAmount: fullamountdata })
        // return totalAmount;
    }


    useEffect(() => {
        calculatevendorTotalAmount()
    }, [vendorbilldata.Vendor_rateAmount, vendorbilldata.Vendor_totalAmountHours, vendorbilldata.Vendor_totalAmountKms, vendorbilldata.Vendor_NightbataTotalAmount, vendorbilldata.Vendor_BataTotalAmount, vendornightdatatotalAmount, vendorExtrahrTotalAmount, vendorExtarkmTotalAmount, vendorinfo.vpermettovendor, vendorinfo.vendortoll, vendorinfo.vendor_vpermettovendor, vendorinfo.vendor_toll, vendorinfo.vendor_advancepaidtovendor, vendorinfo.advancepaidtovendor, vendorinfo.fuelamount, vendorinfo?.vendorparking])


    let vendordata, vendortotkm, vendortothr, vendortotalHours, vendorduty, vendorvehicleNames, vendorratetype, vendorstations;



    const fetchdatasupplierraratenametryyyy = async () => {
        console.log("vendortravelnametryy", selectedCustomerDatas.travelsname, "fff", formData.travelsname, "dd", selectedCustomerData.travelsname, "bb", book.travelsname)
        const supplierdata = selectedCustomerDatas.travelsname ||
            formData.travelsname ||
            selectedCustomerData.travelsname ||
            book.travelsname || ""

        if (supplierdata) {

            console.log(supplierdata, "enetervendortryy")
            const response = await axios.get(`${apiUrl}/Accountinfosupplierdata/${supplierdata}`)
            const data = response.data
            if (data.length > 0) {
                console.log(data.length, data, "enetetsuppliervendortryy")
                const res = data[0].rateType;
                // const res = response.data[0]
                console.log(res, "enetervendortryy")
                return res
            }

            return ""
        }

        else {
            return ''
        }

    }

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
            // vendorratetype = vendorinfo.vendor_ratename || ratename || "";
            // vendorratetype = await (fetchdatasupplierraratename() || vendorinfo.vendor_ratename || ratename);
            // const  vendorratetypecheck = vendorinfo.vendor_ratename || ratename || "";
            // vendorratetype1 = await fetchdatasupplierraratename();
            vendorratetype = await fetchdatasupplierraratenametryyyy();
            // console.log("awaitvendorratetype11", vendorratetype, "check", vendorratetype1, "vendortryyy", vendorratetypetryyy);

            // vendorstations = await fetchdatasupplierraratenamestations();
            vendorstations = selectedCustomerDatas.department || formData.department || formValues.department || selectedCustomerData.department || book.department;

            console.log(vendortotkm, "vendorkm", vendortothr, "vendortohr", vendorduty, "vendorduty", vendorvehicleNames, "vechilenames", vendorratetype, "vendorratetype", vendorstations, "vendorstations")

            if (!vendortotkm || !vendortothr || !vendorduty || !vendorvehicleNames || !vendorratetype || !vendorstations) {
                setError(true);
                setErrorMessage("Check Hour & KM & duty and vehiletype.! for vendor ")
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
                    stations: vendorstations
                }
            });
            vendordata = response.data;
            console.log(vendordata, "vendorrrrrrrr")


            const packages = vendordata.package;
            const Hours = Number(vendordata.Hours);
            const KMS = Number(vendordata.KMS);
            const Rate = Number(vendordata.Rate);
            const extraHours = Number(vendordata.extraHours);
            const extraKMS = Number(vendordata.extraKMS);
            const NHalt = Number(vendordata.NHalt);
            const Bata = Number(vendordata.Bata);
            const totalDays1 = calculatevendorTotalDays()
            const nHaltdays = Number(vendornightcount);
            // const batahaltdays = Number(vendornightcount)
            const batahaltdays = Number(totalDays1)
            console.log(packages, Hours, KMS, Rate, extraHours, extraKMS, NHalt, Bata, "for supplier")
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
                    console.log(matches, "mmaaa")

                    let time = matches - Hours.toFixed(2);
                    const convertedTime = Number(time.toFixed(2))

                    console.log(convertedTime, "totalextra",)
                    dataextrahous = convertedTime
                }


            }
            else {
                dataextrahous = 0
            }


            if (vendortotkm > KMS && vendorduty !== "Outstation") {

                let KM = (Number(vendortotkm) - Number(KMS))
                console.log(Number(vendortotkm), Number(KMS), "kmmmmmmmmmmmmmmmmm", KM)
                let kmfixed = Number(KM.toFixed(2))

                // dataextrakms = KM
                dataextrakms = kmfixed
            }

            if (vendorduty === "Outstation") {
                // console.log(vendorduty,"dutydata")
                let km = (Number(vendortotkm) <= Number(KMS)) ? Number(KMS) : Number(vendortotkm)
                let kmfixed2 = Number(km.toFixed(2))
                dataextrakms = kmfixed2
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
                setErrorMessage("Suppiler Data Not Found")
                setVendorbilldata({})

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
        if (!lockdatavendorbill) {
            setVendorbilldata((prevBook) => ({
                ...prevBook,
                [name]: value,
            }))
            setNoChangeData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
        else {
            setWarning(true);
            setWarningMessage("IS not locked,locked Enter Again");
        }

    }

    // console.log(nochangedata,"datachnage")
    const handlevendorinfofata = (event) => {
        const { name, value } = event.target;
        console.log(name, "value", value)
        if (!lockdata) {
            if (name === "vendorshedoutkm") {
                vendorinfo.shedout = ""
                setVendorinfodata((data) => ({
                    ...data,
                    [name]: value,
                }))
                setNoChangeData((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
            }
            else if (name === "vendorRemarks") {
                vendorinfo.remark = ""
                setVendorinfodata((data) => ({
                    ...data,
                    [name]: value,
                }))

                setNoChangeData((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
            }
            else {
                vendorinfo.shedin = ""
                setVendorinfodata((data) => ({
                    ...data,
                    [name]: value,
                }))
                setNoChangeData((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
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






    const fetchdatacustomeraratename = async () => {

        const customerdata = formData.customer || selectedCustomerData.customer || book.customer || packageData.customer || '';

        if (customerdata) {

            const response = await axios.get(`${apiUrl}/customerratenamedata/${customerdata}`)
            const data = response.data
            if (data.length > 0) {
                console.log(data.length, "eneter")
                const res = response.data[0]
                console.log(res, "eneter")
                return res
            }

            return ""
        }

        else {
            return ''
        }

    }

// console.log(userStatus,"sssss")
    useEffect(() => {
        const a = calculateTotalDay()

        const newAmount = Math.round(nightCount * nightBta);
        const betaAmount = Math.round(Number(driverBeta) * driverbeta_Count);

        setdriverBeta_amount(betaAmount)
        setnight_totalAmount(newAmount);
    }, [nightCount, nightBta, driverBeta, driverbeta_Count]);


    // calc function

    let data, totkm, tothr, totalHours, duty, vehicleNames, organizationname, totalamount, CustomerStatioms;
    const handleCalc = async () => {

        try {

            duty = formData.duty || selectedCustomerData.duty || book.duty;
            vehicleNames = selectedCustomerDatas.vehicleName || formData.vehicleName || selectedCustomerData.vehicleName || formValues.vehicleName || packageData.vehicleName || book.vehicleName;
            // totkm = await (formData.totalkm1 || packageData.totalkm1 || book.totalkm1 || selectedCustomerData.totalkm1 || calculateTotalKilometers() || '');
            totkm = await (calculateTotalKilometers() || formData.totalkm1 || packageData.totalkm1 || book.totalkm1 || selectedCustomerData.totalkm1 || calculateTotalKilometers() || '');
            tothr = await (calculateTotalTimes() || formData.totaltime || packageData.totaltime || book.totaltime || selectedCustomerData.totaltime || '');
            // organizationname = formData.customer || selectedCustomerData.customer || book.customer || packageData.customer || ''
            organizationname = await fetchdatacustomeraratename();
            CustomerStatioms = selectedCustomerDatas.department || formData.department || formValues.department || selectedCustomerData.department || book.department;
            console.log(totkm, "tokm", tothr, "tohr", duty, "duty", vehicleNames, "vehcilenames", organizationname, "organisationname")
            // console.log(organizationname, "ratetype")


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
                    organizationname: organizationname.rateType,
                    stations: CustomerStatioms
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
            const totaldays = calculateTotalDay()
            const nightHatDays = Number(cusnightcount)
            const NHaltAmount = Math.round(Number(data.NHalt) * nightHatDays);
            setNightCount(nightHatDays);
            // setdriverbeta_Count(calculateTotalDay())
            setdriverbeta_Count(totaldays)
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
                setExtraHR(0)
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
                let cuctomerkm = Number(KM.toFixed(2))
                setExtraKM(cuctomerkm);
            } else if (duty === "Outstation") {
                console.log("duty", duty)
                let km = (Number(totkm) <= Number(KMS)) ? Number(KMS) : Number(totkm)
                let cuctomerkm2 = Number(km.toFixed(2))
                // console.log(km)
                setExtraKM(cuctomerkm2)
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
            console.log(err, "handle")

            if (err.response.status === 404) {
                setError(true)
                setErrorMessage("customer Data Not Found")
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

    const handlecalcpackage =(e)=>{
        setcalcPackage(e.target.value)
        setRatePackage(e.target.value)
        setNoChangeData((prevData) => ({
            ...prevData,
            calcpackage:e.target.value,
        }));
    }

    const handlecalcpackageamount =(e)=>{
        setpackage_amount(e.target.value)
        setNoChangeData((prevData) => ({
            ...prevData,
            package_amount:e.target.value,
        }));
        // setRatePackage(e.target.value)
    }


    const [vehileNames, setVehicleNames] = useState([])
    useEffect(() => {
        const getvehicleName = async () => {
            try{
            const response = await axios.get(`${apiUrl}/getvehicledatauniquevehicleNames`);
            const data = response.data
            const names = data?.map(res => res.VechicleNames)

            setVehicleNames(names)
            }
            catch(err){
                console.log(err)
            }
        }
        getvehicleName()

    }, [apiUrl])

    const handleEscortChange = (event) => {
        setEscort(event.target.value);
        setNoChangeData((prevData) => ({
            ...prevData,
            escort:event.target.value,
        }));
        
    };
    const handleTransferChange = (event) => {
        setTransferreport(event.target.value);
        setNoChangeData((prevData) => ({
            ...prevData,
            transferreport:event.target.value,
        }));
    };

    /// fro cal dialog box
    const [open, setOpen] = useState(false);

    const handleClickOpen = async () => {
        // if(!isentertripID){
        //     return
        // }

        console.log(overetripsheetoutstation ,overetripsheetstatus,"over")
        if (!isEditMode) {
            return
        }
        // oustation")Instation
        if(overetripsheetstatus && (overetripsheetoutstation === "Instation" ||overetripsheetoutstation === "oustation") ){
            setWarning(true);
            setWarningMessage("Status is closed, u dont have permission open this Overview.");
            return
        }

        setOpen(true);

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
            setSuccess(true)
            setSuccessMessage('Successfully Deleted')
            console.log('deleted sucessfully')
        } catch (err) {
            setError(true)
            setErrorMessage('Failed to Delete')
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
    // const [checkCloseKM, setCheckCloseKM] = useState({ maxShedInkm: '', maxTripId: "" })
    // const [hybridCheckCus, setHybridCheckCus] = useState([])
    // useEffect(() => {
    //     const getCustomer = async () => {
    //         const response = await axios.get(`${apiUrl}/get-customer`)
    //         const data = response.data.map(el => ({ customer: el.customer, hybrid: el.hybrid }))
    //         setHybridCheckCus(data)
    //     }
    //     getCustomer()
    // }, [apiUrl])

    // const customer = formData.customer || selectedCustomerData.customer || book.customer || packageData.customer;
    // const tripID = formData.bookingno || selectedCustomerData.bookingno || book.bookingno;
    // const transformFun = (data) => {
    //     const hybridcheck = hybridCheckCus.find((el) => customer === el.customer)

    //     if (hybridcheck && hybridcheck.hybrid) {
    //         return { shedOutkm: null, shedInKm: null, tripid: data.tripid, shedInDate: data.shedInDate, shedintime: data.shedintime }
    //     }
    //     return { shedOutkm: data.shedout, shedInKm: data.shedin, tripid: data.tripid, shedInDate: data.shedInDate, shedintime: data.shedintime }
    // }

    // to fetch closed tripdata for valiation
    // const [ClosedTripData, setClosedTripData] = useState([])

    // useEffect(() => {
    //     const fetchData = async () => {
    //         if (!vehicleRegisterNo) return
    //         const data = await axios.get(`${apiUrl}/get-CancelTripData/${vehicleRegisterNo}`)
    //         const mapdata = data && Array.isArray(data.data) && data.data.map(transformFun)
    //         setClosedTripData(mapdata);

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
    //     }
    //     fetchData()
    // }, [apiUrl, vehicleRegisterNo])

    function removeSeconds(time) {
        // Split the time string by colon (:)
        const data = time || 0;


        if (data !== 0) {

            const timeParts = time?.split(':');

            // Check if there are seconds (length 3), return hours:minutes
            if (timeParts.length === 3) {
                return `${timeParts[0]}:${timeParts[1]}`;
            }
            // If there's only hours:minutes, return it as is
            return time;
        }
    }
    // const transformFunconflict = (data) => {
    //     // console.log(data,"jjj")
    //     return { tripid: data.shedInDateTripid || data.closeDateTripid || null, shedInDate: data.shedInDate || data.closedate || null, shedintime: data.shedintime || data.closetime || null }
    // }

    // const dateconflict = useMemo(() => {
    //     return dayjs(formData.shedOutDate || selectedCustomerData.shedOutDate || book.shedOutDate).format("YYYY-MM-DD");
    // }, [formData.shedOutDate, selectedCustomerData.shedOutDate, book.shedOutDate]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         if (!vehicleRegisterNo) return
    //         try {
    //             const data = await axios.get(`${apiUrl}/trip-data/${vehicleRegisterNo}`)
    //             // console.log(data,"gg")
    //             const mapdata = data && Array.isArray(data.data) && data.data.map(transformFunconflict)
    //             // console.log(mapdata,"mm")
    //             if (mapdata.length > 0) {
    //                 const firstTrip = mapdata[0];
    //                 // console.log(firstTrip,"hh")
    //                 // Check if shedInDate matches the dateconflict
    //                 if (firstTrip?.shedInDate === dateconflict) {
    //                     setConflictEndDate({
    //                         maxShedInDate: dayjs(firstTrip.shedInDate).format("DD-MM-YYYY"),
    //                         TripIdconflictdate: firstTrip.tripid,
    //                         conflictTimer: removeSeconds(firstTrip.shedintime),
    //                     });
    //                 }
    //                 else if (dateconflict < firstTrip?.shedInDate) {
    //                     // No data or no matching conflict, reset the conflict state
    //                     setConflictEndDate({
    //                         maxShedInDate: dayjs(firstTrip.shedInDate).format("DD-MM-YYYY"),
    //                         TripIdconflictdate: firstTrip.tripid,
    //                         conflictTimer: removeSeconds(firstTrip.shedintime),
    //                     });
    //                 }
    //             }
    //             else {
    //                 setConflictEndDate({ maxShedInDate: null, TripIdconflictdate: null, conflictTimer: null })
    //             }
    //         }
    //         catch (error) {
    //             // console.error("Error fetching trip data", error);
    //             // Handle error (optional)
    //         }
    //     }

    //     fetchData()
    // }, [apiUrl, vehicleRegisterNo, dateconflict])
    // console.log(conflictenddate,"flictdata")
    const transformFun1 = (data) => {
        return { shedout: data.shedout || null, shedin: data.shedin || null, tripid: data.tripid, closekm: data.closekm || null, startkm: data.startkm || null }
    }
    const shedoutkm = formData.shedout || book.shedout || selectedCustomerDatas.shedout || selectedCustomerData.shedout || '';
    useEffect(() => {
        const fetchData = async () => {
            if (!vehicleRegisterNo) return
            const data = await axios.get(`${apiUrl}/get-CancelTripDatanewdatatry/${vehicleRegisterNo}`)
            console.log(data, "op")
            const hcldata = await axios.get(`${apiUrl}/get-CancelTripDataforHcl/${vehicleRegisterNo}`)
            const hclkmdatas = hcldata.data;
            const mapdata = data && Array.isArray(data.data) && data.data.map(transformFun1)
            // console.log(mapdata, "opssssS")
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
                let hclcustomerhybrid = 0
                let hcltripid = 0
                // console.log(maxTrip, "opttt", maxValue)
                if (hclkmdatas.length > 0) {
                    hclcustomerhybrid = Number(hclkmdatas[0]?.totalCloseKm || 0);
                    hcltripid = Number(hclkmdatas[0]?.tripid || 0)
                    // console.log(hclcustomerhybrid);
                }
                // const hclcustomerhybrid = Number(hclkmdatas[0]?.totalCloseKm)
                // const hcltripid = Number(hclkmdatas[0]?.tripid)
                // console.log(hcltripid, typeof (hcltripid), "opppp")
                // console.log(hclcustomerhybrid, typeof (hcltripid), "opppp")
                const datamaxhybrid = maxValue > hclcustomerhybrid ? maxValue : hclcustomerhybrid
                const datamaxtripid = maxValue > hclcustomerhybrid ? maxTrip?.tripid : hcltripid
                // console.log(datamaxhybrid, "opclllll")
                // console.log(hclcustomerhybrid,"hclhybridhcllllll",maxValue)
                // Find the maximum value 
                // setMaxConflict({ maxconflictdata: maxValue || 0, maxTripid: maxTrip.tripid })
                // setMaxConflict({ maxconflictdata: datamaxhybrid, maxTripid: maxTrip.tripid })
                setMaxConflict({ maxconflictdata: datamaxhybrid, maxTripid: datamaxtripid })

                // const shedoutkm1 = Number(formData.shedout || book.shedout || selectedCustomerDatas.shedout || selectedCustomerData.shedout || '');


                // const getTripWithValueInRange = (data, value) => {
                //     return data.find(trip => {
                //         // Convert fields to numbers, treat empty values as extremes
                //         const shedin = parseFloat(trip.shedin) || null;
                //         const shedout = parseFloat(trip.shedout) || null || Infinity;
                //         const startkm = parseFloat(trip.startkm) || null;
                //         const closekm = parseFloat(trip.closekm) || null;

                //         // Define default to use if necessary
                //         //   const defaultValue = startkm;

                //         // Check if value falls between shedin and shedout
                //         const isWithinShedRange = shedin !== null && value <= shedin && value >= shedout;

                //         // Check if value falls between startkm and shedout if shedin is empty

                //         const isWithinStartkmAndShedout = shedin === null && closekm !== null && value <= closekm && value >= shedout;

                //         // Check if value falls between startkm and closekm if shedout is empty
                //         const isWithinStartkmAndClosekm = closekm === null && value >= shedout && value <= startkm;
                //         const isWithinStartkmAndClosekm2 = startkm === null && value === shedout;

                //         // Check if shedin and closekm are empty, and use startkm
                //         //   const useStartkmIfShedinAndClosekmEmpty = shedin === null && closekm === null && value === startkm;

                //         // Return true if any of the conditions are met
                //         return isWithinShedRange || isWithinStartkmAndShedout || isWithinStartkmAndClosekm || isWithinStartkmAndClosekm2;
                //     });
                // };

                // if (shedoutkm1 > 1) {
                //     const result = getTripWithValueInRange(mapdata, shedoutkm1);
                //     if (result !== undefined) {
                //            let hclcustomertotalkm = 0
                //         if (hclkmdatas.length > 0) {
                //             hclcustomertotalkm = Number(hclkmdatas[0]?.totalCloseKm)
                //            console.log(hclcustomerhybrid);
                //        }
                //         // const hclcustomertotalkm = Number(hclkmdatas[0]?.totalCloseKm)

                //         const ggg = Number(result.shedin || result?.closekm || result.startkm || result.shedout || 0)
                //         // console.log(ggg,"hybridtotalkmwithout hybrid")
                //         // console.log(hclcustomertotalkm,"hybridwithhybrid")
                //         const dattt = ggg + hclcustomertotalkm
                //         const datamaxhybrid = ggg > hclcustomerhybrid ? ggg : hclcustomerhybrid
                //         // console.log(dattt,"hybridfulllkmm")
                //         // console.log(dattt,"s",ggg)
                //         // setConflictKMData({ maximumkm: result.shedin || result?.closekm || result.startkm || result.shedout || 0, maxtripid: result?.tripid })
                //         setConflictKMData({ maximumkm: datamaxhybrid, maxtripid: result?.tripid })
                //         // setConflictKMData({ maximumkm: result.shedin || result?.closekm || result.startkm || result.shedout || 0, maxtripid: result?.tripid })
                //     }
                //     else {
                //         setConflictKMData({ maximumkm: 0, maxtripid: null })
                //     }
                // }
            }
            else {
                setConflictKMData({ maximumkm: 0, maxtripid: null })
            }
        }
        fetchData()
    }, [apiUrl, vehicleRegisterNo, shedoutkm, enterTrigger])

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

        // const paramsdata = {
        //     tripid: formData.tripid || selectedCustomerData.tripid || book.tripid
        // };
        const ttrip = formData.tripid || selectedCustomerData.tripid || book.tripid

        // Create the URL with the JSON string as a single query parameter
        // const url = new URL(signatureurlinkurl);
        // Object.keys(paramsdata).forEach(key => url.searchParams.append(key, paramsdata[key]));
        // window.location.origin ="https://jessycabs.com"
        const path = `/SignatureGenerate?tripid=${ttrip}`;
        // const signatureurlinkurl = "https://jessycabs.com/SignatureGenerate"
        const fullUrl = `${window.location.origin}${path}`;
        const generatedLinkdata = fullUrl
        // const generatedLinkdata = url.toString();
        setSignatureWhattsapplink(generatedLinkdata)

        // Create a temporary textarea element to copy the link
        setSignaturtCopied(true)
        setCopyDataLink(true)
        // window.localStorage.setItem("auth",true);
        // Get the div element by its ID

        const updatedetails = {
            tripid: ttrip,
            Expired: false,
            signExpired: false,
            UploadTollExpired: false,
            ExpiredUploadpage: false
        }


        setTimeout(() => {
            setSignaturtCopied(false)
        }, 2000)
        await axios.post(`${apiUrl}/signaturelinkExpiredatas/`, updatedetails)

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
                // console.log(err)
            }
        }
        else {

            setRowsSignature([])
        }
    }

    const handleRefreshsign = () => {
        signatruretimedetails()
    };

    const columnssignature = [
        { field: "id5", headerName: "Sno", width: 70 },
        { field: "sign_logId", headerName: "LogID", width: 160 },
        { field: "logdatetime", headerName: "LogDateTime", width: 200 },
        { field: "startsigntime", headerName: "CTime", width: 130 },
        { field: "Signstatus", headerName: "SignStatus", width: 160 },
    ]

    // CUSTOMER GET HYBRID

    // useEffect(() => {
    //     const handleHybridCheck = async () => {
    //         if (tripID && customer) {
    //             const response = await axios.get(`${apiUrl}/getCustomer-hybrid/${customer}`)
    //             setIsHybridCustomer((response?.data.hybrid === 1) ? true : false)
    //         } else {
    //             return
    //         }
    //     }
    //     handleHybridCheck()
    // }, [customer, tripID, apiUrl])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tripId = book.tripid || selectedCustomerData.tripid || selectedCustomerDatas.tripid || formData.tripid;

                if (!tripId) {
                    return; // Exit early if tripId is not defined
                }

                const tripid = tripId.toString(); // Convert to string if defined

                const response = await axios.get(`${apiUrl}/get-gmapdata/${tripid}`);
                const data = response.data;
                setRow(data);
            } catch (error) {
                console.error('Error fetching map data:', error);
            }
        };

        fetchData();
    }, [book, selectedCustomerData, selectedCustomerDatas, formData, apiUrl]);

    const handleEditMap = () => {
        setMapPopUp(true)
        if (manualTripID.length > 0) {
            // setEditMap(!EditMap);
            const editTrigger = "editMode"
            // Get the trip, time, and date details
            const tripid = book.tripid || selectedCustomerData.tripid || selectedCustomerDatas.tripid || formData.tripid;
            const starttime = book.starttime || selectedCustomerData.starttime || selectedCustomerDatas.starttime || formData.starttime;
            const endtime = book.closetime || selectedCustomerData.closetime || selectedCustomerDatas.closetime || formData.closetime;
            const startdate = dayjs(book.startdate || selectedCustomerData.startdate || selectedCustomerDatas.startdate || formData.startdate).format('YYYY-MM-DD');
            const closedate = dayjs(book.closedate || selectedCustomerData.closedate || selectedCustomerDatas.closedate || formData.closedate).format('YYYY-MM-DD');

            // Get latitude and longitude arrays from 'row'
            const latitude = row.map(li => li.Latitude);
            const longitude = row.map(li => li.Longitude);
            const startingTrips = row.filter(trip => trip.trip_type === "start");
            const endingTrips = row.filter(trip => trip.trip_type === "end");
            const wayTrips = row.filter(trip => trip.trip_type === "waypoint")
            const startingDate = startingTrips.length > 0 ? startingTrips[0].date : '';
            const endingDate = endingTrips.length > 0 ? endingTrips[0].date : '';
            const startingTime = startingTrips.length > 0 ? startingTrips[0].time : '';
            const endingTime = endingTrips.length > 0 ? endingTrips[0].time : '';
            const startPlaceName = startingTrips.length > 0 ? startingTrips[0].place_name : '';
            const endPlaceName = endingTrips.length > 0 ? endingTrips[0].place_name : '';
            const wayPlaceName = wayTrips?.map(li => li.place_name)
            const wayDate = wayTrips?.map(li => li.date);
            const wayTime = wayTrips?.map(li => li.time);
            const startLatitude = startingTrips.length > 0 ? startingTrips[0].Latitude : '';
            const endLatitude = endingTrips.length > 0 ? endingTrips[0].Latitude : '';
            const startLongitude = startingTrips.length > 0 ? startingTrips[0].Longitude : '';
            const endLongitude = endingTrips.length > 0 ? endingTrips[0].Longitude : '';
            const wayLatitude = wayTrips?.map(li => li.Latitude)
            const wayLongitude = wayTrips?.map(li => li.Longitude)



            // Check if tripid is valid
            if (!tripid) {
                setError(true);
                setErrorMessage("Please enter the tripid");
            } else {
                // Store the tripid in local storage
                localStorage.setItem('selectedTripid', tripid);

                // Serialize latitude and longitude arrays for the URL
                const serializedLatitude = encodeURIComponent(JSON.stringify(latitude));
                const serializedLongitude = encodeURIComponent(JSON.stringify(longitude));
                const serializedRow = encodeURIComponent(JSON.stringify(row)); // Serialize the row array


                // Open new tab with serialized latitude and longitude arrays

            }
        }
    };


    const TripID = formData.tripid || selectedCustomerData.tripid || book.tripid

    useEffect(() => {
        const fetchData = async () => {
            const tripid = formData.tripid || selectedCustomerData.tripid || book.tripid
            try {

                const response = await axios.get(`${apiUrl}/getGmapdataByTripId/${tripid}`)
                setManualTripID(response.data)
            }
            catch (error) {
                // console.log(error);

            }
        }
        fetchData()
    }, [manualMarkTrigger, TripID, mapButtonTrigger, mapimgpopupOpen])
    const handleDeleteMap = async () => {
        const tripid = formData.tripid || selectedCustomerData.tripid || book.tripid;
        try {
            const respone = await axios.post(`${apiUrl}/deleteMapByTripid/${tripid}`)
            console.log(respone.data);
            setManualTripID([])
            setError(true)
            setErrorMessage("Successfully Deleted")
            handleTripmapverify()
            setMapImageUrls1("")

            setMapimgPopupOpen(false)
        }
        catch (error) {
            // console.log(error, 'error');

        }

    }


    const calculatewithoutadditonalhour = () => {

        const duty = formData.duty || selectedCustomerData.duty || book.duty;
        const shedoutTime = formData.reporttime || selectedCustomerData.reporttime || selectedCustomerDatas.reporttime || book.reporttime
        const shedinTime = formData.shedintime || selectedCustomerData.shedintime || selectedCustomerDatas.shedintime || book.shedintime
        const totalDays = formData.totaldays || calculateTotalDay() || book.totaldays;
        const datatimetoggle = timeToggle || timetogglenavigate
        const starttimehybrid = removeSeconds(formData.starttime || selectedCustomerData.starttime || book.starttime || selectedCustomerDatas.starttime)

        const closetimehybrid = removeSeconds(formData.closetime || selectedCustomerData.closetime || book.closetime)

        const hybriddata = hybridhclcustomer || hybridhclnavigate


        // Parse additional time value if available

        if (hybriddata === 1) {
            // if (starttimehybrid && closetimehybrid) {
            if (starttimehybrid && closetimehybrid && duty !== "Outstation") {

                if (calculateTotalDay() === 1) {
                    // Split the time strings into hours and minutes
                    const [shedoutHours, shedoutMinutes] = starttimehybrid?.split(':').map(Number);
                    const [shedinHours, shedinMinutes] = closetimehybrid?.split(':').map(Number);

                    // Convert hours to minutes and add minutes
                    const totalShedoutMinutes = (shedoutHours * 60) + shedoutMinutes;
                    const totalShedinMinutes = (shedinHours * 60) + shedinMinutes;

                    // const a = Number(shedoutMinutes) + Number(shedinMinutes);

                    // Calculate the difference in minutes
                    let minuteDifference = totalShedinMinutes - totalShedoutMinutes

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



                if (calculateTotalDay() === 2) {

                    const newTimeString = starttimehybrid?.replace(":", ".");
                    const newTimeStrings = closetimehybrid?.replace(":", ".");
                    // const a = Number(newTimeStrings) + Number(newTimeString);

                    const c = 23.60 - Number(newTimeString) + Number(newTimeStrings);
                    const formattedC = c.toFixed(2);
                    const [hours1, minutes1] = formattedC.toString().split('.').map(Number);

                    let totalHours = hours1
                    let totalMinutes = minutes1
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
                    }
                    if (decimalPart < 60) {
                        const [hours, minutes] = formattedTotal?.toString().split('.').map(Number);

                        const formattedMinutes = parseInt(minutes, 10);
                        if (datatimetoggle === 0) {
                            const dataminutes = formattedMinutes >= 30 ? `${hours + 1}h` : `${hours}h`;
                            return dataminutes
                        }
                        else {
                            return `${hours}h ${formattedMinutes}m`;
                        }

                    }

                }
                if (calculateTotalDay() > 2) {
                    const newTimeString = starttimehybrid?.replace(":", ".");
                    const newTimeStrings = closetimehybrid?.replace(":", ".");
                    const LongTripDays = totalDays - 2;
                    const LongTripHours = LongTripDays * 24;
                    const LongHours = LongTripHours.toFixed(2);




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
                    // const [hours2, minutes2] = combined.toString().split('.');


                    let totalHours = Number(integerPart)
                    let totalMinutes = Number(decimalPart)
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
                        // console.log(a);
                        const [hours, minutes] = formattedTotal?.toString().split('.').map(Number);

                        const formattedMinutes = minutes.toString().padStart(2, '0'); // Ensure two digits for minutes
                        if (datatimetoggle === 0) {

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
            else {

                if (shedoutTime && shedinTime && duty === "Outstation") {


                    if (calculateTotalDay() === 1) {
                        // Split the time strings into hours and minutes
                        const [shedoutHours, shedoutMinutes] = shedoutTime?.split(':').map(Number);
                        const [shedinHours, shedinMinutes] = shedinTime?.split(':').map(Number);

                        // Convert hours to minutes and add minutes
                        const totalShedoutMinutes = (shedoutHours * 60) + shedoutMinutes;
                        const totalShedinMinutes = (shedinHours * 60) + shedinMinutes;

                        // const a = Number(shedoutMinutes) + Number(shedinMinutes);

                        // Calculate the difference in minutes
                        let minuteDifference = totalShedinMinutes - totalShedoutMinutes

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



                    if (calculateTotalDay() === 2) {

                        const newTimeString = shedoutTime?.replace(":", ".");
                        const newTimeStrings = shedinTime?.replace(":", ".");
                        // const a = Number(newTimeStrings) + Number(newTimeString);

                        const c = 23.60 - Number(newTimeString) + Number(newTimeStrings);
                        const formattedC = c.toFixed(2);
                        const [hours1, minutes1] = formattedC.toString().split('.').map(Number);

                        let totalHours = hours1
                        let totalMinutes = minutes1
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
                        }
                        if (decimalPart < 60) {
                            const [hours, minutes] = formattedTotal?.toString().split('.').map(Number);

                            const formattedMinutes = parseInt(minutes, 10);
                            if (datatimetoggle === 0) {
                                const dataminutes = formattedMinutes >= 30 ? `${hours + 1}h` : `${hours}h`;
                                return dataminutes
                            }
                            else {
                                return `${hours}h ${formattedMinutes}m`;
                            }

                        }

                    }
                    if (calculateTotalDay() > 2) {
                        const newTimeString = shedoutTime?.replace(":", ".");
                        const newTimeStrings = shedinTime?.replace(":", ".");
                        const LongTripDays = totalDays - 2;
                        const LongTripHours = LongTripDays * 24;
                        const LongHours = LongTripHours.toFixed(2);




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
                        // const [hours2, minutes2] = combined.toString().split('.');


                        let totalHours = Number(integerPart)
                        let totalMinutes = Number(decimalPart)
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
                            // console.log(a);
                            const [hours, minutes] = formattedTotal?.toString().split('.').map(Number);

                            const formattedMinutes = minutes.toString().padStart(2, '0'); // Ensure two digits for minutes
                            if (datatimetoggle === 0) {

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
        }
        else {
            if (shedinTime && shedoutTime) {


                if (calculateTotalDay() === 1) {
                    // Split the time strings into hours and minutes
                    const [shedoutHours, shedoutMinutes] = shedoutTime?.split(':').map(Number);
                    const [shedinHours, shedinMinutes] = shedinTime?.split(':').map(Number);

                    // Convert hours to minutes and add minutes
                    const totalShedoutMinutes = (shedoutHours * 60) + shedoutMinutes;
                    const totalShedinMinutes = (shedinHours * 60) + shedinMinutes;

                    // const a = Number(shedoutMinutes) + Number(shedinMinutes);

                    // Calculate the difference in minutes
                    let minuteDifference = totalShedinMinutes - totalShedoutMinutes

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



                if (calculateTotalDay() === 2) {

                    const newTimeString = shedoutTime?.replace(":", ".");
                    const newTimeStrings = shedinTime?.replace(":", ".");
                    // const a = Number(newTimeStrings) + Number(newTimeString);

                    const c = 23.60 - Number(newTimeString) + Number(newTimeStrings);
                    const formattedC = c.toFixed(2);
                    const [hours1, minutes1] = formattedC.toString().split('.').map(Number);

                    let totalHours = hours1
                    let totalMinutes = minutes1
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
                    }
                    if (decimalPart < 60) {
                        const [hours, minutes] = formattedTotal?.toString().split('.').map(Number);

                        const formattedMinutes = parseInt(minutes, 10);
                        if (datatimetoggle === 0) {
                            const dataminutes = formattedMinutes >= 30 ? `${hours + 1}h` : `${hours}h`;
                            return dataminutes
                        }
                        else {
                            return `${hours}h ${formattedMinutes}m`;
                        }

                    }

                }
                if (calculateTotalDay() > 2) {
                    const newTimeString = shedoutTime?.replace(":", ".");
                    const newTimeStrings = shedinTime?.replace(":", ".");
                    const LongTripDays = totalDays - 2;
                    const LongTripHours = LongTripDays * 24;
                    const LongHours = LongTripHours.toFixed(2);




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
                    // const [hours2, minutes2] = combined.toString().split('.');


                    let totalHours = Number(integerPart)
                    let totalMinutes = Number(decimalPart)
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
                        console.log(a);
                        const [hours, minutes] = formattedTotal?.toString().split('.').map(Number);

                        const formattedMinutes = minutes.toString().padStart(2, '0'); // Ensure two digits for minutes
                        if (datatimetoggle === 0) {

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

    }

    const HclKMCalculation = useMemo(() => {
        return (
            formData.closekm || selectedCustomerData.closekm || selectedCustomerDatas.closekm || book.closekm || ''
        )
    }, [formData.closekm || selectedCustomerData.closekm || selectedCustomerDatas.closekm || book.closekm])

    // Tripsheet some fields Hide after 30Min from reportTime
    const TripReportTime = formData.starttime || selectedCustomerData.starttime || book.starttime || selectedCustomerDatas.starttime;
    const TripReportDate = formData.startdate || selectedCustomerData.startdate || book.startdate || selectedCustomerDatas.startdate || tripSheetData.startdate;
    const CurrentDate = dayjs().format('DD-MM-YYYY');
    const timedata = dayjs()
    const formattedTripReportDate = dayjs(TripReportDate).format('DD-MM-YYYY')
    const hours = timedata.$H?.toString().padStart(2, "0") || "00";
    const minutes = timedata.$m?.toString().padStart(2, "0") || "00";
    const CurrentTime = `${hours}:${minutes}`;
    const formattedTime = TripReportTime?.split(":").slice(0, 2).join(":");
    const formattedCurrentTime = CurrentTime?.replace(":", ".")
    const formattedReportTime = formattedTime?.replace(":", ".");

    const convertReportTime = parseFloat(formattedReportTime || 0)
    const timeParts = formattedReportTime?.split(".") || ["0", "0"]; // Default to ["0", "0"] if undefined
    let hours1 = parseInt(timeParts[0] || 0, 10); // Parse hours as an integer
    let minutes1 = parseInt(timeParts[1] || 0, 10); // Parse minutes as an integer

    minutes1 += 30;

    if (minutes1 >= 60) {
        hours1 += 1;
        minutes1 -= 60;
    }

    const bonusReportTime1 = `${hours1}.${minutes1.toString().padStart(2, "0")}`;
    // console.log(bonusReportTime1, "assssssss");
    let startdatecalc;
    if (bonusReportTime1 === "24.00") {
        console.log("It's 24.00, converting to 00.00");
        startdatecalc = "00.00";
    }
    // console.log(startdatecalc, 'asssssssssssssssssss');
    const bonusReportTime = bonusReportTime1 === "24.00" ? startdatecalc : bonusReportTime1

    // const bonusReportTime = (parseFloat(formattedReportTime || 0) + 0.30).toFixed(2);
    // console.log(startdatecalc, 'reporttimeeeeee', formattedReportTime, "ee33eeee", convertReportTime);

    const finalCurrentTime = parseFloat(formattedCurrentTime || 0).toFixed(2)


    useEffect(() => {
        // const currentDateObj = new Date(CurrentDate);
        // const formattedDateObj = new Date(formattedTripReportDate);
        const parseDate = (dateStr) => {
            const [day, month, year] = dateStr.split('-');
            return new Date(`${year}-${month}-${day}`);
        };

        // Parse the date strings
        const currentDateObj = parseDate(CurrentDate);
        const formattedDateObj = parseDate(formattedTripReportDate);

        // Set the hours to 0 to ignore the time part
        currentDateObj.setHours(0, 0, 0, 0);
        formattedDateObj.setHours(0, 0, 0, 0);
        // console.log(currentDateObj,"----------------------------------------------",formattedDateObj);
        // console.log(bonusReportTime, "-------finallll", finalCurrentTime,parseFloat(bonusReportTime));

        const finalreportTimecalc = parseFloat(bonusReportTime).toFixed(2);
        const finalCurrentTimecalc = parseFloat(finalCurrentTime).toFixed(2)
        // Log the types and values of the variables
        // console.log(formattedTripReportDate, "report time", typeof (formattedTripReportDate));

        // console.log("Current Date Type:", typeof (CurrentDate), "Current Date:", CurrentDate);
        // console.log("Formatted Trip Report Date Type:", typeof (formattedTripReportDate), "Formatted Trip Report Date:", formattedTripReportDate);
        // console.log("Current Date Object:", currentDateObj);
        // console.log("Formatted Trip Report Date Object:", formattedDateObj);
        // console.log(finalreportTimecalc,"reporttimecalccccc",finalCurrentTimecalc,typeof(finalreportTimecalc),typeof(finalCurrentTimecalc),a);


        if (currentDateObj < formattedDateObj) {
            console.log('-----------111111');

            console.log("CurrentDate is less than formattedTripReportDate");
            setHideField(false);
        } else if (currentDateObj > formattedDateObj) {
            console.log('-----------1111112222');

            setHideField(true);
            console.log("CurrentDate is greater than formattedTripReportDate");
        } else if (currentDateObj.getDate() === formattedDateObj.getDate() && parseFloat(finalreportTimecalc) > parseFloat(finalCurrentTimecalc)) {
            console.log('-----------1111113333');

            setHideField(false);
            console.log("Both dates are equal allowed");
        }
        else if (currentDateObj.getDate() === formattedDateObj.getDate() && parseFloat(finalreportTimecalc) === parseFloat(finalCurrentTimecalc)) {
            console.log('-----------1111113333');

            setHideField(true);
            console.log("Both dates are equal allowed");
        }
        else if (currentDateObj.getDate() === formattedDateObj.getDate() && parseFloat(finalreportTimecalc) < parseFloat(finalCurrentTimecalc).toFixed(2)) {
            console.log('-----------111111444444');

            setHideField(true);
            console.log("Both dates are equal not allowed");
        }
    }, [enterTrigger,book]);

    // }, [CurrentDate, formattedTripReportDate, TripReportDate, TripReportTime, CurrentTime]);

    // const loginusername = localStorage.getItem("username")
    // const tripno = formData.tripid || selectedCustomerData.tripid || book.tripid;
    // const statusCheck = formData.status || selectedCustomerData.status || book.status;
    // const superAdminAccess = localStorage.getItem("SuperAdmin")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`${apiUrl}/getParticularUserDetails`, {
                    username: loginusername,
                });
                const data = response.data;
                const station = data?.map(li => li.stationname.split(",")).flat();
                setUserStatus(station);

                console.log("Debugging Inputs:");
                console.log("statusCheck:", statusCheck);
                console.log("condititonstation:", station);
                console.log("superAdminAccess:", superAdminAccess);

                // Normalize station data for consistency
                const normalizedStation = station.map(s => s.trim().toLowerCase());

                // Condition 1: Temporary Closed with All or Chennai
                // if (
                //     (statusCheck === "Temporary Closed") &&
                //     (superAdminAccess === "0") &&
                //     (station.includes("Chennai") || station.includes("All"))
                // )
                if (
                    (statusCheck === "Temporary Closed") &&
                    (superAdminAccess !== "SuperAdmin" ) &&
                    (station.includes("Chennai") || station.includes("All"))
                )
                 {
                    console.log("Condition 1: Temporary Closed with All or Chennai");
                    setTemporaryStatus(false);
                    setEmptyState(false)
                    return;
                }
                if (statusCheck === "Opened") {
                    setTemporaryStatus(false);
                    setEmptyState(false)
                    return
                }
                // Condition 2: Temporary Closed without All or Chennai
                // if (
                //     (statusCheck === "Temporary Closed") &&
                //     (superAdminAccess === "0") &&
                //     (!station.includes("Chennai") || !station.includes("All"))
                // ) 

                if (
                    (statusCheck === "Temporary Closed") &&
                    (superAdminAccess !== "SuperAdmin") &&
                    (!station.includes("Chennai") || !station.includes("All"))
                ) 
                {
                    console.log("Condition 2: Temporary Closed without All or Chennai");
                    setTemporaryStatus(true);
                    setEmptyState(false);
                    setHideField(true)
                    return;
                }
                  // Condition 4: Closed with Chennai or All
                  if (
                    (statusCheck === "Closed") &&
                    (station.includes("Chennai") || station.includes("All"))
                ) {
                    console.log("Condition 4: Closed with Chennai or All");
                    setTemporaryStatus(true);
                    setHideField(true);
                    setEmptyState(false)
                    return;
                }
                // if (
                //     (statusCheck === "Closed") &&
                //     (superAdminAccess === "0") &&
                //     (!station.includes("Chennai") || !station.includes("All"))
                // ) 
                if (
                    (statusCheck === "Closed") &&
                    (superAdminAccess !== "SuperAdmin") &&
                    (!station.includes("Chennai") || !station.includes("All"))
                ) 
                {
                    console.log("Condition 33: Temporary Closed without All or Chennai");
                    setEmptyState(true);
                    setTemporaryStatus(true);
                    return;
                }

                // Condition 3: No Chennai or All in Station
                if (!station.includes("Chennai") && !station.includes("All")) {
                    console.log("Condition 3: No Chennai or All in Station");
                    setOutStationHide(true);
                    return;
                }

              

                // Condition 5: Closed and superAdminAccess is 0
                // if (
                //     statusCheck === "Closed" &&
                //     superAdminAccess === "0" &&
                //     (!station.includes("Chennai") && !station.includes("All"))
                // )
                if (
                    statusCheck === "Closed" &&
                    superAdminAccess !== "SuperAdmin" &&
                    (!station.includes("Chennai") && !station.includes("All"))
                )
                 {
                    console.log("Condition 5: Closed without Chennai or All and superAdminAccess 0");
                    setTemporaryStatus(true);
                    setEmptyState(true);
                    setHideField(true);
                    return;
                }

                // Condition 6: Closed or Billed and superAdminAccess is 0
                // if (
                //     (statusCheck === "Closed" || statusCheck === "Billed") &&
                //     (superAdminAccess === "0")
                // ) 
                if (
                    (statusCheck === "Closed" || statusCheck === "Billed") &&
                    (superAdminAccess !== "SuperAdmin")
                ) 
                {
                    console.log("Condition 6: Closed or Billed and superAdminAccess is 0");
                    setEmptyState(true);
                    setHideField(true)
                    return;
                }

                // Condition 7: Not Closed
                if (statusCheck !== "Closed") {
                    console.log("Condition 7: Not Closed");
                    setEmptyState(false);
                    setTemporaryStatus(false);
                    return;
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchData();
    }, [enterTrigger,book]);

    // Edit Button Hide

    const statuschecking = selectedStatus;
    // console.log(statuschecking,'status checking',selectedCustomerData.status,book.status,selectedStatus);
    const EditButtonHide = async () => {
        try {
            const response = await axios.post(`${apiUrl}/getParticularUserDetails`, {
                username: loginusername,
            });
            const data = response.data;
            const station = data?.map(li => li.stationname.split(",")).flat();
            if (statuschecking === "Closed" && ((station.includes('Chennai') || station.includes('All')))) {
                SetEditButtonStatusCheck(true)
            }
            else if (statuschecking === "Temporary Closed" && ((station.includes('Chennai') || station.includes('All')))) {
                SetEditButtonStatusCheck(false)
            }
            else if (statuschecking === "Temporary Closed" || statuschecking === "Closed" || statuschecking === "Billed") {
                SetEditButtonStatusCheck(true)
            }
            else if (statuschecking === "Opened") {
                SetEditButtonStatusCheck(false)
            }
        }
        catch (err) {
            console.log(err, "error");

        }
    }
    useEffect(() => {
        EditButtonHide()
    }, [statuschecking])

    

    // getVehcileHistoryData in vehcileHistoryData


    useEffect(() => {
        const vehicleNo = formData.vehRegNo || selectedCustomerData.vehRegNo || formValues.vehRegNo || selectedCustomerDatas.vehRegNo || book.vehRegNo;
        const datecheck = formData?.shedOutDate || selectedCustomerData?.shedOutDate || book?.shedOutDate;

        const fetchData = async () => {

            try {
                const response = await axios.post(`${apiUrl}/getVehcileHistoryData`, {
                    vehicleNo: vehicleNo,
                    dateCheck: datecheck
                });
                // console.log(response.data, "conflictdataaaa");

                const mainDatas = response.data;
                const minData = mainDatas.reduce((min, current) => {
                    const timesWithDates = [
                        { time: current.shedouttime?.replace(":", "."), date: current.shedoutdate, tripid: current.Tripid },
                        { time: current.reporttime?.replace(":", "."), date: current.reportdate, tripid: current.Tripid },
                        { time: current.closetime?.replace(":", "."), date: current.closedate, tripid: current.Tripid },
                        { time: current.shedintime?.replace(":", "."), date: current.shedindate, tripid: current.Tripid }
                    ].filter(entry => entry.time && entry.date);

                    // Find the minimum time in the current row
                    const minCurrentRow = timesWithDates.reduce((minRow, currentRow) => {
                        return parseFloat(currentRow.time) < parseFloat(minRow.time) ? currentRow : minRow;
                    }, timesWithDates[0]);

                    // Compare with the overall minimum
                    return parseFloat(minCurrentRow.time) < parseFloat(min.time) ? minCurrentRow : min;
                }, { time: Infinity, date: null, tripid: null }); // Start with an impossibly high time
                setMinTimeData(minData)



                const maxData = mainDatas.reduce((max, current) => {
                    const timesWithDates = [
                        { time: current.shedouttime?.replace(":", "."), date: current.shedoutdate, tripid: current.Tripid },
                        { time: current.reporttime?.replace(":", "."), date: current.reportdate, tripid: current.Tripid },
                        { time: current.closetime?.replace(":", "."), date: current.closedate, tripid: current.Tripid },
                        { time: current.shedintime?.replace(":", "."), date: current.shedindate, tripid: current.Tripid }
                    ].filter(entry => entry.time && entry.date);

                    // Find the maximum time in the current row
                    const maxCurrentRow = timesWithDates.reduce((maxRow, currentRow) => {
                        return parseFloat(currentRow.time) > parseFloat(maxRow.time) ? currentRow : maxRow;
                    }, timesWithDates[0]);

                    // Compare with the overall maximum
                    return parseFloat(maxCurrentRow.time) > parseFloat(max.time) ? maxCurrentRow : max;
                }, { time: -Infinity, date: null, tripid: null }); // Start with an impossibly low time
                setMaxTimeData(maxData)


                // const rowsWithShedInDate = mainDatas?.filter(current =>
                //     current?.shedindate !== null && current?.shedindate !== datecheck
                // );
                const notEqualRows = mainDatas?.filter(current =>
                    current?.shedindate !== null && current?.shedindate !== datecheck
                );

                const equalRows = mainDatas?.filter(current =>
                    current?.shedindate !== null && current?.shedindate === datecheck
                );
                const rowsWithShedInDate = notEqualRows?.length > 0 ? notEqualRows : equalRows;

                setShedInTimeData(rowsWithShedInDate)


            }
            catch (err) {
                console.log(err, "error");

            }
        }
        fetchData()
    }, [apiUrl, formData, selectedCustomerData, selectedCustomerDatas, book, formValues])


    return {
        selectedCustomerData, ex_kmAmount, ex_hrAmount,
        escort, setEscort, driverdetails,
        night_totalAmount, driverBeta_calc, driverbeta_Count_calc,
        driverBeta_amount, totalcalcAmount, driverBeta, setdriverBeta, setdriverbeta_Count, setdriverBeta_amount,
        selectedCustomerId, nightBta, nightCount, driverbeta_Count,
        vehileNames, handleEscortChange, handleClickOpen, open,
        handleClose,
        handleSignaturePopUpOpen,
        rows,
        //  ClosedTripData,
        error,
        // isHybridCustomer,
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
        handleDriverChange,
        vehicleNames,
        drivername,
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
        handleVehicleChange,
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
        vechiledata,
        setVehicleData,
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
        // handleDeletePhoto,
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
        selectedStatus,
        setSelectedStatus,
        link,
        isSignatureSubmitted,
        //  checkCloseKM,
        isEditMode,
        handleEdit, setFormValues,
        // SignPage,
        handlesignaturePopUpClose, signaturePopUpOpen,
        sign, handleCalc, calcPackage, extraHR, extraKM, package_amount, extrakm_amount, extrahr_amount,
        //  handleConfirm,
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
        signaturelinkcopy, columnssignature, rowsignature, setWarning, setWarningMessage, setSignImageUrl, signaturelinkwhatsapp, CopyEmail, setCopyEmail, conflictkm, lockdatavendorbill, setLockDatavendorBill, lockdatacustomerbill, setLockDatacustomerBill, handleRefreshsign,
        handleEditMap,
        handleDeleteMap, copydatalink, setCopyDataLink,
        // conflictenddate, 
        groupTripId, setGroupTripId, mapPopUp, setMapPopUp,
        manualTripID, setEditMap, editMap, calculatewithoutadditonalhour, hybridhclcustomer, timeToggle, HclKMCalculation, hybridhclnavigate,
        isAddload, setisAddload, isEditload, setisEditload,
        hideField, temporaryStatus, emptyState, editButtonStatusCheck, conflictCompareDatas, userStatus, conflictMinimumTimeDatas,
        minTimeData, maxTimeData, shedInTimeData, conflictLoad, setConflictLoad, selectedStatuschecking, openModalConflict, setOpenModalConflict, setError, setErrorMessage,
        outStationHide, openConflictKMPopup, setOpenConflictKMPopup, enterTrigger,setNoChangeData,nochangedata,handlecalcpackage,handlecalcpackageamount,

    };
};

export default useTripsheet;