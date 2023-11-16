import axios from 'axios';

export const fetchBankOptions = async () => {
  try {
    const response = await axios.get('http://localhost:8081/bankoptions');
    return response.data;
  } catch (error) {
    console.error('Error fetching bank options:', error);
    throw error;
  }
};