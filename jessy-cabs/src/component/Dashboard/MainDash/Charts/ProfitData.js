import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import "./ProfitData.css"

const ProfitData = ({ data, xKey, title }) => {
  return (
    <div className='barchart-data'>
      <h2 style={{ textAlign: 'center',color:"black" }}>{title || "Profit Summary"}</h2>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data}>
          <XAxis dataKey={xKey}  />
          <YAxis  />
          <Tooltip
            contentStyle={{ backgroundColor: 'black', borderColor: 'green', color: 'white' }}
            labelStyle={{ color: 'white' }}
            itemStyle={{ color: 'white' }}
          />
          <Legend wrapperStyle={{ color: 'white' }} />
          <Bar dataKey="profit" fill="teal" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProfitData;
