import { useQuery } from "@tanstack/react-query";
import { fetchSpendings } from "../api/spending";
import { SpendingType } from "../types/spending";

export const useFetchSpendings = () => {
  return useQuery<SpendingType[], Error>({
    queryKey: ["spendings"],
    queryFn: fetchSpendings,
  });
};
