import React, { useEffect, useState } from "react";
import "./Cards.css";
// import { CardsData } from "./Cards-Data.js";
import Card from "./Card/Card";
import { FaRupeeSign, FaRegMoneyBillAlt } from "react-icons/fa";
import useCard from "./useCard";
import { APIURL } from "../../../url";
import { BiPaste } from "react-icons/bi";
import Updates from "../RightSide/Updates/Updates";
import numbro from 'numbro';
import { PdfData } from "../../../Billings/Transfer/TransferReport/PdfContext";
import { YearData } from "./yearData";
import ProfitData from '../Charts/../Charts/../Charts/../Charts/ProfitData';
import {PieChart,Pie,Cell,Tooltip,ResponsiveContainer,} from 'recharts';
import "../Charts/../Charts/../Charts/../Charts/ProfitData.css";
import "../Charts/../Charts/../Charts/../Charts/ProfitCharts.css";
import { FiLogOut } from 'react-icons/fi';
import { FaUserFriends, FaCheckCircle, FaAward } from 'react-icons/fa';


const apiUrl = APIURL;

const COLORS = ['#8884d8', '#82ca9d','#556B2F'];

 

const Cards = () => {

  const [backendmonth, setBackendmonth] = useState([])
  const [billinggraph, setBillingGraph] = useState([])
  const[formattedProfitDatas,setFormattedProfitDatas]=useState([])
  const lastMonthTotalAmount = backendmonth?.lastMonth?.totalAmount || 0;
  const lastMonthTotalPaid = backendmonth?.lastMonth?.totalPaid || 0;
  const lastMonthTotalPending = backendmonth?.lastMonth?.totalPending || 0;
  const { totalAmountSum, selectedMonth2, setSelectedMonth2 ,vendordata,profitdata,reportData,fromYear,toYear,setFromYear,setToYear} = useCard();
  const { selectedMonths, setSelectedMonths, selectedYear, setSelectedYear,setReportData } = PdfData();
  const [chartData, setChartData] = useState([]);
const [xKey, setXKey] = useState("month");
const [title, setTitle] = useState("");
const [yearRange,setYearRange]=useState(false);

  const TotalNumber = (number) => {
    if (!number || isNaN(number)) {
      return number; // Return a default or fallback value
    }
    const TotalValue = number.toString();

    if (TotalValue.length === 5) {
      const remove = TotalValue.slice(0, -3) + "K";
      return remove;
    }

    if (TotalValue.length === 6) {
      const lakhValue = (number / 100000).toFixed(2);
      const formatted = lakhValue + " Lakh";
      return formatted;
    }
    if (TotalValue.length === 7) {
      const lakhValue = (number / 100000).toFixed(2); // Divide by 1 lakh and keep two decimal places
      const formatted = lakhValue + " Lakh"; // Append 'Lakh'
      return formatted;
    }
    if (TotalValue.length === 8) {
      const croreValue = (number / 10000000).toFixed(2)
      const formatted = croreValue + " Crore";
      return formatted
    }

    return number;

  };


  const PendingNumber = (number) => {
    if (!number || isNaN(number)) {
      return number; // Return a default or fallback value
    }
    const PendingValue = number.toString();

    if (PendingValue.length === 5) {
      const remove = PendingValue.slice(0, -3) + "K";
      return remove;
    }

    // For numbers in lakhs (6 digits)
    if (PendingValue.length === 6) {
      const lakhValue = (number / 100000).toFixed(2);
      const formatted = lakhValue + " Lakh";
      return formatted;
    }
    if (PendingValue.length === 7) {
      const lakhValue = (number / 100000).toFixed(2); // Divide by 1 lakh and keep two decimal places
      const formatted = lakhValue + " Lakh"; // Append 'Lakh'
      return formatted;
    }


    return number;
  };


  const CollectedNumber = (number) => {
    if (!number || isNaN(number)) {
      return number; // Return a default or fallback value
    }
    const CollectedValue = number.toString();

    if (CollectedValue.length === 5) {
      const remove = CollectedValue.slice(0, -3) + "K";
      return remove;
    }

    // For numbers in lakhs (6 digits)
    if (CollectedValue.length === 6) {
      const lakhValue = (number / 100000).toFixed(2); // Divide by 1 lakh and keep two decimal places
      const formatted = lakhValue + " Lakh"; // Append 'Lakh'
      return formatted;
    }
    if (CollectedValue.length === 7) {
      const lakhValue = (number / 100000).toFixed(2); // Divide by 1 lakh and keep two decimal places
      const formatted = lakhValue + " Lakh"; // Append 'Lakh'
      return formatted;
    }

    return number;
  }

  const fetchDataFromBackend = async (month) => {

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

  const storedSums = JSON.parse(localStorage.getItem('sumValues'));
  const TotalValueNumber = TotalNumber(storedSums?.totalAmountSum);
  const PendingValueNumber = PendingNumber(storedSums?.totalBalanceSum);
  const CollectedValueNumber = CollectedNumber(storedSums?.totalCollectedSum);

  const TotalValueAmount = storedSums?.totalAmountSum;
  const PendingValueAmount = storedSums?.totalBalanceSum;
  const CollectedValueAmout = storedSums?.totalCollectedSum;

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
    console.log(event.target.value, 'selectmonth');

    setSelectedMonth2(event.target.value);
    setSelectedMonths(event.target.value)
    setYearRange(false)
    // setSelectedmonth(event.target.value)
    // fetchDataFromBackend(event.target.value)
    // fetchMonthlyDataFromBackend(event.target.value)

  };
  const calculatePercentageChange = (TotalAmount, previousValue) => {
    if (previousValue === 0 || TotalAmount === 0) {
      return TotalAmount = 0;
    }
    const percentageChange = ((TotalAmount - previousValue) / TotalAmount) * 100
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
      backGround: "linear-gradient(135deg,  #f5a690 0%,  #e0e0e0 50%, #f5a690 100%)", // soft blue to bright blue-purple
      boxShadow: "0px 4px 15px rgba(220, 141, 87, 0.5)",
     color: "#6B4226",
    },
    barValue: "",
    value: lastMonthTotalAmount.toLocaleString(),
    png: FaRupeeSign,
    series: [{ name: "Sales", data: salesData.map(data => data.value), categories: salesData.map(data => data.date) }],
    totalamount: TotalValueAmount || 0
  },
  {
    title: "Recived",
    color: {
      backGround: "linear-gradient(135deg, #a29fd6 0%, #e0e0e0 50%, #a29fd6 100%)",
      boxShadow: "0px 4px 15px rgba(78, 29, 122, 0.5)",
     color: "#6e496d", 
    },
    barValue: totalPaidPercentageChange,
    value: lastMonthTotalPaid.toLocaleString(),
    png: FaRegMoneyBillAlt,
    series: [{ name: "Revenue", data: revenueData.map(data => data.value), categories: revenueData.map(data => data.date) }],
    totalamount: CollectedValueAmout || 0
  },
  {
    title: "Pending",
    color: {
      backGround: "linear-gradient(135deg,  #56cfe1 0%, #e0e0e0 50%, #56cfe1 100%)", // soft pink to pale peach
      boxShadow: "0px 4px 15px rgba(62, 160, 165, 0.5)",
      color: "teal",
    },
    barValue: totalPendingPercentageChange,
    value: lastMonthTotalPending.toLocaleString(),
    png: BiPaste,
    series: [{ name: "Pending", data: pendingData.map(data => data.value), categories: pendingData.map(data => data.date) }],
    totalamount: PendingValueAmount || 0
  },
];


  // useEffect(() => {
  //   const fetchData2 = async () => {
  //     try {
  //       const result = await fetchDataFromBackend(selectedMonth2);
  //       setBackendmonth(result);
  //       const result2 = await fetchMonthlyDataFromBackend(selectedMonth2)
  //       setBillingGraph(result2)

  //     } catch {

  //     }
  //   };
  //   fetchData2();
  // }, [selectedMonth2]);
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    setYearRange(false)
  };

useEffect(() => {
  if (Array.isArray(reportData)) {
    const formatted = reportData.map(item => ({
      year: item.year,
      profit: item.profit,
    }));
    setFormattedProfitDatas(formatted);
  }
}, [reportData]);

// Helper function
const getMonthName = (monthNumber) => {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return monthNames[monthNumber - 1] || "";
};

const allMonths=Array.from({length:12},(_,i)=>({
  monthNumber:i+1,
  month:getMonthName(i+1),
  profit:0,
}))

// Recalculate chart data whenever selection changes
useEffect(() => {
  const isAllMonths = selectedMonth2.toLowerCase() === "all";
  const isYearRangeSelected = fromYear !== "" && toYear !== "";

  // Format profitdata to include readable month names
   const formattedData = allMonths.map(monthData => {
    const existing = profitdata.find(item => item.month === monthData.monthNumber);
    return existing
      ? {
          ...monthData,
          profit: existing.profit,
        }
      : monthData;
  });

  let updatedData = [];
  let updatedXKey = "";
  let updatedTitle = "";

if (yearRange) {
  updatedTitle = `Annual Profit Report (${fromYear} - ${toYear})`;
  updatedXKey = "year";
  updatedData = formattedProfitDatas.filter(item =>
    parseInt(item.year) >= parseInt(fromYear) &&
    parseInt(item.year) <= parseInt(toYear)
  );
} 
else {
  setYearRange(false)
  updatedTitle = "Monthly Profit Report";
  updatedXKey = "month";
  updatedData = formattedData;
}


  setChartData(updatedData);
  setTitle(updatedTitle);
  setXKey(updatedXKey);
}, [selectedMonth2, fromYear, toYear, profitdata, formattedProfitDatas,profitdata]);

  console.log(vendordata,"vvvvvvvvvvvvvvvvvvvvvvvvvvvvv");
  console.log(profitdata,"KKKKKKKK");
  console.log(reportData,"llllllllllllll");
  const pieData = [
  { name: 'Vendor', value: vendordata.totalVendorAmount },
  { name: 'Customer', value: vendordata.totalCalcAmount },
  { name: 'profit', value: vendordata.profit }
];


   const handlefromYearChange = (event) => {
    console.log(event.target.value, 'selectmonth');

    setFromYear(event.target.value);
    setYearRange(true)
   

  };
  
    const handletoYearChange = (event) => {
    setToYear(event.target.value);
    setYearRange(true)
  };

 

    
  return (
    <>
    <div className="cards-container">

      <div className="card-filter">
        <div className="label">
          <label className="card-filter-label" htmlFor="month">Select Month</label>
          
          <select id="month" name="month" value={selectedMonth2} onChange={handleMonthChange} style={{width:"150px"}}>
            <option value="All">All</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
        <div style={{width:'20px'}}>
          <label className="card-filter-label" htmlFor="year">Year</label>

          <select id="year" name="year" value={selectedYear} onChange={handleYearChange} style={{width:"100px"}}>
            <option >{selectedYear}</option>
            {YearData?.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
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
                amount={card.totalamount}
              />
            </div>
          ))}
        </div>



        {/* <div>
          <Updates />
        </div> */}
  <div className="chart-container">
      <div className='profit-data'>
      <div className="card-filter-data">
  <div className="from">
    <label className="card-filter-label">From</label>
    <select 
      value={fromYear} 
      onChange={handlefromYearChange}
      style={{ width: "100px" }}
    >
      {YearData?.map((year) => (
        <option key={year} value={year}>{year}</option>
      ))}
    </select>
  </div>
  <div className="to">
    <label className="card-filter-label">To</label>
    <select 
      value={toYear} 
      onChange={handletoYearChange} 
      style={{ width: "100px" }}
    >
      {YearData?.map((year) => (
        <option key={year} value={year}>{year}</option>
      ))}
    </select>
  </div>
</div>
<ProfitData data={chartData} xKey={xKey} title={title} charttype="bar" />

 </div>
 <div className='profitvendor-data'>
   <div className='vendor-diagram'>
                
                <ResponsiveContainer width="100%" height={260}>
  <PieChart>
    <Pie
      data={
        pieData && pieData.length > 0 && pieData.some(item => item.value > 0)
          ? pieData
          : [{ name: "No Data", value: 1 }]
      }
      dataKey="value"
      nameKey="name"
      cx="50%"
      cy="50%"
      outerRadius={90}
      label={(entry) => entry.name}
    >
      {(pieData && pieData.length > 0 && pieData.some(item => item.value > 0)
        ? pieData
        : [{ name: "No Data", value: 1 }]
      ).map((entry, i) => (
        <Cell
          key={`cell-${i}`}
          fill={
            pieData && pieData.length > 0 && pieData.some(item => item.value > 0)
              ? COLORS[i % COLORS.length]
              : "gray"
          }
        />
      ))}
    </Pie>
    <Tooltip />
  </PieChart>
</ResponsiveContainer>

                </div>
           


</div>
</div>
    </div>
    </>
  );
};

export default Cards;
