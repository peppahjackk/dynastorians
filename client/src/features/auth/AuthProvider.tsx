import { createContext, ReactNode, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

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

export const AuthContext = createContext<{
  user: User | null;
  auth: typeof auth;
}>({ user: null, auth });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false); // Set loading to false when user data is ready
    });
    return unsubscribe; // Cleanup subscription on unmount
  }, []);

  if (loading) {
    return null; // Or your custom loading component
  }

  return (
    <AuthContext.Provider value={{ user, auth }}>
      {children}
    </AuthContext.Provider>
  );
};
