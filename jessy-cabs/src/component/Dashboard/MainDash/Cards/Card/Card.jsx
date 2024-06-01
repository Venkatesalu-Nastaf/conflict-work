import React, { useState } from "react";
import "./Card.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion, AnimateSharedLayout } from "framer-motion";
import { MdCancel } from "@react-icons/all-files/md/MdCancel";
import Chart from "react-apexcharts";

const Card = (props) => {
  const [expanded, setExpanded] = useState(false);
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
    <div>
      {(
        <motion.div
          className="CompactCard"
          style={{
            background: param.color.backGround,
            boxShadow: param.color.boxShadow,
            border: '2px solid #c7c7c7c0',
          }}
          layoutId="expandableCard"
          onClick={setExpanded}
        >
          <div className="radialBar">
            <CircularProgressbar
              value={param.barValue}
              text={param.title === 'Billing' ? '' : `${param.barValue}%`}
            />
            <span>{param.title}</span>
          </div>
          <div className="detail">
            <Png />
            <span>&#8377; {param.value}</span>
            <span>Last 24 hours</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Expanded Card
function ExpandedCard({ param, setExpanded }) {
  const data = {
    options: {
      chart: {
        type: "area",
        height: "auto",
      },

      dropShadow: {
        enabled: false,
        enabledOnSeries: undefined,
        top: 0,
        left: 0,
        blur: 3,
        color: "#000",
        opacity: 0.35,
      },

      fill: {
        colors: ["#fff"],
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["white"],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      grid: {
        show: true,
      },
      xaxis: {
        type: "datetime",
        categories: param.series[0]?.categories || [],
      },
    },
  };

  return (
    <motion.div
      className="ExpandedCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId="expandableCard"
    >
      <div className="card-division">
        <MdCancel onClick={setExpanded} />
      </div>
      <span>{param.title}</span>
      <div className="chartContainer">
        {param.series.map((seriesItem, index) => (
          <Chart key={index} options={data.options} series={[seriesItem]} type="area" />
        ))}
      </div>
      <span>Last 24 hours</span>
    </motion.div>
  );
}

export default Card;