import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import dayjs from "dayjs";
import ReactDOMServer from 'react-dom/server';
import Coverpdf from './coverpdf/Coverpdf';
import { saveAs } from 'file-saver';
import { Organization } from '../../billingMain/PaymentDetail/PaymentDetailData';
import { APIURL } from "../../../url";
import { useLocation } from 'react-router-dom';
import { ReferenceNo } from './RefenceNo';

const useGroupbilling = () => {
    const apiUrl = APIURL;
    // const user_id = localStorage.getItem('useridno');
    const [rows, setRows] = useState([]);
    const [error, setError] = useState(false);
    const [tripData, setTripData] = useState("");
    const [customer, setCustomer] = useState("");
    const [toDate, setToDate] = useState(dayjs());
    const [Billingdate] = useState(dayjs());
    const [success, setSuccess] = useState(false);
    const [invoiceno, setInvoiceno] = useState("");
    const [totalValue, setTotalValue] = useState("");
    const [fromDate, setFromDate] = useState(dayjs());
    const [bankOptions, setBankOptions] = useState([]);
    const [errorMessage, setErrorMessage] = useState({});
    const [roundedAmount, setRoundedAmount] = useState('');
    const [successMessage, setSuccessMessage] = useState({});
    const [servicestation, setServiceStation] = useState("");
    const [sumTotalAndRounded, setSumTotalAndRounded] = useState('');
    const [selectedCustomerDatas, setSelectedCustomerDatas] = useState({});
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const [rowSelectedValues, setRowSelectedValues] = useState([])
    const [warning, setWarning] = useState(false);
    const [warningMessage] = useState({});
    const [groupBillId, setGroupBillId] = useState([])
    const location = useLocation()
    const [groupInvoice, setGroupInvoice] = useState(false)
    const [groupInvoiceNumber, setGroupInvoiceNumber] = useState('')
    const [groupInvoiceDate, setGroupInvoiceDate] = useState('')
    const [referenceNo, setReferenceNo] = useState([])
    const [particularId, setParticularId] = useState([])
    const [refInvNo, setRefInvNo] = useState('')
    const [refInvDate, setRefInvDate] = useState('')
    // popup------------------------------
    const hidePopup = () => {
        setError(false);
        setSuccess(false);
        setWarning(false);
    };
    const columns = [
        { field: "id", headerName: "Sno", width: 70 },
        // { field: "billingno", headerName: "Bill No", width: 130 },
        {
            field: groupInvoice ? "InvoiceNo" : "billingno",
            headerName: groupInvoice ? "Invoice No" : "Bill No",
            width: 150
        },        // { field: groupInvoice ? `${groupInvoiceNumber}` : "billingno", headerName: groupInvoice ? "Invoice No" : "Bill No", width: 150 },
        { field: "InvoiceDate", headerName: "Invoice Date", width: 130 },
        { field: "tripid", headerName: "Trip No", width: 150 },
        { field: "customer", headerName: "Customer", width: 130 },
        { field: "vehRegNo", headerName: "Vehcile No", width: 150 },
        { field: "vehType", headerName: "Vehcile Type", width: 150 },
        { field: "totalkm1", headerName: "KMS", width: 130 },
        { field: "totaltime", headerName: "Hours", width: 130 },
        { field: "totaldays", headerName: "Days", width: 130 },
        { field: "duty", headerName: "Duty", width: 130 },
        { field: "advancepaidtovendor", headerName: "Advance", width: 150 },
        { field: "gst", headerName: "GST%", width: 130 },
        { field: "permit", headerName: "Permit", width: 150 },
        { field: "toll", headerName: "Toll", width: 150 },
        { field: "parking", headerName: "Parking", width: 150 },
        { field: "netamount", headerName: "Net Amount", width: 130 },
        // { field: "tripid", headerName: "Trip ID", width: 130 },
        { field: "guestname", headerName: "UserName", width: 150 },
    ];

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const parameterKeys = [
            "Tripid", "InvoiceNo", "InvoiceColumn", "InvoiceDate"
        ];
        const formData = {};
        parameterKeys.forEach(key => {
            const value = params.get(key);
            if (value !== null && value !== "null") {
                formData[key] = value;
            }
        });
        const grouplist = formData.Tripid?.split(',')
        setGroupBillId(grouplist)
        setGroupInvoiceNumber(formData.InvoiceNo)
        setGroupInvoice(formData.InvoiceColumn)
        setGroupInvoiceDate(formData.InvoiceDate)

    }, [location])


    useEffect(() => {
        const fetchData = async () => {

            try {
                const id = groupBillId
                const response = await fetch(`${apiUrl}/ParticularLists/${id}`)
                const tripData = await response.json();
                // setRows(tripData)
                const transformedTripData = tripData.map(item => ({
                    ...item,
                    ...(groupInvoice && { InvoiceNo: groupInvoiceNumber }), // Include InvoiceNo only if groupInvoice is true
                    ...{ InvoiceDate: groupInvoiceDate }
                }));
                setRows(transformedTripData);
            }
            catch (err) {
                console.log(err, 'error');
            }
        }
        fetchData()

    }, [apiUrl, groupBillId])

    useEffect(() => {
        ReferenceNo()
            .then((data) => {
                if (data) {
                    const referenceNos = data.map(item => item.ReferenceNo);
                    setReferenceNo(referenceNos);
                } else {
                }
            })
            .catch(() => {
            });
    }, [])

    useEffect(() => {
        if (error || success || warning) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error, success, warning]);

    //------------------------------

    const handleserviceInputChange = (event, newValue) => {
        setServiceStation(newValue ? decodeURIComponent(newValue.label) : '');
    };

    const handleDateChange = (date, name) => {
        const formattedDate = dayjs(date).format('YYYY-MM-DD');
        const parsedDate = dayjs(formattedDate).format('YYYY-MM-DD');
        setBook((prevBook) => ({
            ...prevBook,
            [name]: parsedDate,
        }));
        setSelectedCustomerDatas((prevValues) => ({
            ...prevValues,
            [name]: parsedDate,
        }));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setBook((prevBook) => ({
            ...prevBook,
            [name]: value,
        }));
    };

    const [book, setBook] = useState({
        Billingdate: '',
        invoiceno: '',
        customer: '',
        fromdate: '',
        todate: '',
        station: '',
    });

    useEffect(() => {
        Organization()
            .then((data) => {
                if (data) {
                    setBankOptions(data);
                } else {
                }
            })
            .catch(() => {
            });
    }, []);

    const calculateNetAmountSum = useCallback((data) => {
        return data.reduce((sum, item) => {
            const netAmountValue = parseFloat(item.netamount, 10);
            if (isNaN(netAmountValue) || !isFinite(netAmountValue)) {
                return sum;
            }
            return sum + netAmountValue;
        }, 0);
    }, []);

    const handleKeyDown = async (event) => {
        setGroupInvoice(true)
        if (event.key === 'Enter') {
            event.preventDefault();
            try {
                const response = await axios.get(`${apiUrl}/GroupReference/${event.target.value}`);
                const GroupReference = response.data;
                setRows(GroupReference)
                const RefId = GroupReference.map((li) => li.Trip_id)
                setParticularId(RefId)
                const RefInvoiceNo = GroupReference.map((li) => li.InvoiceNo)
                setRefInvNo(RefInvoiceNo)
                const RefInvDate = GroupReference.map((li) => li.InvoiceDate)
                setRefInvDate(RefInvDate)
            }
            catch (err) {

            }
        }

        else {

        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const Tripresponse = await axios.get(`${apiUrl}/ParticularLists/${particularId}`);
                const TripDetails = await Tripresponse.data;

                const RefTripDetails = TripDetails.map(item => ({
                    ...item,
                    ...(groupInvoice && { InvoiceNo: refInvNo }), // Include InvoiceNo only if groupInvoice is true
                    ...{ InvoiceDate: refInvDate }
                }));
                setSuccess(true)
                setSuccessMessage("Successfully Listed")
                setRows(RefTripDetails)
            } catch (error) {
                console.error('Error fetching Trip data:', error);
            }
        };

        fetchData();

        // No cleanup function needed in this case
    }, [particularId]);


    const handleShow = useCallback(async () => {
        setGroupInvoice(false)
        try {
            const customerValue = encodeURIComponent(customer || selectedCustomerDatas?.customer || (tripData.length > 0 ? tripData[0].customer : ''));
            const fromDateValue = (selectedCustomerDatas?.fromdate ? dayjs(selectedCustomerDatas.fromdate) : fromDate).format('YYYY-MM-DD');
            const toDateValue = (selectedCustomerDatas?.todate ? dayjs(selectedCustomerDatas.todate) : toDate).format('YYYY-MM-DD');
            const servicestationValue = servicestation || selectedCustomerDatas?.station || (tripData.length > 0 ? tripData[0].department : '');

            const response = await axios.get(`${apiUrl}/Group-Billing`, {
                params: {
                    customer: customerValue,
                    fromDate: fromDateValue,
                    toDate: toDateValue,
                    servicestation: servicestationValue
                },
            });
            const data = response.data;

            if (Array.isArray(data) && data.length > 0) {
                setRows(data);
                const netAmountSum = calculateNetAmountSum(data);
                setTotalValue(netAmountSum);

                const roundedGrossAmount = Math.ceil(netAmountSum);
                const roundOff = roundedGrossAmount - netAmountSum;
                const roundOffValue = roundOff.toFixed(2);
                setRoundedAmount(roundOffValue);

                const sumTotalAndRounded = netAmountSum + parseFloat(roundOffValue);
                setSumTotalAndRounded(sumTotalAndRounded);

                setTripData(data);
                setSuccess(true);
                setSuccessMessage("Successfully listed");
            } else {
                setRows([]);
                setError(true);
                setErrorMessage("No data found");
            }
        } catch {
            setRows([]);
            setError(true);
            setErrorMessage("Check your Network Connection");
        }
    }, [customer, fromDate, toDate, servicestation, selectedCustomerDatas, tripData, calculateNetAmountSum, apiUrl]);


    const convertToCSV = (data) => {
        const header = columns.map((column) => column.headerName).join(",");
        const rows = data.map((row) => columns.map((column) => row[column.field]).join(","));
        return [header, ...rows].join("\n");
    };
    const handleExcelDownload = () => {
        const csvData = convertToCSV(rows);
        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
        saveAs(blob, "Group Billing.csv");
    };

    const handleCoverPDFDownload = () => {
        if (rows.length === 0) {
            setError(true);
            setErrorMessage('No data available. Please fetch data');
            return;
        }
        const coverpdfComponent = <Coverpdf tripData={tripData} totalValue={totalValue} roundedAmount={roundedAmount} sumTotalAndRounded={sumTotalAndRounded} />;
        const coverpdfHtml = ReactDOMServer.renderToString(coverpdfComponent);
        return coverpdfHtml;
    };

    const handleKeyenter = useCallback(async (event) => {

        if (event.key === 'Enter') {
            try {
                const invoiceNumber = book.invoiceno || invoiceno || selectedCustomerDatas.invoiceno;
                const response = await axios.get(`${apiUrl}/billingdata/${invoiceNumber}`);
                if (response.status === 200) {
                    const billingDetails = response.data;
                    if (billingDetails) {
                        setSelectedCustomerDatas(billingDetails);
                        setSuccess(true);
                        setSuccessMessage("Successfully listed");
                    } else {
                        setRows([]);
                        setError(true);
                        setErrorMessage("No data found");
                    }
                } else {
                    setError(true);
                    setErrorMessage(`Failed to retrieve billing details. Status: ${response.status}`);
                }
            } catch (error) {
                setError(true);
                setErrorMessage('Error retrieving billings details.', error);
            }
        }

    }, [invoiceno, book, selectedCustomerDatas, apiUrl]);

    const handleButtonClickTripsheet = (params) => {
        const data = params.row;
        console.log(data, 'data');

    };

    const handleRowSelection = (newSelectionModel) => {
        const selectedTripIds = newSelectionModel
            .filter((selectedId) => selectedId !== null)
            .map((selectedId) => {
                const selectedRow = rows.find((row) => row.id === parseInt(selectedId));
                return selectedRow ? selectedRow.tripid : null;
            })
            .filter((tripid) => tripid !== null);
        // setRowselect(selectedTripIds)


        const selectedTrips = newSelectionModel
            .filter((selectedId) => selectedId !== null)
            .map((selectedId) => {
                const selectedRow = rows.find((row) => row.id === parseInt(selectedId));
                return selectedRow ? parseInt(selectedRow.netamount) : null;
            })
            .filter((tripid) => tripid !== null);

        const tripsheetid = selectedTripIds;
        setRowSelectionModel(tripsheetid);
        setRowSelectedValues(selectedTrips)
        localStorage.setItem('selectedtripsheetid', tripsheetid);
        const selectedRowCount = selectedTripIds.length;

        localStorage.setItem('selectedrowcount', selectedRowCount);
    };


    const handlegroupData = async () => {
        const TripsCount = rowSelectionModel.length;
        let TotalAmount = 0; // Change from const to let
        rowSelectedValues?.map((li) => {
            TotalAmount += li;
        });
        const FromDate = dayjs(fromDate).format('DD-MM-YYYY')
        const ToDate = dayjs(toDate).format('DD-MM-YYYY')
        const InvoiceDate = dayjs(Billingdate).format('DD-MM-YYYY')
        if (rowSelectionModel.length === 0) {
            setError(true);
            setErrorMessage("Please select the Row");
            return;
        }
        try {
            const groupbillList = {
                Status: "Billed",
                InvoiceDate: InvoiceDate,
                Customer: customer,
                FromDate: FromDate,
                ToDate: ToDate,
                Trips: TripsCount,
                Amount: TotalAmount,
                Trip_id: rowSelectionModel,
            };

            await axios.post(`${apiUrl}/GroupBillingList`, groupbillList);
            setSuccess(true)
            setSuccessMessage("Successfully Added")
            setRows([])
        } catch (err) {
            console.log(err, "error");
        }
    }


    return {
        rows,
        error,
        success,
        warning,
        successMessage,
        errorMessage,
        warningMessage,
        book,
        handleChange,
        hidePopup,
        invoiceno,
        setInvoiceno,
        selectedCustomerDatas,
        handleKeyenter,
        customer,
        tripData,
        bankOptions,
        setCustomer,
        Billingdate,
        fromDate,
        handleDateChange,
        setFromDate,
        toDate,
        setToDate,
        servicestation,
        handleserviceInputChange,
        handleShow,
        handleExcelDownload,
        handleCoverPDFDownload,
        columns,
        rowSelectionModel,
        setRowSelectionModel,
        handleRowSelection,
        handlegroupData,
        handleButtonClickTripsheet,
        referenceNo,
        handleKeyDown

    };
};

export default useGroupbilling;