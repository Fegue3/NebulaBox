import { jwtDecode } from "jwt-decode";

export const isAuthenticated = () => {
  const token = localStorage.getItem("nebula_token");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const exp = decoded.exp * 1000; // milisegundos
    return Date.now() < exp;
  } catch (e) {
    return false;
  }
};

export const getUserFromToken = () => {
  const token = localStorage.getItem("nebula_token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded; // contém email, sub, nome, etc.
  } catch (e) {
    return null;
  }
};
