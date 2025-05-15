import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { APIURL } from "../../../url";
import { PdfData } from "../../../Billings/Transfer/TransferReport/PdfContext";
import { ReportContext } from "../../../Billings/Report/Context/ReportContext";
import { useLocation } from "react-router-dom";

const useCard = () => {
  const [billAmount, setBillAmount] = useState(null);
  const [totalAmountSum, setTotalAmountSum] = useState(0);
  const [totalCollectedSum, setTotalCollectedSum] = useState(0);
  const [totalBalanceSum, setTotalBalanceSum] = useState(0);
  const [selectedMonth2, setSelectedMonth2] = useState(getCurrentMonth());
  // const[all,setAll]=useState("All")
  const[vendordata,setVendorData]=useState({});
  const[profitdata,setProfitdata]=useState([]);
  const [billData, setBillData] = useState([]);
  const { selectedMonths, selectedYear,selectedProfitMonths,selectedProfitYear } = PdfData();
  // const {value} = ReportContext();
  const { value } = useContext(ReportContext);
  const location = useLocation()
  const currentYear = new Date().getFullYear();

  // for getting yearly reports for various months usin from and to
   const [fromYear, setFromYear] = useState("");
    const [toYear, setToYear] = useState("");
    const [reportData, setReportData] = useState([]);


  // console.log(value,'valuecard')

  function getCurrentMonth() {
    const currentDate = new Date();

    const currentMonth = currentDate.getMonth() + 1; // Returns a number between 0 and 11

    return currentMonth.toString();
  };
  const apiUrl = APIURL;
  useEffect(() => {
    setSelectedMonth2(getCurrentMonth())
    // setSelectedYear(currentYear)
  }, [location])

  // useEffect(() => {
  //     const fetchBillAmount = async () => {
  //         try {
  //             const response = await axios.get(`${apiUrl}/getFullBillWisedReport`);
  //             const data = response.data;

  //             const totalAmount = data.reduce((acc, item) => acc + parseFloat(item.TotalAmount), 0);
  //             const totalCollected = data.reduce((acc, item) => acc + parseFloat(item.Collected), 0);
  //             const totalBalance = data.reduce((acc, item) => acc + parseFloat(item.TotalBalance), 0);

  //             setTotalAmountSum(totalAmount);
  //             setTotalCollectedSum(totalCollected);
  //             setTotalBalanceSum(totalBalance);

  //             setBillAmount(data);

  //             // Store the sums in local storage with the same key
  //             const sums = {
  //                 totalAmountSum: totalAmount,
  //                 totalCollectedSum: totalCollected,
  //                 totalBalanceSum: totalBalance
  //             };
  //             localStorage.setItem('sumValues', JSON.stringify(sums));


  //         } catch (error) {
  //             console.log('Error fetching BankAccount data:', error);
  //         }
  //     };
  //     fetchBillAmount();
  // }, [apiUrl]);

  // getting monthly wise Amount

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = [];
  
        if (selectedMonths !== "All") {
          const response = await axios.get(`${apiUrl}/getBilledAmountTripApi`, {
            params: {
              selectedMonth: selectedMonths,
              selectedYear: selectedYear
            }
          });
          console.log(response.data, "Fetched billed amounts");
          data = response.data;
  
        } else if (selectedMonths === "All") {
          const response = await axios.get(`${apiUrl}/getAllBilledAmountTripApi`, {
            params: {
              selectedYear: selectedYear
            }
          });
          console.log(response.data, "Fetched All billed amounts");
          data = response.data;
        }
  
        // Calculate totals
        const totalAmount = data.reduce((acc, item) => acc + parseFloat(item.totalcalcAmount || 0), 0);
        const totalCollected = data.reduce((acc, item) => acc + parseFloat(item.totalcalcAmount || 0), 0); // change this if you have a collectedAmount field
        const totalBalance = 0;
  
        // Set state
        setTotalAmountSum(totalAmount);
        setTotalCollectedSum(totalCollected);
        setTotalBalanceSum(totalBalance);
        setBillAmount(data);
  
        // Store in localStorage
        const sums = {
          totalAmountSum: totalAmount,
          totalCollectedSum: totalCollected,
          totalBalanceSum: totalBalance
        };
        localStorage.setItem('sumValues', JSON.stringify(sums));
  
      } catch (error) {
        console.log(error, "errorbillAmount");
      }
    };
  
      fetchData();
  }, [apiUrl, selectedMonths, selectedYear]);
  

  // useEffect(() => {
  //   // console.log(selectedMonth2, typeof selectedMonth2, 'sssssssssss');


  //   const fetchBillAmount = async () => {
  //     try {
  //       let data = [];

  //       if (selectedMonths === "All") {
  //         const response = await axios.get(`${apiUrl}/getFullBillWisedReport`, {
  //           params: { selectYear: selectedYear } // ✅ Use params for GET requests
  //         });
  //         data = response.data;
  //         console.log(response, 'responsebilldata')


  //       } else if (selectedMonths !== "All") {
  //         const response = await axios.post(`${apiUrl}/getMonthWiseTotal`, {
  //           selectMonth: selectedMonths,
  //           selectYear: selectedYear
  //         });
  //         // console.log(response.data, 'select month response');
  //         data = response.data;
  //       }

  //       const totalAmount = data.reduce((acc, item) => acc + parseFloat(item.TotalAmount), 0);
  //       const totalCollected = data.reduce((acc, item) => acc + parseFloat(item.TotalCollected), 0);
  //       const totalBalance = data.reduce((acc, item) => acc + parseFloat(item.TotalBalance), 0);

  //       setTotalAmountSum(totalAmount);
  //       setTotalCollectedSum(totalCollected);
  //       setTotalBalanceSum(totalBalance);
  //       setBillAmount(data);
  //       const sums = {
  //         totalAmountSum: totalAmount,
  //         totalCollectedSum: totalCollected,
  //         totalBalanceSum: totalBalance
  //       };
  //       localStorage.setItem('sumValues', JSON.stringify(sums));
  //     } catch (error) {
  //       console.log('Error fetching Bill Amount data:', error);
  //     }
  //   };
  //   fetchBillAmount();
  // }, [apiUrl, selectedMonths, selectedYear]);

  // my code for all data 

  // console.log(selectedMonth2,'selecttt111111111',selectedMonths);
  useEffect(() => {
    // console.log(selectedMonth2,'selecttttttttttttt',selectedMonths);

    const fetchBillData = async () => {
      try {
        let data = [];
        if (selectedMonths === "All") {
          const response = await axios.get(`${apiUrl}/AllBilledSuccessAmountTripsheetAPI`, {
            params: { selectYear: selectedYear } // ✅ Use params for GET requests
          });

          data = response.data; 
          setBillData(data);
          return;
        } else if (selectedMonths !== "All") {
          const response = await axios.get(`${apiUrl}/BilledSuccessAmountTripsheetAPI`, {
            params : {selectedMonth: selectedMonths,
            selectYear: selectedYear}
          });
          data = response.data; // Fetch month-specific data
          setBillData(data); // Update state with the fetched data

        }
      } catch (error) {
        console.error('Error fetching bill data:', error);
      }
    };

    fetchBillData(); 
  }, [apiUrl, selectedMonths, selectedYear]); 




  // useEffect(() => {
  //   // console.log(selectedMonth2,'selecttttttttttttt',selectedMonths);

  //   const fetchBillData = async () => {
  //     try {
  //       let data = [];
  //       if (selectedMonths === "All") {
  //         const response = await axios.get(`${apiUrl}/getFullBillWisedReportcards`, {
  //           params: { selectYear: selectedYear } // ✅ Use params for GET requests
  //         });

  //         data = response.data; // Fetch all data
  //         setBillData(data); // Update state with the fetched data
  //         return;
  //       } else if (selectedMonths !== "All") {
  //         const response = await axios.post(`${apiUrl}/getmonthwisedatas`, {
  //           selectMonth: selectedMonths,
  //           selectYear: selectedYear
  //         });
  //         data = response.data; // Fetch month-specific data
  //         // console.log(data, 'Fetched Month-Wise Bill Data');
  //         setBillData(data); // Update state with the fetched data
  //         // console.log(response.data, 'Maaaaaaaaaaannnnnnnn');

  //       }
  //     } catch (error) {
  //       console.error('Error fetching bill data:', error);
  //     }
  //   };

  //   fetchBillData(); // Call the fetch function
  // }, [apiUrl, selectedMonths, selectedYear]); // Dependencies
  // const handleButtonClickCard = (params) => {
  //   const data = params.row;
  //   localStorage.setItem("selectedtripsheetid", data.Trip_id);
  //   const customer = encodeURIComponent(data.Organization_name)
  //   localStorage.setItem("selectedcustomerdata", customer)

  //     // const billingPageUrl = `/home/billing/transfer?tab=dataentry&Groupid=${data.Grouptrip_id || ''}&Invoice_no=${data.Invoice_no || ''}&Status=${data.Status || ''}&Billdate=${data.Billdate || ''}&Organization_name=${data.Organization_name || ''}&Trip_id=${data.Trip_id || ''}&FromDate=${data.FromDate || ''}&EndDate=${data.EndDate || ''}&Amount=${data.Amount || ''}&billingsheet=true`
  //     // window.location.href = billingPageUrl
  //     //  const reportPageUrl = `/home/billing/reports?Pendingbills`
  //     const reportPageUrl = `/home/billing/reports?tab=Pendingbills`;
  //     window.location.href = reportPageUrl

  //   // else {
  //   //   const billingPageUrl = `/home/billing/reports?tab=&Group_id=${data.Grouptrip_id || ''}&Invoice_no=${data.Invoice_no || ''}&Status=Billed&BillDate=${data.Billdate || ''}&Customer=${data.Organization_name || ''}&TripId=${data.Trip_id || ''}&FromDate=${data.FromDate || ''}&EndDate=${data.EndDate || ''}&Amount=${data.Amount || ''}&TransferReport=true`;
  //   //   window.location.href = billingPageUrl
  //   // }

  // };
    useEffect(() => {
    const fetchData = async () => {
      try {
        let data = [];
        
        if (selectedMonths !== "All") {
          const response = await axios.get(`${apiUrl}/getvendorAmountDetails`, {
            params: {
              selectedMonth: selectedMonths,
              selectedYear: selectedYear
            }
          });
          console.log(response.data, "vendor amount details------");
          data = response.data;
        } else if (selectedMonths === "All") {
          const response = await axios.get(`${apiUrl}/getVendorAmountAllDetails`, {
            params: {
              selectedYear: selectedYear
            }
          });
          console.log(response.data, "Fetched All vendor amounts----------------");
          data = response.data;
        }
        
        // Update the vendor data state
        setVendorData(data);
        
      } catch (error) {
        console.log(error, "unable to get");
      }
    };
    
    fetchData();
  }, [apiUrl, selectedMonths, selectedYear]);

useEffect(() => {
  const fetchProfitData = async () => {
    try {
      let data = [];
      
      if (selectedMonths !== "All") {
        const response = await axios.get(`${apiUrl}/getAllSelectedMonthProfit`, {
          params: {
            selectedMonth: selectedMonths,
            selectedYear: selectedYear
          }
        });
        console.log(response.data, "Profit data for selected month------");
        data = response.data;
      } else if (selectedMonths === "All") {
        const response = await axios.get(`${apiUrl}/getAllSelectedMonthProfit`, {
          params: {
              selectedMonth: selectedMonths,
            selectedYear: selectedYear
          }
        });
        console.log(response.data, "Fetched All profit data----------------");
        data = response.data;
      }

      const processedData=data.map(item=>({
        ...item,
        profit:Math.max(0,item.profit)
      }));
      
      // Update the profit data state
      setProfitdata(processedData);
      
    } catch (error) {
      console.error('Error fetching profit data:', error);
    }
  };

  fetchProfitData();
}, [apiUrl, selectedMonths, selectedYear]);
                      




  const handleButtonClickCard = (params) => {
    // const data = params.row;
    // localStorage.setItem("selectedtripsheetid", data.Trip_id);
    // const customer = encodeURIComponent(data.Organization_name);
    // localStorage.setItem("selectedcustomerdata", customer);

    // setValue("Pendingbills");
    // localStorage.setItem('reports',"Pendingbills")
    // const reportPageUrl = `/home/billing/reports?orgname=${data.CustomerName || ''}
    // &BillingDate=${data.BillDate || ''}&Customer=${data.CustomerName || ''}
    // &Amount=${data.TotalAmount || 0}`;
    // console.log(data.title,'titkle')
    localStorage.setItem('reports', 'Pendingbills')
    // setValue('Pendingbills');
    const reportPageUrl = `/home/billing/reports`
    window.location.href = reportPageUrl;

    //   if (data.title === 'Billing') {
    //         localStorage.setItem('reports','MonthlyWise')
    //         const reportPageUrl = `/home/billing/reports`
    //         window.location.href = reportPageUrl;
    //           // setValue('Monthly Wise');
    //   //          const reportPageUrl = `/home/billing/reports?orgname=${data.CustomerName || ''}
    //   // &BillingDate=${data.BillDate || ''}&Customer=${data.CustomerName || ''}
    //   // &Amount=${data.TotalAmount || 0}`;
    //   // window.location.href = reportPageUrl;
    // } else if(data.title === 'Recived'){
    //   localStorage.setItem('reports','BilledwiseReceipt')
    //   // setValue('BilledwiseReceipt');
    //    const reportPageUrl = `/home/billing/reports`
    //    window.location.href = reportPageUrl;
    // }else{
    //   localStorage.setItem('reports','Pendingbills')
    //   // setValue('Pendingbills');
    //   const reportPageUrl = `/home/billing/reports`
    //   window.location.href = reportPageUrl;
    // }
    //    console.log(data,'titkle')
    //    console.log(setValue,'setValuefromcard')

    //   // window.location.href = reportPageUrl
  };


  useEffect(()=>{
    const fetchReports=async()=>{
      try{
        const response=await axios.get(`${apiUrl}/getAllCurrentAndPreviousYearReports`,{
          params:{
            fromSelectedYear:fromYear,
            toSelectedYear:toYear,
          },
        });
        setReportData(response.data);
      }catch(error){
        console.error("error fetching reports:",error);
      
      }
    };
    if(fromYear<=toYear){
      fetchReports();
    }
  },[fromYear,toYear,apiUrl])



  return {
    billAmount,
    totalAmountSum,
    totalCollectedSum,
    totalBalanceSum,
    selectedMonth2,
    setSelectedMonth2,
    billData,
    setBillData,
    handleButtonClickCard,
    vendordata,
    profitdata,
    setProfitdata,
    // all,
    // setAll,
    reportData,
    fromYear,
    toYear,
    setFromYear,
    setToYear


  }
}
export default useCard;
