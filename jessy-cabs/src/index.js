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


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>

      <RefPdfDataProvider>
        <PdfDataProvider>
          <MailerTemplateDataProvider>


            <DataProvider2>
              <DataProvider>
                <UserProvider>
                  <PermissionProvider>
                    <App />
                  </PermissionProvider>

                </UserProvider>
              </DataProvider>
            </DataProvider2>


          </MailerTemplateDataProvider>

        </PdfDataProvider>
      </RefPdfDataProvider>

    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
