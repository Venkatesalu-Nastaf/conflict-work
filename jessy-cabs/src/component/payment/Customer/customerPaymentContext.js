import React, { createContext, useContext, useState } from "react";

export const CustomerPaymentContext = createContext();

export function useCustomerPayment() {
  return useContext(CustomerPaymentContext);
}

export const CustomerPaymentProvider = ({ children }) => {

  const [paymentData, setPaymentData] = useState([]);

//  const [paymentData, setPaymentData] = useState(() => {
//     const stored = localStorage.getItem("paymentData");
//     return stored ? JSON.parse(stored) : [];
//   });
  
  // useEffect(() => {
  //   localStorage.setItem("paymentData", JSON.stringify(paymentData));
  // }, [paymentData]);

  const addPayment = (newPayment) => {
    setPaymentData((prev) => [...prev, newPayment]);
  };

  return (
    <CustomerPaymentContext.Provider value={{ paymentData, addPayment }}>
      {children}
    </CustomerPaymentContext.Provider>
  );
};

