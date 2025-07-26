import { jwtDecode } from "jwt-decode";

export function isTokenExpired(token) {
  if (!token) {
    localStorage.removeItem("token");
    return true;
  }
  try {
    const decoded = jwtDecode(token);
    if (!decoded.exp || decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token"); // remove expired token
      return true;
    }
    return false;
  } catch (e) {
    localStorage.removeItem("token"); // if token is invalid/corrupted
    return true;
  }
}
