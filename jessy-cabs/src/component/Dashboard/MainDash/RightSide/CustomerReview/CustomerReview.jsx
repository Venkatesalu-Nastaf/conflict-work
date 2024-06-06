import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import "./CustomerReview.css";
import { APIURL } from '../../../../url';
import axios from 'axios'
import dayjs from "dayjs";
import Dialog from "@mui/material/Dialog";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DialogContent from "@mui/material/DialogContent";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";

const CustomerReview = ({ station }) => {
  const [viewType, setViewType] = useState("monthly");
  const [stationdata, setStationdata] = useState([])
  const [todaybooking, setTodayBooking] = useState([])
  const [popupOpen, setPopupOpen] = useState(false);
  const [toDate, setToDate] = useState(dayjs());
  const [fromDate, setFromDate] = useState(dayjs());
  const apiurl = APIURL
  // console.log(station,"datastation")
  const stationarray = station?.map((data) => data.Stationname)
  // console.log(stationarray,"dattaerrrr")

  const data2 = stationdata?.map((data) => data.count)

  const todaybook = todaybooking?.map((data) => data.count)


  // const handleWeeklyView = () => {
  //   setViewType("weekly");
  //   toadybookingdate()

  // };

  const handleMonthlyView = () => {
    setViewType("monthly");
  };

  const dateoftoday = dayjs().format("YYYY-MM-DD")



  useEffect(() => {
    const fetchdata = async () => {
      try {
        if (stationarray.length > 0) {
          const response = await axios.get(`${apiurl}/customerreviewdataall/${stationarray}`)
          const data = response.data
          setStationdata(data)
        }
        else {
          return
        }
      }
      catch (err) {
        console.log(err)
      }
    }
    fetchdata()
  }, [apiurl, stationdata, stationarray])


  const handleYesterdayView = () => {
    setPopupOpen(true)


  };

  // const [chartData, setChartData] = useState({
  //   categories: station.map((data)=> data.Stationname),
  //   data:data2,
  // });
  // console.log(chartData,"char")
  const toadybookingdate = async () => {
    try {
      const response = await axios.get(`${apiurl}/customerreviewtoday/${stationarray}/${dateoftoday}`)
      const data = response.data
      setTodayBooking(data)

    }
    catch (err) {
      console.log(err)
    }
  }

  const handleWeeklyView = () => {
    toadybookingdate()
    setViewType("weekly");
    // toadybookingdate()

  };

  const custombookingdate = async () => {
    try {
      const response = await axios.get(`${apiurl}/customerreviecustomerdate?station=${stationarray}&fromDate=${fromDate}&toDate=${toDate}`)
      const data = response.data
      setTodayBooking(data)
      setPopupOpen(false)
      setFromDate(dayjs())
      setToDate(dayjs())

    }
    catch (err) {
      console.log(err)
    }
  }



  const getData = () => {
    if (viewType === "monthly") {
      return {
        categories: stationarray,
        data: data2,
      }
    } else if (viewType === "weekly") {
      return {
        categories: stationarray,
        data: todaybook,
      };
    }
    else {
      // Yesterday data is already set in state
      return {
        categories: stationarray,
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
      },
      xaxis: {
        categories: getData().categories,
      },
    },
  };
  const handleCloseDialog = () => {
    setPopupOpen(false)
  }


  return (
    <div className="CustomerReview weekly-chart" id="areachart">
      <div className="button-container" style={{ position: 'relative' }}>
        <button onClick={handleMonthlyView} className="graph-all-button">All</button>
        <button onClick={handleWeeklyView} className="graph-weekly-button">Today</button>
        <button onClick={handleYesterdayView} className="graph-yesterday-button">custom date</button>
        <div style={{ width: '100%', height: '200px', backgroundColor: 'red', padding: '25px 0px', marginTop: '20px', position: 'absolute', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', zIndex: '1', display: 'grid', justifyContent: 'center' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="From Date"
              id="fromDate"
              name="fromDate"
              format="DD/MM/YYYY"
              value={fromDate}
              onChange={(date) => setFromDate(date)}
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="To Date"
              name="toDate"
              id="toDate"
              format="DD/MM/YYYY"
              value={toDate}
              onChange={(date) => setToDate(date)}
            />
          </LocalizationProvider>
          <div className="input">
            <Button variant="contained" onClick={custombookingdate}>
              Search
            </Button>
          </div>
        </div>
      </div>
      <Chart options={data.options} series={data.series} type="bar" />

      <Dialog open={popupOpen} onClose={handleCloseDialog}>
        <DialogContent style={{ backgroundColor: 'yellow', display: "flex", gap: '10px', width: 550, justifyContent: "space-around" }}>
          <div style={{ width: 150 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="From Date"
                id="fromDate"
                name="fromDate"
                format="DD/MM/YYYY"
                value={fromDate}
                onChange={(date) => setFromDate(date)}
              />
            </LocalizationProvider>
          </div>
          <div style={{ width: 150 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="To Date"
                name="toDate"
                id="toDate"
                format="DD/MM/YYYY"
                value={toDate}
                onChange={(date) => setToDate(date)}
              />
            </LocalizationProvider>
          </div>
          <div className="input" >
            <Button variant="contained" onClick={custombookingdate}>
              Search
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerReview;
