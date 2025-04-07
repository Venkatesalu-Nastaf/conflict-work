import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { APIURL } from "../../../url";

const columns = [
  { field: "id", headerName: "Sno", width: 50 },
  { field: "VehicleNo", headerName: "VehicleNo", width: 130 },
  { field: "VehicleName", headerName: "Vehicle Name", width: 130 },
  {
    field: "filldate",
    headerName: "Fill Date",
    width: 130,
    valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
  },
  {
    field: "emptydate",
    headerName: "Empty Date",
    width: 150,
    valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
  },
  { field: "DriverName", headerName: "Driver Name", width: 130 },
  { field: "FuelPrice", headerName: "Fuel Price", width: 100 },
  {
    field: "InitialOdometerReading",
    headerName: "Initial Odometer Reading",
    width: 200,
  },
  {
    field: "FinalOdometerReading",
    headerName: "Final Odometer Reading",
    width: 170,
  },
  {
    field: "FuelConsumptioninliters",
    headerName: "Fuel Consumption (in liters)",
    width: 200,
  },
];

const useMailagedetails = () => {
  const apiUrl = APIURL;
  const [initialOdometer, setInitialOdometer] = useState(0);
  const [finalOdometer, setFinalOdometer] = useState(0);
  const [fuelConsumption, setFuelConsumption] = useState(0);
  const [mileage, setMileage] = useState(0);
  const [selectedCustomerData, setSelectedCustomerData] = useState({});
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [rows, setRows] = useState([]);
  const [actionName] = useState("");
  const [formData] = useState({});
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [info, setInfo] = useState(false);
  const [warning, setWarning] = useState(false);
  const [successMessage, setSuccessMessage] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [warningMessage] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  const [loading, setLoading] = useState(false);
  const[deletemileagedata,setDeleteMilageData]=useState(false)

  //----------------------popup-----------------
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

  //----------------------------------------------------

  const [book, setBook] = useState({
    VehicleNo: "",
    VehicleName: "",
    filldate: "",
    emptydate: "",
    DriverName: "",
    FuelPrice: "",
    InitialOdometerReading: "",
    FinalOdometerReading: "",
    FuelConsumptioninliters: "",
  });
  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;

    if (type === "checkbox") {
      setBook((prevBook) => ({
        ...prevBook,
        [name]: checked,
      }));
      setSelectedCustomerData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setBook((prevBook) => ({
        ...prevBook,
        [name]: value,
      }));
      setSelectedCustomerData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleDateChange = (date, name) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    const parsedDate = dayjs(formattedDate).format("YYYY-MM-DD");
    setBook((prevBook) => ({
      ...prevBook,
      [name]: parsedDate,
    }));
    setSelectedCustomerData((prevBook) => ({
      ...prevBook,
      [name]: parsedDate,
    }));
  };

  const handleCancel = () => {
    setBook((prevBook) => ({
      ...prevBook,
      VehicleNo: "",
      VehicleName: "",
      filldate: "",
      emptydate: "",
      DriverName: "",
      FuelPrice: "",
      InitialOdometerReading: "",
      FinalOdometerReading: "",
      FuelConsumptioninliters: "",
    }));
    setSelectedCustomerData({});
    setFuelConsumption(0);
    setFinalOdometer(0);
    setInitialOdometer(0);
    setIsEditMode(false);
    setDeleteMilageData(false)
  };
  const handleRowClick = useCallback((params) => {
    const customerData = params.row;
    setSelectedCustomerData(customerData);
    setSelectedCustomerId(params.row.customerId);
    setIsEditMode(true);
  }, []);
  const handleAdd = async () => {
    const VehicleName = book.VehicleName;
    if (!VehicleName) {
      setError(true);
      setErrorMessage("Check your Value");
      return;
    }
    try {
      const emptydate = selectedCustomerData.emptydate
        ? dayjs(selectedCustomerData.emptydate)
        : null || book.emptydate
        ? dayjs(book.emptydate)
        : dayjs();
      const filldate = selectedCustomerData.filldate
        ? dayjs(selectedCustomerData.filldate)
        : null || book.filldate
        ? dayjs(book.filldate)
        : dayjs();
      const updateBook = {
        ...book,
        emptydate: emptydate,
        filldate: filldate,
      };
      await axios.post(`${apiUrl}/fueldetails`, updateBook);
      handleCancel();
      setRows([]);
      setSuccess(true);
      setSuccessMessage("Successfully Added");
      handleList()
    } 
    // catch {
    //   setError(true);
    //   setErrorMessage("Failed to Add Data");
    // }
    catch (error) {
      // console.error("Error occurredddddd:", error);
   
      // Check if there's no response, indicating a network error
      if (error.message ) {
          setError(true);
          setErrorMessage("Check your Network Connection");
          // console.log('Network error');
      } else if (error.response) {
          setError(true);
          // Handle other Axios errors (like 4xx or 5xx responses)
          setErrorMessage("Failed to Add Data: " + (error.response.data.message || error.message));
      } else {
          // Fallback for other errors
          setError(true);
          setErrorMessage("An unexpected error occurred: " + error.message);
      }
  }
  };

  const handleEdit = async () => {
    const selectedCustomer = rows.find(
      (row) => row.VehicleNo === selectedCustomerData?.id
    );

    const emptydate = selectedCustomerData?.emptydate
      ? dayjs(selectedCustomerData?.emptydate).format("YYYY-MM-DD")
      : null;
    const filldate = selectedCustomerData?.filldate
      ? dayjs(selectedCustomerData?.filldate).format("YYYY-MM-DD")
      : null;

    const updatedCustomer = {
      ...selectedCustomer,
      ...selectedCustomerData,
      emptydate: emptydate,
      filldate: filldate,
    };

    try {
      await axios.put(
        `${apiUrl}/fueldetails/${selectedCustomerData?.id}`,
        updatedCustomer
      );
      setSuccess(true);
      setSuccessMessage("Successfully updated");
      handleCancel();
      setRows([]);
      handleList();
    } 
    // catch (error) {
    //   // console.error("Error updating data:", error);
    //   setError(true);
    //   setErrorMessage("Failed to Edit Data");
    // }
    catch (error) {
      // console.error("Error occurredddddd:", error);
   
      // Check if there's no response, indicating a network error
      if (error.message ) {
          setError(true);
          setErrorMessage("Check your Network Connection");
          // console.log('Network error');
      } else if (error.response) {
          setError(true);
          // Handle other Axios errors (like 4xx or 5xx responses)
          setErrorMessage("Failed to Edit Data: " + (error.response.data.message || error.message));
      } else {
          // Fallback for other errors
          setError(true);
          setErrorMessage("An unexpected error occurred: " + error.message);
      }
  }
  };

  // useEffect(() => {
  //   const handlelist = async () => {
  //     const response = await axios.get(`${apiUrl}/fueldetails`);
  //     const data = response.data;
  //     if (data.length > 0) {
  //       setRows(data);
  //     } else {
  //       setRows([]);
  //     }
  //   };
  //   handlelist();
  // }, [apiUrl]);

  // const handleList = useCallback(async () => {
  //   setLoading(true)
  //   try {
  //     const response = await axios.get(`${apiUrl}/fueldetails`);
  //     const data = response.data;
  //     if (data.length > 0) {
  //       setRows(data);
  //       setLoading(false)
  //       // console.log(data,'datas of milage')
  //   }   else {
  //     setRows([]);
  //     setLoading(false)
  //   }
  //   }
  //   catch(err){
  //     console.log(err);
  //   }finally {
  //     setLoading(false); 
  // }
  // }, [apiUrl]); // Add any dependencies needed inside this array


  const handleList = useCallback(async () => {
    setLoading(true); 
    setError(false); // Reset error state before each request
    try {
      const response = await axios.get(`${apiUrl}/fueldetails`);
      const data = response.data;

      if (data.length > 0) {
        setRows(data);
      } else {
        setRows([]);
      }
    } catch (err) {
      if (err.message === 'Network Error') {
        setErrorMessage("Check network connection.");
      } else {
        setErrorMessage("Failed to fetch data: " + (err.response?.data?.message || err.message));
      }
      setError(true);
    } finally {
      setLoading(false); 
    }
  }, [apiUrl]);


useEffect(() => {
    handleList();
}, [handleList]);

  const handleClick = async (event, actionName) => {
    event.preventDefault();
    
      if (actionName === "List") {
        try {
        const response = await axios.get(`${apiUrl}/fueldetails`);
        const data = response.data;
        if (data.length > 0) {
          setRows(data);
          setSuccess(true);
          setSuccessMessage("Successfully listed");
        } else {
          setRows([]);
          setError(true);
          setErrorMessage("No data found");
        }
      }
        catch {
          setError(true);
          setErrorMessage("Failed To Retrive Data");
        }
      } else if (actionName === "Cancel") {
        handleCancel();
        setRows([]);
      } else if (actionName === "Delete") {
        try{
        await axios.delete(`${apiUrl}/fueldetails/${selectedCustomerData?.id}`);
        setSelectedCustomerData(null);
        setSuccess(true);
        setSuccessMessage("Successfully Deleted");
        handleCancel();
        setRows([]);
        handleList();
        }
        catch (error) {
          // console.error("Error deleting data:", error);
          setError(true);
          setErrorMessage("Failed to Delete Data");
        }
      } else if (actionName === "Edit") {
        const selectedCustomer = rows.find(
          (row) => row.VehicleNo === selectedCustomerData?.id
        );
        const emptydate = selectedCustomerData?.emptydate
          ? dayjs(selectedCustomerData?.emptydate).format("YYYY-MM-DD")
          : null;
        const filldate = selectedCustomerData?.filldate
          ? dayjs(selectedCustomerData?.filldate).format("YYYY-MM-DD")
          : null;

        const updatedCustomer = {
          ...selectedCustomer,
          ...selectedCustomerData,
          emptydate: emptydate,
          filldate: filldate,
        };

        try {
          await axios.put(
            `${apiUrl}/fueldetails/${selectedCustomerData?.id}`,
            updatedCustomer
          );
          setSuccess(true);
          setSuccessMessage("Successfully updated");
          handleCancel();
          setRows([]);
          handleList();
        } catch {}
      } else if (actionName === "Add") {
        handleAdd();
      }
    } 
  //   catch {
  //     setError(true);
  //     setErrorMessage("Check your Network Connection");
  //   }
  // };
 

  const calculateMileage = () => {
    const distance =
      (selectedCustomerData?.FinalOdometerReading || finalOdometer) -
      (selectedCustomerData?.InitialOdometerReading || initialOdometer);
    const fuelConsumptionValue =
      selectedCustomerData?.FuelConsumptioninliters || fuelConsumption;
    const mileageValue = distance / fuelConsumptionValue;
    setMileage(mileageValue);
  };

  return {
    selectedCustomerData,
    selectedCustomerId,
    rows,
    actionName,
    error,
    success,
    info,
    warning,
    successMessage,
    errorMessage,
    warningMessage,
    book,
    handleClick,
    handleChange,
    handleRowClick,
    handleAdd,
    hidePopup,
    formData,
    handleDateChange,
    initialOdometer,
    setInitialOdometer,
    finalOdometer,
    setFinalOdometer,
    fuelConsumption,
    setFuelConsumption,
    calculateMileage,
    mileage,
    columns,
    isEditMode,
    handleEdit,
    loading,
    setLoading,
    setDeleteMilageData,deletemileagedata
  };
};

export default useMailagedetails;
