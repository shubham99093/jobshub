import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AdminProvider } from "./context/adminContext.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AdminProvider>
      <App />
      <ToastContainer position="top-right" autoClose={3000} />
    </AdminProvider>
  </StrictMode>
);
