import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { fetchBankOptions } from './BillingData';
import dayjs from "dayjs";
import { APIURL } from "../../../url.js";
import { PdfData } from '../../Transfer/TransferReport/PdfContext.js';
import { useLocation } from "react-router-dom";

const useBilling = () => {
    const apiUrl = APIURL;
    const location = useLocation();
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
    const [selectedBankAccount, setSelectedBankAccount] = useState('');
    const [routeData, setRouteData] = useState('');
    const [customerData, setCustomerData] = useState('');
    const [mapimageUrl, setMapImageUrl] = useState('');
    const [GmapimageUrl, setGMapImageUrl] = useState('');
    const [edit,setEdit]=useState(false)
    const [selectbillingdata,setselectBillingData]=useState({})
    const [billingdate,setBillingDate]=useState()
    const [invoiceno,setInvoiceNo]=useState();
    const[invoicestate,setINvoicestate]=useState('')
    const dataempty = Number(localStorage.getItem("searchdataurl"))
    const [stateDetails, setStateDetails] = useState([]);
    const [billadd,setBillAdd]=useState(false)
    const [dataotherStations,setDataOtherStations]=useState([])
    const [datastate,setDataState]=useState('')

    const { setParticularPdf, setParticularRefNo,setIndividualBilled, individualBilled } = PdfData();

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
    // const handleEInvoiceClick = (row) => {
    //     const tripid = book.invoiceno;
    //     if (!tripid) {
    //         setError(true);
    //         setErrorMessage("Please enter Invoice No");
    //     } else {
    //         setParticularRefNo()
    //         setParticularPdf(true);
    //     }
    // };

   



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
        totalcalcAmount: 0
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



    const memoizedCustomer = useMemo(() => book?.customer, [book?.customer]);
    // const fetchDataOtherStations = async()=>{
    //     try{
    //             const response = await axios.get(`${apiUrl}/customerdatgst/${encodeURIComponent(memoizedCustomer)}`);
             
    //             const data=response.data;
    //            setDataOtherStations(data)

    //             // console.log(response,'Response datas ',customerData)
    //         }
    //      catch (error) {
    //         console.error('Error fetching customer data:', error);
    //     }
    // };

    useEffect(() => {
        const fetchDataOtherStations = async () => {
            try {
                if (memoizedCustomer) {
                    const response = await axios.get(`${apiUrl}/customerdatgst/${encodeURIComponent(memoizedCustomer)}`);
             
                    const data=response.data;
                   setDataOtherStations(data)

                    // console.log(response,'Response datas ',customerData)
                }
            } catch (error) {
                console.error('Error fetching customer data:', error);
            }
        };

        fetchDataOtherStations();
    }, [memoizedCustomer, apiUrl]);
    
    // console.log(dataotherStations,"llll")

    
    const handleEInvoiceClick = (row) => {
        // const tripid = book.invoiceno || invoicestate;
        const tripid = book.tripid
        // if (!tripid) {
        //     setError(true);
        //     setErrorMessage("Please enter Invoice No");
        // } else {
        setPopupOpen(true)
          
            setParticularRefNo(tripid)
            setParticularPdf(true);
        // }
    };


    const handleAutocompleteChange = (event, newValue, name) => {
        const selectedOption = newValue ? newValue.label : '';
        setBook((prevBook) => ({
            ...prevBook,
            [name]: selectedOption,
        }));
    }

    // from Date 
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
        // const { package_amount, ex_kmAmount, ex_hrAmount, driverBeta_amount, OtherChargesamount, permit, parking, toll, vpermettovendor, vendortoll } = book;
        const { package_amount, ex_kmAmount, ex_hrAmount, driverBeta_amount, OtherChargesamount, permit, parking, toll,} = book;
        // const parsedValues = [package_amount, ex_kmAmount, ex_hrAmount, nhamount, driverBeta_amount, OtherChargesamount, permit, parking, toll, vpermettovendor, vendortoll].map((value) =>
            const parsedValues = [package_amount, ex_kmAmount, ex_hrAmount, nhamount, driverBeta_amount, OtherChargesamount].map((value) =>
            isNaN(Number(value)) ? 0 : Number(value)
        );
        return parsedValues.reduce((add, num) => add + num, 0);
    }

    const gst_taxAmountCalc = () => {
        // const gst = customerData.gstTax || 0;
        const gst = dataotherStations?.data || 0;
    
        const GrossAmount = Number(total_GrossAmount() || book.GrossAmount||0);
    
        // const parsedValues = GrossAmount + (GrossAmount * (gst / 100))
        const parsedValues = GrossAmount * (gst / 100)
    
        return parsedValues.toFixed(2);
    }

const hanldetollpark = () => {
    const {permit, parking, toll} = book;
   
    
        // Ensure the values are numbers and sum them up
        const totalAmount = (parseFloat(permit) || 0) + (parseFloat(parking) || 0) + (parseFloat(toll) || 0);
    
        return totalAmount;
  
}

const handlefullTotalAmount = () => {
   

        // Calculate the total gross amount
        const grossAmount = total_GrossAmount();
    
        // Calculate the GST tax amount
        const gstTaxAmount = gst_taxAmountCalc();
    
        // Calculate the toll and parking amount
        const tollParkAmount = hanldetollpark();
    
        // Sum the total gross amount, GST tax amount, and toll/parking amount
        const totalAmount = grossAmount + parseFloat(gstTaxAmount) + tollParkAmount;
    
        return totalAmount.toFixed(2); // Return the total amount with two decimal points
    };
    




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
        console.log(customeradvance,"advance",discound_PercentageCalc())
        const discountAmount = parseFloat(discound_PercentageCalc() || book.DiscountAmount || 0);
        // console.log(discountAmount,"disca",total_GrossAmount())
        const GrossAmount = parseFloat(total_GrossAmount() || book.GrossAmount || 0);
        // console.log(GrossAmount,"grosssbalance")

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
        setCustomerData('')
        setBillingDate()
        setInvoiceNo()
        setDataState("");


    }
    const handleserviceInputChange =(event,newValue)=>{
        setDataState(newValue ? decodeURIComponent(newValue.label) : "");
    }


    // const customerMotherdatagroupstation = async(customer)=>{
    //     console.log(customer,"enetr")
    //     try{
    //         const resultresponse = await axios.get(`${apiUrl}/customerdatamothergroup/${customer}`)
    //         const datas =resultresponse.data;
    //         return datas
          
    //     }
    //     catch(err){
         
    //     }
    // }

    const customerMotherdatagroupstation = async(customer)=>{
        console.log(customer,"enetr")
        try{
            const resultresponse = await axios.get(`${apiUrl}/customerinvoicecreate/${customer}`)
            const datas = resultresponse.data;
            return datas
          
        }
        catch(err){
         
        }
    }
    // const addData = {
    //     ...book,
    //     nhamount: total_Nighthalt_Amount() || book.nhamount,
    //     BankAccount: selectedBankAccount || book.BankAccount,
    //     pendingamount: pendingAmountCalc() || book.pendingamount,
    //     GrossAmount: total_GrossAmount() || book.GrossAmount,
    //     BalanceReceivable: balanceRecivable() || book.BalanceReceivable,
    //     RoundedOff: roundOffCalc() || book.RoundedOff,
    //     NetAmount: netAmountCalc() || book.NetAmount,
    //     Totalamount: netAmountCalc() || book.NetAmount,
    //     Billingdate: book.Billingdate ? dayjs(book.Billingdate) : dayjs(),
    // }

     const dataget = async (bookingno,statedata) => {
    const bookdatano = bookingno
   
    if(bookingno !== null){
     
        // const responsedata = await axios.get(`${apiUrl}/getdatafromtripsheetvaluebilling/${bookdatano}/${statedata}`)
    const responsedata = await axios.get(`${apiUrl}/getdatafromtripsheetvaluebilling/${bookdatano}/${statedata}`)
    const bookingDetails = responsedata.data[0]; 
    setBillingDate(bookingDetails.Bill_Date)
    setDataState(bookingDetails.State)
   setBook(() => ({ ...bookingDetails }));

    }
    else{
       
        setBook(() => ({  }));
    }
  }
//   console.log(invoiceno,"jsss")
 
    useEffect(() => {
         const params = dataempty === 0 ? new URLSearchParams(location.search): new URLSearchParams();
        const dispath = params.get("dispatchcheck")
        // const tripid = params.get("tripid");
        const billingdate1 = params.get("Billingdate");
        const Invoicedata = params.get("Invoicedata")
        const statedata = params.get("State")
        // console.log(Invoicedata,"PPPs")
        if (dispath && dataempty === 0) {
            // dataget(tripid,statedata)
            dataget(Invoicedata,statedata)
            setEdit(true)
            setBillingDate(billingdate1)
            // console.log(Invoicedata,"eetr")
            setInvoiceNo(Invoicedata)
            setINvoicestate(Invoicedata)
            setIndividualBilled(false)
        }
        else{
            dataget(null)
            setEdit(false)
            setBillingDate('')
            setInvoiceNo('')
        }
       
    }, [location,dataempty]);
    
      useEffect(() => {
        window.history.replaceState(null, document.title, window.location.pathname);
    },[]);
    window.addEventListener('click', (event) => {
        const clickedText = event.target.textContent || event.target.innerText;
        if (clickedText === "Individual Billing" || clickedText === "BankAccount Details" ) {
           
            dataget(null)
            setBillingDate('')
            setInvoiceNo('')
            setEdit(false)
            setDataState('')
            setCustomerData('')
            setBook(() => ({}));
            setIndividualBilled(false)
            localStorage.setItem("searchdataurl",1)
        }
      });

    const handlebilldata = async () => {
        const tripno = book.tripid;
        if (!tripno) {
            setError(true);
            setErrorMessage("Please enter TripID");
            return
        }
        try {
            const statedata = await customerMotherdatagroupstation(book.customer ||  selectbillingdata.customer);
            const IndividualBillData = {
                Trip_id: book.tripid,
                Status: "Billed",
                Amount: book?.totalcalcAmount || 0,
                Bill_Date: dayjs().format('YYYY-MM-DD'),
                Customer: customerData?.customer,
                billing_no: book?.billingno,
                guestname: book?.guestname,
                State:statedata
            }
            await axios.post(`${apiUrl}/IndividualBill`, IndividualBillData);
            handleCancel();
            setBillAdd(false)
            setSuccess(true);
            setSuccessMessage("Successfully Added");

        }
        catch (err) {
            setError(true);
            setErrorMessage("Check your Network Connection");
        }
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
            else if (actionName === 'Add') {
                handlebilldata()
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
                    const bookingDetails = response.data[0];
                    const booklength = response.data
                     // Accessing the first item if response.data is an array
                    if(booklength.length > 0){
                    // Update the state with the booking details
                    const noAmount = bookingDetails?.totalcalcAmount
                    console.log(noAmount,"noAmount")
                    if(noAmount === 0){
                        setError(true)
                        setErrorMessage(`The amount for trip ID ${tripid} is Invalid`)
                        setBook(() => ({  }));
                        
                        return
                    
                    }
                    else{
                    console.log(noAmount,typeof(noAmount),"amount")
                    setBook(() => ({ ...bookingDetails }));
                    setSuccess(true);
                    setSuccessMessage("Successfully listed");
                    setBillAdd(true)
                    setEdit(false)
                    setIndividualBilled(false)
                    }
                    }
                    else{
                    setError(true)
                    setErrorMessage("Data Not Found")
                    }
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

    
    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                if (memoizedCustomer) {
                    const response = await fetch(`${apiUrl}/customers/${encodeURIComponent(memoizedCustomer)}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const customerData = await response.json();
                    setCustomerData(customerData);

                    // console.log(response,'Response datas ',customerData)
                }
            } catch (error) {
                console.error('Error fetching customer data:', error);
            }
        };

        fetchCustomerData();
    }, [memoizedCustomer, apiUrl]);

    useEffect(() => {
        const fetchStateDetails = async () => {
            try {
                const response = await fetch(`${apiUrl}/statedetails`);
    
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to fetch state details');
                }
    
                const data = await response.json();
                setStateDetails(data);
    
                console.log(data, 'State details fetched'); 
            } 
            catch (err) {
                // setError(err.message); // Handle errors
                console.error('Error fetching state details:', err);
            }
        };
        fetchStateDetails();    
    }, [customerData]);




    // const organizationaddress1 = customerData.address1;
    // const organizationaddress2 = customerData.address2;
    // const organizationcity = customerData.city;
    // const organizationgstnumber = customerData.gstnumber;
    // const tripdepartment = book.department;
    // const tripcode = book.customercode;
    // const triprequest = book.request;
    // const tripShedkm = book.shedkm;
    // const tripshedin = book.shedin;
    // const tripshedout = book.shedout;
    // const tripreporttime = book.reporttime;
    // const tripshedintime = book.shedintime;
    // const tripadditionaltime = book.additionaltime;
    // const tripstartkm = book.startkm;
    // const tripclosekm = book.closekm;
    // const tripstarttime = book.starttime;
    // const tripclosetime = book.closetime;
    // const tripstartdate = book.startdate;
    // const tripclosedate = book.closedate;
    // const roundOffValue = calculateRoundOff();
    // const BalanceValue = calculatePayableAmount();
    // const TotalAmountValue = calculateroundedPayableAmount();
    const handleKeyenterinvoicdeno = async(event)=>{
     

            if (event.key === "Enter") {
              event.preventDefault();
              const invoicenodata = invoiceno || invoicestate
             console.log(datastate,"settt",invoiceno,"lllll")
              try {
                if (invoicenodata && datastate) {
                const response = await axios.get(
                  `${apiUrl}/INVOICEENTER_Billing/${invoicenodata}/${datastate}`
                );
                // const bookingDetails = response.data;
                const bookingDetails = response.data[0];
                const bookdata=response.data; // Accessing the first item if response.data is an array
                
                if(bookdata.length > 0 ){
                setBillingDate(bookingDetails.Bill_Date)
                setDataState(bookingDetails.State)
               
                setBook(() => ({ ...bookingDetails }));
                setSuccess(true);
                setSuccessMessage("Successfully listed");
             
                setEdit(true);
                setIndividualBilled(false)
            
                }
                else{
                    setBook(() => ({ ...emptyBookvalues }));
                    setBillingDate('')
                    setDataState('')
                    setError(true);
                    setErrorMessage("Data Not Found");
                }
            }

                else{
                    setError(true);
                    setErrorMessage("Enter  Invoice_No And State ");
                }
              } catch {
                setError(true);
                setErrorMessage("Error retrieving booking details");
              }
            }
          }
    

    const [organizationdata, setorganizationData] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${apiUrl}/organizationdata`);
                if (response.status === 200) {
                    const userDataArray = await response.json();
                    if (userDataArray.length > 0) {
                        setorganizationData(userDataArray[0]);
                    }
                } else {
                    const timer = setTimeout(fetchData, 2000);
                    return () => clearTimeout(timer);
                }
                // }
                // return;
            } catch {
            }
        };
        fetchData();
    }, [apiUrl]);
    // Empty the book
   
    useEffect(() => {
        // setBook(emptyBookvalues);
        // setCustomerData('');
        // setBillingDate('')
        if(individualBilled){
             setBillingDate('')
              setInvoiceNo()
              setBook(emptyBookvalues);
        setCustomerData('');
        }
    }, [individualBilled]);
  

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
        // handleKeyenterBilling,
        handleKeyDown,
        handleDateChange,
        organizationdata,
        setSelectedBankAccount,
        handleAutocompleteChange,
        selectedBankAccount,
        bankOptions,
        popupOpen,
        handlePopupClose,
        // triprequest,
        // tripcode,
        // tripdepartment,
        // routeData,
        // tripShedkm,
        // tripshedin,
        // tripshedout,
        // tripreporttime,
        // tripshedintime,
        // tripadditionaltime,
        // tripstartkm,
        // tripclosekm,
        // tripstarttime,
        // tripclosetime,
        // tripstartdate,
        // tripclosedate,
        // organizationaddress1,
        // organizationaddress2,
        // organizationcity,
        // organizationgstnumber,
        invoiceno,
        GmapimageUrl,
        customerData,
        setBook,
        emptyBookvalues,
        setRouteData,
        setMapImageUrl,
        setGMapImageUrl,
        handleKeyenterinvoicdeno,
        setInvoiceNo,billadd,invoicestate,dataotherStations,handleserviceInputChange,datastate,
        mapimageUrl, total_Nighthalt_Amount, discound_PercentageCalc, balanceRecivable, roundOffCalc, pendingAmountCalc,edit,selectbillingdata,billingdate,
        stateDetails,setStateDetails,handlefullTotalAmount,hanldetollpark
    };
};

export default useBilling;