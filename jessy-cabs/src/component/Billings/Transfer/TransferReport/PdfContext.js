// DataContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { APIURL } from '../../../url';
//import useCard from '../../../Dashboard/MainDash/Cards/useCard';
import { useLocation } from "react-router-dom";

const DataContext = createContext();

export const PdfData = () => {
    return useContext(DataContext);
};

export const PdfDataProvider = ({ children }) => {
    const currentYear = new Date().getFullYear(); 
    const apiUrl = APIURL
    const [pdfPrint, setPdfPrint] = useState(false);
    const [billingPage, setBillingPage] = useState(null);
    const [transferReport, setTransferReport] = useState(null);
    const [particularPdf, setParticularPdf] = useState(false);
    const [individualBilled, setIndividualBilled] = useState(true)
    const [particularRefNo, setParticularRefNo] = useState('');
    const [billGenerate,setBillGenerate] = useState(false);
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [organizationDetail, setOrganizationDetail] = useState({
        organizationname: '',
        addressLine1: '',
        contactEmail: '',
        contactPhoneNumber: '',
        telephone: '',
        gstnumber: ''
    });
    const location = useLocation()
    const [selectedMonths,setSelectedMonths] = useState(getCurrentMonth())
    function getCurrentMonth() {
        const currentDate = new Date();

        const currentMonth = currentDate.getMonth() + 1; // Returns a number between 0 and 11

        return currentMonth.toString();
    };
    useEffect(()=>{
        setSelectedYear(currentYear)
        setSelectedMonths(getCurrentMonth())
      },[location])
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await fetch(`${apiUrl}/organisationpdfdata`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const organizationdetails = await response.json();
                

                // Assuming we are only interested in the first object in the array
                if (organizationdetails.length > 0) {
                    const firstDetail = organizationdetails[0];
                    setOrganizationDetail({
                        addressLine1: firstDetail.addressLine1,
                        contactEmail: firstDetail.contactEmail,
                        contactPhoneNumber: firstDetail.contactPhoneNumber,
                        telephone: firstDetail.telephone,
                        gstnumber: firstDetail.gstnumber,
                        organizationname: firstDetail.organizationname
                    });
                }
            } catch (err) {
                console.error('Error fetching organization details:', err);
            }
        };

        fetchdata();
    },[apiUrl]);

    return (
        <DataContext.Provider value={{
            pdfPrint, setPdfPrint, billingPage, setBillingPage, individualBilled, setIndividualBilled,billGenerate,setBillGenerate,
            transferReport, setTransferReport, particularPdf, setParticularPdf, organizationDetail, particularRefNo, setParticularRefNo,
            selectedMonths,setSelectedMonths,selectedYear,setSelectedYear
        }}>
            {children}
        </DataContext.Provider>
    );
};
