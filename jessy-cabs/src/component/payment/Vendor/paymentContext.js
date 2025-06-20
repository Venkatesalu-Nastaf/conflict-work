import React, { createContext, useContext, useState } from "react";

export const PaymentContext = createContext();

export function usePayment() {
  return useContext(PaymentContext);
}

export const PaymentProvider = ({ children }) => {

  const [paymentData, setPaymentData] = useState([]);

//  const [paymentData, setPaymentData] = useState(() => {
//     const stored = localStorage.getItem("paymentData");
//     return stored ? JSON.parse(stored) : [];
//   });

  console.log(paymentData,"payment context");
  
  // useEffect(() => {
  //   localStorage.setItem("paymentData", JSON.stringify(paymentData));
  // }, [paymentData]);

  const addPayment = (newPayment) => {
    setPaymentData((prev) => [...prev, newPayment]);
  };

  return (
    <PaymentContext.Provider value={{ paymentData, addPayment }}>
      {children}
    </PaymentContext.Provider>
  );
};

