import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useGetBookingsAfterDate() {
  const [searchParams] = useSearchParams();
  const numDays = searchParams.get("last") ? searchParams.get("last") : 7;

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { data, isPending } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last${numDays}`],
  });

  return { data, isPending };
}
