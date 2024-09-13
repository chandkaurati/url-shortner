import { getCurrentSession } from "@/db/auth-api";
import useFetch from "@/hooks/fetchapi";
import { createContext, useContext, useEffect, useState } from "react";

const userContext = createContext();

const UserContextProvider = ({ children }) => {
  const { data: user, error, loding, fn } = useFetch(getCurrentSession);
    
  const isAuthenticated = user?.role === "authenticated"
  useEffect(() => {
    fn();
    console.log(user)
  }, [isAuthenticated]);

  return (
    <userContext.Provider value={{ user, isAuthenticated , error, loding, fn}}>
      {children}
    </userContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(userContext);
};

export default UserContextProvider;
