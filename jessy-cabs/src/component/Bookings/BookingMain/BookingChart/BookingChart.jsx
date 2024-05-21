import React, { useState, useEffect, useRef } from "react";
import * as echarts from 'echarts';
import "./BookingChart.css";
import useBookingchart from "./useBookingchart";
import Chart from 'react-apexcharts';
import axios from "axios";
import { APIURL } from "../../../url";
import { FaSearch } from "react-icons/fa";


const BookingChart = () => {
  const {
    actionName,
    driverOnline,
    driverOffline,
    assignDriver,
    activeVehicle,
    inActiveVehicle,
    offlineVehicle,
    handleClick,
    driverActiveDetails,
    driverOfflineDetails,
    driverOnlineDetails,
    vehicleActiveDetails,
    vehicleOfflineDetails,
    vehicleOnlineDetails

  } = useBookingchart();
  useEffect(() => {
    if (actionName === "List") {
      handleClick(null, "List");
    }
  }, [actionName, handleClick]);


  const [clickedSegment, setClickedSegment] = useState('Active');
  const [vehicleDetail, setVehicleDetail] = useState('')
  const [getVehicleDetail, setGetVehicleDetail] = useState([])
  const [vehdriverNames, setVehdriverNames] = useState([])
  const [vehStatus, setVehStatus] = useState([])
  const [latestVehicleDetail, setLatestVehicleDetail] = useState([])
  const apiUrl = APIURL;

  const chartData = {
    series: [assignDriver, driverOnline, driverOffline],
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
      colors: ['#28a745', '#007bff', '#ff0000'], //  Green,Blue, Red colors respectively
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

  const handleButtonClick = async () => {
    try {
      const response = await axios.get(`${apiUrl}/getVehicleInfo/${vehicleDetail}`);
      console.log(response.data, 'vehresponse');
      setGetVehicleDetail(response.data)
    } catch (error) {
      console.error('Request failed', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (getVehicleDetail.length > 0) {
        const driverNames = getVehicleDetail.map((li) => li.driverName);
        setVehdriverNames(driverNames);
      }
    };
    fetchData();
  }, [vehicleDetail, getVehicleDetail]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/getDriverIdStatus/${vehdriverNames}`, {

        });
        const datas = response.data;
        const status = datas?.map((li) => li.driverApp)
        setVehStatus(status)

        const updatedDetails = getVehicleDetail.map(vehicle => {
          const matchingDriver = datas.find(driver => driver.drivername === vehicle.driverName);
          return {
            ...vehicle,
            status: matchingDriver ? matchingDriver.driverApp : '', // Default to 'not assigned' if no match found
          };
        });
        setLatestVehicleDetail(updatedDetails)
      } catch (error) {
        console.error('Error fetching driver id status:', error);
      }
    };
    fetchData();
  }, [vehdriverNames, vehicleDetail, apiUrl]);

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
          { product: 'Cars', Active: activeVehicle, Inactive: inActiveVehicle, Offline: offlineVehicle },
          // { product: 'Cars', Active:20, Inactive: 10, Offline: 60},
        ]
      },
      xAxis: { type: 'category' },
      yAxis: {},
      series: [
        { type: 'bar', name: 'Active', color: '#28a745' }, // Green color for Active
        { type: 'bar', name: 'Inactive', color: '#007bff' }, // Blue color for Inactive
        { type: 'bar', name: 'Offline', color: '#ff0000' }, // Red color for Offline
      ]
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
  }, [activeVehicle, inActiveVehicle, offlineVehicle]);


  return (

    <>
      <div className="main-booking-chart" >
        <div style={{ display: 'flex ', justifyContent: 'center' }}>

          <div className="apex-fusion-chart" >


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
                        <th className=" graph-table-head graph-table-head-driver b-color">Mobile Number</th>
                        {/* <th className=" graph-table-head graph-table-head-driver b-color">DISTANCE</th> */}

                      </tr>
                      {driverActiveDetails?.length > 0 ? (
                        driverActiveDetails.map((li, index) => (
                          <tr key={index} className="">
                            <td className="graph-table-head graph-table-head-driver graph-table-row-values">{li.drivername}</td>
                            <td className="graph-table-head graph-table-head-driver graph-table-row-id">{li.driverid}</td>
                            <td className="graph-table-head graph-table-head-driver">
                              <p className="active-driver">{li.driverApp}</p>
                            </td>
                            <td className="graph-table-head graph-table-head-driver graph-table-row-values">{li.Mobileno}</td>
                            {/* <td className="graph-table-head graph-table-head-driver graph-table-row-values">30Kms</td> */}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4">No Active Drivers available</td>
                        </tr>
                      )}


                      {/* <tr>
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

          </tr> */}
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
                        <th className=" graph-table-head graph-table-head-driver b-color">Mobile Number</th>
                        {/* <th className=" graph-table-head graph-table-head-driver b-color">DISTANCE</th> */}

                      </tr>
                      {driverOnlineDetails?.length > 0 ? (
                        driverOnlineDetails.map((li, index) => (
                          <tr key={index} className="">
                            <td className="graph-table-head graph-table-head-driver graph-table-row-values">{li.drivername}</td>
                            <td className="graph-table-head graph-table-head-driver graph-table-row-id">{li.driverid}</td>
                            <td className="graph-table-head graph-table-head-driver">
                              <p className="active-driver">{li.driverApp}</p>
                            </td>
                            <td className="graph-table-head graph-table-head-driver graph-table-row-values">{li.Mobileno}</td>
                            {/* <td className="graph-table-head graph-table-head-driver graph-table-row-values">30Kms</td> */}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4">No Online Drivers available</td>
                        </tr>
                      )}

                      {/* <tr>
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

                      </tr> */}
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
                        <th className=" graph-table-head graph-table-head-driver b-color">Mobile Number</th>
                        {/* <th className=" graph-table-head graph-table-head-driver b-color">DISTANCE</th> */}

                      </tr>
                      {driverOfflineDetails?.length > 0 ? (
                        driverOfflineDetails.map((li, index) => (
                          <tr key={index} className="">
                            <td className="graph-table-head graph-table-head-driver graph-table-row-values">{li.drivername}</td>
                            <td className="graph-table-head graph-table-head-driver graph-table-row-id">{li.driverid}</td>
                            <td className="graph-table-head graph-table-head-driver">
                              <p className="active-driver">{li.driverApp}</p>
                            </td>
                            <td className="graph-table-head graph-table-head-driver graph-table-row-values">{li.Mobileno}</td>
                            {/* <td className="graph-table-head graph-table-head-driver graph-table-row-values">30Kms</td> */}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4">No Offline Drivers available</td>
                        </tr>
                      )}

                      {/* <tr>
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

                      </tr> */}
                    </table>
                  </div>
                )}
              </div>

            </div>



            <div className="second-chart-bar-section">
              <div className="second-chart-bar">
                <div ref={chartRef} className="car-chart" />


              </div>
              <div className="total-car-table">

                {showActiveTable && (
                  <div className="graph-total-table">
                    <table className="graph-table">
                      <tr
                        className="graph-table-row ">
                        <th className="graph-table-head b-color">Car NAME</th>
                        <th className="graph-table-head b-color">Car Type</th>
                        <th className="graph-table-head b-color">STATUS</th>
                        <th className="graph-table-head b-color">Car Number</th>
                        {/* <th className="graph-table-head b-color">DISTANCE</th> */}

                      </tr>
                      {
                        vehicleActiveDetails.length > 0 ?
                          vehicleActiveDetails?.map((li) => (
                            <tr className="">
                              <td className="graph-table-head graph-table-row-values">{li.vehiclename}</td>
                              <td className="graph-table-head  graph-table-row-id">{li.vechtype}</td>
                              <td className="graph-table-head ">
                                <p className="active-driver">
                                  {li.status}
                                </p>
                              </td>
                              <td className="graph-table-head graph-table-row-values">{li.vehRegNo}</td>
                              {/* <td className="graph-table-head graph-table-row-values"></td> */}

                            </tr>
                          )) : (
                            <tr>
                              <td colSpan="4">No Active Vehicles available</td>
                            </tr>
                          )
                      }

                      {/* <tr>
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

                      </tr> */}
                    </table>
                  </div>
                )}
                {showInactiveTable && (
                  <div className="graph-total-table">
                    <table className="graph-table">
                      <tr
                        className="graph-table-row ">
                        <th className="graph-table-head b-color">Car NAME</th>
                        <th className="graph-table-head b-color">Car Type</th>
                        <th className="graph-table-head b-color">STATUS</th>
                        <th className="graph-table-head b-color">Car Number</th>
                        {/* <th className="graph-table-head b-color">DISTANCE</th> */}

                      </tr>
                      {vehicleOnlineDetails.length > 0 ?
                        vehicleOnlineDetails?.map((li) => (
                          <tr className="">
                            <td className="graph-table-head graph-table-row-values">{li.vehiclename}</td>
                            <td className="graph-table-head  graph-table-row-id">{li.vechtype}</td>
                            <td className="graph-table-head ">
                              <p className="inactive-driver">
                                {li.status}
                              </p>
                            </td>
                            <td className="graph-table-head graph-table-row-values">{li.vehRegNo}</td>
                            {/* <td className="graph-table-head graph-table-row-values"></td> */}

                          </tr>
                        )) : (
                          <tr>
                            <td colSpan="4">No Online Vehicles available</td>
                          </tr>
                        )
                      }

                      {/* <tr>
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

                      </tr> */}
                    </table>
                  </div>
                )}
                {showOfflineTable && (
                  <div className="graph-total-table">
                    <table className="graph-table">
                      <tr
                        className="graph-table-row ">
                        <th className="graph-table-head b-color">Car NAME</th>
                        <th className="graph-table-head b-color">Car Type</th>
                        <th className="graph-table-head b-color">STATUS</th>
                        <th className="graph-table-head b-color">Car Number</th>
                        {/* <th className="graph-table-head b-color">DISTANCE</th> */}

                      </tr>
                      {vehicleOfflineDetails.length ?
                        vehicleOfflineDetails?.map((li) => (
                          <tr className="">
                            <td className="graph-table-head graph-table-row-values">{li.vehiclename}</td>
                            <td className="graph-table-head  graph-table-row-id">{li.vechtype}</td>
                            <td className="graph-table-head ">
                              <p className="offline-driver">
                                {li.status}
                              </p>
                            </td>
                            <td className="graph-table-head graph-table-row-values">{li.vehRegNo}</td>
                            {/* <td className="graph-table-head graph-table-row-values">30Kms</td> */}

                          </tr>
                        ))
                        : (
                          <tr>
                            <td colSpan="4">No Offline Vehicles available</td>
                          </tr>
                        )
                      }

                      {/* <tr>
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

                      </tr> */}
                    </table>
                  </div>
                )}
              </div>

            </div>




          </div>

        </div>


        <p style={{ marginTop: '40px', fontSize: '20px', fontWeight: '600' }}> Search here for Vehiecle Details..</p>

        <div className="search-bar-input" >


          <div className="search-button">
            <FaSearch style={{ color: '#fff' }} />
            <input type="search" placeholder="Search vehicle detai.." value={vehicleDetail} onChange={(e) => setVehicleDetail(e.target.value)} className="input-search-place" style={{ background: 'none', border: 'none', width: 'fit-content', color: '#fff' }} />
          </div>
          <button style={{ padding: '10px', border: 'none' }} onClick={handleButtonClick}>search</button>

        </div>



        {showsearchTable && (
          <div className="total-car-table">
            <div className="graph-total-table">
              <table className="graph-table">
                <tr
                  className="graph-table-row ">
                  <th className="graph-table-head b-color">DRIVER NAME</th>
                  <th className="graph-table-head b-color">DRIVER ID</th>
                  <th className="graph-table-head b-color">VEHICLE NO</th>
                  <th className="graph-table-head b-color">STATUS</th>

                </tr>
                {latestVehicleDetail?.length > 0 ? (
                  latestVehicleDetail.map((li, index) => (
                    <tr key={index} className="">
                      <td className="graph-table-head graph-table-row-values">{li.driverName}</td>
                      <td className="graph-table-head graph-table-row-id">{li.vehiclename}</td>
                      <td className="graph-table-head graph-table-row-id">{li.vehRegNo}</td>
                      <td className="graph-table-head">
                        <p className="active-driver">{li.status}</p>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No data available</td>
                  </tr>
                )}



                {/* <tr>
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

                          </tr> */}
              </table>
            </div>
          </div>
        )}

      </div>



    </>
  );
};

export default BookingChart;
