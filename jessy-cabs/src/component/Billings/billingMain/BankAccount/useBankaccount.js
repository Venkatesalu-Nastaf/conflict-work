import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { APIURL } from "../../../url";

const useBankaccount = () => {
    const apiUrl = APIURL;

    const [showAddBankForm, setShowAddBankForm] = useState(false);
    const [totalcapital, setTotalCapital] = useState(0);
    const [totalIn, setTotalIn] = useState(0);
    const [totalOut, setTotalOut] = useState(0);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [bankDetails, setBankDetails] = useState([]);
    const [popupOpen, setPopupOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [warningMessage] = useState('');
    const [info, setInfo] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [warning, setWarning] = useState(false);
    const [deleteId, setDeleteId] = useState();

    //------------------------------

    const hidePopup = () => {
        setError(false);
        setWarning(false);
        setInfo(false);
        setSuccess(false);
    };

    useEffect(() => {
        if (error || warning || info || success) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error, warning, info, success]);

    const handleAddBankClick = () => {
        setShowAddBankForm(true);
    };
    const [book, setBook] = useState({
        bankname: '',
        capital: '',
        AccountType: '',
        bankname2: '',
        netbalance: '',
        totalin: '',
        totalout: '',
    });

    const handleCancel = () => {
        setBook((prevBook) => ({
            ...prevBook,
            bankname: '',
            capital: '',
            AccountType: '',
        }));
    };

    const handleAddBank = () => {
        const bankname = book.bankname;
        const capital = book.capital;
        if (!bankname || !capital) {
            setError(true);
            setErrorMessage('Please fill in all required fields.');
            return;
        }
        const newBank = {
            bankname,
            bankname2: book.bankname,
            capital,
            netbalance: book.capital,
            totalin: book.capital,
            totalout: 0,
        };
        setBankDetails((prevBankDetails) => [...prevBankDetails, newBank]);
        fetchData();
        // setUpdatedata(true)
        setEditingIndex(null);

    };

    const handleSaveEdit = async (index, id) => {



        try {
            if (index >= 0 && index < bankDetails.length) {
                const updatedBank = bankDetails[index];

                const updateData = {
                    id: updatedBank.id,
                    bankname2: book.bankname2 || updatedBank.bankname2,
                    netbalance: updatedBank.totalin - updatedBank.totalout,
                    totalin: book.totalin || updatedBank.totalin,
                    totalout: book.totalout || updatedBank.totalout,
                };
                await axios.put(`${apiUrl}/updatebankdetails/${updatedBank.id}`, updateData);
                setSuccess(true);
                setSuccessMessage('Successfully Updated');
                setEditingIndex(null);

            } else {
            }
        } catch {
            setError(true);
            setErrorMessage('Error updating bank account. Please check your Network Connection.');
        }

    };

    const handleChange = (event, index) => {
        const { name, value } = event.target;
        const updatedBankDetails = [...bankDetails];
        setBook((prevBook) => ({
            ...prevBook,
            [name]: value,
        }));

        updatedBankDetails[index] = {
            ...updatedBankDetails[index],
            [name]: value,
        };
        setBankDetails(updatedBankDetails);
    };

    const handleAutocompleteChange = (event, newValue, name) => {
        const selectedOption = newValue ? newValue.label : '';
        setBook((prevBook) => ({
            ...prevBook,
            [name]: selectedOption,
        }));
    };

    const handleAdd = async () => {

        try {
            const newBank = {
                bankname: book.bankname,
                capital: book.capital,
                AccountType: book.AccountType,
                bankname2: book.bankname,
                netbalance: book.capital,
                totalin: book.capital,
                totalout: 0,
            };
            await axios.post(`${apiUrl}/bankdetails`, newBank);
            handleAddBank();
            handleCancel();
            // setUpdatedata(true)
        } catch {
            setError(true);
            setErrorMessage('Error adding bank account. Please check your Network Connection.');
        }

    };

    const fetchData = useCallback(async () => {

        try {
            const response = await fetch(`${apiUrl}/getbankdetails`);
            if (response.ok) {
                const data = await response.json();
                if (data.length > 0) {
                    setBankDetails(data);
                } else {
                    setBankDetails([]);
                    setError(true);
                    setErrorMessage("No data found");
                }
            } else {
            }
        } catch {
        }

    }, [apiUrl]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handlePopupClose = () => {
        setPopupOpen(false);
    }


    const handlesuredelete = () => {
        const updatedBank = bankDetails[deleteId];
        handleDeleteBank(updatedBank.id)
    }

    const handleDeleteBank = async (id) => {
        if (!id) return;

        try {
            await axios.delete(`${apiUrl}/deletebankdetails/${id}`);
            fetchData();
            handlePopupClose();
        } catch (error) {
            setError(true);
            setErrorMessage('Error deleting bank account. Please check your Network Connection.');
        }
    }; // Add dependencies as needed


    const handleDelete = (id) => {
        setPopupOpen(true);
        setEditingIndex(null);
        setDeleteId(id);


    };

    const handleEditBank = (index) => {
        setEditingIndex(index);
    };


    //calculate totalout amount
    useEffect(() => {
        const calculatedTotalOut = bankDetails.reduce((total, bankDetail) => (
            total + (parseInt(bankDetail.totalout, 10) || 0)
        ), 0) || parseInt(book.totalout, 10) || 0;
        setTotalOut(calculatedTotalOut);
    }, [bankDetails, book]);


    //calculate totalin amount
    useEffect(() => {
        const calculatedTotalIn = bankDetails.reduce((total, bankDetail) => total + (parseInt(bankDetail.totalin, 10) || parseInt(book.totalin, 10) || 0), 0);
        setTotalIn(calculatedTotalIn);
    }, [bankDetails, book]);


    useEffect(() => {
        const fetchOrganizationnames = async () => {
            try {
                const response = await axios.get(`${apiUrl}/totalCapital_from_billing`);
                const data = response.data.totalAmount
                setTotalCapital(data)

            }
            catch (error) {
                console.log(error, "error");
            }
        };
        fetchOrganizationnames()
    }, [apiUrl, totalcapital, totalIn, totalOut, book, editingIndex])

    return {
        error,
        success,
        info,
        warning,
        successMessage,
        errorMessage,
        warningMessage,
        book,
        handleChange,
        handleAdd,
        hidePopup,
        totalcapital,
        totalIn,
        totalOut,
        handleAddBankClick,
        showAddBankForm,
        handleAutocompleteChange,
        setShowAddBankForm,
        bankDetails,
        editingIndex,
        handleSaveEdit,
        handleEditBank,
        handleDelete,
        popupOpen,
        handlePopupClose,
        handleDeleteBank,
        handlesuredelete


    };
};

export default useBankaccount;