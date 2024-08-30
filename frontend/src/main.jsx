import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { HospitalAuthContextProvider } from "./context/HospitalAuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HospitalAuthContextProvider>

    <AuthContextProvider>
      <App />
    </AuthContextProvider>
    </HospitalAuthContextProvider>
  </StrictMode>
);
