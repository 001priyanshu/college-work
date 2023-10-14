
import { useState, useEffect } from "react";
import AuthContext from "./authContext";

const AuthState = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [email, setEmail] = useState("");

  const url = "https://brick-red-seahorse-cuff.cyclic.app/api";


  const storeUser = (user) => {
    if (typeof localStorage !== 'undefined') {
    localStorage.setItem("user", JSON.stringify(user));
    }
  };
  
  const removeUser = () => {
    localStorage.removeItem("user");
  };

  

  const logout = () => {
    setUser(null);
    removeUser();
  };

  const SignUpUser = async (data) => {
    const res = await fetch(`${url}/register`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    setEmail(result?.email);
    return result;
  };

  const loginUser = async (data) => {
    const res = await fetch(`${url}/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    setUser(result.user);
    storeUser(result.user);
    return result;
  };
  
 

  return (
    <AuthContext.Provider
      value={{
        user,
        logout,
        SignUpUser,
        loginUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;