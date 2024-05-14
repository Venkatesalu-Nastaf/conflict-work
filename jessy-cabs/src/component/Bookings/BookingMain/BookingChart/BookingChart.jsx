import React, { useState , useEffect , useRef} from "react";
import * as echarts from 'echarts';
import "./BookingChart.css";
import useBookingchart from "./useBookingchart";
import Chart from 'react-apexcharts';


import { FaSearch } from "react-icons/fa";


const BookingChart = () => {
  const {
    actionName,

    handleClick,
 
  } = useBookingchart();

  useEffect(() => {
    if (actionName === "List") {
      handleClick(null, "List");
    }
  }, [actionName, handleClick]);


  const [clickedSegment, setClickedSegment] = useState('Active');

  const chartData = {
    series: [40,40,20],
    options: {
      chart: {
        type: 'pie',
        events: {
          dataPointSelection: (event, chartContext, config) => {
            if (config.dataPointIndex === 0) {
              setClickedSegment('Active');
            } else if (config.dataPointIndex === 1) {
              setClickedSegment('Inactive');
            } else if (config.dataPointIndex === 2) {
              setClickedSegment('Offline');
            } else {
              setClickedSegment('Active');
            }
          },
        },
      },
      labels: ['Active', 'Inactive', 'Offline'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      }],
    },
  };



  // const [showActiveTable, setShowActiveTable] = useState(true);
  // const [showInactiveTable, setShowInactiveTable] = useState(false);
  // const [showOfflineTable, setShowOfflineTable] = useState(false);

  // const dataSource = {
  //   chart: {
  //     formatnumberscale: "2",
  //     showTrialWatermark: "0",
  //     divlinealpha: "0", // Set divlinealpha to 0 to remove y-axis lines
  //     bgalpha: "0" // Set bgalpha to 0 to remove background
  //   },
  //   categories: [
  //     {
  //       category: [{ label: "Today" }]
  //     }
  //   ],
  //   dataset: [
  //     {
  //       seriesname: "Active Cars",
  //       data: [{ value: "60" }]
  //     },
  //     {
  //       seriesname: "Inactive Cars",
  //       data: [{ value: "70" }]
  //     },
  //     {
  //       seriesname: "Offline Cars",
  //       data: [{ value: "100" }]
  //     }
  //   ]
  // };

  // const chartConfig = {
  //   type: "mscolumn3d",
  //   width: "100%",
  //   height: "400",
  //   dataFormat: "json",
  //   dataSource: dataSource,
  //   events: {
  //     dataplotclick: function (eventObj, dataObj) {
  //       if (dataObj) {
  //         switch (dataObj.datasetName) {
  //           case "Active Cars":
  //             setShowActiveTable(true);
  //             setShowInactiveTable(false);
  //             setShowOfflineTable(false);
  //             break;
  //           case "Inactive Cars":
  //             setShowActiveTable(false);
  //             setShowInactiveTable(true);
  //             setShowOfflineTable(false);
  //             break;
  //           case "Offline Cars":
  //             setShowActiveTable(false);
  //             setShowInactiveTable(false);
  //             setShowOfflineTable(true);
  //             break;
  //           default:
  //             setShowActiveTable(false);
  //             setShowInactiveTable(false);
  //             setShowOfflineTable(false);
  //         }
  //       }
  //     }
  //   }
  // };


  // const [searchText, setSearchText] = useState('');

  // const handleSearchChange = (event) => {
  //   setSearchText(event.target.value);
  // };



  const [showsearchTable, setsearchShowTable] = useState(true);

  const handleButtonClick = () => {
    setsearchShowTable(!showsearchTable); // Toggle the value of showTable
  };

  const chartRef = useRef(null);
  const [showActiveTable, setShowActiveTable] = useState(true);
  const [showInactiveTable, setShowInactiveTable] = useState(false);
  const [showOfflineTable, setShowOfflineTable] = useState(false);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);
    const option = {
      legend: {},
      tooltip: {},
      dataset: {
        dimensions: ['product', 'Active', 'Inactive', 'Offline'],
        source: [
          { product: 'Cars', Active: 43.3, Inactive: 85.8, Offline: 93.7 },
        ]
      },
      xAxis: { type: 'category' },
      yAxis: {},
      series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
    };
    chart.setOption(option);

    chart.on('click', (params) => {
      if (params.seriesName === 'Active') {
        setShowActiveTable(true);
        setShowInactiveTable(false);
        setShowOfflineTable(false);
      } else if (params.seriesName === 'Inactive') {
        setShowActiveTable(false);
        setShowInactiveTable(true);
        setShowOfflineTable(false);
      } else if (params.seriesName === 'Offline') {
        setShowActiveTable(false);
        setShowInactiveTable(false);
        setShowOfflineTable(true);
      } else {
        setShowActiveTable(true);
        setShowInactiveTable(false);
        setShowOfflineTable(false);
      }
    });

    return () => {
      chart.dispose();
    };
  }, []);


  return (

<>
<div className="main-booking-chart" >
  <div style={{display:'flex ', justifyContent:'center'}}>

  <div  className="apex-fusion-chart" >


  <div className="second-chart-bar-section second-chart-bar-section-apex">
    
<div className="second-chart-bar1">
      
<Chart
    options={chartData.options}
    series={chartData.series}
    type="pie"
 
    className="graph-chart"
  />     
    
  </div>




<div className="total-car-table">

{clickedSegment === 'Active' && (
        <div className="graph-total-table">
        <table className="graph-table">
          <tr 
          className="graph-table-row ">
            <th className=" graph-table-head graph-table-head-driver b-color">Driver NAME</th>
            <th className=" graph-table-head graph-table-head-driver b-color">Driver ID</th>
            <th className=" graph-table-head graph-table-head-driver b-color">STATUS</th>
            <th className=" graph-table-head graph-table-head-driver b-color">location</th>
            <th className=" graph-table-head graph-table-head-driver b-color">DISTANCE</th>

          </tr>
          <tr className="">
            <td className=" graph-table-head graph-table-head-driver  graph-table-row-values">Vinoth</td>
            <td className=" graph-table-head graph-table-head-driver  graph-table-row-id">1234</td>
            <td className=" graph-table-head graph-table-head-driver ">
    <p className="active-driver">
      Active
    </p>
            </td>
            <td className=" graph-table-head graph-table-head-driver graph-table-row-values">perungathur</td>
            <td className=" graph-table-head graph-table-head-driver graph-table-row-values">30Kms</td>
            
          </tr>
          <tr>
            <td className=" graph-table-head graph-table-head-driver  graph-table-row-values">David</td>
            <td className=" graph-table-head graph-table-head-driver  graph-table-row-id">5678</td>
            <td className=" graph-table-head graph-table-head-driver ">
    <p className="active-driver">
      Active
    </p>
            </td>
            <td className=" graph-table-head graph-table-head-driver graph-table-row-values">vandaloor</td>
            <td className=" graph-table-head graph-table-head-driver graph-table-row-values">1kms</td>
            
          </tr>
          <tr>
            <td className=" graph-table-head  graph-table-head-driver graph-table-row-values">Adam</td>
            <td className=" graph-table-head graph-table-head-driver  graph-table-row-id">875</td>
            <td className=" graph-table-head graph-table-head-driver ">
    <p className="active-driver">
      Active
    </p>
            </td>
            <td className=" graph-table-head graph-table-head-driver graph-table-row-values">Tambaram</td>
            <td className=" graph-table-head graph-table-head-driver graph-table-row-values">27Kms</td>

          </tr>
        </table>
      </div>
     )}
      {clickedSegment === 'Inactive' && (
        <div className="graph-total-table">
        <table className="graph-table">
        <tr 
          className="graph-table-row ">
        <th className=" graph-table-head graph-table-head-driver b-color">Driver NAME</th>
            <th className=" graph-table-head graph-table-head-driver b-color">Driver ID</th>
            <th className=" graph-table-head graph-table-head-driver b-color">STATUS</th>
            <th className=" graph-table-head graph-table-head-driver b-color">location</th>
            <th className=" graph-table-head graph-table-head-driver b-color">DISTANCE</th>

          </tr>
          <tr className="">
            <td className="graph-table-head graph-table-head-driver graph-table-row-values">fahad</td>
            <td className="graph-table-head graph-table-head-driver  graph-table-row-id">23456</td>
            <td className="graph-table-head graph-table-head-driver ">
    <p className="inactive-driver">
      Inactive
    </p>
            </td>
            <td className="graph-table-head graph-table-head-driver graph-table-row-values">dindivanam</td>
            <td className="graph-table-head graph-table-head-driver graph-table-row-values">30Kms</td>
            
          </tr>
          <tr>
            <td className="graph-table-head graph-table-head-driver  graph-table-row-values">picaso</td>
            <td className="graph-table-head graph-table-head-driver  graph-table-row-id">2343</td>
            <td className="graph-table-head graph-table-head-driver ">
    <p className="inactive-driver">
      Inactive
    </p>
            </td>
            <td className="graph-table-head graph-table-head-driver graph-table-row-values">vandaloor</td>
            <td className="graph-table-head graph-table-head-driver  graph-table-row-values">1kms</td>
            
          </tr>
          <tr>
            <td className="graph-table-head graph-table-head-driver graph-table-row-values">krish</td>
            <td className="graph-table-head graph-table-head-driver graph-table-row-id">234</td>
            <td className="graph-table-head graph-table-head-driver">
    <p className="inactive-driver">
      Inactive
    </p>
            </td>
            <td className="graph-table-head graph-table-head-driver graph-table-row-values">vadapalani</td>
            <td className="graph-table-head graph-table-head-driver graph-table-row-values">27Kms</td>

          </tr>
        </table>
      </div>
      )}
      {clickedSegment === 'Offline' && (
          <div className="graph-total-table">
          <table className="graph-table">
          <tr 
          className="graph-table-row ">
        <th className=" graph-table-head graph-table-head-driver b-color">Driver NAME</th>
            <th className=" graph-table-head graph-table-head-driver b-color">Driver ID</th>
            <th className=" graph-table-head graph-table-head-driver b-color">STATUS</th>
            <th className=" graph-table-head graph-table-head-driver b-color">location</th>
            <th className=" graph-table-head graph-table-head-driver b-color">DISTANCE</th>

          </tr>
            <tr className="">
              <td className="graph-table-head graph-table-head-driver graph-table-row-values">suresh</td>
              <td className="graph-table-head graph-table-head-driver  graph-table-row-id">3456</td>
              <td className="graph-table-head graph-table-head-driver ">
      <p className="offline-driver">
        Offline
      </p>
              </td>
              <td className="graph-table-head graph-table-head-driver graph-table-row-values">chennai</td>
              <td className="graph-table-head graph-table-head-driver graph-table-row-values">30Kms</td>
              
            </tr>
            <tr>
              <td className="graph-table-head graph-table-head-driver  graph-table-row-values">vijay</td>
              <td className="graph-table-head graph-table-head-driver  graph-table-row-id">5555</td>
              <td className="graph-table-head graph-table-head-driver ">
      <p className="offline-driver">
      Offline
      </p>
              </td>
              <td className="graph-table-head graph-table-head-driver graph-table-row-values">theni</td>
              <td className="graph-table-head graph-table-head-driver graph-table-row-values">1kms</td>
              
            </tr>
            <tr>
              <td className="graph-table-head graph-table-head-driver  graph-table-row-values">ajay</td>
              <td className="graph-table-head graph-table-head-driver  graph-table-row-id">8756</td>
              <td className="graph-table-head graph-table-head-driver ">
      <p className="offline-driver">
      Offline
      </p>
              </td>
              <td className="graph-table-head graph-table-head-driver graph-table-row-values">Tambaram</td>
              <td className="graph-table-head graph-table-head-driver graph-table-row-values">27Kms</td>

            </tr>
          </table>
        </div>
       )} 
      </div>
   
</div>



<div className="second-chart-bar-section">
<div className="second-chart-bar">
      <div ref={chartRef}  className="car-chart"  />
     
    
  </div>
      <div className="total-car-table">

      {showActiveTable && (
        <div className="graph-total-table">
        <table className="graph-table">
          <tr 
          className="graph-table-row ">
            <th className="graph-table-head b-color">Car NAME</th>
            <th className="graph-table-head b-color">Car ID</th>
            <th className="graph-table-head b-color">STATUS</th>
            <th className="graph-table-head b-color">Car Number</th>
            <th className="graph-table-head b-color">DISTANCE</th>

          </tr>
          <tr className="">
            <td className="graph-table-head graph-table-row-values">Vinoth</td>
            <td className="graph-table-head  graph-table-row-id">1234</td>
            <td className="graph-table-head ">
    <p className="active-driver">
      Active
    </p>
            </td>
            <td className="graph-table-head graph-table-row-values">perungathur</td>
            <td className="graph-table-head graph-table-row-values">30Kms</td>
            
          </tr>
          <tr>
            <td className="graph-table-head  graph-table-row-values">David</td>
            <td className="graph-table-head  graph-table-row-id">5678</td>
            <td className="graph-table-head ">
    <p className="active-driver">
      Active
    </p>
            </td>
            <td className="graph-table-head graph-table-row-values">vandaloor</td>
            <td className="graph-table-head graph-table-row-values">1kms</td>
            
          </tr>
          <tr>
            <td className="graph-table-head  graph-table-row-values">Adam</td>
            <td className="graph-table-head  graph-table-row-id">875</td>
            <td className="graph-table-head ">
    <p className="active-driver">
      Active
    </p>
            </td>
            <td className="graph-table-head graph-table-row-values">Tambaram</td>
            <td className="graph-table-head graph-table-row-values">27Kms</td>

          </tr>
        </table>
      </div>
     )}
      {showInactiveTable && ( 
        <div className="graph-total-table">
        <table className="graph-table">
        <tr 
          className="graph-table-row ">
            <th className="graph-table-head b-color">Car NAME</th>
            <th className="graph-table-head b-color">Car ID</th>
            <th className="graph-table-head b-color">STATUS</th>
            <th className="graph-table-head b-color">Car Number</th>
            <th className="graph-table-head b-color">DISTANCE</th>

          </tr>
          <tr className="">
            <td className="graph-table-head graph-table-row-values">fahad</td>
            <td className="graph-table-head  graph-table-row-id">23456</td>
            <td className="graph-table-head ">
    <p className="inactive-driver">
      Inactive
    </p>
            </td>
            <td className="graph-table-head graph-table-row-values">dindivanam</td>
            <td className="graph-table-head graph-table-row-values">30Kms</td>
            
          </tr>
          <tr>
            <td className="graph-table-head  graph-table-row-values">picaso</td>
            <td className="graph-table-head  graph-table-row-id">2343</td>
            <td className="graph-table-head ">
    <p className="inactive-driver">
      Inactive
    </p>
            </td>
            <td className="graph-table-head graph-table-row-values">vandaloor</td>
            <td className="graph-table-head graph-table-row-values">1kms</td>
            
          </tr>
          <tr>
            <td className="graph-table-head  graph-table-row-values">krish</td>
            <td className="graph-table-head  graph-table-row-id">234</td>
            <td className="graph-table-head ">
    <p className="inactive-driver">
      Inactive
    </p>
            </td>
            <td className="graph-table-head graph-table-row-values">vadapalani</td>
            <td className="graph-table-head graph-table-row-values">27Kms</td>

          </tr>
        </table>
      </div>
      )}
      {showOfflineTable && (
          <div className="graph-total-table">
          <table className="graph-table">
          <tr 
          className="graph-table-row ">
            <th className="graph-table-head b-color">Car NAME</th>
            <th className="graph-table-head b-color">Car ID</th>
            <th className="graph-table-head b-color">STATUS</th>
            <th className="graph-table-head b-color">Car Number</th>
            <th className="graph-table-head b-color">DISTANCE</th>

          </tr>
            <tr className="">
              <td className="graph-table-head graph-table-row-values">suresh</td>
              <td className="graph-table-head  graph-table-row-id">3456</td>
              <td className="graph-table-head ">
      <p className="offline-driver">
        Offline
      </p>
              </td>
              <td className="graph-table-head graph-table-row-values">chennai</td>
              <td className="graph-table-head graph-table-row-values">30Kms</td>
              
            </tr>
            <tr>
              <td className="graph-table-head  graph-table-row-values">vijay</td>
              <td className="graph-table-head  graph-table-row-id">5555</td>
              <td className="graph-table-head ">
      <p className="offline-driver">
      Offline
      </p>
              </td>
              <td className="graph-table-head graph-table-row-values">theni</td>
              <td className="graph-table-head graph-table-row-values">1kms</td>
              
            </tr>
            <tr>
              <td className="graph-table-head  graph-table-row-values">ajay</td>
              <td className="graph-table-head  graph-table-row-id">8756</td>
              <td className="graph-table-head ">
      <p className="offline-driver">
      Offline
      </p>
              </td>
              <td className="graph-table-head graph-table-row-values">Tambaram</td>
              <td className="graph-table-head graph-table-row-values">27Kms</td>

            </tr>
          </table>
        </div>
       )} 
      </div>
   
</div>




</div>

  </div>


<p style={{marginTop:'40px',fontSize:'20px',fontWeight:'600'}}> Search here for Vehiecle Details..</p>

<div className="search-bar-input" >


<div className="search-button">
<FaSearch style={{color:'#fff'}}/>
<input type="search" placeholder="Search vehicle detai.." className="input-search-place" style={{background:'none',border:'none', width:'fit-content',color:'#fff'}}/>
</div>
<button style={{ padding:'10px',border:'none'}} onClick={handleButtonClick}>search</button>

</div>



{showsearchTable && (
  <div className="total-car-table">
  <div className="graph-total-table">
                        <table className="graph-table">
                          <tr 
                          className="graph-table-row ">
                            <th className="graph-table-head b-color">DRIVER NAME</th>
                            <th className="graph-table-head b-color">DRIVER ID</th>
                            <th className="graph-table-head b-color">STATUS</th>
                            <th className="graph-table-head b-color">TRIP</th>
                            <th className="graph-table-head b-color">DISTANCE</th>

                          </tr>
                          <tr className="">
                            <td className="graph-table-head graph-table-row-values">Vinoth</td>
                            <td className="graph-table-head  graph-table-row-id">1234</td>
                            <td className="graph-table-head ">
                    <p className="active-driver">
                      Active
                    </p>
                            </td>
                            <td className="graph-table-head graph-table-row-values">perungathur</td>
                            <td className="graph-table-head graph-table-row-values">30Kms</td>
                            
                          </tr>
                          <tr>
                            <td className="graph-table-head  graph-table-row-values">David</td>
                            <td className="graph-table-head  graph-table-row-id">5678</td>
                            <td className="graph-table-head ">
                    <p className="active-driver">
                      Active
                    </p>
                            </td>
                            <td className="graph-table-head graph-table-row-values">vandaloor</td>
                            <td className="graph-table-head graph-table-row-values">1kms</td>
                            
                          </tr>
                          <tr>
                            <td className="graph-table-head  graph-table-row-values">Adam</td>
                            <td className="graph-table-head  graph-table-row-id">875</td>
                            <td className="graph-table-head ">
                    <p className="active-driver">
                      Active
                    </p>
                            </td>
                            <td className="graph-table-head graph-table-row-values">Tambaram</td>
                            <td className="graph-table-head graph-table-row-values">27Kms</td>

                          </tr>
                        </table>
  </div>
  </div>
  )}

</div>



    </>
  );
};

export default BookingChart;
