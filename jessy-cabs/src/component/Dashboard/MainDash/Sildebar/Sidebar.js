// Sidebar Importrs
import { BiHomeAlt } from "@react-icons/all-files/bi/BiHomeAlt";
import { BiNotepad } from "@react-icons/all-files/bi/BiNotepad";
import { HiOutlineUsers } from "@react-icons/all-files/hi/HiOutlineUsers";
import { AiOutlineFileProtect } from "@react-icons/all-files/ai/AiOutlineFileProtect";
import { BiBarChartSquare } from "@react-icons/all-files/bi/BiBarChartSquare";
export const Sidebardata = [
    {
      icon: BiHomeAlt,
      heading: "Dashboard",
      key: "/home/dashboard",
    },
    {
      icon: BiNotepad,
      heading: "Orders",
      key: "/home/orders/customer",
    },
    {
      icon: HiOutlineUsers,
      heading: "Customers",
      key: "/home/customers/received",
    },
    {
      icon: AiOutlineFileProtect,
      heading: "Options",
      key: "/home/options/ratetype",
    },
    {
      icon: BiBarChartSquare,
      heading: "Billing",
      key: "/home/billing",
    },
    {
      icon: BiBarChartSquare,
      heading: "settings",
      key: "/home/settings/usercreation",
    },
  ];