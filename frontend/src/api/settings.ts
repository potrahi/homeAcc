import { API_URL } from "../config";

export const fetchSetting = async (setting: string) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${API_URL}/settings/${setting}`, {
      headers: {
        Authorization: `${token || ""}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error(error);
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
      const response = await fetch(`${API_URL}/settings/${setting.setting}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token || ""}`,
        },
        body: JSON.stringify({ value: setting.value }),
      });

      if (!response.ok) {
        throw new Error("Failed to update balance");
      }

      return response.json();
    } catch (error) {
      console.error(error);
    }
  }
};
