import React from "react";
import Login from "./component/form/LoginForm";
import { Route, Routes } from "react-router-dom";
import MainDashboard from "./component/MainDashboard";
import Centerdashboard from "./component/Centerdashbord/Centerdashboard";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home/dashboard" element={<MainDashboard />} />
        <Route exact path="/home/orders" element={<Centerdashboard />} />
        <Route exact path="/home/customers" element={<h1>customer</h1>} />
        <Route exact path="/home/products" element={<h1>products</h1>} />
        <Route exact path="/home/chart" element={<h1>products</h1>} />
      </Routes>
    </>
  );
}

export default App;
