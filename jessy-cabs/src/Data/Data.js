// Sidebar Importrs
import { BiHomeAlt } from "@react-icons/all-files/bi/BiHomeAlt";

import { BiNotepad } from "@react-icons/all-files/bi/BiNotepad";
import { HiOutlineUsers } from "@react-icons/all-files/hi/HiOutlineUsers";
import { AiOutlineFileProtect } from "@react-icons/all-files/ai/AiOutlineFileProtect"
import { BiBarChartSquare } from "@react-icons/all-files/bi/BiBarChartSquare";
import { FaRupeeSign } from "@react-icons/all-files/fa/FaRupeeSign";
import { FaRegMoneyBillAlt } from "@react-icons/all-files/fa/FaRegMoneyBillAlt";
import { BiPaste } from "@react-icons/all-files/bi/BiPaste";


export const Sidebardata = [
    {
        icon:BiHomeAlt,
        heading:"Dashboard",
        key:'/home/dashboard',
    },
    {
        icon:BiNotepad,
        heading:'Orders',
        key:'/home/orders',
    },
    {
        icon:HiOutlineUsers,
        heading:"Customers",
        key:'/home/customers',
    },
    {
        icon:AiOutlineFileProtect,
        heading:"Products",
        key:'/home/products',
    },
    {
        icon:BiBarChartSquare,
        heading:"Chart",
        key:'/home/chart',
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
      title: "Pending",
      color: {
        backGround:
          "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
        boxShadow: "0px 10px 20px 0px #F9D59B",
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

  // Recent Update Card Data
export const UpdatesData = [
  {
    // img: img1,
    name: "Main",
    noti: "has achived 60% of today target",
    time: "25 seconds ago",
  },
  {
    // img: img2,
    name: "Ravi",
    noti: "has achived 30% of today target.",
    time: "30 minutes ago",
  },
  {
    // img: img3,
    name: "Thiru",
    noti: "has achived 50% of today target",
    time: "2 hours ago",
  },
];
  