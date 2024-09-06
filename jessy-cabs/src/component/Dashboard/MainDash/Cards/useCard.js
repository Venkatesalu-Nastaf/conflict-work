import { useState, useEffect } from "react";
import axios from "axios";
import { APIURL } from "../../../url";

const useCard = () => {
    const [billAmount, setBillAmount] = useState(null);
    const [totalAmountSum, setTotalAmountSum] = useState(0);
    const [totalCollectedSum, setTotalCollectedSum] = useState(0);
    const [totalBalanceSum, setTotalBalanceSum] = useState(0);
    const [selectedMonth2, setSelectedMonth2] = useState(getCurrentMonth());

    function getCurrentMonth() {
        const currentDate = new Date();

        const currentMonth = currentDate.getMonth() + 1; // Returns a number between 0 and 11

        return currentMonth.toString();
    };
    const apiUrl = APIURL;

    useEffect(() => {
        const fetchBillAmount = async () => {
            try {
                const response = await axios.get(`${apiUrl}/getFullBillWisedReport`);
                const data = response.data;

                const totalAmount = data.reduce((acc, item) => acc + parseFloat(item.TotalAmount), 0);
                const totalCollected = data.reduce((acc, item) => acc + parseFloat(item.Collected), 0);
                const totalBalance = data.reduce((acc, item) => acc + parseFloat(item.TotalBalance), 0);

                setTotalAmountSum(totalAmount);
                setTotalCollectedSum(totalCollected);
                setTotalBalanceSum(totalBalance);

                setBillAmount(data);

                // Store the sums in local storage with the same key
                const sums = {
                    totalAmountSum: totalAmount,
                    totalCollectedSum: totalCollected,
                    totalBalanceSum: totalBalance
                };
                localStorage.setItem('sumValues', JSON.stringify(sums));


            } catch (error) {
                console.log('Error fetching BankAccount data:', error);
            }
        };
        fetchBillAmount();
    }, [apiUrl]);

    return {
        billAmount,
        totalAmountSum,
        totalCollectedSum,
        totalBalanceSum,
        selectedMonth2,
        setSelectedMonth2
    }
}
export default useCard;
