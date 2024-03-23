import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { APIURL } from "../url";

export const PermissionsContext = createContext();

export const PermissionsProvider = ({ children }) => {
    const [userPermissions, setUserPermissions] = useState({});
    const user_id = localStorage.getItem('useridno');
    // const [data, setData] = useState({});
    // console.log("user id", user_id)



    const [permissionsData, setPermissionsData] = useState(initialPermissionsData);
    let UserCreation;
    //-----------------------------------

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                if (user_id !== "undefined") {
                    // console.log("user_id ", user_id)
                    const response = await axios.get(`${APIURL}/user-permissions/${user_id}`);
                    const permissionsData = response.data;
                    const data = response.data;
                    // console.log("per ", permissionsData)
                    // setData(permissionsData)
                    setUserPermissions(permissionsData);


                    //-----------------------
                    const FuelEntry = Array.isArray(data) ? data.find(item => item.page_name === 'Fuel Entry') : null;
                    const GroupMaster = Array.isArray(data) ? data.find(item => item.page_name === 'Group Master') : null;
                    const DriverMaster = Array.isArray(data) ? data.find(item => item.page_name === 'Driver Master') : null;
                    const GuestMaster = Array.isArray(data) ? data.find(item => item.page_name === 'Guest Master') : null;
                    const LetterImport = Array.isArray(data) ? data.find(item => item.page_name === 'Letter Import') : null;
                    const MISReport = Array.isArray(data) ? data.find(item => item.page_name === 'MIS Report') : null;
                    const MOBilling = Array.isArray(data) ? data.find(item => item.page_name === 'MO Billing') : null;
                    const Payments = Array.isArray(data) ? data.find(item => item.page_name === 'Payments') : null;
                    const PettyCashPayments = Array.isArray(data) ? data.find(item => item.page_name === 'Petty Cash Payments') : null;
                    const PettyCashReceipts = Array.isArray(data) ? data.find(item => item.page_name === 'Petty Cash Receipts') : null;
                    const Profit = Array.isArray(data) ? data.find(item => item.page_name === 'Profit') : null;
                    const RateForContract = Array.isArray(data) ? data.find(item => item.page_name === 'Rate For Contract') : null;
                    const RateForCustomer = Array.isArray(data) ? data.find(item => item.page_name === 'Rate For Customer') : null;
                    const RateForVendor = Array.isArray(data) ? data.find(item => item.page_name === 'Rate For Vendor') : null;
                    const RateType = Array.isArray(data) ? data.find(item => item.page_name === 'Rate Type') : null;
                    const SupplierMaster = Array.isArray(data) ? data.find(item => item.page_name === 'Supplier Master') : null;
                    const TallyExport = Array.isArray(data) ? data.find(item => item.page_name === 'Tally Export') : null;
                    const TripSheet = Array.isArray(data) ? data.find(item => item.page_name === 'Trip Sheet') : null;
                    UserCreation = Array.isArray(data) ? data.find(item => item.page_name === 'User Creation') : null;
                    const VehicleType = Array.isArray(data) ? data.find(item => item.page_name === 'Vehicle Type') : null;
                    const VendorReport = Array.isArray(data) ? data.find(item => item.page_name === 'Vendor Report') : null;
                    const Permission = Array.isArray(data) ? data.find(item => item.page_name === 'Permission') : null;: null;
                    const StationCreation = Array.isArray(data) ? data.find(item => item.page_name === 'Station Creation') : null;
                    const EmployeePayRoll = Array.isArray(data) ? data.find(item => item.page_name === 'Employee PayRoll') : null;
                    const FuelInfo = Array.isArray(data) ? data.find(item => item.page_name === 'Fuel Info') : null;
                    const TaxSettings = Array.isArray(data) ? data.find(item => item.page_name === 'Tax settings') : null;
                    const DashboardPage = Array.isArray(data) ? data.find(item => item.page_name === 'Dashboard page') : null;
                    const BookingPage = Array.isArray(data) ? data.find(item => item.page_name === 'Booking page') : null;
                    const BillingPage = Array.isArray(data) ? data.find(item => item.page_name === 'Billing page') : null;
                    const RegisterPage = Array.isArray(data) ? data.find(item => item.page_name === 'Register page') : null;
                    const SettingsPage = Array.isArray(data) ? data.find(item => item.page_name === 'Settings page') : null;
                    const InfoPage = Array.isArray(data) ? data.find(item => item.page_name === 'Info page') : null;
                    const UserPage = Array.isArray(data) ? data.find(item => item.page_name === 'User page') : null;


                    //-----------------------




                }
            } catch (error) {
                console.error("Error fetching permissions:", error);
            }
        };

        fetchPermissions();




    }, [user_id]);

    return (
        <PermissionsContext.Provider value={{ userPermissions, UserCreation }}>
            {children}
        </PermissionsContext.Provider>
    );
};
