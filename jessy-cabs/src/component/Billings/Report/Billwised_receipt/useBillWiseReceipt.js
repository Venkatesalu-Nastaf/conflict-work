import { useState, useEffect } from "react";
import axios from "axios";
import { APIURL } from "../../../url";
import dayjs from "dayjs";
import { ReportData } from "../Context/ReportContext";

const useBillWiseReceipt = () => {
  const [organization, setOrganization] = useState([]);
  const [balanceAmount, setBalanceAmount] = useState(false);
  const [pendingAmountList, setPendingAmountList] = useState([]);
  const [selectMatchList, setSelectMatchList] = useState([]);
  const [accountDetails, setAccountDetails] = useState([]);
  const [invoiceNo, setInvoiceNo] = useState([])
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedTripId,setSelectedTripId] = useState("")
  const [billWiseReport, setBillWiseReport] = useState({
    Date: dayjs(),
    CustomerName: "",
    AccountDetails: "",
    UniqueID: "",
  });
  const { setValue } = ReportData();
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
    Trips: 0
  });
  const [voucherID, setVoucherID] = useState("")
  const [pendingBillRows, setPendingBillRows] = useState([]);
  const [rows, setRows] = useState([]);
  const [selectedBillRow, setSelectedBillRow] = useState([]);
  const apiUrl = APIURL;
  const [successMessage, setSuccessMessage] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const columns = [
    { field: "sno", headerName: "Sno", width: 50 },
    {
      field: "Invoice_no",
      headerName: "Invoice No",
      type: "number",
      width: 90,
    },
    {
      field: "BillNo",
      headerName: "Group Trip No",
      type: "number",
      width: 120,
    },
    { field: "BillDate", headerName: "Bill Date", width: 130 },
    { field: "Trips", headerName: "Trip No", width: 100 },
    { field: "Amount", headerName: "Bill Amt", width: 130 },
    { field: "customeradvance", headerName: "Recieved", width: 130 },
    { field: "balance", headerName: "Balance", width: 130 },
    { field: "billType", headerName: "Bill Type", width: 130 },
    { field: "uniqueId", headerName: "Unique Id", width: 130 },
  ];

  const columnsPendingBill = [
    { field: "sno", headerName: "Sno", width: 30 },
    { field: "Invoice_no", headerName: "Invoice No", type: "number", width: 80 },
    balanceAmount
      ? {
        field: "Voucherid",
        headerName: "Voucher ID",
        type: "number",
        width: 100,
      }

      : { field: "BillNo", headerName: "Group Trip No", type: "number", width: 110 },

    {
      field: "BillDate",
      headerName: "Bill Date",
      width: 120,
      valueFormatter: (params) => dayjs(params.value).format('DD-MM-YYYY'),
    },
    { field: "Amount", headerName: "Amount", width: 120 },
  ];

  // Fetch all customers
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/allCustomers`);
        const customerName = response.data.map((li) => li.customer);
        setOrganization(customerName);
      } catch (error) {
        console.log("Error fetching customer data:", error);
      }
    };
    fetchCustomerData();
  }, [apiUrl]);

  // Fetch all Account Details
  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const response = await axios.get(`${apiUrl}/getbankdetails`);
        const accountDetails = response.data.map((li) => li.bankname);
        setAccountDetails(accountDetails);
      } catch (error) {
        console.log("Error fetching BankAccount data:", error);
      }
    };
    fetchBankDetails();
  }, [apiUrl]);
  // const handlePendingBills = async() => {
  //   if(billWiseReport.CustomerName===""){
  //     setError(true)
  //     setErrorMessage('Please Enter Customer')
  //     return
  //   }
  //   let currentId = 1;
  //   return async (customerName) => {
  //     try {
  //       const response = await axios.get(`${apiUrl}/customerBilledDetails`, {
  //         params: { customer: customerName },
  //       });
  //       setBalanceAmount(false);

  //       const {
  //         individualBilling = [],
  //         groupBilling = [],
  //         transferListBilling = [],
  //       } = response.data;

  //       const processBillingData = (data) => {
  //         return data.map((item) => ({
  //           BillNo: item.Invoice_No || item.InvoiceNo || item.Invoice_no,
  //           BillDate: item.Bill_Date || item.InvoiceDate || item.Billdate,
  //           Amount: item.Amount,
  //           ...item,
  //         }));
  //       };

  //       const processedIndividualBilling =
  //         processBillingData(individualBilling);
  //       const processedGroupBilling = processBillingData(groupBilling);
  //       const processedTransferList = processBillingData(transferListBilling);

  //       const combinedPendingBill = [
  //         ...processedIndividualBilling,
  //         ...processedGroupBilling,
  //         ...processedTransferList,
  //       ];
  //       console.log(combinedPendingBill, 'combined');
  //       const invoice = combinedPendingBill.map(li => li.BillNo)
  //       console.log(invoice, 'iiiiiiiiiiii');

  //       setInvoiceNo(invoice)

  //       const combinedPendingBillWithSnoAndId = combinedPendingBill.map(
  //         (item, index) => ({
  //           id: currentId++, // Unique ID for MUI DataGrid
  //           sno: index + 1, // Sequential SNO
  //           ...item,
  //         })
  //       );
  //       console.log(combinedPendingBillWithSnoAndId, 'ccccccc');
  //       if (combinedPendingBillWithSnoAndId.length === 0) {
  //         setError(true)
  //         setErrorMessage('No Data Found')
  //         return
  //       }
  //       setPendingBillRows(combinedPendingBillWithSnoAndId);
  //       setSuccess(true)
  //       setSuccessMessage('Successfully Listed')
  //       setRows([]);
  //       setTotals({
  //         amount: 0,
  //         recieved: 0,
  //         discount: 0,
  //         balance: 0,
  //         totalAmount: 0,
  //         onAccount: 0,
  //         totalBalance: 0,
  //         tds: 0,
  //         collectedAmount: 0,
  //       });
  //     } catch (error) {
  //       console.log(error, "error");
  //     }
  //   };
  // };
  const handlePendingBills = async () => {
    if (billWiseReport.CustomerName === "") {
      setError(true);
      setErrorMessage("Please Enter Customer");
      return;
    }
    const customer = billWiseReport.CustomerName;

    let currentId = 1;
    try {
      const response = await axios.get(`${apiUrl}/customerBilledDetails`, {
        params: { customer: billWiseReport.CustomerName },
      });
      console.log(response, 'pending response');
      setBalanceAmount(false);

      const {
        individualBilling = [],
        groupBilling = [],
        transferListBilling = [],
      } = response.data;

      const processBillingData = (data) => {
        return data.map((item) => ({
          BillNo: item.Invoice_No || item.ReferenceNo || item.Grouptrip_id,
          BillDate: item.Bill_Date || item.InvoiceDate || item.Billdate,
          Amount: item.Amount,
          ...item,
        }));
      };

      const processedIndividualBilling = processBillingData(individualBilling);
      const processedGroupBilling = processBillingData(groupBilling);
      const processedTransferList = processBillingData(transferListBilling);

      const combinedPendingBill = [
        ...processedIndividualBilling,
        ...processedGroupBilling,
        ...processedTransferList,
      ];

      const invoice = combinedPendingBill.map((li) => li.BillNo);
      setInvoiceNo(invoice);
      const combinedPendingBillWithSnoAndId = combinedPendingBill.map((item, index) => ({
        id: index + 1, // Assign a unique ID based on the array index
        sno: index + 1, // Sequential SNO
        ...item, // Include all other properties from the original item
      }));
      console.log(combinedPendingBillWithSnoAndId,"checkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
      
      if (combinedPendingBillWithSnoAndId.length === 0) {
        setError(true);
        setPendingBillRows([])
        setErrorMessage("No Data Found");
        return;
      }

      setPendingBillRows(combinedPendingBillWithSnoAndId);
      setSuccess(true);
      setSuccessMessage("Successfully Listed");
      setRows([]);
      setTotals({
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
    } catch (error) {
      // console.log(error, "error");
      console.log(error, "pending error");
    }
  };

  const handleRowSelection = (selectionModel) => {    
    if (balanceAmount === true) {
      if (selectionModel.length > 0) {
        const selectedID = selectionModel[selectionModel.length - 1]; // Get the last selected row
        console.log(selectedID, "selected ID", balanceAmount);

        setSelectedRows([selectedID]); // Store only the last selected row

        const selectedData = pendingBillRows.filter((row) => row.id === selectedID); // Direct comparison
        const selectedInvoiceNo = selectedData.map(li => li.BillNo);
        console.log(selectionModel,"checkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk------------",selectedData);

        setSelectedBillRow(selectedData);
        
        setInvoiceNo(selectedInvoiceNo);
      } else {
        setSelectedRows([]);
        setSelectedBillRow([]);
        setInvoiceNo([]);
      }
    } else {
      setSelectedRows(selectionModel);

      const selectedIDs = new Set(selectionModel);
      console.log(selectedIDs, "selected IDs", balanceAmount);

      const selectedData = pendingBillRows.filter((row) => selectedIDs.has(row.id)); // Use `.has()` with Set
      const selectedInvoiceNo = selectedData.map(li => li.BillNo);
      const tripIds = selectedData
      .map(row => row.Trip_id)              // get all Trip_id strings
      .join(",")                            // join them into a single comma-separated string
      .split(",")                           // split by comma
      .map(id => id.trim())                 // clean up extra spaces if any
      .filter(id => id);                    // remove any empty strings
    
    console.log(tripIds, "final Trip_id array check");
    setSelectedTripId(tripIds)
      setSelectedBillRow(selectedData);
      setInvoiceNo(selectedInvoiceNo);
    }
  };

  // const handleRowSelection = (selectionModel) => {
  //   if (balanceAmount === true) {
  //     const selectedIDs = selectionModel[selectionModel.length - 1]; // Get the last selected row
  //     console.log(selectedIDs,"selectidddddd",balanceAmount);
  //     setSelectedRows([selectedIDs]); // Update selection state

  //     const selectedData = pendingBillRows.filter((row) =>
  //       selectedIDs?.includes(row.id) // Use includes() instead of has()
  //     );

  //     const selectedInvoiceNo = selectedData.map(li => li.BillNo);

  //     setSelectedBillRow(selectedData);
  //     setInvoiceNo(selectedInvoiceNo);
  //   }
  //   else{
  //     setSelectedRows(selectionModel); 
  //   const selectedIDs = new Set(selectionModel);
  //   console.log(selectedIDs,"selectidddddd22222",balanceAmount);
  //   const selectedData = pendingBillRows.filter((row) =>
  //     selectedIDs.has(row.id)
  //   );
  //   const selectedInvoiceNo = selectedData.map(li => li.BillNo)
  //   setSelectedBillRow(selectedData);
  //   setInvoiceNo(selectedInvoiceNo)
  // }

  // };

  const handleApplyBill = async () => {
    console.log(selectedBillRow,"selectedbillrowwwwwwwwwwwwwwwwwwwwww");

    if (selectedBillRow.length === 0 || selectedBillRow.length === undefined) {
      setError(true)
      setErrorMessage("Select The Row")
      return
    }
    if (balanceAmount === false) {
      const tripid = selectedBillRow.flatMap((li) =>
        li.Trip_id.split(",").map(Number)
      );

      if (tripid.length === 0) {
        setError(true);
        setErrorMessage("Select the data");
        return;
      }


      try {
        const response = await axios.get(`${apiUrl}/getTripAdvance`, {
          params: { Tripid: tripid },
        });

        const tripAdvanceData = response.data;

        // Map trip advances to the selectedBillRow
        const updatedRows = selectedBillRow.map((billRow) => {
          const tripIds = billRow.Trip_id.split(",").map(Number);
          const customerAdvance = tripIds.reduce((total, tripId) => {
            const tripData = tripAdvanceData.find(
              (trip) => trip.tripid === tripId
            );
            return total + (tripData ? Number(tripData.customeradvance) : 0);
          }, 0);

          // Calculate balance
          const balance = Number(billRow.Amount) - customerAdvance;

          return {
            ...billRow,
            customeradvance: customerAdvance,
            balance: balance,
          };
        });

        setRows(updatedRows);
        const totalAmount = updatedRows.reduce(
          (acc, row) => acc + Number(row.Amount),
          0
        );
        const totalRecieved = updatedRows.reduce(
          (acc, row) => acc + (Number(row.customeradvance) || 0),
          0
        );
        const totalDiscount = updatedRows.reduce(
          (acc, row) => acc + (Number(row.disAm) || 0),
          0
        );
        const totalBalance = updatedRows.reduce(
          (acc, row) => acc + (Number(row.balance) || 0),
          0
        );
        const totalOnAccount = updatedRows.reduce(
          (acc, row) => acc + (Number(row.onAccount) || 0),
          0
        ); // Assuming onAccount is in rows
        const totalTDS = updatedRows.reduce(
          (acc, row) => acc + (Number(row.tds) || 0),
          0
        ); // Assuming tds is in rows
        const totBalance = totalAmount - totalRecieved || 0;
        // const balance = totBalance - collected
        setTotals({
          amount: totalAmount,
          recieved: totalRecieved,
          collectedAmount:totalAmount,
          discount: totalDiscount,
          balance: totalBalance,
          totalAmount: totBalance,
          onAccount: totalOnAccount,
          totalBalance: 0,
          tds: totalTDS,
          Trips: tripid.length
        });
      } catch (error) {
        console.log("Error fetching trip advance data:", error);
      }
    } else {
      const selectList = selectedBillRow.map((li) => li.Voucherid);

      const matchedRows = pendingAmountList.filter((item) =>
        selectList.includes(item.voucherID)
      );

      setSelectMatchList(matchedRows);
      const updatedRows = matchedRows.map((row, index) => ({
        sno: index + 1,
        id: row.voucherID,
        BillNo: row.voucherID,
        Amount: row.TotalAmount,
        BillDate: row.BillDate,
        customeradvance: row.Collected,
        TotalAmount: row.TotalAmount,
        balance: row.TotalBalance,
        uniqueId: row.uniqueid,
        Trips: row.Trips
      }));
      setVoucherID(updatedRows.length > 0 ? updatedRows[0].BillNo : null);
      const Account = matchedRows.map((li) => li.Account);
      setBillWiseReport((prevState) => ({
        ...prevState,
        AccountDetails: Account[0] || "",
      }));
      const TotalAmount = matchedRows.map((li) => Number(li.TotalBalance));

      const totalSum = TotalAmount.reduce((acc, curr) => acc + curr, 0);
      setTotals((prevState) => ({
        ...prevState,
        totalAmount: totalSum,
      }));

      setRows(updatedRows);
    }
  };

  useEffect(() => {
    if (totals.collectedAmount > totals.totalAmount) {
      setTotals((prevTotals) => ({
        ...prevTotals,
        collectedAmount: totals.totalAmount,
        totalBalance: 0
      }));
    }
    if (totals.tds > totals.totalAmount) {
      setTotals((prevTotals) => ({
        ...prevTotals,
        // tds:totals.totalAmount,
        tds: 0,
        totalBalance: 0,
        collectedAmount: totals.totalAmount
      }));
    }
    if (totals.collectedAmount === 0) {
      setTotals((prevTotals) => ({
        ...prevTotals,
        tds: 0
      }));
    }
  }, [totals])



  const handlechange = (event) => {

    // if (totals.collectedAmount === 0 || totals.collectedAmount === undefined) {
    //   setError(true)
    //   setErrorMessage("Enter Collected Amount")
    //   return
    // }

    if ((totals.collectedAmount < 0) || (totals.collectedAmount > totals.totalAmount)) {
      setTotals((prevTotals) => ({
        ...prevTotals,
        collectedAmount: totals.totalAmount,
        totalBalance: 0
      }));
      return
    }
    const newTDS = Number(event.target.value) || 0; // Default to 0 if conversion fails
    // Calculate new totalAmount based on the new TDS value
    const newTotalAmount =
      (totals.totalAmount || 0) + (totals.tds || 0) - newTDS;

    const newCollectedAmount = (totals.collectedAmount || 0) + (totals.tds || 0) - newTDS

    // Update the totals state
    setTotals((prevTotals) => ({
      ...prevTotals,
      tds: newTDS,
      collectedAmount: newCollectedAmount,
      // totalAmount: newTotalAmount,
    }));
  };

  const handleCollectedChange = (event) => {
    const collectedValue = Number(event.target.value); // Convert to number, default to 0 if necessary
    const balance = totals.totalAmount - collectedValue || 0;

    // Update only the collectedAmount in the totals state
    setTotals((prevTotals) => ({
      ...prevTotals,
      collectedAmount: collectedValue || 0, // Update collectedAmount with the new value
      totalBalance: balance || 0,
    }));
  };

  const handleAddBillReceive = async () => {
    if (totals.collectedAmount === 0 || totals.collectedAmount === undefined) {
      setError(true)
      setErrorMessage("Enter Collected Amount")
      return
    }
    if (balanceAmount === true) {

      // if (totals.totalBalance === 0 && totals.collectedAmount !== 0) {
      const uniqueVoucherId = selectedBillRow?.map((li) => li.Voucherid);
      const CollectAmount = selectMatchList?.map((li) => li.Collected);
      const TotalCollectAmount = selectMatchList?.map((li) => li.TotalCollected);
      const BalanceAmount = selectMatchList?.map((li) => li.TotalBalance)
      const combinedData = {
        ...totals,
        ...billWiseReport,
      };
      const finalTotalColletedAmount = parseInt(CollectAmount[0] || 0) + totals.collectedAmount;
      const finalTotalBalanceAmount = parseInt(BalanceAmount[0] || 0) - totals.collectedAmount;
      const finalTdsPlusCollected = parseInt(TotalCollectAmount[0] || 0) + totals.collectedAmount;
      try {
        // First, this PUT request will be executed and awaited
        const response = await axios.put(`${apiUrl}/updateBalanceAmount`, {
          uniqueVoucherId,
          finalTotalColletedAmount,
          finalTotalBalanceAmount,
          finalTdsPlusCollected
        });
        // Only after the PUT request finishes, this POST request will execute
        await axios.post(`${apiUrl}/addCollect`, {
          collectedAmount: combinedData.collectedAmount || 0,
          bankname: combinedData.AccountDetails,
        });
        // Display success message after both requests complete
        setSuccess(true);
        setSuccessMessage("Successfully Added");

        // Logging and state updates occur after both requests have completed
        console.log(response.data.message);
        setRows([]);
        setPendingBillRows([]);
        setTotals({
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
        setBillWiseReport({
          CustomerName: "",
          AccountDetails: "",
          UniqueID: "",
        });
      } catch (error) {
        console.error(
          "Failed to update balance amount:",
          error.response?.data?.error || error.message
        );
      }
      // }
    } else {
      if (
        totals.collectedAmount === undefined ||
        totals.collectedAmount === 0
      ) {
        setError(true);
        setErrorMessage("Enter Collected Amount");
        return;
      }
      // Check if AccountDetails is provided
      if (billWiseReport.AccountDetails === "") {
        setError(true);
        setErrorMessage("Enter Bank Account");
        return; // Early return to prevent further execution
      }

      // Combine totals and billWiseReport data
      const combinedData = {
        ...totals,
        ...billWiseReport,
      };

      // try {
      //   // Your logic for handling the non-balanceAmount case goes here

      //   // Display success message after successful handling
      //   setSuccess(true);
      //   setSuccessMessage("Successfully Added");
      // } catch (error) {
      //   console.error("An error occurred:", error);
      // }
      const FullCollectedAmount = combinedData?.collectedAmount + combinedData?.tds;

      // Format data for the API request
      const formattedData = {
        uniqueid: combinedData.UniqueID || "", // Replace with actual key if different
        CustomerName: combinedData.CustomerName,
        Account: combinedData.AccountDetails,
        Amount: combinedData.amount || 0,
        TDS: combinedData.tds,
        Advance: combinedData.recieved || 0,
        TotalAmount: combinedData.totalAmount || 0,
        BillDate: dayjs(combinedData.Date).format('YYYY-MM-DD'),
        // BillDate: combinedData.Date,
        Collected: totals.collectedAmount,
        TotalCollected: FullCollectedAmount,
        TotalBalance: combinedData.totalBalance,
        Trips: combinedData.Trips,
        //   combinedData.totalAmount - combinedData.collectedAmount ||
        //   combinedData.totalAmount,
      };

      const BillNo = rows.map((li) => li.BillNo);

      try {
        // Post the formatted data
        const postResponse = await axios.post(
          `${apiUrl}/addBillAmountReceived`,
          formattedData
        );
        console.log(postResponse.data, "response data");

        await axios.post(`${apiUrl}/updateInvoiceStatus`, {
          invoiceNo: invoiceNo
        })
        await axios.post(`${apiUrl}/addCollect`, {
          collectedAmount: FullCollectedAmount || 0,
          bankname: combinedData.AccountDetails,
        });
        await axios.post(`${apiUrl}/updateTripsheetForAmountReceived`,{
          Trip_id : selectedTripId
        })
        setSuccess(true);
        setSuccessMessage("Successfully Added");

        // if (postResponse.data) {
        //   const deleteResponse = await axios.delete(
        //     `${apiUrl}/deleteBillWiseReport`,
        //     { data: { BillNo } }
        //   );

        // if (deleteResponse.status === 200) {
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
          collectedAmount: 0,
        });
        setRows([]);
        setPendingBillRows([]);
      }
      //  else {
      //   console.error("Failed to delete bill data");
      // }
      // }
      // }
      catch (error) {
        console.error(
          "Error posting bill amount received or deleting bill data:",
          error
        );
        setError(true);
        setErrorMessage("An error occurred while processing the request.");
      }
    }
  };

  // Balance Amount Collect
  const handleBalanceAmount = async () => {
    setTotals({
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
    setRows([]);
    setBalanceAmount(true);
    const organization = billWiseReport.CustomerName;

    try {
      const response = await axios.post(`${apiUrl}/getBalanceAmount`, {
        organization,
      });
      const pendingList = response.data;

      setPendingAmountList(response.data);
      const BillNo = pendingList?.map((li) => li.voucherID);
      const BillDate = pendingList?.map((li) => li.BillDate);
      const pendingAmount = pendingList.map((li) => li.TotalBalance);
      const newPendingBillRows = BillNo.map((voucherID, index) => ({
        id: index + 1, // Assign a unique ID to each row
        sno: index + 1, // Assign sequential serial numbers
        Voucherid: voucherID,
        BillDate: BillDate[index],
        Trips: pendingList.length,
        Amount: pendingAmount[index],
      }));

      // Update the state with the new rows
      setPendingBillRows(newPendingBillRows);
    } catch (error) {
      console.log(error, "error fetching balance amount");
    }
  };

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
    setValue("Pendingbills");
  };
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
    handleCollectedChange,
    handleBalanceAmount,
    voucherID,
    selectedRows
  };
};

export default useBillWiseReceipt;
