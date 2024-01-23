import { createContext, ReactNode, useEffect, useState } from "react";
import axios from "axios";
import { User } from "./authTypes";

const handleSignOut = async () => {
  return await axios.post("/api/users/signOut");
};

export const AuthContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  signOut: () => void;
}>({ user: null, setUser: () => {}, signOut: () => {} });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axios.get("/api/users/me");
        setUser(response.data);
      } catch (error) {
        console.error("Error checking user", error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const signOut = async () => {
    try {
      await handleSignOut();
      setUser(null);
    } catch (err) {
      console.error("Error signing out", err);
    }
  };

  if (loading) {
    return <div></div>;
  }

  return (
    <AuthContext.Provider value={{ user, setUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
