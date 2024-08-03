import axios from "axios";
import { API_URL } from "../config";
import { SpendingType } from "../types/spending";

export const addSpending = async (newSpending: SpendingType) => {
  console.log(newSpending);
  try {
    const response = await axios.post(
      `${API_URL}/spending/`,
      {
        user_id: newSpending.user_id,
        amount: newSpending.amount,
        created_at: newSpending.created_at,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token") || "",
        },
      }
    );

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(error.response.data.error || "Failed to add spending.");
      } else if (error.request) {
        throw new Error("No response received from server");
      }
    } else {
      throw new Error((error as Error).message);
    }
  }
};

export const fetchSpendings = async () => {
  try {
    const response = await axios.get(`${API_URL}/spending/`, {
      headers: {
        Authorization: localStorage.getItem("token") || "",
      },
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          error.response.data.error || "Failed to fetch spendings"
        );
      } else if (error.request) {
        throw new Error("No response received from server");
      }
    } else {
      throw new Error((error as Error).message);
    }
  }
};
