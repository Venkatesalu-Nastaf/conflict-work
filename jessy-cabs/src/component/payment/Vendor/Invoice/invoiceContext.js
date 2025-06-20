import React, { createContext, useContext, useState } from 'react';

const VendorInvoiceContext = createContext();

export const VendorInvoiceProvider = ({ children }) => {
    const [openInvoice, setOpenInvoice] = useState(false);

    return (
        <VendorInvoiceContext.Provider value={{ openInvoice, setOpenInvoice }}>
            {children}
        </VendorInvoiceContext.Provider>
    );
};

export const useInvoice = () => useContext(VendorInvoiceContext);
