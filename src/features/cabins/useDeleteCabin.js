import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinAPI } from "../../services/apiCabins";

function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allCabins"] });
      toast.success(`cabin successfully deleted`);
    },
    onError: () => toast.error("cabin didn't delete"),
  });
  return { isDeleting, deleteCabin };
}

export { useDeleteCabin };
