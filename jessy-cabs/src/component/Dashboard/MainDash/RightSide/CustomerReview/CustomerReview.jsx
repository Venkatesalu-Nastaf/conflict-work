import React, { useState } from "react";
import Chart from "react-apexcharts";
import "./CustomerReview.css";

const CustomerReview = () => {
  const [viewType, setViewType] = useState("monthly");

  const handleWeeklyView = () => {
    setViewType("weekly");
  };

  const handleMonthlyView = () => {
    setViewType("monthly");
  };

  const handleYesterdayView = () => {
    // Logic to fetch data for yesterday
    // For example, you can fetch data from an API or calculate it based on existing data
    const yesterdayData = [25, 30, 35, 40, 35, 45, 50, 60, 55];
    const categories = ["Hour 1", "Hour 2", "Hour 3", "Hour 4", "Hour 5", "Hour 6", "Hour 7", "Hour 8", "Hour 9"]; // Sample categories

    setViewType("yesterday");
    setChartData({ categories, data: yesterdayData });
  };

  const [chartData, setChartData] = useState({
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    data: [30, 40, 45, 50, 49, 60, 70, 91, 125],
  });

  const getData = () => {
    if (viewType === "monthly") {
      return chartData;
    } else if (viewType === "weekly") {
      return {
        categories: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8", "Week 9"],
        data: [10, 20, 15, 30, 25, 35, 40, 50, 45],
      };
    } else {
      // Yesterday data is already set in state
      return chartData;
    }
  };

  const data = {
    series: [
      {
        name: "Booking",
        data: getData().data,
      },
    ],
    options: {
      chart: {
        type: "line",
      },
      xaxis: {
        categories: getData().categories,
      },
    },
  };

  return (
    <div className="CustomerReview weekly-chart" id="areachart">
      <div className="button-container ">
        <button onClick={handleMonthlyView} className="graph-all-button">All</button>
        <button onClick={handleWeeklyView} className="graph-weekly-button">Weekly</button>
        <button onClick={handleYesterdayView} className="graph-yesterday-button">Yesterday</button>
      </div>
      <Chart options={data.options} series={data.series} type="bar" />
    </div>
  );
};

export default CustomerReview;
