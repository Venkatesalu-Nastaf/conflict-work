import React , {useState} from 'react';
import ReactApexChart from 'react-apexcharts';
// import React, { useEffect } from 'react';
// import Highcharts from 'highcharts/highstock';
// import HighchartsExporting from 'highcharts/modules/exporting';
// import HighchartsExportData from 'highcharts/modules/export-data';
// import HighchartsAccessibility from 'highcharts/modules/accessibility';

// HighchartsExporting(Highcharts);
// HighchartsExportData(Highcharts);
// HighchartsAccessibility(Highcharts);

import './CustomerReview.css'
const CustomerReview = () => {
  // const data = {
  //   series: [ 
  //     {
  //       name: "Booking",
  //       data: [30, 40, 45, 50, 49, 60, 70, 91, 125],
  //     },
  //   ],
  //   options: {
  //     chart: {
  //       type: "line",
  //     },
  //     xaxis: {
  //       categories: [
  //         "Jan",
  //         "Feb",
  //         "Mar",
  //         "Apr",
  //         "May",
  //         "Jun",
  //         "Jul",
  //         "Aug",
  //         "Sep",
  //       ],
  //     },
  //   },
  // };


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('https://demo-live-data.highcharts.com/aapl-c.json');
  //       const data = await response.json();

  //       Highcharts.stockChart('container', {
  //         rangeSelector: {
  //           selected: 1,
  //           buttons: [
  //             {
  //               type: 'week',
  //               count: 1,
  //               text: '1w',
  //             },
  //             {
  //               type: 'all',
  //               text: 'All',
  //             },
  //           ],
  //         },
  //         title: {
  //           text: 'AAPL Stock Price',
  //         },
  //         series: [
  //           {
  //             name: 'AAPL Stock Price',
  //             data: data,
  //             type: 'area',
  //             threshold: null,
  //             tooltip: {
  //               valueDecimals: 2,
  //             },
  //             fillColor: {
  //               linearGradient: {
  //                 x1: 0,
  //                 y1: 0,
  //                 x2: 0,
  //                 y2: 1,
  //               },
  //               stops: [
  //                 [0, Highcharts.getOptions().colors[0]],
  //                 [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')],
  //               ],
  //             },
  //           },
  //         ],
  //       });
  //     } catch (error) {
  //       console.error('Error fetching or processing data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const [filter, setFilter] = useState('daily'); // Initial filter state, can be 'daily', 'weekly', or 'yesterday'

  const data = {
    daily: {
      categories: [
        "01 Jan",
        "02 Jan",
        "03 Jan",
        "04 Jan",
        "05 Jan",
        "06 Jan",
        "07 Jan"
      ],
      series: [
        {
          name: "Series 1",
          data: [45, 52, 38, 45, 19, 23, 2]
        }
      ]
    },
    weekly: {
      categories: [
        "Week 1",
        "Week 2",
        "Week 3",
        "Week 4"
      ],
      series: [
        {
          name: "Series 1",
          data: [150, 200, 180, 210]
        }
      ]
    },
    yesterday: {
      categories: [
        "Yesterday"
      ],
      series: [
        {
          name: "Series 1",
          data: [25]
        }
      ]
    }
  };

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const options = {
    chart: {
      height: 280,
      type: "area",
      background: '#ffffff' // Set background color to white
    },
    dataLabels: {
      enabled: false
    },
    series: data[filter].series,
    xaxis: {
      categories: data[filter].categories
    }
  };
  return (
    <div id="chart" style={{ maxWidth: '650px'}}>
      <div style={{display:'flex', gap:'0px'}}>
        <button onClick={() => handleFilterChange('daily')}  className='graph-all-button'>All</button>
        <button onClick={() => handleFilterChange('weekly')} className='graph-weekly-button'>Weekly</button>
        <button onClick={() => handleFilterChange('yesterday')} className='graph-yesterday-button'>Yesterday</button>
      </div>
      <ReactApexChart options={options} series={options.series} type="area" height={280} />
    </div>
  );
};

export default CustomerReview;
