import React, { useState,useEffect } from "react";
import "./Card.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion, AnimateSharedLayout } from "framer-motion";
import { MdCancel } from "@react-icons/all-files/md/MdCancel";

import { DataGrid } from "@mui/x-data-grid"; // Import DataGrid
// import Chart from "react-apexcharts";
// import axios from "axios";
// import { APIURL } from "../../../../url";
import useCard from "../useCard";
import dayjs from "dayjs";


const Card = (props) => {
  const [expanded, setExpanded] = useState(false);
 // const [billData, setBillData] = useState([]);
  
  // const apiUrl = APIURL;

 

  return (
    <AnimateSharedLayout>
      {expanded ? (
        <ExpandedCard param={props} setExpanded={() => setExpanded(false)} />
      ) : (
        <CompactCard param={props} setExpanded={() => setExpanded(true)} />
      )}
    </AnimateSharedLayout>
  );
};

// Compact Card
function CompactCard({ param, setExpanded }) {

  // const user_id = localStorage.getItem('useridno');
  

  const Png = param.png;
  return (
    // <div>
    //   {(
    //     <motion.div
    //       className="CompactCard"
    //       style={{
    //         background: param.color.backGround,
    //         boxShadow: param.color.boxShadow,
    //         border: '2px solid #c7c7c7c0',
    //       }}
    //       layoutId="expandableCard"
    //       onClick={setExpanded}
    //     >
    //       <div className="radialBar">
    //         <CircularProgressbar
    //           value={param.barValue}
    //           // text={param.title === 'Billing' ? '' : `${param.barValue}%`}
    //         />
    //         <span>{param.title}</span>
    //       </div>
    //       <div className="detail">
    //         <Png />
    //         <span>&#8377; {param.amount}</span>
    //         <span>Last 24 hours</span>
    //       </div>
    //     </motion.div>
    //   )}
    // </div>

<div>
  <motion.div
    className="ClassicCard"
    style={{
      background: param.color.backGround,
    }}
    layoutId="expandableCard"
    onClick={setExpanded}
    whileHover={{ y: -2 }}
  >
    {/* Top Row: Icon, Title and Amount in One Line */}
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '10px',
    }}>
      <Png style={{ width: '24px', height: '24px', color: '#5a4a3a' }} />
      <h3 style={{
        margin: 0,
        fontSize: '18px',
        fontWeight: 'bold',
        letterSpacing: '0.5px',
        textAlign: 'center',
        flex: 1,
        color: param.color.color,
      }}>
        {param.title}
      </h3>
      <div style={{
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#3a2e22',
      }}>
        ₹{param.amount}
      </div>
    </div>

    {/* Bottom: Last updated */}
    <div style={{
      borderTop: '1px dashed gray',
      marginTop: '10px',
      paddingTop: '10px',
      fontSize: '12px',
      fontStyle: 'italic',
      fontWeight: '600',
      color: param.color.color,
      textAlign: 'right',
    }}>
      Updated just now
    </div>
  </motion.div>
</div>


  );
}

// Expanded Card
// function ExpandedCard({ param, setExpanded}) {
  
//   const {billData,setBillData}=useCard();
//   useEffect(() => {
//     console.log(billData, "Current Bill Data");
//   }, [billData]);

//   // const data = {
//   //   options: {
//   //     chart: {
//   //       type: "area",
//   //       height: "auto",
//   //     },

//   //     dropShadow: {
//   //       enabled: false,
//   //       enabledOnSeries: undefined,
//   //       top: 0,
//   //       left: 0,
//   //       blur: 3,
//   //       color: "#000",
//   //       opacity: 0.35,
//   //     },

//   //     fill: {
//   //       colors: ["#fff"],
//   //       type: "gradient",
//   //     },
//   //     dataLabels: {
//   //       enabled: false,
//   //     },
//   //     stroke: {
//   //       curve: "smooth",
//   //       colors: ["white"],
//   //     },
//   //     tooltip: {
//   //       x: {
//   //         format: "dd/MM/yy HH:mm",
//   //       },
//   //     },
//   //     grid: {
//   //       show: true,
//   //     },
//   //     xaxis: {
//   //       type: "datetime",
//   //       categories: param.series[0]?.categories || [],
//   //     },
//   //   },
//   // };

//   // return (
//   //   <motion.div
//   //     className="ExpandedCard"
//   //     style={{
//   //       background: param.color.backGround,
//   //       boxShadow: param.color.boxShadow,
//   //     }}
//   //     layoutId="expandableCard"
//   //   >
//   //     <div className="card-division">
//   //       <MdCancel onClick={setExpanded} />
//   //     </div>
//   //     <span>{param.title}</span>
//   //     <div className="chartContainer">
//   //       {param.series.map((seriesItem, index) => (
//   //         <Chart key={index} options={data.options} series={[seriesItem]} type="area" />
//   //       ))}
//   //     </div>
//   //     <span>Last 24 hours</span>
//   //   </motion.div>
//   // );
//   // const gridData = [
//   //   { id: 1, date: '2024-01-01', value: 100 },
//   //   { id: 2, date: '2024-01-02', value: 150 },
//   //   // Add more rows as needed
//   // ];

//   // // Define the columns for the DataGrid
//   // // const columns = [
//   // //   { field: 'date', headerName: 'Date', flex: 1 },
//   // //   { field: 'value', headerName: 'Value', flex: 1 },
//   // // ];
//   // const columns = [
//   //   {
//   //     field: 'sno',
//   //     headerName: 'S.No',
//   //     width: 70,
//   //   },
//   //   { field: 'organization name', headerName: 'Organization Name', flex: 1 },
//   //   { field: 'billingdate', headerName: 'Billing Date ', flex: 1 },
//   //   { field: 'amount', headerName: 'Amount', flex: 1 },
//   // ];

//   // return (
//   //   <motion.div
//   //     className="ExpandedCard"
//   //     style={{
//   //       background: param.color.backGround,
//   //       boxShadow: param.color.boxShadow,
//   //       padding: '20px',
//   //     }}
//       // style={{
//       //   background: "white", // Set background to white
//       //   boxShadow: param.color.boxShadow,
//       //   padding: '20px',
//       // }}
//   //     layoutId="expandableCard"
//   //   >
//   //     <div className="card-division">
//   //       <MdCancel onClick={setExpanded} style={{ cursor: 'pointer' }} />
//   //     </div>
//   //     <span>{param.title}</span>

//   //     <div style={{ height: 400, width: '100%', marginTop: '20px' }}>
//   //       <DataGrid
//   //         rows={gridData}
//   //         columns={columns}
//   //         pageSize={5}
//   //         rowsPerPageOptions={[5]}
//   //         checkboxSelection // Optional: if you want to enable row selection
//   //       />
//   //     </div>
//   //   </motion.div>
//   // );


//   // const gridData = [
//   //   { id: 1, date: '2024-01-01', amount: 100, collected: 80, pending: 20 },
//   //   { id: 2, date: '2024-01-02', amount: 150, collected: 120, pending: 30 },
//   //   // Add more rows as needed
//   // ];

//   // // Determine which columns to display based on the card title
//   // const getColumns = () => {
//   //   switch (param.title) {
//   //     case "Billing":
//   //       return [
//   //         { field: 'sno', headerName: 'S.No', width: 70 },
//   //         { field: 'date', headerName: 'Date', flex: 1 },
//   //         { field: 'amount', headerName: 'Amount', flex: 1 },
//   //       ];
//   //     case "Received":
//   //       return [
//   //         { field: 'sno', headerName: 'S.No', width: 70 },
//   //         { field: 'date', headerName: 'Date', flex: 1 },
//   //         { field: 'collected', headerName: 'Collected', flex: 1 },
//   //       ];
//   //     case "Pending":
//   //       return [
//   //         { field: 'sno', headerName: 'S.No', width: 70 },
//   //         { field: 'date', headerName: 'Date', flex: 1 },
//   //         { field: 'pending', headerName: 'Pending', flex: 1 },
//   //       ];
//   //     default:
//   //       return [];
//   //   }
//   // };

//   // const columns = getColumns();

//   const getColumns = () => {
//     // console.log(param.title,'title')
//     switch (param.title) {
//       case "Billing":
//         return [
//           { field: 'sno', headerName: 'S.No', width: 70 },
//           {field:'orgname',headerName:'OrganizationName',flex:1},
//           { field: 'date', headerName: 'Date', flex: 1 },
//           { field: 'amount', headerName: 'Amount', flex: 1 },
//         ];
//       // case "Received":
//       //   return [
//       //     { field: 'sno', headerName: 'S.No', width: 70 },
//       //     {field:'orgname',headerName:'OrganizationName',flex:1},
//       //     { field: 'date', headerName: 'Date', flex: 1 },
//       //     { field: 'collected', headerName: 'Collected', flex: 1 },
//       //   ];
//       case "Received":
        
//         return [
//           { field: 'sno', headerName: 'S.No', width: 70 },
//           { field: 'orgName', headerName: 'Organization Name', flex: 1 }, // This should match the row mapping
//           { field: 'date', headerName: 'Date', flex: 1 },
//           { field: 'collected', headerName: 'Collected', flex: 1 }, // Ensure this is correct
          
//         ];
//       case "Pending":
//         return [
//           { field: 'sno', headerName: 'S.No', width: 70 },
//           {field:'orgname',headerName:'OrganizationName',flex:1},
//           { field: 'date', headerName: 'Date', flex: 1 },
//           { field: 'pending', headerName: 'Pending', flex: 1 },
//         ];
//       default:
//         return [];
//     }
//   };

//   const columns = getColumns();

//   // Prepare the rows data by mapping the fetched data to include 'sno'
//   const rows = billData.map((item, index) => ({
//     id: index + 1, // Generate a unique id
//     sno: index + 1,
//     orgname:item.CustomerName,
//     date: item.BillDate, // Adjust this according to your data structure
//     amount: item.TotalAmount, // Adjust as needed
//     collected: item.Collected, // Adjust as needed
//     pending: item.TotalBalance, // Adjust as needed
//   }));
// // console.log(rows,"aaaaaaaaaa");
// // console.log(billData,"aaaaaaaaaafffffffffff");


//   return (
//     <motion.div
//       className="ExpandedCard"
//       style={{
//         background: param.color.backGround,
//         boxShadow: param.color.boxShadow,
//         padding: '20px',
//       }}
//       // style={{
//       //   background: "white", // Set background to white
//       //   boxShadow: param.color.boxShadow,
//       //   padding: '20px',
//       // }}
//       layoutId="expandableCard"
//     >
//       <div className="card-division">
//         <MdCancel onClick={setExpanded} style={{ cursor: 'pointer' }} />
//       </div>
//       <span>{param.title}</span>

//       <div style={{ height: 400, width: '100%', marginTop: '20px' }}>
//         <DataGrid
//           rows={rows}
//           columns={columns}
//           pageSize={5}
//           rowsPerPageOptions={[5]}
//          // checkboxSelection // Optional: if you want to enable row selection
//         />
//       </div>
//     </motion.div>
//   );
// }
function ExpandedCard({ param, setExpanded }) {
  const { billData,handleButtonClickCard } = useCard();

const title = param.title
  useEffect(() => {
    // console.log(billData, "Current Bill Data");
  }, [billData]);

  const getColumns = () => {
  
    switch (param.title) {
      
      case "Billing":
        return [
          { field: 'sno', headerName: 'S.No', width: 70 },
          { field: 'orgname', headerName: 'Organization Name', flex: 1 },
          { field: 'date', headerName: 'Date', flex: 1 },
          { field: 'amount', headerName: 'Amount', flex: 1 },
        ];
      case "Recived":
        return [
          { field: 'sno', headerName: 'S.No', width: 70 },
          { field: 'orgname', headerName: 'Organization Name', flex: 1 },
          { field: 'date', headerName: 'Date', flex: 1 },
          { field: 'collected', headerName: 'Collected', flex: 1 },
        ];
      case "Pending":
        return [
          { field: 'sno', headerName: 'S.No', width: 70 },
          { field: 'orgname', headerName: 'Organization Name', flex: 1 },
          { field: 'date', headerName: 'Date', flex: 1 },
          { field: 'pending', headerName: 'Pending', flex: 1 },
        ];
      default:
        return [];
    }
  };

  const columns = getColumns();

  
  // const rows = billData.map((item, index,) => ({
  //   title:title,
  //   id: index + 1,
  //   sno: index + 1,
  //   orgname: item.CustomerName || "N/A", 
  //   // date: item.BillDate || "N/A", 
  //   date: item.BillDate
  //   ? dayjs(item.BillDate).format("DD/MM/YYYY") // Format as DD/MM/YYYY
  //   : "N/A",
  //   amount: item.TotalAmount || 0, 
  //   collected: item.TotalCollected || 0, 
  //   pending: item.TotalBalance || 0, 
  // }));

  const rows = billData.map((item, index,) => ({
    title:title,
    id: index + 1,
    sno: index + 1,
    orgname: item.customer || "N/A", 
    // date: item.BillDate || "N/A", 
    date: item.startdate
    ? dayjs(item.startdate).format("DD/MM/YYYY") // Format as DD/MM/YYYY
    : "N/A",
    amount: item.totalcalcAmount || 0, 
    collected: item.totalcalcAmount || 0, 
    pending: item.Balance_Amount || 0, 
  }));

  // Log the rows to verify structure
//  console.log(rows , "Mapped Rows Dataaaaaaa");

  return (
    <motion.div
      className="ExpandedCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.color,
        padding: '20px',
        color:param.color.color,

        
      }}
      layoutId="expandableCard"
    >
      <div className="card-division">
        <MdCancel onClick={setExpanded} style={{ cursor: 'pointer' }} />
      </div>
      <span style={{color:"black"}}>{param.title}</span>

      <div style={{ height: 400, width: '100%', marginTop: '20px' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          onRowClick={handleButtonClickCard}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </motion.div>
  );
}

export default Card;