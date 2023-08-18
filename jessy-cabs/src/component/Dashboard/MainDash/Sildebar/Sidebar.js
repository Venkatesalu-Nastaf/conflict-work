import { BiHomeAlt } from "@react-icons/all-files/bi/BiHomeAlt";
import { BiNotepad } from "@react-icons/all-files/bi/BiNotepad";
import { HiOutlineUsers } from "@react-icons/all-files/hi/HiOutlineUsers";
import { AiOutlineFileProtect } from "@react-icons/all-files/ai/AiOutlineFileProtect";
import { BiBarChartSquare } from "@react-icons/all-files/bi/BiBarChartSquare";
import { FaUserAstronaut } from "@react-icons/all-files/fa/FaUserAstronaut";
import { AiOutlineSetting } from "@react-icons/all-files/ai/AiOutlineSetting"
export const Sidebardata = [
  {
    icon: BiHomeAlt,
    heading: "Dashboard",
    key: "/home/dashboard",
  },
  {
    icon: HiOutlineUsers,
    heading: "Customers",
    key: "/home/customers/customers",
  },
  {
    icon: BiNotepad,
    heading: "Orders",
    key: "/home/orders/received",
  },
  {
    icon: BiBarChartSquare,
    heading: "Billing",
    key: "/home/billing",
  },
  {
    icon: AiOutlineFileProtect,
    heading: "Options",
    key: "/home/options/ratetype",
  },
  {
    icon: AiOutlineSetting,
    heading: "Settings",
    key: "/home/settings/usercreation",
  },
  {
    icon: FaUserAstronaut,
    heading: "User",
    key: "/home/usersettings/usersetting",
  },

];