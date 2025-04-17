import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ToastContainer } from "react-toastify";
import Load from "./Load";
import { RecruiterProvider } from "./contexts/RecruiterContext.tsx";
import { SeekerProvider } from "./contexts/SeekerContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RecruiterProvider>
      <SeekerProvider>
        <App />
        <ToastContainer position="top-right" autoClose={1000} />
        <Load />
      </SeekerProvider>
    </RecruiterProvider>
  </StrictMode>
);
