// // BankAccount
// export const BankAccount = [
//     {
//       Option: "HDFC",
//       optionvalue: "hdfc",
//     },
//     {
//       Option: "Kottak",
//       optionvalue: "kottak",
//     },
//     {
//       Option: "Canara",
//       optionvalue: "canara",
//     },
//   ];
import axios from 'axios';

export const fetchBankOptions = async () => {
  try {
    const response = await axios.get('http://localhost:8081/bankoptions');
    return response.data;
  } catch (error) {
    console.error('Error fetching bank options:', error);
    throw error; // You can handle the error in the component that calls this function
  }
};