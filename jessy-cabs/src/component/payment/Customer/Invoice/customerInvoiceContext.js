import React, { createContext, useContext, useState } from 'react';

const CustomerInvoiceContext = createContext();

export const CustomerInvoiceProvider = ({ children }) => {
    const [openInvoice, setOpenInvoice] = useState(false);

    return (
        <CustomerInvoiceContext.Provider value={{ openInvoice, setOpenInvoice }}>
            {children}
        </CustomerInvoiceContext.Provider>
    );
};

export const useInvoiceCustomer = () => useContext(CustomerInvoiceContext);
