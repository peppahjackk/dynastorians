import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import { initializeApp } from "firebase/app";

const queryClient = new QueryClient();

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: "dynastorians.firebaseapp.com",
  projectId: "dynastorians",
  storageBucket: "dynastorians.appspot.com",
  messagingSenderId: "614940800097",
  appId: import.meta.env.FIREBASE_APP_ID,
  measurementId: import.meta.env.FIREBASE_MEASUREMENT_ID,
};

initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
