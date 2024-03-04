import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

export function useGetStaysAfterDate() {
  const [searchParams] = useSearchParams();
  const numDays = searchParams.get("last") ? searchParams.get("last") : 7;
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { data, isPending } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last${numDays}`],
  });

  let arrivedStays;
  if (data) arrivedStays = data.filter((stay) => stay.status !== "unconfirmed");

  return { data, arrivedStays, numDays, isPending };
}
