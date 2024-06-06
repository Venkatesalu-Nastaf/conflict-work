import React, { useState, useEffect, useContext, useCallback, useRef } from "react";
import "./index.css";
import Info from "./component/Info/Info";
import Login from "./component/form/LoginForm";
import { Navigate, Route, Routes } from "react-router-dom";
import Page404 from "./component/Page404/page404";
import Logo from "./assets/img/logonas.png";
import Mailer from "./component/Info/Mailer/Mailer";
import Settings from "./component/Settings/Settings";
import Billings from "./component/Billings/Billings";
import Bookings from "./component/Bookings/Bookings";
import Accounts from "./component/Accounts/Accounts";
import FuelInfo from "./component/Info/FuelInfo/FuelInfo";
import RateTypes from "./component/Info/RateTypes/RateTypes";
import Transfer from "./component/Billings/Transfer/Transfer";
import MainDash from "./component/Dashboard/MainDash/MainDash";
import Received from "./component/Bookings/Receiveds/Receiveds";
import Registration from "./component/Registration/Registration";
import UserSettings from "./component/UserSettings/UserSettings";
import TripSheet from "./component/Bookings/TripSheet/TripSheet";
import Employes from "./component/Registration/Employes/Employes";
import Customer from "./component/Registration/Customer/Customer";
import Suppliers from "./component/Registration/Supplier/Suppliers";
import OnlineBooking from "./component/OnlineBooking/OnlineBooking";
import Permission from "./component/Settings/Permission/Permission";
import UserSetting from "./component/UserSettings/UserInfo/UserInfo";
import BookingMain from "./component/Bookings/BookingMain/BookingMain";
import MainSetting from "./component/Settings/MainSetting/MainSetting";
import BillingMain from "./component/Billings/billingMain/billingMain";
import CoveringBill from "./component/Billings/CoveringBill/CoveringBill";
import UserCreation from "./component/Settings/UserCreation/UserCreation";
import RateManagement from "./component/Info/RateManagement/RateManagement";
import DigitalSignature from "./component/DigitalSignature/DigitalSignature";
import MainDashboard from "./component/Dashboard/Maindashboard/MainDashboard";
import StationCreation from "./component/Settings/StationCreation/StationCreation";
import NavigationMap from "./component/Bookings/TripSheet/NavigationMap/MapComponent";
import OnlineLoginForm from "./component/OnlineBooking/OnlineLoginForm/OnlineLoginForm";
import TemplateSelection from "./component/Info/Mailer/TemplateSelection/TemplateSelection";
import TemplateCreation from "./component/Info/Mailer/TemplateCreation/TemplateCreation";
import TripStatusMain from "./component/Bookings/TripStatusMain/TripStatusMain";
import { PermissionContext } from "./component/context/permissionContext";
import axios from "axios";
import { APIURL } from "../src/component/url";
import NoPermission from "./component/permissionContext/NoPermission/NoPermission";
import { useData } from "./component/Dashboard/MainDash/Sildebar/DataContext2";




function App() {
  const apiUrl = APIURL;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);


  // Permission ----------------------------------------

  const { permissions } = useContext(PermissionContext)

  const BOOKING = permissions[0]?.read || permissions[1]?.read;;
  const TripStatus = permissions[2]?.read;
  const TriSheet = permissions[3]?.read;

  const BILLING = permissions[4]?.read || permissions[5]?.read;;
  const Billing_Transfer = permissions[6]?.read;
  const Billing_CoveringBill = permissions[7]?.read;

  const REGISTER = permissions[8]?.read || permissions[9]?.read;
  const R_Supllier = permissions[10]?.read;
  const R_Employee = permissions[11]?.read;

  const SETTING = permissions[12]?.read || permissions[13]?.read;
  const Station_Creation = permissions[14]?.read;
  const Main_Setting = permissions[15]?.read;

  const INFO = permissions[16]?.read || permissions[17]?.read;
  const Mailers = permissions[18]?.read;
  const INFO_FuelInfo = permissions[19]?.read;
  const Dashbord_read = permissions[20]?.read;


  //--------   fetch station name ------------------------------------------------------------

  const loginUserName = localStorage.getItem("username")

  const [stationName, setStationName] = useState([]);

  useEffect(() => {
    const fetchSattionName = async () => {
      try {

        const response = await axios.get(`${apiUrl}/getStation-name`, { params: { username: loginUserName } })
        const station = response.data;
        setStationName(station);

      } catch (error) {
        console.log("error occur ", error);
      }
    }
    fetchSattionName();
  }, [apiUrl, loginUserName])


  //---------------------------------------------------------------------
  //  fetching Organisation name (Customer )
  const [organizationNames, setOrganizationName] = useState([])

  useEffect(() => {
    const organizationName = async () => {
      try {
        const response = await axios.get(`${apiUrl}/customers`);
        const organisationData = response?.data;
        const names = organisationData.map(res => res.customer);
        setOrganizationName(names);
      } catch (error) {
        console.error('Error fetching organization names:', error);
      }
    };
    organizationName();

  }, [apiUrl]); // Empty dependency array to ensure it runs only once

  //--------------------------------------------------------
  //fetch org logo
  const { logo, setLogo, setLogoTrigger, logotrigger } = useData() // its for logo

  const ref = useRef(false)

  const fetchOrgLogo = useCallback(async () => {
    try {
      const organizationname = localStorage.getItem('usercompany');
      console.log("organizationname", organizationname)
      if (!organizationname || organizationname === undefined) return
      const response = await axios.get(`${apiUrl}/fetchorg-logo/${organizationname}`)

      if (response?.status === 200) {
        const logoImage = response?.data[0]?.fileName;
        setLogo(logoImage)
        setLogoTrigger(false)
        ref.current = true
        // console.log("org", organizationname)
      }
    } catch (err) {
      console.log(err)
    }
  }, [apiUrl, setLogo, setLogoTrigger])

  useEffect(() => {
    if (!ref.current) {
      fetchOrgLogo()
    }

  }, [logotrigger, fetchOrgLogo])

  //-------------------------------------------------------------------------------------------------


  return (
    <>
      <div className={isLoading ? "loading-container" : ""}>
        {isLoading ? (
          <div className="loading-spinners">
            <div className="logo-loading">
              <img src={Logo} alt="logo" />
            </div>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<MainDashboard />}>
              <Route path="/home/dashboard" element={Dashbord_read !== 0 ? <MainDash stationName={stationName} /> : <Navigate to="/home/bookings/booking" />} />

              <Route path="/home/bookings" element={<Bookings />}>
                <Route
                  path="/home/bookings/booking"
                  element={BOOKING !== 0 ? <BookingMain stationName={stationName} /> : <NoPermission />}
                />
                <Route
                  path="/home/bookings/tripsheet"
                  element={TriSheet !== 0 ? <TripSheet stationName={stationName} /> : <NoPermission />}
                />
                <Route path="/home/bookings/received" element={<Received />} />
                <Route
                  path="/home/bookings/tripstatus"
                  element={TripStatus !== 0 ? <TripStatusMain stationName={stationName} /> : <NoPermission />}
                />
              </Route>
              <Route path="/home/registration" element={<Registration />}>
                <Route
                  path="/home/registration/customer"
                  element={REGISTER !== 0 ? <Customer stationName={stationName} /> : <NoPermission />}
                />
                <Route
                  path="/home/registration/supplier"
                  element={R_Supllier !== 0 ? <Suppliers stationName={stationName} /> : <NoPermission />}
                />
                <Route
                  path="/home/registration/employes"
                  element={R_Employee !== 0 ? <Employes stationName={stationName} /> : <NoPermission />}
                />
              </Route>

              <Route path="/home/info" element={<Info />}>
                <Route path="/home/info/ratetype" element={INFO !== 0 ? <RateTypes stationName={stationName} organizationNames={organizationNames} /> : "INFO"} />
                <Route path="/home/info/ratemanagement" element={<RateManagement stationName={stationName} organizationNames={organizationNames} />} />
                <Route path="/home/info/mailer" element={Mailers !== 0 ? <Mailer /> : <NoPermission />} />
                <Route path="/home/info/mailer/TemplateSelection" element={<TemplateSelection />} />
                <Route path="/home/info/mailer/TemplateCreation" element={<TemplateCreation />} />
                <Route path="/home/info/fuelinfo" element={INFO_FuelInfo !== 0 ? <FuelInfo /> : <NoPermission />} />
              </Route>
              <Route path="/home/billing" element={<Billings />}>

                <Route path="/home/billing/billing" element={BILLING !== 0 ? <BillingMain organizationNames={organizationNames} /> : <NoPermission />} />
                <Route path="/home/billing/transfer" element={Billing_Transfer !== 0 ? <Transfer stationName={stationName} organizationNames={organizationNames} /> : <NoPermission />} />
                <Route
                  path="/home/billing/coveringbill"
                  element={Billing_CoveringBill !== 0 ? <CoveringBill stationName={stationName} organizationNames={organizationNames} /> : <NoPermission />}
                />
              </Route>
              <Route path="/home/accounts" element={<Accounts />}>

              </Route>
              <Route path="/home/settings" element={<Settings />}>
                <Route
                  path="/home/settings/usercreation"
                  element={SETTING !== 0 ? <UserCreation stationName={stationName} /> : <NoPermission />}
                />
                <Route
                  path="/home/settings/stationcreation"
                  element={Station_Creation !== 0 ? <StationCreation /> : <NoPermission />}
                />
                <Route
                  path="/home/settings/permission"
                  element={<Permission />}
                />
                <Route
                  path="/home/settings/mainsetting"
                  element={Main_Setting !== 0 ? <MainSetting logoImage={logo} /> : <NoPermission />}
                />
              </Route>
              <Route path="/home/usersettings" element={<UserSettings />}>
                <Route
                  path="/home/usersettings/usersetting"
                  element={<UserSetting />}
                />
                <Route
                  path="/home/usersettings/usersetting"
                  element={<UserSetting />}
                />
              </Route>
            </Route>
            <Route path="/navigationmap" element={<NavigationMap />} />
            <Route path="/onlinelogin" element={<OnlineLoginForm />} />
            <Route path="/onlinebooking" element={<OnlineBooking />} />
            <Route
              path="/onlinedigital/digitalsignature"
              element={<DigitalSignature />}
            />
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
      </div >
    </>
  );
}

export default App;
