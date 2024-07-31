import { API_URL } from "../config";

export const registerUser = async (username: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Registration failed");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loginUser = async (username: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "login failed");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
