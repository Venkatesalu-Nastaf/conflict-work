import { useState, useEffect, useCallback, useContext } from 'react';
import { PermissionsContext } from '../../../permissionContext/permissionContext';
import axios from "axios";
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import dayjs from "dayjs";
import { APIURL } from "../../../url";

const columns = [
    { field: "id", headerName: "Sno", width: 50 },
    { field: "status", headerName: "Status", width: 110 },
    { field: "apps", headerName: "Apps", width: 130 },
    { field: "bookingno", headerName: "Booking ID", width: 110 },
    { field: "tripid", headerName: "Tripsheet No", width: 110 },
    { field: "startdate", headerName: "Start Date", width: 120, valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY') },
    { field: "tripsheetdate", headerName: "End Date", width: 120, valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY') },
    { field: "department", headerName: "Department", width: 130 },
    { field: "starttime", headerName: "Time", width: 90 },
    { field: "guestname", headerName: "Guest Name", width: 160 },
    { field: "mobileNo", headerName: "Mobile", width: 130 },
    { field: "address1", headerName: "R.Address", width: 130 },
    { field: "streetno", headerName: "R.Address1", width: 130 },
    { field: "city", headerName: "R.Address2", width: 130 },
    { field: "customer", headerName: "Company", width: 130 },
];

const useDispatched = () => {
    const apiUrl = APIURL;
    // const user_id = localStorage.getItem('useridno');
    const [rows, setRows] = useState([]);
    // let [statusVAlue, setStatusVAlue] = useState("");

    const [department, setdepartment] = useState("");
    // const [statusvalue, setstatusvalue] = useState("");
    const [fromDate, setFromDate] = useState(dayjs());
    const [toDate, setToDate] = useState(dayjs());
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [info, setInfo] = useState(false);
    const [warning, setWarning] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [popupOpen, setPopupOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [warningMessage] = useState({});
    const [infoMessage] = useState({});


    // for page permission    const currentPageName = 'Booking';

    //--------------------------------------

    const [userPermissionss, setUserPermissions] = useState({});

    const { userPermissions } = useContext(PermissionsContext);
    // console.log("ratetype ", userPermissions)

    //----------------------------------------

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const currentPageName = "Booking";
                // const response = await axios.get(`${apiUrl}/user-permi/${user_id}/${currentPageName}`);
                // setPermi(response.data);

                const permissions = await userPermissions.find(permission => permission.page_name === currentPageName);
                // console.log("org ", permissions)
                setUserPermissions(permissions);

            } catch {
            }
        };
        fetchPermissions();
    }, [userPermissions]);

    //---------------------------------------

    const checkPagePermission = () => {
        const currentPageName = "Booking";
        const permissions = userPermissionss || {};
        // console.log('aaaaaaaa', permissions)

        if (permissions.page_name === currentPageName) {
            return {
                read: permissions.read_permission === 1,
                new: permissions.new_permission === 1,
                modify: permissions.modify_permission === 1,
                delete: permissions.delete_permission === 1,
            };
        }
        return {
            read: false,
            new: false,
            modify: false,
            delete: false,
        };
    };


    //------------------------------

    const permissions = checkPagePermission();

    const isFieldReadOnly = (fieldName) => {
        if (permissions.read) {
            if (fieldName === "delete" && !permissions.delete) {
                return true;
            }
            return false;
        }
        return true;
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


    const convertToCSV = (data) => {
        const header = columns.map((column) => column.headerName).join(",");
        const rows = data.map((row) => columns.map((column) => row[column.field]).join(","));
        return [header, ...rows].join("\n");
    };
    const handleExcelDownload = () => {
        const csvData = convertToCSV(rows);
        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
        saveAs(blob, "Pending Reports.csv");
    };
    const handlePdfDownload = () => {
        const pdf = new jsPDF('Landscape');
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        pdf.text("Pending Reports", 10, 10);

        const tableData = rows.map((row) => [
            row['id'],
            row['status'],
            row['bookingno'],
            row['tripid'],
            row['bookingdate'],
            row['bookingtime'],
            row['guestname'],
            row['mobileno'],
            row['address1'],
            row['streetno'],
            row['customer'],
        ]);
        pdf.autoTable({
            head: [['Sno', 'Status', 'Booking ID', 'Tripsheet No', 'Date', 'Time', 'Guest Name', 'Mobile', 'R.Address', 'R.Address1', 'R.Address2', 'Company']],
            body: tableData,
            startY: 20,
        });
        const pdfBlob = pdf.output('blob');
        saveAs(pdfBlob, 'Pending Reports.pdf');
    };

    const handleInputChange = (event, newValue) => {
        // console.log("nnn", newValue, newValue.label)
        setdepartment(newValue ? newValue.label : '');
        // console.log("nnn", department)
    };

    const [statusvalue, setStatusValue] = useState("");

    const handlestatusChange = (event, newValue) => {
        // event.prevntDefault()
        console.log("kkkk", newValue ? newValue.label : '');
        setStatusValue(newValue ? newValue.label : "");
        console.log("kkk--", statusvalue)
    };


    const reversedRows = [...rows].reverse();  // to reverse 
    const handleShow = useCallback(async () => {
        try {
            // console.log("kkk nnn", statusvalue, department)
            const response = await axios.get(
                `${apiUrl}/pending_tripsheet-show?department=${encodeURIComponent(
                    department
                )}&fromDate=${encodeURIComponent(fromDate.toISOString())}&toDate=${encodeURIComponent(
                    toDate.toISOString()
                )}&status=${encodeURIComponent(statusvalue)}`
            );
            const data = response.data;

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
            setRows([]);
            setError(true);
            setErrorMessage("Error retrieving data");
        }

    }, [department, fromDate, toDate, apiUrl, statusvalue]);

    const handleShowAll = async () => {
        try {
            const response = await axios.get(
                `${apiUrl}/tripsheet-showall`
            );
            const data = response.data;
            console.log("mmmm", response.data)
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
            setRows([]);
            setError(true);
            setErrorMessage("Check your Network Connection");
        }
    };

    const handleButtonClick = (row) => {
        // console.log("rowww", row)
        console.log('roww', row.calcPackage)
        console.log("roww", row.extraKM)
        console.log("roww", row.extrakm_amount)
        console.log("roww", row.ex_kmAmount)
        setSelectedRow(row);
        setPopupOpen(true);
    };
    const handlePopupClose = () => {
        setSelectedRow(null);
        setPopupOpen(false);
    };

    const handleTripsheetClick = async () => {
        // console.log('roww', selectedRow.calcPackage)
        // console.log("roww", selectedRow.extraKM)
        // console.log("roww-----", selectedRow.extrakm_amount)

        // console.log("roww", selectedRow.ex_kmAmount)
        const dispatchcheck = "true";
        const calcPackageString = selectedRow.calcPackage ? encodeURIComponent(selectedRow.calcPackage.toString()) : '';
        // console.log("bbbb", selectedRow.calcPackage)
        // console.log("bbbb", selectedRow.extrakm_amount)
        // console.log("bbbb", selectedRow.totalcalcAmount)
        const bookingPageUrl = `/home/bookings/tripsheet?dispatchcheck=${dispatchcheck}&tripid=${selectedRow.tripid || ''}&bookingno=${selectedRow.bookingno || ''}&status=${selectedRow.status || ''}&billingno=${selectedRow.billingno || ''}&apps=${selectedRow.apps || ''}&customer=${selectedRow.customer || ''}&orderedby=${selectedRow.orderedby || ''}&mobile=${selectedRow.mobile || ''}&guestname=${selectedRow.guestname || ''}&guestmobileno=${selectedRow.guestmobileno || ''}&email=${selectedRow.email || ''}&employeeno=${selectedRow.employeeno || ''}&guestmobileno=${selectedRow.guestmobileno || ''}&email=${selectedRow.email || ''}&address1=${selectedRow.address1 || ''}&streetno=${selectedRow.streetno || ''}&city=${selectedRow.city || ''}&hireTypes=${selectedRow.hireTypes || ''}&department=${selectedRow.department || ''}&vehRegNo=${selectedRow.vehRegNo || ''}&vehType=${selectedRow.vehType || ''}&driverName=${selectedRow.driverName || ''}&mobileNo=${selectedRow.mobileNo || ''}&driversmsexbetta=${selectedRow.driversmsexbetta || ''}&gps=${selectedRow.gps || ''}&duty=${selectedRow.duty || ''}&pickup=${selectedRow.pickup || ''}&useage=${selectedRow.useage || ''}&request=${selectedRow.request || ''}&startdate=${selectedRow.startdate || ''}&closedate=${selectedRow.closedate || ''}&totaldays=${selectedRow.totaldays || ''}&employeeno=${selectedRow.employeeno || ''}&reporttime=${selectedRow.reporttime || ''}&shedintime=${selectedRow.shedintime || ''}&shedkm=${selectedRow.shedkm || ''}&shedin=${selectedRow.shedin || ''}&shedout=${selectedRow.shedout || ''}&starttime=${selectedRow.starttime || ''}&closetime=${selectedRow.closetime || ''}&additionaltime=${selectedRow.additionaltime || ''}&advancepaidtovendor=${selectedRow.advancepaidtovendor || ''}&customercode=${selectedRow.customercode || ''}&startkm=${selectedRow.startkm || ''}&closekm=${selectedRow.closekm || ''}&permit=${selectedRow.permit || ''}&parking=${selectedRow.parking || ''}&toll=${selectedRow.toll || ''}&vpermettovendor=${selectedRow.vpermettovendor || ''}&vendortoll=${selectedRow.vendortoll || ''}&customeradvance=${selectedRow.customeradvance || ''}&email1=${selectedRow.email1 || ''}&remark=${selectedRow.remark || ''}&smsguest=${selectedRow.smsguest || ''}&documentnotes=${selectedRow.documentnotes || ''}&VendorTripNo=${selectedRow.VendorTripNo || ''}&vehicles=${selectedRow.vehicles || ''}&duty1=${selectedRow.duty1 || ''}&startdate1=${selectedRow.startdate1 || ''}&closedate1=${selectedRow.closedate1 || ''}&totaldays1=${selectedRow.totaldays1 || ''}&locks=${selectedRow.locks || ''}&starttime2=${selectedRow.starttime2 || ''}&closetime2=${selectedRow.closetime2 || ''}&totaltime=${selectedRow.totaltime || ''}&startkm1=${selectedRow.startkm1 || ''}&closekm1=${selectedRow.closekm1 || ''}&totalkm1=${selectedRow.totalkm1 || ''}&remark1=${selectedRow.remark1 || ''}&calcPackage=${calcPackageString}&extraHR=${selectedRow.extraHR || ''}&extraKM=${selectedRow.extraKM || ''}&package_amount=${selectedRow.package_amount || ''}&extrakm_amount=${selectedRow.extrakm_amount || ''}&extrahr_amount=${selectedRow.extrahr_amount || ''}&ex_kmAmount=${selectedRow.ex_kmAmount || ''}&ex_hrAmount=${selectedRow.ex_hrAmount || ''}&nightBta=${selectedRow.nightBta || ''}&nightCount=${selectedRow.nightCount || ''}&night_totalAmount=${selectedRow.night_totalAmount || ''}&driverBeta=${selectedRow.driverBeta}&driverbeta_Count=${selectedRow.driverbeta_Count || ''}&driverBeta_amount=${selectedRow.driverBeta_amount || ''}&totalcalcAmount=${selectedRow.totalcalcAmount || ''}&vehcommission=${selectedRow.vehcommission || ''}&caramount1=${selectedRow.caramount1 || ''}&manualbills=${selectedRow.manualbills || ''}&pack=${selectedRow.pack || ''}&amount5=${selectedRow.amount5 || ''}&exkm1=${selectedRow.exkm1 || ''}&amount6=${selectedRow.amount6 || ''}&exHrs1=${selectedRow.exHrs1 || ''}&amount7=${selectedRow.amount7 || ''}&night1=${selectedRow.night1 || ''}&amount8=${selectedRow.amount8 || ''}&driverconvenience1=${selectedRow.driverconvenience1 || ''}&amount9=${selectedRow.amount9 || ''}&rud=${selectedRow.rud || ''}&netamount1=${selectedRow.netamount1 || ''}&discount=${selectedRow.discount || ''}&ons=${selectedRow.ons || ''}&manualbills1=${selectedRow.manualbills1 || ''}&balance=${selectedRow.balance || ''}&fcdate=${selectedRow.fcdate || ''}&taxdate=${selectedRow.taxdate || ''}&insdate=${selectedRow.insdate || ''}&stpermit=${selectedRow.stpermit || ''}&maintenancetype=${selectedRow.maintenancetype || ''}&kilometer=${selectedRow.kilometer || ''}&selects=${selectedRow.selects || ''}&documenttype=${selectedRow.documenttype || ''}&on1=${selectedRow.on1 || ''}&smsgust=${selectedRow.smsgust || ''}&booker=${selectedRow.booker || ''}&emailcheck=${selectedRow.emailcheck || ''}&valueprint=${selectedRow.valueprint || ''}&manualbillss=${selectedRow.manualbillss || ''}&reload=${selectedRow.reload || ''}`;
        window.location.href = await bookingPageUrl;


    };

    const handleButtontripsheet = () => {
        window.location.href = '/home/bookings/tripsheet';
    };

    return {
        fromDate, statusvalue, handlestatusChange,
        setFromDate,
        toDate,
        error,
        success,
        info,
        warning,
        successMessage,
        errorMessage,
        warningMessage,
        infoMessage,
        setToDate,
        handleShow,
        isFieldReadOnly,
        handleShowAll,
        department,
        hidePopup,
        handleInputChange,
        handleButtontripsheet,
        handleExcelDownload,
        handlePdfDownload,
        reversedRows,
        handleButtonClick,
        popupOpen,
        handlePopupClose,
        selectedRow,
        handleTripsheetClick,
        columns
    };
};

export default useDispatched;