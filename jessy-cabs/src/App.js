import React, { useState, useEffect, useContext, useCallback, useRef } from "react";
import "./index.css";
import Info from "./component/Info/Info";
import Login from "./component/form/LoginForm";
import { Navigate, Route, Routes ,useLocation,useNavigate} from "react-router-dom";
import Page404 from "./component/Page404/page404";
import Logo from "./assets/img/logo.png";
import Mailer from "./component/Info/Mailer/Mailer";
import Settings from "./component/Settings/Settings";
import Billings from "./component/Billings/Billings";
import Bookings from "./component/Bookings/Bookings";
import Accounts from "./component/Accounts/Accounts";
import FuelInfo from "./component/Info/FuelInfo/FuelInfo";
// import RateTypes from "./component/Info/RateTypes/RateTypes";
import RateTypes from "./component/Registration/RateTypes/RateTypes";
import Transfer from "./component/Billings/Transfer/Transfer";
import MainDash from "./component/Dashboard/MainDash/MainDash";
import Received from "./component/Bookings/Receiveds/Receiveds";
import Registration from "./component/Registration/Registration";
import UserSettings from "./component/UserSettings/UserSettings";
import TripSheet from "./component/Bookings/TripSheet/TripSheet";
// import Employes from "./component/Registration/Employes/Employes";
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
// import RateManagement from "./component/Info/RateManagement/RateManagement";
// import RateManagement from "./component/Registration/RateManagement/RateManagement";
import DigitalSignature from "./component/DigitalSignature/DigitalSignature";
import MainDashboard from "./component/Dashboard/Maindashboard/MainDashboard";
// import StationCreation from "./component/Settings/StationCreation/StationCreation";
import StationCreation from "./component/Registration/StationCreation/StationCreation";
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
import SignatureGenerate from './component/Bookings/TripSheet/signature/SignatureGenerate';
import { useData1 } from "./component/Dashboard/Maindashboard/DataContext";
// import { Reports } from "./component/Registration/Report/Reports";
import { Reports } from "./component/Billings/Report/Reports";
import Map from "./component/Map/Map";
import { RealTime } from "./component/Map/RealTime/RealTime";
import { Vehicle } from "./component/Map/Vehicle/Vehicle";
import History from "./component/Map/History/History"
import Reminders from "./component/Map/Reminders/Reminders";
import UploadTollParking from "./component/Bookings/TripSheet/Uploadtollparking/UploadTollParking";
import AddVehicle from "./component/Map/Vehicle/AddVehicle/AddVehicle";
// import Employee from "./component/Info/Employes/Employes";
import Employes from "./component/Info/Employes/Employes"
import { Records } from "./component/Map/Records/Records";
import { PendingBills } from "./component/Billings/Report/pendingBills/PendingBills";
import is from "date-fns/esm/locale/is/index.js";
import Agreement from "./component/Info/AgreementMain/Agreement/Agreement";
import AgreementMain from "./component/Info/AgreementMain/AgreementMain";



function App() {
  const apiUrl = APIURL;
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

//   useEffect(() => {
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 3500);
//   }, []);

//   // useEffect(() => {
    
//   //   if (!isLoading && location.pathname !== '/') {
//   //     navigate(location.pathname);
//   //   }
//   // }, [isLoading, location.pathname, navigate]);
//  useEffect(() => {
//     if (!isLoading && location.pathname !== '/') {
//       // Prevent the page from being flashed during navigation
//       if (location.pathname !== window.location.pathname) {
//         navigate(location.pathname, { replace: true });
//       }
//     }
//   }, [isLoading, location.pathname, navigate]);


//  useEffect(() => {
//     // Set the loading state to false after 3500ms
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 3500);

//     // Handle redirection once isLoading is false
//     if (!isLoading && location.pathname !== '/') {
//       // Prevent flashing and redirect
//       if (location.pathname !== window.location.pathname) {
//         navigate(location.pathname, { replace: true });
//       }
//     }

//     // Cleanup the timer
//     return () => clearTimeout(timer);
//   }, [isLoading, location.pathname, navigate]);



  const { triggerCustomerAdd } = useData1()

 

  // Permission ----------------------------------------

  const { permissions } = useContext(PermissionContext)

  const BOOKING = permissions[0]?.read ;
  const bookingdata = permissions[1]?.read;
  const TripStatus = permissions[2]?.read
  const TriSheet = permissions[3]?.read

  const BILLING = permissions[4]?.read ;
  const BILLING_BillingMain = permissions[5]?.read;
  const Billing_Transfer = permissions[6]?.read 
  const Billing_CoveringBill = permissions[7]?.read
  const Billing_Reports = permissions[8]?.read
  

  const REGISTER = permissions[9]?.read 
  const R_RATEtype = permissions[10]?.read 
  const R_Customer=permissions[11]?.read 
  const R_Supllier = permissions[12]?.read 
  const R_Station = permissions[13]?.read 
  
 
  const SETTING = permissions[14]?.read 
  const Main_Setting = permissions[16]?.read
  const userCreation1=permissions[15]?.read ;
 
 


  const INFO = permissions[17]?.read ;
  const INFO_MAILER=permissions[18]?.read ;
  // const Mailers = permissions[18]?.read;
  const INFO_FuelInfo = permissions[19]?.read ;
  
  const INFO_Employee =  permissions[20]?.read 
  const Dashbord_read = permissions[21]?.read 
  // this for map page
  const Maps = permissions[22]?.read 
  const Map_Realtime = permissions[23]?.read
  const Map_Vehicle = permissions[24]?.read 
  const Map_Reminders = permissions[25]?.read 
  const Map_History = permissions[26]?.read 
  const Map_Records = permissions[27]?.read 



  const booking_page_permission = permissions[0]?.read || permissions[1]?.read || permissions[2]?.read || permissions[3]?.read
  const Billing_permission = permissions[4]?.read || permissions[5]?.read || permissions[6]?.read || permissions[7]?.read || permissions[8]?.read
  const Register_page_permission = permissions[9]?.read || permissions[10]?.read || permissions[11]?.read || permissions[12]?.read ||permissions[13]?.read;
  const Setting_page_permission = permissions[14]?.read || permissions[15]?.read || permissions[16]?.read 
  
  const Map_page_permission = permissions[22]?.read||permissions[23]?.read || permissions[24]?.read ||permissions[25]?.read ||permissions[26]?.read  || permissions[27]?.read
  const Info_page_permission = permissions[17]?.read || permissions[18]?.read || permissions[19]?.read || permissions[20]?.read



  //--------   fetch station name ------------------------------------------------------------


  // loading with correction

  // useEffect(() => {
  //   const auth = localStorage.getItem("auth");
  //   console.log(auth,'authen')
   
  //   if (auth === null || auth === undefined) {
  //     setIsLoading(false)
  //     navigate('/', { replace: true });
  //     return; 
  //   }
  
  // }, [isLoading, location.pathname, navigate, permissions]);


  useEffect(() => {
    const auth = localStorage.getItem("auth") === 'true';
    if (auth === null || auth === undefined) {
      setIsLoading(false)
      navigate('/', { replace: true });
      return; 
    }
    // Start a timer to stop loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);
  
    // Check if the user is authenticated
    if (auth) {
      // Keep loading if permissions are empty or undefined
      if (!permissions || permissions.length === 0) {
        setIsLoading(true);
      } else {
        setIsLoading(false); // Stop loading once permissions are populated
      }
    } else {
      setIsLoading(false); // Stop loading if not authenticated
    }
  
    // Handle redirection once loading is complete
    if (!isLoading && location.pathname !== '/') {
      if (location.pathname !== window.location.pathname) {
        navigate(location.pathname, { replace: true });
      }
    }
  
    // Clean up the timer
    return () => clearTimeout(timer);
  }, [isLoading, location.pathname, navigate, permissions]);

  // useEffect(() => {
  //   const auth = localStorage.getItem("auth") === 'true';
  
  //   // Fallback timer to stop loading after 3.5 seconds
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 3500);
  
  //   // Check if the user is authenticated and permissions are loaded
  //   if (auth) {
  //     if (!permissions || permissions.length === 0) {
  //       setIsLoading(true); // Keep loading if permissions are empty
  //     } else {
  //       setIsLoading(false); // Stop loading when permissions are populated
  //     }
  //   } else {
  //     setIsLoading(false); // Stop loading if the user is not authenticated
  //   }
  
  //   // Only navigate when the user is authenticated and permissions are populated
  //   if (!isLoading && auth && permissions && permissions.length > 0) {
  //     // If trying to access a path without permissions, redirect to the loading page
  //     if (location.pathname !== window.location.pathname) {
  //       navigate(location.pathname, { replace: true });
  //     }
  //   }
  
  //   // Clean up the timer on unmount
  //   return () => clearTimeout(timer);
  // }, [ permissions, isLoading, location.pathname, navigate]);
  
  

  const loginUserName = localStorage.getItem("username")
  
  const stationvalue = localStorage.getItem("stationValue");

  const [stationName, setStationName] = useState([]);


  useEffect(() => {
    const fetchSattionName = async () => {
      try {
        const response = await axios.get(`${apiUrl}/getStation-name`, { params: { username: loginUserName } })
        const resData = response.data;
        setStationName(resData);
      } catch (error) {
        console.log("error occur ", error);
      }
    }
    fetchSattionName();
  }, [apiUrl, loginUserName,stationvalue])

// console.log(permissions,'permissinon datas come')
//     const auth = localStorage.getItem("auth") === 'true';
//     console.log(auth);

 

  //---------------------------------------------------------------------
  //  fetching Organisation name (Customer )
  const [organizationNames, setOrganizationName] = useState([])

  
  
  




   // Loading for permisson



// useEffect(() => {
//   const auth = localStorage.getItem("auth") === 'true';
//   if (!isLoading && location.pathname !== '/') {
//     // Prevent the page from being flashed during navigation
//     if (location.pathname !== window.location.pathname) {
//       navigate(location.pathname, { replace: true });
//     }
//   }

//   if (auth) {
//       // If permissions data is empty or undefined, keep loading
//       if (!permissions || permissions.length === 0) {
//           setIsLoading(true);
//       } else {
//           setIsLoading(false); // Stop loading once permissions are populated
//       }
//   } else {
//       setIsLoading(false); // Stop loading if not authenticated
//   }
// },);

// console.log(permissions.length,' length of permissions')

  useEffect(() => {
    const organizationName = async () => {
      try {
        const response = await axios.get(`${apiUrl}/allCustomers`);
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
  const { orgName, logo, setLogo, setLogoTrigger, logotrigger } = useData() // its for logo

  const ref = useRef(false)
  const organizationname = orgName || localStorage.getItem('usercompany');

 
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(`${apiUrl}/fetchorg-logo`)

        if (response?.status === 200) {
          const logoImage = response?.data[0]?.fileName;
          setLogo(logoImage)
          setLogoTrigger(false)
          ref.current = true
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchdata()
  }, [apiUrl, setLogo, setLogoTrigger, orgName, organizationname, logotrigger])



  //--------------------------------------------
  // vehicle No 
  const [vehicleNo, setVehicleNo] = useState([])

  useEffect(() => {
    const getVehicleNo = async () => {
      const response = await axios.get(`${apiUrl}/get-vehicleNo`)
      setVehicleNo(response.data.data)
    }
    getVehicleNo()
  }, [apiUrl])

  //-------------------------------------------
  const [customer, setCustomer] = useState()
  
  const [Statename,setStateName] = useState([])

  useEffect(() => {
    const getCustomer = async () => {
      const response = await axios.get(`${apiUrl}/get-customer`)
      setCustomer(response.data)
    }
    getCustomer()
  }, [apiUrl])
  useEffect(() => {
    const getstationstate = async () => {
      const response = await axios.get(`${apiUrl}/Statecreation`)
      setStateName(response.data)
    }
    getstationstate()
  }, [apiUrl])


  const [customerData, setCustomerData] = useState([])
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/get-customer`
        );
        const customerDetails = response.data;
        setCustomerData(customerDetails)
      } catch (err) {
        console.log("Error", err)
      }
    }
    fetchCustomer()
  }, [apiUrl, triggerCustomerAdd])



  //------------fetch vehicle name-------------------------------------------------------------------------------------------------

  const [vehileName, setVehicleName] = useState([])


  useEffect(() => {
    const fetchgetvehicleName = async () => {
      try {
        const response = await axios.get(`${apiUrl}/getvehicledatauniquevehicleNames`);
        const data = response.data
        const names = data.map(res => res.VechicleNames)

        setVehicleName(names)


      }
      catch (error) {
        console.log(error, "error");
      }
    };
    fetchgetvehicleName()
  }, [apiUrl, vehileName])


  // const getElement = () => {
  //   if (Dashbord_read) return <MainDash stationName={stationName} />;
  
  //   if (booking_page_permission) {
  //     if (bookingdata) return <Navigate to="/home/bookings/booking" />;
  //     if (TripStatus) return <Navigate to="/home/bookings/tripstatus" />;
  //     if (TriSheet) return <Navigate to="/home/bookings/tripsheet" />;
  //   }
  
  //   if (Billing_permission) {
  //     if (BILLING_BillingMain) return <Navigate to="/home/billing/billing" />;
  //     if (Billing_Transfer) return <Navigate to="/home/billing/transfer" />;
  //     if (Billing_CoveringBill) return <Navigate to="/home/billing/coveringbill" />;
  //     if (Billing_Reports) return <Navigate to="/home/billing/reports" />;
  //   }
  
  //   if (Register_page_permission) {
  //     if (R_RATEtype) return <Navigate to="/home/registration/ratetype" />;
  //     if (R_Customer) return <Navigate to="/home/registration/customer" />;
  //     if (R_Supllier) return <Navigate to="/home/registration/supplier" />;
  //     if (R_Station) return <Navigate to="/home/registration/stationcreation" />;
  //   }
  
  //   if (Setting_page_permission) {
  //     if (userCreation1) return <Navigate to="/home/settings/usercreation" />;
  //     if (Main_Setting) return <Navigate to="/home/settings/mainsetting" />;
  //   }
  
  //   if (Map_page_permission) return <Navigate to="/home/Map/RealTime" />;
  
  //   if (Info_page_permission) {
  //     if (INFO_MAILER) return <Navigate to="/home/info/mailer" />;
  //     if (INFO_FuelInfo) return <Navigate to="/home/info/fuelinfo" />;
  //     if (INFO_Employee) return <Navigate to="/home/info/employee" />;
  //   }
  
  //   // Default fallback
  //   return <Navigate to="/home/usersettings/usersetting" />;
  // };

  return (
    <>
      <div className={isLoading ? "loading-container" : ""}>
        { isLoading ? (
          <div className="loading-spinners">
            <div className="logo-loading">
              <img src={Logo} alt="logo" />
            </div>
            
          </div>
          
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<MainDashboard />}>
              <Route path="/home/dashboard" element={Dashbord_read ? <MainDash stationName={stationName} /> :
              // <Route path="/home/dashboard" element={ getElement()

              //   (booking_page_permission ? (<Navigate to="/home/bookings/booking" />) :
              //     (
              //       Billing_permission ? (<Navigate to="/home/billing/billing" />) :
              //         (
              //           Register_page_permission ? (<Navigate to="/home/registration/customer" />) : (Setting_page_permission ? (<Navigate to="/home/settings/usercreation" />) : Map_page_permission ? (<Navigate to="/home/Map/RealTime" />) : <Navigate to="/home/info/ratetype" />)
              //         )
              //     )
              //   )
              // }
              // (booking_page_permission ? (<Navigate to="/home/bookings/booking" />) :
              //     (
              //       Billing_permission ? (<Navigate to="/home/billing/billing" />) :
              //         (
              //           Register_page_permission ? (<Navigate to="/home/registration/customer" />) : (Setting_page_permission ? (<Navigate to="/home/settings/usercreation" />) : Map_page_permission ? (<Navigate to="/home/Map/RealTime" />) : Info_page_permission ? (<Navigate to="/home/info/mailer" />):<MainDash stationName={stationName} />)
              //         )
              //     )
              //   )
            //   (booking_page_permission ? (<Navigate to="/home/bookings/booking" />) :
            //   (
            //     Billing_permission ? (<Navigate to="/home/billing/billing" />) :
            //       (
            //         Register_page_permission ? (<Navigate to="/home/registration/customer" />) : (Setting_page_permission ? (<Navigate to="/home/settings/usercreation" />) : Map_page_permission ? (<Navigate to="/home/Map/RealTime" />) : Info_page_permission ? (<Navigate to="/home/info/mailer" />):(<Navigate to="/home/usersettings/usersetting" />) )
            //       )
            //   )
            // )

          
         
           
            
            (booking_page_permission ? ( bookingdata ? <Navigate to="/home/bookings/booking" /> : TripStatus ? <Navigate to="/home/bookings/tripstatus" /> : TriSheet ? <Navigate to="/home/bookings/tripsheet" />:<></>) :
            (
              Billing_permission ? (BILLING_BillingMain ? <Navigate to="/home/billing/billing" /> : Billing_Transfer ? <Navigate to="/home/billing/transfer" /> : Billing_CoveringBill ? <Navigate to="/home/billing/coveringbill" /> : Billing_Reports ? <Navigate to="/home/billing/reports" /> :<></> ) :
                (
                  Register_page_permission ? ( R_RATEtype ? <Navigate to="/home/registration/ratetype" /> :  R_Customer ? <Navigate to= "/home/registration/customer" /> : R_Supllier ? <Navigate to= "/home/registration/supplier" /> : R_Station ? <Navigate to= "/home/registration/stationcreation" />:<></>  ) : (Setting_page_permission ? ( userCreation1 ? <Navigate to="/home/settings/usercreation" /> : Main_Setting ?    <Navigate to="/home/settings/mainsetting" /> :<></> ) : Map_page_permission ? (<Navigate to="/home/Map/RealTime" />) : Info_page_permission ? (INFO_MAILER ?   <Navigate to= "/home/info/mailer" /> : INFO_FuelInfo ? <Navigate to="/home/info/fuelinfo" /> :INFO_Employee ?   <Navigate to= "/home/info/employee" /> : <></>):(<Navigate to="/home/usersettings/usersetting" />) )
                )
            )
          )

              }
              />
              <Route path="/home/bookings" element={ BOOKING !== 0 ? <Bookings /> : <NoPermission />}>
                <Route
                  path="/home/bookings/booking"
                  element={bookingdata !== 0  && bookingdata !== undefined ? (<BookingMain stationName={stationName} customerData={customerData} />) : (<NoPermission />)}
                />
                <Route
                  path="/home/bookings/tripsheet"
                  element={TriSheet !== 0 && TriSheet !== undefined ? (<TripSheet stationName={stationName} logoImage={logo} />) : (<NoPermission />)}
                />
                <Route path="/home/bookings/received" element={<Received />} />
                <Route
                  path="/home/bookings/tripstatus"
                  element={TripStatus !== 0 &&  TripStatus !==  undefined ? (<TripStatusMain stationName={stationName} customer={customer} vehicleNo={vehicleNo} /> ): (<NoPermission />)}
                />
              </Route>


              <Route path="/home/Map" element={ Maps !== 0 ? <Map /> : <NoPermission />}>
                <Route
                  path="/home/Map/RealTime"
                  element={Map_Realtime !== 0 && Map_Realtime !== undefined  ? (<RealTime stationName={stationName} customerData={customerData} />) : (<NoPermission />)}
                />
                <Route
                  path="/home/Map/History"
                  element={Map_History !== 0 && Map_History !== undefined ? (<History stationName={stationName} customerData={customerData} />) : (<NoPermission />)}
                />
                <Route
                  path="/home/Map/Vehicle"
                  element={Map_Vehicle !== 0 && Map_Vehicle !== undefined ? (<Vehicle stationName={stationName} logoImage={logo} /> ):(<NoPermission />)}
                />

                <Route
                  path="/home/Map/Reminders"
                  element={Map_Reminders !== 0  && Map_Reminders !== undefined ? (<Reminders stationName={stationName} logoImage={logo} />) : (<NoPermission />)}
                />

                <Route
                  path="/home/Map/Records"
                  element={Map_Records !== 0  && Map_Records !== undefined ? (<Records stationName={stationName} logoImage={logo} />) : (<NoPermission />)}
                />

                <Route
                  path="/home/Map/Vehicle/AddVehicle"
                  element={Maps !== 0 && Maps !== undefined ? (<AddVehicle stationName={stationName} logoImage={logo} /> ):( <NoPermission />)}
                />

              </Route>






              <Route path="/home/registration" element={ REGISTER !== 0 ? <Registration /> : <NoPermission /> }>
              <Route
                  path="/home/registration/ratetype"
                  element={R_RATEtype !== 0 && R_RATEtype !== undefined ? (<RateTypes stationName={stationName} organizationNames={organizationNames} vehileName={vehileName} />) : (<NoPermission />)}
                />
                <Route
                  path="/home/registration/customer"
                  element={R_Customer !== 0  &&  R_Customer !== undefined ? (<Customer stationName={stationName} />) : (<NoPermission />)}
                />
                <Route
                  path="/home/registration/supplier"
                  element={R_Supllier !== 0 && R_Supllier !== undefined ? (<Suppliers stationName={stationName} />) : (<NoPermission />)}
                />
                {/* <Route
                  path="/home/registration/employes"
                  element={R_Employee !== 0 ? <Employes stationName={stationName} /> : <NoPermission />}
                /> */}

                {/* <Route
                  path="/home/registration/reports"
                  element={R_Station !== 0 ? <Reports stationName={stationName} /> : <NoPermission />}
                /> */}
{/* 
                <Route
                  path="/home/registration/ratetype"
                  element={R_Employee !== 0 ? <RateTypes stationName={stationName} organizationNames={organizationNames} vehileName={vehileName} /> : <NoPermission />}
                /> */}
                 <Route
                  path="/home/registration/stationcreation"
                  element={R_Station !== 0  && R_Station !== undefined  ? (<StationCreation /> ): (<NoPermission />)}
                />

                {/* <Route
                  path="/home/registration/ratemanagement"
                  element={R_Employee !== 0 ? <RateManagement stationName={stationName} organizationNames={organizationNames} vehileName={vehileName} /> : <NoPermission />}
                /> */}

                {/* <Route
                  path="/home/registration/reports"
                  element={<Reports stationName={stationName} /> }
                /> */}
              </Route>

              <Route path="/home/info" element={INFO !== 0 ? <Info /> :<NoPermission />}>
                {/* <Route path="/home/info/ratetype" element={INFO !== 0 ? <RateTypes stationName={stationName} organizationNames={organizationNames} /> : "INFO"} /> */}
                {/* <Route path="/home/info/ratemanagement" element={<RateManagement stationName={stationName} organizationNames={organizationNames} vehileName={vehileName} />} /> */}
                {/* <Route path="/home/info/mailer" element={Mailers !== 0 ? <Mailer /> : <NoPermission />} />
                <Route path="/home/info/mailer/TemplateSelection" element={<TemplateSelection />} />
                <Route path="/home/info/mailer/TemplateCreation" element={<TemplateCreation />} />
                <Route path="/home/info/fuelinfo" element={INFO_FuelInfo !== 0 ? <FuelInfo /> : <NoPermission />} />
                <Route path="/home/info/employee" element={INFO_FuelInfo !== 0 ? <Employee /> : <NoPermission />} /> */}
                 <Route path="/home/info/mailer" element={INFO_MAILER !== 0  && INFO_MAILER !== undefined ? (<Mailer />): (<NoPermission />)} />
                <Route path="/home/info/mailer/TemplateSelection" element={<TemplateSelection />} />
                <Route path="/home/info/mailer/TemplateCreation" element={<TemplateCreation />} />
                <Route path="/home/info/fuelinfo" element={INFO_FuelInfo !== 0 && INFO_FuelInfo !== undefined  ? (<FuelInfo />) : (<NoPermission /> )} />
                <Route path="/home/info/employee" element={INFO_Employee !== 0 &&  INFO_Employee !== undefined   ?  ( <Employes />):(<NoPermission />)} />
                <Route path="/home/info/agreement" element={INFO_Employee !== 0 &&  INFO_Employee !== undefined   ?  ( <AgreementMain  organizationNames={organizationNames}/>):(<NoPermission />)} />                
              </Route>
              <Route path="/home/billing" element={BILLING !== 0 ? <Billings /> :<NoPermission />}>

                <Route path="/home/billing/billing" element={BILLING_BillingMain !== 0 && BILLING_BillingMain !== undefined ? (<BillingMain  Statename={Statename} organizationNames={organizationNames} />) : (<NoPermission />)} />
                <Route path="/home/billing/transfer" element={Billing_Transfer !== 0 && Billing_Transfer !== undefined  ? (<Transfer stationName={stationName}  Statename={Statename} organizationNames={organizationNames} /> ):( <NoPermission />)} />
                <Route
                  path="/home/billing/coveringbill"
                  element={Billing_CoveringBill !== 0 && Billing_CoveringBill !== undefined ? (<CoveringBill stationName={stationName} Statename={Statename} organizationNames={organizationNames} />) : ( <NoPermission />)}
                />
                <Route path="/home/billing/reports" element={Billing_Reports !== 0  && Billing_Reports !== undefined ? (<Reports stationName={stationName} Statename={Statename} organizationNames={organizationNames} />) : (<NoPermission />)} />
              </Route>

             <Route path="/home/billing/reports/Pendingbills" element ={<PendingBills />}></Route>
              <Route path="/home/accounts" element={<Accounts />}>

              </Route>
              <Route path="/home/settings" element={SETTING !==0 ? <Settings /> : <NoPermission />}>
                <Route
                  path="/home/settings/usercreation"
                  element={userCreation1 !== 0 && userCreation1 !== undefined ? (<UserCreation stationName={stationName} />) :( <NoPermission />)}
                />
                {/* <Route
                  path="/home/settings/stationcreation"
                  element={Station_Creation !== 0 ? <StationCreation /> : <NoPermission />}
                /> */}
                <Route
                  path="/home/settings/permission"
                  element={<Permission />}
                />
                <Route
                  path="/home/settings/mainsetting"
                  element={Main_Setting !== 0  && Main_Setting !== undefined ? (<MainSetting logoImage={logo} />) : (<NoPermission />)}
                />
              </Route>
              <Route path="/home/usersettings" element={<UserSettings />}>
                <Route
                  path="/home/usersettings/usersetting"
                  element={<UserSetting />}
                />
                {/* <Route
                  path="/home/usersettings/usersetting"
                  element={<UserSetting />}
                /> */}
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
              path="/SignatureGenerate"
              element={<SignatureGenerate />}
            />
            <Route
              path="/UploadtollPark"
              element={<UploadTollParking />}
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
