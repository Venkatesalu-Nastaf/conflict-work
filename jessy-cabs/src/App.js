import React from "react";
import Login from "./component/form/LoginForm";
import { Route, Routes } from "react-router-dom";
import MainDashboard from "./component/MainDashboard";
import MainDash from "./component/MainDash/MainDash";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<MainDashboard />}>
          <Route path="/home/dashboard" element={<MainDash />} />
          <Route path="/home/orders" element={<h1>Orders</h1>} />
          <Route path="/home/customers" element={<h1>Customers</h1>} />
          <Route path="/home/products" element={<h1>Producs</h1>} />
          <Route path="/home/chart" element={<h1>Charts</h1>} />
        </Route>
        <Route
          path="*"
          element={
            <main>
              <p>There's no data in this page 404 </p>
            </main>
          }
        />
        {/* <Route exact path="/home/orders" element={<Centerdashboard />} />
        <Route exact path="/home/customers" element={<h1>customer</h1>} />
        <Route exact path="/home/products" element={<h1>products</h1>} />
        <Route exact path="/home/chart" element={<h1>products</h1>} /> */}
      </Routes>
    </>
  );
}

export default App;
