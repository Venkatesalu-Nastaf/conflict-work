
const CryptoJS = require('crypto-js');

const secretKey = "my-secret-key";


function decryption(data) {
    if(!data){
        return null
    }
    try {
    
        const decodedData = decodeURIComponent(data);

        const datas = CryptoJS.AES.decrypt(decodedData, secretKey);

         const decryptedData = datas.toString(CryptoJS.enc.Utf8)

         if(decryptedData){
            return decryptedData
         }else{
            throw new Error ("Decryption failed : no valid data found")
         }
    } catch(error) {
        console.log(error);
        return null;
    }


}

module.exports = decryption;