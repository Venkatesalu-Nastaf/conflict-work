import React, { useState, useEffect } from "react";
import "./index.css";
import Login from "./component/form/LoginForm";
import Maintenance from "./component/Maintenance/Maintenance";
import { Route, Routes } from "react-router-dom";
import Page404 from "./component/Page404/page404";
import Registration from "./component/Registration/Registration";
import { ThreeCircles } from "react-loader-spinner";
import Settings from "./component/Settings/Settings";
import Billings from "./component/Billings/Billings";
import Mailer from "./component/Registration/Mailer/Mailer";
import Customer from "./component/Registration/Customer/Customer";
import Income from "./component/Billings/Income/Income";
import Expense from "./component/Billings/Expense/Expense";
import Employes from "./component/Maintenance/Employes/Employes";
import Received from "./component/Bookings/Receiveds/Receiveds";
import MainDash from "./component/Dashboard/MainDash/MainDash";
import Bookings from "./component/Bookings/Bookings";
import BookingMani from "./component/Bookings/BookingMani/BookingMani";
import RateTypes from "./component/Maintenance/RateTypes/RateTypes";
import Suppliers from "./component/Registration/Supplier/Suppliers";
import UserSettings from "./component/UserSettings/UserSettings";
import TripSheet from "./component/Bookings/TripSheet/TripSheet";
import OnlineBooking from "./component/OnlineBooking/OnlineBooking";
import Permission from "./component/Settings/Permission/Permission";
import Dispatcheds from "./component/Bookings/Dispatcheds/Dispatcheds";
import UserSetting from "./component/UserSettings/UserInfo/UserInfo";
import FuelInfo from "./component/Maintenance/FuelInfo/FuelInfo";
import MainSetting from "./component/Settings/MainSetting/MainSetting";
import ProfiteLoss from "./component/Billings/ProfiteLoss/ProfiteLoss";
import BillingMain from "./component/Billings/billingMain/billingMain";
import UserCreation from "./component/Settings/UserCreation/UserCreation";
import DigitalSignature from "./component/DigitalSignature/DigitalSignature";
import MainDashboard from "./component/Dashboard/Maindashboard/MainDashboard";
import RateManagement from "./component/Maintenance/RateManagement/RateManagement";
import StationCreation from "./component/Settings/StationCreation/StationCreation";
import OnlineLoginForm from "./component/OnlineBooking/OnlineLoginForm/OnlineLoginForm";



function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
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
              <Route path="/home/bookings" element={<Bookings />} >
                <Route path="/home/bookings/booking" element={<BookingMani />} />
                <Route path="/home/bookings/tripsheet" element={<TripSheet />} />
                <Route path="/home/bookings/received" element={<Received />} />
                <Route path="/home/bookings/dispatched" element={<Dispatcheds />} />
                {/* <Route path="/home/maintenance/maintenance" element={<Customer />} />
                <Route path="/home/maintenance/supplier" element={<Suppliers />} /> */}
              </Route>
              <Route path="/home/registration" element={<Registration />} >
                <Route path="/home/registration/customer" element={<Customer />} />
                <Route path="/home/registration/supplier" element={<Suppliers />} />
                <Route path="/home/registration/employes" element={<Employes />} />


                {/* <Route path="/home/orders/received" element={<Received />} />
                <Route path="/home/orders/dispatched" element={<Dispatcheds />} /> */}
                {/* <Route path="/home/orders/drivermaster" element={<DriverMasters />} /> */}
              </Route>
              <Route path="/home/maintenance" element={<Maintenance />}>
                <Route path="/home/maintenance/ratetype" element={<RateTypes />} />
                <Route path="/home/maintenance/ratemanagement" element={<RateManagement />} />
                <Route path="/home/maintenance/mailer" element={<Mailer />} />
                <Route path="/home/maintenance/fuelinfo" element={<FuelInfo />} />
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
