import React, { useState, useEffect } from "react";
import "./index.css";
import Login from "./component/form/LoginForm";
import Orders from "./component/Orders/Orders";
import { Route, Routes } from "react-router-dom";
import Page404 from "./component/Page404/page404";
import Options from "./component/Options/Options";
import { ThreeCircles } from "react-loader-spinner";
import Settings from "./component/Settings/Settings";
import Billings from "./component/Billings/Billings";
import Customers from "./component/Customers/Customers";
import Income from "./component/Billings/Income/Income";
import Expense from "./component/Billings/Expense/Expense";
import Employes from "./component/Options/Employes/Employes";
import Received from "./component/Orders/Receiveds/Receiveds";
import MainDash from "./component/Dashboard/MainDash/MainDash";
import Customer from "./component/Customers/Customer/Customer";
import Bookings from "./component/Customers/Bookings/Bookings";
import RateTypes from "./component/Options/RateTypes/RateTypes";
import Suppliers from "./component/Customers/Supplier/Suppliers";
import UserSettings from "./component/UserSettings/UserSettings";
import TripSheet from "./component/Customers/TripSheet/TripSheet";
import Collecteds from "./component/Orders/Collecteds/Collecteds";
import OnlineBooking from "./component/OnlineBooking/OnlineBooking";
import Permission from "./component/Settings/Permission/Permission";
import Dispatcheds from "./component/Orders/Dispatcheds/Dispatcheds";
import UserSetting from "./component/UserSettings/UserInfo/UserInfo";
import FuelDetails from "./component/Options/FuelDetails/FuelDetails";
import MainSetting from "./component/Settings/MainSetting/MainSetting";
import ProfiteLoss from "./component/Billings/ProfiteLoss/ProfiteLoss";
import BillingMain from "./component/Billings/billingMain/billingMain";
import UserCreation from "./component/Settings/UserCreation/UserCreation";
import DriverMasters from "./component/Orders/DriverMasters/DriverMasters";
import DigitalSignature from "./component/DigitalSignature/DigitalSignature";
import MainDashboard from "./component/Dashboard/Maindashboard/MainDashboard";
import RateManagement from "./component/Options/RateManagement/RateManagement";
import StationCreation from "./component/Settings/StationCreation/StationCreation";
import OnlineLoginForm from "./component/OnlineBooking/OnlineLoginForm/OnlineLoginForm";



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
        {isLoading ? (
          <div className="loading-spinners">
            <ThreeCircles color="#3d92f3" height={80} width={80} />
            {/* <ThreeCircles color="#00BFFF" height={80} width={130} /> */}
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<MainDashboard />}>
              <Route path="/home/dashboard" element={<MainDash />} />
              <Route path="/home/customers" element={<Customers />} >
                <Route path="/home/customers/customers" element={<Customer />} />
                <Route path="/home/customers/supplier" element={<Suppliers />} />
                <Route path="/home/customers/bookings" element={<Bookings />} />
                <Route path="/home/customers/tripsheet" element={<TripSheet />} />
              </Route>
              <Route path="/home/orders" element={<Orders />}>
                <Route path="/home/orders/received" element={<Received />} />
                <Route path="/home/orders/dispatched" element={<Dispatcheds />} />
                <Route path="/home/orders/collected" element={<Collecteds />} />
                <Route path="/home/orders/drivermaster" element={<DriverMasters />} />
              </Route>
              <Route path="/home/options" element={<Options />} >
                <Route path="/home/options/ratetype" element={<RateTypes />} />
                <Route path="/home/options/ratemanagement" element={<RateManagement />} />
                <Route path="/home/options/fuledetails" element={<FuelDetails />} />
                <Route path="/home/options/employes" element={<Employes />} />
              </Route>
              <Route path="/home/billing" element={<Billings />}>
                <Route path="/home/billing/billing" element={<BillingMain />} />
                <Route path="/home/billing/expense" element={<Expense />} />
                <Route path="/home/billing/income" element={<Income />} />
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
              <Route path="/home/usersettings" element={<UserSettings />} >
                <Route path="/home/usersettings/usersetting" element={<UserSetting />} />
                <Route path="/home/usersettings/usersetting" element={<UserSetting />} />
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
