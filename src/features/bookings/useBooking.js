import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

export function useBooking() {
  const bookmarkId = useParams("bookmarkid").bookmarkid;
  const { data, isPending } = useQuery({
    queryKey: ["Bookings", bookmarkId],
    queryFn: () => getBooking(bookmarkId),
  });
  return { data, isPending };
}
