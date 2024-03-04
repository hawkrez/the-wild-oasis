import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as apiUpdateSetting } from "../../services/apiSettings";

function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { isPending: isUpdatingSetting, mutate: updateSetting } = useMutation({
    mutationFn: apiUpdateSetting,
    onSuccess: () => {
      toast.success(`Setting successfully updated`);
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: () => {
      toast.error(`Setting update faild`);
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });
  return { isUpdatingSetting, updateSetting };
}
export { useUpdateSetting };
