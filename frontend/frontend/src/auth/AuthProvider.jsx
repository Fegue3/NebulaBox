import { createContext, useContext, useEffect, useState } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import userPool from "./cognitoConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    const userData = new CognitoUser({ Username: email, Pool: userPool });
    const authDetails = new AuthenticationDetails({ Username: email, Password: password });

    return new Promise((resolve, reject) => {
      userData.authenticateUser(authDetails, {
        onSuccess: (result) => {
          const token = result.getIdToken().getJwtToken();
          localStorage.setItem("nebula_token", token);
          setUser(userData);
          resolve(result);
        },
        onFailure: (err) => reject(err),
      });
    });
  };

  const logout = () => {
    user?.signOut();
    localStorage.removeItem("nebula_token");
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("nebula_token");
    if (token) {
      setUser({ token }); // placeholder user if token exists
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
