import React from "react";
import Chart from "react-apexcharts";
import "./CustomerReview.css";

import { useData1 } from "../../../Maindashboard/DataContext";


const CustomerReview = ({ station }) => {
const { todaybooking, viewmonthdata } = useData1();
const stationarray = station?.map(data => data.Stationname);
const data1 = stationarray?.filter(data => data !== 'All')
const todaybook = todaybooking?.map((data) => data.count)


 const getData = () => {
    if (viewmonthdata === "monthly") {
      return {
        categories: data1,
        data: todaybook,
      }
    } else if (viewmonthdata === "weekly") {
      return {
        categories: data1,
        data: todaybook,
      };
    }
    else {
      // Yesterday data is already set in state
      return {
        categories: data1,
        data: todaybook,
      };
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
        height: 320,
      },
      xaxis: {
        categories: getData().categories,
      },
    },
  };




  return (
    <div className="CustomerReview weekly-chart" id="areachart">
 <h3  className="area-text-chart">Area Chart</h3>
 {/* <p style={{margin:"0px"}}>zzzzzzzzzzzzz</p> */}
      <Chart options={data.options} series={data.series} type="bar" height={300} />

    </div>
  );
};

export default CustomerReview;
