
import { useState, useEffect, useCallback } from 'react';
import dayjs from "dayjs";
import { MenuItem, Select } from '@mui/material';
import { GridCellEditStopReasons, useGridApiRef } from '@mui/x-data-grid';

// TABLE

const statusOptions = ["Complete", "Pending", "Request", "Accept"];

const columns = [
    { field: "id", headerName: "Sno", width: 70, headerAlign: 'center' },
    { field: "vendorname", headerName: "Vendor Name", width: 180, headerAlign: 'center' },
    { field: "paymentdate", headerName: "Payment Date", width: 190, headerAlign: 'center', valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY') },
    { field: "amount", headerName: "Amount", width: 180, headerAlign: 'center' },
    { field: "totaltripsheet", headerName: "Total Tripsheet", width: 180, headerAlign: 'center' },
    {
        field: "status",
        headerName: "Status",
        width: 180,
        headerAlign: 'center',
        editable: true,
        renderCell: (params) => {
            return (
                <span
                    style={{
                        display: "inline-block",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        backgroundColor:
                            params.value === "Complete" ? "#C8E6C9" :
                                params.value === "Pending" ? "#FFDAB9" :
                                    params.value === "Request" ? "#FFCDD2" :
                                        params.value === "Accept" ? "#BBDEFB" :
                                            "#E0E0E0",
                        color:
                            params.value === "Complete" ? "green" :
                                params.value === "Pending" ? "#FF8C00" :
                                    params.value === "Request" ? "#B71C1C" :
                                        params.value === "Accept" ? "#0D47A1" :
                                            "black",
                        fontWeight: "bold",
                        fontSize: "15px",
                        textAlign: "center",
                        minWidth: "80px",
                    }}
                >
                    {params.value}
                </span>
            )
        },
        renderEditCell: (params) => (
            <Select
                value={params.value}
                onChange={(e) => {
                    params.api.setEditCellValue({ id: params.id, field: params.field, value: e.target.value });
                    params.api.stopCellEditMode({ id: params.id, field: params.field, reason: GridCellEditStopReasons.enterKeyDown });
                }}
                autoFocus
                fullWidth
                variant="standard"
            >
                {statusOptions.map((status) => (
                    <MenuItem key={status} value={status}>
                        {status}
                    </MenuItem>
                ))}
            </Select>
        )
    },
];

const rowdata = [
    {
        id: 1,
        vendorname: "Surya Travels",
        paymentdate: "2025-05-14",
        amount: 1500,
        totaltripsheet: 4,
        status: "Complete",
    },
    {
        id: 2,
        vendorname: "Arun Travels",
        paymentdate: "2025-05-14",
        amount: 1000,
        totaltripsheet: 3,
        status: "Pending",
    },
    {
        id: 8,
        vendorname: "RR Travels",
        paymentdate: "2025-05-14",
        amount: 3000,
        totaltripsheet: 5,
        status: "Accept",
    },
    {
        id: 9,
        vendorname: "Pommi Travels",
        paymentdate: "2025-05-14",
        amount: 2500,
        totaltripsheet: 4,
        status: "Request",
    },
]



const useVendorPayment = () => {
   
    // const user_id = localStorage.getItem('useridno');
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedCustomerData, setSelectedCustomerData] = useState({});
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [actionName] = useState('');
    const [formData] = useState({});
    const [cerendentialdata, setCredentialData] = useState()
    const [isRateButtonLoading, setisRateButtonLoading] = useState(false);
    const [deleteratetype, setDeleteRateType] = useState(false)

    const apiRef = useGridApiRef();

    const [updateRow, setUpdateRow] = useState([]);

    
    useEffect(() => {
        if (rowdata && Array.isArray(rowdata)) {
            setUpdateRow(rowdata);
        }
    }, []);

    
    const handleCellClick = (params) => {
        if (params.field === 'status') {
            const currentMode = apiRef.current.getCellMode(params.id, params.field);
            if (currentMode === 'view') {
                apiRef.current.startCellEditMode({ id: params.id, field: params.field });
            }
        }
    };

    // handlechange-----------------
    const handleDateChange = (date, name) => {
        const formattedDate = dayjs(date).format("YYYY-MM-DD");
        const parsedDate = dayjs(formattedDate).format("YYYY-MM-DD");

        setBook((prevBook) => ({
            ...prevBook,
            [name]: parsedDate,
        }));

        setSelectedCustomerData((prevValues) => ({
            ...prevValues,
            [name]: parsedDate,
        }));
    };

    const [book, setBook] = useState({
        driverid: '',
        ratetype: '',
        ratename: '',
        active: '',
        starttime: dayjs(),
        closetime: dayjs(),
    });
   
    const handleRowClick = useCallback((params) => {
        const customerData = params.row;
        setSelectedCustomerData(customerData);
        setSelectedCustomerId(params.row.customerId);
        setIsEditMode(true);
        setCredentialData(false)
    }, []);

    return {
        selectedCustomerData,
        selectedCustomerId,
        actionName,
        book,
        handleRowClick,
        formData,
        setBook,
        columns,
        isEditMode,
        handleDateChange, cerendentialdata, isRateButtonLoading, setisRateButtonLoading, deleteratetype, setDeleteRateType,
        rowdata,
        setUpdateRow,
        updateRow,
        apiRef,
        handleCellClick
    };
};

export default useVendorPayment;