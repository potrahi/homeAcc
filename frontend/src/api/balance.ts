import { API_URL } from "../config";

export const updateBalance = async (balance: number) => {
  try {
    const response = await fetch(`${API_URL}/balances/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ balance }),
    });

    if (!response.ok) {
      throw new Error("Failed to update balance");
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
};
