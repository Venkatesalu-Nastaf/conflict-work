import CryptoJS from "crypto-js";

const secretKey = "my-secret-key";

export default function encryption(data){

    const encryptedData = CryptoJS.AES.encrypt(data,secretKey).toString();

    return encodeURIComponent(encryptedData);
    
}
