import { useState, useEffect } from "react";
import axios from "axios";
import { APIURL } from "../../../url";
import { PdfData } from "../../../Billings/Transfer/TransferReport/PdfContext";

const useCard = () => {
    const [billAmount, setBillAmount] = useState(null);
    const [totalAmountSum, setTotalAmountSum] = useState(0);
    const [totalCollectedSum, setTotalCollectedSum] = useState(0);
    const [totalBalanceSum, setTotalBalanceSum] = useState(0);
    const [selectedMonth2, setSelectedMonth2] = useState(getCurrentMonth());

    const [billData, setBillData] = useState([]); 
    const {selectedMonths}  = PdfData();
 
    function getCurrentMonth() {
        const currentDate = new Date();

        const currentMonth = currentDate.getMonth() + 1; // Returns a number between 0 and 11

        return currentMonth.toString();
    };
    const apiUrl = APIURL;

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
        console.log(selectedMonth2, typeof selectedMonth2, 'sssssssssss');
       

        const fetchBillAmount = async () => {
            try {
                let data = [];

                if (selectedMonth2 === "All") {
                    const response = await axios.get(`${apiUrl}/getFullBillWisedReport`);
                    data = response.data;
                    console.log(response,'response')
                    

                } else if (selectedMonth2 !== "All") {
                    const response = await axios.post(`${apiUrl}/getMonthWiseTotal`, {
                        selectMonth: selectedMonth2,
                    });
                    console.log(response.data, 'select month response');
                    data = response.data;
                }

                const totalAmount = data.reduce((acc, item) => acc + parseFloat(item.TotalAmount), 0);
                const totalCollected = data.reduce((acc, item) => acc + parseFloat(item.Collected), 0);
                const totalBalance = data.reduce((acc, item) => acc + parseFloat(item.TotalBalance), 0);

                setTotalAmountSum(totalAmount);
                setTotalCollectedSum(totalCollected);
                setTotalBalanceSum(totalBalance);
                setBillAmount(data);
                const sums = {
                    totalAmountSum: totalAmount,
                    totalCollectedSum: totalCollected,
                    totalBalanceSum: totalBalance
                };
                localStorage.setItem('sumValues', JSON.stringify(sums));
            } catch (error) {
                console.log('Error fetching Bill Amount data:', error);
            }
        };
        fetchBillAmount();
    }, [apiUrl, selectedMonth2]);
     
   // my code for all data 

console.log(selectedMonth2,'selecttt111111111',selectedMonths);
useEffect(() => {
    console.log(selectedMonth2,'selecttttttttttttt',selectedMonths);
    
    const fetchBillData = async () => {
      try {
        let data = [];
        if (selectedMonths === "All") {
          const response = await axios.get(`${apiUrl}/getFullBillWisedReportcards`);
          data = response.data; // Fetch all data
          console.log(data, 'MaaFetched All Bill Data');
          setBillData(data); // Update state with the fetched data
          console.log(response.data, 'Maaaaaaaa');
          return    
        } else if (selectedMonths !== "All") {
          const response = await axios.post(`${apiUrl}/getmonthwisedatas`, {
            selectMonth: selectedMonths,
          });
          data = response.data; // Fetch month-specific data
          console.log(data, 'Fetched Month-Wise Bill Data');
          setBillData(data); // Update state with the fetched data
          console.log(response.data, 'Maaaaaaaaaaannnnnnnn');

        }
      } catch (error) {
        console.error('Error fetching bill data:', error);
      }
    };
  
    fetchBillData(); // Call the fetch function
  }, [apiUrl, selectedMonths]); // Dependencies
  

 
    return {
        billAmount,
        totalAmountSum,
        totalCollectedSum,
        totalBalanceSum,
        selectedMonth2,
        setSelectedMonth2,
        billData,
        setBillData
       
    }
}
export default useCard;
