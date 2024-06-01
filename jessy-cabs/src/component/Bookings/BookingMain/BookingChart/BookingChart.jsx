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

  const [chartOptions, setChartOptions] = useState(chartData.options);
  const [chartSize, setChartSize] = useState({
    width: '100%',
    height: '100%',
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 320 && window.innerWidth <= 550) {
        setChartSize({
          width: 400,
          height: 400,
        });
      } else {
        setChartSize({
          width: '100%',
          height: '100%',
        });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);




  const showsearchTable = useState(true);

  const handleButtonClick = async () => {
    try {
      if (!vehdriverNames || vehdriverNames.length === 0) return
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

        const updatedDetails = getVehicleDetail.map(vehicle => {
          const matchingDriver = datas.find(driver => driver.drivername === vehicle.driverName);
          return {
            ...vehicle,
            status: matchingDriver ? matchingDriver.driverApp : '',
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
        ]
      },
      xAxis: { type: 'category' },
      yAxis: {},
      series: [
        { type: 'bar', name: 'Active', color: '#28a745' },
        { type: 'bar', name: 'Inactive', color: '#007bff' },
        { type: 'bar', name: 'Offline', color: '#ff0000' },
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
        <div className="main-booking-chart-sub-division">
          <div className="apex-fusion-chart">
            <div className="second-chart-bar-section second-chart-bar-section-apex">
              <div className="second-chart-bar1">
                <Chart
                  options={chartData.options}
                  series={chartData.series}
                  type="pie"
                  className="graph-chart"
                  width={chartSize.width}
                  height={chartSize.height}
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
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="chart-table-no-data">No Active Drivers available</td>
                        </tr>
                      )}
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
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="chart-table-no-data">No Online Drivers available</td>
                        </tr>
                      )}
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
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="chart-table-no-data">No Offline Drivers available</td>
                        </tr>
                      )}
                    </table>
                  </div>
                )}
              </div>
            </div>
            <div className="second-chart-bar-section">
              <div className="second-chart-bar ">
                <div ref={chartRef} className="car-chart" />
              </div>
              <div className="total-car-table">
                {showActiveTable && (
                  <div className=" graph-total-table-driver graph-total-table">
                    <table className="graph-table">
                      <tr
                        className="graph-table-row ">
                        <th className="graph-table-head b-color">Car NAME</th>
                        <th className="graph-table-head b-color">Car Type</th>
                        <th className="graph-table-head b-color">STATUS</th>
                        <th className="graph-table-head b-color">Car Number</th>
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
                            </tr>
                          )) : (
                            <tr>
                              <td colSpan="4" className="chart-table-no-data">No Active Vehicles available</td>
                            </tr>
                          )
                      }
                    </table>
                  </div>
                )}
                {showInactiveTable && (
                  <div className="graph-total-table-driver graph-total-table">
                    <table className="graph-table">
                      <tr
                        className="graph-table-row ">
                        <th className="graph-table-head b-color">Car NAME</th>
                        <th className="graph-table-head b-color">Car Type</th>
                        <th className="graph-table-head b-color">STATUS</th>
                        <th className="graph-table-head b-color">Car Number</th>
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
                          </tr>
                        )) : (
                          <tr>
                            <td colSpan="4" className="chart-table-no-data">No Online Vehicles available</td>
                          </tr>
                        )
                      }
                    </table>
                  </div>
                )}
                {showOfflineTable && (
                  <div className="graph-total-table-driver graph-total-table">
                    <table className="graph-table">
                      <tr
                        className="graph-table-row ">
                        <th className="graph-table-head b-color">Car NAME</th>
                        <th className="graph-table-head b-color">Car Type</th>
                        <th className="graph-table-head b-color">STATUS</th>
                        <th className="graph-table-head b-color">Car Number</th>
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
                          </tr>
                        ))
                        : (
                          <tr>
                            <td colSpan="4" className="chart-table-no-data">No Offline Vehicles available</td>
                          </tr>
                        )
                      }
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="chart-search-main-division">
          <p className="search-text-division"> Search here for Vehiecle Details..</p>
          <div className="search-bar-input">
            <div className="search-button">
              <FaSearch />
              <input type="search" placeholder="Search vehicle detai.." value={vehicleDetail} onChange={(e) => setVehicleDetail(e.target.value)} className="input-search-place"/>
            </div>
            <button className="chart-search-btn" onClick={handleButtonClick}>search</button>
          </div>
          {showsearchTable && (
            <div className="total-car-table-division">
              <div className="total-car-table total-vehiecle">
                <div className="graph-total-table graph-total-table-driver">
                  <table className="graph-table" >
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
                        <td colSpan="4" className="total-car-table-no-data">No data available</td>
                      </tr>
                    )}
                  </table>
                </div>
              </div>
            </div>


          )}
        </div>

      </div>



    </>
  );
};

export default BookingChart;