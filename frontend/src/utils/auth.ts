import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  username: string;
  exp?: number;
};

export const isTokenValid = (token: string | null): boolean => {
  if (!token) {
    return false;
  }

  try {
    const decoded: DecodedToken = jwtDecode(token);

    if (!decoded.exp) {
      return true;
    }

    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return false;
  }
};

export const getUsernameFromToken = (token: string): string | null => {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.username;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
