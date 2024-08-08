import { SpendingType } from "../types/spending";

export const getCurrentMonthSpendings = (spendings: SpendingType[]) => {
  return spendings.filter((spending: SpendingType) => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    return spending.created_at.slice(0, 7) === currentMonth;
  });
};
