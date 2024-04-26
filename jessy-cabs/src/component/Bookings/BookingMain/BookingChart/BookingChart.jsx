import React, { useEffect } from "react";

import "./BookingChart.css";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// ICONS
import ClearIcon from "@mui/icons-material/Clear";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import useBookingchart from "./useBookingchart";
import Chart from 'react-apexcharts';
import ReactECharts from 'echarts-for-react';


const BookingChart = () => {
  const {
    actionName,
    error,
    success,
    info,
    warning,
    successMessage,
    errorMessage,
    warningMessage,
    infoMessage,
    handleClick,
    hidePopup,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    vehicles,
    columns,
    showBookedStatusAll,
  } = useBookingchart();

  useEffect(() => {
    if (actionName === "List") {
      handleClick(null, "List");
    }
  }, [actionName, handleClick]);


  const chartData = {
    series: [44, 55, 13, 43, 22],
    options: {
      chart: {
        type: 'pie',
      },
      labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
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
    },};



    const chartOptions = {
      title: {
        text: 'Event and Action Chart'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      xAxis: {
        type: 'category',
        data: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        type: 'bar',
        data: [20, 35, 15, 25, 30]
      }]
    };
  
    const onChartClick = (param, echartsInstance) => {
      if (param.componentType === 'series') {
        alert('Clicked on data item: ' + param.value);
      }
    };





  return (

<>

<Chart
      options={chartData.options}
      series={chartData.series}
      type="pie"
      width="400"
    />


   

<div className="App">
      <ReactECharts
        option={chartOptions}
        style={{ height: '400px', width: '800px' }}
        onEvents={{ click: onChartClick }}
      />
    </div>































































    {/* <div className="BookingChart-form Scroll-Style-hide">
      <form action="">
        <div className="detail-container-main">
          <div className="container-left">
            <div className="copy-title-btn-BookingChart">
              <div className="input-field">
                <div className="input" style={{ width: "50%" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="From Date"
                      format="DD/MM/YYYY"
                      value={fromDate}
                      onChange={(date) => setFromDate(date)}
                    />
                  </LocalizationProvider>
                </div>
                <div className="input" style={{ width: "50%" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="To Date"
                      format="DD/MM/YYYY"
                      value={toDate}
                      onChange={(date) => setToDate(date)}
                    />
                  </LocalizationProvider>
                </div>
                <div className="input" style={{ width: "460px" }}>
                  <Button
                    variant="contained"
                    onClick={() => showBookedStatusAll(fromDate, toDate)}

                  >
                    Show Booked Status All
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {error && (
          <div className="alert-popup Error">
            <div className="popup-icon">
              {" "}
              <ClearIcon style={{ color: "#fff" }} />{" "}
            </div>
            <span className="cancel-btn" onClick={hidePopup}>
              <ClearIcon color="action" style={{ fontSize: "14px" }} />{" "}
            </span>
            <p>{errorMessage}</p>
          </div>
        )}
        {warning && (
          <div className="alert-popup Warning">
            <div className="popup-icon">
              {" "}
              <ErrorOutlineIcon style={{ color: "#fff" }} />{" "}
            </div>
            <span className="cancel-btn" onClick={hidePopup}>
              <ClearIcon color="action" style={{ fontSize: "14px" }} />{" "}
            </span>
            <p>{warningMessage}</p>
          </div>
        )}
        {success && (
          <div className="alert-popup Success">
            <div className="popup-icon">
              {" "}
              <FileDownloadDoneIcon style={{ color: "#fff" }} />{" "}
            </div>
            <span className="cancel-btn" onClick={hidePopup}>
              <ClearIcon color="action" style={{ fontSize: "14px" }} />{" "}
            </span>
            <p>{successMessage}</p>
          </div>
        )}
        {info && (
          <div className="alert-popup Info">
            <div className="popup-icon">
              {" "}
              <BsInfo style={{ color: "#fff" }} />{" "}
            </div>
            <span className="cancel-btn" onClick={hidePopup}>
              <ClearIcon color="action" style={{ fontSize: "14px" }} />{" "}
            </span>
            <p>{infoMessage}</p>
          </div>
        )}
        <div className="table-bookingCopy-BookingChart">
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              className="Scroll-Style"
              rows={vehicles}
              columns={columns}
              pageSize={5}
            />
          </div>
        </div>
      </form>
    </div> */}

    </>
  );
};

export default BookingChart;
