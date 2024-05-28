import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import dayjs from "dayjs";
import ReactDOMServer from 'react-dom/server';
import Coverpdf from './coverpdf/Coverpdf';
import { saveAs } from 'file-saver';
// import { Organization } from '../../billingMain/PaymentDetail/PaymentDetailData';
import { APIURL } from "../../../url";
import { useLocation } from 'react-router-dom';
import { ReferenceNo } from './RefenceNo';
import { RefPdfData } from './GroupBillingContext';
import Excel from 'exceljs';

const useGroupbilling = () => {
    const apiUrl = APIURL;

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
    const [refPdfData, setRefPdfData] = useState([])
    const [refFromDate, setRefFromDate] = useState('')
    const [refToDate, setRefToDate] = useState('')
    const [gstno, setGstno] = useState('')
    const [selectedRow, setSelectedRow] = useState([])
    const { setRefPdfPrint, setRefCustomer, setReferNo } = RefPdfData()
    const [groupBillAmount, setGroupBillAmount] = useState(0)
    const [trips, setTrips] = useState(0)
    // popup------------------------------
    const hidePopup = () => {
        setError(false);
        setSuccess(false);
        setWarning(false);
    };
    const columns = [
        { field: "id", headerName: "Sno", width: 70 },
        {
            field: groupInvoice ? "InvoiceNo" : "billingno",
            headerName: groupInvoice ? "Invoice No" : "Bill No",
            width: 150
        },
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
        { field: "guestname", headerName: "UserName", width: 150 },
    ];

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const parameterKeys = [
            "Tripid", "InvoiceNo", "InvoiceColumn", "InvoiceDate", "FromDate", "ToDate", "ReferenceNo"
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
        setRefFromDate(formData.FromDate)
        setRefToDate(formData.ToDate)
    }, [location])


    useEffect(() => {
        const fetchData = async () => {

            try {
                const id = groupBillId
                if (!id || id?.length === 0) return

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
                const response = await axios.get(`${apiUrl}/GroupReference/${invoiceno}`);
                const GroupReference = response.data;
                setRows(GroupReference)
                const RefId = GroupReference.map((li) => li.Trip_id)
                setParticularId(RefId)
                const RefInvoiceNo = GroupReference.map((li) => li.InvoiceNo)
                setRefInvNo(RefInvoiceNo)
                const RefInvDate = GroupReference.map((li) => li.InvoiceDate)
                setRefInvDate(RefInvDate)
                const ReferenceNo = GroupReference.map((li) => li.ReferenceNo)
                setReferNo(ReferenceNo)
                const Tripsid = GroupReference.map((li) => li.Trip_id)
            }
            catch (err) {
                console.log("error", err)
            }
        }
    }



    useEffect(() => {
        const fetchData = async () => {
            const id = particularId;

            try {
                if (!id || id?.length === 0) return
                console.log("id", id)
                const Tripresponse = await axios.get(`${apiUrl}/ParticularLists/${id}`);
                const TripDetails = await Tripresponse.data;

                const RefTripDetails = TripDetails.map(item => ({
                    ...item,
                    ...(groupInvoice && { InvoiceNo: refInvNo }), // Include InvoiceNo only if groupInvoice is true
                    ...{ InvoiceDate: refInvDate }
                }));
                setRows(RefTripDetails)
                setSuccess(true)
                setSuccessMessage("Successfully Listed")
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

    const handleExcelDownload = async () => {
        const workbook = new Excel.Workbook();
        const workSheetName = 'Worksheet-1';
        try {
            const fileName = "Group Billing"
            // creating one worksheet in workbook
            const worksheet = workbook.addWorksheet(workSheetName);
            const headers = Object.keys(rows[0]);
            //         console.log(headers,"hed")
            const columns = headers.map(key => ({ key, header: key }));
            //         worksheet.columns = columnsexcel
            worksheet.columns = columns;
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



        const PdfSelectedTrips = newSelectionModel
            .filter((selectedId) => selectedId !== null)
            .map((selectedId) => {
                const selectedRow = rows.find((row) => row.id === parseInt(selectedId));
                return selectedRow ? selectedRow : null;
            })
            .filter((tripid) => tripid !== null);

        const PdfSelectedcustomer = newSelectionModel
            .filter((selectedId) => selectedId !== null)
            .map((selectedId) => {
                const selectedRow = rows.find((row) => row.id === parseInt(selectedId));
                return selectedRow ? selectedRow.customer : null;
            })
            .filter((tripid) => tripid !== null);


        setRowSelectionModel(PdfSelectedTrips);
        setSelectedRow(selectedTripIds)
        setRowSelectedValues(selectedTrips)
        setRefPdfData(PdfSelectedTrips)
        setRefCustomer(PdfSelectedcustomer)
    };




    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!invoiceno) return
                console.log("invoiceno", invoiceno)
                const response = await axios.get(`${apiUrl}/GroupReference/${invoiceno}`);
                const GroupReference = response.data;
                const Amount = GroupReference.map((li) => li.Amount)
                setGroupBillAmount(Amount)
                const Trips = GroupReference.map((li) => li.Trips)
                const tripcount = parseInt(Trips)
                setTrips(tripcount)
            }
            catch (err) {
                console.log(err, 'error');
            }
        }
        fetchData()
    }, [rowSelectionModel, apiUrl, invoiceno])



    const handlePopup = () => {
        setRefPdfPrint(false)
    }
    const handleGstPdf = () => {
        setRefPdfPrint(true)
    }

    const handleRemoveData = async () => {
        const selectedIds = rowSelectionModel.map(row => row.id);
        // const tripIds = rowSelectionModel.map(row => row.tripid);
        const tripIds = rowSelectionModel.map(row => row.tripid.toString());

        // const tripid = rowSelectionModel?.map((li) => li.tripid.toString().replace(/,/g, ''));
        const tripid = rowSelectionModel?.map(li => li.tripid);
        // const tripIdArray = rowSelectionModel?.Trip_id.split(',').map(tripId => tripId.trim());


        const amounts = rowSelectionModel.map(row => row.netamount.split(',')).flat(); // Split the varchar field into an array and flatten it
        // Summing up the amounts
        const totalAmount = amounts.reduce((acc, curr) => acc + parseFloat(curr), 0);
        const Amount = groupBillAmount - totalAmount;

        const TripCount = trips - rowSelectionModel.length
        const Tripcounts = TripCount.toString()
        const groupUpdateList = {
            Trips: Tripcounts,
            Amount: Amount,
            Trip_id: tripIds
        }
        try {
            const response = await axios.post(`${apiUrl}/tripsheetstatusupdate`, {
                tripids: tripid,
                status: 'Opened',
            });
            console.log(response, 'response');
            const updatelist = await axios.put(`${apiUrl}/statusupdate`, groupUpdateList);
            console.log(updatelist, 'uplist');
            const Details = await axios.get(`${apiUrl}/getGroupList/${invoiceno}`)
            const result = Details.data;
            const tripno = result?.map((li) => li.Trip_id)
            const groupid = result?.map((li) => li.id)
            if (tripno[0] === "") {
                const getresponse = await axios.delete(`${apiUrl}/deleteGroup/${groupid}`)
                console.log(getresponse, 'Deleted Successfully');
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }

        const updatedRows = rows.filter(row => !selectedIds.includes(row.id));
        setRows(updatedRows);

        setRowSelectionModel([]);
    };


    const handlegroupData = async () => {
        const TripsCount = rowSelectionModel.length;
        let TotalAmount = 0; // Change from const to let
        rowSelectedValues?.map((li) => {
            TotalAmount += li;
        });
        const FromDate = dayjs(fromDate).format('YYYY-MM-DD')
        const ToDate = dayjs(toDate).format('YYYY-MM-DD')
        const InvoiceDate = dayjs(Billingdate).format('DD-MM-YYYY')
        if (rowSelectionModel.length === 0) {
            setError(true);
            setErrorMessage("Please select the Row");
            return;
        }
        try {
            const groupbillList = {
                status: "Billed",
                InvoiceDate: InvoiceDate,
                Customer: customer,
                FromDate: FromDate,
                ToDate: ToDate,
                Trips: TripsCount,
                Amount: TotalAmount,
                Trip_id: selectedRow,
            };
            await axios.post(`${apiUrl}/GroupBillingList`, groupbillList);
            setSuccess(true)
            setSuccessMessage("Successfully Added")
            setRows([])
        } catch (err) {
            console.log(err, "errordetails");
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
        handleKeyDown,
        handleGstPdf,
        handlePopup,
        refPdfData,
        refFromDate,
        refToDate,
        gstno,
        setGstno,
        handleRemoveData
    };
};

export default useGroupbilling;