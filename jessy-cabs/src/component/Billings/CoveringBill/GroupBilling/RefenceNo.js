import axios from 'axios';
import { APIURL } from '../../../url';
const apiUrl = APIURL;

export const ReferenceNo = async () => {
  try {
    const response = await axios.get(`${apiUrl}/ReferenceNo`);
    return response.data;
  } catch (error) {
    console.error('Error fetching bank options:', error);
    throw error;
  }
};