import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from './component/form/UserContext';
import { DataProvider } from './component/Dashboard/Maindashboard/DataContext'
import { DataProvider2 } from './component/Dashboard/MainDash/Sildebar/DataContext2'
import { PermissionsProvider } from "./component/permissionContext/permissionContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <DataProvider2>
        <DataProvider>
          <UserProvider>
            <PermissionsProvider>
              <App />
            </PermissionsProvider>
          </UserProvider>
        </DataProvider>
      </DataProvider2>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
