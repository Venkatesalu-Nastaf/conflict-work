import React from "react";
import Login from "./component/form/LoginForm";
import { Route, Routes } from "react-router-dom";
import MainDash from "./component/Dashboard/MainDash/MainDash";
import Orders from "./component/Orders/Orders";
import MainDashboard from "./component/Dashboard/Maindashboard/MainDashboard";
import Customer from "./component/Orders/Customer/Customer";
import Suppliers from "./component/Orders/Supplier/Suppliers";
import Bookings from "./component/Orders/Bookings/Bookings";

import Page404 from "./component/Page404/page404";
import TripSheet from "./component/Orders/TripSheet/TripSheet";
import Settings from "./component/Settings/Settings";
import UserCreation from "./component/Settings/UserCreation/UserCreation";
import StationCreation from "./component/Settings/StationCreation/StationCreation";
import Permission from "./component/Settings/Permission/Permission";
import MainSetting from "./component/Settings/MainSetting/MainSetting";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<MainDashboard />}>
          <Route path="/home/dashboard" element={<MainDash />} />
          <Route path="/home/orders" element={<Orders />}>
            <Route path="/home/orders/customer" element={<Customer />} />
            <Route path="/home/orders/supplier" element={<Suppliers />} />
            <Route path="/home/orders/bookings" element={<Bookings />} />
            <Route path="/home/orders/tripsheet" element={<TripSheet />} />
          </Route>
          <Route path="/home/customers" element={<h1>Customers</h1>} />
          <Route path="/home/products" element={<h1>Producs</h1>} />
          <Route path="/home/settings" element={<Settings />}>
            <Route
              path="/home/settings/usercreation"
              element={<UserCreation />}
            />
            <Route
              path="/home/settings/stationcreation"
              element={<StationCreation />}
            />
            <Route path="/home/settings/permission" element={<Permission />} />
            <Route path="/home/settings/mainsetting" element={<MainSetting />} />
          </Route>
        </Route>
        <Route
          path="*"
          element={
            <main className="page404main">
              <Page404 />
            </main>
          }
        />
      </Routes>
    </>
  );
}

export default App;
