import { useState, useEffect } from "react";
import axios from "axios";
import { APIURL } from "../../../url";
import dayjs from "dayjs";
import { ReportData } from "../Context/ReportContext";

const useBillWiseReceipt = () => {
    const [organization, setOrganization] = useState([]);
    const [accountDetails, setAccountDetails] = useState([]);
    const [billWiseReport, setBillWiseReport] = useState({
        Date: dayjs().format('YYYY-MM-DD'),
        CustomerName: "",
        AccountDetails: "",
        UniqueID: "",
    });
    const { setValue } = ReportData()
    const [totals, setTotals] = useState({
        amount: 0,
        recieved: 0,
        discount: 0,
        balance: 0,
        totalAmount: 0,
        onAccount: 0,
        totalBalance: 0,
        tds: 0,
        collectedAmount: 0,
    });
    const [pendingBillRows, setPendingBillRows] = useState([]);
    const [rows, setRows] = useState([]);
    const [selectedBillRow, setSelectedBillRow] = useState([])
    const apiUrl = APIURL;
    const [successMessage, setSuccessMessage] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false)
    const columns = [
        { field: 'sno', headerName: 'Sno', width: 70 },
        {
            field: 'BillNo',
            headerName: 'Bill No',
            type: 'number',
            width: 90,
        },
        { field: 'BillDate', headerName: 'Bill Date', width: 130 },
        { field: 'Trips', headerName: 'Trip No', width: 130 },
        { field: 'Amount', headerName: 'Bill Amt', width: 130 },
        { field: 'customeradvance', headerName: 'Recieved', width: 130 },
        { field: 'disAm', headerName: 'Dis Am', width: 130 },
        { field: 'balance', headerName: 'Balance', width: 130 },
        { field: 'billType', headerName: 'Bill Type', width: 130 },
        { field: 'uniqueId', headerName: 'Unique Id', width: 130 },
    ];

    const columnsPendingBill = [
        { field: 'sno', headerName: 'Sno', width: 70 },
        {
            field: 'BillNo',
            headerName: 'Bill No',
            type: 'number',
            width: 90,
        },
        { field: 'BillDate', headerName: 'Bill Date', width: 130 },
        { field: 'Amount', headerName: 'Amount', width: 130 },
    ];

    // Fetch all customers
    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/allCustomers`);
                const customerName = response.data.map(li => li.customer);
                setOrganization(customerName);
            } catch (error) {
                console.log('Error fetching customer data:', error);
            }
        };
        fetchCustomerData();
    }, [apiUrl]);

    // Fetch all Account Details
    useEffect(() => {
        const fetchBankDetails = async () => {
            try {
                const response = await axios.get(`${apiUrl}/getbankdetails`);
                const accountDetails = response.data.map(li => li.bankname);
                setAccountDetails(accountDetails);
            } catch (error) {
                console.log('Error fetching BankAccount data:', error);
            }
        };
        fetchBankDetails();
    }, [apiUrl]);
    const handlePendingBills = (() => {
        let currentId = 1; // Initialize the starting ID outside the function
        return async (customerName) => {
            try {
                const response = await axios.get(`${apiUrl}/customerBilledDetails`, {
                    params: { customer: customerName }
                });

                const { individualBilling = [], groupBilling = [], transferListBilling = [] } = response.data;

                const processBillingData = (data) => {
                    return data.map((item) => ({
                        BillNo: item.Invoice_No || item.InvoiceNo || item.Invoice_no,
                        BillDate: item.Bill_Date || item.InvoiceDate || item.Billdate,
                        Amount: item.Amount,
                        ...item
                    }));
                };

                const processedIndividualBilling = processBillingData(individualBilling);
                const processedGroupBilling = processBillingData(groupBilling);
                const processedTransferList = processBillingData(transferListBilling);

                const combinedPendingBill = [
                    ...processedIndividualBilling,
                    ...processedGroupBilling,
                    ...processedTransferList
                ];

                // Add the 'sno' property sequentially and include an 'id' property for the DataGrid
                const combinedPendingBillWithSnoAndId = combinedPendingBill.map((item, index) => ({
                    id: currentId++, // Unique ID for MUI DataGrid
                    sno: index + 1,  // Sequential SNO
                    ...item
                }));

                setPendingBillRows(combinedPendingBillWithSnoAndId);
                setRows([])

            } catch (error) {
                console.log(error, 'error');
            }
        };
    })();

    const handleRowSelection = (selectionModel) => {
        const selectedIDs = new Set(selectionModel);
        const selectedData = pendingBillRows.filter((row) => selectedIDs.has(row.id));
        setSelectedBillRow(selectedData);
    };

    const handleApplyBill = async () => {
        const tripid = selectedBillRow.flatMap((li) => li.Trip_id.split(',').map(Number));

        try {
            const response = await axios.get(`${apiUrl}/getTripAdvance`, {
                params: { Tripid: tripid }
            });
            const tripAdvanceData = response.data;

            // Map trip advances to the selectedBillRow
            const updatedRows = selectedBillRow.map((billRow) => {
                const tripIds = billRow.Trip_id.split(',').map(Number);
                const customerAdvance = tripIds.reduce((total, tripId) => {
                    const tripData = tripAdvanceData.find(trip => trip.tripid === tripId);
                    return total + (tripData ? Number(tripData.customeradvance) : 0);
                }, 0);

                // Calculate balance
                const balance = Number(billRow.Amount) - customerAdvance;

                return { ...billRow, customeradvance: customerAdvance, balance: balance };
            });
            setRows(updatedRows);
            const totalAmount = updatedRows.reduce((acc, row) => acc + Number(row.Amount), 0);
            const totalRecieved = updatedRows.reduce((acc, row) => acc + (Number(row.customeradvance) || 0), 0);
            const totalDiscount = updatedRows.reduce((acc, row) => acc + (Number(row.disAm) || 0), 0);
            const totalBalance = updatedRows.reduce((acc, row) => acc + (Number(row.balance) || 0), 0);
            const totalOnAccount = updatedRows.reduce((acc, row) => acc + (Number(row.onAccount) || 0), 0); // Assuming onAccount is in rows
            const totalTDS = updatedRows.reduce((acc, row) => acc + (Number(row.tds) || 0), 0); // Assuming tds is in rows
            // const collected = updatedRows.reduce((acc,row)=> acc + (Number(row.collectedAmount) || 0), 0)
            const totBalance = totalAmount - totalRecieved || 0;
            // const balance = totBalance - collected
            setTotals({
                amount: totalAmount,
                recieved: totalRecieved,
                discount: totalDiscount,
                balance: totalBalance,
                totalAmount: totBalance,
                onAccount: totalOnAccount,
                // totalBalance: balance,
                tds: totalTDS
            });
        } catch (error) {
            console.log('Error fetching trip advance data:', error);
        }
    };
    const handlechange = (event) => {
        const newTDS = Number(event.target.value) || 0; // Default to 0 if conversion fails
        // Calculate new totalAmount based on the new TDS value
        const newTotalAmount = (totals.totalAmount || 0) + (totals.tds || 0) - newTDS;

        // Update the totals state
        setTotals((prevTotals) => ({
            ...prevTotals,
            tds: newTDS,
            totalAmount: newTotalAmount,
        }));
    };

    const handleCollectedChange = (event) => {
        const collectedValue = Number(event.target.value)  // Convert to number, default to 0 if necessary
        const balance = totals.totalAmount - collectedValue || 0;

        // Update only the collectedAmount in the totals state
        setTotals((prevTotals) => ({
            ...prevTotals,
            collectedAmount: collectedValue || 0,  // Update collectedAmount with the new value
            totalBalance: balance || 0
        }));
    };

    const handleAddBillReceive = async () => {
        if (totals.collectedAmount === undefined || totals.collectedAmount === 0) {
            setError(true);
            setErrorMessage("Enter Collected Amount");
            return
        }
        // Check if AccountDetails is provided
        if (billWiseReport.AccountDetails === "") {
            setError(true);
            setErrorMessage("Enter Bank Account");
            return;  // Early return to prevent further execution
        }

        // Combine totals and billWiseReport data
        const combinedData = {
            ...totals,
            ...billWiseReport
        };

        // Format data for the API request
        const formattedData = {
            uniqueid: combinedData.UniqueID || "", // Replace with actual key if different
            CustomerName: combinedData.CustomerName,
            Account: combinedData.AccountDetails,
            Amount: combinedData.amount || 0,
            TDS: combinedData.tds,
            Advance: combinedData.recieved || 0,
            TotalAmount: combinedData.totalAmount || 0,
            BillDate: combinedData.Date,
            Collected: combinedData.collectedAmount || 0,
            TotalBalance: combinedData.totalAmount - combinedData.collectedAmount || combinedData.totalAmount
        };

        const BillNo = rows.map(li => li.BillNo);

        try {
            // Post the formatted data
            const postResponse = await axios.post(`${apiUrl}/addBillAmountReceived`, formattedData);
            console.log(postResponse.data, 'response data');

            await axios.post(`${apiUrl}/addCollect`, { collectedAmount: combinedData.collectedAmount || 0, bankname: combinedData.AccountDetails });
            setSuccess(true);
            setSuccessMessage("Successfully Added");

            if (postResponse.data) {
                const deleteResponse = await axios.delete(`${apiUrl}/deleteBillWiseReport`, { data: { BillNo } });

                if (deleteResponse.status === 200) {
                    setBillWiseReport({
                        CustomerName: "",
                        AccountDetails: "",
                        UniqueID: "",
                    });
                    setTotals({
                        amount: 0,
                        recieved: 0,
                        discount: 0,
                        balance: 0,
                        totalAmount: 0,
                        onAccount: 0,
                        totalBalance: 0,
                        tds: 0,
                        collectedAmount: 0
                    });
                    setRows([]);
                    setPendingBillRows([]);
                } else {
                    console.error('Failed to delete bill data');
                }
            }
        } catch (error) {
            console.error('Error posting bill amount received or deleting bill data:', error);
            setError(true);
            setErrorMessage('An error occurred while processing the request.');
        }
    };

    // const handleAddBillReceive = async () => {
    //     if (billWiseReport.AccountDetails === "") {
    //         setError(true);
    //         setErrorMessage("Enter Bank Account");
    //         return;  // Early return to prevent further execution
    //     }

    //     const combinedData = {
    //         ...totals,
    //         ...billWiseReport
    //     };

    //     // Create a new object with the desired key names
    //     const formattedData = {
    //         uniqueid: combinedData.UniqueID || "", // Replace with actual key if different
    //         CustomerName: combinedData.CustomerName,
    //         Account: combinedData.AccountDetails,
    //         Amount: combinedData.amount,
    //         TDS: combinedData.tds,
    //         Advance: combinedData.recieved,
    //         TotalAmount: combinedData.totalAmount,
    //         BillDate: combinedData.Date,
    //         Collected: combinedData.collectedAmount.toString(),
    //         TotalBalance: combinedData.totalAmount - combinedData.collectedAmount
    //     };

    //     const BillNo = rows.map(li => li.BillNo);

    //     try {
    //         const postResponse = await axios.post(`${apiUrl}/addBillAmountReceived`, formattedData);
    //         const collectResponse  = await axios.post(`${apiUrl}/addCollect`)
    //         console.log(postResponse.data, 'response data');
    //         setSuccess(true);
    //         setSuccessMessage("Successfully Added");

    //         if (postResponse.data) {
    //             const deleteResponse = await axios.delete(`${apiUrl}/deleteBillWiseReport`, { data: { BillNo } });
    //             console.log(deleteResponse.data, 'delete');

    //             if (deleteResponse.status === 200) {
    //                 setBillWiseReport({
    //                     CustomerName: "",
    //                     AccountDetails: "",
    //                     UniqueID: "",
    //                 });
    //                 setTotals({
    //                     amount: 0,
    //                     recieved: 0,
    //                     discount: 0,
    //                     balance: 0,
    //                     totalAmount: 0,
    //                     onAccount: 0,
    //                     totalBalance: 0,
    //                     tds: 0,
    //                     collectedAmount: 0
    //                 });
    //                 setRows([])
    //                 setPendingBillRows([]);
    //             } else {
    //                 console.error('Failed to delete bill data');
    //             }
    //         }
    //     } catch (error) {
    //         console.error('Error posting bill amount received or deleting bill data:', error);
    //     }
    // };

    useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [error, success]);
    const hidePopup = () => {
        setSuccess(false);
        setError(false);
    };

    const handlePending = () => {
        setValue("Pendingbills")
    }
    return {
        organization,
        setOrganization,
        accountDetails,
        setAccountDetails,
        billWiseReport,
        setBillWiseReport,
        handlePendingBills,
        rows,
        setRows,
        pendingBillRows,
        setPendingBillRows,
        columns,
        columnsPendingBill,
        handleApplyBill,
        handleRowSelection,
        totals,
        handlechange,
        handleAddBillReceive,
        error,
        errorMessage,
        success,
        successMessage,
        hidePopup,
        handlePending,
        handleCollectedChange
    };
};

export default useBillWiseReceipt;
