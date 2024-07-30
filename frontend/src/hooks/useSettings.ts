import { useQuery } from "@tanstack/react-query";
import { fetchSetting } from "../api/settings";

export const useSetting = (setting_name: string) => {
  return useQuery({
    queryKey: ["setting", setting_name],
    queryFn: ({ queryKey }) => fetchSetting(queryKey[1]),
  });
};
