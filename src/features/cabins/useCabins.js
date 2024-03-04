import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const { data, isPending } = useQuery({
    queryKey: ["allCabins"],
    queryFn: getCabins,
  });

  return { data, isPending };
}
