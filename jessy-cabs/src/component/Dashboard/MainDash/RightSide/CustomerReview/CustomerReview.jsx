import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import "./CustomerReview.css";

import { useData1 } from "../../../Maindashboard/DataContext";

const CustomerReview = ({ station }) => {
  const { todaybooking, viewmonthdata } = useData1();

  const stationarray = station?.map((data) => data.Stationname);
  const data1 = stationarray?.filter((data) => data !== "All");
  const todaybook = todaybooking?.map((data) => data.count);

  // Prepare Recharts data format
  const chartData = data1?.map((name, index) => ({
    name,
    Booking: todaybook?.[index] || 0,
  }));

  return (
    <div className="CustomerReview weekly-chart" id="barchart">
      <h3 className="area-text-chart" style={{fontWeight:"bold"}}>Area Chart</h3>
   <div className="tt-div" style={{ width: '100%',  }}>
  <div style={{ width: chartData.length * 80 }}>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        barCategoryGap="10%" 
        barGap={2}            
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Booking" fill="#8884d8" barSize={30}  alignmentBaseline="start"/>
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>


    </div>
  );
};

export default CustomerReview;
