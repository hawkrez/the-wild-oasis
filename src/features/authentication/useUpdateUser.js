import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success("Your account data successfully updated");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) =>
      toast.error(
        `There was a problem during updating your account😷 (${err.message})`
      ),
  });

  return { mutate, isPending };
}
