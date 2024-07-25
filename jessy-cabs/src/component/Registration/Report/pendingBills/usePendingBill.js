import { useState, useEffect } from "react";
import axios from "axios";
import { APIURL } from "../../../url";
import dayjs from "dayjs";

const usePendingBill = () => {
    const columns = [
        { field: 'id', headerName: 'S.no', width: 100 },
        { field: 'uniqueid', headerName: 'Bill No', width: 180 },
        { field: 'BillDate', headerName: 'Bill Date', width: 180 },
        { field: 'CustomerName', headerName: 'Customer Name', width: 180 },
        { field: 'TotalAmount', headerName: 'Bill Amount', width: 180 },
        { field: 'Collected', headerName: 'Collected', width: 180 },
        { field: 'TotalBalance', headerName: 'Balance', width: 180 },
        { field: 'Account', headerName: 'Account', width: 180 },

    ];
    const [pendingBill, setPendingBill] = useState({
        fromDate: dayjs().format('YYYY-MM-DD'),
        toDate: dayjs().format('YYYY-MM-DD'),
        CustomerName: "",
        TotalAmount: "",
        Balance: ""
    })
    const [organization, setOrganization] = useState([]);
    const [rows, setRows] = useState([])
    const apiUrl = APIURL;

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

    const handlechange = (event) => {
        const { name, value } = event.target;
        setPendingBill(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleFromDateChange = (date) => {
        setPendingBill((prevState) => ({
            ...prevState,
            fromDate: date.format('YYYY-MM-DD')
        }));
    };

    const handleToDateChange = (date) => {
        setPendingBill((prevState) => ({
            ...prevState,
            toDate: date.format('YYYY-MM-DD')
        }));
    };

    const handleShowAllBills = async () => {
        try {
            const { TotalAmount, Balance, ...customerData } = pendingBill;

            const response = await axios.post(`${apiUrl}/getAllBills`, {
                customerData
            });

            const bills = response.data;
            const totalAmount = bills.reduce((sum, bill) => sum + parseFloat(bill.TotalAmount), 0);
            const totalBalance = bills.reduce((sum, bill) => sum + parseFloat(bill.TotalBalance), 0);

            setPendingBill((prevState) => ({
                ...prevState,
                TotalAmount: totalAmount,
                Balance: totalBalance
            }));

            setRows(bills);
        } catch (error) {
            console.log('Error fetching all bills:', error);
        }
    };

    const handlePdfDownload = () => {

    }
    const handleExcelDownload = () => {

    }
    const handleShowPendingBills = async () => {
        try {
            const { TotalAmount, Balance, ...customerData } = pendingBill;

            const response = await axios.post(`${apiUrl}/getPendingBills`, {
                customerData
            });

            const bills = response.data;
            const totalAmount = bills.reduce((sum, bill) => sum + parseFloat(bill.TotalAmount), 0);
            const totalBalance = bills.reduce((sum, bill) => sum + parseFloat(bill.TotalBalance), 0);

            setPendingBill((prevState) => ({
                ...prevState,
                TotalAmount: totalAmount,
                Balance: totalBalance
            }));

            setRows(bills);
        } catch (error) {
            console.log('Error fetching pending bills:', error);
        }
    };


    return {
        pendingBill,
        setPendingBill,
        handlechange,
        handleFromDateChange,
        handleToDateChange,
        organization,
        handleShowAllBills,
        handleShowPendingBills,
        rows,
        columns,
        handleExcelDownload,
        handlePdfDownload
    }
}
export default usePendingBill;