import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./component/form/LoginForm";
import MainDash from "./component/Dashboard/MainDash/MainDash";
import Orders from "./component/Orders/Orders";
import MainDashboard from "./component/Dashboard/Maindashboard/MainDashboard";
import Customer from "./component/Orders/Customer/Customer";
import Customers from "./component/Customers/Customers";
import Suppliers from "./component/Orders/Supplier/Suppliers";
import Bookings from "./component/Orders/Bookings/Bookings";
import { ThreeCircles } from "react-loader-spinner"; // Import the ThreeCircles spinner
import "./index.css"; // Import your global CSS file
import Page404 from "./component/Page404/page404";
import TripSheet from "./component/Orders/TripSheet/TripSheet";
import Settings from "./component/Settings/Settings";
import UserCreation from "./component/Settings/UserCreation/UserCreation";
import StationCreation from "./component/Settings/StationCreation/StationCreation";
import Permission from "./component/Settings/Permission/Permission";
import MainSetting from "./component/Settings/MainSetting/MainSetting";
import Received from "./component/Customers/Receiveds/Receiveds";
import Dispatcheds from "./component/Customers/Dispatcheds/Dispatcheds";
import Collecteds from "./component/Customers/Collecteds/Collecteds";
import DriverMasters from "./component/Customers/DriverMasters/DriverMasters";
import Options from "./component/Options/Options";
import RateTypes from "./component/Options/RateTypes/RateTypes";
import RateManagement from "./component/Options/RateManagement/RateManagement";
import FuelDetails from "./component/Options/FuelDetails/FuelDetails";
import Billings from "./component/Billings/Billings";
import Billing from "./component/Billings/Billing/Billing";
import CashFlow from "./component/Billings/CashFlow/CashFlow";
import ProfiteLoss from "./component/Billings/ProfiteLoss/ProfiteLoss";
import OnlineBooking from "./component/OnlineBooking/OnlineBooking";
import OnlineLoginForm from "./component/OnlineBooking/OnlineLoginForm/OnlineLoginForm";
import Employes from "./component/Options/Employes/Employes";
import DigitalSignature from "./component/DigitalSignature/DigitalSignature";


function App() {
  const [isLoading, setIsLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    // Simulate loading delay with setTimeout
    setTimeout(() => {
      setIsLoading(false); // Once loading is done, set isLoading to false
    }, 1500); // Adjust the delay time as needed
  }, []);

  return (
    <>
    <div className={isLoading ? "loading-container" : ""}>
      {isLoading ? ( // Show loading spinner while loading
        <div className="loading-spinners">
          <ThreeCircles color="#3d92f3" height={80} width={80} />
          {/* <ThreeCircles color="#00BFFF" height={80} width={130} /> */}
        </div>
      ) : (
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
              <Route path="/home/customers" element={<Customers />} >
                <Route path="/home/customers/received" element={<Received />} />
                <Route path="/home/customers/dispatched" element={<Dispatcheds />} />
                <Route path="/home/customers/collected" element={<Collecteds />} />
                <Route path="/home/customers/drivermaster" element={<DriverMasters />} />
              </Route>
              <Route path="/home/options" element={<Options />} >
                <Route path="/home/options/ratetype" element={<RateTypes />} />
                <Route path="/home/options/ratemanagement" element={<RateManagement />} />
                <Route path="/home/options/fuledetails" element={<FuelDetails />} />
                <Route path="/home/options/employes" element={<Employes />} />
              </Route>
              <Route path="/home/billing" element={<Billings />}>
                <Route path="/home/billing/" element={<Billing />} />
                <Route path="/home/billing/cashflow" element={<CashFlow />} />
                <Route path="/home/billing/profitandloss" element={<ProfiteLoss />} />
              </Route>
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

            <Route path="/onlinelogin" element={<OnlineLoginForm />} />
            <Route path="/onlinebooking" element={<OnlineBooking />} />
            <Route path="/onlinedigital/digitalsignature" element={<DigitalSignature />} />
            <Route
              path="*"
              element={
                <main className="page404main">
                  <Page404 />
                </main>
              }
            />
          </Routes>
        )}
      </div>
    </>
  );
}

export default App;
