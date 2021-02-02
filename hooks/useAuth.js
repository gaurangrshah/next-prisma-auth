import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/client";

export const useAuth = () => {
  const [session, loading] = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    !session ? setIsAuthenticated(false) : setIsAuthenticated(true);
    return () => setIsAuthenticated(false);
  }, [session]);
  return {
    isAuthenticated,
    session,
    loading,
    signIn,
    signOut,
  };
};
