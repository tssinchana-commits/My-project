import { jwtDecode } from "jwt-decode";

// GET AUTH HEADER
export const getAuthHeader = () => {
  const token = localStorage.getItem("token");

  if (!token) return {};

  return {
    Authorization: `Bearer ${token}`
  };
};

// CHECK TOKEN EXPIRY
export const isTokenExpired = () => {
  const token = localStorage.getItem("token");

  if (!token) return true;

  try {

    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    return decoded.exp < currentTime;

  } catch (error) {

    return true;

  }
};

// GET USER ROLE
export const getUserRole = () => {

  const token = localStorage.getItem("token");

  if (!token) return null;

  try {

    const decoded = jwtDecode(token);

    return decoded.roles ? decoded.roles[0] : null;

  } catch (error) {

    return null;

  }
};

// LOGOUT
export const logout = () => {
  localStorage.removeItem("token");
};