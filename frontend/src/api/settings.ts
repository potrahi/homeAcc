import axios from "axios";
import { API_URL } from "../config";

export const fetchSetting = async (setting: string) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${API_URL}/settings/${setting}`, {
      headers: {
        Authorization: `${token || ""}`,
      },
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Axios-specific error handling
      if (error.response) {
        // Request made and server responded
        console.error(error.response.data);
        throw new Error(
          error.response.data.error || "Network response was not ok"
        );
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

type UpdateSettingsProps = {
  setting: string;
  value: string | number;
};

export const updateSettings = async (settings: UpdateSettingsProps[]) => {
  const token = localStorage.getItem("token");
  for (const setting of settings) {
    try {
      const response = await axios.put(
        `${API_URL}/settings/${setting.setting}`,
        { value: setting.value },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token || ""}`,
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
          throw new Error(
            error.response.data.error || "Failed to update balance"
          );
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
  }
};
