import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (id) => deleteBooking(id),
    onSuccess: (data) => {
      toast.success(`booking successfully deleted`);
      queryClient.invalidateQueries({ queryKey: ["Bookings"] });
      console.log(data);
    },
    onError: (err) =>
      toast.error(
        `there was an error during deletin the bookmark😷(${err.message})`
      ),
  });
  return { mutate, isPending };
}
