import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
// import { Organization } from "../../billingMain/PaymentDetail/PaymentDetailData";
import { APIURL } from "../../../url";
import { useLocation } from "react-router-dom";
import { PdfData } from "./PdfContext";
import axios from 'axios';


const useTransferreport = () => {
  const apiUrl = APIURL;

  const [pbpopupOpen, setpbPopupOpen] = useState(false);
  const [npopupOpen, setnPopupOpen] = useState(false);
  const [lxpopupOpen, setlxPopupOpen] = useState(false);
  const [servicestation, setServiceStation] = useState("");
  const [customer, setCustomer] = useState("");
  const [groupTripid, setGroupTripid] = useState("")
  const [invoiceno, setInvoiceno] = useState("")
  const [fromDate, setFromDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [invoiceDate, setInvoiceDate] = useState('')
  const [date] = useState(dayjs());
  const [info, setInfo] = useState(false);
  // const [bankOptions, setBankOptions] = useState([]);
  const [tripData, setTripData] = useState("");
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({});
  const [warning, setWarning] = useState(false);
  const [warningMessage,setWarningMessage] = useState({});
  const [popupOpen, setPopupOpen] = useState(false);
  const [misformat, setMisformat] = useState('')
  const [pdfBillList, setPdfBillList] = useState('');
  const [bookingMail, setBookingMail] = useState(false);
  const [tripID, setTripID] = useState();
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [pdfzipdata, setPdfzipdata] = useState([])
  const [selectedRow, setSelectedRow] = useState([])
  const [billedStatusCheck, setBilledStatusCheck] = useState();
  const location = useLocation()
  const { transferReport, setTransferReport } = PdfData()
  // set All Tripsheet Values
  const [allTripData, setAllTripData] = useState([])
  const [removeUpdate, setRemoveUpdate] = useState(false)
  const [totalTransferAmount, setTotalTransferAmount] = useState()
  const [billingGroupDetails, setBillingGroupDetails] = useState('')

  const [loading, setLoading] = useState(false)
  const [isButtonloading, setisButtonLoading] = useState(false)
  const [zipisloading,setZipIsloading]=useState(false) 
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const parameterKeys = [
      "Invoice_no", "Group_id", "Customer", "FromDate", "EndDate", "BillDate", "TransferReport", "TripId", "Status", "State"
    ];

    const formData = {};
    parameterKeys.forEach(key => {
      const value = params.get(key);
      if (value !== null && value !== "null") {
        formData[key] = value;
      }
    });
    console.log(formData.State, 'state999');

    setCustomer(formData.Customer)
    setFromDate(formData.FromDate)
    setEndDate(formData.EndDate)
    setGroupTripid(formData.Group_id)
    setInvoiceno(formData.Invoice_no)
    setInvoiceDate(formData.BillDate)
    setTransferReport(formData.TransferReport)
    setTripID(formData.TripId)
    setBilledStatusCheck(formData.Status)
    setServiceStation(formData.State)
    setRatetypeforpage('')
  }, [location, setTransferReport])

  window.addEventListener('click', (event) => {
    if (event.target === window) {
      setTransferReport(false)
    }
  });
  // console.log(servicestation, 'stateee');

  useEffect(() => {
    if (transferReport === false || transferReport === undefined) {
      setCustomer('')
      setFromDate('')
      setEndDate('')
      setGroupTripid('')
      setRatetypeforpage("")
      setInvoiceno('')
      setInvoiceDate('')
      setGroupTripid('');
      setCustomerData("")
      setTripID()
      setRows([])
      // setRowSelectionModel([])
    }
  }, [transferReport, setTransferReport])

  useEffect(() => {
    window.history.replaceState(null, document.title, window.location.pathname);
  }, []);
  const tableData = rows.map((row) => [
    row["id"],
    row["tripid"],
    row["vcode"],
    row["guestname"],
    row["status"]
  ]);
  const handleExcelDownload = () => {
    const header = ["Sno", "Tripsheet No", "VCode", "Status", "Guest Name"];
    const csvData = [
      header,
      ...tableData?.map((row) => row.map((value) => `"${value}"`)),
    ]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "customer_details.csv");
  };
  const handlePdfDownload = () => {
    const pdf = new jsPDF();
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");
    pdf.text("Customer Details", 10, 10);
    pdf.autoTable({
      head: [["Sno", "Tripsheet No", "VCode", "Status", "Guest Name"]],
      body: tableData,
      startY: 20,
    });
    const pdfBlob = pdf.output("blob");
    saveAs(pdfBlob, "Transfer Report.pdf");
  };

  useEffect(() => {
    if (error || success || warning || info) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success, warning, info]);

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setBookingMail(isChecked);
    console.log("Booking Mail", isChecked);
  };


  const handleEInvoiceClick = (row) => {
    if (rows.length === 0) {
      setError(true);
      setErrorMessage("No data available. Please fetch data");
      return;
    }
    setpbPopupOpen(true);
  };
  const handleMapInvoiceClick = (row) => {
    if (rows.length === 0) {
      setError(true);
      setErrorMessage("No data available. Please fetch data");
      return;
    }
    setnPopupOpen(true);
  };

  const handleLuxuryInvoiceClick = (row) => {
    if (rows.length === 0) {
      setError(true);
      setErrorMessage("No data available. Please fetch data");
      return;
    }
    setlxPopupOpen(true);
  };

  const handleETripsheetClick = () => {
    if (rows.length === 0) {
      setError(true);
      setErrorMessage("No data available. Please fetch data");
      return;
    }
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
    setpbPopupOpen(false);
    setnPopupOpen(false);
    setlxPopupOpen(false);
  };

  const hidePopup = () => {
    setSuccess(false);
    setError(false);
    setInfo(false);
    setWarning(false);
  };

  //  useEffect(() => {
  //   const fetchData = async () => {
  //     const tripidno = tripno
  //     try {
  //       const response = await fetch(`${apiUrl}/booking-docPDFView/${tripidno}`);
  //       if (response.status === 200) {
  //         const data = await response.json();
  //         const attachedImageUrls = data.files
  //         setBookmailimage(attachedImageUrls);
  //       }

  //       else {
  //         const timer = setTimeout(fetchData, 2000);
  //         return () => clearTimeout(timer);
  //       }
  //     }
  //     catch (err) {
  //       console.log(err, 'error');
  //     }
  //   }
  //   fetchData()
  // }, [apiUrl, tripno])

  useEffect(() => {
    const fetchData = async () => {

      try {
        const tripid = localStorage.getItem("selectedtripsheetid");
        const encoded = localStorage.getItem("selectedcustomerdata");
        localStorage.setItem("selectedcustomer", encoded);
        const storedCustomer = localStorage.getItem("selectedcustomer");
        // const customer = decodeURIComponent(storedCustomer);
        if (!customer || !tripid) return

        const response = await fetch(
          `${apiUrl}/tripsheetcustomertripid/${encodeURIComponent(
            customer
          )}/${tripID}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const tripData = await response.json();
        if (Array.isArray(tripData)) {
          setTripData(tripData);
          const tripsheetNumbers = tripData.map((row, index) => ({
            id: index + 1,
            guestname: row.guestname,
            tripid: row.tripid,
            status: row.status,
            customer: row.customer
          }));
          if (tripsheetNumbers.length > 0) {
            const rowsWithUniqueId = tripsheetNumbers.map((row, index) => ({
              ...row,
              id: index + 1,
            }));
            setRows(rowsWithUniqueId);
            setSuccess(true);
            setSuccessMessage("successfully listed");
          } else {
            setRows([]);
            setError(true);
            setErrorMessage("no data found");
          }
        } else if (typeof tripData === "object") {
          const tripsheetNumbers = [
            { id: 1, guestname: tripData.guestname, tripid: tripData.tripid },
          ];
          setRows(tripsheetNumbers);
        } else {
          setRows([])

        }
      } catch {
        setRows([])
      }
    };
    fetchData();
  }, [apiUrl]);

  const customerName = localStorage.getItem("selectedcustomerdata");
  localStorage.setItem("selectedcustomer", customerName);

  const handleserviceInputChange = (event, newValue) => {
    setServiceStation(newValue ? decodeURIComponent(newValue.label) : "");
  };

  //tripsheet data get for normal invoice
  const [routeData, setRouteData] = useState("");
  const [customerData, setCustomerData] = useState("");
  const [totalValue, setTotalValue] = useState("");
  const [roundedAmount, setRoundedAmount] = useState("");
  const [sumTotalAndRounded, setSumTotalAndRounded] = useState("");
  const [ratetypeforpage, setRatetypeforpage] = useState("");

  const calculateNetAmountSum = (data) => {
    return data.reduce((sum, item) => {
      const netAmountValue = parseFloat(item.netamount, 10);
      return sum + netAmountValue;
    }, 0);
  };

  useEffect(() => {
    const fetchData = async () => {
      const tripid = localStorage.getItem("selectedtripsheetid");
      // const customer = localStorage.getItem("selectedcustomer");

      try {

        if (!tripID || !customer) return

        const response = await fetch(
          `${apiUrl}/tripsheetcustomertripid/${customer}/${tripID}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        if (Array.isArray(responseData)) {
          setRouteData(responseData);
          const netAmountSum = calculateNetAmountSum(responseData);
          setTotalValue(netAmountSum);

          const calculateRoundOff = () => {
            const balanceAmount = parseFloat(totalValue);
            const roundedGrossAmount = Math.ceil(balanceAmount);
            const roundOff = roundedGrossAmount - balanceAmount;
            return roundOff.toFixed(2);
          };

          const roundOffValue = calculateRoundOff();
          setRoundedAmount(roundOffValue);

          const sumTotalAndRounded =
            parseFloat(netAmountSum) + parseFloat(roundOffValue);
          setSumTotalAndRounded(sumTotalAndRounded);
        } else {
        }
      } catch { }

    };
    fetchData();
  }, [totalValue, roundedAmount, apiUrl]);

  useEffect(() => {
    //this is for getting organization details
    const fetchData = async () => {
      // const customer = localStorage.getItem("selectedcustomerdata");

      try {

        if (!customer) return

        const response = await fetch(
          `${apiUrl}/customers/${encodeURIComponent(customer)}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const customerData = await response.json();
        setCustomerData(customerData);
        const ratetype = customerData.rateType;
        setRatetypeforpage(ratetype)
      } catch { }
    };
    fetchData();
  }, [apiUrl, location, customer]);



  const organizationaddress1 = customerData.address1;
  const organizationaddress2 = customerData.address2;
  const organizationcity = customerData.city;
  const organizationgstnumber = customerData.gstnumber;

  // useEffect(() => {
  //   Organization()
  //     .then((data) => {
  //       if (data) {
  //         setBankOptions(data);
  //       } else {
  //       }
  //     })
  //     .catch(() => { });
  // }, []);

  // const [routedData, setRoutedData] = useState("");

  // useEffect(() => {
  //   const fetchData4 = async () => {
  //     try {
  //       const fromdate = localStorage.getItem("fromDate");
  //       const todate = localStorage.getItem("toDate");
  //       const customerValue =
  //         encodeURIComponent(customer) ||
  //         (tripData.length > 0 ? tripData[0].customer : "");
  //       const fromDateValue = fromdate;
  //       const toDateValue = todate;
  //       const servicestationValue =
  //         servicestation || (tripData.length > 0 ? tripData[0].department : "");
  //       if (
  //         customerValue.trim() !== "" ||
  //         fromDateValue.trim() !== "" ||
  //         toDateValue.trim() !== "" ||
  //         servicestationValue.trim() !== ""
  //       ) {
  //         const response = await fetch(`${apiUrl}/Get-Billing`, {
  //           params: {
  //             customer: customerValue,
  //             fromDate: fromDateValue,
  //             toDate: toDateValue,
  //             servicestation: servicestationValue,
  //           },
  //         });

  //         const routedData = await response.json();
  //         setRoutedData(routedData);
  //       }
  //     } catch { }
  //   };

  //   fetchData4();
  // }, [customer, servicestation, tripData, apiUrl]);

  const [attachedImage, setAttachedImage] = useState("");
  //  its is booking table or tripsheettabel
  //  i change api for booking mail pdf go to see booking.js
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const tripid = localStorage.getItem("selectedtripsheetid");
  //       if (!tripid) {
  //         return;
  //       }
  //       const response = await fetch(
  //         `${apiUrl}/get-attachedmailimage/${tripid}`
  //       );
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       const data = await response.json();
  //       const attachedImageUrls = data.imagePaths.map(
  //         (path) => `${apiUrl}/images/${path}`
  //       );
  //       setAttachedImage(attachedImageUrls);
  //     } catch { }
  //   };
  //   fetchData();
  // }, [apiUrl]);

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const organizationname = localStorage.getItem("usercompany");
        // if (!organizationname) {
        //   return;
        // }
        const response = await fetch(`${apiUrl}/get-companyimage`);
        if (response.status === 200) {
          const data = await response.json();
          const attachedImageUrls = data.imagePaths.map(
            (path) => `${apiUrl}/images/${path}`
          );
          localStorage.setItem(
            "selectedImage",
            JSON.stringify(attachedImageUrls)
          );
          setSelectedImage(attachedImageUrls);
        } else {
          const timer = setTimeout(fetchData, 2000);
          return () => clearTimeout(timer);
        }
      } catch { }
    };
    fetchData();
  }, [apiUrl]);

  const [organizationdata, setorganizationData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      // const encoded = localStorage.getItem("usercompany");
      // localStorage.setItem("usercompanyname", encoded);
      // const storedcomanyname = localStorage.getItem("usercompanyname");
      // const organizationname = decodeURIComponent(storedcomanyname);
      try {
        // const response = await fetch(
        //   `${apiUrl}/organizationdata/${organizationname}`
        // );
        const response = await fetch(
          `${apiUrl}/organizationdata`
        );
        if (response.status === 200) {
          const userDataArray = await response.json();
          if (userDataArray.length > 0) {
            setorganizationData(userDataArray[0]);
          }
        } else {
          const timer = setTimeout(fetchData, 2000);
          return () => clearTimeout(timer);
        }
      } catch { }
    };

    fetchData();
  }, [apiUrl]);

  const handleRowSelection = (newSelectionModel) => {
    const selectedTripIds = newSelectionModel
      .filter((selectedId) => selectedId !== null)
      .map((selectedId) => {
        const selectedRow = rows.find((row) => row.id === parseInt(selectedId));
        return selectedRow ? selectedRow.tripid : null;
      })
      .filter((tripid) => tripid !== null);

    console.log("Selected Trip IDs:", selectedTripIds);

    const selectedTrips = newSelectionModel
      .filter((selectedId) => selectedId !== null)
      .map((selectedId) => {
        const selectedRow = allTripData.find((row) => row.id === parseInt(selectedId));
        return selectedRow ? selectedRow : null;
      })
      .filter((tripid) => tripid !== null);

    console.log("Selected Trips:", selectedTrips);
    setSelectedRow(selectedTrips)
    const tripsheetid = selectedTripIds;
    setRowSelectionModel(tripsheetid);

    console.log("Row Selection Model (Trip Sheet IDs):", tripsheetid);
  };
  // console.log(rowSelectionModel,"rrrrrr",rowSelectionModel.length);

//   useEffect(() => {
//     const fetchData = async () => {
//       // console.log('loading in transperreposr')
//       try {
//         // const tripid = rowSelectionModel
//         // const encoded = localStorage.getItem("selectedcustomerdata");
//         // localStorage.setItem("selectedcustomer", encoded);
//         // const storedCustomer = localStorage.getItem("selectedcustomer");
//         // console.log(rowSelectionModel,'Transferreport response')
//         // const customer = decodeURIComponent(storedCustomer);
//         // console.log(tripID,"exceltrip",rowSelectionModel);

//         if (tripID.length >= 1) {

//           // const response = await fetch(
//           //   `${apiUrl}/pdfdatatransferreporttripid2/${encodeURIComponent(
//           //     customer
//           //   )}/${tripid}`
//           // );

//           const response = await axios.get(
//             `${apiUrl}/pdfdatatransferreporttripid2/${encodeURIComponent(
//               customer
//             )}/${tripID}`
//           );


//           const tripData = response.data
//           // console.log(tripData,"exceltripppppppppppp");

//           const flattenedTripData = tripData.flat();
//           // console.log(flattenedTripData,"flattenedTripData");
//           const uniqueData = flattenedTripData.filter((item, index, self) =>
//             index === self.findIndex((obj) => obj.tripid === item.tripid)
//           );
//           console.log(uniqueData, "flattenedTripDatauniqueData");
//           setPdfzipdata(uniqueData)
//           // setPdfzipdata(flattenedTripData)

//           // console.log(flattenedTripData,"trip dtatas ")
//           // setSuccess(true)
//         }
//         else {
//           return
//         }
//       } catch (err) {
//         console.log(err, 'error');
//       }
//     };
//     fetchData();
//   // }, [apiUrl, rowSelectionModel, pdfzipdata, rows]);
// }, [apiUrl,tripID]);

//   useEffect(() => {
//     const fetchData = async () => {
//       // console.log('loading in transperreposr')
//       try {
//         // const tripid = rowSelectionModel
//         // const encoded = localStorage.getItem("selectedcustomerdata");
//         // localStorage.setItem("selectedcustomer", encoded);
//         // const storedCustomer = localStorage.getItem("selectedcustomer");
//         // console.log(rowSelectionModel,'Transferreport response')
//         // const customer = decodeURIComponent(storedCustomer);
//         console.log(tripID,"exceltrip",rowSelectionModel);

//         if (tripID.length >= 1) {
//           setZipIsloading(true)

//           // const response = await fetch(
//           //   `${apiUrl}/pdfdatatransferreporttripid2/${encodeURIComponent(
//           //     customer
//           //   )}/${tripid}`
//           // );

//           const response = await axios.get(
//             `${apiUrl}/pdfdatatransferreporttripid2/${encodeURIComponent(
//               customer
//             )}/${tripID}`
//           );


//           const tripData = response.data
//           console.log(tripData,"drexceltripppppppppppp");

//           const flattenedTripData = tripData.flat();
//           // console.log(flattenedTripData,"flattenedTripData");
//           const uniqueData = flattenedTripData.filter((item, index, self) =>
//             index === self.findIndex((obj) => obj.tripid === item.tripid)
//           );
//           if(uniqueData?.length >= 1){
//          setZipIsloading(false)
//           }
//           console.log(uniqueData, "drflattenedTripDatauniqueData",uniqueData.length);
//           setPdfzipdata(uniqueData)

//           // setPdfzipdata(flattenedTripData)

//           // console.log(flattenedTripData,"trip dtatas ")
//           // setSuccess(true)
//         }
//         else {
//           setZipIsloading(false)
//           return
//         }
//       } catch (err) {
//         setZipIsloading(false)
//         console.log(err, 'error');
//       }
//     };
//     fetchData();
//   // }, [apiUrl, rowSelectionModel, pdfzipdata, rows]);
// }, [apiUrl,tripID]);
useEffect(() => {
  const controller = new AbortController(); // <-- Create controller

  const fetchData = async () => {
    try {
      console.log(tripID, "exceltrip", rowSelectionModel);

      if (tripID.length >= 1) {
        setZipIsloading(true);

        const response = await axios.get(
          `${apiUrl}/pdfdatatransferreporttripid2/${encodeURIComponent(customer)}/${tripID}`,
          {
            signal: controller.signal, // <-- Attach controller signal
          }
        );

        const tripData = response.data;
        console.log(tripData, "drexceltripppppppppppp");

        const flattenedTripData = tripData.flat();
        const uniqueData = flattenedTripData.filter((item, index, self) =>
          index === self.findIndex((obj) => obj.tripid === item.tripid)
        );

        if (uniqueData?.length >= 1) {
          setZipIsloading(false);
        }

        console.log(uniqueData, "drflattenedTripDatauniqueData", uniqueData.length);
        setPdfzipdata(uniqueData);
      } else {
        setZipIsloading(false);
        return;
      }
    } catch (err) {
      if (axios.isCancel(err) || err.name === 'CanceledError') {
        console.log('Request canceled');
      } else {
        console.log(err, 'error');
      }
      setZipIsloading(false);
    }
  };

  fetchData();

  return () => {
    controller.abort(); // <-- Cancel request on unmount
  };
}, [apiUrl, tripID]);
  const handleChange = (event) => {
    setInvoiceno(event.target.value)
  }

  // get Tripsheetdetails by enter InvoiceNo
  // useEffect(() => {
  //   const fetchData = async () => {
  //     let formattedTripID = tripID;
  //     console.log(tripID,'response');

  //     if (Array.isArray(tripID) && tripID.length === 1 && typeof tripID[0] === 'string') {
  //       formattedTripID = tripID[0].split(',').map(id => id.trim());
  //     }

  //     // localStorage.setItem("selectedcustomer", customer[0]);

  //     try {
  //       const response = await axios.get(`${apiUrl}/getParticularTripsheet`, {
  //         params: { tripID: formattedTripID }
  //       });
  //       const tripData = response.data
  //       console.log(tripData,'tripData')
  //       setAllTripData(tripData)
  //       const tripsheetNumbers = tripData.map((row, index) => ({
  //         id: index + 1,
  //         guestname: row.guestname,
  //         tripid: row.tripid,
  //         status: row.status,
  //         customer: row.customer
  //       }));
  //       if (tripsheetNumbers.length > 0) {
  //         const filteredData = tripsheetNumbers.filter(row => row.tripid !== 0);
  //         const rowsWithUniqueId = filteredData.map((row, index) => ({
  //           ...row,
  //           id: index + 1,
  //         }));
  //         // const rowsWithUniqueId = tripsheetNumbers.map((row, index) => ({
  //         //   ...row,
  //         //   id: index + 1,
  //         // }));

  //         setRows(rowsWithUniqueId);

  //         // setSuccess(true)
  //       }
  //       else {
  //         setRows([])
  //       }
  //     }

  //     catch (error) {
  //       console.error('Error fetching trip data:', error);
  //     }
  //   };

  //   fetchData();
  // }, [tripID, apiUrl]);

  // my code with loading 

  //   useEffect(() => {
  //     const fetchData = async () => {
  //         setLoading(true); // Start loading
  //         setRows([]); // Clear rows to show an empty grid

  //         let formattedTripID = tripID;
  //         console.log(tripID, 'response');

  //         if (Array.isArray(tripID) && tripID.length === 1 && typeof tripID[0] === 'string') {
  //             formattedTripID = tripID[0].split(',').map(id => id.trim());
  //         }

  //         let tripData = []; // Initialize tripData variable

  //         try {
  //             const response = await axios.get(`${apiUrl}/getParticularTripsheet`, {
  //                 params: { tripID: formattedTripID }
  //             });

  //             tripData = response.data; // Assign fetched data to tripData
  //             console.log(tripData, 'tripData');
  //             setAllTripData(tripData);

  //             if (tripData.length > 0) {
  //                 const tripsheetNumbers = tripData.map((row, index) => ({
  //                     id: index + 1,
  //                     guestname: row.guestname,
  //                     tripid: row.tripid,
  //                     status: row.status,
  //                     customer: row.customer
  //                 }));

  //                 const filteredData = tripsheetNumbers.filter(row => row.tripid !== 0);
  //                 const rowsWithUniqueId = filteredData.map((row, index) => ({
  //                     ...row,
  //                     id: index + 1,
  //                 }));
  //                 setRows(rowsWithUniqueId);
  //             } else {
  //                 setRows([]); // Ensure rows are cleared if no data
  //             }
  //         } catch (error) {
  //             console.error('Error fetching trip data:', error);
  //         } finally {
  //             // Stop loading if tripData has data
  //             if (tripData.length > 0) {
  //                 setLoading(false);
  //             }
  //         }
  //     };

  //     fetchData();
  // }, [tripID, apiUrl]);
  // console.log(tripID,"id")
  useEffect(() => {
    const fetchData = async () => {
      // Only set loading to true if it's a new tripID
      setLoading(true);
      setRows([]);

      let formattedTripID = tripID;
      // console.log(formattedTripID,"idform")
      // console.log(tripID, 'response');

      if (Array.isArray(tripID) && tripID.length === 1 && typeof tripID[0] === 'string') {
        formattedTripID = tripID[0].split(',').map(id => id.trim());
      }

      try {
        // console.log(tripID,"identer")
        const response = await axios.get(`${apiUrl}/getParticularTripsheet`, {
          params: { tripID: formattedTripID }
        });

        const tripData = response.data;
        // console.log(tripData, 'tripData');
        setAllTripData(tripData);

        if (tripData.length > 0) {
          const tripsheetNumbers = tripData.map((row, index) => ({
            id: index + 1,
            guestname: row.guestname,
            tripid: row.tripid,
            status: row.status,
            customer: row.customer
          }));

          const filteredData = tripsheetNumbers.filter(row => row.tripid !== 0);
          setRows(filteredData); // You can set the filtered data directly
        } else {
          setRows([]); // Ensure rows are cleared if no data
        }
      } catch (error) {
        console.error('Error fetching trip data:', error);
      } finally {
        // Only stop loading if data was fetched or an error occurred
        setLoading(false);
      }
    };

    if (tripID) { // Check if tripID is not null or undefined
      fetchData();
    }
  }, [tripID, apiUrl]);

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const InvoiceNo = event.target.value;
      // console.log(servicestation,"station")
      if(!servicestation){
        setWarning(true)
        setWarningMessage("Select State")
        return
      }
      try {
        const response = await axios.get(`${apiUrl}/getParticularInvoiceDetails`, {
          params: {
            InvoiceNo: InvoiceNo,
            State:servicestation
          }
        });
        const Result = response.data;
        if (Result.length > 0) {

          setSuccess(true)
          setSuccessMessage("successfully listed");
          const state = Result[0]?.State;
          setServiceStation(state)
          const fromdate = Result?.map(li => li.FromDate);
          setFromDate(fromdate)
          const enddate = Result?.map(li => li.EndDate);
          setEndDate(enddate)
          const organization = Result?.map(li => li.Organization_name);

          setCustomer(organization[0])
          const InvoiceDate = Result?.map(li => li.Billdate)
          setInvoiceDate(InvoiceDate)
          const groupTripid = Result?.map(li => li.Grouptrip_id)
          setGroupTripid(groupTripid)
          const Status = Result?.map(li => li.Status)

          const checkStatus = Status[0];
          setBilledStatusCheck(checkStatus)
          // const tripid = Result?.map(li =>li.Trip_id)
          const tripid = Result?.map(li => li.Trip_id.split(',')).flat().join(',');
          // console.log(tripid,"stationtripi")

          setTripID(tripid)
        }
        else {
          setError(true)
          setErrorMessage("No Data Found")
          setRows([])
          setServiceStation('')
          setFromDate('')
          setEndDate('')
          setCustomer('')
          setInvoiceDate('')
          setGroupTripid('')
        }
      } catch (error) {
        console.log(error, 'error');
      }
    }
  };
  const handleCancel = () => {
    setRows([]);
    setPdfBillList("")
    setMisformat("")
    setTripID()
  }

  const handleGroupKeyDown = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleCancel();
      const GroupId = event.target.value;

      try {
        const response = await axios.get(`${apiUrl}/getParticularInvoiceDetailsbyGroupTripId`, {
          params: {
            GroupTripId: GroupId
          }
        });
        const Result = response.data;
        if (Result.length > 0) {
          setSuccess(true);
          setSuccessMessage("successfully listed");

          const state = Result[0]?.State;
          setServiceStation(state)
          const fromdate = Result?.map(li => li.FromDate);
          setFromDate(fromdate)
          const enddate = Result?.map(li => li.EndDate);
          setEndDate(enddate)
          const organization = Result?.map(li => li.Organization_name);

          setCustomer(organization[0])
          const InvoiceDate = Result?.map(li => li.Billdate)
          setInvoiceDate(InvoiceDate)
          const groupTripid = Result?.map(li => li.Grouptrip_id)
          setGroupTripid(groupTripid)
          const Invoice_no = Result?.map(li => li.Invoice_no)
          setInvoiceno(Invoice_no)
          const Amount = Result?.map(li => li.Amount)
          setTotalTransferAmount(Amount)
          const Status = Result?.map(li => li.Status)

          const checkStatus = Status[0];
          setBilledStatusCheck(checkStatus)
          const tripid = Result?.map(li => li.Trip_id.split(',')).flat().join(',');

          setTripID(tripid)
        } else {
          setError(true);
          setRows([])
          setServiceStation("")
          setCustomer("")
          setInvoiceno("")
          setInvoiceDate("")
          setEndDate("")
          setFromDate("")
          setRatetypeforpage("")
          setPdfBillList("")
          setMisformat("")
          setErrorMessage("No data found");
        }
      } catch (error) {
        console.log(error, 'error');
      }
    }
  }

  // to get select tripdetails
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/togetSelectTripsheetDetails`, {
          params: {
            Trip_id: rowSelectionModel,
          },
        });
        setAllTripData(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [rowSelectionModel]);


  // const handleRemove = async () => {

  //   const tripid = allTripData?.map(row => row.tripid.toString());
  //   const totalPrice = allTripData.reduce((sum, li) => sum + li.totalcalcAmount, 0);
  //   const ActualAmount = parseInt(totalTransferAmount) - totalPrice;
  //   const Trips = rows.length - allTripData.length;
  //   const selectId = allTripData?.map(row => row.tripid);

  //   const TransferUpdate = {
  //     Trip_id: tripid,
  //     Amount: ActualAmount,
  //     Trips: Trips,
  //   };

  //   try {
  //     const updateTripsheet = await axios.put(`${apiUrl}/updateList`, TransferUpdate);
  //     // const updateTripsheet =  await axios.post(`${apiUrl}/removeUpdateTripsheet`, { tripid });


  //     const selectionIds = Array.isArray(rowSelectionModel)
  //       ? rowSelectionModel.map(item => item?.toString()) // Convert elements to strings
  //       : [];

  //     // Simplified filtering approach, only filter rows once
  //     const updatedRows = rows.filter(row => !selectionIds.includes(row.tripid.toString()));

  //     setRows([...updatedRows]);

  //     setSuccess(true);
  //     setSuccessMessage("Successfully Removed");
  //     setSelectedRow([]);
  //   } catch (error) {
  //     console.log(error, 'error');
  //   }
  // };


  return {
    rows,
    error,
    setError,
    success,
    warning,
    successMessage,
    errorMessage,
    setErrorMessage,
    warningMessage,
    organizationdata,
    hidePopup,
    // routedData,
    date,
    customer,
    tripData,
    // bankOptions,
    ratetypeforpage,
    attachedImage,
    setCustomer,
    servicestation,
    setServiceStation,
    selectedImage,
    handleserviceInputChange,
    handleEInvoiceClick,
    handleMapInvoiceClick,
    handleLuxuryInvoiceClick,
    popupOpen,
    pbpopupOpen,
    handlePopupClose,
    handleCheckboxChange,
    npopupOpen,
    lxpopupOpen,
    handleExcelDownload,
    handlePdfDownload,
    handleETripsheetClick,
    routeData,
    roundedAmount,
    setBookingMail,
    bookingMail,
    sumTotalAndRounded,
    totalValue,
    organizationaddress1,
    organizationaddress2,
    organizationcity,
    organizationgstnumber,
    invoiceno,
    groupTripid,
    fromDate,
    endDate,
    invoiceDate,
    misformat,
    setMisformat,
    pdfBillList,
    setPdfBillList,

    handleRowSelection,
    // rowzip,
    rowSelectionModel,

    setRowSelectionModel,
    pdfzipdata,
    handleKeyDown,
    handleChange,
    handleGroupKeyDown,
    setGroupTripid,
    tripID,
    // handleRemove,
    billedStatusCheck,
    setBilledStatusCheck,
    loading, setLoading,
    billingGroupDetails,
    setBillingGroupDetails,
    isButtonloading, setisButtonLoading,
    zipisloading
    // datastatetranfer
  };
};

export default useTransferreport;
