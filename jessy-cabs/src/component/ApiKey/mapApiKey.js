 import axios from 'axios';
 import { APIURL } from '../url';

export const ApiKey = "AIzaSyCn47dR5-NLfhq0EqxlgaFw8IEaZO5LnRE";
// export const ApiKey = "AIzaSyBReWXII6pzCf226Qybl5heJhIyV31uxsk";
// export const ApiKey =    "AIzaSyBP2X3r7f472PLSfZPxKokADqxAYSWm4Sc";

 const fetchData = async()=>{
    const apiUrl = APIURL
    try{
        const response = await axios.get(`${apiUrl}/selectedApiData`);
        console.log(response.data,"selectedapiiiiiiiiiiiii");
        const selectedApi = response.data.map(li=>li.ApiKey);
        return selectedApi
    }
    catch(err){
        console.log(err);
        
    }
}

const getApiKey = async () => {
    const apiKeys = await fetchData();
    return apiKeys[0];  // or whatever you need
  };

 export const apiKey = await getApiKey();
