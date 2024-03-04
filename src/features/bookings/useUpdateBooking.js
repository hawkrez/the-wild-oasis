import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useUpdateBooking() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ bookingId, updateObj }) =>
      updateBooking(bookingId, updateObj),
    onSuccess: (data) => {
      toast.success(`Booking ${data.id} successfully updated`);
      queryClient.invalidateQueries({
        queryKey: ["Bookings"],
      });
    },
    onError: (err) => {
      toast.error(
        `There was a problem during booking update 😷 (${err.message})`
      );
      console.error(err);
    },
  });
  return { mutate, isPending };
}
