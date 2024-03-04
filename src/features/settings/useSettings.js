import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

function useSettings() {
  const { isLoading: isLoadingSettings, data } = useQuery({
    queryFn: getSettings,
    queryKey: ["settings"],
  });
  return { isLoadingSettings, data };
}
export { useSettings };
