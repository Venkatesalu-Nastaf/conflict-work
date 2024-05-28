import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { VehicleModel } from "./BookingChart";
import { APIURL } from "../../../url.js";

const useBookingchart = () => {
  const apiUrl = APIURL;
  // const user_id = localStorage.getItem("useridno");
  const [fromDate, setFromDate] = useState(dayjs());
  const [toDate, setToDate] = useState(dayjs());
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [info, setInfo] = useState(false);
  const [warning, setWarning] = useState(false);
  const [successMessage] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [warningMessage] = useState({});
  const [infoMessage] = useState({});
  const [assignDriver, setAssignDriver] = useState(0)
  const [driverOnline, setDriverOnline] = useState(0)
  const [driverOffline, setDriverOffline] = useState(0)
  const [activeVehicle, setActiveVehicle] = useState(0)
  const [offlineVehicle, setOfflineVehicle] = useState(0)
  const [inActiveVehicle, setInActiveVehicle] = useState(0)
  const [driverOnlineDetails, setDriverOnlineDetails] = useState([])
  const [driverOfflineDetails, setDriverOfflineDetails] = useState([])
  const [driverActiveDetails, setDriverActiveDetails] = useState([])
  const [vehicleActiveDetails, setVehicleActiveDetails] = useState([])
  const [vehicleOnlineDetails, setVehicleOnlineDetails] = useState([])
  const [vehicleOfflineDetails, setVehicleOfflineDetails] = useState([])


  //------------------------popup-------------------  
  const hidePopup = () => {
    setSuccess(false);
    setError(false);
    setInfo(false);
    setWarning(false);
  };

  useEffect(() => {
    if (error || success || warning || info) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success, warning, info]);

  //-----------------------------------------------

  // Getting all Driver Details
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/getDriverDetails`);
        const driverDetails = response.data;

        // Ensure data integrity
        if (!Array.isArray(driverDetails)) {
          console.error("Invalid data format: Expected an array.");
          return;
        }
        // Filter active drivers
        const activeDrivers = driverDetails.filter(li => li.driverApp === 'online');
        const offlineDrivers = driverDetails.filter(li => li.driverApp === 'offline');
        const assignedDrivers = driverDetails.filter(li => li.driverApp === 'assigned');
        setDriverActiveDetails(assignedDrivers)
        setDriverOnlineDetails(activeDrivers)
        setDriverOfflineDetails(offlineDrivers)
        setDriverOnline(activeDrivers.length)
        setDriverOffline(offlineDrivers.length)
        setAssignDriver(assignedDrivers.length)
        // Log the count of active drivers
      } catch (error) {
        console.error("Error fetching driver details:", error);
      }
    };

    fetchData();
  }, [apiUrl]);

  useEffect(() => {
    const fetchData = async () => {
      // Get current date and time using dayjs
      const currentDate = dayjs().format('YYYY-MM-DD');

      const response = await axios.get(`${apiUrl}/checkAssign`);
      const tripAssign = response.data;

      const vehicleDetails = await axios.get(`${apiUrl}/getVehicleDetails`);
      const VehicleNumberDetails = vehicleDetails.data

      const TotalvehicleNumbers = VehicleNumberDetails.map(li => li.vehRegNo)

      const notActivevehicleDetails = await axios.get(`${apiUrl}/getNotVehicleDetails`);
      const notActiveVehicleNumberDetails = notActivevehicleDetails.data
      const notActiveVehicleNumbers = notActiveVehicleNumberDetails.map(li => li.vehRegNo)
      setOfflineVehicle(notActiveVehicleNumberDetails.length)
      try {
        const vehicleOfflineDetailsResponse = await axios.get(`${apiUrl}/particularNotActiveVehicleDetails`, {
          params: { vehNumber: notActiveVehicleNumbers }
        });
        const offlineVehicles = vehicleOfflineDetailsResponse.data.map(vehicle => ({
          ...vehicle,
          status: 'offline'
        }));
        setVehicleOfflineDetails(offlineVehicles)
      } catch (error) {
        console.error('Request failed', error);
      }

      // Not Assign Vehicles
      const filterCurrentDate = tripAssign.filter(li => dayjs(li.startDate).isBefore(currentDate));
      const getDriverName = filterCurrentDate?.map(li => li.driverName)
      const notAssignedVehciles = filterCurrentDate?.map(li => li.vehRegNo)



      if (filterCurrentDate.length !== 0) {
        // Query Available in driverapplogin.js
        const response = await axios.post(`${apiUrl}/removeAssign`, { driverName: getDriverName })

      }

      // Not Assign Vehicles
      const filterAfterCurrentDate = tripAssign.filter(li => dayjs(li.startDate).isAfter(currentDate));
      const getDriverNameAfter = filterAfterCurrentDate.map(li => li.driverName);
      const notAssignedVehiclesAfter = filterAfterCurrentDate.map(li => li.vehRegNo);
      if (filterAfterCurrentDate.length !== 0) {
        // Query Available in driverapplogin.js
        const response = await axios.post(`${apiUrl}/removeAssign`, { driverName: getDriverNameAfter })
        console.log(response, 'success');
      }



      const allNotAssignedVehicles = [...notAssignedVehciles, ...notAssignedVehiclesAfter];
      const newVehicles = TotalvehicleNumbers.filter(vehicleNumber => !allNotAssignedVehicles.includes(vehicleNumber));

      // Log new vehicles that are not in the fetched vehicle details
      const updatedNotAssignedVehicles = Array.from(new Set([...allNotAssignedVehicles, ...newVehicles]));


      // Join into a single comma-separated string
      const allNotAssignedVehiclesString = updatedNotAssignedVehicles.join(',');


      try {

        const vehicleOnlineDetailsResponse = await axios.get(`${apiUrl}/particularVehicleDetails`, {
          params: { vehNumber: allNotAssignedVehiclesString }
        });
        const onlineVehicles = vehicleOnlineDetailsResponse.data.map(vehicle => ({
          ...vehicle,
          status: 'online'
        }));
        setVehicleOnlineDetails(onlineVehicles)
      } catch (error) {
        console.error('Request failed', error);
      }
      // Assign Vehicles
      const filterAssignedWork = tripAssign.filter(li => dayjs(li.startDate).isSame(currentDate, 'day'));
      const AssignedDriver = filterAssignedWork?.map(li => li.driverName)
      const assignedVehciles = filterAssignedWork?.map(li => li.vehRegNo)
      const onlineVehicles = assignedVehciles.length;
      setActiveVehicle(onlineVehicles)
      try {
        if (!assignedVehciles || assignedVehciles.length === 0) return
        console.log("assignedVehciles0", assignedVehciles)
        const vehicleOnlineDetailsResponse = await axios.get(`${apiUrl}/ActiveVehicleDetail`, {
          params: { vehNumber: assignedVehciles }
        });
        const activeVehicles = vehicleOnlineDetailsResponse.data.map(vehicle => ({
          ...vehicle,
          status: 'active'
        }));
        setVehicleActiveDetails(activeVehicles)
      }
      catch (error) {
        console.log(error);
      }

      if (filterAssignedWork.length !== 0) {
        const response = await axios.post(`${apiUrl}/driverAssign`, { driverName: AssignedDriver })
        console.log(response, 'assigned');

      }
      const offlineVehicles = TotalvehicleNumbers.length - assignedVehciles.length
      setInActiveVehicle(offlineVehicles)
    };

    fetchData();
  }, [apiUrl]);


  const [vehicles, setVehicles] = useState(() => {
    const initialVehicles = VehicleModel.map((vehicle, index) => ({
      id: index + 1,
      registerno: index + 1,
      vehicleName: vehicle.carmodel,
      bookings: {},
    }));

    initialVehicles.forEach((vehicle) => {
      vehicle.length = vehicle.vehicleName.length;
    });
    return initialVehicles;
  });
  const showBookedStatusAll = useCallback(async (from, to) => {
    try {
      const response = await axios.get(`${apiUrl}/bookingchart`, {
        params: {
          fromDate: from.format("YYYY-MM-DD"),
          toDate: to.format("YYYY-MM-DD"),
        },
      });
      const bookingData = response.data;
      const bookingCounts = {};
      bookingData.forEach((booking) => {
        const vehicleName = booking.vehType;
        const formattedDate = dayjs(booking.bookingdate).format("YYYY-MM-DD");
        if (!bookingCounts[vehicleName]) {
          bookingCounts[vehicleName] = {};
        }
        bookingCounts[vehicleName][formattedDate] = {
          count: (bookingCounts[vehicleName][formattedDate]?.count || 0) + 1,
        };
      });
      setVehicles((prevVehicles) => {
        const updatedVehicles = prevVehicles.map((vehicle) => ({
          ...vehicle,
          bookings: {
            ...vehicle.bookings,
            ...bookingCounts[vehicle.vehicleName],
          },
        }));
        return updatedVehicles;
      });
    } catch {
      setErrorMessage("Check your Network Connection");
    }
  }, [apiUrl]);
  const generateColumns = () => {
    const columns = [
      { field: "id", headerName: "Sno", width: 70 },
      { field: "vehicleName", headerName: "Vehicle Name", width: 130 },
    ];
    let currentDate = dayjs(fromDate);
    const lastDate = dayjs(toDate);
    while (
      currentDate.isBefore(lastDate) ||
      currentDate.isSame(lastDate, "day")
    ) {
      const formattedDate = currentDate.format("YYYY-MM-DD");
      columns.push({
        field: formattedDate,
        headerName: formattedDate,
        width: 130,
        valueGetter: createValueGetter(formattedDate),
      });

      currentDate = currentDate.add(1, "day");
    }
    return columns;
  };
  const createValueGetter = (bookingDate) => (params) => {
    return params.row.bookings[bookingDate]?.count || 0;
  };
  const columns = generateColumns();

  return {
    error,
    success,
    info,
    warning,
    successMessage,
    errorMessage,
    warningMessage,
    infoMessage,
    hidePopup,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    vehicles,
    columns,
    showBookedStatusAll,
    driverOffline,
    driverOnline,
    assignDriver,
    activeVehicle,
    inActiveVehicle,
    offlineVehicle,
    driverActiveDetails,
    driverOfflineDetails,
    driverOnlineDetails,
    vehicleActiveDetails,
    vehicleOfflineDetails,
    vehicleOnlineDetails
  };
};

export default useBookingchart;
