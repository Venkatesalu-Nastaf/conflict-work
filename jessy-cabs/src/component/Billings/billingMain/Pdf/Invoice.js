import React, { useEffect, useState } from "react";
import { PdfData } from "../../Transfer/TransferReport/PdfContext";
import { APIURL } from "../../../url";

const Invoice = () => {
    const { particularRefNo } = PdfData()
    const [attachedImage, setAttachedImage] = useState('');
    const [GmapimageUrl, setGMapImageUrl] = useState('');
    const [signimageUrl, setSignImageUrl] = useState('');
    const [routeData, setRouteData] = useState('');
    const [IndividualBillData, setIndividualBillData] = useState({
        Invoice_No: '',
        Trip_id: '',
        Status: '',
        Amount: '',
        Bill_Date: '',
        Customer: '',
        Trips: "1"
    })
    //  const [IndividualBillData, setIndividualBillData] = useState(false)

    const apiUrl = APIURL;
    useEffect(() => {
        const fetchData = async () => {
            const tripidno = particularRefNo;
            try {
                const response = await fetch(`${apiUrl}/get-attachedimage/${tripidno}`);
                if (response.status === 200) {
                    const data = await response.json();
                    const attachedImageUrls = data.imagePaths.map(path => `${apiUrl}/images/${path}`);
                    setAttachedImage(attachedImageUrls);
                }
            }
            catch (err) {
                console.log(err, 'error');
            }
        }
        fetchData()
    }, [apiUrl, particularRefNo])

    // google map image url
    useEffect(() => {
        const fetchData = async () => {
            const tripidno = particularRefNo
            try {
                const response = await fetch(`${apiUrl}/getmapimages/${tripidno}`);
                if (response.status === 200) {
                    const responseData = await response.blob();
                    const imageUrl = URL.createObjectURL(responseData);
                    setGMapImageUrl(imageUrl);
                }
            }
            catch (err) {
                console.log(err, 'error');
            }
        }
        fetchData()
    }, [apiUrl, particularRefNo])

    //   signature image
    useEffect(() => {
        const fetchData = async () => {
            const tripidno = particularRefNo
            try {
                const response = await fetch(`${apiUrl}/get-signimage/${tripidno}`);
                if (response.status === 200) {
                    const imageUrl = URL.createObjectURL(await response.blob());
                    setSignImageUrl(imageUrl);
                } else {
                    setSignImageUrl("")
                }
            } catch (err) {
                console.log(err, 'error');
            }
        };

        fetchData();

        return () => {
            setSignImageUrl("");
        };
    }, [apiUrl, particularRefNo]);

    //   routeData map
    useEffect(() => {
        const fetchData = async () => {
            const tripidno = particularRefNo
            try {
                const response = await fetch(`${apiUrl}/routedata/${encodeURIComponent(particularRefNo)}`);
                if (response.status === 200) {
                    const routeData = await response.json();
                    setRouteData(routeData);
                }
                else {
                    setRouteData("")
                    // const timer = setTimeout(fetchData, 2000);
                    // return () => clearTimeout(timer);
                }
            }
            catch (err) {
                console.log(err, 'error');
            }
        }
        fetchData()
    }, [apiUrl, particularRefNo])
    return {
        attachedImage,
        GmapimageUrl,
        signimageUrl,
        routeData,
        IndividualBillData,
        setIndividualBillData
      
    }
}
export default Invoice