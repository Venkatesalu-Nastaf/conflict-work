import axios from 'axios';

export const Organization = async () => {
  try {
    const response = await axios.get('http://localhost:8081/organizationoptions');
    return response.data;
  } catch (error) {
    console.error('Error fetching bank options:', error);
    throw error;
  }
};