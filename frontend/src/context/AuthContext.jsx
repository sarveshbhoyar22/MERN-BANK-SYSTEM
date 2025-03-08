import { createContext, useContext, useState , useEffect } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};
export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(()=>{
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
   useEffect(() => {
     if (authUser) {
       localStorage.setItem("user", JSON.stringify(authUser));
     } else {
       localStorage.removeItem("user"); // Clear storage on logout
     }
   }, [authUser]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
