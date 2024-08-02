import axios from "axios";
import { API_URL } from "../config";

export const registerUser = async (username: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/register`,
      { username },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Axios-specific error handling
      if (error.response) {
        // Request made and server responded
        console.error(error.response.data);
        throw new Error(error.response.data.error || "Registration failed");
      } else if (error.request) {
        // The request was made but no response was received
        console.error(error.request);
        throw new Error("No response received from server");
      }
    } else {
      // Non-Axios-specific error handling
      console.error("Error", (error as Error).message);
      throw new Error((error as Error).message);
    }
  }
};

export const loginUser = async (username: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/login`,
      { username },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Axios-specific error handling
      if (error.response) {
        // Request made and server responded
        console.error(error.response.data);
        throw new Error(error.response.data.error || "Login failed");
      } else if (error.request) {
        // The request was made but no response was received
        console.error(error.request);
        throw new Error("No response received from server");
      }
    } else {
      // Non-Axios-specific error handling
      console.error("Error", (error as Error).message);
      throw new Error((error as Error).message);
    }
  }
};
