import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from './component/form/UserContext';
import { DataProvider } from './component/Dashboard/Maindashboard/DataContext'
import { DataProvider2 } from './component/Dashboard/MainDash/Sildebar/DataContext2'
import { PdfDataProvider } from "./component/Billings/Transfer/TransferReport/PdfContext";
import { RefPdfDataProvider } from "./component/Billings/CoveringBill/GroupBilling/GroupBillingContext";
import { MailerTemplateDataProvider } from "./component/Info/Mailer/MailerContext";
import { PermissionProvider } from "./component/context/permissionContext";
import { VehicleMapDataProvider } from "./component/Map/vehicleMapContext/vehcileMapContext";
// import { ReportProvider } from "./component/Registration/Report/Context/ReportContext";
import { ReportProvider } from "./component/Billings/Report/Context/ReportContext";
// import { EditMapProvider } from "./component/Bookings/TripSheet/NavigationMap/EditMapContext";
import { EditMapProvider } from "./component/Bookings/TripSheet/NavigationMap/EditMapContext";
import { PaymentProvider } from "./component/payment/Vendor/paymentContext";
import { VendorInvoiceProvider } from "./component/payment/Vendor/Invoice/invoiceContext";
import { CustomerInvoiceProvider } from "./component/payment/Customer/Invoice/customerInvoiceContext";
import { CustomerPaymentProvider } from "./component/payment/Customer/customerPaymentContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <RefPdfDataProvider>
      <PdfDataProvider>
        <VehicleMapDataProvider>
          <MailerTemplateDataProvider>
            <EditMapProvider>
              <ReportProvider>
                <DataProvider2>
                  <DataProvider>
                    <UserProvider>
                      <PermissionProvider>
                        <PaymentProvider>
                          <VendorInvoiceProvider>
                            <CustomerInvoiceProvider>
                              <CustomerPaymentProvider>
                                     <App />
                              </CustomerPaymentProvider>
                            </CustomerInvoiceProvider>
                          </VendorInvoiceProvider>
                        </PaymentProvider>
                      </PermissionProvider>
                    </UserProvider>
                  </DataProvider>
                </DataProvider2>
              </ReportProvider>
            </EditMapProvider>
          </MailerTemplateDataProvider>
        </VehicleMapDataProvider>
      </PdfDataProvider>
    </RefPdfDataProvider>


  </BrowserRouter>
  // </React.StrictMode>
);
reportWebVitals();
