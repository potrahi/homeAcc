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
      if (error.response) {
        throw new Error(error.response.data.error || "Registration failed");
      } else if (error.request) {
        throw new Error("No response received from server");
      }
    } else {
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
      if (error.response) {
        throw new Error(error.response.data.error || "Login failed");
      } else if (error.request) {
        throw new Error("No response received from server");
      }
    } else {
      throw new Error((error as Error).message);
    }
  }
};
