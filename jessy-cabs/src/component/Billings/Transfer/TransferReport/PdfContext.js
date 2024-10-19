// DataContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { APIURL } from '../../../url';
import useCard from '../../../Dashboard/MainDash/Cards/useCard';

const DataContext = createContext();

export const PdfData = () => {
    return useContext(DataContext);
};

export const PdfDataProvider = ({ children }) => {
    const apiUrl = APIURL
    const [pdfPrint, setPdfPrint] = useState(false);
    const [billingPage, setBillingPage] = useState(null);
    const [transferReport, setTransferReport] = useState(null);
    const [particularPdf, setParticularPdf] = useState(false);
    const [individualBilled, setIndividualBilled] = useState(true)
    const [particularRefNo, setParticularRefNo] = useState('');
    const [billGenerate,setBillGenerate] = useState(false);
    const [organizationDetail, setOrganizationDetail] = useState({
        organizationname: '',
        addressLine1: '',
        contactEmail: '',
        contactPhoneNumber: '',
        telephone: '',
        gstnumber: ''
    });
    const [selectedMonths,setSelectedMonths] = useState("")

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
    }, []); // Empty dependency array means this effect runs once when the component mounts

    return (
        <DataContext.Provider value={{
            pdfPrint, setPdfPrint, billingPage, setBillingPage, individualBilled, setIndividualBilled,billGenerate,setBillGenerate,
            transferReport, setTransferReport, particularPdf, setParticularPdf, organizationDetail, particularRefNo, setParticularRefNo,
            selectedMonths,setSelectedMonths
        }}>
            {children}
        </DataContext.Provider>
    );
};
