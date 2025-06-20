
import { useState } from 'react';

// TABLE

const columns = [
    { field: "id", headerName: "Sno", width: 70, headerAlign: 'center' },
    // { field: "date", headerName: "Date", width: 190, headerAlign: 'center', valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY') },
    { field: "vendorname", headerName: "Vendor Name", width: 180, headerAlign: 'center' },
    { field: "trips", headerName: "Trips", width: 180, headerAlign: 'center' },
    { field: "amount", headerName: "Amount", width: 180, headerAlign: 'center', valueFormatter: (params) => `₹${params.value}`, },
    { field: "tollparking", headerName: "Toll Parking", width: 180, headerAlign: 'center', valueFormatter: (params) => `₹${params.value}`, },
    { field: "advancepayment", headerName: "Advance Payment", width: 180, headerAlign: 'center', valueFormatter: (params) => `₹${params.value}`, },
    { field: "totalkm", headerName: "TotalKM", width: 180, headerAlign: 'center', valueFormatter: (params) => `${params.value} km`, },
    // { field: "totaldays", headerName: "Total Days", width: 180, headerAlign: 'center' },
    { field: "vehiclepermit", headerName: "Vehicle Permit", width: 180, headerAlign: 'center' },
    // { field: "data", headerName: "Data", width: 180, headerAlign: 'center' },
    { field: "fuelamount", headerName: "Fuel Amount", width: 180, headerAlign: 'center', valueFormatter: (params) => `₹${params.value}`, },
];

const rowdata = [
    {
        id: 1,
        vendorname: "Arun Travels",
        trips: 15,
        amount: 1500,
        tollparking: 200,
        advancepayment: 500,
        totalkm: 120,
        vehiclepermit: "Yes",
        fuelamount: 600,
    },
    {
        id: 2,
        vendorname: "Surya Travels",
        trips: 3,
        amount: 2000,
        tollparking: 200,
        advancepayment: 500,
        totalkm: 120,
        vehiclepermit: "Yes",
        fuelamount: 600,
    },
]

const useVendorInvoice = () => {

    const [actionName] = useState('');
    const [formData] = useState({});
    const [isRateButtonLoading, setisRateButtonLoading] = useState(false);
    const [deleteratetype, setDeleteRateType] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedCustomerData, setSelectedCustomerData] = useState({});


    const handleRowClick = (params) => {
        const customer = params.row;
        const tripCount = customer.trips || 1;

        const divide = (value) => Math.round(value / tripCount);

        const trips = Array.from({ length: tripCount }, (_, i) => ({
            tripNo: i + 1,
            amount: divide(customer.amount),
            tollparking: divide(customer.tollparking),
            advancepayment: divide(customer.advancepayment),
            totalkm: divide(customer.totalkm),
            // totaldays: 1,
            vehiclepermit: customer.vehiclepermit,
            // data: customer.data,
            fuelamount: divide(customer.fuelamount),
        }));

        setSelectedCustomerData({ ...customer, trips });
        setDialogOpen(true);
    };

    return {
        selectedCustomerData,
        actionName,
        handleRowClick,
        formData,
        columns,
        isRateButtonLoading, setisRateButtonLoading, deleteratetype, setDeleteRateType,
        rowdata,
        dialogOpen,
        setDialogOpen,

    };
};

export default useVendorInvoice;