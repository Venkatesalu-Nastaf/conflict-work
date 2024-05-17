import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { fetchBankOptions } from './BillingData';
import dayjs from "dayjs";
import { APIURL } from "../../../url.js";

const useBilling = () => {
    const apiUrl = APIURL;
    // const user_id = localStorage.getItem('useridno');
    const [bankOptions, setBankOptions] = useState([]);
    const [info, setInfo] = useState(false);
    const [actionName] = useState('');
    const [popupOpen, setPopupOpen] = useState(false);

    const [error, setError] = useState(false);
    const [warning, setWarning] = useState(false);
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [warningMessage] = useState({});
    // const [infoMessage, setInfoMessage] = useState({});

    const [selectedBankAccount, setSelectedBankAccount] = useState('');

    const [routeData, setRouteData] = useState('');
    const [customerData, setCustomerData] = useState('');
    const [mapimageUrl, setMapImageUrl] = useState('');
    const [GmapimageUrl, setGMapImageUrl] = useState('');

    //for popup
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


    // for pdf print
    const handleEInvoiceClick = (row) => {
        const tripid = book.tripid;
        const customer = book.customer;
        if (!tripid) {
            setError(true);
            setErrorMessage("Please enter TripID");
        } else {
            localStorage.setItem('selectedcustomerid', customer);
            setPopupOpen(true);
        }
    };

    const handlePopupClose = () => {
        setPopupOpen(false);
    };


    const emptyBookvalues = {
        tripid: "",
        billingno: "",
        invoiceno: '',
        department: "",
        Billingdate: "",
        totalkm1: "",
        totaltime: "",
        customer: "",
        supplier: "",
        startdate: "",
        totaldays: "",
        guestname: "",
        rateType: "",
        vehRegNo: "",
        trips: "",
        vehType: "",
        duty: "",
        calcPackage: "",

        package_amount: "",
        extraKM: "",
        extrakm_amount: "",
        ex_kmAmount: 0,
        extraHR: "",
        extrahr_amount: "",
        ex_hrAmount: 0,
        nightBta: "",
        nightCount: "",
        nhamount: 0,
        driverBeta: "",
        driverbeta_Count: "",
        driverBeta_amount: 0,
        OtherCharges: "",
        OtherChargesamount: 0,
        permit: "",
        parking: "",
        toll: "",
        vpermettovendor: "",
        vendortoll: "",
        minKM: "",
        minHour: "",
        GrossAmount: 0,
        AfterTaxAmount: "",
        DiscountAmount: 0,
        DiscountAmount2: "",
        customeradvance: "",
        BalanceReceivable: "",
        RoundedOff: "",
        NetAmount: 0,
        Totalamount: 0,
        paidamount: "",
        pendingamount: "",
        BankAccount: "",

    }

    const [book, setBook] = useState(emptyBookvalues);

    const handleChange = (event) => {
        const { name, value } = event.target;
        let newValue;
        const stringValues = [
            "tripid",
            "billingno",
            "invoiceno",
            "department",
            "totalkm1",
            "totaltime",
            "customer",
            "supplier",
            "totaldays",
            "guestname",
            "rateType",
            "vehRegNo",
            "trips",
            "vehType",
            "duty",
            "calcPackage",
            "BankAccount",
        ]

        const dateVlaues = ["Billingdate", "startdate"]
        if (stringValues.includes(name) || dateVlaues.includes(name)) {
            if (stringValues.includes(name)) {
                newValue = value;
            }
        }
        else {
            newValue = isNaN(Number(value)) ? value : Number(value);
        }
        setBook((prevBook) => ({
            ...prevBook,
            [name]: newValue,
            ex_kmAmount: total_extra_KMAmount({ ...prevBook, [name]: newValue }),
            ex_hrAmount: total_extra_HRAmount({ ...prevBook, [name]: newValue }),
            OtherChargesamount: total_otherCharge_Amount({ ...prevBook, [name]: newValue }),

        }));
    };


    const handleAutocompleteChange = (event, newValue, name) => {
        const selectedOption = newValue ? newValue.label : '';
        setBook((prevBook) => ({
            ...prevBook,
            [name]: selectedOption,
        }));
    }


    // fro Date 
    const handleDateChange = (date, name) => {
        const formattedDate = dayjs(date).format('YYYY-MM-DD');
        const parsedDate = dayjs(formattedDate).format('YYYY-MM-DD');
        setBook((prevBook) => ({
            ...prevBook,
            [name]: parsedDate,
        }));
    };


    // ayan functions for calculations ------
    const total_extra_KMAmount = (values) => {
        const { extrakm_amount, extraKM } = values;
        const parsedValues = [extrakm_amount, extraKM].map((value) =>
            isNaN(Number(value)) ? 0 : Number(value)
        );
        return parsedValues.reduce((mul, value) => mul * value, 1);
    }

    const total_extra_HRAmount = (values) => {
        const { extraHR, extrahr_amount } = values;
        const parsedValues = [extraHR, extrahr_amount].map((value) =>
            isNaN(Number(value)) ? 0 : Number(value));
        return parsedValues.reduce((mul, value) => mul * value, 1)
    }

    const total_Nighthalt_Amount = () => {
        const { nightBta, nightCount } = book;
        const parsedValues = [nightBta, nightCount].map((value) =>
            isNaN(Number(value)) ? 0 : Number(value)
        )
        if (parsedValues[0] > 0 && parsedValues[1] === 0) {
            return nightBta;
        }
        return parsedValues.reduce((mul, num) => mul * num, 1)
    }

    const total_DriverBEta_Amount = () => {
        const { driverBeta, driverbeta_Count } = book;
        const parsedValues = [driverBeta, driverbeta_Count].map((value) =>
            isNaN(Number(value)) ? 0 : Number(value)
        )
        if (parsedValues[0] > 0 && parsedValues[1] === 0) {
            return driverBeta;
        }
        return parsedValues.reduce((mul, num) => mul * num, 1)
    }

    const total_otherCharge_Amount = (values) => {
        const { OtherCharges } = values;
        const parsedValues = isNaN(Number(OtherCharges)) ? 0 : Number(OtherCharges)
        return parsedValues;
    }

    const total_GrossAmount = () => {
        const nhamount = total_Nighthalt_Amount() || book.nhamount;
        const { package_amount, ex_kmAmount, ex_hrAmount, driverBeta_amount, OtherChargesamount, permit, parking, toll, vpermettovendor, vendortoll } = book;
        const parsedValues = [package_amount, ex_kmAmount, ex_hrAmount, nhamount, driverBeta_amount, OtherChargesamount, permit, parking, toll, vpermettovendor, vendortoll].map((value) =>
            isNaN(Number(value)) ? 0 : Number(value)
        );
        return parsedValues.reduce((add, num) => add + num, 0);
    }

    const gst_taxAmountCalc = () => {
        const gst = customerData.gstTax || 0;
        const GrossAmount = Number(total_GrossAmount() || book.GrossAmount);
        const parsedValues = GrossAmount + (GrossAmount * (gst / 100))
        return parsedValues.toFixed(2);
    }


    const discound_PercentageCalc = () => {
        const { DiscountAmount, DiscountAmount2 } = book;
        const GrossAmount = parseFloat(total_GrossAmount() || book.GrossAmount);

        if (!DiscountAmount) {
            const discount = ((GrossAmount * DiscountAmount2) / 100).toFixed(2);
            const correctDiscount = isNaN(discount) ? 0 : discount;
            return correctDiscount;
        }
        return '';
    }

    const balanceRecivable = () => {
        const customeradvance = parseFloat(book.customeradvance || 0);
        const discountAmount = parseFloat(discound_PercentageCalc() || book.DiscountAmount || 0);
        const GrossAmount = parseFloat(total_GrossAmount() || book.GrossAmount);

        if (customeradvance || discountAmount) {
            const result = GrossAmount - (discountAmount + customeradvance)
            return result.toFixed(2);
        } else {
            return GrossAmount.toFixed(2);
        }
    }


    const roundOffCalc = () => {
        const balaceRecivable = parseFloat(balanceRecivable()) || book.BalanceReceivable || 0;
        const roundoffAmount = Math.ceil(balaceRecivable)

        if (balaceRecivable && roundoffAmount !== undefined) {
            const roundoff = roundoffAmount - balaceRecivable;
            return roundoff.toFixed(2);
        }
        return '';
    }

    const netAmountCalc = () => {
        const balaceRecivable = parseFloat(balanceRecivable()) || book.BalanceReceivable || 0;
        const roundoffAmount = Math.ceil(balaceRecivable)
        if (roundoffAmount) {
            return roundoffAmount;
        }
        return '';
    }

    const pendingAmountCalc = () => {
        const { paidamount } = book;
        const totalAmount = netAmountCalc() || book.NetAmount || 0;

        if (paidamount) {
            return (totalAmount - paidamount).toFixed(1);
        } else {
            return totalAmount;
        }
    }

    const handleCancel = () => {
        setBook(emptyBookvalues);
        setSelectedBankAccount('');
    }


    const addData = {
        ...book,
        nhamount: total_Nighthalt_Amount() || book.nhamount,
        BankAccount: selectedBankAccount || book.BankAccount,
        pendingamount: pendingAmountCalc() || book.pendingamount,
        GrossAmount: total_GrossAmount() || book.GrossAmount,
        BalanceReceivable: balanceRecivable() || book.BalanceReceivable,
        RoundedOff: roundOffCalc() || book.RoundedOff,
        NetAmount: netAmountCalc() || book.NetAmount,
        Totalamount: netAmountCalc() || book.NetAmount,
        Billingdate: book.Billingdate ? dayjs(book.Billingdate) : dayjs(),
    }

    const handleClick = async (event, actionName, tripid) => {
        event.preventDefault();
        try {
            if (actionName === 'Print') {
                handleEInvoiceClick();
            }
            else if (actionName === 'Cancel') {
                handleCancel();
            }
            else if (actionName === 'Delete') {

                await axios.delete(`${apiUrl}/billing-delete/${book.tripid}`);
                setSuccess(true);
                setSuccessMessage("Successfully Deleted");
                handleCancel();
            }
            else if (actionName === 'Edit') {

                await axios.put(`${apiUrl}/billing-edit/${book.tripid}`, addData);
                handleCancel();
                setSuccess(true);
                setSuccessMessage("Successfully Updated");
            }
            else if (actionName === 'Add') {

                if (book.tripid) {
                    await axios.post(`${apiUrl}/billing-add`, addData);
                    handleCancel();
                    setSuccess(true);
                    setSuccessMessage("Successfully Added");
                }
            }

        } catch (err) {
            setError(true);
            setErrorMessage("Check your Network Connection");
        }
    };


    // from tripsheet
    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const tripid = event.target.value;
            const loginUserName = await localStorage.getItem("username")
            try {
                if (tripid) {
                    const response = await axios.get(`${apiUrl}/tripsheet-keydown/${tripid}`, { params: { loginUserName } });
                    const bookingDetails = response.data;
                    setBook(() => ({ ...bookingDetails, rateType: customerData?.rateType }))
                } else {
                    setError(true)
                    setErrorMessage("Enter TripID")
                }
            } catch (error) {
                setError(true);
                setErrorMessage('Error retrieving booking details.');
            }
        }
    };


    // from  Billing
    const handleKeyenterBilling = useCallback(async (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            try {
                const response = await axios.get(`${apiUrl}/billing-get/${e.target.value}`);
                const bilingData = response.data;
                setSuccess(true);
                setSuccessMessage("Successfully listed");
                setBook(bilingData)
            }
            catch (error) {
                setError(true);
                setErrorMessage('Error retrieving data from billing ');
            }
        }
    }, [apiUrl])



    useEffect(() => {
        fetchBankOptions()
            .then((data) => {
                if (data) {
                    setBankOptions(data);
                } else {
                }
            })
            .catch(() => {
            });
    }, []);


    //for invoice page

    // for fetching map route data 
    useEffect(() => {
        const fetchData = async () => {
            const tripid = book.tripid;
            try {

                if (tripid !== null && tripid !== 'undefined' && tripid) {
                    const response = await fetch(`${apiUrl}/routedata-map/${encodeURIComponent(tripid)}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const routeData = await response.json();
                    setRouteData(routeData);

                }


            } catch (error) {
            }
        };
        fetchData();
    }, [apiUrl]);


    // data fetching from the customer  
    useEffect(() => {
        const fetchData = async () => {
            const customer = localStorage.getItem('selectedcustomerid');
            if (customer === null) {
                return;
            }
            try {
                if (customer) {
                    const response = await fetch(`${apiUrl}/customers/${encodeURIComponent(customer)}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const customerData = await response.json();
                    setCustomerData(customerData);
                }
            } catch {
            }
        };
        fetchData();
    }, [apiUrl]);

    // fetching signature image
    useEffect(() => {
        const fetchData = async () => {
            // const tripid = localStorage.getItem('selectedTripid');

            const tripid = book.tripid;
            try {
                if (tripid !== null && tripid !== 'undefined' && tripid) {
                    const response = await fetch(`${apiUrl}/get-signimage/${tripid}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const imageUrl = URL.createObjectURL(await response.blob());
                    setMapImageUrl(imageUrl);
                }
            } catch {
            }
        };

        fetchData();
        return () => { };
    }, [apiUrl]);

    // get map image 
    useEffect(() => {
        const fetchData = async () => {
            const tripid = book.tripid;
            try {
                // const tripid = localStorage.getItem('selectedTripid');
                if (tripid !== null && tripid !== 'undefined' && tripid) {
                    const response = await fetch(`${apiUrl}/getmapimages/${tripid}`);
                    if (response.status === 200) {
                        const responseData = await response.blob();
                        const imageUrl = URL.createObjectURL(responseData);
                        setGMapImageUrl(imageUrl);
                    } else {
                        const timer = setTimeout(fetchData, 2000);
                        return () => clearTimeout(timer);
                    }
                }
            } catch {
            }
        };
        fetchData();
    }, [apiUrl]);


    const organizationaddress1 = customerData.address1;
    const organizationaddress2 = customerData.address2;
    const organizationcity = customerData.city;
    const organizationgstnumber = customerData.gstnumber;
    const tripdepartment = book.department;
    const tripcode = book.customercode;
    const triprequest = book.request;
    const tripShedkm = book.shedkm;
    const tripshedin = book.shedin;
    const tripshedout = book.shedout;
    const tripreporttime = book.reporttime;
    const tripshedintime = book.shedintime;
    const tripadditionaltime = book.additionaltime;
    const tripstartkm = book.startkm;
    const tripclosekm = book.closekm;
    const tripstarttime = book.starttime;
    const tripclosetime = book.closetime;
    const tripstartdate = book.startdate;
    const tripclosedate = book.closedate;
    // const roundOffValue = calculateRoundOff();
    // const BalanceValue = calculatePayableAmount();
    // const TotalAmountValue = calculateroundedPayableAmount();

    const [organizationdata, setorganizationData] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const encoded = localStorage.getItem('usercompany');
            localStorage.setItem('usercompanyname', encoded);
            const storedcomanyname = localStorage.getItem('usercompanyname');
            const organizationname = decodeURIComponent(storedcomanyname);
            try {
                if (organizationname !== "undefined" && organizationname) {
                    const response = await fetch(`${apiUrl}/organizationdata/${organizationname}`);
                    if (response.status === 200) {
                        const userDataArray = await response.json();
                        if (userDataArray.length > 0) {
                            setorganizationData(userDataArray[0]);
                        }
                    } else {
                        const timer = setTimeout(fetchData, 2000);
                        return () => clearTimeout(timer);
                    }
                }
                return;
            } catch {
            }
        };
        fetchData();
    }, [apiUrl]);

    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const organizationname = localStorage.getItem('usercompany');

                if (organizationname !== "undefined" && organizationname !== undefined && organizationname) {
                    const response = await fetch(`${apiUrl}/get-companyimage/${organizationname}`);
                    if (response.status === 200) {
                        const data = await response.json();
                        const attachedImageUrls = data.imagePaths.map(path => `${apiUrl}/images/${path}`);
                        localStorage.setItem('selectedImage', JSON.stringify(attachedImageUrls));
                        setSelectedImage(attachedImageUrls);
                    } else {
                        const timer = setTimeout(fetchData, 2000);
                        return () => clearTimeout(timer);
                    }
                }

            } catch {
            }
        };
        fetchData();
    }, [apiUrl]);

    return {

        total_GrossAmount, total_DriverBEta_Amount, netAmountCalc, gst_taxAmountCalc,
        actionName,
        error,
        success,
        info,
        warning,
        successMessage,
        errorMessage,
        warningMessage,
        // infoMessage,
        book,
        handleClick,
        handleChange,
        hidePopup,
        handleKeyenterBilling,
        handleKeyDown,
        handleDateChange,
        selectedImage,
        organizationdata,
        setSelectedBankAccount,
        handleAutocompleteChange,
        selectedBankAccount,
        bankOptions,
        popupOpen,
        handlePopupClose,
        triprequest,
        tripcode,
        tripdepartment,
        routeData,
        tripShedkm,
        tripshedin,
        tripshedout,
        tripreporttime,
        tripshedintime,
        tripadditionaltime,
        tripstartkm,
        tripclosekm,
        tripstarttime,
        tripclosetime,
        tripstartdate,
        tripclosedate,
        organizationaddress1,
        organizationaddress2,
        organizationcity,
        organizationgstnumber,
        GmapimageUrl,
        mapimageUrl, total_Nighthalt_Amount, discound_PercentageCalc, balanceRecivable, roundOffCalc, pendingAmountCalc,
    };
};

export default useBilling;