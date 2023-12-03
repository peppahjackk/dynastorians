import { createContext, ReactNode } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "dynastorians.firebaseapp.com",
  projectId: "dynastorians",
  storageBucket: "dynastorians.appspot.com",
  messagingSenderId: "614940800097",
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(firebaseApp);

export const AuthContext = createContext(auth);
// export const AuthContext = createContext('dsfadsf');

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // return <AuthContext.Provider value={'ffff'}>{children}</AuthContext.Provider>;
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
