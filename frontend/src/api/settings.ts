import { API_URL } from "../config";

export const fetchSetting = async (setting: string) => {
  try {
    const response = await fetch(`${API_URL}/settings/${setting}`);
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
  for (const setting of settings) {
    try {
      const response = await fetch(`${API_URL}/settings/${setting.setting}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
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
