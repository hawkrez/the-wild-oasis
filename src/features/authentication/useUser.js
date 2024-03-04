import { useQuery } from "@tanstack/react-query";
import { checkLogin } from "../../services/apiAuth";

export function useUser() {
  const { data, isPending } = useQuery({
    queryFn: checkLogin,
    queryKey: ["user"],
  });

  return { data, isPending };
}
