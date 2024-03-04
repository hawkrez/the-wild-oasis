import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateCabin as createUpdateCabinAPI } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useCreateUpdateCabin() {
  const queryClient = useQueryClient();

  const { isPending: isCreatingUpdatingCabin, mutate: createUpdateCabin } =
    useMutation({
      mutationFn: ({ formData, editedID }) =>
        createUpdateCabinAPI(formData, editedID),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["allCabins"] });
        toast.success(`operation was successful`);
      },
      onError: (err) => toast.error(err),
    });
  return { isCreatingUpdatingCabin, createUpdateCabin };
}
export { useCreateUpdateCabin };
