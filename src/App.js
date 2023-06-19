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
            <Route path="/home/orders/bookings" element={<Bookings />}>
              <Route
                path="/home/orders/bookings/list"
                element={<h1>list</h1>}
              />
              <Route
                path="/home/orders/bookings/billingaddress"
                element={<h1>billing</h1>}
              />
              <Route
                path="/home/orders/bookings/email"
                element={<h1>email</h1>}
              />
            </Route>
            <Route path="/home/orders/tripsheet" element={<TripSheet />} />
          </Route>
          <Route path="/home/customers" element={<h1>Customers</h1>} />
          <Route path="/home/products" element={<h1>Producs</h1>} />
          <Route path="/home/settings" element={<h1>Settings</h1>} />
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
