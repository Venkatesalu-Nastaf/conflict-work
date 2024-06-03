
import React, { useEffect, useState } from "react";
import "./Cards.css";
// import { CardsData } from "./Cards-Data.js";
import Card from "./Card/Card";

import { FaRupeeSign, FaRegMoneyBillAlt } from "react-icons/fa";

import { APIURL } from "../../../url";
import { BiPaste } from "react-icons/bi";
const apiUrl = APIURL;

const Cards = () => {

  const [selectedMonth2, setSelectedMonth2] = useState(getCurrentMonth());
  const [backendmonth, setBackendmonth] = useState([])
  const [billinggraph, setBillingGraph] = useState([])
  const lastMonthTotalAmount = backendmonth?.lastMonth?.totalAmount || 0;
  const lastMonthTotalPaid = backendmonth?.lastMonth?.totalPaid || 0;
  const lastMonthTotalPending = backendmonth?.lastMonth?.totalPending || 0;
  // console.log(lastMonthTotalAmount, "amount ")
  // console.log(lastMonthTotalPending, "amount pend")
  // console.log(lastMonthTotalPaid, "amount paid")

  function getCurrentMonth() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // Returns a number between 0 and 11
    return currentMonth.toString(); // Convert to string for comparison with option values
  };

  const fetchDataFromBackend = async (month) => {
    // console.log(month,"kkk")
    try {
      const response = await fetch(`${apiUrl}/total_amounts_from_billing?month=${month}`);
      if (!response.ok) {
        return { totalAmount: 0, totalPaid: 0, totalPending: 0 };
      }
      if (response.status === 200) {
        const data = await response.json();
        setBackendmonth(data)
        return data;
      }
      else {
        // const timer = setTimeout(fetchDataFromBackend, 2000);
        // return () => clearTimeout(timer);
        return
      }
    } catch {
      return { totalAmount: 0, totalPaid: 0, totalPending: 0 };
    }
  };

  const fetchMonthlyDataFromBackend = async (month) => {
    try {
      const response = await fetch(`${apiUrl}/monthly_data2?month=${month}`);
      if (!response.ok) {
        return [];
      }
      if (response.status === 200) {
        const data = await response.json();
        return data;
      } else {
        return
        // const timer = setTimeout(fetchMonthlyDataFromBackend, 2000);
        // return () => clearTimeout(timer);
      }
    } catch {
      return [];
    }
  };

  const salesData = billinggraph.map(item => ({
    date: item.Billingdate,

    value: parseFloat(item.Totalamount) || 0,
  }));

  const revenueData = billinggraph.map(item => ({
    date: item.Billingdate,
    value: parseFloat(item.paidamount) || 0,
  }));

  const pendingData = billinggraph.map(item => ({
    date: item.Billingdate,
    value: parseFloat(item.pendingamount) || 0,
  }));
  const handleMonthChange = (event) => {

    setSelectedMonth2(event.target.value);
    // setSelectedmonth(event.target.value)
    fetchDataFromBackend(event.target.value)
    fetchMonthlyDataFromBackend(event.target.value)

  };
  const calculatePercentageChange = (TotalAmount, previousValue) => {
    // console.log(previousValue,"pre",currentValue)
    if (previousValue === 0 || TotalAmount === 0) {
      return TotalAmount = 0;
    }
    const percentageChange = ((TotalAmount - previousValue) / TotalAmount) * 100
    // console.log(percentageChange, "pre ")
    return percentageChange.toFixed(1);
  };

  const totalPaidPercentageChange = calculatePercentageChange(
    lastMonthTotalAmount,
    lastMonthTotalPending,
    // lastMonthTotalPaid,

  );
  const totalPendingPercentageChange = calculatePercentageChange(
    lastMonthTotalAmount,
    // lastMonthTotalPending,
    lastMonthTotalPaid
  );

  const cardData = [
    {
      title: "Billing",
      color: {
        backGround: "linear-gradient(rgb(33, 152, 171) 35%, rgb(143, 228, 241) 92%)",
        boxShadow: "0px 0px 0px 0px #e0c6f5",
      },
      barValue: "",
      value: lastMonthTotalAmount.toLocaleString(),
      png: FaRupeeSign,
      series: [{ name: "Sales", data: salesData.map(data => data.value), categories: salesData.map(data => data.date) }],
    },
    {
      title: "Recived",
      color: {
        backGround: "linear-gradient(rgb(226, 165, 90) 35%, rgb(236, 194, 142) 92%)",
        boxShadow: "0px 0px 0px 0px #FDC0C7",
      },
      barValue: totalPaidPercentageChange,
      value: lastMonthTotalPaid.toLocaleString(),
      png: FaRegMoneyBillAlt,
      series: [{ name: "Revenue", data: revenueData.map(data => data.value), categories: revenueData.map(data => data.date) }],
    },
    {
      title: "Pending",
      color: {
        backGround: "linear-gradient(rgb(55, 55, 81) 35%, rgb(123 123 147) 92%)",
        boxShadow: "0px 0px 0px 0px #F9D59B",
      },
      barValue: totalPendingPercentageChange,
      value: lastMonthTotalPending.toLocaleString(),
      png: BiPaste,
      series: [{ name: "Pending", data: pendingData.map(data => data.value), categories: pendingData.map(data => data.date) }],
    },
  ];

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const result = await fetchDataFromBackend(selectedMonth2);
        setBackendmonth(result);
        const result2 = await fetchMonthlyDataFromBackend(selectedMonth2)
        setBillingGraph(result2)

      } catch {

      }
    };
    fetchData2();
  }, [selectedMonth2]);

  return (
    <div className="cards-container">
      <div className="card-filter">
        <label className="card-filter-label" htmlFor="month">Select Month</label>
        <select id="month" name="month" value={selectedMonth2} onChange={handleMonthChange}>
          <option value="0">January</option>
          <option value="1">February</option>
          <option value="2">March</option>
          <option value="3">April</option>
          <option value="4">May</option>
          <option value="5">June</option>
          <option value="6">July</option>
          <option value="7">August</option>
          <option value="8">September</option>
          <option value="9">October</option>
          <option value="10">November</option>
          <option value="11">December</option>
        </select>
      </div>
      <div className="Cards" >
        {cardData.map((card, index) => (
          <div className="parentContainer cards-dashboard" key={index} >
            <Card
              title={card.title}
              color={card.color}
              barValue={card.barValue}
              value={card.value}
              png={card.png}
              series={card.series}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
