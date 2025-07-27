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
          const idToken = result.getIdToken().getJwtToken();
          const accessToken = result.getAccessToken().getJwtToken();
          const refreshToken = result.getRefreshToken().getToken();
          const sub = result.getIdToken().payload.sub;

          const userInfo = { idToken, accessToken, refreshToken, sub };

          localStorage.setItem("nebula_user", JSON.stringify(userInfo));
          setUser(userInfo);
          resolve(result);
        },
        onFailure: (err) => reject(err),
      });
    });
  };

  const logout = () => {
    const storedUser = JSON.parse(localStorage.getItem("nebula_user"));
    if (storedUser?.signOut) storedUser.signOut();
    localStorage.removeItem("nebula_user");
    setUser(null);
  };

  useEffect(() => {
    const stored = localStorage.getItem("nebula_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        console.error("Erro ao carregar token armazenado:", e);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
