import { API_URL } from "../config";
import { SpendingType } from "../types/spending";

export const addSpending = async (newSpending: SpendingType) => {
  console.log(newSpending);
  try {
    const response = await fetch(`${API_URL}/spending/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token") || "",
      },
      body: JSON.stringify({
        user_id: newSpending.user_id,
        amount: newSpending.amount,
        created_at: newSpending.created_at,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to add spending. ");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchSpendings = async () => {
  try {
    const response = await fetch(`${API_URL}/spending/`, {
      headers: {
        Authorization: localStorage.getItem("token") || "",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch spendings");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
