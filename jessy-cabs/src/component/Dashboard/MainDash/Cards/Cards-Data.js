import { FaRupeeSign } from "@react-icons/all-files/fa/FaRupeeSign";
import { FaRegMoneyBillAlt } from "@react-icons/all-files/fa/FaRegMoneyBillAlt";
import { BiPaste } from "@react-icons/all-files/bi/BiPaste";

// Analytics Cards Data
export const cardsData = [
  {
    title: "Sales",
    color: {
      backGround: "linear-gradient(rgb(33, 152, 171) 35%, rgb(143, 228, 241) 92%)",
      boxShadow: "0px 0px 0px 0px #e0c6f5",
    },
    barValue: 70,
    value: "25,970",
    png: FaRupeeSign,
    series: [
      {
        name: "Sales",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
  },
  {
    title: "Revenue",
    color: {
      backGround: "linear-gradient(rgb(226, 165, 90) 35%, rgb(236, 194, 142) 92%",
      boxShadow: "0px 0px 0px 0px #FDC0C7",
    },
    barValue: 80,
    value: "14,270",
    png: FaRegMoneyBillAlt,
    series: [
      {
        name: "Revenue",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
  },
  {
    title: "Pending",
    color: {
      backGround:
        "linear-gradient(rgb(55, 55, 81) 35%, rgb(123 123 147) 92%)",
      boxShadow: "0px 0px 0px 0px #F9D59B",
    },
    barValue: 60,
    value: "270",
    png: BiPaste,
    series: [
      {
        name: "pending",
        data: [10, 25, 15, 30, 12, 15, 20],
      },
    ],
  },
];
