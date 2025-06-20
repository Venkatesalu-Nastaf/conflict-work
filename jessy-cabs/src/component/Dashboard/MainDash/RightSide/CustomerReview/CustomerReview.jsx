import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
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

 // Fixed bar width (per item) and chart width calculation
  const calculateChartWidth = () => {
    const barWidth = 50; // pixels per bar
    const padding = 70; // extra space for legend/padding
    return chartData?.length ? chartData.length * barWidth + padding : 300;
  };
  

  return (
<div className="CustomerReview weekly-chart">
  <h3 className="area-text-chart">Area Chart</h3>
  <div className="tt-div">
    <div className="area-graph"
      style={{
        width: calculateChartWidth(),
      }}
    >
     <ResponsiveContainer width="100%" height={200}>
  <BarChart
    data={chartData}
    margin={{ top: 20, right: 20, left: 10, bottom: 50 }} // Added bottom margin
  >
    <XAxis
      dataKey="name"
      stroke="#333"
      width={10}
      height={5}
      interval={0} // Show all labels
      tick={{
        fontSize: 10,
        angle: -45,
        textAnchor: 'end',
        dy: 10
      }}
    />
   <YAxis
  width={10}
  stroke="#333"
  tick={{ fontSize: 10 }}
>
  
</YAxis>

    <Tooltip
      contentStyle={{ backgroundColor: 'black', borderColor: 'green', color: 'white' }}
      labelStyle={{ color: 'white' }}
      itemStyle={{ color: 'white' }}
    />
    <Legend />
   <Bar
  dataKey="Booking"
  barSize={30}
  radius={[4, 4, 0, 0]}
  fill="#8884d8"
  label={({ x, y, value }) => (
    <text
      x={x + 5}         // Add small padding from left
      y={y - 5}         // Move slightly above the bar
      fill="#333"
      fontSize={12}
      textAnchor="start"
    >
      {value}
    </text>
  )}
/>

  </BarChart>
</ResponsiveContainer>

    </div>
  </div>
</div>

  );
};

export default CustomerReview;
