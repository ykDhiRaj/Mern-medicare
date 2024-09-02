import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { HospitalAuthContextProvider } from "./context/HospitalAuthContext.jsx";
import { AdminAuthContextProvider } from "./context/AdminAuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AdminAuthContextProvider>
      <HospitalAuthContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </HospitalAuthContextProvider>
    </AdminAuthContextProvider>
  </StrictMode>
);
