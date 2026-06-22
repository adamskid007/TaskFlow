import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthProvider from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./styles/theme.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <ThemeProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
    <ToastContainer />
    </ThemeProvider>
    

  </React.StrictMode>
);