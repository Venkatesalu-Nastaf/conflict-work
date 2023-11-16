import { FaRupeeSign } from "@react-icons/all-files/fa/FaRupeeSign";
import { FaRegMoneyBillAlt } from "@react-icons/all-files/fa/FaRegMoneyBillAlt";
import { BiPaste } from "@react-icons/all-files/bi/BiPaste";

const fetchDataFromBackend = async (date) => {
  try {
    const response = await fetch(`http://localhost:8081/total_amounts_from_billing?date=${date}`);

    if (!response.ok) {
      return { totalAmount: 0, totalPaid: 0, totalPending: 0 };
    }

    const data = await response.json();
    console.log('Sales amount:', data);
    return data;
  } catch {
    // console.error('Error fetching data from backend:', error);
    return { totalAmount: 0, totalPaid: 0, totalPending: 0 };
  }
};

const fetchMonthlyDataFromBackend = async (startDate, endDate) => {
  try {
    const response = await fetch(`http://localhost:8081/monthly_data?startDate=${startDate}&endDate=${endDate}`);

    if (!response.ok) {
      return [];
    }
    const data = await response.json();
    console.log('Monthly data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching monthly data from backend:', error);
    return [];
  }
};


const calculatePercentageChange = (previousValue, currentValue) => {
  if (previousValue === 0) {
    return currentValue > 0 ? 100 : 0;
  }

  const percentageChange = ((currentValue - previousValue) / Math.abs(previousValue)) * 100;
  console.log(`Previous: ${previousValue}, Current: ${currentValue}, Percentage Change: ${percentageChange}%`);
  return percentageChange.toFixed(1);
};

export const cardsData = async () => {
  // Fetch data for the current date
  const currentDate = new Date().toISOString();
  const backendDataCurrent = await fetchDataFromBackend(currentDate);

  // Fetch data for the last month
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  const lastMonthStart = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1);
  const lastMonthEnd = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0);

  const lastMonthStartStr = lastMonthStart.toISOString().split('T')[0];
  const lastMonthEndStr = lastMonthEnd.toISOString().split('T')[0];

  const backendDataLastMonth = await fetchDataFromBackend(`${lastMonthStartStr}/${lastMonthEndStr}`);

  const backendMonthlyData = await fetchMonthlyDataFromBackend(lastMonthStartStr, currentDate);

  // Extract series data from backendMonthlyData and use it in cardData
  // const seriesData = backendMonthlyData.map(item => ({ name: item.name, data: item.data }));

  const totalAmountPercentageChange = calculatePercentageChange(
    backendDataLastMonth.lastMonth.totalAmount,
    backendDataCurrent.current.totalAmount
  );
  const totalPaidPercentageChange = calculatePercentageChange(
    backendDataLastMonth.lastMonth.totalPaid,
    backendDataCurrent.current.totalPaid
  );
  const totalPendingPercentageChange = calculatePercentageChange(
    backendDataLastMonth.lastMonth.totalPending,
    backendDataCurrent.current.totalPending
  );

  // Extract relevant data for each chart
  const salesData = backendMonthlyData.map(item => ({
    date: item.Billingdate,
    value: parseFloat(item.Totalamount),
  }));

  const revenueData = backendMonthlyData.map(item => ({
    date: item.Billingdate,
    value: parseFloat(item.paidamount),
  }));

  const pendingData = backendMonthlyData.map(item => ({
    date: item.Billingdate,
    value: parseFloat(item.pendingamount),
  }));

  console.log("Total Amount Percentage Change:", totalAmountPercentageChange);
  console.log("Total Paid Percentage Change:", totalPaidPercentageChange);
  console.log("Total Pending Percentage Change:", totalPendingPercentageChange);

  console.log("Total Amount Percentage Change in chart:", salesData);
  console.log("Total Paid Percentage Change in chart:", revenueData);
  console.log("Total Pending Percentage Change in chart:", pendingData);

  // Adjust bar values based on the percentage change
  const cardData = [
    {
      title: "Sales",
      color: {
        backGround: "linear-gradient(rgb(33, 152, 171) 35%, rgb(143, 228, 241) 92%)",
        boxShadow: "0px 0px 0px 0px #e0c6f5",
      },
      barValue: totalAmountPercentageChange,
      value: backendDataCurrent.current.totalAmount.toLocaleString(),
      png: FaRupeeSign,
      // series: [{ name: "Sales", data: salesData }],
      series: [{ name: "Sales", data: salesData.map(data => data.value), categories: salesData.map(data => data.date) }],
    },
    {
      title: "Revenue",
      color: {
        backGround: "linear-gradient(rgb(226, 165, 90) 35%, rgb(236, 194, 142) 92%)",
        boxShadow: "0px 0px 0px 0px #FDC0C7",
      },
      barValue: totalPaidPercentageChange,
      value: backendDataCurrent.current.totalPaid.toLocaleString(),
      png: FaRegMoneyBillAlt,
      // series: [{ name: "Revenue", data: revenueData }],
      series: [{ name: "Revenue", data: revenueData.map(data => data.value), categories: revenueData.map(data => data.date) }],
    },
    {
      title: "Pending",
      color: {
        backGround: "linear-gradient(rgb(55, 55, 81) 35%, rgb(123 123 147) 92%)",
        boxShadow: "0px 0px 0px 0px #F9D59B",
      },
      barValue: totalPendingPercentageChange,
      value: backendDataCurrent.current.totalPending.toLocaleString(),
      png: BiPaste,
      // series: [{ name: "Pending", data: pendingData }],
      series: [{ name: "Pending", data: pendingData.map(data => data.value), categories: pendingData.map(data => data.date) }],
    },
  ];

  return cardData;
};
