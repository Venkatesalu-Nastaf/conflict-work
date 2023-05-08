// Sidebar Importrs
import { BiHomeAlt } from "@react-icons/all-files/bi/BiHomeAlt";
import { BiNotepad } from "@react-icons/all-files/bi/BiNotepad";
import { HiOutlineUsers } from "@react-icons/all-files/hi/HiOutlineUsers";
import { AiOutlineFileProtect } from "@react-icons/all-files/ai/AiOutlineFileProtect"
import { BiBarChartSquare } from "@react-icons/all-files/bi/BiBarChartSquare";
import { BiDollar } from "@react-icons/all-files/bi/BiDollar";
import { FaRegMoneyBillAlt } from "@react-icons/all-files/fa/FaRegMoneyBillAlt";
import { BiPaste } from "@react-icons/all-files/bi/BiPaste";


export const Sidebardata = [
    {
        icon:BiHomeAlt,
        heading:"Dashboard",
    },
    {
        icon:BiNotepad,
        heading:'Orders',
    },
    {
        icon:HiOutlineUsers,
        heading:"Customers",
    },
    {
        icon:AiOutlineFileProtect,
        heading:"Products",
    },
    {
        icon:BiBarChartSquare,
        heading:"Chart",
    },
];

// Analytics Cards Data
export const cardsData = [
    {
      title: "Sales",
      color: {
        backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
        boxShadow: "0px 10px 20px 0px #e0c6f5",
      },
      barValue: 70,
      value: "25,970",
      png: BiDollar,
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
        backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
        boxShadow: "0px 10px 20px 0px #FDC0C7",
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
      title: "Expenses",
      color: {
        backGround:
          "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
        boxShadow: "0px 10px 20px 0px #F9D59B",
      },
      barValue: 60,
      value: "4,270",
      png: BiPaste,
      series: [
        {
          name: "Expenses",
          data: [10, 25, 15, 30, 12, 15, 20],
        },
      ],
    },
  ];
  